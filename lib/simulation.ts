// lib/simulation.ts — experiential tiers + per-career scenarios
//
// A career has ONE shared Orientation (a short briefing that does not change
// between scenarios) and MANY Scenarios. Each Scenario owns its own
// Day-in-the-Life and Full Simulation. Selecting a tier returns that tier's
// authored TimeBlocks directly — there is no "filter the same blocks by
// duration"; the three tiers are separately authored block sets.

export type ActivityType = 'meeting' | 'independent' | 'team' | 'presentation' | 'learning'
export type Tier = 'orientation' | 'day-in-life' | 'full'

// §7.6.2 colour coding
export const ACTIVITY_COLORS: Record<ActivityType, string> = {
  meeting:      '#2a9d8f', // teal
  independent:  '#1a2744', // navy
  team:         '#d4a017', // gold
  presentation: '#22c55e', // green
  learning:     '#8b5cf6', // purple
}

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  meeting:      'Meeting',
  independent:  'Deep Work',
  team:         'Team Sync',
  presentation: 'Presentation',
  learning:     'Learning',
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

// A Scenario owns the two scenario-level experiences. Orientation is NOT here —
// it lives once at the career level (CareerSim.orientation) and is shared across
// every scenario of that career.
export interface Scenario {
  id:       string
  slug:     string         // human-readable, e.g. 'fresca'
  title:    string         // short scenario name (for the picker)
  scenario: string         // the situation set-up shown in the overview header
  project:  string         // the project name, e.g. "Project Fresca — Restaurant Profit Study"
  tiers: {
    'day-in-life': TimeBlock[]
    full:          TimeBlock[]
  }
}

// A career's simulation: one shared Orientation, plus many Scenarios.
export interface CareerSim {
  careerId:    string
  careerSlug:  string
  title:       string       // career title (e.g. "Management Consultant")
  orientation: TimeBlock[]  // shared across all scenarios
  scenarios:   Scenario[]
}

// A fully-resolved simulation for ONE scenario: the shared career Orientation
// stitched together with that scenario's Day-in-the-Life and Full tiers. This is
// the shape SimulationClient renders (the same three-tier shape as before).
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
}

// ── Phase 5 content imports ────────────────────────────────────────────────────

import { ibAnalystContent }                    from './content/ib-analyst'
import { managementConsultantContent }         from './content/management-consultant'
import { managementConsultantPublicSectorContent } from './content/management-consultant-public-sector'
import { managementConsultantFinancialServicesContent } from './content/management-consultant-financial-services'
import { lawAssociateContent }                 from './content/law-associate'
import { productManagerContent }               from './content/product-manager'

