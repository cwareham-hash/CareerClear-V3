# Career Clear — Visual & UX Audit (V1)

- **Date captured:** 2026-06-16
- **Base URL:** http://localhost:3000 (local dev server; responded HTTP 200 before capture)
- **Auth state:** Browser was already signed in via Supabase as **Test Tester** (real session; `favorites`, `user_progress`, `profiles` all returned HTTP 200). The simulation flow is gated by Supabase auth + `beta_access`, not a name-entry modal.
- **Method:** Playwright MCP. Each screen captured full-page at three widths — **1440** (desktop), **820** (tablet), **390** (mobile) — unless noted. Close-ups taken for navbar, footer, a career card, and the filter pill row. Computed styles were read from live elements to ground the design-system checks.

## Resolved route list audited

| # | Route | Notes |
|---|-------|-------|
| 1 | `/` | Landing / hero |
| 2 | `/explore` | Careers grid, default (100 careers) |
| 3 | `/explore` (Industry = **Consulting** + search `strategy`) | Filtered state, "5 careers found" |
| 4 | `/explore` (search `zzzxxqq`) | No-results empty state |
| 5 | `/careers/management-consultant` | Career detail |
| 6 | `/careers/management-consultant/orientation` | Orientation reading landing |
| 7 | `/careers/management-consultant/simulate` | Scenario selection — **Project Fresca** (Corporate), **Gateway** (Public Sector), **Atlas** (Financial Services) |
| 8 | `/careers/management-consultant/simulate/fresca` | Sim overview (tier toggle + weekly calendar) + in-sim reading modal |
| 9 | `/questionnaire` | Career quiz (Q1 + mid-flow Q8) |
| 10 | `/dashboard` | Populated dashboard (also contains a live "no quiz results" empty state) |

> **On the "name-entry modal" (Step 4 of the brief):** no name-entry modal was reachable. Simulation entry is now gated by Supabase login (already authenticated as Test Tester). The legacy localStorage name modal appears superseded by Supabase auth. The audit proceeded as the already-authenticated user rather than fabricating a modal that no longer surfaces.

## Overall impression

The product is **visually polished and highly consistent with its own design system** — this is the strongest aspect. Headings render in Playfair Display, body/UI text in Inter, and the navy / teal / cream / gold palette matches the spec almost exactly. Career cards conform precisely to the documented spec (white, 12px radius, 4px teal top accent, teal-filled skill tags), the time-block color legend matches the spec's activity-type colors, the mobile nav collapses to a working hamburger, and there were **zero console errors** across the entire session (only one benign image-preload warning). Empty states exist and are well designed (no-search-results, no-quiz-results).

The **weakest areas are data trust and the long-form reading experience**: simulation progress counts disagree between the simulation overview and the dashboard for the *same* tier (e.g. Day-in-the-Life shows "1 of 7" on the overview but "8/21 blocks" on the dashboard), which undermines confidence in progress tracking. The in-simulation reading modal — the core of the product — is legible but uses a small 14px body, runs a slightly long line length on desktop (~85 characters), and is not exposed to assistive tech as a dialog (no `role="dialog"`, focus is not moved into it on open). There is also literal placeholder text ("(placeholder)") visible in the production footer.

## Findings

