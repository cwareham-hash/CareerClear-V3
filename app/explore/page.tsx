// /explore — the career grid experience (search, filters, cards),
// moved here from the homepage when / became the marketing landing page.
import type { Metadata } from 'next'
import CareerGrid from '@/components/CareerGrid'

export const metadata: Metadata = {
  title: 'Explore Careers — Career Clear',
  description:
    'Browse careers across finance, consulting, law, tech and more — then experience them through immersive simulations.',
}

export default function ExplorePage() {
  return (
    <>
      {/* Compact page header — the marketing hero lives on / */}
      <section className="bg-navy" aria-label="Explore Careers">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
          <h1 className="font-serif text-[28px] md:text-[32px] font-bold text-white leading-tight mb-2">
            Explore Careers
          </h1>
          <p className="font-sans text-[15px] text-white/70 max-w-xl">
            Browse careers across finance, consulting, law, tech and more —
            including roles you did not know existed.
          </p>
        </div>
      </section>

      <CareerGrid />
    </>
  )
}
