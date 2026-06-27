'use client'

// A single PROJECT (e.g. Project Fresca). Shows a two-way Day-in-the-Life / Full
// Simulation toggle and renders the chosen experience via BlockExperience.
// Orientation is no longer a tier here — it is its own career-level route.
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CalendarRange } from 'lucide-react'
import { type Simulation } from '@/lib/simulation'
import BlockExperience from './BlockExperience'
import Breadcrumb from './Breadcrumb'
import ExperienceToggle, { type Experience } from './ExperienceToggle'

// ADJUST DAY-IN-LIFE WIDTH here — match the hub: ~two-thirds of the viewport on
// wide screens, capped so it never gets absurdly wide; fills width on mobile.
const DAY_IN_LIFE_WIDTH = 'w-full lg:w-[min(66vw,1100px)]'

interface Props {
  simulation: Simulation
  // Which experience to open first (from the button the user clicked). Defaults
  // to Day in the Life — a project's real content, never Orientation.
  initialExperience?: Experience
}

export default function SimulationClient({ simulation, initialExperience = 'day-in-life' }: Props) {
  const { careerId, careerSlug, scenarioSlug, title, scenario, project } = simulation
  const [experience, setExperience] = useState<Experience>(initialExperience)
  const router = useRouter()

  // Switch the visible tier AND keep the URL's ?experience= in sync, so a refresh
  // or a shared link lands on the same view. Used by BOTH the in-page toggle and
  // the Day-in-the-Life completion card, so the two behave identically. This is a
  // same-route query change, so a plain <Link> soft-navigation would update the
  // URL without re-seeding this already-mounted component's state — hence the
  // explicit setExperience. router.replace keeps history clean; we scroll to the
  // top so switching from the completion card lands at the start of the grid.
  const changeExperience = useCallback(
    (next: Experience) => {
      setExperience(next)
      router.replace(
        `/careers/${careerSlug}/simulate/${scenarioSlug}?experience=${next}`,
        { scroll: false },
      )
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [router, careerSlug, scenarioSlug],
  )

  const blocks = simulation.tiers[experience]

  const experienceLabel = experience === 'full' ? 'Full Simulation' : 'Day in the Life'

  // Back-navigation: Explore › Career › Simulation (hub) › Project · <experience>.
  const breadcrumb = (
    <Breadcrumb
      className="mb-5"
      items={[
        { label: 'Explore', href: '/explore' },
        { label: title, href: `/careers/${careerSlug}` },
        { label: 'Simulation', href: `/careers/${careerSlug}/simulate` },
        { label: experienceLabel },
      ]}
    />
  )

  // Day in the Life uses the hub's centered ~two-thirds-width column; the Full
  // Simulation view keeps its existing wide layout (unchanged this phase).
  const widthClass = experience === 'day-in-life' ? DAY_IN_LIFE_WIDTH : undefined

  // Back route for the Day-in-the-Life completion card (genuine cross-route nav).
  const hubHref = `/careers/${careerSlug}/simulate`

  // Day-in-the-Life completion card — mirrors the orientation completion card,
  // shown below the timeline once every block is done. Two controls only (no skip
  // link, no soft gate). Full Simulation gets no footer card.
  const renderDayFooter = (allComplete: boolean) =>
    allComplete ? (
      <div className="max-w-[680px] mx-auto mt-8">
        <div
          className="rounded-card border-2 shadow-card px-6 py-6 text-center"
          style={{ borderColor: 'var(--color-teal)', backgroundColor: 'var(--color-tag-bg)' }}
        >
          <h2 className="font-serif text-[20px] font-bold text-navy mb-1">
            You&apos;ve finished the Day in the Life
          </h2>
          <p className="font-sans text-[14px] text-dark/70 mb-5">
            You&apos;ve seen a day in the role. Step into the full week when you&apos;re ready.
          </p>

          {/* Prominent forward CTA → Full Simulation, colored to match the
              completion checkmark (var(--color-teal)). Switches the view in place
              and syncs the URL via the shared handler (a plain Link soft-nav would
              flip the URL but not this mounted component's state). */}
          <button
            type="button"
            onClick={() => changeExperience('full')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-btn text-white
              font-sans font-semibold text-[14px] transition-opacity duration-150 hover:opacity-90
              focus-visible:outline-none focus-visible:ring-2"
            style={{ backgroundColor: 'var(--color-teal)' }}
          >
            <CalendarRange size={16} aria-hidden="true" />
            Continue to the Full Simulation
            <ArrowRight size={16} aria-hidden="true" />
          </button>

          {/* Lower-emphasis back to this project on the hub. */}
          <div className="mt-4">
            <Link
              href={hubHref}
              className="inline-flex items-center justify-center px-5 py-2 rounded-btn
                border border-border text-dark font-sans font-semibold text-[13px]
                transition-colors duration-150 hover:border-teal hover:text-teal
                focus-visible:outline-none focus-visible:ring-2"
            >
              Back to project
            </Link>
          </div>
        </div>
      </div>
    ) : null

  const header = (
    <>
      <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-1">
        {title}
      </p>
      <h1 className="font-serif text-[26px] lg:text-[30px] font-bold text-navy leading-tight mb-3">
        {project}
      </h1>
      <p className="font-sans text-[14px] text-muted leading-relaxed max-w-2xl">
        {scenario}
      </p>
    </>
  )

  return (
    <BlockExperience
      careerId={careerId}
      accessLabel={`the ${project} simulation`}
      scenario={scenarioSlug}
      tier={experience}
      blocks={blocks}
      header={header}
      breadcrumb={breadcrumb}
      widthClass={widthClass}
      connectors={experience === 'full' ? simulation.connectors : undefined}
      footer={experience === 'day-in-life' ? renderDayFooter : undefined}
      selector={
        <>
          <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-2">
            Choose your experience
          </p>
          <ExperienceToggle selected={experience} onChange={changeExperience} />
        </>
      }
    />
  )
}
