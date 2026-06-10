'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/**
 * Landing hero — full-width navy→teal gradient with the core value
 * proposition and primary CTA into /explore.
 */
export default function LandingHero() {
  return (
    <section
      className="w-full"
      style={{
        background:
          'linear-gradient(135deg, #1a2744 0%, #1f3e55 55%, #2a9d8f 140%)',
      }}
      aria-label="Hero — Test drive a career before you have to choose one."
    >
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <Image
            src="/logo-mark.png"
            alt="Career Clear binoculars mark"
            width={247}
            height={160}
            priority
            className="h-[100px] md:h-[160px] w-auto mx-auto mb-8"
          />
        </motion.div>

        <motion.h1
          className="font-serif text-[36px] md:text-[48px] font-bold text-white leading-tight mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
        >
          Test drive a career before you have to choose one.
        </motion.h1>

        <motion.p
          className="font-sans text-[16px] md:text-[18px] text-white/80 leading-relaxed max-w-2xl mx-auto mb-9"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 }}
        >
          Career Clear helps you discover the careers that are out there, then
          experience a real day in the life of each one, so you know whether a
          path actually fits you before recruiting locks you in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.3 }}
        >
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-btn bg-teal text-white
              font-sans font-semibold text-[15px] transition-colors duration-150 hover:bg-teal-light
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Start Exploring
            <ArrowRight size={16} />
          </Link>

          <p className="mt-5">
            <Link
              href="/questionnaire"
              className="font-sans text-[14px] font-medium text-white/80 underline underline-offset-4
                decoration-white/40 transition-colors duration-150 hover:text-white"
            >
              Take the Career Quiz
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
