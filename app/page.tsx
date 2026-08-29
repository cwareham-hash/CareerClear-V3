// Landing page — public marketing page, zero friction (no auth gate).
// The career grid experience lives at /explore.
import LandingHero from '@/components/landing/LandingHero'
import ProblemSection from '@/components/landing/ProblemSection'
import SimulationPreview from '@/components/landing/SimulationPreview'
import HowItWorks from '@/components/landing/HowItWorks'
import DifferentiationStrip from '@/components/landing/DifferentiationStrip'
import FinalCTA from '@/components/landing/FinalCTA'

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <ProblemSection />
      <SimulationPreview />
      <HowItWorks />
      <DifferentiationStrip />
      <FinalCTA />
    </>
  )
}
