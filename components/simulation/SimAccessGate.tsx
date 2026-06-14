'use client'

// Shared access gate for simulation + orientation experiences. Browsing is
// public, but the block experiences need a logged-in, beta-approved account
// (progress saves per user). Renders the login or beta-wait card when blocked,
// otherwise renders its children. During auth loading it renders children (the
// inner client waits for `user` before loading progress).
import Link from 'next/link'
import type { ReactNode } from 'react'
import { LogIn, Hourglass } from 'lucide-react'
import { useAuth } from '@/lib/auth'

interface Props {
  // Used in the gate copy, e.g. "open the Project Fresca simulation".
  label:    string
  children: ReactNode
}

export default function SimAccessGate({ label, children }: Props) {
  const { user, betaAccess, isLoading: authLoading, openAuthModal } = useAuth()

  // ── Login gate ──────────────────────────────────────────────────────────
  if (!authLoading && !user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-card border border-border shadow-card max-w-md w-full p-8 text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-tag-bg flex items-center justify-center">
            <LogIn size={22} style={{ color: 'var(--color-teal)' }} />
          </div>
          <h1 className="font-serif text-[24px] font-bold text-navy leading-tight mb-2">
            Log in to continue
          </h1>
          <p className="font-sans text-[14px] text-muted leading-relaxed mb-6">
            Create a free account to open <span className="font-medium text-dark">{label}</span> —
            your progress saves automatically as you go.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => openAuthModal('signup')}
              className="px-5 py-2.5 rounded-btn bg-teal text-white font-sans font-semibold
                text-[14px] transition-colors duration-150 hover:bg-teal-light"
            >
              Create account
            </button>
            <button
              onClick={() => openAuthModal('login')}
              className="px-5 py-2.5 rounded-btn border border-border font-sans font-medium
                text-[14px] text-dark hover:border-teal hover:text-teal transition-colors duration-150"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Beta-access gate ──────────────────────────────────────────────────────
  if (!authLoading && user && !betaAccess) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-card border border-border shadow-card max-w-md w-full p-8 text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-tag-bg flex items-center justify-center">
            <Hourglass size={22} style={{ color: 'var(--color-teal)' }} />
          </div>
          <h1 className="font-serif text-[24px] font-bold text-navy leading-tight mb-2">
            You&apos;re on the list
          </h1>
          <p className="font-sans text-[14px] text-muted leading-relaxed mb-6">
            Beta access is granted manually while we onboard testers. We&apos;ll let
            you know as soon as <span className="font-medium text-dark">{label}</span> and
            the other experiences open up for your account.
          </p>
          <Link
            href="/explore"
            className="inline-block px-5 py-2.5 rounded-btn bg-teal text-white font-sans
              font-semibold text-[14px] transition-colors duration-150 hover:bg-teal-light"
          >
            Keep exploring careers
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
