'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/**
 * Final CTA — cream background, centered closing prompt into /explore.
 */
export default function FinalCTA() {
  return (
    <section className="bg-cream" aria-label="Get started">
      <div className="max-w-3xl mx-auto px-6 py-9 md:py-11 text-center">
        <motion.h2
          className="font-serif text-[28px] md:text-[32px] font-bold text-navy leading-tight mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          Find out what it is actually like.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
        >
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-btn bg-teal text-white
              font-sans font-semibold text-[15px] transition-colors duration-150 hover:bg-teal-light
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
          >
            Start Exploring
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
