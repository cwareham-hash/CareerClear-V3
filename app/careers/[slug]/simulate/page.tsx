// §5.5 Simulation interface — server wrapper
import { notFound } from 'next/navigation'
import { SIMULATIONS, getSimulation } from '@/lib/simulation'
import SimulationClient from '@/components/simulation/SimulationClient'

interface Props {
  params: { slug: string }
}

// Pre-render only the 4 careers that have simulations
export function generateStaticParams() {
  return SIMULATIONS.map((s) => ({ slug: s.slug }))
}

export default function SimulatePage({ params }: Props) {
  const simulation = getSimulation(params.slug)
  if (!simulation) notFound()

  return <SimulationClient simulation={simulation} />
}
