// lib/quizResults.ts — quiz results, backed by Supabase.
//
// Table: quiz_results (one row per completed attempt, RLS-scoped to the user).
// KEEP-ALL BY DESIGN: the table has select + insert policies only — no update,
// no delete. Every attempt is a new row, so a user can see how their results
// shifted over time. Never write an .update() or .delete() against this table.
//
// Anonymous users can take the quiz. Their attempts are written to localStorage
// only (see lib/recommendations.ts); when they later sign up or log in on the
// same browser, claimLocalQuizResults() copies those attempts into their
// account, preserving each attempt's original completion time as taken_at.

import { supabase } from '@/lib/supabase'
import { getAllHistory, type CareerResult, type QuizAttempt } from '@/lib/recommendations'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SavedQuizResult {
  id:        string
  /** questionId → selected optionValue */
  answers:   Record<string, string>
  /** All careers, sorted descending by matchPct */
  results:   CareerResult[]
  /** ISO 8601 — when the quiz was actually completed, not when it was saved. */
  takenAt:   string
  version:   string
}

interface QuizResultRow {
  id:                  string
  answers:             Record<string, string> | null
  recommended_careers: CareerResult[] | null
  quiz_version:        string | null
  taken_at:            string
}

function mapRow(row: QuizResultRow): SavedQuizResult {
  return {
    id:      row.id,
    answers: row.answers ?? {},
    results: row.recommended_careers ?? [],
    takenAt: row.taken_at,
    version: row.quiz_version ?? 'v1',
  }
}

// ── Local claim bookkeeping ───────────────────────────────────────────────────
// Ids of localStorage attempts already copied into Supabase. Kept in its own key
// so cc_quiz_history itself stays exactly the shape it has always been.

const CLAIMED_KEY = 'cc_quiz_claimed'

/**
 * How many careers to store per attempt. The scorer ranks every career in the
 * library (~100), and everything past the top handful scores 0 — storing the
 * full list would put ~7KB of mostly-zeroes in each row. The dashboard shows
 * the top 5, so 20 leaves plenty of headroom. Results arrive already sorted
 * best-first, so this keeps the strongest matches.
 */
const MAX_STORED_CAREERS = 20

function topCareers(results: CareerResult[]): CareerResult[] {
  return results.slice(0, MAX_STORED_CAREERS)
}

function getClaimedIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(CLAIMED_KEY)
    return stored ? (JSON.parse(stored) as string[]) : []
  } catch {
    return []
  }
}

function addClaimedIds(ids: string[]): void {
  if (typeof window === 'undefined' || ids.length === 0) return
  try {
    const merged = Array.from(new Set([...getClaimedIds(), ...ids]))
    localStorage.setItem(CLAIMED_KEY, JSON.stringify(merged))
  } catch {
    // Storage full or blocked — worst case an attempt gets claimed twice.
  }
}

// ── Writes ────────────────────────────────────────────────────────────────────

/**
 * Insert one completed attempt for a signed-in user.
 *
 * `takenAt` is the completion time, passed in so a claimed anonymous attempt
 * keeps its original timestamp rather than the moment it was copied over.
 * `localAttemptId` is the matching cc_quiz_history id — recorded as claimed on
 * success so a later login never re-inserts the same attempt.
 *
 * Returns true when the write succeeded, false when Supabase returned an error
 * (same contract as upsertProgress).
 */
export async function saveQuizResult(
  userId:          string,
  answers:         Record<string, string>,
  recommendedCareers: CareerResult[],
  takenAt:         string,
  localAttemptId?: string,
): Promise<boolean> {
  const { error } = await supabase.from('quiz_results').insert({
    user_id:             userId,
    answers,
    recommended_careers: topCareers(recommendedCareers),
    taken_at:            takenAt,
  })
  if (error) {
    console.error('[quiz] saveQuizResult failed:', error.message)
    return false
  }
  if (localAttemptId) addClaimedIds([localAttemptId])
  return true
}

/**
 * Copy any not-yet-claimed localStorage attempts into this user's account,
 * preserving each attempt's original completion time.
 *
 * Safe to call on every login and every signup: already-claimed ids are skipped,
 * so repeat logins never double-insert. Returns the number of attempts claimed.
 *
 * Note: when email confirmation is on there is no session immediately after
 * signup, so the insert is refused by RLS and nothing is claimed — the attempts
 * stay unclaimed and get picked up at the user's first real login instead.
 */
export function claimLocalQuizResults(userId: string): Promise<number> {
  // Join an already-running claim for this user rather than starting a second
  // one. This is what lets getQuizHistory() below wait for a claim kicked off
  // by login, so a just-claimed attempt is on screen at first paint instead of
  // appearing only after a refresh.
  const running = inFlightClaims.get(userId)
  if (running) return running

  const run = runClaim(userId).finally(() => inFlightClaims.delete(userId))
  inFlightClaims.set(userId, run)
  return run
}

const inFlightClaims = new Map<string, Promise<number>>()

async function runClaim(userId: string): Promise<number> {
  if (typeof window === 'undefined') return 0

  const claimed = new Set(getClaimedIds())
  const pending = getAllHistory().filter((a: QuizAttempt) => !claimed.has(a.id))
  if (pending.length === 0) return 0   // nothing to do — no network call

  const { error } = await supabase.from('quiz_results').insert(
    pending.map((a) => ({
      user_id:             userId,
      answers:             a.answers,
      recommended_careers: topCareers(a.results),
      taken_at:            a.completedAt,
    })),
  )
  if (error) {
    console.error('[quiz] claimLocalQuizResults failed:', error.message)
    return 0
  }

  addClaimedIds(pending.map((a) => a.id))
  return pending.length
}

// ── Reads ─────────────────────────────────────────────────────────────────────

/**
 * Every attempt this user has saved, newest first.
 *
 * Claims first, then reads: a visitor who takes the quiz anonymously and then
 * logs in sees that attempt on their first dashboard load, not after a refresh.
 * When there is nothing pending this costs one localStorage read and no
 * network call, and a claim already started by login is joined rather than
 * repeated.
 */
export async function getQuizHistory(userId: string): Promise<SavedQuizResult[]> {
  await claimLocalQuizResults(userId).catch(() => {})

  const { data, error } = await supabase
    .from('quiz_results')
    .select('id, answers, recommended_careers, quiz_version, taken_at')
    .eq('user_id', userId)
    .order('taken_at', { ascending: false })
  if (error) {
    console.error('[quiz] getQuizHistory failed:', error.message)
    return []
  }
  return (data as QuizResultRow[]).map(mapRow)
}
