'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import type { Career } from '@/lib/careers'
import { trackCareerCardClicked } from '@/lib/analytics'
import { buttonClasses } from '@/components/ui/buttons'
import { badgeClasses } from '@/components/ui/badges'

interface CareerCardProps {
  career: Career
  isFavorite: boolean
  onToggleFavorite: () => void
  isSimulated?: boolean
}

/**
 * §7.6.1 Career Card Component
 *
 * White bg · 12px border radius · 1px #e5e7eb border
 * 4px teal top accent border · 20px internal padding
 *
 * Layout (top → bottom):
 *   1. Row: emoji (32px, left) + heart favorite (right)
 *   2. Title — 16px bold Inter #111827
 *   3. Description — 14px regular #6b7280, 2–3 lines
 *   4. Skill tags — neutral grey labels (Wave A: teal is reserved for clicks)
 *   5. Bottom row: industry badge (outline) + purple Simulation badge (only on
 *      roles with a built sim) | Explore →
 *
 * Hover: shadow-card-hover + translateY(-2px), 200ms ease
 */
export default function CareerCard({ career, isFavorite, onToggleFavorite, isSimulated }: CareerCardProps) {
  const { id, slug, emoji, title, industry, description, skills, hasSimulation } = career

  return (
    <article
      className="
        group flex flex-col bg-white rounded-card
        border border-border
        border-t-[4px] border-t-teal
        shadow-card
        hover:shadow-card-hover hover:-translate-y-0.5
        transition-all duration-200 ease-in-out
      "
    >
      {/* §7.6.1: 20px internal padding */}
      <div className="p-5 flex flex-col flex-1">

        {/* Row 1: emoji + heart (§7.6.1) */}
        <div className="flex items-start justify-between">
          {/* Emoji icon — 32px (§7.6.1) */}
          <span
            className="text-[32px] leading-none select-none"
            role="img"
            aria-label={title}
          >
            {emoji}
          </span>

          {/* Heart favorite button (§7.6.1) */}
          <button
            type="button"
            onClick={onToggleFavorite}
            aria-label={
              isFavorite
                ? `Remove ${title} from favorites`
                : `Save ${title} to favorites`
            }
            className="p-1 -mr-1 -mt-1 rounded-md transition-colors hover:bg-cream
              focus-visible:outline-none focus-visible:ring-2"
          >
            <Heart
              size={18}
              className={`transition-colors duration-150 ${
                isFavorite
                  ? 'fill-teal text-teal'
                  : 'text-muted hover:text-teal'
              }`}
            />
          </button>
        </div>

        {/* Title — §7.6.1: 16px bold Inter #111827, margin-top 12px */}
        <h3 className="font-sans font-bold text-[16px] text-dark mt-3 mb-1.5 leading-snug">
          {title}
        </h3>

        {/* Description — §7.6.1: 14px regular #6b7280. Clamped so the longer
            exploration-role descriptions don't make grid cards uneven; full text
            shows on the detail page. */}
        <p className="font-sans text-[14px] text-muted leading-relaxed mb-4 flex-1 line-clamp-4">
          {description}
        </p>

        {/* Skill tags — neutral labels, 12px, flex-wrap */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.map((skill) => (
            <span key={skill} className={badgeClasses({ kind: 'label' })}>
              {skill}
            </span>
          ))}
        </div>

        {/* Bottom row — §7.6.1: badges left / Explore → right */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-border mt-auto">
          <div className="flex items-center gap-1.5 flex-wrap">

            {/* Industry badge — neutral outline pill (§7.6.1) */}
            <span className={badgeClasses({ kind: 'outline' })}>
              {industry}
            </span>

            {/* Simulation badge — purple, the same treatment as the career
                page's "Simulation Available" badge, so one colour means
                simulation everywhere (Explore strip, Explore grid, quiz results).
                It reuses career.hasSimulation, the same flag that gates the sim
                routes. Roles without a sim show no badge here at all. */}
            {hasSimulation && (
              <span className={badgeClasses({ kind: 'sim' })}>
                Simulation
              </span>
            )}

            {isSimulated && (
              <span className={badgeClasses({ kind: 'done' })}>
                ✓ Done
              </span>
            )}
          </div>

          {/* Explore link (§5.2.2, §7.6.1) — the card's only navigation, so this
              is where the click is reported. This component is shared with the
              questionnaire results page; PostHog's $current_url tells the two
              surfaces apart. */}
          <Link
            href={`/careers/${slug}`}
            onClick={() => trackCareerCardClicked(id, hasSimulation)}
            className={buttonClasses({ variant: 'tertiary', size: 'inline', className: 'shrink-0 text-[13px]' })}
          >
            Explore →
          </Link>
        </div>
      </div>
    </article>
  )
}
