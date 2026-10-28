#!/usr/bin/env node
// scripts/compare-models.mjs
//
// One-off model comparison. Renders the opening stretch of a block on a second
// ElevenLabs model (default Eleven v3) with the SAME voices, text and stitching
// as generate-block-audio.mjs, and cuts the matching span out of the block's
// existing production (Multilingual v2) mp3, so the two can be heard back to back.
//
// Usage:
//   node scripts/compare-models.mjs <block-id> --through <n> [--model eleven_v3]
//        [--name block1-excerpt] [--max-chars 4000] [--dry-run]
//
//   --through n   last segment to include, counting speech + pause segments from
//                 0 (the same numbering as the seg-NNN files and the non-gap
//                 entries of the block's existing timing JSON)
//   --dry-run     print the excerpt plan and character count; no API calls
//
// Safety: reads the production mp3 + timing JSON but never writes to them, and
// never touches audio-samples/.work/ (the v2 segment cache). Everything this
// script writes goes under audio-samples/v3-test/ (gitignored). Nothing is
// uploaded anywhere.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = path.join(ROOT, 'lib', 'content')
const SAMPLES_DIR = path.join(ROOT, 'audio-samples')
const OUT_DIR = path.join(SAMPLES_DIR, 'v3-test')

const PROD_MODEL = 'eleven_multilingual_v2'
const OUTPUT_FORMAT = 'mp3_44100_128'
const PAUSE_SECONDS = 0.67
const GAP_SECONDS = 0.5

// ---------- Copied from generate-block-audio.mjs ----------
// Voices, cast, extraction and segmentation are kept identical to the
// production script. Before any API call the excerpt is checked segment by
// segment against the block's existing timing JSON, so any drift stops the run.

const VOICES = {
  JayWayne: { fullName: 'Jay Wayne - Wise University Professor', id: '8Ln42OXYupYsag45MAUy' },
  Claire:   { fullName: 'Claire - Ultra Real & Natural',         id: '7A85ufQZSEaTbZ5eQ4f4' },
  Cooper:   { fullName: 'Cooper - Young American Male',          id: 'BcJMy2AClTYRAgDaPpgz' },
  Conrad:   { fullName: 'Conrad Palmer',                         id: 'LkreQVAyh7la0Gj42eBn' },
  Eryn:     { fullName: 'Eryn - Genuine, Friendly and Natural',  id: 'kdnRe2koJdOK4Ovxn2DI' },
  Dan:      { fullName: 'Dan - Energetic, Emotional and Excited', id: 'PGqDc9SLzJTxDTy8SjYb' },
  Tori:     { fullName: 'Tori',                                  id: 'lAxf5ma5HGtzxC434SWT' },
}

const SPEAKER_TO_VOICE = {
  Carly:   'Claire',
  Marcus:  'Cooper',
  David:   'Conrad',
  Ellen:   'Eryn',
  Gregory: 'Dan',
  Diane:   'Tori',
}

const NARRATOR_VOICE = 'JayWayne'
const COMMENTARY_VOICE = 'Claire'

function fail(msg) {
  console.error(`STOP: ${msg}`)
  process.exit(1)
}

function readApiKey() {
  const envPath = path.join(ROOT, '.env.local')
  let raw
  try { raw = readFileSync(envPath, 'utf8') } catch { fail('.env.local not found in repo root.') }
  const line = raw.split('\n').find((l) => l.startsWith('ELEVENLABS_API_KEY='))
  if (!line) fail('.env.local has no ELEVENLABS_API_KEY= line.')
  const key = line.slice('ELEVENLABS_API_KEY='.length).trim()
  if (!key) fail('ELEVENLABS_API_KEY= line is empty.')
  return key
}

function findBlock(blockId) {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.ts'))
  const hits = []
  for (const f of files) {
    const src = readFileSync(path.join(CONTENT_DIR, f), 'utf8')
    if (src.includes(`'${blockId}':`)) hits.push({ file: f, src })
  }
  if (hits.length === 0) fail(`Block id "${blockId}" not found in any file under lib/content/.`)
  if (hits.length > 1) fail(`Block id "${blockId}" found in multiple files: ${hits.map((h) => h.file).join(', ')}.`)
  return hits[0]
}

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

