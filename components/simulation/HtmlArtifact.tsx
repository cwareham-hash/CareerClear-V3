'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Maximize2, Minimize2 } from 'lucide-react'

// Renders a self-contained HTML artifact (a complete <!DOCTYPE html> document,
// e.g. the CIM exec-summary mock) inline, fully style-isolated.
//
// Isolation: the document is dropped into an iframe via srcDoc. The iframe is
// sandboxed WITHOUT allow-scripts, so the artifact runs no JavaScript (the CIM
// has none) and can never touch the app; its global CSS reset likewise can't
// leak out. `allow-same-origin` is granted ONLY so this parent can read the
// framed document's intrinsic height to size the wrapper — the content stays
// inert because scripts remain disallowed. (allow-scripts + allow-same-origin
// together would be unsafe; we never grant allow-scripts.)
//
// Scaling: the artifact has a fixed, wide natural size (~1300px stage). We scale
// it down with a CSS transform to fit the container width, and set the wrapper
// height to the scaled height so content below flows in normal order. A
// ResizeObserver keeps it correct when the panel width changes.
//
// Expand: a top-right control blows the artifact up to a full-viewport overlay
// portaled to document.body (so the reading panel's open/exit transform can never
// trap it). The expanded artifact is scaled to FIT THE VIEWPORT WIDTH (minus a
// margin) and nothing else: height never enters the scale. Fitting both axes made
// tall artifacts (long OneNote pages, multi-slide decks) expand SMALLER than they
// rendered inline, which defeats the point of expanding. A tall artifact therefore
// overflows the viewport and the overlay scrolls it vertically; a short one is
// centered as before. Two portal realities shape the implementation:
//   1. This app's React event-delegation root does NOT contain document.body, so
//      React onClick on the portaled overlay never fires. The backdrop, the stage,
//      and the collapse button are therefore wired with NATIVE onclick via refs,
//      and Escape via a native document listener — all fire regardless of
//      delegation.
//   2. framer's AnimatePresence exit machinery (PopChild) does not complete for
//      this portaled subtree (the node gets stuck mid-exit), so we do NOT use
//      AnimatePresence. The overlay animates IN with framer initial/animate and
//      simply unmounts on collapse (quick and clean). Without AnimatePresence there
//      is no PopChild, which also makes refs on the motion elements safe.

// The CIM (and the artifact convention that follows it) lays out inside an
// `.app` wrapper capped at 1360px. Used as the scale basis; height is measured.
const FALLBACK_NATURAL_WIDTH = 1360
const FALLBACK_NATURAL_HEIGHT = 720

// Breathing room between the expanded artifact and the viewport edges.
const EXPAND_MARGIN = 48

