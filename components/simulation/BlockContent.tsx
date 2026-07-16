'use client'

// Shared content-rendering components for TimeBlockPanel and TimeBlockModal.
// Handles screenplay parsing, commentary splitting, section boxes, a light
// markdown renderer (briefing prose + work-product artifacts), and the
// conditional BlockBody that omits empty sections.

import type { ReactNode } from 'react'
import { Clock, Lightbulb, CheckCircle, FileText } from 'lucide-react'
import type { TimeBlockContent, ArtifactType, HtmlArtifactSpec } from '@/lib/simulation'
import { ARTIFACT_TYPES } from '@/lib/simulation'
import { HtmlArtifact } from './HtmlArtifact'

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

// ── Light markdown renderer ─────────────────────────────────────────────────────
// Used for briefing prose (Orientation readings) and work-product artifacts. It
// handles the subset the authored content uses: paragraphs, **bold**, bullet
// lists (one nesting level), pipe tables, fenced code blocks, and # headings.
// Deliberately small — not a full CommonMark parser.

// Inline **bold** → <strong>; everything else passes through as text.
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter((p) => p !== '')
    .map((part, i) => {
      const m = /^\*\*([^*]+)\*\*$/.exec(part)
      if (m) {
        return (
          <strong key={`${keyPrefix}-${i}`} className="font-semibold text-dark">
            {m[1]}
          </strong>
        )
      }
      return <span key={`${keyPrefix}-${i}`}>{part}</span>
    })
}

function isSeparatorRow(s: string): boolean {
  const t = s.trim()
  return t.includes('|') && t.includes('-') && t.replace(/[\s|:-]/g, '') === ''
}

function splitTableRow(s: string): string[] {
  return s.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim())
}

