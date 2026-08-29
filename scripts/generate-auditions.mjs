#!/usr/bin/env node
// scripts/generate-auditions.mjs
//
// Voice-casting auditions for Meridian Day-in-the-Life block 1. Generates one
// short mp3 per candidate voice, each reading a fixed passage of that role's
// real lines from the block, so candidates within a role can be compared
// head to head. Output: audio-samples/auditions/<role>--<candidate>.mp3
//
// Usage:  node scripts/generate-auditions.mjs
//
// Candidate list locked by Collin (Aug 2026). Voice ids resolved against the
// ElevenLabs My Voices list by "display name starts with candidate string";
// the one tie ("Dan") was resolved by Collin to the library voice
// "Dan - Energetic, Emotional and Excited" over the built-in "Daniel".

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_FILE = path.join(ROOT, 'lib', 'content', 'management-consultant-meridian.ts')
const BLOCK_ID = 'management-consultant-meridian-dil-d1-b1'
const OUT_DIR = path.join(ROOT, 'audio-samples', 'auditions')

const MODEL_ID = 'eleven_multilingual_v2'
const OUTPUT_FORMAT = 'mp3_44100_128'

const CANDIDATES = {
  narrator: [
    { file: 'the-pharaoh',           name: 'The Pharaoh 4 - Narration & Audio books', id: 'J2FGlQG8Gd7x8uEDt2H8' },
    { file: 'jay-wayne',             name: 'Jay Wayne - Wise University Professor',   id: '8Ln42OXYupYsag45MAUy' },
    { file: 'alex',                  name: 'Alex - Intelligent, Friendly, Confident', id: 'cQb5fnQsTT1X0GdpmHoo' },
  ],
  david: [
    { file: 'frederick',             name: 'Frederick Surrey - Conversational',       id: 'KLON7Nwan8mJxpF2R8Yw' },
    { file: 'michael-warm-british',  name: 'Michael - Warm British male',             id: 'YxV306TE3Zjvmce8pOII' },
    { file: 'conrad',                name: 'Conrad Palmer',                           id: 'LkreQVAyh7la0Gj42eBn' },
  ],
  marcus: [
    { file: 'adam-engaging',         name: 'Adam - Engaging, Friendly and Bright',    id: 's3TPKV1kjDlVtZbl4Ksh' },
    { file: 'greg',                  name: 'Greg -  Driving Tours App',               id: 'GlLKN8gKPpScsRIImeN1' },
    { file: 'dan',                   name: 'Dan - Energetic, Emotional and Excited',  id: 'PGqDc9SLzJTxDTy8SjYb' },
    { file: 'boyd',                  name: 'Boyd - Versatile, Fatherly and Natural',  id: 'gfRt6Z3Z8aTbpLfexQ7N' },
    { file: 'cooper',                name: 'Cooper - Young American Male',            id: 'BcJMy2AClTYRAgDaPpgz' },
    { file: 'jarnathan',             name: 'Jarnathan Cross - Witty, Knowing & Poise', id: '7WggD3IoWTIPT19PNyrW' },
    { file: 'bill-persuasive',       name: 'Bill - Persuasive Calm & Friendly',       id: 'sR8sxaLJeFSh308Gi6HS' },
  ],
  carly: [
    { file: 'lauren',                name: 'Lauren - Friendly, Comforting and Soft',  id: 'DODLEQrClDo8wCz460ld' },
    { file: 'serein',                name: 'Serein - Friendly, Casual and Balanced',  id: 'b5RPB35vTODb3BEmR3Fc' },
    { file: 'tori',                  name: 'Tori',                                    id: 'lAxf5ma5HGtzxC434SWT' },
    { file: 'lilian',                name: 'Lilian - Warm, Clear & Hybrid',           id: 'A9hvW90SK1w1iyI1xxf9' },
    { file: 'belle',                 name: 'Belle B - Sweet Outbound Sales Voice',    id: 'aKw9UnnjRq5scbeeGI7Z' },
    { file: 'claire-ultra',          name: 'Claire - Ultra Real & Natural',           id: '7A85ufQZSEaTbZ5eQ4f4' },
  ],
}

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

