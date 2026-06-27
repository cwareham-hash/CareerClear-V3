'use client'

import type { CSSProperties } from 'react'
import { ACTIVITY_COLORS, ACTIVITY_LABELS, formatTimeRange, type TimeBlock, type ConnectorSlot } from '@/lib/simulation'

// Indexed by day number directly: day 0 = Sunday (the full sim opens Sunday night).
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function dayLabel(day: number): string {
  return DAY_LABELS[day] ?? `Day ${day}`
}

// Colored block treatment (CHANGE 1): a definitive 4px activity-color left border
// plus a soft ~10% tint of the same color. 8-digit hex appends the alpha. Body
// text stays dark and readable on the tint. Shared by both views for consistency.
function activityStyle(color: string): CSSProperties {
  return { borderLeftWidth: '4px', borderLeftStyle: 'solid', borderLeftColor: color, backgroundColor: `${color}1a` }
}

// Legend items — human-readable names mapped to activity types
const LEGEND_ITEMS: { label: string; type: keyof typeof ACTIVITY_COLORS }[] = [
  { label: 'External Client Meeting', type: 'meeting' },
  { label: 'Internal Team Meeting',   type: 'team' },
  { label: 'Individual Work Block',   type: 'independent' },
  { label: 'Learning',                type: 'learning' },
  { label: 'Presentation',            type: 'presentation' },
  { label: 'Social',                  type: 'social' },
]

interface Props {
  // Blocks for the currently-selected tier (already chosen upstream — no filtering here).
  blocks: TimeBlock[]
  // Greyed, non-enterable schedule slots (Full week grid only). Interleaved with
  // the enterable blocks by time; never count toward completion, never clickable.
  connectors?: ConnectorSlot[]
  completedIds: Set<string>
  activeBlockId: string | null
  mobileDay: number
  onMobileDayChange: (day: number) => void
  onBlockClick: (block: TimeBlock) => void
  isLoading?: boolean
}

// Minutes-from-midnight of a slot's START, used to order blocks and connectors
// within a day. Accepts a full range ("11:00 AM to 12:30 PM") or a bare start
// ("8:00"); for times without an explicit AM/PM, applies a business-day heuristic
// (1–7 → afternoon; 8–11 → morning; 12 → noon) which covers the 8am–8pm schedule.
function startMinutes(range: string): number {
  const head = range.split(/\s+to\s+/i)[0].trim()
  const m = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i.exec(head)
  if (!m) return 0
  let h = parseInt(m[1], 10)
  const min = parseInt(m[2], 10)
  const mer = m[3]?.toUpperCase()
  if (mer === 'AM') { if (h === 12) h = 0 }
  else if (mer === 'PM') { if (h !== 12) h += 12 }
  else if (h >= 1 && h <= 7) h += 12
  return h * 60 + min
}

type DaySlot =
  | { kind: 'block'; key: string; sort: number; block: TimeBlock }
  | { kind: 'connector'; key: string; sort: number; connector: ConnectorSlot }

// ── Time Block Skeleton ────────────────────────────────────────────────────────

function TimeBlockSkeleton() {
  return (
    <div className="w-full bg-white rounded-card border border-border shadow-card overflow-hidden">
      <div className="flex">
        <div className="w-1 shrink-0 self-stretch skeleton rounded-none" />
        <div className="flex-1 px-3 py-3 flex flex-col gap-1.5">
          <div className="h-4 w-16 skeleton rounded-pill" />
          <div className="h-3 w-full skeleton rounded" />
          <div className="h-3 w-20 skeleton rounded" />
        </div>
      </div>
    </div>
  )
}

