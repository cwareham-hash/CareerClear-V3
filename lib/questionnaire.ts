// ── Questionnaire data for Career Clear Phase 3 ──────────────────────────────
// §5.3 — Typeform-style one-question-at-a-time flow
// §5.3.2 — Five question dimensions
//
// DECISIONS NOT SPECIFIED IN SPEC:
//   - Exact question text and answer choices (spec names 5 dimensions only)
//   - 15 questions chosen (spec says maximum 20)
//   - Weighted scoring: each answer option awards 0-3 pts per career
//   - Max points per career computed dynamically from the question bank

// ── Types ─────────────────────────────────────────────────────────────────────

export type Dimension =
  | 'work-style'
  | 'location'
  | 'industry'
  | 'education'
  | 'skills'

// Must stay in sync with Career IDs in lib/careers.ts
export type CareerID =
  | 'ib-analyst'
  | 'management-consultant'
  | 'law-associate'
  | 'product-manager'
  | 'software-engineer'
  | 'marketing-manager'
  | 'financial-analyst'
  | 'data-scientist'
  | 'ux-designer'
  | 'sales-representative'

export interface QuestionOption {
  value: string
  label: string
  /** Points awarded to each career when this option is selected (0 = no entry) */
  scores: Partial<Record<CareerID, number>>
}

export interface Question {
  id: string
  dimension: Dimension
  text: string
  options: QuestionOption[]
}

// Human-readable dimension labels used in the UI
export const DIMENSION_LABELS: Record<Dimension, string> = {
  'work-style': 'Work Style',
  'location': 'Location',
  'industry': 'Industry',
  'education': 'Education',
  'skills': 'Skills & Strengths',
}

// ── Question Bank (15 questions) ──────────────────────────────────────────────

