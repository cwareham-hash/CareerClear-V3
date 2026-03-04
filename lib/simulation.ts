// lib/simulation.ts — Phase 5: full AI-generated simulation content

export type ActivityType = 'meeting' | 'independent' | 'team' | 'presentation' | 'learning'
export type DurationOption = 10 | 30 | 120 | 300

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

export const DURATION_OPTIONS: { value: DurationOption; display: string; label: string }[] = [
  { value: 10,  display: '10 min',  label: 'Key highlights'  },
  { value: 30,  display: '30 min',  label: 'Main activities' },
  { value: 120, display: '2 hours', label: 'Detailed view'   },
  { value: 300, display: '5 hours', label: 'Full immersion'  },
]

export interface TimeBlockContent {
  before:        string
  simulatedWork: string
  commentary:    string
  after:         string
}

export interface TimeBlock {
  id:           string
  day:          1 | 2 | 3 | 4 | 5
  timeRange:    string
  title:        string
  activityType: ActivityType
  minDuration:  DurationOption
  content:      TimeBlockContent
}

export interface Simulation {
  careerId:   string
  slug:       string
  title:      string
  scenario:   string
  project:    string
  timeBlocks: TimeBlock[]
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

// ── Block factory ─────────────────────────────────────────────────────────────

function b(
  careerId: string,
  day: 1|2|3|4|5,
  bNum: 1|2|3|4|5,
  timeRange: string,
  title: string,
  activityType: ActivityType,
  minDuration: DurationOption,
): TimeBlock {
  const blockId = `${careerId}-d${day}-b${bNum}`
  const content = CONTENT_LOOKUP[careerId]?.[blockId] ?? {
    before:        'Prepare your materials and review any prior context before this session begins.',
    simulatedWork: 'You engage thoughtfully, contribute your analysis, and move the work forward.',
    commentary:    'Every activity in a professional environment is an opportunity to demonstrate judgment, preparation, and the ability to learn quickly from experience.',
    after:         'Document your key outputs and flag any follow-ups for the next session.',
  }
  return { id: blockId, day, timeRange, title, activityType, minDuration, content }
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
    timeBlocks: [
      // Day 1 — Deal Kick-off
      b('ib-analyst', 1, 1, '9:00–9:30 AM',    'Morning Team Stand-up',               'meeting',      10),
      b('ib-analyst', 1, 2, '10:00–11:30 AM',  'Target Company Background Research',  'learning',     30),
      b('ib-analyst', 1, 3, '1:00–3:00 PM',    'Deal Kick-off Call with Client',      'meeting',      30),
      b('ib-analyst', 1, 4, '3:30–5:30 PM',    'Comparable Companies Analysis',       'independent', 120),
      b('ib-analyst', 1, 5, '6:00–9:00 PM',    'Preliminary Valuation Model',         'independent', 300),
      // Day 2 — Financial Modeling
      b('ib-analyst', 2, 1, '9:00–9:30 AM',    'Morning Check-in with Associate',     'meeting',      10),
      b('ib-analyst', 2, 2, '10:00–12:00 PM',  'DCF Model Build',                     'independent',  30),
      b('ib-analyst', 2, 3, '1:30–3:00 PM',    'Model Review Session',                'team',         30),
      b('ib-analyst', 2, 4, '3:30–6:00 PM',    'LBO Analysis',                        'independent', 120),
      b('ib-analyst', 2, 5, '6:00–9:00 PM',    'Sensitivity Analysis & Outputs',      'independent', 300),
      // Day 3 — Due Diligence
      b('ib-analyst', 3, 1, '9:30–10:00 AM',   'Deal Status Call',                    'meeting',      10),
      b('ib-analyst', 3, 2, '10:30–12:00 PM',  'Due Diligence Document Review',       'learning',     30),
      b('ib-analyst', 3, 3, '1:00–2:30 PM',    'Management Interview: CFO',           'meeting',      30),
      b('ib-analyst', 3, 4, '3:00–5:30 PM',    'Risk Factor Analysis',                'independent', 120),
      b('ib-analyst', 3, 5, '6:00–9:00 PM',    'Due Diligence Memo Draft',            'independent', 300),
      // Day 4 — Pitch Book
      b('ib-analyst', 4, 1, '9:00–9:30 AM',    'Pitch Book Planning Session',         'team',         10),
      b('ib-analyst', 4, 2, '10:00–12:00 PM',  'Executive Summary Slides',            'independent',  30),
      b('ib-analyst', 4, 3, '1:00–3:00 PM',    'Financial Analysis Slides',           'independent',  30),
      b('ib-analyst', 4, 4, '3:30–6:00 PM',    'Internal Review with MD',             'team',        120),
      b('ib-analyst', 4, 5, '6:30–9:30 PM',    'Final Pitch Book Polish',             'independent', 300),
      // Day 5 — Board Presentation
      b('ib-analyst', 5, 1, '9:00–9:30 AM',    'Prep Briefing with Managing Director','meeting',      10),
      b('ib-analyst', 5, 2, '10:00–11:00 AM',  'Final Team Run-through',              'team',         30),
      b('ib-analyst', 5, 3, '11:00 AM–12:30 PM','Board Presentation',                 'presentation', 30),
      b('ib-analyst', 5, 4, '2:00–4:00 PM',    'Client Q&A and Debrief',             'meeting',     120),
      b('ib-analyst', 5, 5, '4:30–7:00 PM',    'Deal Update Memo and Next Steps',    'independent', 300),
    ],
  },

