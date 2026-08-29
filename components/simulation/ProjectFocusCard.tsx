'use client'

// Focus-mode project card (projects-area revision). One prominent, fully-open
// card for the SELECTED project: type label, codename, full description with
// Read more, then the project's experiential tiers as a NUMBERED VERTICAL
// SEQUENCE (1 Orientation → 2 Day in the Life → 3 Full Simulation) linked by a
// thin connector. Orientation is the project's FIRST step, in the same sequence
// rather than a detached card. The current step (earliest incomplete tier) is lit
// (teal tint, filled number, primary button + "Start here"); later steps are
// quiet/de-emphasised. Completed tiers take a done/Replay treatment. The soft
// gate (onTierClick) applies only to the Day/Full tiers, never to Orientation.
import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, CalendarDays, CalendarRange, ChevronDown, ChevronUp, Check, ArrowRight } from 'lucide-react'
import type { Scenario, TimeBlock } from '@/lib/simulation'

type TierKey = 'orientation' | 'day-in-life' | 'full'

interface Props {
  scenario:   Scenario
  careerSlug: string
  completed:  Set<string> | null
  onTierClick?: (e: React.MouseEvent, href: string) => void
}

type TierState = 'not-started' | 'in-progress' | 'completed'

function tierStateOf(blocks: TimeBlock[], completed: Set<string> | null): {
  state: TierState; done: number; total: number
} {
  const total = blocks.length
  if (!completed) return { state: 'not-started', done: 0, total }
  const done = blocks.filter((b) => completed.has(b.id)).length
  const state: TierState =
    done === 0 ? 'not-started' : total > 0 && done >= total ? 'completed' : 'in-progress'
  return { state, done, total }
}

const ACTION_LABEL: Record<TierState, string> = {
  'not-started': 'Start',
  'in-progress': 'Continue',
  'completed':   'Replay',
}