const CONTENT_LOOKUP: Record<string, Record<string, TimeBlockContent>> = {
  'ib-analyst':             ibAnalystContent,
  'management-consultant':  { ...managementConsultantContent, ...managementConsultantPublicSectorContent, ...managementConsultantFinancialServicesContent },
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

// ── CAREER_SIMS ─────────────────────────────────────────────────────────────────

export const CAREER_SIMS: CareerSim[] = [

  // ── Investment Banking Analyst ─────────────────────────────────────────────
  {
    careerId:   'ib-analyst',
    careerSlug: 'investment-banking-analyst',
    title:      'Investment Banking Analyst',
    // Orientation for IB is not authored yet (role hidden behind "Coming Soon").
    orientation: [],
    scenarios: [
      {
        id:       'ib-analyst-project-apex',
        slug:     'project-apex',
        title:    'Project Apex',
        scenario: 'GlobalCorp has retained your bank to advise on a potential $2.5B acquisition of TechVentures Inc., a high-growth SaaS company. You are the lead analyst on the deal team.',
        project:  'TechVentures Acquisition — Project Apex',
        tiers: {
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
    // Real V2 content — career-level Orientation (shared across all scenarios).
    // Prose in lib/content/management-consultant.ts; block ids unchanged.
    // ── Orientation (3 reading blocks, briefing prose) ─────────────────────
    orientation: [
      makeBlock('management-consultant', "management-consultant-orientation-b1", 1, "~4 min read", "What the job actually is, and what you would do all day", 'learning', true),
      makeBlock('management-consultant', "management-consultant-orientation-b2", 1, "~4 min read", "The rhythm, the pyramid, and the machinery nobody explains", 'learning', true),
      makeBlock('management-consultant', "management-consultant-orientation-b3", 1, "~4 min read", "The honest trade, and how to tell if it is you", 'learning', true),
    ],
    scenarios: [
      {
        id:       'management-consultant-fresca',
        slug:     'fresca',
        title:    'Project Fresca',
        scenario: 'An 8-week profit-improvement study for Fresca, a 240-location fast-casual chain recently bought by a private equity firm whose value-creation plan calls for $30M in profit improvement. You are a first-year Associate, three months in, owning the labor-cost workstream. It is week 3 of 8, and the week ends with the first Steering Committee presentation to Fresca\'s CEO and the sponsor.',
        project:  'Project Fresca — Restaurant Profit Study',
        tiers: {
          // ── Day in the Life (one Wednesday deck day, 7 blocks) ─────────────────
          'day-in-life': [
            makeBlock('management-consultant', "management-consultant-dil-d1-b1", 1, "6:45 to 8:00 AM", "Hotel morning: the calm before", 'learning'),
            makeBlock('management-consultant', "management-consultant-dil-d1-b2", 1, "8:00 to 9:00 AM", "Storyline huddle: the dot-dash", 'team'),
            makeBlock('management-consultant', "management-consultant-dil-d1-b3", 1, "9:00 AM to 12:30 PM", "The build sprint", 'independent'),
            makeBlock('management-consultant', "management-consultant-dil-d1-b4", 1, "2:00 to 3:30 PM", "The Dan review: half your pages die", 'team'),
            makeBlock('management-consultant', "management-consultant-dil-d1-b5", 1, "4:00 to 8:00 PM", "Rebuild: answer-first", 'independent'),
            makeBlock('management-consultant', "management-consultant-dil-d1-b6", 1, "8:00 to 10:45 PM", "The late night: version 9 and the final pass", 'team'),
            makeBlock('management-consultant', "management-consultant-dil-d1-b7", 1, "10:45 to 11:15 PM", "The walk back: what today actually was", 'learning'),
          ],
          // ── Full Simulation (Sunday night through Friday, 30 blocks) ───────────
          full: [
            makeBlock('management-consultant', "management-consultant-full-d0-b1", 0, "8:00 to 10:00 PM", "The Sunday reset", 'learning'),
            makeBlock('management-consultant', "management-consultant-full-d1-b1", 1, "5:45 to 7:50 AM", "The Monday migration", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d1-b2", 1, "8:30 to 9:30 AM", "War room check-in: planning the week backward", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d1-b3", 1, "9:30 AM to 12:30 PM", "Into the data: finding the thread", 'independent'),
            makeBlock('management-consultant', "management-consultant-full-d1-b4", 1, "1:00 to 2:30 PM", "Problem-solving session: Priya finds the hole", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d1-b5", 1, "3:00 to 6:30 PM", "The rebuild: does the finding survive?", 'independent'),
            makeBlock('management-consultant', "management-consultant-full-d1-b6", 1, "7:30 to 10:00 PM", "Team dinner, and the email sweep", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d2-b1", 2, "7:00 to 8:00 AM", "The drive out: Marcus's field briefing", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d2-b2", 2, "8:00 to 10:30 AM", "Store visit: watching the overtime happen", 'meeting'),
            makeBlock('management-consultant', "management-consultant-full-d2-b3", 2, "11:00 AM to 12:00 PM", "The defensive interview", 'meeting'),
            makeBlock('management-consultant', "management-consultant-full-d2-b4", 2, "1:30 to 4:00 PM", "Synthesis: from notes to \"so what\"", 'independent'),
            makeBlock('management-consultant', "management-consultant-full-d2-b5", 2, "4:00 to 5:00 PM", "Coaching session: what you missed", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d2-b6", 2, "5:00 to 8:30 PM", "Evening build: ghost pages and the hotel gym", 'independent'),
            makeBlock('management-consultant', "management-consultant-full-d3-b1", 3, "8:00 to 9:00 AM", "Storyline huddle: the dot-dash", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d3-b2", 3, "9:00 AM to 12:30 PM", "The build sprint", 'independent'),
            makeBlock('management-consultant', "management-consultant-full-d3-b3", 3, "2:00 to 3:30 PM", "The Dan review: half your pages die", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d3-b4", 3, "4:00 to 8:00 PM", "Rebuild: answer-first", 'independent'),
            makeBlock('management-consultant', "management-consultant-full-d3-b5", 3, "8:00 to 10:45 PM", "The late night: version 9 and the final pass", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d4-b1", 4, "7:30 to 8:45 AM", "Dry run: getting handed the pen", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d4-b2", 4, "9:30 to 10:30 AM", "The pre-wire: no surprises", 'meeting'),
            makeBlock('management-consultant', "management-consultant-full-d4-b3", 4, "12:40 to 2:10 PM", "The scramble: 80 minutes, one question", 'independent'),
            makeBlock('management-consultant', "management-consultant-full-d4-b4", 4, "3:00 to 4:30 PM", "SteerCo: the question comes to you", 'presentation'),
            makeBlock('management-consultant', "management-consultant-full-d4-b5", 4, "4:45 to 5:30 PM", "Debrief in the lobby", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d4-b6", 4, "6:30 to 9:15 PM", "The flight home", 'learning'),
            makeBlock('management-consultant', "management-consultant-full-d5-b1", 5, "9:00 to 10:00 AM", "Team debrief call: the week 4 sprint takes shape", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d5-b2", 5, "10:00 AM to 12:00 PM", "The cleanup: documentation, hygiene, and a staffing email", 'independent'),
            makeBlock('management-consultant', "management-consultant-full-d5-b3", 5, "1:00 to 2:00 PM", "Coffee with Marcus: the honest career conversation", 'learning'),
            makeBlock('management-consultant', "management-consultant-full-d5-b4", 5, "2:30 to 4:00 PM", "Friday training: the partner masterclass", 'learning'),
            makeBlock('management-consultant', "management-consultant-full-d5-b5", 5, "4:00 to 4:45 PM", "Week wrap with Priya: the feedback ritual", 'team'),
            makeBlock('management-consultant', "management-consultant-full-d5-b6", 5, "7:00 to 8:00 PM", "The week, weighed", 'learning'),
          ],
        },
      },
      {
        id:       'management-consultant-public-sector',
        slug:     'public-sector',
        title:    'Project Gateway',
        scenario: 'A 10-week operational review for the Hartwell State Department of Human Services, which processes Medicaid and SNAP benefits through 38 county offices. Applications take months, families are waiting, and a new set of federal renewal and work-requirement rules takes effect in 14 weeks, roughly doubling the agency\'s workload. You are a first-year Associate, three months in, owning the county-operations workstream: why some offices clear applications in days and others take months under identical rules. The week ends with a Steering Committee presentation to the Commissioner.',
        project:  'Project Gateway: State Benefits Backlog Review',
        tiers: {
          // Day in the Life (one county field day, 7 blocks)
          'day-in-life': [
            makeBlock('management-consultant', "management-consultant-public-sector-dil-d1-b1", 1, "7:15 to 8:30 AM", "The drive out to Eastwood County", 'team'),
            makeBlock('management-consultant', "management-consultant-public-sector-dil-d1-b2", 1, "8:45 to 9:45 AM", "Walking the floor before the office opens", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-dil-d1-b3", 1, "9:45 to 11:00 AM", "Shadowing a caseworker", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-dil-d1-b4", 1, "11:00 to 11:45 AM", "The caseworker's break: turnover, burnout, and the human cost", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-dil-d1-b5", 1, "11:45 AM to 12:15 PM", "Closing with the office manager", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-dil-d1-b6", 1, "1:30 to 3:00 PM", "Reconciling the floor against the data", 'independent'),
            makeBlock('management-consultant', "management-consultant-public-sector-dil-d1-b7", 1, "3:00 to 4:00 PM", "Debrief with the engagement manager", 'team'),
          ],
          // Full Simulation (Sunday night through Friday, 29 blocks)
          full: [
            makeBlock('management-consultant', "management-consultant-public-sector-full-d0-b1", 0, "8:00 to 10:00 PM", "The Sunday reset before the capital", 'learning'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d1-b1", 1, "5:45 to 8:45 AM", "The Monday migration", 'team'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d1-b2", 1, "9:00 to 10:00 AM", "War room: planning the week backward from Thursday", 'team'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d1-b3", 1, "10:00 AM to 1:00 PM", "Into the data: where the five-fold gap lives", 'independent'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d1-b4", 1, "2:00 to 3:30 PM", "Meeting the deputy: the most important skeptic in the building", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d1-b5", 1, "3:45 to 5:30 PM", "The internal AI tool and the benchmark hunt", 'independent'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d1-b6", 1, "7:00 to 9:30 PM", "Team dinner, and the conversation about the career", 'team'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d2-b1", 2, "7:15 to 8:45 AM", "The drive out to Eastwood County", 'team'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d2-b2", 2, "8:45 to 9:45 AM", "Walking the floor before the office opens", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d2-b3", 2, "9:45 to 11:00 AM", "Shadowing a caseworker", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d2-b4", 2, "11:00 to 11:45 AM", "The break room: turnover, burnout, and the human cost", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d2-b5", 2, "11:45 AM to 12:30 PM", "Closing with the office manager, and the real blocker", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d2-b6", 2, "2:00 to 4:30 PM", "Reconciling the floor against the data, and the debrief", 'independent'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d3-b1", 3, "8:00 to 9:30 AM", "Building the storyline before the slides", 'independent'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d3-b2", 3, "9:30 AM to 12:30 PM", "The problem-solving session: the partner sharpens the edge", 'team'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d3-b3", 3, "1:30 to 2:30 PM", "The governance story, in full", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d3-b4", 3, "3:00 to 7:00 PM", "Building the deck", 'independent'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d3-b5", 3, "7:30 to 8:15 PM", "The pre-wire: no surprises in the room", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d4-b1", 4, "7:30 to 8:45 AM", "The dry run", 'team'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d4-b2", 4, "1:30 to 1:50 PM", "Managing up: the partner and the Commissioner", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d4-b3", 4, "2:00 to 2:40 PM", "The Steering Committee", 'presentation'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d4-b4", 4, "2:40 to 3:10 PM", "The hard questions", 'presentation'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d4-b5", 4, "3:10 to 3:30 PM", "The decision", 'meeting'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d4-b6", 4, "6:30 to 9:00 PM", "The flight home", 'learning'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d5-b1", 5, "9:00 to 10:00 AM", "The home-office debrief", 'team'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d5-b2", 5, "10:00 to 10:40 AM", "The career conversation", 'learning'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d5-b3", 5, "11:00 AM to 12:30 PM", "Documenting the win and scoping what is next", 'independent'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d5-b4", 5, "2:00 to 2:30 PM", "The line outside the door", 'learning'),
            makeBlock('management-consultant', "management-consultant-public-sector-full-d5-b5", 5, "4:00 to 4:30 PM", "Closing the week", 'learning'),
          ],
        },
      },
      {
        id:       'management-consultant-financial-services',
        slug:     'financial-services',
        title:    'Project Atlas',
        scenario: 'A 9-week target operating model engagement for Cascade Public Pension Fund, a $90B fund insourcing its investment management to cut external fees and gain control. You are a first-year Associate, three months in, owning the middle-office workstream. The central question: the binding constraint on insourcing is not the front office but the middle office, specifically the data layer and the Investment Book of Record. The week builds to an Investment Committee presentation on what to build in-house, what to outsource, and how to sequence it safely.',
        project:  'Project Atlas: Pension Fund Operating Model',
        tiers: {
          // Day in the Life (one TOM design day, 7 blocks)
          'day-in-life': [
            makeBlock('management-consultant', "management-consultant-financial-services-dil-d1-b1", 1, "8:00 to 9:00 AM", "The whiteboard: Devin draws the three offices", 'team'),
            makeBlock('management-consultant', "management-consultant-financial-services-dil-d1-b2", 1, "9:20 to 10:30 AM", "The realist: interviewing the head of operations", 'meeting'),
            makeBlock('management-consultant', "management-consultant-financial-services-dil-d1-b3", 1, "10:45 to 11:45 AM", "The ambition: meeting the CIO", 'meeting'),
            makeBlock('management-consultant', "management-consultant-financial-services-dil-d1-b4", 1, "12:00 to 1:30 PM", "Mapping the middle-office capability gap", 'independent'),
            makeBlock('management-consultant', "management-consultant-financial-services-dil-d1-b5", 1, "2:00 to 3:00 PM", "The custodian call: understanding the outsource option", 'meeting'),
            makeBlock('management-consultant', "management-consultant-financial-services-dil-d1-b6", 1, "3:15 to 5:00 PM", "Building the build-versus-outsource framework", 'independent'),
            makeBlock('management-consultant', "management-consultant-financial-services-dil-d1-b7", 1, "5:15 to 6:15 PM", "Debrief with the engagement manager", 'team'),
          ],
          // Full Simulation (Sunday night through Friday, 27 blocks)
          full: [
            makeBlock('management-consultant', "management-consultant-financial-services-full-d0-b1", 0, "8:00 to 10:00 PM", "The Sunday reset", 'learning'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d1-b1", 1, "5:45 to 8:45 AM", "The Monday migration", 'team'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d1-b2", 1, "9:00 to 10:00 AM", "War room: planning backward from the Investment Committee", 'team'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d1-b3", 1, "10:00 AM to 1:00 PM", "Mastering the current state", 'independent'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d1-b4", 1, "4:00 to 5:00 PM", "The CIO kickoff: meeting the ambition", 'meeting'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d1-b5", 1, "5:15 to 6:45 PM", "Benchmarking the Canadian model", 'independent'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d1-b6", 1, "7:30 to 9:30 PM", "Team dinner, and the conversation about the career", 'team'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d2-b1", 2, "8:00 to 8:45 AM", "The whiteboard: Devin draws the three offices", 'team'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d2-b2", 2, "9:00 to 10:30 AM", "The realist: interviewing the COO", 'meeting'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d2-b3", 2, "11:00 AM to 12:15 PM", "The risk officer: you cannot manage what you cannot see", 'meeting'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d2-b4", 2, "1:30 to 4:30 PM", "Synthesizing the gap before the design", 'independent'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d3-b1", 3, "8:00 to 9:30 AM", "Structuring the design", 'independent'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d3-b2", 3, "10:00 to 11:30 AM", "The problem-solving session: the partner sharpens it", 'team'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d3-b3", 3, "1:00 to 2:00 PM", "The custodian call: the outsource option", 'meeting'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d3-b4", 3, "2:15 to 5:00 PM", "Building the recommendation", 'independent'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d3-b5", 3, "5:15 to 6:00 PM", "The pre-wire: routing the truth through the COO", 'meeting'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d4-b1", 4, "7:30 to 8:45 AM", "The dry run", 'team'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d4-b2", 4, "1:15 to 1:40 PM", "Managing up: the partner and the CIO", 'meeting'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d4-b3", 4, "2:00 to 2:45 PM", "The Investment Committee", 'presentation'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d4-b4", 4, "2:45 to 3:15 PM", "The hard questions", 'presentation'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d4-b5", 4, "3:15 to 3:35 PM", "The decision", 'meeting'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d4-b6", 4, "6:30 to 9:00 PM", "The flight home", 'learning'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d5-b1", 5, "9:00 to 10:00 AM", "The home-office debrief", 'team'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d5-b2", 5, "10:00 to 10:40 AM", "The career conversation", 'learning'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d5-b3", 5, "11:00 AM to 12:30 PM", "Documenting the decision and scoping what is next", 'independent'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d5-b4", 5, "2:00 to 2:30 PM", "What the week was about", 'learning'),
            makeBlock('management-consultant', "management-consultant-financial-services-full-d5-b5", 5, "4:00 to 4:30 PM", "Closing the week", 'learning'),
          ],
        },
      },
    ],
  },

  // ── Law Associate ──────────────────────────────────────────────────────────
  {
    careerId:   'law-associate',
    careerSlug: 'law-associate',
    title:      'Law Associate',
    // Orientation for Law is not authored yet (role hidden behind "Coming Soon").
    orientation: [],
    scenarios: [
      {
        id:       'law-associate-hartwell-series-c',
        slug:     'hartwell-series-c',
        title:    'Hartwell Series C',
        scenario: 'Hartwell Technologies is raising a $45M Series C led by Summit Ventures. Your firm represents Hartwell through the transaction. You are the junior associate on the deal.',
        project:  'Hartwell Technologies — Series C Financing',
        tiers: {
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
    // Orientation for PM is not authored yet (role hidden behind "Coming Soon").
    orientation: [],
    scenarios: [
      {
        id:       'product-manager-payquick-launch',
        slug:     'payquick-launch',
        title:    'PayQuick Launch',
        scenario: 'PayQuick is launching real-time payment notifications — a top-requested feature by 68% of users. You are the PM leading the cross-functional launch team.',
        project:  'PayQuick — Real-Time Notifications Launch',
        tiers: {
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
      orientation:   careerSim.orientation,
      'day-in-life': sc.tiers['day-in-life'],
      full:          sc.tiers.full,
    },
  }
}

/** Blocks for a given tier of a resolved simulation (direct lookup, no filtering). */
export function getTierBlocks(simulation: Simulation, tier: Tier): TimeBlock[] {
  return simulation.tiers[tier]
}

/**
 * All authored blocks for a tier across a whole career. Orientation is
 * career-level (returned directly); Day-in-the-Life and Full are aggregated
 * across every scenario. Used by the dashboard rollup so no scenario's blocks
 * are dropped when a career has more than one scenario.
 */
export function getCareerTierBlocks(careerSim: CareerSim, tier: Tier): TimeBlock[] {
  if (tier === 'orientation') return careerSim.orientation
  return careerSim.scenarios.flatMap((s) => s.tiers[tier])
}
