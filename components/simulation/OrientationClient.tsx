'use client'

// Per-project Orientation — the briefing that sets up ONE project. Renders as a
// numbered reading list (no calendar, no day header, no legend), and ends with a
// forward step into the project so the briefing never dead-ends.
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { type TimeBlock } from '@/lib/simulation'
import BlockExperience from './BlockExperience'
import Breadcrumb from './Breadcrumb'

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

  // Forward step — always present (so it never dead-ends), and emphasized once
  // all three readings are done. Returns to the project landing so the student
  // picks WHICH project to enter (Orientation is career-level, projects are not).
  const renderFooter = (allComplete: boolean) => (
    <div className="max-w-[680px] mx-auto mt-8">
      {allComplete ? (
        <div
          className="rounded-card border-2 shadow-card px-6 py-6 text-center"
          style={{ borderColor: 'var(--color-teal)', backgroundColor: 'var(--color-tag-bg)' }}
        >
          <h2 className="font-serif text-[20px] font-bold text-navy mb-1">
            Ready to step into a project?
          </h2>
          <p className="font-sans text-[14px] text-dark/70 mb-4">
            You&apos;ve got the lay of the land. Now pick a project and experience the work itself.
          </p>
          <Link
            href={`/careers/${careerSlug}/simulate`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-teal text-white
              font-sans font-semibold text-[14px] transition-colors duration-150 hover:bg-teal-light"
          >
            Choose a project
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="text-center pt-2">
          <Link
            href={`/careers/${careerSlug}/simulate`}
            className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium
              transition-colors duration-150 hover:text-teal"
            style={{ color: 'var(--color-muted)' }}
          >
            Skip ahead to choose a project
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      )}
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
