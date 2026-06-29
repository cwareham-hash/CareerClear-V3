import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Why we built Career Clear — to give every student an honest view of what a career is really like.',
}

/**
 * Our Story — simple, static, readable page (no interactivity). Server
 * component. Matches the privacy page: Playfair heading, Inter prose, cream
 * background, constrained to a comfortable reading width. The shared footer is
 * rendered by the root layout.
 */
export default function OurStoryPage() {
  return (
    <main className="bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <h1 className="font-serif text-[32px] md:text-[40px] font-bold text-navy leading-tight mb-8">
          Our Story
        </h1>

        <div className="flex flex-col gap-6">
          <p className="font-sans text-[16px] text-dark leading-relaxed">
            Career Clear started with a simple frustration: choosing a career is
            one of the biggest decisions you make, and most people make it almost
            blind. Our founder felt it firsthand a decade ago, picking a path with
            little real sense of what the day-to-day actually looked like. After
            talking with dozens of students, it was clear the problem had not
            changed. Google searches and coffee chats still leave you with a
            surface-level picture at best, and the students with the right
            connections get a head start that everyone else does not.
          </p>
          <p className="font-sans text-[16px] text-dark leading-relaxed">
            We built Career Clear to close that gap. Instead of reading about a
            job, you step into it, shadowing a professional through a realistic
            week of work so you can feel whether a role fits before you commit to
            it. Our goal is simple: give every student a clear, honest view of
            what a career is really like, no matter who they know or where they
            come from.
          </p>
        </div>
      </div>
    </main>
  )
}
