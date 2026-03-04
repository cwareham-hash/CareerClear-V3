// ── Career data for Career Clear MVP ─────────────────────────────────────────
// §6.1 — 4 fully developed roles (hasSimulation: true)
// §6.2 — 6 demonstration roles (hasSimulation: false)
// §6.3 — Taxonomy: industry and function categories

export type IndustryCategory =
  | 'Finance'
  | 'Consulting'
  | 'Legal'
  | 'Technology'
  | 'Marketing'
  | 'Sales'

export type FunctionCategory =
  | 'Analytical'
  | 'Client-Facing'
  | 'Creative'
  | 'Technical'

export interface Career {
  id: string
  slug: string
  emoji: string
  title: string
  industry: IndustryCategory
  /** A career can span multiple function categories (§6.1 table) */
  functions: FunctionCategory[]
  /** 2–3 sentence description shown on the card (§5.2.2) */
  description: string
  /** 4–5 skill tags shown as teal pills on the card (§7.6.1) */
  skills: string[]
  /** true = Simulation badge; false = Coming Soon badge (§6.1 vs §6.2) */
  hasSimulation: boolean
}

// ── Filter option arrays (§5.2.2) ────────────────────────────────────────────

export const INDUSTRY_FILTERS: IndustryCategory[] = [
  'Finance',
  'Consulting',
  'Legal',
  'Technology',
  'Marketing',
  'Sales',
]

export const FUNCTION_FILTERS: FunctionCategory[] = [
  'Analytical',
  'Client-Facing',
  'Creative',
  'Technical',
]

// ── Career data ───────────────────────────────────────────────────────────────

export const CAREERS: Career[] = [
  // ── §6.1 Core roles — full simulation ──────────────────────────────────────

  {
    id: 'ib-analyst',
    slug: 'investment-banking-analyst',
    emoji: '💼',
    title: 'Investment Banking Analyst',
    industry: 'Finance',
    functions: ['Analytical'],
    description:
      'Support senior bankers in executing mergers, acquisitions, and capital raises through advanced financial modeling, pitch book creation, and rigorous due diligence work.',
    skills: ['Financial Modeling', 'Valuation', 'Excel', 'Due Diligence', 'PowerPoint'],
    hasSimulation: true,
  },
  {
    id: 'management-consultant',
    slug: 'management-consultant',
    emoji: '📊',
    title: 'Management Consultant',
    industry: 'Consulting',
    functions: ['Analytical', 'Client-Facing'],
    description:
      'Diagnose complex business challenges for major corporations, develop data-driven strategies, and guide clients through transformations spanning operations, strategy, and organizational change.',
    skills: ['Strategy', 'Data Analysis', 'Problem Solving', 'Client Management', 'Presentations'],
    hasSimulation: true,
  },
  {
    id: 'law-associate',
    slug: 'law-associate',
    emoji: '⚖️',
    title: 'Law Associate',
    industry: 'Legal',
    functions: ['Analytical', 'Client-Facing'],
    description:
      'Research case law, draft contracts and legal memos, and advise corporate clients through high-stakes transactions, disputes, and regulatory challenges at a top-tier law firm.',
    skills: ['Legal Research', 'Contract Drafting', 'Due Diligence', 'Negotiation', 'Legal Writing'],
    hasSimulation: true,
  },
  {
    id: 'product-manager',
    slug: 'product-manager',
    emoji: '🚀',
    title: 'Product Manager',
    industry: 'Technology',
    functions: ['Creative', 'Analytical'],
    description:
      'Define product vision, prioritize features alongside engineering and design, and own the roadmap that turns user insights into shipped products that millions of people rely on daily.',
    skills: ['Product Strategy', 'Roadmapping', 'User Research', 'Data Analysis', 'Stakeholder Mgmt'],
    hasSimulation: true,
  },

  // ── §6.2 Demo roles — summary level only ───────────────────────────────────

  {
    id: 'software-engineer',
    slug: 'software-engineer',
    emoji: '💻',
    title: 'Software Engineer',
    industry: 'Technology',
    functions: ['Technical'],
    description:
      'Design and build scalable systems, write clean code across the full stack, collaborate in agile sprints, and ship features that millions of users depend on every day.',
    skills: ['System Design', 'Programming', 'Testing', 'Code Review', 'Agile'],
    hasSimulation: false,
  },
  {
    id: 'marketing-manager',
    slug: 'marketing-manager',
    emoji: '📢',
    title: 'Marketing Manager',
    industry: 'Marketing',
    functions: ['Creative'],
    description:
      'Develop integrated marketing campaigns, analyze performance data, manage brand voice across digital and traditional channels, and turn customer insights into measurable growth.',
    skills: ['Campaign Strategy', 'Brand Management', 'Analytics', 'Digital Marketing', 'Copywriting'],
    hasSimulation: false,
  },
  {
    id: 'financial-analyst',
    slug: 'financial-analyst',
    emoji: '📈',
    title: 'Financial Analyst',
    industry: 'Finance',
    functions: ['Analytical'],
    description:
      'Build detailed financial models, evaluate investment opportunities, track performance against forecasts, and present findings that guide multi-million dollar business decisions.',
    skills: ['Financial Modeling', 'Forecasting', 'Valuation', 'Excel', 'Business Analysis'],
    hasSimulation: false,
  },
  {
    id: 'data-scientist',
    slug: 'data-scientist',
    emoji: '🔬',
    title: 'Data Scientist',
    industry: 'Technology',
    functions: ['Technical', 'Analytical'],
    description:
      'Extract insights from large datasets using statistical modeling and machine learning to optimize products, forecast trends, and inform strategic decisions across the business.',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
    hasSimulation: false,
  },
  {
    id: 'ux-designer',
    slug: 'ux-designer',
    emoji: '🎨',
    title: 'UX Designer',
    industry: 'Technology',
    functions: ['Creative'],
    description:
      'Research user needs, prototype intuitive interfaces, and validate designs through testing — bridging psychology, business goals, and engineering to create experiences that feel effortless.',
    skills: ['User Research', 'Prototyping', 'Figma', 'Usability Testing', 'Visual Design'],
    hasSimulation: false,
  },
  {
    id: 'sales-representative',
    slug: 'sales-representative',
    emoji: '🤝',
    title: 'Sales Representative',
    industry: 'Sales',
    functions: ['Client-Facing'],
    description:
      'Build lasting relationships with prospects, understand their business challenges, present tailored solutions, and manage deals from first outreach all the way through to signed contract.',
    skills: ['Relationship Building', 'Negotiation', 'CRM Tools', 'Prospecting', 'Communication'],
    hasSimulation: false,
  },
]
