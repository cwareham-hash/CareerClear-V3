import Link from 'next/link'
import Image from 'next/image'

/**
 * Site footer — navy, wordmark + links + copyright.
 * Rendered once in the root layout, so it appears on every page.
 * Server component (no interactivity).
 */
export default function SiteFooter() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        {/* Wordmark */}
        <Link href="/" className="inline-flex items-center gap-3 mb-5">
          <Image
            src="/logo-mark.png"
            alt="Career Clear logo"
            width={62}
            height={40}
            className="h-10 w-auto"
          />
          <span className="font-sans font-bold text-white text-[16px]">
            Career Clear
          </span>
        </Link>

        {/* Footer links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-6">
          <Link
            href="/our-story"
            className="font-sans text-[14px] text-white/70 hover:text-white transition-colors"
          >
            Our Story
          </Link>
          <Link
            href="/contact"
            className="font-sans text-[14px] text-white/70 hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="font-sans text-[14px] text-white/70 hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
        </nav>

        {/* Copyright */}
        <p className="font-sans text-[13px] text-white/70">
          © 2026 Career Clear. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
