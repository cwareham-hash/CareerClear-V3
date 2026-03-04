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

export default function TimeBlockModal({
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
          {/* Full-screen backdrop */}
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 z-40 lg:hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Bottom-sheet panel */}
          <motion.div
            key="modal-sheet"
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white flex flex-col overflow-hidden"
            style={{ borderRadius: '16px 16px 0 0', maxHeight: '90dvh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-pill bg-border" />
            </div>

            {/* Header */}
            <div
              className="shrink-0 px-5 pt-3 pb-4 border-b border-border"
              style={{ borderLeft: `4px solid ${ACTIVITY_COLORS[block.activityType]}` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span
                    className="inline-block px-2 py-0.5 rounded-pill font-sans text-[11px] font-semibold text-white mb-1.5"
                    style={{ backgroundColor: ACTIVITY_COLORS[block.activityType] }}
                  >
                    {ACTIVITY_LABELS[block.activityType]}
                  </span>
                  <h2 className="font-sans font-bold text-[16px] text-dark leading-snug">
                    {block.title}
                  </h2>
                  <p className="font-sans text-[12px] text-muted mt-0.5">{block.timeRange}</p>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-btn
                    text-muted hover:text-dark transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
              <BeforeSection content={block.content.before} />
              <ScriptSection content={block.content.simulatedWork} />
              <CommentarySection content={block.content.commentary} />
              <AfterSection content={block.content.after} />
            </div>

            {/* Footer */}
            <div className="shrink-0 px-5 py-4 border-t border-border flex flex-col gap-3">
              {/* Primary action */}
              {isCompleted ? (
                <div
                  className="flex items-center justify-center gap-2 py-3 rounded-btn"
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
                  className="w-full py-3 rounded-btn font-sans font-semibold text-[14px] text-white
                    transition-colors duration-150"
                  style={{ backgroundColor: 'var(--color-teal)' }}
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
                  className="font-sans text-[13px] font-medium text-muted
                    hover:text-dark transition-colors duration-150"
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
