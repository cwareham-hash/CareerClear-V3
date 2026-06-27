'use client'

// Soft gate shown when a user opens a project tier before finishing Orientation.
// It does NOT lock anything — it gently recommends Orientation, then lets the
// user proceed. Accessible modal behaviour (focus-in, Tab-trap, Escape, focus
// restore) is provided by the shared useDialog hook.
import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useDialog } from './useDialog'

// Gentle, non-locking confirm dialog. The defaults reproduce the original
// "start with Orientation" hub gate; every string and both actions are
// overridable so the same component can host other soft nudges (e.g. the
// orientation-complete "skip to the full simulation" prompt).
interface Props {
  open:            boolean
  onClose:         () => void   // cancel / Escape / backdrop — focus returns to the trigger
  title?:          string
  description?:    string
  Icon?:           LucideIcon          // top accent icon
  primaryLabel?:   string
  primaryIcon?:    LucideIcon | null   // icon inside the primary button (null = none)
  onPrimary:       () => void
  secondaryLabel?: string
  onSecondary:     () => void
}

const DEFAULT_DESCRIPTION =
  'We recommend starting with Orientation to get the most out of this project. You can still jump straight in if you’d like.'

export default function SoftGateDialog({
  open,
  onClose,
  title = 'Start with Orientation?',
  description = DEFAULT_DESCRIPTION,
  Icon = BookOpen,
  primaryLabel = 'Go to Orientation',
  primaryIcon = BookOpen,
  onPrimary,
  secondaryLabel = 'Start anyway',
  onSecondary,
}: Props) {
  const containerRef    = useRef<HTMLDivElement>(null)
  const initialFocusRef = useRef<HTMLButtonElement>(null)
  const PrimaryIcon     = primaryIcon

  // Single dialog instance (no desktop/mobile split), so always-match the query.
  useDialog({
    open,
    mediaQuery: '(min-width: 0px)',
    onClose,
    containerRef,
    initialFocusRef,
  })

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="softgate-backdrop"
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          {/* Centered dialog */}
          <motion.div
            key="softgate-dialog"
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="softgate-title"
              aria-describedby="softgate-desc"
              tabIndex={-1}
              className="bg-white w-full max-w-md rounded-card shadow-panel pointer-events-auto
                outline-none p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="inline-flex w-11 h-11 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--color-tag-bg)' }}>
                <Icon size={20} style={{ color: 'var(--color-teal)' }} aria-hidden="true" />
              </span>

              <h2 id="softgate-title" className="font-sans font-bold text-[17px] text-navy mb-1.5">
                {title}
              </h2>
              <p id="softgate-desc" className="font-sans text-[14px] text-muted leading-relaxed mb-5">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  ref={initialFocusRef}
                  type="button"
                  onClick={onPrimary}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-btn
                    bg-teal text-white font-sans font-semibold text-[13px]
                    transition-colors duration-150 hover:bg-teal-light
                    focus-visible:outline-none focus-visible:ring-2"
                >
                  {PrimaryIcon && <PrimaryIcon size={14} aria-hidden="true" />}
                  {primaryLabel}
                </button>
                <button
                  type="button"
                  onClick={onSecondary}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-btn
                    border border-border text-dark font-sans font-semibold text-[13px]
                    transition-colors duration-150 hover:border-teal hover:text-teal
                    focus-visible:outline-none focus-visible:ring-2"
                >
                  {secondaryLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
