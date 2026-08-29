'use client'

// Full results view for one stored quiz attempt, reopened from the dashboard's
// Questionnaire Results section. READ-ONLY: it renders what getQuizHistory()
// returns (the quiz_results table is keep-all by design — select + insert only,
// never update or delete). The view itself is the shared QuizResultsView, so a
// past attempt looks exactly like the screen the student saw when they finished
// the quiz. Attempts store the top 20 careers, which covers every career the
// quiz can actually score.

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, LogIn } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { getQuizHistory, type SavedQuizResult } from '@/lib/quizResults'
import QuizResultsView from '@/components/QuizResultsView'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  })
}

function BackToDashboardLink() {
  return (
    <Link
      href="/dashboard"
      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-btn
        border border-border font-sans font-medium text-[14px] text-dark
        hover:border-teal hover:text-teal transition-colors duration-150"
    >
      <ArrowLeft size={14} aria-hidden="true" />
      Back to Dashboard
    </Link>
  )
}

export default function QuizAttemptResultsPage() {
  const { attemptId } = useParams<{ attemptId: string }>()
  const { user, isLoading: authLoading, openAuthModal } = useAuth()
  // null = still loading; [] and beyond = loaded.
  const [history, setHistory] = useState<SavedQuizResult[] | null>(null)

  useEffect(() => {
    if (!user) {
      setHistory(null)
      return
    }
    let active = true
    getQuizHistory(user.id).then((h) => {
      if (active) setHistory(h)
    })
    return () => { active = false }
  }, [user])

  // ── Resolving session / loading the attempt ───────────────────────────────
  if (authLoading || (user && history === null)) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-cream flex items-center justify-center">
        <p className="font-sans text-[14px] text-muted">Loading results…</p>
      </div>
    )
  }

  // ── Logged out — quiz history is personal data ────────────────────────────
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-card border border-border shadow-card max-w-md w-full p-8 text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-tag-bg flex items-center justify-center">
            <LogIn size={22} style={{ color: 'var(--color-teal)' }} />
          </div>
          <h1 className="font-serif text-[24px] font-bold text-navy leading-tight mb-2">
            Log in to see your quiz results
          </h1>
          <p className="font-sans text-[14px] text-muted leading-relaxed mb-6">
            Saved quiz attempts live on your account.
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className="px-5 py-2.5 rounded-btn bg-teal text-white font-sans font-semibold
              text-[14px] transition-colors duration-150 hover:bg-teal-light"
          >
            Log in
          </button>
        </div>
      </div>
    )
  }

  const index = (history ?? []).findIndex((a) => a.id === attemptId)

  // ── Unknown attempt id (deleted account data, mistyped URL, someone else's id) ──
  if (index === -1) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-card border border-border shadow-card max-w-md w-full p-8 text-center">
          <h1 className="font-serif text-[24px] font-bold text-navy leading-tight mb-2">
            Attempt not found
          </h1>
          <p className="font-sans text-[14px] text-muted leading-relaxed mb-6">
            We couldn&apos;t find that quiz attempt on your account.
          </p>
          <BackToDashboardLink />
        </div>
      </div>
    )
  }

  const attempt = history![index]
  // Newest-first list → attempt #1 is the oldest, matching the dashboard cards.
  const attemptNumber = history!.length - index

  return (
    <QuizResultsView
      results={attempt.results}
      subtitle={`Attempt #${attemptNumber} · taken ${formatDate(attempt.takenAt)} — the careers that aligned best with your profile, ranked by compatibility.`}
      headerExtra={<BackToDashboardLink />}
    />
  )
}
