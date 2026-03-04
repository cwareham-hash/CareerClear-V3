'use client'

// Shared content-rendering components for TimeBlockPanel and TimeBlockModal.
// Handles screenplay parsing, commentary splitting, and section boxes.

import { Clock, Lightbulb, CheckCircle } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type ScriptLine =
  | { type: 'scene';    text: string }
  | { type: 'dialogue'; speaker: string; text: string }
  | { type: 'monologue'; text: string }
  | { type: 'narration'; text: string }
  | { type: 'spacer' }

// ── Parsing utilities ─────────────────────────────────────────────────────────

function parseScriptLines(raw: string): ScriptLine[] {
  return raw.split('\n').map((line): ScriptLine => {
    const trimmed = line.trim()

    if (!trimmed) return { type: 'spacer' }

    // Scene descriptions: [Scene: ...]
    if (trimmed.startsWith('[')) return { type: 'scene', text: trimmed }

    // Dialogue: "Name:" or "Name (qualifier):" pattern
    const colonIdx = trimmed.indexOf(':')
    if (colonIdx > 0 && colonIdx < 40) {
      const potentialSpeaker = trimmed.substring(0, colonIdx).trim()
      if (/^[A-Za-z][A-Za-z\s]*(\s*\([^)]+\))?$/.test(potentialSpeaker)) {
        const rest = trimmed.substring(colonIdx + 1).trim()
        // Strip surrounding quotes if present
        const text = rest.replace(/^"(.*)"$/, '$1').replace(/^"(.+)$/, '$1').replace(/^(.*)"$/, '$1')
        return { type: 'dialogue', speaker: potentialSpeaker, text }
      }
    }

    // Internal monologue: starts with a quote mark
    if (trimmed.startsWith('"')) {
      const text = trimmed.replace(/^"(.*)"$/, '$1').replace(/^"(.+)$/, '$1')
      return { type: 'monologue', text }
    }

    // Everything else: narrative description
    return { type: 'narration', text: trimmed }
  })
}

// Split commentary paragraph into individual sentences.
// Splits at ". " before an uppercase letter, but only when the word before
// the period has more than 3 alphabetic chars (avoids splitting "vs.", "Mr.", etc.)
function splitCommentary(text: string): string[] {
  const result: string[] = []
  let current = ''

  for (let i = 0; i < text.length; i++) {
    current += text[i]

    if (
      text[i] === '.' &&
      i + 2 < text.length &&
      text[i + 1] === ' ' &&
      /[A-Z]/.test(text[i + 2])
    ) {
      const wordBeforePeriod = current.slice(0, -1).split(/\s+/).pop() ?? ''
      const alphaChars = wordBeforePeriod.replace(/[^a-zA-Z]/g, '')
      if (alphaChars.length > 3) {
        result.push(current.trim())
        current = ''
        i++ // skip the space after the period
      }
    }
  }

  if (current.trim()) result.push(current.trim())
  return result.filter((s) => s.length > 0)
}

// ── Script line renderer ──────────────────────────────────────────────────────

function ScriptLineItem({ line, index }: { line: ScriptLine; index: number }) {
  switch (line.type) {
    case 'spacer':
      return <div key={index} className="h-3" />

    case 'scene':
      return (
        <p
          key={index}
          className="font-sans text-[13px] text-muted italic leading-relaxed mb-1"
        >
          {line.text}
        </p>
      )

    case 'dialogue':
      return (
        <div key={index} className="mb-1">
          <span className="font-sans font-bold text-[14px] text-dark">
            {line.speaker}:
          </span>{' '}
          <span className="font-sans text-[14px] text-dark leading-relaxed">
            {line.text}
          </span>
        </div>
      )

    case 'monologue':
      return (
        <p
          key={index}
          className="font-sans text-[14px] text-dark italic leading-relaxed mb-1 pl-3"
          style={{ borderLeft: '2px solid #e5e7eb' }}
        >
          {line.text}
        </p>
      )

    case 'narration':
    default:
      return (
        <p
          key={index}
          className="font-sans text-[13px] text-muted italic leading-relaxed mb-1"
        >
          {line.text}
        </p>
      )
  }
}

// ── Exported section components ───────────────────────────────────────────────

export function BeforeSection({ content }: { content: string }) {
  return (
    <div
      className="rounded-[10px] p-4"
      style={{ backgroundColor: '#f7f7f5', border: '1px solid #e5e7eb' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock size={13} aria-hidden="true" style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
        <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide">
          Before: Setting the Scene
        </p>
      </div>
      <p className="font-sans text-[14px] text-dark leading-relaxed">{content}</p>
    </div>
  )
}

export function ScriptSection({ content }: { content: string }) {
  const lines = parseScriptLines(content)
  return (
    <div>
      <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-3">
        During
      </p>
      <div>
        {lines.map((line, i) => (
          <ScriptLineItem key={i} line={line} index={i} />
        ))}
      </div>
    </div>
  )
}

export function CommentarySection({ content }: { content: string }) {
  const sentences = splitCommentary(content)
  return (
    <div
      className="rounded-[10px] p-4"
      style={{
        backgroundColor: 'var(--color-tag-bg)',
        border: '1px solid #c8e6e2',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={14} aria-hidden="true" style={{ color: 'var(--color-teal)', flexShrink: 0 }} />
        <p
          className="font-sans font-semibold text-[13px]"
          style={{ color: 'var(--color-teal)' }}
        >
          Over-the-Shoulder Commentary
        </p>
      </div>
      <div className="space-y-2">
        {sentences.map((sentence, i) => (
          <p key={i} className="font-sans text-[13px] text-dark italic leading-relaxed">
            {sentence}
          </p>
        ))}
      </div>
    </div>
  )
}

export function AfterSection({ content }: { content: string }) {
  return (
    <div
      className="rounded-[10px] p-4"
      style={{ backgroundColor: '#f5fdf9', border: '1px solid #d1fae5' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle size={13} aria-hidden="true" style={{ color: '#16a34a', flexShrink: 0 }} />
        <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide">
          After: What&apos;s Next
        </p>
      </div>
      <p className="font-sans text-[14px] text-dark leading-relaxed">{content}</p>
    </div>
  )
}
