# CLAUDE.md — Career Clear

## 1. What this project is (technical)

- **Stack:** Next.js 14 (App Router) + TypeScript, Tailwind CSS, Framer Motion, Lucide React. Frontend-only — there is currently no backend or database; all persistence is browser localStorage.
- **Local dev:** `npm run dev` → http://localhost:3000. The `dev` and `prebuild` scripts intentionally run `rm -rf .next` first (permanent fix for a stale-cache bug that broke all CSS). Never remove that cleanup. If styling ever breaks in dev: `npm run clean`, then restart.
- **Code layout:** `app/` (pages), `components/` (UI building blocks), `lib/` (data, logic, and per-career simulation content in `lib/content/`).
- **Repo:** GitHub `cwareham-hash/CareerClear-V3`, main branch `main`.
- **Deploy:** Connected to Vercel — **every push to `main` auto-deploys to production** at https://career-clear-v3-iy5k.vercel.app/. This makes the "never commit or push without explicit instruction" rule (Section 5) especially important: a push is a production deploy.

## 2. What Career Clear is and why it exists

Career Clear is an ed-tech platform that helps college students explore and understand career options through immersive virtual simulations. Students virtually "shadow" professionals through a simulated day-in-the-life of roles, experiencing what the work actually feels like before committing to a path.

The problem: students face two compounding challenges. They have limited awareness of the full range of careers available to them, and even for roles they do discover, they cannot understand what the work actually looks like day to day. Existing tools (Google searches, coffee chats, career counseling) are time-consuming, surface-level, and largely unchanged for decades. The core insight is that this problem is experiential, not informational. A student can read what a consultant does; Career Clear lets them experience it. The problem is validated by 20+ customer discovery interviews with current college students.

The platform has two engagement levels: an Exploration level (browsable career library with overviews, skills, education paths, and a recommendation quiz) and a Simulation level (immersive time-blocked work experiences with before/during/after structure and over-the-shoulder commentary from the professional). Simulations are text-based today; the long-term vision is fully audio-visual simulations, so content structures should not assume text-only forever.

Differentiation: the primary competitor, Forage, is employer-funded. Its simulations exist to feed recruiting pipelines and present the polished picture companies want students to see. Career Clear is built exclusively in the student's interest: independent, company-agnostic simulations designed to give an honest picture of each role.

Audience and business model: the initial target market is college students pursuing Investment Banking and Consulting, a concentrated, motivated group with high willingness to pay. Broader expansion covers white collar careers at US 4-year colleges (~14.5M students), then high school students and young professionals. Revenue is B2C student subscriptions (around $20/month), with a B2B path selling to university career centers. Beta users will come from relationships at UChicago and Duke, with a paid launch targeted for the start of Fall 2026.

A historical note for context: the product spec document CareerClear_ProductSpec_v3 (March 2026) was the foundational document this codebase was originally built from. It remains useful for design system details (colors, typography, component specs) but is superseded on key decisions: the four duration tiers are being replaced by three experiential tiers (see Section 4), and name-based localStorage auth is being replaced by Supabase. When the spec and this file conflict, this file wins.

## 3. Current product direction

- We are replacing the four duration tiers (10 min / 30 min / 2 hr / 5 hr) with three experiential tiers: Orientation (10-15 min prose briefing), Day-in-the-Life (45-60 min compressed day with decision points), Full Simulation (3-5 hr multi-day arc with consequences).
- Management Consulting is the only career track getting full simulation content right now. IB and Law simulations will be hidden behind a "coming soon" state; their exploration pages stay live. Once Consulting is validated, IB and Law get built using the identical structure. Do not build for multiple tracks simultaneously.
- Scalability is a hard requirement: adding a future career track must be purely a content exercise (drop in a new content file), never a structural rebuild.
- A Supabase backend (real auth + Postgres) is planned and will replace all localStorage persistence. Until it lands, do not build new features that deepen the localStorage dependency.
- Simulation content files arrive pre-drafted from a separate planning workflow. Claude Code's job is integration, not content writing.

## 4. Project-specific rules and constraints

(Add to this section over time as decisions accumulate.)

- **Design system source of truth:** `CareerClear_ProductSpec_v3.html` §7.5–7.6 (colors, typography, spacing, component specs). Key palette: navy #1a2744, teal #2a9d8f, cream #f8f6f1, gold #d4a017.
- **One content file per career:** simulation content lives in `lib/content/<career>.ts`; the shared structure is defined in `lib/simulation.ts`. New careers must slot in by adding a content file only (see scalability rule in Section 3).
- **Known gap:** the codebase still implements the old four duration tiers and has full content for all four careers; migrating to the three experiential tiers and the Consulting-only rollout is upcoming work, not done.
- **localStorage keys in use:** `cc_quiz_history` (quiz attempts), plus favorites and simulation progress/ratings — all slated for replacement by Supabase.
- **Don't commit scratch files:** Playwright screenshots (`*.png` in root, `.playwright-mcp/`) are temporary artifacts, gitignored as of June 2026.
- **Supabase is live (Phase 2, June 2026):** real email/password auth + Postgres replace localStorage for auth, favorites, progress, and ratings. Client in `lib/supabase.ts`; schema in `supabase/schema.sql` (run manually in the SQL Editor). Quiz history (`cc_quiz_history`) still on localStorage. `tier` columns store the numeric duration as text pending the experiential-tier migration. Email confirmation is ON. Simulations require login **and** `profiles.beta_access = true` (granted manually); exploration stays public.

## 5. Workflow rules (standing — follow these every session)

- **Collin is not a developer.** Explain everything in plain English. Keep recommendations honest and unpadded; clearly distinguish real issues from style preferences.
- **Phase-gate workflow:** NEVER implement changes without first presenting a plan and getting explicit approval. Propose, wait, then act. One item at a time.
- **Never commit or push without explicit instruction.** Pushing to `main` deploys straight to production (see Section 1), so this rule is critical.
- **Visual verification:** for any visual change (layout, spacing, styling, new UI), use the Playwright MCP server to load http://localhost:3000, screenshot the affected page, and verify the result before reporting the work as done.
- **Prompting style:** Collin prefers explicit, directive prompts and reviewing changes before and between phases.
- **Keep this file alive:** when a new standing rule, decision, or reusable pattern emerges in a session, proactively propose adding it to this file at that moment — propose exact wording, wait for approval, never update it silently.
- **Status line (persistent):** A custom status line is configured at the user level in `~/.claude/settings.json` (`statusLine` block) running `~/.claude/statusline.sh`. It shows the model name, current git branch, and a 5-hour rate-limit usage bar (green ≤50%, yellow 51–75%, red >75%). It loads automatically every session — no action needed normally. At session start, if the status line is missing or broken, restore it: re-create `~/.claude/statusline.sh` and the `statusLine` block in `~/.claude/settings.json`.
