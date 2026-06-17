'use client'

// Simulation landing page for a career. Shows the shared, career-level
// Orientation prominently on top (its own route), then the projects presented
// TYPE-FIRST, each with two direct entry buttons: Day in the Life and Full
// Simulation. No "scenario" wording — the user sees "project".
//
// PHASE 2: the page now responds to real Orientation progress. The three-step
// indicator, the Orientation banner, and a SOFT gate on the project tiers all
// react to whether the current user has finished Orientation.
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ArrowRight, ChevronRight, Check } from 'lucide-react'
import type { CareerSim, Scenario } from '@/lib/simulation'
import { useAuth } from '@/lib/auth'
import { getProgressByCareer } from '@/lib/userProgress'
import ProjectFocusCard from './ProjectFocusCard'
import SoftGateDialog from './SoftGateDialog'

interface Props {
  careerSim: CareerSim
}

// The flow stepper now mirrors the experience sequence (Phase 4). Steps 2 and 3
// reflect the CURRENTLY SELECTED project's Day-in-the-Life and Full tiers.
const FLOW_STEPS = ['Orientation', 'Day in the Life', 'Full Simulation']

// All blocks of a scenario across both tiers (used for chip rollups + default pick).
function scenarioBlocks(sc: Scenario) {
  return [...sc.tiers['day-in-life'], ...sc.tiers.full]
}

