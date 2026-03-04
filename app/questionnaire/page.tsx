'use client'

// ── Phase 3 — Questionnaire (§5.3) ───────────────────────────────────────────
// Typeform-style one-question-at-a-time flow with animated slide transitions.
//
// DECISIONS NOT SPECIFIED IN SPEC (flagged inline and summarised at bottom):
//   1. Intro screen before Q1 (not mentioned — added for UX context)
//   2. Manual "Continue" button rather than auto-advance on selection
//   3. Slide direction reverses on Back navigation
//   4. All 10 careers shown on results, sorted by match %
//   5. Match % colour tiers: ≥75 teal | ≥50 navy | <50 muted
//   6. "Explore →" CTA on each result card links to the career detail page

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Trophy,
} from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { QUESTIONS, DIMENSION_LABELS } from '@/lib/questionnaire'
import {
  computeRecommendations,
  saveAttempt,
  type CareerResult,
} from '@/lib/recommendations'
import { CAREERS } from '@/lib/careers'
import CareerCard from '@/components/CareerCard'
import { useFavorites } from '@/lib/useFavorites'

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'quiz' | 'results'

// ── Animation variants ─────────────────────────────────────────────────────────
// direction: 1 = forward (slide from right), -1 = back (slide from left)

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 56 : -56,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.28, ease: 'easeOut' as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -56 : 56,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  }),
}

// ── Match % colour tier (decision #5) ─────────────────────────────────────────

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

// ── Main page ─────────────────────────────────────────────────────────────────

