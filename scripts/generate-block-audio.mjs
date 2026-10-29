#!/usr/bin/env node
// scripts/generate-block-audio.mjs
//
// Generates one stitched narration mp3 (plus a segment-timing JSON) for a single
// simulation block, using the ElevenLabs text-to-speech API and ffmpeg.
//
// Usage:  node scripts/generate-block-audio.mjs <block-id> [--model <id>] [--stitch-only]
//   e.g.  node scripts/generate-block-audio.mjs management-consultant-meridian-dil-d1-b1
//
// Model: Eleven v4 (eleven_v4) is the default for all new audio (chosen by
// Collin, Oct 28 2026; it replaced Eleven v3, which made the first IB Day in
// the Life audio). Pass --model <id> to generate on a different model. All
// Meridian audio was made on eleven_multilingual_v2.
//
// Voice casting (recast by Collin after auditions, Aug 2026):
//   - before / setting-the-scene text ........... Jay Wayne
//   - unlabeled connective prose in the scene .... Jay Wayne
//   - Carly's lines + over-the-shoulder commentary Claire
//   - Marcus's lines ............................. Cooper
//   - David's lines .............................. Conrad
//   - Ellen's lines .............................. Eryn (no lines in block 1;
//     kept in the map for future blocks)
//   - Gregory's lines (Full Sim guest) ........... Dan   (cast Sep 2026, round 2)
//   - Diane's lines (Full Sim guest) ............. Tori  (cast Sep 2026, round 2)
//   - Raymond's lines (Full Sim guest) ........... Gerard (cast Oct 2026, round 3)
//   - Laura's lines (Full Sim guest) ............. Carol  (cast Oct 2026, round 3)
//
// Investment Banking (Kestrel) cast, approved by Collin Oct 2026, reusing the
// consulting voices above:
//   - before / setting-the-scene text + unlabeled prose ... Jay Wayne
//   - Sabrina's lines + over-the-shoulder commentary ...... Claire (the IB
//     commentary is Sabrina's own first-person view, same rule as Carly)
//   - Warren's lines ...................................... Conrad
//   - Priya's lines ....................................... Eryn
//   - Danny's lines ....................................... Cooper
//   - Rick's lines (Full Sim client session) .............. Dan (the same voice
//     as Gregory in Meridian; they never share a scene)
//   - Marisol's lines (Full Sim client session) ........... Elise
//   (Rick and Marisol cast by Collin from audition round 3, Oct 2026.)
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

const DEFAULT_MODEL = 'eleven_v4'
// Label for segment folders made before the model was recorded alongside them
// (every one of those was generated on Multilingual v2).
const LEGACY_MODEL = 'eleven_multilingual_v2'
const OUTPUT_FORMAT = 'mp3_44100_128'
const PAUSE_SECONDS = 0.67
// Extra air inserted wherever the speaker changes between two directly-adjacent
// speech segments (conversational feel). Stage-direction pauses keep their own
// length and get no extra gap around them.
const GAP_SECONDS = 0.5
// Per-request character limits from ElevenLabs' model docs. A segment longer
// than its model's limit is generated in pieces (see splitForRequest).
const REQUEST_LIMITS = { eleven_v3: 5000 }
const DEFAULT_REQUEST_LIMIT = 10000 // eleven_v4, eleven_multilingual_v2

