'use client'

// ── My Ratings ────────────────────────────────────────────────────────────────
// Every role verdict the signed-in user has submitted, newest first, with a sort
// control and a tier filter. Reads role_verdicts only — the old `ratings` table
// is not consulted anywhere.
//
// Keep-all is the point of this page: re-rating a role after a second run adds a
// row rather than replacing one, so the list shows how a user's read on a role
// moved over time.

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, LogIn } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { CAREERS } from '@/lib/careers'
import { TIERS, type Tier } from '@/lib/simulation'
import { getVerdicts, type RoleVerdict } from '@/lib/roleVerdicts'
import { trackMyRatingsViewed } from '@/lib/analytics'

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  })
}

function tierLabel(t: Tier): string {
  return TIERS.find((o) => o.value === t)?.display ?? t
}

type SortKey   = 'newest' | 'highest' | 'lowest'
type TierValue = 'all' | 'day-in-life' | 'full'

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'newest',  label: 'Newest'        },
  { value: 'highest', label: 'Highest score' },
  { value: 'lowest',  label: 'Lowest score'  },
]

// Orientation is never rated, so it is not offered as a filter.
const TIER_FILTERS: { value: TierValue; label: string }[] = [
  { value: 'all',         label: 'All'              },
  { value: 'day-in-life', label: 'Day in the Life'  },
  { value: 'full',        label: 'Full Simulation'  },
]

// ── Score badge ───────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const bg =
    score >= 8 ? 'var(--color-teal)' : score >= 5 ? 'var(--color-navy)' : 'var(--color-muted)'
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill
        font-sans font-semibold text-[12px] text-white shrink-0"
      style={{ backgroundColor: bg }}
    >
      <Star size={10} fill="white" strokeWidth={0} aria-hidden="true" />
      {score}/10
    </span>
  )
}

