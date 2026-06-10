'use client'

import { motion } from 'framer-motion'

interface Step {
  number: number
  title: string
  body: string
}

const STEPS: Step[] = [
  {
    number: 1,
    title: 'Explore',
    body: 'Browse careers across finance, consulting, law, tech and more, including roles you did not know existed.',
  },
  {
    number: 2,
    title: 'Experience',
    body: 'Step into an immersive simulation and work through a real day alongside a professional, with over-the-shoulder commentary explaining what is happening and why.',
  },
  {
    number: 3,
    title: 'Decide with confidence',
    body: 'Compare the roles you have experienced and pursue the one that actually fits, before spending years finding out the hard way.',
  },
]

/**
 * How it works — white background, three numbered steps
 * (horizontal on desktop, stacked on mobile).
 */
export default function HowItWorks() {
  return (
    <section className="bg-white" aria-label="How it works">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <motion.h2
          className="font-serif text-[28px] md:text-[32px] font-bold text-navy text-center leading-tight mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          Shadow the job before you take the job.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map(({ number, title, body }, i) => (
            <motion.div
              key={number}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.1 }}
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-pill
                  bg-teal text-white font-sans font-bold text-[16px] mb-4"
                aria-hidden="true"
              >
                {number}
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
