'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

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

// The CIM (and the artifact convention that follows it) lays out inside an
// `.app` wrapper capped at 1360px. Used as the scale basis; height is measured.
const FALLBACK_NATURAL_WIDTH = 1360
const FALLBACK_NATURAL_HEIGHT = 720

export function HtmlArtifact({ html }: { html: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)
  const [scale, setScale] = useState(1)

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

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden" style={{ height: scaledH }}>
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
    </div>
  )
}
