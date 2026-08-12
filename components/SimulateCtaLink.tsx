'use client'

// The "Start Simulation" CTA on a career detail page.
//
// This exists only so the CTA can report its click. The detail page
// (app/careers/[slug]/page.tsx) is a server component — it is statically
// rendered and cannot carry an onClick handler — so the link is lifted into this
// tiny client component. Markup and classes are identical to what lived inline
// before; nothing about the appearance or the destination changed.

import Link from 'next/link'
import { Play } from 'lucide-react'
import { trackSimulateCtaClicked } from '@/lib/analytics'

interface Props {
  careerId:   string
  careerSlug: string
}

export default function SimulateCtaLink({ careerId, careerSlug }: Props) {
  return (
    <Link
      href={`/careers/${careerSlug}/simulate`}
      onClick={() => trackSimulateCtaClicked(careerId)}
      className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-btn
        font-sans font-semibold text-[14px] text-white bg-teal hover:bg-teal-light
        transition-colors duration-150"
    >
      <Play size={15} aria-hidden="true" />
      Start Simulation
    </Link>
  )
}
