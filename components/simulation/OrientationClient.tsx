'use client'

// Per-project Orientation — the briefing that sets up ONE project. Renders as a
// numbered reading list (no calendar, no day header, no legend), and ends with a
// forward step into the project so the briefing never dead-ends.
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CalendarDays, CalendarRange } from 'lucide-react'
import { type TimeBlock } from '@/lib/simulation'
import BlockExperience from './BlockExperience'
import Breadcrumb from './Breadcrumb'
import SoftGateDialog from './SoftGateDialog'

interface Props {
  careerId:     string
  careerSlug:   string
  careerTitle:  string
  scenarioSlug: string   // project slug — scopes orientation progress
  projectTitle: string   // e.g. "Project Meridian"
  blocks:       TimeBlock[]
}

// Reading view shares the hub's centered ~two-thirds-width column (matches the
// Day in the Life view; never applies to the Full Simulation grid).
const READING_WIDTH = 'w-full lg:w-[min(66vw,1100px)]'

export default function OrientationClient({
  careerId,
  careerSlug,
  careerTitle,
  scenarioSlug,
  projectTitle,
  blocks,
}: Props) {
  const router = useRouter()
  // Soft nudge shown when the user opts to skip straight to the Full Simulation
  // from the orientation-complete state (discouraged, never blocked).
  const [skipOpen, setSkipOpen] = useState(false)

  // Forward routes for this same project.
  const dayHref  = `/careers/${careerSlug}/simulate/${scenarioSlug}?experience=day-in-life`
  const fullHref = `/careers/${careerSlug}/simulate/${scenarioSlug}?experience=full`
  const hubHref  = `/careers/${careerSlug}/simulate`

  // Back-navigation: Explore › Career › Simulation (hub) › Project · Orientation.
  const breadcrumb = (
    <Breadcrumb
      className="mb-5"
      items={[
        { label: 'Explore', href: '/explore' },
        { label: careerTitle, href: `/careers/${careerSlug}` },
        { label: 'Simulation', href: `/careers/${careerSlug}/simulate` },
        { label: `${projectTitle} · Orientation` },
      ]}
    />
  )

  const header = (
    <>
      <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-1">
        {projectTitle}
      </p>
      <h1 className="font-serif text-[26px] lg:text-[30px] font-bold text-navy leading-tight mb-3">
        Orientation
      </h1>
      <p className="font-sans text-[14px] text-muted leading-relaxed max-w-2xl">
        Start here to set the scene for this project before stepping into the work itself.
      </p>
    </>
  )

  // Forward step — always present (so it never dead-ends). Once the readings are
  // all done, the completion moment offers three controls (C8/C9): a prominent
  // green CTA into THIS project's Day in the Life, a quiet "Back to project"
  // (the hub), and an understated "Skip to the full simulation" link that routes
  // through the soft gate. Nothing is locked.
  const renderFooter = (allComplete: boolean) => (
    <div className="max-w-[680px] mx-auto mt-8">
      {allComplete ? (
        <div
          className="rounded-card border-2 shadow-card px-6 py-6 text-center"
          style={{ borderColor: 'var(--color-teal)', backgroundColor: 'var(--color-tag-bg)' }}
        >
          <h2 className="font-serif text-[20px] font-bold text-navy mb-1">
            You&apos;ve finished Orientation
          </h2>
          <p className="font-sans text-[14px] text-dark/70 mb-5">
            You&apos;ve got the lay of the land. Step into the work when you&apos;re ready.
          </p>

          {/* 1 — prominent forward CTA → Day in the Life. Colored to match the
              orientation completion checkmark circle (var(--color-teal)). */}
          <Link
            href={dayHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-btn text-white
              font-sans font-semibold text-[14px] transition-opacity duration-150 hover:opacity-90
              focus-visible:outline-none focus-visible:ring-2"
            style={{ backgroundColor: 'var(--color-teal)' }}
          >
            <CalendarDays size={16} aria-hidden="true" />
            Continue to Day in the Life
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          {/* 2 — lower-emphasis back to this project on the hub. */}
          <div className="mt-4">
            <Link
              href={hubHref}
              className="inline-flex items-center justify-center px-5 py-2 rounded-btn
                border border-border text-dark font-sans font-semibold text-[13px]
                transition-colors duration-150 hover:border-teal hover:text-teal
                focus-visible:outline-none focus-visible:ring-2"
            >
              Back to project
            </Link>
          </div>

          {/* 3 — deliberately understated skip link → soft-gate nudge → Full Simulation. */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setSkipOpen(true)}
              className="font-sans text-[12px] text-muted underline underline-offset-2
                transition-colors duration-150 hover:text-dark
                rounded focus-visible:outline-none focus-visible:ring-2"
            >
              Skip to the full simulation
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center pt-2">
          <Link
            href={hubHref}
            className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium
              transition-colors duration-150 hover:text-teal"
            style={{ color: 'var(--color-muted)' }}
          >
            Skip ahead
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      )}

      {/* Gentle nudge for the skip-ahead link — reuses the shared SoftGateDialog. */}
      <SoftGateDialog
        open={skipOpen}
        onClose={() => setSkipOpen(false)}
        title="Skip to the full simulation?"
        description="Most people try a day in the life first. Continue to the full simulation anyway?"
        Icon={CalendarRange}
        primaryLabel="Continue to the full simulation"
        primaryIcon={CalendarRange}
        onPrimary={() => { setSkipOpen(false); router.push(fullHref) }}
        secondaryLabel="Not now"
        onSecondary={() => setSkipOpen(false)}
      />
    </div>
  )

  return (
    <BlockExperience
      careerId={careerId}
      accessLabel={`the ${projectTitle} orientation`}
      scenario={scenarioSlug}
      tier="orientation"
      blocks={blocks}
      progressNoun="readings"
      header={header}
      breadcrumb={breadcrumb}
      widthClass={READING_WIDTH}
      variant="reading"
      footer={renderFooter}
    />
  )
}