export function HtmlArtifact({ html }: { html: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)
  const [scale, setScale] = useState(1)
  const [isExpanded, setIsExpanded] = useState(false)
  const [viewport, setViewport] = useState<{ w: number; h: number } | null>(null)
  // Portals need the DOM; gate on a client-only mounted flag so SSR never touches
  // document.body.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Measure the framed document's intrinsic size. Only fonts are system fonts,
  // so layout is stable by load; re-measured on load in case of reflow.
  const measure = useCallback(() => {
    const doc = iframeRef.current?.contentDocument
    if (!doc?.documentElement) return
    const el = doc.documentElement
    const w = Math.max(el.scrollWidth, el.offsetWidth) || FALLBACK_NATURAL_WIDTH
    const h = Math.max(el.scrollHeight, el.offsetHeight) || FALLBACK_NATURAL_HEIGHT
    if (w > 0 && h > 0) setNatural({ w, h })
  }, [])

  // Recompute the fit-to-width scale on container resize (natural size is fixed).
  useEffect(() => {
    const wrap = wrapperRef.current
    if (!wrap) return
    const w = natural?.w ?? FALLBACK_NATURAL_WIDTH
    const recompute = () => {
      const avail = wrap.clientWidth
      setScale(avail > 0 && w > 0 ? Math.min(1, avail / w) : 1)
    }
    recompute()
    const ro = new ResizeObserver(recompute)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [natural])

  const naturalW = natural?.w ?? FALLBACK_NATURAL_WIDTH
  const naturalH = natural?.h ?? FALLBACK_NATURAL_HEIGHT
  const scaledH = Math.round(naturalH * scale)

  // While expanded: track the viewport, lock body scroll, and swallow Escape in the
  // CAPTURE phase so the panel's own document-level Escape handler in useDialog
  // never fires — Escape collapses the artifact only. Torn down on collapse OR
  // unmount (e.g. the panel closes while expanded), so nothing is left orphaned.
  useEffect(() => {
    if (!isExpanded) return

    setViewport({ w: window.innerWidth, h: window.innerHeight })
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDownCapture = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        e.preventDefault()
        setIsExpanded(false)
      }
    }
    document.addEventListener('keydown', onKeyDownCapture, true)

    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('keydown', onKeyDownCapture, true)
      document.body.style.overflow = prevOverflow
    }
  }, [isExpanded])

  // Expanded scale: fit to the viewport WIDTH (minus a margin), height ignored.
  // Deliberately NOT clamped to 1 — the artifact scales UP on large screens, since
  // legibility is the whole point. Because height is not a factor, a tall artifact
  // ends up taller than the viewport; the overlay scrolls it (see below). One
  // formula covers every artifact type (width is uniform at ~1360), so no
  // per-type branching.
  const expandAvailW = (viewport?.w ?? 0) - EXPAND_MARGIN * 2
  const expandedScale = viewport ? expandAvailW / naturalW : 1
  const expandedW = Math.round(naturalW * expandedScale)
  // Real layout height for the wrapper. A CSS transform does not change layout
  // size, so without this the scroll range would be computed from the artifact's
  // UNSCALED height and the bottom would be unreachable (or overshoot). Same
  // reason the inline wrapper sets `height: scaledH`.
  const expandedH = Math.round(naturalH * expandedScale)

  // Native click handlers for the portaled overlay (React onClick is dead there).
  // Callback refs set el.onclick once on mount.
  // The scroll region doubles as the backdrop: it fills the overlay, so a click on
  // any dimmed space around the artifact (the side margins, and the area above and
  // below it) collapses. Clicks on the artifact itself are stopped by the stage.
  const setScrollRef = useCallback((el: HTMLDivElement | null) => {
    if (el) el.onclick = () => setIsExpanded(false)
  }, [])
  const setStageRef = useCallback((el: HTMLDivElement | null) => {
    // A click on the artifact itself must NOT collapse — stop it reaching the backdrop.
    if (el) el.onclick = (e) => e.stopPropagation()
  }, [])
  const setCollapseBtnRef = useCallback((el: HTMLButtonElement | null) => {
    if (el) el.onclick = (e) => { e.stopPropagation(); setIsExpanded(false) }
  }, [])

  const controlChip =
    'flex items-center justify-center w-8 h-8 rounded-btn border border-border ' +
    'bg-white/85 backdrop-blur-sm text-navy shadow-sm transition-colors ' +
    'hover:bg-white focus-visible:outline-none focus-visible:ring-2'

  return (
    <div ref={wrapperRef} className="relative w-full overflow-hidden" style={{ height: scaledH }}>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        onLoad={measure}
        title="Work product"
        sandbox="allow-same-origin"
        scrolling="no"
        style={{
          width: naturalW,
          height: naturalH,
          border: 0,
          display: 'block',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          // Artifacts are static, non-interactive mocks. Without this, the large
          // iframe (it can cover ~90% of the reading viewport) captures wheel
          // events and the reader can't scroll the panel past it. pointer-events:
          // none lets wheel/scroll pass through to the panel's scroll container.
          pointerEvents: 'none',
        }}
      />

      {/* Expand control — sibling of the (pointer-events:none) iframe, so it
          receives clicks normally. In the non-portaled panel, React onClick fires. */}
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        aria-label="Expand artifact"
        className={`absolute top-2 right-2 z-10 ${controlChip}`}
      >
        <Maximize2 size={16} aria-hidden="true" />
      </button>

      {/* Full-viewport expanded overlay, portaled to document.body so no ancestor
          transform (the panel's open/exit animation) can contain or clip it.
          Enter-animated with framer; collapse unmounts immediately. */}
      {mounted &&
        isExpanded &&
        createPortal(
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: 'rgba(0,0,0,0.72)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {/* The scroll region. Vertical only — a fit-to-width artifact is never
                wider than the viewport, so horizontal scrolling is disabled outright.
                The iframe sets pointer-events: none, so a wheel event over the
                artifact falls through to this container and scrolls it.
                The side margins come from the stage's own `margin: auto`, NOT from
                horizontal padding here: a vertical scrollbar shrinks this element's
                content box, and padding-based margins would then squeeze the artifact
                a scrollbar-width narrower than the width the scale was computed from.
                Vertical padding is safe (it cannot affect width) and gives the top and
                bottom breathing room. */}
            <div
              ref={setScrollRef}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden flex"
              style={{ paddingTop: EXPAND_MARGIN, paddingBottom: EXPAND_MARGIN }}
            >
              {/* Artifact stage. `margin: auto` inside the flex container centers a
                  short artifact on both axes and collapses to zero once the artifact
                  is taller than the region, so a tall one starts at its top and
                  scrolls rather than having its head clipped (which is what
                  align-items: center would do). Native onclick stopPropagation means
                  a click on the artifact does nothing; only the backdrop collapses. */}
              <motion.div
                ref={setStageRef}
                className="relative shrink-0"
                style={{ width: expandedW, height: expandedH, margin: 'auto' }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <iframe
                  srcDoc={html}
                  title="Work product (expanded)"
                  sandbox="allow-same-origin"
                  scrolling="no"
                  style={{
                    width: naturalW,
                    height: naturalH,
                    border: 0,
                    display: 'block',
                    transform: `scale(${expandedScale})`,
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            </div>

            {/* Collapse control. Deliberately a SIBLING of the scroll region rather
                than a child of the stage, so it is positioned against the fixed
                overlay and stays put at the top right of the viewport no matter how
                far the artifact is scrolled. */}
            <button
              ref={setCollapseBtnRef}
              type="button"
              aria-label="Collapse artifact"
              className={`absolute top-4 right-4 z-10 ${controlChip}`}
            >
              <Minimize2 size={16} aria-hidden="true" />
            </button>
          </motion.div>,
          document.body,
        )}
    </div>
  )
}
