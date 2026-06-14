// Simulation landing page for a career. Shows the shared, career-level
// Orientation prominently on top (its own route), then the projects presented
// TYPE-FIRST, each with two direct entry buttons: Day in the Life and Full
// Simulation. No "scenario" wording — the user sees "project".
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import type { CareerSim } from '@/lib/simulation'
import ProjectCard from './ProjectCard'

interface Props {
  careerSim: CareerSim
}

export default function SimulationLanding({ careerSim }: Props) {
  const { careerSlug, title, orientation, scenarios } = careerSim

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8">

        {/* Header */}
        <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-1">
          {title}
        </p>
        <h1 className="font-serif text-[26px] lg:text-[30px] font-bold text-navy leading-tight mb-2">
          Choose a project
        </h1>
        <p className="font-sans text-[14px] text-muted leading-relaxed max-w-2xl mb-8">
          New here? Start with the Orientation to understand the role. Then step into any
          project — try a Day in the Life, or commit to the Full Simulation.
        </p>

        {/* Shared, career-level Orientation — prominent, the natural starting point */}
        {orientation.length > 0 && (
          <Link
            href={`/careers/${careerSlug}/orientation`}
            className="group block rounded-card border-2 shadow-card overflow-hidden mb-10
              transition-shadow duration-200 hover:shadow-card-hover"
            style={{ borderColor: 'var(--color-teal)', backgroundColor: 'var(--color-tag-bg)' }}
          >
            <div className="px-6 py-5 flex items-center gap-4">
              <span className="shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <BookOpen size={22} style={{ color: 'var(--color-teal)' }} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-sans font-bold text-[17px] text-navy mb-0.5">
                  Start here — Orientation
                </h2>
                <p className="font-sans text-[13px] text-dark/70">
                  Understand the role before any project · {orientation.length} short reading{orientation.length === 1 ? '' : 's'}
                </p>
              </div>
              <ArrowRight
                size={20}
                style={{ color: 'var(--color-teal)' }}
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
          </Link>
        )}

        {/* Projects — type-first */}
        <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-3">
          Projects
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {scenarios.map((sc) => (
            <ProjectCard key={sc.id} scenario={sc} careerSlug={careerSlug} />
          ))}
        </div>
      </div>
    </div>
  )
}
