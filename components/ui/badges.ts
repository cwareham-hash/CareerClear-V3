// components/ui/badges.ts — the shared badge set (Wave A, Oct 2026 visual audit).
//
// Same approach as buttons.ts: a class helper, so every call site keeps its own
// element and content. Badges are never teal: teal means "clickable".
//
//   label    — neutral grey fill: skills, categories, durations
//   outline  — neutral hairline: industry
//   sim      — simulation, purple tint with a dot (purple everywhere it appears)
//   done     — completed status, light teal tint with dark ink
//   progress — in-progress status, gold tint
//   count    — navy: tiers, scores, "Start here"
//
// Two sizes: sm (20px) and md (24px). Heights are minimums so an unusually long
// label wraps instead of overflowing. The outline is an inset shadow, so
// outlined and filled badges are exactly the same height side by side.

export type BadgeKind = 'label' | 'outline' | 'sim' | 'done' | 'progress' | 'count'
export type BadgeSize = 'sm' | 'md'

const BASE = 'inline-flex items-center gap-1.5 rounded-pill leading-[1.15] text-left'

const SIZE: Record<BadgeSize, string> = {
  sm: 'min-h-5 px-2 py-0.5 text-[11px]',
  md: 'min-h-6 px-2.5 py-0.5 text-[12px]',
}

const KIND: Record<BadgeKind, string> = {
  label: 'bg-label text-label-ink font-medium',
  outline: 'bg-white text-label-ink font-medium shadow-label-line',
  sim:
    "bg-sim-tint text-sim-ink font-semibold before:content-[''] before:w-1.5 before:h-1.5 before:shrink-0 before:rounded-full before:bg-sim",
  done: 'bg-tag-bg text-action-press font-semibold',
  progress: 'bg-gold-tint text-gold-ink font-semibold',
  count: 'bg-navy text-white font-semibold',
}

export function badgeClasses({
  kind,
  size = 'md',
  className = '',
}: {
  kind: BadgeKind
  size?: BadgeSize
  /** Layout-only extras (margins, self-start). */
  className?: string
}): string {
  return [BASE, SIZE[size], KIND[kind], className].filter(Boolean).join(' ')
}
