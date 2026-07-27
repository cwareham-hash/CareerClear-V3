import type { TimeBlockContent } from '../simulation'
import { meridianArtifact01Html }       from './artifacts/meridian-artifact-01-interviewguide'
import { meridianArtifact02Html }       from './artifacts/meridian-artifact-02-themetracker'
import { meridianArtifact03Html }       from './artifacts/meridian-artifact-03-themesummary'
import { meridianArtifact04Html }       from './artifacts/meridian-artifact-04-skeletondeck'
import { meridianArtifact05Html }       from './artifacts/meridian-artifact-05-rawnotes'
import { meridianArtifact06Html }       from './artifacts/meridian-artifact-06-cleannotes'
import { meridianArtifact07Html }       from './artifacts/meridian-artifact-07-gapsfirstdraft'
import { meridianArtifact08MasterHtml } from './artifacts/meridian-artifact-08-gapsmarkup-master'
import { meridianArtifact08DitlHtml }   from './artifacts/meridian-artifact-08-gapsmarkup-ditl'
import { meridianArtifact09Html }       from './artifacts/meridian-artifact-09-gapsrevised'
import { meridianArtifact10Html }       from './artifacts/meridian-artifact-10-smdeckreview'
import { meridianArtifact11Html }       from './artifacts/meridian-artifact-11-engagementeconomics'

// Management Consulting - Project Meridian (Meridian Park investor-portal
// assessment, week 3 of a six-week engagement). Per-project content.
//
// V5 INTEGRATION: every field of every Full-Simulation and Day-in-the-Life block
// re-transcribed from the V5 sources. The four Orientation readings are unchanged
// (the V5 handoff carries no orientation changes). The block STRUCTURE (20-block
// full week, 6-block Day-in-the-Life, 4-reading Orientation, the times, titles, and
// connector schedule) lives in lib/simulation.ts and is unchanged; every block id
// is frozen, because live Supabase user progress references it.
//
// The eleven Markdown `artifact:` work products the V4 integration carried are
// superseded: all fifteen work products now arrive as self-contained HTML modules
// in lib/content/artifacts/, placed at their inline artifact markers.
//
// Sources (transcribed verbatim; prose not paraphrased or trimmed):
//   Meridian_Park_Full_Simulation_Master_V5.md   (full week, blocks 1-20, 11 tokens)
//   Meridian_Park_Day_in_the_Life_V5.md          (the six-block DITL layer, 4 tokens)
//   MERIDIAN_ARTIFACT_CODING_HANDOFF_V1.md       (the 15 token rows and their markers)
//   MERIDIAN_ARTIFACT_MANIFEST.md                (artifact types; onenote renders document)
//   Meridian_Park_Orientation_V3.md              (four briefing readings, unchanged)
//
// Field mapping per block (see BlockContent.tsx for how each renders):
//   before        <- "Setting the Scene", up to its first horizontal rule
//   simulatedWork <- the scene: interview/meeting dialogue and, for individual-work
//                    blocks, the named working sections ("Sharpening the guide",
//                    "Coding the interviews", ...), joined in source order with the
//                    section headings stripped. "" where the block has no scene (the
//                    dinner). Rendered as briefing prose for the learning block and
//                    the four Orientation readings (the briefing flag in
//                    lib/simulation.ts).
//   commentary    <- every "Over-the-shoulder, Carly" section, joined in source order
//   after         <- intentionally BLANK for every block
//
// Transforms applied to the screenplay scene: V5 speaker labels **Name:** -> Name:
// and *italic* stage directions -> [bracketed], so BlockContent's screenplay parser
// reads them; interview beat headers (#### 1. ...) are stripped so each interview
// renders as one continuous conversation. Artifact tokens sit exactly where the
// sources place them.

