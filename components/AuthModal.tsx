'use client'

import { useState, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, MailCheck } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { captureEvent } from '@/lib/analytics'

/**
 * Single global auth modal. Rendered once in the root layout; opened from
 * anywhere via `openAuthModal('login' | 'signup')` on the auth context.
 *
 * Three views:
 *   • login        — email + password
 *   • signup       — full name, email, password, university (optional)
 *   • check-email  — shown after signup while "Confirm email" is ON
 */
export default function AuthModal() {
  const {
    user,
    authModalOpen,
    authModalMode,
    closeAuthModal,
    signIn,
    signUp,
  } = useAuth()

  const [mode, setMode]           = useState<'login' | 'signup'>('login')
  const [fullName, setFullName]   = useState('')
  const [university, setUniversity] = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [error, setError]         = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)

  // Sync the mode from the trigger (navbar "Log in" vs "Sign up") each time
  // the modal opens, and reset transient state.
  useEffect(() => {
    if (authModalOpen) {
      setMode(authModalMode)
      setError('')
      setCheckEmail(false)
      setSubmitting(false)
      // The account wall is a modal, not a route, so it has no URL of its own —
      // this event is what makes "user hit the account wall" measurable.
      captureEvent('auth_page_viewed', { mode: authModalMode })
    }
  }, [authModalOpen, authModalMode])

  // Auto-close once a session exists (successful login).
  useEffect(() => {
    if (user && authModalOpen) closeAuthModal()
  }, [user, authModalOpen, closeAuthModal])

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = authModalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [authModalOpen])

  function switchMode(next: 'login' | 'signup') {
    setMode(next)
    setError('')
    setPassword('')
    // Toggling login ↔ signup inside the modal is a new view of the wall.
    captureEvent('auth_page_viewed', { mode: next })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (mode === 'signup') {
      if (!fullName.trim()) return setError('Please enter your name.')
      if (!email.trim())    return setError('Please enter your email.')
      if (password.length < 6) return setError('Password must be at least 6 characters.')

      setSubmitting(true)
      const { error, needsConfirmation } = await signUp({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        university: university.trim() || undefined,
      })
      setSubmitting(false)
      if (error) return setError(error)
      if (needsConfirmation) {
        setCheckEmail(true)        // show "check your inbox" view
      }
      // If no confirmation needed, the session arrives and the modal auto-closes.
      return
    }

    // Login
    if (!email.trim())  return setError('Please enter your email.')
    if (!password)      return setError('Please enter your password.')

    setSubmitting(true)
    const { error } = await signIn({ email: email.trim(), password })
    setSubmitting(false)
    if (error) return setError(error)
    // Success → user state updates → modal auto-closes via the effect above.
  }

  const inputClass = (invalid = false) =>
    `w-full px-4 py-3 rounded-btn border text-dark placeholder:text-muted
     text-[15px] font-sans outline-none transition-colors duration-150
     focus:border-teal focus:ring-2 focus:ring-teal/20
     ${invalid ? 'border-red-400' : 'border-border'}`

  return (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          key="auth-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(26, 39, 68, 0.85)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeAuthModal}
        >
          <motion.div
            key="auth-modal"
            className="w-full max-w-md bg-white rounded-modal shadow-panel p-8 relative"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeAuthModal}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                rounded-btn text-muted hover:text-dark transition-colors"
            >
              <X size={18} />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logo-mark.png" alt="Career Clear logo" width={62} height={40} className="h-10 w-auto" />
              <span className="font-sans font-bold text-navy text-lg">Career Clear</span>
            </div>

            {checkEmail ? (
              /* ── Check-your-email view ─────────────────────────────────── */
              <div className="text-center py-2">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-tag-bg flex items-center justify-center">
                  <MailCheck size={24} style={{ color: 'var(--color-teal)' }} />
                </div>
                <h1 className="font-serif text-[26px] font-bold text-navy leading-tight mb-2">
                  Check your inbox
                </h1>
                <p className="text-muted text-[14px] leading-relaxed">
                  We sent a confirmation link to{' '}
                  <span className="font-medium text-dark">{email.trim()}</span>.
                  Click it to verify your account, then come back and log in.
                </p>
                <button
                  onClick={() => switchMode('login')}
                  className="mt-6 w-full px-6 py-3 rounded-btn bg-teal text-white font-sans
                    font-semibold text-[14px] transition-colors duration-150 hover:bg-teal-light"
                >
                  Back to log in
                </button>
              </div>
            ) : (
              <>
                {/* Headline */}
                <h1 className="font-serif text-[32px] font-bold text-navy leading-tight mb-2">
                  {mode === 'signup' ? 'Create your account' : 'Welcome back'}
                </h1>
                <p className="text-muted text-[14px] mb-6">
                  {mode === 'signup'
                    ? 'Track your career exploration journey'
                    : 'Log in to pick up where you left off'}
                </p>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  {mode === 'signup' && (
                    <div>
                      <label htmlFor="auth-name" className="block text-sm font-medium text-dark mb-1.5">
                        Full name
                      </label>
                      <input
                        id="auth-name" type="text" autoComplete="name" autoFocus
                        placeholder="Jordan Lee"
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value); if (error) setError('') }}
                        className={inputClass()}
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="auth-email" className="block text-sm font-medium text-dark mb-1.5">
                      Email
                    </label>
                    <input
                      id="auth-email" type="email" autoComplete="email"
                      autoFocus={mode === 'login'}
                      placeholder="you@university.edu"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
                      className={inputClass()}
                    />
                  </div>

                  <div>
                    <label htmlFor="auth-password" className="block text-sm font-medium text-dark mb-1.5">
                      Password
                    </label>
                    <input
                      id="auth-password" type="password"
                      autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                      placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); if (error) setError('') }}
                      className={inputClass()}
                    />
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label htmlFor="auth-university" className="block text-sm font-medium text-dark mb-1.5">
                        University <span className="text-muted font-normal">(optional)</span>
                      </label>
                      <input
                        id="auth-university" type="text" autoComplete="organization"
                        placeholder="e.g. University of Chicago"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className={inputClass()}
                      />
                    </div>
                  )}

                  {error && <p className="text-sm text-red-500">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 w-full flex items-center justify-center gap-2
                      px-6 py-3 rounded-btn bg-teal text-white font-sans font-semibold
                      text-[14px] transition-colors duration-150 hover:bg-teal-light
                      disabled:opacity-50 disabled:cursor-not-allowed
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
                  >
                    <Sparkles size={16} />
                    {submitting
                      ? 'Please wait…'
                      : mode === 'signup' ? 'Create account' : 'Log in'}
                  </button>
                </form>

                {/* Mode switch */}
                <p className="mt-5 text-center text-[13px] text-muted">
                  {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={() => switchMode(mode === 'signup' ? 'login' : 'signup')}
                    className="font-medium text-teal hover:text-teal-light transition-colors"
                  >
                    {mode === 'signup' ? 'Log in' : 'Sign up'}
                  </button>
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
