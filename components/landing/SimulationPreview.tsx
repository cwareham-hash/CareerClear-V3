'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { artifact13Html } from '@/lib/content/artifacts/artifact-13-buyerlist-scrub'
import { trackHomepagePreviewAudioClicked } from '@/lib/analytics'

// Visual-proof section: a zoomed-in, non-interactive "screenshot" of the
// product in action, composed from real simulation material:
//   • the REAL Buyer List Scrub artifact from the Investment Banking (Kestrel)
//     simulation — the spreadsheet working file, cropped to its top-left so the
//     Excel chrome, column headers and first buyer rows read as real work
//   • a slim audio bar mirroring the narration player. Its play button is the
//     ONE live control: it plays a short public teaser clip of that block's
//     real narration (see TEASER_URL), never autoplays
//   • the teaser's real dialogue lines, from the same Kestrel buyer-list scrub
//     block the artifact comes from, styled like the panel's dialogue. While
//     the teaser plays, the transcript scrolls so the spoken line stays in view
// Everything except the play button is decorative: aria-hidden,
// pointer-events-none, sandboxed script-less iframe, explicit "Preview"
// watermark. No image files.

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

// The homepage teaser: the closing minute of the Kestrel buyer-list scrub (from
// Priya's "On the sponsors..." to Warren's "...made this fast"), built from that
// block's Day in the Life narration segments (Eleven v4) with Warren's lines
// sped up ~12% for the homepage (the full block audio keeps his generated
// pace). It sits in the PUBLIC teaser-audio Storage bucket so logged-out
// visitors can play it; full block audio stays in the private block-audio
// bucket behind /api/block-audio. A changed clip gets a new file name rather
// than an overwrite, so browsers and the CDN never serve a stale cached copy.
const TEASER_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/teaser-audio/homepage/ib-buyer-list-teaser-v4.mp3`
// Each move of the transcript to a new line is a slow glide, easing in and out.
// (The browser's built-in smooth scroll is quicker and can't be timed.)
const GLIDE_MS = 1500
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function fmtTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

// The teaser's dialogue lines, verbatim and in order, from the Kestrel "The
// buyer-list scrub" Day-in-the-Life block — the very meeting whose spreadsheet
// is shown above; Sabrina reads back the exact changes visible in the
// artifact's markup. The first line shown is the first line heard.
// startSeconds is where each line begins in the clip (measured from the clip's
// stitched pieces, after Warren's speed-up). It only drives the transcript
// scroll; nothing is highlighted.
const TRANSCRIPT: { speaker: string; text: string; startSeconds: number }[] = [
  {
    speaker: 'Priya',
    text: "On the sponsors, the ones that own a real center-of-plate platform are the right Tier 1. Add Brightwater, they closed a specialty-foods platform last year that this would slot straight into, they just haven't shown up on a screen yet because the deal was private.",
    startSeconds: 0,
  },
  {
    speaker: 'Warren',
    text: "Good add on Brightwater. A fund without a real platform in the category is a slow buyer that asks for too much diligence and pays like a financial buyer, not a strategic one. The ones you flagged as adjacency-that-isn't, keep them low, that's the right read.",
    startSeconds: 14.9,
  },
  {
    speaker: 'Priya',
    text: "That's the list, more or less. Sabrina, you've got all of it captured?",
    startSeconds: 29.93,
  },
  {
    speaker: 'Sabrina',
    text: 'All of it. Coleman and Brightwater into Tier 1, the European group up half a tier with the note kept, the direct competitor cut, the ingredients supplier flagged for Rick, the generalist fund off.',
    startSeconds: 34.59,
  },
  {
    speaker: 'Warren',
    text: "Good. Get me the clean version and I'll do a last pass before we take contact strategy to Rick. Nice work on the reasons, made this fast.",
    startSeconds: 48.45,
  },
]

export default function SimulationPreview() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  // The clip's length, read from the file's own metadata (0 until it loads).
  const [duration, setDuration] = useState(0)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  // The line being spoken: the last one whose start time has passed. At rest
  // (before play, or once the clip ends and rewinds) that is the first line.
  let currentLine = 0
  TRANSCRIPT.forEach((line, i) => {
    if (currentTime >= line.startSeconds) currentLine = i
  })

  // Keep the spoken line in view by gliding the (non-interactive) transcript to
  // it. Driven by playback time, so it holds still while the audio is paused
  // and glides back to the top when the clip ends. Reduced-motion users get an
  // instant move. A new line cancels any glide still in progress and starts
  // from wherever the transcript is.
  useEffect(() => {
    const box = transcriptRef.current
    const line = lineRefs.current[currentLine]
    if (!box || !line) return
    const target = line.offsetTop
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      box.scrollTop = target
      return
    }
    const from = box.scrollTop
    if (from === target) return
    const startedAt = performance.now()
    let frame = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - startedAt) / GLIDE_MS)
      box.scrollTop = from + (target - from) * easeInOut(t)
      if (t < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [currentLine])

  function onPlayPause() {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      trackHomepagePreviewAudioClicked()
      a.play().catch(() => setPlaying(false))
    } else {
      a.pause()
    }
  }

  function readDuration(a: HTMLAudioElement) {
    if (Number.isFinite(a.duration) && a.duration > 0) setDuration(a.duration)
  }

  // The audio tag is in the server HTML, so its metadata can finish loading
  // before React attaches onLoadedMetadata; catch that case on mount.
  useEffect(() => {
    if (audioRef.current) readDuration(audioRef.current)
  }, [])

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
          {/* ── The mock panel — artifact dominant, player + transcript below.
              The panel ignores clicks (pointer-events-none) and every part
              except the play button is hidden from screen readers; the button
              opts back in with pointer-events-auto. ── */}
          <div
            className="relative max-w-2xl mx-auto bg-white rounded-card border border-border
              shadow-panel overflow-hidden select-none pointer-events-none"
          >
            {/* Explicit preview marker — a flat watermark label, deliberately
                NOT styled like a button (no background, border, or hover):
                low-contrast uppercase text in the bottom corner, over the
                transcript fade so it never covers content at any width */}
            <span
              aria-hidden="true"
              className="absolute bottom-2.5 right-4 z-10 font-sans text-[10px]
                font-semibold uppercase tracking-[0.18em] text-navy/40 select-none"
            >
              Preview
            </span>

            {/* The real buyer-list spreadsheet, zoomed in */}
            <div aria-hidden="true">
              <ArtifactStage />
            </div>

            {/* Slim audio bar — the play button is live, the rest mirrors it */}
            <div className="flex items-center gap-2.5 px-5 py-2 border-t border-b border-border">
              <button
                type="button"
                onClick={onPlayPause}
                aria-label={playing ? 'Pause audio preview' : 'Play audio preview'}
                className="pointer-events-auto shrink-0 w-7 h-7 rounded-pill bg-teal hover:bg-teal-light
                  text-white flex items-center justify-center transition-colors duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50
                  focus-visible:ring-offset-2"
              >
                {playing ? <Pause size={12} /> : <Play size={12} className="ml-[1px]" />}
              </button>
              <span aria-hidden="true" className="shrink-0 font-sans text-[11px] text-muted tabular-nums">
                {fmtTime(currentTime)}
              </span>
              <span aria-hidden="true" className="relative flex-1 h-1 min-w-0 rounded-pill bg-border">
                <span
                  className="absolute left-0 top-0 h-full rounded-pill bg-teal"
                  style={{ width: `max(8px, ${duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0}%)` }}
                />
              </span>
              <span aria-hidden="true" className="shrink-0 font-sans text-[11px] text-muted tabular-nums">
                {duration > 0 ? fmtTime(duration) : '-:--'}
              </span>
              <span aria-hidden="true" className="shrink-0 font-sans text-[11px] font-medium text-muted">1×</span>
            </div>

            {/* The teaser itself: plain HTML5 audio, no native controls, never
                autoplays. At the end it rewinds so the bar resets to the start. */}
            <audio
              ref={audioRef}
              src={TEASER_URL}
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => readDuration(e.currentTarget)}
              onDurationChange={(e) => readDuration(e.currentTarget)}
              onEnded={(e) => {
                setPlaying(false)
                e.currentTarget.currentTime = 0
              }}
            />

            {/* Transcript — the teaser's lines, panel dialogue styling, fading
                out at the bottom. It scrolls only programmatically, with the
                audio; the fade sits outside the scrolling box so it stays put. */}
            <div aria-hidden="true" className="relative px-5 pt-3 pb-5">
              {/* Slightly taller clamp on phones so more lines show before the
                  fade — the IB lines run long. */}
              <div className="relative">
                <div ref={transcriptRef} className="relative max-h-[230px] md:max-h-[132px] overflow-hidden">
                  {TRANSCRIPT.map((line, i) => (
                    <div
                      key={i}
                      ref={(el) => {
                        lineRefs.current[i] = el
                      }}
                      className="mb-1.5"
                    >
                      <span className="font-sans font-bold text-[13px] text-dark">
                        {line.speaker}:
                      </span>{' '}
                      <span className="font-sans text-[13px] text-dark leading-relaxed">
                        {line.text}
                      </span>
                    </div>
                  ))}
                  {/* Room below the last line, so it can scroll up to the top
                      of the window instead of stopping under the fade. */}
                  <div className="h-[230px] md:h-[132px]" />
                </div>
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