export default function QuestionnairePage() {
  const { userName } = useAuth()
  const { isFavorite, toggle } = useFavorites()

  const [phase, setPhase] = useState<Phase>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [results, setResults] = useState<CareerResult[]>([])

  const question = QUESTIONS[currentIndex]
  const totalQuestions = QUESTIONS.length
  const selectedValue = answers[question?.id]
  const isLastQuestion = currentIndex === totalQuestions - 1

  // ── Handlers ────────────────────────────────────────────────────────────────

  const startQuiz = useCallback(() => {
    setPhase('quiz')
  }, [])

  const selectAnswer = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }, [])

  const goBack = useCallback(() => {
    if (currentIndex === 0) {
      setPhase('intro')
      return
    }
    setDirection(-1)
    setCurrentIndex((i) => i - 1)
  }, [currentIndex])

  const goNext = useCallback(() => {
    if (!selectedValue) return

    if (isLastQuestion) {
      const computed = computeRecommendations(answers)
      setResults(computed)
      if (userName) {
        saveAttempt(userName, answers, computed)
      }
      setPhase('results')
      return
    }

    setDirection(1)
    setCurrentIndex((i) => i + 1)
  }, [selectedValue, isLastQuestion, answers, userName])

  const retake = useCallback(() => {
    setAnswers({})
    setCurrentIndex(0)
    setDirection(1)
    setPhase('quiz')
  }, [])

  // ── Keyboard: Enter to advance ───────────────────────────────────────────────
  // (decision: not in spec; common accessibility pattern for quiz flows)

  // ── Render helpers ───────────────────────────────────────────────────────────

  const progressPct = ((currentIndex + 1) / totalQuestions) * 100

  // Match results to career objects (sorted descending by matchPct from computeRecommendations)
  const rankedCareers = results.map((r) => ({
    ...r,
    career: CAREERS.find((c) => c.id === r.careerId)!,
  }))

  // ── Intro screen ─────────────────────────────────────────────────────────────
  // DECISION: intro not mentioned in spec — added to provide context before Q1

  if (phase === 'intro') {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-cream flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-lg bg-white rounded-modal shadow-panel overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Teal accent top border */}
          <div className="h-1.5 w-full" style={{ backgroundColor: 'var(--color-teal)' }} />

          <div className="px-8 py-10 text-center">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-card flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'var(--color-tag-bg)' }}
            >
              <Sparkles size={28} style={{ color: 'var(--color-teal)' }} />
            </div>

            {/* Heading */}
            <h1 className="font-serif text-[32px] font-bold text-navy leading-tight mb-3">
              Career Match Quiz
            </h1>
            <p className="font-sans text-[15px] text-muted leading-relaxed mb-8">
              Answer {totalQuestions} quick questions and we&apos;ll show you which careers
              align with your work style, interests, and strengths.
            </p>

            {/* Metadata pills */}
            <div className="flex items-center justify-center gap-3 mb-10">
              {[
                `${totalQuestions} questions`,
                '~3 minutes',
                'No wrong answers',
              ].map((label) => (
                <span
                  key={label}
                  className="px-3 py-1 rounded-pill border border-border font-sans text-[12px] text-muted font-medium"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={startQuiz}
              className="
                inline-flex items-center gap-2 px-8 py-3.5 rounded-btn
                font-sans font-semibold text-[14px] text-white
                transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              "
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
              <Sparkles size={16} aria-hidden="true" />
              Start Quiz
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // ── Results screen ────────────────────────────────────────────────────────────

  if (phase === 'results') {
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
              Based on your answers, here are the careers that align best with your
              profile — ranked by compatibility.
            </p>
            <button
              onClick={retake}
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-btn
                border border-border font-sans font-medium text-[14px] text-dark
                hover:border-teal hover:text-teal transition-colors duration-150
              "
            >
              <RotateCcw size={14} aria-hidden="true" />
              Retake Quiz
            </button>
          </motion.div>

          {/* Career grid — all 10, sorted by match %.
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

          {/* Footer note */}
          <p className="text-center font-sans text-[13px] text-muted mt-10">
            Results saved to your dashboard.{' '}
            <Link href="/dashboard" className="text-teal hover:text-teal-light transition-colors">
              View history →
            </Link>
          </p>
        </div>
      </div>
    )
  }

  // ── Quiz screen ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        {/* Progress bar — above the card, full-width */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-sans text-[12px] text-muted font-medium">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span
              className="px-2.5 py-0.5 rounded-pill font-sans text-[11px] font-semibold text-white"
              style={{ backgroundColor: 'var(--color-teal)' }}
            >
              {DIMENSION_LABELS[question.dimension]}
            </span>
          </div>
          {/* Track */}
          <div className="h-1.5 w-full rounded-pill bg-border overflow-hidden">
            <motion.div
              className="h-full rounded-pill"
              style={{ backgroundColor: 'var(--color-teal)' }}
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-modal shadow-panel overflow-hidden">

          {/* Animated question content */}
          <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="px-8 pt-8 pb-6"
              >
                {/* Question text */}
                <h2 className="font-sans font-semibold text-[20px] text-dark leading-snug mb-7">
                  {question.text}
                </h2>

                {/* Answer options */}
                <div className="flex flex-col gap-3" role="radiogroup" aria-label={question.text}>
                  {question.options.map((option) => {
                    const isSelected = selectedValue === option.value
                    return (
                      <button
                        key={option.value}
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => selectAnswer(question.id, option.value)}
                        className="
                          w-full text-left px-5 py-4 rounded-btn border
                          font-sans text-[15px] font-medium
                          transition-all duration-150
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                        "
                        style={
                          isSelected
                            ? {
                                backgroundColor: 'var(--color-navy)',
                                color: '#ffffff',
                                borderColor: 'var(--color-teal)',
                              }
                            : {
                                backgroundColor: '#ffffff',
                                color: 'var(--color-dark-text)',
                                borderColor: 'var(--color-border)',
                              }
                        }
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
                              'var(--color-cream)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
                              '#ffffff'
                          }
                        }}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation footer */}
          <div className="px-8 py-5 border-t border-border flex items-center justify-between">
            {/* Back button */}
            <button
              onClick={goBack}
              className="
                flex items-center gap-1.5 font-sans font-medium text-[14px]
                text-muted hover:text-dark transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 rounded-btn px-2 py-1
              "
              aria-label="Go back"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              Back
            </button>

            {/* Continue / See Results button */}
            <button
              onClick={goNext}
              disabled={!selectedValue}
              className="
                flex items-center gap-2 px-6 py-2.5 rounded-btn
                font-sans font-semibold text-[14px] text-white
                transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                disabled:opacity-40 disabled:cursor-not-allowed
              "
              style={{ backgroundColor: 'var(--color-teal)' }}
              onMouseEnter={(e) => {
                if (selectedValue)
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    'var(--color-teal-light)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  'var(--color-teal)'
              }}
            >
              {isLastQuestion ? 'See My Results' : 'Continue'}
              {!isLastQuestion && <ChevronRight size={16} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
