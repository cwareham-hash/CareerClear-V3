// lib/userProgress.ts — simulation progress + ratings, backed by Supabase.
//
// Tables: user_progress (one row per user/simulation/scenario/tier) and ratings.
// `tier` is the experiential tier ('orientation' | 'day-in-life' | 'full').
// `scenario` scopes EVERY tier — including Orientation — to a specific project
// slug (e.g. 'meridian'). (Orientation used to be career-level with scenario =
// null; it is now per-project, so its rows are keyed by the project slug like the
// other tiers. Pre-existing scenario = null orientation rows are NOT migrated —
// accept-the-reset.) Progress for a project page is the completed_blocks across
// that project's rows; writes target the current tier's row.

import { supabase } from '@/lib/supabase'
import type { Tier } from '@/lib/simulation'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SimulationFeedback {
  liked:      string
  disliked:   string
  questions:  string
  comparison: string
}

// ── Ratings (legacy) ────────────────────────────────────────────────────────
//
// SUPERSEDED by lib/roleVerdicts.ts. The post-tier modal writes to role_verdicts
// now, and every screen reads from there — nothing in the app reads this table
// any more. saveRating and the `ratings` table are left in place deliberately;
// a later cleanup drops both once the historical rows are no longer wanted.

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

// ── Progress ──────────────────────────────────────────────────────────────────

interface ProgressRow {
  simulation_id:    string
  completed_blocks: string[]
}

/**
 * Completed block ids for ONE project page: every row for that project slug
 * (all of its tiers — orientation, day-in-life, full — share the slug).
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
    .eq('scenario', scenario)
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
 * Completed block ids for ONE project's Orientation tier. Orientation is now
 * per-project, so it is keyed by the project slug (not scenario = null).
 */
export async function getOrientationCompletedBlockIds(
  userId: string,
  careerId: string,
  scenario: string,
): Promise<string[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('completed_blocks')
    .eq('user_id', userId)
    .eq('simulation_id', careerId)
    .eq('scenario', scenario)
    .eq('tier', 'orientation')
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
 *
 * Returns true when the write succeeded, false when Supabase returned an error.
 * Callers that must not act on a failed write (analytics, for one) check this;
 * existing callers can keep ignoring the return value.
 */
export async function upsertProgress(args: {
  userId:          string
  careerId:        string
  scenario:        string | null   // null for Orientation; scenario slug for DIL/Full
  tier:            string
  completedBlocks: string[]
  isCompleted:     boolean
}): Promise<boolean> {
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
  return !error
}
