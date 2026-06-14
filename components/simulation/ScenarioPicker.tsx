// Scenario picker — shown at /careers/[slug]/simulate when a career has 2+
// scenarios. The shared, career-level Orientation is surfaced once at the top,
// separate from the per-scenario cards (each scenario owns its own
// Day-in-the-Life and Full Simulation).
import Link from 'next/link'
import { BookOpen, Play } from 'lucide-react'
import type { CareerSim } from '@/lib/simulation'

interface Props {
  careerSim: CareerSim
}

export default function ScenarioPicker({ careerSim }: Props) {
  const { careerSlug, title, orientation, scenarios } = careerSim
  // Orientation is identical across scenarios; entry is via any scenario's page.
  const orientationHref = `/careers/${careerSlug}/simulate/${scenarios[0]?.slug ?? ''}`

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8">

        {/* Header */}
        <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-1">
          {title}
        </p>
        <h1 className="font-serif text-[26px] lg:text-[30px] font-bold text-navy leading-tight mb-2">
          Choose a scenario
        </h1>
        <p className="font-sans text-[14px] text-muted leading-relaxed max-w-2xl mb-8">
          Start with the shared Orientation to understand the role, then step into any
          scenario for a Day-in-the-Life or the Full Simulation.
        </p>

        {/* Shared, career-level Orientation — surfaced once, above the scenarios */}
        {orientation.length > 0 && (
          <Link
            href={orientationHref}
            className="block bg-white rounded-card border border-border shadow-card overflow-hidden mb-8
              transition-shadow duration-200 hover:shadow-card-hover"
          >
            <div className="h-1" style={{ backgroundColor: 'var(--color-teal)' }} />
            <div className="px-6 py-5 flex items-center gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-tag-bg flex items-center justify-center">
                <BookOpen size={18} style={{ color: 'var(--color-teal)' }} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="font-sans font-bold text-[16px] text-dark mb-0.5">
                  Orientation — shared briefing
                </h2>
                <p className="font-sans text-[13px] text-muted">
                  {orientation.length} short reading{orientation.length === 1 ? '' : 's'} ·
                  the same overview for every scenario
                </p>
              </div>
            </div>
          </Link>
        )}

        {/* Per-scenario cards */}
        <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-3">
          Scenarios
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((sc) => (
            <Link
              key={sc.id}
              href={`/careers/${careerSlug}/simulate/${sc.slug}`}
              className="group block bg-white rounded-card border border-border shadow-card overflow-hidden
                transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <div className="h-1" style={{ backgroundColor: 'var(--color-teal)' }} />
              <div className="px-6 py-5 flex flex-col h-full">
                <h3 className="font-sans font-bold text-[16px] text-dark mb-1">{sc.title}</h3>
                <p className="font-sans text-[13px] font-medium text-muted mb-2">{sc.project}</p>
                <p className="font-sans text-[14px] text-muted leading-relaxed line-clamp-4 mb-4">
                  {sc.scenario}
                </p>
                <span
                  className="mt-auto inline-flex items-center gap-1.5 font-sans font-semibold text-[14px]"
                  style={{ color: 'var(--color-teal)' }}
                >
                  <Play size={14} aria-hidden="true" />
                  Start scenario
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
