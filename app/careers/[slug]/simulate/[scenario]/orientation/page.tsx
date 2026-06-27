// Per-project Orientation — the briefing for ONE project (e.g.
// /careers/management-consultant/simulate/meridian/orientation). Orientation is
// now a property of each project, not a shared career-level layer. Login + beta
// gating live inside the client (SimAccessGate).
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CAREER_SIMS, getCareerSim } from '@/lib/simulation'
import { CAREERS } from '@/lib/careers'
import OrientationClient from '@/components/simulation/OrientationClient'

interface Props {
  params: { slug: string; scenario: string }
}

// Pre-render one orientation page per (career × project) that has authored
// orientation content.
export function generateStaticParams() {
  return CAREER_SIMS.flatMap((cs) =>
    cs.scenarios
      .filter((sc) => sc.tiers.orientation.length > 0)
      .map((sc) => ({ slug: cs.careerSlug, scenario: sc.slug })),
  )
}

export function generateMetadata({ params }: Props): Metadata {
  const careerSim = getCareerSim(params.slug)
  const sc = careerSim?.scenarios.find((s) => s.slug === params.scenario)
  return {
    title:
      careerSim && sc
        ? `Orientation · ${sc.title} — Career Clear`
        : 'Orientation — Career Clear',
  }
}

export default function ProjectOrientationPage({ params }: Props) {
  const careerSim = getCareerSim(params.slug)
  if (!careerSim) notFound()

  // Hidden ("Coming Soon") careers 404 here too.
  const career = CAREERS.find((c) => c.id === careerSim.careerId)
  if (!career?.hasSimulation) notFound()

  const sc = careerSim.scenarios.find((s) => s.slug === params.scenario)
  if (!sc || sc.tiers.orientation.length === 0) notFound()

  return (
    <OrientationClient
      careerId={careerSim.careerId}
      careerSlug={careerSim.careerSlug}
      careerTitle={careerSim.title}
      scenarioSlug={sc.slug}
      projectTitle={sc.title}
      blocks={sc.tiers.orientation}
    />
  )
}
