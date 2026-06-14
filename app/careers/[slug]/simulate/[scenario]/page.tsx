// One PROJECT (e.g. /careers/management-consultant/simulate/public-sector).
// Opens at the experience the user chose (?experience=day-in-life | full),
// defaulting to Day in the Life — never Orientation.
import { notFound } from 'next/navigation'
import { CAREER_SIMS, getScenario } from '@/lib/simulation'
import { CAREERS } from '@/lib/careers'
import SimulationClient from '@/components/simulation/SimulationClient'
import { type Experience } from '@/components/simulation/ExperienceToggle'

interface Props {
  params:       { slug: string; scenario: string }
  searchParams: { experience?: string }
}

// Pre-render one page per (career × project).
export function generateStaticParams() {
  return CAREER_SIMS.flatMap((cs) =>
    cs.scenarios.map((sc) => ({ slug: cs.careerSlug, scenario: sc.slug })),
  )
}

export default function ScenarioSimulatePage({ params, searchParams }: Props) {
  const simulation = getScenario(params.slug, params.scenario)
  if (!simulation) notFound()

  // Hidden ("Coming Soon") careers 404. Login + beta gating live inside the
  // client (SimAccessGate), so they apply on this route too.
  const career = CAREERS.find((c) => c.id === simulation.careerId)
  if (!career?.hasSimulation) notFound()

  const initialExperience: Experience = searchParams?.experience === 'full' ? 'full' : 'day-in-life'

  return <SimulationClient simulation={simulation} initialExperience={initialExperience} />
}