export default function SimulationCalendar({
  blocks,
  connectors = [],
  completedIds,
  activeBlockId,
  mobileDay,
  onMobileDayChange,
  onBlockClick,
  isLoading = false,
}: Props) {
  // Distinct days this tier spans (Day-in-the-Life has one; Full spans Sun–Fri).
  const days = Array.from(new Set(blocks.map((b) => b.day))).sort((a, b) => a - b)
  const cols = Math.max(days.length, 1)
  const isSingleDay = days.length <= 1

  // Enterable blocks + greyed connectors for one day, merged in time order. Used
  // by the Full-week grid (desktop columns and the mobile day tabs).
  const slotsForDay = (day: number): DaySlot[] => {
    const blockSlots: DaySlot[] = blocks
      .filter((b) => b.day === day)
      .map((b) => ({ kind: 'block', key: b.id, sort: startMinutes(b.timeRange), block: b }))
    const connectorSlots: DaySlot[] = connectors
      .filter((c) => c.day === day)
      .map((c, i) => ({ kind: 'connector', key: `conn-${day}-${i}`, sort: startMinutes(c.start), connector: c }))
    return [...blockSlots, ...connectorSlots].sort((a, b) => a.sort - b.sort)
  }

  // Ensure the active mobile day is one this tier actually has.
  const activeMobileDay = days.includes(mobileDay) ? mobileDay : days[0] ?? 1

  // ── Single-day view (Day in the Life): a centered vertical TIMELINE that fills
  //    the container — chronological top-to-bottom, time on the rail, substantial
  //    cards. Width is set by the parent container (no narrow inner cap here). ──
  if (isSingleDay) {
    return (
      <>
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <TimeBlockSkeleton key={i} />
            ))}
          </div>
        ) : (
          <ol className="flex flex-col">
            {blocks.map((block, i) => (
              <TimelineRow
                key={block.id}
                block={block}
                isCompleted={completedIds.has(block.id)}
                isActive={activeBlockId === block.id}
                isLast={i === blocks.length - 1}
                onClick={() => onBlockClick(block)}
              />
            ))}
          </ol>
        )}
        <CalendarLegend />
      </>
    )
  }

  // ── Multi-day view (Full Simulation): the Sun–Fri grid, unchanged ────────────
  if (isLoading) {
    return (
      <>
        <div
          className="hidden lg:grid gap-3"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {days.map((day) => (
            <div key={day} className="flex flex-col gap-2">
              <div className="text-center py-2 border-b border-border">
                <span className="font-sans font-semibold text-[13px] text-dark">{dayLabel(day)}</span>
                <span className="font-sans text-[11px] text-muted ml-1">Day {day}</span>
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <TimeBlockSkeleton key={i} />
              ))}
            </div>
          ))}
        </div>

        <div className="lg:hidden">
          <div className="flex items-center border-b border-border mb-4 overflow-x-auto">
            {days.map((day) => (
              <div
                key={day}
                className="flex-1 min-w-[60px] py-3 text-center font-sans text-[13px] font-medium text-muted"
              >
                {dayLabel(day)}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <TimeBlockSkeleton key={i} />
            ))}
          </div>
        </div>

        <CalendarLegend />
      </>
    )
  }

  return (
    <>
      {/* ── Desktop: one column per day this tier spans ─────────────────────── */}
      <div
        className="hidden lg:grid gap-3"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {days.map((day) => (
          <div key={day} className="flex flex-col gap-2">
            {/* Day header */}
            <div className="text-center py-2 border-b border-border">
              <span className="font-sans font-semibold text-[13px] text-dark">{dayLabel(day)}</span>
              <span className="font-sans text-[11px] text-muted ml-1">Day {day}</span>
            </div>

            {/* Blocks + greyed connector slots, in time order */}
            {slotsForDay(day).length === 0 ? (
              <p className="font-sans text-[12px] text-muted text-center py-4 italic">No blocks</p>
            ) : (
              slotsForDay(day).map((slot) =>
                slot.kind === 'block' ? (
                  <TimeBlockCard
                    key={slot.key}
                    block={slot.block}
                    isCompleted={completedIds.has(slot.block.id)}
                    isActive={activeBlockId === slot.block.id}
                    onClick={() => onBlockClick(slot.block)}
                  />
                ) : (
                  <ConnectorCard key={slot.key} connector={slot.connector} />
                ),
              )
            )}
          </div>
        ))}
      </div>

      {/* ── Mobile: day-tab switcher + single column ────────────────────────── */}
      <div className="lg:hidden">
        {/* Day tabs */}
        <div className="flex items-center border-b border-border mb-4 overflow-x-auto">
          {days.map((day) => {
            const active = activeMobileDay === day
            return (
              <button
                key={day}
                onClick={() => onMobileDayChange(day)}
                className={`flex-1 min-w-[60px] py-3 font-sans text-[13px] font-medium border-b-2 -mb-px
                  transition-colors duration-150 focus-visible:outline-none
                  ${active ? 'border-teal text-teal font-bold' : 'border-transparent text-muted hover:text-dark'}`}
              >
                {dayLabel(day)}
              </button>
            )
          })}
        </div>

        {/* Blocks + greyed connector slots for the active day, in time order */}
        <div className="flex flex-col gap-3">
          {slotsForDay(activeMobileDay).length === 0 ? (
            <p className="font-sans text-[13px] text-muted text-center py-8 italic">
              No activities in this tier
            </p>
          ) : (
            slotsForDay(activeMobileDay).map((slot) =>
              slot.kind === 'block' ? (
                <TimeBlockCard
                  key={slot.key}
                  block={slot.block}
                  isCompleted={completedIds.has(slot.block.id)}
                  isActive={activeBlockId === slot.block.id}
                  onClick={() => onBlockClick(slot.block)}
                />
              ) : (
                <ConnectorCard key={slot.key} connector={slot.connector} />
              ),
            )
          )}
        </div>
      </div>

      {/* ── Legend ──────────────────────────────────────────────────────────── */}
      <CalendarLegend />
    </>
  )
}

