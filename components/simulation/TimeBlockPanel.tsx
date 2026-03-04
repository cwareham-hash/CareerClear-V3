'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ACTIVITY_COLORS, ACTIVITY_LABELS, type TimeBlock } from '@/lib/simulation'
import { BeforeSection, ScriptSection, CommentarySection, AfterSection } from './BlockContent'

interface Props {
  block:            TimeBlock | null
  onClose:          () => void
  onMarkComplete:   (id: string) => void
  onNextBlock:      () => void
  onPreviousBlock:  () => void
  isCompleted:      boolean
  hasNext:          boolean
  hasPrevious:      boolean
}

export default function TimeBlockPanel({
  block,
  onClose,
  onMarkComplete,
  onNextBlock,
  onPreviousBlock,
  isCompleted,
  hasNext,
  hasPrevious,
}: Props) {
  return (
    <AnimatePresence>
      {block && (
        <>
          {/* Dark backdrop */}
          <motion.div
            key="panel-backdrop"
            className="fixed inset-0 z-30 hidden lg:block"
            style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Centered modal */}
          <motion.div
            key="panel"
            className="fixed inset-0 z-40 hidden lg:flex items-center justify-center p-8 pointer-events-none"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div
              className="bg-white flex flex-col overflow-hidden w-full pointer-events-auto"
              style={{ maxWidth: 640, maxHeight: '85dvh', borderRadius: 16, boxShadow: '0 24px 64px rgba(0,0,0,0.35)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="shrink-0 px-6 py-5 border-b border-border"
                style={{ borderLeft: `4px solid ${ACTIVITY_COLORS[block.activityType]}` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span
                      className="inline-block px-2 py-0.5 rounded-pill font-sans text-[11px] font-semibold text-white mb-2"
                      style={{ backgroundColor: ACTIVITY_COLORS[block.activityType] }}
                    >
                      {ACTIVITY_LABELS[block.activityType]}
                    </span>
                    <h2 className="font-sans font-bold text-[17px] text-dark leading-snug">
                      {block.title}
                    </h2>
                    <p className="font-sans text-[13px] text-muted mt-0.5">{block.timeRange}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-btn
                      text-muted hover:text-dark transition-colors"
                    aria-label="Close panel"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
                <BeforeSection content={block.content.before} />
                <ScriptSection content={block.content.simulatedWork} />
                <CommentarySection content={block.content.commentary} />
                <AfterSection content={block.content.after} />
              </div>

              {/* Footer */}
              <div className="shrink-0 px-6 py-4 border-t border-border flex flex-col gap-3">
                {/* Primary action */}
                {isCompleted ? (
                  <div
                    className="flex items-center justify-center gap-2 py-2.5 rounded-btn"
                    style={{ backgroundColor: 'var(--color-tag-bg)' }}
                  >
                    <span
                      className="font-sans font-semibold text-[14px]"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      ✓ Completed
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => onMarkComplete(block.id)}
                    className="w-full py-2.5 rounded-btn font-sans font-semibold text-[14px] text-white
                      transition-colors duration-150"
                    style={{ backgroundColor: 'var(--color-teal)' }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        'var(--color-teal-light)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        'var(--color-teal)')
                    }
                  >
                    Mark as Completed
                  </button>
                )}

                {/* Secondary navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={onPreviousBlock}
                    disabled={!hasPrevious}
                    className="font-sans text-[13px] font-medium transition-colors duration-150
                      disabled:opacity-30 disabled:cursor-default"
                    style={{ color: hasPrevious ? 'var(--color-teal)' : 'var(--color-muted)' }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={onClose}
                    className="font-sans text-[13px] font-medium text-muted hover:text-dark
                      transition-colors duration-150"
                  >
                    Back to Calendar
                  </button>
                  <button
                    onClick={onNextBlock}
                    disabled={!hasNext}
                    className="font-sans text-[13px] font-medium transition-colors duration-150
                      disabled:opacity-30 disabled:cursor-default"
                    style={{ color: hasNext ? 'var(--color-teal)' : 'var(--color-muted)' }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
