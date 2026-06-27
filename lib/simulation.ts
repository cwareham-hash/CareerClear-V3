// lib/simulation.ts — experiential tiers + per-career scenarios
//
// A career has ONE shared Orientation (a short briefing that does not change
// between scenarios) and MANY Scenarios. Each Scenario owns its own
// Day-in-the-Life and Full Simulation. Selecting a tier returns that tier's
// authored TimeBlocks directly — there is no "filter the same blocks by
// duration"; the three tiers are separately authored block sets.

export type ActivityType = 'meeting' | 'independent' | 'team' | 'presentation' | 'learning' | 'social'
export type Tier = 'orientation' | 'day-in-life' | 'full'

// §7.6.2 colour coding
export const ACTIVITY_COLORS: Record<ActivityType, string> = {
  meeting:      '#2a9d8f', // teal
  independent:  '#1a2744', // navy
  team:         '#d4a017', // gold
  presentation: '#22c55e', // green
  learning:     '#8b5cf6', // purple
  social:       '#e76f51', // coral (relationship/social blocks, e.g. a client dinner)
}

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  meeting:      'Meeting',
  independent:  'Deep Work',
  team:         'Team Sync',
  presentation: 'Presentation',
  learning:     'Learning',
  social:       'Social',
}

// The three experiential tiers, in display order.
export const TIERS: { value: Tier; display: string; label: string }[] = [
  { value: 'orientation', display: 'Orientation',     label: 'Short briefing'         },
  { value: 'day-in-life', display: 'Day in the Life',  label: 'One representative day'  },
  { value: 'full',        display: 'Full Simulation',  label: 'Complete multi-day arc' },
]

export interface TimeBlockContent {
  before:        string
  simulatedWork: string
  commentary:    string
  after:         string
  // Optional work product (a deck page, tracker, guide). Markdown — tables, code
  // fences, bold, and bullets — rendered as a styled "Work Product" panel. Used by
  // individual-work blocks whose output is the artifact rather than dialogue.
  artifact?:     string
}

export interface TimeBlock {
  id:           string
  day:          number       // 0 = Sunday; orientation/day-in-life span fewer days than full
  timeRange:    string
  title:        string
  activityType: ActivityType
  content:      TimeBlockContent
  // When true, the During section is briefing prose (paragraphs), not screenplay —
  // rendered as clean body text rather than parsed as dialogue. Used by Orientation.
  briefing?:    boolean
}

// A non-clickable "connector" slot on the Full Simulation week grid: lunch,
// heads-down time, commute, or an interview the user does not sit in on. It shows
// the real hour-by-hour shape of the week WITHOUT being enterable — it carries no
// content and no activity color (rendered grey), and never opens the panel. It is
// NOT an activity: connectors are excluded from the "X of Y activities" count.
export interface ConnectorSlot {
  day:   number   // 1 = Mon … 5 = Fri (matches the full-week block days)
  start: string   // e.g. '8:00' — business-day 12h; used for time-order placement
  end:   string   // e.g. '8:30'
  label: string   // short description, e.g. 'Lunch'
}

// A Scenario is a fully self-contained PROJECT: it owns all three experiential
// tiers, including its own per-project Orientation. (Orientation used to live
// once at the career level and be shared; it is now a property of each project.)
export interface Scenario {
  id:       string
  slug:     string         // human-readable, e.g. 'fresca'
  title:    string         // short project codename, e.g. 'Project Fresca'
  type?:    string         // user-facing category label, e.g. 'Corporate' (type-first cards)
  scenario: string         // the situation set-up shown in the overview header
  project:  string         // the project name, e.g. "Project Fresca — Restaurant Profit Study"
  // When true the project is not surfaced anywhere a user picks projects (hub
  // grid, focus card, chips, dashboard rollup). Its data and routes still resolve
  // by direct URL — this is a visibility flag, not a deletion. Flip to false (or
  // remove) to un-hide.
  hidden?:  boolean
  tiers: {
    orientation:   TimeBlock[]
    'day-in-life': TimeBlock[]
    full:          TimeBlock[]
  }
  // Greyed, non-enterable schedule slots for the Full Simulation week grid only.
  connectors?: ConnectorSlot[]
}

