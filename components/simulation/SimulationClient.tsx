'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import Link from 'next/link'
import { type Simulation, type TimeBlock, type Tier } from '@/lib/simulation'
import { CAREERS } from '@/lib/careers'
import { useAuth } from '@/lib/auth'
import { useFavorites } from '@/lib/useFavorites'
import {
  saveRating,
  getCompletedBlockIds,
  upsertProgress,
  type SimulationFeedback,
} from '@/lib/userProgress'
import { LogIn, Hourglass } from 'lucide-react'
import TierSelector from './TierSelector'
import SimulationCalendar from './SimulationCalendar'
import TimeBlockPanel from './TimeBlockPanel'
import TimeBlockModal from './TimeBlockModal'
import RatingModal from './RatingModal'

interface Props {
  simulation: Simulation
}

export default function SimulationClient({ simulation }: Props) {
  const { careerId, title, scenario, project } = simulation
  const { user, userName, betaAccess, isLoading: authLoading, openAuthModal } = useAuth()
  const { isFavorite, upgradeToActively } = useFavorites()

  // Career metadata for rating modal
  const career = CAREERS.find((c) => c.id === careerId)

  // ── State ─────────────────────────────────────────────────────────────────
  const [selectedTier, setSelectedTier]         = useState<Tier>('orientation')
  const [completedIds, setCompletedIds]         = useState<Set<string>>(new Set())
  const [openBlock, setOpenBlock]               = useState<TimeBlock | null>(null)
  const [mobileDay, setMobileDay]               = useState(1)
  const [showRatingModal, setShowRatingModal]   = useState(false)
  const [isLoaded, setIsLoaded]                 = useState(false)

  // Track previous completedCount to detect when we newly cross the finish line
  const prevCompletedCountRef = useRef(0)

  // Load completed block ids for this user + simulation from Supabase.
  useEffect(() => {
    if (!user) {
      setIsLoaded(true)
      return
    }
    let active = true
    ;(async () => {
      const ids = await getCompletedBlockIds(user.id, careerId)
      if (!active) return
      setCompletedIds(new Set(ids))
      setIsLoaded(true)
    })()
    return () => { active = false }
  }, [user, careerId])

  // ── Derived values ────────────────────────────────────────────────────────
  // The selected tier's authored blocks — direct lookup, no filtering.
  const blocks = useMemo(
    () => simulation.tiers[selectedTier],
    [simulation, selectedTier],
  )

  // Active block = first non-completed visible block
  const activeBlockId = useMemo(
    () => blocks.find((b) => !completedIds.has(b.id))?.id ?? null,
    [blocks, completedIds],
  )

  const completedCount = useMemo(
    () => blocks.filter((b) => completedIds.has(b.id)).length,
    [blocks, completedIds],
  )

  const progressPct =
    blocks.length > 0 ? (completedCount / blocks.length) * 100 : 0

  // Index of currently-open block in the visible list
  const openBlockIndex = openBlock
    ? blocks.findIndex((b) => b.id === openBlock.id)
    : -1
  const hasNext     = openBlockIndex >= 0 && openBlockIndex < blocks.length - 1
  const hasPrevious = openBlockIndex > 0

  // ── Trigger rating modal when simulation is newly completed ───────────────
  useEffect(() => {
    if (
      blocks.length > 0 &&
      completedCount > prevCompletedCountRef.current &&
      completedCount === blocks.length
    ) {
      // Small delay so the "Mark as Completed" button animation settles
      const t = setTimeout(() => setShowRatingModal(true), 400)
      prevCompletedCountRef.current = completedCount
      return () => clearTimeout(t)
    }
    prevCompletedCountRef.current = completedCount
  }, [completedCount, blocks.length])

  // Reset ref when duration changes so it can re-trigger for a new tier
  useEffect(() => {
    prevCompletedCountRef.current = completedCount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTier])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleMarkComplete = useCallback(
    (id: string) => {
      setCompletedIds((prev) => {
        const next = new Set(prev)
        next.add(id)
        // Persist this tier's completed blocks (within its depth) to Supabase.
        if (user) {
          const completedForTier = blocks.filter((b) => next.has(b.id)).map((b) => b.id)
          void upsertProgress({
            userId:          user.id,
            careerId,
            tier:            selectedTier,
            completedBlocks: completedForTier,
            isCompleted:     completedForTier.length === blocks.length,
          })
        }
        return next
      })
    },
    [careerId, user, selectedTier, blocks],
  )

  const handleNextBlock = useCallback(() => {
    if (openBlockIndex >= 0 && openBlockIndex < blocks.length - 1) {
      setOpenBlock(blocks[openBlockIndex + 1])
    }
  }, [openBlockIndex, blocks])

  const handlePreviousBlock = useCallback(() => {
    if (openBlockIndex > 0) {
      setOpenBlock(blocks[openBlockIndex - 1])
    }
  }, [openBlockIndex, blocks])

  const handleTierChange = useCallback((v: Tier) => {
    setSelectedTier(v)
    setOpenBlock(null)
    // Reset the mobile day to the first day this tier actually spans.
    setMobileDay(simulation.tiers[v][0]?.day ?? 1)
  }, [simulation])

  const handleRatingSubmit = useCallback(
    (rating: number, feedback: SimulationFeedback) => {
      if (user) {
        void saveRating({
          userId:         user.id,
          careerId,
          rating,
          feedback,
          tier: selectedTier,
        })
      }
      // Upgrade favorites status regardless of rating
      void upgradeToActively(careerId)
      setShowRatingModal(false)
    },
    [careerId, user, selectedTier, upgradeToActively],
  )

  const handleRatingDismiss = useCallback(() => {
    // Even when skipping the rating, upgrade favorites if career was already saved
    if (isFavorite(careerId)) {
      upgradeToActively(careerId)
    }
    setShowRatingModal(false)
  }, [careerId, isFavorite, upgradeToActively])

  // ── Login gate ──────────────────────────────────────────────────────────
  // Browsing is public, but a simulation needs an account (progress is saved
  // per user). The beta-access check is layered on top of this in Step 5.
  if (!authLoading && !user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-card border border-border shadow-card max-w-md w-full p-8 text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-tag-bg flex items-center justify-center">
            <LogIn size={22} style={{ color: 'var(--color-teal)' }} />
          </div>
          <h1 className="font-serif text-[24px] font-bold text-navy leading-tight mb-2">
            Log in to start this simulation
          </h1>
          <p className="font-sans text-[14px] text-muted leading-relaxed mb-6">
            Create a free account to step into <span className="font-medium text-dark">{title}</span> —
            your progress saves automatically as you go.
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

  // ── Beta-access gate ──────────────────────────────────────────────────────
  // Logged in, but not yet granted beta access. Exploration stays public;
  // simulations are invite-only while we onboard testers. (authLoading is false
  // here only after the profile — and thus betaAccess — has been fetched.)
  if (!authLoading && user && !betaAccess) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-card border border-border shadow-card max-w-md w-full p-8 text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-tag-bg flex items-center justify-center">
            <Hourglass size={22} style={{ color: 'var(--color-teal)' }} />
          </div>
          <h1 className="font-serif text-[24px] font-bold text-navy leading-tight mb-2">
            You&apos;re on the list
          </h1>
          <p className="font-sans text-[14px] text-muted leading-relaxed mb-6">
            Beta access is granted manually while we onboard testers. We&apos;ll let
            you know as soon as <span className="font-medium text-dark">{title}</span> and
            the other simulations open up for your account.
          </p>
          <Link
            href="/explore"
            className="inline-block px-5 py-2.5 rounded-btn bg-teal text-white font-sans
              font-semibold text-[14px] transition-colors duration-150 hover:bg-teal-light"
          >
            Keep exploring careers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">

        {/* ── Overview section ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-card border border-border shadow-card overflow-hidden mb-8">
          <div className="h-1" style={{ backgroundColor: 'var(--color-teal)' }} />
          <div className="px-6 py-6 lg:px-8 lg:py-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="min-w-0">
                <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-1">
                  {title}
                </p>
                <h1 className="font-serif text-[26px] lg:text-[30px] font-bold text-navy leading-tight mb-3">
                  {project}
                </h1>
                <p className="font-sans text-[14px] text-muted leading-relaxed max-w-2xl">
                  {scenario}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="shrink-0 lg:text-right">
                <p className="font-sans text-[13px] font-medium text-muted mb-1">
                  {completedCount} of {blocks.length} activities completed
                </p>
                <div className="h-2 w-full lg:w-48 rounded-pill bg-border overflow-hidden">
                  <div
                    className="h-full rounded-pill transition-all duration-500"
                    style={{ width: `${progressPct}%`, backgroundColor: 'var(--color-teal)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Duration selector ────────────────────────────────────────────── */}
        <div className="mb-6">
          <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-2">
            Choose your experience
          </p>
          <TierSelector selected={selectedTier} onChange={handleTierChange} />
        </div>

        {/* ── Calendar ─────────────────────────────────────────────────────── */}
        <SimulationCalendar
          blocks={blocks}
          completedIds={completedIds}
          activeBlockId={activeBlockId}
          mobileDay={mobileDay}
          onMobileDayChange={setMobileDay}
          onBlockClick={setOpenBlock}
          isLoading={!isLoaded}
        />
      </div>

      {/* ── Desktop panel ────────────────────────────────────────────────────── */}
      <TimeBlockPanel
        block={openBlock}
        onClose={() => setOpenBlock(null)}
        onMarkComplete={handleMarkComplete}
        onNextBlock={handleNextBlock}
        onPreviousBlock={handlePreviousBlock}
        isCompleted={openBlock ? completedIds.has(openBlock.id) : false}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />

      {/* ── Mobile modal ──────────────────────────────────────────────────────── */}
      <TimeBlockModal
        block={openBlock}
        onClose={() => setOpenBlock(null)}
        onMarkComplete={handleMarkComplete}
        onNextBlock={handleNextBlock}
        onPreviousBlock={handlePreviousBlock}
        isCompleted={openBlock ? completedIds.has(openBlock.id) : false}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />

      {/* ── Rating modal ──────────────────────────────────────────────────────── */}
      <RatingModal
        show={showRatingModal}
        careerId={careerId}
        careerTitle={career?.title ?? title}
        careerEmoji={career?.emoji ?? '💼'}
        tier={selectedTier}
        userName={userName}
        onSubmit={handleRatingSubmit}
        onDismiss={handleRatingDismiss}
      />
    </div>
  )
}
