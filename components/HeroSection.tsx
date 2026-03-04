// Server component — no client-side state needed
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

/**
 * §5.2.1 Hero Section
 * Full-width navy-to-teal gradient, Playfair Display headline,
 * 2-line muted-teal subtitle, "Take Career Quiz" CTA.
 * Heights: 340px desktop / 280px mobile.
 */
export default function HeroSection() {
  return (
    <section
      className="w-full flex items-center justify-center text-center px-6
        h-[280px] md:h-[340px]"
      style={{
        // §5.2.1: deep navy-to-teal gradient (#1a2744 → #2a9d8f)
        // Decision: 135deg diagonal — direction not specified in spec;
        // diagonal reads naturally as a hero gradient and avoids a flat
        // left-to-right split on wide viewports.
        background: 'linear-gradient(135deg, #1a2744 0%, #2a9d8f 100%)',
      }}
      aria-label="Hero — Discover Your Future Career"
    >
      <div className="max-w-2xl mx-auto">

        {/* §7.5.2: Hero Headline — Playfair Display, 40px, Bold, White */}
        {/* Responsive: 32px on mobile, 40px on md+ to fit the reduced height */}
        <h1 className="font-serif text-[32px] md:text-[40px] font-bold text-white leading-tight mb-4">
          Discover Your Future Career
        </h1>

        {/* §5.2.1: 2-line subtitle in muted teal */}
        {/* Decision: subtitle text not given in spec — written to match the
            product's value proposition. Color #a8c8c4 matches the spec
            document's own cover subtitle and isn't a named token. */}
        <p
          className="font-sans text-[15px] leading-relaxed mb-7"
          style={{ color: '#a8c8c4' }}
        >
          Explore immersive simulations for real careers.<br />
          Find your perfect path before you commit.
        </p>

        {/* §5.2.1: Primary CTA — teal bg, white text, sparkle icon */}
        <Link
          href="/questionnaire"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-btn
            bg-teal text-white font-sans font-semibold text-[14px]
            hover:bg-teal-light transition-colors duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <Sparkles size={16} aria-hidden="true" />
          Take Career Quiz
        </Link>
      </div>
    </section>
  )
}
