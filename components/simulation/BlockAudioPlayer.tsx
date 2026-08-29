'use client'

// Slim narration bar for blocks that have pre-generated audio in the private
// block-audio bucket. On mount it quietly asks /api/block-audio/<blockId>;
// blocks without audio render nothing at all, so every non-audio block looks
// exactly as it did before this component existed.
//
// Playback is a plain HTML5 <audio> element (so phone background / lock-screen
// playback works), driven by custom controls — no native controls bar, no
// download affordance, never autoplay. The signed URL expires after ~an hour;
// pressing play on a stale panel transparently fetches a fresh one and resumes.

import { useCallback, useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { trackAudioCompleted, trackAudioPlayed, trackAudioSpeedChanged } from '@/lib/analytics'

const SPEEDS = [0.75, 1, 1.25, 1.5, 2]
// Refresh the signed URL if the panel has been open this long when play is
// pressed (URLs are minted for ~an hour; refresh comfortably before that).
const URL_STALE_MS = 50 * 60 * 1000
// After the user scrolls by hand, hold off artifact auto-scrolls this long.
const USER_SCROLL_HOLD_MS = 4000

interface ArtifactCue {
  artifact: number | string
  startSeconds: number
}

interface AudioInfo {
  url: string
  fetchedAt: number
  artifacts: ArtifactCue[]
}

// One endpoint call per block even though the desktop panel and mobile modal
// both mount a player: they share this tiny cache. 'none' (no audio for the
// block) is a stable fact and cached too; errors are not cached.
const infoCache = new Map<string, Promise<AudioInfo | 'none' | null>>()

async function requestAudioInfo(blockId: string): Promise<AudioInfo | 'none' | null> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) return null
  const res = await fetch(`/api/block-audio/${encodeURIComponent(blockId)}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) return null
  const body = await res.json()
  if (!body.audio || typeof body.url !== 'string') return 'none'
  const artifacts: ArtifactCue[] = Array.isArray(body.timestamps?.artifacts)
    ? body.timestamps.artifacts
    : []
  return { url: body.url, fetchedAt: Date.now(), artifacts }
}

function fetchAudioInfo(blockId: string, forceFresh = false): Promise<AudioInfo | 'none' | null> {
  if (forceFresh) infoCache.delete(blockId)
  let pending = infoCache.get(blockId)
  if (!pending) {
    pending = requestAudioInfo(blockId).then((result) => {
      if (result === null) infoCache.delete(blockId) // don't cache failures
      return result
    })
    infoCache.set(blockId, pending)
  }
  return pending
}

function fmtTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

interface Props {
  blockId: string
  /** The panel's scrollable body — where artifact auto-scroll happens. */
  scrollRef: React.RefObject<HTMLDivElement>
}

export default function BlockAudioPlayer({ blockId, scrollRef }: Props) {
  const [info, setInfo] = useState<AudioInfo | null>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rate, setRate] = useState(1)

  const audioRef = useRef<HTMLAudioElement>(null)
  const playedTracked = useRef(false)
  const refreshTried = useRef(false)
  // Artifact auto-scroll bookkeeping.
  const firedCues = useRef<Set<number>>(new Set())
  const lastUserScrollAt = useRef(0)
  const programmaticScrollUntil = useRef(0)
  const lastTime = useRef(0)

  // Quietly ask whether this block has audio. No audio -> render nothing.
  useEffect(() => {
    let active = true
    setInfo(null)
    setPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setRate(1)
    playedTracked.current = false
    refreshTried.current = false
    firedCues.current = new Set()
    lastTime.current = 0
    fetchAudioInfo(blockId).then((result) => {
      if (active && result && result !== 'none') setInfo(result)
    })
    return () => { active = false }
  }, [blockId])

  // Attach the source once known. preload="metadata" surfaces the duration
  // without pulling the whole file; nothing plays until the user presses play.
  useEffect(() => {
    const a = audioRef.current
    if (a && info && !a.src) a.src = info.url
  }, [info])

  // Track by-hand scrolling so auto-scroll never fights the reader.
  useEffect(() => {
    const el = scrollRef.current
    if (!el || !info) return
    const onScroll = () => {
      if (Date.now() > programmaticScrollUntil.current) {
        lastUserScrollAt.current = Date.now()
      }
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [scrollRef, info])

  // Transparently re-mint the signed URL (panel left open past expiry),
  // preserving position and speed.
  const refreshUrl = useCallback(async (): Promise<boolean> => {
    const a = audioRef.current
    if (!a) return false
    const fresh = await fetchAudioInfo(blockId, true)
    if (!fresh || fresh === 'none') return false
    const pos = a.currentTime
    const wasRate = a.playbackRate
    a.src = fresh.url
    a.currentTime = pos
    a.playbackRate = wasRate
    setInfo(fresh)
    return true
  }, [blockId])

  const onPlayPause = useCallback(async () => {
    const a = audioRef.current
    if (!a || !info) return
    if (!a.paused) {
      a.pause()
      return
    }
    if (Date.now() - info.fetchedAt > URL_STALE_MS) await refreshUrl()
    a.playbackRate = rate
    try {
      await a.play()
    } catch {
      // Likely an expired URL the staleness check missed — one silent retry.
      if (await refreshUrl()) {
        try { await audioRef.current?.play() } catch { /* leave paused */ }
      }
    }
  }, [info, rate, refreshUrl])

  const onScrub = useCallback((value: number) => {
    const a = audioRef.current
    if (!a || !Number.isFinite(value)) return
    a.currentTime = value
    setCurrentTime(value)
  }, [])

  const onSpeedChange = useCallback((value: number) => {
    const a = audioRef.current
    setRate(value)
    if (a) a.playbackRate = value
    trackAudioSpeedChanged(blockId, value)
  }, [blockId])

  const onTimeUpdate = useCallback(() => {
    const a = audioRef.current
    if (!a || !info) return
    const t = a.currentTime
    setCurrentTime(t)

    // Scrubbing backwards re-arms the artifact cues behind the new position.
    if (t < lastTime.current - 0.75) {
      info.artifacts.forEach((cue, i) => {
        if (cue.startSeconds > t) firedCues.current.delete(i)
      })
    }
    lastTime.current = t

    // Gently bring an artifact into view when playback reaches it — unless the
    // reader scrolled on their own within the last few seconds.
    info.artifacts.forEach((cue, i) => {
      if (firedCues.current.has(i) || cue.startSeconds > t) return
      firedCues.current.add(i)
      if (Date.now() - lastUserScrollAt.current < USER_SCROLL_HOLD_MS) return
      const el = scrollRef.current?.querySelector(`[data-audio-artifact="${cue.artifact}"]`)
      if (el) {
        programmaticScrollUntil.current = Date.now() + 1600
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }, [info, scrollRef])

  if (!info) return null

  return (
    <div className="shrink-0 flex items-center gap-2.5 px-5 py-2 lg:px-6 border-b border-border bg-white">
      <button
        onClick={onPlayPause}
        aria-label={playing ? 'Pause narration' : 'Play narration'}
        className="shrink-0 w-7 h-7 rounded-pill flex items-center justify-center text-white
          transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2"
        style={{ backgroundColor: 'var(--color-teal)' }}
      >
        {playing ? <Pause size={12} /> : <Play size={12} className="ml-[1px]" />}
      </button>

      <span className="shrink-0 font-sans text-[11px] text-muted tabular-nums w-9 text-right">
        {fmtTime(currentTime)}
      </span>

      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={Math.min(currentTime, duration || 0)}
        disabled={!duration}
        onChange={(e) => onScrub(Number(e.target.value))}
        aria-label="Narration position"
        className="flex-1 h-1 min-w-0 cursor-pointer disabled:cursor-default"
        style={{ accentColor: 'var(--color-teal)' }}
      />

      <span className="shrink-0 font-sans text-[11px] text-muted tabular-nums w-9">
        {fmtTime(duration)}
      </span>

      <select
        value={rate}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        aria-label="Narration speed"
        className="shrink-0 font-sans text-[11px] font-medium text-muted bg-transparent
          border border-border rounded-btn px-1 py-0.5 cursor-pointer focus:outline-none"
      >
        {SPEEDS.map((s) => (
          <option key={s} value={s}>
            {s === 0.75 ? '.75x' : `${s}x`}
          </option>
        ))}
      </select>

      {/* Playback engine. No native controls; nothing here offers a download. */}
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => {
          setPlaying(true)
          if (!playedTracked.current) {
            playedTracked.current = true
            trackAudioPlayed(blockId)
          }
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false)
          trackAudioCompleted(blockId)
        }}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onDurationChange={() => setDuration(audioRef.current?.duration ?? 0)}
      />
    </div>
  )
}
