import Link from 'next/link'

/**
 * Site footer — navy, wordmark + tagline + placeholder contact line.
 * Server component (no interactivity).
 */
export default function SiteFooter() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        {/* Wordmark */}
        <Link href="/" className="inline-flex items-center gap-3 mb-4">
          <span
            className="flex items-center justify-center w-10 h-10 rounded-card bg-teal
              text-white font-serif font-bold text-lg select-none"
          >
            C
          </span>
          <span className="font-sans font-bold text-white text-[16px]">
            Career Clear
          </span>
        </Link>

        <p className="font-sans text-[14px] text-white/70 mb-6">
          Experience the career. Before you commit.
        </p>

        {/* Placeholder contact line — Collin will replace with real details */}
        <p className="font-sans text-[13px] text-white/50">
          Questions? Reach us at contact@careerclear.example (placeholder)
        </p>
      </div>
    </footer>
  )
}
