'use client'

// Career-level Orientation — a shared briefing, NOT a project. Renders as a
// three-part numbered reading list (no calendar, no day header, no legend), and
// ends with a forward step into a project so the briefing never dead-ends.
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { type TimeBlock } from '@/lib/simulation'
import BlockExperience from './BlockExperience'

interface Props {
  careerId:    string
  careerSlug:  string
  careerTitle: string
  blocks:      TimeBlock[]
}

export default function OrientationClient({ careerId, careerSlug, careerTitle, blocks }: Props) {
  const header = (
    <>
      <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-1">
        {careerTitle}
      </p>
      <h1 className="font-serif text-[26px] lg:text-[30px] font-bold text-navy leading-tight mb-3">
        Orientation
      </h1>
      <p className="font-sans text-[14px] text-muted leading-relaxed max-w-2xl">
        Start here to understand the role before stepping into a project. The same overview
        applies to every project in this career.
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
      accessLabel={`the ${careerTitle} orientation`}
      scenario={null}
      tier="orientation"
      blocks={blocks}
      progressNoun="readings"
      header={header}
      variant="reading"
      footer={renderFooter}
    />
  )
}
