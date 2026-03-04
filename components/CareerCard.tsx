'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import type { Career } from '@/lib/careers'

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
 *   4. Skill tags — teal filled pills (#2a9d8f bg, white text, 12px)
 *   5. Bottom row: industry badge (outline) + Simulation/Coming Soon badge | Explore →
 *
 * Hover: shadow-card-hover + translateY(-2px), 200ms ease
 */
export default function CareerCard({ career, isFavorite, onToggleFavorite, isSimulated }: CareerCardProps) {
  const { slug, emoji, title, industry, description, skills, hasSimulation } = career

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
            className="p-1 -mr-1 -mt-1 rounded-md transition-colors hover:bg-cream"
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

        {/* Description — §7.6.1: 14px regular #6b7280, 2–3 lines */}
        <p className="font-sans text-[14px] text-muted leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Skill tags — §7.6.1: teal filled pills, white text, 12px, flex-wrap */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-0.5 rounded-pill text-[12px] font-medium text-white"
              style={{ backgroundColor: 'var(--color-teal)' }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Bottom row — §7.6.1: badges left / Explore → right */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-border mt-auto">
          <div className="flex items-center gap-1.5 flex-wrap">

            {/* Industry badge — outline pill (§7.6.1) */}
            <span
              className="px-2.5 py-0.5 rounded-pill text-[12px] font-medium
                border border-teal text-teal"
            >
              {industry}
            </span>

            {/* Simulation OR Coming Soon badge
                Decision: "Coming Soon" badge uses muted outline style to
                clearly signal it's not yet available. The spec doesn't define
                the demo-role badge style; user specified "Coming Soon". */}
            {hasSimulation ? (
              <span
                className="px-2.5 py-0.5 rounded-pill text-[12px] font-medium
                  bg-teal text-white"
              >
                Simulation
              </span>
            ) : (
              <span
                className="px-2.5 py-0.5 rounded-pill text-[12px] font-medium
                  border border-muted text-muted"
              >
                Coming Soon
              </span>
            )}

            {isSimulated && (
              <span
                className="px-2.5 py-0.5 rounded-pill text-[12px] font-medium"
                style={{ backgroundColor: 'var(--color-tag-bg)', color: 'var(--color-teal)' }}
              >
                ✓ Done
              </span>
            )}
          </div>

          {/* Explore link (§5.2.2, §7.6.1) */}
          <Link
            href={`/careers/${slug}`}
            className="font-sans text-[13px] font-semibold text-teal
              hover:text-teal-light transition-colors duration-150 shrink-0"
          >
            Explore →
          </Link>
        </div>
      </div>
    </article>
  )
}
