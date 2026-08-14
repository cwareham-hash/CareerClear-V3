// lib/roleVerdicts.ts — role verdicts (the post-tier rating), backed by Supabase.
//
// Table: role_verdicts. One row per submission: a required 1–10 score plus two
// optional free-text answers. Written when a user finishes a Day-in-the-Life or
// Full Simulation tier and submits the rating modal (Orientation never asks).
//
// KEEP-ALL BY DESIGN: the table has select + insert policies only — no update,
// no delete. Re-taking a tier and rating it again adds a NEW row, so a user's
// verdict on a role can be tracked as it changes. Never write an .update() or
// .delete() against this table.
//
// This replaces the old `ratings` table as the write target for the modal. That
// table and its helpers in lib/userProgress.ts are untouched and still hold the
// historical rows the dashboard reads today.

import { supabase } from '@/lib/supabase'
import type { Tier } from '@/lib/simulation'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RoleVerdict {
  id:       string
  careerId: string
  scenario: string | null
  tier:     Tier
  score:    number          // 1–10
  liked:    string | null
  disliked: string | null
  takenAt:  string          // ISO 8601
}

interface VerdictRow {
  id:        string
  career_id: string
  scenario:  string | null
  tier:      string
  score:     number
  liked:     string | null
  disliked:  string | null
  taken_at:  string
}

function mapRow(row: VerdictRow): RoleVerdict {
  return {
    id:       row.id,
    careerId: row.career_id,
    scenario: row.scenario,
    tier:     row.tier as Tier,
    score:    row.score,
    liked:    row.liked,
    disliked: row.disliked,
    takenAt:  row.taken_at,
  }
}

/**
 * Identity of one verdict slot: a career + project + tier. Used to look up the
 * latest score for a dashboard progress row.
 */
export function verdictKey(
  careerId: string,
  scenario: string | null,
  tier: string,
): string {
  return `${careerId}|${scenario ?? ''}|${tier}`
}

// ── Writes ────────────────────────────────────────────────────────────────────

/**
 * Insert one verdict. `liked` / `disliked` are optional — blank answers are
 * stored as NULL rather than empty strings, so "skipped" and "wrote nothing"
 * look the same in the data.
 *
 * Returns true when the write succeeded, false when Supabase returned an error
 * (same contract as upsertProgress and saveQuizResult).
 */
export async function saveVerdict(
  userId:   string,
  careerId: string,
  scenario: string | null,
  tier:     Tier,
  score:    number,
  liked:    string,
  disliked: string,
  takenAt:  string,
): Promise<boolean> {
  const { error } = await supabase.from('role_verdicts').insert({
    user_id:   userId,
    career_id: careerId,
    scenario,
    tier,
    score,
    liked:    liked.trim()    || null,
    disliked: disliked.trim() || null,
    taken_at: takenAt,
  })
  if (error) {
    console.error('[verdicts] saveVerdict failed:', error.message)
    return false
  }
  return true
}

// ── Reads ─────────────────────────────────────────────────────────────────────

/** Every verdict this user has submitted, newest first. */
export async function getVerdicts(userId: string): Promise<RoleVerdict[]> {
  const { data, error } = await supabase
    .from('role_verdicts')
    .select('id, career_id, scenario, tier, score, liked, disliked, taken_at')
    .eq('user_id', userId)
    .order('taken_at', { ascending: false })
  if (error) {
    console.error('[verdicts] getVerdicts failed:', error.message)
    return []
  }
  return (data as VerdictRow[]).map(mapRow)
}
