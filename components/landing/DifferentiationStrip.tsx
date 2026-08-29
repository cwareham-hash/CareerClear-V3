'use client'

import { motion } from 'framer-motion'

/**
 * Differentiation strip — navy band with a single centered statement
 * about student-first independence.
 */
export default function DifferentiationStrip() {
  return (
    <section className="bg-navy" aria-label="Why Career Clear is different">
      <div className="max-w-3xl mx-auto px-6 py-9 md:py-11 text-center">
        <motion.p
          className="font-serif text-[22px] md:text-[26px] font-bold text-white leading-snug mb-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          Built exclusively for students. Our simulations are independent and
          company-agnostic, designed to show you the honest reality of a role,
          not a recruiting pitch.
        </motion.p>
      </div>
    </section>
  )
}
