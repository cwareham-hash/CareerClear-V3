// §5.5 Simulation interface — server wrapper for ONE scenario
import { notFound } from 'next/navigation'
import { CAREER_SIMS, getScenario } from '@/lib/simulation'
import { CAREERS } from '@/lib/careers'
import SimulationClient from '@/components/simulation/SimulationClient'

interface Props {
  params: { slug: string; scenario: string }
}

// Pre-render one page per (career × scenario).
export function generateStaticParams() {
  return CAREER_SIMS.flatMap((cs) =>
    cs.scenarios.map((sc) => ({ slug: cs.careerSlug, scenario: sc.slug })),
  )
}

export default function ScenarioSimulatePage({ params }: Props) {
  const simulation = getScenario(params.slug, params.scenario)
  if (!simulation) notFound()

  // Route guard: a simulation may still be wired up but hidden behind the
  // "Coming Soon" state via hasSimulation: false. Don't let a hand-typed URL
  // reach it. (Login + beta-access gating live inside SimulationClient, so they
  // apply identically here.) Re-enabling is a one-line flip in lib/careers.ts.
  const career = CAREERS.find((c) => c.id === simulation.careerId)
  if (!career?.hasSimulation) notFound()

  return <SimulationClient simulation={simulation} />
}