// ---------- Content extraction (same parsing approach as generate-block-audio.mjs) ----------
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

function loadBlock() {
  const src = readFileSync(CONTENT_FILE, 'utf8')
  const startKey = `'${BLOCK_ID}':`
  const start = src.indexOf(startKey)
  if (start === -1) fail(`Block "${BLOCK_ID}" not found in ${CONTENT_FILE}.`)
  const nextBlock = src.slice(start + startKey.length).search(/\n  '[a-z0-9-]+':\s*\{/)
  const slice = nextBlock === -1 ? src.slice(start) : src.slice(start, start + startKey.length + nextBlock)
  return {
    before: extractField(slice, 'before') || '',
    simulatedWork: extractField(slice, 'simulatedWork') || '',
    commentary: extractField(slice, 'commentary') || '',
  }
}

// ---------- Passage construction ----------
const sentences = (text) => text.split(/(?<=[.?!])\s+/).filter((s) => s.trim())
const stripDirections = (text) => text.replace(/\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim()

// Whole dialogue lines for one speaker, in block order, labels stripped.
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

// Append sentences until the passage reaches minLen, then stop (cut is always
// at a sentence boundary; identical input -> identical passage every run).
function takeSentences(text, minLen, startWith = '') {
  let out = startWith
  for (const s of sentences(text)) {
    if (out.length >= minLen) break
    out = out ? `${out} ${s}` : s
  }
  return out
}

const block = loadBlock()

const PASSAGES = {
  // Opening of the setting-the-scene text, ~500-700 chars, sentence boundary.
  narrator: takeSentences(block.before.trim(), 500),
  // Continuous run of the speaker's own dialogue lines, ~400-700 chars.
  // Aim near the top of that range so snippets land in the 30-60s window.
  david: takeSentences(speakerLines(block.simulatedWork, 'David').join(' '), 600),
  marcus: takeSentences(speakerLines(block.simulatedWork, 'Marcus').join(' '), 600),
  // Carly does double duty: her first dialogue line(s) + commentary opening, ~500-700.
  carly: (() => {
    const lines = speakerLines(block.simulatedWork, 'Carly')
    let dialogue = lines[0] || ''
    if (dialogue.length < 350 && lines[1]) dialogue += ' ' + lines[1]
    return takeSentences(block.commentary.trim(), 500, dialogue)
  })(),
}

// ---------- Generate ----------
// Optional CLI args restrict which roles regenerate, e.g.:
//   node scripts/generate-auditions.mjs david marcus
const onlyRoles = process.argv.slice(2)
const apiKey = readApiKey()
mkdirSync(OUT_DIR, { recursive: true })

let totalChars = 0
for (const [role, passage] of Object.entries(PASSAGES)) {
  if (onlyRoles.length && !onlyRoles.includes(role)) continue
  if (!passage || passage.length < 200) fail(`Passage for role "${role}" came out too short (${passage.length} chars) — content shape changed?`)
  console.log(`\n${role.toUpperCase()} passage (${passage.length} chars): "${passage.split(/\s+/).slice(0, 12).join(' ')}..."`)
  for (const cand of CANDIDATES[role]) {
    const outFile = path.join(OUT_DIR, `${role}--${cand.file}.mp3`)
    process.stdout.write(`  ${cand.name} -> ${path.basename(outFile)}\n`)
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${cand.id}?output_format=${OUTPUT_FORMAT}`,
      {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: passage, model_id: MODEL_ID }),
      }
    )
    if (!res.ok) fail(`ElevenLabs TTS failed for "${cand.name}" (HTTP ${res.status}): ${await res.text()}`)
    writeFileSync(outFile, Buffer.from(await res.arrayBuffer()))
    totalChars += passage.length
  }
}

console.log(`\nDone. ${Object.values(CANDIDATES).flat().length} snippets, ${totalChars} characters synthesized.`)
console.log(`Output: ${path.relative(ROOT, OUT_DIR)}/`)