function MarkdownTable({ header, rows, k }: { header: string[]; rows: string[][]; k: number }) {
  return (
    <div key={k} className="overflow-x-auto -mx-1 my-1">
      <table className="w-full border-collapse font-sans text-[12.5px]">
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th
                key={i}
                className="text-left font-semibold text-white px-2.5 py-1.5 align-top"
                style={{ backgroundColor: 'var(--color-navy)', border: '1px solid #2a3a5a' }}
              >
                {renderInline(cell, `th-${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} style={{ backgroundColor: r % 2 === 1 ? '#f7f7f5' : '#ffffff' }}>
              {header.map((_, c) => (
                <td
                  key={c}
                  className="px-2.5 py-1.5 align-top text-dark"
                  style={{ border: '1px solid #e5e7eb' }}
                >
                  {renderInline(row[c] ?? '', `td-${r}-${c}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MarkdownList({ items, k }: { items: { text: string; indent: number }[]; k: number }) {
  // Group sub-bullets (indent ≥ 2) under the preceding top-level item.
  const top: { text: string; children: string[] }[] = []
  for (const it of items) {
    if (it.indent >= 2 && top.length > 0) top[top.length - 1].children.push(it.text)
    else top.push({ text: it.text, children: [] })
  }
  return (
    <ul key={k} className="list-disc pl-5 space-y-1 font-sans text-[14px] text-dark leading-relaxed">
      {top.map((t, i) => (
        <li key={i}>
          {renderInline(t.text, `li-${i}`)}
          {t.children.length > 0 && (
            <ul className="list-[circle] pl-5 mt-1 space-y-1">
              {t.children.map((c, j) => (
                <li key={j}>{renderInline(c, `li-${i}-${j}`)}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const out: ReactNode[] = []
  let i = 0
  let k = 0

  const isBlockStart = (idx: number): boolean => {
    const t = lines[idx].trim()
    return (
      t.startsWith('```') ||
      t.startsWith('>') ||
      /^#{1,6}\s+/.test(t) ||
      /^[-*]\s+/.test(t) ||
      (t.includes('|') && idx + 1 < lines.length && isSeparatorRow(lines[idx + 1]))
    )
  }

  while (i < lines.length) {
    const line = lines[i].trim()
    if (line === '') { i++; continue }

    // Fenced code block
    if (line.startsWith('```')) {
      const buf: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) { buf.push(lines[i]); i++ }
      i++ // closing fence
      out.push(
        <pre
          key={k++}
          className="overflow-x-auto rounded-[8px] p-3 font-mono text-[12.5px] text-dark leading-relaxed"
          style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}
        >
          {buf.join('\n')}
        </pre>,
      )
      continue
    }

    // Pipe table (header row followed by a separator row)
    if (line.includes('|') && i + 1 < lines.length && isSeparatorRow(lines[i + 1])) {
      const header = splitTableRow(line)
      i += 2 // header + separator
      const rows: string[][] = []
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '' && !isSeparatorRow(lines[i])) {
        rows.push(splitTableRow(lines[i]))
        i++
      }
      out.push(<MarkdownTable key={k} header={header} rows={rows} k={k} />)
      k++
      continue
    }

    // Blockquote (one or more contiguous "> " lines) → callout (e.g. reviewer comments)
    if (line.startsWith('>')) {
      const quote: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      out.push(
        <div
          key={k++}
          className="pl-3 my-1 font-sans text-[13.5px] text-dark/80 italic space-y-1"
          style={{ borderLeft: '3px solid var(--color-teal)' }}
        >
          {quote.filter(Boolean).map((q, qi) => (
            <p key={qi}>{renderInline(q, `q-${k}-${qi}`)}</p>
          ))}
        </div>,
      )
      continue
    }

    // Heading (# … ######) → bold subhead
    const h = /^(#{1,6})\s+(.*)$/.exec(line)
    if (h) {
      out.push(
        <p key={k++} className="font-sans font-bold text-[14px] text-navy mt-1">
          {renderInline(h[2], `h-${k}`)}
        </p>,
      )
      i++
      continue
    }

    // Bullet list (collect contiguous bullet lines, tracking indentation)
    if (/^[-*]\s+/.test(line)) {
      const items: { text: string; indent: number }[] = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        const indent = lines[i].length - lines[i].trimStart().length
        items.push({ text: lines[i].trim().replace(/^[-*]\s+/, ''), indent })
        i++
      }
      out.push(<MarkdownList key={k} items={items} k={k} />)
      k++
      continue
    }

    // Paragraph (join contiguous plain lines)
    const para: string[] = []
    while (i < lines.length && lines[i].trim() !== '' && !isBlockStart(i)) {
      para.push(lines[i].trim())
      i++
    }
    out.push(
      <p key={k++} className="font-sans text-[15px] text-dark leading-relaxed">
        {renderInline(para.join(' '), `p-${k}`)}
      </p>,
    )
  }

  return <div className="space-y-3">{out}</div>
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
          <span className="font-sans font-bold text-[15px] text-dark">
            {line.speaker}:
          </span>{' '}
          <span className="font-sans text-[15px] text-dark leading-relaxed">
            {line.text}
          </span>
        </div>
      )

    case 'monologue':
      return (
        <p
          key={index}
          className="font-sans text-[15px] text-dark italic leading-relaxed mb-1 pl-3"
          style={{ borderLeft: '2px solid #e5e7eb' }}
        >
          {line.text}
        </p>
      )

    case 'narration':
    default:
      // Plain narration is the bulk of the "During" body — render it as dark,
      // non-italic body text (matching the Before box) for comfortable reading.
      // The muted-italic treatment is reserved for bracketed scene directions.
      return (
        <p
          key={index}
          className="font-sans text-[15px] text-dark leading-relaxed mb-2"
        >
          {line.text}
        </p>
      )
  }
}

// ── Exported section components ───────────────────────────────────────────────

export function BeforeSection({ content, showHeader = true }: { content: string; showHeader?: boolean }) {
  return (
    <div
      className="rounded-[10px] p-4"
      style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
    >
      {showHeader && (
        <div className="flex items-center gap-2 mb-3">
          <Clock size={13} aria-hidden="true" style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
          <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide">
            Before: Setting the Scene
          </p>
        </div>
      )}
      <p className="font-sans text-[15px] text-dark leading-relaxed">{content}</p>
    </div>
  )
}

export function ScriptSection({
  content,
  asProse = false,
  showLabel = true,
}: {
  content: string
  asProse?: boolean
  // The "During" mini-label only makes sense alongside other sections. A
  // standalone briefing reading (Orientation) drops it and reads as an essay.
  showLabel?: boolean
}) {
  const label = showLabel ? (
    <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-3">
      During
    </p>
  ) : null

  // Briefing prose (e.g. Orientation) is markdown (paragraphs, bold, bullets,
  // glossary), not a screenplay — render it via the markdown renderer instead of
  // the dialogue/scene parser, which would mis-style or mis-split it.
  if (asProse) {
    return (
      <div>
        {label}
        <Markdown source={content} />
      </div>
    )
  }

  const lines = parseScriptLines(content)
  return (
    <div>
      {label}
      <div>
        {lines.map((line, i) => (
          <ScriptLineItem key={i} line={line} index={i} />
        ))}
      </div>
    </div>
  )
}

// Work product (a deck page, tracker, interview guide). Rendered as a styled
// "Work Product" panel; the body is markdown (tables, code, bullets, bold).
export function ArtifactSection({ content }: { content: string }) {
  return (
    <div
      className="rounded-[10px] p-4"
      style={{ backgroundColor: '#fbfaf8', border: '1px solid #e5e7eb' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <FileText size={13} aria-hidden="true" style={{ color: 'var(--color-navy)', flexShrink: 0 }} />
        <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide">
          Work Product
        </p>
      </div>
      <Markdown source={content} />
    </div>
  )
}

// Renders a chunk of screenplay/prose text (no "During" label). Used to render
// the text segments on either side of an inline artifact marker.
function ScriptLines({ content, asProse }: { content: string; asProse?: boolean }) {
  if (asProse) return <Markdown source={content} />
  return (
    <>
      {parseScriptLines(content).map((line, i) => (
        <ScriptLineItem key={i} line={line} index={i} />
      ))}
    </>
  )
}

// A self-contained HTML artifact with its "Artifact N — {Type}" caption. Renders
// full width (it breaks out of the narrow prose column in the split layout), with
// no Meridian "Work Product" card chrome (the artifact brings its own).
function InlineHtmlArtifact({ n, html, type }: { n: number; html: string; type: ArtifactType }) {
  return (
    <div className="w-full">
      <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-2">
        Artifact {n} — {ARTIFACT_TYPES[type].label}
      </p>
      <HtmlArtifact html={html} />
    </div>
  )
}

// One item in a block's vertical flow: a prose segment (narrow in the split
// layout) or a full-width HTML artifact.
type FlowNode =
  | { kind: 'prose'; key: string; node: ReactNode }
  | { kind: 'artifact'; key: string; n: number; html: string; type: ArtifactType }

// Split one section's raw text on {{artifact:N}} markers into flow nodes: prose
// segments (each rendered via renderSegment) interleaved with the referenced HTML
// artifacts, in reading order. A marker whose artifact exists is recorded in
// `consumed` (so it is not also rendered at the end); a marker with no matching
// artifact renders nothing and does not error.
function splitSectionOnMarkers(
  source: string,
  artifacts: Record<number, HtmlArtifactSpec> | undefined,
  consumed: Set<number>,
  keyPrefix: string,
  renderSegment: (text: string, isFirst: boolean) => ReactNode,
): FlowNode[] {
  const flow: FlowNode[] = []
  const re = /\{\{artifact:(\d+)\}\}/g
  let last = 0
  let seg = 0
  let m: RegExpExecArray | null

  const pushProse = (text: string) => {
    if (!text.trim()) return
    flow.push({ kind: 'prose', key: `${keyPrefix}-t${seg}`, node: renderSegment(text, seg === 0) })
    seg++
  }

  while ((m = re.exec(source)) !== null) {
    pushProse(source.slice(last, m.index))
    const n = Number(m[1])
    const spec = artifacts?.[n]
    if (spec) {
      flow.push({ kind: 'artifact', key: `${keyPrefix}-a${n}`, n, html: spec.html, type: spec.type })
      consumed.add(n)
    }
    last = m.index + m[0].length
  }
  pushProse(source.slice(last))
  return flow
}

// The block body: renders only the sections that have content, in reading order
// (Before → During → Commentary → Work Product → After). An empty `after` (or
// any empty field) is omitted entirely, so there are no hollow section boxes.
// HTML artifacts render inline at their {{artifact:N}} marker (breaking out of
// the narrow prose column), or — if unmarked — at the end of the block.
export function BlockBody({
  content,
  briefing,
  proseWidthClass,
}: {
  content: TimeBlockContent
  briefing?: boolean
  // C12: when set (the widened desktop artifact panel), the prose sections are
  // constrained to this narrow, centered column for readability while the
  // work-product artifact spans the panel's full width. Unset (mobile modal,
  // Orientation reading) renders a single column exactly as before.
  proseWidthClass?: string
}) {
  const hasBefore        = !!content.before?.trim()
  const hasScript        = !!content.simulatedWork?.trim()
  const hasCommentary    = !!content.commentary?.trim()
  const hasArtifact      = !!content.artifact?.trim()
  const artifactsHtml    = content.artifactsHtml
  const hasHtmlArtifacts = !!artifactsHtml && Object.keys(artifactsHtml).length > 0
  const hasAnyArtifact   = hasArtifact || hasHtmlArtifacts
  const hasAfter         = !!content.after?.trim()
  // "During" label only when the script sits alongside other sections.
  const showDuringLabel = hasBefore || hasCommentary || hasAnyArtifact || hasAfter

  // Build the vertical flow, placing HTML artifacts at their inline markers.
  const consumed = new Set<number>()
  const flow: FlowNode[] = []

  if (hasBefore) {
    flow.push(...splitSectionOnMarkers(content.before, artifactsHtml, consumed, 'before',
      (t, first) => <BeforeSection content={t} showHeader={first} />))
  }
  if (hasScript) {
    flow.push(...splitSectionOnMarkers(content.simulatedWork, artifactsHtml, consumed, 'script',
      (t, first) => (
        <div>
          {first && showDuringLabel && (
            <p className="font-sans text-[11px] font-semibold text-muted uppercase tracking-wide mb-3">
              During
            </p>
          )}
          <ScriptLines content={t} asProse={briefing} />
        </div>
      )))
  }
  if (hasCommentary) {
    flow.push(...splitSectionOnMarkers(content.commentary, artifactsHtml, consumed, 'commentary',
      (t) => <CommentarySection content={t} />))
  }

  // Fallback: any HTML artifact not placed by a marker renders at the end of the
  // block (Phase 4 behavior), in ascending artifact-number order.
  if (hasHtmlArtifacts) {
    for (const key of Object.keys(artifactsHtml!).map(Number).sort((a, b) => a - b)) {
      if (!consumed.has(key)) {
        const spec = artifactsHtml![key]
        flow.push({ kind: 'artifact', key: `end-a${key}`, n: key, html: spec.html, type: spec.type })
      }
    }
  }

  // Markdown artifact (Meridian) is unchanged: its "Work Product" card renders at
  // the end. A block is expected to use at most one artifact kind.
  const markdownArtifact = hasArtifact ? <ArtifactSection content={content.artifact!} /> : null
  const after = hasAfter ? <AfterSection content={content.after} /> : null

  // Split layout: prose segments in a narrow centered column, artifacts full
  // width. Non-split (mobile / Orientation): single column, artifacts inline.
  if (proseWidthClass) {
    return (
      <>
        {flow.map((f) =>
          f.kind === 'prose' ? (
            <div key={f.key} className={`${proseWidthClass} mx-auto w-full`}>{f.node}</div>
          ) : (
            <InlineHtmlArtifact key={f.key} n={f.n} html={f.html} type={f.type} />
          ),
        )}
        {markdownArtifact}
        {after && <div className={`${proseWidthClass} mx-auto w-full`}>{after}</div>}
      </>
    )
  }

  return (
    <>
      {flow.map((f) =>
        f.kind === 'prose' ? (
          <div key={f.key}>{f.node}</div>
        ) : (
          <InlineHtmlArtifact key={f.key} n={f.n} html={f.html} type={f.type} />
        ),
      )}
      {markdownArtifact}
      {after}
    </>
  )
}

export function CommentarySection({ content }: { content: string }) {
  const sentences = splitCommentary(content)
  return (
    <div
      className="rounded-[10px] p-4"
      style={{
        backgroundColor: 'var(--color-tag-bg)',
        // Darker teal border (was #c8e6e2) so the light-teal box stays distinct
        // against the cream reading field. Background + structure unchanged.
        border: '1px solid #7fc8bd',
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
          <p key={i} className="font-sans text-[15px] text-dark italic leading-relaxed">
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
      <p className="font-sans text-[15px] text-dark leading-relaxed">{content}</p>
    </div>
  )
}
