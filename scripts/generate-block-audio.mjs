#!/usr/bin/env node
// scripts/generate-block-audio.mjs
//
// Generates one stitched narration mp3 (plus a segment-timing JSON) for a single
// simulation block, using the ElevenLabs text-to-speech API and ffmpeg.
//
// Usage:  node scripts/generate-block-audio.mjs <block-id>
//   e.g.  node scripts/generate-block-audio.mjs management-consultant-meridian-dil-d1-b1
//
// Voice casting (recast by Collin after auditions, Aug 2026):
//   - before / setting-the-scene text ........... Jay Wayne
//   - unlabeled connective prose in the scene .... Jay Wayne
//   - Carly's lines + over-the-shoulder commentary Claire
//   - Marcus's lines ............................. Cooper
//   - David's lines .............................. Conrad
//   - Ellen's lines .............................. Eryn (no lines in block 1;
//     kept in the map for future blocks)
//
// Bracketed stage directions like [Phone rings] are not spoken; each becomes
// ~2/3 second of silence. Artifacts are never narrated. Output goes to
// audio-samples/ in the repo root (gitignored).

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = path.join(ROOT, 'lib', 'content')
const OUT_DIR = path.join(ROOT, 'audio-samples')

const MODEL_ID = 'eleven_multilingual_v2'
const OUTPUT_FORMAT = 'mp3_44100_128'
const PAUSE_SECONDS = 0.67
// Extra air inserted wherever the speaker changes between two directly-adjacent
// speech segments (conversational feel). Stage-direction pauses keep their own
// length and get no extra gap around them.
const GAP_SECONDS = 0.5

// Full ElevenLabs voice names + ids, matched from My Voices by name prefix.
const VOICES = {
  JayWayne: { fullName: 'Jay Wayne - Wise University Professor', id: '8Ln42OXYupYsag45MAUy' },
  Claire:   { fullName: 'Claire - Ultra Real & Natural',         id: '7A85ufQZSEaTbZ5eQ4f4' },
  Cooper:   { fullName: 'Cooper - Young American Male',          id: 'BcJMy2AClTYRAgDaPpgz' },
  Conrad:   { fullName: 'Conrad Palmer',                         id: 'LkreQVAyh7la0Gj42eBn' },
  Eryn:     { fullName: 'Eryn - Genuine, Friendly and Natural',  id: 'kdnRe2koJdOK4Ovxn2DI' },
}

// Speaker label in the prose -> cast voice.
const SPEAKER_TO_VOICE = {
  Carly:  'Claire',
  Marcus: 'Cooper',
  David:  'Conrad',
  Ellen:  'Eryn',
}

const NARRATOR_VOICE = 'JayWayne' // before-text + unlabeled connective prose
const COMMENTARY_VOICE = 'Claire' // entire over-the-shoulder commentary

function fail(msg) {
  console.error(`STOP: ${msg}`)
  process.exit(1)
}

// ---------- API key (from .env.local; value is never printed) ----------
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

// ---------- Content extraction ----------
// Blocks live in lib/content/*.ts as  '<block-id>': { before: `...`, ... }.
// We parse the file text directly (plain Node can't import TypeScript).
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

// Extract a `field: `...`` template-literal value from the block's slice of the file.
function extractField(slice, field) {
  const m = slice.match(new RegExp(`(?:^|\\n)\\s*${field}:\\s*\``))
  if (!m) return null
  let i = m.index + m[0].length
  let out = ''
  while (i < slice.length) {
    const ch = slice[i]
    if (ch === '\\') { out += slice[i + 1]; i += 2; continue } // unescape \` \$ \\
    if (ch === '`') return out
    out += ch
    i += 1
  }
  fail(`Unterminated template literal for field "${field}".`)
}