function extractBlockContent(src, blockId) {
  const startKey = `'${blockId}':`
  const start = src.indexOf(startKey)
  const nextBlock = src.slice(start + startKey.length).search(/\n  '[a-z0-9-]+':\s*\{/)
  const slice = nextBlock === -1
    ? src.slice(start)
    : src.slice(start, start + startKey.length + nextBlock)
  return {
    before: extractField(slice, 'before'),
    simulatedWork: extractField(slice, 'simulatedWork'),
    commentary: extractField(slice, 'commentary'),
    after: extractField(slice, 'after'),
  }
}

const LABEL_RE = /^([A-Z][A-Za-z.'-]{1,20}(?: [A-Z][A-Za-z.'-]{1,20}){0,2}):\s+/

function pushText(tokens, voice, text) {
  const re = /\{\{artifact:(\d+)\}\}|\[[^\]]*\]/g
  let last = 0
  let m
  while ((m = re.exec(text)) !== null) {
    const t = text.slice(last, m.index).trim()
    if (t) tokens.push({ type: 'speech', voice, text: t })
    if (m[1] !== undefined) tokens.push({ type: 'artifact', n: Number(m[1]) })
    else tokens.push({ type: 'pause' })
    last = re.lastIndex
  }
  const tail = text.slice(last).trim()
  if (tail) tokens.push({ type: 'speech', voice, text: tail })
}

function segment(content, blockId) {
  const clean = (s) => (s || '').trim()
  const before = clean(content.before)
  const scene = clean(content.simulatedWork)
  const commentary = clean(content.commentary)
  const after = clean(content.after)

  if (after) fail(`Block "${blockId}" has non-empty "after" text, which the voice map does not cover.`)
  if (!before && !scene && !commentary) fail(`Block "${blockId}" has no narratable prose.`)

  const tokens = []
  if (before) pushText(tokens, NARRATOR_VOICE, before)

  const unknown = new Set()
  for (const para of scene.split(/\n\s*\n/)) {
    const p = para.trim()
    if (!p) continue
    const label = p.match(LABEL_RE)
    if (label) {
      const speaker = label[1]
      const voice = SPEAKER_TO_VOICE[speaker]
      if (!voice) { unknown.add(speaker); continue }
      pushText(tokens, voice, p.slice(label[0].length))
    } else {
      pushText(tokens, NARRATOR_VOICE, p)
    }
  }
  if (unknown.size > 0) fail(`Unknown speaker name(s) in block "${blockId}": ${[...unknown].join(', ')}.`)

  if (commentary) pushText(tokens, COMMENTARY_VOICE, commentary)

  const merged = []
  for (const tok of tokens) {
    const prev = merged[merged.length - 1]
    if (tok.type === 'speech' && prev?.type === 'speech' && prev.voice === tok.voice) {
      prev.text += '\n\n' + tok.text
    } else {
      merged.push({ ...tok })
    }
  }
  return merged
}

function ffmpeg(args) {
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['ignore', 'inherit', 'inherit'] })
}

function probeDuration(file) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file])
  return parseFloat(out.toString().trim())
}

function fmtTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = (seconds % 60).toFixed(1).padStart(4, '0')
  return `${m}:${s}`
}

// ---------- Comparison-only helpers ----------

// Every write goes through this, so nothing can land outside audio-samples/v3-test/.
function outPath(...parts) {
  const p = path.join(OUT_DIR, ...parts)
  if (!p.startsWith(OUT_DIR + path.sep)) fail(`Refusing to write outside ${path.relative(ROOT, OUT_DIR)}: ${p}`)
  return p
}

const firstWords = (text) => text.split(/\s+/).slice(0, 8).join(' ')

