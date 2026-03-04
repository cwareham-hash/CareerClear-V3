'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth'

const NAV_LINKS = [
  { href: '/',          label: 'Explore Careers' },
  { href: '/dashboard', label: 'My Dashboard'    },
]

export default function Navbar() {
  const { userName, logout } = useAuth()
  const pathname = usePathname()
  const [scrolled, setScrolled]       = useState(false)
  const [drawerOpen, setDrawerOpen]   = useState(false)

  // Shadow appears on scroll (§7.3)
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile drawer when route changes
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      {/* ── Main nav bar ──────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 bg-white transition-shadow duration-200
          ${scrolled ? 'shadow-nav' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Left — Logo (§7.3) */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {/* "C" circle — teal 48×48 rounded-card per §7.3 */}
            <div
              className="flex items-center justify-center w-12 h-12 rounded-card
                text-white font-serif font-extrabold text-[22px] select-none"
              style={{ backgroundColor: 'var(--color-teal)' }}
            >
              C
            </div>
            <div>
              <p className="font-sans font-bold text-[15px] text-dark leading-tight">
                Career Clear
              </p>
              <p className="font-sans text-[11px] text-muted leading-tight">
                Education Technology Platform
              </p>
            </div>
          </Link>

          {/* Center — Nav links (desktop, §7.3) */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-sans text-[14px] font-medium transition-colors duration-150
                    ${active
                      ? 'text-teal border-b-2 border-teal pb-0.5'
                      : 'text-dark hover:text-teal'
                    }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Right — Greeting + Sign Out (desktop, §7.3) */}
          <div className="hidden md:flex items-center gap-4">
            {userName && (
              <>
                <span className="font-sans text-[14px] font-medium text-dark">
                  Hi, <span className="text-teal">{userName}</span>
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 font-sans text-[13px] font-medium
                    text-muted hover:text-dark transition-colors duration-150"
                  aria-label="Sign out"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </>
            )}
          </div>

          {/* Hamburger — mobile only (§7.3) */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-2
              text-dark hover:text-teal transition-colors"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile full-width drawer (§7.3) ───────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="drawer-backdrop"
              className="fixed inset-0 z-30 bg-navy/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel — slides down from top, full-width (§7.3) */}
            <motion.aside
              key="drawer"
              className="fixed top-16 left-0 right-0 z-30 bg-white shadow-panel md:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="flex flex-col divide-y divide-border">
                {NAV_LINKS.map(({ href, label }) => {
                  const active = pathname === href
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`px-6 py-4 font-sans text-[15px] font-medium transition-colors
                        ${active ? 'text-teal bg-tag-bg' : 'text-dark hover:bg-cream'}`}
                    >
                      {label}
                    </Link>
                  )
                })}

                {/* Greeting + sign out row in drawer */}
                {userName && (
                  <div className="px-6 py-4 flex items-center justify-between">
                    <span className="font-sans text-[14px] text-dark">
                      Hi, <span className="text-teal font-medium">{userName}</span>
                    </span>
                    <button
                      onClick={logout}
                      className="flex items-center gap-1.5 font-sans text-[13px]
                        text-muted hover:text-dark transition-colors"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer — pushes page content below fixed navbar */}
      <div className="h-16" aria-hidden="true" />
    </>
  )
}
