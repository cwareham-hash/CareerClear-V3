#!/usr/bin/env node
// Audition round 2: Full Simulation guest speakers (Raymond, Diane, Gregory, Laura).
// Built on scripts/generate-auditions.mjs (round 1) — same extraction, passage
// construction, and output conventions, but each role reads from the Full Sim
// block where that character actually speaks. Run in Sep 2026; Collin cast
// Gregory -> Dan and Diane -> Tori from these. Raymond and Laura still open.
//
// Usage:  node scripts/generate-auditions-round2.mjs [--dry-run]
//   --dry-run: report speaker totals, passages, voice matches, cost estimate.
//              No TTS calls, no credits.
//
// Output: audio-samples/auditions-round2/<role>--<voicename>.mp3

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_FILE = path.join(ROOT, 'lib', 'content', 'management-consultant-meridian.ts')
const OUT_DIR = path.join(ROOT, 'audio-samples', 'auditions-round2')

const MODEL_ID = 'eleven_multilingual_v2'
const OUTPUT_FORMAT = 'mp3_44100_128'

// Each role reads from the block where that character actually speaks.
const ROLES = {
  raymond: { speaker: 'Raymond', blockId: 'management-consultant-meridian-full-d2-b3' },
  diane:   { speaker: 'Diane',   blockId: 'management-consultant-meridian-full-d4-b4' },
  gregory: { speaker: 'Gregory', blockId: 'management-consultant-meridian-full-d4-b4' },
  laura:   { speaker: 'Laura',   blockId: 'management-consultant-meridian-full-d4-b4' },
}

// Candidate short-list from Collin; matched live against My Voices by
// "display name starts with prefix" (same rule as round 1).
const CANDIDATES = {
  raymond: ['Frederick', 'Michael - Warm British', 'Boyd'],
  gregory: ['Alex', 'Jarnathan', 'Dan'],
  diane:   ['Lilian', 'Serein', 'Tori'],
  laura:   ['Ivanna', 'Belle', 'Lauren'],
}
// Known tie, resolved by Collin in round 1: "Dan" -> the deliberately added
// library voice "Dan - Energetic, Emotional and Excited" (not built-in Daniel).
const TIE_BREAKS = { Dan: 'Dan - Energetic, Emotional and Excited' }

function fail(msg) {
  console.error(`STOP: ${msg}`)
  process.exit(1)
}

// ---------- API key (from .env.local; value is never printed) ----------
function readApiKey() {
  const raw = readFileSync(path.join(ROOT, '.env.local'), 'utf8')
  const line = raw.split('\n').find((l) => l.startsWith('ELEVENLABS_API_KEY='))
  if (!line) fail('.env.local has no ELEVENLABS_API_KEY= line.')
  const key = line.slice('ELEVENLABS_API_KEY='.length).trim()
  if (!key) fail('ELEVENLABS_API_KEY= line is empty.')
  return key
}

// ---------- Content extraction (verbatim approach from round 1) ----------
function extractField(slice, field) {
  const m = slice.match(new RegExp(`(?:^|\\n)\\s*${field}:\\s*\``))
  if (!m) return null
  let i = m.index + m[0].length
  let out = ''
  while (i < slice.length) {
    const ch = slice[i]
    if (ch === '\\') { out += slice[i + 1]; i += 2; continue }
    if (ch === '`') return out
    out += ch
    i += 1
  }
  fail(`Unterminated template literal for field "${field}".`)
}

const SRC = readFileSync(CONTENT_FILE, 'utf8')

