import type { TimeBlockContent } from '../simulation'

// Management Consulting — Project Meridian (Meridian Park investor-portal
// assessment, week 3 of a six-week engagement). Per-project content.
//
// SLICE 2: the complete week. Four-reading per-project Orientation; the full
// Monday-to-Friday simulation (19 blocks); and the curated six-block
// Day-in-the-Life. Excluded by instruction: the Week Change Log and the Week Map
// (audit / layout artifacts, not block content).
//
// Sources (transcribed verbatim; prose not paraphrased or trimmed):
//   orientation/Meridian_Park_Orientation_V3.md
//   full-simulation/Meridian_Park_Monday_Blocks_1-5_Final_V1.md          (blocks 1–5)
//   scenario/Meridian_Park_Interview_GoldStandard_V4_Complete.md          (block 6, Ellen)
//   full-simulation/Meridian_Park_Blocks_7-8_Final_V1.md                  (blocks 7–8)
//   full-simulation/Meridian_Park_Wednesday_Blocks_9-10_Final_V1.md       (blocks 9–10)
//   full-simulation/Meridian_Park_Thursday_Blocks_11-15_Final_V1.md       (blocks 11–15)
//   full-simulation/Meridian_Park_Friday_Blocks_16-19_Final_V1.md         (blocks 16–19)
//   day-in-the-life/Meridian_Park_Day_in_the_Life_V1.md                   (DITL framing)
//
// Mapping per block:
//   before        ← "### Setting the Scene"  (neutral 3rd person, kept as written)
//   simulatedWork ← dialogue/screenplay (speaker labels; *italic* directions → [bracketed]);
//                   "" for work blocks with no dialogue; briefing prose for the dinner / learning cards
//   commentary    ← "### Over-the-shoulder, Carly"  ("" where absent)
//   artifact      ← "### Artifact: …"  (markdown: tables / code fences / bullets / blockquotes)
//   after         ← intentionally LEFT BLANK for every block (no fabricated transitions)
//
// Block 6 (Ellen) is one continuous interview: the source "#### 1. …" beat headings
// are a drafting convention and are NOT reproduced here.
// Block 15 (dinner) and Block 18 (learning) have no dialogue — they are info cards
// rendered as briefing prose (see the `briefing` flag set in lib/simulation.ts).

// ── Shared Ellen interview artifacts (reused by full block 7 and DITL block 3) ──

const ELLEN_RAW_NOTES = `ELLEN - CIO public pension - MP private credit
Marcus leading / me on notes

intro + scope done. she's GLAD MP looking at portal - "there's room for improvement"
  (candid, good sign)
conf reminder given. ok w/ it

ROLE: CIO ~9 yrs at fund, last 4 in seat. runs whole inv program, all asset classes.
public pension, retirement assets for state employees. ~$12B total
w/ MP ~6 yrs. they run a slice of our PC alloc. grown since start BUT "won't get into
  specifics" - bigger part of book than it was
USAGE: varies. month-end + qtr-end = HEAVY. pulls statements, perf, cap activity for
  period -> board reporting. between = ad hoc, team needs a doc / IR q comes in.
  few x / wk normally, lots around rptg cycle
  *** "that's when I feel the gaps the most"

GAP 1 - cap activity reporting ***
nothing comes out in 1 step. qtr cap activity = calls + distribs across period.
CANT pull a single clean rpt. opens statements 1 by 1, stitches in own spreadsheet
  -> number she needs for board
who rebuilds? -> TEAM. "unnecessary amount of time", "incredibly manual"
data IS all there. getting it OUT in board shape = the painful part.
  "for what we pay in fees, that's a little hard to swallow"
*** QUOTE "I'm paying for a finished product and getting raw ingredients"
$ FOLLOW UP (Marcus asked to quantify) -> analyst time? "better part of a couple of
  days" just on the assembly, per qtr, before anyone looks at the numbers
  *** "the thinking is the job. the assembly shouldn't be"

GAP 2 - doc search / retrieval
auditors ask for a specific qtrly stmt from 2 yrs ago, or a particular notice ->
  can rarely just find it. "search doesn't work the way you'd expect"
ends up EMAILING RM at MP to send it over
RM responsive, ~within a day. BUT "a day, for something I should get in 30 sec myself"
  -> "makes the whole platform feel a step behind"

GAP 3 - onboarding / subscription paperwork (front end)
sore spot - more her OPS team than her directly, but she hears about it
every new fund = start paperwork FROM SCRATCH. same entity info, same signatories,
  same supporting docs. none of it carries across funds
in 4 MP funds now. "by the fourth one... sending the same formation docs + signatory
  list again is a little absurd. they have all of it"
other mgrs? better ones come back mostly pre-filled, only ask what's CHANGED (new
  signatory, updated address). "treating us as an existing relationship, not a brand
  new one every time"

GAP 4 - notifications / how she finds out
portal doesn't tell her anything. RM emails when a call is coming - she appreciates it
  BUT means leaning on an email, not the system
if email late / she's travelling -> first time seeing call notice can be late in the
  funding window
ever cost? nothing she'd "put in front of my board" but a couple times had to move
  faster than she'd like. "shouldn't come down to whether I caught an email"
what would help? -> alert tied to the ACTUAL EVENT, not someone remembering. moment a
  call is issued -> notif w/ amount + due date, sits top of dashboard til acted on.
  good platforms do exactly this

SCORE *** MP = 6 / 10. best other mgr = 8 (maybe a touch higher)
why 6: data accurate + all there (doesn't take that for granted) but stops there
best mgr does: at qtr-end the reporting is basically ALREADY BUILT - consolidated stmt,
  full cap activity in 1 place, ~hand straight to board. reviewing not assembling.
  + search "just works"
  *** "the bar has moved, they're sitting where some others were ~2 yrs ago"
=> LAST MILE theme: accurate data -> board-ready, without her doing the work

MY Q (Carly): raised it w/ MP directly? -> yes, more than once, to RM. always gracious,
  take the point, then nothing changes. NOT unwillingness -> "bigger than the person
  I'm talking to. it's the platform itself." RM can't just go fix it

WRAP: none of it a dealbreaker, investment relationship is good (what matters most).
  but on the platform: same set of frustrations for a while. glad they're looking at it`

const ELLEN_CLEANED_NOTES = `### Artifact 2: Cleaned, structured notes

**Interview write-up: Ellen**

| Field | Detail |
|---|---|
| Interviewee | Ellen, Chief Investment Officer |
| Organization | Public pension system (~$12B total assets; retirement assets for state employees) |
| Meridian product | Private credit allocation (Meridian runs a slice; ~6-year relationship; investor in 4 Meridian funds) |
| Date | Tuesday, week 3 of 6 |
| Interviewers | Marcus (Manager, lead), Carly (Analyst, notes) |
| Format | 30-minute video call |

**Headline.** The investment relationship is good and the portal data is accurate; the pain is the last mile. The Meridian Investor Portal stops at accurate data and leaves the assembly to the investor. Ellen scores Meridian a 6 out of 10 against a best-other-manager 8, and the gap is consistently about getting from accurate data to a finished, board-ready output without her team doing that step by hand.

**Context.** Ellen is CIO of about nine years at the fund (four in the seat), responsible for the whole investment program. The fund has invested with Meridian about six years across a slice of its private credit allocation. She declined to detail how the allocation has grown. Portal use is heaviest at month-end and quarter-end (statements, performance, capital activity for board reporting) and ad hoc in between.

**Findings by theme.**

- **No consolidated capital-activity report.** Ellen cannot pull a single clean view of a quarter's calls and distributions. She opens statements one at a time and her team stitches them together in a spreadsheet to reach the board-ready number. The data is all present; the assembly is the burden. Her words: "I'm paying for a finished product and getting raw ingredients," and "the thinking is the job. The assembly shouldn't be."
  - Quantification (for tracker/deck): the better part of a couple of analyst-days per quarter spent on assembly alone, before anyone analyzes the numbers (Ellen's own rough estimate when asked).
- **Poor document search and retrieval.** Search does not reliably surface a specific past statement or notice (e.g., an auditor request for a quarterly statement from two years ago). Ellen routinely emails her relationship manager to retrieve documents instead. The relationship manager is responsive (usually within a day), but her point stands: "a day, for something I should be able to get in thirty seconds myself." It "makes the whole platform feel a step behind."
- **Onboarding / subscription re-papering each new fund.** Each new Meridian fund starts the paperwork from scratch: the same entity information, authorized signatories, and supporting documentation, none of it carrying across. Ellen is in four Meridian funds and still re-submits the same materials. Felt mostly by her operations team. Better managers return mostly pre-filled paperwork and only ask her to confirm what has changed (a new signatory, an updated address), which she reads as being treated as an existing relationship rather than a new one each time.
- **Passive portal, no event notifications.** The portal does not alert her when a capital call or document posts. She leans on her relationship manager's emails, so a late email or travel can mean seeing a call notice late in the funding window. Nothing she would escalate to her board, but a couple of times she has had to move faster than she would like. She wants notifications tied to the actual event (the moment a call is issued), with amount and due date, surfaced on the dashboard until acted on.

**Score and benchmark.** Meridian 6/10; best other manager 8/10 (possibly a touch higher). The 6 credits accurate, complete data; the gap to the 8 is the finished output. The best manager delivers a consolidated statement at quarter-end that is close to board-ready (reviewing, not assembling) and search that simply works. Ellen: "the bar has moved, and they're sitting where some of the others were maybe two years ago."

**Cross-cutting theme (candidate).** The "last mile": the portal delivers accurate data but leaves the investor to turn it into the finished thing they actually need. Strong candidate to anchor a deck section; watch for the same pattern in other interviews (shape of the last mile likely differs by investor type).

**Did she raise it with Meridian?** Yes, more than once, to her relationship manager. Always received graciously, but nothing changes. Her read: it is bigger than any one contact, it is the platform itself, which a relationship manager cannot fix.

**Follow-ups / actions.**
- Add write-up to the running interview log and code into the theme tracker.
- Log score (6) and best-other (8) in the score column.
- Carry the ~2 analyst-days/quarter assembly figure as a quantified data point for the consolidated-reporting theme.
- Open question for the team session: does onboarding/re-papering stand as its own theme, or fold under "platform feels a step behind"?
- Confirm the "last mile" framing holds across investor types before building the storyline around it.`

// Note-cleanup artifact: raw notes (code fence) + the cleaned write-up. The code
// fence markers are kept out of the template literals (which would terminate on
// a backtick) and concatenated here.
const NOTE_CLEANUP_ARTIFACT =
  '### Artifact 1: Raw live notes (as typed during the call)\n\n```\n' +
  ELLEN_RAW_NOTES +
  '\n```\n\n' +
  ELLEN_CLEANED_NOTES

// ── Base content: Orientation + the full Monday–Friday week (19 blocks) ─────────

