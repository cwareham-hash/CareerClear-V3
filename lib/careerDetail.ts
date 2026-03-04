// §5.4 Career Detail — Rich content for the 4 core career roles

export interface CareerStage {
  title: string
  years: string
  description: string
}

export interface CareerDetailContent {
  aboutRole: string[]
  typicalWorkday: string[]
  aiImpact: string[]
  trajectory: CareerStage[]
  requiredSkills: string[]
  education: {
    majors: string[]
    graduateDegrees: string[]
  }
  sampleCompanies: string[]
}

export const CAREER_DETAIL: Record<string, CareerDetailContent> = {

  'investment-banking-analyst': {
    aboutRole: [
      'Investment banking analysts sit at the foundation of Wall Street\'s deal-making machine. As an analyst at a bulge-bracket or elite boutique firm, you build the financial models, prepare the pitch materials, and conduct the intensive due diligence that allows senior bankers to advise clients on mergers, acquisitions, IPOs, and debt financings. The work is intellectually demanding, technically rigorous, and carried out under significant time pressure — often with real transactions worth hundreds of millions or billions of dollars depending on the accuracy of your output.',
      'The analyst\'s role spans the full deal lifecycle. Early in a deal, you are pulling comparable company analyses and running preliminary valuation work to help the bank win the mandate. Once it\'s won, you move into intensive financial modeling: LBO models, DCF analyses, and accretion/dilution analyses that the deal team uses to negotiate on behalf of clients. During due diligence, you review data rooms, flag financial risks, and coordinate with lawyers and accountants. As the deal approaches close, you are updating models late into the night as terms evolve and building the management presentations that communicate findings to executives.',
      'The hours in investment banking are notorious — and they are not exaggerated. Eighty to one-hundred-hour weeks are common during live transactions, with late nights and weekend work being the norm rather than the exception. What this creates, however, is a density of professional experience that is unmatched in almost any other entry-level role. In two years as an analyst, you will see more complex financial transactions, sit in more high-stakes client meetings, and develop stronger financial modeling skills than most finance professionals develop in a decade elsewhere.',
      'Investment banking is widely understood to be one of the most powerful career launchpads in business. The analytical training, deal exposure, and brand recognition position analysts for highly competitive opportunities in private equity, hedge funds, corporate development, and venture capital. Most analysts leave for these "buy-side" roles after two to three years. A smaller number remain and pursue the Associate track — often through an MBA program. The analyst experience, however demanding, is a foundation that shapes careers for decades.',
    ],
    typicalWorkday: [
      'The morning often begins before the rest of the office arrives. Analysts typically reach their desks by 7:30 or 8 AM to work through tasks that accumulated overnight — model updates flagged by the associate, revisions from an MD who reviewed slides late the night before, or a preliminary analysis needed before the morning\'s first client call. The rhythm of the day is defined by the deal cycle: during a slow period without live transactions, the work is more measured, focused on pitching prospective clients or maintaining sector coverage. When a deal is active, everything accelerates.',
      'Mid-morning is when structured collaboration kicks in. The deal team holds a brief standup, the VP walks through the day\'s deliverables, and analysts are assigned specific model outputs or presentation sections to complete by early afternoon. Client calls typically happen at 1 or 2 PM — analysts are expected to be fluent in their numbers, ready to answer follow-up questions from the managing director or the client in real time.',
      'Afternoons during live transactions are dominated by execution: updating pitch decks with revised valuation scenarios, reformatting management presentations, responding to due diligence requests from the opposing side, or building sensitivity tables to capture the range of possible deal outcomes. Dinner is often ordered in from the firm\'s delivery system. Evenings regularly extend past midnight during critical deal timelines, and the culture is built around the expectation that the work gets done regardless of the hour. The intensity is the defining feature of the role, and it is also its most accelerated professional development environment.',
    ],
    aiImpact: [
      'AI has already automated significant portions of analyst work — pulling comparable company data, seeding model scaffolding, summarizing research reports, and flagging due diligence anomalies — compressing tasks that once took full days into hours. What AI has not touched is the relational and judgment-intensive work that actually wins and executes deals: understanding a client\'s board dynamics, negotiating deal terms, and managing the trust relationships that determine which firm gets called first. For analysts, AI is accelerating the learning curve — less time on rote template work means earlier exposure to the substantive analytical and client-facing dimensions of the role. The demand for bankers who can synthesize information and manage high-stakes relationships is not diminished by these tools; it is made more central.',
    ],
    trajectory: [
      { title: 'Analyst', years: 'Years 1–2', description: 'Build models, run valuation analysis, and prepare deal materials; learning the mechanics of transaction execution.' },
      { title: 'Associate', years: 'Years 3–5', description: 'Lead deal workstreams, manage analyst output, and take ownership of client deliverables and key model assumptions.' },
      { title: 'Vice President', years: 'Years 6–8', description: 'Manage day-to-day deal execution, mentor junior staff, and begin developing and maintaining client relationships.' },
      { title: 'Director / Executive Director', years: 'Years 9–11', description: 'Drive origination efforts, take P&L responsibility for client coverage, and bridge junior execution with senior strategy.' },
      { title: 'Managing Director', years: 'Year 12+', description: 'Own client relationships at the C-suite level, win mandates, and set strategic direction for the coverage group.' },
    ],
    requiredSkills: [
      'Advanced Excel & Financial Modeling (LBO, DCF, Accretion/Dilution)',
      'Comparable Company & Precedent Transaction Analysis',
      'Capital Markets & Deal Structuring Fundamentals',
      'CapitalIQ, Bloomberg & Refinitiv Data Platforms',
      'PowerPoint Pitch Book Construction',
      'Due Diligence Coordination & Data Room Management',
      'Attention to Detail Under Time Pressure',
      'Clear Written and Verbal Communication',
    ],
    education: {
      majors: ['Finance', 'Economics', 'Mathematics', 'Accounting', 'Computer Science', 'Statistics'],
      graduateDegrees: [
        'MBA — top 10–15 program; common path to Associate promotion',
        'CFA designation — valued for buy-side transitions post-banking',
      ],
    },
    sampleCompanies: [
      'Goldman Sachs',
      'Morgan Stanley',
      'JPMorgan Chase',
      'Lazard',
      'Evercore',
      'Moelis & Company',
      'Centerview Partners',
      'Bank of America',
    ],
  },

  'management-consultant': {
    aboutRole: [
      'Management consulting is one of the most intellectually diverse careers in business. As a consultant — especially at a top-tier firm like McKinsey, BCG, or Bain (collectively known as "MBB"), or a strong strategy practice at Deloitte, PwC, or Accenture — you are parachuted into large organizations facing major strategic decisions and operational challenges. Your job is to define the problem clearly, gather data rigorously, develop hypotheses, test them, and ultimately deliver recommendations that senior executives actually implement. The work spans almost every industry and function: one engagement might be a retail company\'s supply chain transformation, the next a hospital system\'s revenue cycle improvement, the next a tech giant\'s go-to-market strategy in a new geography.',
      'Consulting is structured around client engagements that typically run four to twelve weeks. You are part of a small team — usually three to six people — led by a project manager or engagement manager, with a partner overseeing from a distance. As an analyst or junior consultant, you are responsible for the analytical backbone of the work: building financial models and benchmarking analyses, conducting stakeholder interviews, synthesizing data into findings, and turning raw insights into the polished slide decks that communicate recommendations to C-suite audiences. The firm\'s reputation is built on the quality of these deliverables, and the bar is exceptionally high.',
      'The defining feature of a consulting career is the "up-or-out" model: you are evaluated rigorously at the end of every engagement and expected to progress in capability and seniority on a clear timeline. This creates a high-pressure environment, but also a culture of rapid professional development. Most analysts work on two to four engagements in their first year, each in a different industry or function, building a breadth of exposure that is genuinely unmatched elsewhere. The travel requirement — typically Monday through Thursday at a client site, Friday in the home office — is a defining feature of the lifestyle that candidates either embrace or find unsustainable.',
      'The consulting skillset translates broadly: structured problem solving, executive communication, and rapid context-switching make consultants attractive candidates for roles in corporate strategy, general management, private equity, and startups. Many analysts join with a two-to-three-year plan, pursue an MBA (often subsidized by the firm), and then return as an associate. Others use consulting as a launching pad directly into industry. A meaningful number find they love the work and pursue the partner track — a path that rewards those who are as comfortable winning clients as they are solving problems.',
    ],
    typicalWorkday: [
      'The consulting workday is shaped by where you are in the project lifecycle and whether you are on-site at the client or in the home office. Client weeks — typically Monday through Thursday — begin early, with analysts and consultants reviewing notes or refining analyses from the prior evening before the team\'s 8 AM standup. The engagement manager opens with the day\'s agenda: which hypotheses need to be tested, which stakeholders are being interviewed, and which section of the client readout deck needs to be reworked before Thursday.',
      'The core of the day oscillates between independent analytical work and structured collaboration. An analyst might spend two focused hours building a benchmarking model in Excel, then shift immediately into a one-hour stakeholder interview with a VP of Operations who has been asked to share process data. Taking clean, structured notes during an interview requires a completely different kind of attention than quantitative modeling — and consultants develop the ability to switch modes quickly. The insights gathered in the interview will either validate or invalidate a hypothesis the team has been building toward for days.',
      'Evenings on client weeks are working evenings. Slides get revised based on the partner\'s feedback, analyses get refined, and the engagement manager reviews the team\'s work before the next morning. Friday in the home office is a different rhythm — internal meetings, professional development, and preparation for the following week. This dual pace of intense client-site focus and home-office recovery defines the consulting lifestyle, and the people who thrive in it tend to genuinely enjoy both the variety and the movement.',
    ],
    aiImpact: [
      'AI tools have substantially reduced the time consultants spend on first-pass market research, benchmarking aggregation, meeting synthesis, and slide structuring — work that used to consume a significant share of junior consultants\' hours. What AI cannot replicate is the distinctly human work that defines the highest-value output: building credibility with a skeptical CFO, reading a client organization\'s political dynamics, and making judgment calls when data is ambiguous. The net effect for junior consultants is a shift toward synthesis and communication work earlier in their careers — more time on strategic and interpersonal dimensions, less time in data rooms. The firms navigating this transition best are those investing in building analytical judgment rather than just technical skills.',
    ],
    trajectory: [
      { title: 'Analyst / Business Analyst', years: 'Years 1–2', description: 'Build the analytical foundations of engagements and develop core consulting skills: structured thinking, data analysis, and slide craft.' },
      { title: 'Consultant / Associate', years: 'Years 3–4', description: 'Lead workstreams end-to-end, manage analyst output, and drive day-to-day case progress with increasing autonomy.' },
      { title: 'Senior Consultant / Case Leader', years: 'Years 4–6', description: 'Own major components of client engagements, begin developing functional expertise, and coach junior team members.' },
      { title: 'Engagement Manager / Manager', years: 'Years 6–8', description: 'Lead full engagement teams, own client relationships on active projects, and take accountability for delivery quality.' },
      { title: 'Principal / Associate Partner', years: 'Years 8–12', description: 'Drive business development, own practice areas, originate new client work, and contribute to firm strategy.' },
      { title: 'Partner / Director', years: 'Year 12+', description: 'Lead the firm\'s most senior client relationships, set the direction of a practice, and represent the firm externally.' },
    ],
    requiredSkills: [
      'Structured Problem Solving & MECE Frameworks',
      'Quantitative Analysis & Financial Modeling',
      'Stakeholder Interviewing & Management',
      'Executive Communication & Slide Storytelling',
      'Benchmarking & Market Research',
      'PowerPoint / Google Slides Deck Production',
      'Project Management & Workplan Structuring',
      'Rapid Industry Context-Switching',
    ],
    education: {
      majors: ['Economics', 'Business Administration', 'Mathematics', 'Engineering', 'Computer Science', 'Political Science', 'Psychology'],
      graduateDegrees: [
        'MBA — actively recruited by MBB; often sponsored by the firm',
        'PhD — economics or engineering tracks for specialist research roles',
      ],
    },
    sampleCompanies: [
      'McKinsey & Company',
      'Boston Consulting Group',
      'Bain & Company',
      'Deloitte Consulting',
      'PwC Strategy&',
      'Oliver Wyman',
      'Roland Berger',
      'Kearney',
    ],
  },

  'law-associate': {
    aboutRole: [
      'A law associate at a large firm — often called "BigLaw" — occupies a position that looks quite different from the courtroom drama most people associate with the legal profession. The vast majority of corporate associates spend their days advising businesses, not arguing cases. In a transactional practice like M&A, capital markets, or private equity, you are structuring deals, drafting and negotiating contracts, reviewing regulatory filings, and helping clients navigate the legal complexity of major corporate events. Even in a litigation practice, much of the work happens outside the courtroom: conducting legal research, drafting briefs and motions, managing document discovery, and preparing witnesses for depositions and trial.',
      'BigLaw is defined by its scale, compensation, and intensity. Starting salaries at large firms follow the "Cravath scale" — a benchmark set by elite firms that pays first-year associates around $215,000, a figure most law graduates elsewhere can only aspire to. In exchange, associates are expected to bill six to eight hours of client work per day while also handling administrative tasks, professional development, and business development activities — all of which means days routinely run ten to twelve hours or more. Associates are evaluated on billable hours, work quality, and increasingly on their business development potential as they become more senior.',
      'As a junior associate in a corporate practice, your days are a mix of legal research, document drafting, due diligence coordination, and client communication. You might spend a morning researching how a specific securities regulation applies to a client\'s financing structure, an afternoon drafting a section of a merger agreement, and an evening reviewing the disclosure schedules the client\'s team has prepared. The work demands attention to detail that is almost without parallel in business — a single misplaced clause in a contract can have material consequences — as well as the ability to communicate complex legal analysis clearly and efficiently to clients who are not lawyers.',
      'The partnership track at BigLaw is long — typically eight to ten years — and competitive. Many associates leave before making partner, moving into in-house legal roles at corporations, federal clerkships, government positions, or academia. In-house moves are especially common: associate experience at a BigLaw firm is viewed as excellent preparation for corporate legal departments, and companies routinely recruit from law firms to fill general counsel or managing counsel roles. The associate years, while demanding, build a depth of technical legal skill and transactional judgment that is genuinely difficult to develop anywhere else.',
    ],
    typicalWorkday: [
      'The day for a corporate law associate is defined by whichever deal or matter is front and center. On an active transactional day, you might arrive at 8:30 or 9 AM and immediately pick up where you left off the night before: reviewing a draft agreement that opposing counsel marked up overnight, responding to a client question about a regulatory requirement, or preparing an agenda for a negotiation call scheduled for mid-morning. Legal work is inherently reactive to external timelines — closing deadlines, filing windows, and opposing counsel\'s schedules shape your day in ways that are rarely predictable.',
      'The analytical core of junior associate work is reading and writing. You read contracts, case law, regulatory filings, and precedent documents — then translate what you find into agreements, legal memos, or due diligence summaries that the deal team can act on. The precision this requires is essentially without parallel in business: a single overlooked provision in a 60-page purchase agreement can have significant financial or legal consequences for the client. Part of developing as an attorney is learning to hold the full picture of a transaction in your head while simultaneously reviewing one clause at a time.',
      'Client calls, negotiation sessions with opposing counsel, and internal check-ins with partners and senior associates punctuate the analytical work throughout the day. Associates are expected to be thoroughly prepared for these interactions — knowing the open issues cold and having a clear view on which points to push and which to concede. The day often extends well into the evening as deal timelines and partner feedback drive the pace of revision. Developing an efficient personal workflow — knowing how to prioritize across multiple simultaneous matters — is one of the most important skills a junior associate can build.',
    ],
    aiImpact: [
      'AI has made a measurable impact on the document-heavy work of legal practice: contract review against market standards, case law research, and litigation document review can now be performed at a fraction of the previous time and cost. What AI does not do well is the application of legal judgment in novel situations — counseling a client on litigation strategy, structuring a deal to achieve business objectives while managing risk, or building the trust relationships with general counsels who bring their most sensitive matters to a firm. The emerging consensus is that AI will compress hours billable for routine tasks, accelerating the timeline on which associates are expected to engage with substantive judgment rather than execution. Those who develop strong legal instincts early will find themselves doing more interesting work sooner than prior generations.',
    ],
    trajectory: [
      { title: 'Junior Associate', years: 'Years 1–3', description: 'Build core legal research, drafting, and due diligence skills under close supervision from senior attorneys.' },
      { title: 'Mid-Level Associate', years: 'Years 3–6', description: 'Lead specific deal components, manage workstreams independently, and begin developing direct client relationships.' },
      { title: 'Senior Associate', years: 'Years 6–8', description: 'Own complex matters, supervise and mentor junior associates, and contribute actively to business development.' },
      { title: 'Counsel / Of Counsel', years: 'Years 8–10', description: 'Recognized expertise and established client relationships; a partnership-adjacent role at many firms.' },
      { title: 'Income Partner / Junior Partner', years: 'Years 10–13', description: 'Limited equity participation with a growing book of business; building toward full partnership.' },
      { title: 'Equity Partner', years: 'Year 13+', description: 'Full firm ownership stake; lead client relationships, originate significant new work, and shape the firm\'s direction.' },
    ],
    requiredSkills: [
      'Legal Research (Westlaw, LexisNexis)',
      'Contract Drafting & Redlining',
      'Transaction Due Diligence Coordination',
      'Regulatory & Compliance Analysis',
      'Legal Memorandum & Brief Writing',
      'Negotiation & Issue Spotting',
      'Document Review & Management',
      'Clear, Precise Client Communication',
    ],
    education: {
      majors: ['Political Science', 'History', 'English', 'Philosophy', 'Economics', 'Business Administration (any undergraduate major accepted)'],
      graduateDegrees: [
        'Juris Doctor (J.D.) — required; top-14 law school strongly preferred',
        'LLM — for international practitioners or specialists in tax or IP',
      ],
    },
    sampleCompanies: [
      'Cravath, Swaine & Moore',
      'Skadden, Arps, Slate, Meagher & Flom',
      'Sullivan & Cromwell',
      'Kirkland & Ellis',
      'Latham & Watkins',
      'Weil, Gotshal & Manges',
      'Simpson Thacher & Bartlett',
      'Davis Polk & Wardwell',
    ],
  },

  'product-manager': {
    aboutRole: [
      'Product management is one of the most misunderstood roles in technology. The popular shorthand — "the CEO of the product" — captures a kernel of truth but obscures the actual day-to-day reality: PMs do not have direct authority over engineering, design, or sales. What they do have is a mandate to define what to build, why to build it, and how to prioritize across competing demands from users, business stakeholders, and technical constraints. In practice, this means PMs spend most of their time gathering context, aligning people, making trade-offs explicit, and communicating decisions clearly — all without formal authority over the people doing the work. Influence, not authority, is the primary tool.',
      'The PM role differs significantly depending on company stage and type. At an early-stage startup, a PM might be the first non-founder hire focused on product, doing everything from customer interviews to manually processing edge cases. At a large tech company, PMs are often highly specialized: a Platform PM owns developer-facing infrastructure, a Growth PM runs experiments to improve conversion and retention, a Consumer PM focuses on specific features of an app used by millions. At B2B companies, PMs work closely with enterprise sales teams to understand what specific clients need and translate that into product decisions. The common thread is the responsibility to make the product better — however "better" is defined for that context.',
      'The cross-functional nature of the role is what makes it both rewarding and challenging. On any given day, a PM might have a design review with UX, a sprint planning session with engineering, a strategy discussion with a VP, and a customer call facilitated by a sales rep — all in the same afternoon. Effective PMs develop the ability to speak multiple professional languages: technical enough to earn engineers\' respect, design-literate enough to have substantive conversations about user experience, and business-savvy enough to connect product decisions to revenue and growth. The role rewards people who are genuinely curious about users\' problems and can hold complexity without oversimplifying.',
      'The career trajectory of a successful PM leads into some of the most impactful and well-compensated roles in technology. Senior PMs and directors of product own large surface areas of products that millions of people use daily. At the executive level, VP of Product and Chief Product Officer roles involve setting company-wide product strategy, building and managing large product organizations, and shaping the long-term direction of the business. Many experienced PMs also transition into founding roles — the combination of user empathy, technical credibility, and business judgment maps directly onto what early-stage company building demands.',
    ],
    typicalWorkday: [
      'A product manager\'s day is almost always fragmented — and deliberately so. The role is fundamentally about connecting people, information, and decisions across a complex cross-functional organization, which means PMs move between very different modes of work throughout the day. A morning might open with fifteen minutes reviewing product analytics — checking activation rates, error logs, or funnel performance — before moving into a design review with the UX team. The ability to switch quickly between quantitative analysis and qualitative design critique is a core PM skill.',
      'The middle of the day is typically the most meeting-intensive: sprint planning with engineering, a product review with leadership, a customer call with the sales team, or a cross-functional sync to align on launch timing. PMs are the connective tissue in all of these conversations — setting the agenda, facilitating alignment, and capturing decisions in writing so that everyone leaves knowing what was decided and who owns what next. The ability to make a clean, well-reasoned call in real time — and communicate it clearly — is what separates strong PMs from people who just manage calendars.',
      'Afternoons often shift to writing and documentation: updating the roadmap, refining a PRD based on new engineering constraints, writing up findings from a customer research session, or drafting a brief for a stakeholder who missed a key meeting. The best PMs are unusually disciplined writers — they understand that clear documentation is the difference between a well-aligned team and one that relitigates the same decisions repeatedly. The day rarely ends with everything neatly resolved; a carry-forward list of open questions is normal, and part of the craft is knowing which ones to prioritize tomorrow.',
    ],
    aiImpact: [
      'AI is accelerating several core PM workflows — user research synthesis, PRD drafting, competitive analysis, and analytics interpretation — in ways that meaningfully reduce time spent on information gathering. What AI has not displaced is original strategic judgment: deciding what problem is worth solving, knowing which user insights represent real opportunities versus edge cases, and building the organizational consensus needed to actually ship. AI is also increasingly the subject of PM decisions themselves — most PMs are now responsible for designing AI-powered features, which requires enough technical literacy to set realistic expectations and make principled quality trade-offs. The role is evolving toward more strategy and less information processing, which makes it more interesting and more demanding simultaneously.',
    ],
    trajectory: [
      { title: 'Associate PM / APM', years: 'Years 1–2', description: 'Structured rotation program; build PM fundamentals — discovery, roadmapping, cross-functional collaboration — under close mentorship.' },
      { title: 'Product Manager', years: 'Years 2–4', description: 'Own a specific feature area or product surface end-to-end, from discovery through launch and iteration.' },
      { title: 'Senior Product Manager', years: 'Years 4–6', description: 'Lead complex, cross-team initiatives with significant scope; mentor junior PMs and represent product in leadership forums.' },
      { title: 'Group PM / Principal PM', years: 'Years 6–9', description: 'Own a full product or product line; significant strategic scope with influence across the broader product organization.' },
      { title: 'Director of Product', years: 'Years 9–12', description: 'Manage a team of PMs, set product direction for a major area, and represent product at the executive leadership level.' },
      { title: 'VP of Product / CPO', years: 'Year 12+', description: 'Own the entire product organization and the company\'s product vision; partner with the CEO to define strategic direction.' },
    ],
    requiredSkills: [
      'Product Strategy & Roadmap Prioritization',
      'User Research & Customer Discovery',
      'Data Analysis & Metric Interpretation',
      'PRD & Feature Specification Writing',
      'Agile Methodology & Sprint Planning',
      'Cross-Functional Stakeholder Alignment',
      'Competitive & Market Analysis',
      'Product Intuition & UX Literacy',
    ],
    education: {
      majors: ['Computer Science', 'Engineering', 'Business Administration', 'Economics', 'Cognitive Science', 'Human-Computer Interaction', 'Psychology'],
      graduateDegrees: [
        'MBA — common route into senior PM or transitioning from another field',
        'APM programs — Google, Meta, Uber, LinkedIn; structured entry path for new grads',
        'MS Computer Science or HCI — valued for technical or design-adjacent PM roles',
      ],
    },
    sampleCompanies: [
      'Google',
      'Meta',
      'Apple',
      'Amazon',
      'Microsoft',
      'Stripe',
      'Airbnb',
      'Salesforce',
    ],
  },

}
