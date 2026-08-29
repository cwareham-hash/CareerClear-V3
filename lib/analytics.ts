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

// ── Product events ────────────────────────────────────────────────────────────
//
// Every named event the product fires lives below, one function each, so this
// file answers "what do we track?" on its own. Components import these helpers
// rather than calling captureEvent with a raw string — that keeps event names
// and property shapes from drifting apart across call sites.
//
// Every simulation event carries the same three identifying properties:
//   career_id — e.g. 'management-consultant'
//   scenario  — the project slug, e.g. 'meridian' | 'kestrel'
//   tier      — 'orientation' | 'day-in-life' | 'full'
// PostHog adds $current_url automatically, so no event needs to record where it
// was fired from.

/** The (career, project, tier) a simulation event happened in. */
export interface SimulationContext {
  careerId: string
  scenario: string | null
  tier:     string
}

/** Expand a context into the shared property names used by every sim event. */
function simProps(ctx: SimulationContext): Record<string, unknown> {
  return {
    career_id: ctx.careerId,
    scenario:  ctx.scenario,
    tier:      ctx.tier,
  }
}

// ── Exploration ───────────────────────────────────────────────────────────────

/**
 * A career card's "Explore →" link was clicked. The card component is shared, so
 * this also fires from the questionnaire results page; $current_url separates the
 * two surfaces.
 */
export function trackCareerCardClicked(careerId: string, hasSimulation: boolean): void {
  captureEvent('career_card_clicked', {
    career_id:       careerId,
    has_simulation:  hasSimulation,
  })
}

/** The "Start Simulation" CTA on a career detail page was clicked. */
export function trackSimulateCtaClicked(careerId: string): void {
  captureEvent('simulate_cta_clicked', { career_id: careerId })
}

// ── Career match quiz ─────────────────────────────────────────────────────────
//
// The quiz is open to anonymous visitors, so these fire with or without an
// identified user. Clicks on the recommended career cards are already covered by
// career_card_clicked above (the results grid reuses the shared CareerCard) —
// nothing here duplicates that.

/** The first question was shown, from either the intro CTA or Retake. */
export function trackQuizStarted(): void {
  captureEvent('quiz_started')
}

/**
 * The user answered a question and advanced. Fired on advance rather than on
 * selection, so changing an answer before continuing counts once. Going Back and
 * advancing again re-fires for that question number — the answer was re-made.
 */
export function trackQuizQuestionAnswered(questionNumber: number): void {
  captureEvent('quiz_question_answered', { question_number: questionNumber })
}

/**
 * The quiz was completed and results rendered.
 *   top_careers   — up to 5 best-matching career ids, best first
 *   attempt_saved — whether the signed-in Supabase save was fired. False for
 *                   anonymous visitors, whose attempt is saved locally and
 *                   claimed if they sign up or log in later.
 */
export function trackQuizCompleted(topCareers: string[], attemptSaved: boolean): void {
  captureEvent('quiz_completed', {
    top_careers:   topCareers,
    attempt_saved: attemptSaved,
  })
}

/** The sign-in link in the post-quiz nudge was clicked. */
export function trackQuizNudgeClicked(): void {
  captureEvent('quiz_nudge_clicked')
}

/** The post-quiz nudge was dismissed with its X. */
export function trackQuizNudgeDismissed(): void {
  captureEvent('quiz_nudge_dismissed')
}

// ── My Ratings ────────────────────────────────────────────────────────────────

/** The My Ratings page was opened. Fired once per mount. */
export function trackMyRatingsViewed(): void {
  captureEvent('my_ratings_viewed')
}

// ── Simulation ────────────────────────────────────────────────────────────────

/** The user entered a tier view. Deduped by the caller — once per tier entry. */
export function trackTierStarted(ctx: SimulationContext): void {
  captureEvent('tier_started', simProps(ctx))
}

/** A block's reading panel (desktop) or modal (mobile) displayed a block. */
export function trackBlockOpened(
  ctx: SimulationContext,
  blockId: string,
  activityType: string,
): void {
  captureEvent('block_opened', {
    ...simProps(ctx),
    block_id:      blockId,
    activity_type: activityType,
  })
}

/** A block was marked complete AND the progress write succeeded. */
export function trackBlockCompleted(ctx: SimulationContext, blockId: string): void {
  captureEvent('block_completed', { ...simProps(ctx), block_id: blockId })
}

/** A block was un-marked AND the progress write succeeded. */
export function trackBlockMarkedIncomplete(ctx: SimulationContext, blockId: string): void {
  captureEvent('block_marked_incomplete', { ...simProps(ctx), block_id: blockId })
}

/** The final block of a tier was completed — the completion-card condition. */
export function trackTierCompleted(ctx: SimulationContext, blockCount: number): void {
  captureEvent('tier_completed', { ...simProps(ctx), block_count: blockCount })
}

// ── Post-tier feedback survey (the rating modal) ───────────────────────────────

export function trackSurveyShown(ctx: SimulationContext): void {
  captureEvent('survey_shown', simProps(ctx))
}

export function trackSurveySubmitted(ctx: SimulationContext, score: number): void {
  captureEvent('survey_submitted', { ...simProps(ctx), score })
}

export function trackSurveyDismissed(ctx: SimulationContext): void {
  captureEvent('survey_dismissed', simProps(ctx))
}

// ── Block audio narration (the in-panel player) ────────────────────────────────

/** Playback started on a block's narration audio. */
export function trackAudioPlayed(blockId: string): void {
  captureEvent('audio_played', { block_id: blockId })
}

/** The narration audio played through to the end. */
export function trackAudioCompleted(blockId: string): void {
  captureEvent('audio_completed', { block_id: blockId })
}

/** The listener picked a different playback speed. */
export function trackAudioSpeedChanged(blockId: string, speed: number): void {
  captureEvent('audio_speed_changed', { block_id: blockId, speed })
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