// Full ElevenLabs voice names + ids, matched from My Voices by name prefix.
const VOICES = {
  JayWayne: { fullName: 'Jay Wayne - Wise University Professor', id: '8Ln42OXYupYsag45MAUy' },
  Claire:   { fullName: 'Claire - Ultra Real & Natural',         id: '7A85ufQZSEaTbZ5eQ4f4' },
  Cooper:   { fullName: 'Cooper - Young American Male',          id: 'BcJMy2AClTYRAgDaPpgz' },
  Conrad:   { fullName: 'Conrad Palmer',                         id: 'LkreQVAyh7la0Gj42eBn' },
  Eryn:     { fullName: 'Eryn - Genuine, Friendly and Natural',  id: 'kdnRe2koJdOK4Ovxn2DI' },
  Dan:      { fullName: 'Dan - Energetic, Emotional and Excited', id: 'PGqDc9SLzJTxDTy8SjYb' },
  Tori:     { fullName: 'Tori',                                  id: 'lAxf5ma5HGtzxC434SWT' },
  Carol:    { fullName: 'Carol - Relatable, Real, Likeable Grandma', id: '5u41aNhyCU6hXOcjPPv0' },
  Elise:    { fullName: 'Elise Hart - Warm, Clear & Engaging',   id: '8fwYhwfiWkLjR4FKLHSQ' },
  Gerard:   { fullName: 'Gerard',                                id: 'yJYX0af9YgTf8sOP8vbP' },
}

