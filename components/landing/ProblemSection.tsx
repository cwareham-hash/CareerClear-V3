'use client'

import { motion } from 'framer-motion'
import { EyeOff, FileText, Hourglass } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ProblemBlock {
  icon: LucideIcon
  title: string
  body: string
}

const BLOCKS: ProblemBlock[] = [
  {
    icon: EyeOff,
    title: "You can't pursue what you've never heard of",
    body: 'Most students only ever hear about a handful of careers, and miss roles they would have loved simply because nothing ever put those roles in front of them.',
  },
  {
    icon: FileText,
    title: "Descriptions aren't experience",
    body: "Even for the roles you do find, job postings and coffee chats can't tell you what the work actually feels like day to day.",
  },
  {
    icon: Hourglass,
    title: 'The clock is against you',
    body: "Recruiting timelines force you to commit to a path before you've ever truly experienced it.",
  },
]

/**
 * Problem section — cream background, three side-by-side pain points
 * (stacked on mobile).
 */
export default function ProblemSection() {
  return (
    <section className="bg-cream" aria-label="The problem">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <motion.h2
          className="font-serif text-[28px] md:text-[32px] font-bold text-navy text-center leading-tight mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          Students commit to careers they&apos;ve never experienced.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOCKS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.1 }}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-card
                  bg-tag-bg text-teal mb-4"
              >
                <Icon size={24} />
              </div>
              <h3 className="font-sans font-bold text-[16px] text-dark mb-2">
                {title}
              </h3>
              <p className="font-sans text-[15px] text-muted leading-relaxed">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