function blockScene(blockId) {
  const startKey = `'${blockId}':`
  const start = SRC.indexOf(startKey)
  if (start === -1) fail(`Block "${blockId}" not found.`)
  const nextBlock = SRC.slice(start + startKey.length).search(/\n  '[a-z0-9-]+':\s*\{/)
  const slice = nextBlock === -1 ? SRC.slice(start) : SRC.slice(start, start + startKey.length + nextBlock)
  return extractField(slice, 'simulatedWork') || ''
}

// ---------- Passage construction (verbatim helpers from round 1) ----------
const sentences = (text) => text.split(/(?<=[.?!])\s+/).filter((s) => s.trim())
const stripDirections = (text) => text.replace(/\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim()

function speakerLines(scene, speaker) {
  const out = []
  for (const para of scene.split(/\n\s*\n/)) {
    const p = para.trim()
    if (p.startsWith(`${speaker}: `)) {
      const line = stripDirections(p.slice(speaker.length + 2))
      if (line) out.push(line)
    }
  }
  return out
}

function takeSentences(text, minLen, startWith = '') {
  let out = startWith
  for (const s of sentences(text)) {
    if (out.length >= minLen) break
    out = out ? `${out} ${s}` : s
  }
  return out
}

// ---------- Week-wide speaker totals (spoken chars: labels stripped, directions removed) ----------
const allBlockIds = [...SRC.matchAll(/\n  '(management-consultant-meridian-[a-z0-9-]+)':\s*\{/g)].map((m) => m[1])
console.log('--- Week-wide totals (spoken characters, stage directions removed) ---')
const weekTotals = {}
for (const role of Object.keys(ROLES)) {
  const speaker = ROLES[role].speaker
  let total = 0
  const perBlock = []
  for (const id of allBlockIds) {
    const n = speakerLines(blockScene(id), speaker).join(' ').length
    if (n > 0) { total += n; perBlock.push(`${id.replace('management-consultant-meridian-', '')}: ${n}`) }
  }
  weekTotals[role] = total
  console.log(`${speaker.padEnd(8)} ${String(total).padStart(6)} chars  (${perBlock.join(', ') || 'nowhere'})`)
}

// ---------- Passages ----------
console.log('\n--- Audition passages ---')
const PASSAGES = {}
for (const [role, { speaker, blockId }] of Object.entries(ROLES)) {
  const lines = speakerLines(blockScene(blockId), speaker)
  const all = lines.join(' ')
  let passage
  let note = ''
  if (all.length < 300) { passage = all; note = ' (speaker total under 300 — using everything they say)' }
  else passage = takeSentences(all, 550)
  if (!passage) fail(`No dialogue found for ${speaker} in ${blockId}.`)
  PASSAGES[role] = passage
  console.log(`${role.toUpperCase()} (${passage.length} chars${note}): "${passage.split(/\s+/).slice(0, 12).join(' ')}..."`)
}

// ---------- Voice resolution (prefix match against My Voices) ----------
const apiKey = readApiKey()
const vres = await fetch('https://api.elevenlabs.io/v1/voices', { headers: { 'xi-api-key': apiKey } })
if (!vres.ok) fail(`My Voices fetch failed (HTTP ${vres.status}).`)
const { voices } = await vres.json()

console.log('\n--- Candidate voice resolution ---')
const RESOLVED = {}
let unresolved = 0
for (const [role, prefixes] of Object.entries(CANDIDATES)) {
  RESOLVED[role] = []
  for (const prefix of prefixes) {
    const matches = voices.filter((v) => v.name.startsWith(prefix))
    let pick = null
    if (matches.length === 1) pick = matches[0]
    else if (matches.length > 1 && TIE_BREAKS[prefix]) pick = matches.find((v) => v.name === TIE_BREAKS[prefix]) || null
    if (!pick) {
      unresolved += 1
      console.log(`${role}/${prefix}: ${matches.length === 0 ? 'NO MATCH' : 'AMBIGUOUS: ' + matches.map((v) => v.name).join(' | ')}`)
      continue
    }
    const file = pick.name.split(/[-–]| \(/)[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    RESOLVED[role].push({ prefix, name: pick.name, id: pick.voice_id, file })
    console.log(`${role}/${prefix}: -> "${pick.name}"`)
  }
}
if (unresolved > 0) fail(`${unresolved} candidate(s) failed to resolve — see above.`)

// ---------- Cost estimate + gate ----------
let estimate = 0
for (const [role, cands] of Object.entries(RESOLVED)) estimate += PASSAGES[role].length * cands.length
console.log(`\nEstimated cost: ${estimate} characters (12 snippets).`)
if (estimate > 12000) fail(`Estimate ${estimate} exceeds the 12,000-character gate.`)

if (process.argv.includes('--dry-run')) {
  console.log('Dry run: no TTS calls made, no credits spent.')
  process.exit(0)
}

// ---------- Generate ----------
mkdirSync(OUT_DIR, { recursive: true })
let totalChars = 0
for (const [role, cands] of Object.entries(RESOLVED)) {
  for (const cand of cands) {
    const outFile = path.join(OUT_DIR, `${role}--${cand.file}.mp3`)
    process.stdout.write(`${role}--${cand.file}.mp3  (${cand.name})\n`)
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${cand.id}?output_format=${OUTPUT_FORMAT}`,
      {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: PASSAGES[role], model_id: MODEL_ID }),
      }
    )
    if (!res.ok) fail(`ElevenLabs TTS failed for "${cand.name}" (HTTP ${res.status}): ${await res.text()}`)
    writeFileSync(outFile, Buffer.from(await res.arrayBuffer()))
    totalChars += PASSAGES[role].length
  }
}
console.log(`\nDone. ${totalChars} characters synthesized -> ${path.relative(ROOT, OUT_DIR)}/`)