// A career's simulation: many self-contained Scenarios (each owns its own
// Orientation). No career-level Orientation any more.
export interface CareerSim {
  careerId:    string
  careerSlug:  string
  title:       string       // career title (e.g. "Management Consultant")
  scenarios:   Scenario[]
}

// A fully-resolved simulation for ONE scenario: that project's own Orientation,
// Day-in-the-Life, and Full tiers. This is the shape SimulationClient renders.
export interface Simulation {
  careerId:     string
  careerSlug:   string
  scenarioSlug: string
  title:        string   // career title (small label above the project)
  scenario:     string   // scenario situation
  project:      string   // scenario project name
  tiers: {
    orientation:   TimeBlock[]
    'day-in-life': TimeBlock[]
    full:          TimeBlock[]
  }
  connectors?: ConnectorSlot[]   // Full-week grey schedule slots (non-enterable)
}

// ── Phase 5 content imports ────────────────────────────────────────────────────

import { ibAnalystContent }                    from './content/ib-analyst'
import { managementConsultantMeridianContent } from './content/management-consultant-meridian'
import { lawAssociateContent }                 from './content/law-associate'
import { productManagerContent }               from './content/product-manager'

const CONTENT_LOOKUP: Record<string, Record<string, TimeBlockContent>> = {
  'ib-analyst':             ibAnalystContent,
  'management-consultant':  managementConsultantMeridianContent,
  'law-associate':          lawAssociateContent,
  'product-manager':        productManagerContent,
}

const FALLBACK_CONTENT: TimeBlockContent = {
  before:        'Prepare your materials and review any prior context before this session begins.',
  simulatedWork: 'You engage thoughtfully, contribute your analysis, and move the work forward.',
  commentary:    'Every activity in a professional environment is an opportunity to demonstrate judgment, preparation, and the ability to learn quickly from experience.',
  after:         'Document your key outputs and flag any follow-ups for the next session.',
}

// ── Block factories ───────────────────────────────────────────────────────────

// General factory: takes an explicit block id (used by orientation/day-in-life,
// whose ids are segmented by tier, e.g. "management-consultant-orientation-b1").
function makeBlock(
  careerId: string,
  blockId: string,
  day: number,
  timeRange: string,
  title: string,
  activityType: ActivityType,
  briefing = false,
): TimeBlock {
  const content = CONTENT_LOOKUP[careerId]?.[blockId] ?? FALLBACK_CONTENT
  return { id: blockId, day, timeRange, title, activityType, content, briefing }
}

// Full-tier convenience: derives the id from day/block number, preserving the
// existing "${careerId}-d${day}-b${bNum}" ids so authored content keeps matching.
function b(
  careerId: string,
  day: number,
  bNum: number,
  timeRange: string,
  title: string,
  activityType: ActivityType,
): TimeBlock {
  return makeBlock(careerId, `${careerId}-d${day}-b${bNum}`, day, timeRange, title, activityType)
}

// ── Management Consultant — per-project orientation block sets ─────────────────

// Project Meridian — the new self-contained project. Four-reading per-project
// Orientation (client/world; situation; engagement/cast; seat/vocabulary); the
// full Monday-to-Friday Full Simulation (19 blocks); and the curated six-block
// Day-in-the-Life.
const MERIDIAN_ORIENTATION: TimeBlock[] = [
  makeBlock('management-consultant', "management-consultant-meridian-orientation-b1", 1, "~3 min read", "The client and its world", 'learning', true),
  makeBlock('management-consultant', "management-consultant-meridian-orientation-b2", 1, "~3 min read", "The situation and why we are here", 'learning', true),
  makeBlock('management-consultant', "management-consultant-meridian-orientation-b3", 1, "~3 min read", "The engagement and the cast", 'learning', true),
  makeBlock('management-consultant', "management-consultant-meridian-orientation-b4", 1, "~4 min read", "Your seat and the vocabulary", 'learning', true),
]

