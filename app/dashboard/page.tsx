'use client'

// ── Phase 6 — User Dashboard (per-duration-tier progress tracking) ────────────

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  RotateCcw,
  Monitor,
  Heart,
  ChevronDown,
  ChevronUp,
  Play,
  Star,
  BookOpen,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { getHistoryForUser, type QuizAttempt } from '@/lib/recommendations'
import { CAREERS } from '@/lib/careers'
import { SIMULATIONS, DURATION_OPTIONS, type DurationOption } from '@/lib/simulation'
import {
  getRatingsForCareer,
  getLatestRating,
  getCompletedBlockIds,
  getAllRatings,
  type SimulationRating,
} from '@/lib/userProgress'
import { useFavorites } from '@/lib/useFavorites'

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function matchBadgeClass(pct: number): string {
  if (pct >= 75) return 'bg-teal text-white'
  if (pct >= 50) return 'bg-navy text-white'
  return 'bg-border text-muted'
}

function durationLabel(d: DurationOption): string {
  return DURATION_OPTIONS.find((o) => o.value === d)?.display ?? `${d} min`
}

// ── Per-tier progress types ───────────────────────────────────────────────────

interface TierProgress {
  duration:       DurationOption
  display:        string        // e.g. "10 min", "2 hours"
  completedCount: number
  totalCount:     number        // visible blocks at this tier (minDuration <= duration)
  isCompleted:    boolean
}

interface RoleProgress {
  careerId: string
  tiers:    TierProgress[]      // only tiers with completedCount >= 1 (started)
  ratings:  SimulationRating[]
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ElementType
  value: number
  label: string
  color: string
}) {
  return (
    <div className="bg-white rounded-card border border-border shadow-card p-5 flex flex-col gap-3">
      <div
        className="w-10 h-10 rounded-card flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-tag-bg)' }}
      >
        <Icon size={18} style={{ color }} aria-hidden="true" />
      </div>
      <div>
        <p className="font-sans font-bold text-[28px] text-dark leading-none mb-1">{value}</p>
        <p className="font-sans text-[13px] text-muted">{label}</p>
      </div>
    </div>
  )
}

// ── Rating Badge ──────────────────────────────────────────────────────────────

function RatingBadge({ rating }: { rating: number }) {
  const bg =
    rating >= 8
      ? 'var(--color-teal)'
      : rating >= 5
      ? 'var(--color-navy)'
      : 'var(--color-muted)'
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill
        font-sans font-semibold text-[12px] text-white shrink-0"
      style={{ backgroundColor: bg }}
    >
      <Star size={10} fill="white" strokeWidth={0} />
      {rating}/10
    </span>
  )
}

// ── Progress Row ──────────────────────────────────────────────────────────────

