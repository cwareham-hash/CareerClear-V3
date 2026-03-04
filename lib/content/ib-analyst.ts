import type { TimeBlockContent } from '../simulation'

// Project Apex — TechVentures $2.5B Acquisition
// Cast: Sarah Chen (Associate), James Liu (VP), Marcus Webb (MD),
//       Tom Bradley (CFO, TechVentures), GlobalCorp exec team

export const ibAnalystContent: Record<string, TimeBlockContent> = {

  // ── Day 1: Deal Kick-off ───────────────────────────────────────────────────

  'ib-analyst-d1-b1': {
    before: `Day one of Project Apex opens with a deal team standup before GlobalCorp's formal kick-off call. The Analyst arrived early to review Marcus's intake email and the deal teaser — a $2.5 billion potential acquisition of TechVentures Inc., a high-growth enterprise SaaS company, by GlobalCorp. The full team is meeting now to align on roles and deliverables. Everything after this meeting will move fast.`,
    simulatedWork: `[Scene: Glass-walled conference room, floor 42. The Analyst is seated at the end of the table alongside Marcus Webb, James Liu, and Sarah Chen. Printed deal teasers are spread across the table.]

Sarah (Associate): "Quick standup before the one o'clock. Marcus, do you want to frame the deal?"

Marcus (Managing Director): "Sure. GlobalCorp approached us three weeks ago. TechVentures does $383M ARR, growing at forty percent year-over-year. GlobalCorp wants to accelerate their enterprise SaaS penetration — faster than they can build it. They're thinking 6.5 to 7.5x revenue."

James (Vice President): "SaaS multiples have compressed since Q3. We need a comps set that reflects current trading, not last year's."

Sarah (Associate): "That's yours." She turns toward the Analyst. "Fifteen to twenty public SaaS companies — two-hundred million-plus ARR, thirty-percent-plus growth, enterprise go-to-market. Pull it in CapIQ. I want a draft before end of day."

The Analyst nods once and uncaps a pen.

Analyst (Investment Banking): "Should I benchmark on EV/NTM Revenue or pull EBITDA multiples too?"

Marcus (Managing Director): "Revenue multiples are primary for high-growth SaaS. Pull EBITDA too — but caveat it. TechVentures isn't profitable yet."

Sarah (Associate): "Also set up a blank LBO shell before the one o'clock. We may need it live if GlobalCorp pushes on leverage."

The Analyst writes two lines in the notebook without looking up.

Analyst (Investment Banking): "Comps by EOD. LBO shell before one o'clock." [writing]

James (Vice President): "Read the CIM before that call. You don't want to ask GlobalCorp's CFO something that's answered on page twelve of the deck."`,
    commentary: `I got two deliverables with same-day deadlines in the first twelve minutes of the engagement — that's standard. In this job, there's no orientation period. Marcus expects output under live conditions from the first morning.

Notice how I asked about EV/Revenue versus EBITDA. I wasn't asking because I didn't know the answer — I asked because I wanted Marcus to frame the methodology choice out loud in front of the team. In high-growth SaaS M&A, EBITDA multiples often don't work: TechVentures reinvests heavily and shows near-zero EBITDA, so revenue is the anchor metric. If I'd built the comps on EBITDA without questioning it, the output would have looked confused to anyone who knows this sector.

Watch how Marcus doesn't just give an instruction — he gives the reasoning. That's the pattern to absorb here: not what to do, but why it's done that way. The CIM — Confidential Information Memorandum — is the detailed document a target company prepares for potential acquirers. Think of it as the authoritative source of record for everything financial and strategic about TechVentures. James's point is simple: going into the first client call without reading it is a credibility risk you can never recover from.`,
    after: `The Analyst leaves the conference room with a clear mandate: pull the comps set in CapIQ and prepare an LBO shell before 1 PM. CapIQ filters are opened immediately — SaaS, enterprise go-to-market, $200M+ ARR, 30%+ revenue growth. The GlobalCorp call is in four hours.`,
  },

  'ib-analyst-d1-b2': {
    before: `Sarah has granted data room access containing TechVentures' Confidential Information Memorandum, its most recent investor presentation, and two years of audited financials. The Analyst's job before the 1 PM client call is to read everything and produce a concise internal brief on TechVentures' business model, financial profile, and key risks. Senior bankers need to walk into the call with command of the target — and the Analyst supplies that command.`,
    simulatedWork: `[Scene: The Analyst's desk. Two monitors — TechVentures CIM on the left, a blank notes document on the right. The floor is quiet.]

The Analyst reads through the opening sections of the CIM, highlighting key metrics and typing annotations into the notes document.

Analyst (Investment Banking): "Enterprise contract lifecycle management software. Cloud-native, launched 2017. 340 Fortune 500 logos — that's meaningful enterprise penetration for a company this size." [reading aloud quietly]

The Analyst scrolls to the revenue breakdown slide and pauses.

Analyst (Investment Banking): "Seventy-eight percent subscription, twenty-two percent professional services. Higher services mix than a pure-play SaaS — that's going to affect the gross margin story." [noting]

The Analyst opens the financials tab and cross-references ARR against the revenue model.

Analyst (Investment Banking): "ARR $383M. Net revenue retention 118%. Strong. That means existing customers are expanding eighteen percent per year on their own, before any new logos." [highlighting]

The Analyst flags the page and adds a note to the brief before moving to gross margin.

Analyst (Investment Banking): "Gross margin 71%. Below Salesforce's 75% but reasonable given the services component. Headcount 1,200." [annotating]

An instant message notification appears on the right monitor.

Sarah (Associate, via chat): "Quick — what's TechVentures' gross logo churn rate? Marcus might ask on the call."

The Analyst scrolls back through the CIM, scanning footnotes on the retention slides.

Analyst (Investment Banking): "Checking now." [typing back] "Gross logo churn is approximately 4% — it's in a footnote on page 34. NRR of 118% means expansion is more than offsetting those losses."

Sarah (Associate, via chat): "Good catch. Add it to the brief."

The Analyst returns to reading and flags a customer concentration table near the back of the deck.

Analyst (Investment Banking): "Top ten customers are 38% of ARR. That's significant concentration — it'll come up in due diligence." [flagging]`,
    commentary: `What's happening here is one of the most underestimated skills in investment banking: reading for pattern recognition rather than passive information absorption. Every metric tells a story about the quality of the acquisition target.

Net revenue retention of 118% — NRR — is the single most important metric for a SaaS business. It measures how much revenue existing customers generate this year versus last year, including expansions and churn. 118% means that even if TechVentures never signed a new customer, their revenue would still grow 18% from the existing base. That's a signal of strong product-market fit and customer satisfaction.

The 38% customer concentration in the top ten accounts is a risk flagged before anyone assigned it — that instinct is exactly what separates strong analysts from passive ones. Sarah's mid-task pressure-check question is routine: senior bankers test how deeply you've absorbed the material before a live client call. Having the answer — including the footnote location — builds credibility instantly.`,
    after: `By 11:45 AM a two-page internal brief covers TechVentures' business model, key financial metrics, and three watch items for due diligence. The Analyst shares it with Sarah and James via Google Docs with a note flagging the customer concentration risk. Then it's back to the comps analysis — it needs to be finished before 1 PM.`,
  },

  'ib-analyst-d1-b3': {
    before: `The GlobalCorp kick-off call has arrived. On the line are GlobalCorp's CEO, CFO, and Head of Corporate Development — and on the advisory side, Marcus, James, Sarah, and the Analyst. The Analyst's role is to listen, take structured real-time notes, and capture every commitment, open question, and red flag that surfaces. This call sets the analytical and negotiation tone for the entire engagement. The notes taken in the next two hours will drive the team's work for the next six weeks.`,
    simulatedWork: `[Scene: Conference room, dial-in active. GlobalCorp deck projected on screen. The Analyst has a blank document open, organized by: Key Decisions / Open Items / Risks.]

David (CFO, GlobalCorp): "We've tracked TechVentures for two years. Their CLM product accelerates our enterprise suite by three to four years versus building. We want to move fast — Q3 board approval is the target."

Marcus (Managing Director): "Understood. We're building our process around that timeline. On valuation — you mentioned 6.5 to 7.5x revenue. Is that a ceiling or a starting position?"

Mia (Head of Corporate Development): "Current thinking. We're open if the data supports a different number. There may be competitive interest in this asset."

James (Vice President): [quietly, leaning toward the Analyst] "Note that. She just flagged competing bidders. Add it to the watch list."

The Analyst types without looking up.

Analyst (Investment Banking): "[Risk: Competitive process — possible other bidders. Escalate post-call.]" [typing into notes document]

Marcus (Managing Director): "What does your integration plan look like for key engineering talent?"

David (CFO, GlobalCorp): "We have a dedicated M&A integration team. But this is a talent-heavy acquisition. If key engineers leave post-close, we've overpaid for a customer list."

The Analyst adds a second risk item to the tracker immediately.

Analyst (Investment Banking): "[Risk: Key talent retention post-close. DD item: review retention packages and equity rollover in employment agreements.]" [typing]

[After the call ends]

Marcus (Managing Director): "Good call. Two deliverables — process timeline document and full data room request list. Both by end of week." He looks toward the Analyst. "You're owning both."`,
    commentary: `The kick-off call is the first window into why a client is doing a deal — and that context shapes every analytical decision made for the next six weeks. Notice how Marcus probed on the valuation range: 'ceiling or starting position?' That's a deliberate move to understand whether GlobalCorp has flexibility before the team commits to a recommendation.

Mia's hint about competing bidders could be a negotiating tactic or a genuine signal about the process — either way, it changes how you price the deal and how urgently you move. Watch the note on equity rollover in employment agreements: that line appeared in the tracker before anyone assigned it. That's the kind of proactive pattern-recognition senior bankers notice in junior analysts.

'DD' stands for due diligence — the deep investigative process where the buyer verifies everything the seller has claimed. A data room request list is the formal document specifying every record, contract, and financial statement the buyer wants to review before committing to a price.`,
    after: `The call ends at 2:55 PM. Four immediate action items are logged: process timeline, data room request list, competitive process analysis, and talent retention flagged for due diligence. A cleaned-up call notes summary goes to the full team within fifteen minutes. Then it's back to the comps analysis — Marcus expects a draft before 6 PM.`,
  },

  'ib-analyst-d1-b4': {
    before: `The comparable companies analysis — 'comps' — is one of the three core valuation methodologies used in M&A. It establishes what the public market is currently paying for similar businesses, giving a benchmarked trading range for TechVentures. The screen targets publicly traded enterprise SaaS companies with similar growth profiles: $200M+ ARR, 30%+ revenue growth, enterprise go-to-market. From that universe, the output will show key trading multiples.`,
    simulatedWork: `[Scene: The Analyst's desk. CapIQ on the left monitor, Excel on the right. A blank comps template is loaded.]

The Analyst sets screening filters in CapIQ and reviews the initial results.

Analyst (Investment Banking): "SaaS, enterprise, $200M-plus revenue, 30%-plus growth... forty-seven names. Too many." [filtering]

The Analyst adds a sub-filter for enterprise go-to-market and removes consumer-facing platforms.

Analyst (Investment Banking): "Twenty-three. Still too many — a lot of these are horizontal platforms. I need companies in contract management, workflow automation, or adjacent verticals..." [refining]

The Analyst pulls EV/NTM Revenue multiples and sorts the resulting list from low to high.

Analyst (Investment Banking): "DocuSign at 3.1x. That's low — oh, they're growing at eleven percent. Not a clean comp. I'll keep them as a reference point but flag the growth delta." [annotating]

The Analyst builds the Excel output: ticker, market cap, EV, NTM Revenue, NTM multiple, LTM gross margin, NTM EBITDA margin. A few names are flagged in yellow as the table grows.

Analyst (Investment Banking): "Veeva Systems at 8.2x — that's a healthcare monopoly premium, not representative. Pulling it from the primary set." [deleting row]

Sarah leans over from the adjacent desk.

Sarah (Associate): "How's it looking?"

The Analyst swivels to show the monitor.

Analyst (Investment Banking): "Seventeen names. Median EV/NTM Revenue is 5.8x, range is 3.1 to 9.7. Removing the two growth outliers moves the median to 6.2x."

Sarah (Associate): "Good. Add a quartile breakout and flag which names are the closest functional matches. Marcus will want to know which ones we'd actually argue are the right reference set — not just the broadest screen."

The Analyst nods and returns to the model, adding a color-coded column for comparability tier.`,
    commentary: `Building a comps set sounds mechanical, but this is where a significant amount of analytical judgment lives. Every inclusion or exclusion has implications for the valuation output — and ultimately for what price the client is recommended to pay.

When DocuSign was removed (growth deceleration) and Veeva was excluded (sector premium), those weren't arbitrary choices — they were defensible judgments about comparability. EV/NTM Revenue means Enterprise Value divided by Next Twelve Months Revenue — what the market is paying today for each dollar of revenue the business will generate over the next year. A wide range (3.1x to 9.7x) tells a story: the market differentiates sharply on growth rate. TechVentures at 40% growth would likely trade toward the upper end.

Learning to read the spread — not just report it — is the analytical value an analyst adds. Sarah's instruction to flag the 'closest functional matches' rather than just the broadest screen is the difference between a comps table and a valuation argument.`,
    after: `By 5:30 PM a formatted seventeen-company comps table is complete, with a primary set of twelve closest functional matches, a quartile summary, and an implied EV range for TechVentures of $2.2B–$2.7B. The draft goes to Sarah with a note flagging the two excluded outliers. Then the blank LBO shell is opened — the preliminary valuation model needs to be started before leaving tonight.`,
  },

  'ib-analyst-d1-b5': {
    before: `It's 6 PM. Most support staff have left, but the analyst floor is still occupied — this is when the real modeling work happens in investment banking. The preliminary DCF valuation is being built using TechVentures' CIM financials as inputs. The goal tonight isn't a final model — it's a working framework credible enough to sense-check against the comps range by morning. A defensible first pass needs to be done before tomorrow's full modeling sprint.`,
    simulatedWork: `[Scene: Quiet floor. Headphones on. Excel open to a new file: 'ProjectApex_ValuationModel_v0.1'. The Analyst works through the revenue model line by line.]

Analyst (Investment Banking): "Revenue starting point $383M. Applying deceleration: 35%, 28%, 22%, 17%, 14% over five years..." [building assumptions tab]

The Analyst builds down to the EBITDA line, referencing margin comparables from the comps table.

Analyst (Investment Banking): "Gross margin starts at 71%, improving to 76% as services revenue shrinks as a percentage. EBITDA margin: negative year one, breakeven year two, 12% by year five..." [modeling]

The Analyst is midway through calculating free cash flow when James appears at the desk.

James (Vice President): "How's the DCF coming?"

Analyst (Investment Banking): "Five-year projection is done. Working on the terminal value. Using 20x EBITDA at exit — not sure if that's high given where comps are trading."

James (Vice President): "Think about the most growth-sensitive assumptions — revenue trajectory and exit multiple. Run a base case at your current assumptions and a bear case with faster deceleration. That way we know the floor going into tomorrow."

Analyst (Investment Banking): "Should I build a scenario dashboard tab?"

James (Vice President): "Yes. And flag the discount rate — we're using 10% for now, but Marcus may push it to 11% given the rate environment."

James heads back to his desk. The Analyst works through two more hours of quiet modeling.

Three hours later, a working two-case DCF is complete. The Analyst stares at the outputs.

Analyst (Investment Banking): [quietly] "Base case implied EV: $2.4B. Bear case: $2.0B. The comps range was $2.2 to $2.7 billion. Good — the outputs are in the same zip code. If they weren't, I'd need to find the error before tomorrow."`,
    commentary: `Building the first draft of a financial model is a humbling experience — there are dozens of places to introduce an error, and none of them announce themselves. This is why investment banking analysts develop an almost paranoid attention to detail: one wrong cell reference can cascade through an entire model and produce a valuation that's off by hundreds of millions.

Notice James's advice to run two cases immediately — that's not just analytical good practice, it's presentation strategy. Showing a client only a point estimate invites skepticism; showing a range signals rigor and intellectual honesty.

A DCF — Discounted Cash Flow — estimates the present value of all future cash flows a business will generate, discounted back at a rate reflecting the riskiness of those cash flows. The terminal value captures the business's value beyond the explicit five-year forecast period. The moment the DCF output overlapped with the comps range was important: that's a signal the framework is directionally correct, even if the precise inputs still need refinement tomorrow.`,
    after: `At 9:15 PM the file is saved as 'ProjectApex_ValuationModel_v0.1.' Sarah receives it with a brief note: 'DCF draft — base and bear cases, outputs at $2.0–2.4B, consistent with comps. Terminal multiple assumption flagged for Marcus.' The model will be refined in the morning, but a defensible first pass is done.`,
  },

  // ── Day 2: Financial Modeling ──────────────────────────────────────────────

  'ib-analyst-d2-b1': {
    before: `Sarah reviewed the model last night and sent five specific comments at 11 PM — corrections on assumption mechanics, a request for an additional terminal value cross-check, and output formatting guidance. This morning's check-in is a ten-minute working session to go through them together before today's full modeling sprint begins. Day Two is the most technically demanding day of the engagement: the final DCF and the LBO analysis are being built from scratch.`,
    simulatedWork: `[Scene: Sarah's desk. She has the model open on her monitor, colored comment cells visible throughout. The Analyst stands beside her with a notebook.]

Sarah (Associate): "Good start last night. A few things before you dive in today."

She points to row 47 in the DCF tab.

Sarah (Associate): "Unlevered free cash flow — you're subtracting capex before taxes. Should be after. It's creating a small distortion in years three and four."

Analyst (Investment Banking): "Got it. Is the valuation impact meaningful?"

Sarah (Associate): "About $40 to $50 million on the implied EV. Small but it needs to be right. Also — your terminal value uses an EBITDA exit multiple, which is fine, but add a Gordon Growth cross-check. TechVentures is high-growth, so the terminal growth rate assumption is going to matter to Marcus."

Analyst (Investment Banking): "What growth rate should I use for the Gordon Growth?"

Sarah (Associate): "Model 3% and 4%. We can debate which is appropriate, but show both." She scrolls down to the output tab. "Last thing — the output tab needs a summary box at the top: implied EV range, per-share equity value, and premium to current trading. Think about how Marcus uses this when he walks GlobalCorp through the analysis. He shouldn't have to hunt for the number."

The Analyst writes each point in the notebook.

Analyst (Investment Banking): "Clear. DCF to you by noon. Should I sequence or parallel-track the LBO?"

Sarah (Associate): "Sequence. Get the DCF right first — the LBO entry assumptions will depend on your DCF output."`,
    commentary: `This check-in is a masterclass in how good associates manage analysts. Sarah isn't just giving corrections — she's explaining the reasoning behind each one. Understanding why the capex timing matters (the tax shield distorts post-tax free cash flow) is more valuable than just fixing the cell.

The Gordon Growth Model is a second way to calculate terminal value: instead of applying an exit EBITDA multiple, it treats the terminal year's cash flow as a perpetuity growing at a constant rate. For a high-growth company like TechVentures, the assumed long-run growth rate in that formula is sensitive — which is exactly why Sarah wants both 3% and 4% shown.

Notice the prioritization question: 'sequence or parallel-track?' That's the right thing to ask. It shows thinking about the day's critical path, not just the task list. And Sarah's instruction to format a summary box is equally deliberate — a technically correct model that senior bankers can't quickly navigate fails at its job.`,
    after: `The Analyst returns to the desk with five specific corrections and two additions: the Gordon Growth cross-check and the output summary box. Over the next three hours the DCF is rebuilt cleanly from scratch, incorporating all of Sarah's corrections. By noon, the base case implied EV lands at $2.35B — within the comps range and consistent with the Gordon Growth check. The model goes to Sarah immediately, and the LBO template is opened.`,
  },

  'ib-analyst-d2-b2': {
    before: `The full, final DCF model is being built — not patching last night's draft, but a clean rebuild incorporating Sarah's corrections. A well-structured SaaS acquisition DCF has several interconnected components: a revenue and margin model, unlevered free cash flow calculation, a WACC built from relevered betas, present value of projected cash flows, terminal value using two methodologies, and an equity value bridge. Every cell needs to reference correctly because the model will be scrutinized line by line in today's review session.`,
    simulatedWork: `[Scene: The Analyst's desk. Headphones on. Excel open with a new workbook: tabs labeled Assumptions / Revenue / P&L / FCF / WACC / DCF Output. The Analyst works methodically left to right through the tabs.]

Analyst (Investment Banking): "Need to unlever the comps set betas and re-lever at TechVentures' target capital structure. Median relevered beta across the primary comp set: 1.42." [building WACC tab]

The Analyst opens a secondary browser tab with current Treasury rates.

Analyst (Investment Banking): "Risk-free rate at the 10-year Treasury: 4.3%. Equity risk premium: 5.5%. Cost of equity: 4.3 plus 1.42 times 5.5 equals 12.1%." [entering formula]

The Analyst moves to the cost of debt row.

Analyst (Investment Banking): "Not profitable yet, so I'll assume a B+ rated equivalent at current spreads — approximately 8.5% pre-tax, 6.4% after-tax. Target capital structure 80% equity, 20% debt." [modeling]

Analyst (Investment Banking): "WACC: 0.80 times 12.1% plus 0.20 times 6.4% equals 10.96%. Round to 11% per James's note." [completing the WACC build]

The Analyst runs the DCF output tab and stares at the result.

Analyst (Investment Banking): "PV of five-year FCF: $287 million. Terminal value at 20x year-five EBITDA: $1.83 billion. PV of terminal value... $1.14 billion. Implied EV: $1.43 billion. That's way below comps." [quietly]

A long pause. The Analyst scrolls back through the discounting periods.

Analyst (Investment Banking): "That can't be right. The comps said $2.2 to $2.7 billion. Let me check the discounting period... I'm discounting year-five cash flows as if they're year six. Off by one period. Classic." [leaning closer to the screen]

The Analyst corrects the discounting period formula and watches the output update.

Analyst (Investment Banking): "There. $2.29 billion. That's inside the comps range. Makes sense." [exhaling]`,
    commentary: `The 'off by one period' discounting error I caught and fixed is one of the most common mistakes in financial modeling — and it shifted the implied valuation by nearly $900 million. That number tells you something important: in a complex model, errors don't announce themselves. They sit quietly inside a formula and produce a wrong answer that looks plausible unless you check it against something independent.

The discipline of checking the DCF output against the comps range before sending it is not optional in this job. It's how you catch errors before they reach a senior banker or a client.

The WACC — Weighted Average Cost of Capital — is the discount rate applied to all future cash flows. It's not a plug: building it correctly requires relevering competitor betas (adjusting for different capital structures), estimating cost of debt from current credit market data, and choosing a capital structure assumption. Each step involves judgment that Marcus can and will challenge. 'Why 11%?' needs a complete answer, not 'that's what James suggested.' Know the math behind every number in the model.`,
    after: `The finished DCF is saved as version 1.0: base case $2.29B, bear case $1.91B, Gordon Growth cross-check $2.05B–$2.45B. All three outputs are internally consistent. Sarah receives the model with a summary email noting the corrected capex treatment and the full WACC build. The LBO template is opened — the model review session with the full team is at 1:30 PM.`,
  },

  'ib-analyst-d2-b3': {
    before: `The model review session brings Marcus, James, Sarah, and the Analyst together to pressure-test the DCF before it's incorporated into pitch materials. Review sessions in investment banking are not passive presentations — senior bankers will probe every assumption, challenge every output, and send the analyst back to rebuild if something doesn't hold. Every number is known, and the rationale behind each assumption is ready.`,
    simulatedWork: `[Scene: Conference room. Marcus at the head of the table, the model projected on the wall screen. The Analyst's laptop is open with the source file.]

Marcus (Managing Director): "Walk us through the key assumptions."

The Analyst stands and presents from the projected screen.

Analyst (Investment Banking): "Revenue starts at $383M, decelerating from 35% in year one to 14% in year five. Gross margins expand from 71% to 76% as the professional services mix declines. EBITDA margin reaches 18% by year five — below the comp set median of 21% at maturity, but I applied a discount because TechVentures' customer success model is headcount-intensive. That's by design — it's what drives their NRR of 118%."

Marcus (Managing Director): "Why 18%? That feels conservative."

Analyst (Investment Banking): "I can run a sensitivity at 22%. I wanted to err on the side of showing GlobalCorp a credible floor rather than pricing in a margin expansion that may not materialize."

James (Vice President): "Show us the terminal value sensitivity."

The Analyst navigates to the two-way sensitivity table.

Analyst (Investment Banking): "At 20x exit EBITDA: base case $2.29B. At 18x: $2.08B. At 22x: $2.51B. Gordon Growth cross-check is $2.1 to $2.45B — consistent with the EBITDA multiple range."

Marcus (Managing Director): "That works. GlobalCorp's range of 6.5 to 7.5x revenue maps to $2.5 to $2.9 billion. We're anchoring below that — it gives us room to move if they push."

Sarah (Associate): "One more request — add a sources-and-uses tab for the LBO. We'll use it this afternoon."

The Analyst makes the note and closes the laptop.`,
    commentary: `When I defended the 18% EBITDA margin assumption by connecting it to the business logic — 'that's by design, it's what drives NRR of 118%' — I did something important: I showed Marcus I understand the company, not just the model. That's the difference between an analyst who fills in a template and one who builds a credible analytical view.

The moment Marcus said 'that works' after the sensitivity table is close to high praise in this environment. Notice how he immediately reframed the output in deal terms: 'we're anchoring below GlobalCorp's range, it gives us room to move.' That's how bankers translate financial analysis into negotiation strategy. The model isn't just a number — it's a negotiating instrument.

A sensitivity table shows how the output (implied EV) changes as you vary one or two key inputs (exit multiple, discount rate). It's how you communicate the range of outcomes rather than a false single point estimate. Any time you're in a room with a senior banker, expect them to ask 'what does this look like if the assumptions change?' The sensitivity table is your answer.`,
    after: `The model review ends with three follow-ups: run the 22% EBITDA margin sensitivity, build the LBO sources-and-uses tab, and update the output summary with final figures. The Analyst is back at the desk by 3:10 PM. The LBO analysis is the afternoon's task — a technically demanding model that adds a private equity valuation lens to the deal.`,
  },

  'ib-analyst-d2-b4': {
    before: `The leveraged buyout analysis isn't just relevant to private equity bidders — it sets a valuation floor for the strategic deal. If a PE firm couldn't generate an acceptable return buying TechVentures at a given price, it provides a calibration point for GlobalCorp's offer. The LBO model being built covers: sources and uses of capital, a simplified debt schedule, projected returns to a PE sponsor, and an IRR sensitivity table showing how returns change across entry multiples and exit multiples.`,
    simulatedWork: `[Scene: The Analyst's desk. LBO template open. It's 3:30 PM and the floor is active again after the post-lunch lull.]

The Analyst builds the sources and uses table at the top of the model.

Analyst (Investment Banking): "Purchase price at 7x NTM Revenue — that's $2.69 billion. Transaction fees, roughly 2% — $53 million. Total uses: $2.74 billion." [entering figures]

The Analyst moves to the sources side and pauses.

Analyst (Investment Banking): "Sources: senior secured debt at 4x EBITDA... wait. TechVentures is EBITDA-negative. I can't lever against EBITDA. I need to lever against revenue — call it 1.5x ARR, which is $575 million in debt. Rest is equity." [working through it]

The Analyst opens a chat window to Sarah.

Analyst (Investment Banking): "Quick question on LBO — TechVentures has negative EBITDA. Are we levering on revenue, or modeling this as a low-leverage deal?" [via chat]

Sarah (Associate, via chat): "Low-leverage. Assume 70% equity, 30% debt. Use a first-lien term loan at current spreads — roughly 8.5%. Model the debt service, but the return story is going to be growth equity, not leverage."

Analyst (Investment Banking): "Got it." [via chat]

The Analyst rebuilds the capital structure and runs the equity return calculation.

Analyst (Investment Banking): "Entry at 7x revenue. Exit at 7x revenue in year five assuming multiple held. Revenue grows to $830M. Equity value at exit: $5.3B. Entry equity: $1.9B. That's a 2.8x MOIC, 22.5% IRR — above a PE sponsor's typical 20% hurdle." [calculating]

The Analyst builds out the IRR sensitivity table across entry multiples from 6x to 8.5x and exit multiples from 5.5x to 9x.

Analyst (Investment Banking): "The LBO supports up to about $2.8 billion before IRR falls below the hurdle. That's consistent with the top of GlobalCorp's range." [reviewing the completed table]`,
    commentary: `Levering a negative-EBITDA SaaS company requires thinking beyond the standard LBO playbook. Most models use an EBITDA leverage metric, but when EBITDA is negative, you have to find a different anchor — in this case, revenue. That judgment call matters: it shapes the capital structure, the return profile, and ultimately the price at which a financial buyer would compete.

IRR stands for Internal Rate of Return — the annualized return a PE sponsor earns on their equity investment from entry to exit. MOIC is Multiple on Invested Capital — how many times they got back what they put in. A 20% IRR hurdle is the minimum return most PE firms require before a deal makes sense. The output here — a PE sponsor can justify up to $2.8B before returns fall below hurdle — tells Marcus that there's a credible financial buyer competing at the top of GlobalCorp's stated range. That affects negotiation leverage: GlobalCorp can't lowball.

This is why the LBO matters in a strategic deal even when there's no PE bidder in the room. It sets a floor. If the LBO math only supported $1.8B, GlobalCorp would know they're the only rational buyer at $2.5B, and their negotiating position weakens.`,
    after: `By 5:45 PM the LBO model is complete: a two-page summary with the capital structure, debt schedule, equity return, and IRR sensitivity table. It's saved and added to the valuation summary alongside the comps and DCF. Tomorrow's task is due diligence document review — a very different kind of analytical work.`,
  },

  'ib-analyst-d2-b5': {
    before: `The last task of Day Two is building the valuation summary output — the 'football field chart' and supporting sensitivity tables that will anchor the valuation section of the pitch book. This is the document that GlobalCorp's board will stare at when deciding whether to approve the acquisition, so clarity and visual precision matter as much as analytical accuracy. The comps, DCF, and LBO are being synthesized into a single, coherent valuation story.`,
    simulatedWork: `[Scene: 6:15 PM. Most of the floor quiet. Excel and PowerPoint are open side by side on the Analyst's monitors.]

The Analyst lays out the three methodology ranges in Excel before building the chart.

Analyst (Investment Banking): "Three methodologies, three ranges. Comps: $2.2B to $2.7B. DCF base to bear: $1.9B to $2.35B. LBO: $2.1B to $2.8B. All three methodologies overlap in the $2.2 to $2.35 billion range — that's the zone of analytical consensus." [building the football field chart]

The Analyst copies the chart into PowerPoint and begins formatting it for client presentation.

Analyst (Investment Banking): "Now I need to show GlobalCorp's offer range against the analytical range. Their 6.5x to 7.5x revenue maps to $2.5 to $2.9 billion — at the top of and above the analytical range." [adding offer range overlay]

James walks over to review the screen.

James (Vice President): "The football field looks clean. One observation — your DCF is anchoring the low end. If Marcus presents this to GlobalCorp, they might use it to push back on paying $2.7B. Add a note that the DCF bear case assumes faster-than-expected growth deceleration."

Analyst (Investment Banking): "So caveat the lower bound of the DCF, not remove it?"

James (Vice President): "Exactly. The output should tell a complete story — not just the output that supports the highest valuation. That's how you maintain credibility with a sophisticated client."

The Analyst adds a footnote below the football field chart and formats the final slide.`,
    commentary: `The 'zone of analytical consensus' is not just a presentational concept — it's where genuine confidence in a valuation lives. When all three methodologies converge in the same range, you can defend the number from multiple angles. When they diverge significantly, you need to understand why before putting it in front of a client.

James's instruction to caveat rather than remove the DCF bear case is one of the most important lessons in this business: a credible advisor shows the full picture, not just the most convenient number. Clients who trust your analysis give you more business. Those who feel managed or manipulated don't. And sophisticated board members — which GlobalCorp has — will notice if the analysis has been cherry-picked to support the recommendation.

The football field is called that because it looks like one: horizontal bars showing the range of implied values under each methodology, with the offer price shown as a vertical line. It's the single most commonly used visual in M&A pitch books because it communicates everything a board needs to see in one chart.`,
    after: `By 9 PM a final valuation summary is complete: the football field chart, two-way sensitivity tables for the DCF and LBO, and a one-paragraph narrative anchoring the range. It's saved as 'ProjectApex_ValuationSummary_v1.0' and emailed to Sarah. Day Two is the hardest analytical day of the engagement — and it's done.`,
  },

  // ── Day 3: Due Diligence ───────────────────────────────────────────────────

  'ib-analyst-d3-b1': {
    before: `Marcus sent a late email last night: GlobalCorp's corporate development team is pushing the preliminary valuation timeline forward — they want a range by Friday, two days earlier than expected. The morning deal status call is where the team recalibrates the work plan to absorb that change. Due diligence is now running in parallel with pitch book preparation, which means the next two days will compress significantly.`,
    simulatedWork: `[Scene: The Analyst's desk, headset on. Deal status call dial-in active — Marcus, James, Sarah, and the Analyst on the line.]

Marcus (Managing Director): "GlobalCorp pulled the timeline in. They want a preliminary valuation range from us by Friday, not next week. That changes the schedule."

James (Vice President): "That means the pitch book needs a working draft by Thursday. The DD memo needs at least a preliminary version by the same time."

Sarah (Associate): "Who's owning the DD coordination?"

Marcus (Managing Director): "Sarah takes the data room and manages the document tracker. Analyst — I need you to get through the customer contracts and IP portfolio today and produce a risk summary by end of day tomorrow. Not a full memo — a one-page priority list of what concerns us most."

The Analyst pulls up a blank document and begins typing.

Analyst (Investment Banking): "Understood. Any specific areas to prioritize?"

Marcus (Managing Director): "Three things: customer concentration risk, change-of-control provisions in the major contracts, and the IP ownership chain. Those are the three deal-breakers if they're wrong."

James (Vice President): "And set up a fifteen-item DD tracking sheet in the shared drive. One row per workstream, owner, status, and deadline. I want to be able to look at one document and know where everything stands."

The Analyst adds items to the notes document.

Analyst (Investment Banking): "DD risk summary by tomorrow EOD. Tracker setup today. Three priority areas: customer concentration, change-of-control, IP chain." [writing]`,
    commentary: `When a client accelerates the timeline, everything compresses — and the team that handles compression well immediately resets priorities rather than trying to do everything at the original scope. Marcus's decision to ask for a 'one-page priority list of concerns' rather than a full DD memo is deliberate: he's trading completeness for speed, and he's making that call explicitly rather than pretending the original scope is still achievable.

The three risk areas he named — customer concentration, change-of-control provisions, IP ownership — are structurally the most dangerous for a deal of this type. Customer concentration because losing one big account post-close can materially affect the purchase price justification. Change-of-control because contracts may legally allow the customer to walk away when ownership changes. IP ownership because acquiring a software company whose core code has a disputed ownership chain can unravel an entire deal.

Recognizing why he chose those three, and not nine others, is how you develop deal intuition. Every deal has dozens of risks. The skill is knowing which three to find first.`,
    after: `The status call ends at 9:55 AM. The fifteen-item DD tracking sheet is built first — that creates the shared visibility Marcus needs immediately. Then the first tranche of TechVentures contracts in the data room is opened, starting with the top ten customer agreements that represent 38% of ARR.`,
  },

  'ib-analyst-d3-b2': {
    before: `The due diligence document review is a different kind of work than financial modeling — it requires careful, sequential reading of legal and commercial documents with a specific lens: what could go wrong, and does the contract language allow it? The customer subscription agreements are being reviewed, focusing on three areas Marcus identified: customer concentration exposure, change-of-control provisions, and any unusual termination rights. Ninety minutes remain before the CFO interview.`,
    simulatedWork: `[Scene: The Analyst's desk. Data room open — forty-seven customer contracts loaded as PDFs. The review begins with the ten largest accounts, in order of ARR.]

The Analyst opens the first contract and reads through the key terms section methodically.

Analyst (Investment Banking): "Annual subscription value $22 million. Three-year term, auto-renewing. Change-of-control clause... here it is." [reading] "'Customer may terminate this agreement with thirty days' written notice upon a change of control of Vendor.' That's a termination right."

The Analyst adds the finding to the risk tracker document.

Analyst (Investment Banking): "[Risk: Change-of-control termination right in Contract #1 — $22M ARR. Need to assess whether this is boilerplate or negotiated. Flag for legal DD.]" [typing]

The Analyst moves through accounts two through five — all Fortune 500 companies — reading the change-of-control sections of each.

Analyst (Investment Banking): "Same clause in accounts two, three, and four. Account five has a different version: 'Customer may request assignment consent upon change of control.' Slightly softer — it requires consent, not termination right." [annotating]

The Analyst opens a spreadsheet and runs a quick calculation.

Analyst (Investment Banking): "If the standard change-of-control clause is in all top ten accounts... that's approximately $85M of ARR at risk of being contractually terminable. At a 7x revenue multiple, that's a $595 million valuation exposure." [calculating]

The Analyst opens a chat window.

Analyst (Investment Banking): "Finding a pattern in the top customer contracts — standard change-of-control termination rights. Running through all ten accounts now. Preliminary: $85M ARR potentially at risk contractually. Will have the full count by end of day." [via chat]

Sarah (Associate, via chat): "Flag it. Marcus needs to know before the CFO call."`,
    commentary: `What I just found — a systematic change-of-control termination right across the largest accounts — is a potentially deal-altering discovery. Not necessarily a deal-killer, but something that changes how GlobalCorp needs to approach post-close customer outreach, and possibly how they structure the acquisition.

In due diligence, the job isn't to determine whether these risks are fatal — that's for lawyers and senior bankers — it's to find them, quantify them, and surface them quickly. The fact that the math was immediately run ($85M ARR × 7x = $595M valuation exposure) rather than just noting the contractual language is what makes a junior banker valuable in this process.

Change-of-control provisions exist because customers want the right to reconsider their relationship if the company they contracted with is sold to someone else. It's commercially reasonable — but from an acquirer's perspective, it means a portion of the revenue base could legally walk away on Day One. That's why these three words — 'change of control' — are in every M&A due diligence checklist.`,
    after: `By 11:45 AM all ten major customer contracts have been reviewed: change-of-control termination rights appear in eight of them, covering $83M of ARR. This is added as the top item in the DD risk summary with the valuation exposure calculation. The data room is closed and the CFO interview prep begins — the most important conversation of the week is at 1 PM.`,
  },

  'ib-analyst-d3-b3': {
    before: `The management interview with Tom Bradley, TechVentures' CFO, is the highest-stakes conversation of the week so far. Marcus and James are leading, but they asked the Analyst to join because the financial model was built here — if there are discrepancies between what Tom describes and what the CIM shows, the Analyst is the person in the room who will know it. The role is to listen carefully, track anything that contradicts the CIM, and pass written notes to James in real time. Speaking only when directly addressed.`,
    simulatedWork: `[Scene: Video call. Tom Bradley on screen — late forties, measured, clearly experienced with investor conversations. Marcus and James on camera. The Analyst is in the corner, camera off, with a notes document open.]

Marcus (Managing Director): "Tom, thanks for making time. We're working through the financial model and a few items came up that would benefit from your perspective. Starting with revenue quality — the CIM shows NRR of 118%. Can you walk us through the composition of that expansion?"

Tom (CFO, TechVentures): "Seat expansion is the primary driver — customers adding users as they grow into the platform. Roughly 60% of expansion. The remaining 40% is module upsell — customers adding analytics or workflow automation on top of the base CLM."

The Analyst types into the notes document immediately.

Analyst (Investment Banking): "[NRR composition: 60% seat expansion, 40% module upsell. Not in CIM — new detail.]" [typing]

James (Vice President): "And on the change-of-control provisions in customer contracts — we noticed a standard termination clause in several of the major agreements. How has that historically played out in prior transactions?"

Tom (CFO, TechVentures): [slight pause] "We haven't had a change-of-control transaction before. But I'll tell you that our renewal rates post any company change — including our Series D financing — have been strong. We have deep integration into our customers' operations."

The Analyst writes a flag in the document and underlines it.

Analyst (Investment Banking): "[First time Tom has faced this question in a deal context — be careful about the basis for his reassurance.]" [typing]

Marcus (Managing Director): "Last question — your EBITDA margin path. The CIM shows breakeven by year two. What's the single biggest variable that determines whether you hit that?"

Tom (CFO, TechVentures): "Sales headcount. We're investing heavily in enterprise sales. If those reps ramp to productivity on schedule, we hit the margin profile. If they don't, we'll be a quarter or two behind."

The Analyst adds a third item to the notes document.`,
    commentary: `Notice what I'm tracking in that notes document. The NRR composition detail Tom provided — 60% seat expansion, 40% module upsell — wasn't in the CIM. That's new information that changes how you model the durability of that 118% figure. If seat expansion is the primary driver, NRR is tied to customers' own growth, which is less controllable than module upsell driven by TechVentures adding features.

Tom's answer on change-of-control provisions also deserves scrutiny. His reassurance was based on customer stickiness and Series D continuity — not contractual protections, and not a precedent transaction. That's an important distinction when a $595M valuation exposure is sitting in the DD tracker. He's never done this before. That doesn't mean the risk is severe, but it means his confidence on this point is less evidence than it sounds.

The skill here is reading what's in the answer and what's deliberately or inadvertently omitted. CFOs in management interviews are not adversaries, but they're also not neutral — they have an interest in the transaction proceeding. Every answer warrants a second read.`,
    after: `The call ends at 2:25 PM. James and Sarah receive a two-page interview summary within twenty minutes, including the NRR composition detail, the change-of-control response with the analytical flag, and the EBITDA sensitivity to sales headcount ramp. Marcus replies with one word: "Good." The rest of the afternoon is the risk factor analysis.`,
  },

  'ib-analyst-d3-b4': {
    before: `Everything gathered today — the contract review findings, the CFO interview, and the financial model cross-checks — is being synthesized into a risk factor analysis. This isn't a formal legal DD memo; it's an internal analytical document that ranks the top risks by likelihood and financial impact, giving Marcus and the team a clear-eyed view of what could go wrong before they recommend a price to GlobalCorp.`,
    simulatedWork: `[Scene: The Analyst's desk. Three documents open simultaneously: contract review notes, CFO interview summary, and the financial model. The Analyst drafts the risk framework in a new document.]

Analyst (Investment Banking): "I'll organize by category: financial model risks, commercial risks, legal/structural risks." [drafting]

The Analyst writes the first risk entry under financial model risks.

Analyst (Investment Banking): "Risk 1: EBITDA margin — heavily dependent on sales headcount ramp. Tom confirmed this. If ramp is delayed by one quarter, year-two EBITDA could miss by 35%. Valuation impact: $120M on bear case DCF." [typing]

The Analyst moves to commercial risks.

Analyst (Investment Banking): "Risk 2: Change-of-control termination rights — $83M ARR contractually at risk. Even if customers don't exercise, GlobalCorp will need a dedicated Day One retention program. Valuation impact if 30% of at-risk ARR churns: approximately $175M." [typing]

Analyst (Investment Banking): "Risk 3: Customer concentration — top ten accounts at 38% of ARR. Losing even one large account post-close could be material. Need to flag this as an integration priority." [typing]

The Analyst moves to legal risks.

Analyst (Investment Banking): "Risk 4: IP ownership chain — haven't reviewed the IP schedule yet. Open item for tomorrow." [typing]

James walks by and reads the screen over the Analyst's shoulder.

James (Vice President): "Strong start. One thing — add a 'mitigation' column. GlobalCorp will ask 'so what do we do about this?' for each risk. They're not going to walk away from the deal over a change-of-control clause, but they want to see that we've thought through the response."

The Analyst adds the column and begins filling in mitigation notes for each existing risk.`,
    commentary: `The best risk analysis doesn't just list what can go wrong — it helps the client understand the magnitude and what they can do about it. James's instruction to add a mitigation column transforms a warning document into a decision-support document. Without it, you've handed GlobalCorp a list of problems. With it, you've handed them a framework for managing those problems.

Notice how each risk is quantified in dollar terms: $120M valuation impact on EBITDA slippage, $175M on customer attrition. That specificity is what makes the analysis actionable — it lets GlobalCorp weigh the risks against the deal price with real numbers, not vague concerns. A board director looking at a $2.5B acquisition can process '$175M downside scenario if 30% of at-risk ARR churns' much better than 'significant customer retention risk.'

This is also where the previous four days of work pay off: the $175M figure traces directly to the $83M ARR identified in the contract review and the 7x revenue multiple from the comps. Every piece of the analysis is connected.`,
    after: `By 5:30 PM a five-item risk analysis is complete with impact estimates and mitigation notes for four of the five items (IP remains open). It goes to Sarah and James for review before being added to the pitch book materials. The DD memo draft — a longer, more formal document — is the evening's work.`,
  },

  'ib-analyst-d3-b5': {
    before: `The due diligence memo is the formal written record of everything the team has reviewed, found, and assessed. It will eventually go to GlobalCorp's board as part of the pre-approval package. Tonight the preliminary version is being drafted — it won't be final until after more document review, but the structure needs to be in place so Marcus can review the framework tomorrow morning. Target: a well-organized first draft before midnight.`,
    simulatedWork: `[Scene: 6 PM. Floor is quieting down. The Analyst has a structured memo template open and the full set of DD notes organized beside it.]

The Analyst types the executive summary opening.

Analyst (Investment Banking): "This memorandum summarizes the preliminary due diligence findings of Morgan Stanley's advisory team on TechVentures Inc. in connection with the proposed acquisition by GlobalCorp. Our review covered financial statements, customer contracts, and management interviews conducted between [date] and [date]." [drafting]

The Analyst moves to the financial findings section.

Analyst (Investment Banking): "Financial Analysis: TechVentures demonstrates strong top-line growth consistent with the CIM — ARR of $383M representing 40% year-over-year growth. NRR of 118% reflects a combination of seat expansion (60%) and module upsell (40%), as confirmed in management interviews. We note that the EBITDA margin pathway disclosed in the CIM is contingent on the successful ramp of recently hired enterprise sales headcount..." [writing]

Two hours pass. The Analyst finishes the commercial risks section and reaches the IP placeholder.

Sarah (Associate): [phone call] "How's the DD memo coming?"

Analyst (Investment Banking): "I've got a draft executive summary, financial findings, and the commercial risks section. IP is still a placeholder — I haven't gotten through that section of the data room."

Sarah (Associate): "That's fine — flag it as a preliminary draft, Marcus will understand. Send me what you have before you leave. He'll review the structure in the morning and tell us what needs to be added."

The Analyst types a header on the IP section: "[PRELIMINARY — IP ownership review pending. Section to be completed following full data room access.]"`,
    commentary: `Writing a DD memo at the junior level isn't just document production — it's a test of your ability to communicate analytical conclusions clearly under time pressure. Notice the structure: executive summary first (conclusion first, details second), then findings organized by category, with open items explicitly flagged.

The discipline of noting what hasn't been reviewed yet, rather than omitting it or glossing over it, is fundamental to professional credibility. A memo that implies completeness when it isn't complete is far more dangerous than one that explicitly marks its own boundaries. Marcus knows this is a preliminary draft — but if the IP section simply didn't appear, he'd have no way of knowing whether it was reviewed and found clean, or simply skipped. The flag makes the status transparent.

This is also the professional habit that protects you when something goes wrong later. If an IP issue surfaces post-close, the memo shows it was flagged as an open item on Day Three. That matters.`,
    after: `The draft DD memo is sent at 11:45 PM — executive summary, financial findings, commercial risk section, and two flagged open items (IP ownership and full contract review). A note accompanies it: 'Preliminary — pending IP review and complete contract pass.' Marcus's feedback and the start of pitch book construction come in the morning.`,
  },

  // ── Day 4: Pitch Book ──────────────────────────────────────────────────────

  'ib-analyst-d4-b1': {
    before: `Today the work shifts from analysis to communication. The pitch book is the physical document Marcus will walk GlobalCorp's board through when they vote on the acquisition. It needs to be analytically rigorous, visually polished, and structured to build a persuasive narrative — not just a data dump. Marcus is running this planning session to align the team on flow, slide count, and the key messages each section must land.`,
    simulatedWork: `[Scene: Conference room. Marcus stands at the whiteboard writing a rough slide flow in marker. Sarah and James are seated. The Analyst sits at the end of the table with a notebook open.]

Marcus (Managing Director): "Here's the structure. Cover and agenda — two slides. Strategic rationale — four slides max. Situational overview of TechVentures — three slides. Financial analysis — five slides. Deal structure and process — three slides. Appendix."

Sarah (Associate): "Where are the risk factors going?"

Marcus (Managing Director): "One slide in the main deck, labeled 'Key Considerations.' We're not hiding them, but we're not leading with them either. Let GlobalCorp's board ask about risk — then we walk them through the full analysis."

James (Vice President): "Who owns which sections?"

Marcus (Managing Director): "Sarah takes strategic rationale and deal structure. James — financial analysis with support from the analyst. I'll do the TechVentures situational overview myself." He looks toward the Analyst. "Your job is to build every financial chart and table that goes into James's section, and do the final QC pass on the full deck before 6 PM tonight."

Analyst (Investment Banking): "What's the visual standard? Are we using the house template?"

Marcus (Managing Director): "Use the house template but customize the color scheme for GlobalCorp. Professional, not generic. I want this to look like it was built for them specifically, not pulled from a library."

The Analyst writes down the section assignments and QC deadline.`,
    commentary: `A pitch book planning session at this level reveals something important about how senior investment bankers think about risk communication. Marcus's decision to put risk factors on 'one slide, labeled Key Considerations' is a deliberate framing choice — he's not hiding material information, but he's controlling the sequence in which it's processed. Leading with risks creates anchoring effects that make it harder for the recommendation to land. Saving them for slide eighteen means the board has already absorbed the strategic logic before they encounter the caveats.

The instruction to 'customize for GlobalCorp specifically' is equally deliberate. It signals that this advisory relationship is personal, not transactional. Small details in how a document is presented — a color scheme that matches the client's brand, language that references their specific strategic priorities — affect how its conclusions are received.

Notice the QC assignment: the final pass on the full deck goes to the Analyst, not to a more senior person. That's trust, and it's accountability. If an error survives into the room, the Analyst owns it.`,
    after: `The planning session ends at 9:30 AM with a confirmed slide structure, ownership assignments, and a 6 PM deadline. The Analyst builds a slide tracker — twenty-three slides total, direct ownership of nine financial charts and the final QC pass. Work begins with the executive summary slides while the financial analysis is freshest.`,
  },

  'ib-analyst-d4-b2': {
    before: `The executive summary is the most important section of the pitch book — the two to three slides that define how GlobalCorp's board first understands the deal. If compelling and clear, the board is primed to engage with the analysis. If cluttered or hedged, the room is lost before the detail sections. Marcus will scrutinize every word of these slides, so precision and economy of language matter as much as visual design.`,
    simulatedWork: `[Scene: The Analyst's desk. PowerPoint open to the house template. Work begins on the executive summary section.]

The Analyst types the transaction overview headline.

Analyst (Investment Banking): "Transaction Overview. GlobalCorp Inc. proposes to acquire TechVentures Inc. for approximately $2.5 billion, representing 6.5x NTM Revenue and a 28% premium to TechVentures' last funding round valuation." [drafting]

The Analyst pauses and opens the CIM in a second window.

Analyst (Investment Banking): "Wait — do I know the last funding round valuation? Checking the CIM... Series E at $1.95B. 28% premium is correct." [verifying]

The Analyst builds the strategic rationale bullet points.

Analyst (Investment Banking): "Strategic Rationale: Accelerates GlobalCorp's enterprise SaaS strategy by three to four years versus organic development. Adds 340 Fortune 500 relationships to GlobalCorp's existing customer base. Cross-sell potential to GlobalCorp's 2,400 enterprise clients at $380M+ estimated addressable opportunity." [typing]

James walks by and stops at the desk.

James (Vice President): "Those bullets are good. But the last one — '$380M addressable' — where does that number come from?"

Analyst (Investment Banking): "I extrapolated from GlobalCorp's enterprise client count and TechVentures' average contract value. It's an estimate."

James (Vice President): "If it's an estimate, footnote it with your methodology. Never let an unsourced number sit in a client-facing document without attribution. If someone in that board meeting asks where it came from, the answer needs to be walkable on the spot."

The Analyst adds a footnote marker to the bullet and opens the footnote area at the bottom of the slide.`,
    commentary: `Every number in a pitch book must be defensible from primary sources or clearly attributed to your methodology. The moment James challenged the $380M cross-sell figure, he was doing exactly what an active board member will do in the presentation room.

If Marcus is asked 'where does that number come from?' and he doesn't know because it wasn't documented, it undermines not just the slide but his credibility. The habit of footnoting estimates isn't bureaucratic caution — it's professional armor. It forces you to be honest about the difference between a fact and an inference, and it gives Marcus everything he needs to defend the analysis in real time.

Notice also the instinct to verify the Series E valuation before putting the premium on the slide. A board director who attended the Series E closing will know the number. A 27% premium and a 28% premium are both defensible, but writing the wrong one is avoidable.`,
    after: `The remaining time is spent refining the executive summary: tightening language to remove hedged phrases, adding a source footnote to the cross-sell estimate with a brief methodology note, and applying GlobalCorp's brand colors to the template. By noon three polished executive summary slides are ready for James's review.`,
  },

  'ib-analyst-d4-b3': {
    before: `The financial analysis section is where the modeling work from the past two days becomes visual communication. The comps, DCF, LBO, and football field are being translated from Excel into PowerPoint — not just copying charts, but thinking about which output best supports the deal recommendation and at what level of detail a board audience can absorb the analysis without losing the key message.`,
    simulatedWork: `[Scene: The Analyst's desk. Excel and PowerPoint are split across two monitors. The financial model is open on the left, the presentation on the right.]

The Analyst begins building the football field chart in Excel before importing it.

Analyst (Investment Banking): "The chart needs three labels — Comparable Companies, DCF Analysis, LBO Analysis — with the ranges shown as horizontal bars. The overlap zone needs to be highlighted. Let me add a vertical line showing the proposed offer price of $2.5 billion." [building]

The overlap zone sits between $2.2B and $2.35B — slightly below the offer price. The Analyst stares at it.

Analyst (Investment Banking): "The offer is above the analytical consensus zone. That's going to be the first question in the room. I should add an annotation: 'Premium reflects strategic value to GlobalCorp not captured in financial benchmarks.'" [adding label]

The Analyst moves to the comps table slide.

Analyst (Investment Banking): "I need to cut this from seventeen companies to eight — a full table of seventeen is too much for a presentation slide. I'll keep the six closest functional comparables plus DocuSign as the well-known reference name." [trimming]

Sarah leans over from the adjacent desk.

Sarah (Associate): "The football field looks clean. One thing — the LBO bar ends at $2.8B. That's higher than the offer price. In the presentation, does that help or hurt GlobalCorp's position?"

The Analyst answers without hesitation.

Analyst (Investment Banking): "It helps — it shows there's a PE firm that could justify paying $2.8 billion, which tells GlobalCorp that they need to act to win the asset. It's a competitive urgency argument embedded in the valuation analysis."

Sarah (Associate): "Good thinking. Keep it."`,
    commentary: `The decision to annotate the football field with 'strategic value not captured in financial benchmarks' is not spin — it's an analytically legitimate observation. Comparable companies analysis captures how the market values similar businesses in isolation; it doesn't capture the value of integrating TechVentures into GlobalCorp's existing sales force and customer base. That distinction is real, and making it explicitly in the document helps the board understand why the premium is justified. Without that annotation, the chart invites the question; with it, the chart answers it.

Watch the observation about the LBO bar extending above the offer price. The immediate read was that it creates competitive urgency — a PE firm can justify paying more. That's exactly how a sophisticated senior banker would use it: not as a threat, but as a data point that tells GlobalCorp they are not the only rational buyer at $2.5B. The decision to keep it on the chart rather than trim it is the right call.

Reducing the comps table from seventeen to eight is also a communication decision, not an analytical one. Seventeen rows of data on a single slide overwhelms a board audience. Six well-chosen comparables plus one recognizable name anchor the analysis clearly.`,
    after: `By 3 PM five financial analysis slides are complete: the executive valuation summary, football field chart, comps table, DCF assumptions bridge, and sensitivity analysis. They're compiled into the master deck file and handed off to James for review before the 3:30 PM MD review session.`,
  },

  'ib-analyst-d4-b4': {
    before: `Marcus is reviewing the full pitch book draft in a two-and-a-half-hour session. This is the most high-pressure review of the week — Marcus will go slide by slide, and his feedback will be direct. The task is to take verbatim notes on every comment, prioritize the changes by urgency, and have a revised draft ready by midnight. Senior MDs can be demanding in review sessions; composure and speed matter as much as accuracy.`,
    simulatedWork: `[Scene: Conference room. Marcus has the full 23-slide deck projected on the wall. He's working through it at pace. The Analyst sits off to the side with a numbered comment log open.]

Marcus (Managing Director): [on the executive summary] "These strategic rationale bullets are too long. Cut each one by 40%. Board members read headlines, not paragraphs."

The Analyst writes the comment without looking up.

Analyst (Investment Banking): "Exec summary bullets — cut by 40%." [noting]

Marcus (Managing Director): [on the comps table] "Why eight companies? I see at least two in here that aren't real comparables. Ironclad is private — you can't use a private comp without disclosing the valuation methodology."

Analyst (Investment Banking): "I'll replace Ironclad with Conga — it's public and closer to TechVentures' deal volume profile."

Marcus (Managing Director): "Good. Make that change."

Marcus moves to the football field slide.

Marcus (Managing Director): "The football field is clean. One issue — the offer price line is labeled '$2.5 billion.' Change it to 'Proposed Transaction Value.' GlobalCorp hasn't locked the price yet and I don't want their board to see a specific number before the deal team has approved it."

James (Vice President): "Fair point."

Marcus (Managing Director): [on the risk slide] "This risk slide has five items. In the actual presentation, I'm going to cover three of them. Flag the other two as appendix items. The board can ask for them if they want the detail."

He continues through the remaining slides. Two hours later, he closes the deck.

Marcus (Managing Director): "Twenty-two comments total. I need a clean version tonight. Anything that isn't fixed by 6 AM tomorrow doesn't go in the room."`,
    commentary: `MD review sessions are intense — twenty-two comments in two hours is high but not unusual. Notice what Marcus is doing: he's not rewriting the deck himself, he's identifying specific, actionable changes and delegating execution. That's how senior bankers operate. The ability to capture feedback accurately, prioritize it, and execute without further clarification is the skill being tested here.

The instruction to change '$2.5 billion' to 'Proposed Transaction Value' is a window into deal dynamics worth understanding. Marcus is protecting GlobalCorp's negotiating position even in their own internal presentation. If the board anchors on $2.5B before the deal team has formally approved it, that number can acquire a kind of gravitational pull that limits flexibility later. Controlling the language controls the process.

The decision to move two risk items to the appendix is also deliberate. It's not hiding material information — it's controlling the sequence and pacing of the presentation. Three risks is manageable for a board discussion. Five risks starts to feel like a briefing against the deal.`,
    after: `The review session ends with twenty-two numbered comments, organized by priority and urgency. The Analyst is back at the desk at 6:15 PM and begins working through them systematically — structural changes first (removing two comps, cutting bullet length), then formatting changes, then the final QC pass.`,
  },

  'ib-analyst-d4-b5': {
    before: `Tonight is the final polish pass — taking Marcus's twenty-two comments and producing a client-ready pitch book. This requires both speed and precision: fast enough to finish before midnight, careful enough that no errors survive into the final draft. This is the moment when the discipline of careful work under fatigue either holds or breaks down.`,
    simulatedWork: `[Scene: 6:30 PM. Quiet floor. The Analyst has the MD comment list, the current deck, and the source Excel models all open simultaneously across two monitors.]

The Analyst works through the numbered comment list in order, checking each one off.

Analyst (Investment Banking): "Comment one: executive summary bullets shortened. Done. Comment two: Ironclad replaced with Conga. Checking — Conga, traded on NYSE, $1.8B market cap, enterprise CLM... confirmed, good comparable. Done." [checking off]

The Analyst moves through the middle section of the list steadily.

Analyst (Investment Banking): "Comment eleven: 'Proposed Transaction Value' — replacing all instances of the dollar amount. Searching through the deck... seven instances. Changed." [using find-and-replace]

At 9:30 PM, the Analyst reaches the last five formatting comments.

Analyst (Investment Banking): "Slide seventeen — the legend font is 9pt. Marcus wants it at 10pt minimum. Changing." [adjusting]

At 10:45 PM the Analyst opens a blank QC checklist document and begins the final pass.

Analyst (Investment Banking): "Running my QC pass: all numbers match the source Excel model. No standalone numbers — everything traces to a source. No 'TBD' placeholders remaining. Page count correct — 23 slides. Headers consistent. Footer has today's date and the confidentiality notice." [checking each item]

The Analyst composes an email to Sarah.

Analyst (Investment Banking): "Final deck attached — all 22 MD comments addressed. QC complete. Please flag anything before I send to Marcus." [email at 11:10 PM]

Sarah (Associate): [reply at 11:45 PM] "Looks clean. Sending to Marcus now."`,
    commentary: `The QC checklist run at the end — matching every number to its source model, verifying no standalone unattributed figures, checking that every placeholder is resolved — is the discipline that separates professional-grade work from 'good enough.' In a board presentation where a director might point to any number and ask where it came from, an unsourced figure is a credibility hazard.

Notice the detail work at 10:45 PM, when fatigue is real and the end is in sight. That's exactly when errors are most likely to slip through. The 'one more check' impulse is what builds strong reputations in this business. Sending the deck at 11:10 PM rather than 10:45 PM because the QC pass wasn't done — that fifteen minutes is the difference between professional and merely fast.

The search for all seven instances of '$2.5 billion' is also worth noting. A find-and-replace that catches six of seven still fails. Attention to completeness rather than adequacy is the standard.`,
    after: `Marcus confirms the deck at 12:20 AM with a single reply: "Print ten copies, conference room 4201, 9 AM." Tomorrow is the board presentation. Four days of analysis have been built into the document that will anchor one of the most important decisions GlobalCorp's board makes this year.`,
  },

  // ── Day 5: Board Presentation ──────────────────────────────────────────────

  'ib-analyst-d5-b1': {
    before: `It's the morning of the board presentation. Marcus has called a pre-meeting prep session — just the advisory team, no client yet — to walk through anticipated board questions, confirm roles, and make sure everyone is mentally and logistically ready. In a board presentation, preparation for the Q&A is at least as important as the quality of the deck itself. Hard questions will come; the team that handles them with composure wins credibility.`,
    simulatedWork: `[Scene: Conference room 4201. Marcus, James, Sarah, and the Analyst. Ten printed decks are stacked at the center of the table. The room is quiet.]

Marcus (Managing Director): "Quick run-through before GlobalCorp arrives. The board is twelve people — six independent directors, four company insiders, and two from their institutional investors. The two investor directors are the ones most likely to push on valuation. They've been through acquisitions before."

James (Vice President): "Likely questions?"

Marcus (Managing Director): "Why pay above the analytical range? Why now? What's the integration risk? What's the downside case if the change-of-control customers exercise termination rights?"

Sarah (Associate): "We have the answers for all four."

Marcus (Managing Director): "Yes. But the way you answer matters as much as what you answer. Don't fill silence. Give a direct answer, then stop talking. Let the board engage. If you start over-explaining, it sounds defensive."

Marcus turns toward the Analyst.

Marcus (Managing Director): "You're in the room in an observer role. If James signals you by tapping the table, it means he needs a specific number from the model. Have the model open on your laptop. Don't volunteer to speak, but be ready to answer a direct question from the board accurately and briefly."

Analyst (Investment Banking): "Understood."

Marcus (Managing Director): "Any questions from the team? Good. We go in at ten thirty."

The Analyst opens the laptop and navigates directly to the financial model, bookmarking the key output tabs.`,
    commentary: `Marcus's preparation for Q&A reveals something fundamental about how senior advisors think about presentations: the deck is the backdrop, not the substance. The real communication happens in how the hard questions are handled.

His instruction — 'give a direct answer, then stop talking' — is the single most powerful piece of presentation advice in any professional context. Over-explaining signals anxiety and invites further scrutiny. A clean, direct answer signals confidence and invites acceptance. Every word after the answer starts eroding the answer.

The role in the room as 'live analytical support' is also instructive. In high-stakes presentations, there's always someone whose job is to be the number — to have the model open and the right cell bookmarked. That role sounds junior, but it builds trust with the senior banker who can call on it. When Marcus taps the table and gets the right number in four seconds, it signals to the entire room that the analysis is deep and prepared, not just polished.`,
    after: `The team disperses briefly to collect printed materials and confirm logistics. The Analyst opens the laptop, navigates to the financial model, and bookmarks the key outputs: the football field, the comps table, the sensitivity analysis, and the LBO IRR. GlobalCorp's board members begin arriving in the hallway at 10:25 AM.`,
  },

  'ib-analyst-d5-b2': {
    before: `The full team is running through the presentation once more — not for content review, but for pacing, handoffs, and Q&A simulation. Sarah will play a skeptical board director and challenge the team on its hardest questions. This run-through is about finding the moments that feel unsteady and making them solid before the real audience arrives.`,
    simulatedWork: `[Scene: Same conference room. Sarah is seated across from Marcus and James, acting as a skeptical board director. The Analyst observes from the side and tracks timing.]

Marcus (Managing Director): [presenting from the deck] "The proposed transaction creates a unique opportunity for GlobalCorp to accelerate its enterprise SaaS strategy. TechVentures' NRR of 118% and its 340 Fortune 500 relationships..."

Sarah (Associate): [interrupting, in character] "Marcus, stop. You're at $2.5 billion and the analytical range tops out at $2.7 billion — but the DCF median is $2.2 billion. Why should we pay above the analytical midpoint?"

Marcus (Managing Director): "The DCF reflects TechVentures as a standalone entity. The value to GlobalCorp is not standalone — it's the cross-sell potential into GlobalCorp's 2,400 enterprise clients, which we estimate at $380 million of incremental ARR opportunity. That value doesn't appear in a standalone DCF."

Sarah (Associate): [in character] "What does 'estimate' mean? How did you arrive at that number?"

James (Vice President): "We applied TechVentures' average deal size — $1.1 million per enterprise customer — against the subset of GlobalCorp clients in industries where CLM adoption rates are above 30%. The $380 million represents roughly 350 accounts. We footnoted the methodology on slide eight."

Sarah (Associate): [breaking character] "Good. Marcus, that answer was clean. James — lead with the methodology next time, before they ask."

James (Vice President): [noting] "Understood."

The Analyst writes the coaching note in the prep log.`,
    commentary: `The run-through exposed something important: Marcus's initial answer was correct but vague on the methodology. When Sarah pushed — 'what does estimate mean?' — James stepped in with the precise build. That's good teamwork, but in the real presentation, the follow-up shouldn't be needed. The first answer should include enough specificity to preempt the question.

This is the difference between a board-ready presentation and a very good internal one. Anticipating the follow-up question and folding the answer into the first response — 'we applied TechVentures' average deal size against GlobalCorp's CLM-adjacent clients, methodology on slide eight' — takes thirty extra words and eliminates the risk of a tense two-exchange sequence with a skeptical director.

Notice also that Sarah concluded by coaching in real time: 'lead with the methodology next time.' That's what high-performing advisory teams do in prep sessions — they self-correct aggressively, with enough time left to absorb the correction before the real presentation.`,
    after: `The run-through ends at 10:50 AM. Marcus is satisfied with the team's readiness. The printed decks are distributed, the room is arranged, and board members begin filtering in. Marcus stands near the door to greet GlobalCorp's CEO. The Analyst takes a seat near the back wall, laptop open to the model. The real presentation begins in ten minutes.`,
  },

  'ib-analyst-d5-b3': {
    before: `The board presentation is the culmination of four days of analytical work. Twelve GlobalCorp board members are in this room, including two institutional investor directors who have evaluated hundreds of M&A transactions. Marcus will walk them through the full pitch book — strategic rationale, TechVentures overview, financial analysis, and deal structure. James will present the financial analysis section. The team has prepared for every question; now it's about execution.`,
    simulatedWork: `[Scene: Boardroom. Twelve directors seated around a large table. GlobalCorp's CEO at the head. Marcus standing at the front with the deck projected. The Analyst is at the back wall, laptop open, model loaded.]

Marcus (Managing Director): "Good morning. We've advised on over forty enterprise technology transactions in the past three years. This is among the most strategically compelling we've seen for a company of GlobalCorp's profile."

Marcus works through the strategic rationale section — clean, crisp, three minutes per slide. He yields to James for the financial analysis.

James (Vice President): "The comps analysis reflects current market trading. Enterprise SaaS companies with comparable growth profiles — thirty to forty percent ARR growth — are trading at a median of 6.2x NTM Revenue. TechVentures' proposed acquisition price of 6.5x represents a measured premium to that median."

David (CFO, GlobalCorp): [from the table] "The DCF midpoint is $2.2 billion. You're proposing $2.5 billion. Walk me through the basis for the delta."

James (Vice President): "The delta reflects strategic value not captured in a standalone DCF: the cross-sell opportunity into GlobalCorp's enterprise client base. We estimate $380 million of addressable ARR using GlobalCorp's 2,400 enterprise clients filtered by CLM adoption rates above 30%, and TechVentures' average deal size of $1.1 million per customer. Methodology is footnoted on slide eight."

The investor director nods and flips to slide eight.

A second director speaks from across the table.

Investor Director #2: "Change-of-control provisions in customer contracts — how material is that risk?"

Marcus (Managing Director): "Real risk that we've quantified. $83 million of ARR in the top ten accounts has contractual termination rights upon change of control. We recommend a dedicated Day One customer engagement program targeting those ten accounts, with retention packages for key account managers. If 30% of that ARR exercises termination rights, the valuation impact is approximately $175 million — manageable within the deal economics."

The board deliberates for ten minutes after the full presentation concludes.

GlobalCorp's CEO announces they will move to exclusive negotiations.`,
    commentary: `What I'm watching here is the culmination of analytical work becoming a decision. James's answer to the $2.5B versus $2.2B DCF delta was the moment the board either accepted or rejected the recommendation — and it worked because the methodology was specific, footnoted, and had been pressure-tested in the run-through.

Notice how Marcus handled the change-of-control question: he named the number ($83M), quantified the downside scenario ($175M), proposed a mitigation, and declared it manageable. He didn't hedge or minimize — he gave the board what they needed to make a decision. The combination of honesty and analytical rigor is what builds long-term advisory relationships. A board that feels they received a complete picture — risks included — trusts the recommendation more, not less.

Watch the investor director flip to slide eight immediately after James mentioned the footnote. That's the detail discipline paying off in real time. The methodology was there because it was footnoted on Day Four. The footnote existed because James asked for it on Day Four. The chain of preparation running through the entire week is what makes a presentation hold under scrutiny.`,
    after: `The board votes to authorize exclusive negotiations with TechVentures at a price not to exceed $2.6 billion — inside the upper end of the analytical range. Marcus shakes hands with GlobalCorp's CEO. Sarah catches the Analyst's eye and gives a slight nod across the room. Four days of analysis just authorized a $2.6 billion deal.`,
  },

  'ib-analyst-d5-b4': {
    before: `The board has authorized exclusive negotiations. Now the post-presentation working session begins — GlobalCorp's deal team stays in the room to debrief with the advisory team and begin translating the board's authorization into a concrete process plan. This session will define the negotiation parameters, due diligence timeline, and regulatory approvals needed to close. What was strategic yesterday becomes tactical today.`,
    simulatedWork: `[Scene: Conference room, board members have departed. GlobalCorp deal team — CEO, CFO, Head of Corporate Development — seated with Marcus, James, Sarah, and the Analyst.]

Richard (CEO, GlobalCorp): "Good work this morning. Board is aligned at up to $2.6 billion. What's the path from here?"

Marcus (Managing Director): "Three parallel workstreams. First, negotiation — we approach TechVentures' bankers this week and establish whether $2.5 billion is their walk-away number or a starting point. Second, confirmatory due diligence — two to three weeks of deeper financial, legal, and technical review. Third, regulatory — we need to assess Hart-Scott-Rodino filing timing. James, what's our read on HSR?"

James (Vice President): "At $2.5 billion, HSR filing is required. Standard review is thirty days. We don't see major antitrust concerns given the CLM market structure, but we should get outside antitrust counsel to confirm."

Mia (Head of Corporate Development): "On the change-of-control customer risk — you recommended a Day One engagement program. How quickly can we activate that?"

Sarah (Associate): "We recommend activating it immediately post-LOI, before the transaction is public. TechVentures' executive team can co-present with GlobalCorp's team to the at-risk accounts. That's the most effective mitigation."

James turns toward the Analyst and taps the table once.

Analyst (Investment Banking): "The ten at-risk accounts represent $83M ARR. If we can secure even informal verbal commitments from the five largest before close, that addresses $61M of the exposure."

James (Vice President): "Good number. Add that to the post-close risk log."

The Analyst notes it immediately.`,
    commentary: `The transition from the formal presentation to this working session is a shift from persuasion to execution. Everyone in the room has already made their decision — now they're moving into logistics. Notice how Marcus immediately restructured the conversation into three parallel workstreams: negotiation, due diligence, regulatory. That's how experienced deal managers prevent complexity from becoming chaos — they name the tracks and assign ownership before anyone leaves the room.

HSR — the Hart-Scott-Rodino Antitrust Improvements Act — requires parties to large transactions to notify the Federal Trade Commission and Department of Justice before closing. At $2.5 billion, filing is mandatory. The thirty-day review clock doesn't start until the filing is complete, which is why James's answer immediately flags the need to engage antitrust counsel: any delay in filing is a delay to close.

The five-account calculation was small but useful: it made an abstract risk mitigation proposal concrete by quantifying exactly where the value recovery lives. 'Target the five largest accounts' is more actionable than 'implement a Day One program.' In post-authorization working sessions, specificity moves things forward.`,
    after: `The working session ends at 3:50 PM. A new action list is built: prepare the LOI draft framework, compile the HSR preliminary filing checklist, and build an updated timeline from LOI to close. Marcus thanks the team as the GlobalCorp executives leave. 'One down,' he says. 'Now the real work starts.' He means the negotiation.`,
  },

  'ib-analyst-d5-b5': {
    before: `The last task of the week is documentation — capturing everything that happened today in a deal update memo and setting up the next-steps tracker for the LOI and negotiation phase. In a complex transaction, the transition from pitch phase to negotiation phase involves dozens of moving parts. The task is to make sure none of them fall through the cracks by creating a structured record while everything is fresh.`,
    simulatedWork: `[Scene: The Analyst's desk, 4:30 PM. The deal update memo and next-steps tracker are being drafted in parallel documents.]

The Analyst opens a new memo document and begins typing.

Analyst (Investment Banking): "Project Apex — Deal Update Memo. Date: [today]. Status: GlobalCorp board authorized exclusive negotiations at up to $2.6B. Next phase: LOI negotiation and confirmatory due diligence." [drafting]

Analyst (Investment Banking): "Key outcomes from today's board presentation: (1) Valuation rationale accepted — cross-sell methodology endorsed at $380M addressable ARR. (2) Change-of-control customer risk acknowledged — Day One engagement program approved as mitigation. (3) HSR filing timeline under evaluation — antitrust counsel to be engaged this week." [continuing]

The Analyst switches to the next-steps tracker document and builds the action table.

Analyst (Investment Banking): "Action 1: Draft LOI framework — Owner: Marcus/James. Deadline: Wednesday.
Action 2: Engage antitrust counsel for HSR assessment — Owner: James. Deadline: Monday.
Action 3: Activate TechVentures outreach through Goldman — Owner: Marcus. Deadline: Monday.
Action 4: Compile ten at-risk customer contact list for Day One program — Owner: Sarah/Analyst. Deadline: Wednesday." [building the table]

James reviews the tracker over the Analyst's shoulder.

James (Vice President): "This is clean. One addition — add a 'Board Communication' action item for Marcus to send GlobalCorp's independent directors a brief memo confirming the process timeline. They authorized this morning; we want to keep them informed."

The Analyst adds the row.

Analyst (Investment Banking): "Action 5: Board communication memo — Owner: Marcus. Deadline: Tuesday." [adding]`,
    commentary: `Closing out a week in investment banking with a clean documentation pass isn't glamorous, but it's how deals close successfully rather than falling apart on coordination failures. The next-steps tracker isn't just a task list — it's a shared commitment structure that makes every open item visible to every stakeholder simultaneously.

Notice the tracker is organized by owner and deadline, not by category or priority. That's intentional. In a fast-moving transaction, people need to know what they're personally responsible for. A tracker organized by workstream tells you the deal's structure. A tracker organized by owner tells each person what they owe the team by when.

James's addition — the board communication memo — is also worth absorbing. After a board authorizes a transaction, the independent directors need to hear next steps directly from the advisory team. Keeping them informed reduces the risk of a director calling the CEO six days later with unresolved concerns that slow the process. Proactive communication is deal hygiene.

Watch what's happened over these five days: a blank Excel sheet on Monday morning became a $2.6 billion board authorization by Friday afternoon. That's the pace of this work. Week two starts Monday.`,
    after: `The deal update memo and next-steps tracker go to the full team at 6:45 PM on Friday. Marcus replies at 7:12 PM with two words: "Good week." In investment banking, that's high praise. The laptop is closed, model versions are saved to the shared drive, and the floor empties out. The next phase of the deal starts in 60 hours.`,
  },
}
