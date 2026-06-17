'use client'

// A single PROJECT (e.g. Project Fresca). Shows a two-way Day-in-the-Life / Full
// Simulation toggle and renders the chosen experience via BlockExperience.
// Orientation is no longer a tier here — it is its own career-level route.
import { useState } from 'react'
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
      selector={
        <>
          <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-2">
            Choose your experience
          </p>
          <ExperienceToggle selected={experience} onChange={setExperience} />
        </>
      }
    />
  )
}
