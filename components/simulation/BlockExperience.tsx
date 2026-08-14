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
import { type TimeBlock, type Tier, type ConnectorSlot } from '@/lib/simulation'
import { CAREERS } from '@/lib/careers'
import { useAuth } from '@/lib/auth'
import { useFavorites } from '@/lib/useFavorites'
import {
  getCompletedBlockIds,
  getOrientationCompletedBlockIds,
  upsertProgress,
} from '@/lib/userProgress'
import { saveVerdict } from '@/lib/roleVerdicts'
import {
  trackTierStarted,
  trackBlockOpened,
  trackBlockCompleted,
  trackBlockMarkedIncomplete,
  trackTierCompleted,
  trackSurveyShown,
  trackSurveySubmitted,
  trackSurveyDismissed,
  type SimulationContext,
} from '@/lib/analytics'
import SimAccessGate from './SimAccessGate'
import SimulationCalendar from './SimulationCalendar'
import OrientationReadingList from './OrientationReadingList'
import TimeBlockPanel from './TimeBlockPanel'
import TimeBlockModal from './TimeBlockModal'
import RatingModal from './RatingModal'

interface Props {
  careerId:    string
  accessLabel: string          // gate copy, e.g. "the Project Fresca simulation"
  scenario:    string          // project slug (every tier, incl. Orientation, is project-scoped)
  tier:        Tier            // current tier (drives writes + the rating payload)
  blocks:      TimeBlock[]     // the blocks to render for the current tier
  header:      ReactNode       // left side of the overview card
  progressNoun?: string        // "activities" (default) | "readings" for Orientation
  selector?:   ReactNode       // optional toggle rendered above the body
  breadcrumb?: ReactNode       // optional back-nav rendered at the very top
  widthClass?: string          // outer container width (default keeps the wide layout)
  variant?:    'calendar' | 'reading'  // 'reading' = Orientation list; default 'calendar'
  footer?:     (allComplete: boolean) => ReactNode  // optional CTA below the body
  connectors?: ConnectorSlot[]         // greyed non-enterable schedule slots (Full week grid)
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
  breadcrumb,
  widthClass = 'max-w-7xl',
  variant = 'calendar',
  footer,
  connectors,
}: Props) {
  const { user, userName, betaAccess, isLoading: authLoading } = useAuth()
  const { isFavorite, upgradeToActively } = useFavorites()
  const career = CAREERS.find((c) => c.id === careerId)

  // Identifying properties shared by every analytics event fired from here.
  const analyticsCtx = useMemo<SimulationContext>(
    () => ({ careerId, scenario, tier }),
    [careerId, scenario, tier],
  )

  // ── State ─────────────────────────────────────────────────────────────────
  const [completedIds, setCompletedIds]       = useState<Set<string>>(new Set())
  const [openBlock, setOpenBlock]             = useState<TimeBlock | null>(null)
  const [mobileDay, setMobileDay]             = useState(blocks[0]?.day ?? 1)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [isLoaded, setIsLoaded]               = useState(false)

  const prevCompletedCountRef = useRef(0)

  // Which (scenario, tier) pairs have already reported tier_started during THIS
  // page load. A ref, not state, so it never triggers a render — and because it
  // lives for the component's lifetime, a soft navigation to another route
  // remounts and legitimately starts fresh.
  const startedTiersRef = useRef<Set<string>>(new Set())

  // ── tier_started ──────────────────────────────────────────────────────────
  // Fires once per tier the user actually reaches. Gated on access because this
  // component mounts (and its effects run) even when SimAccessGate is showing the
  // login or beta-waitlist card instead of the tier — firing there would count
  // people who never saw the experience. Switching Day-in-the-Life → Full inside
  // the project page is a genuine new tier entry and does fire again; re-renders
  // and returning to a tier already entered this page load do not.
  useEffect(() => {
    if (authLoading || !user || !betaAccess) return
    const key = `${scenario}:${tier}`
    if (startedTiersRef.current.has(key)) return
    startedTiersRef.current.add(key)
    trackTierStarted(analyticsCtx)
  }, [authLoading, user, betaAccess, scenario, tier, analyticsCtx])

  // ── block_opened ──────────────────────────────────────────────────────────
  // Keyed on the open block's id rather than on the click handlers, so it counts
  // every block the panel/modal actually displays — whether the user got there by
  // clicking the calendar, the reading list, or the panel's Next/Previous
  // controls — exactly once per display.
  useEffect(() => {
    if (!openBlock) return
    trackBlockOpened(analyticsCtx, openBlock.id, openBlock.activityType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openBlock?.id])

  // Load completed block ids for this user. Orientation is signalled by the tier
  // (no longer by a null scenario) and reads that project's orientation rows; the
  // other tiers read all of the project's rows.
  useEffect(() => {
    if (!user) {
      setIsLoaded(true)
      return
    }
    let active = true
    ;(async () => {
      const ids = tier === 'orientation'
        ? await getOrientationCompletedBlockIds(user.id, careerId, scenario)
        : await getCompletedBlockIds(user.id, careerId, scenario)
      if (!active) return
      const idSet = new Set(ids)
      setCompletedIds(idSet)
      // Seed the completion baseline from what just loaded, so an experience that
      // arrives ALREADY complete is not mistaken for a fresh completion (which
      // would pop the rating modal on load). Only an increase during this session
      // — i.e. the user finishing the final block now — triggers the modal.
      prevCompletedCountRef.current = blocks.filter((b) => idSet.has(b.id)).length
      setIsLoaded(true)
    })()
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, careerId, scenario, tier])

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
  const allComplete = blocks.length > 0 && completedCount === blocks.length

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

  // Trigger the rating modal when the current tier is newly completed. The
  // feedback survey is intentionally NOT shown for Orientation — only for the
  // Day-in-the-Life and Full Simulation tiers.
  useEffect(() => {
    if (
      tier !== 'orientation' &&
      blocks.length > 0 &&
      completedCount > prevCompletedCountRef.current &&
      completedCount === blocks.length
    ) {
      const t = setTimeout(() => {
        setShowRatingModal(true)
        trackSurveyShown(analyticsCtx)
      }, 400)
      prevCompletedCountRef.current = completedCount
      return () => clearTimeout(t)
    }
    prevCompletedCountRef.current = completedCount
  }, [completedCount, blocks.length, tier, analyticsCtx])

  // ── Handlers ──────────────────────────────────────────────────────────────
  // Toggle a block complete/incomplete and persist the change to the shared
  // user_progress store, so the hub tier counts, the stepper, and the dashboard
  // all stay in sync (they read the same source).
  const handleToggleComplete = useCallback(
    (id: string, complete: boolean) => {
      // The next set is computed here rather than inside a setCompletedIds
      // updater. React runs updater functions twice in development, which was
      // firing the Supabase write twice (harmless for an upsert, but it would
      // double every analytics event below). `completedIds` is a dependency of
      // this callback, so reading it directly is just as current.
      const next = new Set(completedIds)
      if (complete) next.add(id)
      else next.delete(id)
      setCompletedIds(next)

      if (user) {
        const completedForTier = blocks.filter((b) => next.has(b.id)).map((b) => b.id)
        const tierComplete = blocks.length > 0 && completedForTier.length === blocks.length
        void upsertProgress({
          userId:          user.id,
          careerId,
          scenario,
          tier,
          completedBlocks: completedForTier,
          isCompleted:     tierComplete,
        }).then((saved) => {
          // The write is the source of truth: if Supabase rejected it, the user's
          // progress did not change, so nothing is reported.
          if (!saved) return
          if (complete) {
            trackBlockCompleted(analyticsCtx, id)
            // Same condition that reveals the completion card.
            if (tierComplete) trackTierCompleted(analyticsCtx, blocks.length)
          } else {
            trackBlockMarkedIncomplete(analyticsCtx, id)
          }
        })
      }
      // Clean exit: marking the FINAL block of Orientation or Day-in-the-Life
      // complete closes the open panel/modal and lands the user on the overview,
      // where the completion card shows. (Full Simulation is left unchanged.)
      if (complete && (tier === 'orientation' || tier === 'day-in-life')) {
        const completesTier =
          blocks.length > 0 && blocks.every((b) => b.id === id || completedIds.has(b.id))
        if (completesTier) setOpenBlock(null)
      }
    },
    [careerId, scenario, tier, user, blocks, completedIds, analyticsCtx],
  )

  const handleNextBlock = useCallback(() => {
    if (openBlockIndex >= 0 && openBlockIndex < blocks.length - 1) setOpenBlock(blocks[openBlockIndex + 1])
  }, [openBlockIndex, blocks])

  const handlePreviousBlock = useCallback(() => {
    if (openBlockIndex > 0) setOpenBlock(blocks[openBlockIndex - 1])
  }, [openBlockIndex, blocks])

  const handleRatingSubmit = useCallback(
    (rating: number, liked: string, disliked: string) => {
      if (user) {
        // Writes to role_verdicts only. The old `ratings` table is no longer
        // written to from here; its historical rows stay where they are.
        void saveVerdict(
          user.id,
          careerId,
          scenario,
          tier,
          rating,
          liked,
          disliked,
          new Date().toISOString(),
        )
      }
      void upgradeToActively(careerId)
      trackSurveySubmitted(analyticsCtx, rating)
      setShowRatingModal(false)
    },
    [careerId, scenario, tier, user, upgradeToActively, analyticsCtx],
  )

  const handleRatingDismiss = useCallback(() => {
    if (isFavorite(careerId)) upgradeToActively(careerId)
    trackSurveyDismissed(analyticsCtx)
    setShowRatingModal(false)
  }, [careerId, isFavorite, upgradeToActively, analyticsCtx])

  return (
    <SimAccessGate label={accessLabel}>
      <div className="min-h-[calc(100vh-4rem)] bg-cream">
        <div className={`${widthClass} mx-auto px-4 lg:px-6 py-8`}>

          {/* ── Back-navigation breadcrumb (optional) ─────────────────────────── */}
          {breadcrumb}

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

          {/* ── Body: reading list (Orientation) or calendar ──────────────────── */}
          {variant === 'reading' ? (
            <OrientationReadingList
              blocks={blocks}
              completedIds={completedIds}
              activeBlockId={activeBlockId}
              onBlockClick={setOpenBlock}
            />
          ) : (
            <SimulationCalendar
              blocks={blocks}
              connectors={connectors}
              completedIds={completedIds}
              activeBlockId={activeBlockId}
              mobileDay={mobileDay}
              onMobileDayChange={setMobileDay}
              onBlockClick={setOpenBlock}
              isLoading={!isLoaded}
            />
          )}

          {/* ── Optional forward CTA (e.g. end-of-Orientation next step) ──────── */}
          {footer && footer(allComplete)}
        </div>

        <TimeBlockPanel
          block={openBlock}
          onClose={() => setOpenBlock(null)}
          onToggleComplete={handleToggleComplete}
          onNextBlock={handleNextBlock}
          onPreviousBlock={handlePreviousBlock}
          isCompleted={openBlock ? completedIds.has(openBlock.id) : false}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />

        <TimeBlockModal
          block={openBlock}
          onClose={() => setOpenBlock(null)}
          onToggleComplete={handleToggleComplete}
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
