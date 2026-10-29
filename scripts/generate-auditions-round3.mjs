#!/usr/bin/env node
// Audition round 3 (Oct 2026), on Eleven v4: the four roles still uncast.
//   - Marisol (Halloran's CFO) and Rick (Halloran's founder), from the Kestrel
//     Full Simulation client session (ib-analyst-kestrel-full-d4-b1)
//   - Laura and Raymond (Meridian Full Simulation guests), re-auditioned after
//     every round 2 candidate was rejected. They read exactly the round 2
//     passages: the same blocks and the same passage construction.
// Built on scripts/generate-auditions-round2.mjs (left unchanged): same
// extraction, passage helpers, voice matching and output conventions.
//
// Usage:  node scripts/generate-auditions-round3.mjs [--dry-run]
//   --dry-run: report passages, voice matches and the cost estimate.
//              No TTS calls, no credits.
//
// Output: audio-samples/auditions-round3/<role>--<voicename>.mp3

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = path.join(ROOT, 'lib', 'content')
const OUT_DIR = path.join(ROOT, 'audio-samples', 'auditions-round3')

const MODEL_ID = 'eleven_v4'
const OUTPUT_FORMAT = 'mp3_44100_128'

// Each role reads from the block where that character actually speaks.
// Laura and Raymond keep round 2's block and passage rule (550+ characters).
// Marisol and Rick read roughly 500 to 700 characters.
const ROLES = {
  marisol: { speaker: 'Marisol', file: 'ib-analyst-kestrel.ts',            blockId: 'ib-analyst-kestrel-full-d4-b1',            min: 500, max: 700 },
  laura:   { speaker: 'Laura',   file: 'management-consultant-meridian.ts', blockId: 'management-consultant-meridian-full-d4-b4', round2: true },
  raymond: { speaker: 'Raymond', file: 'management-consultant-meridian.ts', blockId: 'management-consultant-meridian-full-d2-b3', round2: true },
  rick:    { speaker: 'Rick',    file: 'ib-analyst-kestrel.ts',            blockId: 'ib-analyst-kestrel-full-d4-b1',            min: 500, max: 700 },
}

// Candidate short-list from Collin; matched live against My Voices by
// "display name starts with prefix" (same rule as rounds 1 and 2). Marisol and
// Laura share one pool, and every voice in it reads both passages.
const WOMEN = ['Jessica Anne', 'Savvy', 'Kathryn', 'Elise', 'Carol']
const CANDIDATES = {
  marisol: WOMEN,
  laura:   WOMEN,
  raymond: ['Gerard', 'Jim'],
  rick:    ['Dan - Energetic', 'Gerard', 'Jim'],
}

// Hard stop well above the expected ~9,000 characters (15 snippets).
const COST_GATE = 12000

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

// ---------- Content extraction (verbatim approach from rounds 1 and 2) ----------
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

function blockScene(file, blockId) {
  const src = readFileSync(path.join(CONTENT_DIR, file), 'utf8')
  const startKey = `'${blockId}':`
  const start = src.indexOf(startKey)
  if (start === -1) fail(`Block "${blockId}" not found in ${file}.`)
  const nextBlock = src.slice(start + startKey.length).search(/\n  '[a-z0-9-]+':\s*\{/)
  const slice = nextBlock === -1 ? src.slice(start) : src.slice(start, start + startKey.length + nextBlock)
  return extractField(slice, 'simulatedWork') || ''
}

// ---------- Passage construction (verbatim helpers from round 2) ----------
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

// Round 3 rule for the new roles: whole sentences until at least `min`
// characters, stepping back one sentence if that overshoots `max` (as long as
// the shorter passage still reaches `min`). Under `min` in total: use it all.
function takeBetween(text, min, max) {
  if (text.length <= min) return text
  let out = ''
  let prev = ''
  for (const s of sentences(text)) {
    if (out.length >= min) break
    prev = out
    out = out ? `${out} ${s}` : s
  }
  return out.length > max && prev.length >= min ? prev : out
}

// ---------- Passages ----------
console.log('--- Audition passages ---')
const PASSAGES = {}
for (const [role, cfg] of Object.entries(ROLES)) {
  const all = speakerLines(blockScene(cfg.file, cfg.blockId), cfg.speaker).join(' ')
  if (!all) fail(`No dialogue found for ${cfg.speaker} in ${cfg.blockId}.`)
  let passage
  if (cfg.round2) passage = all.length < 300 ? all : takeSentences(all, 550) // round 2's exact rule
  else passage = takeBetween(all, cfg.min, cfg.max)
  PASSAGES[role] = passage
  console.log(`${role.toUpperCase()} (${passage.length} chars, from ${cfg.blockId}):\n  "${passage}"\n`)
}

// ---------- Voice resolution (prefix match against My Voices) ----------
const apiKey = readApiKey()
const vres = await fetch('https://api.elevenlabs.io/v1/voices', { headers: { 'xi-api-key': apiKey } })
if (!vres.ok) fail(`My Voices fetch failed (HTTP ${vres.status}).`)
const { voices } = await vres.json()

console.log('--- Candidate voice resolution ---')
const RESOLVED = {}
let unresolved = 0
for (const [role, prefixes] of Object.entries(CANDIDATES)) {
  RESOLVED[role] = []
  for (const prefix of prefixes) {
    const matches = voices.filter((v) => v.name.startsWith(prefix))
    if (matches.length !== 1) {
      unresolved += 1
      console.log(`${role}/${prefix}: ${matches.length === 0 ? 'NO MATCH' : 'AMBIGUOUS: ' + matches.map((v) => v.name).join(' | ')}`)
      continue
    }
    const pick = matches[0]
    const file = pick.name.split(/[-–]| \(/)[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    RESOLVED[role].push({ prefix, name: pick.name, id: pick.voice_id, file })
    console.log(`${role}/${prefix}: -> "${pick.name}"`)
  }
}
if (unresolved > 0) fail(`${unresolved} candidate(s) did not match exactly one voice — see above. Ask Collin before going on.`)

// ---------- Cost estimate + gate ----------
let estimate = 0
let snippets = 0
for (const [role, cands] of Object.entries(RESOLVED)) {
  estimate += PASSAGES[role].length * cands.length
  snippets += cands.length
}
console.log(`\nEstimated cost: ${estimate} characters (${snippets} snippets).`)
if (estimate > COST_GATE) fail(`Estimate ${estimate} exceeds the ${COST_GATE}-character gate.`)

if (process.argv.includes('--dry-run')) {
  console.log('Dry run: no TTS calls made, no credits spent.')
  process.exit(0)
}

// ---------- Generate ----------
// Each call's clock time is printed so its credit cost can be found in the
// ElevenLabs usage history.
mkdirSync(OUT_DIR, { recursive: true })
let totalChars = 0
for (const [role, cands] of Object.entries(RESOLVED)) {
  for (const cand of cands) {
    const outFile = path.join(OUT_DIR, `${role}--${cand.file}.mp3`)
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
    console.log(`${new Date().toLocaleTimeString('en-US', { hour12: false })}  ${role}--${cand.file}.mp3  (${cand.name}, ${PASSAGES[role].length} chars)`)
  }
}
console.log(`\nDone. ${totalChars} characters synthesized on ${MODEL_ID} -> ${path.relative(ROOT, OUT_DIR)}/`)
