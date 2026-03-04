'use client'

import { useState, useEffect } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export type FavoriteCategory = 'saved_to_try' | 'actively_pursuing'

export interface Favorite {
  careerId: string
  category: FavoriteCategory
}

const FAVORITES_KEY = 'cc_favorites'

// ── Migration helper ──────────────────────────────────────────────────────────
// Old format was string[] — convert to Favorite[] on first read

function readFavorites(): Favorite[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    // Old format: string[]
    if (Array.isArray(parsed) && (parsed.length === 0 || typeof parsed[0] === 'string')) {
      const migrated: Favorite[] = (parsed as string[]).map((careerId) => ({
        careerId,
        category: 'saved_to_try',
      }))
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(migrated))
      return migrated
    }
    // New format: Favorite[]
    return parsed as Favorite[]
  } catch {
    return []
  }
}

function writeFavorites(favorites: Favorite[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch {
    // ignore
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  // Read from localStorage once on mount — avoids SSR mismatch
  useEffect(() => {
    setFavorites(readFavorites())
  }, [])

  /** Returns true if career is in any favorite category. */
  function isFavorite(careerId: string): boolean {
    return favorites.some((f) => f.careerId === careerId)
  }

  /** Returns the category for a favorited career, or null if not favorited. */
  function getFavoriteCategory(careerId: string): FavoriteCategory | null {
    return favorites.find((f) => f.careerId === careerId)?.category ?? null
  }

  /** Toggle favorite from the explore page — adds as saved_to_try or removes. */
  function toggle(careerId: string) {
    setFavorites((prev) => {
      const next = prev.some((f) => f.careerId === careerId)
        ? prev.filter((f) => f.careerId !== careerId)
        : [...prev, { careerId, category: 'saved_to_try' as FavoriteCategory }]
      writeFavorites(next)
      return next
    })
  }

  /**
   * Upgrade a career to "Actively Pursuing".
   * If already favorited: changes category to actively_pursuing.
   * If not yet favorited: adds as actively_pursuing.
   */
  function upgradeToActively(careerId: string) {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.careerId === careerId)
      const next = exists
        ? prev.map((f) =>
            f.careerId === careerId ? { ...f, category: 'actively_pursuing' as FavoriteCategory } : f
          )
        : [...prev, { careerId, category: 'actively_pursuing' as FavoriteCategory }]
      writeFavorites(next)
      return next
    })
  }

  return { favorites, isFavorite, getFavoriteCategory, toggle, upgradeToActively }
}
