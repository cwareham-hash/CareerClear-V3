# Phase 3 Recon — Tiers, Content Model, Scenarios, IB/Law Hiding, Artifacts

Read-only investigation. No files were changed. This documents the current state and
what would need to change for upcoming Phase 3 work. **Nothing here is implemented.**

---

## 1. How the four duration tiers work today

### Where the tier concept lives

The tier system is **one number per time block** (`minDuration`) plus a **selected
depth** in the UI. There is no separate "tier content" — every tier shows the *same*
blocks, just more or fewer of them. A longer tier is a superset of a shorter one.

The canonical definition is in `lib/simulation.ts`:

```ts
export type DurationOption = 10 | 30 | 120 | 300   // minutes

export const DURATION_OPTIONS: { value: DurationOption; display: string; label: string }[] = [
  { value: 10,  display: '10 min',  label: 'Key highlights'  },
  { value: 30,  display: '30 min',  label: 'Main activities' },
  { value: 120, display: '2 hours', label: 'Detailed view'   },
  { value: 300, display: '5 hours', label: 'Full immersion'  },
]
```

### How content is filtered by tier

Each `TimeBlock` carries a `minDuration`. The filter is a single, repeated line:
**show a block if `block.minDuration <= selectedDuration`.** That comparison appears in
three places:

- `components/simulation/SimulationClient.tsx:63` — `visibleBlocks` (drives progress, active block, completion)
- `components/simulation/SimulationCalendar.tsx:55` — the calendar grid filter
- `app/dashboard/page.tsx:456` — per-tier progress rollup on the dashboard

The selected depth is React state, defaulting to 30 min:
`SimulationClient.tsx:35` → `useState<DurationOption>(30)`.

Because every block is tagged 10/30/120/300, picking "10 min" reveals only the
`minDuration: 10` blocks (one per day), "30 min" adds the 30-tagged ones, etc. The
5-hour tier shows all 25 blocks (5 days × 5 blocks). See the tags in
`lib/simulation.ts:104-132` for the IB example.

### Persistence stores the tier as free text (good news for migration)

- `lib/userProgress.ts` writes `tier: String(durationOption)` into Supabase — i.e. the
  strings `'10' | '30' | '120' | '300'`.
- `supabase/schema.sql` defines `tier text not null` with **no CHECK constraint** on
  both `user_progress` (line 99, unique on `user_id, simulation_id, tier`) and `ratings`
  (line 138). The schema comment explicitly says it stores the numeric value as text
  "so we can switch to experiential tier names later without any schema change."
  **So the DB needs no migration** — `'orientation' | 'day-in-life' | 'full'` slot in fine.

### Files that would change to move to three experiential tiers

| File | What changes |
|---|---|
| `lib/simulation.ts` | Replace `DurationOption` type + `DURATION_OPTIONS` array with the three experiential tiers. Re-type `TimeBlock.minDuration` (rename to e.g. `minTier`). Re-tag all blocks in `SIMULATIONS`. The factory `b(...)` signature changes. |
| `components/simulation/DurationSelector.tsx` | Renders `DURATION_OPTIONS` as pills — only the labels/values change; logic is generic. Likely rename to `TierSelector`. |
| `components/simulation/SimulationClient.tsx` | `useState` default, the `<=` filter, the `String(selectedDuration)` writes, rating payload. |
| `components/simulation/SimulationCalendar.tsx` | The `<=` filter + the "No activities visible at this duration" empty-state copy (line 165). |
| `app/dashboard/page.tsx` | `DurationOption`/`DURATION_OPTIONS` import, `durationLabel()`, the per-tier rollup loop, copy that says "duration tier". |
| `lib/userProgress.ts` | `DurationOption` type usage in `SimulationRating` and function args (values become strings, type widens). |
| `components/simulation/RatingModal.tsx` | Takes `durationOption: DurationOption` as a prop — type only. |