function extractBlockContent(src, blockId) {
  const startKey = `'${blockId}':`
  const start = src.indexOf(startKey)
  // The block ends where the next top-level block id starts (or at end of file).
  const nextBlock = src.slice(start + startKey.length).search(/\n  '[a-z0-9-]+':\s*\{/)
  const slice = nextBlock === -1
    ? src.slice(start)
    : src.slice(start, start + startKey.length + nextBlock)
  return {
    before: extractField(slice, 'before'),
    simulatedWork: extractField(slice, 'simulatedWork'),
    commentary: extractField(slice, 'commentary'),
    after: extractField(slice, 'after'),
    // Markdown work-product artifact (no inline marker; renders at block end).
    artifactMarkdown: extractField(slice, 'artifact'),
  }
}

// ---------- Segmentation ----------
// Returns ordered tokens:
//   { type: 'speech', voice, text } | { type: 'pause' } | { type: 'artifact', n }
// Artifacts are never narrated. An {{artifact:N}} marker contributes no audio,
// but its position between segments is recorded so the player can scroll the
// artifact into view when playback reaches that moment.
// "Looks like a speaker label": 1-3 capitalized words then a colon. Broad on
// purpose — an unknown name must STOP the run, not get silently narrated.
const LABEL_RE = /^([A-Z][A-Za-z.'-]{1,20}(?: [A-Z][A-Za-z.'-]{1,20}){0,2}):\s+/