export const managementConsultantMeridianContent: Record<string, TimeBlockContent> = {
  // -- Orientation (four readings, unchanged from the V4 integration) ---------
  'management-consultant-meridian-orientation-b1': {
    before: ``,
    simulatedWork: `Meridian Park is an alternatives manager. It invests money on behalf of large institutions and runs that money in private markets, meaning investments that are not bought and sold on public stock exchanges. Its two main products are private credit, privately negotiated loans to companies, and infrastructure, the long-lived physical assets like utilities and transport that generate steady cash flows over decades.

The money Meridian manages comes from large institutional investors with long time horizons: public and corporate pension funds, life and property insurers, university endowments, foundations, family offices, and sovereign wealth funds. They commit it for years at a time, and they largely trust Meridian with it. Meridian is good at the investing itself. It has the track record and the relationships that earn that trust.

The way those investors stay connected to what they own is the Meridian Investor Portal, the secure online platform each one uses to pull the financial statements, performance, and documents tied to their investment. For an institution managing billions, the portal is the day-to-day face of its relationship with Meridian, the place its team goes at the end of every quarter to get the numbers it needs.`,
    commentary: ``,
    after: ``,
  },
  'management-consultant-meridian-orientation-b2': {
    before: ``,
    simulatedWork: `Meridian's leadership suspects the portal is falling behind. They hear scattered complaints, they sense their investors are frustrated, and they know competitors are setting a higher standard. What they cannot see clearly is their own platform: which gaps actually matter to investors, how serious each one is, and which to fix first. Leadership cannot see its own platform gaps clearly, and needs an outside, market-benchmarked read to know what to fix and in what order.

That is why Meridian brought in an outside consulting team. Meridian has capable people who could, in theory, study this themselves. But a firm is rarely the best judge of its own product. Different groups inside Meridian hold different views about what matters most and what should be fixed first, the technology budget is limited, and choosing what to build first means telling some of those groups that their priority comes second. An outside team is objective, removed from the internal politics, and an unbiased way to force the hard prioritization the firm cannot cleanly reach on its own.

The engagement is defined by a Statement of Work, or SOW, the contract that sets out exactly what the team is responsible for delivering. Here, that is a prioritized, fundable recommendation: a clear view of the gaps and a phased plan to close them, tied to what Meridian can realistically afford. It is explicitly not a wish list, and not a wholesale rebuild of the platform. The whole value is in the prioritization.

What is at stake is real. Some of Meridian's investors are among its largest relationships, and they are the ones asking the hardest questions about whether the firm is keeping up. The portal is not going to lose Meridian its investors tomorrow, but in a market where the bar keeps rising, standing still is its own kind of risk.`,
    commentary: ``,
    after: ``,
  },
  'management-consultant-meridian-orientation-b3': {
    before: ``,
    simulatedWork: `The team's method is straightforward: talk to the people who actually use the portal. Over the six-week engagement, the team interviews thirty of Meridian's investors, almost always the chief investment officer, or CIO, the senior person responsible for an institution's entire investment program, about how they use the portal, where it works, and where it falls short. The team then synthesizes those conversations into a small number of themes, and turns the themes into a prioritized recommendation deck for Meridian's leadership. It is currently week three of the six, the middle of the engagement, when the interviews are still underway and the recommendation is beginning to take shape.

The people involved:

**On the consulting team.** David is the Senior Manager. He leads the engagement and is its senior face with Meridian, and he pressure-tests the work at the altitude the client's leadership will see it. Marcus is the Manager. He runs the day-to-day work, leads the interviews, and shapes the analysis. Carly is the first-year consultant, the most junior person on the team.

**On the client side, inside Meridian.** Diane is the Global Head of Client Solutions and the project sponsor: she hired the team, she owns the portal's strategy and its budget, and she is the one who will have to carry the recommendation to her own leadership and fund it. She is the most important relationship on the engagement. Gregory is the Head of Investor Relations, whose team runs the portal day-to-day and absorbs the investor requests the gaps create. Laura is the Head of Technology, who owns what can actually be built, and whose read on feasibility decides whether any recommendation is real.

**The investors.** Two of the thirty interviews are with Ellen, the chief investment officer of a public pension fund, and Raymond, the chief investment officer of a life insurer.`,
    commentary: ``,
    after: ``,
  },
  'management-consultant-meridian-orientation-b4': {
    before: ``,
    simulatedWork: `You are shadowing Carly, the first-year consultant, watching the engagement over her shoulder and seeing it through her lens. Her work this week is the everyday work of a junior on an engagement like this: she sits in on the investor interviews and takes the notes, keeps the running tracker of what each investor says, and builds the first real section of the recommendation deck. Everything she produces goes to Marcus, who reviews and shapes it before it goes any further. In the solo work blocks, where she is heads-down on her own, a note cleanup or a deck page, she speaks to you directly in the first person as she works, thinking aloud in the same voice she uses to talk you through the rest of the day. It is worth expecting that shift before the first solo block arrives.

A few terms will come up often. They are worth knowing now so the conversations land without stopping to explain them.

- **Alternatives manager** (or alts manager): a firm, like Meridian, that invests in private markets, investments not traded on public stock exchanges, on behalf of large institutions.
- **Private markets:** investments bought privately rather than on a public exchange. Meridian's two products here are private credit (privately negotiated loans to companies) and infrastructure (long-lived assets like utilities and transport).
- **The investor portal:** the Meridian Investor Portal, the secure online platform investors use to pull financial statements, performance, and documents. The subject of the entire engagement.
- **LP and GP:** the investors are the limited partners, or LPs; the manager, Meridian, is the general partner, or GP. The LPs commit money, and the GP invests it.
- **Capital call and distribution:** a capital call is when the manager asks investors for some of the money they have committed; a distribution is when the manager returns money as the investments pay off. Both arrive as time-sensitive notices on the portal.
- **CIO:** chief investment officer, the senior executive who runs an institution's whole investment program. The person the team interviews at each investor.
- **KYC:** know your customer, the identity and compliance paperwork an investor has to submit to invest in a fund. Having to redo it for every new fund is one of the gaps the interviews surface.
- **SOW:** the Statement of Work, the contract that sets out what the team is responsible for delivering.`,
    commentary: ``,
    after: ``,
  },

  // ── Full Simulation (20 blocks, Monday to Friday) ─────────────────────────
  'management-consultant-meridian-full-d1-b1': {
    before: `The team gathers in a team meeting room at the firm's New York office, its home base for the engagement, for the weekly kickoff. David, the Senior Manager who sits above Marcus, joins to do a pulse check at the halfway mark: what the interviews so far are surfacing, which working hypotheses the team is now testing, and what has to get done this week. Marcus, the Manager, runs the day-to-day. Carly has sat in on a string of the investor interviews and owns the synthesis and the first deck pages.`,
    simulatedWork: `David: Morning, both. Let's keep this to the half hour, I'm due on another call at the top of the hour. We're at the halfway mark, so before we get into this week I want to see where we stand, and I want to walk out with a clean read on what each of you is landing by Friday. Marcus, bring me up to speed on the interviews. Are we tracking to get through the full interview list with room to spare before the readout, and what are they telling us so far?

Marcus: We're about halfway through. Tuesday and Wednesday get us another six or seven, which puts us where we need to be to start locking themes. On track to finish the full list well before the readout. The headline's more consistent than I expected at this stage. Meridian's investors like the firm, the investment relationship's good, and they trust the data on the portal. The frustration's almost entirely about what the portal doesn't do once that data is in front of them.

David: Define what it doesn't do.

Marcus: The portal stops at providing accurate data and leaves the last step to the investor. The pension CIOs we've already spoken to describe it the same way. They can pull a quarter's capital activity, but not in one consolidated report, so their teams rebuild it by hand to get a number they can put in front of a board. They're paying for a finished product and assembling it themselves.

David: And that's not a one-off?

Marcus: It's the pattern. Carly's been coding it across the whole set, logging the themes out of each interview into the tracker, so she can speak to how widely it actually shows up better than I can.

Carly: It's the most common thread by a significant amount. The specific complaint changes, no consolidated capital-activity report, document search that doesn't really work, re-doing the same subscription paperwork for every new fund, no notification when something posts. But underneath, it's the same shape every time. The portal gets them to accurate data and then leaves the assembly to them.

David: Good. That's a clean foundation for the story, if it holds.

[David turns to the whiteboard and writes a single line: accurate data, then an arrow, then finished output, with a question mark over the arrow.]

David: That gap over the arrow is the whole engagement. Where's it most likely to break?

Marcus: The main risk is that the last step isn't the same for every investor. The pensions and endowments we've spoken to want a board-ready document at the end. The insurers may want something different, the data as a feed into their own systems rather than a document, because everything they run goes through statutory and regulatory reporting on their side. Carly's got both types coded, so she can say how the split's looking so far.

Carly: It's holding so far. The document-led investors and the data-led ones describe the same underlying gap, they just need a different finished product at the end. We've got a pension CIO and a life insurer back to back tomorrow, so we'll get a clean test of it.

David: And how's that split looking so far, roughly?

Carly: Early, but it's holding. The data-led ones are a smaller slice of what we've done, and their scores run harder. I'd want more of them in before I lean on it.

David: Fair. Let it fill in before we weight it.

Marcus: Which is a strength if it holds and we frame it right. One theme, the last mile, that shows up differently by investor type, and it's the same gap with a different finish line. It tells us the problem's structural, not a feature request from one annoyed client.

David: Agreed, as long as we don't let it sprawl into the portal should do everything. Remember what we're actually here to deliver. This is a gap analysis: we get an accurate read on the current state, we define the desired future state, and we hand Meridian a prioritized set of recommendations to close the difference, sequenced to what they can realistically fund. Two different jobs in there, and we keep them separate. As we synthesize, we capture the full client wishlist, everything the investors ask for, and then refining that wishlist down into the recommendation is its own exercise. Diane brought us in precisely because she can't force that prioritization cleanly from inside the firm. So every theme we carry has to survive the question of whether it's worth funding ahead of the next one, and a wholesale rebuild of the platform isn't on the table this year.

Carly: Quick one so I build it the right way. The full wishlist, everything anyone asked for, that lives in the tracker and the appendix, and the recommendation section only carries what survives the funding cut. Is that the split you want, or do you want the wishlist visible in the body too?

David: Tracker and appendix for the wishlist, so nobody thinks we missed a thing they said. The recommendation is the refined cut. Keep those two visibly apart and you've already sidestepped the way these decks usually go wrong, which is reading like a list of everything everyone wanted.

David: And put numbers on the themes as they firm up. When I read the storyline Friday, I don't just want to see that the last mile is the big one. I want to know how many of the thirty raised each gap, and where you could get a time or a cost behind it. A theme with a count survives a room. A theme that's a feeling gets argued with.

Carly: The tracker's already carrying the counts and every quantification we can harvest, the analyst-days figures and the scores. I'll make sure each theme lands with a number behind it, not just a name.

David: That's what I want to see. The number is what turns a complaint into a finding.

Marcus: Understood. We're building the roadmap phased from the start. Quick wins that don't need a rebuild, then the heavier lifts sequenced behind them.

David: Right. And Laura owns the build and the roadmap on their side. If our phase one isn't realistically buildable, she'll know in about ten seconds, and we'll lose her. So the prioritization has to be honest, not just tidy. I'd rather hand her a short phase one that's real than a long one she laughs at.

David: Here's what I want out of the week. By Friday I want to read the storyline top to bottom, the titles only, and have it hold together. It should walk the gap in plain terms: where Meridian is today, the relationship's good and the data's accurate; where a best-in-class portal would get these investors, the finished output they actually need; the gaps between the two; and a prioritized, fundable set of recommendations to close them. I don't need finished slides. I need the argument to survive me reading only the headlines. And let's not lock the section order until I've read it, if the by-type story turns out stronger than the flow we've got, we move it then, not now. Park that one.

Marcus: That's the plan. Carly takes the lead on turning the last-mile theme into the first real section, and she's sharpening this week's interview guide so the probes actually test it. I'll have reviewed and iterated on her pages with her midweek before we share the next version with you.

David: Good. Carly, that section's yours to shape, not just to assemble. You've been in the room for these calls, so if the storyline wants to go somewhere the skeleton doesn't, say so before you build it, not after.

Carly: Will do. I've got a couple of instincts on ordering already. I'll bring them to Marcus midweek rather than sit on them.

David: One more thing. The client checkpoint is Thursday. Nothing in that room should be a surprise to Diane. We share where the themes are landing, we get her reaction, we adjust. The final readout in week six should feel inevitable to her, not new. Let's not save anything clever for the end.

Marcus: Agreed. I'll walk Gregory through the big pieces ahead of Thursday so nothing lands cold.

David: Good. And keep that walk-through to the themes, not the recommendations. Thursday is where we test whether the gaps land with Diane, not where we hand her answers. If the themes are right, the recommendations write themselves later, and they'll feel like hers when they come.

Marcus: That's how I'll frame it with Gregory. Themes now, the fix later.

David: [glancing at the clock as he caps the marker] Then we're set. Good week, everyone.`,
    commentary: ``,
    after: ``,
  },
  'management-consultant-meridian-full-d1-b2': {
    before: `After David drops off, Marcus and Carly stay back in the same meeting room for a few minutes to turn the kickoff into Carly's actual to-do list for the week.`,
    simulatedWork: `Marcus: Before I pile on, anything from the kickoff you want me to clarify on what's yours this week?

Carly: No, I think I'm clear. The guide, the tracker, and the deck skeleton.

Marcus: Right, those are the three. Let me put some points of emphasis on each, because the weight and the order matter more than the list does.

Marcus: First, the interview guide. We've got seven investors across tomorrow and Wednesday. I don't want a generic guide. I want it sharpened to test the last-mile hypothesis specifically, with the probes that pull apart the document-led investors from the data-led ones. Lean the guide toward the questions that test what we're trying to prove, without dropping the ones that still earn their place.

Carly: So tailor it to the hypotheses, not just rerun the base guide?

Marcus: Exactly. The base guide's a fine spine, it covers the ground. What it doesn't do is force the distinction we actually care about, whether someone wants a finished document or raw data. Add the probes that make an investor show you which one they are, and give those the airtime.

Carly: Got it. I'll build the split right into the core section so it's not an afterthought at the end.

Marcus: Good. Second, keep the theme tracker current as the interviews come in, and start putting numbers on it. You saw David just now, he's going to want to know how many of the thirty raised each gap, not just that it comes up a lot. So some light quantification: the counts, the score spread, and the time estimates people give us.

Carly: I've got a couple-of-analyst-days-a-quarter figure in there already from one of the pension calls. I'll make sure every interview leaves a number behind where we can get one.

Marcus: That's the habit I want. A theme with a count behind it survives a room. A theme that's just a feeling gets argued with, and I don't want us defending feelings in front of Diane. Where someone won't give you a number, flag the gap so we can see where we're still thin, rather than letting a blank look filled.

Carly: Understood. Blanks stay visible.

Marcus: Third, and this is the big one, start the deck. It doesn't have to be finished, polished slides yet. Just the skeleton deck for the last-mile section: storyline first, action titles, then we build the evidence under them. Get me a skeleton I can react to before Wednesday's problem-solving session.

Carly: Understood. Guide today, tracker rolling through the interviews, skeleton deck by Wednesday.

Marcus: That's it. And don't get ahead of yourself on the recommendations. The skeleton I want is the current state and the gaps, the argument that there's a problem worth solving. We shape the fix together once the gaps are firm, not before.

Carly: So the skeleton stops at the gaps for now, and the recommendations stay a placeholder.

Marcus: For now. And don't polish anything yet. I'd rather see a rough skeleton early than a pretty slide late. Show me the thinking and we'll shape it together.`,
    commentary: `Three things, and the order matters more than the count. The guide has to be ready before tomorrow or the interviews are half wasted, so that's this morning, before anything else. The tracker I keep alive as I go, a row and a number after each call rather than a scramble at the end of the week. The skeleton deck is the one I actually have to think hardest about, because if the storyline doesn't hold, nothing I build on top of it will either, and I'd rather find that out Wednesday with Marcus than in week five. The part I've learned to take literally here is show me the thinking. He genuinely wants the rough version, early, not me disappearing for two days and reappearing with something shiny that's built on the wrong foundation. So the plan is the unglamorous order: guide now, tracker as I go, and a rough skeleton in his hands before the problem-solving session, ugly and right rather than pretty and late.`,
    after: ``,
  },
  'management-consultant-meridian-full-d1-b3': {
    before: `Carly settles in at her desk in the New York office to sharpen this week's interview guide before tomorrow's calls. The team interviews seven more investors across Tuesday and Wednesday, and the guide is the tool that keeps each conversation tethered to what the team is trying to prove. The artifact is the guide itself, tailored from the base version to test this week's hypotheses.`,
    simulatedWork: `First pass is the base guide, heard the way the interviewee will hear it, top to bottom. The opening and the warm-up survive almost untouched, the thank-you, the busy-season line, the confidentiality note, the time check, and the warm-up that opens on the person before the institution. The work is the core, where the base guide is too polite, it asks where the portal falls short and lets the investor wander. I'm keeping it broad at the open, the first answer should be theirs, then narrowing it onto the four gaps I already suspect, each paired with the question that turns a feeling into a number.

Under each gap the guide gets its quantification follow-up, so I don't forget it live. Consolidated reporting gets, who does the assembly, and how much of their time per quarter. Document search gets, how often, and how long to get the thing. Onboarding gets, how many funds, and how many times you re-sent the same paperwork. Notifications gets, how do you even find out, and has a late notice ever cost you. Every gap gets its cost question, the number is what lets it survive a room.

The fork is where I spend the most time, it's the whole hypothesis. When the portal falls short, what's the finished thing you actually needed? My first version of it is lazy, it basically asks, do you want a document or do you want data, which hands the investor the answer and tips our hand. That's leading the witness. So I open it up instead: when the portal gets you to accurate data and then stops, what were you trying to produce, and who was it for? The follow-ups branch underneath, for me and not for them. Document-led, a pension or endowment or foundation, and I steer toward the board-ready or committee-ready report. Data-led, an insurer, and I steer toward structured data, a feed into their own systems, and the look-through detail for capital charges. Same open question up top, two threads to pull depending which way they lean.

Then I trim to the clock, it's thirty minutes. The benchmark question stays, but phrased neutrally, where do your other managers sit, not where do your better managers sit, so I'm not planting a comparison that might not exist. The questions that don't test the split get shorter, not cut, in my back pocket to skip live rather than gone.

Last, the tailoring note at the bottom, since this week's slate isn't uniform. Two corporate pensions and an endowment lean document, so those get marked for the board-ready probes. Two insurers lean data, so those get the feed and look-through probes, with a reminder to expect a wider score spread, their downstream is a regulator, not a board. A sovereign wealth allocator and a large family office are the first of either type on the slate, and I genuinely don't know which way they'll go, so the note says, for those, open on usage, let them set the frame, narrow later.

{{artifact:1}}`,
    commentary: `We've got a couple of hypotheses now, so the guide I'm sharpening this morning has one job: test them, not fish. Most of the base questions stay. What I'm adding are the sharper probes that force the difference between an investor who wants a finished document and one who wants raw data, because that distinction is the through-line of the whole story. The pull is always to ask everything while I've got them on the call, so I'm reprioritizing toward the questions that actually test the hypotheses and giving less time to the ones that don't, rather than dropping anything good.

That's the guide done, and it only really gets tested tomorrow, in the room, not here at my desk. A guide that reads well and quietly leads the witness is worse than a rough one that just lets the investor talk, so the version that matters is the one I'll adjust between calls once I see where it drags. For now it's ready. The rest of today turns from gathering to shaping, the tracker and then the first pass at the deck, but the guide's part is finished until it meets a live investor tomorrow morning.`,
    after: ``,
    artifactsHtml: { 1: { type: 'document', html: meridianArtifact01Html } },
  },
  'management-consultant-meridian-full-d1-b4': {
    before: `With the guide done, Carly turns to the running theme tracker: the master sheet where every completed interview gets coded into themes and the soft, felt complaints start becoming numbers the team can defend. This is where qualitative material becomes a finding. The artifact is the tracker as it stands at the week-3 midpoint, with twelve of the thirty interviews completed and coded.`,
    simulatedWork: `The tracker is a grid: one row per interview, one column per gap, plus the scores and a column for the shape of the finished thing each investor was missing. I'm working it one interview at a time, the cleaned write-up against the grid, and for each gap the question is single, did they actually raise this, a Y only if the answer's yes.

I'm only coding what they said, not what I'd bet they'd say. If a pension never mentioned notifications, that cell stays blank, even though I'd put money on them complaining if I'd asked. The blanks are data too, an unprompted gap is stronger than one we had to go looking for. So the cells I can't actually support stay blank.

The scores go in as they gave them, Meridian's number and their best other manager's number, side by side. The quantification goes wherever I have it, an analyst's couple of days a quarter, a team's week around a filing, hours chasing a document, straight into the cell. Where they only gave me a feeling, the cell stays empty and flagged, a to-do for the next round of calls rather than a guess.

A couple of rows don't code cleanly, worth slowing down on. One family office barely complained and scored Meridian high, almost no Y's across the row. It goes down honestly, a nearly empty row, a story that pretends everyone's miserable falls apart the moment someone finds the one who isn't. And the sovereign wealth allocator wanted a third flavor of document, something an investment committee signs off rather than a pension board, so that shape goes into the last column exactly, not flattened into the others. That column is where the document-led and data-led split first shows, so it's worth the precision.

Onboarding is the one coding call I have to think about. It's raised by about half the group so far, so it clears the bar. But it doesn't sit like the others, the consolidated report, the search, the notifications are all the reporting cycle, getting data out when the stakes are highest, while onboarding is the front end, before any reporting, and felt by an operations team, not the CIO. It goes down as raised, but with an open question at the bottom of the sheet instead of quietly filing it under the last-mile umbrella: does it belong with the reporting-cycle gaps, or is it its own theme? Not a call I make alone at my desk. It goes to the group on Wednesday.

Then, across the whole matrix, the rows turn into the count, which is the part that earns the hour. One clunky-portal comment is an anecdote, the same complaint in most of the rows is a finding, and a finding with a number under it is harder to wave away. So I total each gap and work out the score spread, an average for Meridian against an average for the best other manager, carrying the quantified pain through wherever I harvested it. The spread says it on its own, the gap between the two averages isn't accuracy, everyone credits that, it's the last mile, the step from accurate data to the finished thing.

The last thing I'm careful about is not overselling the thin columns. The data-feed and look-through gap only shows up for the insurers so far, a small slice of what we've done, so I band it as high for insurers rather than high across the board. It matters to the ones it matters to, sharply, but three of twelve isn't the whole book, and if I let a loud few set the impact band, the roadmap tips toward a build that serves almost nobody. The grid's job is to keep me honest about how widespread each thing actually is, not just how loud it was in the room.

{{artifact:1}}

{{artifact:2}}`,
    commentary: `So this hour is mostly me reading through the completed interviews, tagging each one against the themes, and pulling out every number we managed to get. The reason I work it this way: a single quote is just an anecdote, and one CIO finding the reporting clunky doesn't survive a room with the client's leadership in it. Eight of the twelve investors we've spoken to so far raise the consolidated-reporting gap, and the ones who put a number on it lose one to two analyst-days a quarter to manual assembly. It's the same complaint again and again, and once it's counted it stops being an anecdote and becomes a finding. Where someone gave us a time estimate or a score, it goes in a cell. Where they only gave us a feeling, I flag it, so we can see the data point is still missing.

That's the tracker current and the count pulled, which is what turns a stack of separate conversations into something a deck can lean on. Two things carry out of this hour. The first is the open question I flagged, whether onboarding belongs with the reporting-cycle gaps or stands on its own, and that isn't mine to settle alone, so it goes to the team on Wednesday. The second is the count itself, the raised-by numbers and the score spread, because that's the evidence I'll set underneath the titles when I build the skeleton after lunch. Up to now the story's been a hypothesis. After this hour it's a hypothesis with a tally behind it, and this afternoon I find out whether the tally actually holds a storyline or just a pile of gaps. Either way the numbers travel with me into that build, because a title I can't put a count under is a title Marcus will make me cut.`,
    after: ``,
    artifactsHtml: { 1: { type: 'excel', html: meridianArtifact02Html }, 2: { type: 'excel', html: meridianArtifact03Html } },
  },
  'management-consultant-meridian-full-d1-b5': {
    before: `After lunch, Carly builds the skeleton of the recommendation deck before touching a single finished slide. The work is the storyline: the order of the argument and the action-title lead-ins, with placeholders where the evidence will go. The artifact is the skeleton deck.`,
    simulatedWork: `I'm not starting at the executive summary, even though it sits first, you can't summarize an argument you haven't built. That page comes last. I'm starting where the story has to start to earn its way to the gap: the current state.

Section one is three slides, each title a full sentence that says its own point. The first credits what works, the relationship's good and the data's accurate, on purpose, because leading with complaints would sound like a grievance and lose the room early. The second, investors lean on the portal hardest at the reporting cycle, when the stakes are highest. The third is the pivot: the portal stops at accurate data and leaves investors to assemble the finished output themselves. That's the last-mile line, everything after it either proves it or closes it.

I catch myself reaching for a punchy fragment on that first title, something clipped that looks good alone, and I cut it, a fragment says nothing in a stack. Each title has to be a full sentence someone could nod at on its own.

Section two is the future state, where the bar sits. One slide, investors already get consolidated, exportable, notified data from their best managers, the ones scoring eight and nine against Meridian's six, so the bar's moved and Meridian's behind it. The next, the target state delivers the finished output each type needs, board-ready documents for the document-led, system-ready data for the data-led. That's the two-finish-lines idea, the cleanest thing in the deck, so it gets its own page.

Section three is the gaps, the heart of it. A lead slide, a small number of recurring gaps drive most of the manual work. Then the split by investor type, pensions need documents, insurers need data. Then the sharper version for the data-led, the same gap costs more when the downstream is a regulatory filing, not a board slide. And the one I'm least sure how to place, the root cause under all of it, the platform has no memory and doesn't reach out, so every interaction starts from scratch. Onboarding wants to live there, as an example of the no-memory problem, but it doesn't quite behave like the reporting-cycle gaps, and the section strains to hold both. It goes in as the root-cause slide for now, with a note that this is the thing to settle on Wednesday, not force alone.

Section four, the recommendations, and here I do almost nothing on purpose. Marcus was clear, don't get ahead of the fix, and I don't know what's realistically buildable until Laura's team weighs in on phase one. So there's one title I can stand behind, closing the gaps doesn't require rebuilding the platform, and the phase slides stay honest placeholders, quick wins then the heavier lifts, sequenced, the actual titles held until the gaps firm up and the client says what's buildable. A placeholder beats a promise here.

The appendix is where everything that doesn't fit an executive's time goes, the back third, the per-interview detail, the full tracker, the methodology and the count, the score table. The wishlist lives there too, everything every investor asked for, so nobody thinks we lost it. Sections three and four are the refined cut of that wishlist, not the wishlist itself, and keeping the two visibly separate is half of not letting the deck read like a list of everything anyone wanted.

Only then does the executive summary get its rough shape, the answer on one page, now there's an argument to summarize. Then the test I trust, the titles alone, top to bottom, sections one through three, whether they hold as a paragraph. They do. Section four doesn't yet, which is right, the placeholders stay empty until the gaps lock. That's the version that goes to Marcus, titles that argue and a section that's honestly unfinished, the logic's cheapest to fix while it's still just sentences on a page.

{{artifact:1}}`,
    commentary: `There's a discipline here that took me a while to trust: settle the argument before anything starts looking like a slide. Open the charting tools too early and I'll fall in love with a pretty chart and bend the story to fit it. So the titles come first, full sentences in order, and the test is whether they hold together as a paragraph on their own. If they do, the argument holds. If they don't, no amount of formatting later will save it. This is also the version Marcus actually wants to react to on Wednesday, because the logic's cheapest to change while it's still just titles on a page.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: meridianArtifact04Html } },
  },
  'management-consultant-meridian-full-d2-b1': {
    before: `Carly and her manager Marcus are joining a scheduled video call, from their consulting firm's New York office, with Ellen, the Chief Investment Officer of a public pension fund that invests in one of Meridian Park's private credit funds. The team is partway through a round of interviews with Meridian's investors, gathering candid feedback on the investor platform to find where it falls short. Ellen is one of those investors. Marcus will lead the conversation; Carly is here to take notes and listen for what matters.`,
    simulatedWork: `[Marcus and Carly are on the call, cameras on, a blank notes doc already open on Carly's second screen. Ellen joins about forty-five seconds later.]

Marcus: Ellen, hi. I'm sure this is a busy stretch with quarter-end, so I really appreciate you making the time. I'm Marcus, and this is my colleague Carly.

[Carly smiles on camera.]

Ellen: Hi both. Happy to do it, honestly glad to hear Meridian's putting some work into the platform. There's room for improvement.

Marcus: That's exactly what we're here for. Just some brief context and a reminder on the scope before we dive in: Meridian brought us in to get an outside read on how the Meridian Investor Portal is really working for the investors who use it, rather than the people internally who aren't living in it the way you are. So we'd just love your candid feedback, what's working and, more useful for us, what isn't. And none of your feedback will ever be attributed back to you individually, we take everything we hear across these conversations and synthesize it into themes and recommendations for Meridian. Carly here will mostly be heads-down taking notes while we talk. We've got a handful of questions we'd like to walk through, but we'll follow up where it's useful and just see where the conversation takes us. Does all that sound good to you?

Ellen: Sounds good. You may get more than you bargained for.

[Marcus laughs.]

Marcus: That's exactly what we'd like to hear. We've got thirty minutes scheduled, do you have a hard stop?

Ellen: I do, so let's keep it to the thirty.

Marcus: Perfect. Let's get into it.

Marcus: So before we get into the platform itself, could you tell me a little about your own role? How long you've been with the fund, and what you are overseeing there?

Ellen: Sure. I'm the CIO, I've been here about nine years, the last four in this seat. So I'm responsible for the whole investment program, across asset classes. We're a public pension system, managing retirement assets for state employees, a little north of twelve billion in total.

Marcus: Thank you, that's helpful. And how long has the fund been investing with Meridian, and in what capacity?

Ellen: About six years. They run a slice of our private credit allocation. That piece has grown a fair amount since we started, though I won't get into the specifics, but it's a bigger part of the book than it used to be.

Marcus: Understood, no need to get into the numbers. So with private credit specifically, walk me through how you actually interact with the Meridian Investor Portal day-to-day. What are you logging in to do, and how often?

Ellen: It varies quite a bit. Month-end and quarter-end are the heavy times, that's when I'm in the portal pulling statements, performance, the capital activity for the period, the things I need for our own board reporting. Between those it's more ad hoc, someone on my team needs a document, or an investor relations question comes in and I have to go find the answer. So a few times a week normally, and then a lot around the reporting cycle. When we're closing a quarter, honestly, it's constant, me and the whole team, in and out of it all day.

Marcus: When you say the whole team, how many people is that, and what are they in there doing during a close?

Ellen: It's a small group, a handful of analysts and me, and during a close every one of them is in the portal at some point. One's pulling performance, one's on the capital activity, someone's chasing a document an auditor wants. It's not that any single task is hard. It's that there are a dozen small retrievals, and they all land in the same compressed window, because the board calendar doesn't move to suit us. So the portal being a step slower than it should be gets multiplied across the whole team, right when we have the least room for it.

Marcus: Got it. So it sounds like the reporting cycle is really where the portal gets put through its paces?

Ellen: That's exactly when it gets tested. And I'll be honest, that's when it costs me the most.

Marcus: Let's talk about that further. Could you describe what starts to become an issue for you, and elaborate a bit on where it comes from?

Ellen: The honest answer is that almost nothing I need comes out in one step. Take the capital activity for the quarter, the calls and distributions across the period. I can't pull a single clean report that gives me the whole picture. I end up opening statements one at a time and stitching them together in my own spreadsheet to get to the number I actually need for the board. It's not that any single document is hard to open. It's that the thing I actually need lives spread across a dozen of them, and the portal never once puts it together for me.

Marcus: When you say stitching together, is that you, or your team doing the rebuilding?

Ellen: My team. There's an unnecessary amount of time spent just pulling these reports, and it feels incredibly manual. The data's all in there. Getting it out in a shape I can actually hand to the board is the part that's painful, and for what we pay in fees, that's a little hard to swallow.

Marcus: So it's less that the information is missing, and more that the platform makes you do the assembly yourself?

Ellen: That's exactly it. I'm paying for a finished product and getting raw ingredients.

Marcus: Take me into the mechanics of it for a second. When your team does that assembly, what does it physically look like?

Ellen: It looks like someone with a dozen statements open, copying figures into a spreadsheet we maintain ourselves, one that has to be checked line by line, because a single transposed number in a board report is not a small thing. Then it gets reconciled back against the statements to make sure nothing was fat-fingered. It's careful work, and it's completely mechanical, which is the worst combination, high stakes and no thinking in it. If the portal produced the consolidated view, that entire step would simply not exist.

Marcus: Can you put a rough number on it? In a typical week, how much of your analyst's time goes to pulling and rebuilding this data?

[Ellen thinks about it for a moment.]

Ellen: It's hard to say exactly, but it's a meaningful share of those weeks. If I had to put something on it, the better part of a couple of days, just on the assembly, before anyone's actually looked at the numbers or thought about what they mean. That's the part that bothers me. The thinking is the job. The assembly shouldn't be.

Marcus: That's helpful, even a rough estimate. Let me just play that back to make sure I've got the shape of it: the data itself is accurate, it's all there, but a real chunk of your team's time in those weeks goes to turning it into something usable before anyone even gets to the actual analysis.

Ellen: That's it exactly. You've got it.

Marcus: Before we move off the capital activity, help me understand the other end of it. Once your team has assembled that number, where does it actually go?

Ellen: It goes to our board, or really to the investment committee of the board, which is the group that oversees the program on their behalf. They meet quarterly, and the private markets are one line item on a much longer agenda. So what they want from me is the clean version: here is the capital that went out this quarter, here is what came back, here is where we stand against the plan. One consolidated view they can absorb in a couple of minutes, because a couple of minutes is about what this allocation gets in that room. They don't want to see the dozen statements underneath it, and they certainly don't want to see the spreadsheet my team built to get there. They want the finished picture.

Marcus: So the assembly work is invisible to them by design?

Ellen: It has to be. Nobody on that committee should be thinking about how the number was produced. That's my job, not theirs. Which is exactly why it frustrates me that the portal makes the production so manual. The output has to look effortless in that room, and the only way it looks effortless is a lot of effort nobody sees.

Marcus: When you say board-ready, is that a specific format, or more a general standard of polish?

Ellen: It's fairly specific. One page, our own template, the capital activity laid out the way the committee has seen it every quarter for years, so they can compare this quarter to the last without relearning the layout. Consistency is half of it. If the numbers arrive in a different shape each time, the committee spends its attention on the shape instead of the substance. So my team isn't just assembling the number, they're forcing it back into a format the portal has never once produced, every single quarter.

Marcus: And is this specific to the capital activity reporting, or do you run into the same wall in other parts of the portal?

Ellen: It's not just that. Honestly, the one that gets me on a normal day is just finding a document. If our auditors ask for a specific quarterly statement from two years ago, or I need a particular notice, I can rarely just go in and find it. The search doesn't really work the way you'd expect. More often than not I end up emailing our relationship manager at Meridian and asking them to send it over.

Marcus: So you're going back to a person to retrieve something the portal is supposed to give you self-service?

Ellen: Right. And to be fair, they're responsive, I usually get it within a day. But that's a day, for something I should be able to get in thirty seconds myself. It adds up, and it's the kind of thing that makes the whole platform feel a step behind.

Marcus: You mentioned auditors. Is that the usual trigger, an external request, or does it come up in your own work too?

Ellen: Both, but the audit is when it really stings, because that's someone else's clock. Our external auditors come in once a year and ask for specific statements and notices going back years, and I'm the one who has to produce them. The trouble is the search matches on the wrong things, so a query pulls up everything or nothing, and there's no filter by fund or period or document type that reliably narrows it. When I can't pull the document myself, I'm emailing my relationship manager and then waiting, while an auditor sits there expecting something I supposedly have access to. It makes us look slower than we are. For my own work I can usually manage, I know roughly where things live. Under an audit request there's no working around it, I need the exact document, and the search either finds it or it doesn't, and too often it doesn't.

Marcus: That's useful. I'd like to shift to a different part of the relationship for a moment, the front end of it. When you've committed to a new Meridian fund, or added to your existing allocation, how does the onboarding and subscription paperwork tend to go?

Ellen: That's actually a sore spot, more for my operations team than for me directly, but I hear about it. Every time we come into a new fund, we're essentially starting the paperwork from scratch. The same entity information, the same authorized signatories, the same supporting documentation we've handed over several times already. None of it carries across from the funds we're already in. So my team is re-keying and re-sending things Meridian already has on file somewhere. And it's not a light lift each time, it's the whole package, as if we'd never done it before.

Marcus: And how many Meridian funds are you in at this point, across the allocation?

Ellen: We're in four of their funds now. Which is rather the point. By the fourth one, the idea that I'm sending over the same formation documents and signatory list again is a little absurd. They have all of it.

Marcus: So even by the fourth fund, none of what you've already given them carries forward?

Ellen: None of it. Every time is a first time, as far as the paperwork is concerned.

Marcus: And when you say your operations team feels it, what does that actually look like for them?

Ellen: It looks like my operations people rekeying entity details and re-collecting signatures that Meridian already has on file, for a fund we're backing precisely because we already trust them. There's a small indignity in it that wears on people. My head of operations raised it with me directly after the last one, which is honestly why it's on my radar at all. It isn't the biggest thing on this list, but it may be the most needless.

Marcus: Is that typical across your managers, or do some handle the repeat paperwork better?

Ellen: The better ones handle it well. When I go into a second or third fund with a manager who has their act together, they come back with most of it already filled in, and they only ask me to confirm what's actually changed since last time, a new signatory, an updated address. That's the difference. It tells me they're treating us as an existing relationship, not a brand new one every time.

Marcus: And is that a heavy lift for them, do you think, or does it just look like they've kept your file?

Ellen: It looks like they've kept our file, which is all it really is. They hold what they already collected, and they present it back to me to confirm rather than to re-enter. It isn't sophisticated. That's what makes Meridian's version frustrating, it's not that the better approach is hard or clever, it's that it's obvious, and they simply haven't built it. When the fix is that mundane and it still isn't there, you start to read it as a question of priority rather than difficulty.

Marcus: Got it. Coming back to the day-to-day for a second. Earlier you mentioned the capital calls and distributions. I'm curious how you actually find out when one of those, or any new document, lands in the portal. Does it tell you, or are you going to look?

Ellen: It's on me to go and look. The portal itself doesn't really tell me anything. What happens in practice is that our relationship manager emails me when a call is coming, and I do appreciate that, but it means I'm leaning on an email rather than the system. If that email is late, or it lands while I'm traveling, the first time I'm seeing a call notice might be well into the window I have to fund it. And the window to fund a call is never generous, so being a day or two behind on even seeing it is not nothing.

Marcus: Has that ever actually cost you? A call you saw too late, or a funding you had to scramble on?

Ellen: Nothing's gone wrong in a way I'd put in front of my board, no. But there have been a couple of times I've had to move faster than I'd like, because the notice reached me late. And that shouldn't come down to whether I happened to catch an email.

Marcus: When you say move faster, what does that involve on your end? Is it just timing, or does it cost something?

Ellen: It's mostly timing, but timing has a cost. A capital call has to be funded by a date, and the cash to fund it usually has to come from somewhere, a sale, a transfer, sometimes just internal approvals that take a day or two of their own. When I see the call with a comfortable runway, all of that is routine. When I see it late, the same routine gets compressed into a scramble, and a scramble is where mistakes live. Nothing has broken yet. But I'm managing that risk with my own attention rather than with a system, and attention is the thing I have least of during a close.

Marcus: If the portal could push that to you directly, what would actually be useful? An email alert? Something on the dashboard when you log in?

Ellen: Honestly, both, but the key thing is that it's tied to the actual event, not someone remembering to send it. The moment a call is issued, I should get a notification, with the amount and the due date, and it should be sitting at the top of my dashboard until I've acted on it. The good platforms do exactly that. I'm never relying on someone's email, the system itself is keeping me on top of what I owe and when.

Marcus: And today, with no alert in the portal, how do you make sure nothing slips? Is there a manual check you run?

Ellen: My assistant and I keep our own calendar of expected calls, based on what the managers have signaled, and someone logs into each portal on a rhythm just to see what's appeared. So we've built a manual net under a system that should be catching this itself. It works, mostly, because we're diligent about it. But it's exactly the kind of thing that shouldn't depend on us being diligent. The one time the net has a hole in it is the time a call is sitting there that nobody flagged.

Marcus: This is helpful. We've still got a few minutes, so let me ask you to benchmark us against the rest of your managers. If you had to put a number on Meridian's portal, one to ten, where does it land, and where do your other managers sit?

Ellen: Honestly? I'd put Meridian around a six. They're not the worst I deal with, the data's accurate and it's all there, which I don't take for granted. But a six. My best manager on this is probably an eight, maybe a touch higher.

Marcus: And what's the other platform doing that Meridian isn't?

Ellen: A few things, but the one that stands out: when I log in at quarter-end, the reporting I need is essentially already built. There's a consolidated statement that gives me the full capital activity picture in one place, formatted in a way I can almost hand straight to my board. I'm reviewing and sense-checking, not assembling. With Meridian I'm starting from parts. With them the work is reviewing a finished thing. With Meridian the work is building the finished thing first, and then reviewing what I built.

Marcus: So the gap is really about the last mile, taking it from accurate data to something board-ready, without you doing that work yourself?

Ellen: That's a good way to put it. And the document piece too, with that platform, search just works, I find what I need and move on. It's not that Meridian is broken. It's that the bar has moved, and they're sitting where some of the others were maybe two years ago.

Marcus: Is that a sense you've formed on your own, or something you hear from peers in your seat too?

Ellen: Both, honestly. I compare notes with a few other CIOs at systems like ours, informally, and this kind of thing comes up. Not Meridian by name, we don't talk about specific managers that way, but the general shape of it, the ones who've modernized the reporting and the ones who haven't. It's become one of the things people in my seat notice, where a manager sits on the technology, not just on returns. A few years ago nobody compared notes on a portal. Now it comes up.

Marcus: Well, that just about does it for the prepared questions I had. We're close to time. Carly, anything you'd like to ask before we wrap?

Carly: Just one thing. You've described all of this pretty clearly, the assembly work, the document search. Have you raised any of it with Meridian directly, and if so, what's come back?

Ellen: That's a fair question. I've mentioned it, more than once, usually to our relationship manager. They're always gracious about it, they take the point, and then nothing really changes. I don't think it's unwillingness. My read is it's bigger than the person I'm talking to, it's the platform itself, and that's not something a relationship manager can just go fix.

Carly: That's helpful, thank you.

Marcus: Good, thank you. We've covered a lot of ground, and I want to be respectful of your time. Before we close, is there anything we didn't ask about that you think we should have? Anything on the platform that's been on your mind?

Ellen: I think you got the heart of it. The only thing I'd add is that none of this is a dealbreaker for us, the investment relationship is good and that's what matters most. But you asked about the platform specifically, and on that, it's been the same set of frustrations for a while now. So if this is a sign they're actually looking at it, that's good to hear.

Marcus: It is, and that's exactly why we're talking to people like you. This is genuinely helpful, and it goes directly into what we take back to Meridian. Thank you for being so candid, and for the time, I know it's a busy stretch.

Ellen: Of course. Happy to help. Good luck with it.

[The call ends a few minutes shy of the hour.]`,
    commentary: `[(after Ellen drops off)]

That was a good one. Ellen was candid, which you can't always count on, and I've got a couple of pages of notes I want to tighten up before any of it blurs. Right now I can still hear exactly how she said things, which thing she rated a six, why the better manager came out ahead, the one or two offhand comments that I think actually matter more than she let on. A few days from now that detail is gone, and "the portal is clunky" is all that's left.

Fortunately we don't have another interview right after this, so I've got the time to clean these up while they're fresh. That doesn't always happen, so when it does, I take it.

My cleaned-up notes are an important artifact, and they get added to our ongoing list of completed interviews. We're three weeks into a six-week project, so we've already started gathering what we're hearing into key themes, and those themes are what really inform our final recommendation deck to the client.`,
    after: ``,
  },
  'management-consultant-meridian-full-d2-b2': {
    before: `After the Ellen call, Carly stays at her desk in the firm's New York office to work the interview notes into shape before the next interview. What comes out is a pair of artifacts, shown back to back: first the raw notes Carly typed live during the call, then the cleaned, structured write-up she rewrites them into, the same conversation moved from private shorthand into a document that carries on its own.`,
    simulatedWork: `{{artifact:1}}

The raw block above is what a live call leaves behind, and the write-up below isn't a clean retype of it, it's a run of small judgments about what mattered. I'm starting with the headline, one line for the whole interview: the relationship's good, the data's accurate, the pain is the last mile. Everything else in the write-up sits under that, the hard facts up top in a small fields table, the findings below, ordered by how much they matter rather than the order they came up.

One number stops me. In the raw the assembly time is the better part of a couple of days, and for a second I can't tell whether she meant a week or a quarter. The run of the conversation settles it, the figure came right after Marcus asked her to put a number on it per quarter, so per quarter. It goes into the finding as her own rough estimate, not a hard figure, since it was a guess under a little pressure, not something we measured.

The gaps are what I'm really building toward, they're what the tracker takes. Three of them, the consolidated report, document search, and notifications, are the same reporting-cycle problem and sit together cleanly. Onboarding I'm less sure about, it's real and Ellen was pointed about it, but it's the front end of the relationship, not the reporting cycle, and a different team feels it. That one I don't settle at my desk, I code it and flag it for the group, a question rather than a call I make alone.

{{artifact:2}}`,
    commentary: `Next it goes into the running theme tracker, where the interview stops being one person's story and becomes part of the count the deck will stand on, one more row in a matrix that's finally getting big enough to say something on its own. Two things are worth watching as the interviews continue: whether the last-mile split really breaks document-led versus data-led the way it's starting to, and whether other investors feel the onboarding re-papering as sharply as Ellen does. I'll flag both for the team so the next block of calls can probe them.`,
    after: ``,
    artifactsHtml: { 1: { type: 'document', html: meridianArtifact05Html }, 2: { type: 'document', html: meridianArtifact06Html } },
  },
  'management-consultant-meridian-full-d2-b3': {
    before: `Later the same morning, from the same New York office, Carly and Marcus join a scheduled video call with Raymond, the Chief Investment Officer of a life insurance company that holds an infrastructure allocation with Meridian Park. Meridian's investors are institutions spread across the country, so the interviews run over video. Marcus will lead the conversation; Carly is here to take notes and listen for what matters.`,
    simulatedWork: `[Marcus and Carly are on the call. Raymond joins a moment later.]

Marcus: Raymond, hi, thanks for making the time. We're a few weeks past quarter-end, so I imagine you're in the thick of the statutory filing right now, I appreciate you fitting us in. I'm Marcus, and this is my colleague Carly.

[Carly smiles on camera.]

Raymond: Marcus. Carly. Yes, you're right about the timing, it is busy. Let's keep this quick if we can.

Marcus: Then I'll keep the intro short. Meridian brought us in for an outside read on how the portal is actually working for the investors who use it. Everything you tell us is candid and never attributed to you by name, it goes into themes and recommendations for Meridian. Carly is on notes. We'll follow the thread where it's useful. Sound alright?

Raymond: It does. I'll be direct with you, the portal is the part of this relationship I actually have views on, so you've come to the right person.

Marcus: Then we'll put them to good use. We've got thirty minutes scheduled, do you have a hard stop?

Raymond: Half past, and then I'm out. Let's not waste it.

Marcus: Understood.

Marcus: Before we get to the portal, could you tell me a little about your own role? How long you've been with the company, and what you're responsible for?

Raymond: I am the chief investment officer. I've been at the company twelve years, the last seven in this chair. I run the general account, which at a life insurer is more or less the whole balance sheet that stands behind the policies we've written. So it is a big book, and a conservative one.

Marcus: Thank you. And for those of us standing outside the insurance world, what does running the general account actually involve, in terms of what you're investing toward?

Raymond: We're a life insurer. The general account backs what we owe our policyholders, and those obligations are long-dated, annuities and life. So we invest long to match them. Asset-liability matching is the whole job, really. Every asset we buy has to earn against a liability and survive how we're required to account for it. It sounds dry, and it is, but the accounting treatment drives the decision as much as the return does. An asset can look fine economically and still be a problem if the way we're made to report it ties up capital we'd rather have working. So I'm not just buying return. I'm buying return that behaves the way the rules need it to.

Marcus: And when you say the rules, for those of us outside insurance, what body of rules are we talking about?

Raymond: Statutory accounting and the risk-based capital regime our regulator runs. It's different from the accounting a public company uses, stricter in its own ways, and it dictates how much capital I have to hold against every asset on the book. The state insurance department is the audience that matters, and the statements we file with them are neither optional nor flexible. When I tell you the format of my data matters, that is why. Everything I hold has to be described the way that regime requires, or it is not usable to me, however accurate it happens to be.

Marcus: That's helpful, thank you. And how long have you been investing with Meridian, and in what capacity?

Raymond: Five years or so. They run an infrastructure allocation for us, which is a good fit for an insurer, long-dated, contracted cash flows, the kind of asset that lines up against our liabilities without much drama. I'll be plain with you, on the investment side I have very little to complain about. They are good at what they do.

Marcus: And an infrastructure allocation specifically, does that make the reporting harder than a simpler holding would, something like a public bond or a listed stock?

Raymond: It makes the look-through harder, yes. A private infrastructure fund is a wrapper around a set of underlying assets, roads, energy, digital, each with its own profile, and the capital treatment depends on what is actually in there. A public bond I can describe in my sleep. A fund of physical assets I have to see into. So the very thing that makes infrastructure a good match for our liabilities, the long-dated real assets underneath, is the thing the portal is least able to show me. Good asset, hard to report on cleanly. That tension is most of my complaint.

Marcus: Understood. And the portal is a different conversation?

Raymond: It is.

Marcus: Then let's get into that. How do you and your team actually use the Meridian Investor Portal?

Raymond: Honestly? As little as we can. We go in, pull what Meridian has posted, and get it back out, because the real work happens in our systems, not theirs. The statutory accounting, the capital reporting, matching the assets against the liabilities, all of that runs on our side. So what I need from the portal is the underlying data in a form I can load. What it gives me is a quarterly statement, a PDF. Accurate, tidy, and no use to me until somebody on my team has rebuilt it by hand. And I don't mean that as a dig at the people. I mean it's the wrong artifact. A statement is something you read. I don't need to read it. I need to load it.

Marcus: So there's no one in your shop who lives in the portal day-to-day, it's a quarterly visit and out?

Raymond: More or less. We are not logging in to browse. We go in when a statement posts, we take what we need, and we leave. If the portal vanished between quarters we would not notice for six weeks. That tells you what it is to us. It's a delivery mechanism, and a delivery mechanism should hand you the parcel, not a box of parts.

Marcus: Say more about the rebuilding. What is your team actually doing to a statement once it lands?

Raymond: Two things. They re-key the numbers into our system, and then they reclassify every position so it maps to how we're required to report it for the statutory filings. The categories Meridian uses are not the categories the regulator wants. So someone sits in the middle and translates. Every position, every quarter.

Marcus: And is the data itself wrong, or is it right but in the wrong shape?

Raymond: The data is right. That's the part I find hard to accept. Meridian knows exactly what these assets are, they have to, they manage them. That classification already exists on their side. We are rebuilding something they could hand us in the right form and don't.

Marcus: Walk me through where that rebuilding actually sits. Is it your investment team doing it, or somewhere else?

Raymond: It sits with our insurance accounting group, not the investment team, which is part of what irritates me. Their job is the statutory close. Instead of closing the books, they spend the front of every quarter turning a Meridian PDF into rows they can load. The statement arrives, someone reads it, re-enters it, maps each position to the regulatory categories, and checks the mapping. Several mechanical steps, on data that should have arrived ready to load. By the time it is in our system it is correct, but we have paid for it twice. Once to Meridian, and once to ourselves.

Marcus: Put some scale on that for me. In a quarter, how much of your team's time goes into taking the statements apart before any of the real work even starts?

Raymond: Two people, the better part of a week, around each filing. Every quarter. It is not the most sophisticated thing they do, and it is where a real share of their time goes.

Marcus: So two people, the better part of a week, every quarter, just to make the data usable before the actual work even begins.

Raymond: Before it even begins. That's the part that gets me. It's not analysis, it's not judgment, it's transcription and translation. Work a machine should be doing, done by two people I'd rather have thinking.

Marcus: And these are experienced people, presumably, not juniors you can throw at it.

Raymond: They are two of my more capable people, which is the waste of it. You do not hand regulatory mapping to someone green, because a mistake there is a mistake in front of the regulator. So I have senior staff doing data entry four times a year, because a PDF will not load itself. If you were advising me on this as a business, you would tell me to fix it.

Marcus: And do any of your other managers deliver it differently?

Raymond: One of them does, and it is night and day. They deliver a structured file that loads straight into our accounting and statutory reporting systems, already mapped to the categories we file under. My team runs a check on it and moves on, there is no re-keying and no reclassifying. Same asset class, comparable fund. So I know this is not some abstract technology problem. Somebody is already doing it.

Marcus: So with that manager, the week of rebuilding simply doesn't happen?

Raymond: Right. They have taken on the work that ought to be theirs in the first place. With Meridian, we do it for them, four times a year.

Marcus: Does that shape how you think about the two managers, beyond the portal?

Raymond: It shapes how I think about how much they value my time. One built the thing that saves my people the better part of a week each quarter. The other lets my people spend it. I do not think Meridian is doing this out of indifference. I think it simply has not risen up their list. But from where I sit, the message is the same either way. My back office is absorbing a cost that should sit with them.

Marcus: That's a clear picture. Is the format the whole of it, or are there other places the portal falls short for you?

Raymond: The format is the day-to-day annoyance. The one that actually worries me is detail. On the capital side, I can't treat the fund as a single line on my books. I have to look through it, to what is actually inside, because what we're required to hold against it depends on the underlying assets, not the wrapper around them. The portal gives me fund-level summaries. That is not enough to do it properly. A single line that reads infrastructure fund, one number, tells me nothing about what sits underneath, and underneath is exactly where the capital treatment gets decided. Two funds with the same headline can carry very different charges depending on what's actually inside them.

Marcus: Give me a concrete version of that, if you can, so I understand what the summary hides.

Raymond: Take an infrastructure fund that holds both a regulated utility and a merchant power project. On the portal they sit inside one line, one label, one number. Those two assets do not carry the same risk, and the capital I have to hold against them is not the same. If all I have is the wrapper, I either hold too much capital, which is money left idle, or I estimate, which is not something you want to be doing in a regulatory filing. The detail is not a nicety. It is the difference between a right answer and a defensible one.

Marcus: And when the summary isn't enough, how do you get the underlying detail?

Raymond: We request it, position by position, and our relationship manager gets us what they can. But think about what that means. To hold the right amount of capital against this allocation, I have to see through the fund to the underlying assets, because the capital charge depends on what is actually inside it, not the label on the wrapper. The portal shows me the wrapper. So the one number my regulator cares about most is the one I cannot get cleanly, and I am chasing a person for it. I won't put our capital position on the table here, but I'll tell you the direction of travel: the regulators want more of this look-through every year, not less. It is manageable today. In two years it is a problem.

Marcus: What changes in two years? Is that a rule you can see coming, or a direction?

Raymond: A direction, but a clear one. Every revision to the capital rules in the last decade has pushed toward looking through the wrapper to the real risk underneath. Regulators no longer accept being told a fund is a fund. They want to know what is inside it, because that is what sets the charge. So the detail I am chasing by email today is the detail I will be required to file on before long, at a granularity Meridian does not currently give me. I would rather they solve it before the regulator makes it my emergency.

Marcus: We're coming up on time, so let me spend the last few minutes on what helps us most, benchmarking Meridian against the rest of your managers. If you put a number on the portal, one to ten, where does Meridian land, and where do your other managers sit?

Raymond: The portal, not the investment, right. A five. I'll give them the accuracy, and I don't say that lightly, plenty of managers cannot get even that right. But accurate is where they stop. The one I mentioned, the one who sends the file, is a nine, and the four points between them is exactly the work my team is doing by hand that his team is not.

Marcus: That's a wide gap. What earns the nine?

Raymond: Everything we just went through. The data shows up where I need it, in the form I need, with the detail underneath it, and I barely touch it. My team runs their check and moves on. It's not that he's doing something clever. He's just doing the last step instead of leaving it to me. Meridian gives me accurate data and leaves the rest of it to me.

Marcus: And the nine rather than a ten. What's the last point he's missing?

Raymond: Nobody gets a ten from me. A ten would anticipate what I need before I ask for it. He does what I need reliably, which is a nine, and frankly more than I expect from this industry. The point I hold back is discipline on my part, not a fault of his. Ten is a word I keep for something I have not seen yet.

Marcus: Is that the shape of it for you as well, that the portal gets you to accurate data and then leaves the last step, turning it into what you actually need, on your side of the line?

Raymond: That's fair, but I'd put the line in a different place than a pension would. A pension wants a clean report it can carry into a board meeting. The last step for them is a document. There is no document at the end of mine. It is a feed into a system that has to satisfy a regulator. Same gap, in a sense, but what is missing for me is not a better-looking statement. It is the data, structured, with the detail sitting under it.

Marcus: That's a really useful distinction. Carly, anything you'd like to ask before we wrap?

Carly: Just one thing. You've drawn a clear line between what a pension needs from the portal and what you need. Do you get the sense Meridian sees insurers as a big enough part of who they report to that they'd build for your side of that line, or do you feel a bit like an edge case for them?

Raymond: Fair question, and an honest answer is that I'd only be guessing. But my read is that I'm in the minority of their book. The portal is clearly built for the investor who wants a clean statement, and most of their investors probably do want exactly that. I'd assume insurers are a smaller slice, and a smaller slice doesn't usually drive the roadmap. Which is the discouraging part. Although the fact that you're sitting here asking suggests somebody is at least thinking about the rest of us.

Marcus: If they did build for your side of it, would that hold onto business, or is the portal not the kind of thing that moves an allocation?

Raymond: The portal does not win them the next dollar. The investment team wins that, and they win it on returns. But do not mistake that for the portal not mattering. It colors how the whole relationship feels, and when I am in a committee deciding where the next infrastructure commitment goes, the manager who makes my life harder every quarter does not get the benefit of the doubt. It is not decisive. It is not nothing, either. The managers who treat the portal as a back-office detail tend to be the ones quietly losing ground to the managers who do not.

Carly: That's helpful, thank you.

[Marcus jots something down and glances at the clock.]

Marcus: Good, thank you. We've covered a lot of ground, and I want to be respectful of your time. Before we close, is there anything we didn't ask about that you think we should have? Anything on the portal that's been on your mind?

Raymond: I think you have it. The one thing I'd underline is that this is not about people. Our relationship manager is responsive, and the investment team is genuinely good. It is the platform, and it was built for a different kind of investor than I am. And I want to be clear, I am not asking them to run my regulatory filing for me. If they just gave me more of the underlying data in a structured, repeatable form, something my team could load and process in a day instead of picking a PDF apart for the better part of a week, that alone would be a large improvement. That is the bar. Move even part of the way there and I'd notice.

Marcus: Understood. And is a partial step genuinely useful, or is it all or nothing for you, the full structured feed or it may as well be a PDF?

Raymond: Partial is useful. If they gave me the position-level data in any structured, consistent export, even without the regulatory mapping, my team could build the mapping once and reuse it quarter to quarter. Most of what my people repeat every quarter is the part a machine could hand off cleanly. I am not asking for elegance. I am asking for a file that does not have to be typed in by hand. And spare me a dashboard with moving charts. I do not need it to look impressive. I need it to open where my team already works. Start there. The rest can follow.

Marcus: That's exactly the kind of thing we're here to take back. It goes straight into what we bring to Meridian. Thank you for being so candid, and for the time, I know the filing has you busy.

Raymond: Of course. Send it back to them straight, that's all I'd ask. Good luck with it.`,
    commentary: `[(after Raymond drops off)]

No gap this time. Ellen's notes I got to clean while she was fresh; Raymond's are going straight onto the pile, because there's another call in a few minutes, then a thirty-minute lunch I'm eating at my desk, then one more right after. So by early afternoon I'll be three interviews deep with none of them written up, working from shorthand and memory, and I'll have to reconstruct the detail tonight, which is the tax you pay on a stacked interview day. So the discipline shifts: no clean-up gap means I lean harder on the double-starred flags in my shorthand, the quotes and the numbers, and trust that the connective tissue will come back tonight if the anchors are solid. Raymond's a useful one to have gotten, though. He's the clean opposite of Ellen: she wants a finished document at the end, he wants raw data he can load, and it's the same platform failing them from two different directions. That's the split we're testing, and so far it's holding.`,
    after: ``,
  },
  'management-consultant-meridian-full-d3-b1': {
    before: `Tuesday's interviews and two this morning are in the bank, so the theme tracker has more rows than it did Monday, and the count of completed interviews is up around twenty. Marcus and Carly sit down in a small breakout room in the New York office, four chairs and a TV mounted on the wall, for the week's problem-solving session: the working meeting where the team compares what it is hearing, attacks its own logic, and tightens the themes into something the deck can stand on. Two artifacts drive the hour, the theme tracker and the skeleton deck, and Carly has both open on her laptop to put up on the screen.`,
    simulatedWork: `Marcus: [dropping into a chair, still half in the meeting he just left] Sorry, ran long with David on the staffing thing. Okay. I've got us until noon and then I've got a hard stop, so let's actually use the hour. Three things I want by the time I leave. I want to walk the storyline and see if it survives me. I want the themes locked well enough that you can build on them this afternoon and not have the ground move under you. And I'd like you to leave here with a clear next step and no ambiguity. Pull up the skeleton. Walk me through the storyline and I'll try to break it.

[Carly plugs her laptop into the wall display and brings up the deck.]

Carly: Here's the shape of it, so push on any of it. Current state, the relationship's good and the data's accurate, nobody argues with that. Then the gap, the portal stops at accurate data and leaves the last mile to the investor, and the bar's moved on them. Then the future state and the recommendations, a prioritized, fundable set of improvements to close it. The middle, the gap, is where the real work is.

[Marcus leans back and reads the titles on the screen for a moment, not saying anything.]

Marcus: Show me the action titles top to bottom. Just the titles, not the evidence. If the story's real it holds as a paragraph on its own.

[Carly scrolls slowly through the section headings while Marcus follows on the TV. A stretch of quiet, both of them reading.]

Marcus: Okay. It mostly holds. But the last-mile line is doing a lot of work. Is it actually one theme, or are we hiding four separate complaints under a nice phrase? Because if Laura asks what specifically do I build, the last mile isn't an answer.

Carly: Both, and I think that's the structure. The last mile is the umbrella, the one-line argument that explains why the four gaps belong together, the so-what sitting over all of them. Underneath it are the concrete gaps that actually get built: consolidated reporting, document search, notifications, onboarding. The umbrella explains why they hang together. The gaps are what goes on the roadmap.

Marcus: Good. That's the distinction I wanted. The umbrella's the argument, the gaps are the deliverables. Keep them clearly separated on the page or it reads as mush. A reader should be able to nod along at the umbrella and still point at the exact thing they're funding.

Carly: Right. Quick one before I build it out, because it changes how I lay the pages. Do you want the counts sitting on the umbrella page, or does the umbrella stay purely the argument and the numbers live down on the gap slides?

Marcus: Numbers on the gap slides. The umbrella page earns its keep on one clean idea, no clutter. The second you put a table of counts on it, people start reading the table and stop hearing the point. Prove the point first, then the counts back it up underneath.

Carly: Got it. Umbrella stays a sentence, the gaps carry the evidence.

Marcus: Before we go further, let me try to break the umbrella properly. Does anyone in the sample not fit it? Because if I can find one investor who's perfectly happy, a skeptic in that room finds them too.

[Carly scrolls back up the tracker and looks for a second before answering.]

Carly: There's one. A family office that barely had a complaint, scores them high, basically wants on-demand access and nothing more. So yes, the umbrella doesn't describe every single row.

Marcus: And does that break it?

Carly: I don't think so. One content outlier doesn't undo a pattern that shows up in the large majority of the interviews. If anything it makes us look honest, because we're not claiming everyone's miserable. But I'd rather we surface it ourselves than have Diane find it.

Marcus: Agreed. Don't hide the happy one, and don't let it wobble the theme either. A pattern that holds across most of the book survives one exception. Note it, maybe a line in the appendix, and move on. What I don't want is you building the whole section as if the sample were unanimous, because it isn't, and someone will know that.

Carly: Noted. I'll flag the outlier rather than airbrush it.

Marcus: One thing while you've got the storyline up. Is that current-state slide going to feel like we're letting Meridian off easy? Opening on the relationship is good makes me nervous in a room with Diane.

Carly: I'd push back on that a little. The accuracy's real, every single investor credits it, even the ones who score them low. If we skip past it we sound like we came in with a grievance. Leading with what works is what earns us the right to be blunt about the gap two slides later.

Marcus: Fair. Keep it, but keep it short. One slide, credited, and move. I don't want to spend the client's patience admiring the parts that already work.

Carly: One slide, then we turn. There's one thing I flagged on the tracker that I want your read on, because it doesn't sit cleanly under the umbrella.

Marcus: Go.

Carly: Onboarding. The re-papering for every new fund, meaning an investor who joins a second or third Meridian fund has to submit all the same entity paperwork and signatory forms over again, as if the platform had never seen them. It's real, around half of the investors we've spoken to raise it. But it's a different animal from the other three. The other three are all about getting data out at the reporting cycle. Onboarding's the front end of the relationship, before any reporting happens.

Marcus: What does the evidence say about the root cause?

Carly: That underneath, it's the same root cause as the rest. The platform treats every interaction as if it's the first one, no memory. But it's felt by a different team, operations rather than the CIO, and at a different moment.

[Marcus gets up and stands closer to the screen, looking at the onboarding column on the tracker.]

Marcus: So the mechanism's the same, no memory, but the symptom and the audience are different. If I put onboarding under a last-mile heading, the CIO reads the umbrella, agrees, and then hits the onboarding gap and thinks, that's not my problem, that's operations. And now the whole section feels loose to them.

Carly: That's exactly the risk. It reads like we jammed it in to pad the list.

Marcus: Then don't force it under the last-mile umbrella, because that umbrella's specifically about the reporting cycle. Make it its own theme, something like the platform has no memory, with onboarding as the lead example. Two clean themes beat one that's been stretched to cover both. It still belongs on the same roadmap, but it's telling a different part of the story, so let's keep it separate on the page.

[Carly is already typing, adding a new section heading into the skeleton as they talk.]

Carly: That's cleaner. I'm putting it in now as its own section so I don't lose it. And it actually helps us, because it hands us an obvious quick win. The reusable onboarding profile's a well-understood fix. It's not a research project, it's a thing other platforms already do.

Marcus: Good, and that's a nice one to have in our pocket for Thursday, something concrete and cheap that Diane can picture. But don't build the fix into this section. Note it and keep going. We're proving gaps right now, not recommending.

Carly: Understood. It goes in the recommendations section, not here.

Marcus: While we're on the tracker, one more thing on that current-state benchmark. The score spread, the six against the eight. Where does that live?

Carly: I had it sitting near the front, almost as a headline. It averages a six-one for Meridian against an eight-one for the best other manager, and I think that number does a lot of persuading on its own.

Marcus: It does, but I don't want to open on a scoreboard. Averages invite an argument about methodology, and the second someone asks how we scored it, we're defending the survey instead of telling the story. [pauses] Actually, park that. Where the score spread goes, front page versus a benchmark slide in the future-state section versus the appendix, that's a formatting call, not a storyline call. We'll settle it in the deck review. Don't lose the hour on it now.

Carly: Fair, parking it. I'll drop it into the future-state page as a placeholder and we can move it later.

Marcus: Right. We're in the weeds. Pull up. [his phone buzzes on the table; he glances at it and thumbs a one-line reply] Sorry, David, on the same staffing thing. Keep going, I'm listening.

[While Marcus answers the message, Carly turns back to the tracker on the wall and scans down the insurer rows.]

Marcus: [putting the phone face down] Okay. Now the insurer split, because that's the one I'm least settled on. The data-led investors, the insurers, the ones who want raw data into their own systems rather than a finished document. I want to make sure we're not over-rotating on them, because so far they're a small part of the sample. We've got, what, five of them out of the eighteen?

Carly: Five so far, and the spread's real. Raymond rates Meridian a five out of ten and his best other manager a nine, a much wider gap than the document-led investors give us. But I'd be careful claiming insurers are the bigger population. I read them as the smaller slice with the sharper pain, because their downstream lands in a regulatory filing, not a board meeting. One thing we should do is ask Meridian for their own rough split of investors by segment. If insurers are, say, one in ten of their book, we need to know that before we let a loud five out of eighteen in our sample pull the roadmap toward a data-feed build that serves very few of them.

Marcus: Say more on why the pain reads sharper, because I want to be sure it's the downstream and not just that Raymond's a blunt guy who scores low.

Carly: It's the downstream. When a pension misses the polish, it costs analyst hours rebuilding a board slide. When an insurer misses the data, the cost lands inside a statutory filing with a regulator on the other end and a deadline that isn't theirs to move. Same missing thing, the finished output, but the consequence lands at a different order of magnitude. That's why the score gap is wider, not because he's grumpier.

Marcus: That I buy. So we frame it as a distinct shape of the same problem, not a second problem, and we're honest that it's a minority of the book with a disproportionate cost. That's defensible. If we oversell it, Laura prices a data-feed build that serves a handful of investors and the whole prioritization falls apart.

Carly: Agreed. I'll keep it as one theme with two finish lines, and let the numbers say how big each population is. And I'll get the segment-split question over to Gregory today so we're not guessing on Thursday.

Marcus: Send it to me first, I'll route it through Gregory so it doesn't land on Diane as us not knowing our own sample. [glances at the clock on the wall] Okay. I've got maybe ten minutes before I have to run, so let me land this.

Marcus: The storyline holds. Better than it did twenty minutes ago, because it's two clean themes now instead of one that was quietly carrying two. Here's what I want next. Build the gaps section for real, the heart of the argument. Lead page, the umbrella: one idea, accurate data, last mile left to the investor. Then the by-investor-type split as its own page. Then the gaps themselves with the counts and the quantification under them. Action titles that state the so-what, evidence underneath, one idea per page. Get me a draft and I'll mark it up first thing tomorrow.

Carly: Got it. Umbrella, then the split, then the gaps with numbers. And the no-memory theme lands where in that order?

Marcus: Right after the gaps, as its own short run of slides, onboarding leading. Don't bury it and don't blow it up. It's the second theme, not a footnote and not a co-headliner.

Carly: Clear. One idea per page, action titles carry the so-what, evidence sits underneath.

Marcus: And resist the urge to jump to the recommendation in this section. We earn the fix by proving the gap first. Don't answer the question before you've made them feel it.

Carly: I hear you. I'll keep the recommendations out of it entirely and just make the gap hurt.

Marcus: [standing, gathering his laptop] That's the one. Get me the draft tonight or first thing and I'll be in it before you're at your desk tomorrow. Good session.`,
    commentary: `Now the job changes. Up to now the deck's been a hollow frame, titles and placeholders, which is about all you can have three weeks into a six-week engagement with the interviews still coming in. This afternoon that ends. I start putting real content underneath the frame, the actual pages with the evidence from the tracker sitting under each claim, and it's the first time the argument stops being an outline and becomes something Marcus can react to page by page. It matters that it happens now, because the client checkpoint with Diane is Thursday, and nothing in that room should land on her as a surprise. So the pages I build this afternoon are really the first draft of what she sees in two days.`,
    after: ``,
  },
  'management-consultant-meridian-full-d3-b2': {
    before: `With the themes tightened in the problem-solving session, Carly settles back at her desk and starts turning the gaps section of the skeleton deck into real, populated slides. A skeleton deck is just that: section headings and placeholder titles with nothing underneath them yet, and these two hours are where it starts becoming an actual document. This section is the heart of the eventual week-six deck, the pages that sit between the current-state setup and the recommendations and make the client feel the gap before the team proposes how to close it. What she's building today is a first draft, not a finished section: real action titles, each one a full-sentence lead-in that states the point of its own page, with real evidence pulled from the tracker underneath, good enough for Marcus to react to tomorrow and certain to be revised several times before week six. The discipline is one idea per page and only the evidence that proves the title, and the temptation she's learned to resist is opening the charting tools and making something look finished before the argument underneath it is settled. There's no meeting in this block, just the work, and it isn't a clean unbroken stretch: an investor call lands at three, the moment the block ends, so the real task is to get the section far enough along before then that stepping away doesn't cost her the thread.`,
    simulatedWork: `The gaps section is still a skeleton, three headings with placeholder titles and nothing under them, the frame Marcus and I argued into shape earlier. I'm building it out in order, umbrella first, since if that page doesn't hold, nothing on top of it will either.

First page is the umbrella. It has to carry the whole problem in a single line before any evidence shows up, and my first pass tries to hold everything at once, accurate and complete data, stops short of the finished output, investors left assembling the last mile. It sags in the middle, a title that needs two breaths is really two titles, so I'm cutting it down to the one claim: the portal delivers accurate data but stops short of the finished output investors need, and leaves them to build the last mile by hand. That's the sentence the rest of the page has to earn.

For evidence I'm keeping two quotes of the three I like. The third goes to the appendix stack, where the receipts live. The exhibit stays a sketch, a caption describing what it needs to show. I'm redrawing it from three boxes to two, data and finished output with the gap as the break between them, so the eye lands on the gap.

Page 3.2 moves faster, the session already settled the logic: the split, document-led against data-led. Pension side first, the missing board-ready report, anchored by the CIO who rebuilds a quarter of capital activity by hand. Her one-to-two analyst-days figure gets labeled as her own estimate, not something we measured, same tag every harvested number gets.

The insurer side I'm holding to exactly what the interviews support: structured data into their own systems, a PDF close to useless. It's strong enough without embellishment.

Now the title. I'm leading with the symmetry, pensions need board-ready documents, insurers need system-ready data, and honestly, I like how it reads. Clean parallel, looks finished. Moving on, there's a third page waiting.

Page 3.3 is the hard one. It has to carry the gaps themselves, four of them, how many investors raised each, what they do about it today, and the quantified pain, and every column is pulling weight. It's a heavy grid and a senior would flip past it, but cutting a column means dropping evidence I fought for, so it stays dense for now. Then a snag: one gap's count doesn't match the tracker, a stale number I'd carried from memory. That becomes a rule on the spot, numbers come off the tracker, never out of my head. Onboarding goes down as the separate no-memory theme rather than a fourth reporting gap, and the data-feed gap gets its own page, its pain a different order that a general grid would flatten. The middle column takes concrete verbs, not deals with it but opens statements one at a time and assembles them in a spreadsheet.

Then the titles test, each one on its own. 3.1 holds, 3.2 holds, 3.3 doesn't, and I can see it doesn't. What it wants is a clean lead slide with the counts as a bar and the table demoted behind it, but that's real minutes I don't have before the block ends, and Marcus asked for a draft he can react to, not a finished section. So 3.3 stays overloaded on purpose, with a note that it may need to come apart. What's here at the end is a genuine first draft, real titles, real evidence, two exhibits sketched, one page I already know is soft, which is about as far as a first pass goes.

{{artifact:1}}`,
    commentary: `The point of this block is to take what Marcus and I just agreed and get it onto real slides while the logic's still fresh. I draft, Marcus marks it up, and it tightens over the next few weeks before it's anywhere near the client. What I owe him is a genuine first pass he can react to, not a polished section, because the fastest way to waste his review is to hand him something so finished I've stopped being able to change it.

I've one more call at three, and after that it's heads-down. I'll keep drafting and cleaning these pages the rest of the afternoon, get them as organized and easy to read as I can with the exhibits sketched in, and send them to Marcus tonight. That timing is deliberate, not just diligence. He asked to mark them up first thing tomorrow, and I've learned that first thing for Marcus is early, he's the kind of person who might be in the deck at half seven with a coffee. If it isn't in his inbox tonight, he's blocked the moment he sits down, and the worst version of my job is him having to email me at ten asking where the draft is. A lot of being good in this seat is invisible: it's making the next person's step easy and never being the thing anyone's waiting on. Part of that, specifically, is building the draft so Marcus can move through it fast and mark it up straight on the page, because the quicker he can react the more passes we get, and the section only gets good by cycling through a few of them. So the goal for the rest of today is simple, and it isn't perfection. It's in his inbox by end of day, clean enough that he can start marking it up cold, and clear enough that his time goes to sharpening the argument rather than decoding my shorthand.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: meridianArtifact07Html } },
  },
  'management-consultant-meridian-full-d4-b1': {
    before: `Thursday morning, in a small team meeting room in the firm's New York office. Marcus has Carly's gaps section open on the screen and walks her through his edits. A meaningful share of it gets restructured, which on a first draft is the norm rather than a verdict on the work. The artifact is one of Carly's pages with Marcus's markup.`,
    simulatedWork: `Marcus: [scrolling through the section one page at a time before he says anything] Give me a second, I want to look at the whole thing before I start marking it up.

[A pause while he reads down the three pages. Carly waits.]

Marcus: Overall, the bones are here. Three pages, and the argument's inside them. What it needs is staging, not rethinking, which is the good kind of problem to have on a first draft. Let me go page by page.

Carly: Please.

Marcus: Okay. First, the good news. Page one is doing exactly what it should. The title says the point, there's one idea, and the two quotes earn their place. I'd leave it almost alone. That's the bar for the rest.

Carly: Good. That one felt like it clicked.

Marcus: It shows. One small thing even there, the subtitle runs a hair long, so tighten it by a few words and the eye lands on the title first. Not urgent, just a clean-up when you're in it.

Carly: Easy enough.

Marcus: Now the work. Page three. What's the one idea on this page?

Carly: That four gaps drive most of the manual work.

Marcus: That's really two ideas on one page. You've got the gaps themselves, and how often each is hit, and what people do today, and a quantified column. That's a document, not a slide. A senior reads it and doesn't know where to look.

Carly: I know it's dense. I think I loaded it up because I didn't want to lose any of the evidence, it all felt like it was pulling weight.

Marcus: The evidence is pulling weight. It's just in the wrong container. Split it. The lead page makes the point, a small number of recurring gaps drive the manual work, with the counts as a simple bar. The detail table, what they do today and the per-gap numbers, moves to the appendix and you reference it. Nothing's lost, it's just staged so a reader takes it in the right order.

Carly: So the page says four gaps, here's how widespread, and the evidence table backs it from behind?

Marcus: Right. The titles test, remember. If David flips through reading only titles, he should get the argument. A small number of recurring gaps drive the manual work passes. A table with no title that says anything fails.

Carly: Let me try the lead title now, while it's in my head. Something like, a small number of recurring gaps drive most of the manual work investors describe. And the bar underneath is just the counts.

Marcus: That's the one. Say most of the manual work, not all of it, we don't want to overclaim and hand someone an easy objection on a page that's otherwise airtight. And keep the bar simple. Four bars, one color, ordered tallest to shortest, the base labeled right on it. Somebody should read that exhibit from the back of the room without you narrating it.

Carly: Four bars, one color, ordered, base on the exhibit. That's cleaner than the table anyway.

Marcus: It usually is. Next thing. Your counts. 14 of 20. Twenty what?

Carly: Investors interviewed to date.

Marcus: Then say it on the page, every time. 14 of 20 investors interviewed to date. The minute a number floats without its base, someone in that room asks, and if we're explaining our own denominator live, we've lost a little credibility for no reason. Put the base on every exhibit, and build every slide to stand on its own. You can't assume anyone in that room read the page before it, so each one has to make sense by itself.

Carly: Got it. Base on every number, and every slide stands alone.

Marcus: And the numbers themselves. That 1 to 2 analyst-days, and the insurer figure on the by-type page, those are the investors' own rough estimates, not something we measured with a stopwatch. Label them that way on the page, reported estimates, so nobody reads them as our precise measurement and then picks at the method. Honest framing is also the safest framing.

Carly: I'll mark them as investor-reported. That's how they came to us anyway.

Marcus: Exactly. You never want to defend a number you didn't claim to have measured. One more on the evidence while we're on it. Those two quotes on page one, and any you pull onto the gap pages, make sure none of them carry a tag that points back to one person. No public pension CIO sitting under a quote. In a sample this size that's as good as naming them, and we told every one of these investors we wouldn't. Keep them clean.

Carly: They're clean on page one. I'll re-check as I pull more onto the gap pages.

Marcus: Good. The by-type page, page two, is strong. The two-finish-lines framing is the cleanest articulation of the whole problem we've got. I'd consider promoting it earlier, but let's not move the section flow until David has seen the storyline. One title fix. System-ready data is good, board-ready documents is good, but lead the title with the so-what, not the symmetry. Something like, because the downstream work differs, the same gap costs a pension a board report and an insurer a regulatory filing. Sharper. Play with it.

Carly: That's better. The symmetry was me being a little pleased with the phrase.

Marcus: It's a nice phrase. Just make it work for its place on the page. A title's job is the so-what, not the music.

Carly: So maybe, the same gap costs a pension a board report and an insurer a regulatory filing, because the downstream work is different.

Marcus: Closer. Lead with the cost, drop the because to the body. The same gap costs a pension a board report and an insurer a regulatory filing. Full stop in the title. The reason, the different downstream work, lives in the two supporting lines underneath. The title lands the stakes, the body explains the why.

Carly: Cost in the title, reason underneath. That's tighter. And on that lead page bar, do you want raw counts or the percentages?

Marcus: Counts, with the base right next to them, and put the percent in a lighter weight if you want it there at all. The count is the thing people trust. The percent is gloss on top.

Carly: Counts lead, percent supports. And the detail table I'm moving to the appendix, do you want it referenced on the lead page, or just living back there for whoever wants it?

Marcus: Reference it once, lightly. A line that says the full per-gap detail is in the appendix, no more. A skeptic needs to know we've got the receipts without the page having to carry them. You're building for two readers at the same time, the one who flips through reading only titles and the one who audits every number. Serve both, crowd neither.

Carly: One light pointer, detail behind it.

Marcus: Last thing. Nowhere in here do you hint at the fix, and that's correct, keep it that way. The gaps section is where we make them feel the problem. We don't get to the recommendations until later. Don't let a helpful instinct leak a fix into the section that's supposed to prove the gap.

Carly: Okay. So I split page three into a clean lead page with the detail behind it, put the base on every count, rework the by-type title so it leads with the so-what, keep the quotes unattributed, and keep any hint of the fix out of this section.

Marcus: That's a good list.

Carly: When do you need the revise back? I've got the block right after this to turn it.

Marcus: Before we prep for the checkpoint this afternoon. When we walk Diane through where the themes are landing, this section is the spine of it, so it has to be right by then. It doesn't have to be pretty by two. It has to be right.

Carly: Right by this afternoon. Pretty can wait.

Marcus: And none of this is because the draft was weak. A first cut that needs this much shaping is just a first cut. The thinking underneath it is right, which is the part I can't fix for you. The structure I can.

{{artifact:1}}`,
    commentary: `This is the midweek shaping Marcus told David he'd do on Monday, and getting the section in front of him now, rough, instead of polishing it alone for three days, is the whole reason I sent a draft this early. It has to be right before any of it goes near Diane at Thursday's checkpoint or lands in front of David for his Friday read of the titles. The instinct when a first draft comes back marked up is to take it as a grade on the thinking. I've learned not to. A first cut is a first cut, and the notes are structural, which means they're an hour of work, not a verdict. So that's the next hour: the revise, then straight back into his hands.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: meridianArtifact08MasterHtml } },
  },
  'management-consultant-meridian-full-d4-b2': {
    before: `Carly works Marcus's edits into a cleaner version of the gaps section, one point per page with the detail moved behind it. The artifact is the revised section.`,
    simulatedWork: `First is the page he actually tore up, 3.3, the one carrying the most weight and the most mess. His note was two ideas wearing one coat, the point and the evidence crammed together, so I'm pulling them apart. The page becomes a single clean claim, a small number of recurring gaps drive most of the manual work, with a simple bar underneath, four bars, the share of the twenty investors we've interviewed raising each gap. The full grid, what investors do about each gap and the quantified pain, comes off the slide onto a new appendix page, A3, with one light reference on the lead page pointing back. Nothing's lost, just staged so the point comes before the detail.

The bar stays as plain as Marcus asked, four bars, one color, tallest to shortest, each with its count and base right on it. No second axis, nothing that needs a legend, it has to read from the back of the room on its own.

Then the bases, every number gets its denominator right on the exhibit, not fourteen but fourteen of the twenty investors we've interviewed to date. I don't want to be explaining our own sample live in front of Diane. Same pass, the quantified-pain figures get labeled as the investors' own estimates, not something we measured.

The by-type page needs its title reworked, the one I'd been a little pleased with. My draft led with the symmetry, documents for one type, data for the other, because it read nicely. Marcus's point was that a title's job is the so-what, not the music, so I flip it to lead with the cost: because the downstream work differs, the same gap costs a pension a board report and an insurer a regulatory filing. The parallel's still in the body, but the title lands the stakes first now. It stings a little that he was right.

The last part is what I leave out. No fix leaks into this section, every instinct wants to follow a gap with the thing that closes it, but that comes later, this section just proves the gap and stops. One more pass down the three titles, top to bottom, and this time they hold as a paragraph on their own. That's the version that goes back to Marcus and then across town.

{{artifact:1}}`,
    commentary: `This is the block right after the review, on purpose. Marcus's notes are still warm, I can still hear what he meant by each one, and the revise is always fastest while that's true. I've got his marked-up page in front of me and a short list of exactly what changes: split the dense page, put the base on every number, sharpen the by-type title, keep the fix out. None of it is a rethink. It's structure, which he told me is the hour of work, not the verdict. And there's a clock on it, because whatever I land here is the spine of what Diane sees at the checkpoint this afternoon, so clean matters more than clever.

That's the section clean, and out of my hands for the moment. It goes back to Marcus, and more to the point it's the spine of what we walk Diane through at two o'clock. I don't know yet which parts she'll push on, and that's fine, that's what the checkpoint is for. After lunch we head across town, and for the first time this week the work stops being a document I'm building alone and turns into something a client reacts to in a room. I'd rather it be right and plain for that than pretty and fragile.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: meridianArtifact09Html } },
  },
  'management-consultant-meridian-full-d4-b3': {
    before: `Early afternoon, back at Carly's desk in the New York office. Marcus stops by before the two of them head across town. Every week he has a standing one-on-one checkpoint with the client at Meridian's office, and until now it has been just him and the Meridian stakeholders. This week he is bringing Carly. This short check-in is where he tells her what the meeting is, what he wants out of it, and what her role in the room is.`,
    simulatedWork: `Marcus: Grab your coat in a few minutes, we're heading over to Meridian. I want you in the checkpoint with me today.

Carly: The weekly one with Diane? I thought that was just you and the client.

Marcus: It usually is. Every week I sit down with Diane and her team for an hour, in person, to keep them close on where we are. This week I want you there. You've been in most of the interviews and you're building the synthesis, so it's time you saw the other half of the job, the client side of it, up close. The analysis is only half of what we do. The other half happens in rooms like the one we're about to walk into, and you can't pick it up from a deck.

Carly: I'd like that. What's the meeting, exactly?

Marcus: It's the mid-engagement checkpoint. Halfway mark. We show them where the themes are landing, we get their reaction while there's still time to steer, and we make sure nothing in the week-six readout catches anyone off guard. And David's coming in for this one, which I'll be honest is not nothing. He doesn't sit in on every weekly check-in. He's here because it's the halfway mark and because the relationship with Diane runs through him, so there'll be three of us on our side and three of them on theirs.

Carly: Who's the three on their side?

Marcus: Worth knowing before we sit down, because they don't want the same things. Diane's the sponsor. She owns the platform strategy and the budget, so she's the one who ultimately decides. Gregory runs investor relations, and his team lives in the portal, fielding the calls when it falls short, so for him the pain is real and daily. And Laura owns the technology and the build, which makes her the one who can tell us what's actually possible. Different things matter to each of them, and part of what I want you to watch is how the same findings get pitched differently depending on who's listening.

Carly: So the same evidence, angled three ways?

Marcus: Exactly. The consolidated-report gap is a strategy problem to Diane, a daily headache to Gregory, and a data-architecture question to Laura. Same fact, three different doors in. Watch which door I use for each of them.

Carly: And the two-finish-lines split, is that the hard part to sell?

Marcus: It's the interesting part, not the hard part. It's the piece that makes us look like we actually understand their book rather than just counting complaints. If it lands, Diane stops seeing a list of gripes and starts seeing a structural problem with a shape, and a problem with a shape is one you can fund a solution to. So watch her face when I get to it. That's the moment I'm really playing for.

Carly: Anything specific you're trying to get out of it?

Marcus: A few things, and it helps to go in with them named rather than hoping they come up. Their reaction to the last-mile framing and the two-finish-lines split, because if that lands, the whole story holds. Laura's early read on what's realistically buildable, because that shapes our entire sequencing, and I'd rather learn today than in week six that phase one is a fantasy. And there's one thing I'm going to ask them straight out: their rough breakdown of investors by segment. How much of the book is pensions versus insurers versus the rest. We're hearing a sharp, specific complaint from the insurers, and I want to know whether that's five loud voices or a real slice of who they serve before we let it pull the roadmap.

Carly: That's the thing I flagged on the tracker. Whether we're over-indexing on a small group.

Marcus: Exactly, and today's where we can just ask. No sense guessing at the shape of their book when the people who know it cold are sitting across the table. The other reason I raise it there and not just in our own analysis is that asking a client to help you get something right is its own kind of trust-building. People like being consulted about their own house.

Carly: And is the goal today to actually decide anything, or just to put it all on the table?

Marcus: Closer to the second, but with a purpose. A checkpoint exists so that nothing in the final readout is a surprise to Diane, good or bad. If she's going to have to choose between serving her biggest insurers and serving the bulk of her book, I want her to have lived with that for three weeks by the time she's standing in front of her own leadership, not to meet it cold on a slide. So today I'm planting the hard questions, not resolving them. Watch how little actually gets decided in there, and how much just gets surfaced.

Carly: So the meeting that looks like a status update is really about controlling what week six feels like.

Marcus: Exactly. The readout should feel inevitable, and this is the room where we make it inevitable.

Carly: That makes sense. One thing, though, on my role, so I'm clear before we walk in. Am I there to observe or to actually take part?

Marcus: Good, I was going to get to that, because it's the thing first-years get wrong. Mostly observe. I'm driving the conversation. I want you to sit in, listen, read the room, and get the exposure. I'll bring you in where the evidence is yours, and if I reach for a specific number and don't have it in front of me, you may need to supply it. But you don't need to carry any of the talking. Let me steer, and jump in only where I hand it to you or where I'm clearly reaching for a figure you have.

Carly: And if Diane or one of them asks me something directly?

Marcus: Then you answer, briefly and straight, and you stop. Give them exactly what they asked for and don't decorate it. It's not that your read doesn't matter, it does, it's that a checkpoint isn't the room to develop it out loud. In there, less from you is more. One clean number at the right moment does more for how this team is seen than five minutes of interpretation would, and it's more credible coming from the person who actually did the work than it would be filtered through me.

Carly: Understood. Observe, read the room, and be ready with the numbers.

Carly: Anything specific I should be watching, since I'll mostly be sitting quiet?

Marcus: Watch who reacts to what. When I land the consolidated-report number, watch Diane, because that's the one that arms her with her own leadership. When I get to buildability, watch Laura, because her face will tell you what's easy and what's a nightmare before she says a word. And watch how David spends himself. He'll be quiet almost the whole hour, and then he'll say one sentence at exactly the right moment, and the fact that he waited is half of why it lands. That economy is a skill, and you only catch it if you're looking for it.

Carly: Got it. Read the reactions, not just the words.

Marcus: That's it. And we'll debrief straight afterward, so if you see something in there you don't follow, hold onto it and we'll pull it apart later. For now, just watch how the room works. Let's go, the car's downstairs.`,
    commentary: ``,
    after: ``,
  },
  'management-consultant-meridian-full-d4-b4': {
    before: `Marcus, Carly, and David take an Uber across town to Meridian's office for the mid-engagement checkpoint, the week's one in-person client meeting. Traffic makes the short hop slow, and they get up to a large conference room on Meridian's floor with a few minutes to spare. This is a status meeting, not the final readout: the team shares where the themes are landing and the initial direction, gathers the client's reaction, and keeps everyone aligned so nothing in the week-six readout comes as a surprise. From the consulting team: David, the Senior Manager and the senior face of the relationship, and Marcus, who runs the engagement day-to-day and drives today's conversation. Carly is here for the first time, brought in to see the client side of the work up close. From Meridian: Diane, the Global Head of Client Solutions who sponsored the work and owns the platform strategy and its funding; Gregory, the Head of Investor Relations, whose team operates the portal day-to-day; and Laura, the Head of Technology, who owns the build.`,
    simulatedWork: `Marcus: Diane, Gregory, Laura, thank you all for making the time. I know this is a busy stretch and the calendars are full, so I appreciate it. Before we start, you all know David, and I've also brought Carly with me today. She's been in most of the investor interviews and she's the one building the synthesis behind everything I'm about to show you, so if you ever want the evidence straight from the source, she can give it to you. As for today, I want to be clear about what this is and isn't. This is a checkpoint, not the readout. We're three weeks in, right at the halfway mark, and the whole point of sitting down now is to show you where the themes are landing while there's still time to steer them, hear your reactions, and make sure that when we get to the week-six readout, nothing in it is a surprise to anyone in this room. So please push back as we go.

David: And Diane, before Marcus dives in, thank you for making the time on your side. I wanted to be here in person for this one, because the halfway mark is where these engagements are actually made or lost, and I'd rather hear your reactions directly than have Marcus catch me up later.

Diane: I'm glad you did, David. It's been a while. And I'll say the same thing to all of you that I say to my own teams. I'd rather hear it rough and early than polished and late. A surprise in week six helps no one. So where are you landing?

Marcus: Let me start with the headline, and then we'll go theme by theme. The first thing, and it matters, is that your investors like Meridian. The investment relationship is strong, and they trust the data on the portal, which is not something every manager can say. So this isn't a story about broken trust or bad numbers. The second thing is where the frustration lives, and it's remarkably consistent: the portal gets them to accurate data and then leaves the last step, the finished thing they actually need, to them. That's the theme everything else hangs off. In one CIO's words, they're paying for a finished product and getting raw ingredients.

Diane: That tracks with what I hear anecdotally. What I've never been able to do is tell whether it's a few loud voices or the whole book. Can you?

Marcus: We can, and that's exactly what the synthesis is for. Of the investors we've interviewed so far, nearly all of them credit the data as accurate, and nearly all of them describe doing manual work to turn it into what they actually use. This isn't a few loud voices. It's the pattern.

Diane: That's helpful to hear with some weight behind it, honestly. Anecdotes I've got plenty of. What I've never been able to do is walk into my own leadership and say, look, this is systemic, and here's how systemic, and actually have a number behind it. So give me the specifics. The consolidated-report problem, the one you led with, how many of the investors you've talked to actually raised it?

Marcus: It's the most common single gap, by a clear margin. The exact count, let me get it right rather than guess.

[He glances at Carly.]

Carly: Fourteen of the twenty we have interviewed so far.

Marcus: Fourteen of twenty. So not a fringe complaint. It's most of the people we've spoken to, and it's the single biggest driver of the manual work they described.

Diane: That's the kind of number I can use. That's the difference between me saying investors seem frustrated and me saying seven in ten of the ones we've asked are rebuilding our reporting by hand. The second one gets a budget conversation started.

Marcus: And that's the level we'll bring every theme to for the readout. A claim, a count, and where we could get it, a cost.

Gregory: I'll confirm it from my side, and frankly it's a relief to hear it framed as the platform and not the people. My relationship managers are fielding these requests all day. Someone can't find a statement from two years ago, so they email us and we go dig it out. We're the search function the portal doesn't have. My team is basically running manual retrieval as a service, and it doesn't show up anywhere as a cost, because it's just absorbed into their day.

Marcus: That's an important point, and it's in the findings. A lot of the cost of these gaps is hidden inside your IR team's workload, not just the investor's.

Gregory: Hidden is the right word. I can't put a number on it, because it never gets logged. It's just Tuesday.

Diane: That's the part that worries me most, actually. Gregory's team absorbing it means it never reaches me as a line item, so it's been invisible in every budget cycle. A cost I can't see is a cost I can't fix.

Marcus: Which is one of the quiet arguments for doing something here. Some of the return on fixing the portal doesn't come back to the investor. It comes back to your own people's time.

Gregory: I'll take any of it back. Right now every notification the system doesn't send is a call my team does.

Laura: I want to get ahead of where this goes, because I can already feel the shape of the recommendation. Everything you've described is real. I'm not going to argue any of it. But I can't rebuild this platform this year. The budget doesn't exist, and even if it did, you don't replace an investor portal in twelve months without breaking the things that currently work.

Marcus: Understood, and that's the whole premise of how we're building the recommendation. It's not a rebuild. It's a prioritized, phased roadmap, the smallest set of changes that closes the most pain, sequenced so the early phases are genuinely buildable inside what you can fund. Honestly, forcing that prioritization is a large part of why you brought us in.

Laura: It is, and I'll hold you to the word buildable. Some of what investors want sounds simple and is not. A consolidated capital-activity report across funds touches data that lives in three different systems. Notifications are comparatively easy. If your phase one mixes those without knowing which is which, it'll fall apart the first time my team scopes it.

Marcus: That's exactly the input we need from you, and it's why we wanted you in the room today rather than at the readout. We have an early view of what looks like a quick win versus a heavier lift, but we'd rather sequence it with your team's feasibility read than guess and be wrong in front of everyone in three weeks.

Laura: Then I'll be blunt about the easy end so you can use it. A notification when a capital call posts, an alert with the amount and the due date, that's not hard. We already have the events. We just don't surface them. Real document search is a bigger lift but well understood. The consolidated cross-fund report is the one that looks like a button and is actually a data project. If you lead your phase one with the things that are genuinely close to the surface, you'll get a win on the board fast, and a fast win is what buys the patience for the harder ones.

Marcus: That's precisely the kind of distinction we can't make from the outside, and it changes our sequencing. A quick, visible win early is worth more than a bigger fix that slips.

Diane: Say more about what a phase one actually looks like to me, in practical terms. Because when I take this upstairs, I'm not asking for a portal budget. I'm asking for a specific, bounded thing with a number on it and a date.

Marcus: That's the right way to hold it, and it's how we'll frame it. Phase one is the shortest list of changes that takes the most pain off the table for the most investors, and that Laura's team can build inside a defined window without touching the parts that already work. It's deliberately small. The point of it isn't to fix everything. It's to prove the roadmap works, put a visible win in front of your investors, and earn the budget conversation for phase two.

David: And that framing matters more than it sounds, Diane. Leadership funds momentum, not aspiration. A small phase one that ships and that investors actually notice changes the next budget conversation entirely, because you're no longer asking them to believe a plan, you're showing them a result and asking to continue. The all-at-once version of this fails more often than the phased one, and it usually fails on exactly the thing Laura raised, scope nobody could really build.

Diane: That I know from painful experience. The last big platform initiative here tried to do everything and delivered nothing for a year and a half, and the board still remembers it. A version I can defend as small, sequenced, and already showing a return is worth a great deal more to me than a comprehensive one I have to take on faith.

Marcus: Then we're aligned on the shape. Small, buildable, sequenced to a visible win, with the honest heavy lifts named and placed later rather than buried.

Laura: As long as the split between the two is real and not cosmetic. I've seen phase-one lists that quietly smuggle a data project in among the easy wins, and then the whole phase slips because of the one thing that was never quick. If we do this properly, the line between what's genuinely fast and what's a data effort gets drawn by people who know the systems, which is my team, not a slide.

Marcus: Agreed, and that's the point of getting your engineers on it early rather than presenting you a sequence you have to take apart later.

Laura: Then let's get my engineering lead some time with Carly's list before you finalize any sequence.

Marcus: We'll set it up. And one direct question while we're all together, because it shapes where we point the rest of our interviews. What's your rough breakdown of investors by segment? Roughly how much of the book is pensions and endowments versus insurers versus everyone else? We're hearing a sharp, specific set of complaints from the insurers, and I want to know whether that's a handful of voices or a meaningful share of who you serve before we weight it in the roadmap.

Gregory: Roughly? The large majority are pensions, endowments, and foundations, the document-led side. Insurers are a small slice, call it around one in ten of the relationships, a bit more by assets because a couple of them are large. Sovereign wealth and family offices make up most of the rest.

Marcus: That's useful, and it's close to what our sample is showing. So the insurer pain is real and sharp, but it's a minority of the book. Which brings me to the theme I most want your read on, Diane, because it changes how you'd prioritize. The pain isn't identical across investor types. Your pension and endowment investors want a board-ready document at the end. Your insurers don't want a document at all. They want structured data fed into their own systems for regulatory reporting, and for them the gap is more expensive, because the downstream is a regulatory filing, not a board slide.

Diane: That's a real tension for me. The insurers are a smaller part of the book, but they're some of my largest single relationships, and they're the ones asking the hardest questions about whether we're keeping up. So I can't just serve the majority and let the data-led investors drift.

Laura: Can I test something on that, because it changes what I'd scope. When you say the two types want different things, how different is the underlying build? If serving the insurers means a whole separate data pipeline, that's one conversation. If it's the same consolidated data delivered as a file instead of a report, that's a very different and much cheaper one.

Marcus: That's the crux, and it's genuinely both depending on the gap. The hard part, assembling a quarter's activity into one consolidated view, is shared. Every investor needs that, document-led and data-led alike. That's the expensive core, and it serves everyone. Where they split is only the last step off that core. A pension wants it rendered as a clean report. An insurer wants it exported as structured data with the detail underneath.

Laura: That's better news than I expected. If the assembly is shared, then serving both isn't two builds. It's one build with two outputs, and the second output is comparatively cheap once the first exists.

Marcus: That's exactly the finding we most want to land with you, Diane, because it changes your calculus. You're not choosing between your pensions and your insurers on the expensive part. The expensive part serves both. You're only deciding whether to fund the additional export step for the smaller group, and that's a far easier call than pick a side.

Diane: That's a meaningfully different picture than the one I walked in with. I'd been treating the insurers as a separate, expensive problem I might have to defer. If most of the cost is shared, then the insurer piece is an increment, not a fork.

David: And that only surfaces when the analysis and the build people are in the same room this early. If you'd seen it first at the readout, you'd have spent three weeks worrying about a trade-off that turns out to be smaller than it looked.

Diane: And I'll be honest about the pressure I'm under, since we're speaking candidly. My leadership sees a portal that works. It doesn't crash, the data's right, nobody's complaining loudly enough to reach the board. Asking them to fund improvements to something that isn't visibly broken is a hard sell, and the insurers going quiet on us is exactly the kind of thing that doesn't show up until one of them leaves.

David: If I can add one thing, Diane. That tension you're describing is exactly the kind of call we don't want you making cold in the readout, in front of your own leadership. So we'd rather put it on the table now, in a room like this, and bring you the analysis to make it deliberately. That's the entire reason for a checkpoint at the halfway mark.

Diane: And I appreciate it, David. It's the difference between me presenting a decision and me presenting a dilemma. I'd much rather walk in with the first.

Marcus: And to your point, we're not going to recommend you pick one. We'll show you where a single fix serves both, and where they genuinely diverge, so you can fund the shared wins first and decide the data-feed investment with your eyes open about who it serves.

Diane: That's the version I can take to my own leadership. A prioritization with a rationale, not a wish list. Give me the shared wins as the spine, and frame the data-feed piece as a deliberate choice about a specific set of large relationships, and I can defend that in a way I could never defend fix everything.

Marcus: Then that's the shape we'll build toward.

Gregory: Before we get to the readout, can I put one more thing on your list to look at? A couple of my larger investors have started asking for programmatic access, they want to pull the data straight into their own systems rather than log in at all. I don't know if that's a phase-one thing or a someday thing, but I'd rather it be on your radar than not.

Marcus: That's useful, and it's exactly the data-led direction we've been describing, so let's capture it and see where it sits against the rest. I won't promise it a phase without Laura's read, but it goes on the list.

Laura: It's not phase one. But it's the right long-run direction, so park it somewhere we won't lose it.

Diane: Park it, then. That's the kind of thing I want captured even when we don't act on it, so no investor feels unheard.

David: Which is worth saying plainly, Diane, because it speaks to the return on this whole effort. Some of the value here isn't a feature at all. It's that your investors, and your own team, feel heard in a way they haven't. Retention in this business is quiet. You rarely lose an investor in a dramatic moment. You lose them over years of small frictions that make a competitor's platform feel easier. Closing even a few of these gaps, and being seen to take the rest seriously, is as much a retention story as an efficiency one, and that's a story your leadership already knows how to value.

Diane: That's the framing I've been missing, honestly. I've been trying to justify this as a cost saving, and it's a thinner argument than the one you just made.

Diane: And here's what I'd ask for the readout. Everything you showed me today, I want my leadership to see it landing the same way, with the evidence behind it, and I don't want anyone in that room surprised. So keep me close between now and then. If something shifts, I'd rather hear it from you on a Tuesday than discover it at the readout.

Marcus: That's exactly how we work it. We'll keep you and Gregory wired in as the sequencing firms up, and there'll be nothing in week six you're seeing for the first time. If a theme moves, you'll know before the slide does.

Diane: Then this was a good use of the hour. Thank you, all three of you. And before you scatter, we're getting dinner tonight, a place near the office. David, it's been too long, so I won't take no for an answer, and Marcus, Carly, I hope you'll both join us. No decks, I promise. It's the one part of these check-ins that's actually relaxing.

David: We'd be glad to. It's been too long since I've seen you outside a conference room, Diane.

Diane: Good. Half past six, and we'll all let the day recover a little first. Thank you again, everyone.

Marcus: Thank you, all. We'll see you tonight.`,
    commentary: ``,
    after: ``,
  },
  'management-consultant-meridian-full-d4-b5': {
    before: `Still at Meridian's office after the checkpoint, Marcus and Carly have claimed a small conference room down the hall to work out of for the rest of the day, and they duck into it to debrief before dinner. This is the part that does not show up in any deliverable: Marcus walking Carly through what just happened in that room, and why he handled it the way he did.`,
    simulatedWork: `Marcus: So. What did you see in there?

Carly: Honestly, that you spent more time managing Laura than anyone, even though Diane's the sponsor.

Marcus: Good read. Why do you think that is?

Carly: Because Laura's the one who can kill the recommendation by saying it's not buildable.

Marcus: Right. Diane decides, but Laura can make Diane's decision impossible. The fastest way to lose a recommendation like this is to have the tech owner sit quietly through the readout and then tell the sponsor afterward that none of it's feasible. So you never present the build to her, you build it with her. The minute she said rebuild's off the table, I agreed before she finished the sentence, because she's right, and because the recommendation was never a rebuild anyway. The moment you agree with the objection you were afraid of, it stops being an objection. Now she's a collaborator, not a blocker, and I gave her something concrete to own when I offered her engineering lead time with your list. People don't torpedo the thing they helped build.

Carly: She did soften after that. She went from getting ahead of the recommendation to setting conditions on it.

Marcus: That's the shift you're watching for. A blocker says no. A collaborator says yes, if. Get them to yes-if and you're most of the way home.

Carly: David only said one thing the whole meeting, that line about not wanting Diane to make the call cold in the readout. Why did he step in just for that?

Marcus: Because that's the senior-face move, and it's his to make, not mine. Diane needed to hear, from the most senior person in the room, that we're going to protect her in front of her own leadership. That's a promise about the relationship, not the analysis, and it lands differently coming from David. He says one sentence all hour, and it's the one sentence that reassures the sponsor she's safe with us. That's what he's there for. Watch how the senior people spend their words. They say very little, and what they say does a specific job.

Carly: He barely touched the analysis at all.

Marcus: He doesn't need to. That's mine, and yours. His job in that room is the relationship and the reassurance, the things only the most senior person can credibly give. If David had started walking Diane through gap counts, that would've been a bad sign, because it would mean the sponsor needed to hear the detail from the very top to believe it, which means she didn't quite trust it from us. Him staying out of the weeds is the tell that the rest of us are trusted to own them. Seniority in this job is mostly knowing which few things are yours to say and letting everything else be handled below you.

Carly: When Diane asked for the exact count and you looked at me, I jumped in with the fourteen of twenty. Was that right, or should I have waited for you to hand it to me?

Marcus: That was exactly right. I didn't have the precise number in my head, and I wasn't going to guess at a figure in front of the client and be off by two. You had it, so you gave it, cleanly, and then you stopped. That's the whole skill in that moment. You said fourteen of twenty and nothing else. You didn't add three sentences of interpretation, you didn't oversell it. The number landed, it was more credible coming from the person who actually did the synthesis than it would have been laundered through me, and then I picked it back up. As a bonus, Diane gets to see there's real analytical work under this, not just a manager with opinions. That's part of how a team earns the next piece of work.

Carly: I wasn't sure whether to say more. There was a second where I could feel myself wanting to explain the number.

Marcus: I saw it, and I'm glad you didn't. That instinct is the thing to train out. In that room your job was to be the evidence, precisely and briefly, and the discipline is trusting the number to carry itself. A figure over-explained sounds defended, and defended sounds unsure. You gave it clean. That's exactly what that moment needed.

Carly: The insurer tension. You could have left that for later. Why raise it today?

Marcus: Because it's Diane's hardest call, and the one rule of a checkpoint is no surprises at the readout. If the first time she has to weigh serving her biggest insurance relationships against the majority of her book is in front of her own leadership in week six, I've failed her. Raise the hard thing early, privately, when she has room to think. Then in the readout she's already made her peace with it, and she's nodding, not reacting. A sponsor who's surprised on stage is a sponsor who stops trusting you, even if the surprise was good news.

Carly: She did seem almost relieved to have it named.

Marcus: Because it's been sitting on her without a shape. We gave it a shape and told her we'd bring her the analysis to decide it deliberately. That's a gift, and it costs us nothing but candor. And there's a bigger game here I want you to start seeing. This six-week assessment isn't the prize. It's the audition. If Diane trusts us, the real work is helping them actually build this roadmap, an implementation that runs six to twelve months and probably longer. That's the whale. Call it Moby Dick. This project is the little boat we use to get close enough to it. Every checkpoint, every dinner, every time we make Diane look good in front of her own leadership, is us earning the right to be the ones who do that build. The analysis has to be excellent, that's just the price of admission. The relationship is what actually decides whether they come back.

Carly: Does any of that ever pull against the analysis, though? If the whole game is keeping Diane happy, what happens when the honest finding is one she doesn't want?

Marcus: That's the line you never cross, and it's worth being clear about it now. The relationship work is all about how we deliver the truth, never about bending it. The day we soften a finding because it's awkward for Diane, we're worthless to her, because the only reason our read is worth anything is that it's independent. She's not paying us to agree with her. She's paying us to tell her the thing her own people can't, or won't. So the analysis stays hard. What the relationship buys us is the right to say the hard thing and have it heard instead of resisted.

Carly: So the warmth isn't in tension with the rigor. It's what makes the rigor usable.

Marcus: That's exactly it, and most people take years to see it. Blunt truth from someone she trusts lands as help. The same truth from someone she doesn't lands as an attack. A brilliant analysis nobody acts on is worth nothing, so the relationship is the delivery system for the rigor, not a substitute for it. Get the analysis wrong and no amount of charm saves you. Get it right and deliver it badly, and it dies in the room anyway. You need both, and the both is the job.

Carly: And tonight's dinner is part of the same thing?

Marcus: Tonight's dinner is a lot of the same thing, just without the deck. You'll meet a different Diane over dinner than the one in that conference room, and that's the whole point of it. People tell you what they actually think when they're relaxed with a drink in hand, the offhand line about what their leadership really cares about, the thing they'd never say in a meeting. David didn't clear his evening for the checkpoint. He cleared it for the dinner. The checkpoint he could have done by phone. So watch tonight the way you watched today, because it's the same work wearing a different jacket.

Carly: So the checkpoint's partly just pre-loading the decisions?

Marcus: That's most of what it is, and the readout should feel inevitable because of it. But understand it runs both directions. The reason we keep them this close, the reason I just handed Laura our analysis before we've finalized anything, is that trust is a trade. If they trust us, they give us the honest feasibility read, the real budget picture, the offhand comment about what leadership actually cares about, all the things we can't do our job without. The moment they feel us managing them or holding something back, they do exactly the same to us, and then we're working blind.

Carly: So handing Laura the analysis early wasn't generosity, it was buying the honest read back.

Marcus: Now you're getting it. It's both, and it doesn't stop being genuine just because it's also strategic. Keeping them in the loop isn't only good manners. It's how we get what we need out of them, and it's how a six-week job becomes a two-year one.

Carly: Is there anything I should have done differently in there?

Marcus: Honestly, not much for a first time. You were where you needed to be, you gave the number clean, and you stayed out of the way. The thing to keep working isn't in the room, it's the read. You noticed I was managing Laura, which is good. The next level is noticing it while it's happening and knowing why in real time, so that eventually you're the one steering and I'm the one in your seat watching. That's the whole apprenticeship, really. First you observe it, then you can name it, then you can do it. You're at the naming stage on some of this already, which is further along than I'd expect three weeks in.

Carly: That's reassuring, actually. Half the time in there I wasn't sure if I was following it or just watching it happen.

Marcus: At three weeks, watching it happen and knowing it's happening is the whole job. The doing comes later, and it comes from exactly this, sitting in rooms like that one and then pulling them apart afterward. Keep the notice sharp and the mouth mostly shut in client rooms, and the rest is reps. Alright. Save the rest of your read for dinner, because that room runs on exactly the same rules, just with the ties loosened. Let's get the checkpoint feedback into the deck before we head over.`,
    commentary: ``,
    after: ``,
  },
  'management-consultant-meridian-full-d4-b6': {
    before: `After the checkpoint, the consulting team and several of the Meridian stakeholders meet for dinner near Meridian's offices. There is no agenda and no deck. It is a relationship dinner, the social half of a mid-engagement checkpoint.`,
    simulatedWork: ``,
    commentary: `Dinner was mostly what it looked like: warm, social, a couple of bottles of wine, everyone more or less off the clock. But the tell was that David cleared his whole evening for it. He skipped plenty of the working sessions this week and didn't need to be at any of them, and yet the relationship dinner was the one thing on his calendar that never stood a chance of being cut. Even the seating wasn't quite as accidental as it looked. Nobody announced who sat next to Diane, it just happened, the way the two people at our end who've done this a hundred times wanted it to.

And underneath the soccer stories and Gregory's travel plans, David and Marcus never fully switched off. Somewhere between the appetizers and the second bottle Diane let slip, almost as an aside, which investors her own leadership actually asks her about, and I caught Marcus file it away without reaching for a pen. That one line will quietly shape how we frame a slide. I mostly listened, which is the right speed for a first-year at a client dinner, laughed in the right places, answered when Diane asked me something, and otherwise stayed out of the senior conversation. It was the most human the week had felt, and I liked it genuinely. But it wasn't downtime. It was a late night stacked on a full day, and it still counted as work, the enjoyable and the tiring of it landing in the same evening.`,
    after: ``,
  },
  'management-consultant-meridian-full-d5-b1': {
    before: `Friday morning, back in the firm's New York office for the team's office day. This is the review David asked for at Monday's kickoff, when he said he wanted to read the storyline himself once it was drafted, and it is why Marcus and Carly spent the last two days getting the gaps section into shape. David has it in front of him now, revised through Marcus's review and updated after the client checkpoint, and he read it closely the night before, leaving his comments in the file as he went. The artifact is that marked-up copy. His review is a different altitude from Marcus's: less about whether a page is clean, more about whether the argument survives the room it is built for, the one with Diane and her leadership in it.`,
    simulatedWork: `David: I read it last night the way Diane's boss will read it. Titles only, front to back, ninety seconds. Want to know what I got?

Carly: Please.

David: I got: the relationship's good, the data's accurate, the portal stops short and makes investors finish the job themselves, it costs them differently depending on type, four gaps drive it, and you can fix it in phases without a rebuild. That's a complete argument from the titles alone. Most decks never get there. You read the titles of most decks and you get a list of topics, not a case. This one, I could've set down after the headlines and told you exactly what you want Meridian to do. So, well done, both of you.

Marcus: Carly drove the section.

David: Then well done, Carly, and I mean it specifically, not as a pat on the head. The hard part, the part I can't fix in a review, is the thinking that makes the titles line up into a paragraph. Formatting, Marcus can clean up in an afternoon. The logic either holds or it doesn't, and here it holds. That's the part that's actually yours.

Carly: Thank you. That one took the longest to get right, the order more than the wording.

David: It always does. The order is the argument. The words are just paint.

Carly: Can I ask why you read it titles-only first? Marcus goes through it page by page.

David: Different jobs. Marcus makes each page correct, that's his altitude. I'm checking whether the argument survives the reader who only ever sees the headlines and decides in ninety seconds whether this is serious, which is Diane's boss, the person who controls the budget. If the titles don't carry it to him, nothing underneath gets read. So read your own deck that way before you hand it over, titles only, cold, and you'll catch most of what I would.

Carly: I'll start doing that before I hand you anything.

David: Do, and you'll need me less, which is the point. Now, let me try to break it, because that's my job, and it's a lot cheaper for me to break it here than for Diane's leadership to break it in the readout. That's the whole point of this review. Everything I catch this morning is something that doesn't cost us anything in a room where it would. I've got a few things, and they're already on the pages as comments, so you'll have all of it after this. Let's take them worst-first.

David: Biggest one, the funding story. You assert two things in your titles, without a rebuild, and in phases. Good words, both. But Diane's going to carry this deck to people who control a budget, and people who control a budget don't fund adjectives. Where on these pages does it become obvious that phase one is small and cheap and phase three is the big bet? Right now I can see the gaps beautifully. I cannot see the money.

Carly: The sequencing page is still a placeholder. We're getting Laura's engineering read before we commit to what goes in each phase.

David: Good. That's the right reason for it to be blank, and I'd rather see an honest placeholder than a sequence you guessed at and can't defend when Laura's team scopes it. But hold the place for it loudly, and let me tell you why it matters this much. For everyone in that room except Diane, the gaps section is the deck. For Diane, the gaps are the setup. The single most important page in the whole thing is the one that says, here's what a little money buys you, here's the expensive part, and here's why you do them in this order. That page is the recommendation. Everything else is just the case for it.

Carly: So the sequencing page isn't the conclusion the gaps build to. It's the thing the gaps exist to justify.

David: Exactly right. You've got it. So don't let it show up as an afterthought at the back, three bullets under a heading called next steps. Build the deck backward from that page. And when you write the summary, the sentence that carries the most weight is the one about the money and the sequence, not the one about the gaps. The gaps earn attention. The sequence earns budget. Those are two different jobs.

Marcus: We'll build the sequencing page as the backbone of the recommendation, not a summary at the end.

David: And put a number on the shape of it even before Laura's read firms the specifics. Diane needs to be able to say, phase one is roughly this size, phase three is roughly that size, without committing to the line items. A relative sense of the money is fundable. Silence on the money reads as we haven't thought about it, which is the one thing you can't have her leadership conclude.

Carly: Understood. I'll frame it so the relative cost lands even while the exact scope is still open.

David: Second thing. The insurer split. I like it. It's the most sophisticated point in here, and it's the thing that'll make Diane feel we understand her book better than she does. But pressure-test whether it survives her leadership asking the cynical question. Why are we spending on a data feed for a handful of insurers? If your only answer is because it's the right thing to do, you lose that argument in one sentence. What's the business answer?

Carly: That the insurers are a small part of the book but some of Meridian's largest single relationships, and they're the ones most actively questioning whether Meridian is keeping up. Diane said almost exactly that in the checkpoint.

David: Then put her own logic on the page, in business terms, not as a fairness argument. A small number of large, at-risk relationships is a sentence a CFO funds. It's only fair to the insurers is not. One's a business case, the other's a plea. Make the deck make her argument for her, so that when someone in her leadership asks the cynical question, the slide has already answered it before Diane opens her mouth. That's what a good deck does for a sponsor. It arms her.

Carly: And Marcus surfaced at the checkpoint that a lot of the insurer cost is shared with the pension fix anyway. Should that go on the same page?

David: It should go on that page in bold, because it dismantles the cynical question entirely. If most of the spend serves everyone and the insurer-specific part is a cheap increment on top, then why serve the few stops being the question. You're not choosing between your investors, you're adding a small step that protects your largest relationships. That's an even easier sentence to fund. Put it right next to the at-risk framing.

Carly: That's a much sharper version of it. I'll reframe the title around relationship value at risk, and put the shared-cost point right beside it.

David: That's the note. Third, and it's smaller, but it'll matter in that room. Your current-state pages. You credit Meridian's accuracy, which is right, it's what earns you the standing to be critical. But make sure the credit reads as genuine and not as a throat-clear on the way to the knife. Diane's people built that portal. If the first two pages feel like a polite setup before you tell them it's broken, they'll get defensive, and a defensive client argues with your evidence instead of acting on it. Land the credit like you mean it. The data really is accurate, that really isn't nothing, and saying so plainly is exactly what lets you be blunt about the last mile without it landing as an attack.

Carly: That's fair. I think one of those titles is a little grudging. I'll warm it up so the credit is real.

David: Do, because that page is doing more work than it looks like it's doing. It's not throat-clearing, it's disarming. Fourth, and this one's just a flag for later, watch the evidence density as you build the pages out under these titles. The titles are clean now. The temptation when you add the proof is to crowd it back in, and you'll undo the thing that makes this section work. Keep the discipline you've got. One idea a page, the proof beneath it, the detail in the appendix.

Carly: That's the exact note Marcus gave me on the page he tore up. I'll hold the line on it.

David: Then you've heard it twice, which means it's true.

David: One on the back of the deck before I forget, the appendix, because it's where this holds up under scrutiny or doesn't. Your whole argument rests on counts, fourteen of twenty and the rest. The first thing a skeptical reader in Diane's leadership does with a number like that is ask about the twenty. Who are they, how were they chosen, is it representative. If the methodology isn't sitting cleanly in the appendix ready to turn to, you end up defending your sample live instead of your argument, and that's a losing trade.

Carly: The methodology page is there, the sample, the segments, how we coded each gap. I built it so we could point to it without walking through it.

David: Good, that's exactly right, it lives in the back and you reference it, you don't present it. But make sure it answers the representativeness question specifically, that the mix of investor types in your twenty roughly matches the mix in Meridian's book. That's the question that actually threatens the count. If your sample skews to the loud complainers, the fourteen means less. If it mirrors the book, the fourteen is unassailable. Gregory gave you the segment split at the checkpoint, so use it to show your sample isn't cherry-picked.

Carly: That's a good use of it. I'll add a line mapping our sample against their segment split, so the twenty defends itself.

David: That's the move. A number that can defend its own base is worth three that can't. Last thing, and it's a compliment disguised as a warning. This section is good enough that the rest of the deck now has to match it. The executive summary, when you build it, has to land the whole arc on one page as cleanly as these opening pages land the gap. Right now the middle of this deck is the strongest part, and that's backwards for the reader who matters most. A senior reader spends the most attention on the first page and the last, and skims the middle. So the front cannot be the weakest thing in here. Don't let the exec summary become a table of contents. Make it the argument in miniature, with the money in it.

Marcus: Understood. We'll draft the one-page summary off this structure next week, money-forward.

David: And a word on what happens between now and the readout, because the deck isn't the only thing that has to be ready. You heard Diane at the checkpoint, no surprises. That's not a courtesy, it's an instruction. Everything I've asked you to sharpen this morning, the money, the insurer case, she should see a version of before week six, not for the first time on stage. So as the sequencing firms up with Laura, Marcus keeps Diane and Gregory wired in, a Tuesday call, a draft page, whatever it takes. The readout should be a formality, a room nodding at things they've already agreed to one at a time.

Carly: So the goal is that nothing in the final deck is new to the people who matter.

David: Right, and here's the part that's genuinely different at the readout, because it isn't the checkpoint again with better slides. The checkpoint was one room and one sponsor, and the job was to align Diane. The readout is her leadership, people who sat in none of these conversations, and the job flips. We're not there to persuade them ourselves. We're there to hand Diane the thing she stands up and persuades them with, in her own words. She owns that room, not us. The tell of a readout that worked is that we barely speak, because she's making the argument and pointing to us as the evidence. Get that right and the budget conversation starts in that room instead of dying in it.

Carly: That's the same thing Marcus said after the checkpoint, from the other side of it.

David: Then it's doubly true, and worth building the whole back half of this engagement around. Good. Then here's the whole review in a sentence, so it's portable: tighten the money, arm Diane for the cynical question, warm the credit so it disarms, hold the one-idea discipline as you build, and make the front match the middle. Do those and this is a deck I'd be comfortable putting in front of Diane's leadership.

David: And genuinely, well done. This is in strong shape for week three, and I don't say that to be kind. I read a lot of week-three decks that are still a pile of observations looking for a point. This one's already an argument. That's the hard part done. Now go make it undeniable while it's fresh.

{{artifact:1}}`,
    commentary: `That's the last real gate on the section before it becomes the spine of the readout deck. Next week the notes from this morning turn into pages, and then the exec summary gets built backward from the recommendation rather than bolted on at the end. None of that is new thinking anymore, it's execution, which carries its own kind of pressure. The hard part, the argument, holds. The job from here is making it undeniable before week six.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: meridianArtifact10Html } },
  },
  'management-consultant-meridian-full-d5-b2': {
    before: `Friday late morning. Marcus hands Carly something most first-years never touch: the engagement's economics. The work is the budget tracker, hours logged against the plan by staff level, against the fixed fee, and what it says about whether the engagement is on track to hit its margin. The artifact is the tracker.`,
    simulatedWork: `It's two tables. The first is hours, planned against actual by level, pro-rated to where we are in the six weeks, with a variance column. The second turns the hours into money. It's the firm's internal financials view, not built to be read, but the shape comes clear fast.

My own line is the first thing I check. David's on plan, he only dips in for the reviews and the checkpoint. Marcus is a touch over. I'm the most over of the three, not dramatically, but there it is in a column, a bit more of my budgeted hours used than the calendar says I should be by now.

Read properly, it's less alarming than my own line. Across all three levels we've used a little over half our hours against exactly half the timeline, so we're marginally ahead of our burn. The projection lands a hair over the planned hours at close, a low single-digit percentage of the fee. Marcus's note on it is small, watch it, don't panic.

The overage has a clear source, the gaps section, the one Marcus tore up and I rebuilt. Those extra hours the plan didn't have a slot for are sitting right there in the variance. It's strange to see my own Tuesday turn into a number that moves a margin, and it lands harder than Marcus telling me not to reopen settled work.

The money table is where the model shows. Fixed fee, a blended rate across the three levels, and it works on the mix: my hours are the cheapest, Marcus's cost more, David's cost the most, and the bulk of the plan sits at my level, not his. That's the reason nobody pulls David in for something Marcus can do, or Marcus for what I can do. An hour at too senior a level quietly bleeds the margin.

The bottom names three levers, leverage the mix I just saw, utilization keeping logged hours productive, realization delivering inside the priced hours. Not just words anymore, I can put each against something from this week, the redo that cost us, the reviews that kept it small, not adding a slide nobody asked for.

There's a recovery question in it. Two percent over at halfway isn't a hole you sprint out of, it's one you close by not adding to it, a few hours saved across the back half by not reopening things that are done, drafting the exec summary once off David's blessed structure instead of three times, letting Laura's read set the sequencing so I'm not rebuilding the recommendation later. And half of it isn't mine to spend, the most expensive hours here are David's, so protecting the margin partly means not pulling him into what Marcus or I can carry.

The tracker isn't a scoreboard I'm losing, it's the first time the business behind the work has been legible to me.

{{artifact:1}}`,
    commentary: `Marcus just handed me the engagement's hours tracker, which isn't a thing most first-years get to open. The work is interviews and decks, but the business is hours. We're on a fixed fee, which means the firm priced this engagement assuming a certain number of hours at each level, and every hour over that plan comes straight out of the margin. So what I'm looking at is honest bookkeeping: planned hours against actual, by week and by level. Marcus framed it as, you don't get to care about margin only once you're a partner. And he has a point. If I'm the one burning hours redoing a section three times, I should at least be the one who can see it in the numbers.

Seeing it laid out like that is a little sobering, in a useful way. The takeaway isn't to work scared, and it isn't that two percent over is a problem, because it isn't. It's that the budget isn't infinite, the expensive move is redoing settled work, and the most useful thing I can do over the next three weeks is get things closer to right the first time and stop reopening sections that are already done. That's a different discipline than doing good work. It's doing good work once. And honestly, Marcus handing me this wasn't a warning. It was a kind of promotion, trusting me to see the business the way he has to, so that when I make the small calls next week, which section to reopen, whose hours to spend on what, I make them with the margin in view and not just the deck.`,
    after: ``,
    artifactsHtml: { 1: { type: 'excel', html: meridianArtifact11Html } },
  },
  'management-consultant-meridian-full-d5-b3': {
    before: `Friday after lunch, a standing slot for internal development, the kind of skill-building that fills a consultant's office day. This week's session is a primer on the domain this kind of engagement runs through: private-markets investing, and how the institutional investors on the other end of a manager's portal actually consume the reporting they receive.`,
    simulatedWork: `The point of this session is simple. Any engagement like this one turns on understanding what the people on the other side of the portal actually need. Here is the substance underneath that.

**1. What these managers run, and the structure around it.**
An alternatives manager runs private-markets funds. Two common strategies are private credit (privately negotiated loans to companies, often held by pensions) and infrastructure (long-lived, cash-yielding assets like utilities and transport, often held by insurers). Both are private-markets funds, usually structured as a limited partnership. The manager is the general partner, or GP. The investors, the pensions, insurers, endowments, and so on, are the limited partners, or LPs. LPs commit capital up front; the GP calls it as deals arise (a capital call) and returns it as the investments pay off (a distribution).

The shape of a fund's life matters, because it drives what an investor is looking at in any given quarter. Capital is committed at the start but not handed over all at once. The GP draws it down over an investment period, usually the first several years, as it finds deals, and returns it over a longer harvest period as those investments mature. Early on, an investor has paid fees and seen little back, so reported returns look negative before they turn positive, the pattern known as the J-curve. A fund's vintage, the year it began investing, shapes what is normal to see at any point in its life, and comparing funds of different vintages without accounting for that is a common mistake. The manager's economics are typically a management fee plus carried interest, a share of profits above a hurdle rate, which is why the fee and performance detail on a statement matters: an investor is checking that what it is charged matches the terms it signed.

**2. The reporting artifacts an LP lives in.**
This is what shows up on the portal and what every interview keeps circling back to:
- The capital account statement (often called a PCAP, for partners' capital account). A per-investor running ledger: opening balance, capital called and contributed, the investor's share of gains and income, fees and expenses, distributions, and the ending balance. Issued quarterly. This is the statement an investor pulls at quarter-end for its own reporting.
- Capital call and distribution notices. The time-sensitive notes that say money is due (with an amount and a due date) or money is coming back. The funding window on a call is why notifications matter so much: miss the notice, and you are scrambling.
- The quarterly report package. The statement plus performance, fee detail, holdings detail, and the manager's commentary, usually delivered as PDFs or posted to the portal.
- The audited annual report. Once a year, the fund's financial statements are audited, and that annual document carries more weight for the investor's own auditors than the interim quarterly statements do.

Two things make these artifacts harder to consume than they look. The first is that the capital account statement is a roll-forward: each quarter's ending balance becomes the next quarter's opening balance, so an error or a restatement ripples across periods and has to be reconciled, not simply read. The second is timing. Private-markets reporting arrives on a lag, often many weeks after quarter-end, and an investor closing its own books is frequently waiting on the slowest manager in its portfolio. All of it is what an investor is trying to pull, on time and in a usable shape, when it logs into a portal at the reporting cycle.

**3. Why the last-mile pain is real, not a complaint.**
An LP across many managers logs into many different portals, each with its own format, and then has to export and consolidate everything by hand. A typical institutional investor is invested with twenty-plus managers. The industry has been moving for years from static quarterly PDFs toward portals that offer on-demand, exportable, notified data. There is even a standard-setter, ILPA, the Institutional Limited Partners Association, that publishes templates for how fees, performance, and capital calls should be reported, precisely because the assembly and reconciliation burden across managers is so widely felt. So when an investor says the bar has moved and a given manager is a couple of years behind, they are usually describing a real market shift, not a personal preference.

It is worth being concrete about why consolidation hurts so much. An investor with twenty-plus managers receives twenty-plus differently formatted statements, on twenty-plus timelines, through twenty-plus portals, and then has to normalize all of it into a single view of its whole private-markets program to report to its own board or committee. Nothing about that is intellectually hard. It is manual, repetitive, and error-prone, and it happens every quarter under a deadline. Reducing exactly this burden is why ILPA's templates exist, pushing managers toward a common structure for fees, expenses, performance, and capital-account detail. The market direction follows from it: away from static PDFs, toward structured, exportable, notified data, and increasingly toward programmatic access so an investor's own systems can pull the data without a person logging in at all. A manager that still delivers only a static quarterly PDF is, measurably, behind that curve, and the investors feel it most at the moments they are most under pressure.

**4. The insurer twist (why insurers are a different animal).**
A pension wants a finished document. An insurer wants finished data. Insurers run everything through their own systems for three things: statutory accounting (a separate, conservative accounting framework set by the NAIC, focused on solvency), regulatory capital (how much capital they must hold against an asset, which depends on the riskiness of the underlying holdings, so they need look-through detail), and asset-liability matching (lining up long-dated assets against long-dated obligations like annuities). For an insurer, a PDF is useless until someone re-keys and re-classifies it to fit statutory reporting. That is why an insurer wants a data feed straight into its systems, and why the gap costs an insurer more than it costs a pension: the downstream is a regulatory filing, not a board slide.

Each of those three has a sharp edge worth understanding. Statutory accounting is deliberately more conservative than the GAAP accounting most companies use, because its purpose is solvency, making sure the insurer can always pay claims, rather than portraying earnings. Regulatory capital runs through a risk-based framework: the riskier the underlying asset, the more capital the insurer must hold against it, which is precisely why an insurer cannot treat a fund as a single opaque line and must see through it to the individual holdings. That is the look-through problem, and it gets more demanding as regulators ask for more granularity over time. And asset-liability matching means the insurer is not chasing return in the abstract, it is buying assets whose cash flows and duration line up against long-dated obligations like annuities, which is why long-lived, contracted-cash-flow strategies suit them. Put together, these are why an insurer needs granular, structured, system-loadable data rather than a tidy document, and why the same reporting gap that merely inconveniences a pension can genuinely constrain an insurer.

**5. What good looks like on the manager's side.**
The distance between a laggard portal and a leading one is rarely about the accuracy of the data, which most managers get right. It is about how much of the assembly the platform does versus how much it leaves to the investor. A best-in-class portal delivers a consolidated capital-activity view across a manager's funds in one place; lets the investor export it as structured data as well as read it as a document; notifies the investor the moment a call or a document posts, rather than relying on a person to remember to send an email; remembers the investor across funds, so joining a second or third fund carries prior information forward instead of starting the paperwork from scratch; and increasingly exposes an interface so the investor's own systems can pull data without anyone logging in. None of these are exotic. They are the capabilities the market has converged on, and the reason a manager falls behind is usually not technology but priority: the portal works well enough that improving it never reaches the top of a roadmap, until investors start asking pointed questions or a competitor makes the manager look slow. There is also a cost the manager often cannot see in its own numbers. When the platform does not do the last mile, the manager's own client-service and investor-relations teams absorb the difference, fielding retrieval requests and rebuilding reports by hand on the investor's behalf. That cost rarely appears as a line item, so it is easy to under-invest in the very platform that would relieve it. Making that hidden cost visible is part of the value of an assessment like this.

**6. The one thing to carry back to any engagement like this.**
The single theme that recurs across investor reporting is the last mile. The portal delivers accurate data and then stops, leaving the investor to build the finished thing they need. The only variable is the shape of that finished thing: a board-ready document for the document-led investors, system-ready data for the data-led ones. Understanding the domain is what lets a team turn felt complaints into a recommendation a manager can actually fund and build.

The transferable habit is to start any engagement like this from the consumer of the output, not the producer. Ask what the person on the other end of the portal is actually trying to make, who they answer to, and what they have to do to the data before it is useful to them. That question reframes a pile of individual complaints as a single structural gap with a predictable shape, and a structural gap is something a team can prioritize, sequence, and cost. The specifics change from engagement to engagement, the strategy, the regulations, the systems. The move, understand the downstream need before you judge the upstream product, does not. Get that habit, and the domain stops being a wall of jargon and starts being a map a team can actually navigate.`,
    commentary: ``,
    after: ``,
  },
  'management-consultant-meridian-full-d5-b4': {
    before: `Late Friday afternoon. The team closes out the week before the wind-down. Short and forward-looking: what got done, and what week four needs to look like.`,
    simulatedWork: `Marcus: Quick wrap, then go home. Where did we land this week?

Carly: The gaps section of the deck is real and through David. The theme tracker's current. The guide did its job, and the insurer split held up across this week's new interviews, both the document-led and the data-led ones landed where we predicted.

Marcus: Good week. That last part matters more than it sounds. A hypothesis that survives a week of fresh interviews is one we can build on. If the split had wobbled, we'd be having a very different conversation right now.

Carly: It held cleanly. Nobody surprised us.

Marcus: Anything still loose that'll bite us in week four if we don't catch it now?

Carly: Two things. Onboarding's coded but not cleanly placed yet. We settled it in the problem-solving session, but the deck still carries it a little awkwardly. And a couple of the quantified-pain cells are blanks where investors wouldn't give a number, so the appendix has holes.

Marcus: Both fair. Place onboarding properly when you build the no-memory run of slides, and for the blanks, take one more pass at the last interviews to fill what you can, then stop chasing the ones that won't come. An honest hole beats a made-up number.

Carly: Agreed. I'll flag the ones we couldn't get so nobody thinks we missed them.

Marcus: Then week four, three things. First, we run the last of the thirty interviews early in the week, so the counts stop moving and we can finally commit to the numbers on the pages. Right now every count still has wet paint on it. Second, Laura's engineering lead gives us the feasibility read, and that's the big one, because it turns the sequencing page from a placeholder into the actual recommendation. And third, we start the one-page executive summary off the storyline David liked.

Carly: I'll own the sequencing page once Laura's input is in, and start the executive summary draft.

Marcus: That's the plan, and the three connect. You can't write the summary until the sequencing is real, and the sequencing isn't real until Laura's read is in. So the week has an order to it. Don't start the summary in earnest until the roadmap underneath it holds.

Carly: Understood. Feasibility first, then sequencing, then the summary.

Marcus: One thing to carry above all of it. David wants the money story loud. Every time you touch the roadmap next week, ask whether someone holding a budget can see what a little money buys versus the big bet. If a page doesn't answer that, it isn't done. That's the lens for week four.

Carly: Got it. The money has to be as visible as the gaps.

Marcus: Exactly. Good work this week. Genuinely. Go home.`,
    commentary: `Three weeks in, and for the first time the thing actually feels like a case we're making instead of a pile of interviews. That's the week the work turns, when here's what we heard becomes here's what they should do about it. Up to now it's all been gathering and shaping, the interviews, the tracker, the skeleton, everything pointed at a story we couldn't quite commit to yet because the evidence was still moving under it. Week four it stops moving. The last interviews close the counts, Laura's read tells us what's buildable, and the roadmap stops being a placeholder and becomes the recommendation Diane actually funds from. That's the part I'm looking forward to, the shift from describing the problem to committing to an answer, which is the part that either holds up in front of her leadership or doesn't. And the money lens Marcus left me with is the thing I'll carry into every page of it, because a gap without a fundable fix behind it is just a complaint with a chart. For now, though, it's Friday, and Marcus saying go home twice is the closest thing to a hard stop this job offers. I'll take it. The deck will still be there Monday, and so, apparently, will the whale.`,
    after: ``,
  },

  // ── Day in the Life (six blocks, one representative day) ──────────────────
  'management-consultant-meridian-dil-d1-b1': {
    before: `The engagement is an outside read for Meridian Park, an alternatives manager, on how well its investor portal actually serves the institutions that use it, and today is the Monday that frames the week. The team gathers in a meeting room at the firm's New York office, its home base for the work. David, the Senior Manager above Marcus and the senior face of the relationship, joins to do a pulse check at the halfway mark and point the work ahead: what the investor interviews are surfacing, which working hypotheses the team is now testing, and what has to move from raw interviews toward a finished argument. Marcus, the Manager, runs the day-to-day. Carly, the first-year consultant, has sat in on a string of the investor interviews and owns the synthesis and the first deck pages. This is the room where the day's work gets pointed.`,
    simulatedWork: `David: Morning, both. Let's keep this to the half hour, I'm due on another call at the top of the hour. We're at the halfway mark, so before we get into the day I want to see where we stand, and I want to walk out with a clean read on what each of you is driving toward. Marcus, bring me up to speed on the interviews. Are we tracking to get through the full interview list with room to spare before the readout, and what are they telling us so far?

Marcus: We're about halfway through, with more coming today, which puts us where we need to be to start locking themes. On track to finish the full list well before the readout. The headline's more consistent than I expected at this stage. Meridian's investors like the firm, the investment relationship's good, and they trust the data on the portal. The frustration's almost entirely about what the portal doesn't do once that data is in front of them.

David: Define what it doesn't do.

Marcus: The portal stops at providing accurate data and leaves the last step to the investor. The pension CIOs we've already spoken to describe it the same way. They can pull a quarter's capital activity, but not in one consolidated report, so their teams rebuild it by hand to get a number they can put in front of a board. They're paying for a finished product and assembling it themselves.

David: And that's not a one-off?

Marcus: It's the pattern. Carly's been coding it across the whole set, logging the themes out of each interview into the tracker, so she can speak to how widely it actually shows up better than I can.

Carly: It's the most common thread by a significant amount. The specific complaint changes, no consolidated capital-activity report, document search that doesn't really work, re-doing the same subscription paperwork for every new fund, no notification when something posts. But underneath, it's the same shape every time. The portal gets them to accurate data and then leaves the assembly to them.

David: Good. That's a clean foundation for the story, if it holds.

[David turns to the whiteboard and writes a single line: accurate data, then an arrow, then finished output, with a question mark over the arrow.]

David: That gap over the arrow is the whole engagement. Where's it most likely to break?

Marcus: The main risk is that the last step isn't the same for every investor. The pensions and endowments we've spoken to want a board-ready document at the end. The insurers may want something different, the data as a feed into their own systems rather than a document, because everything they run goes through statutory and regulatory reporting on their side. Carly's got both types coded, so she can say how the split's looking so far.

Carly: It's holding so far. The document-led investors and the data-led ones describe the same underlying gap, they just need a different finished product at the end. We've got Ellen, a pension CIO, this morning, and more of both types still ahead, so we keep getting a cleaner test of it.

David: And how's that split looking so far, roughly?

Carly: Early, but it's holding. The data-led ones are a smaller slice of what we've done, and their scores run harder. I'd want more of them in before I lean on it.

David: Fair. Let it fill in before we weight it.

Marcus: Which is a strength if it holds and we frame it right. One theme, the last mile, that shows up differently by investor type, and it's the same gap with a different finish line. It tells us the problem's structural, not a feature request from one annoyed client.

David: Agreed, as long as we don't let it sprawl into the portal should do everything. Remember what we're actually here to deliver. This is a gap analysis: we get an accurate read on the current state, we define the desired future state, and we hand Meridian a prioritized set of recommendations to close the difference, sequenced to what they can realistically fund. Two different jobs in there, and we keep them separate. As we synthesize, we capture the full client wishlist, everything the investors ask for, and then refining that wishlist down into the recommendation is its own exercise. Diane brought us in precisely because she can't force that prioritization cleanly from inside the firm. So every theme we carry has to survive the question of whether it's worth funding ahead of the next one, and a wholesale rebuild of the platform isn't on the table this year.

Carly: Quick one so I build it the right way. The full wishlist, everything anyone asked for, that lives in the tracker and the appendix, and the recommendation section only carries what survives the funding cut. Is that the split you want, or do you want the wishlist visible in the body too?

David: Tracker and appendix for the wishlist, so nobody thinks we missed a thing they said. The recommendation is the refined cut. Keep those two visibly apart and you've already sidestepped the way these decks usually go wrong, which is reading like a list of everything everyone wanted.

David: And put numbers on the themes as they firm up. When I read the storyline, I don't just want to see that the last mile is the big one. I want to know how many of the thirty raised each gap, and where you could get a time or a cost behind it. A theme with a count survives a room. A theme that's a feeling gets argued with.

Carly: The tracker's already carrying the counts and every quantification we can harvest, the analyst-days figures and the scores. I'll make sure each theme lands with a number behind it, not just a name.

David: That's what I want to see. The number is what turns a complaint into a finding.

Marcus: Understood. We're building the roadmap phased from the start. Quick wins that don't need a rebuild, then the heavier lifts sequenced behind them.

David: Right. And Laura owns the build and the roadmap on their side. If our phase one isn't realistically buildable, she'll know in about ten seconds, and we'll lose her. So the prioritization has to be honest, not just tidy. I'd rather hand her a short phase one that's real than a long one she laughs at.

David: Here's what I want us driving toward. I want to read the storyline top to bottom, the titles only, and have it hold together. It should walk the gap in plain terms: where Meridian is today, the relationship's good and the data's accurate; where a best-in-class portal would get these investors, the finished output they actually need; the gaps between the two; and a prioritized, fundable set of recommendations to close them. I don't need finished slides. I need the argument to survive me reading only the headlines. And let's not lock the section order until I've read it, if the by-type story turns out stronger than the flow we've got, we move it then, not now. Park that one.

Marcus: That's the plan. Carly takes the lead on turning the last-mile theme into the first real section, and she's sharpening the interview guide so the probes actually test it. I'll have reviewed and iterated on her pages with her before we share the next version with you.

David: Good. Carly, that section's yours to shape, not just to assemble. You've been in the room for these calls, so if the storyline wants to go somewhere the skeleton doesn't, say so before you build it, not after.

Carly: Will do. I've got a couple of instincts on ordering already. I'll bring them to Marcus rather than sit on them.

David: One more thing. There's a client checkpoint coming. Nothing in that room should be a surprise to Diane. We share where the themes are landing, we get her reaction, we adjust. The final readout in week six should feel inevitable to her, not new. Let's not save anything clever for the end.

Marcus: Agreed. I'll walk Gregory through the big pieces ahead of it so nothing lands cold.

David: Good. And keep that walk-through to the themes, not the recommendations. The checkpoint is where we test whether the gaps land with Diane, not where we hand her answers. If the themes are right, the recommendations write themselves later, and they'll feel like hers when they come.

Marcus: That's how I'll frame it with Gregory. Themes now, the fix later.

David: [glancing at the clock as he caps the marker] Then we're set. Let's get into it.`,
    commentary: `That's the frame for the day. What follows is my actual work, and today it runs in a clean line: an investor interview this morning, then cleaning up what we heard while it's fresh, then the internal session where we argue the themes into shape, then building a real deck page and watching Marcus take it apart. In a real week those are spread out and tangled with a dozen other things, but it's the same line every finding travels, from one investor's frustration on a call to a page David will read. Next up is that interview. Marcus leads it, I'm on notes, and the investor is Ellen, a pension CIO.`,
    after: ``,
  },
  'management-consultant-meridian-dil-d1-b2': {
    before: `Carly and her manager Marcus are joining a scheduled video call with Ellen, the Chief Investment Officer of a public pension fund that invests in one of Meridian Park's private credit funds. The team is partway through a round of interviews with Meridian's investors, gathering candid feedback on the investor platform to find where it falls short. Ellen is one of those investors. Marcus will lead the conversation; Carly is here to take notes and listen for what matters.`,
    simulatedWork: `[Marcus and Carly are on the call, cameras on, a blank notes doc already open on Carly's second screen. Ellen joins about forty-five seconds later.]

Marcus: Ellen, hi. I'm sure this is a busy stretch with quarter-end, so I really appreciate you making the time. I'm Marcus, and this is my colleague Carly.

[Carly smiles on camera.]

Ellen: Hi both. Happy to do it, honestly glad to hear Meridian's putting some work into the platform. There's room for improvement.

Marcus: That's exactly what we're here for. Just some brief context and a reminder on the scope before we dive in: Meridian brought us in to get an outside read on how the Meridian Investor Portal is really working for the investors who use it, rather than the people internally who aren't living in it the way you are. So we'd just love your candid feedback, what's working and, more useful for us, what isn't. And none of your feedback will ever be attributed back to you individually, we take everything we hear across these conversations and synthesize it into themes and recommendations for Meridian. Carly here will mostly be heads-down taking notes while we talk. We've got a handful of questions we'd like to walk through, but we'll follow up where it's useful and just see where the conversation takes us. Does all that sound good to you?

Ellen: Sounds good. You may get more than you bargained for.

[Marcus laughs.]

Marcus: That's exactly what we'd like to hear. We've got thirty minutes scheduled, do you have a hard stop?

Ellen: I do, so let's keep it to the thirty.

Marcus: Perfect. Let's get into it.

Marcus: So before we get into the platform itself, could you tell me a little about your own role? How long you've been with the fund, and what you are overseeing there?

Ellen: Sure. I'm the CIO, I've been here about nine years, the last four in this seat. So I'm responsible for the whole investment program, across asset classes. We're a public pension system, managing retirement assets for state employees, a little north of twelve billion in total.

Marcus: Thank you, that's helpful. And how long has the fund been investing with Meridian, and in what capacity?

Ellen: About six years. They run a slice of our private credit allocation. That piece has grown a fair amount since we started, though I won't get into the specifics, but it's a bigger part of the book than it used to be.

Marcus: Understood, no need to get into the numbers. So with private credit specifically, walk me through how you actually interact with the Meridian Investor Portal day-to-day. What are you logging in to do, and how often?

Ellen: It varies quite a bit. Month-end and quarter-end are the heavy times, that's when I'm in the portal pulling statements, performance, the capital activity for the period, the things I need for our own board reporting. Between those it's more ad hoc, someone on my team needs a document, or an investor relations question comes in and I have to go find the answer. So a few times a week normally, and then a lot around the reporting cycle. When we're closing a quarter, honestly, it's constant, me and the whole team, in and out of it all day.

Marcus: When you say the whole team, how many people is that, and what are they in there doing during a close?

Ellen: It's a small group, a handful of analysts and me, and during a close every one of them is in the portal at some point. One's pulling performance, one's on the capital activity, someone's chasing a document an auditor wants. It's not that any single task is hard. It's that there are a dozen small retrievals, and they all land in the same compressed window, because the board calendar doesn't move to suit us. So the portal being a step slower than it should be gets multiplied across the whole team, right when we have the least room for it.

Marcus: Got it. So it sounds like the reporting cycle is really where the portal gets put through its paces?

Ellen: That's exactly when it gets tested. And I'll be honest, that's when it costs me the most.

Marcus: Let's talk about that further. Could you describe what starts to become an issue for you, and elaborate a bit on where it comes from?

Ellen: The honest answer is that almost nothing I need comes out in one step. Take the capital activity for the quarter, the calls and distributions across the period. I can't pull a single clean report that gives me the whole picture. I end up opening statements one at a time and stitching them together in my own spreadsheet to get to the number I actually need for the board. It's not that any single document is hard to open. It's that the thing I actually need lives spread across a dozen of them, and the portal never once puts it together for me.

Marcus: When you say stitching together, is that you, or your team doing the rebuilding?

Ellen: My team. There's an unnecessary amount of time spent just pulling these reports, and it feels incredibly manual. The data's all in there. Getting it out in a shape I can actually hand to the board is the part that's painful, and for what we pay in fees, that's a little hard to swallow.

Marcus: So it's less that the information is missing, and more that the platform makes you do the assembly yourself?

Ellen: That's exactly it. I'm paying for a finished product and getting raw ingredients.

Marcus: Take me into the mechanics of it for a second. When your team does that assembly, what does it physically look like?

Ellen: It looks like someone with a dozen statements open, copying figures into a spreadsheet we maintain ourselves, one that has to be checked line by line, because a single transposed number in a board report is not a small thing. Then it gets reconciled back against the statements to make sure nothing was fat-fingered. It's careful work, and it's completely mechanical, which is the worst combination, high stakes and no thinking in it. If the portal produced the consolidated view, that entire step would simply not exist.

Marcus: Can you put a rough number on it? In a typical week, how much of your analyst's time goes to pulling and rebuilding this data?

[Ellen thinks about it for a moment.]

Ellen: It's hard to say exactly, but it's a meaningful share of those weeks. If I had to put something on it, the better part of a couple of days, just on the assembly, before anyone's actually looked at the numbers or thought about what they mean. That's the part that bothers me. The thinking is the job. The assembly shouldn't be.

Marcus: That's helpful, even a rough estimate. Let me just play that back to make sure I've got the shape of it: the data itself is accurate, it's all there, but a real chunk of your team's time in those weeks goes to turning it into something usable before anyone even gets to the actual analysis.

Ellen: That's it exactly. You've got it.

Marcus: Before we move off the capital activity, help me understand the other end of it. Once your team has assembled that number, where does it actually go?

Ellen: It goes to our board, or really to the investment committee of the board, which is the group that oversees the program on their behalf. They meet quarterly, and the private markets are one line item on a much longer agenda. So what they want from me is the clean version: here is the capital that went out this quarter, here is what came back, here is where we stand against the plan. One consolidated view they can absorb in a couple of minutes, because a couple of minutes is about what this allocation gets in that room. They don't want to see the dozen statements underneath it, and they certainly don't want to see the spreadsheet my team built to get there. They want the finished picture.

Marcus: So the assembly work is invisible to them by design?

Ellen: It has to be. Nobody on that committee should be thinking about how the number was produced. That's my job, not theirs. Which is exactly why it frustrates me that the portal makes the production so manual. The output has to look effortless in that room, and the only way it looks effortless is a lot of effort nobody sees.

Marcus: When you say board-ready, is that a specific format, or more a general standard of polish?

Ellen: It's fairly specific. One page, our own template, the capital activity laid out the way the committee has seen it every quarter for years, so they can compare this quarter to the last without relearning the layout. Consistency is half of it. If the numbers arrive in a different shape each time, the committee spends its attention on the shape instead of the substance. So my team isn't just assembling the number, they're forcing it back into a format the portal has never once produced, every single quarter.

Marcus: And is this specific to the capital activity reporting, or do you run into the same wall in other parts of the portal?

Ellen: It's not just that. Honestly, the one that gets me on a normal day is just finding a document. If our auditors ask for a specific quarterly statement from two years ago, or I need a particular notice, I can rarely just go in and find it. The search doesn't really work the way you'd expect. More often than not I end up emailing our relationship manager at Meridian and asking them to send it over.

Marcus: So you're going back to a person to retrieve something the portal is supposed to give you self-service?

Ellen: Right. And to be fair, they're responsive, I usually get it within a day. But that's a day, for something I should be able to get in thirty seconds myself. It adds up, and it's the kind of thing that makes the whole platform feel a step behind.

Marcus: You mentioned auditors. Is that the usual trigger, an external request, or does it come up in your own work too?

Ellen: Both, but the audit is when it really stings, because that's someone else's clock. Our external auditors come in once a year and ask for specific statements and notices going back years, and I'm the one who has to produce them. The trouble is the search matches on the wrong things, so a query pulls up everything or nothing, and there's no filter by fund or period or document type that reliably narrows it. When I can't pull the document myself, I'm emailing my relationship manager and then waiting, while an auditor sits there expecting something I supposedly have access to. It makes us look slower than we are. For my own work I can usually manage, I know roughly where things live. Under an audit request there's no working around it, I need the exact document, and the search either finds it or it doesn't, and too often it doesn't.

Marcus: That's useful. I'd like to shift to a different part of the relationship for a moment, the front end of it. When you've committed to a new Meridian fund, or added to your existing allocation, how does the onboarding and subscription paperwork tend to go?

Ellen: That's actually a sore spot, more for my operations team than for me directly, but I hear about it. Every time we come into a new fund, we're essentially starting the paperwork from scratch. The same entity information, the same authorized signatories, the same supporting documentation we've handed over several times already. None of it carries across from the funds we're already in. So my team is re-keying and re-sending things Meridian already has on file somewhere. And it's not a light lift each time, it's the whole package, as if we'd never done it before.

Marcus: And how many Meridian funds are you in at this point, across the allocation?

Ellen: We're in four of their funds now. Which is rather the point. By the fourth one, the idea that I'm sending over the same formation documents and signatory list again is a little absurd. They have all of it.

Marcus: So even by the fourth fund, none of what you've already given them carries forward?

Ellen: None of it. Every time is a first time, as far as the paperwork is concerned.

Marcus: And when you say your operations team feels it, what does that actually look like for them?

Ellen: It looks like my operations people rekeying entity details and re-collecting signatures that Meridian already has on file, for a fund we're backing precisely because we already trust them. There's a small indignity in it that wears on people. My head of operations raised it with me directly after the last one, which is honestly why it's on my radar at all. It isn't the biggest thing on this list, but it may be the most needless.

Marcus: Is that typical across your managers, or do some handle the repeat paperwork better?

Ellen: The better ones handle it well. When I go into a second or third fund with a manager who has their act together, they come back with most of it already filled in, and they only ask me to confirm what's actually changed since last time, a new signatory, an updated address. That's the difference. It tells me they're treating us as an existing relationship, not a brand new one every time.

Marcus: And is that a heavy lift for them, do you think, or does it just look like they've kept your file?

Ellen: It looks like they've kept our file, which is all it really is. They hold what they already collected, and they present it back to me to confirm rather than to re-enter. It isn't sophisticated. That's what makes Meridian's version frustrating, it's not that the better approach is hard or clever, it's that it's obvious, and they simply haven't built it. When the fix is that mundane and it still isn't there, you start to read it as a question of priority rather than difficulty.

Marcus: Got it. Coming back to the day-to-day for a second. Earlier you mentioned the capital calls and distributions. I'm curious how you actually find out when one of those, or any new document, lands in the portal. Does it tell you, or are you going to look?

Ellen: It's on me to go and look. The portal itself doesn't really tell me anything. What happens in practice is that our relationship manager emails me when a call is coming, and I do appreciate that, but it means I'm leaning on an email rather than the system. If that email is late, or it lands while I'm traveling, the first time I'm seeing a call notice might be well into the window I have to fund it. And the window to fund a call is never generous, so being a day or two behind on even seeing it is not nothing.

Marcus: Has that ever actually cost you? A call you saw too late, or a funding you had to scramble on?

Ellen: Nothing's gone wrong in a way I'd put in front of my board, no. But there have been a couple of times I've had to move faster than I'd like, because the notice reached me late. And that shouldn't come down to whether I happened to catch an email.

Marcus: When you say move faster, what does that involve on your end? Is it just timing, or does it cost something?

Ellen: It's mostly timing, but timing has a cost. A capital call has to be funded by a date, and the cash to fund it usually has to come from somewhere, a sale, a transfer, sometimes just internal approvals that take a day or two of their own. When I see the call with a comfortable runway, all of that is routine. When I see it late, the same routine gets compressed into a scramble, and a scramble is where mistakes live. Nothing has broken yet. But I'm managing that risk with my own attention rather than with a system, and attention is the thing I have least of during a close.

Marcus: If the portal could push that to you directly, what would actually be useful? An email alert? Something on the dashboard when you log in?

Ellen: Honestly, both, but the key thing is that it's tied to the actual event, not someone remembering to send it. The moment a call is issued, I should get a notification, with the amount and the due date, and it should be sitting at the top of my dashboard until I've acted on it. The good platforms do exactly that. I'm never relying on someone's email, the system itself is keeping me on top of what I owe and when.

Marcus: And today, with no alert in the portal, how do you make sure nothing slips? Is there a manual check you run?

Ellen: My assistant and I keep our own calendar of expected calls, based on what the managers have signaled, and someone logs into each portal on a rhythm just to see what's appeared. So we've built a manual net under a system that should be catching this itself. It works, mostly, because we're diligent about it. But it's exactly the kind of thing that shouldn't depend on us being diligent. The one time the net has a hole in it is the time a call is sitting there that nobody flagged.

Marcus: This is helpful. We've still got a few minutes, so let me ask you to benchmark us against the rest of your managers. If you had to put a number on Meridian's portal, one to ten, where does it land, and where do your other managers sit?

Ellen: Honestly? I'd put Meridian around a six. They're not the worst I deal with, the data's accurate and it's all there, which I don't take for granted. But a six. My best manager on this is probably an eight, maybe a touch higher.

Marcus: And what's the other platform doing that Meridian isn't?

Ellen: A few things, but the one that stands out: when I log in at quarter-end, the reporting I need is essentially already built. There's a consolidated statement that gives me the full capital activity picture in one place, formatted in a way I can almost hand straight to my board. I'm reviewing and sense-checking, not assembling. With Meridian I'm starting from parts. With them the work is reviewing a finished thing. With Meridian the work is building the finished thing first, and then reviewing what I built.

Marcus: So the gap is really about the last mile, taking it from accurate data to something board-ready, without you doing that work yourself?

Ellen: That's a good way to put it. And the document piece too, with that platform, search just works, I find what I need and move on. It's not that Meridian is broken. It's that the bar has moved, and they're sitting where some of the others were maybe two years ago.

Marcus: Is that a sense you've formed on your own, or something you hear from peers in your seat too?

Ellen: Both, honestly. I compare notes with a few other CIOs at systems like ours, informally, and this kind of thing comes up. Not Meridian by name, we don't talk about specific managers that way, but the general shape of it, the ones who've modernized the reporting and the ones who haven't. It's become one of the things people in my seat notice, where a manager sits on the technology, not just on returns. A few years ago nobody compared notes on a portal. Now it comes up.

Marcus: Well, that just about does it for the prepared questions I had. We're close to time. Carly, anything you'd like to ask before we wrap?

Carly: Just one thing. You've described all of this pretty clearly, the assembly work, the document search. Have you raised any of it with Meridian directly, and if so, what's come back?

Ellen: That's a fair question. I've mentioned it, more than once, usually to our relationship manager. They're always gracious about it, they take the point, and then nothing really changes. I don't think it's unwillingness. My read is it's bigger than the person I'm talking to, it's the platform itself, and that's not something a relationship manager can just go fix.

Carly: That's helpful, thank you.

Marcus: Good, thank you. We've covered a lot of ground, and I want to be respectful of your time. Before we close, is there anything we didn't ask about that you think we should have? Anything on the platform that's been on your mind?

Ellen: I think you got the heart of it. The only thing I'd add is that none of this is a dealbreaker for us, the investment relationship is good and that's what matters most. But you asked about the platform specifically, and on that, it's been the same set of frustrations for a while now. So if this is a sign they're actually looking at it, that's good to hear.

Marcus: It is, and that's exactly why we're talking to people like you. This is genuinely helpful, and it goes directly into what we take back to Meridian. Thank you for being so candid, and for the time, I know it's a busy stretch.

Ellen: Of course. Happy to help. Good luck with it.

[The call ends a few minutes shy of the hour.]`,
    commentary: `[(after Ellen drops off)]

That was a good one. Ellen was candid, which you can't always count on, and I've got a couple of pages of notes I want to tighten up before any of it blurs. Right now I can still hear exactly how she said things, which thing she rated a six, why the better manager came out ahead, the one or two offhand comments that I think actually matter more than she let on. A few days from now that detail is gone, and "the portal is clunky" is all that's left.

Fortunately we don't have another interview right after this, so I've got the time to clean these up while they're fresh. That doesn't always happen, so when it does, I take it.

My cleaned-up notes are an important artifact, and they get added to our ongoing list of completed interviews. We're three weeks into a six-week project, so we've already started gathering what we're hearing into key themes, and those themes are what really inform our final recommendation deck to the client. Later today we'll sit down as an internal team to talk through what we're hearing, tighten the themes, and start shaping our draft deck narrative.`,
    after: ``,
  },
  'management-consultant-meridian-dil-d1-b3': {
    before: `After the Ellen call, Carly stays at her desk to work the interview notes into shape while Ellen's voice is still fresh. What comes out is a pair of artifacts, shown back to back: first the raw notes Carly typed live during the call, then the cleaned, structured write-up she rewrites them into, the same conversation moved from private shorthand into a document that carries on its own.`,
    simulatedWork: `{{artifact:1}}

The raw block above is what a live call leaves behind, and the write-up below isn't a clean retype of it, it's a run of small judgments about what mattered. I'm starting with the headline, one line for the whole interview: the relationship's good, the data's accurate, the pain is the last mile. Everything else in the write-up sits under that, the hard facts up top in a small fields table, the findings below, ordered by how much they matter rather than the order they came up.

One number stops me. In the raw the assembly time is the better part of a couple of days, and for a second I can't tell whether she meant a week or a quarter. The run of the conversation settles it, the figure came right after Marcus asked her to put a number on it per quarter, so per quarter. It goes into the finding as her own rough estimate, not a hard figure, since it was a guess under a little pressure, not something we measured.

The gaps are what I'm really building toward, they're what the tracker takes. Three of them, the consolidated report, document search, and notifications, are the same reporting-cycle problem and sit together cleanly. Onboarding I'm less sure about, it's real and Ellen was pointed about it, but it's the front end of the relationship, not the reporting cycle, and a different team feels it. That one I don't settle at my desk, I code it and flag it for the group, a question rather than a call I make alone.

{{artifact:2}}`,
    commentary: `Next it goes into the running theme tracker, where the interview stops being one person's story and becomes part of the count the deck will stand on, one more row in a matrix that's finally getting big enough to say something on its own. Two things are worth watching as the interviews continue: whether the last-mile split really breaks document-led versus data-led the way it's starting to, and whether other investors feel the onboarding re-papering as sharply as Ellen does. I'll flag both for the team so the calls still ahead can probe them.`,
    after: ``,
    artifactsHtml: { 1: { type: 'document', html: meridianArtifact05Html }, 2: { type: 'document', html: meridianArtifact06Html } },
  },
  'management-consultant-meridian-dil-d1-b4': {
    before: `With the morning's interview done and its notes cleaned up, Marcus and Carly sit down in a small breakout room, four chairs and a TV mounted on the wall, for the team's problem-solving session: the working meeting where the team compares what it is hearing, attacks its own logic, and tightens the themes into something the deck can stand on. Two artifacts drive the hour, the theme tracker and the skeleton deck, and Carly has both open on her laptop to put up on the screen.`,
    simulatedWork: `Marcus: [dropping into a chair, still half in the meeting he just left] Sorry, ran long with David on the staffing thing. Okay. I've got us for the hour and then I've got a hard stop, so let's actually use it. Three things I want by the time I leave. I want to walk the storyline and see if it survives me. I want the themes locked well enough that you can build on them this afternoon and not have the ground move under you. And I'd like you to leave here with a clear next step and no ambiguity. Pull up the skeleton. Walk me through the storyline and I'll try to break it.

[Carly plugs her laptop into the wall display and brings up the deck.]

Carly: Here's the shape of it, so push on any of it. Current state, the relationship's good and the data's accurate, nobody argues with that. Then the gap, the portal stops at accurate data and leaves the last mile to the investor, and the bar's moved on them. Then the future state and the recommendations, a prioritized, fundable set of improvements to close it. The middle, the gap, is where the real work is.

[Marcus leans back and reads the titles on the screen for a moment, not saying anything.]

Marcus: Show me the action titles top to bottom. Just the titles, not the evidence. If the story's real it holds as a paragraph on its own.

[Carly scrolls slowly through the section headings while Marcus follows on the TV. A stretch of quiet, both of them reading.]

Marcus: Okay. It mostly holds. But the last-mile line is doing a lot of work. Is it actually one theme, or are we hiding four separate complaints under a nice phrase? Because if Laura asks what specifically do I build, the last mile isn't an answer.

Carly: Both, and I think that's the structure. The last mile is the umbrella, the one-line argument that explains why the four gaps belong together, the so-what sitting over all of them. Underneath it are the concrete gaps that actually get built: consolidated reporting, document search, notifications, onboarding. The umbrella explains why they hang together. The gaps are what goes on the roadmap.

Marcus: Good. That's the distinction I wanted. The umbrella's the argument, the gaps are the deliverables. Keep them clearly separated on the page or it reads as mush. A reader should be able to nod along at the umbrella and still point at the exact thing they're funding.

Carly: Right. Quick one before I build it out, because it changes how I lay the pages. Do you want the counts sitting on the umbrella page, or does the umbrella stay purely the argument and the numbers live down on the gap slides?

Marcus: Numbers on the gap slides. The umbrella page earns its keep on one clean idea, no clutter. The second you put a table of counts on it, people start reading the table and stop hearing the point. Prove the point first, then the counts back it up underneath.

Carly: Got it. Umbrella stays a sentence, the gaps carry the evidence.

Marcus: Before we go further, let me try to break the umbrella properly. Does anyone in the sample not fit it? Because if I can find one investor who's perfectly happy, a skeptic in that room finds them too.

[Carly scrolls back up the tracker and looks for a second before answering.]

Carly: There's one. A family office that barely had a complaint, scores them high, basically wants on-demand access and nothing more. So yes, the umbrella doesn't describe every single row.

Marcus: And does that break it?

Carly: I don't think so. One content outlier doesn't undo a pattern that shows up in the large majority of the interviews. If anything it makes us look honest, because we're not claiming everyone's miserable. But I'd rather we surface it ourselves than have Diane find it.

Marcus: Agreed. Don't hide the happy one, and don't let it wobble the theme either. A pattern that holds across most of the book survives one exception. Note it, maybe a line in the appendix, and move on. What I don't want is you building the whole section as if the sample were unanimous, because it isn't, and someone will know that.

Carly: Noted. I'll flag the outlier rather than airbrush it.

Marcus: One thing while you've got the storyline up. Is that current-state slide going to feel like we're letting Meridian off easy? Opening on the relationship is good makes me nervous in a room with Diane.

Carly: I'd push back on that a little. The accuracy's real, every single investor credits it, even the ones who score them low. If we skip past it we sound like we came in with a grievance. Leading with what works is what earns us the right to be blunt about the gap two slides later.

Marcus: Fair. Keep it, but keep it short. One slide, credited, and move. I don't want to spend the client's patience admiring the parts that already work.

Carly: One slide, then we turn. There's one thing I flagged on the tracker that I want your read on, because it doesn't sit cleanly under the umbrella.

Marcus: Go.

Carly: Onboarding. The re-papering for every new fund, meaning an investor who joins a second or third Meridian fund has to submit all the same entity paperwork and signatory forms over again, as if the platform had never seen them. It's real, around half of the investors we've spoken to raise it. But it's a different animal from the other three. The other three are all about getting data out at the reporting cycle. Onboarding's the front end of the relationship, before any reporting happens.

Marcus: What does the evidence say about the root cause?

Carly: That underneath, it's the same root cause as the rest. The platform treats every interaction as if it's the first one, no memory. But it's felt by a different team, operations rather than the CIO, and at a different moment.

[Marcus gets up and stands closer to the screen, looking at the onboarding column on the tracker.]

Marcus: So the mechanism's the same, no memory, but the symptom and the audience are different. If I put onboarding under a last-mile heading, the CIO reads the umbrella, agrees, and then hits the onboarding gap and thinks, that's not my problem, that's operations. And now the whole section feels loose to them.

Carly: That's exactly the risk. It reads like we jammed it in to pad the list.

Marcus: Then don't force it under the last-mile umbrella, because that umbrella's specifically about the reporting cycle. Make it its own theme, something like the platform has no memory, with onboarding as the lead example. Two clean themes beat one that's been stretched to cover both. It still belongs on the same roadmap, but it's telling a different part of the story, so let's keep it separate on the page.

[Carly is already typing, adding a new section heading into the skeleton as they talk.]

Carly: That's cleaner. I'm putting it in now as its own section so I don't lose it. And it actually helps us, because it hands us an obvious quick win. The reusable onboarding profile's a well-understood fix. It's not a research project, it's a thing other platforms already do.

Marcus: Good, and that's a nice one to have in our pocket, something concrete and cheap that Diane can picture. But don't build the fix into this section. Note it and keep going. We're proving gaps right now, not recommending.

Carly: Understood. It goes in the recommendations section, not here.

Marcus: While we're on the tracker, one more thing on that current-state benchmark. The score spread, the six against the eight. Where does that live?

Carly: I had it sitting near the front, almost as a headline. It averages a six-one for Meridian against an eight-one for the best other manager, and I think that number does a lot of persuading on its own.

Marcus: It does, but I don't want to open on a scoreboard. Averages invite an argument about methodology, and the second someone asks how we scored it, we're defending the survey instead of telling the story. [pauses] Actually, park that. Where the score spread goes, front page versus a benchmark slide in the future-state section versus the appendix, that's a formatting call, not a storyline call. We'll settle it in the deck review. Don't lose the hour on it now.

Carly: Fair, parking it. I'll drop it into the future-state page as a placeholder and we can move it later.

Marcus: Right. We're in the weeds. Pull up. [his phone buzzes on the table; he glances at it and thumbs a one-line reply] Sorry, David, on the same staffing thing. Keep going, I'm listening.

[While Marcus answers the message, Carly turns back to the tracker on the wall and scans down the insurer rows.]

Marcus: [putting the phone face down] Okay. Now the insurer split, because that's the one I'm least settled on. The data-led investors, the insurers, the ones who want raw data into their own systems rather than a finished document. I want to make sure we're not over-rotating on them, because so far they're a small part of the sample. We've got, what, five of them out of the eighteen?

Carly: Five so far, and the spread's real. Raymond rates Meridian a five out of ten and his best other manager a nine, a much wider gap than the document-led investors give us. But I'd be careful claiming insurers are the bigger population. I read them as the smaller slice with the sharper pain, because their downstream lands in a regulatory filing, not a board meeting. One thing we should do is ask Meridian for their own rough split of investors by segment. If insurers are, say, one in ten of their book, we need to know that before we let a loud five out of eighteen in our sample pull the roadmap toward a data-feed build that serves very few of them.

Marcus: Say more on why the pain reads sharper, because I want to be sure it's the downstream and not just that Raymond's a blunt guy who scores low.

Carly: It's the downstream. When a pension misses the polish, it costs analyst hours rebuilding a board slide. When an insurer misses the data, the cost lands inside a statutory filing with a regulator on the other end and a deadline that isn't theirs to move. Same missing thing, the finished output, but the consequence lands at a different order of magnitude. That's why the score gap is wider, not because he's grumpier.

Marcus: That I buy. So we frame it as a distinct shape of the same problem, not a second problem, and we're honest that it's a minority of the book with a disproportionate cost. That's defensible. If we oversell it, Laura prices a data-feed build that serves a handful of investors and the whole prioritization falls apart.

Carly: Agreed. I'll keep it as one theme with two finish lines, and let the numbers say how big each population is. And I'll get the segment-split question over to Gregory so we're not guessing later.

Marcus: Send it to me first, I'll route it through Gregory so it doesn't land on Diane as us not knowing our own sample. [glances at the clock on the wall] Okay. I've got maybe ten minutes before I have to run, so let me land this.

Marcus: The storyline holds. Better than it did twenty minutes ago, because it's two clean themes now instead of one that was quietly carrying two. Here's what I want next. Build the gaps section for real, the heart of the argument. Lead page, the umbrella: one idea, accurate data, last mile left to the investor. Then the by-investor-type split as its own page. Then the gaps themselves with the counts and the quantification under them. Action titles that state the so-what, evidence underneath, one idea per page. Get me a draft and I'll mark it up this afternoon.

Carly: Got it. Umbrella, then the split, then the gaps with numbers. And the no-memory theme lands where in that order?

Marcus: Right after the gaps, as its own short run of slides, onboarding leading. Don't bury it and don't blow it up. It's the second theme, not a footnote and not a co-headliner.

Carly: Clear. One idea per page, action titles carry the so-what, evidence sits underneath.

Marcus: And resist the urge to jump to the recommendation in this section. We earn the fix by proving the gap first. Don't answer the question before you've made them feel it.

Carly: I hear you. I'll keep the recommendations out of it entirely and just make the gap hurt.

Marcus: [standing, gathering his laptop] That's the one. Get me the draft this afternoon and I'll be straight into it. Good session.`,
    commentary: `Now the job changes. Up to now the deck's been a hollow frame, titles and placeholders, which is about all you can have three weeks into a six-week engagement with the interviews still coming in. This afternoon that ends. I start putting real content underneath the frame, the actual pages with the evidence from the tracker sitting under each claim, and it's the first time the argument stops being an outline and becomes something Marcus can react to page by page.`,
    after: ``,
  },
  'management-consultant-meridian-dil-d1-b5': {
    before: `With the themes tightened in the session, Carly settles back at her desk and starts turning the gaps section of the skeleton deck into real, populated slides. A skeleton deck is just that: section headings and placeholder titles with nothing underneath them yet, and these two hours are where it starts becoming an actual document. This section is the heart of the eventual deck, the pages that sit between the current-state setup and the recommendations and make the client feel the gap before the team proposes how to close it. What she's building is a first draft, not a finished section: real action titles, each one a full-sentence lead-in that states the point of its own page, with real evidence pulled from the tracker underneath, good enough for Marcus to react to this afternoon and certain to be revised several times before it is final. The discipline is one idea per page and only the evidence that proves the title, and the temptation she's learned to resist is opening the charting tools and making something look finished before the argument underneath it is settled. There's no meeting in this block, just the work, and the real task is to get the section far enough along that it's ready to take to Marcus.`,
    simulatedWork: `The gaps section is still a skeleton, three headings with placeholder titles and nothing under them, the frame Marcus and I argued into shape earlier. I'm building it out in order, umbrella first, since if that page doesn't hold, nothing on top of it will either.

First page is the umbrella. It has to carry the whole problem in a single line before any evidence shows up, and my first pass tries to hold everything at once, accurate and complete data, stops short of the finished output, investors left assembling the last mile. It sags in the middle, a title that needs two breaths is really two titles, so I'm cutting it down to the one claim: the portal delivers accurate data but stops short of the finished output investors need, and leaves them to build the last mile by hand. That's the sentence the rest of the page has to earn.

For evidence I'm keeping two quotes of the three I like. The third goes to the appendix stack, where the receipts live. The exhibit stays a sketch, a caption describing what it needs to show. I'm redrawing it from three boxes to two, data and finished output with the gap as the break between them, so the eye lands on the gap.

Page 3.2 moves faster, the session already settled the logic: the split, document-led against data-led. Pension side first, the missing board-ready report, anchored by the CIO who rebuilds a quarter of capital activity by hand. Her one-to-two analyst-days figure gets labeled as her own estimate, not something we measured, same tag every harvested number gets.

The insurer side I'm holding to exactly what the interviews support: structured data into their own systems, a PDF close to useless. It's strong enough without embellishment.

Now the title. I'm leading with the symmetry, pensions need board-ready documents, insurers need system-ready data, and honestly, I like how it reads. Clean parallel, looks finished. Moving on, there's a third page waiting.

Page 3.3 is the hard one. It has to carry the gaps themselves, four of them, how many investors raised each, what they do about it today, and the quantified pain, and every column is pulling weight. It's a heavy grid and a senior would flip past it, but cutting a column means dropping evidence I fought for, so it stays dense for now. Then a snag: one gap's count doesn't match the tracker, a stale number I'd carried from memory. That becomes a rule on the spot, numbers come off the tracker, never out of my head. Onboarding goes down as the separate no-memory theme rather than a fourth reporting gap, and the data-feed gap gets its own page, its pain a different order that a general grid would flatten. The middle column takes concrete verbs, not deals with it but opens statements one at a time and assembles them in a spreadsheet.

Then the titles test, each one on its own. 3.1 holds, 3.2 holds, 3.3 doesn't, and I can see it doesn't. What it wants is a clean lead slide with the counts as a bar and the table demoted behind it, but that's real minutes I don't have before the block ends, and Marcus asked for a draft he can react to, not a finished section. So 3.3 stays overloaded on purpose, with a note that it may need to come apart. What's here at the end is a genuine first draft, real titles, real evidence, two exhibits sketched, one page I already know is soft, which is about as far as a first pass goes.

{{artifact:1}}`,
    commentary: `The point of this block is to take what Marcus and I just agreed and get it onto real slides while the logic's still fresh. I draft, Marcus marks it up, and it tightens over the next few weeks before it's anywhere near the client. What I owe him is a genuine first pass he can react to, not a polished section, because the fastest way to waste his review is to hand him something so finished I've stopped being able to change it.

Now it's heads-down for the rest of the block. I'll keep drafting and cleaning these pages, get them as organized and easy to read as I can with the exhibits sketched in, and then take them to Marcus. That last part matters more than it sounds. A lot of being good in this seat is invisible: it's making the next person's step easy and never being the thing anyone's waiting on. Part of that, concretely, is building the draft so Marcus can move through it fast and drop his comments straight onto the page, because the quicker he can react the more passes we get, and the section only gets good by cycling through a few of them. So the goal for the rest of this block isn't perfection. It's clean enough that Marcus can start marking it up cold, and clear enough that his time goes to sharpening the argument rather than decoding my shorthand.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: meridianArtifact07Html } },
  },
  'management-consultant-meridian-dil-d1-b6': {
    before: `With the section drafted, Carly takes it straight to Marcus. He has her gaps section open on the screen and walks her through his edits. A meaningful share of it gets restructured, which on a first draft is the norm rather than a verdict on the work. The artifact is one of Carly's pages with Marcus's markup. This is the last stop of the day, where the page she built an hour ago gets pressure-tested before it goes anywhere near David.`,
    simulatedWork: `Marcus: [scrolling through the section one page at a time before he says anything] Give me a second, I want to look at the whole thing before I start marking it up.

[A pause while he reads down the three pages. Carly waits.]

Marcus: Overall, the bones are here. Three pages, and the argument's inside them. What it needs is staging, not rethinking, which is the good kind of problem to have on a first draft. Let me go page by page.

Carly: Please.

Marcus: Okay. First, the good news. Page one is doing exactly what it should. The title says the point, there's one idea, and the two quotes earn their place. I'd leave it almost alone. That's the bar for the rest.

Carly: Good. That one felt like it clicked.

Marcus: It shows. One small thing even there, the subtitle runs a hair long, so tighten it by a few words and the eye lands on the title first. Not urgent, just a clean-up when you're in it.

Carly: Easy enough.

Marcus: Now the work. Page three. What's the one idea on this page?

Carly: That four gaps drive most of the manual work.

Marcus: That's really two ideas on one page. You've got the gaps themselves, and how often each is hit, and what people do today, and a quantified column. That's a document, not a slide. A senior reads it and doesn't know where to look.

Carly: I know it's dense. I think I loaded it up because I didn't want to lose any of the evidence, it all felt like it was pulling weight.

Marcus: The evidence is pulling weight. It's just in the wrong container. Split it. The lead page makes the point, a small number of recurring gaps drive the manual work, with the counts as a simple bar. The detail table, what they do today and the per-gap numbers, moves to the appendix and you reference it. Nothing's lost, it's just staged so a reader takes it in the right order.

Carly: So the page says four gaps, here's how widespread, and the evidence table backs it from behind?

Marcus: Right. The titles test, remember. If David flips through reading only titles, he should get the argument. A small number of recurring gaps drive the manual work passes. A table with no title that says anything fails.

Carly: Let me try the lead title now, while it's in my head. Something like, a small number of recurring gaps drive most of the manual work investors describe. And the bar underneath is just the counts.

Marcus: That's the one. Say most of the manual work, not all of it, we don't want to overclaim and hand someone an easy objection on a page that's otherwise airtight. And keep the bar simple. Four bars, one color, ordered tallest to shortest, the base labeled right on it. Somebody should read that exhibit from the back of the room without you narrating it.

Carly: Four bars, one color, ordered, base on the exhibit. That's cleaner than the table anyway.

Marcus: It usually is. Next thing. Your counts. 13 of 18. Eighteen what?

Carly: Investors interviewed to date.

Marcus: Then say it on the page, every time. 13 of 18 investors interviewed to date. The minute a number floats without its base, someone in that room asks, and if we're explaining our own denominator live, we've lost a little credibility for no reason. Put the base on every exhibit, and build every slide to stand on its own. You can't assume anyone in that room read the page before it, so each one has to make sense by itself.

Carly: Got it. Base on every number, and every slide stands alone.

Marcus: And the numbers themselves. That 1 to 2 analyst-days, and the insurer figure on the by-type page, those are the investors' own rough estimates, not something we measured with a stopwatch. Label them that way on the page, reported estimates, so nobody reads them as our precise measurement and then picks at the method. Honest framing is also the safest framing.

Carly: I'll mark them as investor-reported. That's how they came to us anyway.

Marcus: Exactly. You never want to defend a number you didn't claim to have measured. One more on the evidence while we're on it. Those two quotes on page one, and any you pull onto the gap pages, make sure none of them carry a tag that points back to one person. No public pension CIO sitting under a quote. In a sample this size that's as good as naming them, and we told every one of these investors we wouldn't. Keep them clean.

Carly: They're clean on page one. I'll re-check as I pull more onto the gap pages.

Marcus: Good. The by-type page, page two, is strong. The two-finish-lines framing is the cleanest articulation of the whole problem we've got. I'd consider promoting it earlier, but let's not move the section flow until David has seen the storyline. One title fix. System-ready data is good, board-ready documents is good, but lead the title with the so-what, not the symmetry. Something like, because the downstream work differs, the same gap costs a pension a board report and an insurer a regulatory filing. Sharper. Play with it.

Carly: That's better. The symmetry was me being a little pleased with the phrase.

Marcus: It's a nice phrase. Just make it work for its place on the page. A title's job is the so-what, not the music.

Carly: So maybe, the same gap costs a pension a board report and an insurer a regulatory filing, because the downstream work is different.

Marcus: Closer. Lead with the cost, drop the because to the body. The same gap costs a pension a board report and an insurer a regulatory filing. Full stop in the title. The reason, the different downstream work, lives in the two supporting lines underneath. The title lands the stakes, the body explains the why.

Carly: Cost in the title, reason underneath. That's tighter. And on that lead page bar, do you want raw counts or the percentages?

Marcus: Counts, with the base right next to them, and put the percent in a lighter weight if you want it there at all. The count is the thing people trust. The percent is gloss on top.

Carly: Counts lead, percent supports. And the detail table I'm moving to the appendix, do you want it referenced on the lead page, or just living back there for whoever wants it?

Marcus: Reference it once, lightly. A line that says the full per-gap detail is in the appendix, no more. A skeptic needs to know we've got the receipts without the page having to carry them. You're building for two readers at the same time, the one who flips through reading only titles and the one who audits every number. Serve both, crowd neither.

Carly: One light pointer, detail behind it.

Marcus: Last thing. Nowhere in here do you hint at the fix, and that's correct, keep it that way. The gaps section is where we make them feel the problem. We don't get to the recommendations until later. Don't let a helpful instinct leak a fix into the section that's supposed to prove the gap.

Carly: Okay. So I split page three into a clean lead page with the detail behind it, put the base on every count, rework the by-type title so it leads with the so-what, keep the quotes unattributed, and keep any hint of the fix out of this section.

Marcus: That's a good list. And none of this is because the draft was weak. A first cut that needs this much shaping is just a first cut. The thinking underneath it is right, which is the part I can't fix for you. The structure I can.

{{artifact:1}}`,
    commentary: `Getting the section in front of Marcus rough, instead of polishing it alone for days, is the whole reason I brought him a draft this early. The instinct when a first draft comes back this marked up is to take it as a grade on the thinking. I've learned not to. A first cut is a first cut, and the notes are structural, which means they're an hour of work, not a verdict. The page he reworked the hardest was the one where I'd crammed four ideas onto a slide because I didn't want to waste the space, and the thing I hold onto is what he said at the end: the thinking was right, the structure wasn't. Structure I can fix in an hour.

[(closing the day)]

That's the loop, start to end. This morning Ellen told us she's paying for a finished product and getting raw ingredients. By this afternoon that exact frustration is sitting in a deck page, coded, counted, argued over with Marcus, and pointed at something Meridian can actually fund. I've walked you through it as one clean day. The real version is messier and more interrupted than this, more calls stacked up, more half-built pages waiting on a number. But the line through it is exactly what you just watched: a real person's problem this morning, on its way to a page David will read, by the end of the day.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: meridianArtifact08DitlHtml } },
  },
}