export const QUESTIONS: Question[] = [

  // ── Work Style (Q1–Q4) ───────────────────────────────────────────────────

  {
    id: 'q1',
    dimension: 'work-style',
    text: 'How do you prefer to spend most of your working day?',
    options: [
      {
        value: 'independent',
        label: 'Deep, focused solo work',
        scores: {
          'ib-analyst': 3, 'financial-analyst': 3, 'data-scientist': 3,
          'software-engineer': 3, 'law-associate': 2,
        },
      },
      {
        value: 'collaborative',
        label: 'Collaborating closely with a team',
        scores: {
          'management-consultant': 3, 'marketing-manager': 3,
          'product-manager': 2, 'sales-representative': 2,
        },
      },
      {
        value: 'mixed',
        label: 'A mix — solo work and team collaboration',
        scores: {
          'product-manager': 3, 'ux-designer': 3, 'law-associate': 2,
          'management-consultant': 2,
        },
      },
    ],
  },

  {
    id: 'q2',
    dimension: 'work-style',
    text: 'Which work environment energizes you the most?',
    options: [
      {
        value: 'high-pressure',
        label: 'High-pressure with tight, fast-moving deadlines',
        scores: {
          'ib-analyst': 3, 'law-associate': 3, 'management-consultant': 2,
          'sales-representative': 2,
        },
      },
      {
        value: 'methodical',
        label: 'Structured, iterative, and methodical',
        scores: {
          'software-engineer': 3, 'data-scientist': 3,
          'financial-analyst': 3, 'ux-designer': 2,
        },
      },
      {
        value: 'dynamic',
        label: 'Dynamic — variety and new challenges every day',
        scores: {
          'management-consultant': 3, 'product-manager': 3,
          'marketing-manager': 2, 'ux-designer': 2,
        },
      },
      {
        value: 'relationship',
        label: 'People-first and relationship-driven',
        scores: {
          'sales-representative': 3, 'marketing-manager': 2, 'law-associate': 1,
        },
      },
    ],
  },

  {
    id: 'q3',
    dimension: 'work-style',
    text: 'When you face a hard problem, you default to...',
    options: [
      {
        value: 'quant',
        label: 'Crunching data and building models',
        scores: {
          'ib-analyst': 3, 'financial-analyst': 3, 'data-scientist': 3,
          'software-engineer': 1,
        },
      },
      {
        value: 'qualitative',
        label: 'Talking to people and gathering insights',
        scores: {
          'ux-designer': 3, 'marketing-manager': 3,
          'sales-representative': 2, 'management-consultant': 2,
        },
      },
      {
        value: 'strategic',
        label: 'Building frameworks and logical arguments',
        scores: {
          'management-consultant': 3, 'product-manager': 3, 'law-associate': 3,
        },
      },
      {
        value: 'detail',
        label: 'Diving deep into precision and accuracy',
        scores: {
          'law-associate': 3, 'financial-analyst': 2,
          'data-scientist': 2, 'software-engineer': 2,
        },
      },
    ],
  },

  {
    id: 'q4',
    dimension: 'work-style',
    text: 'How do you feel about presenting to clients or senior leaders?',
    options: [
      {
        value: 'love-it',
        label: "I love it — I thrive in front of an audience",
        scores: {
          'management-consultant': 3, 'sales-representative': 3,
          'marketing-manager': 3, 'law-associate': 2,
        },
      },
      {
        value: 'fine-with-it',
        label: "I can do it well when needed",
        scores: {
          'product-manager': 3, 'law-associate': 2,
          'financial-analyst': 2, 'ux-designer': 2,
        },
      },
      {
        value: 'prefer-not',
        label: "I'd rather let the work speak for itself",
        scores: {
          'ib-analyst': 3, 'financial-analyst': 2,
          'software-engineer': 3, 'data-scientist': 3,
        },
      },
    ],
  },

  // ── Location (Q5–Q6) ──────────────────────────────────────────────────────

  {
    id: 'q5',
    dimension: 'location',
    text: 'Where would you ideally want to be based?',
    options: [
      {
        value: 'financial-hub',
        label: 'A major financial hub (NYC, Chicago, London)',
        scores: {
          'ib-analyst': 3, 'financial-analyst': 3,
          'law-associate': 3, 'management-consultant': 2,
        },
      },
      {
        value: 'tech-hub',
        label: 'A tech hub (SF, Seattle, Austin, NYC)',
        scores: {
          'software-engineer': 3, 'product-manager': 3,
          'ux-designer': 3, 'data-scientist': 3,
        },
      },
      {
        value: 'client-facing',
        label: "Wherever clients are — I'm open to travel",
        scores: {
          'management-consultant': 3, 'sales-representative': 3, 'law-associate': 1,
        },
      },
      {
        value: 'flexible',
        label: "Flexible — remote or hybrid works great",
        scores: {
          'marketing-manager': 3, 'software-engineer': 2,
          'data-scientist': 2, 'ux-designer': 1,
        },
      },
    ],
  },

  {
    id: 'q6',
    dimension: 'location',
    text: 'How do you feel about frequent travel for work?',
    options: [
      {
        value: 'love-travel',
        label: "Excited — I want to see the world",
        scores: { 'management-consultant': 3, 'sales-representative': 3 },
      },
      {
        value: 'some-travel',
        label: "Fine with it occasionally",
        scores: {
          'law-associate': 2, 'product-manager': 2, 'marketing-manager': 2,
        },
      },
      {
        value: 'prefer-stable',
        label: "I'd rather be rooted in one place",
        scores: {
          'software-engineer': 3, 'data-scientist': 3,
          'financial-analyst': 3, 'ib-analyst': 2,
        },
      },
    ],
  },

  // ── Industry (Q7–Q9) ──────────────────────────────────────────────────────

  {
    id: 'q7',
    dimension: 'industry',
    text: 'Which industry excites you the most?',
    options: [
      {
        value: 'finance',
        label: 'Finance and investment banking',
        scores: {
          'ib-analyst': 3, 'financial-analyst': 3, 'management-consultant': 1,
        },
      },
      {
        value: 'technology',
        label: 'Technology and software',
        scores: {
          'software-engineer': 3, 'product-manager': 3,
          'ux-designer': 3, 'data-scientist': 3,
        },
      },
      {
        value: 'consulting-law',
        label: 'Consulting, strategy, or law',
        scores: { 'management-consultant': 3, 'law-associate': 3 },
      },
      {
        value: 'marketing-sales',
        label: 'Marketing, brand-building, or sales',
        scores: { 'marketing-manager': 3, 'sales-representative': 3 },
      },
    ],
  },

  {
    id: 'q8',
    dimension: 'industry',
    text: 'Which of these sounds like your ideal day at work?',
    options: [
      {
        value: 'models',
        label: 'Analyzing markets and valuing companies',
        scores: {
          'ib-analyst': 3, 'financial-analyst': 3, 'data-scientist': 1,
        },
      },
      {
        value: 'build-products',
        label: 'Building products people love',
        scores: {
          'software-engineer': 3, 'product-manager': 3, 'ux-designer': 3,
        },
      },
      {
        value: 'advise-executives',
        label: 'Advising executives on tough decisions',
        scores: {
          'management-consultant': 3, 'law-associate': 2, 'product-manager': 1,
        },
      },
      {
        value: 'campaigns',
        label: 'Running campaigns and closing deals',
        scores: { 'marketing-manager': 3, 'sales-representative': 3 },
      },
    ],
  },

  {
    id: 'q9',
    dimension: 'industry',
    text: 'If you could sum up your career mission in one line, it would be...',
    options: [
      {
        value: 'capital',
        label: 'Helping capital flow to the right places',
        scores: { 'ib-analyst': 3, 'financial-analyst': 3 },
      },
      {
        value: 'solve-problems',
        label: "Solving the world's hardest business problems",
        scores: {
          'management-consultant': 3, 'product-manager': 2, 'data-scientist': 2,
        },
      },
      {
        value: 'innovation',
        label: 'Shipping technology that changes how people live',
        scores: {
          'software-engineer': 3, 'product-manager': 3,
          'data-scientist': 2, 'ux-designer': 2,
        },
      },
      {
        value: 'justice',
        label: 'Upholding fairness, advocacy, and the rule of law',
        scores: { 'law-associate': 3, 'management-consultant': 1 },
      },
    ],
  },

  // ── Education (Q10–Q11) ───────────────────────────────────────────────────

  {
    id: 'q10',
    dimension: 'education',
    text: 'What is (or will be) your educational background?',
    options: [
      {
        value: 'business-finance',
        label: 'Business, Finance, or Economics',
        scores: {
          'ib-analyst': 3, 'financial-analyst': 3,
          'management-consultant': 2, 'sales-representative': 1,
        },
      },
      {
        value: 'cs-engineering',
        label: 'Computer Science, Engineering, or Math',
        scores: {
          'software-engineer': 3, 'data-scientist': 3, 'product-manager': 2,
        },
      },
      {
        value: 'pre-law-humanities',
        label: 'Pre-Law, Political Science, or Humanities',
        scores: {
          'law-associate': 3, 'management-consultant': 2,
        },
      },
      {
        value: 'design-comms',
        label: 'Design, Communications, or Marketing',
        scores: {
          'ux-designer': 3, 'marketing-manager': 3, 'sales-representative': 2,
        },
      },
    ],
  },

  {
    id: 'q11',
    dimension: 'education',
    text: 'What is your current or target degree level?',
    options: [
      {
        value: 'undergrad',
        label: "Bachelor's degree (in progress or completed)",
        scores: {
          'software-engineer': 2, 'marketing-manager': 2,
          'financial-analyst': 2, 'sales-representative': 2,
        },
      },
      {
        value: 'masters-mba',
        label: "Master's or MBA",
        scores: {
          'management-consultant': 3, 'product-manager': 3,
          'marketing-manager': 2, 'ib-analyst': 1,
        },
      },
      {
        value: 'jd',
        label: 'JD (Law degree)',
        scores: { 'law-associate': 3 },
      },
      {
        value: 'phd-advanced',
        label: "PhD or advanced technical degree",
        scores: {
          'data-scientist': 3, 'software-engineer': 2, 'ux-designer': 1,
        },
      },
    ],
  },

  // ── Skills & Strengths (Q12–Q15) ──────────────────────────────────────────

  {
    id: 'q12',
    dimension: 'skills',
    text: 'Which of these best describes your strongest natural ability?',
    options: [
      {
        value: 'quant-skill',
        label: 'Quantitative analysis and number-crunching',
        scores: {
          'ib-analyst': 3, 'financial-analyst': 3,
          'data-scientist': 3, 'software-engineer': 1,
        },
      },
      {
        value: 'writing-skill',
        label: 'Writing and making compelling arguments',
        scores: {
          'law-associate': 3, 'marketing-manager': 3, 'management-consultant': 2,
        },
      },
      {
        value: 'coding-skill',
        label: 'Coding and building technical systems',
        scores: {
          'software-engineer': 3, 'data-scientist': 3, 'product-manager': 1,
        },
      },
      {
        value: 'design-skill',
        label: 'Creativity and visual problem-solving',
        scores: {
          'ux-designer': 3, 'product-manager': 2, 'marketing-manager': 2,
        },
      },
    ],
  },

  {
    id: 'q13',
    dimension: 'skills',
    text: "When you're at your absolute best, you're...",
    options: [
      {
        value: 'data-puzzles',
        label: 'Unraveling complex puzzles with data',
        scores: {
          'ib-analyst': 3, 'financial-analyst': 3, 'data-scientist': 3,
        },
      },
      {
        value: 'persuading',
        label: 'Persuading people and building lasting trust',
        scores: {
          'sales-representative': 3, 'management-consultant': 3, 'law-associate': 2,
        },
      },
      {
        value: 'creating',
        label: 'Creating something new from scratch',
        scores: {
          'software-engineer': 3, 'ux-designer': 3, 'product-manager': 2,
        },
      },
      {
        value: 'leading',
        label: 'Leading a team toward a clear outcome',
        scores: {
          'product-manager': 3, 'management-consultant': 2, 'marketing-manager': 2,
        },
      },
    ],
  },

  {
    id: 'q14',
    dimension: 'skills',
    text: 'Which skill would you most want to master over the next 5 years?',
    options: [
      {
        value: 'modeling',
        label: 'Financial modeling and valuation',
        scores: { 'ib-analyst': 3, 'financial-analyst': 3 },
      },
      {
        value: 'leadership',
        label: 'Strategic leadership and decision-making',
        scores: {
          'management-consultant': 3, 'product-manager': 3, 'marketing-manager': 1,
        },
      },
      {
        value: 'engineering',
        label: 'Software engineering and system design',
        scores: { 'software-engineer': 3, 'data-scientist': 2 },
      },
      {
        value: 'negotiation',
        label: 'Persuasion, negotiation, and advocacy',
        scores: {
          'law-associate': 3, 'sales-representative': 3, 'management-consultant': 1,
        },
      },
    ],
  },

  {
    id: 'q15',
    dimension: 'skills',
    text: 'How do you handle open-ended challenges where the problem itself is unclear?',
    options: [
      {
        value: 'love-ambiguity',
        label: "I thrive — I enjoy defining the problem myself",
        scores: {
          'management-consultant': 3, 'product-manager': 3, 'ux-designer': 2,
        },
      },
      {
        value: 'some-ambiguity',
        label: "I'm okay with some — I like a loose framework",
        scores: {
          'ib-analyst': 2, 'law-associate': 2,
          'financial-analyst': 2, 'marketing-manager': 2,
        },
      },
      {
        value: 'clear-scope',
        label: "I work best with clear requirements and defined scope",
        scores: {
          'software-engineer': 3, 'data-scientist': 3, 'financial-analyst': 1,
        },
      },
      {
        value: 'adapt',
        label: "Doesn't matter — I adapt to whatever the situation needs",
        scores: { 'sales-representative': 3, 'marketing-manager': 2 },
      },
    ],
  },
]
