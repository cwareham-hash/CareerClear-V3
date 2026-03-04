import type { TimeBlockContent } from '../simulation'

// PayQuick — Real-Time Payment Notifications Launch
// Cast: Ravi Mehta (Tech Lead), Tara Kim (UX Designer),
//       Ben Walsh (Engineering Manager), Lisa Chen (VP of Product),
//       Marcus Johnson (Data Lead), Carlos Vega (iOS Engineer)

export const productManagerContent: Record<string, TimeBlockContent> = {

  // ── Day 1: Discovery Sprint ────────────────────────────────────────────────

  'product-manager-d1-b1': {
    before: `The APM is leading PayQuick's real-time payment notifications launch — the most requested feature by 68% of users in the last survey. The feature enables instant push notifications when a payment is sent, received, or pending. Today is the first day of the discovery sprint. The sprint planning standup is where the APM aligns the cross-functional team — engineering, design, and data — on this week's objectives and confirms everyone understands their role in the discovery phase before any building begins.`,
    simulatedWork: `[Scene: Video standup — six browser windows. The APM's camera is on, a sprint board visible in the background. Ravi, Tara, Ben, Marcus, and Carlos join from their respective locations.]

APM (Product Management): "Quick context before we dive in — real-time notifications has been at the top of the user request list for two quarters. This sprint is discovery only. Nothing gets built yet. Our goal by Friday: a PRD draft, a technical feasibility assessment from Ravi, and Tara's initial design explorations."

Ravi (Tech Lead): "Before we go further — what does 'real-time' mean technically? True push, meaning sub-second, or is sub-five-second acceptable? That distinction affects the architecture significantly."

The APM pauses, pulls up the user research doc, and scans the relevant section before responding.

APM (Product Management): "The research uses the word 'instant.' I'd define the requirement as under three seconds from event to notification for standard network conditions. Does that change the architecture?"

Ravi (Tech Lead): "Yes. Under three seconds rules out batch processing and requires a streaming event pipeline. More complex, but achievable. I'll have a feasibility memo by Thursday."

Tara (UX Designer): "From a design standpoint — are we building notification content only, or a notification preferences center where users can customize what they get notified about?"

APM (Product Management): "Both, eventually. For this sprint, scope is core notifications first. Preferences is Phase 2. The goal is to confirm users actually want the core notifications in the way we're imagining before designing a whole preferences system on top of it."

Marcus (Data Lead): "I can pull the existing notification interaction data — we have push permission grant rates and engagement metrics from our current batch notifications. That should inform the design and timing."

The APM makes a quick note on the sprint board, adding Marcus's data pull as a deliverable.

APM (Product Management): "Perfect. Marcus, bring that to the stakeholder alignment meeting Thursday. It'll anchor the discussion."`,
    commentary: `I started that standup with three words that matter: "discovery only, nothing gets built yet." That framing prevents engineers from starting architecture work before we've validated the requirement — a mistake that can cost weeks of rework. In product management, sprint discipline starts with what you don't do, not just what you do.

When Ravi challenged the definition of "real-time," that was exactly the right push. Notice I didn't say "figure it out." I pulled up the research, found the specific user language — "instant" — and translated it into a testable technical requirement: under three seconds. If I'd left it as "real-time," Ravi would have built against his own interpretation, and we might have gotten a five-second system that technically meets the spec but fails the user.

This conversion — from ambiguous product goal to precise, evaluatable criteria — is one of the most important skills in this job. Engineering can only build what you specify. If your specification is vague, you'll get a vague product.

Tara's question about preferences is also worth noting. She's thinking ahead, which is good. But the instinct to defer preferences to Phase 2 isn't arbitrary — it's about not designing a control surface before confirming that the core behavior is worth controlling. Sequence matters in product development.`,
    after: `The standup ends at 9:20 AM. The APM updates the sprint board with four parallel tracks: Ravi's technical feasibility memo by Thursday, Tara's design exploration by Friday, Marcus's data analysis for Thursday, and the PRD draft by Friday. The morning is spent reviewing user research to build the evidence base for the feature.`,
  },

  'product-manager-d1-b2': {
    before: `The user research review is the analytical foundation for the PRD. PayQuick's UX team conducted thirty user interviews and a 1,200-person survey last quarter about notification preferences and pain points with the current delayed-notification system. Before defining what to build, the APM needs to understand what users actually want — not just the headline number ("68% want real-time notifications") but the nuanced picture underneath it.`,
    simulatedWork: `[Scene: The APM's desk. A research report is open across two monitors — interview transcripts on the left, survey data and affinity diagram notes on the right.]

The APM reads through the user interview highlights, pausing on specific quotes and marking them with annotations.

APM (Product Management): "'When I send money to split a restaurant bill, I'm just staring at my phone waiting to know if it went through.' That's User 14. 'I've sent money twice because I wasn't sure the first one worked.' — User 7. 'My bank texts me immediately when my card is charged. Why doesn't PayQuick?' — User 22."

The APM scrolls to the survey data section and stops at the notification priority rankings.

APM (Product Management): "Top notification moments users want: payment sent confirmation at 91%, payment received at 88%, payment failed or declined at 87%, payment pending or processing at 64%, promotional offers at 22%."

The APM leans back and stares at the screen, working through the numbers.

APM (Product Management): "Payment pending is at 64%, but failure notifications are at 87% — users are more anxious about failures than pending status. The primary driver isn't just speed. It's anxiety reduction around uncertain transactions. Failed payments matter as much as successful ones."

The APM adds a flag to the notes document and continues reading.

APM (Product Management): "'I don't want to be notified about every micro-transaction — if I'm using PayQuick to split a $3 coffee, I don't need a buzz on my wrist.' That's User 31. That's a signal that notification volume control matters. The design has to respect that."

The APM types a synthesis note into the PRD draft: "Core insight: users want anxiety reduction around uncertain transactions, not just speed. The notification must arrive quickly enough that it closes the uncertainty loop — which means failure notifications are equally critical as success notifications."`,
    commentary: `The shift I'm making here — from "users want fast notifications" to "users want anxiety reduction around uncertain transactions" — is what separates product thinking from feature-implementation thinking. If I'd only read the headline stat ("91% want payment sent confirmation"), I'd build a system that sends confirmation notifications fast. That sounds right. But by reading the research carefully, I discovered that failure notifications are nearly as important as success ones, and that users have strong opinions about notification volume.

That nuance will shape the PRD in ways the headline stat alone never would have produced. The research shows three distinct needs: speed to close the uncertainty window, confirmation of failure as much as success, and protection from notification fatigue. Each of those becomes a design requirement.

Research synthesis is where PMs earn their strategic value. Anyone can read a 91% stat. The judgment is in reading the failure rate alongside it and asking what that gap reveals about user psychology. When you understand the why — anxiety reduction — you can evaluate every design decision against it. That's a much more powerful frame than "make notifications faster."`,
    after: `By 11:30 AM the research review is complete and a one-page synthesis has been drafted: the primary user insight (anxiety reduction around transaction uncertainty), the key notification moments ranked by user importance, and a tension worth designing for (users want critical notifications fast but don't want notification fatigue). The synthesis is sent to Tara to inform her design exploration, and the afternoon's stakeholder meeting prep begins.`,
  },

  'product-manager-d1-b3': {
    before: `The stakeholder alignment meeting brings together the heads of Engineering, Design, Data, Marketing, and Customer Operations to confirm that real-time notifications is the right feature to prioritize and to surface any cross-functional concerns before discovery begins. Stakeholder alignment sounds like a formality, but it's a critical risk mitigation step — each function sees different risks and constraints, and a thirty-minute meeting now prevents a thirty-day delay later when a concern surfaces for the first time.`,
    simulatedWork: `[Scene: Conference room. Ben, Tara, Marcus, Priya, Devon, and the APM around the table. A projected slide shows the sprint overview and feature scope.]

APM (Product Management): "We're moving into the discovery sprint for real-time notifications. I want to use this meeting to surface any concerns from each team before the PRD is written. Starting with engineering — Ben, anything from your side?"

Ben (Engineering Manager): "The main constraint is our notification infrastructure. We currently use a third-party service for batch notifications. Real-time will require either extending that service or building a custom event pipeline. Ravi is assessing the build vs. buy decision — we should have clarity by end of week."

Priya (Head of Marketing): "Marketing question — does this feature change how we communicate PayQuick's value proposition? Real-time notifications could be a significant marketing moment."

APM (Product Management): "Yes — and Marketing should be involved in how we announce it. Let's schedule a separate session once the PRD is drafted. For now, the marketing angle doesn't affect the technical scope."

Devon (VP Customer Operations): "Operations concern — our support volume for 'I didn't receive the money' is our second-highest ticket category. If real-time notifications work, those tickets should drop. I want to make sure we measure that and tie it back to support cost reduction."

The APM makes a note and turns to Marcus across the table.

APM (Product Management): "That's a great outcome metric. Marcus — can you add support ticket volume for payment uncertainty to the metrics framework we're building?"

Marcus (Data Lead): "On it. I'll include baseline and target reduction."

Priya (Head of Marketing): "One more thing — notification opt-out rates. If we push too aggressively, users opt out of all notifications. That's a permanent relationship degradation."

The APM writes quickly: "[Risk: aggressive push notifications → opt-out escalation → loss of notification channel entirely. Design for opt-in, not opt-out.]"`,
    commentary: `Priya's concern about opt-out rates is the most strategically significant risk raised in this entire meeting, and it almost slipped by as a side comment. A PM who isn't thinking about the notification channel holistically might celebrate high notification engagement in the short term while quietly destroying the permission basis for all future communication with users.

The opt-out risk reframes the design challenge entirely. We're not just building a feature that sends fast notifications — we're building a feature that should reinforce users' trust in the notification channel itself. That framing influences how I define success metrics. Notification send rate is far less important than notification value perceived by the user.

This is also a classic stakeholder alignment moment: Priya is not in the engineering sessions, she's not in the design reviews, and she wouldn't naturally see the notification design until it's being marketed. By including Marketing in this early meeting, I surface a constraint that shapes the product before anything is built. That's the design of stakeholder alignment — the people who see downstream consequences need to be in the room at the upstream decisions.`,
    after: `The meeting ends at 3:05 PM. Three additions land in the PRD scope: the build vs. buy decision as a gating item, support ticket volume as a success indicator, and an explicit design principle around notification preference and opt-out prevention. The remainder of the afternoon is spent in the feature prioritization workshop with Tara and Marcus.`,
  },

  'product-manager-d1-b4': {
    before: `The feature prioritization workshop is a working session with Tara and Marcus to build a prioritized feature list for the PRD. A long list of possible features has accumulated — real-time delivery, multiple notification channels, notification history, smart batching, user preferences — and this session maps each one to user value, technical effort, and strategic priority. The output is the scope definition section of the PRD: what's in, what's out, and what's explicitly deferred.`,
    simulatedWork: `[Scene: Whiteboard room. Sticky notes organized in a 2x2 grid — High Value/Low Effort top left, High Value/High Effort top right, Low Value/Low Effort bottom left, Low Value/High Effort bottom right. Tara and Marcus are seated. The APM is at the whiteboard.]

APM (Product Management): "Let's map the candidate features. I'll call them out, you tell me where they land."

Tara (UX Designer): "Real-time push notification for payment sent and received — that's high value from the research. Low-to-medium effort if we use the existing push infrastructure."

Marcus (Data Lead): "I'd move it to medium effort. It depends heavily on Ravi's assessment of the streaming pipeline."

APM (Product Management): "Agreed. Medium effort. Upper right quadrant — high value, medium effort. In scope."

The APM places the sticky note and picks up the next one.

Tara (UX Designer): "Notification preferences center — users choose which events to get notified about."

APM (Product Management): "User research shows this is wanted, but it's not the primary anxiety driver. And it's medium-high effort because it's a full settings surface. High value, high effort — schedule for Phase 2."

Marcus (Data Lead): "In-app notification history — a list of all past notifications with status."

Tara (UX Designer): "That's actually relatively low effort if we're already generating the notification events. We just surface them."

APM (Product Management): "But does it solve the core problem? A user who wants to know if their payment went through wants to know in the moment, not retrospectively. Low value, low effort — ship as a Phase 1b after launch."

Tara (UX Designer): "Smart batching — grouping multiple small transaction notifications into a single summary."

Marcus (Data Lead): "That directly addresses the opt-out risk Priya raised."

The APM pauses, looking at the board, then places the note in the upper right.

APM (Product Management): "High value, medium effort. Phase 1 scope — but as a Phase 1 fast-follow, not a Day One feature. It can't delay the core launch."`,
    commentary: `The prioritization workshop is where product judgment gets tested most clearly. Every stakeholder has a feature they want in scope — and the pull of scope creep is constant. The frame I'm holding throughout this session is: what solves the core user problem first?

Notice how I handled notification preferences: acknowledged as wanted by users, meaning it's genuinely high value, but explicitly deferred because it doesn't address the primary anxiety driver and adds design complexity. That decision will be challenged — Tara, Ravi, and possibly Lisa will all have opinions. But I've made it on principle, not arbitrarily, and that's what makes it defensible when the pushback comes.

The 2x2 prioritization matrix isn't magic. It's just a forcing function that converts opinion ("I think we should build X") into a comparison ("X is high value and medium effort versus Y which is low value and high effort — where does your X land on this grid?"). When everyone has to place features on the same axis, it surfaces assumptions and creates shared criteria. That's the real value of the framework.`,
    after: `The workshop produces a clean four-category priority map: five features in Phase 1 core scope, three in Phase 1b, four in Phase 2, and two permanently deprioritized. The board is photographed and captured in a Notion table. This becomes Section 3 of the PRD — the scope definition. Evening work is drafting the full PRD.`,
  },

  'product-manager-d1-b5': {
    before: `The Product Requirements Document is the foundational artifact of the feature launch — the single document that aligns engineering, design, data, and operations around what is being built, why, and how success will be measured. A clear PRD prevents misalignments that surface as costly surprises during development. The initial draft is being built tonight — not final until stakeholder review, but substantive enough to anchor tomorrow's technical conversations.`,
    simulatedWork: `[Scene: The APM's desk, 5:15 PM. Notion is open to a blank PRD template. The research synthesis document is visible on the second monitor.]

The APM begins typing the problem statement, pausing occasionally to reference the research document.

APM (Product Management): "Current state: PayQuick sends payment notifications in a batch process that can take five to fifteen minutes. 68% of users in survey research report wanting real-time confirmation. Primary pain point: transaction anxiety during the uncertainty window between sending a payment and receiving confirmation."

The APM scrolls down to the success metrics section and begins entering numbers from Marcus's data pull.

APM (Product Management): "Primary metric: notification delivery latency at P95 under three seconds for standard network conditions. Secondary: in-app survey score on payment confidence — target 30% improvement from baseline. Support ticket volume for payment uncertainty — target 25% reduction. Notification opt-out rate — not to exceed current baseline of 8%."

The APM drafts the scope section with deliberate precision, referencing the prioritization workshop notes.

APM (Product Management): "Phase 1 Core scope: real-time push notification for payment sent, payment received, and payment failed. Push channel only. No notification preferences center."

The APM writes the user story and re-reads it twice before continuing.

APM (Product Management): "As a PayQuick user, when I initiate a payment, I want to receive a push notification within three seconds of the payment completing, failing, or entering a pending state, so that I don't have to actively monitor the app to know if my payment was processed."

A Slack notification appears on screen. The APM reads it and types a response.

Ravi (Tech Lead, via Slack): "Quick question for the PRD — are you defining 'payment completing' as when our system records it, or when the recipient's bank acknowledges it? Those can be different events, and one is much harder to build than the other."

APM (Product Management): "Our system completion event. We can't control bank acknowledgment latency. I'll document that as a known limitation in the constraints section."`,
    commentary: `Ravi's technical question — "our system completion or recipient bank acknowledgment?" — exposed an ambiguity in the user story that, left unresolved, would produce a feature that doesn't match what users expect. Users' mental model of "payment complete" is often "money in the other person's account," not "our system processed the transaction."

By choosing "our system completion" and explicitly documenting it as a known limitation, I'm making a deliberate scope decision that balances user expectation against technical feasibility. That trade-off, written into the PRD, gives the team shared understanding and prevents a disagreement in week six about what "done" actually means.

The PRD is not a creative document — it's a contract. Every ambiguity in a PRD is a future argument between a PM and an engineer about what was agreed. Ravi's question is a gift: it surfaces an ambiguity now, when fixing it costs nothing, instead of in development, when it costs a week of rework.

This is also why technical literacy matters for PMs. I may not know how to build the streaming pipeline, but I know enough to understand why "our system" versus "recipient's bank" is a meaningful distinction. That knowledge lets me engage with Ravi's questions rather than deferring them.`,
    after: `The PRD first draft is complete at 9:45 PM — twelve sections covering problem statement, user research synthesis, success metrics, scope, user stories, constraints, and open questions. It is sent to Ravi, Tara, Marcus, and Ben for async review overnight. Tomorrow's technical session will be anchored in a concrete document rather than a conversation.`,
  },

  // ── Day 2: Requirements ────────────────────────────────────────────────────

  'product-manager-d2-b1': {
    before: `The daily scrum is a fifteen-minute standup — not a status report, but a coordination mechanism where each team member answers three questions: what did I complete yesterday, what am I working on today, and are there any blockers? The APM's role is to listen for emerging blockers and dependencies, not to present. The scrum is for the team; the APM is facilitating, not performing.`,
    simulatedWork: `[Scene: Video standup — same six browser windows as Day 1. The APM has the sprint board open on a second screen, cursor ready to update it in real time.]

Ravi (Tech Lead): "Yesterday: started the streaming pipeline architecture research. Today: finishing the feasibility memo. Blocker: I need access to the current notification service's API documentation. Ben — can you pull that?"

Ben (Engineering Manager): "On it. I'll share it in Slack by 10 AM."

Tara (UX Designer): "Yesterday: finished reviewing the user research synthesis. Today: initial wireframes for the notification UI. No blockers."

Marcus (Data Lead): "Yesterday: pulled the baseline notification interaction data. Today: building the metrics dashboard structure. One question — for the payment confidence metric, do we need a baseline in-app survey before launch? We can't measure improvement without a before number."

The APM immediately adds a note to the sprint board before responding.

APM (Product Management): "Yes, good catch. Let's add a baseline survey deployment to this sprint. How quickly can you set that up?"

Marcus (Data Lead): "One day. I'll have it live tomorrow if I can get the survey tool access."

APM (Product Management): "I'll authorize it today. Anyone else?"

Carlos (iOS Engineer): "I reviewed the PRD last night. One open question — do notifications need to appear differently if the payment is above a certain dollar amount? Like, a high-value transaction alert versus a routine notification?"

APM (Product Management): "Not in Phase 1. Adding it to the Phase 2 backlog now. But good thinking — that's likely a real user need for larger payments."`,
    commentary: `Marcus just caught a real gap — without a pre-launch baseline survey, the 30% improvement in payment confidence I defined as a success metric is unmeasurable. A metric without a baseline isn't a metric; it's a wish. The fact that the data lead surfaced it in a standup rather than three weeks post-launch is a sign of a high-functioning team. That's not accidental — it comes from creating a culture where the team reads the PRD and thinks critically about it.

Carlos's question about high-value transaction alerts is also worth noting. He didn't just accept the PRD as written — he read it, thought about edge cases, and asked. That kind of engaged engineering pushes product thinking forward. Good PMs reward it, because teams that stop asking get worse over time.

The standup itself is a governance tool, not a reporting ritual. When I'm facilitating, I'm listening for two things: blockers that I can unblock immediately (like Marcus's survey access), and signals that suggest the team's understanding of the scope is drifting from the PRD (like Carlos's high-value alert question). Both showed up today. Both were handled in under two minutes.`,
    after: `Standup ends at 9:20 AM. The APM authorizes Marcus's survey tool access immediately, adds the baseline survey to the sprint task list, and logs Carlos's high-value alert idea in the Phase 2 backlog. The morning is spent building out the technical requirements specification — the engineering companion to the product PRD.`,
  },

  'product-manager-d2-b2': {
    before: `The technical requirements specification bridges the product PRD and the engineering implementation. While the PRD defines what the feature does from a user perspective, the technical spec defines how it should behave at the system level — latency thresholds, error handling, API contract, and integration points. The first draft is being built today, in collaboration with Ravi's feasibility work, to enable the engineering estimation session this afternoon.`,
    simulatedWork: `[Scene: The APM's desk. The PRD is open on the left monitor; a system architecture diagram is open on the right. Confluence is open to a new technical requirements document.]

The APM types methodically, building each section from the user-facing requirements in the PRD.

APM (Product Management): "Section 1: Notification Trigger Events. The notification system shall generate a push notification within three seconds of the following payment state transitions: INITIATED to COMPLETED, INITIATED to FAILED, INITIATED to PENDING_VERIFICATION."

The APM moves to the next section, drafting the failure handling logic with care.

APM (Product Management): "Section 2: Failure Handling. If push notification delivery fails due to device offline status, the system shall queue the notification and retry upon device reconnection, for up to 24 hours. After 24 hours, the notification shall be dropped and the event logged. Rationale: stale payment notifications create more confusion than value."

The APM drafts the API contract section, specifying each field of the notification payload.

APM (Product Management): "Section 3: Notification Payload. Each notification shall include: event_type (PAYMENT_SENT, PAYMENT_RECEIVED, or PAYMENT_FAILED), amount, counterparty_display_name, timestamp, deep_link_url to the transaction detail screen."

A Confluence comment notification appears. The APM reads Ravi's feedback and updates the document.

Ravi (Tech Lead): "The 24-hour retry window is fine for PAYMENT_RECEIVED, but PAYMENT_FAILED notifications should have a shorter retry window — probably six hours. After six hours, if the payment failed, the user needs to take action, and a notification at twenty hours isn't useful."

The APM updates the section immediately and replies in the thread.

APM (Product Management): "Agreed — splitting the retry policy by event type. FAILED: 6-hour window. RECEIVED and SENT: 24-hour window. Updating now."

Ravi (Tech Lead): "Also — 'within 3 seconds' should specify under what conditions. Server-to-server is trivially fast. The 3-second requirement should apply to event occurrence to user device receipt under standard 4G and WiFi conditions."

APM (Product Management): "Correct. Adding the network condition qualifier."`,
    commentary: `The exchange with Ravi — where he correctly pushed me to differentiate retry windows by event type and add a network condition qualifier — is a model of PM-engineering collaboration at its best. I wrote a good first draft; Ravi's technical expertise made it more precise and operationally correct.

Notice what I didn't do: I didn't defend the 24-hour window for PAYMENT_FAILED. The instinct to defend your own document is strong, but it's wrong. Ravi knows more than I do about how users interact with stale failure notifications. His correction is better than my original. Receive it, incorporate it, move on.

The ability to accept technical corrections without defensiveness is foundational to this job. Engineers work with PMs who listen and close the loop on their feedback. They route around PMs who defend bad specs.

The retry window split by event type is also a good example of how technical specificity improves user experience. A generic 24-hour retry policy sounds fine until you imagine waking up to a "payment failed" notification for a transaction you sent twenty hours ago and have already resolved some other way. Ravi thought about the operational reality; I thought about the user requirement. The collaboration produced something better than either alone.`,
    after: `By noon the technical requirements spec is at version 0.8 — system-complete but pending Ravi's final review of the streaming pipeline section, which he will add after the feasibility memo is finished. The document is sent to Ben ahead of the engineering estimation session at 3:30 PM.`,
  },

  'product-manager-d2-b3': {
    before: `The design review with Tara is a working session to evaluate her initial wireframes and give feedback. Design review isn't about approving visuals — it's about ensuring design decisions solve the user problem as defined in the research. The APM brings the user research synthesis and specific questions: Does this design address the anxiety reduction insight? Does it respect the opt-out risk? Does it work for the fast-scan mental model users have when they're waiting for confirmation?`,
    simulatedWork: `[Scene: Design review in Figma. Tara is screen-sharing her wireframes — three flows: notification receipt on lock screen, in-app notification banner, and notification history inside the transaction detail. The APM has the user research synthesis open in a side window.]

Tara (UX Designer): "Three explorations. First — the lock screen notification. Standard iOS format, PayQuick branding, payment confirmed message, amount, and the payer's display name."

APM (Product Management): "This looks clean. One question — when a user is anxious about a payment, they want to know status as fast as possible. Is 'Payment Confirmed' the first word they read, or does it get buried in the format?"

Tara (UX Designer): "Good note. iOS lock screen format shows app name first. I can put the status as the notification title to front-load it."

The APM nods and pulls up the user research on the second monitor, finding the specific quote.

APM (Product Management): "Moving to the notification center — I like the color coding. Question: in the research, one person said they sent a payment twice because they weren't sure the first one worked. Is there anything in this design that prevents that behavior?"

Tara (UX Designer): "The transaction history is always one tap away. But if they're on the send screen and the notification arrives..."

APM (Product Management): "The notification should block the duplicate action. Can we surface a banner on the send screen that says 'Payment already sent' if a matching transaction is still in processing?"

Tara (UX Designer): "That's a new surface. I'll explore it — it's a good protection. But it adds scope to the engineering estimate."

The APM makes a note in the PRD doc and then turns back to the screen.

APM (Product Management): "Flag it as Phase 1b. The core notification is still Phase 1 — this is a fast-follow."`,
    commentary: `The "double-send prevention" feature I proposed in that session didn't come from a brainstorm — it came from a specific user research quote ("I sent money twice because I wasn't sure the first one worked") colliding with a design gap that Tara's wireframe exposed. That's what makes design reviews valuable: they create the collision between design decisions and user insights that produces genuinely new ideas.

Notice how I handled the scope question. I proposed the feature, immediately acknowledged it adds engineering complexity, and made a priority decision — Phase 1b fast-follow — in real time. I didn't say "let's think about it." I made a call based on the framework we already had.

Good PMs make decisions in design reviews rather than collecting options. Every open question you leave a design session with becomes a follow-up meeting, an email chain, or a delayed decision that blocks the designer. Your job is to unblock the work with a decision, not to defer it with a process.

The "already sent" banner is also a good example of defensive design — designing against the failure mode, not just the happy path. Most notification systems are built around the success case. The user research told us the failure and uncertainty cases matter as much.`,
    after: `The design review ends at 2:45 PM with three specific feedback items and one new Phase 1b feature on the list — the double-send prevention banner. Tara will update the wireframes by end of week. The engineering estimation session is at 3:30 PM, and Ben needs to be briefed on the double-send prevention addition before it starts.`,
  },

  'product-manager-d2-b4': {
    before: `The engineering estimation session is where Ben's team sizes the development effort for the Phase 1 scope. These sessions determine whether the planned feature is achievable within the target timeline and whether any scope adjustments are needed before the PRD is finalized. The APM's role is to present the scope clearly, answer questions about user requirements, and be willing to negotiate on scope rather than timeline if trade-offs are required.`,
    simulatedWork: `[Scene: Conference room — Ben, Ravi, Carlos, and two backend engineers. The APM and Tara are presenting from a printed scope summary. A whiteboard shows the Phase 1 feature list.]

APM (Product Management): "We have a concrete Phase 1 scope: real-time push notification for three payment events — sent, received, and failed — under three seconds, on iOS and Android. Tara will walk through the design, then Ravi will present the technical approach, and we'll size the work together."

Tara (UX Designer): "Three flows, all finalized from today's review session."

Ravi (Tech Lead): "Technical approach: streaming event pipeline using Kafka, push delivery via existing service. Streaming pipeline — four weeks to build and test. Push delivery integration — one week. Total backend: five weeks."

Ben (Engineering Manager): "Does that track with your estimates?"

Backend Engineer: "I'd add a week for load testing. Notifications at scale — if everyone gets a notification at the same time during a peak transaction period, we need to validate the queue behavior."

APM (Product Management): "What's the peak transaction period?"

Backend Engineer: "Friday afternoons, four to seven PM. We process about twelve times normal volume."

Ben (Engineering Manager): "Add the load testing week. Backend is six weeks."

Carlos (iOS Engineer): "iOS client: notification receipt, the app deep link, and the notification center UI. Three weeks."

Ben (Engineering Manager): "Total estimate: six weeks backend, three weeks iOS, assuming parallel execution. End-to-end: six weeks plus two weeks QA — eight weeks total."

The APM checks the project plan on the laptop and does the math.

APM (Product Management): "Eight weeks. Our target is ten weeks to launch — that gives us two weeks of buffer. Tight but workable. What's the single biggest risk to the timeline?"

Ravi (Tech Lead): "The streaming pipeline. If we hit infrastructure issues with the Kafka deployment, it could slip by two weeks."

APM (Product Management): "What's the mitigation?"

Ravi (Tech Lead): "Start with a proof of concept in week one. If we see problems early, we can evaluate a managed streaming service — more expensive but faster to deploy. We have options if we identify the risk early."`,
    commentary: `The estimation session is where product vision meets reality. Eight weeks against a ten-week target is the scenario I needed to have a plan for — and asking "what's the single biggest risk to the timeline?" before the session ended is the right move. Not "are we on track?" — that gets you "yes" or "we'll see." Asking for the single biggest risk forces the team to commit to a specific concern.

The Kafka proof of concept in week one is the mitigation that matters. It turns a six-week risk (discovering Kafka problems at week four) into a two-week decision point (discovering them at week one, when alternatives still exist). That's risk management: shrinking the window between a risk materializing and the team having options.

Notice also that I didn't negotiate on timeline in the room. Eight weeks against a ten-week target leaves buffer. If I had pushed for a six-week estimate to look ambitious, I'd have consumed the buffer before a single line of code was written. Protecting buffer is protecting the ability to absorb surprises. Every sprint has surprises.`,
    after: `The estimation session ends with an eight-week estimate and a timeline management plan: Kafka proof of concept in week one, decision point by end of week two on build versus managed service. The project plan and the PRD's implementation section are updated. PRD refinement begins in the evening.`,
  },

  'product-manager-d2-b5': {
    before: `The PRD refinement session incorporates all inputs from the week — user research synthesis, technical requirements, design direction, and engineering estimation — into a final, coherent PRD draft. This isn't just adding sections; it's a critical synthesis pass that ensures the document tells a complete and internally consistent story from problem statement to implementation plan.`,
    simulatedWork: `[Scene: The APM's desk, 5:30 PM. PRD version 0.1 is open with comments and tracked changes accumulated from the day's sessions.]

The APM works through the document methodically, checking each section against the day's new information.

APM (Product Management): "The problem statement says 'five to fifteen minutes notification delay.' The technical spec says the target is under three seconds. The PRD doesn't connect those two things explicitly. Adding: 'The current 5–15 minute delay creates a transaction anxiety window that users experience as uncertainty. The feature closes this window by delivering status confirmation within three seconds, effectively eliminating the uncertain period.'"

The APM scrolls to the success metrics section and adds Marcus's baseline survey requirement.

APM (Product Management): "Payment confidence metric requires a baseline survey — Marcus is deploying tomorrow. Adding: 'Baseline measurement via in-app survey to be deployed one week prior to launch. Minimum baseline sample size: 500 respondents.'"

The APM adds the double-send prevention feature to Phase 1b scope with a specific engineering estimate.

APM (Product Management): "Phase 1b scope: In-app duplicate payment detection — surface a 'payment already in progress' banner on the send screen if a matching transaction is within a 60-second processing window. Estimated additional engineering effort: three days."

A Slack notification appears. The APM reads it, stops, and types a response.

Lisa (VP of Product, via Slack): "I read the PRD draft. Looks good overall. One concern: the opt-out risk Priya raised in the stakeholder meeting — I don't see it addressed in the design principles or risk section."

APM (Product Management): "You're right. Adding a design principle: 'Notifications should be high-signal, not high-volume. The feature should result in fewer, more meaningful notifications — not more total notifications.' And adding to the risk register: 'Notification opt-out rate increase beyond 8% baseline triggers immediate design review.'"

Lisa (VP of Product, via Slack): "Good. That's a sharp way to frame the constraint."`,
    commentary: `Lisa caught an important gap between the stakeholder meeting discussion and the PRD documentation. The opt-out risk was raised and understood in conversation, but it hadn't been formalized into a design principle or a risk threshold. In a PRD, if it's not written down, it doesn't exist. Team members who weren't in the stakeholder meeting have no way to know it's a constraint.

Adding it as both a design principle — "high-signal, not high-volume" — and a measurable risk threshold — "opt-out beyond 8% triggers review" — converts an informal concern into a documented guardrail. Those are two different functions: the principle guides designers making daily decisions; the threshold triggers escalation when the metric is measured. Both are necessary.

This is also why having a sharp VP review the PRD is valuable. Lisa read the document from the perspective of someone who has seen ten launches go wrong in ways this one might. She caught the gap not because she's pedantic about documentation, but because she knows that undocumented concerns become forgotten concerns. The PRD isn't a creative writing exercise — it's organizational memory.`,
    after: `The final PRD is sent to all stakeholders at 9:15 PM for sign-off review. Lisa approves it thirty minutes later with a note: "Clear, complete, and actionable. Good first PRD for this feature." It is now the official north star for the ten-week development sprint.`,
  },

  // ── Day 3: Design Review ───────────────────────────────────────────────────

  'product-manager-d3-b1': {
    before: `The morning check-in with Lisa Chen is a brief sync about the sprint's progress and any strategic context that isn't visible from the day-to-day position. Lisa has visibility into company priorities and stakeholder dynamics that don't surface in sprint meetings, and these check-ins are how the APM stays calibrated to the larger picture. She has also reviewed the PRD and likely has additional thoughts.`,
    simulatedWork: `[Scene: Lisa's office — glass-walled, overlooking the product floor. The APM is seated across from her with a notebook open.]

Lisa (VP of Product): "Good PRD. A few things I want you to know before the sprint continues. First — leadership is watching this launch closely. Real-time notifications is on the Q2 roadmap commitments to the board. If this slips to Q3, it needs to be escalated before I find out from someone else. I don't need daily updates, but I need to know if you see risk before I do."

The APM makes a note and looks up.

APM (Product Management): "Understood. Current timeline is ten weeks — eight weeks development, two weeks buffer. The single biggest risk is the Kafka streaming infrastructure. Ravi is doing a week-one proof of concept."

Lisa (VP of Product): "Good. Flag me if the PoC shows problems. Second — I want to make sure you're thinking about Android and iOS experience parity. Our Android user base is larger by volume but we typically launch iOS first. Any reason to do that differently here?"

APM (Product Management): "I haven't explicitly addressed Android parity timing yet. The user research didn't break out platform preferences significantly. My inclination is simultaneous launch — notification behavior is a core trust feature, and launching iOS-only could cause Android users to feel deprioritized."

Lisa (VP of Product): "I agree, but confirm with Ben that the Android estimate isn't significantly longer. I don't want an artificial scope difference driving the platform decision."

APM (Product Management): "I'll add that question to today's engineering sync."

Lisa (VP of Product): "One more thing — don't be too protective of scope. If engineering finds a way to add smart batching in the Phase 1 timeline without adding risk, let them."`,
    commentary: `Lisa's advice — "don't be too protective of scope" — is a deliberate counterweight to the natural PM instinct to hold the scope line rigidly. There's a real tension here, and it's worth sitting with. Protecting scope prevents timeline creep. But being too rigid prevents opportunistic improvements that engineering might be able to do cheaply in context.

The right approach is to evaluate additions by risk, not by a blanket yes or no. If smart batching can be added without touching the critical path, refusing it is protecting the plan at the cost of user value. Lisa is calibrating me toward risk assessment as the filter, not scope size.

This is also a good example of how a VP relationship should work. Lisa isn't micromanaging — she's giving context I don't have (board commitments, strategic visibility on the Q2 milestone) and calibrating my judgment (don't be too rigid on scope). That information changes how I'll handle the next three weeks. These check-ins are worth the thirty minutes.

Notice that Lisa asks about Android parity, not because she wants to change the decision, but because she wants to confirm I've thought about it. A good VP asks about the decision you almost made but didn't document.`,
    after: `Three additions to the sprint checklist emerge from the meeting: confirm Android launch parity timing with Ben, confirm the Kafka PoC is scheduled for week one, and evaluate smart batching feasibility against the current timeline with zero added risk. The prototype walkthrough with the cross-functional team is next.`,
  },

  'product-manager-d3-b2': {
    before: `The prototype walkthrough is a structured review of Tara's medium-fidelity prototypes with the full cross-functional team. The goal isn't to polish visuals — it's to evaluate whether the design solves the user problems articulated in the PRD, surface any technical concerns, and identify whether user testing next week should test alternative concepts or focus on refinement. The APM is facilitating; every team member is evaluating the prototype against their own function's requirements.`,
    simulatedWork: `[Scene: Conference room. Tara is presenting from Figma projected on the wall. Ben, Ravi, Carlos, Marcus, and the APM are seated around the table.]

Tara (UX Designer): "Three flows to review. First — the notification on lock screen. Second — the in-app notification banner that appears if you're actively using the app. Third — the notification history inside the transaction detail."

Tara walks through the lock screen flow. The team watches in silence.

Ravi (Tech Lead): "Technical question on the in-app banner — when the user is on the payment send confirmation screen and the SENT notification arrives, does the banner replace the send confirmation or appear on top of it?"

Tara (UX Designer): "Current design has it appearing on top as an overlay."

Ravi (Tech Lead): "If it appears on top of the send confirmation, the user sees two confirmations — one from the app and one from the notification system. That's redundant. Can we suppress the notification if the user is already on the transaction screen?"

The APM leans forward and makes a note.

APM (Product Management): "Tara, can the app suppress the in-app banner if the user is already on the transaction detail screen for that specific transaction?"

Tara (UX Designer): "Technically yes — the deep link URL in the notification includes the transaction ID. If the user is already viewing that transaction, suppress the in-app banner."

Carlos (iOS Engineer): "That's a simple check on the iOS side. Add it as a notification trigger condition."

Marcus (Data Lead): "Metrics question — if we suppress the notification for users on the transaction detail, does that affect our latency measurement? We'll count it as delivered but the user won't see it."

The APM pauses before answering, working through the distinction.

APM (Product Management): "Define delivery as server-to-device, not user-visible. The latency metric measures infrastructure performance. Visibility is a UX concern. Different metrics, different owners."`,
    commentary: `What just happened in that room is exactly why cross-functional prototype reviews exist. The in-app notification suppression solution — suppress the banner if the user is already on the transaction screen — emerged from Ravi asking an engineering question, Tara identifying the technical mechanism, Carlos confirming it was simple on iOS, and Marcus asking a metrics clarification. None of those insights would have surfaced in a design-only review or an engineering-only session.

The specific distinction Marcus raised at the end — server-to-device delivery versus user-visible display — is a precision that matters for how the metrics are interpreted post-launch. If we counted "suppressed" notifications as delivery failures, the latency dashboard would show worse performance than reality during periods of high app engagement. By separating the metrics now, I'm protecting the accuracy of the measurement system.

This is also a demonstration of the prototype review format at its best. The APM's role wasn't to have the right answers — it was to facilitate the collision of different functional perspectives and ensure the outputs were captured as PRD updates. The team did the work; the APM created the conditions for it.`,
    after: `The walkthrough ends at 2:20 PM. Tara has eight specific update items, including the in-app suppression logic, visual hierarchy adjustments to front-load payment status in the notification title, and the double-send prevention banner design. The PRD's UX section is updated to reflect the in-app suppression logic as a defined behavior. The user testing session is next.`,
  },

  'product-manager-d3-b3': {
    before: `The user testing session is a moderated usability test with six PayQuick users recruited by the research team. Tara is running the session; the APM is observing, taking notes, and listening for signals that validate or challenge the design assumptions in the PRD. The observer role is strictly non-interventional — watch and listen. Users will reveal things with their behavior that they can't articulate in a survey.`,
    simulatedWork: `[Scene: Observation room behind one-way glass. The APM, Marcus, and Ben are watching. Tara is in the adjacent room running sessions with a prototype on a test device. Session 2 is underway.]

Tara (UX Designer): "You've just sent $45 to Alex for dinner. What do you expect to happen next?"

User 2: "I'd expect to see some kind of confirmation in the app."

Tara (UX Designer): "The device just got a notification — can you interact with it normally?"

The user swipes on the lock screen notification. The deep link opens the transaction detail correctly. The APM writes a note.

User 2: "Oh, that's nice. It took me right to the transaction. I don't have to search for it."

The APM underlines the note: "[Deep link to transaction detail is high value. Validate with other users.]"

Session 4 begins. A different user is seated across from Tara.

Tara (UX Designer): "You received $20 from Jordan. What does the notification tell you?"

User 4: "'$20 received from Jordan.' That's clear. But... how do I know it's actually in my account? This says 'received' but PayQuick sometimes processes things weirdly."

The APM writes quickly and circles the note: "[CRITICAL: 'Received from' vs. 'Available in account' — user doesn't trust the intermediate state. Consider: 'Available in PayQuick balance' rather than just 'received.']"

Session 5. A third user.

Tara (UX Designer): "If you get this notification at midnight, do you want to be woken up by it?"

User 5: "No. Absolutely not. I would immediately turn off all notifications."

The APM writes in larger letters and adds a red box around it: "[Critical finding: Quiet hours / notification timing control is more important than previously scoped. This is a must-have for avoiding opt-out. Escalate to Phase 1 scope consideration.]"`,
    commentary: `The two insights from that observation room — "received vs. available in account" and quiet hours control — are the kind of findings that only emerge from watching users interact with a prototype. No survey would have caught the trust gap in the word "received." Users don't articulate that they distrust the intermediate state; they just behave as if the money isn't real until they see their balance update.

Changing the copy from "received" to "available in your PayQuick balance" costs zero engineering effort and resolves a real cognitive friction. That's the kind of insight that justifies the entire user testing budget.

The quiet hours finding is more significant because it changes the scope. User 5's response — "I would immediately turn off all notifications" — is a direct statement of opt-out intent. That's not a preference; it's a threat to the entire notification channel. Escalating quiet hours from Phase 2 to Phase 1 is the correct call, even though it adds scope.

Notice the observation discipline: the APM is not in the room, not explaining, not nodding when users get confused. The observer role requires that restraint. The moment you intervene in a user session, you stop observing natural behavior and start observing coached behavior. Those are different data.`,
    after: `The debrief with Tara and Marcus happens immediately after the session. Two PRD updates are required: copy change from "received from" to "available in your PayQuick balance," and quiet hours control escalated from Phase 2 to Phase 1 scope. A five-minute call with Ben is scheduled to assess the engineering impact of adding quiet hours before the estimate is finalized.`,
  },

  'product-manager-d3-b4': {
    before: `The feedback synthesis session is where the APM and Marcus convert raw user testing observations into structured findings, prioritize them by severity, and determine which ones require PRD changes before engineering begins. This session also produces recommendations for what to validate in a follow-up test versus what the team is confident enough to build without further testing.`,
    simulatedWork: `[Scene: Whiteboard room. The APM and Marcus are organizing observation notes from the testing session into categories by severity and type of action required.]

APM (Product Management): "Two critical findings: one — 'received vs. available' copy issue, affects user trust. Two — quiet hours control, affects opt-out risk. Two moderate findings: three — users liked the deep link behavior, we need to make sure we don't break it. Four — users want to see payment balance after a received notification, not just confirmation."

Marcus (Data Lead): "On the balance display — how many users mentioned it?"

APM (Product Management): "Three out of six."

Marcus (Data Lead): "That's statistically meaningful for six sessions. Is that a copy change or a UI change?"

APM (Product Management): "It could be a copy change — instead of just 'available in your PayQuick balance,' change to 'your balance is now $X.' But that requires embedding the current balance in the notification payload, which is a backend change."

A Slack notification appears. The APM reads it and types a quick question before continuing.

Ravi (Tech Lead, via Slack): "Embedding current balance in notification payload is possible but adds a real-time database call at notification time. Small latency hit — maybe 50ms. Still well under the 3-second requirement."

APM (Product Management): "Does it create any security or privacy concerns?"

Ravi (Tech Lead, via Slack): "If someone looks at your phone lock screen, they see your PayQuick balance. That's a concern for some users."

The APM makes a note and turns back to Marcus.

APM (Product Management): "Make it opt-in rather than default. Phase 1b — default off, users can enable 'show balance in notifications' in settings. That avoids the privacy issue and prevents scope bloat."

Marcus (Data Lead): "Smart. I'll add it to the testing debrief documentation as a Phase 1b consideration."`,
    commentary: `The balance display feature just went through four rapid decision steps in about five minutes: user observation identified the want, feasibility check confirmed it's buildable, privacy risk identification revealed a constraint, and then a scope and design decision — opt-in, default off, Phase 1b — resolved all three at once. That's the decision loop I'm trying to run in real time.

Notice I didn't reject the feature because it was complex. I found a design pattern — opt-in, default off — that addresses the privacy concern while preserving the option for users who want it. Scope management at its worst is "no, that's out of scope." Scope management at its best is "here's how we can give users that capability without the cost and risk."

The opt-in framing is also good product design. Users who care about balance visibility can enable it; users who don't want their balance visible on their lock screen are protected by default. Default settings shape behavior for the vast majority of users who never change them. Setting the privacy-protective option as the default is a product values choice, not just a scope decision.`,
    after: `By 5 PM a synthesis document is complete with eight findings organized by priority, each tagged with a recommended action — PRD change, Phase 1b scope addition, or monitor. The quiet hours control and the "available in balance" copy change are Phase 1 updates; everything else is Phase 1b or later. The evening is spent drafting the updated feature spec.`,
  },

  'product-manager-d3-b5': {
    before: `The updated feature spec incorporates all design feedback, engineering clarifications, and user testing findings into a revised PRD. This is the third major iteration of the document — it is becoming the definitive specification that the engineering team will use as their primary reference throughout development. The quality of this document will directly affect the quality of what gets built.`,
    simulatedWork: `[Scene: The APM's desk, 5:30 PM. PRD version 0.3 is open with tracked changes from the week's work. The synthesis document from the testing session is open beside it.]

The APM works through the document section by section, making targeted updates based on the day's findings.

APM (Product Management): "Replacing 'Payment received from [Name]' with 'Available in your PayQuick balance — [Name] sent you $X.' Rationale: user testing showed 'received' creates uncertainty about fund availability. 'Available in your balance' closes the uncertainty loop more completely."

The APM scrolls to the scope section and adds the quiet hours requirement.

APM (Product Management): "Adding Phase 1 requirement: Quiet Hours Control. Users may designate quiet hours during which payment notifications are suppressed and held in notification history. Default quiet hours: 10 PM to 7 AM local time. Users can customize or disable. Required for launch — user testing demonstrated high opt-out risk for notification delivery during sleep hours."

The APM adds a note below it with the scope impact.

APM (Product Management): "Engineering scope impact of quiet hours addition: estimated plus one week — Ben confirmed on call at 4:30 PM. Updated timeline: nine weeks development, one week buffer. Risk level increases slightly — buffer has been consumed by scope addition. Escalate to Lisa if any further scope additions are proposed for Phase 1."

The APM updates the metrics section to reflect the new segmentation.

APM (Product Management): "Metrics update: add opt-out rate segmented by time-of-day. If opt-outs are concentrated in late-night hours before the feature launches, that provides advance validation of the quiet hours requirement."

The APM drafts a brief email and sends it to Lisa before closing the laptop.

APM (Product Management): "PRD v0.3 reflects all week's inputs. Key change: quiet hours control elevated to Phase 1 — user testing showed high opt-out risk without it. Timeline now nine weeks plus one week buffer. Happy to discuss trade-offs if the timeline is a concern."`,
    commentary: `The decision to escalate quiet hours control to Phase 1 — consuming one week of the two-week buffer — required weighing user risk against timeline risk. The user testing finding was unambiguous: "I would immediately turn off all notifications." That's a statement of opt-out intent from someone who hasn't experienced notification fatigue yet. Launching without quiet hours control would create a wave of opt-outs in the first week that could permanently damage the notification channel.

That risk outweighs the one-week timeline cost. Clear.

What matters as much as the decision itself is how it's communicated. I didn't quietly absorb the scope addition and hope no one noticed the buffer shrinking. I documented the reasoning in the PRD, flagged the reduced buffer to Lisa, and explicitly said "escalate to me if any further scope additions are proposed." That's transparent product management.

A PM who makes good decisions but hides the trade-offs is ultimately less trustworthy than a PM who makes good decisions and names them clearly. Lisa needs to know the buffer is at one week, not two. That information changes how she manages the board conversation if the timeline shifts.`,
    after: `Lisa replies at 8:30 PM: "Agree with the quiet hours call. Good judgment. Nine-week timeline is still within Q2 — we're fine. Watch the remaining buffer carefully." PRD v0.3 is the final version before engineering kickoff. The remaining weeks are about execution, monitoring, and launch preparation.`,
  },

  // ── Day 4: Engineering Sync ────────────────────────────────────────────────

  'product-manager-d4-b1': {
    before: `The sprint sync is the weekly engineering status check — a more detailed version of the daily standup focused on tracking progress against the development plan. The Kafka proof of concept that Ravi was asked to complete by end of week one is finished, and the results need to be reviewed. This is a decision point: proceed with the Kafka build or switch to a managed streaming service.`,
    simulatedWork: `[Scene: Conference room. Ben, Ravi, Carlos, and the APM around the table. A whiteboard shows the streaming pipeline architecture diagram from the PoC.]

Ben (Engineering Manager): "Ravi — PoC results?"

Ravi (Tech Lead): "Good news and a concern. The good news: Kafka can handle our peak transaction volume with under 200ms server-side latency — well within the 3-second requirement. The concern: our infrastructure team has limited Kafka operations experience. Running Kafka in production requires ongoing tuning that we don't have internal expertise for."

APM (Product Management): "What's the alternative?"

Ravi (Tech Lead): "AWS Kinesis — a managed streaming service. More expensive by about $18,000 per year, but operationally simpler and AWS handles the infrastructure management. Build time: two weeks versus five weeks for Kafka."

Ben (Engineering Manager): "My vote is Kinesis. The three-week time savings goes back into the development buffer."

The APM thinks for a moment, then looks at the whiteboard.

APM (Product Management): "What's the trade-off we're making by choosing Kinesis?"

Ravi (Tech Lead): "Vendor dependency and cost. We're paying AWS to manage something we could eventually manage ourselves. But for this launch, the risk reduction is worth the cost."

APM (Product Management): "Is $18K per year the right comparison? What's the engineering time cost of managing Kafka ourselves?"

Ravi (Tech Lead): "Two to three days of engineering time per month, at minimum. At our blended engineering rate, that's $15K to $20K per year in engineering time. So managed versus self-managed is roughly cost-neutral, and managed reduces risk significantly."

The APM writes the comparison on the whiteboard and draws a circle around the bottom line.

APM (Product Management): "I'll bring the Kinesis recommendation to Lisa with that cost analysis. Given the Q2 timeline pressure, I expect she'll approve. Ben — assume Kinesis as of today and I'll confirm by EOD."`,
    commentary: `The question — "is $18K per year the right comparison?" — shifted the entire framing of the build versus buy decision. Ravi's initial comparison was infrastructure cost versus infrastructure cost: $18K to run Kinesis versus $0 for self-hosted Kafka. That framing makes Kafka look free.

By introducing engineering maintenance time as a cost factor, the comparison becomes: $18K for Kinesis versus $15–20K in engineering time plus operational risk for Kafka. That's roughly cost-neutral with Kinesis clearly winning on risk. A much easier recommendation to get approved.

This is a PM skill that doesn't get talked about enough: cost reframing. Decisions that look expensive from one angle often look different when all the costs are surfaced. Engineers see infrastructure costs easily; they sometimes underestimate the ongoing cost of their own time to maintain infrastructure they built. Bringing that cost into the comparison isn't manipulation — it's completeness.

The cost analysis also makes Lisa's approval easier. "We want to spend $18K more" is a hard ask. "The options are roughly cost-neutral and Kinesis reduces Q2 timeline risk" is easy. Same recommendation, different frame, very different response.`,
    after: `Lisa approves the Kinesis recommendation at 4:15 PM with one sentence: "Good cost analysis — proceed." Ben updates the sprint plan to reflect the Kinesis architecture. The development timeline returns to eight weeks with one week buffer. The afternoon is spent on launch metrics definition.`,
  },

  'product-manager-d4-b2': {
    before: `The tech deep-dive with the backend team is a working session where Ben and Ravi walk through the engineering architecture in enough detail for the APM to participate meaningfully in future technical decisions. A PM doesn't need to be able to build the system, but needs to understand it well enough to anticipate how product changes translate into engineering complexity. This is one of the most valuable hours a PM can spend with an engineering team.`,
    simulatedWork: `[Scene: Whiteboard room. Ravi is at the whiteboard drawing the system architecture. The APM and Ben are seated.]

Ravi (Tech Lead): "Three components. The event producer — our payment processing service, sends an event to Kinesis when a payment state changes. The event consumer — a new service that reads from Kinesis and calls the notification delivery service. And the notification delivery service — existing, handles push to iOS and Android."

APM (Product Management): "Where does the three-second requirement live? Which component is the bottleneck?"

Ravi (Tech Lead): "Event producer to Kinesis: under 10ms. Kinesis to event consumer: this is where latency lives — typical P95 is 500ms to 1 second. Consumer to notification delivery: under 100ms. Notification delivery to device: variable, depends on platform — Apple APNS, Google FCM — and device network. Typically 500ms to 2 seconds."

The APM does the math, writing the numbers in a column on a notepad.

APM (Product Management): "So end-to-end P95 is roughly 1.6 to 3.1 seconds? We're at the edge of the three-second requirement at P95."

Ravi (Tech Lead): "Yes. To meet the requirement reliably, we should target P90, not P95, as our internal engineering target. Build in buffer for network variability."

APM (Product Management): "Let's update the technical spec: internal engineering target is P90 under two seconds server-to-device, to provide buffer for meeting the P95 under three-second product requirement. Does that add engineering complexity?"

Ravi (Tech Lead): "No — it's a target, not a constraint. We design for P90 and hope for better. Testing will tell us where we actually land."

The APM makes the update in the technical spec document on the laptop.`,
    commentary: `The shift from P95 to P90 as the internal engineering target — proposed after understanding the latency budget — is a technical product decision that protects the user-facing requirement. Notice the reasoning: if the end-to-end P95 under current estimates sits at 3.1 seconds — right at the edge of the requirement — any variance in network conditions pushes us over. Building to P90 creates a buffer that absorbs that variance.

I didn't need to understand Kafka or Kinesis to make this decision. I needed to understand the latency budget and the statistical relationship between internal targets and user-facing outcomes. That's the level of technical fluency a PM actually needs: not deep implementation knowledge, but enough to reason about system behavior and translate user requirements into engineering guidance.

Engineers respect PMs who speak their language with enough precision to have these conversations. They lose trust in PMs who treat technical specifications as someone else's problem. The latency budget conversation is exactly the kind of thing that separates PMs who drive good technical outcomes from PMs who just write specs and hope for the best.`,
    after: `By 3 PM the architecture overview is documented and the technical spec is updated with the P90 internal engineering target. The APM also asks Ravi to add a latency monitoring dashboard as a launch readiness requirement — real-time P50, P90, and P95 notification latency during the launch period. Ravi adds it to the sprint backlog.`,
  },

  'product-manager-d4-b3': {
    before: `The launch metrics definition session is where the APM, Marcus, and Lisa formally agree on the metrics that will define whether the launch is successful. This is a strategic conversation about what "success" means for real-time notifications — it will directly influence how the feature is presented to the board in the Q2 review. Getting the metrics right now prevents post-hoc debates about whether the launch worked.`,
    simulatedWork: `[Scene: Conference room — the APM, Marcus, and Lisa around the table. A Notion document is projected on the wall showing the draft metrics framework.]

Lisa (VP of Product): "Walk me through the metrics framework."

APM (Product Management): "Four categories. Technical performance: P90 notification latency under two seconds, measured from event to device receipt. User experience: payment confidence survey score improvement of 30% from baseline. Engagement: notification tap-through rate to transaction detail — 40 to 60% based on Marcus's comps data. Business impact: support ticket volume for payment uncertainty — target 25% reduction."

Lisa (VP of Product): "What's the failure threshold? At what point do we consider the launch a failure?"

Marcus (Data Lead): "I'd propose a 30-day checkpoint: if notification opt-out rate has increased by more than two percentage points from baseline, trigger a design review. If payment confidence score hasn't improved at all after 30 days, do a root cause analysis."

Lisa (VP of Product): "The opt-out threshold feels right. Payment confidence — what if it improves by 15% instead of 30%? That's not a failure, it's directional validation."

The APM looks at the metrics document and makes a note.

APM (Product Management): "Fair point. Reframe: 30% is the aspirational target. 15% is the 'directional success' threshold. Zero improvement triggers root cause analysis."

Lisa (VP of Product): "That's a cleaner framework. One addition — I'd add a revenue metric. If payment confirmation reduces abandonment or failed transactions, there should be a revenue signal. Marcus, can you model that?"

Marcus (Data Lead): "I can build a model. If failed transaction rate drops by 20% and each failed transaction represents $0.30 in lost fee revenue, at our transaction volume that's approximately $1.8M annually. I'll have the formal model done by end of week."`,
    commentary: `Lisa's push to add a revenue metric is a strategic level-up for the success framework. Technical performance and user experience metrics tell you whether the feature works. A revenue metric tells you whether it matters to the business. Those are different questions, and both need answers.

The $1.8M annual revenue opportunity Marcus estimated makes real-time notifications a business case, not just a user experience improvement. This distinction matters enormously for how the feature gets discussed at the board level. "We improved payment confidence by 30%" is a product result. "We recovered $1.8M in annualized revenue from reduced failed transaction abandonment" is a business result. Both are true. The second one gets the feature remembered.

This is also a skill worth developing: building the revenue model alongside the product metrics, not after. PMs who can connect their feature outcomes to revenue speak the language that unlocks resources, headcount, and prioritization decisions. The $1.8M number doesn't change what the feature does — but it changes how the organization values it.`,
    after: `The metrics framework is formalized in a Notion document: four categories, seven specific metrics, two failure thresholds, and a revenue model to be completed by Marcus by Friday. The document is sent to all product stakeholders for alignment. Lisa replies: "This is a metrics framework I can present to the board. Well done."`,
  },

  'product-manager-d4-b4': {
    before: `The risk review is a structured assessment of what could go wrong between now and launch, and what pre-emptive actions can reduce those risks. The APM is not building the risk list alone — the goal is to facilitate a cross-functional conversation where engineering, design, data, and operations each contribute the risks they see from their own vantage point. The output is a prioritized list with assigned mitigation owners.`,
    simulatedWork: `[Scene: Conference room. Ravi, Ben, Tara, Marcus, Devon, and the APM are seated. A blank risk register is visible on the projected screen.]

APM (Product Management): "Simple format: each function names their highest-priority risk. Then we assess likelihood and impact and assign a mitigation. Ravi — engineering?"

Ravi (Tech Lead): "Infrastructure reliability at launch. If Kinesis has an outage, our notification system goes down entirely. We have no fallback."

APM (Product Management): "What's the mitigation?"

Ravi (Tech Lead): "Build a fallback notification queue — if Kinesis is unavailable, queue events locally and flush when it recovers. Two-day build. I'd rather have it than not."

Ben (Engineering Manager): "Approved. Add it to the sprint."

Tara (UX Designer): "Design risk — we tested the prototype with six users. We haven't validated the quiet hours UX. I'm worried the quiet hours settings screen is confusing."

APM (Product Management): "Can we add it to the next round of user testing?"

Tara (UX Designer): "Yes — I can have a prototype of the settings screen ready for testing next week."

Marcus (Data Lead): "Data risk — the baseline survey has to be deployed at least two weeks before launch to give us a statistically significant pre-launch baseline. If we miss that window, we can't measure payment confidence improvement."

APM (Product Management): "Survey is being deployed tomorrow. That should give us the window we need. Flag me if sample size is tracking below 500 by end of week two."

Devon (VP Customer Operations): "Operations risk — if the launch causes a surge in notification-related support tickets, our team isn't prepared. We need documentation and a support runbook."

The APM makes a note and looks at Devon.

APM (Product Management): "Devon, can you draft the runbook structure and I'll fill in the product content? Let's get a first draft done before launch week."`,
    commentary: `The risk review just surfaced five meaningful risks — infrastructure, UX validation, data measurement, timeline, and operations readiness — that no single function would have identified alone. That's the design of the session. Infrastructure risks live in engineering; operations risks live in Devon's team; data risks live with Marcus. The only way to get them all on one list is to create a space where each function is asked to name their worst-case scenario.

Notice that every risk got an immediate mitigation action before leaving the room: Ravi builds the Kinesis fallback queue, Tara schedules quiet hours testing, Marcus monitors survey sample size, Devon drafts the runbook structure. A risk review without mitigation actions is a worry session. A risk review with assigned mitigations is risk management. The difference is in the discipline of assigning owners before the meeting ends.

The Kinesis fallback queue is worth understanding specifically. Ben approving it on the spot — "add it to the sprint" — is the right call. A two-day investment in a fallback queue now protects the entire launch from a single point of failure. That's insurance with a very clear premium and a very clear payoff.`,
    after: `The risk log is documented with five risks, four mitigation actions, and two monitoring thresholds. The Kinesis fallback queue is added to Ben's sprint backlog. A support documentation session with Devon is scheduled for next week. The evening's work is drafting the go-to-market brief.`,
  },

  'product-manager-d4-b5': {
    before: `The go-to-market brief coordinates the non-engineering aspects of the launch: how the feature is announced to users, how customer support is trained, whether there is a marketing campaign, and how the feature is positioned relative to competitors. This document is being written for Priya and Devon, giving them the product context they need to plan their own workstreams for the final four weeks before launch.`,
    simulatedWork: `[Scene: The APM's desk, 5:05 PM. A Notion document is open to a new GTM brief template. The PRD is visible in a side tab for reference.]

The APM begins with the positioning section, drafting three versions before settling on one.

APM (Product Management): "Positioning: PayQuick now confirms every payment instantly, giving users certainty the moment a transaction completes. Core message: 'Always know. In real time.' This differentiates from bank apps that provide batch updates and positions PayQuick as the trust standard for peer payments."

The APM moves to the marketing recommendation section and types quickly.

APM (Product Management): "Three-phase rollout. Phase 1, two weeks before launch: in-app teaser for existing users — 'Something better is coming.' Phase 2, launch day: push notification to all users announcing the feature. Phase 3, post-launch: targeted acquisition campaign using payment certainty as the differentiator."

The APM stops, re-reads the Phase 2 line, and deletes it.

APM (Product Management): "Wait — using a push notification to announce a push notification feature to users who may be skeptical of push notifications is exactly backwards. Changing the launch day announcement to an in-app banner instead."

The APM writes a note in the support preparation section.

APM (Product Management): "Support preparation: three new ticket categories expected. 'I enabled quiet hours but still got a notification' — document as known edge case for time-zone boundary events. 'My notification didn't arrive immediately' — support response: three-second target is P90, not guaranteed; device connectivity is a variable. 'I don't want balance displayed in notifications' — opt-out is available in settings."

A Notion comment appears on the draft.

Priya (Head of Marketing): "The 'always know, in real time' headline is strong. One addition — we should consider a PR angle. This is genuinely better than what most banks offer. It's worth a press release."`,
    commentary: `The irony I caught — using a push notification to announce a push notification feature to users who are skeptical of push — is the kind of self-awareness that prevents a launch from creating the exact problem it's trying to solve. The whole user research told us users want fewer, more meaningful notifications. Sending a promotional push on day one would be exactly the behavior that drives opt-outs.

Changing to an in-app banner costs nothing. It's a better user experience, it doesn't risk opt-outs from the announcement itself, and it reaches users who are actively engaged with the app — which is a better audience for a feature announcement anyway.

Priya's PR suggestion is worth taking seriously. Real-time notifications that work better than what major banks offer is a genuine differentiator. That's a story with external value. The GTM brief is where product thinking and marketing thinking collide productively — Priya's job is to find the story worth telling, and my job is to give her accurate product context to tell it with. The brief is that handoff.`,
    after: `The GTM brief is sent to Priya, Devon, and Lisa at 8:45 PM. Priya replies within twenty minutes with three additional marketing ideas. Lisa replies: "Good brief. Approve the PR angle — let's brief the comms team next week." Launch is six weeks out. The remaining work is execution and monitoring.`,
  },

  // ── Day 5: Launch Prep ────────────────────────────────────────────────────

  'product-manager-d5-b1': {
    before: `The launch readiness standup is an expanded version of the daily scrum focused on confirming that every workstream is on track to hit the launch date. With six weeks to launch, this is the first moment where a clear picture of end-to-end readiness is possible. Engineering progress, design finalization, QA scheduling, data readiness, marketing preparation, and operations training are all checked in a single synchronized view.`,
    simulatedWork: `[Scene: Video call — eight browser windows. The full cross-functional launch team. The APM has a launch status spreadsheet open on a second monitor.]

APM (Product Management): "We're six weeks out. I want each function to give me a one-sentence status on their track and flag any risk to the launch date. Engineering?"

Ben (Engineering Manager): "On track. Kinesis integration complete. Notification consumer service 70% done. No risks at this time."

Ravi (Tech Lead): "Fallback queue design is done — implementation starts Monday. No risks."

Carlos (iOS Engineer): "iOS client: notification receipt handling done. Notification center UI in progress. On track."

Tara (UX Designer): "All Phase 1 screens finalized. Quiet hours settings screen tested with users last week — passed. No open design issues."

Marcus (Data Lead): "Baseline survey running — 380 respondents as of this morning. Tracking toward 500 by end of next week. Revenue model complete — $1.8M annual impact confirmed. Metrics dashboard ready week four."

Devon (VP Customer Operations): "Support runbook first draft done. Team training scheduled for week five. No risks."

Priya (Head of Marketing): "Launch copy drafted. PR brief being reviewed by comms. In-app banner assets being designed. On track."

The APM scans the launch calendar on the second monitor and notices a gap.

APM (Product Management): "One flag from my side — the QA sprint hasn't been formally scheduled yet. Ben — I need the QA sprint on the calendar by Monday or we risk compressing it at the back end."

Ben (Engineering Manager): "I'll have it on the calendar by end of day today."`,
    commentary: `The QA sprint scheduling gap — noticed because the APM was tracking the full critical path, not just product workstreams — is exactly the kind of proactive risk management that keeps launches on schedule. No one else on that call was tracking whether QA was scheduled. That's the PM's role.

By raising it in the readiness standup rather than discovering the gap in week seven when QA should have started, there are two days to fix a scheduling problem rather than a two-day extension of the entire launch timeline. That's the compounding value of tracking dependencies early. A two-day early warning prevents a two-day slip.

The discipline of tracking the full critical path — not just the items directly in the PM's control — is what makes PMs valuable at the launch coordination level. Engineering tracks engineering work. Design tracks design work. The PM tracks everything and looks for the gaps between functions that no single function sees. QA falls between engineering delivery and launch, and it's invisible from any single function's perspective.`,
    after: `Ben schedules the QA sprint within three hours of the standup. The launch calendar is updated and a confirmation is sent to the full team. The launch readiness dashboard — showing green for six of seven workstreams and yellow for QA scheduling, now resolved — is updated and shared. The launch runbook review is next.`,
  },

  'product-manager-d5-b2': {
    before: `The launch runbook review is a detailed walkthrough of the step-by-step operational plan for launch day itself. The runbook ensures that if anything goes wrong — or if the APM is unavailable — any team member can follow the documented process and keep the launch on track. Writing and reviewing the runbook is unglamorous but essential; it converts tribal knowledge into operational documentation.`,
    simulatedWork: `[Scene: Conference room — Ben, Ravi, Devon, Marcus, Tara, and the APM. The runbook is projected on the wall, displayed section by section.]

APM (Product Management): "Walk through the runbook together — the goal is to find the gaps before launch day, not on launch day. Devon, you drafted the support section. Walk us through it."

Devon (VP Customer Operations): "Launch day T-minus 2 hours: support team briefed on three expected ticket types. T-minus 0, at launch: monitoring dashboard live, support lead assigned to the notifications queue. T-plus 1 hour: first status check — if ticket volume on notification-related issues is more than 200% of baseline, escalate to PM."

APM (Product Management): "What's baseline for notification-related tickets?"

Devon (VP Customer Operations): "About fifteen per day. Two hundred percent would be thirty tickets in the first day. That's a reasonable escalation threshold."

Ravi (Tech Lead): "Engineering runbook: T-minus 30 minutes — verify Kinesis stream health, verify notification consumer service heartbeat, verify fallback queue is operational. T-minus 0: enable real-time notification pipeline via feature flag flip. T-plus 5 minutes: confirm first test notifications received on test devices. T-plus 30 minutes: confirm latency is tracking at P90 under 2 seconds."

APM (Product Management): "Who holds the feature flag?"

Ravi (Tech Lead): "Ben or me. You need to give explicit authorization to flip it."

The APM makes an addition to the runbook document in real time.

APM (Product Management): "Adding to the runbook: PM sends authorization message to the engineering channel at T-minus 1 minute. Ravi or Ben flips the feature flag. No flag flip without PM authorization."

Marcus (Data Lead): "Who's monitoring the opt-out rate in real time on launch day?"

APM (Product Management): "You are. Adding to the runbook: Marcus monitors opt-out rate every fifteen minutes for the first two hours. If it increases more than one percentage point in any fifteen-minute window, page me immediately."`,
    commentary: `The "feature flag flip requires PM authorization" addition is a governance principle, not a bureaucratic formality. In a distributed engineering team, a feature flag can be flipped by anyone with access — and the PM is the accountable party if something goes wrong after launch. By making the authorization explicit in the runbook, I've created a documented checkpoint that ensures the PM is aware of and endorsing the exact moment the feature goes live.

This also protects engineering. If something goes wrong and there's a question about whether the launch should have happened when it did, the authorization message in Slack is the documented proof that the decision was made deliberately by the right person. That's not about blame — it's about clarity.

Marcus's opt-out monitoring addition is equally important. The first two hours of a notification-heavy launch are the most vulnerable window for opt-out escalation. Real-time monitoring with a clear escalation threshold — one percentage point in fifteen minutes — turns a potential crisis into a manageable signal. You can't respond to a metric you're not watching.

The runbook review is also a forcing function for operational clarity. Every "who does X?" question in the review surfaces an ambiguity that would otherwise become a confused conversation on launch day when everyone is watching dashboards and waiting for things to go wrong.`,
    after: `The runbook review produces seven specific additions and three process clarifications. The updated version is sent to all launch team members with a note: "This is the ground truth for launch day. Read it completely before week seven begins." Ben confirms the QA sprint is on the calendar. Six weeks to launch.`,
  },

  'product-manager-d5-b3': {
    before: `The leadership sign-off presentation is a thirty-minute briefing with Lisa Chen, the VP Engineering, and the Chief Product Officer, confirming that the feature is on track and getting formal approval to proceed to QA and launch. This is not a discovery meeting — it is a presentation of confirmed decisions seeking executive alignment. The presentation should be tight, confident, and focused on the decision the team needs: authorization to proceed.`,
    simulatedWork: `[Scene: Executive conference room. Lisa, Raj Kumar (VP Engineering), and Sandra Lim (CPO) are seated. The APM is presenting from a ten-slide deck projected on the wall.]

APM (Product Management): "We're seeking authorization to proceed to QA and launch for real-time payment notifications. Launch date: six weeks from today. Timeline confidence: high. Budget impact: $18K annually for managed infrastructure versus build cost."

Sandra (CPO): "What's the core user case for this feature in one sentence?"

APM (Product Management): "PayQuick users need certainty that a payment was received within seconds of sending it — today, that uncertainty window is five to fifteen minutes, and this feature closes it to under three seconds."

Raj (VP Engineering): "Engineering confidence on the three-second latency target?"

APM (Product Management): "P90 internal engineering target is two seconds. Ravi's Kinesis PoC confirmed the architecture meets this target. Latency monitoring is built into the launch to confirm performance at scale."

Lisa (VP of Product): "What's the feature flag plan if something goes wrong on launch day?"

APM (Product Management): "Instant rollback via feature flag — Ben or Ravi can disable real-time notifications within thirty seconds if there's an incident, reverting to the existing batch notification system. Zero user-visible impact from a rollback."

Sandra (CPO): "What's success at thirty days post-launch?"

APM (Product Management): "Payment confidence survey score up 15% minimum, 30% aspirational. Opt-out rate within two percentage points of baseline. Support ticket reduction for payment uncertainty of 25%. Revenue impact: $1.8M annual run-rate based on reduced failed transaction abandonment."

Sandra (CPO): "Authorization granted. This is well-prepared."`,
    commentary: `Notice the structure of that presentation: one sentence on the user case, concrete numbers on technical performance, a rollback plan for the risk question, and a specific success definition for the thirty-day horizon. Every question Sandra and Raj asked was answered without hedging or over-explanation.

The rollback answer — "thirty seconds, zero user-visible impact" — is the most important line in the presentation. Executives authorizing a feature launch are implicitly accepting the risk of that launch going wrong. Showing a clean rollback plan significantly reduces the perceived risk and makes authorization easier to give. The decision becomes: "if this works, great; if it doesn't, we can undo it in thirty seconds." That's a low-risk authorization.

Preparation for leadership sign-offs is often underestimated. The ten-slide deck isn't proof of thoroughness — it's proof of clarity. You have to know the feature deeply enough to reduce it to one sentence without losing the meaning. "PayQuick users need certainty that a payment was received within seconds of sending it." That sentence carries the user insight, the current failure state, and the proposed solution. Sandra's response — "authorization granted" — was not a surprise.`,
    after: `The authorization email goes to the full team immediately after the meeting: "Leadership authorization received to proceed to QA and launch. Raj Kumar's team is aligned on engineering. Sandra has confirmed the Q2 milestone. Six weeks." The cross-functional launch coordination meeting is next.`,
  },

  'product-manager-d5-b4': {
    before: `The cross-functional launch coordination session is the first meeting where every workstream is synchronized into a single shared launch plan. Until now, each function has been working from its own plan — engineering has the sprint schedule, marketing has the campaign calendar, operations has the support runbook. This session combines them into one integrated timeline and identifies any cross-function dependencies that could create bottlenecks.`,
    simulatedWork: `[Scene: Large conference room. The full launch team — ten people. A whiteboard displays a six-week timeline with horizontal lanes by function. The APM is standing at the board with a marker.]

APM (Product Management): "Six weeks. Each function has a lane on this board. The goal is to identify the dependencies — where does one function need another to complete something before they can proceed?"

Ben (Engineering Manager): "QA needs design approval on the final notification templates before running the full integration test. Tara — when's design sign-off?"

Tara (UX Designer): "End of week three. That gives QA week four and five."

Ben (Engineering Manager): "That works."

Devon (VP Customer Operations): "Support training needs the final user-facing copy and FAQs from product by end of week four. Can that happen?"

APM (Product Management): "Yes — support documentation package to Devon by end of week four. Adding that dependency now."

The APM draws a line between the product lane and the operations lane at week four.

Priya (Head of Marketing): "Marketing needs engineering to confirm launch date by end of week three to lock the press release timing with the comms team."

Ben (Engineering Manager): "I'll confirm launch date by end of week three, assuming QA goes cleanly."

APM (Product Management): "One critical dependency I want to name explicitly: the baseline survey needs 500 respondents before launch week. Marcus — where are we?"

Marcus (Data Lead): "We're at 440 as of yesterday. We'll hit 500 by end of next week. Easily in the window."

The APM draws a red line from the survey milestone to launch day and writes "LAUNCH BLOCKER" beside it.

APM (Product Management): "This line means: if we don't hit 500 survey respondents before launch, we cannot measure payment confidence improvement. That's a launch blocker from a metrics integrity standpoint. Marcus — flag me if you see any risk to hitting 500 before week five."`,
    commentary: `Calling the survey sample size a launch blocker is a deliberate signal about what "launch readiness" means. In most organizations, feature launches happen on schedule and success metrics get figured out afterward — which produces launches that can't be evaluated. By treating the baseline survey as a launch dependency, I'm establishing that measurement readiness is as important as technical readiness.

That's a product culture choice. Teams that launch with rigorous measurement baselines get better at improving features after launch because they can actually see what's happening. Teams that launch without baselines spend the first thirty days arguing about whether the feature worked because they have no before number to compare to.

The red marker and the "LAUNCH BLOCKER" label aren't drama — they're communication. Everyone in that room now knows the survey sample size matters in a way that a note in a Notion doc doesn't convey. When you're coordinating ten functions toward a single date, visual clarity in the room matters as much as accuracy in the document.`,
    after: `The coordination session ends with a shared timeline document, nine identified cross-function dependencies, and four explicit action deadlines. The completed launch plan is sent to the full team and to Lisa. She replies: "This is the most organized launch plan I've seen from this team. Good work." Five weeks to launch.`,
  },

  'product-manager-d5-b5': {
    before: `The post-launch monitoring plan governs how the team will evaluate the launch in real time and in the weeks following. It defines what signals are being watched, who is watching them, what escalation thresholds trigger action, and what the review cadence is. A feature without a monitoring plan is a feature the team can't learn from — and a launch without a plan for the first 48 hours is a launch that can spiral before anyone has enough context to act.`,
    simulatedWork: `[Scene: The APM's desk, 5:10 PM. A Notion document is open to a new monitoring plan template. The launch runbook is visible in a side tab.]

The APM builds the immediate post-launch protocol section first, working through each metric and its owner.

APM (Product Management): "T-plus-0 to T-plus-2 hours, immediate window: Marcus monitors opt-out rate every 15 minutes. Ravi monitors P90 latency in real time. Devon monitors support ticket volume. If any metric crosses the alert threshold, page PM immediately."

The APM moves to the 24-hour protocol section.

APM (Product Management): "T-plus-2 to T-plus-24 hours: hourly sampling of the three real-time metrics. Full team sync at T-plus-6 hours, scheduled. If no alerts, team transitions to normal on-call schedule at T-plus-24 hours."

The APM drafts the 30-day review structure.

APM (Product Management): "Day 7 review: check survey response volume, latency P90 versus target, opt-out versus baseline. Go/no-go on Phase 1b features — double-send prevention and quiet hours customization. Day 30 review: full metrics readout against all success criteria — payment confidence score, support ticket reduction, revenue impact model versus actuals. Decision on Phase 2 features."

A Slack message appears. The APM reads it and types back immediately.

Marcus (Data Lead, via Slack): "Good structure. One addition — we should have a 'feature working as intended' confirmation protocol at T-plus-1 hour. Specifically: confirm that at least 1,000 real notification events have been processed through the new system and delivered successfully. That's our technical green light signal."

APM (Product Management): "Perfect addition. Adding: T-plus-1 hour technical green light — confirmed when 1,000 notification events have been processed with P90 latency under 2 seconds and zero critical errors in the pipeline logs. If not confirmed by T-plus-1.5 hours, initiate rollback assessment call."`,
    commentary: `The "1,000 events processed" confirmation protocol Marcus proposed is an elegant operational checkpoint. It moves the "launch successful" assessment from abstract monitoring dashboards to a concrete empirical signal: the feature has actually worked at meaningful scale. One thousand events in sixty minutes is not an ambitious number at PayQuick's transaction volume — it should happen easily. But confirming it happened is the difference between assuming the feature works and knowing it works.

The rollback assessment trigger at T-plus-1.5 hours — if 1,000 events haven't been confirmed — gives the team a clear decision point rather than a vague "something feels off" conversation. Decision points under pressure require pre-committed thresholds. Without the threshold, the launch day conversation at T-plus-90-minutes is: "Should we be worried?" With the threshold, it's: "We haven't hit the green light — initiating the rollback assessment call." Those are very different conversations.

This also illustrates how good data leadership contributes to product management. Marcus isn't just the metrics person — he's thinking about operational protocols that make the launch controllable. That's the kind of cross-functional PM relationship that makes launches feel controlled rather than chaotic.`,
    after: `The post-launch monitoring plan is sent to the full team at 7:45 PM. Lisa reviews it and adds one note: "Add a recovery plan for the first 48-hour critical window — if we rollback, what's the user communication?" A two-sentence user communication template for rollback scenarios is added. The launch plan, PRD, monitoring plan, and runbook are all complete. The next five weeks are execution. Launch day is on the calendar.`,
  },
}