function pushText(tokens, voice, text) {
  // Bracketed stage directions become pauses; {{artifact:N}} markers become
  // zero-length artifact events; surrounding text keeps the voice.
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

  if (after) fail(`Block "${blockId}" has non-empty "after" text, which the voice map does not cover. Report to Collin before generating.`)
  if (!before && !scene && !commentary) fail(`Block "${blockId}" has no narratable prose.`)

  const tokens = []
  if (before) pushText(tokens, NARRATOR_VOICE, before)

  // Scene: paragraph by paragraph. Labeled -> that speaker; unlabeled -> Adam.
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
  if (unknown.size > 0) fail(`Unknown speaker name(s) in block "${blockId}": ${[...unknown].join(', ')}. Not in the voice map — no audio was generated.`)

  if (commentary) pushText(tokens, COMMENTARY_VOICE, commentary)

  // Merge consecutive speech tokens with the same voice into one segment.
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

// ---------- Audio generation ----------
async function ttsToFile(apiKey, voiceId, text, outFile) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${OUTPUT_FORMAT}`,
    {
      method: 'POST',
      headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model_id: MODEL_ID }),
    }
  )
  if (!res.ok) {
    const body = await res.text()
    fail(`ElevenLabs TTS failed (HTTP ${res.status}): ${body}`)
  }
  writeFileSync(outFile, Buffer.from(await res.arrayBuffer()))
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

// ---------- Main ----------
// --stitch-only re-stitches from the segment WAVs of a previous run without
// calling ElevenLabs (fails if any segment file is missing).
const cliArgs = process.argv.slice(2)
const stitchOnly = cliArgs.includes('--stitch-only')
const blockId = cliArgs.find((a) => !a.startsWith('--'))
if (!blockId) fail('Usage: node scripts/generate-block-audio.mjs <block-id> [--stitch-only]')

const apiKey = stitchOnly ? null : readApiKey()
const { file, src } = findBlock(blockId)
const content = extractBlockContent(src, blockId)
const segments = segment(content, blockId)

const workDir = path.join(OUT_DIR, '.work', blockId)
mkdirSync(workDir, { recursive: true })

const speechCount = segments.filter((s) => s.type === 'speech').length
const pauseCount = segments.filter((s) => s.type === 'pause').length
const artifactCount = segments.filter((s) => s.type === 'artifact').length
const charCount = segments.reduce((n, s) => n + (s.text?.length || 0), 0)
console.log(`Block: ${blockId} (from lib/content/${file})`)
console.log(`Segments: ${speechCount} speech + ${pauseCount} pause(s) + ${artifactCount} artifact marker(s), ${charCount} characters${stitchOnly ? ' (re-stitch only, no TTS calls)' : ' to synthesize'}.`)

// Generate each piece as a 44.1kHz mono WAV so stitching is exact. Artifact
// markers contribute no audio, so speech/pause wav numbering is unaffected by
// whether a block has markers.
const wavFiles = []
let wavIndex = 0
for (const seg of segments) {
  if (seg.type === 'artifact') { wavFiles.push(null); continue }
  const wav = path.join(workDir, `seg-${String(wavIndex).padStart(3, '0')}.wav`)
  wavIndex += 1
  if (seg.type === 'pause') {
    ffmpeg(['-f', 'lavfi', '-i', `anullsrc=r=44100:cl=mono`, '-t', String(PAUSE_SECONDS), wav])
  } else if (stitchOnly) {
    if (!existsSync(wav)) fail(`--stitch-only: segment file missing (${path.relative(ROOT, wav)}). The block needs one full regeneration first.`)
  } else {
    const mp3 = wav.replace(/\.wav$/, '.mp3')
    process.stdout.write(`  [${wavIndex}/${speechCount + pauseCount}] ${seg.voice}: "${seg.text.split(/\s+/).slice(0, 8).join(' ')}..."\n`)
    await ttsToFile(apiKey, VOICES[seg.voice].id, seg.text, mp3)
    ffmpeg(['-i', mp3, '-ar', '44100', '-ac', '1', wav])
  }
  wavFiles.push(wav)
}

// Build the stitch sequence: every segment in order, with a speaker-change gap
// wherever two speech segments with different voices directly adjoin (artifact
// markers are invisible to gap logic — they make no sound).
const gapWav = path.join(workDir, 'gap.wav')
ffmpeg(['-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(GAP_SECONDS), gapWav])

const stitched = []
let prevAudible = null
for (let i = 0; i < segments.length; i++) {
  const seg = segments[i]
  if (seg.type === 'artifact') {
    stitched.push({ file: null, type: 'artifact', seg })
    continue
  }
  if (seg.type === 'speech' && prevAudible?.type === 'speech' && prevAudible.voice !== seg.voice) {
    stitched.push({ file: gapWav, type: 'gap', seg: null })
  }
  stitched.push({ file: wavFiles[i], type: seg.type, seg })
  prevAudible = seg
}

// Stitch: record the elapsed timestamp at each boundary, then concat -> mp3.
// Artifact markers land in their own `artifacts` array with the elapsed time
// at which they fall between segments (the player's auto-scroll cues).
let elapsed = 0
const meta = []
const artifacts = []
for (const item of stitched) {
  if (item.type === 'artifact') {
    artifacts.push({
      artifact: item.seg.n,
      startSeconds: Math.round(elapsed * 100) / 100,
      startTime: fmtTime(elapsed),
    })
    continue
  }
  const dur = probeDuration(item.file)
  meta.push({
    index: meta.length,
    type: item.type,
    voice: item.type === 'speech' ? `${item.seg.voice} (${VOICES[item.seg.voice].fullName})` : null,
    firstWords: item.type === 'speech' ? item.seg.text.split(/\s+/).slice(0, 8).join(' ')
              : item.type === 'gap' ? '[speaker gap]' : '[pause]',
    startSeconds: Math.round(elapsed * 100) / 100,
    startTime: fmtTime(elapsed),
    durationSeconds: Math.round(dur * 100) / 100,
  })
  elapsed += dur
}
// A markdown work-product artifact has no inline marker and renders at the end
// of the block, so its cue is the end of the audio.
if (content.artifactMarkdown?.trim()) {
  artifacts.push({
    artifact: 'work-product',
    startSeconds: Math.round(elapsed * 100) / 100,
    startTime: fmtTime(elapsed),
  })
}

const listFile = path.join(workDir, 'concat.txt')
writeFileSync(listFile, stitched.filter((it) => it.file).map((it) => `file '${it.file}'`).join('\n') + '\n')
const outMp3 = path.join(OUT_DIR, `${blockId}.mp3`)
ffmpeg(['-f', 'concat', '-safe', '0', '-i', listFile, '-c:a', 'libmp3lame', '-b:a', '128k', '-ar', '44100', outMp3])

const outJson = path.join(OUT_DIR, `${blockId}.json`)
writeFileSync(outJson, JSON.stringify({
  blockId,
  contentFile: `lib/content/${file}`,
  model: MODEL_ID,
  generatedAt: new Date().toISOString(),
  totalSeconds: Math.round(elapsed * 100) / 100,
  totalTime: fmtTime(elapsed),
  charactersSynthesized: charCount,
  artifacts,
  segments: meta,
}, null, 2) + '\n')

console.log(`\nDone. Total duration ${fmtTime(elapsed)} (${elapsed.toFixed(1)}s).`)
console.log(`Audio:    ${path.relative(ROOT, outMp3)}`)
console.log(`Metadata: ${path.relative(ROOT, outJson)}`)
