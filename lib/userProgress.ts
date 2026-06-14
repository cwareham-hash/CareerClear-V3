// lib/userProgress.ts — simulation progress + ratings, backed by Supabase.
//
// Tables: user_progress (one row per user/simulation/scenario/tier) and ratings.
// `tier` is the experiential tier ('orientation' | 'day-in-life' | 'full').
// `scenario` scopes Day-in-the-Life and Full to a specific scenario slug
// (e.g. 'fresca'); Orientation is shared across scenarios and so is keyed at the
// career level with scenario = null. Progress for a scenario page is read as the
// UNION of completed_blocks across that career's Orientation row (scenario null)
// and the rows for the scenario being viewed; writes target the current tier's row.

import { supabase } from '@/lib/supabase'
import type { Tier } from '@/lib/simulation'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SimulationFeedback {
  liked:      string
  disliked:   string
  questions:  string
  comparison: string
}

export interface SimulationRating {
  id:          string
  careerId:    string
  scenario:    string | null   // null for Orientation (career-level); slug for DIL/Full
  rating:      number          // 1–10
  feedback:    SimulationFeedback
  tier:        Tier
  completedAt: string          // ISO 8601 (created_at)
}

// ── Ratings ─────────────────────────────────────────────────────────────────

interface RatingRow {
  id:                  string
  simulation_id:       string
  scenario:            string | null
  tier:                string
  score:               number
  feedback_liked:      string | null
  feedback_disliked:   string | null
  feedback_questions:  string | null
  feedback_comparison: string | null
  created_at:          string
}

function mapRating(row: RatingRow): SimulationRating {
  return {
    id:          row.id,
    careerId:    row.simulation_id,
    scenario:    row.scenario,
    rating:      row.score,
    tier:        row.tier as Tier,
    completedAt: row.created_at,
    feedback: {
      liked:      row.feedback_liked      ?? '',
      disliked:   row.feedback_disliked   ?? '',
      questions:  row.feedback_questions  ?? '',
      comparison: row.feedback_comparison ?? '',
    },
  }
}

export async function saveRating(args: {
  userId:   string
  careerId: string
  scenario: string | null   // null for Orientation; scenario slug for DIL/Full
  rating:   number
  feedback: SimulationFeedback
  tier:     Tier
}): Promise<void> {
  const { userId, careerId, scenario, rating, feedback, tier } = args
  const { error } = await supabase.from('ratings').insert({
    user_id:             userId,
    simulation_id:       careerId,
    scenario:            scenario,
    tier:                tier,
    score:               rating,
    feedback_liked:      feedback.liked      || null,
    feedback_disliked:   feedback.disliked   || null,
    feedback_questions:  feedback.questions  || null,
    feedback_comparison: feedback.comparison || null,
  })
  if (error) console.error('[ratings] saveRating failed:', error.message)
}

/** All of a user's ratings, newest first. */
export async function getAllRatings(userId: string): Promise<SimulationRating[]> {
  const { data, error } = await supabase
    .from('ratings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[ratings] getAllRatings failed:', error.message)
    return []
  }
  return (data as RatingRow[]).map(mapRating)
}

// ── Progress ──────────────────────────────────────────────────────────────────

interface ProgressRow {
  simulation_id:    string
  completed_blocks: string[]
}

/**
 * Union of completed block ids for ONE scenario page: the career's shared
 * Orientation (scenario = null) plus the rows for the scenario being viewed.
 */
export async function getCompletedBlockIds(
  userId: string,
  careerId: string,
  scenario: string,
): Promise<string[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('simulation_id, completed_blocks')
    .eq('user_id', userId)
    .eq('simulation_id', careerId)
    .or(`scenario.is.null,scenario.eq.${scenario}`)
  if (error) {
    console.error('[progress] getCompletedBlockIds failed:', error.message)
    return []
  }
  const set = new Set<string>()
  for (const row of data as ProgressRow[]) {
    for (const id of row.completed_blocks ?? []) set.add(id)
  }
  return Array.from(set)
}

/**
 * Completed block ids for the career-level Orientation (scenario IS NULL).
 * Orientation is shared across projects, so it is keyed at the career level.
 */
export async function getOrientationCompletedBlockIds(userId: string, careerId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('completed_blocks')
    .eq('user_id', userId)
    .eq('simulation_id', careerId)
    .is('scenario', null)
  if (error) {
    console.error('[progress] getOrientationCompletedBlockIds failed:', error.message)
    return []
  }
  const set = new Set<string>()
  for (const row of data as { completed_blocks: string[] }[]) {
    for (const id of row.completed_blocks ?? []) set.add(id)
  }
  return Array.from(set)
}

/** Map of careerId → union of completed block ids, for ALL the user's progress. */
export async function getProgressByCareer(userId: string): Promise<Record<string, string[]>> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('simulation_id, completed_blocks')
    .eq('user_id', userId)
  if (error) {
    console.error('[progress] getProgressByCareer failed:', error.message)
    return {}
  }
  const sets: Record<string, Set<string>> = {}
  for (const row of data as ProgressRow[]) {
    ;(sets[row.simulation_id] ??= new Set<string>())
    for (const id of row.completed_blocks ?? []) sets[row.simulation_id].add(id)
  }
  const out: Record<string, string[]> = {}
  for (const careerId of Object.keys(sets)) out[careerId] = Array.from(sets[careerId])
  return out
}

/**
 * Upsert the completed-blocks list for one (user, simulation, tier). Stores the
 * blocks completed within this tier's depth; the union across tiers reconstructs
 * the full set on read.
 */
export async function upsertProgress(args: {
  userId:          string
  careerId:        string
  scenario:        string | null   // null for Orientation; scenario slug for DIL/Full
  tier:            string
  completedBlocks: string[]
  isCompleted:     boolean
}): Promise<void> {
  const { userId, careerId, scenario, tier, completedBlocks, isCompleted } = args
  const nowIso = new Date().toISOString()
  const { error } = await supabase.from('user_progress').upsert(
    {
      user_id:          userId,
      simulation_id:    careerId,
      scenario,
      tier,
      completed_blocks: completedBlocks,
      is_completed:     isCompleted,
      completed_at:     isCompleted ? nowIso : null,
      last_activity_at: nowIso,
    },
    { onConflict: 'user_id,simulation_id,scenario,tier' },
  )
  if (error) console.error('[progress] upsertProgress failed:', error.message)
}
