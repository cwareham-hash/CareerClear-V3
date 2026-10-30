'use client'

// The "Start Simulation" CTA on a career detail page.
//
// This exists only so the CTA can report its click. The detail page
// (app/careers/[slug]/page.tsx) is a server component — it is statically
// rendered and cannot carry an onClick handler — so the link is lifted into this
// tiny client component. It is a large primary button from the shared system
// (components/ui/buttons.ts), with a trailing arrow: it opens a page, so it uses
// the "go somewhere" arrow, not the ▷ that means "play audio" elsewhere.

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { trackSimulateCtaClicked } from '@/lib/analytics'
import { buttonClasses, BUTTON_ARROW, BUTTON_ICON } from '@/components/ui/buttons'

interface Props {
  careerId:   string
  careerSlug: string
  /** Button text. Defaults to the original bottom-CTA wording; the career page
   *  hero passes "Jump to Simulation" so both doors report their clicks. */
  label?:     string
  /** Layout-only extras from the caller (e.g. full width on phones). */
  className?: string
}

export default function SimulateCtaLink({ careerId, careerSlug, label = 'Start Simulation', className = '' }: Props) {
  return (
    <Link
      href={`/careers/${careerSlug}/simulate`}
      onClick={() => trackSimulateCtaClicked(careerId)}
      className={buttonClasses({ variant: 'primary', size: 'lg', className: `shrink-0 ${className}` })}
    >
      {label}
      <ArrowRight size={BUTTON_ICON.lg} aria-hidden="true" className={BUTTON_ARROW} />
    </Link>
  )
}