export default function SimulationLanding({ careerSim }: Props) {
  const { careerId, careerSlug, title, orientation, scenarios } = careerSim
  const { user } = useAuth()
  const router = useRouter()

  const orientationHref = `/careers/${careerSlug}/orientation`

  // ── LIVE STATE (Phase 2 + 3) ────────────────────────────────────────────────
  // One fetch of the career's completed block ids (the dashboard's source).
  // `null` while we don't yet know (initial / loading). The same set drives both
  // Orientation completeness AND each project tier's per-tier progress (block ids
  // are globally unique, so the union set is safe to query per tier).
  const [completedSet, setCompletedSet] = useState<Set<string> | null>(null)

  useEffect(() => {
    let cancelled = false
    // Logged out → no progress yet (empty set, not loading).
    if (!user) { setCompletedSet(new Set()); return }
    getProgressByCareer(user.id).then((map) => {
      if (cancelled) return
      setCompletedSet(new Set(map[careerId] ?? []))
    })
    return () => { cancelled = true }
  }, [user, careerId])

  // Orientation is complete when every orientation block id is in the set. No
  // orientation content → treat as not-blocking. `null` set means still loading.
  const orientationComplete =
    completedSet === null
      ? null
      : orientation.length === 0 || orientation.every((b) => completedSet.has(b.id))

  // Definitively incomplete (not just loading) — drives the gate, hint, banner.
  const isIncomplete = orientationComplete === false

  // ── Soft gate ───────────────────────────────────────────────────────────────
  const [gateOpen, setGateOpen]     = useState(false)
  const [pendingHref, setPendingHref] = useState<string | null>(null)

  function handleTierClick(e: React.MouseEvent, href: string) {
    // Only intercept when we KNOW Orientation is incomplete. While loading
    // (null) or once complete, the Link navigates normally.
    if (!isIncomplete) return
    e.preventDefault()
    setPendingHref(href)
    setGateOpen(true)
  }

  function closeGate() {
    setGateOpen(false)
    setPendingHref(null)
  }

  // ── Project selection (Phase 4) ─────────────────────────────────────────────
  // Only one project is expanded at a time (when there is more than one). The
  // default is the last project the user engaged with — but see note: the
  // progress source exposes no timestamps, so among MULTIPLE in-progress
  // projects we fall back to the first one (in list order) that has progress.
  const [selectedSlug, setSelectedSlug] = useState<string>(scenarios[0]?.slug ?? '')
  const userPicked = useRef(false)

  // Two modes for multi-project careers: CHOOSE (light tile grid, no progress
  // anywhere) and FOCUS (one prominent project + switch chips). Single-project
  // careers are always FOCUS with no chooser chrome.
  const [mode, setMode] = useState<'choose' | 'focus'>('focus')
  const isMulti = scenarios.length > 1

  useEffect(() => {
    if (completedSet === null || userPicked.current) return
    const withProgress = scenarios.filter((sc) =>
      scenarioBlocks(sc).some((b) => completedSet.has(b.id)),
    )
    if (!isMulti) {
      // Single project → always Focus, on that one project.
      setSelectedSlug(scenarios[0]?.slug ?? '')
      setMode('focus')
    } else if (withProgress.length > 0) {
      // Progress somewhere → Focus on the first in-progress project (no
      // timestamps in the data, so "most recently engaged" isn't determinable).
      setSelectedSlug(withProgress[0].slug)
      setMode('focus')
    } else {
      // Fresh, multi-project → start by choosing.
      setMode('choose')
    }
  }, [completedSet, scenarios, isMulti])

  // A manual chip/tile pick persists for the session and switches to Focus.
  function pickProject(slug: string) {
    userPicked.current = true
    setSelectedSlug(slug)
    setMode('focus')
  }
  // "View all projects" returns to the Choose grid (manual, so it persists).
  function viewAllProjects() {
    userPicked.current = true
    setMode('choose')
  }

  const selected = scenarios.find((s) => s.slug === selectedSlug) ?? scenarios[0]
  // Selected first, then the rest in their original order.
  const orderedScenarios = selected
    ? [selected, ...scenarios.filter((s) => s.slug !== selected.slug)]
    : scenarios

  // Per-project rollup for the chip status dot/check (both tiers combined).
  function scenarioStatus(sc: Scenario): 'not-started' | 'in-progress' | 'done' {
    if (!completedSet) return 'not-started'
    const blocks = scenarioBlocks(sc)
    const done = blocks.filter((b) => completedSet.has(b.id)).length
    if (done === 0) return 'not-started'
    return done >= blocks.length ? 'done' : 'in-progress'
  }

  // ── Stepper status (Phase 4) ────────────────────────────────────────────────
  // Steps 2 and 3 track the SELECTED project's tiers. The active step is the
  // earliest not-complete step in the 1→2→3 sequence.
  const dayBlocks  = selected?.tiers['day-in-life'] ?? []
  const fullBlocks = selected?.tiers.full ?? []
  const hasSet     = completedSet !== null
  const dayDone    = hasSet && dayBlocks.length  > 0 && dayBlocks.every((b) => completedSet!.has(b.id))
  const dayAny     = hasSet && dayBlocks.some((b) => completedSet!.has(b.id))
  const fullDone   = hasSet && fullBlocks.length > 0 && fullBlocks.every((b) => completedSet!.has(b.id))
  const fullAny    = hasSet && fullBlocks.some((b) => completedSet!.has(b.id))
  const oriDone    = orientationComplete === true
  // earliest not-complete step: 0 Orientation → 1 Day → 2 Full → -1 (all done)
  const activeIndex = !oriDone ? 0 : !dayDone ? 1 : !fullDone ? 2 : -1

  function stepStatus(i: number): 'done' | 'active' | 'in-progress' | 'upcoming' {
    if (i === 0) return oriDone ? 'done' : 'active'
    // Choose mode: no project is focused, so steps 2/3 stay neutral upcoming.
    if (mode === 'choose') return 'upcoming'
    if (i === 1) return dayDone ? 'done' : activeIndex === 1 ? 'active' : dayAny ? 'in-progress' : 'upcoming'
    return fullDone ? 'done' : activeIndex === 2 ? 'active' : fullAny ? 'in-progress' : 'upcoming'
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
      {/* Single centered content column for the whole hub. Adjust HUB WIDTH here
          (~66% of viewport on wide screens, capped at 1100px; fills width on mobile). */}
      <div className="w-full lg:w-[min(66vw,1100px)] mx-auto px-4 lg:px-6 py-8">

        {/* Breadcrumb back-navigation */}
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex items-center gap-1.5 font-sans text-[13px] text-muted">
            <li>
              <Link
                href="/explore"
                className="rounded hover:text-teal transition-colors duration-150
                  focus-visible:outline-none focus-visible:ring-2"
              >
                Explore
              </Link>
            </li>
            <ChevronRight size={14} className="text-muted/60 shrink-0" aria-hidden="true" />
            <li>
              <Link
                href={`/careers/${careerSlug}`}
                className="rounded hover:text-teal transition-colors duration-150
                  focus-visible:outline-none focus-visible:ring-2"
              >
                {title}
              </Link>
            </li>
            <ChevronRight size={14} className="text-muted/60 shrink-0" aria-hidden="true" />
            <li>
              <span className="text-dark font-medium" aria-current="page">
                Simulation
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-1">
          {title}
        </p>
        <h1 className="font-serif text-[26px] lg:text-[30px] font-bold text-navy leading-tight mb-2">
          Choose a project
        </h1>
        <p className="font-sans text-[14px] text-muted leading-relaxed max-w-2xl mb-6">
          New here? Start with the Orientation to understand the role. Then step into any
          project — try a Day in the Life, or commit to the Full Simulation.
        </p>

        {/* Intended-order indicator — the experience sequence (Phase 4).
            Steps 2/3 reflect the selected project; chevrons show left→right order. */}
        <ol
          className="flex items-center gap-1.5 sm:gap-2 mb-8 overflow-x-auto"
          aria-label="Intended order"
        >
          {FLOW_STEPS.map((label, i) => {
            const status = stepStatus(i)
            const isActive = status === 'active'
            const isDone   = status === 'done'
            const isProg   = status === 'in-progress'
            return (
              <li key={label} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-full
                      text-[12px] font-semibold transition-colors
                      ${isActive || isDone
                        ? 'bg-teal text-white'
                        : isProg
                          ? 'bg-white border border-teal text-teal'
                          : 'bg-white border border-border text-muted'}`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {isDone ? <Check size={13} strokeWidth={3} aria-hidden="true" /> : i + 1}
                  </span>
                  <span
                    className={`font-sans text-[12px] whitespace-nowrap
                      ${isActive ? 'text-navy font-semibold'
                        : isDone || isProg ? 'text-teal font-medium'
                        : 'text-muted'}`}
                  >
                    {label}
                  </span>
                </span>
                {i < FLOW_STEPS.length - 1 && (
                  <ChevronRight size={16} className="text-muted/50 shrink-0" aria-hidden="true" />
                )}
              </li>
            )
          })}
        </ol>

        {/* Shared, career-level Orientation. Prominent while incomplete; collapses
            to a slim "complete · revisit" bar once finished, freeing space. */}
        {orientation.length > 0 && (
          orientationComplete ? (
            // ── Complete: slim, quiet "done · revisit" bar ──────────────────────
            <Link
              href={orientationHref}
              className="group flex items-center gap-3 rounded-card border shadow-card mb-8
                px-4 py-3 transition-shadow duration-200 hover:shadow-card-hover
                focus-visible:outline-none focus-visible:ring-2"
              style={{ borderColor: 'var(--color-teal)', backgroundColor: 'var(--color-tag-bg)' }}
            >
              {/* Step "1" badge (flow numbering), styled like the tier step circles. */}
              <span className="shrink-0 w-7 h-7 rounded-full bg-teal flex items-center justify-center
                font-sans text-[12px] font-semibold text-white">
                1
              </span>
              <span className="inline-flex items-center gap-1 font-sans text-[13px] font-semibold text-navy">
                <Check size={13} strokeWidth={3} className="text-teal" aria-hidden="true" />
                Orientation complete
              </span>
              <span className="font-sans text-[12px] text-dark/60">
                · {orientation.length} of {orientation.length} readings complete
              </span>
              <span className="ml-auto font-sans text-[13px] font-semibold text-teal
                inline-flex items-center gap-1">
                Revisit
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ) : (
            // ── Incomplete: prominent, lit starting action ──────────────────────
            <Link
              href={orientationHref}
              className="group block rounded-card border-2 shadow-card overflow-hidden mb-10
                transition-shadow duration-200 hover:shadow-card-hover
                focus-visible:outline-none focus-visible:ring-2"
              style={{ borderColor: 'var(--color-teal)', backgroundColor: 'var(--color-tag-bg)' }}
            >
              <div className="px-6 py-5 flex items-center gap-4">
                {/* Step "1" badge (flow numbering), styled like the tier step circles. */}
                <span className="shrink-0 w-10 h-10 rounded-full bg-teal flex items-center justify-center
                  font-sans text-[16px] font-bold text-white">
                  1
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[11px] font-semibold text-teal uppercase tracking-wide mb-0.5">
                    Recommended first step
                  </p>
                  <h2 className="font-sans font-bold text-[17px] text-navy mb-0.5">
                    Start here — Orientation
                  </h2>
                  <p className="font-sans text-[13px] text-dark/70">
                    Understand the role before any project · {orientation.length} short reading{orientation.length === 1 ? '' : 's'}
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  style={{ color: 'var(--color-teal)' }}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          )
        )}

        {/* Projects — type-first */}
        <div className="flex items-baseline justify-between gap-3 mb-1 flex-wrap">
          <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide">
            Projects
          </p>
          {/* Visible steer BEFORE the click, only while Orientation is incomplete. */}
          {isIncomplete && (
            <span className="inline-flex items-center gap-1.5 font-sans text-[12px] text-teal">
              <BookOpen size={13} aria-hidden="true" />
              Recommended: start with Orientation
            </span>
          )}
        </div>
        {/* Framing line — Choose mode only (multi-project). */}
        {isMulti && mode === 'choose' && (
          <p className="font-sans text-[13px] text-muted mb-4">
            Pick a project to explore a day in the life.
          </p>
        )}

        {/* FOCUS-mode controls: switch chips + "view all projects" (multi only).
            Constrained to the same ~560px width as the Focus card and left-aligned,
            so "View all projects" sits at the card's right edge. The chip strip
            takes the remaining width and scrolls horizontally on overflow (no wrap);
            "View all" stays pinned at the right and never scrolls. A right-edge
            fade mask signals more chips when the strip is scrollable. */}
        {isMulti && mode === 'focus' && (
          <div className="flex items-center gap-3 mb-3">
            <div
              role="tablist"
              aria-label="Switch project"
              className="flex gap-2 flex-1 min-w-0 overflow-x-auto no-scrollbar"
              style={{
                maskImage: 'linear-gradient(to right, #000 calc(100% - 28px), transparent)',
                WebkitMaskImage: 'linear-gradient(to right, #000 calc(100% - 28px), transparent)',
              }}
            >
              {orderedScenarios.map((sc) => {
                const isSel = sc.slug === selected?.slug
                const status = scenarioStatus(sc)
                return (
                  <button
                    key={sc.id}
                    role="tab"
                    type="button"
                    aria-selected={isSel}
                    onClick={() => pickProject(sc.slug)}
                    // Keep a keyboard-focused chip visible inside the scrollable strip.
                    onFocus={(e) => e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' })}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-pill border px-3 py-1
                      font-sans text-[12px] font-medium transition-colors duration-150
                      focus-visible:outline-none focus-visible:ring-2
                      ${isSel
                        ? 'bg-teal border-teal text-white'
                        : 'bg-white border-border text-dark hover:border-teal hover:text-teal'}`}
                  >
                    <span className="whitespace-nowrap">
                      {sc.type ? `${sc.type} · ${sc.title}` : sc.title}
                    </span>
                    {status === 'done' && (
                      <Check size={12} strokeWidth={3} aria-label="Completed"
                        className={isSel ? 'text-white' : 'text-teal'} />
                    )}
                    {status === 'in-progress' && (
                      <span role="img" aria-label="In progress"
                        className={`w-1.5 h-1.5 rounded-full ${isSel ? 'bg-white' : 'bg-teal'}`} />
                    )}
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              onClick={viewAllProjects}
              className="font-sans text-[12px] font-semibold text-muted hover:text-teal shrink-0
                transition-colors duration-150 rounded focus-visible:outline-none focus-visible:ring-2"
            >
              View all projects
            </button>
          </div>
        )}

        {/* Body — Choose grid OR Focus card. Single-project always renders the
            Focus card directly (isMulti false → no chooser chrome above). */}
        {isMulti && mode === 'choose' ? (
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}
          >
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => pickProject(sc.slug)}
                className="group text-left bg-white rounded-card border border-border border-t-[3px]
                  shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200
                  p-4 flex flex-col focus-visible:outline-none focus-visible:ring-2"
                style={{ borderTopColor: 'var(--color-teal)' }}
              >
                <span className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide">
                  {sc.type ?? 'Project'}
                </span>
                <span className="font-serif text-[18px] font-bold text-navy leading-tight mt-0.5">
                  {sc.title}
                </span>
                <span className="font-sans text-[13px] text-muted leading-snug mt-1.5 line-clamp-1">
                  {sc.scenario}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 font-sans text-[13px] font-semibold text-teal">
                  Explore
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected?.slug ?? 'none'}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {selected && (
                <ProjectFocusCard
                  scenario={selected}
                  careerSlug={careerSlug}
                  completed={completedSet}
                  onTierClick={handleTierClick}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Soft gate — recommends Orientation, never locks. */}
      <SoftGateDialog
        open={gateOpen}
        onClose={closeGate}
        onGoToOrientation={() => { closeGate(); router.push(orientationHref) }}
        onStartAnyway={() => {
          const href = pendingHref
          closeGate()
          if (href) router.push(href)
        }}
      />
    </div>
  )
}
