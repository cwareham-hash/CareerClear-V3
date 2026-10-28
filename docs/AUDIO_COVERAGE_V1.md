# Meridian Simulation Audio — Coverage Record (V1)

_Last updated: 28 October 2026 (Investment Banking section added)_

This document is a plain-English record of the audio narration for the Management
Consultant "Project Meridian" simulation: which blocks have generated audio, who
voices whom, where the audio lives, how to make more of it, what it has cost, and
what is still open. It is written to be readable months from now by someone who
is not a developer. Since October 2026 it also records the Investment Banking
("Project Kestrel") audio; see the Investment Banking section below.

## Purpose

Career Clear simulations can be listened to, not just read. Each "block" (a single
time slot in the simulated day/week) can have a stitched-together voice narration
that plays in a small player bar while the reader follows along. This file records
the state of that audio for Meridian so we always know what exists, what it sounds
like, and what remains to be done.

## The cast — who voices whom

Every block is narrated by a fixed cast of ElevenLabs voices. The mapping is locked
in `scripts/generate-block-audio.mjs` and is the single source of truth:

| Role in the story | Voice | What they narrate |
|---|---|---|
| The narrator | **Jay Wayne** (Wise University Professor) | Scene-setting "before" text and any unlabeled connective prose in a scene |
| Carly (the first-year consultant we shadow) | **Claire** (Ultra Real & Natural) | All of Carly's spoken lines **and** all of the over-the-shoulder commentary |
| Marcus (Carly's manager) | **Cooper** (Young American Male) | Marcus's lines |
| David | **Conrad** (Conrad Palmer) | David's lines |
| Ellen (investor, Chief Investment Officer) | **Eryn** (Genuine, Friendly and Natural) | Ellen's lines |
| Gregory (client stakeholder) | **Dan** (Energetic, Emotional and Excited) | Gregory's lines |
| Diane (client stakeholder) | **Tori** | Diane's lines |

**Two roles are deliberately uncast: Raymond and Laura.** Both had audition slates
generated (round 1 for the core cast, round 2 for the guest speakers), and the
candidates put forward for Raymond and Laura were **rejected** — none was the right
fit. A **round 3 casting** is needed for these two before their blocks can be voiced.
No voice is ever substituted for an uncast speaker; blocks containing Raymond or
Laura are skipped until they are cast.

## Coverage as of today

**Day in the Life (the compressed single-day experience): fully covered.**
All 6 blocks have audio (blocks 1 through 6).

**Full Simulation (the multi-day week): covered Monday through Friday, with two
exceptions.** Every Full Simulation block has audio **except**:

- **full-d2-b3 — "Investor interview #2: Raymond"** — blocked because **Raymond**
  is uncast.
- **full-d4-b4 — "Client stakeholder checkpoint with Meridian"** — blocked only by
  **Laura**. (Diane and Gregory also appear in this block and are now cast; Laura is
  the sole remaining blocker.)

**Orientation readings have no audio by design.** The Orientation tier is a short
written briefing and was never intended to be narrated.

## Investment Banking — Project Kestrel (added October 2026)

**Model.** All IB audio is generated on **ElevenLabs Eleven v3** (`eleven_v3`), which
Collin chose after a side-by-side test against Multilingual v2 in October 2026. v3
is now the default model for all new audio. The Meridian audio above stays on
Multilingual v2.

**The cast**, signed off by Collin on **28 October 2026**. It reuses the consulting
voices:

| Role in the story | Voice | What they narrate |
|---|---|---|
| The narrator | **Jay Wayne** | Setting-the-scene text and any unlabeled prose |
| Sabrina (the first-year Analyst we shadow) | **Claire** | All of Sabrina's lines **and** all of the over-the-shoulder commentary (it is written from her own first-person view, the same rule as Carly) |
| Warren (the MD) | **Conrad** | Warren's lines |
| Priya (the VP) | **Eryn** | Priya's lines |
| Danny (the Associate) | **Cooper** | Danny's lines |

**Rick (the founder) and Marisol (the CFO) are uncast.** They appear only in the
Full Simulation's client session (`full-d4-b1`), which waits on their casting.

**Day in the Life: fully covered.** All five blocks were generated on Eleven v3 on
27 October 2026 and are live in the private `block-audio` bucket:

| Block | Title | Length |
|---|---|---|
| `ib-analyst-kestrel-dil-d1-b1` | Building the buyer list | 10:35 |
| `ib-analyst-kestrel-dil-d1-b2` | Drafting the growth and risk sections | 8:20 |
| `ib-analyst-kestrel-dil-d1-b3` | The weekly process call | 4:47 |
| `ib-analyst-kestrel-dil-d1-b4` | The buyer-list scrub | 5:24 |
| `ib-analyst-kestrel-dil-d1-b5` | Turning the MD's marks, past midnight | 9:04 |

**Full Simulation: not yet generated** (19 blocks).

**Stray text.** The IB Day in the Life commentary contains leftover `---` divider
lines and a "Connector (not entered)" planning note. The generation script skips
both, so they are never spoken, but they are still visible on screen until the
content file is cleaned up.

**The homepage teaser.** The homepage "See what a simulation feels like" preview
plays a short public clip: the last minute of the buyer-list scrub (b4), from
Priya's "On the sponsors..." to Warren's "...made this fast." It lives in a
separate, deliberately **public** bucket, `teaser-audio`, so logged-out visitors can
play it. Full block audio never goes there. The current clip,
`homepage/ib-buyer-list-teaser-v2.mp3` (58.9 seconds), was rebuilt from b4's saved
segments with **Warren's lines sped up about 12 percent** (pitch kept) for the
homepage only. The full b4 block audio keeps his generated pace. The original
61.9-second clip (`homepage/ib-buyer-list-teaser.mp3`) is kept in the bucket. A
changed clip always gets a new file name, so browsers and the CDN can't serve a
stale copy.

## Where the audio lives

- Audio files live in a **private Supabase Storage bucket named `block-audio`**, one
  folder per block, keyed by the block's frozen id (for example
  `management-consultant-meridian-full-d5-b1/audio.mp3` plus a `timestamps.json`
  alongside it).