// ── Calendar Legend ───────────────────────────────────────────────────────────

function CalendarLegend() {
  return (
    <div className="mt-6 pt-5 border-t border-border">
      <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-3 text-center">
        Legend
      </p>
      {/* Centered key; thin vertical divider between each entry (CHANGE 2). */}
      <div className="flex flex-wrap items-center justify-center gap-y-2">
        {LEGEND_ITEMS.map(({ label, type }, i) => (
          <div
            key={type}
            className={`flex items-center gap-2 px-4 ${i > 0 ? 'border-l border-border' : ''}`}
          >
            <span
              className="shrink-0 w-3 h-3 rounded-sm"
              style={{ backgroundColor: ACTIVITY_COLORS[type] }}
            />
            <span className="font-sans text-[12px] text-dark whitespace-nowrap">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Connector Slot (C14) ────────────────────────────────────────────────────────
// A greyed, non-enterable schedule slot (lunch, heads-down, an interview not sat
// in on). Rendered as a plain div — NOT a button — with no hover elevation, so it
// can never open the panel/modal and reads as visibly de-emphasized background
// context next to the colored, interactive blocks.

function ConnectorCard({ connector }: { connector: ConnectorSlot }) {
  return (
    <div
      className="w-full rounded-card border border-dashed border-border px-3 py-2.5 select-none"
      style={{ backgroundColor: '#f3f4f6' }}
      aria-disabled="true"
    >
      <p className="font-sans text-[12px] text-muted leading-snug">{connector.label}</p>
      <p className="font-sans text-[11px] text-muted/70 mt-0.5">
        {connector.start}–{connector.end}
      </p>
    </div>
  )
}

// ── Time Block Card ───────────────────────────────────────────────────────────

function TimeBlockCard({
  block,
  isCompleted,
  isActive,
  onClick,
}: {
  block: TimeBlock
  isCompleted: boolean
  isActive: boolean
  onClick: () => void
}) {
  const color = ACTIVITY_COLORS[block.activityType]

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-card border border-border shadow-card
        hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200
        overflow-hidden focus-visible:outline-none focus-visible:ring-2"
      // 4px activity-color left border + soft tint of the same color (CHANGE 1).
      style={{ ...activityStyle(color), opacity: isCompleted ? 0.6 : 1 }}
    >
      <div className="px-3 py-3 min-w-0">
        {/* Activity type + "You are here" badge */}
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <span
            className="font-sans text-[10px] font-semibold px-1.5 py-0.5 rounded-pill text-white"
            style={{ backgroundColor: color }}
          >
            {ACTIVITY_LABELS[block.activityType]}
          </span>
          {isActive && (
            <span
              className="font-sans text-[10px] font-semibold px-1.5 py-0.5 rounded-pill border bg-white"
              style={{ color, borderColor: color }}
            >
              You are here
            </span>
          )}
          {isCompleted && (
            <span className="font-sans text-[10px] font-semibold text-muted">✓ Done</span>
          )}
        </div>

        {/* Title */}
        <p className="font-sans font-semibold text-[13px] text-dark leading-snug line-clamp-2">
          {block.title}
        </p>

        {/* Time range */}
        <p className="font-sans text-[11px] text-muted mt-1">{formatTimeRange(block.timeRange)}</p>
      </div>
    </button>
  )
}

// ── Timeline Row (Day in the Life) ──────────────────────────────────────────────
// One chronological step: the time on a left rail, a node + vertical connector,
// and a substantial block card. State treatment matches TimeBlockCard exactly
// (activity tag, "You are here", "✓ Done" + dimmed). Clicking opens the panel.

function TimelineRow({
  block,
  isCompleted,
  isActive,
  isLast,
  onClick,
}: {
  block: TimeBlock
  isCompleted: boolean
  isActive: boolean
  isLast: boolean
  onClick: () => void
}) {
  const color = ACTIVITY_COLORS[block.activityType]

  return (
    <li className="flex gap-3 sm:gap-4">
      {/* Time — prominent, on the rail side */}
      <div className="shrink-0 w-[60px] sm:w-[82px] pt-4 text-right">
        <span className="font-sans text-[12px] sm:text-[13px] font-semibold text-dark leading-tight">
          {formatTimeRange(block.timeRange)}
        </span>
      </div>

      {/* Node + connector line */}
      <div className="shrink-0 w-4 flex flex-col items-center">
        <span
          className={`mt-[18px] shrink-0 w-3.5 h-3.5 rounded-full border-2 z-10 transition-colors
            ${isCompleted
              ? 'bg-teal border-teal'
              : isActive
                ? 'bg-white border-teal ring-2 ring-teal/30'
                : 'bg-white border-border'}`}
          aria-hidden="true"
        />
        {!isLast && <span className="w-px flex-1 bg-border mt-1.5" aria-hidden="true" />}
      </div>

      {/* Substantial block card */}
      <div className={`flex-1 min-w-0 ${isLast ? '' : 'pb-4'}`}>
        <button
          onClick={onClick}
          className="group w-full text-left rounded-card border border-border shadow-card
            hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200
            overflow-hidden focus-visible:outline-none focus-visible:ring-2"
          // 4px activity-color left border + soft tint (CHANGE 1), matching the grid.
          style={{ ...activityStyle(color), opacity: isCompleted ? 0.6 : 1 }}
        >
          <div className="px-5 py-4 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span
                  className="font-sans text-[10px] font-semibold px-2 py-0.5 rounded-pill text-white"
                  style={{ backgroundColor: color }}
                >
                  {ACTIVITY_LABELS[block.activityType]}
                </span>
                {isActive && (
                  <span
                    className="font-sans text-[10px] font-semibold px-2 py-0.5 rounded-pill border bg-white"
                    style={{ color, borderColor: color }}
                  >
                    You are here
                  </span>
                )}
                {isCompleted && (
                  <span className="font-sans text-[10px] font-semibold text-muted">✓ Done</span>
                )}
              </div>
              <h3 className="font-serif text-[17px] font-bold text-navy leading-snug">
                {block.title}
              </h3>
          </div>
        </button>
      </div>
    </li>
  )
}
