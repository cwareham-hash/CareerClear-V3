// Career-level Orientation — the shared briefing, reached ONLY here (never
// through a project URL). Neutral chrome, no project header. Login + beta gating
// live inside the client (SimAccessGate).
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CAREER_SIMS, getCareerSim } from '@/lib/simulation'
import { CAREERS } from '@/lib/careers'
import OrientationClient from '@/components/simulation/OrientationClient'

interface Props {
  params: { slug: string }
}

// Pre-render one orientation page per career that has authored orientation content.
export function generateStaticParams() {
  return CAREER_SIMS.filter((cs) => cs.orientation.length > 0).map((cs) => ({ slug: cs.careerSlug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const careerSim = getCareerSim(params.slug)
  return {
    title: careerSim
      ? `Orientation · ${careerSim.title} — Career Clear`
      : 'Orientation — Career Clear',
  }
}

export default function OrientationPage({ params }: Props) {
  const careerSim = getCareerSim(params.slug)
  if (!careerSim) notFound()

  // Hidden ("Coming Soon") careers 404 here too.
  const career = CAREERS.find((c) => c.id === careerSim.careerId)
  if (!career?.hasSimulation) notFound()

  // No orientation authored → nothing to show.
  if (careerSim.orientation.length === 0) notFound()

  return (
    <OrientationClient
      careerId={careerSim.careerId}
      careerSlug={careerSim.careerSlug}
      careerTitle={careerSim.title}
      blocks={careerSim.orientation}
    />
  )
}
