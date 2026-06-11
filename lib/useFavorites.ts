'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth'

// ── Types ─────────────────────────────────────────────────────────────────────

export type FavoriteCategory = 'saved_to_try' | 'actively_pursuing'

export interface Favorite {
  careerId: string
  category: FavoriteCategory
}

interface FavoriteRow {
  career_id:     string
  favorite_type: FavoriteCategory
}

// ── Hook ──────────────────────────────────────────────────────────────────────
// Backed by the Supabase `favorites` table (RLS-scoped to the user). Logged-out
// visitors can browse; attempting to favorite opens the auth modal.

export function useFavorites() {
  const { user, openAuthModal } = useAuth()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading]     = useState(true)

  // Load the user's favorites whenever the signed-in user changes.
  useEffect(() => {
    if (!user) {
      setFavorites([])
      setLoading(false)
      return
    }
    let active = true
    ;(async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('career_id, favorite_type')
        .eq('user_id', user.id)
      if (!active) return
      if (error) console.error('[favorites] load failed:', error.message)
      setFavorites(
        (data as FavoriteRow[] | null ?? []).map((r) => ({
          careerId: r.career_id,
          category: r.favorite_type,
        })),
      )
      setLoading(false)
    })()
    return () => { active = false }
  }, [user])

  function isFavorite(careerId: string): boolean {
    return favorites.some((f) => f.careerId === careerId)
  }

  function getFavoriteCategory(careerId: string): FavoriteCategory | null {
    return favorites.find((f) => f.careerId === careerId)?.category ?? null
  }

  /** Toggle from the explore page — adds as saved_to_try or removes entirely. */
  const toggle = useCallback(
    async (careerId: string) => {
      if (!user) {
        openAuthModal('login')   // can't save without an identity
        return
      }
      const exists = favorites.some((f) => f.careerId === careerId)
      if (exists) {
        setFavorites((prev) => prev.filter((f) => f.careerId !== careerId)) // optimistic
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('career_id', careerId)
        if (error) console.error('[favorites] delete failed:', error.message)
      } else {
        setFavorites((prev) => [...prev, { careerId, category: 'saved_to_try' }]) // optimistic
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: user.id, career_id: careerId, favorite_type: 'saved_to_try' })
        if (error) console.error('[favorites] insert failed:', error.message)
      }
    },
    [user, favorites, openAuthModal],
  )

  /** Upgrade (or add) a career to "Actively Pursuing" — called after a sim. */
  const upgradeToActively = useCallback(
    async (careerId: string) => {
      if (!user) return
      setFavorites((prev) => {
        const exists = prev.some((f) => f.careerId === careerId)
        return exists
          ? prev.map((f) =>
              f.careerId === careerId ? { ...f, category: 'actively_pursuing' as FavoriteCategory } : f,
            )
          : [...prev, { careerId, category: 'actively_pursuing' as FavoriteCategory }]
      })
      const { error } = await supabase.from('favorites').upsert(
        { user_id: user.id, career_id: careerId, favorite_type: 'actively_pursuing' },
        { onConflict: 'user_id,career_id' },
      )
      if (error) console.error('[favorites] upgrade failed:', error.message)
    },
    [user],
  )

  return { favorites, loading, isFavorite, getFavoriteCategory, toggle, upgradeToActively }
}
