// lib/userProgress.ts — Phase 6: simulation ratings & feedback persistence

import type { DurationOption } from '@/lib/simulation'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SimulationFeedback {
  liked:      string
  disliked:   string
  questions:  string
  comparison: string
}

export interface SimulationRating {
  id:             string          // `${Date.now()}-${Math.random()}`
  careerId:       string
  userName:       string
  rating:         number          // 1–10
  feedback:       SimulationFeedback
  durationOption: DurationOption
  completedAt:    string          // ISO 8601
}

// ── Storage ───────────────────────────────────────────────────────────────────

const RATINGS_KEY = 'cc_sim_ratings'

function readAll(): SimulationRating[] {
  try {
    const raw = localStorage.getItem(RATINGS_KEY)
    if (raw) return JSON.parse(raw) as SimulationRating[]
  } catch {
    // ignore
  }
  return []
}

function writeAll(ratings: SimulationRating[]): void {
  try {
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings))
  } catch {
    // ignore
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export function saveRating(r: SimulationRating): void {
  const all = readAll()
  all.push(r)
  writeAll(all)
}

export function getRatingsForCareer(userName: string, careerId: string): SimulationRating[] {
  return readAll()
    .filter((r) => r.userName === userName && r.careerId === careerId)
    .sort((a, b) => (a.completedAt > b.completedAt ? -1 : 1)) // newest first
}

export function getLatestRating(userName: string, careerId: string): SimulationRating | null {
  const ratings = getRatingsForCareer(userName, careerId)
  return ratings[0] ?? null
}

export function getAllRatings(userName: string): SimulationRating[] {
  return readAll()
    .filter((r) => r.userName === userName)
    .sort((a, b) => (a.completedAt > b.completedAt ? -1 : 1))
}

/** Returns the number of completed blocks for a simulation career. */
export function getCompletedBlockCount(careerId: string): number {
  try {
    const raw = localStorage.getItem(`cc_sim_${careerId}_completed`)
    if (raw) return (JSON.parse(raw) as string[]).length
  } catch {
    // ignore
  }
  return 0
}

/** Returns the raw array of completed block IDs for a simulation career. */
export function getCompletedBlockIds(careerId: string): string[] {
  try {
    const raw = localStorage.getItem(`cc_sim_${careerId}_completed`)
    if (raw) return JSON.parse(raw) as string[]
  } catch {
    // ignore
  }
  return []
}
