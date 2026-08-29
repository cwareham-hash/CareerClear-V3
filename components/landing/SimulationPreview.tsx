'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { artifact13Html } from '@/lib/content/artifacts/artifact-13-buyerlist-scrub'

// Visual-proof section: a zoomed-in, non-interactive "screenshot" of the
// product in action, composed from real simulation material:
//   • the REAL Buyer List Scrub artifact from the Investment Banking (Kestrel)
//     simulation — the spreadsheet working file, cropped to its top-left so the
//     Excel chrome, column headers and first buyer rows read as real work
//   • a slim audio bar mirroring the narration player (9:14 is the real length)
//   • three consecutive real dialogue lines from the same Kestrel buyer-list
//     scrub block the artifact comes from, styled like the panel's dialogue
// Everything is decorative: aria-hidden, pointer-events-none, sandboxed
// script-less iframe, explicit "Preview" watermark. No image files.

// Geometry of the artifact document (see the artifact's own stylesheet):
// .page is 1180px wide with 20px side / 24px top padding; a one-line context
// note (~30px with its margin) sits above the 1120px-wide spreadsheet window,
// so the window's top-left corner is at roughly (20, 54).
const DOC_W = 1180
const SHEET = { x: 20, y: 54, w: 1120, h: 640 }
// Visible crops. The spreadsheet is wider than a slide, so instead of fitting
// its full width (which would shrink cell text to ~7px), the crop zooms into
// the top-left region: title bar with the .xlsx filename, menu and formula
// bars, column headers, and the first buyer rows.
const CROP_DESKTOP = { w: 950, h: 470 }
const CROP_MOBILE  = { w: 540, h: 330 }

function ArtifactStage() {
  const ref = useRef<HTMLDivElement>(null)
  const [stageW, setStageW] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setStageW(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const zoomed = stageW > 0 && stageW < 500
  const visW = zoomed ? CROP_MOBILE.w : CROP_DESKTOP.w
  const visH = zoomed ? CROP_MOBILE.h : CROP_DESKTOP.h
  const s = stageW > 0 ? stageW / visW : 0

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={s > 0 ? { height: Math.round(visH * s) } : { aspectRatio: '2 / 1' }}
    >
      {s > 0 && (
        <iframe
          srcDoc={artifact13Html}
          title="Simulation work product preview"
          sandbox="allow-same-origin"
          scrolling="no"
          tabIndex={-1}
          style={{
            position: 'absolute',
            left: -SHEET.x * s,
            top: -SHEET.y * s,
            width: DOC_W,
            height: SHEET.y + SHEET.h + 60,
            border: 0,
            display: 'block',
            transform: `scale(${s})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

// Three consecutive real dialogue lines from the Kestrel "The buyer-list scrub"
// Day-in-the-Life block — the very meeting whose spreadsheet is shown above;
// Sabrina reads back the exact changes visible in the artifact's markup.
const TRANSCRIPT: { speaker: string; text: string }[] = [
  {
    speaker: 'Priya',
    text: "That's the list, more or less. Sabrina, you've got all of it captured?",
  },
  {
    speaker: 'Sabrina',
    text: 'All of it. Coleman and Brightwater into Tier 1, the European group up half a tier with the note kept, the direct competitor cut, the ingredients supplier flagged for Rick, the generalist fund off.',
  },
  {
    speaker: 'Warren',
    text: "Good. Get me the clean version and I'll do a last pass before we take contact strategy to Rick. Nice work on the reasons, made this fast.",
  },
]

export default function SimulationPreview() {
  return (
    <section className="bg-navy" aria-label="Simulation preview">
      <div className="max-w-5xl mx-auto px-6 py-9 md:py-11">
        <motion.h2
          className="font-serif text-[28px] md:text-[32px] font-bold text-white text-center leading-tight mb-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          See what a simulation feels like
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
        >
          {/* ── The mock panel — artifact dominant, player + transcript below ── */}
          <div
            aria-hidden="true"
            className="relative max-w-2xl mx-auto bg-white rounded-card border border-border
              shadow-panel overflow-hidden select-none pointer-events-none"
          >
            {/* Explicit preview marker — a flat watermark label, deliberately
                NOT styled like a button (no background, border, or hover):
                low-contrast uppercase text in the bottom corner, over the
                transcript fade so it never covers content at any width */}
            <span
              className="absolute bottom-2.5 right-4 z-10 font-sans text-[10px]
                font-semibold uppercase tracking-[0.18em] text-navy/40 select-none"
            >
              Preview
            </span>

            {/* The real consulting slide, zoomed in */}
            <ArtifactStage />

            {/* Slim audio bar */}
            <div className="flex items-center gap-2.5 px-5 py-2 border-t border-b border-border">
              <span className="shrink-0 w-7 h-7 rounded-pill bg-teal text-white flex items-center justify-center">
                <Play size={12} className="ml-[1px]" />
              </span>
              <span className="shrink-0 font-sans text-[11px] text-muted tabular-nums">0:00</span>
              <span className="relative flex-1 h-1 min-w-0 rounded-pill bg-border">
                <span className="absolute left-0 top-0 h-full w-2 rounded-pill bg-teal" />
              </span>
              <span className="shrink-0 font-sans text-[11px] text-muted tabular-nums">9:14</span>
              <span className="shrink-0 font-sans text-[11px] font-medium text-muted">1×</span>
            </div>

            {/* Transcript — real Marcus/Carly exchange, panel dialogue styling,
                fading out at the bottom */}
            <div className="relative px-5 pt-3 pb-5">
              {/* Slightly taller clamp on phones so all three speakers appear
                  before the fade — the IB lines run longer than the old ones. */}
              <div className="relative max-h-[230px] md:max-h-[132px] overflow-hidden">
                {TRANSCRIPT.map((line, i) => (
                  <div key={i} className="mb-1.5">
                    <span className="font-sans font-bold text-[13px] text-dark">
                      {line.speaker}:
                    </span>{' '}
                    <span className="font-sans text-[13px] text-dark leading-relaxed">
                      {line.text}
                    </span>
                  </div>
                ))}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
              </div>
            </div>
          </div>

          {/* Caption + CTA */}
          <p className="font-sans text-[14px] text-white/70 text-center leading-relaxed mt-5 mb-5 max-w-md mx-auto">
            A sample view from our real investment banking simulation. Read through the
            simulations or press play to listen to audio.
          </p>
          <div className="flex justify-center">
            <Link
              href="/explore?filter=simulations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-btn
                font-sans font-semibold text-[14px] text-white bg-teal hover:bg-teal-light
                transition-colors duration-150"
            >
              See the simulations
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
