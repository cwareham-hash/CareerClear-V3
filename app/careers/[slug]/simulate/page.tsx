// §5.5 Simulation entry point — scenario routing.
//   0 scenarios → notFound (matches the old behavior).
//   1 scenario  → redirect straight in, no picker, no extra click.
//   2+ scenarios → show the scenario picker.
import { notFound, redirect } from 'next/navigation'
import { CAREER_SIMS, getCareerSim } from '@/lib/simulation'
import { CAREERS } from '@/lib/careers'
import ScenarioPicker from '@/components/simulation/ScenarioPicker'

interface Props {
  params: { slug: string }
}

// Pre-render one entry page per career that has a simulation wired up.
export function generateStaticParams() {
  return CAREER_SIMS.map((cs) => ({ slug: cs.careerSlug }))
}

export default function SimulatePage({ params }: Props) {
  const careerSim = getCareerSim(params.slug)
  if (!careerSim) notFound()

  // Same guard as the scenario page: hidden ("Coming Soon") careers 404 here too.
  const career = CAREERS.find((c) => c.id === careerSim.careerId)
  if (!career?.hasSimulation) notFound()

  const scenarios = careerSim.scenarios
  if (scenarios.length === 0) notFound()
  if (scenarios.length === 1) {
    redirect(`/careers/${params.slug}/simulate/${scenarios[0].slug}`)
  }

  return <ScenarioPicker careerSim={careerSim} />
}
