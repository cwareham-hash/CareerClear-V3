// §5.5 Simulation interface — server wrapper
import { notFound } from 'next/navigation'
import { SIMULATIONS, getSimulation } from '@/lib/simulation'
import { CAREERS } from '@/lib/careers'
import SimulationClient from '@/components/simulation/SimulationClient'

interface Props {
  params: { slug: string }
}

// Pre-render only the careers that have simulations
export function generateStaticParams() {
  return SIMULATIONS.map((s) => ({ slug: s.slug }))
}

export default function SimulatePage({ params }: Props) {
  const simulation = getSimulation(params.slug)
  if (!simulation) notFound()

  // Route guard: a simulation may still be wired up (kept in SIMULATIONS) but
  // hidden behind the "Coming Soon" state via hasSimulation: false. Don't let a
  // hand-typed URL reach it. Re-enabling is a one-line flip in lib/careers.ts.
  const career = CAREERS.find((c) => c.id === simulation.careerId)
  if (!career?.hasSimulation) notFound()

  return <SimulationClient simulation={simulation} />
}
