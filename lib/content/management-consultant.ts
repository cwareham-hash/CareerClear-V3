import type { TimeBlockContent } from '../simulation'

// Meridian Retail Cost Transformation — $50M savings mandate
// Cast: Priya Nair (EM), David Cho (Senior Manager), Katherine Wells (Partner),
//       Mike Torres (VP Operations, Meridian), Sandra Hill (CFO, Meridian),
//       Jamie and Will (fellow analysts on the team)

export const managementConsultantContent: Record<string, TimeBlockContent> = {

  // ── Day 1: Client Kick-off ─────────────────────────────────────────────────

  'management-consultant-d1-b1': {
    before: `The Analyst's first morning on the Meridian Retail engagement begins with an internal team alignment call. Meridian is an $800M regional retailer that brought in the firm to find $50M in sustainable cost savings. The four-person team consists of Priya Nair (Engagement Manager), David Cho (Senior Manager), and two fellow analysts — Jamie and Will. This call happens before any client contact: it's where the team establishes working norms, divides workstreams, and makes sure everyone understands the mandate before walking into the client building.`,
    simulatedWork: `[Scene: Zoom call — Priya and David on screen, Jamie and Will in separate windows. The Analyst joins from a hotel room near Meridian's headquarters, laptop open to a blank notes document.]

Priya (Engagement Manager): "Welcome to the Meridian engagement. Quick context before the client kick-off tomorrow: this is a cost transformation, not a strategy project. The CEO wants $50 million in savings. Our job is to find them, quantify them, and make sure leadership believes they're real and achievable."

David (Senior Manager): "Three workstreams: supply chain and procurement, SG&A overhead, and store operations. Each analyst owns one. Jamie — supply chain. Will — store operations. SG&A and corporate overhead goes to our third analyst."

The Analyst types the workstream assignment and looks up at the screen.

Analyst (Consulting): "Is there existing benchmark data for retail SG&A to pull before the kick-off?"

Priya (Engagement Manager): "Yes — use our retail benchmark database. Meridian's SG&A as a percentage of revenue is roughly 24%. Retail best-in-class is closer to 19%. That 5-point gap at $800M revenue is $40 million of potential. But we don't know what's real until we dig into the structure."

David (Senior Manager): "One more thing — the CFO, Sandra Hill, is skeptical. She's been through two prior consulting engagements that produced reports that sat on a shelf. Our credibility with her is zero until we demonstrate that we're going to produce real results, not a slide deck."

The Analyst writes a note and underlines it twice: "Sandra Hill — skeptical CFO. Demonstrate practical, actionable orientation from day one."`,
    commentary: `I came to that team alignment knowing Priya would set the tone before anyone walked into the client building — and she did exactly that. She anchored the whole engagement in Sandra's language: fifty million dollars of real savings, not a slide deck. That framing matters more than it sounds. When a skeptical CFO hears us say it in her terms from day one, we're already signaling we understand what she needs.

My question about benchmark data before the kick-off was intentional. I didn't want to walk into a client room empty-handed. Having a preliminary view — even a rough one — means I ask better questions. I notice inconsistencies faster. Watch how that plays out in the workshop: I already know corporate overhead is running 240 basis points above best-in-class before Sandra mentions it.

David's warning about Sandra is the most important sentence spoken on this call. The relationship risk — a CFO who has been burned twice — is as real as any analytical risk on the engagement. Notice how I immediately wrote it down and flagged it as a day-one behavioral priority, not just background context. In consulting, client relationship intelligence belongs in the same place as analytical findings.

If I'd arrived cold, the first week would have been pure listening. Instead, I can listen and interrogate at the same time.`,
    after: `The call ends at 9:25 AM. The Analyst spends the rest of the morning pulling Meridian's public filings and the firm's retail benchmark database. By the time the team walks into the client site, a preliminary view of where Meridian's SG&A structure sits relative to the industry is already forming. The kick-off workshop is tomorrow at 1 PM.`,
  },

  'management-consultant-d1-b2': {
    before: `The Analyst has roughly two hours before the client kick-off workshop to build a knowledge foundation on Meridian's business and the retail cost structure landscape. This isn't passive background reading — it's building a working hypothesis about where the $50M might come from so sharper questions can be asked in the room. A consultant who walks into a client meeting already thinking about specific hypotheses extracts far more insight than one who arrives cold.`,
    simulatedWork: `[Scene: Hotel business center. Laptop open — Meridian's most recent 10-K, the firm's retail benchmark database, and a notes document side by side.]

The Analyst opens the 10-K and begins reading from the income statement, highlighting figures and cross-referencing the benchmark database.

Analyst (Consulting): "Net revenue $807M. Gross margin 38.4% — slightly below sector median of 40.1%. That suggests either pricing pressure or higher cost of goods. SG&A $194M — 24% of revenue. Confirmed."

The Analyst opens the benchmark database and begins pulling retail SG&A comparisons.

Analyst (Consulting): "Best-in-class retail SG&A: 19.2%. Category breakdown... Corporate overhead: Meridian at 8.1% of revenue, benchmark 5.7%. There's the gap — corporate is the first place to look."

The Analyst pulls up a blank slide and begins sketching a hypothesis tree — three branches, each labeled with a potential savings area.

Analyst (Consulting): "If corporate overhead can come down to 6.5% — a conservative version of best-in-class — that's $12M in savings just from overhead rationalization. The rest of the $50M has to come from supply chain and store operations."

The Analyst scrolls to the store count section of the 10-K and reads carefully.

Analyst (Consulting): "142 stores, average size 18,000 square feet. Some markets have four stores within fifteen miles of each other. Store overlap analysis could reveal consolidation opportunities — but that's Will's workstream."

The Analyst opens a separate note and flags it.

Analyst (Consulting): "Store overlap question — mention to Will before the workshop. He may not have seen this yet."`,
    commentary: `Building a hypothesis before entering a client engagement isn't arrogance — it's discipline. Notice how arriving with a specific hypothesis ("corporate overhead looks like a $12M opportunity") changes the nature of the questions asked in the kick-off. Instead of learning what the cost structure looks like, the Analyst can probe whether the hypothesis holds — which is a much more efficient use of sixty minutes with a senior leadership team.

This is what consulting frameworks like the "hypothesis-driven approach" actually mean in practice. It's not about being right before you've done the work; it's about having a testable view that the data can confirm or destroy. A hypothesis that gets refuted in the first interview isn't a failure — it's a redirection that saves a week of analysis in the wrong direction.

Watch what else happens here: the Analyst notices a store overlap pattern in the 10-K and immediately flags it for a teammate's workstream. Consulting teams operate as a unit. Information spotted in one workstream often has implications for another — and the discipline of surfacing those connections in real time is what separates an engaged analyst from one who just works their lane and nothing else.

The work done here in two hours sets up every good question asked in the room this afternoon.`,
    after: `By 12:30 PM the Analyst has a one-page preliminary hypothesis — three potential savings areas, rough size estimates, and the key questions needed in the workshop to test them. Priya reviews it during the drive to Meridian's headquarters and adds two questions of her own. The team walks in with a working framework, not a blank notebook.`,
  },

  'management-consultant-d1-b3': {
    before: `The client kick-off workshop is a two-hour facilitated session with Meridian's senior leadership team — the CEO, CFO, VP Operations, Head of HR, and three regional directors. The consulting team is running it. The objectives are: align on the project mandate, understand the organizational context, establish the baseline cost structure, and build enough trust with the leadership team that they'll share real information over the coming weeks. First impressions matter enormously.`,
    simulatedWork: `[Scene: Meridian headquarters, large conference room. Nine Meridian executives seated around the table. Priya stands at the front of the room. The Analyst is positioned at the side with a laptop and a printed note-taking template.]

Priya (Engagement Manager): "Thank you for your time this afternoon. We're here to get your perspectives on where the cost opportunities are and what constraints we need to respect. Let me start with a question for the group — when you think about where $50 million of sustainable savings might come from, what areas do you expect us to find it, and what areas concern you most?"

Tom (CEO, Meridian): "Honestly, procurement is where I'd start. We're buying too many different items from too many vendors. Our scale should give us more pricing power than we're getting."

Sandra (CFO, Meridian): "I'd add that we've grown corporate headcount faster than revenue for the last three years. But I want to be clear — we've been through two consultants before. They both told us what to cut. Neither of them helped us figure out how to actually do it. That's what we need this time."

Priya (Engagement Manager): "Understood. Our commitment to you is that every recommendation will come with a specific implementation path, a named owner, and a realistic timeline. We won't leave you with a list."

Mike (VP Operations, Meridian): "One constraint worth naming early — we're in holiday planning right now. Any changes to store operations between October and January are off the table."

The Analyst writes the constraint in the tracking document immediately and glances at Will across the table.

Priya (Engagement Manager): "Good to know. We'll account for that in the workstream timeline."

The Analyst passes a written note to Will: "Holiday blackout Oct–Jan. Store ops timeline needs to shift. Talk after."`,
    commentary: `Sandra Hill's comment about the two prior consulting engagements is the most important thing said in this room today. She's telling the team exactly what has failed before and what success looks like to her — not analysis, but actionable implementation. Notice how Priya's response ("every recommendation will come with a specific implementation path") isn't a generic reassurance — it's a direct, binding commitment that will shape every deliverable from this point forward.

This is what good engagement management looks like from the front of the room. Priya heard Sandra's constraint and immediately translated it into a structural requirement for the whole team. Every slide, every output, every conversation with Sandra from here forward gets filtered through that commitment.

The note I passed to Will isn't administrative noise. The holiday blackout is an operational constraint that affects workstream sequencing — and the moment Mike named it, it became a project management issue. If that information sits in a notebook and doesn't reach Will before tomorrow morning, his timeline gets built on an assumption that's already wrong. Catching those constraints early and surfacing them immediately is one of the highest-value things an analyst does in a client meeting.

Watch how this constraint reshapes the work plan built tonight.`,
    after: `The workshop ends at 3:15 PM. The Analyst captured fourteen pieces of specific insight, three constraints, and six potential data sources that Meridian is willing to share. Priya facilitates a quick debrief on the sidewalk: "Good session. Sandra thawed slightly at the end. We need to reward that by being excellent in the first deliverable." Back at the hotel, the SG&A analysis framework setup begins.`,
  },

  'management-consultant-d1-b4': {
    before: `The hypothesis tree session is a team working session — no client present. The goal is to collectively build a structured map of every potential cost savings hypothesis across all three workstreams, then prioritize them by estimated size and confidence level. A well-built hypothesis tree does two things: it ensures no major opportunity gets missed, and it creates the analytical roadmap for the next two weeks. Priya is facilitating; the full team is contributing.`,
    simulatedWork: `[Scene: Hotel conference room. Priya stands at the whiteboard with a marker. The Analyst, Jamie, and Will are seated around the table with laptops open.]

Priya (Engagement Manager): "Let's build the hypothesis tree. Three branches: supply chain, SG&A, and store operations. Under each branch — three to five sub-hypotheses with an estimated size. Start with supply chain. Jamie?"

Jamie (Analyst): "Vendor consolidation — Meridian is buying from over 400 vendors. Best-in-class retail consolidates to 120 to 150 key vendors and negotiates volume-based pricing. Estimated savings: $8 to $12 million."

Priya (Engagement Manager): "How confident?"

Jamie (Analyst): "Medium. We need the vendor spend data to confirm."

Priya (Engagement Manager): "SG&A — walk us through it."

The Analyst leans forward, referencing notes from the morning's research.

Analyst (Consulting): "Two sub-hypotheses. First, corporate overhead rationalization. Meridian's corporate headcount as a percentage of revenue is 40% above the benchmark. If the gap closes by half, that's $9 to $12 million. Second, technology spend — the 10-K shows IT costs growing at 14% per year while revenue is flat. Software license consolidation could yield $3 to $5 million, though confidence is lower there."

David (Senior Manager): "The IT one is interesting. Do we know how many software systems they're running?"

Analyst (Consulting): "Not yet. Mike Torres mentioned in the workshop that they have seventeen different ERP systems across regions. That's the one worth digging into."

Priya (Engagement Manager): "Good catch. Add that as a confirmed sub-hypothesis — seventeen ERPs is a cost and integration problem. Will — store operations?"

Will (Analyst): "Four stores within fifteen miles in two markets. Potential consolidation — but I need foot traffic and revenue-per-square-foot data before I can size it."`,
    commentary: `Hypothesis trees are a consulting discipline called MECE thinking — Mutually Exclusive, Collectively Exhaustive. The idea is to build a framework that covers the full problem space without overlap between categories. Notice how Priya structured the tree: three workstreams that together cover every dollar of Meridian's cost base, with no category counted twice.

But the more important thing to watch is how she immediately asked "how confident?" after every estimate. That's not skepticism — that's forcing the team to separate what they know from what they're inferring. A confirmed fact and a working hypothesis require very different levels of analytical confidence before they become a client recommendation. Conflating the two is one of the most dangerous mistakes in consulting work.

The IT detail I surfaced — seventeen ERPs — came directly from paying attention in the kick-off, not from any data request. A number mentioned casually by Mike Torres in a ninety-minute workshop became a confirmed sub-hypothesis thirty minutes later. That's what active listening looks like in a client context. Good analysis often starts not with Excel but with noticing.

This tree is imprecise right now. By the end of the week it will be the backbone of a $50 million recommendation.`,
    after: `By 6 PM a fifteen-item hypothesis tree covers $42 to $62 million of potential savings — in range but not confirmed. Priya assigns priority investigations for tomorrow's stakeholder interviews. The SG&A owner takes corporate headcount analysis and IT software spend. The interviews with the VP Operations and CFO are scheduled for tomorrow morning.`,
  },

  'management-consultant-d1-b5': {
    before: `The work plan and timeline document is the team's operating manual for the next four weeks — it translates the hypothesis tree into a sequenced set of analytical activities, data requests, and deliverable deadlines. It establishes accountability: who owns what, by when. Building a rigorous work plan early prevents the common consulting failure mode of everyone working hard in parallel but producing outputs that don't connect into a coherent recommendation.`,
    simulatedWork: `[Scene: The Analyst's hotel room, 6:15 PM. Laptop open, a new Excel workbook labeled "Meridian_Workplan_v1." The hypothesis tree notes are spread on the desk.]

The Analyst structures three phases across the workbook, adding columns for workstream, owner, deliverable, and deadline.

Analyst (Consulting): "Three phases: data gathering and interviews this week, analysis and quantification next week, recommendation development in week three. Deliverables: preliminary findings at end of week two, final recommendations at end of week three."

The Analyst builds out the week-by-week detail, pausing to check the constraint log from the kick-off.

Analyst (Consulting): "Week 1, day 2: Stakeholder interviews — Operations in the morning, Finance in the afternoon. Data requests submitted by end of day to each workstream owner."

The Analyst scans back through the plan and stops.

Analyst (Consulting): "Week 1 data request — the specific fields haven't been defined yet. Need a data request tracker as a separate tab: workstream, specific data needed, format, requested-by date."

The Analyst adds a new tab and begins populating it.

Analyst (Consulting): "SG&A data requests: org chart with headcount and grade by department; loaded cost per headcount by department; IT software license inventory with vendor, annual cost, and user count; last 24 months of corporate T&E spend by function."

A comment appears in the shared drive at 10:30 PM.

Priya (Engagement Manager): "Add a risk log tab — call out the constraints captured today so they don't get forgotten. Store ops holiday freeze, Sandra's implementation requirement."`,
    commentary: `A work plan is only as good as its data request section. I've seen consulting projects fall behind not because analysis was slow, but because the data needed to do the analysis wasn't requested early and specifically enough. Notice how the tracker specifies exact fields, format, and deadlines — not just "send us your headcount data." A vague request gets a vague response. A specific request gets the exact file you can build a model from.

Priya's addition of a risk log is equally critical. Constraints captured in a kick-off meeting get forgotten the moment the team shifts into analytical mode — especially when you're working 12-hour days and focused on your own workstream. Writing them in a shared, visible document keeps them alive. The holiday blackout and Sandra's implementation requirement are both constraints that could invalidate a recommendation if they're missed in week three.

Building this tonight — on day one, before any data has arrived — is an act of protecting your future self. The work plan doesn't slow down the engagement; it prevents the frantic scrambling that happens when week two arrives and nobody has the data they needed.

This is also the moment when the engagement's analytical architecture gets set. The tabs you build tonight become the template everyone works from for the next four weeks.`,
    after: `The work plan and data request tracker are finished at 11:20 PM and shared to the team drive. Priya sends a quick message: "Good work plan. Send data requests to Mike Torres first thing tomorrow before the interviews." Day one is done — tomorrow the real information gathering begins.`,
  },

  // ── Day 2: Data Gathering ──────────────────────────────────────────────────

  'management-consultant-d2-b1': {
    before: `The daily standup is a fifteen-minute team check-in at the start of every engagement day — not a formal meeting, but a quick sync to share what everyone learned yesterday, surface any blockers, and recalibrate the day's priorities. This one has a specific agenda item: the data requests went out to Meridian last night, and there's already a response from Mike Torres.`,
    simulatedWork: `[Scene: Hotel lobby, early morning. The four analysts and Priya stand in a loose circle with coffee cups. David dials in from a separate hotel a few blocks away.]

Priya (Engagement Manager): "Quick hits. Jamie — any supply chain data back yet?"

Jamie (Analyst): "Mike Torres sent over a vendor spend report last night. It's raw — needs cleaning. I'm going to spend the morning on it."

Priya (Engagement Manager): "Good. Will — store operations?"

Will (Analyst): "Nothing yet. I have a call with the regional director in the Atlanta market at eleven. He has the foot traffic data I need."

Priya (Engagement Manager): "SG&A — Sandra Hill's EA sent over the headcount and org chart at 7 AM. Did it come through?"

The Analyst glances at the phone screen.

Analyst (Consulting): "It came in. Haven't opened it yet."

Priya (Engagement Manager): "Open it before the 10 AM Operations interview. I want a first read before we walk in."

David (Senior Manager): "One heads up for everyone — Sandra Hill pushed the Finance interview to 1:30. I've rescheduled accordingly."

Priya (Engagement Manager): "One priority question for today: across all three workstreams, I want each analyst to walk out of this afternoon with one hypothesis either confirmed or eliminated. Not sized exactly — just confirmed or out. Clarity is the goal today, not precision."`,
    commentary: `The "one hypothesis confirmed or eliminated" instruction is one of the most important calibration principles in early-engagement consulting. Notice the distinction Priya draws: confirmed or eliminated, not sized. That's a deliberate choice about how to allocate analytical energy at this stage.

In the early days of an engagement, there's enormous pressure to keep every hypothesis open until the data is perfect. Priya is pushing the team to make directional calls with imperfect data — which is actually how consulting works in practice. You'll rarely have all the information you'd ideally want. You'll often have to commit to a direction at 70% confidence and validate as you move forward.

The distinction between "confirmed" and "sized exactly" is the key. Confirmed means: the hypothesis is real and worth quantifying in detail. Eliminated means: the data or interviews have contradicted it and the team can stop spending time on it. Both outcomes are valuable. The worst outcome at this stage is a team that finishes the day with every hypothesis still uncertain.

Watch how that principle shapes what the Analyst looks for in the two interviews today — not comprehensive data, but decisive directional signals.`,
    after: `Standup ends at 9:05 AM. The Analyst opens Sandra Hill's headcount file immediately. Two things are obvious within minutes: corporate headcount grew 22% over three years while revenue grew only 4%. And the marketing department has a headcount-to-revenue ratio twice the industry benchmark. Both go into the interview prep before the 10 AM meeting.`,
  },

  'management-consultant-d2-b2': {
    before: `The operations stakeholder interview is a structured conversation with Mike Torres, VP of Operations. Priya leads; the Analyst takes notes and asks follow-up questions when appropriate. The goal is to understand the operational cost structure from the inside — where the real costs live, what trade-offs exist between cost and service quality, and what Mike thinks can change. Frontline operational leaders often see savings opportunities that financial analysis misses — and political obstacles that financial analysis ignores.`,
    simulatedWork: `[Scene: Meridian headquarters, small conference room. Priya and the Analyst sit across from Mike Torres. The Analyst has a notepad and a printed set of interview questions.]

Priya (Engagement Manager): "Mike, we want to understand the operational cost structure from your perspective. Starting with supply chain — how would you characterize Meridian's vendor relationships?"

Mike (VP Operations, Meridian): "Fragmented. We have four hundred and twelve vendors. About sixty of them do ninety percent of our volume. The tail is a legacy of regional buying decisions made before we centralized. Those tail vendors are expensive to manage and we're paying full price because our volume with each is too small to negotiate."

The Analyst writes quickly, circling the 412-vendor figure.

Analyst (Consulting): "If you had to estimate — what's the cost of managing that tail versus the value of keeping those vendors on the roster?"

Mike (VP Operations, Meridian): "Honestly? The tail is probably costing us more in procurement overhead than we're saving in product flexibility. But every regional director thinks their local vendors are special. That's the political reality."

Priya (Engagement Manager): "What about store labor scheduling? We saw some significant scheduling variance across regions in the staffing data."

Mike (VP Operations, Meridian): "That's real. We have nine different scheduling systems. Each regional director chose their own over time. The store managers have adapted, but the systems don't talk to each other. We're probably running five to seven percent excess labor from suboptimal scheduling."

The Analyst converts the figure immediately in the margin of the notepad: "5–7% on $80M annual labor base = $4–5.6M. Needs scheduling data to confirm."`,
    commentary: `Mike's comment about the "political reality" of regional vendor relationships is a piece of information that won't appear in any spreadsheet — and it's exactly the kind of obstacle that kills a consulting recommendation if you discover it only during implementation. Good stakeholder interviews don't just gather data; they map the political terrain.

Notice what I did with Mike's scheduling estimate. He said "five to seven percent" — which is a vague operational observation. I immediately converted it to a dollar range using the labor base I'd already pulled from the 10-K. That translation from percentage to dollars is not arithmetic — it's the moment an insight becomes an analytical hypothesis with a quantifiable value attached. That's when it can be tracked, sized, and eventually recommended.

The regional director resistance Mike named is the single most important planning input for the vendor consolidation recommendation. I'll spend weeks building an analytically rigorous case for consolidation. Mike just told me the biggest risk isn't the math — it's the political structure of the organization. That needs to appear in the implementation plan, not as a footnote but as a primary risk with a named mitigation.

Watch how both of these insights — the scheduling fragmentation and the political constraint — surface in tomorrow's analysis.`,
    after: `The interview ends at 11:45 AM. Seven new data points, two new sub-hypotheses, and one major political risk have been captured. Priya reviews the notes during the walk to lunch and says: "The scheduling insight is new. Good catch." The Finance interview is at 1:30 PM.`,
  },

  'management-consultant-d2-b3': {
    before: `The Finance interview with Sandra Hill is the most important stakeholder conversation of the engagement. Sandra controls the data, approves the final recommendations, and is the proxy for whether this engagement succeeds or fails. She has already said she's been burned by consultants before. The goal is not to impress her with sophistication — it's to demonstrate rigor, practicality, and intellectual honesty. Precise questions, honest acknowledgment of what isn't yet known, and no overselling after one day.`,
    simulatedWork: `[Scene: Sandra Hill's office — neat, functional, no decorative excess. Priya leads; the Analyst takes notes and has prepared two targeted questions.]

Sandra (CFO, Meridian): "I'll be direct with you. I've seen a lot of analysis in this building. What I haven't seen enough of is change. So I want to understand upfront — how is this engagement going to be different?"

Priya (Engagement Manager): "That's fair. We're going to show you our work at the hypothesis level before we finalize anything. You'll be able to challenge the assumptions before we put them in a report. We're not going to give you a recommendation in week three that you're hearing for the first time."

Sandra (CFO, Meridian): "Good. What have you found so far?"

Priya (Engagement Manager): "It's early — we've had one day. But preliminary data suggests your corporate overhead is running approximately 40% above the industry benchmark as a percentage of revenue. We want to understand the story behind that before we draw conclusions."

Sandra (CFO, Meridian): "The headcount growth is real. Some of it was deliberate — we built out corporate capabilities when we thought we were going to grow faster. We didn't grow faster. Now we have a structure built for a bigger business."

The Analyst leans forward slightly, timing the question to a natural pause.

Analyst (Consulting): "Is there a restructuring that's already been considered internally, or is this the first time it's been formally analyzed?"

Sandra (CFO, Meridian): "There was a study two years ago. It recommended eliminating forty positions. The CEO didn't move forward because of timing. I still have the deck."

The Analyst writes quickly: "Existing internal study — 40-position recommendation. Request the deck — don't redo work that's already done."

Priya (Engagement Manager): "We'd love to see that. It would save us rebuilding analysis that already exists."`,
    commentary: `Sandra just handed the team something genuinely valuable: evidence that the answer may already partly exist inside the building. Notice why I asked whether an internal study existed rather than immediately launching into the team's own preliminary findings. That question serves three purposes simultaneously. It saves analytical time — if Meridian has already built a headcount model, the work is to update and extend it, not restart it. It signals respect for the organization's prior thinking rather than arriving as if the firm is the first group ever to look at this problem. And it positions the team as efficient synthesizers rather than expensive redundancy — which is exactly the impression a skeptical CFO needs to form early.

This is a habit worth developing: before you build anything analytical, ask whether it already exists in some form. Clients almost always have more internal knowledge than they initially share. A well-placed question surfaces it.

Watch what happens when Sandra sends that study over this afternoon. The recommendation the team presents in week three will be built on two years of Meridian's own internal analysis, validated and extended with external benchmarks. That's a far more credible foundation than a consultant estimate derived from industry averages alone.`,
    after: `Sandra sends the prior study by 4 PM — a forty-eight-page internal analysis from two years ago. The Analyst spends the afternoon reading it and extracting the recommendations that were never implemented. Three are directly relevant to the SG&A hypothesis. Tomorrow's analysis builds on that foundation rather than reinventing it.`,
  },

  'management-consultant-d2-b4': {
    before: `Interview synthesis is the process of converting raw interview notes and early data into structured analytical insights. The Analyst is doing this for the SG&A workstream and will share themes with the team at tomorrow's standup. The synthesis shouldn't just summarize what people said — it should identify where interview data confirms, contradicts, or adds nuance to the hypotheses built on day one.`,
    simulatedWork: `[Scene: The Analyst's hotel room, 3:45 PM. Notes from both interviews are open alongside the headcount data file and the prior internal study Sandra sent.]

The Analyst opens a new document titled "SGA_Interview_Synthesis_D2" and begins structuring it by hypothesis.

Analyst (Consulting): "Hypothesis 1 — Corporate overhead above benchmark. Status: Confirmed. Data: 22% headcount growth versus 4% revenue growth over three years. Sandra's characterization — 'structure built for a bigger business.' Prior study recommended 40 positions not implemented due to timing. Recommendation: revisit those 40 positions as a starting point."

The Analyst pauses, pulls up a calculator, and continues.

Analyst (Consulting): "Estimated savings: 40 positions at $85K average loaded cost equals $3.4M. If the structure has grown since the prior study — probable, given the headcount data — possibly 50 to 60 positions at $4.3 to $5.1M."

Analyst (Consulting): "Hypothesis 2 — IT software fragmentation. Status: Partially confirmed. Mike confirmed 17 ERP systems across regions. Sandra confirmed IT budget growing at 14% annually. Prior study didn't address IT. Need software license inventory data to size properly."

Analyst (Consulting): "Hypothesis 3 — Labor scheduling inefficiency. Status: Confirmed directionally. Mike estimated 5 to 7% excess labor from scheduling fragmentation. Need actual scheduling data to confirm. Preliminary size: $4 to $5.6M."

The Analyst drafts a one-page summary and adds a totals row.

Analyst (Consulting): "Total SG&A preliminary opportunity: $7.7 to $10.7M. Combined with supply chain and store ops, tracking toward the $50M target — but full data needed to close the range."`,
    commentary: `The synthesis step — explicitly labeling each hypothesis as Confirmed, Partially Confirmed, or Refuted based on evidence — is how a consulting engagement avoids drifting into storytelling. It forces a separation between what is known and what is believed. That distinction matters enormously when a CFO challenges a recommendation in front of her CEO.

Notice that preliminary sizing has already started — $7.7 to $10.7M for the workstream — but without presenting those numbers as finished figures. Each one is annotated with what additional data is needed to sharpen it. That intellectual discipline is what makes a recommendation defensible under pressure. A range with stated confidence levels and explicit data gaps is more credible than a precise number with hidden assumptions.

This synthesis document is also the foundation for every team conversation going forward. When Priya asks for an update tomorrow morning, this is the page that gets shared — not raw notes, not a verbal summary, but a structured, hypothesis-labeled document that any team member can read and understand in three minutes.

Building this discipline early — on day two, before the analysis is even complete — is one of the habits that distinguishes a strong junior consultant from an average one.`,
    after: `By 6:30 PM a clean one-page interview synthesis is ready for the SG&A workstream with a preliminary savings estimate. Added to the team shared folder and summarized in a brief message to Priya. She replies: "Good structure. Bring this to the standup tomorrow. The team needs to see how you're thinking about the SG&A opportunity."`,
  },

  'management-consultant-d2-b5': {
    before: `Data model setup is an unglamorous but essential part of a consulting engagement. The task is building the analytical infrastructure — the Excel workbooks, pivot tables, and data linkages — that will power the next week of quantitative analysis. Done right, it takes a few hours tonight but saves many hours of rework next week. Done wrong, it forces a complete rebuild from scratch when a structural error surfaces at the worst possible time.`,
    simulatedWork: `[Scene: 6:45 PM. The Analyst's hotel room. Sandra's headcount data and the firm's cost benchmark database are loaded in separate Excel windows.]

The Analyst creates a new workbook and begins structuring it with clear tab names.

Analyst (Consulting): "Three main tabs: Raw Data, Benchmark Comparison, and Savings Quantification. Raw data holds Meridian's actual headcount and loaded costs. Benchmark comparison maps each Meridian department to the industry reference. Savings quantification calculates the gap."

The Analyst begins loading the headcount data into the Raw Data tab row by row.

Analyst (Consulting): "Marketing: 47 FTEs at $82K average loaded cost equals $3.85M department total. Benchmark for Meridian's revenue size: 28 FTEs. Gap: 19 FTEs, $1.56M."

Analyst (Consulting): "Finance: 31 FTEs at $91K loaded cost equals $2.82M. Benchmark: 24 FTEs. Gap: 7 FTEs, $637K."

The Analyst works through the remaining four corporate departments, then scrolls to the summary row.

Analyst (Consulting): "Total corporate overhead gap: 62 FTEs at $5.3M above benchmark."

The Analyst opens the prior study Sandra sent and cross-references.

Analyst (Consulting): "Prior study identified 40 positions. Benchmark analysis suggests the gap is now larger — 62 positions. That's 55% higher than two years ago. The structure has continued to grow."

The Analyst adds a note cell in red at the top of the Savings Quantification tab.

Analyst (Consulting): "Important caveat: benchmark comparison uses median industry data. Meridian may have strategic reasons for above-median staffing in some functions. Need to validate with Sandra before presenting."`,
    commentary: `The caveat added at the end — "Meridian may have strategic reasons for above-median staffing" — is a sign of analytical maturity that's worth pausing on. Benchmark comparisons are powerful but blunt instruments. They show where a company is different from the average but not why. And in a client-facing engagement, presenting a gap analysis as though every deviation from the benchmark represents waste is a fast way to lose credibility with a CFO who knows her business better than any outside analyst does.

Always pair the "what" — the gap — with the "why might this be appropriate" question before walking into a room. If Sandra has a strategic reason for above-benchmark marketing headcount, the recommendation needs to account for that. If she doesn't, the case becomes airtight.

Watch how this caveat pays off in the Q&A on day five. Sandra will name exactly the kind of strategic reason the model flagged — and because the team anticipated it, the response is clean rather than defensive.

The structural discipline of the three-tab model — Raw Data, Benchmark Comparison, Savings Quantification — also matters. When David reviews this in two days, he can trace any number back to its source in under a minute. That traceability is what makes a consulting model defensible under scrutiny.`,
    after: `The SG&A model is complete and fully linked to the benchmark database, saved as 'Meridian_SGA_Model_v1.0' and shared to the team drive. The preliminary finding: a $5.3M corporate overhead gap, higher than the prior internal study's estimate. Tomorrow's standup will surface this to the team.`,
  },

  // ── Day 3: Analysis ────────────────────────────────────────────────────────

  'management-consultant-d3-b1': {
    before: `Priya has called an early one-on-one check-in before the team standup. The engagement is at the midpoint of the first week, and she wants to verify the SG&A workstream is on track before tomorrow's preliminary synthesis session with David and Katherine. Individual check-ins like this are where engagement managers calibrate quality and recalibrate direction before problems compound.`,
    simulatedWork: `[Scene: Hotel lobby. Priya sits across from the Analyst with coffee. The lobby is quiet at this hour — a few other hotel guests moving through.]

Priya (Engagement Manager): "How's the SG&A workstream looking?"

The Analyst opens a one-page summary on the laptop and walks Priya through it.

Analyst (Consulting): "Preliminary savings: $7 to $11 million. Corporate overhead is the largest bucket — $5.3 million gap versus benchmark, validated by Sandra's prior study. Labor scheduling is second — $4 to $5.6 million pending actual scheduling data. IT software fragmentation is third — potentially $3 to $5 million but the license inventory data hasn't arrived yet."

Priya (Engagement Manager): "That's a solid preliminary range. How confident are you in the overhead number?"

Analyst (Consulting): "Medium-high. The benchmark comparison is solid and Sandra's own data confirms headcount growth outpaced revenue. But I've flagged that some above-benchmark positions may be strategic — that hasn't been validated with Sandra yet."

Priya (Engagement Manager): "Good instinct. Here's a question: if the preliminary range is $7 to $11 million, and the team's combined preliminary is tracking around $38 to $45 million — potentially short of the $50 million target. What would you do with that gap?"

The Analyst thinks for a moment before answering.

Analyst (Consulting): "Pressure-test the assumptions on each hypothesis. The labor scheduling estimate assumes 6% excess labor — if it's closer to Mike's upper estimate of 7%, that alone adds $1.5 million. And the IT opportunity isn't fully sized yet."

Priya (Engagement Manager): "Right. Don't close hypotheses too early. Keep them open until the data forces you to."`,
    commentary: `Priya's question — "what would you do if you're short of the target?" — is a test of how I handle uncomfortable analytical conclusions. The honest answer is to pressure-test assumptions rather than inflate estimates. That's the answer I gave, and it's the right one for a specific reason: in consulting, the most dangerous outcome isn't falling short of the target in your analysis. It's recommending a $50M savings program that only delivers $32M in reality. That outcome doesn't just fail the client — it damages the firm's reputation for years.

Analytical conservatism at the hypothesis stage is what prevents that failure mode. Notice I didn't say "we'll find more savings if we look harder" — that's motivated reasoning, not analysis. I said "the data may support a higher estimate in workstreams we haven't fully quantified yet." The distinction is whether the optimism is evidence-driven or wish-driven.

The one-on-one format matters too. Priya is using this conversation to do something she couldn't do in front of the full team: give direct feedback on analytical judgment without creating a public moment. This kind of calibration happens in every good consulting engagement. Take it seriously.

The brief she assigned — two pages for Katherine — is another test. Can the SG&A story be compressed into a format a partner can read in five minutes? That compression is where the analytical work gets stress-tested.`,
    after: `The one-on-one ends at 9 AM. Priya adds one task: draft a short brief for Katherine Wells on the SG&A workstream — two pages, key hypotheses, preliminary sizing, and confidence levels. Katherine will be joining for the mid-point team scrub on Friday afternoon. The morning is available for the cost benchmarking analysis.`,
  },

  'management-consultant-d3-b2': {
    before: `The cost benchmarking analysis is where the team systematically compares Meridian's cost structure against industry peers across each major cost category. The firm's proprietary retail benchmark database contains anonymized cost data from forty-seven retail companies of similar size and format. The goal is to move from the directional hypothesis ("corporate overhead is too high") to a quantified, defensible estimate with a specific benchmark basis.`,
    simulatedWork: `[Scene: The Analyst's desk. Excel with Meridian's P&L and the benchmark database open side by side. The window faces the hotel parking lot — an unremarkable view for what turns into a productive three-hour stretch.]

The Analyst begins building the benchmark comparison table, starting with corporate overhead.

Analyst (Consulting): "Meridian corporate overhead as a percent of revenue: 8.1%. Benchmark peer group — retailers $600M to $1B revenue: median 5.7%, 75th percentile 6.9%, 25th percentile 4.9%."

The Analyst adds a flag to the cell.

Analyst (Consulting): "Meridian is above even the 75th percentile. That's not a median gap — it's a structural gap. Even moving to the 75th percentile would generate $9.7 million in savings."

The Analyst shifts to the procurement section and builds the next row.

Analyst (Consulting): "Procurement overhead as a percent of COGS: Meridian 2.4%, benchmark median 1.6%, 75th percentile 1.9%. At $480M COGS, moving from 2.4% to 1.9% saves $2.4 million. This is the supply chain workstream — flagging for Jamie."

The Analyst opens a second tab and builds the technology spend comparison.

Analyst (Consulting): "IT as a percent of revenue: Meridian 3.2%, benchmark median 2.1%, 75th percentile 2.7%. At $807M revenue, closing to the 75th percentile saves $4 million. Moving to median would save $8.9 million — but that's aggressive and probably not achievable in year one."

The Analyst compiles the summary table and adds totals.

Analyst (Consulting): "Summary: Corporate overhead $9.7M opportunity to 75th percentile. IT $4.0M conservative. Scheduling $4.0 to $5.6M pending data. Total SG&A-related: $17.7 to $19.3 million."`,
    commentary: `Using percentile benchmarks rather than just the median is a critical analytical choice that's worth explaining. If the benchmarking used the median and told Sandra that Meridian needs to cut to 5.7% overhead, the team would be recommending something that half the industry has already achieved — which sounds reasonable until you realize it means demanding performance in the bottom half of the peer set. That's not a target; it's a minimum.

By presenting a 75th percentile target at 6.9%, the recommendation is a conservative and defensible improvement — one that a significant portion of the peer group has not yet achieved, so it's aspirational without being unrealistic. In client settings, conservative benchmarks that hold up under scrutiny are worth far more than aggressive benchmarks that get challenged in the first five minutes of a presentation.

Notice how the procurement finding gets immediately cross-referenced to Jamie's workstream rather than claimed as an SG&A finding. That's not generosity — it's analytical accuracy. If the same savings opportunity gets counted in two workstreams, the aggregate estimate is inflated and Sandra will catch it. Clean workstream boundaries protect the credibility of the total number.

The gap between $4M and $8.9M for IT isn't hedging — it's communicating two distinct scenarios: conservative implementation (75th percentile) versus aggressive implementation (median). Giving Sandra both lets her make an informed decision about how far she wants to go.`,
    after: `By noon a complete, formatted cost benchmarking analysis covers the SG&A and IT workstreams, with each finding cross-referenced to benchmark percentile positions. Sent to Priya and David for review before the afternoon's supply chain analysis session. The combined preliminary savings estimate from the SG&A workstream alone has grown to $17.7 to $19.3 million — more than a third of the $50 million target.`,
  },

  'management-consultant-d3-b3': {
    before: `The supply chain opportunity assessment is a cross-workstream collaboration — Jamie has the vendor spend data and the SG&A owner has the procurement benchmark analysis. The ninety-minute session builds a joint view of the supply chain savings opportunity. In consulting, cross-workstream synthesis is where the most important insights often emerge, because patterns invisible in one workstream become obvious when two streams are placed side by side.`,
    simulatedWork: `[Scene: Hotel conference room. Jamie has his laptop with the vendor spend data open. The Analyst has the benchmark analysis printed and annotated.]

Jamie (Analyst): "Cleaned the vendor file. Four hundred and twelve vendors total. Top sixty vendors represent 89% of spend. The tail — 352 vendors — represents 11% of spend but roughly 40% of procurement overhead hours based on Mike Torres's estimate."

Analyst (Consulting): "What's the average spend per tail vendor?"

Jamie (Analyst): "Forty-two thousand dollars per year. Not enough to negotiate meaningful pricing with any of them."

The Analyst opens the benchmark tab and runs the calculation.

Analyst (Consulting): "Benchmark says best-in-class procurement overhead is 1.6% of COGS. Meridian is at 2.4%. The tail is probably the primary driver of that gap. Consolidating from 412 to 150 vendors eliminates roughly 60% of the procurement management burden."

Jamie (Analyst): "And concentrating volume into fewer vendors unlocks volume discounts. Quick estimate: if the tail spend moves to the top 150 vendors at a 5% negotiated discount on consolidated volume, that's $2.1 million in direct cost savings on top of the overhead reduction."

The Analyst writes the combined figure and pauses.

Analyst (Consulting): "So total supply chain opportunity: overhead reduction $2.4M plus direct cost savings $2.1M equals $4.5M. But the implementation timeline is twelve to eighteen months for full vendor transitions."

Jamie (Analyst): "Right. Probably $2 million in year one, $4.5 million fully realized."

The Analyst adds a note in the shared workstream tracker: "Year 1 vs. full run-rate distinction — critical for Sandra's cash flow planning. Implementation timing must be explicit in the recommendation."`,
    commentary: `The year-one versus full run-rate distinction I flagged at the end of this session is one of the most important nuances in cost savings analysis — and one of the most frequently glossed over in consulting presentations. A $50 million program that delivers $15 million in year one and $50 million in year three is a fundamentally different financial profile than one that delivers $50 million up front. CFOs make capital allocation decisions based on cash flow timing, not just eventual magnitude.

Sandra Hill, specifically, will be making decisions about whether to fund restructuring costs — severance, system transition costs, vendor transition support — based on when those investments get paid back. If the payback analysis uses the fully-realized run-rate rather than the year-one cash flow, the program looks better than it actually is in the near term.

Building the timing dimension into the analysis from day three prevents a client from making a commitment based on a number that misrepresents the actual cash flow profile. This is the kind of analytical detail that doesn't make the deck more complex — it makes the recommendation more credible and the implementation more successful.

Notice also what the cross-workstream session produced. Neither analyst could have built the full $4.5M estimate alone — Jamie had the vendor data, the Analyst had the benchmark. This is why consulting engagements are structured around teams rather than individual contributors.`,
    after: `A joint supply chain and SG&A opportunity assessment is ready for the team scrub session this afternoon. Combined with Will's store operations analysis, the team is tracking toward a total preliminary opportunity of $48 to $58 million — within range of the $50 million target. The mid-point team scrub with David is at 3:30 PM.`,
  },

  'management-consultant-d3-b4': {
    before: `The mid-point team scrub is an intensive internal review session — David Cho reviewing every workstream's progress, challenging assumptions, and ensuring the analyses are heading toward a defensible final recommendation. David is analytically sharp and will pressure-test every number. This session either validates the team's direction or resets it. Both outcomes are useful — a reset now is far better than a reset in the final client presentation.`,
    simulatedWork: `[Scene: Hotel conference room. David stands at a whiteboard. All four analysts have laptops open and printed summaries on the table in front of them.]

David (Senior Manager): "Let's go workstream by workstream. Hypothesis, current evidence, preliminary size, confidence level. Jamie — supply chain."

Jamie (Analyst): "Vendor consolidation from 412 to 150 vendors. Evidence: Mike Torres confirmed the tail is uneconomical. Preliminary size: $4.5M full run-rate, $2M year one. Confidence: medium-high."

David (Senior Manager): "Implementation risk?"

Jamie (Analyst): "Regional director resistance. Mike named it explicitly."

David (Senior Manager): "Mitigation plan?"

Jamie (Analyst): "...I don't have one yet."

David (Senior Manager): "Add it. Every recommendation needs a mitigation for its biggest implementation risk. Non-negotiable."

David turns to the SG&A section.

David (Senior Manager): "SG&A — walk me through it."

The Analyst opens the benchmarking analysis and presents from it.

Analyst (Consulting): "Corporate overhead at 8.1% of revenue versus 6.9% benchmark at the 75th percentile. Preliminary size: $9.7M. Confidence: high — confirmed by Sandra's headcount data and her own prior study."

David (Senior Manager): "One concern — the 75th percentile target. Has there been any validation that there's no strategic reason Meridian should be above that level?"

Analyst (Consulting): "It's been flagged but not validated with Sandra yet."

David (Senior Manager): "Validate it before the recommendation. If she has a reason, the target needs to adjust. If she doesn't, the case is airtight."

Priya (Engagement Manager): "Good session. Team is tracking to $48M to $58M. We need to tighten the range and address the implementation risk gaps before the final recommendation."`,
    commentary: `David's question — "what's your mitigation plan?" — and Jamie's honest answer — "I don't have one yet" — is productive friction. That moment of discomfort in an internal review is what prevents a much more damaging moment when a regional director raises the same question in front of Sandra Hill.

Senior managers on consulting teams push specifically on implementation feasibility because that's where recommendations fail in the real world. An analytically perfect recommendation that ignores political and operational obstacles to execution is worth nothing to the client. The habit of pairing every recommendation with its primary implementation risk and a specific mitigation is a discipline that separates good consulting from great consulting.

David's challenge on the 75th percentile target is a different kind of pressure-test — not about implementation, but about analytical defensibility. If Sandra raises a strategic rationale for above-benchmark staffing and the team has no response prepared, the entire SG&A finding looks under-researched. Validating assumptions before the final presentation is not extra work; it's the difference between a recommendation that lands and one that gets challenged into irrelevance.

Notice also that the Analyst answered "it's been flagged but not validated" rather than defending the number or minimizing the gap. Intellectual honesty under pressure from a senior manager is a form of professional credibility. Pretending an open item is closed creates a much bigger problem downstream.`,
    after: `The mid-point scrub ends at 5:15 PM with a clear set of open items: implementation risk mitigations for each workstream, Sandra Hill validation on the overhead benchmark target, and a tightened preliminary savings range. The evening is spent quantifying the findings more precisely in preparation for tomorrow's independent analysis work.`,
  },

  'management-consultant-d3-b5': {
    before: `Findings quantification is where preliminary estimates harden into defensible numbers. The work converts "approximately $9.7 million" into a specific, bottom-up supported figure with explicit assumptions that can be challenged and defended. This is unglamorous detail work — not strategic insight — but it's the foundation on which the entire recommendation stands.`,
    simulatedWork: `[Scene: Hotel room, 6 PM. The detailed quantification model for the corporate overhead finding is open. The Analyst works department by department through the headcount data.]

Analyst (Consulting): "Marketing: 47 FTEs, benchmark 28 FTEs, gap 19 FTEs at $82K loaded cost equals $1.56M. Finance: 31 FTEs, benchmark 24 FTEs, gap 7 FTEs at $91K equals $637K."

The Analyst works through the remaining four departments, building the table row by row.

Analyst (Consulting): "IT: 28 FTEs, benchmark 18 FTEs, gap 10 FTEs at $95K equals $950K. Plus software license consolidation — 17 ERP systems, conservative consolidation to 8 systems, estimated license cost reduction 35% equals $2.8M annually."

Analyst (Consulting): "HR and Legal: above benchmark by 4 FTEs combined equals $344K."

Analyst (Consulting): "Total corporate headcount gap: 40 FTEs at $3.5M. IT license consolidation: $2.8M. Total SG&A opportunity: $6.3M."

The Analyst pulls up the benchmark analysis from the morning and looks between the two tabs.

Analyst (Consulting): "The benchmark comparison said $9.7M. The bottom-up says $6.3M. That's a 35% gap. The benchmark assumed moving to the 75th percentile across all functions — the bottom-up is more conservative because it only counts FTEs clearly above benchmark, not every function hitting exactly 75th percentile."

The Analyst adds a note at the top of the model.

Analyst (Consulting): "Will present both to Priya — the benchmark as the potential ceiling and the bottom-up as the defensible conservative estimate. Sandra will trust the bottom-up more."`,
    commentary: `The gap between the benchmark estimate of $9.7M and the bottom-up estimate of $6.3M is not a mistake — it's one of the most important signals produced by the analysis so far. In consulting, you always want both a top-down benchmark and a bottom-up validation. When they diverge, understanding why is as important as the number itself.

Here the divergence comes from a structural difference in methodology: the benchmark assumes every function should hit the 75th percentile simultaneously; the bottom-up only counts the gap for functions that are clearly above benchmark. The bottom-up is more conservative and more defensible because it's derived from Meridian's actual data rather than an industry average applied uniformly.

The instinct to present the bottom-up as the primary number to Sandra is analytically correct for a specific reason: a CFO trusts a number she can trace to specific departments and headcount counts over a number derived from an industry average she can't interrogate. The benchmark ceiling exists not to anchor the recommendation higher — it exists to demonstrate that the bottom-up is conservative, not optimistic.

This two-number approach — ceiling and conservative estimate — is a presentation technique with a purpose: it gives the client a range they can understand and interrogate, rather than a single number they can only accept or reject.`,
    after: `By 10:30 PM a fully quantified SG&A model is complete: $6.3M bottom-up estimate, $9.7M benchmark ceiling, and a specific line-item breakdown by department. Combined with Jamie's supply chain work and Will's store operations analysis, the team's total is $44M to $52M — right at the target. The findings are real. Now they need to become recommendations.`,
  },

  // ── Day 4: Recommendations ─────────────────────────────────────────────────

  'management-consultant-d4-b1': {
    before: `The story-lining session is where the team decides how to structure the final recommendation deck. In consulting, the sequence in which findings are presented matters enormously — a well-structured narrative builds to a compelling conclusion, while a poorly structured one forces the audience to do too much work connecting the dots. Priya is facilitating; David is checking for strategic coherence; each analyst is contributing the narrative thread from their workstream.`,
    simulatedWork: `[Scene: Hotel conference room, whiteboard covered in sticky notes. Each note represents a potential slide or key message. The Analyst, Jamie, Will, and David stand around the board with markers.]

Priya (Engagement Manager): "Our core message in one sentence. What is it?"

David (Senior Manager): "Meridian can achieve $50 million in sustainable cost savings over 18 months by addressing three structural gaps: corporate overhead, supply chain fragmentation, and store labor efficiency."

Priya (Engagement Manager): "That's the answer. Now build backward from it. What does the leadership team need to believe before they believe that answer?"

Jamie (Analyst): "They need to believe the savings are real — not consultant estimates, but real numbers tied to specific line items."

Analyst (Consulting): "They need to believe the implementation is feasible — that's Sandra's core concern."

Will (Analyst): "And they need to believe the timeline is realistic."

Priya (Engagement Manager): "So the deck structure is: context — why now; findings — what was found and how it was sized; recommendations — specifically what to do; and implementation — how and when. Four sections."

David (Senior Manager): "One thing — Sandra Hill's 'no shelf report' requirement. Where does that show up in the structure?"

The Analyst moves a sticky note to the implementation section.

Analyst (Consulting): "The implementation section needs to be specific enough that Meridian can execute without us in the room. Named owners, specific actions, thirty-to-sixty-to-ninety-day milestones."

David (Senior Manager): "Exactly. The implementation section is not a 'next steps' slide. It's an operational plan."`,
    commentary: `Building a presentation structure by starting with "what does the audience need to believe?" and working backward is one of the most powerful analytical frameworks in consulting. It's sometimes called the "pyramid principle" — lead with the conclusion, support it with the evidence, structure the evidence in the sequence that builds belief most efficiently.

It prevents the most common structuring mistake in consulting presentations: organizing the deck around the order in which the work was done rather than the order in which the audience needs to receive it. The work was done over two weeks; the presentation is delivered in forty-five minutes. Those are completely different structures.

Notice what I contributed to this session: identifying Sandra's "no shelf report" requirement not as a stylistic preference but as a structural demand that shapes the entire implementation section. That's a form of client insight applied to presentation design. If the team builds a strong four-section deck but the implementation section is still vague about owners and milestones, Sandra will feel that day-one concern all over again — regardless of how strong the findings are.

This session produces a twenty-slide outline. The outline is not a final document — it's a contract between the team members about what each person is building. Without it, four people work for two days and produce slides that don't fit together.`,
    after: `The story-lining session ends at 9:30 AM with a twenty-slide deck outline photographed from the whiteboard. The SG&A sections take up eight of the twenty slides. The deck structure is: executive summary, context (two slides), three workstream findings (nine slides), integrated recommendation (three slides), implementation plan (five slides). Work on the SG&A slides begins immediately.`,
  },

  'management-consultant-d4-b2': {
    before: `The SG&A and corporate overhead section of the recommendation deck is being built — the four to five slides that translate a week's analytical work into a clear client-facing narrative. This is where analytical rigor meets communication discipline: every finding needs to be expressed as a clear recommendation, every number needs to be sourced, and every slide needs to carry exactly one key message that a senior executive can process in thirty seconds.`,
    simulatedWork: `[Scene: The Analyst's desk. PowerPoint open with the consulting firm template loaded. Notes from the benchmarking and quantification work are spread across the table and annotated in the margins.]

The Analyst types the first slide title and reads it aloud quietly.

Analyst (Consulting): "Slide title: 'Corporate Overhead Is 40% Above Benchmark — $6.3M in Sustainable Savings Available.' Conclusion first."

The Analyst builds the supporting evidence section below the title.

Analyst (Consulting): "Three evidence points: headcount grew 22% over three years while revenue grew 4%; eight of nine peer retailers at this revenue size operate at lower overhead ratios; bottom-up analysis identifies a 40 FTE-equivalent gap across six corporate functions."

The Analyst moves to the recommendation bullet.

Analyst (Consulting): "Recommendation: Reduce corporate headcount by 40 positions over 12 months through attrition-first approach, targeted restructuring in Marketing and IT, and software license consolidation generating $2.8M in non-headcount savings."

The Analyst adds implementation timing in a separate callout box.

Analyst (Consulting): "First 90 days: Marketing and Finance restructuring, yielding $2.2M. Months 4 through 12: IT consolidation and HR streamlining, yielding $4.1M additional."

A comment appears on the slide in the shared version a few minutes later.

David (Senior Manager): "The headline is clean. One feedback — 'attrition-first approach' needs more specificity. What does that mean for Meridian's managers? Add a footnote defining the mechanism."

The Analyst adds the footnote immediately.

Analyst (Consulting): "Adding: 'Positions vacated through natural attrition or internal transfer are not backfilled, generating savings without requiring involuntary separation.' That's something Sandra can action without a restructuring announcement."`,
    commentary: `The "conclusion first" principle — stating the key insight in the slide title rather than building to it — is a defining feature of strong consulting communication. It's called a "tombstone headline" in some firms. The principle is simple: executives reading a twenty-slide deck during a busy day need to absorb the core message from the slide titles alone. If the titles are descriptive rather than conclusory, the audience has to do work that should have been done for them.

Notice what a conclusory title does: "Corporate Overhead Is 40% Above Benchmark — $6.3M in Sustainable Savings Available" tells Sandra everything she needs to know about that slide before reading a word of supporting evidence. If she agrees with the premise, the supporting evidence confirms it. If she disagrees, she immediately knows where to push back. Either way, the meeting becomes more efficient.

David's addition — defining "attrition-first" as a mechanism — is equally important and illustrates a principle Sandra named on day one: actionability. A recommendation that sounds reasonable but can't be operationalized immediately hasn't cleared the bar. Defining "attrition-first" in one sentence gives Meridian's CHRO an exact action: stop backfilling open positions in above-benchmark functions, starting Monday. That's what "no shelf report" actually means.`,
    after: `By noon four complete SG&A slides are ready: headline finding, evidence build, recommendation with implementation milestones, and an integrated view connecting the SG&A workstream to the other two. Sent to Priya for review before the 1:30 PM internal review session with David.`,
  },

  'management-consultant-d4-b3': {
    before: `David Cho is reviewing the full draft deck before Katherine Wells joins for the final review tomorrow. This internal review is the most technically rigorous pass the deck will get — David will check every number for source traceability, every recommendation for implementation specificity, and every assumption for intellectual defensibility. It's the moment where slides that seemed strong individually get tested for coherence as a whole.`,
    simulatedWork: `[Scene: Conference room. David has the full twenty-slide draft on his laptop. Priya and the Analyst sit across from him. David proceeds slide by slide, narrating comments aloud.]

David (Senior Manager): "Executive summary says the total opportunity is $48 to $52 million. When I add up the individual workstreams: SG&A is $6.3M, supply chain is $4.5M fully run-rate but only $2M year one, and store operations is $13.5M. That's $22M to $24M year one, not $48M."

Priya (Engagement Manager): "The $48M is the 18-month run-rate."

David (Senior Manager): "Then the executive summary needs to be explicit about the timeline. Don't mix year-one and run-rate in the same summary without labeling. Sandra Hill will catch that in thirty seconds."

Priya makes a note and signals to the Analyst to do the same.

David (Senior Manager): "SG&A — slide nine. The 40 FTE gap. What's the source?"

Analyst (Consulting): "Bottom-up comparison of Meridian headcount versus the firm benchmark database, validated against Sandra's org chart data."

David (Senior Manager): "Good. Add a footnote on the slide itself — not in the appendix, on the slide. If Katherine reviews this and can't trace that number in thirty seconds, she'll ask."

David moves to the implementation section, reading for a moment before looking up.

David (Senior Manager): "This is the weakest part of the deck. Slide sixteen says 'Engage procurement consultant to manage vendor transition.' That's a recommendation to hire another consultant. Sandra is going to reject that immediately."

The Analyst writes in the margin without looking up: "Implementation section weakness — needs specific internal owners and actions, not external consultant recommendations."`,
    commentary: `David's catch on the year-one versus run-rate mixing is one of the most important quality control moments of the engagement. When a CFO sees $48M in the executive summary and then calculates $24M from the detail slides, she doesn't conclude there was an honest labeling error. She concludes the team is manipulating the headline number. That loss of trust is very hard to recover.

This is why internal reviews like this one exist: to catch analytical inconsistencies that the team members are too close to their own work to notice. Each analyst built their workstream estimates with appropriate precision. But when four workstreams get integrated into a single executive summary, the aggregation logic needs to be checked explicitly. David caught a fundamental mismatch — year-one and run-rate mixed in the same number — before it appeared in front of Sandra.

The note on the implementation section is equally important. "Engage procurement consultant" is a recommendation to hire another consultant from a consulting team that was engaged explicitly because prior consulting engagements produced shelf reports. That recommendation, at that moment in the relationship, is disqualifying. It signals that the team either didn't hear Sandra on day one or heard her and didn't adapt.

Catching these issues in an internal review and fixing them overnight is the difference between a presentation that builds trust and one that destroys it.`,
    after: `David's review produces fourteen specific revisions. Most are source citation additions, timeline clarification labels, or implementation specificity improvements. The revised deck is back to David and Priya by 5 PM. Katherine Wells joins tomorrow morning; the deck needs to be partner-ready by 9 AM.`,
  },

  'management-consultant-d4-b4': {
    before: `The executive slides are the two to three summary slides at the front of the deck that Katherine Wells will present to Meridian's CEO. These are not the detailed analysis — they are the synthesized strategic message. Executive slides in a consulting presentation need to carry the entire weight of the recommendation in a format a CEO can read in five minutes and use to make a decision. They are the hardest slides to write well.`,
    simulatedWork: `[Scene: The Analyst's desk, 3:45 PM. The executive summary section of the deck is open in PowerPoint. The full detailed slides are visible in the panel on the left.]

The Analyst drafts the first executive summary slide and builds the supporting summary table.

Analyst (Consulting): "Row 1: Corporate Overhead. Finding: 40% above benchmark. Year 1 savings: $3.8M. 18-month run-rate: $6.3M. Implementation: Attrition-first restructuring plus IT consolidation."

Analyst (Consulting): "Row 2: Supply Chain. Finding: 412 vendors, 60 manageable. Year 1: $2.0M. Run-rate: $4.5M. Implementation: Vendor consolidation program."

Analyst (Consulting): "Row 3: Store Labor Efficiency. Finding: 5 to 7% scheduling waste. Year 1: $4.0M. Run-rate: $6.5M. Implementation: Unified scheduling system deployment."

The Analyst adds the total row and reads the number.

Analyst (Consulting): "Total year 1: $9.8M. Total 18-month run-rate: $17.3M."

The Analyst stops and looks at the number for a moment.

Analyst (Consulting): "These three workstreams total $17.3M at full run-rate. The remaining $32.7M of the $50M target needs to come from a deeper restructuring or Will's store consolidation analysis. That gap needs to be flagged to Priya now."

The Analyst sends a message immediately.

Analyst (Consulting): "Executive summary table review — SG&A, supply chain, and scheduling total $17.3M run-rate. We're significantly short of $50M in the main slides. Can we talk before Katherine's review tomorrow?"

Priya (Engagement Manager): "Yes. Store consolidation is the swing item. Will needs to bring his full analysis to the morning call. We may need to frame the $50M as a 'potential' dependent on store consolidation approval."`,
    commentary: `Finding a gap between what the executive summary claims and what the underlying analysis supports — and flagging it immediately rather than hoping no one notices — is an act of professional integrity that protects everyone in the room, including the client. The temptation in this moment is to rationalize the gap: "we'll address it in the Q&A," or "the store consolidation will cover it." That's how teams walk into a client presentation knowing a number is wrong and presenting it anyway.

The discipline here is catching the inconsistency before it reaches the client. Notice I didn't wait until the morning review — I flagged it the same afternoon, early enough for Priya to redirect Will's work and adjust the framing before Katherine arrives.

Priya's response — reframe the $50M as "potential" rather than "confirmed" — is the analytically honest answer. If the $50M depends on a store consolidation decision that hasn't been made yet, it's a potential, not a finding. Presenting it as a confirmed finding when it isn't would give Sandra a false basis for a capital allocation decision. That's the kind of error that ends consulting relationships.

Honest framing of confidence levels isn't a sign of weakness. It's what keeps the relationship with Sandra intact through the implementation phase — which is where the real work of this engagement is actually going to happen.`,
    after: `The summary gap is flagged in the deck with a "TBD — pending store consolidation analysis" note and sent to Priya. The implementation roadmap slides are next — the section David identified as the deck's current weakest point.`,
  },

  'management-consultant-d4-b5': {
    before: `The implementation roadmap is the section Sandra Hill will scrutinize most carefully, given her experience with recommendations that never got executed. The task is building a specific, timeline-driven action plan that names owners, sequencing, and milestones. This is different from a "next steps" slide — it's an operational plan specific enough that Meridian's management team can begin executing it before the consulting team leaves the building.`,
    simulatedWork: `[Scene: Hotel room, 6:30 PM. The implementation roadmap slides are open in a separate PowerPoint window. The Analyst works through four phases, building each one from a specific action list.]

The Analyst structures the roadmap header rows and populates the first phase.

Analyst (Consulting): "Four phases. Phase 1 — Days 1 to 30: Quick wins and organizational commitment. Phase 2 — Days 31 to 90: Structure changes and vendor program launch. Phase 3 — Months 4 to 9: Full implementation. Phase 4 — Months 10 to 18: Optimization and measurement."

The Analyst populates Phase 1 action by action.

Analyst (Consulting): "Quick win 1: IT software license audit. Owner: CTO. Deliverable: List of 17 ERP systems with consolidation recommendation. Deadline: Day 30. Savings trigger: None yet — sets up Phase 2."

Analyst (Consulting): "Quick win 2: Hiring freeze on above-benchmark functions. Owner: CHRO. Deliverable: Communication to all VP-level managers. Deadline: Day 7. Savings trigger: Immediate attrition capture."

Analyst (Consulting): "Quick win 3: Top 60 vendor review. Owner: Chief Procurement Officer. Deliverable: Volume reallocation plan. Deadline: Day 45. Savings trigger: Phase 2 negotiations."

The Analyst builds Phase 2 in the same format.

Analyst (Consulting): "Month 2 to 3: Marketing restructuring — 19-person reduction. Owner: CMO with CHRO support. Deliverable: Restructuring plan with severance budget. Savings: $1.56M annualized."

A comment appears from Priya at 10 PM.

Priya (Engagement Manager): "This is significantly stronger than the previous version. One addition — add a Governance row to each phase. Sandra needs to see how she stays informed without relying on us being in the building."`,
    commentary: `The governance addition Priya requested is the detail that distinguishes a consulting implementation plan from a consulting work plan. A work plan tells the consulting team what to do. A governance plan tells the client how to maintain visibility and control after the consultants leave. Those are different documents with different audiences.

Sandra's concern from day one — two prior consulting engagements that produced reports that sat on a shelf — is specifically a governance failure. Not analytical failure, not wrong recommendations — failure to establish a client-side structure that sustains momentum after the engagement ends. Governance rows in each phase address that failure directly: here is how you stay informed, here is the cadence of your review meetings, here is who is accountable and to whom.

The hiring freeze is worth noting separately. It's the single most immediate action in the entire roadmap — Day 7, no cost, owned by the CHRO, and it immediately begins capturing savings through attrition. Starting with an action that costs nothing and takes one week to implement is the right way to build implementation momentum. Sandra sees real movement within the first week rather than waiting for a twelve-month restructuring to produce results.

Finishing this at midnight on day four, with the client presentation at 11:30 AM tomorrow, is a representative sample of what the consulting job actually looks like. The analytical work was done earlier in the week. Tonight is about turning that work into something operationally executable.`,
    after: `The implementation roadmap is finished at 11:45 PM — four phases, eighteen specific actions, named owners, and a governance cadence. Sent to Priya and Jamie with a message: "Implementation roadmap complete. This is the section that makes or breaks the engagement for Sandra." The final presentation is tomorrow.`,
  },

  // ── Day 5: Client Readout ──────────────────────────────────────────────────

  'management-consultant-d5-b1': {
    before: `Katherine Wells is joining the team for the first time this morning for a final pre-client briefing. Partners attend the client readout but typically don't participate in day-to-day work — they join for the final presentation. The task this morning is briefing Katherine concisely, answering her questions accurately, and ensuring she feels confident about every number in the deck before walking into Meridian's conference room.`,
    simulatedWork: `[Scene: Hotel lobby meeting space. Katherine Wells — composed, direct, clearly experienced — sits across from Priya, David, and the Analyst. The printed deck is on the table.]

Katherine (Partner): "Priya, give me the ninety-second version."

Priya (Engagement Manager): "Identified $44 to $52 million of savings across three workstreams. Most confident in the corporate overhead and scheduling findings — fully bottom-up validated. The upper end of the range depends on store consolidation, which has the longest implementation timeline."

Katherine (Partner): "Why is the range so wide?"

David (Senior Manager): "Two workstreams have data-confirmed estimates. The store consolidation is directionally confirmed but depends on foot traffic data that arrived late — that analysis has a larger confidence interval."

Katherine (Partner): "What does Sandra Hill know about the range?"

Priya (Engagement Manager): "She knows our preliminary finding is in the $40 to $55 million range. We've been transparent about the confidence levels throughout the engagement."

Katherine (Partner): "SG&A finding. One sentence."

The Analyst meets Katherine's eyes and answers without referring to notes.

Analyst (Consulting): "Corporate overhead is 40% above the industry benchmark — a $6.3 million bottom-up savings opportunity through a 40-position headcount reduction and IT consolidation, implementable in 18 months without a formal restructuring announcement."

Katherine (Partner): "Good. That's the kind of answer I can use in the room."`,
    commentary: `Notice Katherine's first question to me — she asked for one sentence, not a summary. That's a deliberate test: can the workstream be synthesized into a single client-usable sentence, or does it expand into a sequence of qualifications and caveats? The sentence I gave contains four elements: the size of the gap (40% above benchmark), the dollar figure ($6.3M), the mechanism (headcount reduction and IT consolidation), and the critical implementation caveat (no formal restructuring announcement). That last element is the one Sandra will care about most.

Partners are accountable for everything said in the client room. When Katherine fields a tough question from Sandra or Tom, she often relies on exact language from her analysts to answer it. Being able to provide that language cleanly, unprompted, and without checking notes is a skill that builds internal reputation quickly. It signals that the analyst understands not just the analytical work but the client context — who the audience is, what they care about, and what framing serves them.

The ninety-second briefing Priya gave Katherine at the start of this session is equally instructive. Every engagement team member needs to be able to compress two weeks of work into ninety seconds. Not because partners don't have time for details, but because the ability to compress work into a precise summary demonstrates mastery of the material. If the summary rambles, the partner worries. If it's clean, the partner trusts.`,
    after: `Katherine reviews the deck for thirty minutes and adds four comments — all minor clarifications, no structural changes. She says to the team: "Good engagement. The SG&A workstream is the strongest. Make sure that lands well in the room." The meeting with Meridian's leadership begins in ninety minutes.`,
  },

  'management-consultant-d5-b2': {
    before: `The final dry run is a thirty-minute rehearsal of the presentation — focused not on content review but on transitions, timing, and Q&A readiness. Katherine plays a skeptical Meridian executive and challenges the team's most defensible positions. This is the last opportunity to find weak points before they appear in the real presentation.`,
    simulatedWork: `[Scene: Conference room with the deck projected on the wall. Katherine sits to the side with a notepad, in character as a skeptical CFO. The Analyst sits toward the back, prepared to field questions on the SG&A section.]

David (Senior Manager): "Our analysis identified $44 million in confirmed savings opportunities across three workstreams, with an additional $8 million conditional on store consolidation decisions."

Katherine (Partner): "Forty-four million is confirmed, but in the last two weeks I've heard numbers ranging from $38 million to $55 million. Which is it?"

Priya (Engagement Manager): "The $44 million reflects our highest-confidence findings — the corporate overhead reduction and scheduling efficiency improvements are fully validated with Meridian's actual data. The upper range depends on decisions about store consolidation that have longer lead times."

Katherine (Partner): "The implementation roadmap says 'Marketing restructuring by month three.' What does that mean in practice for someone in this building?"

The Analyst leans forward and takes the question.

Analyst (Consulting): "Specifically, it means the CMO and CHRO agreeing on a 19-position reduction in the marketing department, implementing an attrition-first policy immediately, and filling the remaining gap through a targeted restructuring process over ninety days. There's no external announcement required — this happens through normal management processes."

Katherine breaks character and looks at Priya.

Katherine (Partner): "Good answer on the marketing question. That was exactly the right level of specificity. Priya — your answer on the range was clean but slightly defensive. Say it more confidently next time."`,
    commentary: `Katherine's coaching — "say it more confidently" — points at something subtle but genuinely important about how clients read tone. Priya's answer was analytically correct. But the delivery signaled uncertainty, and in a room with a skeptical CFO, even a small tonal signal of defensiveness invites further skepticism. Clients read body language and vocal confidence as data signals about whether to trust the recommendation.

Notice what the dry run accomplished beyond catching Priya's delivery: it produced the exact language I'll use in the real room. The specific answer about the marketing restructuring — naming the 19-position figure, the attrition-first mechanism, the ninety-day timeline, the absence of an external announcement — was prepared and rehearsed before the client meeting rather than improvised in real time. That's the difference between a clean, confident answer under pressure and a stumble.

The dry run surfaces the questions that feel obvious to the team but land as genuine challenges from someone outside the work. Katherine's question about the range — "which number is it?" — is precisely the question Sandra will ask. Having a prepared, confident answer ready is not spin. It's preparation.

One more thing worth watching: when Katherine asked the implementation question, the Analyst answered it rather than deferring to Priya. That's appropriate — it was a question about the SG&A section, and answering it directly demonstrates workstream ownership and saves Priya from needing to relay second-hand information in front of the client.`,
    after: `The dry run ends at 10:50 AM. Katherine gives the team a final note: "The deck is strong. Don't over-explain in the room — trust the work." Twelve copies of the deck are printed, the conference room at Meridian is confirmed, and the team takes their seats. The presentation begins at 11:30 AM.`,
  },

  'management-consultant-d5-b3': {
    before: `The client readout presentation is the moment two weeks of work become a concrete recommendation to Meridian's leadership. The room includes CEO Tom Reardon, CFO Sandra Hill, VP Operations Mike Torres, Head of HR, and three regional directors — the same people from the kick-off workshop. Katherine presents the framing and executive summary; Priya and David present the findings; the Analyst presents the SG&A workstream and fields questions on the overhead analysis.`,
    simulatedWork: `[Scene: Meridian headquarters boardroom. Twelve people at the table. The consulting team sits on one side. Katherine stands at the front of the room, the deck projected behind her.]

Katherine (Partner): "Two weeks ago you gave us a mandate: find $50 million in sustainable savings. We're here to tell you where it is and how to capture it."

Katherine presents the executive summary — clean, two minutes, landing the $44M confirmed and $8M conditional. David presents the supply chain and store operations findings. Priya introduces the SG&A section and turns to the Analyst.

Priya (Engagement Manager): "Our analyst will walk through the corporate overhead analysis."

The Analyst stands and faces the room.

Analyst (Consulting): "Meridian's corporate overhead is currently running at 8.1% of revenue. The peer group for retailers at your revenue scale runs at a median of 5.7%. Even targeting the 75th percentile — a conservative goal — creates a $9.7 million opportunity. Our bottom-up analysis, built from your actual department headcount and cost data, lands at $6.3 million."

Sandra (CFO, Meridian): "Walk me through the bottom-up number."

Analyst (Consulting): "Six corporate functions analyzed against benchmark staffing levels. Marketing has the largest gap — 19 positions above benchmark at $1.56 million. IT is second — 10 positions plus software license consolidation across 17 ERP systems generating $2.8 million in non-headcount savings."

Sandra (CFO, Meridian): "The 17 ERP systems — that's something we already know about. Is that in your $6.3 million or in addition to it?"

Analyst (Consulting): "It's included in the $6.3 million — the $2.8 million IT line includes the license consolidation estimate. If ERP consolidation goes beyond the conservative estimate of 8 systems, the savings could be higher."

Sandra (CFO, Meridian): "That's fair. And the 40-position headcount reduction — voluntary or involuntary?"

Analyst (Consulting): "Primarily attrition-first over 12 months. The model assumes 15 positions filled through attrition, 25 through targeted restructuring with severance."`,
    commentary: `This is the moment the engagement turns. Sandra asked to "walk through the bottom-up number" — and the Analyst could do it, function by function, from Meridian's actual data. She's not asking because she doesn't know. She's testing whether the analyst knows. When the ERP figure was confirmed as included rather than additive — a detail that could have been a $2.8M overcount if answered incorrectly — that's when the analytical credibility lands.

Two weeks of preparation for three minutes of presentation. That ratio feels unfair until you're in the room. Every question Sandra asks is a quality check on the rigor of the underlying work. If a number can't be traced, if an assumption can't be stated, if the evidence behind a finding can't be described department by department — the recommendation unravels in real time. It doesn't matter how the slides look.

Notice what the Analyst did when Sandra asked about voluntary versus involuntary: answered precisely with specific numbers (15 attrition, 25 restructuring) rather than saying "primarily attrition." That specificity matters because Sandra's next conversation will be with her CHRO. If she goes to that conversation with "primarily attrition" as her understanding, the CHRO will have follow-up questions she can't answer. If she goes with "15 attrition, 25 targeted restructuring with severance," she can brief her directly.

Preparing for a presentation at this level means preparing to be interrogated on every number by the person who knows the business best. That's who Sandra is. And that's what happened here.`,
    after: `Katherine closes the presentation with the implementation roadmap. Sandra studies the governance section for two minutes, then says: "This is the first consulting recommendation I've seen that tells me what I need to do Monday morning." She agrees to move forward. The engagement extends into an eight-week implementation support phase. Priya says to the team: "You all did excellent work. This is what good consulting looks like."`,
  },

  'management-consultant-d5-b4': {
    before: `The Q&A session extends beyond the formal presentation into a working session with Meridian's leadership team. This is where questions that couldn't be addressed in a prepared presentation get answered: specific concerns from individual executives, questions about implementation sequencing, and requests for data not in the deck. The goal is clear alignment on next steps and a specific commitment from Sandra Hill to begin Phase 1.`,
    simulatedWork: `[Scene: Post-presentation. Half the executives remain in the boardroom. People have moved seats — the formal presentation arrangement has broken down into something more conversational. Katherine takes questions from the front of the room.]

Regional Director (Atlanta market): "The store consolidation recommendation — what does that mean for the four stores in our market? That's seven hundred jobs."

Katherine (Partner): "We want to be clear — the store consolidation analysis is directional. The full analysis is presented as a 'potential' opportunity that requires a detailed market-by-market assessment before any decisions are made. No specific stores are identified for closure in today's recommendation."

Tom (CEO, Meridian): "Sandra — what's your reaction to the overhead recommendation?"

Sandra (CFO, Meridian): "I think the bottom-up analysis is credible. The 40-position number is higher than our internal study from two years ago, but the business has grown since then. I'd want to validate the Marketing number specifically — 19 positions feels high."

The Analyst waits a beat, then responds directly.

Analyst (Consulting): "The Marketing benchmark is from seventeen retailers with similar revenue and store format. But if there are strategic reasons Meridian maintains a larger marketing function — building an internal creative capability, for instance — that would change the number. We flagged that as a validation item."

Sandra (CFO, Meridian): "There is a reason — we've been building our internal digital marketing team to reduce agency spend. That tradeoff should be in the analysis."

The Analyst writes without interrupting: "Marketing headcount partially offset by reduced agency spend — recalculate net savings. Follow-up item before Phase 1 implementation."

Priya (Engagement Manager): "We'll recalculate the marketing savings net of agency cost reduction and send you a revised figure by end of week."`,
    commentary: `Sandra's insight about the digital marketing team is exactly the kind of correction that makes a recommendation stronger rather than weaker. She's not pushing back against the analysis to be difficult — she's adding context that makes the recommendation more accurate and more implementable. The right response is to hear it, note it immediately, and commit to a revised figure by a specific date.

Notice what I didn't do: I didn't defend the original number. I didn't say "our benchmark accounts for that" or "the data suggests otherwise." I said exactly what was true — that the validation item had been flagged, that a strategic rationale would change the number, and that we'd recalculate. That intellectual flexibility is what builds long-term client trust. The willingness to say "we'll recalculate" rather than "our number is right" is one of the clearest signals that a consulting team is oriented toward the client's success rather than toward defending its own work.

This kind of correction also tends to produce a better recommendation. The final marketing savings estimate — net of agency cost reduction rather than gross — will be smaller, but it will be defensible. A smaller number Sandra believes is worth more than a larger number she's skeptical of.

The regional director's question about seven hundred jobs is a different category of challenge — not analytical but political. Katherine's response is measured: directional, not a commitment to close specific stores. That's the right answer because the store consolidation analysis explicitly isn't at that stage of specificity. Committing to something the analysis doesn't support would be a different kind of credibility problem.`,
    after: `The session ends at 4:15 PM. Tom Reardon authorizes a Phase 1 implementation kickoff for the following Monday. Sandra commits to providing the IT license inventory data needed to finalize the ERP consolidation estimate. Five specific follow-up items are listed on the way out of the building. The engagement's value has been confirmed — now the implementation begins.`,
  },

  'management-consultant-d5-b5': {
    before: `The final task of the week is documenting everything from today — the presentation outcomes, Q&A insights, follow-up commitments, and Phase 1 action items — and building the revised proposal that incorporates the corrections from the Q&A. This is the document Meridian's management team will use to execute next week. It needs to be precise, actionable, and delivered by Friday evening.`,
    simulatedWork: `[Scene: Hotel room, 4:35 PM. The Analyst opens a new document titled "Meridian_Phase1_Commitments_v1" alongside the deck and the Q&A notes from the afternoon.]

The Analyst drafts the executive outcome summary at the top of the document.

Analyst (Consulting): "Meridian leadership accepted the Phase 1 recommendations with one modification: Marketing headcount reduction to be recalculated net of agency cost offsets. Full implementation authorization pending revised Marketing figure."

The Analyst builds the Phase 1 action list below the summary, assigning specific owners to each item.

Analyst (Consulting): "Action 1 — Monday: CHRO issues hiring freeze memo to VP-level managers — no backfilling of open positions in above-benchmark functions. Owner: Sandra Hill. Timeline: 48 hours."

Analyst (Consulting): "Action 2 — Day 7: CTO commissions ERP audit — all 17 systems, monthly license cost, active user count. Owner: CTO. Deliverable due: Day 30."

Analyst (Consulting): "Action 3 — Day 14: CMO and CHRO begin marketing restructuring planning process. On hold pending receipt of revised net savings calculation from consulting team."

The Analyst drafts a follow-up email to Sandra, reading it aloud quietly to check the tone.

Analyst (Consulting): "Sandra — thank you for your engagement today. As discussed, we are recalculating the marketing headcount savings net of estimated agency cost reduction. We will have a revised figure to you by Friday COB. Attached is the updated Phase 1 action list reflecting today's commitments. Please confirm named owners at your earliest convenience."

A reply comes in from Priya on the shared drive.

Priya (Engagement Manager): "Good email. Clean, specific, no fluff. Add one sentence at the end: 'We look forward to supporting you through the implementation phase.' Professional, and it reminds her of the next engagement without being pushy."`,
    commentary: `The discipline of the follow-up memo — delivered the same evening, not days later — is one of the clearest operational signals that a consulting team takes implementation as seriously as analysis. Sandra gets a document on Friday evening that tells her exactly what happens Monday morning, named to specific executives, with no ambiguity. That immediacy isn't just good service — it's a message about how this team operates. It says: when we commit to something, it gets done that day.

Notice the structure of the action list: owner named by title and name, specific deliverable stated, deadline explicit, and one item held pending the team's revised calculation. That last detail — holding Action 3 explicitly rather than just not listing it — prevents a miscommunication where the CMO thinks restructuring planning is supposed to start Monday when it actually depends on a revised number that hasn't been sent yet.

The Priya addition — "we look forward to supporting you through the implementation phase" — illustrates something important about consulting as a business. An engagement that ends with a strong recommendation and a satisfied CFO naturally creates the next phase of work. Naming it explicitly in the closing email isn't aggressive business development; it's a clean transition statement that makes Sandra's next decision (do we want them for implementation?) an easy yes.

Over five days, the Analyst moved from a blank hypothesis tree and a skeptical CFO to a $44 million confirmed savings program with a named owner for every action item and an eight-week implementation extension. That's what a well-executed consulting engagement looks like from the inside.`,
    after: `The revised proposal and follow-up memo are sent at 7:15 PM Friday evening. Sandra replies at 7:42 PM: "Received. Will confirm owners Monday morning." Katherine sends the team a message: "Strong engagement. Good week, all." The implementation support phase begins next Monday — six more weeks of turning analysis into real savings.`,
  },
}
