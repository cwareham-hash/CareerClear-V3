// Simulation entry point — the landing page for a career. Always shows the
// shared Orientation plus the projects (no auto-redirect). Project selection and
// the Day-in-the-Life / Full choice happen here, on one page.
import { notFound } from 'next/navigation'
import { CAREER_SIMS, getCareerSim } from '@/lib/simulation'
import { CAREERS } from '@/lib/careers'
import SimulationLanding from '@/components/simulation/SimulationLanding'

interface Props {
  params: { slug: string }
}

// Pre-render one landing page per career that has a simulation wired up.
export function generateStaticParams() {
  return CAREER_SIMS.map((cs) => ({ slug: cs.careerSlug }))
}

export default function SimulatePage({ params }: Props) {
  const careerSim = getCareerSim(params.slug)
  if (!careerSim) notFound()

  // Hidden ("Coming Soon") careers 404 here too.
  const career = CAREERS.find((c) => c.id === careerSim.careerId)
  if (!career?.hasSimulation) notFound()

  return <SimulationLanding careerSim={careerSim} />
}
