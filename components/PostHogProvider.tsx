'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { initAnalytics } from '@/lib/analytics'

/**
 * Mounts PostHog for the entire app. Rendered once in the root layout so every
 * route — including App Router client-side navigations — is covered.
 *
 * Pageviews (first load + route changes) and pageleaves are handled inside
 * posthog-js via `capture_pageview: 'history_change'`; see lib/analytics.ts.
 * There is deliberately no manual route-watching component here.
 *
 * If NEXT_PUBLIC_POSTHOG_KEY is absent, initAnalytics() returns without doing
 * anything and the app renders exactly as it would with no analytics at all.
 */
export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    initAnalytics()
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
