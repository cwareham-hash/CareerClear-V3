'use client'

import { useState, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth'

export default function AuthModal() {
  const { userName, isLoading, login } = useAuth()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  // Block body scroll while modal is open
  useEffect(() => {
    const visible = !isLoading && !userName
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isLoading, userName])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name to continue.')
      return
    }
    login(name)
  }

  // Don't render anything while reading localStorage
  if (isLoading) return null
  // Don't render if already logged in
  if (userName) return null

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="auth-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(26, 39, 68, 0.85)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Modal card */}
        <motion.div
          key="auth-modal"
          className="w-full max-w-md bg-white rounded-modal shadow-panel p-8"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Logo mark */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-card text-white font-serif font-bold text-lg"
              style={{ backgroundColor: 'var(--color-teal)' }}
            >
              C
            </div>
            <span className="font-sans font-bold text-navy text-lg">
              Career Clear
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[32px] font-bold text-navy leading-tight mb-2">
            Welcome
          </h1>
          {/* Value proposition line (§5.1) */}
          <p className="text-muted text-[14px] mb-6">
            Track your career exploration journey
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="user-name"
              className="block text-sm font-medium text-dark mb-2"
            >
              What&apos;s your name?
            </label>

            <input
              id="user-name"
              type="text"
              autoFocus
              autoComplete="given-name"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError('')
              }}
              className={`w-full px-4 py-3 rounded-btn border text-dark placeholder:text-muted
                text-[15px] font-sans outline-none transition-colors duration-150
                focus:border-teal focus:ring-2 focus:ring-teal/20
                ${error ? 'border-red-400' : 'border-border'}`}
            />

            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}

            {/* "Get Started" CTA — exact label from §5.1 */}
            <button
              type="submit"
              className="mt-5 w-full flex items-center justify-center gap-2
                px-6 py-3 rounded-btn bg-teal text-white font-sans font-semibold
                text-[14px] transition-colors duration-150 hover:bg-teal-light
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
            >
              <Sparkles size={16} />
              Get Started
            </button>
          </form>

          <p className="mt-4 text-center text-[12px] text-muted">
            No account required — your progress saves automatically.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
