'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { type Simulation, type TimeBlock, type DurationOption } from '@/lib/simulation'
import { CAREERS } from '@/lib/careers'
import { useAuth } from '@/lib/auth'
import { useFavorites } from '@/lib/useFavorites'
import { saveRating, type SimulationFeedback } from '@/lib/userProgress'
import DurationSelector from './DurationSelector'
import SimulationCalendar from './SimulationCalendar'
import TimeBlockPanel from './TimeBlockPanel'
import TimeBlockModal from './TimeBlockModal'
import RatingModal from './RatingModal'

interface Props {
  simulation: Simulation
}

const STORAGE_KEY = (careerId: string) => `cc_sim_${careerId}_completed`

export default function SimulationClient({ simulation }: Props) {
  const { careerId, title, scenario, project, timeBlocks } = simulation
  const { userName } = useAuth()
  const { isFavorite, upgradeToActively } = useFavorites()

  // Career metadata for rating modal
  const career = CAREERS.find((c) => c.id === careerId)

  // ── State ─────────────────────────────────────────────────────────────────
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>(30)
  const [completedIds, setCompletedIds]         = useState<Set<string>>(new Set())
  const [openBlock, setOpenBlock]               = useState<TimeBlock | null>(null)
  const [mobileDay, setMobileDay]               = useState(1)
  const [showRatingModal, setShowRatingModal]   = useState(false)
  const [isLoaded, setIsLoaded]                 = useState(false)

  // Track previous completedCount to detect when we newly cross the finish line
  const prevCompletedCountRef = useRef(0)

  // Load completed IDs from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY(careerId))
      if (raw) setCompletedIds(new Set(JSON.parse(raw) as string[]))
    } catch {
      // ignore parse errors
    }
    setIsLoaded(true)
  }, [careerId])

  // ── Derived values ────────────────────────────────────────────────────────
  const visibleBlocks = useMemo(
    () => timeBlocks.filter((b) => b.minDuration <= selectedDuration),
    [timeBlocks, selectedDuration],
  )

  // Active block = first non-completed visible block
  const activeBlockId = useMemo(
    () => visibleBlocks.find((b) => !completedIds.has(b.id))?.id ?? null,
    [visibleBlocks, completedIds],
  )

  const completedCount = useMemo(
    () => visibleBlocks.filter((b) => completedIds.has(b.id)).length,
    [visibleBlocks, completedIds],
  )

  const progressPct =
    visibleBlocks.length > 0 ? (completedCount / visibleBlocks.length) * 100 : 0

  // Index of currently-open block in the visible list
  const openBlockIndex = openBlock
    ? visibleBlocks.findIndex((b) => b.id === openBlock.id)
    : -1
  const hasNext     = openBlockIndex >= 0 && openBlockIndex < visibleBlocks.length - 1
  const hasPrevious = openBlockIndex > 0

  // ── Trigger rating modal when simulation is newly completed ───────────────
  useEffect(() => {
    if (
      visibleBlocks.length > 0 &&
      completedCount > prevCompletedCountRef.current &&
      completedCount === visibleBlocks.length
    ) {
      // Small delay so the "Mark as Completed" button animation settles
      const t = setTimeout(() => setShowRatingModal(true), 400)
      prevCompletedCountRef.current = completedCount
      return () => clearTimeout(t)
    }
    prevCompletedCountRef.current = completedCount
  }, [completedCount, visibleBlocks.length])

  // Reset ref when duration changes so it can re-trigger for a new tier
  useEffect(() => {
    prevCompletedCountRef.current = completedCount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDuration])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleMarkComplete = useCallback(
    (id: string) => {
      setCompletedIds((prev) => {
        const next = new Set(prev)
        next.add(id)
        try {
          localStorage.setItem(STORAGE_KEY(careerId), JSON.stringify(Array.from(next)))
        } catch {
          // ignore
        }
        return next
      })
    },
    [careerId],
  )

  const handleNextBlock = useCallback(() => {
    if (openBlockIndex >= 0 && openBlockIndex < visibleBlocks.length - 1) {
      setOpenBlock(visibleBlocks[openBlockIndex + 1])
    }
  }, [openBlockIndex, visibleBlocks])

  const handlePreviousBlock = useCallback(() => {
    if (openBlockIndex > 0) {
      setOpenBlock(visibleBlocks[openBlockIndex - 1])
    }
  }, [openBlockIndex, visibleBlocks])

  const handleDurationChange = useCallback((v: DurationOption) => {
    setSelectedDuration(v)
    setOpenBlock(null)
  }, [])

  const handleRatingSubmit = useCallback(
    (rating: number, feedback: SimulationFeedback) => {
      if (userName) {
        saveRating({
          id:             `${Date.now()}-${Math.random()}`,
          careerId,
          userName,
          rating,
          feedback,
          durationOption: selectedDuration,
          completedAt:    new Date().toISOString(),
        })
      }
      // Upgrade favorites status regardless of rating
      upgradeToActively(careerId)
      setShowRatingModal(false)
    },
    [careerId, userName, selectedDuration, upgradeToActively],
  )

  const handleRatingDismiss = useCallback(() => {
    // Even when skipping the rating, upgrade favorites if career was already saved
    if (isFavorite(careerId)) {
      upgradeToActively(careerId)
    }
    setShowRatingModal(false)
  }, [careerId, isFavorite, upgradeToActively])

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
                  {completedCount} of {visibleBlocks.length} activities completed
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
            Simulation depth
          </p>
          <DurationSelector selected={selectedDuration} onChange={handleDurationChange} />
        </div>

        {/* ── Calendar ─────────────────────────────────────────────────────── */}
        <SimulationCalendar
          timeBlocks={timeBlocks}
          selectedDuration={selectedDuration}
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
        durationOption={selectedDuration}
        userName={userName}
        onSubmit={handleRatingSubmit}
        onDismiss={handleRatingDismiss}
      />
    </div>
  )
}
