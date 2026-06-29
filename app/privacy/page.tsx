import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What Career Clear collects and why, explained in plain language.',
}

/**
 * Privacy statement — simple, static, readable page (no interactivity).
 * Server component. Matches site typography (Playfair headings, Inter body)
 * and the cream/navy/dark palette, constrained to a comfortable reading width.
 */
export default function PrivacyPage() {
  return (
    <main className="bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          {/* Title */}
          <h1 className="font-serif text-[32px] md:text-[40px] font-bold text-navy leading-tight mb-2">
            Privacy Policy
          </h1>
          <p className="font-sans text-[14px] text-muted mb-10">
            Last updated: June 29, 2026
          </p>

          {/* Intro */}
          <p className="font-sans text-[16px] text-dark leading-relaxed mb-10">
            Career Clear helps students explore careers. This statement explains
            what we collect and why, in plain language.
          </p>

          <div className="flex flex-col gap-8">
            <section>
              <h2 className="font-serif text-[20px] font-bold text-navy mb-2">
                Information you give us
              </h2>
              <p className="font-sans text-[16px] text-dark leading-relaxed">
                When you create an account, we collect your name, email address,
                and password, and optionally your university. Your password is
                encrypted and is never stored in a readable form.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[20px] font-bold text-navy mb-2">
                Information we record as you use the site
              </h2>
              <p className="font-sans text-[16px] text-dark leading-relaxed">
                To run your account and save your place, we store your progress
                through simulations (which activities you have completed and when
                you were last active), any ratings and written feedback you choose
                to submit, and the careers you save as favorites.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[20px] font-bold text-navy mb-2">
                Stored in your browser
              </h2>
              <p className="font-sans text-[16px] text-dark leading-relaxed">
                If you take the career-match quiz, your answers and results are
                saved locally in your own browser to show your history. This quiz
                data stays on your device and is not sent to us.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[20px] font-bold text-navy mb-2">
                Analytics
              </h2>
              <p className="font-sans text-[16px] text-dark leading-relaxed">
                We use Google Analytics to understand how people use the site,
                such as which pages are visited and how long people stay. Google
                Analytics uses cookies and may collect your device type, browser,
                and approximate (city-level) location. We use this only to improve
                Career Clear.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[20px] font-bold text-navy mb-2">
                Service providers
              </h2>
              <p className="font-sans text-[16px] text-dark leading-relaxed">
                We use trusted third-party services to host Career Clear and to
                store your account and activity data securely. Standard technical
                information such as your IP address may appear in routine server
                logs, as it does for any website.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[20px] font-bold text-navy mb-2">
                How we use your information
              </h2>
              <p className="font-sans text-[16px] text-dark leading-relaxed">
                To operate your account, save your progress, and improve the
                product. We do not sell your personal information.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-[20px] font-bold text-navy mb-2">
                Questions
              </h2>
              <p className="font-sans text-[16px] text-dark leading-relaxed">
                Email{' '}
                <a
                  href="mailto:cwareham@chicagobooth.edu"
                  className="text-teal hover:text-teal-light transition-colors font-medium"
                >
                  cwareham@chicagobooth.edu
                </a>
                .
              </p>
            </section>
          </div>
      </div>
    </main>
  )
}