export default function ProjectFocusCard({ scenario: sc, careerSlug, completed, onTierClick }: Props) {
  const [expanded, setExpanded] = useState(false)

  // The project's three experiential tiers as one ordered sequence. Orientation
  // is step 1. `gated: true` routes a click through the soft gate (Day/Full);
  // Orientation is never gated. Only tiers with authored blocks are rendered, so
  // a project shipping Full before its Day-in-the-Life shows no blank step.
  const tiers = [
    {
      key:      'orientation' as TierKey,
      href:     `/careers/${careerSlug}/simulate/${sc.slug}/orientation`,
      label:    'Orientation',
      base:     'Set the scene before the work',
      duration: '10–15 min',
      Icon:     BookOpen,
      gated:    false,
    },
    {
      key:      'day-in-life' as TierKey,
      href:     `/careers/${careerSlug}/simulate/${sc.slug}?experience=day-in-life`,
      label:    'Day in the Life',
      base:     'One representative day',
      duration: 'About an hour',
      Icon:     CalendarDays,
      gated:    true,
    },
    {
      key:      'full' as TierKey,
      href:     `/careers/${careerSlug}/simulate/${sc.slug}?experience=full`,
      label:    'Full Simulation',
      base:     'The complete multi-day arc',
      duration: '3–5 hrs',
      Icon:     CalendarRange,
      gated:    true,
    },
  ].filter((t) => sc.tiers[t.key].length > 0)

  const states = tiers.map((t) => tierStateOf(sc.tiers[t.key], completed))
  // Current (lit) step = earliest incomplete tier (among those present), in order.
  const currentKey: TierKey | null =
    (tiers.find((_, i) => states[i].state !== 'completed')?.key ?? null)

  function subLine(i: number): string {
    const { state, done, total } = states[i]
    const t = tiers[i]
    if (state === 'completed')   return `${t.base} · Completed`
    if (state === 'in-progress') {
      const noun = t.key === 'orientation' ? 'read' : 'done'
      return `${t.base} · ${done} of ${total} ${noun}`
    }
    if (t.key === 'orientation') return `${t.base} · ${total} short reading${total === 1 ? '' : 's'}`
    if (t.key === 'full' && currentKey !== 'full') return `${t.base} · best after a Day in the Life`
    return t.base
  }

  return (
    <article className="bg-white rounded-card border border-border shadow-card overflow-hidden">
      <div className="h-1 w-full" style={{ backgroundColor: 'var(--color-teal)' }} />
      <div className="px-5 sm:px-6 py-5">
        {/* Identity */}
        <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-0.5">
          {sc.type ?? 'Project'}
        </p>
        <h3 className="font-serif text-[22px] font-bold text-navy leading-tight">{sc.title}</h3>
        <p
          className={`font-sans text-[14px] text-muted leading-relaxed mt-1.5 ${
            expanded ? '' : 'line-clamp-2'
          }`}
        >
          {sc.scenario}
        </p>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="self-start inline-flex items-center gap-1 mt-1 font-sans text-[12px] font-semibold
            transition-colors duration-150 hover:opacity-80 rounded
            focus-visible:outline-none focus-visible:ring-2"
          style={{ color: 'var(--color-teal)' }}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read more'}
          {expanded ? <ChevronUp size={13} aria-hidden="true" /> : <ChevronDown size={13} aria-hidden="true" />}
        </button>

        {/* Numbered vertical tier sequence */}
        <div className="mt-5 flex flex-col">
          {tiers.map((t, i) => {
            const { state } = states[i]
            const isLast     = i === tiers.length - 1
            const prominent  = t.key === currentKey
            const done       = state === 'completed'
            const sub        = subLine(i)
            // "Start here" marks the current (lit) step — Orientation while it is
            // the first incomplete tier, otherwise the next tier in sequence.
            const showStartHere = prominent
            // Orientation reads "Revisit" once done (a briefing you re-read), not "Replay".
            const actionLabel = t.key === 'orientation' && state === 'completed'
              ? 'Revisit'
              : ACTION_LABEL[state]

            const circleCls = prominent
              ? 'bg-teal text-white'
              : done
                ? 'bg-white border border-teal text-teal'
                : 'bg-white border border-border text-muted'

            return (
              <div key={t.key} className="flex gap-3">
                {/* Left rail: number + connector */}
                <div className="shrink-0 w-7 flex flex-col items-center">
                  <span
                    className={`relative z-10 flex items-center justify-center w-7 h-7 rounded-full
                      text-[12px] font-semibold ${circleCls}`}
                  >
                    {done ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : i + 1}
                  </span>
                  {!isLast && <span className="w-px flex-1 bg-border my-1" aria-hidden="true" />}
                </div>

                {/* Tier box — capped to ~half content width on wide screens, left-aligned. */}
                <div className={`flex-1 min-w-0 ${isLast ? '' : 'pb-4'}`}>
                  <div
                    className={
                      prominent
                        ? 'rounded-card border-2 border-teal p-4'
                        : 'rounded-card border border-border p-3.5 opacity-90'
                    }
                    style={{ backgroundColor: prominent ? 'var(--color-tag-bg)' : '#fafafa' }}
                  >
                    {/* Horizontal: title + progress on the left, action button on the
                        right (vertically centered). Wraps to stacked on mobile. */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="min-w-0 sm:flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <h4
                            className={`font-serif font-bold leading-tight ${
                              prominent ? 'text-[17px] text-navy' : 'text-[16px] text-muted'
                            }`}
                          >
                            {t.label}
                          </h4>
                          {/* Duration estimate — small and quiet beside the title */}
                          <span className="font-sans text-[11px] text-muted whitespace-nowrap">
                            {t.duration}
                          </span>
                          {showStartHere && (
                            <span className="inline-flex items-center rounded-pill bg-teal text-white
                              px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide">
                              Start here
                            </span>
                          )}
                          {done && (
                            <span className="inline-flex items-center gap-1 font-sans text-[11px] font-medium text-teal">
                              <Check size={12} strokeWidth={3} aria-hidden="true" /> Completed
                            </span>
                          )}
                        </div>
                        <p className={`font-sans text-[12px] ${prominent ? 'text-dark/70' : 'text-muted'}`}>
                          {sub}
                        </p>
                      </div>
                      <Link
                        href={t.href}
                        onClick={t.gated ? (e) => onTierClick?.(e, t.href) : undefined}
                        className={`shrink-0 self-start sm:self-auto inline-flex items-center gap-1.5 rounded-btn px-4 py-2
                          font-sans font-semibold text-[13px] transition-colors duration-150
                          focus-visible:outline-none focus-visible:ring-2
                          ${prominent
                            ? 'bg-teal text-white hover:bg-teal-light'
                            : 'border border-border text-dark hover:border-teal hover:text-teal'}`}
                      >
                        <t.Icon size={14} aria-hidden="true" />
                        {actionLabel}
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </article>
  )
}