**Important nuance:** the current tiers are *cumulative depth* (a superset relationship).
The three experiential tiers are described in CLAUDE.md as *qualitatively different
experiences* — Orientation is a "prose briefing," Day-in-the-Life is a "compressed day
with decision points," Full Simulation is a "multi-day arc with consequences." That is
**not** the same as "show N of the same blocks." If the experiential tiers are meant to
render differently (not just filter the same time-block grid), this is a deeper change
than swapping the four values for three — the content model itself (Section 2) may need a
per-tier shape, not a single `minTier` flag on shared blocks. This is the single biggest
design decision to settle before building.

---

## 2. The simulation content TypeScript shape

All types live in `lib/simulation.ts`. Verbatim:

```ts
export type ActivityType = 'meeting' | 'independent' | 'team' | 'presentation' | 'learning'
export type DurationOption = 10 | 30 | 120 | 300

export interface TimeBlockContent {
  before:        string   // "Setting the Scene" prose
  simulatedWork: string   // screenplay-formatted script (scene/dialogue/monologue/narration)
  commentary:    string   // "over-the-shoulder" professional commentary
  after:         string   // "What's Next" wrap-up prose
}

export interface TimeBlock {
  id:           string          // `${careerId}-d${day}-b${bNum}`, e.g. "ib-analyst-d1-b1"
  day:          1 | 2 | 3 | 4 | 5
  timeRange:    string          // "9:00–9:30 AM"
  title:        string
  activityType: ActivityType    // drives the color coding
  minDuration:  DurationOption  // tier gate
  content:      TimeBlockContent
}

export interface Simulation {
  careerId:   string
  slug:       string
  title:      string
  scenario:   string   // the situation set-up shown in the overview header
  project:    string   // the project name, e.g. "TechVentures Acquisition — Project Apex"
  timeBlocks: TimeBlock[]
}
```

### How a content file is structured

Each career has a file in `lib/content/<career>.ts` exporting **one flat object** keyed
by block id, value = `TimeBlockContent` (the prose, NOT the metadata):

```ts
// lib/content/management-consultant.ts
import type { TimeBlockContent } from '../simulation'

export const managementConsultantContent: Record<string, TimeBlockContent> = {
  'management-consultant-d1-b1': { before: `...`, simulatedWork: `...`, commentary: `...`, after: `...` },
  'management-consultant-d1-b2': { ... },
  // ... 25 blocks per career (5 days × 5 blocks)
}
```

### How metadata + content are stitched together