function ProgressRow({ role }: { role: RoleProgress }) {
  const [expanded, setExpanded] = useState(false)

  const sim    = SIMULATIONS.find((s) => s.careerId === role.careerId)
  const career = CAREERS.find((c) => c.id === role.careerId)
  if (!sim || !career) return null

  return (
    <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
      <div className="h-1" style={{ backgroundColor: 'var(--color-teal)' }} />

      {/* Role header */}
      <div className="px-5 pt-5 pb-3 border-b border-border flex items-center gap-3">
        <span className="text-[28px] leading-none select-none shrink-0" aria-hidden="true">
          {career.emoji}
        </span>
        <h3 className="font-sans font-bold text-[16px] text-dark">{career.title}</h3>
      </div>

      {/* Tier rows */}
      <div className="px-5 py-3 flex flex-col gap-3">
        {role.tiers.map((tier) => {
          const pct = Math.round((tier.completedCount / tier.totalCount) * 100)
          return (
            <div key={tier.duration} className="flex flex-col gap-1.5">
              {/* Row 1: pill + status badge + spacer + CTA */}
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-pill font-sans font-bold text-[14px] text-white shrink-0"
                  style={{ backgroundColor: 'var(--color-navy)' }}
                >
                  {tier.display}
                </span>
                <span
                  className="px-2 py-0.5 rounded-pill font-sans text-[11px] font-semibold shrink-0"
                  style={
                    tier.isCompleted
                      ? { backgroundColor: 'var(--color-tag-bg)', color: 'var(--color-teal)' }
                      : { backgroundColor: '#fef3c7', color: '#92400e' }
                  }
                >
                  {tier.isCompleted ? '✓ Completed' : 'In Progress'}
                </span>
                <span className="flex-1" />
                <Link
                  href={`/careers/${career.slug}/simulate`}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn
                    font-sans font-semibold text-[12px] text-white transition-colors duration-150"
                  style={{ backgroundColor: 'var(--color-teal)' }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-teal-light)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-teal)')
                  }
                >
                  <Play size={10} aria-hidden="true" />
                  {tier.isCompleted ? 'View Results' : 'Continue'}
                </Link>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 rounded-pill bg-border overflow-hidden">
                <div
                  className="h-full rounded-pill transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: 'var(--color-teal)' }}
                />
              </div>

              {/* Block count */}
              <p className="font-sans text-[12px] text-muted">
                {tier.completedCount}/{tier.totalCount} blocks · {pct}%
              </p>
            </div>
          )
        })}
      </div>

      {/* Feedback toggle */}
      {role.ratings.length > 0 && (
        <div className="px-5 pb-4">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 font-sans text-[13px] font-medium
              transition-colors duration-150"
            style={{ color: 'var(--color-teal)' }}
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Hide feedback' : `View feedback (${role.ratings.length})`}
          </button>
        </div>
      )}

      {/* Expanded feedback */}
      {expanded && role.ratings.length > 0 && (
        <div className="border-t border-border px-5 py-5 flex flex-col gap-5 bg-cream">
          {role.ratings.map((r, i) => (
            <div key={r.id} className={i > 0 ? 'border-t border-border pt-5' : ''}>
              <div className="flex items-center gap-2 mb-3">
                <RatingBadge rating={r.rating} />
                <span className="font-sans text-[12px] text-muted">
                  {formatDate(r.completedAt)} · {durationLabel(r.durationOption)}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {r.feedback.liked && (
                  <div>
                    <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-1">
                      What I liked
                    </p>
                    <p className="font-sans text-[13px] text-dark leading-relaxed">{r.feedback.liked}</p>
                  </div>
                )}
                {r.feedback.disliked && (
                  <div>
                    <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-1">
                      What I didn&apos;t like
                    </p>
                    <p className="font-sans text-[13px] text-dark leading-relaxed">{r.feedback.disliked}</p>
                  </div>
                )}
                {r.feedback.questions && (
                  <div>
                    <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-1">
                      Questions I still have
                    </p>
                    <p className="font-sans text-[13px] text-dark leading-relaxed">{r.feedback.questions}</p>
                  </div>
                )}
                {r.feedback.comparison && (
                  <div>
                    <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-1">
                      How it compares
                    </p>
                    <p className="font-sans text-[13px] text-dark leading-relaxed">{r.feedback.comparison}</p>
                  </div>
                )}
                {!r.feedback.liked && !r.feedback.disliked && !r.feedback.questions && !r.feedback.comparison && (
                  <p className="font-sans text-[13px] text-muted italic">No written feedback added.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Favorite Career Card ──────────────────────────────────────────────────────

function FavoriteCareerCard({
  careerId,
  pursuing,
  latestRating,
}: {
  careerId:     string
  pursuing:     boolean
  latestRating: SimulationRating | null
}) {
  const career = CAREERS.find((c) => c.id === careerId)
  if (!career) return null

  return (
    <div className="bg-white rounded-card border border-border shadow-card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[28px] leading-none select-none" aria-hidden="true">
          {career.emoji}
        </span>
        {latestRating && <RatingBadge rating={latestRating.rating} />}
      </div>

      <div>
        <h4 className="font-sans font-bold text-[15px] text-dark leading-snug mb-1.5">
          {career.title}
        </h4>
        <span className="px-2 py-0.5 rounded-pill text-[11px] font-medium border border-teal text-teal">
          {career.industry}
        </span>
      </div>

      <div className="flex items-center gap-2 pt-2 mt-auto border-t border-border">
        <Link
          href={`/careers/${career.slug}`}
          className="font-sans text-[13px] font-semibold text-teal hover:text-teal-light
            transition-colors duration-150"
        >
          Explore →
        </Link>
        {career.hasSimulation && (
          <Link
            href={`/careers/${career.slug}/simulate`}
            className="ml-auto inline-flex items-center gap-1 font-sans text-[12px] font-medium
              text-muted hover:text-teal transition-colors duration-150"
          >
            <Play size={11} aria-hidden="true" />
            {pursuing ? 'Retake' : 'Simulate'}
          </Link>
        )}
      </div>
    </div>
  )
}

// ── Quiz Attempt Card ─────────────────────────────────────────────────────────

function AttemptCard({ attempt, attemptNumber }: { attempt: QuizAttempt; attemptNumber: number }) {
  const topResults = attempt.results.slice(0, 5)

  return (
    <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
      <div
        className="px-5 py-4 flex items-center justify-between border-b border-border"
        style={{ borderTop: '3px solid var(--color-teal)' }}
      >
        <div className="flex items-center gap-3">
          <span className="font-sans font-semibold text-[14px] text-dark">
            Attempt #{attemptNumber}
          </span>
        </div>
        <span className="font-sans text-[13px] text-muted">{formatDate(attempt.completedAt)}</span>
      </div>

      <div className="px-5 py-4">
        <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-3">
          Recommended Careers
        </p>
        <div className="flex flex-wrap gap-2">
          {topResults.map((result) => {
            const career = CAREERS.find((c) => c.id === result.careerId)
            if (!career) return null
            return (
              <Link
                key={result.careerId}
                href={`/careers/${career.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill border
                  font-sans text-[13px] font-medium transition-colors duration-150 hover:border-teal hover:text-teal"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-dark)' }}
              >
                <span aria-hidden="true">{career.emoji}</span>
                {career.title}
                <span
                  className={`px-1.5 py-0.5 rounded-pill text-[11px] font-semibold ${matchBadgeClass(result.matchPct)}`}
                >
                  {result.matchPct}%
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Section Header ────────────────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType
  title: string
  subtitle?: string
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div
        className="w-9 h-9 rounded-card flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: 'var(--color-tag-bg)' }}
      >
        <Icon size={17} style={{ color: 'var(--color-teal)' }} aria-hidden="true" />
      </div>
      <div>
        <h2 className="font-serif text-[22px] font-bold text-navy leading-tight">{title}</h2>
        {subtitle && (
          <p className="font-sans text-[13px] text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { userName }  = useAuth()
  const { favorites } = useFavorites()

  const [history, setHistory]           = useState<QuizAttempt[]>([])
  const [roleProgress, setRoleProgress] = useState<RoleProgress[]>([])
  const [rolesRated, setRolesRated]     = useState(0)

  // Load quiz history (newest first)
  useEffect(() => {
    if (userName) {
      const attempts = getHistoryForUser(userName)
      setHistory([...attempts].reverse())
    }
  }, [userName])

  // Load simulation progress + ratings
  useEffect(() => {
    const data: RoleProgress[] = SIMULATIONS.flatMap((sim) => {
      const completedSet = new Set(getCompletedBlockIds(sim.careerId))
      if (completedSet.size === 0) return []

      const tiers: TierProgress[] = DURATION_OPTIONS
        .map(({ value, display }) => {
          const visibleBlocks  = sim.timeBlocks.filter((b) => b.minDuration <= value)
          const completedCount = visibleBlocks.filter((b) => completedSet.has(b.id)).length
          return {
            duration:       value,
            display,
            completedCount,
            totalCount:     visibleBlocks.length,
            isCompleted:    completedCount >= visibleBlocks.length,
          }
        })
        .filter((tier) => tier.completedCount >= 1)

      if (tiers.length === 0) return []
      return [{
        careerId: sim.careerId,
        tiers,
        ratings:  userName ? getRatingsForCareer(userName, sim.careerId) : [],
      }]
    })

    setRoleProgress(data)

    if (userName) {
      const all      = getAllRatings(userName)
      const distinct = new Set(all.map((r) => r.careerId))
      setRolesRated(distinct.size)
    }
  }, [userName])

  // Stats — per tier, not per role
  const tiersInProgress = roleProgress.reduce((acc, r) => acc + r.tiers.filter((t) => !t.isCompleted).length, 0)
  const tiersCompleted  = roleProgress.reduce((acc, r) => acc + r.tiers.filter((t) =>  t.isCompleted).length, 0)

  // Favorites split
  const activePursuing = favorites.filter((f) => f.category === 'actively_pursuing')
  const savedToTry     = favorites.filter((f) => f.category === 'saved_to_try')

  // New user: nothing started yet
  const isNewUser = roleProgress.length === 0 && favorites.length === 0 && history.length === 0

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ── 1. Header ──────────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="font-serif text-[32px] font-bold text-navy leading-tight mb-1">
            Welcome back{userName ? `, ${userName}` : ''}
          </h1>
          <p className="font-sans text-[15px] text-muted">
            Track your career exploration journey.
          </p>
        </div>

        {/* ── 2. Stats row ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard
            icon={TrendingUp}
            value={tiersInProgress}
            label="In Progress"
            color="var(--color-teal)"
          />
          <StatCard
            icon={CheckCircle2}
            value={tiersCompleted}
            label="Completed"
            color="var(--color-teal)"
          />
          <StatCard
            icon={Star}
            value={rolesRated}
            label="Roles Rated"
            color="var(--color-teal)"
          />
          <StatCard
            icon={Heart}
            value={favorites.length}
            label="Saved Careers"
            color="var(--color-teal)"
          />
        </div>

        {/* ── New user welcome card ──────────────────────────────────────── */}
        {isNewUser && (
          <div className="bg-white rounded-card border border-border shadow-card overflow-hidden mb-12">
            <div className="h-1" style={{ backgroundColor: 'var(--color-teal)' }} />
            <div className="px-6 py-8 text-center">
              <h2 className="font-serif text-[24px] font-bold text-navy mb-3">
                Ready to explore your career path?
              </h2>
              <p className="font-sans text-[15px] text-muted mb-6 max-w-md mx-auto">
                Start a simulation to experience a real work day in your dream role. No experience needed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn
                    font-sans font-semibold text-[14px] text-white transition-colors duration-150"
                  style={{ backgroundColor: 'var(--color-teal)' }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-teal-light)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-teal)')
                  }
                >
                  Explore Careers →
                </Link>
                <Link
                  href="/questionnaire"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn
                    font-sans font-semibold text-[14px] transition-colors duration-150
                    border border-teal text-teal hover:bg-teal hover:text-white"
                >
                  Take the Career Quiz
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── 3–5. Sections (hidden for new users who see the welcome card) ── */}
        {!isNewUser && (
        <>

        {/* ── 3. My Progress ─────────────────────────────────────────────── */}
        <section className="mb-12">
          <SectionHeader
            icon={Monitor}
            title="My Progress"
            subtitle="Simulations you've started or completed"
          />

          {roleProgress.length === 0 ? (
            <div className="bg-white rounded-card border border-border shadow-card py-12 text-center">
              <div
                className="w-12 h-12 rounded-card flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--color-tag-bg)' }}
              >
                <Monitor size={20} style={{ color: 'var(--color-teal)' }} />
              </div>
              <p className="font-sans font-semibold text-[15px] text-dark mb-1">
                No simulations yet
              </p>
              <p className="font-sans text-[13px] text-muted mb-5 max-w-xs mx-auto">
                Start a simulation to track your progress and feedback here.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn
                  font-sans font-semibold text-[14px] text-white transition-colors duration-150"
                style={{ backgroundColor: 'var(--color-teal)' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-teal-light)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-teal)')
                }
              >
                <BookOpen size={14} aria-hidden="true" />
                Explore Careers
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {roleProgress.map((role) => (
                <ProgressRow key={role.careerId} role={role} />
              ))}
            </div>
          )}
        </section>

        {/* ── 4. Saved Careers ───────────────────────────────────────────── */}
        <section className="mb-12">
          <SectionHeader
            icon={Heart}
            title="Saved Careers"
            subtitle="Careers you've bookmarked for exploration"
          />

          {favorites.length === 0 ? (
            <div className="bg-white rounded-card border border-border shadow-card py-12 text-center">
              <div
                className="w-12 h-12 rounded-card flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--color-tag-bg)' }}
              >
                <Heart size={20} style={{ color: 'var(--color-teal)' }} />
              </div>
              <p className="font-sans font-semibold text-[15px] text-dark mb-1">
                No saved careers yet
              </p>
              <p className="font-sans text-[13px] text-muted mb-5">
                Heart a career to save it!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn
                  font-sans font-semibold text-[14px] text-white transition-colors duration-150"
                style={{ backgroundColor: 'var(--color-teal)' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-teal-light)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-teal)')
                }
              >
                <Sparkles size={14} aria-hidden="true" />
                Explore Careers
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-8">

              {/* Actively Pursuing */}
              {activePursuing.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--color-teal)' }}
                    />
                    <h3 className="font-sans font-semibold text-[14px] text-dark">
                      Actively Pursuing
                    </h3>
                    <span className="font-sans text-[13px] text-muted">
                      — completed a simulation
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activePursuing.map(({ careerId }) => (
                      <FavoriteCareerCard
                        key={careerId}
                        careerId={careerId}
                        pursuing={true}
                        latestRating={userName ? getLatestRating(userName, careerId) : null}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Saved to Try */}
              {savedToTry.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--color-border)' }}
                    />
                    <h3 className="font-sans font-semibold text-[14px] text-dark">
                      Saved to Try
                    </h3>
                    <span className="font-sans text-[13px] text-muted">
                      — haven&apos;t simulated yet
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedToTry.map(({ careerId }) => (
                      <FavoriteCareerCard
                        key={careerId}
                        careerId={careerId}
                        pursuing={false}
                        latestRating={null}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </section>

        {/* ── 5. Questionnaire Results ───────────────────────────────────── */}
        <section>
          <SectionHeader
            icon={Sparkles}
            title="Questionnaire Results"
            subtitle="Your career match quiz history"
          />

          {history.length === 0 ? (
            <div className="bg-white rounded-card border border-border shadow-card py-12 text-center">
              <div
                className="w-12 h-12 rounded-card flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--color-tag-bg)' }}
              >
                <Sparkles size={20} style={{ color: 'var(--color-teal)' }} />
              </div>
              <p className="font-sans font-semibold text-[15px] text-dark mb-1">
                No quiz results yet
              </p>
              <p className="font-sans text-[13px] text-muted mb-5 max-w-xs mx-auto">
                Take the Career Match Quiz to discover which roles suit you best.
              </p>
              <Link
                href="/questionnaire"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn
                  font-sans font-semibold text-[14px] text-white transition-colors duration-150"
                style={{ backgroundColor: 'var(--color-teal)' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-teal-light)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-teal)')
                }
              >
                <Sparkles size={14} aria-hidden="true" />
                Take the Career Quiz
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {history.map((attempt, i) => (
                <AttemptCard
                  key={attempt.id}
                  attempt={attempt}
                  attemptNumber={history.length - i}
                />
              ))}

              {/* Retake button at bottom of section */}
              <div className="flex justify-center pt-2">
                <Link
                  href="/questionnaire"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-btn
                    font-sans font-semibold text-[14px] transition-colors duration-150
                    border border-teal text-teal hover:bg-teal hover:text-white"
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  Retake Quiz
                </Link>
              </div>
            </div>
          )}
        </section>

        </>
        )}

      </div>
    </div>
  )
}