// Speaker label in the prose -> cast voice. Every speaker in both simulations
// is cast (Oct 2026); an unknown label still stops the run rather than guess.
const SPEAKER_TO_VOICE = {
  Carly:   'Claire',
  Marcus:  'Cooper',
  David:   'Conrad',
  Ellen:   'Eryn',
  Gregory: 'Dan',
  Diane:   'Tori',
  // Investment Banking (Kestrel)
  Sabrina: 'Claire',
  Warren:  'Conrad',
  Priya:   'Eryn',
  Danny:   'Cooper',
  // Round 3 casting (Oct 2026)
  Laura:   'Carol',
  Raymond: 'Gerard',
  Marisol: 'Elise',
  Rick:    'Dan',
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

// Stray markdown left over from the content-planning workflow, never spoken:
//   - a horizontal-rule divider line made only of dashes ("---")
//   - a planning-note blockquote that opens "> Connector (not entered)"
// Deliberately narrow: other blockquotes are real content and stay. Text with
// no stray lines is returned untouched, byte for byte.
const DIVIDER_RE = /^[ \t]*-{3,}[ \t]*$/
const BLOCKQUOTE_RE = /^[ \t]*>/
const PLANNING_NOTE_RE = /^[ \t]*>[ \t]*Connector \(not entered\)/

function stripStrayMarkdown(text) {
  const lines = text.split('\n')
  const kept = []
  let inPlanningNote = false
  for (const line of lines) {
    if (DIVIDER_RE.test(line)) continue
    if (PLANNING_NOTE_RE.test(line) || (inPlanningNote && BLOCKQUOTE_RE.test(line))) {
      inPlanningNote = true
      continue
    }
    inPlanningNote = false
    kept.push(line)
  }
  if (kept.length === lines.length) return text
  // Removed lines leave runs of blank lines behind; fold them to one break.
  return kept.join('\n').replace(/\n[ \t]*(?:\n[ \t]*){2,}/g, '\n\n')
}

function segment(content, blockId) {
  const clean = (s) => stripStrayMarkdown(s || '').trim()
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
async function ttsToFile(apiKey, modelId, voiceId, text, outFile) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${OUTPUT_FORMAT}`,
    {
      method: 'POST',
      headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model_id: modelId }),
    }
  )
  if (!res.ok) {
    const body = await res.text()
    fail(`ElevenLabs TTS failed (HTTP ${res.status}): ${body}`)
  }
  writeFileSync(outFile, Buffer.from(await res.arrayBuffer()))
}

// Split text that is over the model's per-request limit into roughly equal
// pieces at paragraph breaks (sentence breaks if a paragraph alone is too
// long). Text within the limit comes back as a single piece, untouched.
function splitForRequest(text, limit) {
  if (text.length <= limit) return [text]
  const units = []
  for (const para of text.split(/\n\s*\n/)) {
    if (para.length <= limit) units.push(para)
    else units.push(...para.split(/(?<=[.?!])\s+/))
  }
  const target = text.length / Math.ceil(text.length / limit)
  const pieces = []
  let current = ''
  for (const unit of units) {
    const joined = current ? `${current}\n\n${unit}` : unit
    if (current && (current.length >= target || joined.length > limit)) {
      pieces.push(current)
      current = unit
    } else {
      current = joined
    }
  }
  if (current) pieces.push(current)
  return pieces
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
// --model <id> generates on a model other than the default (eleven_v4).
const cliArgs = process.argv.slice(2)
const stitchOnly = cliArgs.includes('--stitch-only')
const modelFlag = cliArgs.indexOf('--model')
const modelArg = modelFlag === -1 ? null : cliArgs[modelFlag + 1]
if (modelFlag !== -1 && (!modelArg || modelArg.startsWith('--'))) fail('--model needs a model id, e.g. --model eleven_multilingual_v2')
if (modelArg && stitchOnly) fail('--model cannot be combined with --stitch-only: re-stitching reuses the existing segments and never calls ElevenLabs.')
const blockId = cliArgs.find((a, i) => !a.startsWith('--') && (modelFlag === -1 || i !== modelFlag + 1))
if (!blockId) fail('Usage: node scripts/generate-block-audio.mjs <block-id> [--model <id>] [--stitch-only]')

const apiKey = stitchOnly ? null : readApiKey()
const { file, src } = findBlock(blockId)
const content = extractBlockContent(src, blockId)
const segments = segment(content, blockId)

const workDir = path.join(OUT_DIR, '.work', blockId)
mkdirSync(workDir, { recursive: true })

// Which model made this block's segments. A generation run records it in the
// segment folder; a re-stitch reads it back (falling back to the block's
// previous metadata, then to Multilingual v2 for folders from before v3).
const modelFile = path.join(workDir, 'model.txt')
let MODEL_ID
if (stitchOnly) {
  const prevJson = path.join(OUT_DIR, `${blockId}.json`)
  MODEL_ID = existsSync(modelFile) ? readFileSync(modelFile, 'utf8').trim()
    : existsSync(prevJson) ? (JSON.parse(readFileSync(prevJson, 'utf8')).model || LEGACY_MODEL)
    : LEGACY_MODEL
} else {
  MODEL_ID = modelArg || DEFAULT_MODEL
  writeFileSync(modelFile, MODEL_ID + '\n')
}

const speechCount = segments.filter((s) => s.type === 'speech').length
const pauseCount = segments.filter((s) => s.type === 'pause').length
const artifactCount = segments.filter((s) => s.type === 'artifact').length
const charCount = segments.reduce((n, s) => n + (s.text?.length || 0), 0)
console.log(`Block: ${blockId} (from lib/content/${file}), model ${MODEL_ID}`)
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
    const pieces = splitForRequest(seg.text, REQUEST_LIMITS[MODEL_ID] ?? DEFAULT_REQUEST_LIMIT)
    if (pieces.length === 1) {
      await ttsToFile(apiKey, MODEL_ID, VOICES[seg.voice].id, seg.text, mp3)
      ffmpeg(['-i', mp3, '-ar', '44100', '-ac', '1', wav])
    } else {
      // Over the per-request limit: generate each piece, then join them
      // seamlessly (same voice, no gap) into this one segment's WAV.
      const partWavs = []
      for (let k = 0; k < pieces.length; k++) {
        const partMp3 = wav.replace(/\.wav$/, `-part${k + 1}.mp3`)
        const partWav = partMp3.replace(/\.mp3$/, '.wav')
        await ttsToFile(apiKey, MODEL_ID, VOICES[seg.voice].id, pieces[k], partMp3)
        ffmpeg(['-i', partMp3, '-ar', '44100', '-ac', '1', partWav])
        partWavs.push(partWav)
      }
      const partList = wav.replace(/\.wav$/, '-parts.txt')
      writeFileSync(partList, partWavs.map((f) => `file '${f}'`).join('\n') + '\n')
      ffmpeg(['-f', 'concat', '-safe', '0', '-i', partList, wav])
    }
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