const meridianBase: Record<string, TimeBlockContent> = {

  // ── Orientation (4 readings, briefing prose) ──────────────────────────────────

  'management-consultant-meridian-orientation-b1': {
    before: '',
    simulatedWork: `Meridian Park is an alternatives manager. It invests money on behalf of large institutions and runs that money in private markets, meaning investments that are not bought and sold on public stock exchanges. Its two main products are private credit, privately negotiated loans to companies, and infrastructure, the long-lived physical assets like utilities and transport that generate steady cash flows over decades.

The money Meridian manages comes from large institutional investors with long time horizons: public and corporate pension funds, life and property insurers, university endowments, foundations, family offices, and sovereign wealth funds. They commit it for years at a time, and they largely trust Meridian with it. Meridian is good at the investing itself. It has the track record and the relationships that earn that trust.

The way those investors stay connected to what they own is the Meridian Investor Portal, the secure online platform each one uses to pull the financial statements, performance, and documents tied to their investment. For an institution managing billions, the portal is the day-to-day face of its relationship with Meridian, the place its team goes at the end of every quarter to get the numbers it needs.`,
    commentary: '',
    after: '',
  },

  'management-consultant-meridian-orientation-b2': {
    before: '',
    simulatedWork: `Meridian's leadership suspects the portal is falling behind. They hear scattered complaints, they sense their investors are frustrated, and they know competitors are setting a higher standard. What they cannot see clearly is their own platform: which gaps actually matter to investors, how serious each one is, and which to fix first. Leadership cannot see its own platform gaps clearly, and needs an outside, market-benchmarked read to know what to fix and in what order.

That is why Meridian brought in an outside consulting team. Meridian has capable people who could, in theory, study this themselves. But a firm is rarely the best judge of its own product. Different groups inside Meridian hold different views about what matters most and what should be fixed first, the technology budget is limited, and choosing what to build first means telling some of those groups that their priority comes second. An outside team is objective, removed from the internal politics, and an unbiased way to force the hard prioritization the firm cannot cleanly reach on its own.

The engagement is defined by a Statement of Work, or SOW, the contract that sets out exactly what the team is responsible for delivering. Here, that is a prioritized, fundable recommendation: a clear view of the gaps and a phased plan to close them, tied to what Meridian can realistically afford. It is explicitly not a wish list, and not a wholesale rebuild of the platform. The whole value is in the prioritization.

What is at stake is real. Some of Meridian's investors are among its largest relationships, and they are the ones asking the hardest questions about whether the firm is keeping up. The portal is not going to lose Meridian its investors tomorrow, but in a market where the bar keeps rising, standing still is its own kind of risk.`,
    commentary: '',
    after: '',
  },

  'management-consultant-meridian-orientation-b3': {
    before: '',
    simulatedWork: `The team's method is straightforward: talk to the people who actually use the portal. Over the six-week engagement, the team interviews thirty of Meridian's investors, almost always the chief investment officer, or CIO, the senior person responsible for an institution's entire investment program, about how they use the portal, where it works, and where it falls short. The team then synthesizes those conversations into a small number of themes, and turns the themes into a prioritized recommendation deck for Meridian's leadership. It is currently week three of the six, the middle of the engagement, when the interviews are still underway and the recommendation is beginning to take shape.

The people involved:

**On the consulting team.** David is the Senior Manager. He leads the engagement and is its senior face with Meridian, and he pressure-tests the work at the altitude the client's leadership will see it. Marcus is the Manager. He runs the day-to-day work, leads the interviews, and shapes the analysis. Carly is the first-year analyst, the most junior person on the team.

**On the client side, inside Meridian.** Diane is the Global Head of Client Solutions and the project sponsor: she hired the team, she owns the portal's strategy and its budget, and she is the one who will have to carry the recommendation to her own leadership and fund it. She is the most important relationship on the engagement. Gregory is the Head of Investor Relations, whose team runs the portal day to day and absorbs the investor requests the gaps create. Laura is the Head of Technology, who owns what can actually be built, and whose read on feasibility decides whether any recommendation is real.

**The investors.** Two of the thirty interviews are with Ellen, the chief investment officer of a public pension fund, and Raymond, the chief investment officer of a life insurer.`,
    commentary: '',
    after: '',
  },

  'management-consultant-meridian-orientation-b4': {
    before: '',
    simulatedWork: `You are shadowing Carly, the first-year analyst, watching the engagement over her shoulder and seeing it through her lens. Her work this week is the everyday work of a junior on an engagement like this: she sits in on the investor interviews and takes the notes, keeps the running tracker of what each investor says, and builds the first real section of the recommendation deck. Everything she produces goes to Marcus, who reviews and shapes it before it goes any further.

A few terms will come up often. They are worth knowing now so the conversations land without stopping to explain them.

- **Alternatives manager** (or alts manager): a firm, like Meridian, that invests in private markets, investments not traded on public stock exchanges, on behalf of large institutions.
- **Private markets:** investments bought privately rather than on a public exchange. Meridian's two products here are private credit (privately negotiated loans to companies) and infrastructure (long-lived assets like utilities and transport).
- **The investor portal:** the Meridian Investor Portal, the secure online platform investors use to pull financial statements, performance, and documents. The subject of the entire engagement.
- **LP and GP:** the investors are the limited partners, or LPs; the manager, Meridian, is the general partner, or GP. The LPs commit money, and the GP invests it.
- **Capital call and distribution:** a capital call is when the manager asks investors for some of the money they have committed; a distribution is when the manager returns money as the investments pay off. Both arrive as time-sensitive notices on the portal.
- **CIO:** chief investment officer, the senior executive who runs an institution's whole investment program. The person the team interviews at each investor.
- **KYC:** know your customer, the identity and compliance paperwork an investor has to submit to invest in a fund. Having to redo it for every new fund is one of the gaps the interviews surface.
- **SOW:** the Statement of Work, the contract that sets out what the team is responsible for delivering.`,
    commentary: '',
    after: '',
  },

  // ── Monday (day 1) — blocks 1–5 ───────────────────────────────────────────────

  'management-consultant-meridian-full-d1-b1': {
    before: `Monday morning, the start of week 3 of the six-week Meridian engagement. The team gathers for its weekly kickoff. David, the Senior Manager who sits above Marcus, joins to take stock at the halfway mark: what the interviews so far are surfacing, which working hypotheses the team is now testing, and what has to get done this week. Marcus runs the day to day. Carly has sat in on a string of the investor interviews and owns the synthesis and the first deck pages.`,
    simulatedWork: `David: Morning, both. We're at the halfway mark, so before we get to this week I want to take stock. Marcus, the state of play. Where are we on interviews, and what are they telling us?

Marcus: Fourteen of the thirty done. Tuesday and Wednesday get us another six or seven, which puts us where we need to be to start locking themes. The headline is more consistent than I expected at this stage. People like Meridian. The investment relationship is good, and they trust the data on the portal. The frustration is almost entirely about what the portal does not do once that data is in front of them.

David: Define what it does not do.

Marcus: It stops at accurate data and leaves the last step to the investor. The pension CIOs we have already been through describe it the same way. They can pull a quarter's capital activity, but not in one consolidated report, so their teams rebuild it by hand to get a number they can put in front of a board. They are paying for a finished product and assembling it themselves.

David: And that is not a one-off.

Marcus: It is the pattern. Carly has been coding it across the whole set. She can speak to how widely it shows up.

Carly: It is the most common thread by a distance. The specific complaint changes, no consolidated capital-activity report, document search that does not really work, re-doing the same subscription paperwork for every new fund, no notification when something posts. But underneath it is the same shape every time. The portal gets them to accurate data and then leaves the assembly to them.

David: Good. That is a clean spine for the story, if it holds. What is the thing that could break it?

Carly: That the shape of the last step is not the same for everyone. The pensions and endowments we have spoken to want a board-ready document at the end. The insurers may want something different, the data as a feed into their own systems rather than a document, because everything they do runs through statutory and regulatory reporting on their side. We have both types on the slate this week, a pension CIO and a life insurer back to back tomorrow, so we will know quickly whether that split holds. Same gap, different finish line.

Marcus: Which is a strength if it holds and we frame it right. One theme, the last mile, that shows up differently by investor type. It tells us the problem is structural, not a feature request from one annoyed client.

David: Agreed, as long as we do not let it sprawl into the portal should do everything. Remember what we are actually on the hook for. The SOW is a prioritized target-state recommendation tied to what Meridian can realistically fund, not a wish list. Diane brought us in precisely because she cannot force that prioritization cleanly from inside the firm. So every theme we carry has to survive the question of whether it is worth funding ahead of the next one. A wholesale rebuild of the platform is not on the table this year.

Marcus: Understood. We are building the roadmap phased from the start. Quick wins that do not need a rebuild, then the heavier lifts sequenced behind them.

David: Right. And Laura owns the build and the roadmap on their side. If our phase one is not realistically buildable, she will know in about ten seconds, and we will lose her. So the prioritization has to be honest, not just tidy.

David: Here is what I want out of the week. By Friday I want to read a storyline top to bottom, titles only, and have it hold together. Situation, the relationship is good and the data is accurate. Complication, the portal stops short, and the bar has moved. Resolution, a prioritized, fundable set of improvements. I do not need finished slides. I need the argument to survive me reading only the headlines.

Marcus: That is the plan. Carly takes the lead on turning the last-mile theme into the first real section, and she is sharpening this week's interview guide so the probes actually test it. I will review her pages midweek before they come anywhere near you.

David: Good. One more thing. The client checkpoint is Thursday. Nothing in that room should be a surprise to Diane. We share where the themes are landing, we get her reaction, we adjust. The final readout in week six should feel inevitable to her, not new. Let us not save anything clever for the end.

Marcus: Agreed. I will pre-wire the big pieces with Gregory before Thursday so nothing lands cold.

David: Then we are set. Good week, everyone.`,
    commentary: '',
    after: '',
  },

  'management-consultant-meridian-full-d1-b2': {
    before: `After David drops off, Marcus and Carly stay back for a few minutes to turn the kickoff into Carly's actual to-do list for the week.`,
    simulatedWork: `Marcus: You caught the shape of what David wants. Let me make it concrete for you. Three things are yours this week.

Marcus: First, the interview guide. We have seven, eight investors across tomorrow and Wednesday. I do not want a generic guide. I want it sharpened to test the last-mile hypothesis specifically, with the probes that pull apart the document people and the data people. If a question is not testing something we are trying to prove, cut it.

Carly: So tailor it to the hypotheses, not just rerun the base guide.

Marcus: Exactly. Second, keep the theme tracker current as the interviews come in, and start putting numbers on it. David is going to want to know how many of the thirty raised each gap, not that it comes up a lot. Light quantification. Counts, the score spread, the time estimates people give us.

Carly: I have a couple-of-analyst-days-a-quarter figure in there already from one of the pension calls. I will make sure every interview leaves a number behind where we can get one.

Marcus: Good. Third, and this is the big one, start the deck. Not finished slides. The ghost deck for the last-mile section. Storyline first, action titles, then we build the evidence under them. Get me a skeleton I can react to before Wednesday's problem-solving session.

Carly: Understood. Guide today, tracker rolling through the interviews, ghost deck by Wednesday.

Marcus: That is it. And do not polish anything yet. I would rather see a rough skeleton early than a pretty slide late. Show me the thinking and we will shape it together.`,
    commentary: `Three things, and the order matters. The guide has to be ready before tomorrow or the interviews are half wasted, so that is this morning. The tracker I keep alive as I go. The ghost deck is the one I actually have to think hardest about, because if the storyline does not hold, nothing I build on top of it will either. Marcus saying show me the thinking is the part I have learned to take literally here. He genuinely wants the rough version, not me disappearing for two days and reappearing with something shiny that is built on the wrong spine.`,
    after: '',
  },

  'management-consultant-meridian-full-d1-b3': {
    before: `Carly settles in to sharpen this week's interview guide before tomorrow's calls. The team interviews seven or eight more investors across Tuesday and Wednesday, and the guide is the tool that keeps each conversation tethered to what the team is trying to prove. The artifact is the guide itself, tailored from the base version to test this week's hypotheses.`,
    simulatedWork: '',
    commentary: `We have a hypothesis now, the last mile, so the guide I am sharpening this morning has one job: test it, not fish. Most of the base questions stay. What I am adding are the sharper probes that force the difference between an investor who wants a finished document and one who wants raw data, because that distinction is the spine of the whole story. The pull is always to ask everything while I have them on the call, so I am cutting about as many questions as I am adding, keeping only the ones that earn their place against the hypothesis.`,
    after: '',
    artifact: `### Interview guide (week 3 fieldwork)

**Meridian Park Investor Platform Assessment, investor discussion guide**
Semi-structured. Roughly 30 to 45 minutes per call. A guide, not a script: Marcus leads, follows the thread where useful, confirms rather than fishes, and converts every felt complaint into a rough number before moving on.

**Working hypothesis this guide tests:** the portal delivers accurate data but leaves the last mile, the finished output the investor actually needs, to the investor, and the shape of that last mile differs by investor type (document-led versus data-led).

**1. Framing and permission (about 3 minutes)**
- Thank them. Reference the season (quarter-end, statutory filing) only, never an assumption about how their week has gone.
- Scope: an outside read on how the portal works for the investors who use it.
- Confidentiality: nothing attributed individually; everything synthesized into themes and recommendations for Meridian.
- Format: a handful of prepared questions plus follow-ups, staying flexible.
- Time check and hard stop.
- Hand the floor back: does that all sound good?

**2. Warm-up, the person then the institution (about 5 minutes)**
- Their role, tenure, and what they oversee. Confirm the title even if known.
- The institution and what they are investing toward.
- How long with Meridian, and in what product or allocation.
- Register note: this is the client's client, doing us a favor. Please and thank you throughout.

**3. Core, portal usage and where it falls short (about 20 minutes)**
- How and how often do they use the portal? When is it tested hardest (the reporting cycle)?
- Where does it work well? (Credit the accurate data; it earns trust for the rest.)
- Where does it create work? Open broad, then narrow to specifics.
- Probe each gap, and pair each with the quantification follow-up:
  - Consolidated capital activity: can they pull a period's calls and distributions in one clean view, or do they assemble it? Who does the assembly? (Quantify: how much analyst time per quarter?)
  - Document search and retrieval: can they self-serve a specific past statement or notice, or go back to a person? (Quantify: how often, and how long to get it?)
  - Onboarding and subscription: how does the paperwork go on a new fund? Does anything carry across? (Quantify: how many funds, how many times re-submitted?)
  - Notifications: how do they find out a call or document has posted? Has a late notice ever cost them? What would actually help?
- Hypothesis-split probe (the sharpened add for this week): when the portal falls short, what is the finished thing they actually needed?
  - If document-led (pension, endowment, foundation): is the missing piece a board-ready or committee-ready report?
  - If data-led (insurer): is the missing piece structured data or a feed into their own systems for statutory, regulatory-capital, or asset-liability work? Probe look-through detail on holdings for capital charges.

**4. Benchmark (about 5 minutes)**
- One to ten, where does Meridian land? Where do their other managers sit? (Neutral. Never stronger managers.)
- What is the better manager doing that Meridian is not?

**5. Wrap (about 3 minutes)**
- Anything we should have asked? Anything on their mind?
- Have they raised it with Meridian, and what came back?
- Thanks.

**Tailoring notes for this week's slate:**
- Two corporate pensions and one endowment: lean on the board-ready and committee-ready probes.
- Two insurers (one life, one P and C): lean on the data-feed and look-through probes; expect a wider score spread, since the downstream work is regulatory.
- One sovereign wealth allocator and one large family office: open on usage and let them set the frame before narrowing.`,
  },

  'management-consultant-meridian-full-d1-b4': {
    before: `With the guide done, Carly turns to the running theme tracker: the master sheet where every completed interview gets coded into themes and the soft, felt complaints start becoming numbers the team can defend. This is where qualitative material becomes a finding. The artifact is the tracker as it stands at the week-3 midpoint, with fourteen of the thirty interviews completed and coded.`,
    simulatedWork: '',
    commentary: `So this hour is mostly me reading down the completed interviews, tagging each one against the themes, and pulling out every number we managed to get. The reason I work it this way: a single quote is just an anecdote, and one CIO finding the reporting clunky does not survive a room with the client's leadership in it. Ten of the fourteen investors we have spoken to so far raise the consolidated-reporting gap, and the ones who put a number on it lose one to two analyst-days a quarter to manual assembly. Same complaint, but now it is a finding. Where someone gave us a time estimate or a score, it goes in a cell. Where they only gave us a feeling, I flag it so Marcus knows to push for the number next time.`,
    after: '',
    artifact: `### Artifact 1: Theme tracker, interview coding matrix

Master synthesis sheet. Rows are completed interviews; columns are the recurring gaps. Y marks the gap was raised. Scores are the investor's own one-to-ten rating of Meridian and of their best other manager. (CR = no consolidated capital-activity report; DS = poor document search/retrieval; OB = onboarding/subscription re-papering; NT = no event notifications; DF = data feed/export and look-through detail.)

This is the engagement's running master sheet: it carries every interview forward in one place, including the few already lined up for later in the week, so a row can appear here before its call has happened and been fully coded.

| Interviewee | Investor type | MP score | Best other | CR | DS | OB | NT | DF | Last-mile shape |
|---|---|---|---|---|---|---|---|---|---|
| Ellen | Public pension | 6 | 8 | Y | Y | Y | Y | | Board-ready document |
| Raymond | Life insurer | 5 | 9 | Y | | | | Y | System-ready data |
| Margaret | Corporate pension | 6 | 8 | Y | Y | Y | | | Board-ready document |
| Theo | University endowment | 7 | 8 | | | | Y | | Committee-ready document |
| Priya | P and C insurer | 5 | 9 | Y | | | Y | Y | System-ready data |
| Walter | Sovereign wealth fund | 6 | 8 | Y | Y | Y | Y | | IC-ready document |
| Nadia | Family office | 8 | 8 | | | | | | Few complaints; wants on-demand access |
| Hugh | Public pension | 5 | 8 | Y | Y | Y | Y | | Board-ready document |
| Coleen | Foundation | 6 | 7 | Y | Y | Y | | | Committee-ready document |
| Gordon | Corporate pension | 6 | 8 | Y | | Y | Y | | Board-ready document |
| Imani | Life insurer | 5 | 9 | Y | | | | Y | System-ready data |
| Sayid | Health insurer | 6 | 8 | | Y | | Y | Y | System-ready data |
| Beatrice | Public pension | 7 | 8 | Y | Y | Y | Y | | Board-ready document |
| Frank | University endowment | 6 | 8 | | Y | | | | Committee-ready document |

### Artifact 2: Theme summary and light quantification

Read across the matrix. Of fourteen interviews completed to date (of thirty planned):

| Theme / gap | Raised by | Quantified pain (where harvested) | Impact band |
|---|---|---|---|
| Last mile (umbrella) | 13 of 14 | Dominant pattern: accurate data, finished output left to the investor | High |
| No consolidated capital-activity report | 10 of 14 | 1 to 2 analyst-days per quarter on manual assembly (harvested from those who quantified) | High |
| Poor document search / retrieval | 8 of 14 | Hours to about a day per retrieval, routed through the relationship manager | Medium-high |
| No event notifications | 8 of 14 | Compressed funding windows; a few near-misses, nothing escalated to a board | Medium |
| Onboarding / subscription re-papering | 7 of 14 | Same materials re-submitted up to 4 times for multi-fund investors | Medium |
| Data feed / export and look-through (data-led only) | 4 of 14 | About 2 staff for the better part of a week per quarterly filing; thin look-through for capital charges | High for insurers |

**Score spread:** average Meridian score 6.0; average best other manager 8.1. The gap is concentrated in the last mile, not in data accuracy.

**Open question for Wednesday's problem-solving session:** onboarding re-papering is real (7 of 14) but felt by a different team (operations, not the CIO) and at a different moment (the front end, not the reporting cycle). Does it sit under the last-mile umbrella, or does it stand as its own theme? Flag for the team to resolve before the storyline locks.

**Tracker note:** the wider interview set is coded in lighter detail than the two write-ups already done. The column taxonomy is a working layout for this engagement, not a single industry standard.`,
  },

  'management-consultant-meridian-full-d1-b5': {
    before: `After lunch, Carly builds the skeleton of the recommendation deck before touching a single finished slide. The work is the storyline: the order of the argument and the action-title lead-ins, with placeholders where the evidence will go. The artifact is the ghost deck.`,
    simulatedWork: '',
    commentary: `There is a discipline here that took me a while to trust: you build the argument before you build anything that looks like a slide. If I open PowerPoint and start making a pretty chart now, I will fall in love with it and bend the story to fit it. So instead I write the titles first, as full sentences, in order, and then I read just the titles top to bottom. If they hold together as a paragraph, the deck has a spine. If they do not, no amount of formatting later will save it. This is also the version Marcus actually wants to react to on Wednesday, because the logic is cheapest to change while it is still just titles on a page.`,
    after: '',
    artifact: `### Ghost deck, recommendation storyline (working, week 3)

Storyline frame: Situation, Complication, Resolution. The test: read the action titles alone, in order, and they should form a coherent argument. No charts yet; titles plus evidence placeholders.

**Section 0, Executive summary (one SCR page, written last)**
- Title placeholder: [single page that lands the whole arc: the relationship and the data are strong; the portal stops at accurate data and leaves the last mile to the investor; a prioritized, fundable set of improvements closes the gap without a rebuild]

**Section 1, Situation (the shared, uncontroversial starting point)**
- 1.1 Title: "Meridian's investors value the relationship, and the portal's data is accurate and complete" [evidence: accuracy credited even by the lower scorers; representative anonymized quotes]
- 1.2 Title: "Investors lean on the portal most heavily at the reporting cycle, exactly when the stakes are highest" [evidence: usage pattern across interviews]

**Section 2, Complication (what is wrong, the burning platform)**
- 2.1 Title: "The portal delivers accurate data but stops short of the finished output investors need, leaving them to build the last mile by hand" [evidence: the umbrella finding and the two anchor quotes]
- 2.2 Title: "The last mile takes a different shape by investor type: pensions need board-ready documents, insurers need system-ready data" [evidence: the document-led versus data-led split]
- 2.3 Title: "A small number of recurring gaps drive most of the manual work: consolidated reporting, document retrieval, notifications, and onboarding re-papering" [evidence: theme counts and quantification from the tracker]
- 2.4 Title: "For data-led investors the gap is more costly, because the downstream work is a regulatory filing, not a board slide" [evidence: insurer look-through and data-feed pain; the wider score spread]
- 2.5 Title: "The bar has moved: investors increasingly get consolidated, exportable, notified data elsewhere, and Meridian sits behind it" [evidence: best-other benchmark; the market shift]

**Section 3, Resolution (the prioritized, fundable answer)**
- 3.1 Title: "Closing the last mile does not require rebuilding the platform; it requires sequencing a few high-leverage improvements" [evidence: frame the funding posture]
- 3.2 Title placeholder: [Phase 1, quick wins, candidates: consolidated capital-activity report, real document search, event notifications. Sequence pending Laura's feasibility read]
- 3.3 Title placeholder: [Phase 2, candidates: reusable onboarding profile, data export and feed for data-led investors. Sequence pending feasibility read]
- 3.4 Title placeholder: [Phase 3, heavier lifts, candidates: look-through holdings data, deeper system integrations. Fund-dependent]
- 3.5 Title placeholder: [the recommended sequence, each improvement tied to the investor pain it closes and the effort it takes. This is the page Diane funds from. Build with feasibility input]

**Appendix (parked, roughly the 30 percent that does not fit the executive's time)**
- Per-interview detail; the full theme tracker; methodology and interview count; the score table.

**Note:** the Section 3 phase titles are deliberately placeholders until the problem-solving session firms the themes and Laura's team gives a feasibility read. The argument (Sections 1 and 2) is the part to lock first; the recommendation is only as honest as the buildability behind it.`,
  },

  // ── Tuesday (day 2) — block 6 (Ellen), block 7 (cleanup), block 8 (Raymond) ────

  'management-consultant-meridian-full-d2-b1': {
    before: `Carly and her manager Marcus are joining a scheduled video call with Ellen, the Chief Investment Officer of a public pension fund that invests in one of Meridian Park's private credit funds. The team is partway through a round of interviews with Meridian's investors, gathering candid feedback on the investor platform to find where it falls short. Ellen is one of those investors. Marcus will lead the conversation; Carly is here to take notes and listen for what matters.`,
    simulatedWork: `[Marcus and Carly are on the call. Ellen joins about forty-five seconds later.]

Marcus: Ellen, hi. I'm sure this is a busy stretch with quarter-end, so I really appreciate you making the time. I'm Marcus, and this is my colleague Carly.

[Carly smiles on camera.]

Ellen: Hi both. Happy to do it, honestly glad to hear Meridian's putting some work into the platform. There's room for improvement.

Marcus: That's exactly what we're here for. Just some brief context and a reminder on the scope before we dive in: Meridian brought us in to get an outside read on how the platform's really working for the investors who use it, rather than the people internally who aren't living in it the way you are. So we'd just love your candid feedback, what's working and, more useful for us, what isn't. And none of your feedback will ever be attributed back to you individually, we take everything we hear across these conversations and synthesize it into themes and recommendations for Meridian. Carly here will mostly be heads-down taking notes while we talk. We've got a handful of questions we'd like to walk through, but we'll follow up where it's useful and just see where the conversation takes us. Does all that sound good to you?

Ellen: Sounds good. You may get more than you bargained for.

[Marcus laughs.]

Marcus: That's exactly what we'd like to hear. We've got thirty minutes scheduled, do you have a hard stop?

Ellen: I do, top of the hour. So let's keep it to the thirty.

Marcus: Perfect. Let's get into it.

Marcus: So before we get into the platform itself, could you tell me a little about your own role? How long you've been with the fund, and what you're overseeing there?

Ellen: Sure. I'm the CIO, I've been here about nine years, the last four in this seat. So I'm responsible for the whole investment program, across asset classes. We're a public pension system, managing retirement assets for state employees, a little north of twelve billion in total.

Marcus: Thank you, that's helpful. And how long has the fund been investing with Meridian, and in what capacity?

Ellen: About six years. They run a slice of our private credit allocation. That piece has grown a fair amount since we started, though I won't get into the specifics, but it's a bigger part of the book than it used to be.

Marcus: Understood, appreciate that. So with private credit specifically, walk me through how you actually interact with the Meridian Investor Portal day to day. What are you logging in to do, and how often?

Ellen: It varies. Month-end and quarter-end are the heavy times, that's when I'm in the portal pulling statements, performance, the capital activity for the period, the things I need for our own board reporting. Between those it's more ad hoc, someone on my team needs a document, or an investor relations question comes in and I have to go find the answer. So a few times a week normally, and then a lot around the reporting cycle.

Marcus: Got it. So it sounds like the reporting cycle is really where the portal gets put through its paces.

Ellen: That's exactly when it gets tested. And I'll be honest, that's when I feel the gaps the most.

Marcus: Let's talk about that further. Could you describe what starts to become an issue for you, and elaborate a bit on where it comes from?

Ellen: The honest answer is that almost nothing I need comes out in one step. Take the capital activity for the quarter, the calls and distributions across the period. I can't pull a single clean report that gives me the whole picture. I end up opening statements one at a time and stitching them together in my own spreadsheet to get to the number I actually need for the board.

Marcus: When you say stitching together, is that you, or your team doing the rebuilding?

Ellen: My team. There's an unnecessary amount of time spent just pulling these reports, and it feels incredibly manual. The data's all in there. Getting it out in a shape I can actually hand to the board is the part that's painful, and for what we pay in fees, that's a little hard to swallow.

Marcus: So it's less that the information is missing, and more that the platform makes you do the assembly yourself?

Ellen: That's exactly it. I'm paying for a finished product and getting raw ingredients.

Marcus: Can you put a rough number on it? In a typical week, how much of your analyst's time goes to pulling and rebuilding this data?

Ellen: It's hard to say exactly, but it's a meaningful share of those weeks. If I had to put something on it, the better part of a couple of days, just on the assembly, before anyone's actually looked at the numbers or thought about what they mean. That's the part that bothers me. The thinking is the job. The assembly shouldn't be.

Marcus: That's helpful, even a rough estimate. And is this specific to the capital activity reporting, or do you run into the same wall in other parts of the portal?

Ellen: It's not just that. Honestly, the one that gets me on a normal day is just finding a document. If our auditors ask for a specific quarterly statement from two years ago, or I need a particular notice, I can rarely just go in and find it. The search doesn't really work the way you'd expect. More often than not I end up emailing our relationship manager at Meridian and asking them to send it over.

Marcus: So you're going back to a person to retrieve something the portal is supposed to give you self-service?

Ellen: Right. And to be fair, they're responsive, I usually get it within a day. But that's a day, for something I should be able to get in thirty seconds myself. It adds up, and it's the kind of thing that makes the whole platform feel a step behind.

Marcus: That's useful. I'd like to shift to a different part of the relationship for a moment, the front end of it. When you've committed to a new Meridian fund, or added to your existing allocation, how does the onboarding and subscription paperwork tend to go?

Ellen: That's actually a sore spot, more for my operations team than for me directly, but I hear about it. Every time we come into a new fund, we're essentially starting the paperwork from scratch. The same entity information, the same authorized signatories, the same supporting documentation we've handed over several times already. None of it carries across from the funds we're already in. So my team is re-keying and re-sending things Meridian already has on file somewhere.

Marcus: And how many Meridian funds are you in at this point, across the allocation?

Ellen: We're in four of their funds now. Which is rather the point. By the fourth one, the idea that I'm sending over the same formation documents and signatory list again is a little absurd. They have all of it.

Marcus: Is that typical across your managers, or do some handle the repeat paperwork better?

Ellen: The better ones handle it well. When I go into a second or third fund with a manager who has their act together, they come back with most of it already filled in, and they only ask me to confirm what's actually changed since last time, a new signatory, an updated address. That's the difference. It tells me they're treating us as an existing relationship, not a brand new one every time.

Marcus: Got it. Coming back to the day-to-day for a second. Earlier you mentioned the capital calls and distributions. I'm curious how you actually find out when one of those, or any new document, lands in the portal. Does it tell you, or are you going to look?

Ellen: It's on me to go and look. The portal itself doesn't really tell me anything. What happens in practice is that our relationship manager emails me when a call is coming, and I do appreciate that, but it means I'm leaning on an email rather than the system. If that email is late, or it lands while I'm traveling, the first time I'm seeing a call notice might be well into the window I have to fund it.

Marcus: Has that ever actually cost you? A call you saw too late, or a funding you had to scramble on?

Ellen: Nothing's gone wrong in a way I'd put in front of my board, no. But there have been a couple of times I've had to move faster than I'd like, because the notice reached me late. And that shouldn't come down to whether I happened to catch an email.

Marcus: If the portal could push that to you directly, what would actually be useful? An email alert, something on the dashboard when you log in?

Ellen: Honestly, both, but the key thing is that it's tied to the actual event, not someone remembering to send it. The moment a call is issued, I should get a notification, with the amount and the due date, and it should be sitting at the top of my dashboard until I've acted on it. The good platforms do exactly that. I'm never relying on someone's email, the system itself is keeping me on top of what I owe and when.

Marcus: This is helpful. One thing that's useful for us is to benchmark against the rest of your managers. If you had to put a number on Meridian's portal, one to ten, where does it land, and where do your other managers sit?

Ellen: Honestly? I'd put Meridian around a six. They're not the worst I deal with, the data's accurate and it's all there, which I don't take for granted. But a six. My best manager on this is probably an eight, maybe a touch higher.

Marcus: And what's the other platform doing that Meridian isn't?

Ellen: A few things, but the one that stands out: when I log in at quarter-end, the reporting I need is essentially already built. There's a consolidated statement that gives me the full capital activity picture in one place, formatted in a way I can almost hand straight to my board. I'm reviewing and sense-checking, not assembling. With Meridian I'm starting from parts.

Marcus: So the gap is really about the last mile, taking it from accurate data to something board-ready, without you doing that work yourself?

Ellen: That's a good way to put it. And the document piece too, with that platform, search just works, I find what I need and move on. It's not that Meridian is broken. It's that the bar has moved, and they're sitting where some of the others were maybe two years ago.

Marcus: Well, that just about does it for the prepared questions I had. Carly, anything you'd like to ask before we wrap?

Carly: Just one thing. You've described all of this pretty clearly, the assembly work, the document search. Have you raised any of it with Meridian directly, and if so, what's come back?

Ellen: That's a fair question. I've mentioned it, more than once, usually to our relationship manager. They're always gracious about it, they take the point, and then nothing really changes. I don't think it's unwillingness. My read is it's bigger than the person I'm talking to, it's the platform itself, and that's not something a relationship manager can just go fix.

Carly: That's helpful, thank you.

[Marcus nods, and makes a note.]

Marcus: Good, thank you. We've covered a lot of ground, and I want to be respectful of your time. Before we close, is there anything we didn't ask about that you think we should have? Anything on the platform that's been on your mind?

Ellen: I think you got the heart of it. The only thing I'd add is that none of this is a dealbreaker for us, the investment relationship is good and that's what matters most. But you asked about the platform specifically, and on that, it's been the same set of frustrations for a while now. So if this is a sign they're actually looking at it, that's good to hear.

Marcus: It is, and that's exactly why we're talking to people like you. This is genuinely helpful, and it goes directly into what we take back to Meridian. Thank you for being so candid, and for the time, I know it's a busy stretch.

Ellen: Of course. Happy to help. Good luck with it.`,
    commentary: `That was a good one. Ellen was candid, which you can't always count on, and I've got a couple of pages of notes I want to tighten up before any of it blurs. Right now I can still hear exactly how she said things, which thing she rated a six, why the better manager came out ahead, the one or two offhand comments that I think actually matter more than she let on. A few days from now that detail is gone, and "the portal is clunky" is all that's left.

Fortunately we don't have another interview right after this, so I've got the gap to clean these up while they're fresh. That doesn't always happen, so when it does, I take it.

My cleaned-up notes are an important artifact, and they get added to our ongoing list of completed interviews. We're three weeks into a six-week project, so we've already started gathering what we're hearing into key themes, and those themes are what really inform our final recommendation deck to the client. Later today we'll meet as an internal team and talk through what we're hearing, tighten up the themes, and start shaping our draft deck narrative.`,
    after: '',
  },

  'management-consultant-meridian-full-d2-b2': {
    before: `After the Ellen call, Carly stays at her desk and works the interview notes into shape. There is no meeting and no call in this block. It is the pair of artifacts that come out of the hour, shown back to back: first the raw notes Carly typed live during the interview, then the cleaned, structured version she rewrites them into.`,
    simulatedWork: '',
    commentary: '',
    after: '',
    artifact: NOTE_CLEANUP_ARTIFACT,
  },

  'management-consultant-meridian-full-d2-b3': {
    before: `Later the same morning, Carly and Marcus join a scheduled video call with Raymond, the Chief Investment Officer of a life insurance company that holds an infrastructure allocation with Meridian Park. Raymond is a different kind of investor from the pension CIO earlier in the day. An insurer runs its investments through its own systems for statutory accounting and regulatory capital, so what it needs from a portal is usable data rather than finished documents. Marcus will lead the conversation; Carly is here to take notes and listen for what matters.`,
    simulatedWork: `[Marcus and Carly are on the call. Raymond joins a moment later.]

Marcus: Raymond, hi, thanks for making the time. We're a few weeks past quarter-end, so I imagine you're in the thick of the statutory filing right now, I appreciate you fitting us in. I'm Marcus, and this is my colleague Carly.

[Carly smiles on camera.]

Raymond: Marcus. Carly. Yes, it's that season. Let's make it worth the slot.

Marcus: That's the goal. A quick bit of context and a reminder on the scope before we start. Meridian brought us in to get an outside read on how the portal is actually working for the investors who use it, rather than the people inside Meridian who aren't living in it the way you are. So we'd really value your candid feedback, what works and, more useful for us, what doesn't. None of what you tell us is ever attributed back to you individually, we take everything we hear across these conversations and synthesize it into themes and recommendations for Meridian. Carly here will mostly be heads-down on notes while we talk. We've got a handful of questions we'd like to walk through, and we'll follow up where it's useful and see where it takes us. Does that all sound good to you?

Raymond: It does. I'll be direct with you, the portal is the part of this relationship I actually have views on, so you've come to the right person.

Marcus: Then we'll put them to good use. We've got forty-five minutes scheduled, do you have a hard stop?

Raymond: Bottom of the hour. Let's not waste it.

Marcus: Understood.

Marcus: Before we get to the portal, could you tell me a little about your own role? How long you've been with the company, and what you're responsible for?

Raymond: Chief Investment Officer. Twelve years at the company, seven in this seat. I run the general account.

Marcus: Thank you. And for those of us standing outside the insurance world, what does running the general account actually involve, in terms of what you're investing toward?

Raymond: We're a life insurer. The general account backs what we owe our policyholders, and those obligations are long-dated, annuities and life. So we invest long to match them. Asset-liability matching is the whole job, really. Every asset we buy has to earn against a liability and survive how we're required to account for it.

Marcus: That's helpful, thank you. And how long have you been investing with Meridian, and in what capacity?

Raymond: About five years. They run an infrastructure allocation for us. Good fit for what we are, long and contracted cash flows, the kind of asset that matches our liabilities cleanly. I'll say it plainly, the investment side I have very little to complain about.

Marcus: Understood. And the portal is a different conversation.

Raymond: It is.

Marcus: Then let's get into that. How do you and your team actually use the Meridian Investor Portal?

Raymond: Honestly? As little as we can. We go in, pull what Meridian has posted, and get it back out, because the real work happens in our systems, not theirs. The statutory accounting, the capital reporting, matching the assets against the liabilities, all of that runs on our side. So what I need from the portal is the underlying data in a form I can load. What it gives me is a quarterly statement, a PDF. Accurate, tidy, and no use to me until somebody on my team has rebuilt it by hand.

Marcus: Say more about the rebuilding. What is your team actually doing to a statement once it lands?

Raymond: Two things. They re-key the numbers into our system, and then they reclassify every position so it maps to how we're required to report it for the statutory filings. The categories Meridian uses are not the categories the regulator wants. So someone sits in the middle and translates. Every position, every quarter.

Marcus: And is the data itself wrong, or is it right but in the wrong shape?

Raymond: The data is right. That's the part that grates. Meridian knows exactly what these assets are, they have to, they manage them. That classification already exists on their side. We are rebuilding something they could hand us in the right form and don't.

Marcus: Put some scale on that for me. In a quarter, how much of your team's time goes into taking the statements apart before any of the real work even starts?

Raymond: Two people, the better part of a week, around each filing. Every quarter. It is not the most sophisticated thing they do, and it is where a real share of their time goes.

Marcus: And do any of your other managers deliver it differently?

Raymond: My best one does. They send a file straight into our accounting and reporting systems, already in the shape we need. Barely a person involved on our end, my team checks it and moves on. Same asset class, same kind of fund. It is a different experience entirely.

Marcus: So with that manager, the week of rebuilding simply doesn't happen.

Raymond: Right. They have taken on the work that ought to be theirs in the first place. With Meridian, we do it for them, four times a year.

Marcus: That's a clear picture. Is the format the whole of it, or are there other places the portal falls short for you?

Raymond: The format is the day-to-day annoyance. The one that actually worries me is detail. On the capital side, I can't treat the fund as a single line on my books. I have to look through it, to what is actually inside, because what we're required to hold against it depends on the underlying assets, not the wrapper around them. The portal gives me fund-level summaries. That is not enough to do it properly.

Marcus: And when the summary isn't enough, how do you get the underlying detail?

Raymond: We ask for it. My team goes to our relationship manager, and they get us what they can. Same pattern as the rest of it, I am back to asking a person for something the platform should already hold. And I won't get into our specific capital position, but I'll tell you the regulators are pushing harder on exactly this every year, not softer. What is a manageable gap today is going to be a real problem in a year or two.

Marcus: This is useful. One thing that helps us is to benchmark Meridian against the rest of your managers. If you put a number on the portal, one to ten, where does Meridian land, and where do your other managers sit?

Raymond: The portal, not the investment? A five. And I want to be fair to them, the data is accurate, which I genuinely don't take for granted, plenty of managers can't get even that right. But it stops at accurate. The best manager I've got on this, the one with the file, is a nine.

Marcus: That's a wide gap. What earns the nine?

Raymond: Everything we just went through. The data shows up where I need it, in the form I need, with the detail underneath it, and I barely touch it. Meridian gives me accurate data and leaves the rest of it to me.

Marcus: We've heard a version of that from other investors, that the portal gets you as far as accurate data and then leaves the last step, turning it into the thing you actually need, on your side of the line.

Raymond: That's fair, but I'd put the line in a different place than a pension would. A pension wants a clean report it can carry into a board meeting. The last step for them is a document. There is no document at the end of mine. It is a feed into a system that has to satisfy a regulator. Same gap, in a sense, but what is missing for me is not a better-looking statement. It is the data, structured, with the detail sitting under it.

Marcus: That's a really useful distinction. Carly, anything you'd like to ask before we wrap?

Carly: Just one thing. You've drawn a clear line between what a pension needs from the portal and what you need. Do you get the sense Meridian sees insurers as a big enough part of who they report to that they'd build for your side of that line, or do you feel a bit like an edge case for them?

Raymond: Fair question, and an honest answer is that I'd only be guessing. But my read is that I'm in the minority of their book. The portal is clearly built for the investor who wants a clean statement, and most of their investors probably do want exactly that. I'd assume insurers are a smaller slice, and a smaller slice doesn't usually drive the roadmap. Which is the discouraging part. Although the fact that you're sitting here asking suggests somebody is at least thinking about the rest of us.

Carly: That's helpful, thank you.

[Marcus nods, and makes a note.]

Marcus: Good, thank you. We've covered a lot of ground, and I want to be respectful of your time. Before we close, is there anything we didn't ask about that you think we should have? Anything on the portal that's been on your mind?

Raymond: I think you have it. The one thing I'd underline is that this is not about people. Our relationship manager is responsive, and the investment team is genuinely good. It is the platform, and it was built for a different kind of investor than I am. The data is fine. What I need is for it to arrive as data, with the detail sitting under it, and to stop costing me two people a week every quarter to put right. If they moved even part of the way there, I'd notice.

Marcus: That is exactly the kind of thing we are here to take back. It goes straight into what we bring to Meridian. Thank you for being so candid, and for the time, I know the filing has you busy.

Raymond: Of course. Send it back to them straight, that's all I'd ask. Good luck with it.`,
    commentary: '',
    after: '',
  },

  // ── Wednesday (day 3) — block 9 (problem-solving), block 10 (deck build) ───────

  'management-consultant-meridian-full-d3-b1': {
    before: `Wednesday, late morning. Tuesday's interviews and one this morning are in the bank, so the theme tracker has more rows than it did Monday, and the count of completed interviews is up around twenty. Marcus and Carly sit down for the week's problem-solving session: the working meeting where the team compares what it is hearing, attacks its own logic, and tightens the themes into something the deck can stand on. Carly brings the ghost deck and the tracker.`,
    simulatedWork: `Marcus: Alright, put up the skeleton. Walk me through the spine and I will try to break it.

Carly: Straw man, so go ahead and attack it. Situation, the relationship is good and the data is accurate, nobody argues with that. Complication, the portal stops at accurate data and leaves the last mile to the investor, and the bar has moved. Resolution, a prioritized, fundable set of improvements. The middle is where the work is.

Marcus: The last-mile line is doing a lot of work. Is it actually one theme, or are we hiding four separate complaints under a nice phrase? Because if Laura asks what specifically do I build, the last mile is not an answer.

Carly: Both, and I think that is the structure. The last mile is the umbrella, the so-what. Underneath it are the concrete gaps that actually get built: consolidated reporting, document search, notifications, onboarding. The umbrella explains why they hang together. The gaps are what goes on the roadmap.

Marcus: Good. That is the distinction I wanted. The umbrella is the argument, the gaps are the deliverables. Keep them clearly separated on the page or it reads as mush.

Carly: One thing I flagged on the tracker. Onboarding, the re-papering for every new fund. It is real, around half of them raise it, but it is a different animal from the other three. The other three are all about getting data out at the reporting cycle. Onboarding is the front end of the relationship, before any reporting happens.

Marcus: What does the evidence say about the root cause?

Carly: That it is the same root cause as the rest, the platform treating every interaction as if it is the first one, no memory. But it is felt by a different team, operations rather than the CIO, and at a different moment.

Marcus: Then do not force it under the last-mile umbrella, because that umbrella is specifically about the reporting cycle. Make it its own theme. Call it the platform has no memory, with onboarding as the lead example. Two clean themes beat one stretched one. Does it still belong on the same roadmap? Yes. Same story? Only loosely. Separate it.

Carly: That is cleaner. It also gives us an obvious quick win, the reusable onboarding profile is a well-understood fix.

Marcus: Now the insurer split. I want to make sure we are not over-rotating on it. We have got, what, five data-led investors out of twenty so far?

Carly: Five so far, and the spread is real. Raymond is a five against a best-other nine, much wider than the document people. But I would be careful claiming insurers are the bigger population. My read is they are the smaller slice with the sharper pain, because their downstream is a regulatory filing.

Marcus: Right. So we frame it as a distinct shape of the same problem, not a second problem, and we are honest that it is a minority of the book with a disproportionate cost. That is defensible. If we oversell it, Laura prices a data-feed build that serves a handful of investors and the whole prioritization falls apart.

Carly: Agreed. I will keep it as one theme with two finish lines, and let the numbers say how big each population is.

Marcus: Good. The spine holds. Here is what I want next. Build Section 2 for real, the complication. Lead page is the umbrella, one idea: accurate data, last mile left to the investor. Then the by-investor-type split as its own page. Then the gaps with the counts and the quantification under them. Action titles that state the so-what, evidence underneath, one idea per page. Get me a draft and I will mark it up first thing tomorrow.

Carly: Got it. Umbrella, the split, the gaps with numbers.

Marcus: And resist the urge to put the recommendation in Section 2. We earn the resolution by proving the complication first. Do not answer the question before you have made them feel it.`,
    commentary: '',
    after: '',
  },

  'management-consultant-meridian-full-d3-b2': {
    before: `With the themes tightened, Carly turns the complication section of the ghost deck into finished pages. The discipline now is one idea per page, an action-title lead-in that states the so-what, and the synthesized interview evidence sitting underneath it. The artifact is the section as drafted, the version that goes to Marcus for review.`,
    simulatedWork: '',
    commentary: `The page I am on right now needs a title, and that is where most of the time goes. Not a label like capital-activity reporting, which would just make Marcus hunt for the point. I am writing it as a full sentence that says the so-what, so a busy executive who reads only the titles still gets the argument. Then I hold the page to one idea. The minute this page tries to say two things, it stops being a slide and becomes a document, and Marcus will split it before I finish explaining it, so I would rather catch it now. That is why this is slower than it looks. Most of the two hours is deciding what each page is actually for, then proving that one thing with the cleanest evidence I have in the tracker.`,
    after: '',
    artifact: `### Complication section, draft pages

**Page 2.1**

**Action title:** The Meridian portal delivers accurate data but stops short of the finished output investors need, leaving them to build the last mile by hand

Body:
- Across the 20 investor interviews completed to date, nearly all credit the portal's data as accurate and complete, and nearly all describe doing manual work to turn that data into what they actually use.
- The pain is not accuracy. It is the gap between accurate data and a usable end product.
- Representative voices (anonymized):
  - "I'm paying for a finished product and getting raw ingredients." (public pension CIO)
  - "It gives me a PDF I have to take apart before any of the real work starts." (life insurer CIO)
- So what: the opportunity is the last mile, not the data layer. This reframes the problem from fix the data to finish the job.
- [Exhibit placeholder: simple two-step visual, accurate data, then the gap, then finished output]

**Page 2.2**

**Action title:** The last mile takes a different shape by investor type: pensions need board-ready documents, insurers need system-ready data

Body:
- Document-led investors (pensions, endowments, foundations): the missing last step is a consolidated, presentation-ready report they can take to a board or investment committee.
  - Anchor example: a pension CIO rebuilds a quarter's capital activity by hand because there is no consolidated capital-activity report. About 1 to 2 analyst-days per quarter on assembly alone, before anyone analyzes the numbers.
- Data-led investors (insurers): the missing last step is structured data delivered into their own systems for statutory accounting, regulatory capital, and asset-liability work. A PDF is of little use.
  - Anchor example: a life insurer reclassifies and re-keys every position so it maps to statutory reporting. About 2 staff for the better part of a week each quarterly filing.
- So what: one structural problem, two finish lines. The roadmap has to serve both without rebuilding the platform.
- [Exhibit placeholder: two-column compare, document-led versus data-led]

**Page 2.3**

**Action title:** Four recurring gaps drive most of the manual work, and they cluster by how often investors hit them

Body:

| Gap | Raised by | What investors do today | Quantified pain |
|---|---|---|---|
| No consolidated capital-activity report | 14 of 20 | Open statements one at a time, assemble in own spreadsheet | 1 to 2 analyst-days per quarter |
| Poor document search / retrieval | 12 of 20 | Email the relationship manager to retrieve | Hours to about a day per request |
| No event notifications | 11 of 20 | Rely on the relationship manager's emails; risk seeing call notices late | Compressed funding windows; near-misses |
| Onboarding re-papering (carried as the separate no-memory theme) | 10 of 20 | Re-submit the same entity info and signatories each new fund | Re-papered up to 4 times for multi-fund investors |

- So what: these are discrete, addressable fixes, not a platform rebuild. That is what makes a phased roadmap possible.
- [Note on page: the data feed and look-through gap for data-led investors is carried on its own page given the wider score spread.]`,
  },

  // ── Thursday (day 4) — blocks 11–15 ───────────────────────────────────────────

  'management-consultant-meridian-full-d4-b1': {
    before: `Thursday morning. Marcus has Carly's complication section open and walks her through his edits. A meaningful share of it gets restructured, which on a first draft is the norm rather than a verdict on the work. The artifact is one of Carly's pages with Marcus's markup.`,
    simulatedWork: `Marcus: First, the good news. Page one is doing exactly what it should. The title says the point, there is one idea, and the two quotes earn their place. I would leave it almost alone. That is the bar for the rest.

Carly: Good. That one felt like it clicked.

Marcus: It shows. Now the work. Page three. What is the one idea on this page?

Carly: That four gaps drive most of the manual work.

Marcus: That is two ideas wearing a coat. You have the gaps themselves, and how often each is hit, and what people do today, and a quantified column. That is a document, not a slide. A senior reads it and does not know where to look. Split it. The lead page makes the point, a small number of recurring gaps drive the manual work, with the counts as a simple bar. The detail table, what they do today and the per-gap numbers, moves to the appendix and you reference it.

Carly: So the page says four gaps, here is how widespread, and the evidence table backs it from behind.

Marcus: Right. The titles test, remember. If David flips through reading only titles, he should get the argument. A small number of recurring gaps drive the manual work passes. A table with no title that says anything fails. Next thing. Your counts. 14 of 20. Twenty what?

Carly: Investors interviewed to date.

Marcus: Then say it on the page, every time. 14 of 20 investors interviewed to date. The minute a number floats without its base, someone in that room asks, and if we are explaining our own denominator live, we have lost a little credibility for no reason. Footnote the base and the as-of date on every exhibit.

Carly: Got it. Base and date on everything.

Marcus: The by-type page, page two, is strong. The two-finish-lines framing is the cleanest articulation of the whole problem we have. I would consider promoting it earlier, but let us not move the section flow until David has seen the spine. One title fix. System-ready data is good, board-ready documents is good, but lead the title with the so-what, not the symmetry. Something like, because the downstream work differs, the same gap costs a pension a board report and an insurer a regulatory filing. Sharper. Play with it.

Carly: That is better. The symmetry was me being a little pleased with the phrase.

Marcus: It is a nice phrase. Just make it work for its place on the page. Last thing. Nowhere in here do you hint at the fix, and that is correct, keep it that way. Section two makes them feel the problem. We do not spend the resolution until section three. Do not let a helpful instinct leak a recommendation into the complication.

Carly: Understood. Split page three, source every count, sharpen the type title, leave the fix alone.

Marcus: That is a good list. And none of this is because the draft was weak. A first cut that needs this much shaping is just a first cut. The thinking underneath it is right, which is the part I cannot fix for you. The structure I can.`,
    commentary: `Marcus reworked the bones of one page out of three and left the other two mostly alone, and the page he tore up was the one where I had crammed four ideas onto a slide because I did not want to waste the space. It stings a little to see a page come back that restructured, and the first instinct is to read it as a grade. It is not. The thing I hold onto is what he said at the end: the thinking was right, the structure was not. Structure I can fix in an hour. So that is the next hour.`,
    after: '',
    artifact: `### Marked-up page (page 2.3, with Marcus's comments)

**Action title:** Four recurring gaps drive most of the manual work, and they cluster by how often investors hit them
> [C1, Marcus] Title is two ideas. Cut everything after the comma. One idea: the gaps drive the manual work. New title candidate: "A small number of recurring gaps drive most of the manual work investors describe."

Body table:

| Gap | Raised by | What investors do today | Quantified pain |
|---|---|---|---|
| No consolidated capital-activity report | 14 of 20 | Open statements one at a time, assemble in own spreadsheet | 1 to 2 analyst-days per quarter |
| ... | ... | ... | ... |

> [C2, Marcus] 14 of 20 what? Investors interviewed to date. Base plus as-of date on every number, every exhibit.
> [C3, Marcus] This whole table is the appendix. The page itself should show the counts as a simple bar and make ONE point. The detail moves behind it.
> [C4, Marcus] Good content, wrong container. Split it: lead page is the point, the evidence table is appendix A3.

So what: these are discrete, addressable fixes, not a platform rebuild.
> [C5, Marcus] Keep this line, it is the so-what. But it belongs up on the lead page, not buried under the table.`,
  },

  'management-consultant-meridian-full-d4-b2': {
    before: `Carly works Marcus's edits into a cleaner version of the section. The dense page becomes a lead page that makes one point, with the detail moved behind it. Every count gets its base and date. The by-type title gets sharpened. The artifact is the revised section.`,
    simulatedWork: '',
    commentary: '',
    after: '',
    artifact: `### Revised complication section

**Page 2.2 (revised title)**

**Action title:** Because the downstream work differs, the same gap costs a pension a board report and an insurer a regulatory filing

Body: (unchanged) document-led investors need a consolidated, presentation-ready report; data-led investors need structured data into their own systems. Anchor examples and quantification as drafted.

**Page 2.3 (revised, now a clean lead page)**

**Action title:** A small number of recurring gaps drive most of the manual work investors describe

Body:
- Four gaps account for the majority of the manual effort cited across interviews.
- [Exhibit: simple bar, share of investors raising each gap]
  - No consolidated capital-activity report: 14 of 20
  - Poor document search / retrieval: 12 of 20
  - No event notifications: 11 of 20
  - Onboarding re-papering (carried as the separate no-memory theme): 10 of 20
- So what: each gap is a discrete, addressable fix rather than a platform rebuild, which is what makes a phased roadmap possible.
- Footnote: base is 20 of 30 planned investor interviews completed, as of Wednesday, week 3.

**New appendix page A3**

**Title:** Appendix: per-gap detail and quantified pain

| Gap | Raised by | What investors do today | Quantified pain |
|---|---|---|---|
| No consolidated capital-activity report | 14 of 20 | Open statements one at a time, assemble in own spreadsheet | 1 to 2 analyst-days per quarter |
| Poor document search / retrieval | 12 of 20 | Email the relationship manager to retrieve | Hours to about a day per request |
| No event notifications | 11 of 20 | Rely on the relationship manager's emails; risk seeing call notices late | Compressed funding windows; near-misses |
| Onboarding re-papering | 10 of 20 | Re-submit the same entity info and signatories each new fund | Re-papered up to 4 times for multi-fund investors |

Footnote: base is 20 of 30 planned investor interviews completed, as of Wednesday, week 3.`,
  },

  'management-consultant-meridian-full-d4-b3': {
    before: `Thursday afternoon. Marcus and Carly join the mid-engagement checkpoint with Meridian. This is a status meeting, not the final readout: the team shares where the themes are landing and the initial direction, gathers the client's reaction, and keeps everyone aligned so nothing in the week-six readout comes as a surprise. From Meridian: Diane, the Global Head of Client Solutions who sponsored the work and owns the platform strategy and its funding; Gregory, the Head of Investor Relations, whose team operates the portal day to day; and Laura, the Head of Technology, who owns the build. Marcus leads. Carly is along to see client management directly.`,
    simulatedWork: `Marcus: Diane, Gregory, Laura, thank you for the time. I know the calendars are full, so I will be efficient. This is a checkpoint, not the readout. We are three weeks in, halfway, and the point today is to show you where the themes are landing while there is still time to steer, get your reactions, and make sure nothing in week six is a surprise. I brought Carly, who has been in many of the investor interviews and is building the synthesis, so she can speak to the evidence directly if it is useful.

[Carly nods.]

Diane: Good. I would rather hear it rough and early than polished and late. Where are you landing?

Marcus: The headline first. Your investors like Meridian. The investment relationship is strong, and they trust the data on the portal, which is not something every manager can say. The frustration is specific and consistent. The portal gets them to accurate data and then leaves the last step, the finished thing they actually need, to them. In one CIO's words, they are paying for a finished product and getting raw ingredients.

Diane: That tracks with what I hear anecdotally. What I have never been able to do is tell whether it is a few loud voices or the whole book. Can you?

Marcus: That is exactly what the synthesis is for. Carly, the spread?

Carly: Of the investors we have interviewed so far, nearly all credit the data as accurate, and nearly all describe doing manual work to turn it into what they use. The most common single gap, no consolidated capital-activity report, comes up in about three out of four. It is not a few loud voices. It is the pattern.

Diane: That is helpful to know with some weight behind it.

Gregory: I will confirm it from my side, and frankly it is a relief to hear it framed as the platform and not the people. My relationship managers are fielding these requests all day. Someone cannot find a statement from two years ago, so they email us and we go dig it out. We are the search function the portal does not have. My team is basically running manual retrieval as a service, and it does not show up anywhere as a cost, because it is just absorbed into their day.

Marcus: That is an important point, and it is in the findings. A lot of the cost of these gaps is hidden inside your IR team's workload, not just the investor's.

Gregory: Hidden is the right word. I cannot put a number on it, because it never gets logged. It is just Tuesday.

Laura: I want to get ahead of where this goes, because I can already feel the shape of the recommendation. Everything you have described is real. I am not going to argue any of it. But I cannot rebuild this platform this year. The budget does not exist, and even if it did, you do not replace an investor portal in twelve months without breaking the things that currently work.

Marcus: Understood, and that is the whole premise of how we are building the recommendation. It is not a rebuild. It is a prioritized, phased roadmap, the smallest set of changes that closes the most pain, sequenced so the early phases are genuinely buildable inside what you can fund. Honestly, forcing that prioritization is a large part of why you brought us in.

Laura: It is, and I will hold you to the word buildable. Some of what investors want sounds simple and is not. A consolidated capital-activity report across funds touches data that lives in three different systems. Notifications are comparatively easy. If your phase one mixes those without knowing which is which, it will fall apart the first time my team scopes it.

Marcus: That is exactly the input we need from you, and it is why we wanted you in the room today rather than at the readout. We have an early view of what looks like a quick win versus a heavier lift, but we would rather sequence it with your team's feasibility read than guess and be wrong in front of everyone in three weeks.

Laura: Then let us get my engineering lead some time with Carly's list before you finalize any sequence.

Marcus: We will set it up. One more theme worth your attention, Diane, because it changes how you would prioritize. The pain is not identical across investor types. Your pension and endowment investors want a board-ready document at the end. Your insurers do not want a document at all. They want structured data fed into their own systems for regulatory reporting, and for them the gap is more expensive, because the downstream is a regulatory filing, not a board slide.

Diane: That is a real tension for me. The insurers are a smaller part of the book, but they are some of my largest single relationships, and they are the ones asking the hardest questions about whether we are keeping up. So I cannot just serve the majority and let the data-led investors drift.

Marcus: Agreed, and we are not going to recommend you pick one. We will show you where a single fix serves both, and where they genuinely diverge, so you can fund the shared wins first and decide the data-feed investment with your eyes open about who it serves.

Diane: That is the version I can take to my own leadership. A prioritization with a rationale, not a wish list.

Diane: Here is what I would ask for the readout. Everything you showed me today, I want my leadership to see it landing the same way, with the evidence behind it, and I do not want anyone in that room surprised. So keep me close between now and then. If something shifts, I would rather hear it from you on a Tuesday than discover it on stage.

Marcus: That is exactly how we work it. We will keep you and Gregory wired in as the sequencing firms up, and there will be nothing in week six you are seeing for the first time.

Diane: Then this was a good use of the hour. Thank you, both.`,
    commentary: '',
    after: '',
  },

  'management-consultant-meridian-full-d4-b4': {
    before: `After the Meridian team drops off, Marcus and Carly stay on the line for a few minutes. This is the part that does not show up in any deliverable: Marcus walking Carly through what just happened in that room, and why he handled it the way he did.`,
    simulatedWork: `Marcus: So. What did you see in there?

Carly: Honestly, that you spent more time managing Laura than anyone, even though Diane is the sponsor.

Marcus: Good read. Why do you think that is?

Carly: Because Laura is the one who can kill the recommendation by saying it is not buildable.

Marcus: Right. Diane decides, but Laura can make Diane's decision impossible. The fastest way to lose a recommendation like this is to have the tech owner sit quietly through the readout and then tell the sponsor afterward that none of it is feasible. So you never present the build to her, you build it with her. The minute she said rebuild is off the table, I agreed before she finished the sentence, because she is right, and because the recommendation was never a rebuild anyway. Now she is a collaborator, not a blocker.

Carly: And handing the spread question to me?

Marcus: Two reasons. One, you had the actual number and I did not want to launder it through me. It is more credible coming from the person who did the synthesis. Two, Diane should see there is real analytical work under this, not just a manager with opinions. That is how the team earns the next engagement. You did it well, by the way. You gave her the number and stopped. You did not oversell it.

Carly: I was not sure whether to say more.

Marcus: Do not, in that room. Your job there was to be the evidence, precisely and briefly. That is exactly what you did.

Carly: The insurer tension. You could have left that for later. Why raise it today?

Marcus: Because it is Diane's hardest call, and the one rule of a checkpoint is no surprises at the readout. If the first time she has to weigh serving her biggest insurance relationships against the majority of her book is in front of her own leadership in week six, I have failed her. Raise the hard thing early, privately, when she has room to think. Then in the readout she has already made her peace with it, and she is nodding, not reacting.

Carly: So the checkpoint is partly just pre-loading the decisions.

Marcus: That is most of what it is. The readout should feel inevitable. Everything that makes it feel inevitable happens in rooms like the one we were just in.`,
    commentary: '',
    after: '',
  },

  'management-consultant-meridian-full-d4-b5': {
    before: `After the checkpoint, the consulting team and several of the Meridian stakeholders meet for dinner near Meridian's offices. There is no agenda and no deck. It is a relationship dinner, the social half of a mid-engagement checkpoint.`,
    simulatedWork: `**What it is.** A client dinner at a mid-engagement checkpoint is a deliberate relationship ritual, not a perk. The working sessions prove the team is competent. The dinner is where the trust and personal fit that sit underneath the working relationship actually get built. Most of what decides whether a client renews, or hands the firm the next piece of work, is relationship, and relationship is built in rooms like this one rather than on a slide.

**Who is there.** From the team: David (the Senior Manager, who is the senior face of the relationship), Marcus, and Carly. From Meridian: Diane, Gregory, and Laura. The seating, the small talk, and who sits next to whom are all quietly intentional.

**The relationship that matters most: Diane.** She is the sponsor. She engaged the team, she owns the platform strategy and its funding, and she is the person who has to carry the recommendation to her own leadership and fund it. A strong relationship with Diane is what makes the work land and what makes the engagement renew. The dinner is largely about her, even when the conversation is about anything but work.

**The lifestyle read.** This is the honest part. The dinner extends an already long day, and it is part social and part still-working. Nobody is off the clock. The conversation drifts to family and travel and the industry, and underneath it the team is still reading the room, still reinforcing trust, still listening for the offhand comment that tells them what Diane is really worried about. It is genuinely enjoyable and it is genuinely work, both at once. That blend, the relationship being the job, is a large part of what consulting actually is at the senior level, and watching it up close is part of how a first-year learns where the work is really won.`,
    commentary: '',
    after: '',
  },

  // ── Friday (day 5) — blocks 16–19 ─────────────────────────────────────────────

  'management-consultant-meridian-full-d5-b1': {
    before: `Friday morning. David has the complication section in front of him, now revised through Marcus's review and updated after the client checkpoint. His review is a different altitude from Marcus's: less about whether a page is clean, more about whether the argument survives the room it is built for, the one with Diane and her leadership in it.`,
    simulatedWork: `David: I read it the way Diane's boss will read it. Titles only, front to back, ninety seconds. Want to know what I got?

Carly: Please.

David: I got: the relationship is good, the data is accurate, the portal stops short and makes investors finish the job themselves, it costs them differently depending on type, four gaps drive it, and you can fix it in phases without a rebuild. That is a complete argument from the titles alone. Most decks never get there. So, well done, both of you.

Marcus: Carly drove the section.

David: Then well done, Carly. Now let me try to break it, because that is my job, and it is a lot cheaper for me to break it than for Diane's leadership to. Two things. First, the funding story. You assert without a rebuild and in phases. Diane is going to take this to people who control a budget. Where on these pages does it become obvious that phase one is small and cheap and phase three is the big bet? Right now I can see the gaps, but I cannot see the money.

Carly: The sequencing page is still a placeholder. We are getting Laura's engineering read before we commit to what goes in each phase.

David: Good, that is the right reason for it to be blank. But hold the place for it loudly. The single most important page in this deck, for Diane, is the one that says here is what a little money buys you, here is the expensive part, and here is why you do them in this order. That page is the recommendation. Everything else is just the case for it. Do not let it show up as an afterthought at the back.

Marcus: We will build the sequencing page as the spine of section three, not a summary at the end.

David: Right. Second thing. The insurer split. I like it, it is the most sophisticated point in here. But pressure-test whether it survives Diane's leadership asking the cynical question, why are we spending on a data feed for a handful of insurers? If your only answer is because it is the right thing to do, you lose. What is the business answer?

Carly: That the insurers are a small part of the book but some of Meridian's largest single relationships, and they are the ones most actively questioning whether Meridian is keeping up. Diane said almost exactly that in the checkpoint.

David: Then put her own logic on the page, in business terms, not as a fairness argument. A small number of large, at-risk relationships is a sentence a CFO funds. It is only fair to the insurers is not. Make the deck make her argument for her.

Carly: That is a sharper version of it. I will reframe the title around relationship value at risk.

David: That is the note. Last thing, and it is a compliment disguised as a warning. This section is good enough that the rest of the deck now has to match it. The executive summary, when you build it, has to land the whole arc on one page as cleanly as page one lands the complication. Do not let the front of the deck be weaker than the middle.

Marcus: Understood. We will draft the one-page summary off this spine next week.

David: Good work, genuinely. This is in strong shape for week three.`,
    commentary: '',
    after: '',
  },

  'management-consultant-meridian-full-d5-b2': {
    before: `Friday late morning. Marcus hands Carly something most first-years never touch: the engagement's economics. The work is the budget tracker, hours logged against the plan by staff level, against the fixed fee, and what it says about whether the engagement is on track to hit its margin. The artifact is the tracker.`,
    simulatedWork: '',
    commentary: `Marcus just handed me the engagement's hours tracker, which is not a thing most first-years get to open. The work is interviews and decks, but the business is hours. We are on a fixed fee, which means the firm priced this engagement assuming a certain number of hours at each level, and every hour over that plan comes straight out of the margin. So what I am looking at is honest bookkeeping: planned hours against actual, by week and by level. Marcus framed it as, you do not get to care about margin only once you are a partner. And he has a point. If I am the one burning hours redoing a section three times, I should at least be the one who can see it in the numbers.`,
    after: '',
    artifact: `### Engagement budget and margin tracker (working)

As of end of week 3 of 6. Fixed-fee engagement.
Note: the bill rates and fee figures below are illustrative placeholders for this exercise. No client fee is fixed in the engagement. The mechanics are the point, not the dollar amounts.

**Table 1, hours by staff level, plan against actual**

| Level | Planned hours (6 weeks) | Actual to date (weeks 1 to 3) | Plan to date | Variance |
|---|---|---|---|---|
| Senior Manager (David) | 90 | 44 | 45 | 1 under (on plan) |
| Manager (Marcus) | 300 | 158 | 150 | 8 over |
| Analyst (Carly) | 480 | 250 | 240 | 10 over |
| Total | 870 | 452 | 435 | 17 over |

**Table 2, margin read (illustrative)**

| Line | Value | Note |
|---|---|---|
| Fixed fee | [illustrative] | priced on roughly 870 planned hours at a blended rate |
| Blended bill rate | [illustrative] per hour | rises with seniority; leverage is what makes it work |
| Hours used to date | 452 of 870 (52 percent) | against 50 percent of the timeline elapsed |
| Projected hours at close | about 885 | if the current run-rate holds |
| Projected variance | about 15 hours over, roughly 2 percent | small, watch it, do not panic |
| Effect on margin | roughly 2 percent margin compression if not recovered | manage across weeks 4 to 6 |

**So what (the read):**
- The engagement is marginally over plan, about 2 percent, driven by the analyst and manager lines. Most of that overage is the deck section that got restructured. Normal, and recoverable.
- Three levers protect the margin. Leverage: keep the right junior-to-senior mix, and do not pull David in for work Marcus can do, because his hours are the most expensive. Utilization: keep billable hours productive. Realization: deliver inside the priced hours, and do not let the scope creep.
- Action: hold David's hours to plan, absorb the small overage by tightening the week-4 synthesis, and avoid re-opening sections that are already settled.`,
  },

  'management-consultant-meridian-full-d5-b3': {
    before: `Friday after lunch, a standing slot for internal development, the kind of skill-building that fills a consultant's office day. This week's session is a primer on the domain the engagement runs through: private-markets investing, and how the investors on the other end of the portal actually consume what Meridian sends them.`,
    simulatedWork: `The point of this session is simple. The whole engagement turns on understanding what the people on the other side of the portal actually need. Here is the substance underneath the interviews.

**1. What Meridian runs, and the structure around it.**
Meridian is an alternatives manager. The products in this engagement are private credit (privately negotiated loans to companies, the kind a pension like Ellen's invests in) and infrastructure (long-lived, cash-yielding assets like utilities and transport, the kind a life insurer like Raymond's holds). Both are private-markets funds, usually structured as a limited partnership. The manager is the general partner, or GP. The investors, the pensions, insurers, endowments, and so on, are the limited partners, or LPs. LPs commit capital up front; the GP calls it as deals arise (a capital call) and returns it as the investments pay off (a distribution).

**2. The reporting artifacts an LP lives in.**
This is what shows up on the portal and what every interview keeps circling back to:
- The capital account statement (often called a PCAP, for partners' capital account). A per-investor running ledger: opening balance, capital called and contributed, the investor's share of gains and income, fees and expenses, distributions, and the ending balance. Issued quarterly. This is the statement Ellen pulls at quarter-end.
- Capital call and distribution notices. The time-sensitive notes that say money is due (with an amount and a due date) or money is coming back. The funding window on a call is why notifications matter so much: miss the notice, and you are scrambling.
- The quarterly report package. The statement plus performance, fee detail, holdings detail, and the manager's commentary, usually delivered as PDFs or posted to the portal.

**3. Why the last-mile pain is real, not a complaint.**
An LP across many managers logs into many different portals, each with its own format, and then has to export and consolidate everything by hand. A typical institutional investor is invested with twenty-plus managers. The industry has been moving for years from static quarterly PDFs toward portals that offer on-demand, exportable, notified data. There is even a standard-setter, ILPA, the Institutional Limited Partners Association, that publishes templates for how fees, performance, and capital calls should be reported, precisely because the assembly and reconciliation burden across managers is so widely felt. When Ellen says the bar has moved and Meridian is a couple of years behind, she is describing a real market shift, not a personal preference.

**4. The insurer twist (why Raymond is a different animal).**
A pension wants a finished document. An insurer wants finished data. Insurers run everything through their own systems for three things: statutory accounting (a separate, conservative accounting framework set by the NAIC, focused on solvency), regulatory capital (how much capital they must hold against an asset, which depends on the riskiness of the underlying holdings, so they need look-through detail), and asset-liability matching (lining up long-dated assets against long-dated obligations like annuities). For an insurer, a PDF is useless until someone re-keys and re-classifies it to fit statutory reporting. That is why Raymond wants a data feed straight into his systems, and why the gap costs him more than it costs Ellen: his downstream is a regulatory filing, not a board slide.

**5. The one thing to carry back to the work.**
The single theme underneath every interview is the last mile. The portal delivers accurate data and then stops, leaving the investor to build the finished thing they need. The only variable is the shape of that finished thing: a board-ready document for the document-led investors, system-ready data for the data-led ones. Understanding the domain is what lets the team turn felt complaints into a recommendation that a manager can actually fund and build.`,
    commentary: '',
    after: '',
  },

  'management-consultant-meridian-full-d5-b4': {
    before: `Late Friday afternoon. The team closes out the week before the wind-down. Short and forward-looking: what got done, and what week four needs to look like.`,
    simulatedWork: `Marcus: Quick wrap, then go home. Where did we land this week?

Carly: Section two of the deck is real and through David. The theme tracker is current. The guide did its job, and the insurer split held up across this week's new interviews.

Marcus: Good week. Week four, three things. We run the last of the thirty interviews early in the week, so the counts stop moving and we can commit to the numbers on the pages. Laura's engineering lead gives us the feasibility read, and that turns the sequencing page from a placeholder into the actual recommendation. And we start the one-page executive summary off the spine David liked.

Carly: I will own the sequencing page once Laura's input is in, and start the executive summary draft.

Marcus: That is the plan. One thing to carry. David wants the money story loud. Every time you touch the roadmap next week, ask whether someone holding a budget can see what a little money buys versus the big bet. That is the lens for week four.

Carly: Got it.

Marcus: Good work this week. Genuinely. Go home.`,
    commentary: `Three weeks in, and for the first time the thing actually feels like an argument instead of a pile of interviews. That is the week the work turns, when here is what we heard becomes here is what they should do about it. Week four it gets concrete: Laura's read tells us what is buildable, and the roadmap stops being a placeholder and becomes the recommendation. That is the part I am actually looking forward to. For now, though, it is Friday, and Marcus saying go home twice is the closest thing to a hard stop this job offers.`,
    after: '',
  },
}

