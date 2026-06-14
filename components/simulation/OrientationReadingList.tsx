'use client'

// Orientation rendered as a short briefing in three parts — a numbered reading
// list, NOT a calendar. No day header, no activity-type legend. Clicking a
// reading opens it in the same block-detail panel/modal used everywhere else.
import { Check } from 'lucide-react'
import { formatTimeRange, type TimeBlock } from '@/lib/simulation'

interface Props {
  blocks:       TimeBlock[]
  completedIds: Set<string>
  activeBlockId: string | null
  onBlockClick: (block: TimeBlock) => void
}

export default function OrientationReadingList({
  blocks,
  completedIds,
  activeBlockId,
  onBlockClick,
}: Props) {
  return (
    <div className="max-w-[680px] mx-auto flex flex-col gap-3">
      {blocks.map((block, i) => {
        const isCompleted = completedIds.has(block.id)
        const isActive    = activeBlockId === block.id
        return (
          <button
            key={block.id}
            onClick={() => onBlockClick(block)}
            className="w-full text-left bg-white rounded-card border shadow-card
              hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200
              px-5 py-4 flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2"
            style={{ borderColor: isActive ? 'var(--color-teal)' : 'var(--color-border)' }}
          >
            {/* Number badge */}
            <span
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-[15px]"
              style={
                isCompleted
                  ? { backgroundColor: 'var(--color-teal)', color: '#ffffff' }
                  : { backgroundColor: 'var(--color-tag-bg)', color: 'var(--color-teal)' }
              }
            >
              {isCompleted ? <Check size={18} aria-hidden="true" /> : i + 1}
            </span>

            <div className="min-w-0 flex-1">
              <p className="font-sans font-semibold text-[15px] text-dark leading-snug">
                {block.title}
              </p>
              <p className="font-sans text-[12px] text-muted mt-0.5">
                {formatTimeRange(block.timeRange)}
                {isActive && !isCompleted && <span style={{ color: 'var(--color-teal)' }}> · Start here</span>}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
