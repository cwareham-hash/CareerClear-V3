# Visual Audit — Consulting Simulation & Surrounding Pages

Read-only audit performed in the rendered app (Playwright), logged in on the beta
test account. Reviewed at desktop width (1280) with mobile spot-checks (390). No
code was changed. Each item notes whether it's an **objective consistency/readability
fix** or a **subjective aesthetic choice**, with priority and rough effort.

Scope: Management Consultant simulation (all three tiers), the tier selector, the
block panel/modal, the career detail pages, and the explore grid.

---

## What already looks good (not inventing problems)

- **Full Simulation 6-day grid** (Sun–Fri) — well-proportioned, columns read clearly,
  feels intentional. This is the layout the calendar was built for and it works.
- **Tier selector** — three equal-width pills; the selected state (navy fill + teal
  border) is unmistakable against the white unselected pills. Polished and clear at
  desktop width.
- **Before / After section boxes** in the block modal — good contrast, clear icons and
  labels, comfortable padding. Readable.
- **Career-detail "Coming Soon" bottom block** (IB/Law/PM) — the gray accent + disabled
  "Simulation Coming Soon" pill reads as intentional and not-clickable; consistent with
  the active "Start Simulation" CTA's placement. Clean.
- **Explore grid** — cards are aligned and consistent; nothing looks broken now that
  IB/Law/PM are in the Coming Soon state.
- **Overview header card** ("Project Fresca…") — title, scenario, and progress bar are
  well-balanced.

---

## HIGH priority

### H1. Single-day tiers render as one full-page-width column (desktop)
- **What / where:** Simulation page, Orientation and Day-in-the-Life tiers. The calendar
  was designed as a multi-column day grid; with only one day, it collapses to a single
  column stretched to the full content width (~1180px). Each card holds just a title +
  time on the far left, leaving ~65% of the card empty. It looks unfinished and "cheap"
  relative to the tight Full-Simulation grid right next to it.
- **Why it matters:** These are two of the three core experiences. The awkward stretch is
  the first thing a user sees after selecting Orientation or Day in the Life, and it
  undercuts the polish of everything else. (Note: on **mobile** the full-width column is
  correct — this is a desktop-only problem, so any fix should be width-gated.)
