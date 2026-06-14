'use client'

// A single project on the landing page. Type-first label, codename beneath, and
// a compact description that expands in place via "Read more" (no navigation).
// The two entry buttons (Day in the Life / Full Simulation) link straight into
// the project at that experience.
import { useState } from 'react'
import Link from 'next/link'
import { CalendarDays, CalendarRange, ChevronDown, ChevronUp } from 'lucide-react'
import type { Scenario } from '@/lib/simulation'

interface Props {
  scenario:   Scenario
  careerSlug: string
}

export default function ProjectCard({ scenario: sc, careerSlug }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-card border border-border shadow-card overflow-hidden flex flex-col">
      <div className="h-1" style={{ backgroundColor: 'var(--color-teal)' }} />
      <div className="px-6 py-5 flex flex-col flex-1">
        {/* TYPE is primary; codename is secondary */}
        <h3 className="font-serif text-[22px] font-bold text-navy leading-tight">
          {sc.type ?? sc.title}
        </h3>
        <p className="font-sans text-[13px] font-medium text-muted mb-3">{sc.title}</p>

        {/* Description — clamped by default, full when expanded */}
        <p
          className={`font-sans text-[14px] text-muted leading-relaxed mb-1 ${
            expanded ? '' : 'line-clamp-2'
          }`}
        >
          {sc.scenario}
        </p>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="self-start inline-flex items-center gap-1 mb-4 font-sans text-[13px] font-semibold
            transition-colors duration-150 hover:opacity-80"
          style={{ color: 'var(--color-teal)' }}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read more'}
          {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
        </button>

        {/* Two direct entry points */}
        <div className="mt-auto flex flex-col sm:flex-row gap-2">
          <Link
            href={`/careers/${careerSlug}/simulate/${sc.slug}?experience=day-in-life`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-btn
              bg-teal text-white font-sans font-semibold text-[13px]
              transition-colors duration-150 hover:bg-teal-light"
          >
            <CalendarDays size={14} aria-hidden="true" />
            Day in the Life
          </Link>
          <Link
            href={`/careers/${careerSlug}/simulate/${sc.slug}?experience=full`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-btn
              border border-border text-dark font-sans font-semibold text-[13px]
              transition-colors duration-150 hover:border-teal hover:text-teal"
          >
            <CalendarRange size={14} aria-hidden="true" />
            Full Simulation
          </Link>
        </div>
      </div>
    </div>
  )
}
