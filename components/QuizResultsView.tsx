'use client'

// The "Your Career Matches" results view — ranked career cards with match
// percentages. Shared by two surfaces:
//   • the questionnaire's post-quiz results phase (live, just-computed results)
//   • /quiz-results/[attemptId] — a stored attempt reopened from the dashboard
// Extracted from app/questionnaire/page.tsx so both render the identical view;
// the surfaces differ only in what they pass for headerExtra / footer.

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { CAREERS } from '@/lib/careers'
import type { CareerResult } from '@/lib/recommendations'
import CareerCard from '@/components/CareerCard'
import { useFavorites } from '@/lib/useFavorites'

// ── Match % colour tier (questionnaire decision #5) ───────────────────────────

function matchBadgeClass(pct: number): string {
  if (pct >= 75) return 'bg-teal text-white'
  if (pct >= 50) return 'bg-navy text-white'
  return 'bg-border text-muted'
}

function matchLabel(pct: number): string {
  if (pct >= 75) return 'Strong Match'
  if (pct >= 50) return 'Good Match'
  if (pct >= 30) return 'Some Overlap'
  return 'Low Match'
}

interface Props {
  /** Careers with match percentages, already sorted best-first. */
  results: CareerResult[]
  /** Line under the "Your Career Matches" heading. */
  subtitle?: string
  /** Rendered inside the centered header, below the subtitle — the quiz page
   *  puts its Retake button and sign-in nudge here; the stored-attempt page
   *  puts its back-to-dashboard link here. */
  headerExtra?: ReactNode
  /** Rendered below the grid (e.g. the "Results saved" note). */
  footer?: ReactNode
}

export default function QuizResultsView({
  results,
  subtitle = 'Based on your answers, here are the careers that align best with your profile — ranked by compatibility.',
  headerExtra,
  footer,
}: Props) {
  const { isFavorite, toggle } = useFavorites()

  // Match results to career objects. Stored attempts are filtered rather than
  // asserted: an old attempt could reference a career id that no longer exists.
  const rankedCareers = results.flatMap((r) => {
    const career = CAREERS.find((c) => c.id === r.careerId)
    return career ? [{ ...r, career }] : []
  })

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Results header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div
            className="w-14 h-14 rounded-card flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'var(--color-tag-bg)' }}
          >
            <Trophy size={24} style={{ color: 'var(--color-teal)' }} />
          </div>
          <h1 className="font-serif text-[32px] font-bold text-navy mb-2">
            Your Career Matches
          </h1>
          <p className="font-sans text-[15px] text-muted mb-6 max-w-md mx-auto">
            {subtitle}
          </p>
          {headerExtra}
        </motion.div>

        {/* Career grid — sorted by match %.
             Each card is the identical §7.6.1 CareerCard; match context
             sits in a slim label row above the card (outside it). */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
        >
          {rankedCareers.map(({ career, matchPct }) => (
            <div key={career.id} className="flex flex-col gap-1.5">
              {/* Match label — above the card, not part of it */}
              <div className="flex items-center justify-between px-1">
                <span className="font-sans text-[12px] text-muted font-medium">
                  {matchLabel(matchPct)}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-pill font-sans font-semibold text-[12px] ${matchBadgeClass(matchPct)}`}
                >
                  {matchPct}% match
                </span>
              </div>
              {/* Identical §7.6.1 CareerCard */}
              <CareerCard
                career={career}
                isFavorite={isFavorite(career.id)}
                onToggleFavorite={() => toggle(career.id)}
              />
            </div>
          ))}
        </motion.div>

        {footer}
      </div>
    </div>
  )
}
