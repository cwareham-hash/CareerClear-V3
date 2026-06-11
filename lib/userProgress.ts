// lib/userProgress.ts — simulation progress + ratings, backed by Supabase.
//
// Tables: user_progress (one row per user/simulation/tier) and ratings.
// `tier` stores the numeric duration as text ('10' | '30' | '120' | '300').
// Progress completion is read as the UNION of completed_blocks across every
// tier row for a simulation (matches the old "one shared completed set"
// behavior), while writes target the currently-selected tier's row.

import { supabase } from '@/lib/supabase'
import type { DurationOption } from '@/lib/simulation'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SimulationFeedback {
  liked:      string
  disliked:   string
  questions:  string
  comparison: string
}

export interface SimulationRating {
  id:             string
  careerId:       string
  rating:         number          // 1–10
  feedback:       SimulationFeedback
  durationOption: DurationOption
  completedAt:    string          // ISO 8601 (created_at)
}

// ── Ratings ─────────────────────────────────────────────────────────────────

interface RatingRow {
  id:                  string
  simulation_id:       string
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
    id:             row.id,
    careerId:       row.simulation_id,
    rating:         row.score,
    durationOption: Number(row.tier) as DurationOption,
    completedAt:    row.created_at,
    feedback: {
      liked:      row.feedback_liked      ?? '',
      disliked:   row.feedback_disliked   ?? '',
      questions:  row.feedback_questions  ?? '',
      comparison: row.feedback_comparison ?? '',
    },
  }
}

export async function saveRating(args: {
  userId:         string
  careerId:       string
  rating:         number
  feedback:       SimulationFeedback
  durationOption: DurationOption
}): Promise<void> {
  const { userId, careerId, rating, feedback, durationOption } = args
  const { error } = await supabase.from('ratings').insert({
    user_id:             userId,
    simulation_id:       careerId,
    tier:                String(durationOption),
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

/** Union of completed block ids for one simulation (across all tier rows). */
export async function getCompletedBlockIds(userId: string, careerId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('simulation_id, completed_blocks')
    .eq('user_id', userId)
    .eq('simulation_id', careerId)
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
  tier:            string
  completedBlocks: string[]
  isCompleted:     boolean
}): Promise<void> {
  const { userId, careerId, tier, completedBlocks, isCompleted } = args
  const nowIso = new Date().toISOString()
  const { error } = await supabase.from('user_progress').upsert(
    {
      user_id:          userId,
      simulation_id:    careerId,
      tier,
      completed_blocks: completedBlocks,
      is_completed:     isCompleted,
      completed_at:     isCompleted ? nowIso : null,
      last_activity_at: nowIso,
    },
    { onConflict: 'user_id,simulation_id,tier' },
  )
  if (error) console.error('[progress] upsertProgress failed:', error.message)
}
