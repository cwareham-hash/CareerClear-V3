// ── Recommendation engine for Career Clear Phase 3 ───────────────────────────
// §5.3 — Scoring algorithm + localStorage persistence
//
// ALGORITHM (not specified in spec — decision documented here):
//   For each question, each answer option carries a `scores` map (0–3 pts per
//   career). After all questions are answered:
//     1. Sum raw points per career from selected answers.
//     2. Compute the max possible score per career by summing the highest-value
//        option for that career across every question.
//     3. matchPct = Math.round((raw / max) * 100), clamped to [0, 100].
//     4. Sort descending by matchPct.
//
// STORAGE KEY (not specified in spec — decision documented here):
//   cc_quiz_history → QuizAttempt[]  (parallels cc_user_name, cc_favorites)

import { QUESTIONS } from './questionnaire'
import { CAREERS } from './careers'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CareerResult {
  careerId: string
  matchPct: number
}

export interface QuizAttempt {
  /** Unique id: timestamp + random suffix */
  id: string
  userName: string
  /** ISO 8601 */
  completedAt: string
  /** questionId → selected optionValue */
  answers: Record<string, string>
  /** Sorted descending by matchPct */
  results: CareerResult[]
}

const HISTORY_KEY = 'cc_quiz_history'

// ── Scoring ───────────────────────────────────────────────────────────────────

/**
 * Given a complete answers map, returns all careers sorted by match percentage.
 * Pure function — does not touch localStorage.
 */
export function computeRecommendations(
  answers: Record<string, string>,
): CareerResult[] {
  const careerIds = CAREERS.map((c) => c.id)

  // Accumulate raw and max scores per career
  const raw: Record<string, number> = {}
  const max: Record<string, number> = {}
  for (const id of careerIds) {
    raw[id] = 0
    max[id] = 0
  }

  for (const question of QUESTIONS) {
    // Max possible contribution per career for this question
    const questionMax: Record<string, number> = {}
    for (const option of question.options) {
      for (const [careerId, pts] of Object.entries(option.scores)) {
        questionMax[careerId] = Math.max(questionMax[careerId] ?? 0, pts as number)
      }
    }
    for (const [careerId, pts] of Object.entries(questionMax)) {
      max[careerId] += pts
    }

    // Raw score from the selected answer
    const selectedValue = answers[question.id]
    if (selectedValue) {
      const option = question.options.find((o) => o.value === selectedValue)
      if (option) {
        for (const [careerId, pts] of Object.entries(option.scores)) {
          raw[careerId] += pts as number
        }
      }
    }
  }

  return careerIds
    .map((id) => ({
      careerId: id,
      matchPct: max[id] > 0 ? Math.round((raw[id] / max[id]) * 100) : 0,
    }))
    .sort((a, b) => b.matchPct - a.matchPct)
}

// ── localStorage helpers ───────────────────────────────────────────────────────

export function getAllHistory(): QuizAttempt[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(HISTORY_KEY)
    return stored ? (JSON.parse(stored) as QuizAttempt[]) : []
  } catch {
    return []
  }
}

export function getHistoryForUser(userName: string): QuizAttempt[] {
  return getAllHistory().filter((a) => a.userName === userName)
}

/**
 * Persists a completed quiz attempt. Returns the saved attempt.
 */
export function saveAttempt(
  userName: string,
  answers: Record<string, string>,
  results: CareerResult[],
): QuizAttempt {
  const attempt: QuizAttempt = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    userName,
    completedAt: new Date().toISOString(),
    answers,
    results,
  }
  const history = getAllHistory()
  localStorage.setItem(HISTORY_KEY, JSON.stringify([...history, attempt]))
  return attempt
}
