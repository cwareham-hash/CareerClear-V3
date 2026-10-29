# Career Clear Simulation Audio — Coverage Record (V1)

_Last updated: 28 October 2026 (all audio moved to Eleven v4; full cast; every block covered)_

This document is a plain-English record of the audio narration for both live
simulations, Management Consultant ("Project Meridian") and Investment Banking
("Project Kestrel"). It covers which blocks have audio, who voices whom, where the
audio lives, how to make more of it, what it has cost, and what is still open. It is
written to be readable months from now by someone who is not a developer.

## Purpose

Career Clear simulations can be listened to, not just read. Each "block" (a single
time slot in the simulated day or week) has a stitched-together voice narration
that plays in a small player bar while the reader follows along. This file records
the state of that audio, so we always know what exists, what it sounds like, and
what remains to be done.

## Model

**All block audio in both simulations is on ElevenLabs Eleven v4** (`eleven_v4`),
the default in `scripts/generate-block-audio.mjs`. Collin chose v4 on 28 October 2026,
and the same day every block was generated (or regenerated) on it and uploaded:

- the 19 Kestrel Full Simulation blocks (new)
- the two Meridian blocks that had never had audio (Raymond's interview and the client
  stakeholder checkpoint)
- the 24 other Meridian blocks, migrated from Multilingual v2
- the five Kestrel Day in the Life blocks, replacing a short-lived Eleven v3 version

History: Meridian was first voiced on Multilingual v2 (`eleven_multilingual_v2`,
August–September 2026). The Kestrel Day in the Life was briefly on Eleven v3
(`eleven_v3`, 27–28 October 2026) after a side-by-side test against v2.

## The cast — who voices whom

The mapping is locked in `scripts/generate-block-audio.mjs` and is the single source
of truth. Every speaker in both simulations is cast; a speaker the script doesn't
know stops the run rather than being guessed.

**Meridian (consulting)**