  // ── Management Consultant ──────────────────────────────────────────────────
  {
    careerId: 'management-consultant',
    slug:     'management-consultant',
    title:    'Management Consultant',
    scenario: 'Meridian Retail, an $800M regional retailer, has engaged your firm to identify $50M in cost savings without compromising customer experience. You are the lead analyst on a four-person team.',
    project:  'Meridian Retail Cost Transformation',
    timeBlocks: [
      // Day 1 — Client Kick-off
      b('management-consultant', 1, 1, '9:00–9:30 AM',    'Team Alignment Call',                    'meeting',      10),
      b('management-consultant', 1, 2, '10:00–12:00 PM',  'Client Industry Research',               'learning',     30),
      b('management-consultant', 1, 3, '1:00–3:00 PM',    'Client Kick-off Workshop',               'meeting',      30),
      b('management-consultant', 1, 4, '3:30–5:30 PM',    'Hypothesis Tree Development',            'team',        120),
      b('management-consultant', 1, 5, '6:00–9:00 PM',    'Work Plan and Timeline Build',           'independent', 300),
      // Day 2 — Data Gathering
      b('management-consultant', 2, 1, '9:00–9:30 AM',    'Daily Standup',                          'meeting',      10),
      b('management-consultant', 2, 2, '10:00–12:00 PM',  'Stakeholder Interviews: Operations',     'meeting',      30),
      b('management-consultant', 2, 3, '1:30–3:00 PM',    'Stakeholder Interviews: Finance',        'meeting',      30),
      b('management-consultant', 2, 4, '3:30–6:00 PM',    'Interview Synthesis',                    'independent', 120),
      b('management-consultant', 2, 5, '6:00–9:00 PM',    'Data Model Setup',                       'independent', 300),
      // Day 3 — Analysis
      b('management-consultant', 3, 1, '9:30–10:00 AM',   'Check-in with Engagement Manager',       'meeting',      10),
      b('management-consultant', 3, 2, '10:30–12:00 PM',  'Cost Benchmarking Analysis',             'independent',  30),
      b('management-consultant', 3, 3, '1:00–3:00 PM',    'Supply Chain Opportunity Assessment',    'independent',  30),
      b('management-consultant', 3, 4, '3:30–5:30 PM',    'Mid-point Team Scrub',                   'team',        120),
      b('management-consultant', 3, 5, '6:00–9:00 PM',    'Findings Quantification',                'independent', 300),
      // Day 4 — Recommendations
      b('management-consultant', 4, 1, '9:00–9:30 AM',    'Story-lining Session',                   'team',         10),
      b('management-consultant', 4, 2, '10:00–12:00 PM',  'Recommendation Deck Structure',          'independent',  30),
      b('management-consultant', 4, 3, '1:30–3:00 PM',    'Internal Review with Senior Manager',    'team',         30),
      b('management-consultant', 4, 4, '3:30–6:00 PM',    'Executive Slides Build',                 'independent', 120),
      b('management-consultant', 4, 5, '6:00–9:00 PM',    'Implementation Roadmap',                 'independent', 300),
      // Day 5 — Client Readout
      b('management-consultant', 5, 1, '9:00–9:30 AM',    'Partner Pre-brief',                      'meeting',      10),
      b('management-consultant', 5, 2, '10:00–11:00 AM',  'Final Dry Run Presentation',             'team',         30),
      b('management-consultant', 5, 3, '11:30 AM–1:00 PM','Client Readout Presentation',            'presentation', 30),
      b('management-consultant', 5, 4, '2:00–4:00 PM',    'Client Q&A Session',                    'meeting',     120),
      b('management-consultant', 5, 5, '4:30–7:30 PM',    'Revised Proposal and Follow-ups',        'independent', 300),
    ],
  },

