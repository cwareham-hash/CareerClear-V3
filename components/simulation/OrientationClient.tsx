'use client'

// Career-level Orientation — a shared briefing, NOT a project. Neutral chrome
// (no project header), its own route, and progress kept at the career level
// (scenario = null). Renders via the shared BlockExperience engine.
import { type TimeBlock } from '@/lib/simulation'
import BlockExperience from './BlockExperience'

interface Props {
  careerId:    string
  careerTitle: string
  blocks:      TimeBlock[]
}

export default function OrientationClient({ careerId, careerTitle, blocks }: Props) {
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

  return (
    <BlockExperience
      careerId={careerId}
      accessLabel={`the ${careerTitle} orientation`}
      scenario={null}
      tier="orientation"
      blocks={blocks}
      progressNoun="readings"
      header={header}
    />
  )
}
