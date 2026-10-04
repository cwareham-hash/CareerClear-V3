import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { AuthProvider } from '@/lib/auth'
import PostHogProvider from '@/components/PostHogProvider'
import Navbar from '@/components/Navbar'
import AuthModal from '@/components/AuthModal'
import SiteFooter from '@/components/landing/SiteFooter'

// ── §7.5.2 Fonts, self-hosted via next/font/local ─────────────────────────────
// Decision (Oct 2026): the font files live in app/fonts/ and ship with the repo,
// replacing the Google Fonts loader, which fetched font definitions from
// Google at build time, and that fetch failed repeatedly on Vercel ("Cannot read
// properties of null (reading '1')" while loading Inter). Now neither the build
// nor a page load contacts Google. The files are the Fontsource project's
// latin-subset, variable-weight woff2 builds (SIL Open Font License; each
// license text sits beside its file). CSS variable names, display: swap and the
// weights the app uses are unchanged, so tailwind.config.ts and every component
// keep working as before.

const inter = localFont({
  src: './fonts/inter-latin-wght-normal.woff2',
  weight: '100 900', // variable font: covers the 400 / 500 / 600 / 700 the app uses
  variable: '--font-inter',
  display: 'swap',
})

const playfair = localFont({
  src: './fonts/playfair-display-latin-wght-normal.woff2',
  weight: '400 900', // variable font: covers the 700 / 800 the app uses
  variable: '--font-playfair',
  display: 'swap',
})

const jetbrains = localFont({
  src: './fonts/jetbrains-mono-latin-wght-normal.woff2',
  weight: '100 800', // variable font: covers the 400 / 500 the app uses
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Career Clear — Discover Your Future Career',
  description:
    'An education technology platform helping students and young professionals explore careers through immersive simulations.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans bg-cream text-dark antialiased">
        {/* Analytics wraps everything so pageviews cover every route, and so
            auth events fired from AuthProvider have PostHog available. */}
        <PostHogProvider>
          <AuthProvider>
            {/* Sticky nav renders above all page content (§7.3) */}
            <Navbar />
            <main>{children}</main>
            {/* Shared footer, rendered once here so it appears on every page */}
            <SiteFooter />
            {/* Single global auth modal, opened from navbar or simulation gate */}
            <AuthModal />
          </AuthProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