The *structure* (days, time ranges, titles, activity types, tier gates) lives in
`lib/simulation.ts` in the `SIMULATIONS` array, built via the `b(...)` factory
(`lib/simulation.ts:72-89`). The factory looks up the prose from `CONTENT_LOOKUP`
(a map of careerId → that career's content object, lines 63-68) by block id, and falls
back to generic placeholder prose if a key is missing.

So a career today is split across **two** places: the schedule/metadata in
`simulation.ts`, and the prose in `lib/content/<career>.ts`.

---

## 3. Career → simulation mapping, and supporting many scenarios per career

### Today it is one-to-one

- A `Career` (`lib/careers.ts`) has `id` and `slug` and a `hasSimulation: boolean`.
- A `Simulation` has a `careerId` and its own `slug`.
- `SIMULATIONS` is a flat array; `getSimulation(slug)` does `SIMULATIONS.find(s => s.slug === slug)` (`lib/simulation.ts:260`).
- The route is `app/careers/[slug]/simulate/page.tsx` — **the simulate slug is the career slug** (the "Start Simulation" link in `app/careers/[slug]/page.tsx:308` is `/careers/${career.slug}/simulate`). `generateStaticParams` pre-renders one simulate page per simulation.
- Progress/ratings are keyed by `careerId` (which is used as `simulation_id` in Supabase). **There is no scenario dimension anywhere** — DB, types, or routes.

This works because each career has exactly one simulation today.

### What would change to support many scenarios per career

Conceptually: insert a **Scenario** layer between Career and the time blocks, where each
scenario owns its own three tiers. Concretely:

1. **Types (`lib/simulation.ts`):** introduce a `Scenario` interface owning
   `{ id, careerId, slug, title, scenario, project, timeBlocks }`, and demote the current
   `Simulation` shape into it. A career then maps to `Scenario[]`. Block ids would need a
   scenario segment to stay unique, e.g. `consulting-strategy-d1-b1`.

2. **Content files (`lib/content/`):** today one file per career. With scenarios, either
   one file per scenario (`lib/content/consulting-strategy.ts`,
   `consulting-public-sector.ts`, …) or one file per career exporting multiple scenario
   objects. One-file-per-scenario best matches CLAUDE.md's "adding a track is purely
   dropping in a content file" scalability rule.

3. **Routing:** add a scenario segment. Cleanest is
   `app/careers/[slug]/simulate/[scenario]/page.tsx`, plus a scenario-picker (either at
   `/careers/[slug]/simulate` or on the career detail page) when a career has more than
   one. `getSimulation` becomes `getScenario(careerSlug, scenarioSlug)`.

4. **Persistence:** progress/ratings are keyed by `simulation_id = careerId`. To track
   progress per scenario, the key must become scenario-scoped (e.g.
   `simulation_id = scenarioId`, or add a `scenario` column). The `tier` column already
   exists; the unique constraints (`user_id, simulation_id, tier`) would extend to include
   scenario. **This is a real DB change** — unlike the tier rename, scenarios touch the
   schema.

5. **`Career.hasSimulation`** (a boolean) becomes insufficient — you'd want
   `scenarioCount` or to derive availability from whether any scenarios exist.

**Bottom line:** the tier change is mostly a content/type relabel with no DB migration.
The scenario change is structural and does require schema work. They're independent — you
can ship experiential tiers first without touching scenarios.

---

## 4. How IB and Law simulations are surfaced, and how to hide them

### Where "has a simulation" is decided

Two independent signals exist, and they're currently redundant:

- **`Career.hasSimulation`** in `lib/careers.ts`. All four core careers (ib-analyst,
  management-consultant, law-associate, product-manager) are `hasSimulation: true`.
  This boolean drives: the card badge ("Simulation" vs "Coming Soon",
  `components/CareerCard.tsx:118`) and the detail page (the "Simulation Available" badge
  + the entire "Start Simulation" CTA block, `app/careers/[slug]/page.tsx:54` and `:294`).
- **The `SIMULATIONS` array** in `lib/simulation.ts`. Contains all four. This drives
  `generateStaticParams` for the simulate route and `getSimulation`. If a slug isn't here,
  the simulate page 404s (`notFound()`).

### Cleanest way to hide IB + Law while keeping their exploration pages live

The exploration pages (`/careers/investment-banking-analyst`,
`/careers/law-associate`) read from `CAREERS` + `CAREER_DETAIL`, **not** from
`SIMULATIONS`. So they stay fully live regardless of simulation state. Only the
simulation entry points need to flip.

Recommended approach — **one boolean, used consistently**:

1. Set `hasSimulation: false` for `ib-analyst` and `law-associate` in `lib/careers.ts`.
   This automatically: flips both cards to the "Coming Soon" badge, flips the detail-page
   badge to "Coming Soon", and **removes the "Start Simulation" CTA** (it's already
   gated behind `career.hasSimulation` at `page.tsx:294`). No new code.

2. Guard the route so a hand-typed `/careers/.../simulate` URL doesn't reach a live (but
   hidden) simulation. Either:
   - leave the IB/Law objects in `SIMULATIONS` but have the simulate page check
     `career.hasSimulation` and `notFound()` (or render a "coming soon" panel) if false, **or**
   - remove IB/Law from `SIMULATIONS` so the route 404s via the existing `getSimulation`
     null check. (Downside: deletes/strands the existing content wiring; the prose files
     stay but are unreferenced.)

   The **first option is cleaner and reversible** — the content stays wired, and
   re-enabling later is a one-line `hasSimulation: true` flip.

3. *(Optional polish)* The current "Coming Soon" badge is a generic muted outline. If you
   want an explicit simulation-specific "Simulation coming soon" state on the detail page
   (distinct from the demo-role "Coming Soon"), that's a small copy/markup addition near
   `app/careers/[slug]/page.tsx:54-62`.

