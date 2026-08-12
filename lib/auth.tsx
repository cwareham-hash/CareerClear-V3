'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { identifyUser, captureEvent, resetAnalytics } from '@/lib/analytics'

// ── Types ───────────────────────────────────────────────────────────────────

interface Profile {
  full_name:   string | null
  university:  string | null
  beta_access: boolean
}

export interface SignUpArgs {
  email:      string
  password:   string
  fullName:   string
  university?: string
}

export type AuthModalMode = 'login' | 'signup'

interface AuthContextType {
  /** The Supabase auth user, or null when logged out. */
  user: User | null
  /** The current session, or null when logged out. */
  session: Session | null
  /** Display name, derived from the profile's full_name (back-compat field). */
  userName: string | null
  /** Whether this user has been granted beta access to simulations. */
  betaAccess: boolean
  /** True while the initial session + profile are being resolved. */
  isLoading: boolean
  /** Create an account. `needsConfirmation` is true when the user must click
   *  an email link before they can log in. Returns error null on success. */
  signUp: (args: SignUpArgs) => Promise<{ error: string | null; needsConfirmation: boolean }>
  /** Log in with email + password. Returns { error } — null on success. */
  signIn: (args: { email: string; password: string }) => Promise<{ error: string | null }>
  /** Log out and clear the session. */
  signOut: () => Promise<void>

  // ── Auth modal control (single modal rendered in the layout) ─────────────
  authModalOpen: boolean
  authModalMode: AuthModalMode
  openAuthModal: (mode?: AuthModalMode) => void
  closeAuthModal: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]         = useState<User | null>(null)
  const [session, setSession]   = useState<Session | null>(null)
  const [profile, setProfile]   = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login')

  // Resolve the existing session on mount, and subscribe to auth changes.
  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setUser(data.session?.user ?? null)
      // If there's no session, we're done loading; otherwise the profile
      // effect below resolves loading once the profile is fetched.
      if (!data.session) setIsLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      if (!newSession) {
        // Logged out — clear profile and stop loading immediately.
        setProfile(null)
        setIsLoading(false)
      }
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  // Keep analytics attached to the right person across page reloads. signIn /
  // signUp identify at the moment they succeed, but a returning user with a
  // stored session never calls either — without this they'd look anonymous.
  // identifyUser() ignores repeat calls for the same id, so this is cheap.
  useEffect(() => {
    if (user) identifyUser(user.id, user.email)
  }, [user])

  // Fetch the profile row whenever the logged-in user changes.
  // (Done in its own effect, NOT inside onAuthStateChange — running Supabase
  // queries inside that callback can deadlock the client.)
  useEffect(() => {
    if (!user) {
      setProfile(null)
      return
    }
    let active = true
    ;(async () => {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, university, beta_access')
        .eq('id', user.id)
        .maybeSingle()
      if (!active) return
      setProfile((data as Profile) ?? null)
      setIsLoading(false)
    })()
    return () => { active = false }
  }, [user])

  const signUp = useCallback(
    async ({ email, password, fullName, university }: SignUpArgs) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Lands in raw_user_meta_data; the DB trigger copies it into profiles.
          data: { full_name: fullName, university: university || null },
        },
      })
      if (error) return { error: error.message, needsConfirmation: false }

      // Analytics: stitch this browser to the new Supabase user id. Note that
      // with "Confirm email" ON there is no session yet, but data.user still
      // carries the id — so signup is attributable even before confirmation.
      // (The password is never passed to analytics, here or anywhere.)
      if (data.user) {
        identifyUser(data.user.id, data.user.email)
        captureEvent('signup_completed', {
          needs_confirmation: !data.session,
        })
      }

      // With "Confirm email" ON, no session is returned until the user clicks
      // the email link — signal that so the UI can show a "check your inbox" state.
      return { error: null, needsConfirmation: !data.session }
    },
    [],
  )

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { error: error.message }

      if (data.user) {
        identifyUser(data.user.id, data.user.email)
        captureEvent('login_completed')
      }
      return { error: null }
    },
    [],
  )

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    // Drop the identity so a following anonymous session isn't merged into the
    // person who just left — matters on shared machines.
    resetAnalytics()
  }, [])

  const openAuthModal = useCallback((mode: AuthModalMode = 'login') => {
    setAuthModalMode(mode)
    setAuthModalOpen(true)
  }, [])
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), [])

  const value: AuthContextType = {
    user,
    session,
    userName:   profile?.full_name ?? null,
    betaAccess: profile?.beta_access ?? false,
    isLoading,
    signUp,
    signIn,
    signOut,
    authModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be called inside <AuthProvider>')
  }
  return ctx
}
