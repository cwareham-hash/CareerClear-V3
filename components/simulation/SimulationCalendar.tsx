'use client'

import { ACTIVITY_COLORS, ACTIVITY_LABELS, type TimeBlock } from '@/lib/simulation'

// Indexed by day number directly: day 0 = Sunday (the full sim opens Sunday night).
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function dayLabel(day: number): string {
  return DAY_LABELS[day] ?? `Day ${day}`
}

// Legend items — human-readable names mapped to activity types
const LEGEND_ITEMS: { label: string; type: keyof typeof ACTIVITY_COLORS }[] = [
  { label: 'External Client Meeting', type: 'meeting' },
  { label: 'Internal Team Meeting',   type: 'team' },
  { label: 'Individual Work Block',   type: 'independent' },
  { label: 'Learning',                type: 'learning' },
  { label: 'Presentation',            type: 'presentation' },
]

interface Props {
  // Blocks for the currently-selected tier (already chosen upstream — no filtering here).
  blocks: TimeBlock[]
  completedIds: Set<string>
  activeBlockId: string | null
  mobileDay: number
  onMobileDayChange: (day: number) => void
  onBlockClick: (block: TimeBlock) => void
  isLoading?: boolean
}

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
  completedIds,
  activeBlockId,
  mobileDay,
  onMobileDayChange,
  onBlockClick,
  isLoading = false,
}: Props) {
  // Distinct days this tier spans (orientation/day-in-life have fewer than 5).
  const days = Array.from(new Set(blocks.map((b) => b.day))).sort((a, b) => a - b)
  const cols = Math.max(days.length, 1)

  // Group by day
  const byDay = (day: number) => blocks.filter((b) => b.day === day)

  // Ensure the active mobile day is one this tier actually has.
  const activeMobileDay = days.includes(mobileDay) ? mobileDay : days[0] ?? 1

  if (isLoading) {
    return (
      <>
        {/* ── Desktop skeleton ──────────────────────────────────────────── */}
        <div
          className="hidden lg:grid gap-3"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {days.map((day) => (
            <div key={day} className="flex flex-col gap-2">
              <div className="text-center py-2 border-b border-border">
                <span className="font-sans font-semibold text-[13px] text-dark">
                  {dayLabel(day)}
                </span>
                <span className="font-sans text-[11px] text-muted ml-1">Day {day}</span>
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <TimeBlockSkeleton key={i} />
              ))}
            </div>
          ))}
        </div>

        {/* ── Mobile skeleton ───────────────────────────────────────────── */}
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
              <span className="font-sans font-semibold text-[13px] text-dark">
                {dayLabel(day)}
              </span>
              <span className="font-sans text-[11px] text-muted ml-1">Day {day}</span>
            </div>

            {/* Blocks */}
            {byDay(day).length === 0 ? (
              <p className="font-sans text-[12px] text-muted text-center py-4 italic">
                No blocks
              </p>
            ) : (
              byDay(day).map((block) => (
                <TimeBlockCard
                  key={block.id}
                  block={block}
                  isCompleted={completedIds.has(block.id)}
                  isActive={activeBlockId === block.id}
                  onClick={() => onBlockClick(block)}
                />
              ))
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
                  ${active
                    ? 'border-teal text-teal font-bold'
                    : 'border-transparent text-muted hover:text-dark'
                  }`}
              >
                {dayLabel(day)}
              </button>
            )
          })}
        </div>

        {/* Blocks for active day */}
        <div className="flex flex-col gap-3">
          {byDay(activeMobileDay).length === 0 ? (
            <p className="font-sans text-[13px] text-muted text-center py-8 italic">
              No activities in this tier
            </p>
          ) : (
            byDay(activeMobileDay).map((block) => (
              <TimeBlockCard
                key={block.id}
                block={block}
                isCompleted={completedIds.has(block.id)}
                isActive={activeBlockId === block.id}
                onClick={() => onBlockClick(block)}
              />
            ))
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
      <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-3">
        Legend
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-2.5">
        {LEGEND_ITEMS.map(({ label, type }) => (
          <div key={type} className="flex items-center gap-2">
            <span
              className="shrink-0 w-3 h-3 rounded-sm"
              style={{ backgroundColor: ACTIVITY_COLORS[type] }}
            />
            <span className="font-sans text-[12px] text-dark">{label}</span>
          </div>
        ))}
      </div>
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
      className="w-full text-left bg-white rounded-card border border-border shadow-card
        hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200
        overflow-hidden focus-visible:outline-none focus-visible:ring-2"
      style={{ opacity: isCompleted ? 0.6 : 1 }}
    >
      {/* Coloured left accent */}
      <div className="flex">
        <div className="w-1 shrink-0 self-stretch" style={{ backgroundColor: color }} />

        <div className="flex-1 px-3 py-3 min-w-0">
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
                className="font-sans text-[10px] font-semibold px-1.5 py-0.5 rounded-pill border"
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
          <p className="font-sans text-[11px] text-muted mt-1">{block.timeRange}</p>
        </div>
      </div>
    </button>
  )
}