  // ── Law Associate ──────────────────────────────────────────────────────────
  {
    careerId: 'law-associate',
    slug:     'law-associate',
    title:    'Law Associate',
    scenario: 'Hartwell Technologies is raising a $45M Series C led by Summit Ventures. Your firm represents Hartwell through the transaction. You are the junior associate on the deal.',
    project:  'Hartwell Technologies — Series C Financing',
    timeBlocks: [
      // Day 1 — Deal Orientation
      b('law-associate', 1, 1, '9:30–10:00 AM',  'Partner Briefing',                        'meeting',      10),
      b('law-associate', 1, 2, '10:30–12:00 PM', 'Transaction Document Review',             'learning',     30),
      b('law-associate', 1, 3, '1:00–2:30 PM',   'Kick-off Call with Client and Investors', 'meeting',      30),
      b('law-associate', 1, 4, '3:00–5:30 PM',   'Due Diligence Checklist Preparation',     'independent', 120),
      b('law-associate', 1, 5, '5:30–8:30 PM',   'Corporate Records Review',                'independent', 300),
      // Day 2 — Due Diligence
      b('law-associate', 2, 1, '9:00–9:30 AM',   'Deal Status Call',                        'meeting',      10),
      b('law-associate', 2, 2, '10:00–12:00 PM', 'IP Portfolio Review',                     'independent',  30),
      b('law-associate', 2, 3, '1:00–3:00 PM',   'Material Contracts Analysis',             'independent',  30),
      b('law-associate', 2, 4, '3:30–6:00 PM',   'Due Diligence Report Drafting',           'independent', 120),
      b('law-associate', 2, 5, '6:00–9:00 PM',   'Regulatory Compliance Review',            'independent', 300),
      // Day 3 — Contract Drafting
      b('law-associate', 3, 1, '9:00–9:30 AM',   'Daily Deal Sync',                         'meeting',      10),
      b('law-associate', 3, 2, '10:00–12:00 PM', 'Stock Purchase Agreement Draft',          'independent',  30),
      b('law-associate', 3, 3, '1:30–3:00 PM',   'Investor Rights Agreement Draft',         'independent',  30),
      b('law-associate', 3, 4, '3:30–6:00 PM',   'Negotiation Call with Opposing Counsel',  'meeting',     120),
      b('law-associate', 3, 5, '6:00–9:00 PM',   'Markup Revision and Commentary',          'independent', 300),
      // Day 4 — Closing Prep
      b('law-associate', 4, 1, '9:00–9:30 AM',   'Closing Checklist Review',                'team',         10),
      b('law-associate', 4, 2, '10:00–12:00 PM', 'Board Consent Resolutions',               'independent',  30),
      b('law-associate', 4, 3, '1:00–3:00 PM',   'Closing Certificate Preparation',         'independent',  30),
      b('law-associate', 4, 4, '3:30–5:30 PM',   'Pre-closing Call with All Parties',       'meeting',     120),
      b('law-associate', 4, 5, '5:30–8:30 PM',   'Final Document Preparation',              'independent', 300),
      // Day 5 — Closing
      b('law-associate', 5, 1, '9:30–10:00 AM',  'Closing Logistics Call',                  'team',         10),
      b('law-associate', 5, 2, '10:30–12:00 PM', 'Closing Coordination with Escrow',        'meeting',      30),
      b('law-associate', 5, 3, '1:00–3:00 PM',   'Closing Call and Document Execution',     'presentation', 30),
      b('law-associate', 5, 4, '3:30–5:30 PM',   'Post-closing Filing Review',              'independent', 120),
      b('law-associate', 5, 5, '5:30–8:00 PM',   'Closing Set Compilation',                 'independent', 300),
    ],
  },

