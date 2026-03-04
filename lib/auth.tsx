'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'

// localStorage key — intentionally short to avoid collisions
const AUTH_KEY = 'cc_user_name'

interface AuthContextType {
  /** The stored user name, or null if not yet logged in */
  userName: string | null
  /** True while localStorage is being read on first render */
  isLoading: boolean
  /** Persist a name and mark user as logged in */
  login: (name: string) => void
  /** Clear stored name and return to first-visit state */
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Read from localStorage once on mount (client-only)
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored && stored.trim()) {
      setUserName(stored.trim())
    }
    setIsLoading(false)
  }, [])

  const login = useCallback((name: string) => {
    const trimmed = name.trim()
    localStorage.setItem(AUTH_KEY, trimmed)
    setUserName(trimmed)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    setUserName(null)
  }, [])

  return (
    <AuthContext.Provider value={{ userName, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be called inside <AuthProvider>')
  }
  return ctx
}
