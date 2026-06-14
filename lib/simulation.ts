// lib/simulation.ts — experiential tiers (orientation / day-in-life / full)
//
// Each simulation holds ONE project (shared scenario/project) and THREE
// separately authored tiers. A tier is just its own list of TimeBlocks; there
// is no more "filter the same blocks by duration" — selecting a tier returns
// simulation.tiers[selectedTier] directly.

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
  day:          number       // 1-based; orientation/day-in-life span fewer days than full
  timeRange:    string
  title:        string
  activityType: ActivityType
  content:      TimeBlockContent
}

export interface Simulation {
  careerId:   string
  slug:       string
  title:      string
  scenario:   string
  project:    string
  // Three separately authored block sets — NOT filtered subsets of each other.
  tiers: {
    orientation:   TimeBlock[]
    'day-in-life': TimeBlock[]
    full:          TimeBlock[]
  }
}

// ── Phase 5 content imports ────────────────────────────────────────────────────

import { ibAnalystContent }             from './content/ib-analyst'
import { managementConsultantContent }  from './content/management-consultant'
import { lawAssociateContent }          from './content/law-associate'
import { productManagerContent }        from './content/product-manager'

const CONTENT_LOOKUP: Record<string, Record<string, TimeBlockContent>> = {
  'ib-analyst':             ibAnalystContent,
  'management-consultant':  managementConsultantContent,
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
): TimeBlock {
  const content = CONTENT_LOOKUP[careerId]?.[blockId] ?? FALLBACK_CONTENT
  return { id: blockId, day, timeRange, title, activityType, content }
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

// ── SIMULATIONS ───────────────────────────────────────────────────────────────

export const SIMULATIONS: Simulation[] = [

  // ── Investment Banking Analyst ─────────────────────────────────────────────
  {
    careerId: 'ib-analyst',
    slug:     'investment-banking-analyst',
    title:    'Investment Banking Analyst',
    scenario: 'GlobalCorp has retained your bank to advise on a potential $2.5B acquisition of TechVentures Inc., a high-growth SaaS company. You are the lead analyst on the deal team.',
    project:  'TechVentures Acquisition — Project Apex',
    tiers: {
      // Orientation and Day-in-the-Life for IB are not authored yet (the role is
      // hidden behind "Coming Soon"); the full arc is preserved below.
      orientation:   [],
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

  // ── Management Consultant ──────────────────────────────────────────────────
  {
    careerId: 'management-consultant',
    slug:     'management-consultant',
    title:    'Management Consultant',
    scenario: 'Meridian Retail, an $800M regional retailer, has engaged your firm to identify $50M in cost savings without compromising customer experience. You are the lead analyst on a four-person team.',
    project:  'Meridian Retail Cost Transformation',
    tiers: {
      // ── Orientation — PLACEHOLDER (2–3 short briefing blocks) ──────────────
      // Real orientation content is authored separately and dropped in next.
      orientation: [
        makeBlock('management-consultant', 'management-consultant-orientation-b1', 1, 'Briefing · Part 1', 'PLACEHOLDER — Engagement Overview',      'learning'),
        makeBlock('management-consultant', 'management-consultant-orientation-b2', 1, 'Briefing · Part 2', 'PLACEHOLDER — The Role You Play',        'learning'),
        makeBlock('management-consultant', 'management-consultant-orientation-b3', 1, 'Briefing · Part 3', 'PLACEHOLDER — What Success Looks Like',  'learning'),
      ],
      // ── Day in the Life — PLACEHOLDER (one representative day, 5 blocks) ────
      'day-in-life': [
        makeBlock('management-consultant', 'management-consultant-dil-d1-b1', 1, '9:00–9:30 AM',  'PLACEHOLDER — Morning Team Standup',   'meeting'),
        makeBlock('management-consultant', 'management-consultant-dil-d1-b2', 1, '9:30–12:00 PM', 'PLACEHOLDER — Cost Analysis Block',    'independent'),
        makeBlock('management-consultant', 'management-consultant-dil-d1-b3', 1, '1:00–2:30 PM',  'PLACEHOLDER — Stakeholder Interview',  'meeting'),
        makeBlock('management-consultant', 'management-consultant-dil-d1-b4', 1, '2:30–5:00 PM',  'PLACEHOLDER — Findings Synthesis',     'independent'),
        makeBlock('management-consultant', 'management-consultant-dil-d1-b5', 1, '5:00–6:00 PM',  'PLACEHOLDER — End-of-Day Team Debrief','team'),
      ],
      // ── Full Simulation — the complete, real, existing consulting content ───
      full: [
        // Day 1 — Client Kick-off
        b('management-consultant', 1, 1, '9:00–9:30 AM',    'Team Alignment Call',                    'meeting'),
        b('management-consultant', 1, 2, '10:00–12:00 PM',  'Client Industry Research',               'learning'),
        b('management-consultant', 1, 3, '1:00–3:00 PM',    'Client Kick-off Workshop',               'meeting'),
        b('management-consultant', 1, 4, '3:30–5:30 PM',    'Hypothesis Tree Development',            'team'),
        b('management-consultant', 1, 5, '6:00–9:00 PM',    'Work Plan and Timeline Build',           'independent'),
        // Day 2 — Data Gathering
        b('management-consultant', 2, 1, '9:00–9:30 AM',    'Daily Standup',                          'meeting'),
        b('management-consultant', 2, 2, '10:00–12:00 PM',  'Stakeholder Interviews: Operations',     'meeting'),
        b('management-consultant', 2, 3, '1:30–3:00 PM',    'Stakeholder Interviews: Finance',        'meeting'),
        b('management-consultant', 2, 4, '3:30–6:00 PM',    'Interview Synthesis',                    'independent'),
        b('management-consultant', 2, 5, '6:00–9:00 PM',    'Data Model Setup',                       'independent'),
        // Day 3 — Analysis
        b('management-consultant', 3, 1, '9:30–10:00 AM',   'Check-in with Engagement Manager',       'meeting'),
        b('management-consultant', 3, 2, '10:30–12:00 PM',  'Cost Benchmarking Analysis',             'independent'),
        b('management-consultant', 3, 3, '1:00–3:00 PM',    'Supply Chain Opportunity Assessment',    'independent'),
        b('management-consultant', 3, 4, '3:30–5:30 PM',    'Mid-point Team Scrub',                   'team'),
        b('management-consultant', 3, 5, '6:00–9:00 PM',    'Findings Quantification',                'independent'),
        // Day 4 — Recommendations
        b('management-consultant', 4, 1, '9:00–9:30 AM',    'Story-lining Session',                   'team'),
        b('management-consultant', 4, 2, '10:00–12:00 PM',  'Recommendation Deck Structure',          'independent'),
        b('management-consultant', 4, 3, '1:30–3:00 PM',    'Internal Review with Senior Manager',    'team'),
        b('management-consultant', 4, 4, '3:30–6:00 PM',    'Executive Slides Build',                 'independent'),
        b('management-consultant', 4, 5, '6:00–9:00 PM',    'Implementation Roadmap',                 'independent'),
        // Day 5 — Client Readout
        b('management-consultant', 5, 1, '9:00–9:30 AM',    'Partner Pre-brief',                      'meeting'),
        b('management-consultant', 5, 2, '10:00–11:00 AM',  'Final Dry Run Presentation',             'team'),
        b('management-consultant', 5, 3, '11:30 AM–1:00 PM','Client Readout Presentation',            'presentation'),
        b('management-consultant', 5, 4, '2:00–4:00 PM',    'Client Q&A Session',                    'meeting'),
        b('management-consultant', 5, 5, '4:30–7:30 PM',    'Revised Proposal and Follow-ups',        'independent'),
      ],
    },
  },

  // ── Law Associate ──────────────────────────────────────────────────────────
  {
    careerId: 'law-associate',
    slug:     'law-associate',
    title:    'Law Associate',
    scenario: 'Hartwell Technologies is raising a $45M Series C led by Summit Ventures. Your firm represents Hartwell through the transaction. You are the junior associate on the deal.',
    project:  'Hartwell Technologies — Series C Financing',
    tiers: {
      orientation:   [],
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

  // ── Product Manager ────────────────────────────────────────────────────────
  {
    careerId: 'product-manager',
    slug:     'product-manager',
    title:    'Product Manager',
    scenario: 'PayQuick is launching real-time payment notifications — a top-requested feature by 68% of users. You are the PM leading the cross-functional launch team.',
    project:  'PayQuick — Real-Time Notifications Launch',
    tiers: {
      orientation:   [],
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
]

export function getSimulation(slug: string): Simulation | undefined {
  return SIMULATIONS.find((s) => s.slug === slug)
}

/** Blocks for a given tier of a simulation (no filtering — direct lookup). */
export function getTierBlocks(simulation: Simulation, tier: Tier): TimeBlock[] {
  return simulation.tiers[tier]
}