// ── Segmented control ─────────────────────────────────────────────────────────

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label:    string
  options:  { value: T; label: string }[]
  value:    T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-sans text-[12px] text-muted font-medium shrink-0">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = o.value === value
          return (
            <button
              key={o.value}
              onClick={() => onChange(o.value)}
              className="px-3 py-1 rounded-pill border font-sans text-[12px] font-medium
                transition-colors duration-150"
              style={
                active
                  ? {
                      backgroundColor: 'var(--color-navy)',
                      color:           '#ffffff',
                      borderColor:     'var(--color-teal)',
                    }
                  : {
                      backgroundColor: '#ffffff',
                      color:           'var(--color-dark)',
                      borderColor:     'var(--color-border)',
                    }
              }
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Verdict card ──────────────────────────────────────────────────────────────

function VerdictCard({ verdict }: { verdict: RoleVerdict }) {
  const career = CAREERS.find((c) => c.id === verdict.careerId)

  return (
    <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
      <div className="h-1" style={{ backgroundColor: 'var(--color-teal)' }} />

      {/* Header: career, tier, score, date */}
      <div className="px-5 py-4 border-b border-border flex items-center gap-3 flex-wrap">
        <span className="text-[24px] leading-none select-none shrink-0" aria-hidden="true">
          {career?.emoji ?? '💼'}
        </span>
        <h3 className="font-sans font-bold text-[15px] text-dark">
          {career?.title ?? verdict.careerId}
        </h3>
        <span
          className="px-2.5 py-0.5 rounded-pill font-sans text-[11px] font-semibold text-white shrink-0"
          style={{ backgroundColor: 'var(--color-navy)' }}
        >
          {tierLabel(verdict.tier)}
        </span>
        <ScoreBadge score={verdict.score} />
        <span className="flex-1" />
        <span className="font-sans text-[13px] text-muted shrink-0">
          {formatDate(verdict.takenAt)}
        </span>
      </div>

      {/* Written feedback, when there is any */}
      {(verdict.liked || verdict.disliked) ? (
        <div className="px-5 py-4 flex flex-col gap-3">
          {verdict.liked && (
            <div>
              <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-1">
                What I liked
              </p>
              <p className="font-sans text-[13px] text-dark leading-relaxed">{verdict.liked}</p>
            </div>
          )}
          {verdict.disliked && (
            <div>
              <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-1">
                What I didn&apos;t like
              </p>
              <p className="font-sans text-[13px] text-dark leading-relaxed">{verdict.disliked}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="px-5 py-3">
          <p className="font-sans text-[13px] text-muted italic">Score only — no written notes.</p>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MyRatingsPage() {
  const { user, isLoading: authLoading, openAuthModal } = useAuth()

  const [verdicts, setVerdicts]       = useState<RoleVerdict[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [sort, setSort]               = useState<SortKey>('newest')
  const [tierFilter, setTierFilter]   = useState<TierValue>('all')

  // Once per mount. The ref matters in development, where StrictMode invokes
  // effects twice and would otherwise double-count the view (same guard the
  // simulation's tier_started uses).
  const viewTrackedRef = useRef(false)
  useEffect(() => {
    if (viewTrackedRef.current) return
    viewTrackedRef.current = true
    trackMyRatingsViewed()
  }, [])

  useEffect(() => {
    if (!user) {
      setVerdicts([])
      setDataLoading(false)
      return
    }
    let active = true
    setDataLoading(true)
    ;(async () => {
      const rows = await getVerdicts(user.id)   // already newest-first
      if (!active) return
      setVerdicts(rows)
      setDataLoading(false)
    })()
    return () => { active = false }
  }, [user])

  const visible = useMemo(() => {
    const filtered =
      tierFilter === 'all' ? verdicts : verdicts.filter((v) => v.tier === tierFilter)
    // getVerdicts already returns newest-first, so 'newest' needs no re-sort.
    if (sort === 'newest') return filtered
    return [...filtered].sort((a, b) =>
      sort === 'highest' ? b.score - a.score : a.score - b.score,
    )
  }, [verdicts, sort, tierFilter])

  // ── Resolving session / loading ─────────────────────────────────────────────
  if (authLoading || (user && dataLoading)) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-cream flex items-center justify-center">
        <p className="font-sans text-[14px] text-muted">Loading your ratings…</p>
      </div>
    )
  }

  // ── Logged out — mirrors the dashboard's gate ───────────────────────────────
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-card border border-border shadow-card max-w-md w-full p-8 text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-tag-bg flex items-center justify-center">
            <LogIn size={22} style={{ color: 'var(--color-teal)' }} />
          </div>
          <h1 className="font-serif text-[24px] font-bold text-navy leading-tight mb-2">
            Log in to see your ratings
          </h1>
          <p className="font-sans text-[14px] text-muted leading-relaxed mb-6">
            The roles you&apos;ve rated after a simulation live here once you have an account.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => openAuthModal('signup')}
              className="px-5 py-2.5 rounded-btn bg-teal text-white font-sans font-semibold
                text-[14px] transition-colors duration-150 hover:bg-teal-light"
            >
              Create account
            </button>
            <button
              onClick={() => openAuthModal('login')}
              className="px-5 py-2.5 rounded-btn border border-border font-sans font-medium
                text-[14px] text-dark hover:border-teal hover:text-teal transition-colors duration-150"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium
            text-muted hover:text-teal transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-[32px] font-bold text-navy leading-tight mb-1">
            My Ratings
          </h1>
          <p className="font-sans text-[15px] text-muted">
            How each role felt after you simulated it.
          </p>
        </div>

        {verdicts.length === 0 ? (
          <p className="font-sans text-[13px] text-muted">
            No ratings yet — finish a Day in the Life or Full Simulation to rate it.
          </p>
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-6">
              <Segmented label="Sort" options={SORTS} value={sort} onChange={setSort} />
              <Segmented label="Tier" options={TIER_FILTERS} value={tierFilter} onChange={setTierFilter} />
            </div>

            {visible.length === 0 ? (
              <p className="font-sans text-[13px] text-muted">
                No ratings for this tier yet.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {visible.map((v) => (
                  <VerdictCard key={v.id} verdict={v} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
