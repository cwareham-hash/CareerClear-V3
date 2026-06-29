import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Career Clear.',
}

/**
 * Contact — simple, static, readable page (no interactivity). Server component.
 * Matches the privacy page: Playfair heading, Inter prose, cream background,
 * constrained to a comfortable reading width. Footer comes from the root layout.
 */
export default function ContactPage() {
  return (
    <main className="bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <h1 className="font-serif text-[32px] md:text-[40px] font-bold text-navy leading-tight mb-8">
          Contact
        </h1>

        <p className="font-sans text-[16px] text-dark leading-relaxed mb-6">
          We would love to hear from you. Whether you are a student, a university
          career center, or just curious about Career Clear, reach out anytime.
        </p>

        <p className="font-sans text-[16px] text-dark leading-relaxed">
          <a
            href="mailto:cwareham@chicagobooth.edu"
            className="text-teal hover:text-teal-light transition-colors font-medium"
          >
            cwareham@chicagobooth.edu
          </a>
        </p>
      </div>
    </main>
  )
}