// Returns the response's billed character count (x-character-count header).
async function ttsToFile(apiKey, model, voiceId, text, outFile) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${OUTPUT_FORMAT}`,
    {
      method: 'POST',
      headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model_id: model }),
    }
  )
  if (!res.ok) {
    const body = await res.text()
    fail(`ElevenLabs TTS failed on model "${model}" (HTTP ${res.status}): ${body}`)
  }
  writeFileSync(outFile, Buffer.from(await res.arrayBuffer()))
  const billed = res.headers.get('x-character-count')
  return billed === null ? null : Number(billed)
}

// Characters used this billing period, or null if the key can't read it.
async function usedCredits(apiKey) {
  const res = await fetch('https://api.elevenlabs.io/v1/user/subscription', { headers: { 'xi-api-key': apiKey } })
  if (!res.ok) return null
  const body = await res.json()
  return typeof body.character_count === 'number' ? body.character_count : null
}

// ---------- Main ----------
const cliArgs = process.argv.slice(2)
const flag = (name) => {
  const i = cliArgs.indexOf(name)
  return i === -1 ? undefined : cliArgs[i + 1]
}
const VALUE_FLAGS = ['--through', '--model', '--name', '--max-chars']
const blockId = cliArgs.find((a, i) => !a.startsWith('--') && !VALUE_FLAGS.includes(cliArgs[i - 1]))
const throughArg = flag('--through')
const model = flag('--model') || 'eleven_v3'
const name = flag('--name') || `${blockId}-excerpt`
const maxChars = Number(flag('--max-chars') || 4000)
const dryRun = cliArgs.includes('--dry-run')
if (!blockId || throughArg === undefined) fail('Usage: node scripts/compare-models.mjs <block-id> --through <n> [--model eleven_v3] [--name x] [--max-chars 4000] [--dry-run]')
const through = Number(throughArg)
if (model === PROD_MODEL) fail(`--model is the production model (${PROD_MODEL}); the v2 side is cut from the existing mp3, never regenerated.`)
const modelTag = model.replace(/^eleven_/, '')

const { file, src } = findBlock(blockId)
const all = segment(extractBlockContent(src, blockId), blockId)
const audible = all.filter((s) => s.type !== 'artifact')
if (!Number.isInteger(through) || through < 0 || through >= audible.length) fail(`--through must be 0..${audible.length - 1}.`)
const excerpt = audible.slice(0, through + 1)

// The v2 side: the existing production mp3 + its timing JSON (read only).
const prodMp3 = path.join(SAMPLES_DIR, `${blockId}.mp3`)
const prodJson = path.join(SAMPLES_DIR, `${blockId}.json`)
if (!existsSync(prodMp3) || !existsSync(prodJson)) fail(`No existing production audio for ${blockId} in audio-samples/.`)
const prod = JSON.parse(readFileSync(prodJson, 'utf8'))
if (prod.model !== PROD_MODEL) fail(`Existing audio was made with "${prod.model}", expected ${PROD_MODEL}.`)

// Text must be exactly what the v2 mp3 was made from: same total characters
// for the whole block, and the same type / voice / first words per segment.
const blockChars = all.reduce((n, s) => n + (s.text?.length || 0), 0)
if (blockChars !== prod.charactersSynthesized) fail(`Block text changed since the v2 audio was made (${blockChars} chars now vs ${prod.charactersSynthesized}).`)
const prodAudible = prod.segments.filter((s) => s.type !== 'gap')
excerpt.forEach((seg, i) => {
  const p = prodAudible[i]
  const same = p && p.type === seg.type &&
    (seg.type === 'pause' || (p.firstWords === firstWords(seg.text) && p.voice.startsWith(`${seg.voice} (`)))
  if (!same) fail(`Segment ${i} does not match the existing v2 timing JSON.`)
})
const v2End = prodAudible[through].startSeconds + prodAudible[through].durationSeconds

const excerptChars = excerpt.reduce((n, s) => n + (s.text?.length || 0), 0)
const speeches = excerpt.filter((s) => s.type === 'speech')
console.log(`Block:   ${blockId} (from lib/content/${file})`)
console.log(`Excerpt: segments 0-${through} = ${speeches.length} speech + ${excerpt.length - speeches.length} pause, ${excerptChars} characters`)
excerpt.forEach((s, i) => console.log(`  [${String(i).padStart(2)}] ${s.type === 'pause' ? '[pause]' : `${s.voice.padEnd(8)} ${String(s.text.length).padStart(4)}  "${firstWords(s.text)}..."`}`))
console.log(`v2 cut:  0:00.0 to ${fmtTime(v2End)} (${v2End.toFixed(2)}s) of ${path.relative(ROOT, prodMp3)}`)
if (excerptChars > maxChars) fail(`Excerpt is ${excerptChars} characters, over the ${maxChars} ceiling. Nothing was generated.`)
if (dryRun) { console.log('\nDry run: no API calls made.'); process.exit(0) }

const segDir = outPath('segments', model, blockId)
mkdirSync(segDir, { recursive: true })
const segWav = (i) => path.join(segDir, `seg-${String(i).padStart(3, '0')}.wav`)

const apiKey = readApiKey()
const creditsBefore = await usedCredits(apiKey)

// A finished segment mp3 is reused on a rerun instead of being paid for twice.
let sent = 0
let billed = null // stays null if ElevenLabs never reports x-character-count
async function render(i) {
  const seg = excerpt[i]
  const mp3 = segWav(i).replace(/\.wav$/, '.mp3')
  if (existsSync(mp3)) {
    console.log(`  [${i}] ${seg.voice}: cached, not re-sent`)
  } else {
    const n = await ttsToFile(apiKey, model, VOICES[seg.voice].id, seg.text, mp3)
    sent += seg.text.length
    if (n !== null) billed = (billed ?? 0) + n
    console.log(`  [${i}] ${seg.voice}: sent ${seg.text.length} chars, billed ${n ?? '?'}`)
  }
  ffmpeg(['-i', mp3, '-ar', '44100', '-ac', '1', segWav(i)])
}

// Model check first: one short real segment. Any rejection stops the run here.
const testIndex = excerpt.reduce((best, s, i) =>
  s.type === 'speech' && (best === -1 || s.text.length < excerpt[best].text.length) ? i : best, -1)
console.log(`\nModel check: segment ${testIndex} on "${model}"...`)
await render(testIndex)
console.log(`Model check passed: "${model}" accepted.\n`)

for (let i = 0; i < excerpt.length; i++) {
  if (i === testIndex) continue
  if (excerpt[i].type === 'pause') {
    ffmpeg(['-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(PAUSE_SECONDS), segWav(i)])
  } else {
    await render(i)
  }
}

// Stitch exactly like production: a gap wherever two speech segments with
// different voices directly adjoin; stage-direction pauses get no extra gap.
const gapWav = path.join(segDir, 'gap.wav')
ffmpeg(['-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(GAP_SECONDS), gapWav])
const stitched = []
let prev = null
excerpt.forEach((seg, i) => {
  if (seg.type === 'speech' && prev?.type === 'speech' && prev.voice !== seg.voice) stitched.push({ file: gapWav, type: 'gap', seg: null })
  stitched.push({ file: segWav(i), type: seg.type, seg })
  prev = seg
})

let elapsed = 0
const meta = stitched.map((item, index) => {
  const dur = probeDuration(item.file)
  const row = {
    index,
    type: item.type,
    voice: item.type === 'speech' ? `${item.seg.voice} (${VOICES[item.seg.voice].fullName})` : null,
    firstWords: item.type === 'speech' ? firstWords(item.seg.text) : item.type === 'gap' ? '[speaker gap]' : '[pause]',
    startSeconds: Math.round(elapsed * 100) / 100,
    startTime: fmtTime(elapsed),
    durationSeconds: Math.round(dur * 100) / 100,
  }
  elapsed += dur
  return row
})

const listFile = path.join(segDir, 'concat.txt')
writeFileSync(listFile, stitched.map((it) => `file '${it.file}'`).join('\n') + '\n')
const outV3 = outPath(`${name}--${modelTag}.mp3`)
ffmpeg(['-f', 'concat', '-safe', '0', '-i', listFile, '-c:a', 'libmp3lame', '-b:a', '128k', '-ar', '44100', outV3])
writeFileSync(outPath(`${name}--${modelTag}.json`), JSON.stringify({
  blockId, model, generatedAt: new Date().toISOString(),
  totalSeconds: Math.round(elapsed * 100) / 100, totalTime: fmtTime(elapsed),
  charactersSent: sent, segments: meta,
}, null, 2) + '\n')

// The v2 side is a stream copy (no re-encode) of the production mp3's opening span.
const outV2 = outPath(`${name}--v2-multilingual.mp3`)
ffmpeg(['-i', prodMp3, '-t', v2End.toFixed(2), '-c', 'copy', outV2])

const creditsAfter = await usedCredits(apiKey)
console.log(`Characters sent this run: ${sent} (billed per x-character-count: ${billed ?? 'not reported'})`)
if (creditsBefore !== null && creditsAfter !== null) console.log(`Account credits used this run: ${creditsAfter - creditsBefore}`)
else console.log('Account credit counter not readable with this key.')
console.log(`\n${path.relative(ROOT, outV2)}  ${fmtTime(probeDuration(outV2))}`)
console.log(`${path.relative(ROOT, outV3)}  ${fmtTime(probeDuration(outV3))}`)