| # | Screen | Viewport | Category | Severity | Finding | Screenshot |
|---|--------|----------|----------|----------|---------|------------|
| 1 | Sim overview vs Dashboard | 1440 / 390 | Bug | High | Progress totals **and** completed counts disagree between the Fresca overview and the dashboard for the same tier. Overview: Day-in-the-Life "1 of 7 activities", Full Simulation "5 of 30 activities". Dashboard (same role): Day-in-the-Life "8/21 blocks · 38%", Full Simulation "5/86 blocks · 6%". Different denominators (7 vs 21, 30 vs 86) and different completed counts (1 vs 8) for the identical tier. Erodes trust in progress tracking. | `sim-overview-fresca-full_390.png`, `dashboard_1440.png` |
| 2 | Footer | 1440 | Bug | Med | Literal placeholder copy shipped in user-facing UI: footer reads "Questions? Reach us at contact@careerclear.example **(placeholder)**". | `closeup-footer_1440.png` |
| 3 | Time-block reading modal (desktop) | 1440 | Readability | Med | Reading column runs ~84–87 characters per line (measured paragraph ≈586px at 14px). Comfortable long-form line length is ~50–75 chars; this is on the long side for an immersive read. Consider a tighter max-width on the prose column. | `timeblock-panel-desktop_1440.png` |
| 4 | Time-block reading modal | 1440 / 390 | Accessibility | Med | The reading modal is not exposed as a dialog: no `role="dialog"`/`aria-modal`, and focus is **not** moved into the panel on open (active element stays `<body>`). Keyboard/screen-reader users are not taken to the content; focus-trap/Escape behavior unverified. | `timeblock-panel-desktop_1440.png`, `timeblock-panel-mobile_390.png` |
| 5 | Time-block reading modal | 1440 / 390 | Readability | Low | Reading body text is 14px on both desktop and mobile. For an immersive, multi-paragraph "day in the life" read, 15–16px would be more comfortable for sustained reading. | `timeblock-panel-mobile_390.png` |
| 6 | Footer | 1440 | Accessibility | Low | The footer contact line is low-contrast — white at ~50% opacity on the navy (#1a2744) background. Likely below WCAG AA for this small text size. | `closeup-footer_1440.png` |
| 7 | Explore (search field) | 1440 | Accessibility | Low | The search input has an `aria-label` ("Search careers") but **no visible `<label>`**. Acceptable for screen readers, but a visible label/affordance is absent (relies on placeholder only). | `explore-default_1440.png` |
| 8 | Career detail, Scenario select, Sim overview, Orientation, Quiz, Dashboard | 1440 | Bug | Low | Page `<title>` is the generic "Career Clear — Discover Your Future Career" on every route except the landing and explore. Detail/sim/quiz/dashboard pages do not set a unique document title (SEO/tab-clarity polish). | `career-detail-mc_1440.png` |
| 9 | Global (nav links, cards) | 1440 | Accessibility | Low | Simulation time-block buttons have an explicit `focus-visible:ring-2`, but nav links and career cards have no explicit focus ring and fall back to the default browser outline. Verify a clearly visible keyboard-focus state on all interactive elements. | `closeup-navbar_1440.png` |
| 10 | Landing / hero | 1440 | Design-system | Low | Hero H1 renders at 48px; the product spec lists the hero headline at 40px. Minor and arguably an intentional evolution, but flagged as a deviation from the documented type scale. | `landing_1440.png` |
| 11 | Explore grid | 1440 | Design-system | Low | Explore renders **100 careers** (the spec/notes describe ~10). Not a defect — many extras are correctly marked "Coming Soon" — but worth confirming this catalog scale is intended for the beta. | `explore-default_1440.png` |

### Capture note (not a defect)

The full-page screenshots of the **landing page** (`landing_390/820/1440.png`) show large blank mid-page regions where the "How it works" steps and "Get started" CTA should be. This is a **screenshot artifact, not a production bug**: those sections use Framer Motion scroll-reveal (`whileInView`) animations that begin at `opacity:0` and only animate in when scrolled into view. A single full-page capture does not trigger them. Verified on the live page that the content reveals correctly when scrolled (wrapper opacity animates 0 → 1, transform resets). See `landing-howitworks-revealed_390.png` for the correctly-rendered section.

### What looked strong (no action needed)

- **Design-system adherence is excellent.** Verified via computed styles: H1/H2 Playfair Display (700), body/nav Inter; page bg cream `rgb(248,246,241)` = #f8f6f1; H2 navy `rgb(26,39,68)` = #1a2744; card top accent teal `rgb(42,157,143)` = #2a9d8f. Cards match spec exactly (white, 12px radius, 4px teal top border, teal-filled pills). Filter pills: 9999px radius, 1px border, 13px/500. Time-block legend matches the documented activity-type colors (teal/gold/navy/purple/green).
- **No console errors** anywhere in the session; only one benign `_next/image` preload warning on the landing page.
- **No horizontal overflow** on any page measured (scrollWidth == clientWidth on detail, dashboard, and sim overview).
- **Mobile nav** collapses to a hamburger that opens a working link menu.
- **Mobile reading view** is well structured: Before/During sections, a color legend, and a comfortable ~50 chars/line.
- **Empty states** are implemented and reachable: explore no-results ("No careers match your search" + Clear filters) and dashboard "No quiz results yet" + CTA. Additional dashboard empty states ("No simulations yet", "No saved careers yet", full new-user state) exist in code but were not live-reachable because Test Tester's account is populated.

## Summary counts

**By category**
- Bug: 3 (#1, #2, #8)
- Accessibility: 4 (#4, #6, #7, #9)
- Readability: 2 (#3, #5)
- Design-system: 2 (#10, #11)
- Responsive: 0 (landing capture anomaly was a screenshot artifact, not a defect)

**By severity**
- High: 1 (#1)
- Med: 3 (#2, #3, #4)
- Low: 7 (#5, #6, #7, #8, #9, #10, #11)

**Total findings: 11**

---
VISUAL-AUDIT V1, captured 2026-06-16
