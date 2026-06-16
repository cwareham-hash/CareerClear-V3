import Link from 'next/link'
import Image from 'next/image'

/**
 * Site footer — navy, wordmark + tagline.
 * Server component (no interactivity).
 */
export default function SiteFooter() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        {/* Wordmark */}
        <Link href="/" className="inline-flex items-center gap-3 mb-4">
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

        <p className="font-sans text-[14px] text-white/70">
          Experience the career. Before you commit.
        </p>
      </div>
    </footer>
  )
}
