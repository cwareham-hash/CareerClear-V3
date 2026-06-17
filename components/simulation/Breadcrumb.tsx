import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

// Shared breadcrumb (same style as the simulation hub): chevron separators,
// muted text, focus-visible rings on links. Items with an `href` render as
// links; the final item (or any without href) renders as plain current-page text.
export interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ items, className = '' }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 font-sans text-[13px] text-muted flex-wrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded hover:text-teal transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-dark font-medium' : ''} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight size={14} className="text-muted/60 shrink-0" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
