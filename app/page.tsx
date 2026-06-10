// Landing page — public marketing page, zero friction (no auth gate).
// The career grid experience lives at /explore.
import LandingHero from '@/components/landing/LandingHero'
import ProblemSection from '@/components/landing/ProblemSection'
import HowItWorks from '@/components/landing/HowItWorks'
import DifferentiationStrip from '@/components/landing/DifferentiationStrip'
import FinalCTA from '@/components/landing/FinalCTA'
import SiteFooter from '@/components/landing/SiteFooter'

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <ProblemSection />
      <HowItWorks />
      <DifferentiationStrip />
      <FinalCTA />
      <SiteFooter />
    </>
  )
}
