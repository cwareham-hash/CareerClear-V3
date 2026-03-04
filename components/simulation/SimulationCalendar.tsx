'use client'

import { ACTIVITY_COLORS, ACTIVITY_LABELS, type TimeBlock, type DurationOption } from '@/lib/simulation'

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

// Legend items — human-readable names mapped to activity types
const LEGEND_ITEMS: { label: string; type: keyof typeof ACTIVITY_COLORS }[] = [
  { label: 'External Client Meeting', type: 'meeting' },
  { label: 'Internal Team Meeting',   type: 'team' },
  { label: 'Individual Work Block',   type: 'independent' },
  { label: 'Learning',                type: 'learning' },
  { label: 'Presentation',            type: 'presentation' },
]

interface Props {
  timeBlocks: TimeBlock[]
  selectedDuration: DurationOption
  completedIds: Set<string>
  activeBlockId: string | null
  mobileDay: number          // 1–5
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
  timeBlocks,
  selectedDuration,
  completedIds,
  activeBlockId,
  mobileDay,
  onMobileDayChange,
  onBlockClick,
  isLoading = false,
}: Props) {
  // Filter blocks by selected duration
  const visible = timeBlocks.filter((b) => b.minDuration <= selectedDuration)

  // Group by day
  const byDay = (day: number) => visible.filter((b) => b.day === day)

  if (isLoading) {
    return (
      <>
        {/* ── Desktop skeleton ──────────────────────────────────────────── */}
        <div className="hidden lg:grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((day) => (
            <div key={day} className="flex flex-col gap-2">
              <div className="text-center py-2 border-b border-border">
                <span className="font-sans font-semibold text-[13px] text-dark">
                  {DAY_LABELS[day - 1]}
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
            {[1, 2, 3, 4, 5].map((day) => (
              <div
                key={day}
                className="flex-1 min-w-[60px] py-3 text-center font-sans text-[13px] font-medium text-muted"
              >
                {DAY_LABELS[day - 1]}
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
      {/* ── Desktop: 5-column grid ──────────────────────────────────────────── */}
      <div className="hidden lg:grid grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((day) => (
          <div key={day} className="flex flex-col gap-2">
            {/* Day header */}
            <div className="text-center py-2 border-b border-border">
              <span className="font-sans font-semibold text-[13px] text-dark">
                {DAY_LABELS[day - 1]}
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
          {[1, 2, 3, 4, 5].map((day) => {
            const active = mobileDay === day
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
                {DAY_LABELS[day - 1]}
              </button>
            )
          })}
        </div>

        {/* Blocks for active day */}
        <div className="flex flex-col gap-3">
          {byDay(mobileDay).length === 0 ? (
            <p className="font-sans text-[13px] text-muted text-center py-8 italic">
              No activities visible at this duration
            </p>
          ) : (
            byDay(mobileDay).map((block) => (
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
