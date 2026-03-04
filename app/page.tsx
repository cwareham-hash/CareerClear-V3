// Server component — HeroSection is server, CareerGrid is client.
// App Router handles the boundary automatically.
import HeroSection from '@/components/HeroSection'
import CareerGrid from '@/components/CareerGrid'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CareerGrid />
    </>
  )
}