Net: hiding IB + Law is essentially **flipping two booleans plus one route guard**, with
zero impact on their exploration pages. This matches CLAUDE.md §3 ("IB and Law
simulations hidden behind coming-soon; exploration pages stay live").

---

## 5. Rendering "artifacts" (emails, deck pages, spreadsheet snippets) — options

> Not building now. Options + recommendation only.

### Current rendering pipeline (the constraint)

A block's `content.simulatedWork` is a single string. `components/simulation/BlockContent.tsx`
parses it line-by-line (`parseScriptLines`) into scene / dialogue / monologue / narration,
and `ScriptSection` renders them. The panel (`TimeBlockPanel.tsx:88-94`) stacks four
fixed sections in order: Before → Script → Commentary → After. There is **no structured
slot for documents** today — everything is plain prose/screenplay text.

### Options

**Option A — Inline markup convention in `simulatedWork`.**
Extend the existing line parser to recognize an artifact fence, e.g.
`[Artifact: email] ... [/Artifact]`, and render it as a styled card. Zero type/schema
changes; content stays one string.
*Pros:* no model changes, no DB changes, content-only. *Cons:* artifacts get tangled in
prose, hard to position deliberately, parser grows fragile, no reuse across blocks, poor
fit for tabular/spreadsheet data.

**Option B — A typed `artifacts` array on `TimeBlockContent`.**
Add `artifacts?: Artifact[]` where `Artifact` is a discriminated union
(`{ type: 'email' | 'deck' | 'spreadsheet' | 'doc', ... }`). Render a new `ArtifactSection`
in the panel/modal, with one renderer per type (an email chrome, a deck-page frame, a
mini table). Content authors attach artifacts declaratively per block.
*Pros:* clean separation of narrative vs document; type-safe; each artifact type gets a
purpose-built, on-brand renderer; reusable; spreadsheets render as real tables. Optional
(`?`) so existing content is untouched. *Cons:* touches the shared content type and the
panel/modal; needs new renderer components; content files grow richer.

**Option C — Standalone artifact viewer (modal/drawer launched from the block).**
Artifacts as references the block links to, opened in their own overlay rather than inline.
*Pros:* keeps the narrative flow tight; good for large documents (full deck, long memo).
*Cons:* more UI plumbing (nested overlays over the existing panel/modal), extra clicks,
weaker "reading alongside the narrative" feel the prompt asks for.

### Recommendation

**Option B (typed `artifacts` array), rendered inline as a new section, with per-type
renderers.** It fits the existing architecture best: the panel already composes discrete
section components (`BeforeSection`, `ScriptSection`, `CommentarySection`, `AfterSection`),
so an `ArtifactSection` slots in naturally. Making the field optional means no existing
content breaks and artifacts roll out per block as content is authored — consistent with
the "content is a drop-in" philosophy. A discriminated union keeps each artifact type
(email, deck page, spreadsheet snippet) rendering with its own on-brand chrome instead of
one generic box, and tabular data renders as an actual table rather than mangled text.
If individual artifacts grow large later, Option C (a viewer overlay) can be layered on
top for those specific types without reworking the model.

---

## Quick reference — key files

| Concern | File(s) |
|---|---|
| Tier type, options, factory, `SIMULATIONS`, `getSimulation` | `lib/simulation.ts` |
| Tier filtering in UI | `SimulationClient.tsx:63`, `SimulationCalendar.tsx:55`, `dashboard/page.tsx:456` |
| Prose content (one per career) | `lib/content/<career>.ts` |
| Content section renderers | `components/simulation/BlockContent.tsx` |
| Panel / modal composition | `TimeBlockPanel.tsx`, `TimeBlockModal.tsx` |
| Tier selector pills | `components/simulation/DurationSelector.tsx` |
| Career data + `hasSimulation` | `lib/careers.ts` |
| Card / detail badges + CTA | `CareerCard.tsx:118`, `app/careers/[slug]/page.tsx:54,294` |
| Simulate route | `app/careers/[slug]/simulate/page.tsx` |
| Progress / ratings persistence | `lib/userProgress.ts` |
| DB schema (tier = free-text, no CHECK) | `supabase/schema.sql` |
