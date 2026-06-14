'use client'

// Shared engine for a single block experience (Orientation, Day-in-the-Life, or
// Full Simulation). Owns progress load/save, the open-block panel/modal, the
// completion → rating flow, and the overview card shell. The caller supplies the
// header text, the blocks to render, the scope (scenario), and the tier; it may
// also pass an optional selector node (the in-project Day-in-the-Life / Full
// toggle). Orientation passes scenario=null (career-level); projects pass the
// scenario slug. Progress/ratings keying is unchanged from before.
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import { type TimeBlock, type Tier } from '@/lib/simulation'
import { CAREERS } from '@/lib/careers'
import { useAuth } from '@/lib/auth'
import { useFavorites } from '@/lib/useFavorites'
import {
  saveRating,
  getCompletedBlockIds,
  getOrientationCompletedBlockIds,
  upsertProgress,
  type SimulationFeedback,
} from '@/lib/userProgress'
import SimAccessGate from './SimAccessGate'
import SimulationCalendar from './SimulationCalendar'
import TimeBlockPanel from './TimeBlockPanel'
import TimeBlockModal from './TimeBlockModal'
import RatingModal from './RatingModal'

interface Props {
  careerId:    string
  accessLabel: string          // gate copy, e.g. "the Project Fresca simulation"
  scenario:    string | null   // null = career-level Orientation; slug = a project
  tier:        Tier            // current tier (drives writes + the rating payload)
  blocks:      TimeBlock[]     // the blocks to render for the current tier
  header:      ReactNode       // left side of the overview card
  progressNoun?: string        // "activities" (default) | "readings" for Orientation
  selector?:   ReactNode       // optional toggle rendered above the calendar
}

export default function BlockExperience({
  careerId,
  accessLabel,
  scenario,
  tier,
  blocks,
  header,
  progressNoun = 'activities',
  selector,
}: Props) {
  const { user, userName } = useAuth()
  const { isFavorite, upgradeToActively } = useFavorites()
  const career = CAREERS.find((c) => c.id === careerId)

  // ── State ─────────────────────────────────────────────────────────────────
  const [completedIds, setCompletedIds]       = useState<Set<string>>(new Set())
  const [openBlock, setOpenBlock]             = useState<TimeBlock | null>(null)
  const [mobileDay, setMobileDay]             = useState(blocks[0]?.day ?? 1)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [isLoaded, setIsLoaded]               = useState(false)

  const prevCompletedCountRef = useRef(0)

  // Load completed block ids for this user. Orientation (scenario null) is
  // career-level; a project loads its scenario-scoped (plus shared) rows.
  useEffect(() => {
    if (!user) {
      setIsLoaded(true)
      return
    }
    let active = true
    ;(async () => {
      const ids = scenario === null
        ? await getOrientationCompletedBlockIds(user.id, careerId)
        : await getCompletedBlockIds(user.id, careerId, scenario)
      if (!active) return
      setCompletedIds(new Set(ids))
      setIsLoaded(true)
    })()
    return () => { active = false }
  }, [user, careerId, scenario])

  // ── Derived values ────────────────────────────────────────────────────────
  const activeBlockId = useMemo(
    () => blocks.find((b) => !completedIds.has(b.id))?.id ?? null,
    [blocks, completedIds],
  )
  const completedCount = useMemo(
    () => blocks.filter((b) => completedIds.has(b.id)).length,
    [blocks, completedIds],
  )
  const progressPct = blocks.length > 0 ? (completedCount / blocks.length) * 100 : 0

  const openBlockIndex = openBlock ? blocks.findIndex((b) => b.id === openBlock.id) : -1
  const hasNext     = openBlockIndex >= 0 && openBlockIndex < blocks.length - 1
  const hasPrevious = openBlockIndex > 0

  // Reset the open block + mobile day when the tier (and thus blocks) changes.
  useEffect(() => {
    setOpenBlock(null)
    setMobileDay(blocks[0]?.day ?? 1)
    prevCompletedCountRef.current = completedCount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier])

  // Trigger the rating modal when the current tier is newly completed.
  useEffect(() => {
    if (
      blocks.length > 0 &&
      completedCount > prevCompletedCountRef.current &&
      completedCount === blocks.length
    ) {
      const t = setTimeout(() => setShowRatingModal(true), 400)
      prevCompletedCountRef.current = completedCount
      return () => clearTimeout(t)
    }
    prevCompletedCountRef.current = completedCount
  }, [completedCount, blocks.length])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleMarkComplete = useCallback(
    (id: string) => {
      setCompletedIds((prev) => {
        const next = new Set(prev)
        next.add(id)
        if (user) {
          const completedForTier = blocks.filter((b) => next.has(b.id)).map((b) => b.id)
          void upsertProgress({
            userId:          user.id,
            careerId,
            scenario,
            tier,
            completedBlocks: completedForTier,
            isCompleted:     completedForTier.length === blocks.length,
          })
        }
        return next
      })
    },
    [careerId, scenario, tier, user, blocks],
  )

  const handleNextBlock = useCallback(() => {
    if (openBlockIndex >= 0 && openBlockIndex < blocks.length - 1) setOpenBlock(blocks[openBlockIndex + 1])
  }, [openBlockIndex, blocks])

  const handlePreviousBlock = useCallback(() => {
    if (openBlockIndex > 0) setOpenBlock(blocks[openBlockIndex - 1])
  }, [openBlockIndex, blocks])

  const handleRatingSubmit = useCallback(
    (rating: number, feedback: SimulationFeedback) => {
      if (user) {
        void saveRating({ userId: user.id, careerId, scenario, rating, feedback, tier })
      }
      void upgradeToActively(careerId)
      setShowRatingModal(false)
    },
    [careerId, scenario, tier, user, upgradeToActively],
  )

  const handleRatingDismiss = useCallback(() => {
    if (isFavorite(careerId)) upgradeToActively(careerId)
    setShowRatingModal(false)
  }, [careerId, isFavorite, upgradeToActively])

  return (
    <SimAccessGate label={accessLabel}>
      <div className="min-h-[calc(100vh-4rem)] bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">

          {/* ── Overview card ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-card border border-border shadow-card overflow-hidden mb-8">
            <div className="h-1" style={{ backgroundColor: 'var(--color-teal)' }} />
            <div className="px-6 py-6 lg:px-8 lg:py-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="min-w-0">{header}</div>
                <div className="shrink-0 lg:text-right">
                  <p className="font-sans text-[13px] font-medium text-muted mb-1">
                    {completedCount} of {blocks.length} {progressNoun} completed
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

          {/* ── Optional experience toggle ─────────────────────────────────── */}
          {selector && <div className="mb-6">{selector}</div>}

          {/* ── Calendar ───────────────────────────────────────────────────── */}
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

        <RatingModal
          show={showRatingModal}
          careerId={careerId}
          careerTitle={career?.title ?? accessLabel}
          careerEmoji={career?.emoji ?? '💼'}
          tier={tier}
          userName={userName}
          onSubmit={handleRatingSubmit}
          onDismiss={handleRatingDismiss}
        />
      </div>
    </SimAccessGate>
  )
}
