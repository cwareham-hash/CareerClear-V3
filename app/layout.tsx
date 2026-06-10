import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import AuthModal from '@/components/AuthModal'

// ── §7.5.2 Google Fonts via next/font/google ─────────────────────────────────
// Decision: using next/font/google rather than a raw <link> CDN tag.
// Same fonts, but next/font self-hosts at build time for zero CLS and no
// external round-trips — the recommended Next.js 14 approach.

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
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
        <AuthProvider>
          {/* AuthModal gates access until name is entered (§5.1) */}
          <AuthModal />
          {/* Sticky nav renders above all page content (§7.3) */}
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