- The bucket is private. Logged-in beta users receive the audio through the app's
  `/api/block-audio/` endpoint, which checks that the user is signed in and has beta
  access, then hands back a **short-lived signed link** (valid about an hour) to the
  file. Logged-out users never get a link.
- **Audio is never stored in git.** The repository contains the tooling and this
  record, but not the mp3s.
- **Uploading a file to the bucket makes it live immediately — no code deployment is
  required.** This is why all of this audio was already playing in production before
  this documentation was ever committed: putting the mp3 in the bucket is the entire
  "publish" step. This commit adds only the record and the tooling, not the audio
  itself.

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

Since October 2026 the script generates on **Eleven v3** by default. Add
`--model <id>` to use a different model (for example
`--model eleven_multilingual_v2`). Each block's segment folder records the model
that made it, so a later re-stitch keeps the right label.

**Per-segment audio pieces are kept on disk** under `audio-samples/.work/<block-id>/`.
Because those pieces are retained, adjusting only the gaps/stitching later (via the
script's `--stitch-only` mode) **costs no ElevenLabs credits** — it re-assembles the
existing pieces rather than re-synthesizing them.

The companion script `scripts/generate-auditions-round2.mjs` generates short audition
clips for candidate voices (used to cast the guest speakers); it is the pattern a
future round 3 for Raymond and Laura would follow.

## Cost record

Character counts below are exact (they are what the generation script actually
synthesized). Credits are approximate — **observed billing is roughly 0.6 ElevenLabs
credits per character**, so use that ratio for future estimates.

| Run | Characters | Approx. credits (×0.6) |
|---|---|---|
| Day in the Life, blocks 2–6 | 49,322 | ~29,600 |
| Full Simulation, Monday–Wednesday (8 blocks) | 68,614 | ~41,200 |
| Full Simulation, Thursday–Friday (9 blocks) | 62,234 | ~37,300 |
| **Subtotal, narration** | **180,170** | **~108,100** |
| Guest-speaker auditions (round 2, 12 clips) | 6,984 | ~4,200 |
| IB Day in the Life, all 5 blocks (Eleven v3, Oct 27) | 35,501 | ~21,300* |
| Model comparison test, v3 excerpt of Meridian block 1 (Oct 27) | 3,312 | ~2,000* |

\* Estimated at the v2 ratio. Eleven v3's actual credit rate has not been checked
yet: the API key can't read account usage, so confirm it on the ElevenLabs
dashboard's Usage page.

(Day-in-the-Life block 1 and the round-1 core-cast auditions were produced in an
earlier session and are not itemized here; the numbers above are the runs recorded
in the September 9 work.)

For rough future planning, **1 credit ≈ 1.7 characters**, or equivalently
**1,000 characters ≈ 600 credits**.

## Open items

- **Cast Raymond and Laura (round 3), then generate their two blocks** —
  `full-d2-b3` and `full-d4-b4`. This is all that stands between the current state
  and a fully-voiced Meridian week.
- **Collin's listening review** — roughly **three hours** of generated audio
  (Day-in-the-Life blocks 2–6 plus the full Monday–Friday Full Simulation) still
  needs a listen-through before the audio is considered signed off.
- **Evaluate open-source text-to-speech** before committing to the rest of the
  Investment Banking ("Project Kestrel") audio spend (the Full Simulation, about
  131,000 characters), to see whether the per-character cost can be reduced at
  that scale.
- **Cast Rick and Marisol**, then generate the IB Full Simulation (19 blocks; the
  client session `full-d4-b1` needs both).
- **Confirm Eleven v3's credit rate** on the ElevenLabs dashboard.
- **Clean up the stray text in the IB Day in the Life commentary** (see the
  Investment Banking section). This is a content fix, not an audio one.
- **Per-block and per-tier time estimates in the UI** — once block durations are
  final, surface "how long this takes to listen to" in the interface.