// ── Day-in-the-Life: 6 curated blocks ──────────────────────────────────────────
// Reuse the week blocks verbatim (dialogue + artifacts) and override only the
// day-framed Setting the Scene and the threading over-the-shoulder narration, per
// the curation note. Block 2 (Ellen) is the gold standard reproduced verbatim.

const meridianDITL: Record<string, TimeBlockContent> = {

  // 1. Team frames the day (reframed from the Monday kickoff: day-framing wording
  //    + a threading OTSC). Its dialogue differs slightly from full block 1.
  'management-consultant-meridian-dil-d1-b1': {
    before: `The team starts the day together. David, the Senior Manager who sits above Marcus, joins to take stock and frame the work ahead: what the investor interviews are surfacing, which working hypotheses the team is now testing, and what has to move from raw interviews toward a finished argument. Marcus runs the day to day. Carly has sat in on a string of the investor interviews and owns the synthesis and the first deck pages. This is the room where the day's work gets pointed.`,
    simulatedWork: `David: Morning, both. We're at the halfway mark, so before we get into the day I want to take stock. Marcus, the state of play. Where are we on interviews, and what are they telling us?

Marcus: Fourteen of the thirty done, more coming today, which puts us where we need to be to start locking themes. The headline is more consistent than I expected at this stage. People like Meridian. The investment relationship is good, and they trust the data on the portal. The frustration is almost entirely about what the portal does not do once that data is in front of them.

David: Define what it does not do.

Marcus: It stops at accurate data and leaves the last step to the investor. The pension CIOs we have already been through describe it the same way. They can pull a quarter's capital activity, but not in one consolidated report, so their teams rebuild it by hand to get a number they can put in front of a board. They are paying for a finished product and assembling it themselves.

David: And that is not a one-off.

Marcus: It is the pattern. Carly has been coding it across the whole set. She can speak to how widely it shows up.

Carly: It is the most common thread by a distance. The specific complaint changes, no consolidated capital-activity report, document search that does not really work, re-doing the same subscription paperwork for every new fund, no notification when something posts. But underneath it is the same shape every time. The portal gets them to accurate data and then leaves the assembly to them.

David: Good. That is a clean spine for the story, if it holds. What is the thing that could break it?

Carly: That the shape of the last step is not the same for everyone. The pensions and endowments we have spoken to want a board-ready document at the end. The insurers may want something different, the data as a feed into their own systems rather than a document, because everything they do runs through statutory and regulatory reporting on their side. We have both types still to get through, including Ellen this morning on the pension side, so we keep testing whether that split holds. Same gap, different finish line.

Marcus: Which is a strength if it holds and we frame it right. One theme, the last mile, that shows up differently by investor type. It tells us the problem is structural, not a feature request from one annoyed client.

David: Agreed, as long as we do not let it sprawl into the portal should do everything. Remember what we are actually on the hook for. The SOW is a prioritized target-state recommendation tied to what Meridian can realistically fund, not a wish list. Diane brought us in precisely because she cannot force that prioritization cleanly from inside the firm. So every theme we carry has to survive the question of whether it is worth funding ahead of the next one. A wholesale rebuild of the platform is not on the table this year.

Marcus: Understood. We are building the roadmap phased from the start. Quick wins that do not need a rebuild, then the heavier lifts sequenced behind them.

David: Right. And Laura owns the build and the roadmap on their side. If our phase one is not realistically buildable, she will know in about ten seconds, and we will lose her. So the prioritization has to be honest, not just tidy.

David: Here is what I want us driving toward. A storyline that reads top to bottom, titles only, and holds together. Situation, the relationship is good and the data is accurate. Complication, the portal stops short, and the bar has moved. Resolution, a prioritized, fundable set of improvements. I do not need finished slides. I need the argument to survive me reading only the headlines.

Marcus: That is the plan. Carly takes the lead on turning the last-mile theme into the first real section, and she is sharpening the interview guide so the probes actually test it. I will review her pages before they come anywhere near you.

David: Good. One more thing. There is a client checkpoint coming. Nothing in that room should be a surprise to Diane. We share where the themes are landing, we get her reaction, we adjust. The final readout in week six should feel inevitable to her, not new. Let us not save anything clever for the end.

Marcus: Agreed. I will pre-wire the big pieces with Gregory beforehand so nothing lands cold.

David: Then we are set. Let us get into it.`,
    commentary: `That is the frame for the day. From here it is my actual work, in order: the interview this morning, then cleaning up what we heard while it is fresh, then the room where we argue the themes into shape, then building a real deck page and having Marcus take it apart. In a real week these are spread out and tangled with a dozen other things. I have pulled the clean line through them, because it is the same line every finding travels, from one investor's frustration on a call to a page David will read. First up is the call itself. Marcus leads, I am on notes. The investor is Ellen, a pension CIO, and she has views.`,
    after: '',
  },

  // 2. Ellen interview — the gold standard, reproduced verbatim (scene + interview + debrief).
  'management-consultant-meridian-dil-d1-b2': {
    ...meridianBase['management-consultant-meridian-full-d2-b1'],
  },

  // 3. Note cleanup (full block 7) — fuller standalone scene.
  'management-consultant-meridian-dil-d1-b3': {
    ...meridianBase['management-consultant-meridian-full-d2-b2'],
    before: `The call done, Carly stays at her desk and works the interview notes into shape while Ellen's voice is still fresh. There is no meeting and no call in this block. It is the pair of artifacts that come out of the hour, shown back to back: first the raw notes Carly typed live during the interview, then the cleaned, structured version she rewrites them into. The rough version is how it actually looks mid-call; the clean version is what gets added to the running interview log and coded into the themes.`,
  },

  // 4. Problem-solving session (full block 9) — fuller standalone scene.
  'management-consultant-meridian-dil-d1-b4': {
    ...meridianBase['management-consultant-meridian-full-d3-b1'],
    before: `Later in the day, with more interviews now in the bank, Marcus and Carly sit down for the team's problem-solving session: the working meeting where they compare what they are hearing, attack their own logic, and tighten the themes into something the deck can stand on. By this point the theme tracker carries around twenty completed interviews, more rows than it held at the start of the week. Carly brings the ghost deck and the tracker. This is the hour where loose threads either become a defensible theme or get cut.`,
  },

  // 5. Deck section build (full block 10) — scene lightly extended for the single day.
  'management-consultant-meridian-dil-d1-b5': {
    ...meridianBase['management-consultant-meridian-full-d3-b2'],
    before: `With the themes tightened in the session, Carly turns the complication section of the ghost deck into finished pages. The discipline now is one idea per page, an action-title lead-in that states the so-what, and the synthesized interview evidence sitting underneath it. The artifact is the section as drafted, the version that goes to Marcus for review. This is where the morning's interview, Ellen's words included, starts becoming an actual page.`,
  },

  // 6. Deck review with Marcus (full block 11) — fuller scene + a closing-the-day OTSC appended.
  'management-consultant-meridian-dil-d1-b6': {
    ...meridianBase['management-consultant-meridian-full-d4-b1'],
    before: `With the section drafted, Carly takes it to Marcus. He has her complication section open and walks her through his edits. A meaningful share of it gets restructured, which on a first draft is the norm rather than a verdict on the work. The artifact is one of Carly's pages with Marcus's markup. This is the last stop of the day, where the page she built an hour ago gets pressure-tested before it goes anywhere near David.`,
    commentary: `Marcus reworked the bones of one page out of three and left the other two mostly alone, and the page he tore up was the one where I had crammed four ideas onto a slide because I did not want to waste the space. It stings a little to see a page come back that restructured, and the first instinct is to read it as a grade. It is not. The thing I hold onto is what he said at the end: the thinking was right, the structure was not. Structure I can fix in an hour. So that is the next hour.

That is the loop, start to end. This morning Ellen told us she is paying for a finished product and getting raw ingredients. By this afternoon that exact frustration is sitting in a deck page, coded, counted, argued over with Marcus, and pointed at something Meridian can actually fund. I walked you through it as one clean day. The real version is messier and more interrupted than this, more calls stacked up, more half-built pages waiting on a number. But the line through it is exactly what you just watched: a real person's problem this morning, on its way to a page David can read, by the end of the day.`,
  },
}

export const managementConsultantMeridianContent: Record<string, TimeBlockContent> = {
  ...meridianBase,
  ...meridianDITL,
}