- **Proposed fix (concrete options):**
  - **Option A — Constrain width (smallest change):** when the selected tier spans a
    single day, cap the column at a comfortable reading width and center it
    (e.g. `max-w-2xl mx-auto`). Cards become appropriately sized instead of full-bleed.
  - **Option B — Reading-list layout for Orientation specifically (recommended for that
    tier):** Orientation is a briefing, not a schedule. Drop the calendar/day framing
    entirely and present the 3 blocks as a numbered, centered reading list (1·2·3 with
    titles + "~4 min read"), more like a chapter index than a day grid. No day header,
    no activity-type legend.
  - **Option C — Agenda/timeline for Day in the Life:** a centered single-column agenda
    with a left time rail (the times already exist), max-width constrained, labelled with
    the real weekday (it's a Wednesday — see M1) rather than "Day 1".
  - **Recommended:** Option A as the quick win for both single-day tiers; layer Option B
    on Orientation when there's time, since a briefing genuinely wants a reading layout,
    not a calendar.
- **Priority:** High · **Effort:** small (Option A) to medium (B/C) · **Type:** Objective
  layout problem (the empty stretch); the *choice* of replacement layout is partly
  subjective.

---

## MEDIUM priority

### M1. Day-column header is wrong/meaningless for single-day tiers
- **What / where:** Simulation page, single-day tiers. The day header shows "**Mon ·
  Day 1**" for both Orientation and Day in the Life.
  - Orientation is a reading briefing — "Mon / Day 1" is meaningless.
  - Day in the Life's content is **explicitly a Wednesday** ("This is Wednesday: deck
    day"), but the calendar labels it "Mon · Day 1". That's a factual mismatch a reader
    will notice.
- **Why it matters:** A wrong day label reads as a bug and erodes trust in otherwise
  careful content. It's also semantically off for a briefing.
- **Proposed fix:** For single-day tiers, drop the weekday/"Day N" header entirely
  (pairs naturally with H1's reading/agenda layouts). If a label is kept for Day in the
  Life, make it the correct weekday ("Wednesday") rather than deriving "Mon" from
  `day === 1`. Leave the Full tier headers as-is (they're correct).
- **Priority:** Medium · **Effort:** small · **Type:** Objective (the Wednesday/Mon
  mismatch is factually wrong).

### M2. "During" narration renders as low-contrast muted italic for long prose
- **What / where:** Block modal, Full Simulation and Day-in-the-Life blocks. The During
  section runs the text through the screenplay parser: dialogue/scene lines get distinct
  styling, but **narration paragraphs render as small, grey, italic** text. Because the
  Fresca content is mostly long second-person narration, most of the During body is grey
  italic — noticeably harder to read than the dark "Before" box directly above it. The
  Orientation tier (which uses the clean dark "briefing prose" rendering) proves how much
  more readable the same kind of text can be.
- **Why it matters:** The During section is the heart of the simulation — the part users
  spend the most time reading. Long passages of muted italic are fatiguing and look less
  finished than the rest of the modal.
- **Proposed fix:** Render plain narration in the During section as dark, non-italic body
  text (matching the Before box / the Orientation prose), and reserve the muted-italic
  "scene direction" styling for true bracketed stage directions only. Keep the
  bold-speaker dialogue styling for actual dialogue lines. (This is a styling change in
  the shared block-content renderer — no content edits.)
- **Priority:** Medium · **Effort:** small–medium · **Type:** Leans objective
  (contrast/readability over long passages); the "scene" italic look was an intentional
  aesthetic, so the trade-off is partly subjective.

### M3. Legend always lists all five activity types, regardless of the tier
- **What / where:** Simulation page, below the calendar. The legend always shows all five
  colors (External Client Meeting, Internal Team Meeting, Individual Work Block, Learning,
  Presentation). Orientation contains only "Learning" blocks, yet the legend lists five
  categories that don't appear; Day in the Life shows ~three of the five.
- **Why it matters:** A legend for colors that aren't on screen is noise and reads as
  not-quite-finished, especially on the single-block-type Orientation tier.
- **Proposed fix:** Derive the legend from the activity types actually present in the
  selected tier (show only the colors in use), or hide the legend entirely for
  single-type tiers like Orientation.
- **Priority:** Medium · **Effort:** small · **Type:** Objective consistency.

---

## LOW priority

### L1. timeRange wording is inconsistent with the app's established format
- **What / where:** Block cards/headers. The visible Management Consultant content uses
  "**6:45 to 8:00 AM**" / "**9:00 AM to 12:30 PM**" (the word "to"), whereas the app's
  established convention — and the still-wired IB/Law/PM content — uses an en-dash:
  "**9:00–9:30 AM**". MC is internally consistent today, but the formats will clash the
  moment another track is un-hidden.
- **Why it matters:** Minor now (only MC is visible), but it's a latent inconsistency and
  an easy standardization.
- **Proposed fix:** Pick one format (the en-dash matches the spec/design system) and
  apply it across all content, or normalize at render time.
- **Priority:** Low · **Effort:** small · **Type:** Objective consistency.

### L2. "activities" wording for Orientation reading blocks
- **What / where:** Overview header on the Orientation tier — "1 of **3 activities**
  completed". Orientation blocks are reading segments ("~4 min read"), not activities.
- **Why it matters:** Small copy mismatch; "activities" implies tasks, not reading.
- **Proposed fix:** Use tier-aware wording (e.g. "sections read" / "blocks") for
  Orientation, or a neutral term across tiers.
- **Priority:** Low · **Effort:** small · **Type:** Subjective (copy).

### L3. Tier pills wrap text on mobile
- **What / where:** Tier selector at 390px. "Day in the Life" and "Complete multi-day
  arc" wrap to two lines, making the three pills slightly uneven/cramped. Still usable and
  the selected state is still clear.
- **Why it matters:** Minor polish; not broken.
- **Proposed fix:** Shorten the sub-labels on mobile, reduce pill text size at small
  widths, or stack the pills vertically on narrow screens.
- **Priority:** Low · **Effort:** small · **Type:** Subjective polish.

### L4. Orientation section labels are screenplay-flavored
- **What / where:** Orientation block modal — the section headers read "Before: Setting
  the Scene", "During", "After: What's Next". For a reading briefing (no scene, no
  action) this framing is slightly off.
- **Why it matters:** Very minor; it reads a touch oddly for a primer that isn't a
  workday.
- **Proposed fix:** Optionally use neutral labels for briefing-type blocks (e.g.
  "Why this matters" / the body / "What's next"), or drop the labels for Orientation.
- **Priority:** Low · **Effort:** small · **Type:** Subjective.

---

## Summary table

| ID | Item | Priority | Effort | Type |
|----|------|----------|--------|------|
| H1 | Single-day tiers = full-width single column (desktop) | High | S–M | Objective (layout) |
| M1 | Day header wrong for single-day tiers ("Mon"/"Day 1"; DIL is a Wed) | Medium | S | Objective |
| M2 | During narration = low-contrast muted italic for long prose | Medium | S–M | Objective-leaning |
| M3 | Legend lists all 5 activity types regardless of tier | Medium | S | Objective |
| L1 | timeRange "to" vs en-dash inconsistency | Low | S | Objective |
| L2 | "activities" wording for Orientation reading blocks | Low | S | Subjective |
| L3 | Tier pills wrap on mobile | Low | S | Subjective |
| L4 | Orientation section labels are screenplay-flavored | Low | S | Subjective |

The single thing genuinely worth doing first is **H1** (with **M1** and **M3** folding
into the same single-day-tier rework). **M2** is the highest-impact readability
improvement for the core simulation experience. Everything in Low is a nitpick.
