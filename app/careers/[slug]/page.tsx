// §5.4 Career Card — Full Detail Page
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Play, ChevronRight } from 'lucide-react'
import { CAREERS } from '@/lib/careers'
import { CAREER_DETAIL } from '@/lib/careerDetail'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return CAREERS.map((career) => ({ slug: career.slug }))
}

export default function CareerDetailPage({ params }: Props) {
  const career = CAREERS.find((c) => c.slug === params.slug)
  if (!career) notFound()

  const detail = CAREER_DETAIL[career.slug] ?? null

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium
            text-muted hover:text-teal transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Explore
        </Link>

        {/* Career header — full width */}
        <div className="bg-white rounded-card border border-border border-t-[4px] border-t-teal
          shadow-card p-8 text-center">
          <p className="text-[56px] mb-4 select-none" aria-hidden="true">
            {career.emoji}
          </p>
          <h1 className="font-serif text-[32px] font-bold text-navy mb-3">
            {career.title}
          </h1>
          <p className="font-sans text-[15px] text-muted max-w-lg mx-auto mb-6">
            {career.description}
          </p>

          {/* Badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
            <span className="px-3 py-1 rounded-pill text-[12px] font-medium border border-teal text-teal">
              {career.industry}
            </span>
            {career.hasSimulation ? (
              <span className="px-3 py-1 rounded-pill text-[12px] font-medium bg-teal text-white">
                Simulation Available
              </span>
            ) : (
              <span className="px-3 py-1 rounded-pill text-[12px] font-medium border border-muted text-muted">
                Coming Soon
              </span>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {career.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-0.5 rounded-pill text-[12px] font-medium text-white"
                style={{ backgroundColor: 'var(--color-teal)' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {detail ? (
          <>
          {/* Two-column layout: main content left, sidebar right */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* ── LEFT COLUMN (2/3) ───────────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* About This Role */}
              <section className="bg-white rounded-card border border-border shadow-card p-8">
                <h2 className="font-sans font-bold text-[20px] text-dark mb-5">
                  About This Role
                </h2>
                <div className="space-y-4">
                  {detail.aboutRole.map((para, i) => (
                    <p key={i} className="font-sans text-[15px] text-dark leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </section>

              {/* Typical Workday */}
              <section className="bg-white rounded-card border border-border shadow-card p-8">
                <h2 className="font-sans font-bold text-[20px] text-dark mb-5">
                  Typical Workday
                </h2>
                <div className="space-y-4">
                  {detail.typicalWorkday.map((para, i) => (
                    <p key={i} className="font-sans text-[15px] text-dark leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </section>

              {/* AI Impact & Growth Outlook */}
              <section className="bg-white rounded-card border border-border shadow-card p-8">
                <h2 className="font-sans font-bold text-[20px] text-dark mb-5">
                  AI Impact &amp; Growth Outlook
                </h2>
                <div className="space-y-4">
                  {detail.aiImpact.map((para, i) => (
                    <p key={i} className="font-sans text-[15px] text-dark leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </section>

            </div>

            {/* ── RIGHT SIDEBAR (1/3) ─────────────────────────────────────── */}
            <div className="lg:col-span-1 flex flex-col gap-5">

              {/* Required Skills */}
              <div className="bg-white rounded-card border border-border shadow-card p-6">
                <h3 className="font-sans font-semibold text-[15px] text-dark mb-4">
                  Required Skills
                </h3>
                <ul className="space-y-2">
                  {detail.requiredSkills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--color-teal)' }}
                        aria-hidden="true"
                      />
                      <span className="font-sans text-[13px] text-dark leading-snug">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div className="bg-white rounded-card border border-border shadow-card p-6">
                <h3 className="font-sans font-semibold text-[15px] text-dark mb-4">
                  Education
                </h3>

                <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-2">
                  Typical Majors
                </p>
                <ul className="space-y-1.5 mb-5">
                  {detail.education.majors.map((major) => (
                    <li key={major} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--color-teal)' }}
                        aria-hidden="true"
                      />
                      <span className="font-sans text-[13px] text-dark leading-snug">
                        {major}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="font-sans text-[12px] font-semibold text-muted uppercase tracking-wide mb-2">
                  Graduate Degrees
                </p>
                <ul className="space-y-1.5">
                  {detail.education.graduateDegrees.map((degree) => (
                    <li key={degree} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--color-navy)' }}
                        aria-hidden="true"
                      />
                      <span className="font-sans text-[13px] text-dark leading-snug">
                        {degree}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Companies */}
              <div className="bg-white rounded-card border border-border shadow-card p-6">
                <h3 className="font-sans font-semibold text-[15px] text-dark mb-4">
                  Sample Companies
                </h3>
                <ul className="space-y-2">
                  {detail.sampleCompanies.map((company) => (
                    <li key={company} className="flex items-center gap-2">
                      <span
                        className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--color-border)' }}
                        aria-hidden="true"
                      />
                      <span className="font-sans text-[13px] text-dark">
                        {company}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Career Trajectory — full width */}
          <section className="mt-6 bg-white rounded-card border border-border shadow-card overflow-hidden">
            <div className="h-1" style={{ backgroundColor: 'var(--color-navy)' }} />
            <div className="px-8 py-8">
              <h2 className="font-sans font-bold text-[20px] text-dark mb-1">
                Career Trajectory
              </h2>
              <p className="font-sans text-[13px] text-muted mb-6">
                Typical progression within this field
              </p>

              <div className="overflow-x-auto">
                <div className="flex items-stretch min-w-full">
                  {detail.trajectory.map((stage, i) => (
                    <div key={i} className="flex items-center flex-1 min-w-[120px]">
                      {/* Stage card */}
                      <div
                        className="flex-1 min-w-0 rounded-[10px] border p-3 flex flex-col gap-2"
                        style={{
                          borderColor: i === 0 ? 'var(--color-teal)' : '#e5e7eb',
                          borderLeftWidth: i === 0 ? '3px' : '1px',
                        }}
                      >
                        {/* Number + title */}
                        <div className="flex items-start gap-2">
                          <span
                            className="flex-shrink-0 inline-flex items-center justify-center
                              w-5 h-5 rounded-full font-sans font-bold text-[11px] text-white mt-px"
                            style={{
                              backgroundColor:
                                i === 0 ? 'var(--color-teal)' : 'var(--color-navy)',
                            }}
                          >
                            {i + 1}
                          </span>
                          <p className="font-sans font-bold text-[13px] text-dark leading-snug">
                            {stage.title}
                          </p>
                        </div>
                        {/* Years pill */}
                        <span
                          className="self-start font-sans text-[11px] font-semibold rounded-pill px-2 py-0.5"
                          style={{
                            backgroundColor: 'var(--color-tag-bg)',
                            color: 'var(--color-teal)',
                          }}
                        >
                          {stage.years}
                        </span>
                        {/* Description */}
                        <p className="font-sans text-[12px] text-muted leading-snug">
                          {stage.description}
                        </p>
                      </div>

                      {/* Arrow between stages */}
                      {i < detail.trajectory.length - 1 && (
                        <ChevronRight
                          size={18}
                          aria-hidden="true"
                          className="flex-shrink-0 mx-1"
                          style={{ color: 'var(--color-muted)' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Start Simulation CTA — full width, pinned to bottom of detail content */}
          {career.hasSimulation && (
            <div className="mt-6 bg-white rounded-card border border-border shadow-card overflow-hidden">
              <div className="h-1" style={{ backgroundColor: 'var(--color-teal)' }} />
              <div className="px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="font-sans font-bold text-[16px] text-dark mb-1">
                    Ready to experience a week in this role?
                  </h2>
                  <p className="font-sans text-[14px] text-muted">
                    Step through real work scenarios, complete activities at your own pace, and
                    see what a day-to-day actually looks like.
                  </p>
                </div>
                <Link
                  href={`/careers/${career.slug}/simulate`}
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-btn
                    font-sans font-semibold text-[14px] text-white bg-teal hover:bg-teal-light
                    transition-colors duration-150"
                >
                  <Play size={15} aria-hidden="true" />
                  Start Simulation
                </Link>
              </div>
            </div>
          )}
          </>
        ) : (
          /* Placeholder for non-core careers */
          <div className="mt-6 bg-tag-bg border border-[#c8e6e2] rounded-card p-6 text-center">
            <p
              className="font-sans text-[14px] font-semibold mb-1"
              style={{ color: 'var(--color-teal)' }}
            >
              Full Career Detail Page
            </p>
            <p className="font-sans text-[13px] text-muted">
              Complete content — role description, education requirements, sample workday,
              AI impact outlook, and sample companies — coming soon.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