  // ── Product Manager ────────────────────────────────────────────────────────
  {
    careerId: 'product-manager',
    slug:     'product-manager',
    title:    'Product Manager',
    scenario: 'PayQuick is launching real-time payment notifications — a top-requested feature by 68% of users. You are the PM leading the cross-functional launch team.',
    project:  'PayQuick — Real-Time Notifications Launch',
    timeBlocks: [
      // Day 1 — Discovery Sprint
      b('product-manager', 1, 1, '9:00–9:30 AM',   'Sprint Planning Stand-up',             'meeting',      10),
      b('product-manager', 1, 2, '10:00–11:30 AM', 'User Research Review',                 'learning',     30),
      b('product-manager', 1, 3, '1:00–3:00 PM',   'Stakeholder Alignment Meeting',        'meeting',      30),
      b('product-manager', 1, 4, '3:30–5:00 PM',   'Feature Prioritization Workshop',      'team',        120),
      b('product-manager', 1, 5, '5:00–7:30 PM',   'Product Requirements Document',        'independent', 300),
      // Day 2 — Requirements
      b('product-manager', 2, 1, '9:00–9:30 AM',   'Daily Scrum',                          'meeting',      10),
      b('product-manager', 2, 2, '10:00–12:00 PM', 'Technical Requirements Spec',          'independent',  30),
      b('product-manager', 2, 3, '1:30–3:00 PM',   'Design Review with UX',                'meeting',      30),
      b('product-manager', 2, 4, '3:30–5:30 PM',   'Engineering Estimation Session',       'team',        120),
      b('product-manager', 2, 5, '5:30–8:00 PM',   'PRD Refinement and Sign-off',          'independent', 300),
      // Day 3 — Design Review
      b('product-manager', 3, 1, '9:00–9:30 AM',   'Morning Check-in',                     'meeting',      10),
      b('product-manager', 3, 2, '10:00–11:30 AM', 'Prototype Walkthrough',                'meeting',      30),
      b('product-manager', 3, 3, '1:00–2:30 PM',   'User Testing Session Observation',     'learning',     30),
      b('product-manager', 3, 4, '3:00–5:30 PM',   'Feedback Synthesis and Iteration',     'independent', 120),
      b('product-manager', 3, 5, '5:30–8:00 PM',   'Updated Feature Spec',                 'independent', 300),
      // Day 4 — Engineering Sync
      b('product-manager', 4, 1, '9:00–9:30 AM',   'Sprint Sync',                          'meeting',      10),
      b('product-manager', 4, 2, '10:00–12:00 PM', 'Tech Deep-Dive with Backend Team',     'team',         30),
      b('product-manager', 4, 3, '1:30–3:00 PM',   'Launch Metrics Definition',            'independent',  30),
      b('product-manager', 4, 4, '3:30–5:00 PM',   'Risk Review and Mitigation Planning',  'meeting',     120),
      b('product-manager', 4, 5, '5:00–7:30 PM',   'Go-to-Market Brief',                   'independent', 300),
      // Day 5 — Launch Prep
      b('product-manager', 5, 1, '9:00–9:30 AM',   'Launch Readiness Stand-up',            'meeting',      10),
      b('product-manager', 5, 2, '10:00–11:30 AM', 'Launch Runbook Review',                'team',         30),
      b('product-manager', 5, 3, '1:00–2:30 PM',   'Leadership Sign-off Presentation',     'presentation', 30),
      b('product-manager', 5, 4, '3:00–5:00 PM',   'Cross-functional Launch Coordination', 'team',        120),
      b('product-manager', 5, 5, '5:00–7:30 PM',   'Post-launch Monitoring Plan',          'independent', 300),
    ],
  },
]

export function getSimulation(slug: string): Simulation | undefined {
  return SIMULATIONS.find((s) => s.slug === slug)
}