// Full Simulation — Monday (1) through Friday (5), blocks 1–19. The dinner (15)
// and learning (18) blocks are info cards (briefing prose), not screenplay.
const MERIDIAN_FULL: TimeBlock[] = [
  // Monday (day 1) — blocks 1–5
  makeBlock('management-consultant', "management-consultant-meridian-full-d1-b1", 1, "8:30 to 9:15 AM",      "Team week-kickoff",                  'team'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d1-b2", 1, "9:15 to 9:30 AM",      "Carly and Marcus debrief",           'team'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d1-b3", 1, "9:30 to 11:00 AM",     "Interview prep",                     'independent'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d1-b4", 1, "11:00 AM to 12:30 PM", "Theme analysis and synthesis",       'independent'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d1-b5", 1, "1:30 to 3:30 PM",      "Ghost deck and storyline skeleton",  'independent'),
  // Tuesday (day 2) — blocks 6–8
  makeBlock('management-consultant', "management-consultant-meridian-full-d2-b1", 2, "9:00 to 9:30 AM",      "Investor interview: Ellen",          'meeting'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d2-b2", 2, "9:45 to 10:45 AM",     "Note cleanup",                       'independent'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d2-b3", 2, "11:30 AM to 12:15 PM", "Investor interview: Raymond",        'meeting'),
  // Wednesday (day 3) — blocks 9–10
  makeBlock('management-consultant', "management-consultant-meridian-full-d3-b1", 3, "11:00 AM to 12:00 PM", "Problem-solving session: theme shaping", 'team'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d3-b2", 3, "1:00 to 3:00 PM",      "Deck section build",                 'independent'),
  // Thursday (day 4) — blocks 11–15
  makeBlock('management-consultant', "management-consultant-meridian-full-d4-b1", 4, "9:00 to 10:00 AM",     "Deck review with Marcus",            'team'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d4-b2", 4, "10:00 AM to 12:00 PM", "Revise the deck section",            'independent'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d4-b3", 4, "2:00 to 3:00 PM",      "Client stakeholder checkpoint",      'meeting'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d4-b4", 4, "3:00 to 3:30 PM",      "Post-checkpoint debrief",            'team'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d4-b5", 4, "6:30 to 8:00 PM",      "Team dinner with the client",        'social', true),
  // Friday (day 5) — blocks 16–19
  makeBlock('management-consultant', "management-consultant-meridian-full-d5-b1", 5, "9:00 to 10:00 AM",     "Senior Manager deck review",         'team'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d5-b2", 5, "10:30 AM to 12:00 PM", "Engagement economics",               'independent'),
  makeBlock('management-consultant', "management-consultant-meridian-full-d5-b3", 5, "1:00 to 2:00 PM",      "Learning block: private markets primer", 'learning', true),
  makeBlock('management-consultant', "management-consultant-meridian-full-d5-b4", 5, "3:30 to 4:00 PM",      "Week wrap",                          'team'),
]

// Day-in-the-Life — one curated representative day (6 blocks).
const MERIDIAN_DITL: TimeBlock[] = [
  makeBlock('management-consultant', "management-consultant-meridian-dil-d1-b1", 1, "8:30 to 9:15 AM",      "The team frames the day",            'team'),
  makeBlock('management-consultant', "management-consultant-meridian-dil-d1-b2", 1, "9:30 to 10:00 AM",     "Investor interview: Ellen",          'meeting'),
  makeBlock('management-consultant', "management-consultant-meridian-dil-d1-b3", 1, "10:00 to 11:00 AM",    "Note cleanup",                       'independent'),
  makeBlock('management-consultant', "management-consultant-meridian-dil-d1-b4", 1, "11:30 AM to 12:30 PM", "Problem-solving session: theme shaping", 'team'),
  makeBlock('management-consultant', "management-consultant-meridian-dil-d1-b5", 1, "1:00 to 3:00 PM",      "Deck section build",                 'independent'),
  makeBlock('management-consultant', "management-consultant-meridian-dil-d1-b6", 1, "3:30 to 4:30 PM",      "Deck review with Marcus",            'team'),
]

// Greyed, non-enterable connector slots for the Full Simulation week (C14). These
// fill the gaps around the 19 enterable blocks (lunch, heads-down time, email,
// interviews Carly does not sit in on) to show the real shape of the week. They
// are NOT activities and never count toward completion. Times use the same
// business-day format as the block headers; the grid places each slot in time
// order between the enterable blocks.
const MERIDIAN_CONNECTORS: ConnectorSlot[] = [
  // Monday (1)
  { day: 1, start: '8:00',  end: '8:30',  label: 'Arrive, email, settle in' },
  { day: 1, start: '12:30', end: '1:30',  label: 'Lunch' },
  { day: 1, start: '3:30',  end: '5:30',  label: 'Heads-down, refining the guide and theme tracker' },
  { day: 1, start: '5:30',  end: '6:30',  label: "Email, wrap, prep for tomorrow's interviews" },
  // Tuesday (2)
  { day: 2, start: '8:00',  end: '9:00',  label: 'Arrive, email, final interview prep' },
  { day: 2, start: '10:45', end: '11:30', label: 'Investor interview (not entered)' },
  { day: 2, start: '12:15', end: '1:15',  label: 'Lunch' },
  { day: 2, start: '1:15',  end: '2:00',  label: 'Investor interview (not entered)' },
  { day: 2, start: '2:00',  end: '3:30',  label: 'Heads-down, cleaning up interview notes' },
  { day: 2, start: '3:30',  end: '4:15',  label: 'Investor interview (not entered)' },
  { day: 2, start: '4:15',  end: '5:30',  label: 'Internal coordination, email' },
  { day: 2, start: '5:30',  end: '6:30',  label: 'Wrap, prep for tomorrow' },
  // Wednesday (3)
  { day: 3, start: '8:00',  end: '9:00',  label: 'Arrive, email, prep' },
  { day: 3, start: '9:00',  end: '9:45',  label: 'Investor interview (not entered)' },
  { day: 3, start: '9:45',  end: '11:00', label: 'Heads-down, note cleanup and theme tracker updates' },
  { day: 3, start: '12:00', end: '1:00',  label: 'Lunch' },
  { day: 3, start: '3:00',  end: '5:00',  label: 'Heads-down, continuing the section, then sending the draft to Marcus' },
  { day: 3, start: '5:00',  end: '6:30',  label: 'Email, wrap' },
  // Thursday (4)
  { day: 4, start: '8:00',  end: '9:00',  label: 'Arrive, email, prep for the deck review' },
  { day: 4, start: '12:00', end: '1:00',  label: 'Lunch' },
  { day: 4, start: '1:00',  end: '2:00',  label: 'Heads-down, finishing revisions and prepping for the client checkpoint' },
  { day: 4, start: '3:30',  end: '5:30',  label: 'Heads-down, incorporating checkpoint feedback, email' },
  { day: 4, start: '5:30',  end: '6:00',  label: 'Freshen up before dinner' },
  // Friday (5)
  { day: 5, start: '8:00',  end: '9:00',  label: 'Arrive, email, prep' },
  { day: 5, start: '10:00', end: '10:30', label: "Quick reset, incorporating David's notes" },
  { day: 5, start: '12:00', end: '1:00',  label: 'Lunch' },
  { day: 5, start: '2:00',  end: '3:30',  label: "Heads-down, applying David's feedback to the deck" },
  { day: 5, start: '4:00',  end: '5:00',  label: 'Email, wrap, Friday wind-down' },
]

// ── CAREER_SIMS ─────────────────────────────────────────────────────────────────

export const CAREER_SIMS: CareerSim[] = [

  // ── Investment Banking Analyst ─────────────────────────────────────────────
  {
    careerId:   'ib-analyst',
    careerSlug: 'investment-banking-analyst',
    title:      'Investment Banking Analyst',
    // IB is hidden behind "Coming Soon"; no orientation authored yet.
    scenarios: [
      {
        id:       'ib-analyst-project-apex',
        slug:     'project-apex',
        title:    'Project Apex',
        scenario: 'GlobalCorp has retained your bank to advise on a potential $2.5B acquisition of TechVentures Inc., a high-growth SaaS company. You are the lead analyst on the deal team.',
        project:  'TechVentures Acquisition — Project Apex',
        tiers: {
          orientation: [],
          // Day-in-the-Life is not authored yet; the full arc is preserved below.
          'day-in-life': [],
          full: [
            // Day 1 — Deal Kick-off
            b('ib-analyst', 1, 1, '9:00–9:30 AM',    'Morning Team Stand-up',               'meeting'),
            b('ib-analyst', 1, 2, '10:00–11:30 AM',  'Target Company Background Research',  'learning'),
            b('ib-analyst', 1, 3, '1:00–3:00 PM',    'Deal Kick-off Call with Client',      'meeting'),
            b('ib-analyst', 1, 4, '3:30–5:30 PM',    'Comparable Companies Analysis',       'independent'),
            b('ib-analyst', 1, 5, '6:00–9:00 PM',    'Preliminary Valuation Model',         'independent'),
            // Day 2 — Financial Modeling
            b('ib-analyst', 2, 1, '9:00–9:30 AM',    'Morning Check-in with Associate',     'meeting'),
            b('ib-analyst', 2, 2, '10:00–12:00 PM',  'DCF Model Build',                     'independent'),
            b('ib-analyst', 2, 3, '1:30–3:00 PM',    'Model Review Session',                'team'),
            b('ib-analyst', 2, 4, '3:30–6:00 PM',    'LBO Analysis',                        'independent'),
            b('ib-analyst', 2, 5, '6:00–9:00 PM',    'Sensitivity Analysis & Outputs',      'independent'),
            // Day 3 — Due Diligence
            b('ib-analyst', 3, 1, '9:30–10:00 AM',   'Deal Status Call',                    'meeting'),
            b('ib-analyst', 3, 2, '10:30–12:00 PM',  'Due Diligence Document Review',       'learning'),
            b('ib-analyst', 3, 3, '1:00–2:30 PM',    'Management Interview: CFO',           'meeting'),
            b('ib-analyst', 3, 4, '3:00–5:30 PM',    'Risk Factor Analysis',                'independent'),
            b('ib-analyst', 3, 5, '6:00–9:00 PM',    'Due Diligence Memo Draft',            'independent'),
            // Day 4 — Pitch Book
            b('ib-analyst', 4, 1, '9:00–9:30 AM',    'Pitch Book Planning Session',         'team'),
            b('ib-analyst', 4, 2, '10:00–12:00 PM',  'Executive Summary Slides',            'independent'),
            b('ib-analyst', 4, 3, '1:00–3:00 PM',    'Financial Analysis Slides',           'independent'),
            b('ib-analyst', 4, 4, '3:30–6:00 PM',    'Internal Review with MD',             'team'),
            b('ib-analyst', 4, 5, '6:30–9:30 PM',    'Final Pitch Book Polish',             'independent'),
            // Day 5 — Board Presentation
            b('ib-analyst', 5, 1, '9:00–9:30 AM',    'Prep Briefing with Managing Director','meeting'),
            b('ib-analyst', 5, 2, '10:00–11:00 AM',  'Final Team Run-through',              'team'),
            b('ib-analyst', 5, 3, '11:00 AM–12:30 PM','Board Presentation',                 'presentation'),
            b('ib-analyst', 5, 4, '2:00–4:00 PM',    'Client Q&A and Debrief',             'meeting'),
            b('ib-analyst', 5, 5, '4:30–7:00 PM',    'Deal Update Memo and Next Steps',    'independent'),
          ],
        },
      },
    ],
  },

  // ── Management Consultant ──────────────────────────────────────────────────
  {
    careerId:   'management-consultant',
    careerSlug: 'management-consultant',
    title:      'Management Consultant',
    // Each project owns its orientation. Meridian is the only project: it has its
    // own four-reading per-project orientation, a curated Day-in-the-Life, and the
    // full Monday-to-Friday week.
    scenarios: [
      {
        // ── Project Meridian (new, self-contained) ─────────────────────────
        // Complete: four-reading orientation, curated Day-in-the-Life (6 blocks),
        // and the full Monday-to-Friday week (19 blocks).
        id:       'management-consultant-meridian',
        slug:     'meridian',
        title:    'Project Meridian',
        type:     'Financial Services',
        scenario: 'A six-week assessment of the Meridian Park investor portal — the platform thirty institutional investors use to pull statements, performance, and documents on the private-markets money Meridian manages for them. Leadership suspects the portal is falling behind and needs an outside, market-benchmarked read on what to fix and in what order. You shadow Carly, a first-year analyst, owning the interview synthesis and the first section of the recommendation deck. It is week 3 of 6.',
        project:  'Project Meridian — Investor Portal Assessment',
        tiers: {
          orientation:   MERIDIAN_ORIENTATION,
          'day-in-life': MERIDIAN_DITL,
          full:          MERIDIAN_FULL,
        },
        connectors: MERIDIAN_CONNECTORS,
      },
    ],
  },

  // ── Law Associate ──────────────────────────────────────────────────────────
  {
    careerId:   'law-associate',
    careerSlug: 'law-associate',
    title:      'Law Associate',
    // Law is hidden behind "Coming Soon"; no orientation authored yet.
    scenarios: [
      {
        id:       'law-associate-hartwell-series-c',
        slug:     'hartwell-series-c',
        title:    'Hartwell Series C',
        scenario: 'Hartwell Technologies is raising a $45M Series C led by Summit Ventures. Your firm represents Hartwell through the transaction. You are the junior associate on the deal.',
        project:  'Hartwell Technologies — Series C Financing',
        tiers: {
          orientation: [],
          'day-in-life': [],
          full: [
            // Day 1 — Deal Orientation
            b('law-associate', 1, 1, '9:30–10:00 AM',  'Partner Briefing',                        'meeting'),
            b('law-associate', 1, 2, '10:30–12:00 PM', 'Transaction Document Review',             'learning'),
            b('law-associate', 1, 3, '1:00–2:30 PM',   'Kick-off Call with Client and Investors', 'meeting'),
            b('law-associate', 1, 4, '3:00–5:30 PM',   'Due Diligence Checklist Preparation',     'independent'),
            b('law-associate', 1, 5, '5:30–8:30 PM',   'Corporate Records Review',                'independent'),
            // Day 2 — Due Diligence
            b('law-associate', 2, 1, '9:00–9:30 AM',   'Deal Status Call',                        'meeting'),
            b('law-associate', 2, 2, '10:00–12:00 PM', 'IP Portfolio Review',                     'independent'),
            b('law-associate', 2, 3, '1:00–3:00 PM',   'Material Contracts Analysis',             'independent'),
            b('law-associate', 2, 4, '3:30–6:00 PM',   'Due Diligence Report Drafting',           'independent'),
            b('law-associate', 2, 5, '6:00–9:00 PM',   'Regulatory Compliance Review',            'independent'),
            // Day 3 — Contract Drafting
            b('law-associate', 3, 1, '9:00–9:30 AM',   'Daily Deal Sync',                         'meeting'),
            b('law-associate', 3, 2, '10:00–12:00 PM', 'Stock Purchase Agreement Draft',          'independent'),
            b('law-associate', 3, 3, '1:30–3:00 PM',   'Investor Rights Agreement Draft',         'independent'),
            b('law-associate', 3, 4, '3:30–6:00 PM',   'Negotiation Call with Opposing Counsel',  'meeting'),
            b('law-associate', 3, 5, '6:00–9:00 PM',   'Markup Revision and Commentary',          'independent'),
            // Day 4 — Closing Prep
            b('law-associate', 4, 1, '9:00–9:30 AM',   'Closing Checklist Review',                'team'),
            b('law-associate', 4, 2, '10:00–12:00 PM', 'Board Consent Resolutions',               'independent'),
            b('law-associate', 4, 3, '1:00–3:00 PM',   'Closing Certificate Preparation',         'independent'),
            b('law-associate', 4, 4, '3:30–5:30 PM',   'Pre-closing Call with All Parties',       'meeting'),
            b('law-associate', 4, 5, '5:30–8:30 PM',   'Final Document Preparation',              'independent'),
            // Day 5 — Closing
            b('law-associate', 5, 1, '9:30–10:00 AM',  'Closing Logistics Call',                  'team'),
            b('law-associate', 5, 2, '10:30–12:00 PM', 'Closing Coordination with Escrow',        'meeting'),
            b('law-associate', 5, 3, '1:00–3:00 PM',   'Closing Call and Document Execution',     'presentation'),
            b('law-associate', 5, 4, '3:30–5:30 PM',   'Post-closing Filing Review',              'independent'),
            b('law-associate', 5, 5, '5:30–8:00 PM',   'Closing Set Compilation',                 'independent'),
          ],
        },
      },
    ],
  },

  // ── Product Manager ────────────────────────────────────────────────────────
  {
    careerId:   'product-manager',
    careerSlug: 'product-manager',
    title:      'Product Manager',
    // PM is hidden behind "Coming Soon"; no orientation authored yet.
    scenarios: [
      {
        id:       'product-manager-payquick-launch',
        slug:     'payquick-launch',
        title:    'PayQuick Launch',
        scenario: 'PayQuick is launching real-time payment notifications — a top-requested feature by 68% of users. You are the PM leading the cross-functional launch team.',
        project:  'PayQuick — Real-Time Notifications Launch',
        tiers: {
          orientation: [],
          'day-in-life': [],
          full: [
            // Day 1 — Discovery Sprint
            b('product-manager', 1, 1, '9:00–9:30 AM',   'Sprint Planning Stand-up',             'meeting'),
            b('product-manager', 1, 2, '10:00–11:30 AM', 'User Research Review',                 'learning'),
            b('product-manager', 1, 3, '1:00–3:00 PM',   'Stakeholder Alignment Meeting',        'meeting'),
            b('product-manager', 1, 4, '3:30–5:00 PM',   'Feature Prioritization Workshop',      'team'),
            b('product-manager', 1, 5, '5:00–7:30 PM',   'Product Requirements Document',        'independent'),
            // Day 2 — Requirements
            b('product-manager', 2, 1, '9:00–9:30 AM',   'Daily Scrum',                          'meeting'),
            b('product-manager', 2, 2, '10:00–12:00 PM', 'Technical Requirements Spec',          'independent'),
            b('product-manager', 2, 3, '1:30–3:00 PM',   'Design Review with UX',                'meeting'),
            b('product-manager', 2, 4, '3:30–5:30 PM',   'Engineering Estimation Session',       'team'),
            b('product-manager', 2, 5, '5:30–8:00 PM',   'PRD Refinement and Sign-off',          'independent'),
            // Day 3 — Design Review
            b('product-manager', 3, 1, '9:00–9:30 AM',   'Morning Check-in',                     'meeting'),
            b('product-manager', 3, 2, '10:00–11:30 AM', 'Prototype Walkthrough',                'meeting'),
            b('product-manager', 3, 3, '1:00–2:30 PM',   'User Testing Session Observation',     'learning'),
            b('product-manager', 3, 4, '3:00–5:30 PM',   'Feedback Synthesis and Iteration',     'independent'),
            b('product-manager', 3, 5, '5:30–8:00 PM',   'Updated Feature Spec',                 'independent'),
            // Day 4 — Engineering Sync
            b('product-manager', 4, 1, '9:00–9:30 AM',   'Sprint Sync',                          'meeting'),
            b('product-manager', 4, 2, '10:00–12:00 PM', 'Tech Deep-Dive with Backend Team',     'team'),
            b('product-manager', 4, 3, '1:30–3:00 PM',   'Launch Metrics Definition',            'independent'),
            b('product-manager', 4, 4, '3:30–5:00 PM',   'Risk Review and Mitigation Planning',  'meeting'),
            b('product-manager', 4, 5, '5:00–7:30 PM',   'Go-to-Market Brief',                   'independent'),
            // Day 5 — Launch Prep
            b('product-manager', 5, 1, '9:00–9:30 AM',   'Launch Readiness Stand-up',            'meeting'),
            b('product-manager', 5, 2, '10:00–11:30 AM', 'Launch Runbook Review',                'team'),
            b('product-manager', 5, 3, '1:00–2:30 PM',   'Leadership Sign-off Presentation',     'presentation'),
            b('product-manager', 5, 4, '3:00–5:00 PM',   'Cross-functional Launch Coordination', 'team'),
            b('product-manager', 5, 5, '5:00–7:30 PM',   'Post-launch Monitoring Plan',          'independent'),
          ],
        },
      },
    ],
  },
]

// ── Lookups ─────────────────────────────────────────────────────────────────────

export function getCareerSim(careerSlug: string): CareerSim | undefined {
  return CAREER_SIMS.find((c) => c.careerSlug === careerSlug)
}

/**
 * Normalize a time range for display so every block reads consistently with a
 * "to" connector (e.g. "9:00–9:30 AM" → "9:00 to 9:30 AM"). En/em dashes between
 * times become " to "; strings without a dash (e.g. "~4 min read") pass through.
 */
export function formatTimeRange(timeRange: string): string {
  return timeRange.replace(/\s*[–—]\s*/g, ' to ')
}

/** Resolve one scenario into a renderable Simulation (career Orientation + scenario tiers). */
export function getScenario(careerSlug: string, scenarioSlug: string): Simulation | undefined {
  const careerSim = getCareerSim(careerSlug)
  if (!careerSim) return undefined
  const sc = careerSim.scenarios.find((s) => s.slug === scenarioSlug)
  if (!sc) return undefined
  return {
    careerId:     careerSim.careerId,
    careerSlug:   careerSim.careerSlug,
    scenarioSlug: sc.slug,
    title:        careerSim.title,
    scenario:     sc.scenario,
    project:      sc.project,
    tiers: {
      orientation:   sc.tiers.orientation,
      'day-in-life': sc.tiers['day-in-life'],
      full:          sc.tiers.full,
    },
    connectors: sc.connectors,
  }
}

/** Blocks for a given tier of a resolved simulation (direct lookup, no filtering). */
export function getTierBlocks(simulation: Simulation, tier: Tier): TimeBlock[] {
  return simulation.tiers[tier]
}

/**
 * All authored blocks for a tier across a whole career, aggregated across every
 * scenario and de-duplicated by block id. Used by the dashboard so no scenario's
 * blocks are dropped when a career has many projects. (Block ids are unique per
 * project today; the dedupe is a cheap safeguard kept for that rollup.)
 */
export function getCareerTierBlocks(careerSim: CareerSim, tier: Tier): TimeBlock[] {
  const seen = new Set<string>()
  const out: TimeBlock[] = []
  for (const s of careerSim.scenarios) {
    for (const b of s.tiers[tier]) {
      if (seen.has(b.id)) continue
      seen.add(b.id)
      out.push(b)
    }
  }
  return out
}