| Role in the story | Voice | What they narrate |
|---|---|---|
| The narrator | **Jay Wayne** (Wise University Professor) | Scene-setting "before" text and any unlabeled prose in a scene |
| Carly (the first-year consultant we shadow) | **Claire** (Ultra Real & Natural) | All of Carly's lines **and** all of the over-the-shoulder commentary |
| Marcus (Carly's manager) | **Cooper** (Young American Male) | Marcus's lines |
| David (Senior Manager) | **Conrad** (Conrad Palmer) | David's lines |
| Ellen (investor, pension fund chief investment officer) | **Eryn** (Genuine, Friendly and Natural) | Ellen's lines |
| Raymond (investor, life insurer chief investment officer) | **Gerard** | Raymond's lines |
| Gregory (client, Head of Investor Relations) | **Dan** (Energetic, Emotional and Excited) | Gregory's lines |
| Diane (client, project sponsor) | **Tori** | Diane's lines |
| Laura (client, Head of Technology) | **Carol** (Relatable, Real, Likeable Grandma) | Laura's lines |

**Kestrel (investment banking)**

| Role in the story | Voice | What they narrate |
|---|---|---|
| The narrator | **Jay Wayne** | Setting-the-scene text and any unlabeled prose |
| Sabrina (the first-year Analyst we shadow) | **Claire** | All of Sabrina's lines **and** all of the over-the-shoulder commentary (it is her own first-person view, the same rule as Carly) |
| Warren (the MD) | **Conrad** | Warren's lines |
| Priya (the VP) | **Eryn** | Priya's lines |
| Danny (the Associate) | **Cooper** | Danny's lines |
| Rick (Halloran's founder) | **Dan** | Rick's lines |
| Marisol (Halloran's CFO) | **Elise** (Elise Hart - Warm, Clear & Engaging) | Marisol's lines |
| Diane (Halloran's outside counsel) | **Tori** | Diane's lines |

Several voices play one character in each simulation: Conrad (David and Warren),
Cooper (Marcus and Danny), Eryn (Ellen and Priya), Dan (Gregory and Rick), Tori
(both Dianes) and Claire (Carly and Sabrina). Those pairs never share a scene, and
no two speakers in any one block share a voice. This was checked across every block
on 28 October 2026.

Casting history: the core Meridian cast was set in August 2026. Gregory (Dan) and
Diane (Tori) were cast in audition round 2 (September 2026). The Kestrel cast reusing
the consulting voices was signed off on 28 October 2026. Raymond (Gerard), Laura
(Carol), Rick (Dan) and Marisol (Elise) were cast from audition round 3, on Eleven
v4, in October 2026 (`scripts/generate-auditions-round3.mjs`).

## Coverage — every block

**Every Day in the Life and Full Simulation block in both simulations has Eleven v4
audio.** Orientation readings have no audio by design: they are short written
briefings that were never meant to be narrated.

| Tier | Blocks | Total listening time |
|---|---|---|
| Meridian Day in the Life | 6 | 1:01:18 |
| Meridian Full Simulation | 20 | 2:54:25 |
| Kestrel Day in the Life | 5 | 37:45 |
| Kestrel Full Simulation | 19 | 2:18:25 |
| **All audio** | **50** | **6:51:53** |

**Meridian Day in the Life** (6 of 6 blocks on v4, 1:01:18 total)

| Block | Title | Length | Characters | Model |
|---|---|---|---|---|
| `dil-d1-b1` | The team frames the day | 9:30 | 9,198 | v4 |
| `dil-d1-b2` | The investor interview, Ellen | 20:52 | 20,813 | v4 |
| `dil-d1-b3` | Note cleanup | 2:23 | 2,362 | v4 |
| `dil-d1-b4` | Internal problem-solving session, theme shaping | 13:02 | 11,850 | v4 |
| `dil-d1-b5` | Deck section build | 6:07 | 5,858 | v4 |
| `dil-d1-b6` | Deck review with Marcus | 9:24 | 8,439 | v4 |

**Meridian Full Simulation** (20 of 20 blocks on v4, 2:54:25 total)

| Block | Title | Length | Characters | Model |
|---|---|---|---|---|
| `full-d1-b1` | Team week-kickoff | 8:31 | 8,307 | v4 |
| `full-d1-b2` | Carly and Marcus debrief | 4:07 | 3,909 | v4 |
| `full-d1-b3` | Interview prep | 4:28 | 4,329 | v4 |
| `full-d1-b4` | Theme analysis and synthesis | 5:43 | 5,566 | v4 |
| `full-d1-b5` | Skeleton deck and storyline | 4:50 | 4,690 | v4 |
| `full-d2-b1` | Investor interview: Ellen | 20:46 | 20,713 | v4 |
| `full-d2-b2` | Note cleanup | 2:23 | 2,385 | v4 |
| `full-d2-b3` | Investor interview #2: Raymond | 19:25 | 18,350 | v4 |
| `full-d3-b1` | Internal problem-solving session, theme shaping | 13:25 | 12,292 | v4 |
| `full-d3-b2` | Deck section build | 6:34 | 6,423 | v4 |
| `full-d4-b1` | Deck review with Marcus | 9:01 | 8,085 | v4 |
| `full-d4-b2` | Revise the deck section | 3:36 | 3,397 | v4 |
| `full-d4-b3` | Pre-checkpoint check-in with Marcus | 7:15 | 7,077 | v4 |
| `full-d4-b4` | Client stakeholder checkpoint with Meridian | 18:24 | 17,701 | v4 |
| `full-d4-b5` | Carly and Marcus post-checkpoint debrief | 10:08 | 9,899 | v4 |
| `full-d4-b6` | Team dinner with client | 1:47 | 1,609 | v4 |
| `full-d5-b1` | Senior Manager deck review | 13:45 | 13,140 | v4 |
| `full-d5-b2` | Engagement economics | 4:40 | 4,388 | v4 |
| `full-d5-b3` | Learning block | 11:23 | 10,803 | v4 |
| `full-d5-b4` | Week wrap | 4:14 | 3,836 | v4 |

**Kestrel Day in the Life** (5 of 5 blocks on v4, 37:45 total)

| Block | Title | Length | Characters | Model |
|---|---|---|---|---|
| `dil-d1-b1` | Building the buyer list | 10:44 | 9,806 | v4 |
| `dil-d1-b2` | Drafting the growth and risk sections | 8:20 | 7,833 | v4 |
| `dil-d1-b3` | The weekly process call | 4:41 | 4,662 | v4 |
| `dil-d1-b4` | The buyer-list scrub | 5:00 | 4,799 | v4 |
| `dil-d1-b5` | Turning the MD's marks, past midnight | 9:00 | 8,401 | v4 |

**Kestrel Full Simulation** (19 of 19 blocks on v4, 2:18:25 total)

| Block | Title | Length | Characters | Model |
|---|---|---|---|---|
| `full-d1-b1` | Associate desk-side week kickoff | 4:55 | 4,986 | v4 |
| `full-d1-b2` | CIM executive-summary build | 10:19 | 9,875 | v4 |
| `full-d1-b3` | Buyer-list build | 11:15 | 10,281 | v4 |
| `full-d1-b4` | Turn Danny's comments | 9:02 | 8,485 | v4 |
| `full-d2-b1` | VP walk-through of the book | 5:18 | 5,206 | v4 |
| `full-d2-b2` | Turn the VP comments | 7:19 | 6,902 | v4 |
| `full-d2-b3` | Buyer-list tiering and tracker chase | 8:52 | 8,255 | v4 |
| `full-d2-b4` | Late-night production, the model-to-CIM cascade | 6:58 | 6,534 | v4 |
| `full-d3-b1` | CIM growth-and-risk build, and buyer-list breather | 8:21 | 7,879 | v4 |
| `full-d3-b2` | Weekly deal process call | 4:46 | 4,748 | v4 |
| `full-d3-b3` | Buyer-list scrub with VP and MD | 5:11 | 4,997 | v4 |
| `full-d3-b4` | Turn the MD comments | 9:01 | 8,410 | v4 |
| `full-d4-b1` | The Client CIM Review Session | 15:00 | 14,631 | v4 |
| `full-d4-b2` | Turn the client changes into the CIM | 8:45 | 8,340 | v4 |
| `full-d4-b3` | Late-night production, finishing the client-revised turn | 6:06 | 5,783 | v4 |
| `full-d5-b1` | CIM consolidation, recirculation turn, and QC | 5:21 | 4,937 | v4 |
| `full-d5-b2` | Buyer-list finalization, model refresh, tracker close-out | 6:02 | 5,717 | v4 |
| `full-d5-b3` | Danny release check and lighter Friday finish | 2:40 | 2,503 | v4 |
| `full-d6-b1` | Saturday production touch | 3:14 | 3,044 | v4 |

## Where the audio lives

- Audio files live in a **private Supabase Storage bucket named `block-audio`**, one
  folder per block, keyed by the block's frozen id (for example
  `management-consultant-meridian-full-d5-b1/audio.mp3` plus a `timestamps.json`
  alongside it).
- The bucket is private. Logged-in beta users receive the audio through the app's
  `/api/block-audio/` endpoint. It checks that the user is signed in and has beta
  access, then hands back a **short-lived signed link** (valid about an hour) to the
  file. Logged-out users never get a link.
- **Audio is never stored in git.** The repository contains the tooling and this
  record, but not the mp3s.
- **Uploading a file to the bucket is the whole "publish" step**, with no code
  deployment. Since 28 October 2026, replacements are uploaded with a 60-second
  cache setting so the new file reaches listeners quickly. **But see the first open
  item:** the live endpoint itself currently caches its answers, which can delay or
  break this.
- The homepage teaser clip is the one exception: it lives in a separate,
  deliberately **public** bucket, `teaser-audio`. Full block audio never goes there.

## Local archives (nothing deleted)

Every superseded local file was moved, never deleted. All of it is in
`audio-samples/`, which is gitignored and stays on Collin's machine:

- **Meridian Multilingual v2 audio (24 blocks):** `audio-samples/archive/<block-id>--v2.mp3`
  and `--v2.json`, with segment folders in `audio-samples/archive/work-v2/<block-id>/`.
- **Kestrel Day in the Life Eleven v3 audio (5 blocks):** `audio-samples/archive/<block-id>--v3.mp3`
  and `--v3.json`, with segment folders in `audio-samples/archive/work-v3/<block-id>/`.
- **Older Meridian block 1 variants:** `audio-samples/archive/*--old-cast.*` and `*--pre-gaps.*`.
- **Review sets:** `audio-samples/ib-cast-review/` (IB cast on v3),
  `audio-samples/ib-cast-review-v4/` (IB cast on v4), and the audition folders
  `audio-samples/auditions*/`.

## The homepage teaser

The homepage "See what a simulation feels like" preview plays a short public clip:
the end of the Kestrel buyer-list scrub (b4), from Priya's "On the sponsors..." to
Warren's "...made this fast."

- **The current clip is `homepage/ib-buyer-list-teaser-v4.mp3` (55.8 seconds)** in the
  public `teaser-audio` bucket. It is built from the Eleven v4 b4 segments, with
  **Warren's lines sped up about 12 percent** (pitch kept) for the homepage only.
- **The transcript matches the audio.** It shows exactly the clip's five lines,
  starting with the first words heard. While the clip plays, it glides gently (about
  1.5 seconds, easing in and out) to keep the spoken line in view. It holds still when
  paused and glides back to the top when the clip ends. Visitors who prefer reduced
  motion get an instant move. Nothing is highlighted.
- **Older clips are kept in the bucket:** `homepage/ib-buyer-list-teaser.mp3` and
  `homepage/ib-buyer-list-teaser-v2.mp3` (both from the v3 audio).
- **A changed clip always gets a new file name**, so browsers and the CDN can't serve
  a stale copy. It also needs the transcript's lines and start times updated in
  `components/landing/SimulationPreview.tsx`.

## How to regenerate a block

To (re)generate the audio for a single block:

```
node scripts/generate-block-audio.mjs <block-id>
```

for example:

```
node scripts/generate-block-audio.mjs management-consultant-meridian-full-d5-b1
```

The script reads the block's text straight from the content file, splits it into
speaker segments, calls ElevenLabs for each, and stitches the pieces into one mp3
with a matching timestamps file. It requires an `ELEVENLABS_API_KEY` in `.env.local`
and `ffmpeg` installed.

- **Model:** Eleven v4 (`eleven_v4`) by default. Add `--model <id>` to use a different
  one. Each block's segment folder records the model that made it.
- **Very long segments:** a single segment longer than the model's per-request limit
  (10,000 characters for v4) is generated in roughly equal pieces split at paragraph
  breaks, then joined back seamlessly. Today this only affects Meridian's "Learning
  block" (`full-d5-b3`), one 10,803-character narration made in two pieces.
- **Stray text:** leftover `---` divider lines and "Connector (not entered)" planning
  notes are never spoken.
- **Segments are kept on disk** under `audio-samples/.work/<block-id>/`, so
  re-stitching with `--stitch-only` (to adjust only gaps or stitching) **costs no
  ElevenLabs credits**.
- **Uploading** the finished `audio-samples/<block-id>.mp3` and `.json` to the
  bucket (as `audio.mp3` and `timestamps.json`) is a separate step.

## Cost record

Character counts are exact (what the generation script actually synthesized).
**Eleven v4 bills roughly 0.44 credits per character** (measured on Collin's
ElevenLabs dashboard). Multilingual v2 billed roughly 0.6. Eleven v3's rate was never
confirmed.

| Run | Model | Characters | Approx. credits |
|---|---|---|---|
| Meridian Day in the Life, blocks 2–6 (Sep 2026) | v2 | 49,322 | ~29,600 |
| Meridian Full Simulation, Monday–Wednesday, 8 blocks (Sep 2026) | v2 | 68,614 | ~41,200 |
| Meridian Full Simulation, Thursday–Friday, 9 blocks (Sep 2026) | v2 | 62,234 | ~37,300 |
| Guest-speaker auditions, round 2, 12 clips (Sep 2026) | v2 | 6,984 | ~4,200 |
| Model comparison test, Meridian block 1 excerpt (Oct 27) | v3 | 3,312 | unconfirmed |
| Kestrel Day in the Life, 5 blocks (Oct 27) | v3 | 35,501 | unconfirmed |
| v4 test call (Oct 28, 13:27 CDT) | v4 | 34 | ~15 |
| Auditions, round 3, 15 clips (Oct 28, 13:31–13:33 CDT) | v4 | 8,687 | ~3,800 |
| Kestrel Day in the Life, 5 blocks (Oct 28, 13:34–13:44 CDT) | v4 | 35,501 | ~15,600 |
| Kestrel Full Simulation, 19 blocks (Oct 28, 14:55–15:30 CDT) | v4 | 131,513 | ~57,900 |
| Meridian gap blocks, 2 (Oct 28, 15:31–15:40 CDT) | v4 | 36,051 | ~15,900 |
| Meridian migration, 24 blocks (Oct 28, 15:40–16:29 CDT) | v4 | 189,368 | ~83,300 |

(Meridian Day in the Life block 1 and the round 1 core-cast auditions were made in
an earlier session and are not itemized.)

For rough future planning on v4: **1,000 characters ≈ 440 credits**. Regenerating
every block in both simulations is about 392,000 characters, or roughly 173,000
credits.

## Open items

- **Fix the live audio endpoint's caching (important).** The live `/api/block-audio/`
  endpoint (Next.js 14) keeps its Supabase answers between requests. Three effects
  seen on 28 October 2026:
  - **Expired links.** Once a block's one-hour signed link is cached, the endpoint can
    keep handing out the same link after it expires, so playback fails until the
    cache refreshes. This affects any block, independent of the audio upload.
  - **Stuck "no audio".** A block requested before its audio existed keeps answering
    "no audio" after upload. Kestrel `full-d1-b1` and `full-d1-b2` were still stuck
    90 minutes after upload.
  - **Stale timing files.** Replaced blocks can be served their old
    `timestamps.json`, which only affects the artifact auto-scroll cues.
  - **Suggested fix:** one line in `app/api/block-audio/[blockId]/route.ts`
    (`export const fetchCache = 'force-no-store'`). Then purge the Vercel Data Cache
    once so the stuck answers clear. This needs Collin's approval, because that route
    is protected.
- **Collin's listening review** of the v4 audio, about 6 hours 52 minutes across all
  four tiers.
- **Time estimates in the UI.** Block lengths are now final (see the tables above)
  and can drive "how long this takes to listen to" in the interface.
- **Cosmetic:** the `totalTime` text label in a timestamps file can read like
  "14:60.0" when a length rounds up to a whole minute. The real length
  (`totalSeconds`) is correct, and the player doesn't use the label.
