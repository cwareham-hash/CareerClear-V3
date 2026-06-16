import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

interface UseDialogArgs {
  open:            boolean
  mediaQuery:      string                  // gate so only the visible (desktop OR mobile) panel acts
  onClose:         () => void
  containerRef:    RefObject<HTMLElement>
  initialFocusRef: RefObject<HTMLElement>
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Minimal modal-dialog behaviour for an existing panel — no external library.
 *
 * The desktop panel and the mobile sheet are both always mounted and toggled by
 * CSS, so `mediaQuery` gates the behaviour to whichever one is actually visible
 * (they would otherwise both grab focus). When that panel opens it remembers the
 * trigger, moves focus inside, traps Tab, and closes on Escape; on close it
 * restores focus to the trigger.
 */
export function useDialog({ open, mediaQuery, onClose, containerRef, initialFocusRef }: UseDialogArgs) {
  // Keep the latest onClose without re-running the effect (the caller passes a
  // fresh inline arrow each render).
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    if (typeof window !== 'undefined' && !window.matchMedia(mediaQuery).matches) return
    const container = containerRef.current
    if (!container) return

    // Remember the trigger and move focus into the dialog.
    previouslyFocused.current = document.activeElement as HTMLElement | null
    ;(initialFocusRef.current ?? container).focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return

      const nodes = Array.from(container!.querySelectorAll<HTMLElement>(FOCUSABLE))
        .filter((el) => el.offsetParent !== null)
      if (nodes.length === 0) {
        e.preventDefault()
        container!.focus()
        return
      }
      const first = nodes[0]
      const last  = nodes[nodes.length - 1]
      const cur   = document.activeElement as HTMLElement
      if (e.shiftKey && (cur === first || !container!.contains(cur))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (cur === last || !container!.contains(cur))) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // Return focus to the element that opened the dialog.
      previouslyFocused.current?.focus?.()
    }
    // containerRef/initialFocusRef are stable refs; only `open` and the breakpoint matter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mediaQuery])
}
