'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { DurationOption } from '@/lib/simulation'
import type { SimulationFeedback } from '@/lib/userProgress'

interface Props {
  show:           boolean
  careerId:       string
  careerTitle:    string
  careerEmoji:    string
  durationOption: DurationOption
  userName:       string | null
  onSubmit:       (rating: number, feedback: SimulationFeedback) => void
  onDismiss:      () => void
}

const ANCHOR_LABELS: Record<number, string> = {
  1:  'Not for me',
  5:  'Still exploring',
  10: 'Perfect fit',
}

const EMPTY_FEEDBACK: SimulationFeedback = {
  liked:      '',
  disliked:   '',
  questions:  '',
  comparison: '',
}

// ── Inner modal content (shared by desktop + mobile) ──────────────────────────

function ModalContent({
  careerTitle,
  careerEmoji,
  onSubmit,
  onDismiss,
}: {
  careerTitle:    string
  careerEmoji:    string
  onSubmit:       (rating: number, feedback: SimulationFeedback) => void
  onDismiss:      () => void
}) {
  const [rating, setRating]           = useState<number | null>(null)
  const [feedback, setFeedback]       = useState<SimulationFeedback>(EMPTY_FEEDBACK)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  function handleChange(field: keyof SimulationFeedback, value: string) {
    setFeedback((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      {/* Header */}
      <div className="shrink-0 px-6 py-5 border-b border-border flex items-start justify-between gap-3">
        <div>
          <span className="text-[28px] leading-none select-none" aria-hidden="true">
            {careerEmoji}
          </span>
          <h2 className="font-sans font-bold text-[17px] text-dark mt-2 leading-snug">
            How did <span style={{ color: 'var(--color-teal)' }}>{careerTitle}</span> feel?
          </h2>
          <p className="font-sans text-[13px] text-muted mt-1">
            Rate this role and share optional feedback — saved to your dashboard.
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-btn text-muted hover:text-dark transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">

        {/* Rating scale */}
        <div>
          <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-3">
            Your rating
          </p>

          {/* Number buttons */}
          <div className="flex gap-1.5">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
              const selected  = rating === n
              const isHovered = !selected && hoveredRating === n
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHoveredRating(n)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className="flex-1 h-9 rounded-btn font-sans font-semibold text-[13px] transition-all duration-150 border
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/30"
                  style={{
                    backgroundColor: selected  ? 'var(--color-navy)'   : isHovered ? 'var(--color-tag-bg)' : 'white',
                    color:           selected  ? 'white'               : isHovered ? 'var(--color-teal)'   : 'var(--color-dark)',
                    borderColor:     selected  ? 'var(--color-teal)'   : isHovered ? 'var(--color-teal)'   : 'var(--color-border)',
                  }}
                >
                  {n}
                </button>
              )
            })}
          </div>

          {/* Anchor labels */}
          <div className="flex justify-between mt-2 px-0.5">
            <span className="font-sans text-[11px] text-muted">{ANCHOR_LABELS[1]}</span>
            <span className="font-sans text-[11px] text-muted">{ANCHOR_LABELS[5]}</span>
            <span className="font-sans text-[11px] text-muted">{ANCHOR_LABELS[10]}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Optional text feedback */}
        <div className="flex flex-col gap-4">
          <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide -mb-1">
            Optional feedback
          </p>

          {([
            ['liked',      'What I liked about this role'],
            ['disliked',   "What I didn't like about this role"],
            ['questions',  'Questions I still have'],
            ['comparison', 'How this compares to other roles I\'ve explored'],
          ] as [keyof SimulationFeedback, string][]).map(([field, label]) => (
            <div key={field}>
              <label className="block font-sans text-[13px] font-medium text-dark mb-1.5">
                {label}
              </label>
              <textarea
                value={feedback[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                rows={2}
                placeholder="Optional..."
                className="w-full px-3 py-2 rounded-btn border border-border bg-white
                  font-sans text-[13px] text-dark placeholder:text-muted
                  outline-none focus:border-teal focus:ring-2 focus:ring-teal/20
                  transition-colors duration-150 resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 px-6 py-4 border-t border-border flex items-center justify-between gap-3">
        <button
          onClick={onDismiss}
          className="font-sans text-[13px] font-medium text-muted hover:text-dark transition-colors duration-150"
        >
          Skip for now
        </button>
        <button
          onClick={() => rating !== null && onSubmit(rating, feedback)}
          disabled={rating === null}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn
            font-sans font-semibold text-[14px] text-white transition-colors duration-150
            disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--color-teal)' }}
          onMouseEnter={(e) => {
            if (rating !== null)
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-teal-light)'
          }}
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-teal)')
          }
        >
          Save Feedback
        </button>
      </div>
    </>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function RatingModal({
  show,
  careerTitle,
  careerEmoji,
  onSubmit,
  onDismiss,
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* ── Desktop: centered modal (lg+) ──────────────────────────────── */}
          <>
            {/* Backdrop */}
            <motion.div
              key="rating-backdrop-lg"
              className="fixed inset-0 z-50 hidden lg:block"
              style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onDismiss}
            />

            {/* Modal */}
            <motion.div
              key="rating-modal-lg"
              className="fixed inset-0 z-50 hidden lg:flex items-center justify-center p-8 pointer-events-none"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1,    y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div
                className="bg-white flex flex-col overflow-hidden w-full pointer-events-auto"
                style={{
                  maxWidth: 560,
                  maxHeight: '88dvh',
                  borderRadius: 16,
                  boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <ModalContent
                  careerTitle={careerTitle}
                  careerEmoji={careerEmoji}
                  onSubmit={onSubmit}
                  onDismiss={onDismiss}
                />
              </div>
            </motion.div>
          </>

          {/* ── Mobile: bottom-sheet (<lg) ──────────────────────────────────── */}
          <>
            {/* Backdrop */}
            <motion.div
              key="rating-backdrop-sm"
              className="fixed inset-0 z-50 lg:hidden"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onDismiss}
            />

            {/* Sheet */}
            <motion.div
              key="rating-sheet-sm"
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white flex flex-col overflow-hidden"
              style={{ borderRadius: '16px 16px 0 0', maxHeight: '92dvh' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-pill bg-border" />
              </div>
              <ModalContent
                careerTitle={careerTitle}
                careerEmoji={careerEmoji}
                onSubmit={onSubmit}
                onDismiss={onDismiss}
              />
            </motion.div>
          </>
        </>
      )}
    </AnimatePresence>
  )
}
