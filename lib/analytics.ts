// lib/analytics.ts — thin, crash-proof wrapper around posthog-js.
//
// Every analytics call in the app goes through this file rather than importing
// posthog-js directly. Two reasons:
//   1. Safety. If NEXT_PUBLIC_POSTHOG_KEY is missing (local dev without keys,
//      or a preview env where the var wasn't set), init is skipped and every
//      function below becomes a no-op. Nothing crashes, nothing throws.
//   2. One place to look. All event names live here as callers, so there's a
//      single file to audit for "what do we track?".
//
// Config comes from .env.local locally and Vercel project settings in deploys.

import posthog from 'posthog-js'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com'

/** True once posthog.init() has actually run. Gates every call below. */
let initialized = false

/** The distinct id we last identified, so repeat identify() calls are no-ops. */
let identifiedAs: string | null = null

export function isAnalyticsEnabled(): boolean {
  return initialized
}

/**
 * Initialize PostHog. Safe to call more than once — later calls return early.
 * Called from <PostHogProvider>, which is mounted in the root layout.
 */
export function initAnalytics(): void {
  if (initialized) return
  if (typeof window === 'undefined') return

  // The guard: no key → analytics silently stays off, app runs normally.
  if (!POSTHOG_KEY) return

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,

    // 'history_change' makes posthog-js capture a $pageview on first load AND
    // on every History API navigation. Next.js App Router client-side routing
    // goes through pushState, so this covers soft navigations automatically.
    //
    // Why not the older manual pattern (capture_pageview: false + a component
    // that watches usePathname/useSearchParams)? useSearchParams in the root
    // layout forces every page in the app out of static rendering in Next 14
    // unless it's wrapped in Suspense. This achieves the same result without
    // touching the rendering strategy of the whole site.
    capture_pageview: 'history_change',

    // Fires a $pageleave on exit — this is what gives time-on-page.
    capture_pageleave: true,

    // Automatic clicks / inputs / form submissions.
    autocapture: true,

    // Session recording is intentionally NOT configured here. posthog-js
    // records by default; whether it actually does is governed by the
    // "Record user sessions" toggle in the PostHog project settings.
  })

  initialized = true
}

/**
 * Attach subsequent events to a known user. `userId` is the Supabase auth user
 * id (profiles.id), so PostHog and the database agree on who someone is.
 *
 * Note: never pass anything password-related in here.
 */
export function identifyUser(userId: string, email?: string | null): void {
  if (!initialized || !userId) return
  if (identifiedAs === userId) return // already stitched; don't re-send

  posthog.identify(userId, email ? { email } : undefined)
  identifiedAs = userId
}

/** Capture a custom event. No-ops when analytics is off. */
export function captureEvent(
  event: string,
  properties?: Record<string, unknown>,
): void {
  if (!initialized) return
  posthog.capture(event, properties)
}

/**
 * Clear the identity on logout so the next anonymous session isn't merged into
 * the person who just signed out (important on shared/library computers).
 */
export function resetAnalytics(): void {
  identifiedAs = null
  if (!initialized) return
  posthog.reset()
}
