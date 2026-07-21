import type { TimeBlockContent } from '../simulation'
import { artifact01Html } from './artifacts/artifact-01-cim-storyboard'
import { artifact02Html } from './artifacts/artifact-02-cim-execsummary'
import { artifact03Html } from './artifacts/artifact-03-model-cascade'
import { artifact04Html } from './artifacts/artifact-04-diligencetracker'
import { artifact05Html } from './artifacts/artifact-05-buyerlist'
import { artifact06Html } from './artifacts/artifact-06-cim-execsummary-markup'
import { artifact07Html } from './artifacts/artifact-07-cim-markup-priya'
import { artifact08Html } from './artifacts/artifact-08-model-deep'
import { artifact09Html } from './artifacts/artifact-09-cim-financialsection'
import { artifact10Html } from './artifacts/artifact-10-cim-growthsection'
import { artifact11Html } from './artifacts/artifact-11-nda-log'
import { artifact12Html } from './artifacts/artifact-12-runningstatus'
import { artifact13Html } from './artifacts/artifact-13-buyerlist-scrub'
import { artifact14Html } from './artifacts/artifact-14-cim-markup-warren'
import { artifact15Html } from './artifacts/artifact-15-cim-projections'
import { artifact16Html } from './artifacts/artifact-16-addbackschedule'
import { artifact17Html } from './artifacts/artifact-17-cim-growthexhibit'
import { artifact18Html } from './artifacts/artifact-18-turntracker'

// Investment Banking — Project Kestrel (Larkin Reed sell-side M&A for Halloran
// Foods, a founder-owned premium sauces and condiments maker). Per-project content.
//
// PHASE 3 SLICE: the four Orientation readings + the first three enterable
// full-week blocks (Monday, Blocks 1–3). The rest of the week is Phase 5. The
// block STRUCTURE (ids, times, titles, activity types) lives in lib/simulation.ts.
//
// Sources (transcribed verbatim; prose not paraphrased or trimmed):
//   IB_SellSide_Orientation_V1.md        (four briefing readings)
//   IB_SellSide_Full_Week_Master_V2.md   (full week; Blocks 1–3 here)
//
// Field mapping per block (see BlockContent.tsx for how each renders):
//   ORIENTATION readings render as briefing prose (the briefing flag in
//   lib/simulation.ts), so each reading's prose lives in `simulatedWork` with
//   before/commentary/after blank — matching the Meridian orientation convention.
//   FULL-WEEK blocks:
//     before        ← "Setting the Scene" (label stripped; neutral 3rd person)
//     commentary    ← the [Opening over-the-shoulder] + [Closing over-the-shoulder]
//                     framing paragraphs, joined in source order (Sabrina, 1st person)
//     simulatedWork ← the scene between the two over-the-shoulder markers: dialogue
//                     kept as "Name:", *italic* stage directions → [bracketed], and
//                     the [Opening/Closing over-the-shoulder] marker lines stripped
//     after         ← intentionally BLANK for every block

export const ibAnalystKestrelContent: Record<string, TimeBlockContent> = {
  // ── Orientation (four readings) ────────────────────────────────────────────
  'ib-analyst-kestrel-orientation-b1': {
    before: ``,
    simulatedWork: `Sell-side M&A advisory is the business of being hired to sell a company. When the owner of a company decides to sell, they do not usually run the sale themselves. They hire an investment bank to do it, and the bank works for the seller, on the seller's side of the table. That is what "sell-side" means: the bank represents the company being sold, not the party buying it.

The bank's job is to run the whole process and get the owner the best outcome. In practice that means a long, ordered sequence of work. The bank builds the marketing materials that tell the company's story, assembles the list of buyers worth approaching, reaches out to them, manages the back-and-forth as interested buyers dig into the numbers, and shepherds the deal from first contact all the way to a signed sale. A sale process like this can run many months, most of it a mix of intense work and waiting, and the bank steers it the entire way.

An owner hires a bank rather than selling the company directly because running a sale well is a specialized job, and an owner who has spent decades building a company has very likely not done it. A bank knows who the real buyers are, including ones the owner would never think of, and it knows how to create competition among them, which is what actually drives the price up. It knows how to present the company so a stranger understands in minutes why it is worth owning. And it knows how to keep the process confidential and controlled, so the owner's employees, customers, and competitors do not find out the company is for sale until the owner wants them to. The owner keeps running the business; the bank runs the sale.

Larkin Reed, the bank in this simulation, is a boutique. A boutique is a small, independent advisory firm, as opposed to a large full-service bank. The difference matters a great deal for what the week feels like from the inside. A large bank has deep benches and whole support departments: separate teams that build graphics, separate teams that produce documents, layers of people between the junior banker and the finished product. A boutique has none of that. The teams are lean, often just a handful of people on a deal, and there is no graphics department and no production department to hand things off to. The junior banker owns the whole work product. The document that goes to a buyer, the model behind its numbers, the list of buyers, the tracker of what has come in from the client: on a lean team, one junior person is building and holding all of it at once, across several streams of work running in parallel.`,
    commentary: ``,
    after: ``,
  },
  'ib-analyst-kestrel-orientation-b2': {
    before: ``,
    simulatedWork: `The company being sold is Halloran Foods. It is a manufacturer of premium sauces and condiments, and it sells them into two channels: grocery, meaning the retail chains where shoppers buy, and foodservice, meaning restaurants and institutional kitchens. It is a real industrial business, not a small operation. It runs its own plants and its own production capacity, it uses co-packing (paying outside manufacturers to produce additional volume beyond what its own lines can make), and it distributes at scale into major retailers. The company is worth roughly two hundred million dollars.

Halloran Foods is owned by the person who founded it, Rick. A founder-owner selling their own company is one of the most common situations in mid-market M&A, and the reasons a founder sells are worth understanding, because they shape how the deal is run. Some founders sell for liquidity, to turn a company they own on paper into actual money in the bank. Some sell for succession, because there is no obvious next generation to hand the business to and a sale is the cleanest way to secure its future. And some sell to take chips off the table, to convert years of risk and reinvestment into a payout while the business is strong and the market is willing. A sale is not a sign of trouble. For a founder, it is often the planned finish line of a career of building.

Larkin Reed has been hired to run this sale, and inside the firm the engagement has a code name: Project Kestrel. A kestrel is a bird, and the name has nothing to do with sauces, condiments, food, or anything else about Halloran Foods. That is deliberate, and it is standard practice. Deals get non-descriptive code names so that a leaked email, a printout left behind, or a call overheard in a hallway does not reveal which company is being sold or even what industry it is in. If the code name hinted at the target, it would defeat its own purpose. A food company would never be called "Project Harvest," and a sauce maker would never be "Project Skillet," because those names would leak the very thing the code name exists to hide. The name is a firewall, not a label. Throughout the week, the code name and what the company actually makes never touch.

The week joins Project Kestrel in the middle of it. The marketing document that the whole sale depends on, the one that tells a buyer the company's full story and numbers, is still being written. No buyer has been contacted yet, and no one has seen anything. The team is in the drafting phase, and this particular week is the one where the first full draft of that document comes together and goes through its first serious rounds of review, inside the firm and with the client. The company is not on the market yet. It is being prepared to go on the market, and that preparation is the work.`,
    commentary: ``,
    after: ``,
  },
  'ib-analyst-kestrel-orientation-b3': {
    before: ``,
    simulatedWork: `There are two sides to Project Kestrel: the bank's deal team, and the client. This is also where the seat is set, so it is worth pausing on one thing first.

You are shadowing Sabrina, the first-year Analyst on the deal. You watch the week over her shoulder, through her eyes, at her desk. She runs the work; you see how a first-year does the job. An Analyst is the most junior banker on a deal, and on a lean team that means Sabrina does the bulk of the actual production, the writing and the numbers and the lists, while the work and the judgment above her belong to more senior people.

**The deal team, at Larkin Reed.** These are the four people on the bank's side, and each is best understood by where they sit relative to Sabrina.

- **Sabrina** is the first-year Analyst, the shadowed seat. She builds the first drafts of the document, keeps the numbers tied to their source, assembles the buyer list, and holds the trackers. Almost everything she produces is a draft that goes up to be reviewed.
- **Danny** is the Associate, one rung above Sabrina and her hour-to-hour contact. He is the first person who reads anything she writes. He hands her the shape of the work, answers her questions through the day, and marks up her drafts. Nothing Sabrina produces moves any higher until Danny is satisfied with it.
- **Priya** is the Vice President, or VP. She runs the deal day to day. Her review sits a level above Danny's: where Danny catches the details, Priya reads the document cold, the way a buyer would, and tells the team whether the story lands and whether the pieces are in the right order.
- **Warren** is the Managing Director, or MD, the most senior banker on the deal. He is the senior face of the engagement and owns the relationship with the client. His attention is rarer and higher-stakes than anyone else's, and his sign-off is the last one inside the firm before anything reaches the client.

The order those four sit in is a chain the work climbs. A draft goes from the Analyst to the Associate to the VP to the MD, each level reviewing it before it moves up, and only a version the MD has cleared reaches the client. The phrase for this is going "up the chain."

**The client, at Halloran Foods.** These are the three people on the company's side who take part in reviewing the document.

- **Rick** is the founder and owner, the person who built Halloran Foods and whose company is being sold. A founder-owner is the bank's client and the person the sale is run for, the owner whose company it is and who has the final say on whether and how it goes to market. The bank advises and runs the process on the owner's behalf.
- **Marisol** is the CFO, the company's top finance person. She sends the financial documents the team needs and speaks to the numbers, checking the financial schedules line by line and defending the earnings adjustments, because she is the one a buyer's finance people will call.
- **Diane** is the company's outside M&A counsel, its lawyer for the sale. She carries the risk and disclosure language: the parts of the document where the exact words matter legally, and the questions about what can be said, to whom, and how.`,
    commentary: ``,
    after: ``,
  },
  'ib-analyst-kestrel-orientation-b4': {
    before: ``,
    simulatedWork: `### The CIM and its sections

- **CIM (Confidential Information Memorandum):** the confidential marketing document a bank prepares to sell a company, a long, detailed presentation that tells a prospective buyer the company's full story and its full numbers (known on the desk as "the book"). A buyer receives it only after signing an agreement to keep its contents secret.
- **Executive summary:** the front section of the book, a page or two a buyer reads first, stating in order what the company is, why it is worth owning, what the numbers look like, and what a buyer could do with it.
- **Business description:** the full account of what the company does and how it operates, its products, its plants and capacity, and how it makes and sells what it makes.
- **Market overview:** the description of the industry the company plays in, its size and shape and where the company sits within it.
- **Growth section:** the part that lays out the specific opportunities ahead of the company, ideally ranked by size and defensibility, where the argument for the company's future is made.
- **Risk factors:** the account of what could go wrong, naming the real risks plainly with a mitigant (the thing that reduces the risk) placed beside each where there is one.
- **Financial section:** the full backup for every number in the book, the historical results, the projections, and the earnings adjustments.

### The numbers

- **Operating model (three-statement model):** a large spreadsheet that projects the company's financials forward, built so historical and projected results all connect. It is the source of every number in the financial section.
- **EBITDA:** a standard measure of a company's operating profit (earnings before interest, taxes, depreciation, and amortization), a way of measuring the profit the business itself generates before the effects of how it is financed and taxed.
- **Adjusted EBITDA:** EBITDA after adjusting for costs a new owner would not actually bear, so the figure reflects the operating profit a buyer would inherit.
- **Add-back:** an adjustment that adds a cost back into earnings because a buyer would not inherit it.
- **The bridge:** the layout of the walk from reported earnings (the profits the company's own books show) at the bottom, each add-back stacked on top with a reference to the schedule that supports it, and adjusted earnings at the top. Each material add-back carries a short line saying why it is legitimate.
- **One-time vs recurring:** whether a cost happened once and will not repeat (so it can be added back) or repeats every year (so it cannot).
- **Hardcode:** a number typed straight into a spreadsheet cell instead of being calculated by a formula, dangerous because it sits stale and quietly wrong when everything around it updates.

### The buyers

- **Buyer list:** the roster of everyone the company might be shown to when the process launches.
- **Strategic buyer:** another company in or near the same business, one that could fold the target into what it already runs, and which often pays the most.
- **Financial sponsor (private equity fund):** an investment firm that buys companies to own and grow them rather than to operate them itself.
- **Add-on:** an acquisition a fund makes to combine with a related company it already owns.
- **Capital IQ:** a paid database used to screen and sort companies and investors by industry, size, and geography when building the buyer list.

### The process and paperwork

- **Teaser:** a short, anonymized profile, a page or two that describes the company without naming it, sent out to gauge interest.
- **NDA:** the non-disclosure agreement a buyer signs, promising confidentiality, before receiving the actual book.
- **Data room:** the secure online folder where a buyer's lawyers read the company's underlying documents once cleared to, holding final and executed versions only, never drafts.
- **Diligence tracker:** the running checklist of every document requested from the client, tracking what has come in, what is outstanding, and who owns each item.

### The review vocabulary

- **The turn (turning comments):** one full trip through the review chain and back. To turn comments means to take a reviewer's markup, work through every comment, fix each one, and send the revised version back up.
- **Recirculation:** sending a revised version back up the review chain for another round of review, one cycle in a loop that repeats several times before the document is final.

### The legal terms

- **Right of first refusal (ROFR):** a contract provision giving one party the right to match any offer before the other party can accept it elsewhere; its effect depends entirely on how it is drafted.
- **Change of control:** the legal term for a company changing owners, which is what a sale is.
- **Disclosure:** what the book must tell buyers and how, including what must be said, what must not, and in what words.`,
    commentary: ``,
    after: ``,
  },

  // ── Full week — Monday (Blocks 1–3) ────────────────────────────────────────
  'ib-analyst-kestrel-full-d1-b1': {
    before: `The week opens on the floor of Larkin Reed's own office, an open-plan bank floor where the junior bankers sit near each other in a row of desks and the senior bankers have offices along the windows. It is Sabrina's desk, and Danny, the Associate, sits a short distance away on the same floor; he rolls a chair over to her desk for the sync and rolls it back when he is done. Danny comes over to Sabrina, the first-year Analyst, to set the priorities for the week and hand off the shape of the first full draft of the Confidential Information Memorandum, the CIM: the marketing document that tells a prospective buyer the company's story and its numbers, and the thing the whole week is spent building. Danny is Sabrina's hour-to-hour contact and the first person who reads anything she writes; nothing she produces goes up to Priya, the VP, or Warren, the MD, until Danny is satisfied with it. This is a short desk-side sync, fifteen minutes or so, not a meeting. Sabrina has her running status list open, the one she keeps of every open item across the week's workstreams: the book (the CIM), the model, the buyer list, and the tracker and data room. Danny has the CIM section outline he is about to hand her, and a separate list of his own of what he owes Priya by Friday.`,
    simulatedWork: `[Danny pulls a chair over. He has the CIM section outline open on his laptop.]

Danny: Okay. Big week. The first full draft of the book has to come together and go up the chain, so by end of week it's clean enough that Priya's seen it and it's ready to go to the client.

Danny: Priorities, in order. One, the exec summary and the financial section. That's the front of the book and it's where ninety percent of the thinking goes, so it's where you start and it's what I'll be hardest on. Two, the buyer list, first real pass, tiered, so the seniors, Priya the VP and Warren the MD, have something to scrub later in the week. Three, the tracker and the data room, keep them current, we're still chasing documents from the client's side. Keep those current even when the book is the louder, more urgent-feeling priority.

Sabrina: Got it. Front of the book first.

[Danny turns the laptop so she can see the outline.]

{{artifact:1}}

Danny: Here's the skeleton. I built the section order and dropped in what pulls from where. The products and management sections you mostly lift from the management materials and the last template and tweak, don't spend real time there. The exec summary and the financials are the two you actually write, and those are the two that turn a hundred times, so budget for that. The operating model, the three-statement model that projects the financials, is the source for every number in the financial section, so anything in the book has to tie back to the model, not to a number you remember.

Danny: The model's mostly where it needs to be. There'll be a comment or two from me on it today, but draft off it as it stands and I'll flag anything that moves.

[Danny scrolls down the outline to the financial section and taps the screen.]

Danny: One thing on the financials before you start. The adjusted-earnings bridge, the walk from reported earnings up to the number a buyer actually values the company on. That's the part their diligence team lives in, so build it clean from the start, don't throw it together and plan to fix it later. Reported at the bottom, each add-back stacked on top with the schedule reference sitting right next to it. And I want the growth section ranked, not a flat list. If it reads like a new product and a whole new channel are the same size, that tells a buyer we haven't thought about it. Lead with the two you'd actually defend in a room.

[Danny sends her the skeleton. Sabrina's inbox chimes with it.]

Danny: Send me the first full draft before dinner. I'll read it in the queue and comments come back tonight, so plan on turning them this evening, not tomorrow. That's the rhythm all week, you draft in the day, it comes back marked, you turn it at night, it goes up a rung in the morning. And the buyer list, I want a first pass I can look at, not finished, but tiered with a reason next to each name so the seniors aren't reading a bare list when they scrub it.

Danny: One more thing, and it's the bar for the whole book. Priya reads it cold when it goes up to her, the way a buyer would, so write it so it holds up to a stranger, not to someone who already knows the company. She's not going to know that a number is right because you know it's right. It has to tie on the page. Anything you need from me, ping me, I'm here all day. I've got my own list for Priya by Friday, so the sooner your draft's in my queue the sooner it moves.

[Danny rolls the chair back to his own desk nearby. Sabrina checks the three priorities against her status list.]`,
    commentary: `I've got my own status list open in front of me, and my job for the next fifteen minutes is to check whatever Danny names against it, so nothing he throws at me is a surprise and nothing I'm already carrying falls off. That's how I keep the week's priorities straight from the first sync.

The week's set, and the front of the book is first. I check what Danny just named against my own list, so the exec summary and the financials go to the top, the buyer list sits under it for later today, and the tracker stays live in the background. Next I open the skeleton he sent and start on the exec summary, because that's the one I need to send him by this evening.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: artifact01Html } },
  },
  'ib-analyst-kestrel-full-d1-b2': {
    before: `The desk-side sync is over and Danny is back at his own desk. Sabrina, the first-year Analyst, is at her desk on the Larkin Reed floor, starting the first real build of the morning: the executive summary of the CIM, the front-of-book section a buyer reads first. Danny's section skeleton is open on one screen, a blank exec-summary page beside it, and the operating model open in a third window for the numbers. This is a heads-down individual work block, the first draft that has to reach Danny by this evening, and it runs until a comment from him interrupts it.`,
    simulatedWork: `[The skeleton is open on the left, a blank exec-summary page on the right. The operating model is open in a third window, parked on its summary tab.]

Sabrina: The exec summary is a page, maybe two, that says in order what a buyer needs to hear to want to keep reading: what the company is, why it's worth owning, what the numbers look like, and what you'd do with it. I'm writing four or five short blocks, not a wall of text, because a sponsor skims this in ninety seconds before deciding whether to hand it to an analyst for a real read.

Sabrina: First block, what the company is, and I have to write it so a stranger gets it in one line. Halloran Foods makes premium sauces and condiments, sells them into grocery chains and foodservice at real scale, has its own plants and production capacity. That's the description. But I don't lead the description with the plants, because a buyer doesn't fall in love with a factory. I lead with what they'd repeat to their investment committee: a premium, branded platform with shelf position and the margins to prove it. The plants come right after, as how it's delivered, not as the reason to care.

[She pulls the revenue and margin figures from the model's summary tab, one at a time, and reads each back against the model before it goes into the page.]

Sabrina: Second block is the money, and every number in it comes out of the model. I take the revenue figure off the summary tab and bring it across into the page, then the growth rate, then the margin. And I don't retype them, I pull them, because a number I retype is a number that can be one digit wrong and then it doesn't tie to the model it's supposed to match. Before I move on I check each one back against the summary tab, the revenue against revenue, the margin against margin, because this is the section a buyer's people check the hardest, and the summary and the model have to say the exact same thing.

Sabrina: Then the reason-to-own block, which is really the growth story compressed to three lines. The whole growth section further back lists every opportunity the company has. Up here in the summary I can only fit the two a buyer would actually underwrite, so I pick the two that stand on business the company already has: the club-store program annualizing, which is revenue from a win they already booked landing in full next year, and the committed new lines going into the co-packing capacity. I leave the pricing upside out of the summary entirely, because that's the soft piece and the summary is not where you lead with the soft piece. Leading with the biggest and most defensible is the same instinct as the first line: give them the thing that matters and let the detail follow.

{{artifact:1}}

[A new-mail chime. She reads it and stops what she is doing.]

Sabrina: And there's a comment in from Danny, and it's on the model, not the book. He wants a line in the model reworked, and the reason I turn it right now instead of finishing this paragraph is that the model is the source for the numbers I'm writing into this exact section. If I keep drafting off the old model and turn his comment afterward, I've written numbers that are already a version behind. The summary goes on hold, mid-block, and I go into the model first.

[She switches to the model, finds the flagged line, and works the comment.]

{{artifact:2}}

Sabrina: His comment is on one of the revenue build lines. He wants the club-store business split out so it's visible on its own rather than buried in the total, which is the kind of thing a buyer wants to see broken out anyway, because it's the piece that annualizes and they'll want to size it themselves. I go into the build, find the line, and separate the club-store volume out onto its own row so it flows through cleanly to the summary tab. The thing I watch when I do this is what moves downstream, because a change to one line in the model isn't one change. It ripples into the revenue subtotal that line feeds, into the total below that, and into every place in the book that pulls from those totals.

Sabrina: And it does move a number. Splitting the club-store line shouldn't change the total on its own, the pieces still add to the same sum, but when I look at the summary tab the total has moved by a hair anyway, and that tells me the split wasn't clean. I trace it: the club-store row I broke out was double-counting a sliver that was also sitting in the base grocery line, and pulling it onto its own row surfaced the overlap that the buried version was hiding. The split didn't just make the number visible, it caught a small error that was in there before. I fix the overlap, the total settles to the right figure, and now the revenue on the summary tab is both correct and a hair different from the one I wrote into the exec summary ten minutes ago. It was right against the old model. It isn't now.

Sabrina: This is the cascade, model to book, and I have to chase it. I take the current total off the summary tab, bring it across into the money block of the exec summary, and the two agree again. That's turning a model comment properly, not just fixing the model but fixing everywhere the model already flowed.

[She goes back to the exec-summary page and re-checks the two places the figure appears.]

Sabrina: And that same revenue number appears twice up here, once in the money block and once inside the reason-to-own lines, because the club-store piece is part of both the total and the growth story, so I fix it in both. One number can't disagree with itself inside the same page. Danny's comment is turned, the model's cleaner than it was and carries one fewer bug, and the summary ties to it again. Now I go back to where I was, which is the reason-to-own block I was mid-sentence on when the comment landed.

Sabrina: Back into it. I finish the two growth lines I'd picked, and then the last block, what a buyer would do with it, the value-creation angle. A branded platform with distribution already built is something a strategic folds into trucks they already run, and something a sponsor builds a bigger specialty-food platform around. I keep it to two lines, because the summary points at the argument and the sections behind it carry the weight.

[She reads the whole summary back from the top, as a page, not as blocks.]

Sabrina: Now I read the whole thing straight through, cold, the way Priya will when it goes up, because a summary can be right block by block and still not flow as a page. And reading it back, the seam between the money block and the reason-to-own block is abrupt, it jumps from a margin number straight into a growth claim with nothing connecting them. I write one sentence to bridge it, the line that says the margins are what fund the growth, so the two blocks read like one argument instead of two facts stacked. One sentence, and the page holds together.

[She moves to the financial section, the second of the two sections that carry the book.]

Sabrina: With the summary drafted I move to the financial section, the other one that's really mine to write and the other one that turns endlessly. This is where the summary's numbers get their full backup: the historical revenue and margins, the projections, and the adjusted-earnings bridge that walks a buyer from reported earnings to the number they'd actually value the company on. The bridge is the part a buyer's diligence team lives in, so it has to be clean and every step has to have a reason next to it. I build it off the model, the same source, so the bridge and the summary and the model all agree, because a buyer reads them side by side and any gap between them is the first thing they pull on.

Sabrina: I lay the bridge out the way Danny said this morning, reported earnings at the bottom, each adjustment stacked on top with the schedule reference sitting next to it, adjusted at the top. The first add-back I set is the owner compensation, because it's the cleanest one: the founder pays himself well above what a hired chief executive would cost, and a buyer isn't inheriting that package, so the difference goes back into earnings. Next to it I put the schedule reference and a half-line saying why it's legitimate, so a buyer reading the bridge sees the reason without going to hunt for it. And because the bridge builds off the model, and the model just moved on the club-store split, I check that the earnings base the bridge starts from is the current one and not the pre-split figure. It's current, because I'm building it fresh after the turn, but I'd rather confirm it than assume it.

Sabrina: That's as far as I get on the financial section before lunch, because it's past noon. This isn't the full draft going up yet, that's the one due to Danny by this evening. What I send him now is the drafted exec summary and the bridge as far as I've built it, in a short email that says what's done and what isn't: the summary's drafted and ties to the model, Danny's model comment is turned, and the financial bridge is laid out but not finished, with the rest of it plus the buyer list coming this afternoon. That way he can start reading the front of the book over lunch while I keep building, and the complete draft still reaches him tonight the way he asked. The financial section keeps going this afternoon and it'll turn a dozen more times before the week's out.`,
    commentary: `This is the front of the book, and it's mine to build. The exec summary is the first thing a buyer reads and it's the section that decides whether they keep reading, which is why it turns more than any other page. My job this morning is to get a real first version of it drafted, off the model for the numbers and off the management materials for the story, so it's good enough to send up to Danny before dinner. I start on the section that carries the whole book.

The exec summary's drafted and it ties to the model, Danny's model comment is turned and chased through everywhere it flowed, and the financial section's bridge is laid out even if it isn't finished. Next it's the buyer list this afternoon while Danny reads, and the whole draft goes up to him before dinner so his comments come back tonight for me to turn.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: artifact02Html }, 2: { type: 'excel', html: artifact03Html } },
  },
  'ib-analyst-kestrel-full-d1-b3': {
    before: `The first full CIM draft is up with Danny, the Associate, who is reading it in his review queue, so Sabrina, the first-year Analyst, moves to the next thing that does not need him. Lunch is a salad eaten at the desk with one hand. The buyer list is open, a working spreadsheet with three tier headers and only a few names under them, partially filled from this morning. Capital IQ is open in the other window; it is the paid database bankers screen companies and investors in, the tool an analyst lives in to find and sort potential buyers by industry, size, and geography. The floor is mid-afternoon quiet, the seniors out at appointments.`,
    simulatedWork: `[The buyer list is open. Three tier headers, Tier 1, Tier 2, Tier 3, and under them almost nothing.]

Sabrina: I start on the strategic side, because that screen is cleaner. In Capital IQ I'm filtering for companies in packaged food and condiments, revenue big enough to write a two-hundred-million check without it being a bet-the-company deal for them, headquartered somewhere that makes sense, North America first. The screen kicks back a few dozen names.

[She works down the screen output, name by name.]

Sabrina: Take the big branded-foods houses, the ones that already sell a dozen sauces and dressings into the same grocery aisles Halloran sits in. One of those goes straight into Tier 1, and the reason goes right next to it. They already own the shelf space and the distribution, so buying Halloran isn't a bet on whether they can sell it, it's just folding one more line into trucks and relationships they already run. A strategic that can plug it into what they've already got pays the most, because the deal is worth more in their hands than in anybody else's. That's what a Tier 1 is, the buyer the whole process is built to reach.

[She stops on a different name, looks at it, and pulls up its ownership before doing anything with it.]

Sabrina: Here's one that looks like the same thing on the screen and isn't. There's a company right in the adjacency, makes salad dressings and marinades, exactly the kind of strategic you'd want to lead with. But I half remember it got bought by a sponsor a couple of years ago, so before I write it into Tier 1 I pull its ownership in Capital IQ, because if I'm right that changes everything. And I'm right, it's sponsor-owned now. That means it's not a strategic with its own balance sheet anymore, it's a portfolio company that has to go back to its private equity owner and ask for the money, which is a slower, less certain buyer. That's why it comes off the strategic tier and drops into a note instead, a possible sponsor-backed add-on, which is a different call for a different day. The screen would have left it sitting in Tier 1 looking perfect. Checking the ownership before I trust the screen is the difference between a real name and a wrong one.

[She scrolls back up the strategic screen and stops on one more name before switching sides.]

Sabrina: One more on the strategic side that's a judgment call, not a screen result. There's a foreign player, a European condiments group, right size, right products, exactly the kind of name a broad process wants in the room. But it's a cross-border deal for a founder-owned business, which means a slower diligence, a foreign buyer's committee, currency and financing that all take longer. It stays on the list, because a foreign strategic can pay up to get into the U.S. market and that's worth having at the table, but it gets a note next to it that says cross-border, longer timeline, not a first call. That's the kind of thing the screen can't tell me and the seniors will want flagged, not buried three tiers down with no reason.

[She switches windows to the sponsor side of the list.]

Sabrina: Now the financial sponsors, the private equity funds, and this side is messier, because there are hundreds of funds and the screen alone gives me noise. I filter for funds that do food and consumer, in the right check size, and that already own something in the space, because a fund with a condiment company or a specialty-food platform already has a thesis and a management team who could actually run Halloran. Those are the ones who move fast. I pull maybe fifteen and start a one-line rationale next to each, because when Warren scrubs this he's not going to read a name with no reason next to it, and a name with no rationale is a name I'll have to defend later.

[A new-mail chime. She glances at it and stops.]

Sabrina: And there's the afternoon getting away from me. That's Marisol, the CFO's side, and she's finally sent over the customer contracts folder, the one we've been chasing for a week. This can't sit, and here's why. A client document like this arrives, lands in an inbox, and gets buried under the next thing, and then two weeks from now a buyer asks for it in diligence and we're the ones who lost it. The rule is you log it and index it the moment it lands, while you're still the person who knows it landed. The buyer list goes on hold, mid-rationale, and I go deal with the folder.

[She opens the diligence tracker, the running checklist of every document requested from the client.]

{{artifact:1}}

Sabrina: The tracker is my checklist of everything we've asked the client for, what's in, what's still outstanding, and who owns it. I find the line for the customer contracts, it's been sitting on outstanding with a chase date next to it, and I move it to received and stamp today's date. Then the part that actually matters, which is getting the documents into the data room correctly, because how they go in is not obvious and getting it wrong is the kind of mistake a buyer's lawyers find.

[She opens what Marisol sent and reads what is in it before touching the data room.]

Sabrina: Here's what's actually in the folder, because it's never one clean file. There are a couple of executed contracts, signed, dated, final. There's one that's clearly a draft, marked draft in the footer, no signatures. And there are two that are the same agreement scanned twice at slightly different times. The data room is the online folder a buyer's lawyers get to read once they're in diligence, and the discipline is that it holds final and executed versions only, nothing else, because a buyer's lawyers read whatever is in there literally, as if we put it there on purpose. A draft sitting next to the signed version invites the question of why the terms are different and which one is real, and that is not a question you want to create.

[She sorts the folder before anything goes near the room.]

Sabrina: The executed contracts go into the data room, into the customer-contracts section, which is where a buyer's lawyer goes looking for exactly this. And they get named the way the room names everything, counterparty then date, so a stranger scrolling the folder sees them in an order that makes sense instead of whatever the client happened to call the file. The draft and the duplicate scan do not go in. They sit in a holding folder on our side, and I put one line in the tracker flagging that we've received a draft of the biggest customer contract and should ask Marisol whether it ever got signed, because if an executed version exists we want it in the room, and if it doesn't, that's a fact about the deal we need to know before a buyer finds it for us. I'm not the one who decides what that means. But I'm the one who noticed, so it goes in writing where Danny will see it.

[She closes the tracker and the mail, and pulls the buyer list back up to where she left it.]

Sabrina: Right, back to the list, and I've lost my thread a little. I was mid-rationale on the sponsor names. I find the fund I was on, finish its one-liner, and keep going down the fifteen. A couple of them I cut on a second look, because their food platform turns out to be in beverages or snacks, not center-of-plate condiments, and adjacency that's really just food-broadly isn't a reason a fund pays up for this. Those come out. The tighter the list is now, the less of Warren's time it burns when he scrubs it.

[She fills the tier column as she goes, deciding each name rather than just listing it.]

Sabrina: Take a name like the mid-sized regional foods company two states over. It makes sauces, it's the right size, and on the screen it looks respectable. But it isn't in Halloran's grocery aisles, its distribution is mostly foodservice, and it's never bought anything, so there's no evidence it even wants to. It's not a wrong name, it's a real buyer, so it doesn't come off the list. It just isn't a Tier 1, because Tier 1 is the buyer who pays the most and moves the fastest, and this one is neither. It goes into Tier 2, worth including, worth a reason next to it, not worth Warren's first phone call.

[She scrolls to a fund near the bottom of the fifteen and looks at it for a second.]

Sabrina: And then a name like the big generalist buyout fund with no food platform at all. Huge, plenty of money, could obviously write the check. But nothing in the space, no management team who knows the category, no thesis I can point to. That's a Tier 3. Not because it's a bad buyer, but because the only reason it's on the list is optionality, one more body at the table so the process looks competitive, which matters, because a buyer who thinks they're the only one bidding doesn't pay full price. That's the whole job of Tier 3, and it's a real job, it's just not a name I'd lead with. It goes in, with one honest line next to it that says exactly that, rounds out the field, no existing platform.

[She works down the last of the names, then starts a second, less interesting column on the strategic tab.]

Sabrina: And then the part nobody warns you about, which is that a name in a tier isn't a name we can reach yet. For the Tier 1 strategics I go find who actually gets the first call, the head of corporate development or the CFO, not the general info line, and there's no clean database for that. It's the company's own site, a press release naming who ran their last acquisition, sometimes a LinkedIn check to confirm the person is still there. I get maybe half of them clean this afternoon and leave the rest with a blank in the contact column, because a wrong name in that column is worse than an empty one when Warren is about to pick up the phone.

[She saves the sheet and reads back down the tier column one time.]

Sabrina: By the end of the afternoon it's not a finished list and it's nowhere near it, but it's a real first pass, names in tiers with a reason next to each, which is what it has to be before it goes anywhere near a senior.

{{artifact:2}}`,
    commentary: `The draft's up with Danny, so while he reads it I move to the thing that doesn't need him, which is the buyer list. This is the list of everyone we might take the company to when we launch, the strategics who'd want to own a premium sauce maker and the private equity funds who'd want to own the cash flow. Right now it's a spreadsheet with almost nothing in it. This afternoon I run the screens, pull the names, and start sorting them into tiers, until Priya and Warren scrub it later in the week and add the names they know personally, the ones a screen won't make stand out.

The list is a first pass now, tiers and rationales, and it turns a few more times before it's real. The contracts folder is handled, executed versions in the room, the draft flagged for Danny. Next the draft comes back from Danny with his comments, probably late afternoon once he's had a full read, and that turn becomes tonight. The list I pick back up later in the week when the seniors scrub it.`,
    after: ``,
    artifactsHtml: { 1: { type: 'excel', html: artifact04Html }, 2: { type: 'excel', html: artifact05Html } },
  },
  'ib-analyst-kestrel-full-d1-b4': {
    before: `It is evening on the Larkin Reed floor, and dinner is cleared off the desk. The first full draft of the book went up to Danny, the Associate, before dinner, and it came back marked up, his comments running down the margin of the printed pages. Sabrina, the first-year Analyst, is at her desk with the markup open beside the live draft. This is an individual work block, the first turn the book goes through, and the plan for the night is to work down every one of Danny's marks and get the draft back up to him clean so it can climb to Priya in the morning.`,
    simulatedWork: `[The markup is open on the left, the draft on the right. Danny's comments run down the margin, some circled, some with a line pulling to a spot in the text, some a lowercase note.]

{{artifact:1}}

Sabrina: Starting at the top. The first one's on the opening line of the exec summary, and it's a rewrite, not a note. He's circled my first sentence and written "still a description, punch it." I led with the branded-platform line and thought that was the hook, and reading his mark I can see it still opens with what the company is instead of why a buyer cares. I rewrite it so the first clause is the claim a buyer repeats to their committee, the shelf position and the margin, and the description of what it makes comes second in the same sentence. That's what "the story" means on this desk, the order the reader meets the company in, and the first line is the one that has to earn the second.

[She reads the next comment twice before touching anything.]

Sabrina: This one has teeth. He's circled a number in the financial bridge and written "doesn't tie, source it." "Doesn't tie" is desk shorthand for a number that doesn't match its source. And I know why this one doesn't, because it's the club-store split from this morning. When I split that line in the model and caught the overlap, the adjusted-earnings base moved with it, and the bridge I built this afternoon was pulling a number from before the fix. It was right when I first laid the bridge out, and the model turn made it stale. Back into the model, take the current base off the summary tab, bring it across into the bridge, and now the bridge ties to the model again. Then I follow it one more level, because the model line pulls from the revenue schedule, so I go to the schedule and confirm it still agrees with the model after this morning's split. It does. The bridge ties to the model, the model ties to the schedule, three links and I've walked all three.

[She works down the margin. The floor is quieter now, the phones stopped.]

Sabrina: Now the volume of small ones, and there's a lot of them. First is a chart in the financial section where the y-axis label got clipped when I sized the exhibit, so it reads "evenue" instead of "Revenue," which is the kind of thing that's invisible until it's in front of a buyer and then it's the only thing they see. I resize the plot area and the label comes back whole. Next is a subtotal in the financial section that's bolded when the ones around it aren't, so I match the weight to its neighbors. Then a section header a point-size too heavy against the others, fixed. Then a footnote at the bottom of the customer page missing the period that every other footnote ends on, so I add the period. None of these is hard on its own. The discipline is that I do every single one and I don't skip the boring ones, because the fastest way to earn a second full turn tomorrow is to send this up with one small mark missed and have Danny find it.

[One comment in the margin is a lowercase note pulling to the whole customer section.]

Sabrina: Here's a bigger one. Next to the customer section he's written "reads defensive, frame the concentration." The section right now says the top account is a big share of revenue and then moves on quickly, like it's hoping nobody asks. And a buyer always asks. The fix isn't to hide it, it's to turn it into a strength: how long the relationship has run, that it's under contract with real term left, how hard it would be for that account to actually leave. Written that way concentration reads as a moat instead of a risk. The relationship length and the contract term are facts that live in the contracts folder Marisol sent over this afternoon, the one I indexed into the data room, so I go pull them from the executed contract and write the paragraph around the real numbers rather than around a hedge.

[She finds the contract in the data room, reads the term, and comes back to the paragraph.]

Sabrina: I open the customer-contracts section of the data room, find the executed agreement for the top grocery account, and read the term and the renewal history straight off the signed document, not off any summary someone typed up, because a summary is where a wrong number creeps in and this is a claim a buyer will hold us to. I take the length of the relationship and the years left on the current term and rebuild the paragraph on them, so a buyer gets the comfort right here on the page instead of having to go dig in the data room for it. And I don't overstate it, because every word in that paragraph is a claim a buyer will check against the contract they'll eventually read, so it says exactly what the executed agreement says and no more.

[Two marks near the back, on the financial section, written separately.]

Sabrina: These two go together even though he wrote them apart. First, the adjusted-earnings bridge. He wants each material add-back to carry a half-line saying why it's legitimate, because a buyer's diligence team reads a bridge hunting for the soft one, and a step with no reason next to it is the one they pull on. The owner-comp line I already gave a reason this morning, so I check the rest. There's one add-back for a batch of one-time costs that's sitting there with no justification next to it, and it's really two items on the schedule, the ERP implementation and a prior-period legal settlement, so I write the half-line on each and, because the bridge makes a claim and the schedule is the support, I flip to the schedule in the back and confirm the number on the bridge matches the number on the schedule line it points to. It does. Second, he wants the growth section ranked, not listed. Right now it treats a single new product and a whole new channel as the same size, which tells a buyer we haven't thought about it. I pull the two a buyer would actually underwrite, the club-store annualization and the committed lines, to the front, each with a line on why it's defensible, and let the rest fall into a list underneath.

[The clock is past nine. The red in the margin is nearly gone.]

Sabrina: Last thing, and it's the re-order Priya's going to want, which Danny's flagged in the margin as "market section too far back, pull it up." Moving the market overview forward isn't a rewrite, the words are fine, it's a sequence change, and a sequence change is bigger than it sounds. When the market section moves up, the section numbering moves with it, the contents page moves with it, and anything that cross-references "as discussed in the market section on page whatever" now points at the wrong page. I move the section, then I chase every reference and every page number that the move broke: I search the document for the ones that name the market section, find three that point at its old page, and fix each to the new one, because a book that cross-references a page that isn't there anymore is exactly the kind of thing Priya catches cold.

[She closes the markup and does the two passes.]

Sabrina: Then the two passes that close every turn. First, back to the top, down every comment against the draft one at a time, confirming each mark is actually handled, not from memory but against the markup with it open beside the draft. The clipped axis, fixed. The bolded subtotal, matched. The header weight, the footnote period, the customer paragraph, the two financial marks, the market move, each one confirmed against its mark before I let it go. Then I close the markup and read the document itself front to back as a document, because moving the market section up means the places where sections used to join don't work anymore, and that only shows up reading it straight through. Two transitions need a rewrite so the new order reads like it was always the order, and one sentence that pointed forward at the market section now points backward, so it comes out. Everything's addressed, and the whole thing goes back up to Danny so he can take it to Priya first thing.`,
    commentary: `This is the turn, the first one the book goes through, and it's the reason the whole day fed toward getting a draft to him. Turning comments means I go through every mark he left, fix each one, and send the whole draft back up so it's ready to go to Priya in the morning. Not most of the marks. Every one. I work down the margin, fix each, miss nothing, and get it back up clean.

The draft's back with Danny now, and it goes up to Priya in the morning. Before I pack up I check with him that nothing else is landing tonight, because you don't just leave, and then I head out and it's the car home. I'll keep half an eye on the inbox from home in case a last thing comes in, but the turn itself is done. Tomorrow the book climbs to the VP.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: artifact06Html } },
  },
  'ib-analyst-kestrel-full-d2-b1': {
    before: `The first full CIM draft went up to Priya, the VP, overnight, after Sabrina turned Danny's comments into it and sent it back up the chain. Priya sits a level above Danny, the Associate, and she reads the book cold, the way a buyer will, so her comments are the higher-altitude ones about whether the story lands, not the marks in the margin Danny gives. The walk-through happens in a small conference room off the main floor, where Priya, Danny, and Sabrina each have the draft up on their own screen. A VP walk-through of the book is short, twenty-five minutes or so, where she talks through the shape of the draft while the analyst captures every note to turn afterward. Warren, the MD, is not on this one; the book does not go to him until it reads clean. Danny, the Associate, is in the room. Sabrina, the first-year Analyst, has the draft open on her own screen, following Priya's scroll.`,
    simulatedWork: `[Priya has the draft open to the executive summary. She scrolls slowly, not looking up.]

Priya: The exec summary's doing two jobs and doing neither one all the way. It opens on the plants and the capacity, and somewhere in the second paragraph it gets around to why anyone would care about the earnings. That's backwards. A sponsor reads the first paragraph and decides whether to keep reading. Lead with the margin and the growth. Tell them how it's made after they already want it.

[She scrolls back up to the very top, to the first line on the page.]

Priya: And the opening sentence is a description, not a hook. "Halloran Foods is a manufacturer of premium sauces and condiments." True, and it puts the reader to sleep. The first sentence should say the thing a buyer would repeat to their investment committee. A premium, branded platform with the shelf position and the margins to prove it. Give them the reason in line one, then the description can follow.

[She keeps scrolling, then stops and comes back up a page.]

Priya: The market overview's sitting too far back. Right now the reader meets the company, then the customers, then finally the market it plays in. I want the market up near the front, right after the highlights, so the reader has the frame before we walk them through the business. Sabrina, that one's a re-order, not a rewrite. The words are mostly fine. The sequence isn't.

Sabrina: Got it.

[Priya scrolls into the customer section and slows down.]

Priya: This is the one I want to spend a second on. The customer section reads defensive. We've got concentration, we know we've got concentration, and the draft tiptoes past it and hopes nobody asks. Buyers always ask. Don't bury it. Frame it. The length of the relationship, the contract, how hard it would be for that account to leave. Written that way the concentration reads as a moat and not a risk. Danny, is the contract term in the room yet?

Danny: It's in. Came in from the CFO's side Monday afternoon, Marisol's team. Sabrina indexed it into the data room yesterday.

Priya: Good. Then there's no reason this paragraph should be as thin as it is. The facts are sitting right there. Pull the relationship length and the term straight out of the contract and put them in the paragraph. Don't make the buyer go to the data room to find the comfort. Give it to them here.

[She scrolls on, into the products section, and speeds up.]

Priya: Products I'm not worried about. This reads like it was built off the management materials, which is fine, that's what it's for. One thing. It's a wall of every line the company makes. A buyer doesn't need the whole catalog on page eleven. Lead with the two or three that carry the brand and the margin, and let the rest be a list at the bottom. Same instinct as the front. Lead with what matters.

[She reaches the financial section and slows again.]

Priya: This part I mostly like. The adjusted earnings bridge is clear, and the add-back for what Rick pays himself is sitting where it should, with the schedule behind it. Leave that alone. Two things, though. The bridge walks from reported to adjusted, but it doesn't say in one line why each add-back is legitimate. A buyer's diligence team reads a bridge looking for the soft one. Give each material add-back a half-line of why, so there's nothing for them to pull on.

[She scrolls one screen further, to the growth section.]

Priya: And this. The growth section promises a lot and it lands soft, because it lists every opportunity and doesn't rank any of them. Pick the two a buyer would actually underwrite, the ones you could defend in a management meeting, and put those first. The rest can stay a list. A growth section that treats a new SKU and a whole new channel as the same size tells the buyer we haven't thought about it.

[She reaches the end of the section and stops scrolling. She looks at Danny.]

Priya: The bones are here. It's the order that's wrong, and order is a bigger fix than it sounds. But get it done, because the calendar is tight and the client is waiting on a clean book, and this is the one thing standing between us and a version I can send to Warren. I don't want it perfect, I want it right and moving.

Danny: Will do. We'll have it back up to you tonight.

Priya: Tonight's fine. It doesn't go to Warren until it reads clean, so don't rush it up to me half-turned. I'd rather see it once, right, in the morning than three times tonight.

[Priya closes the draft on her screen. Danny is already pulling up the section map to start the sequencing.]`,
    commentary: `My whole job for the next half hour is to catch every structural note the way Priya means it, because I'm the one turning them this afternoon. If I capture a note loosely now, I turn the wrong thing later, so I stay locked on her scroll and get each one down exactly as she means it.

Danny and I sit down now and sequence the moves before I touch a word, and then it's mine to turn through the afternoon. It goes back up to Priya tonight, not to Warren, and I pick up wherever the sequencing leaves me.`,
    after: ``,
  },
  'ib-analyst-kestrel-full-d2-b2': {
    before: `The VP walk-through wrapped a few minutes ago, and Danny and Sabrina sat down straight after to sequence Priya's comments in the order to work them. Now Sabrina, the first-year Analyst, is back at her desk on the Larkin Reed floor with the book open beside the short list of Priya's notes. These are the VP's higher-altitude comments, about whether the story lands and whether the order is right, not the margin marks Danny gives, so this is a structural turn. It is an individual work block that runs until an ASAP from a senior interrupts it.`,
    simulatedWork: `[The book is open, and beside it the short list Danny and Sabrina built of Priya's comments in the order to do them.]

{{artifact:1}}

Sabrina: Priya's biggest note is the front of the book, and it's the one I do first because everything downstream sits on it. She wants the exec summary to lead with the demand and the margin, the reason to own it, and push the plants and capacity underneath as how it's delivered. I'd drafted it leaning that way already, and Danny had me punch the opening line last night, but Priya wants the whole opening block re-cut harder, so the very first thing a buyer meets is the shelf position and the retailer pull, and the operations move down to support it. Same facts, the order a buyer meets them in changes, and that order is the whole point of a front page.

[She moves to the market section.]

Sabrina: Next, she wants the market overview pulled up near the front, right after the highlights, so a buyer has the frame before we walk them through the business. I moved it partway last night on Danny's mark, but Priya wants it fully forward, ahead of the business description entirely. This is the re-order that breaks things, so I do it carefully: the section moves, then the numbering resequences, then the contents page updates, then I hunt every cross-reference that pointed at the market section by its old page and fix each one. I go looking for them on purpose rather than hoping I caught them last night, because I moved it partway then and a half-moved section is exactly where a stale reference hides. I find two references still pointing at the position it sat in this morning, and I fix both.

[A new-mail chime, flagged. She opens it and stops the structural work.]

Sabrina: And there's the interruption, and this one's an ASAP, which means it jumps the queue. It's from Danny, relaying Warren: Warren wants a buyer-list question answered before a call he's got this afternoon. He's asking how many real strategic buyers are on the list, the ones already in the same grocery aisles, because he's about to talk to someone and wants the number in his head. The book turn goes on hold mid-re-order.

[She switches to the buyer list, the one she tiered yesterday.]

Sabrina: I go to the list. Warren doesn't want the whole thing, he wants a clean count and the names behind it, the Tier 1 strategics specifically, the ones who own the shelf space already and would pay the most. I go to the strategic tab, count the names sitting in Tier 1, and before I send the number I check that each one still belongs there, because a count is only as good as the tier under it. The branded-foods houses hold. The European group I moved down half a tier yesterday isn't a Tier 1 strategic in the way Warren's asking, so I don't fold it into the count, I mention it separately. I pull the handful of Tier 1 names with the one-line reason next to each, because Warren isn't going to want a bare number, he'll want to know which houses. And I don't send it straight to Warren, because that isn't how it goes up: I write the count, the names, and the reason each is Tier 1 in a short two-line email to Danny, the Associate, who owns what reaches the seniors, and he relays it up to Warren, the MD, for his call. It's tight on purpose, a fact he can use, not a paragraph. Sent to Danny, up to Warren. Back to the book.

[She returns to the market-section re-order, and first finds her place.]

Sabrina: Right, back to where I was, which was mid-re-order on the market section. I find the last cross-reference I'd fixed and pick up from there, checking the ones after it, because I do not want to assume I finished a sweep I got pulled out of halfway. One more reference was pointing at the old page, in the appendix contents, and I fix that, and now the market move is clean, numbering and contents and every reference agreeing.

[She moves down Priya's list to the customer section.]

Sabrina: Next on Priya's list, the customer section. She wants the concentration framed, not buried, same instinct Danny had, and she asked specifically whether the contract term was in the data room, which it is, because I indexed the folder Monday. I already rebuilt this paragraph off the executed contract last night on Danny's mark, so what I'm doing now is checking it against exactly what Priya asked for, that the relationship length and the term are on the page and reading as a moat rather than a risk. They're there. I tighten one sentence so the term left on the contract lands harder, at the front of the point instead of tucked at the end, and it's done.

[She moves to the financial section.]

Sabrina: Then the financial section, where Priya had two. She likes the adjusted-earnings bridge and wants each material add-back to carry its half-line of why, which again Danny had marked and I turned last night, so I confirm each one is there and reads clean, the owner comp and the one-time-costs line both carrying their reason. Her second one is new: she wants the growth section's top two opportunities to each say in one line why a buyer could underwrite them, not just that they're the biggest, because a buyer trusts a ranked list more when the ranking has a reason. I add a line to each of the top two. The club-store annualization gets a line saying it's full-year revenue from business already won and landing next year, arithmetic on signed business, not a forecast. The committed new lines get a line saying they're pinned to the actual volume the company has committed into the co-packing capacity, not to what the sales team hopes it becomes. That's the kind of thing that turns a growth story from a wish list into something a diligence team can hold up against the contracts.

[She reads the reworked front of the book straight through.]

Sabrina: With the structural moves done I read the front third straight through, because that's the part that changed the most and the part that has to flow. The re-cut summary now leads with demand, the market frames it, the business follows, and reading it cold it holds together, except one transition sentence between the old order and the new is now pointing forward at a section that sits behind it. I cut that sentence, because it's a leftover from the order that used to be, and the new order reads like it was always the order. That's the last of the structural turn.`,
    commentary: `These are Priya's comments, and they're a level up from Danny's, so this is a structural turn, not a cleanup. The sequence matters, because if I move sections in the wrong order I break cross-references I then have to fix twice. I start with the re-orders, because they're the ones everything else depends on.

Priya's structural comments are turned, the front re-cut and the market moved and every cross-reference chased. Warren's got his buyer count for his call. Next the book goes back up to Priya tonight, not to Warren yet, and this afternoon I'm on the buyer list and the tracker while the front of the book settles.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: artifact07Html } },
  },
  'ib-analyst-kestrel-full-d2-b3': {
    before: `Lunch is done and the morning's turned book is back up with Danny, the Associate, so Sabrina, the first-year Analyst, is at her desk on the two workstreams that do not need him this afternoon: the buyer list and the diligence tracker. The buyer list is open to yesterday's tiers, and the tracker, the running checklist of every document requested from the client, is open in the other window with a few items still outstanding. This is an individual work block, tiering the list a level deeper and chasing the last open documents from Marisol, the client CFO's side.`,
    simulatedWork: `[The buyer list is open to yesterday's tiers, and the diligence tracker is open in the other window.]

Sabrina: I start on the list, because Warren using it this morning showed me where it's thin. Yesterday I got names into tiers with a one-line reason each. Today I go a level deeper, because a name with a reason is a start but the seniors are going to scrub this on relationships I can't see, and the tighter and better-reasoned it is going in, the less of their time it burns. I go tier by tier and pressure-test each name, is the reason next to it actually a reason, or did I put it in a tier because it looked right on the screen.

Sabrina: Take Tier 1, the strategics who'd pay the most. The branded-foods houses already in Halloran's aisles are solid, the reason holds, they own the shelf and the distribution and folding in one more line is easy for them. But I look again at the European condiments group I flagged yesterday as cross-border. Yesterday I left it on the list with a note. Today I make the note sharper, because "cross-border, longer timeline" isn't enough for Warren to act on. The note now says specifically why: a foreign buyer means a foreign investment committee, currency and financing that take longer, and a slower diligence on a founder-owned business, but it stays because a foreign strategic can pay up to get into the U.S. market. That's a name that belongs at the table with its risk labeled, not buried and not oversold.

[She moves to the sponsor tab.]

Sabrina: Then the sponsor side, which is the messier one, and where the tiering earns its keep. Yesterday I pulled the funds that already own something in food and consumer, because a fund with a specialty-food platform already has a thesis and a team who could run Halloran, and those move fastest. Today I split them, because "owns something in food" is too loose. A fund that owns a condiments or center-of-plate platform is a genuine Tier 1 sponsor, it plugs Halloran straight in. A fund whose food platform is really beverages or snacks is an adjacency that isn't really an adjacency, so it drops to Tier 2, on the list but not a first call, with the reason saying exactly that.

[She stops on one name, pulls its ownership before moving it.]

Sabrina: One name I have to check before I trust it. There's a sponsor I want to put in Tier 1 because on the screen it looks like it owns a sauce platform. But before I write it in I pull its holdings in Capital IQ, the database bankers use to check who owns what, because if that platform got sold or wound down since the screen last updated, the thesis I'm giving it isn't real anymore, and a wrong reason in front of Warren is worse than no name at all. I pull the holdings, and it still owns the platform, so it stays Tier 1 with the reason confirmed rather than assumed. Checking the ownership before I trust the screen is the difference between a real name and a wrong one.

[She switches to the tracker.]

Sabrina: Now the tracker, which is the other half of the afternoon. The tracker is my checklist of everything we've asked the client for, what's in, what's outstanding, and who owns each item. The big one landed yesterday, the customer contracts folder from Marisol, and I indexed the executed versions into the data room Monday afternoon. That line's already moved to received. What's left is the smaller outstanding items, and I go down the list and see what's still sitting on outstanding past its chase date.

Sabrina: There are a few. A couple of updated financial schedules the model needs, a supplier agreement, an org chart that's a version old. I write Marisol, and the discipline here is that a chase-up to a client CFO is a specific, easy-to-answer note, not a nag. I don't send "any update on the outstanding items." I list exactly what's still open, name each document, say why we need it and roughly when, and make it a two-minute thing for her to either send or tell me where it is. A CFO who's running a company and selling it does not have time to decode a vague chase, so the easier I make it to answer, the faster it comes back. And I copy Danny, not to escalate, but because he owns what I owe up the chain and a chase that goes out should be one he saw go.

[She sends the note and turns to indexing what has already come in.]

Sabrina: With that out, I index what's already arrived but not yet filed, because a document sitting in an inbox is a document that gets lost, and the rule is you file it the moment you can while you're still the person who knows it landed. The two schedules that came in earlier this afternoon get named the way the room names everything, the content then the date, and dropped into the financials section of the data room, the section a buyer's lawyer would go looking in. And here's the trap in that pile: one of the two schedules isn't a final, it's a working version with a tab still marked draft. That one does not go in the room, because the data room holds final and executed only, and a draft sitting next to a signed version invites a buyer's lawyers to ask why the terms differ and which one is real. It sits in a holding folder on our side with a line in the tracker flagging that we have a draft and should ask Marisol for the final, and only the clean schedule goes into the room. And because the model needs the number off that schedule, I note which figure I'm carrying from the draft as provisional, so tonight when I push it through I know it's the one that has to be re-confirmed against the final when it lands.

[She reads back down the tracker one time, checking status against reality.]

Sabrina: Last thing on the tracker, I read down the whole thing once and make sure the status column is honest, because a tracker that says received when the file isn't actually in the room is worse than one that says outstanding. Everything marked received, I confirm it's really in the room and named right. A couple I'd marked received are in but not yet named to the room's convention, content-then-date, so I fix those names. And the draft schedule I just held out, I make sure it reads outstanding-final, not received, because it isn't the version we can use. The tracker's only useful if a stranger can trust the status column, because Danny and Priya read it to know what's still hanging, and Priya's going to read it going into the process call tomorrow.

[She goes back to the list to finish the contact-detail pass.]

Sabrina: And the last of the list work, which is that a name in a tier isn't a name we can reach yet. For the Tier 1 names I go find who actually gets the first call, the head of corporate development or the CFO, not the general info line, and there's no clean database for that. It's the company's own site, a press release naming who ran their last deal, a check that the person's still there and hasn't moved on since the press release. I get most of the Tier 1 contacts clean this afternoon and leave a couple blank rather than guess, because a wrong name in that column when Warren's about to pick up the phone is worse than an empty one. And one I thought I had, I pull up and the press release naming them is three years old, so before I write it in I check whether they're still in the seat, and they're not, they moved to another company last year, so that one goes back to blank rather than sending Warren at a name who left.`,
    commentary: `Two things this afternoon. The list has to get tighter, because Warren already pulled a count off it for his call this morning, which means it's getting used and it can't be thin where a senior leans on it. And the tracker has items still outstanding that I need to chase Marisol on in writing. This afternoon is tiering the list a level deeper and running down the room.

The list is a real second pass now, tighter tiers, sharper reasons, most of the Tier 1 contacts found and the stale one caught, and the tracker's current and honest with the last outstanding items chased to Marisol and the draft schedule held out of the room. Next the book comes back from Danny for tonight's turn, and the model needs a number pushed through it, so tonight is the model-to-book work. The list I pick up again when the seniors scrub it later in the week.`,
    after: ``,
  },
  'ib-analyst-kestrel-full-d2-b4': {
    before: `It is evening and dinner is cleared off the desk. The floor is thinning out. One of the updated schedules Marisol, the client CFO, sent over came in this afternoon and moves a number in the operating model, and a changed number never stays put: it flows into the financial section of the book and every exhibit that draws off it. Sabrina, the first-year Analyst, is at her desk with the model open on one screen and the financial section open beside it. This is a night individual work block, working the cascade from the model out through the book and then a QC pass, on the version that is climbing toward Priya the VP and then Warren the MD.`,
    simulatedWork: `[The model is open on the left, the financial section of the book on the right. The floor is thinning out.]

{{artifact:1}}

Sabrina: Start in the model, because that's the source and everything downstream depends on getting it right here first. The schedule Marisol sent updates the historical numbers on one revenue line, actuals that came in firmer than the placeholder we'd been carrying. I take the updated figures into the model's historical tab, one year at a time, and the thing I watch is that the change lands only where it should and then flows where it must. It updates the history, and because the projections build off the history, the projected lines move with it, and because the summary tab totals all of it, the total moves.

Sabrina: Now I have to chase it. The number moved in the model. That means the revenue figure in the exec summary is now a version behind. The same figure in the financial section is behind. The adjusted-earnings bridge that builds off it is behind, because the base moved. And any exhibit, any chart, that draws off these is behind. One number in the model, and it's stale in four or five places in the book, all of which said the right thing an hour ago and don't now.

[She goes place by place, model open beside the book.]

Sabrina: I go find each one, with the model open beside the book so I'm bringing the current number across and not a remembered one. Exec summary first, the money block, pull the current total across off the summary tab. Then the same figure inside the reason-to-own lines up there, because it appears twice on that page and the two can't disagree. Then the financial section, the historical row that changed and the projected rows that moved off it. Then the bridge, where the base moved, so I re-walk it from reported at the bottom up through each add-back and confirm it still lands on the right adjusted number at the top. Each one I don't retype, I pull, because the whole failure I'm preventing is a number that's one digit off from the model it's supposed to match.

[She rebuilds one exhibit that a chart is driven off.]

{{artifact:2}}

Sabrina: One of these is a chart, not a cell, the revenue-trend exhibit in the financial section, and it's driven off the schedule I just changed, so the bars are drawn on the old numbers. A chart doesn't update itself when the source moves unless it's linked, and this one I have to refresh so the trend line matches the table under it. I refresh the exhibit off the current data, and then I check the last two bars against the table cells they're supposed to equal, one at a time, because a chart that looks refreshed and a chart that is refreshed are not the same thing, and a chart that disagrees with the table right beside it is exactly the kind of thing a buyer notices and a senior catches.

[She runs the tie-out, following the number back to its source.]

Sabrina: With everything updated I do the tie-out, which is the check that the whole chain agrees, and I run it backwards from the book to the source. The exec-summary number ties to the financial section. The financial section ties to the model. The model ties to the schedule Marisol sent. Four links, and I confirm each one rather than assume the update flowed cleanly, because "it should have flowed" is not the same as "it did." All four tie. Now the number is the same everywhere it lives, from the front page all the way back to the client's document.

[She does a QC pass on the sections that changed.]

Sabrina: Then QC on what moved, because a night turn that changes numbers can leave small wreckage behind, formatting that broke when a value got longer, a total that didn't refresh, a footnote pointing at a figure that shifted. I go over the financial section and the summary the way a stranger would. Does every number that appears twice agree with itself. Is every add-back on the bridge still matched to its schedule line. Did any cell overflow its column when the new number came in longer than the old, and one did, a margin cell that now shows a hash because the value ran past the column width, so I widen the column and the number comes back. And I find one subtotal in the historical block that didn't refresh when the numbers above it moved, and when I click into it I see why: it was hardcoded, a number typed straight into the cell instead of a formula summing the rows above, so it sat there stale while everything around it updated. That's a real bug, the kind that's invisible until someone reconciles the page and finds a total that doesn't add up, so I replace the hardcoded value with the sum formula so it can't drift again, and it lands on the right figure. And once I've found one hardcoded cell I don't trust that it's the only one, so I click down the rest of the subtotals in that block one at a time to see which are formulas and which are typed values, because a model with one hardcode usually has a second, and I find one more further down, another typed total, and I link that one too.

[She reads the changed sections once more and gets the file ready to send up.]

Sabrina: Last pass, I read the financial section and the summary once more, top to bottom, now that the numbers are all current, to make sure it reads clean and not just ties clean. It does. The file goes up to Danny, and he takes it to Priya in the morning, and this is the version that's climbing toward Warren, so I write the note to Danny saying exactly what moved tonight and why, the updated schedule from Marisol and everywhere it flowed, the refreshed exhibit, the two hardcoded subtotals I caught and re-linked, and the one figure I'm still carrying provisional off the draft schedule until the final version lands. That way when it goes up the chain nobody has to reverse-engineer what changed, and the one number that isn't final yet is flagged as the one to re-confirm.`,
    commentary: `Tonight is the cascade, model to book, done carefully, and then a QC pass so what goes up in the morning ties end to end. This is the version bound for the VP, and from her it goes to the MD, so it has to be right.

The number's current everywhere it lives, the book ties end to end, and the file's up with Danny bound for Priya and then Warren. I'll check with Danny that nothing else is landing before I head out, and keep half an eye on the inbox from home in case a last thing comes in. Tomorrow the book reaches the top of the chain.`,
    after: ``,
    artifactsHtml: { 1: { type: 'excel', html: artifact08Html }, 2: { type: 'powerpoint', html: artifact09Html } },
  },
  'ib-analyst-kestrel-full-d3-b1': {
    before: `It is Wednesday morning, and the book is up with Priya, the VP, and heading to Warren, the MD, so for a stretch it is out of Sabrina's hands. Sabrina, the first-year Analyst, is at her desk producing the back sections that do not depend on the turn coming back: the growth section and the risk factors, the two sections a buyer reads to figure out the upside and what could go wrong, both still mostly skeleton. The management materials and the operating model are open alongside the draft. This is an individual work block, drafting those two sections with a stretch of buyer-list maintenance in between, and it runs until an NDA status change interrupts it.`,
    simulatedWork: `[The growth section is open, mostly headers and a few bullets. The management materials and the model are open alongside.]

Sabrina: The growth section is where a buyer decides how much upside they're paying for, so it can't read like a wish list, it has to read like a plan the company could actually execute. I've already got the top two ranked from the front-of-book work, the club-store annualization and the committed new lines, so the discipline back here is to build each one out properly: what it is, why it's real, what it's worth roughly, and what it depends on. The annualization first, because it's the most defensible. It's revenue from business already won that lands in full next year, so I write it as arithmetic on signed business, not a forecast: the program ran partway through last year, so the piece that wasn't in the full-year number lands next year, and I pull the run-rate off the model rather than estimating it, because a buyer's diligence team can hold that up against the contracts, which is exactly what makes it strong.

Sabrina: Then the committed new lines into the co-packing capacity, which is real but softer, because "committed" is a claim a buyer will test. I write it carefully, pinned to what's actually committed rather than what the company hopes it becomes, because those are two different numbers and the second one falls apart in diligence. And I flag in my own note, in the margin of the draft where Danny will see it, that this one needs the actual purchase commitments behind it before it's final, so it's on the list to firm up rather than sitting as a confident number I can't back. The rest of the opportunities go into a ranked list underneath, each with a one-line size and a note on what it depends on, so a buyer sees we've thought about size and sequence instead of treating a new product and a new channel as the same thing. And the pricing upside, the soft piece, I keep out of the ranked opportunities and name it separately at the end as a lever a buyer can underwrite themselves, because the moment pricing sits inside the growth number a buyer discounts the whole thing.

{{artifact:1}}

[She moves to the risk factors section.]

Sabrina: Then risk factors. A CIM that pretends there's no risk reads as either naive or hiding something, and both cost trust. The job is to name the real risks in a way that's honest but framed, the same move as the customer concentration up front. Customer concentration is the first one, and I can point it back to how the concentration paragraph up top already frames it, the long relationship and the term left on the contract, so the risk section names the exposure plainly and puts the mitigant right next to it rather than re-litigating the whole thing. Then the ordinary ones for a business like this. Input-cost exposure, because the commodities that go into a sauce move with the market and a buyer wants to know the company can pass cost through, so I name it and note the pricing mechanism that mitigates it. Food-safety and regulatory surface, because any manufacturer that puts food on grocery shelves carries it, so I name it plainly and note the compliance record. Each stated plainly, each with the mitigant next to it where there's a real one, because a risk with a credible mitigant reassures a buyer more than a risk left unmentioned.

[She saves the section and switches to the buyer list for the breather.]

Sabrina: I've been in prose for a couple of hours, so I switch to the buyer list for a stretch, which is a different kind of work, more sorting than writing. This isn't a re-tier, the tiers are set from yesterday, it's the maintenance: filling the last contact-detail gaps on the Tier 1 names I left blank and cleaning up the rationales so they read consistently, because Priya and Warren scrub this later in the week and a list where half the reasons are one style and half another looks sloppy. I go down and make each rationale the same shape, what the buyer is, why they're in this tier, what the catch is if there is one, so a senior reading down the column isn't re-parsing the format on every line.

[A new-mail chime, and this one she stops for immediately.]

Sabrina: And this one I stop for the second I see it, because it's the NDA tracker and it's a status change that can't sit. A buyer signed the NDA. That means a name that was a prospect is now a party who's allowed to receive materials, and the moment that happens the release status has to be updated so we know exactly who is cleared for what and when they cleared. This is the kind of thing that has to be logged the instant it happens, because two weeks from now, when we're distributing the book, the record of who signed and when is the thing that says whether it was okay to send it to them, and reconstructing that after the fact is how mistakes happen.

[She opens the NDA tracker and logs the signed agreement.]

{{artifact:2}}

Sabrina: The buyer list goes on hold and I go to the NDA log, which is its own tracker, the running record of who we sent the teaser and NDA to, who signed, and the date each one executed. I find the name, move it from sent to signed, and stamp today's date, and here's the trap I check before I mark it clean: the name on the executed signature page isn't quite the name on our list. Our list has the parent, and the NDA came back signed by a subsidiary entity, because if the party who signed isn't the party we think signed, the release status is wrong and we could send the book to an entity that never actually bound itself. I read the signature block against the entity on the list, confirm the subsidiary is the right signing arm of the parent we tracked, and note the exact signing entity on the log so the record is precise. Then I update the release status to say this party is cleared to receive the CIM once we launch. Logged, dated, entity confirmed, status updated. That one couldn't wait, and now it's on the record while I'm still the person who saw it land.

[She goes back to the buyer list and finds where she left off.]

Sabrina: Back to the list, and I find the rationale I was mid-cleaning when the NDA landed. I finish standardizing the reasons down the Tier 1 names, fill the last two contact gaps I could confirm off a recent press release, and leave the ones I couldn't confirm blank rather than guess. The list's in good shape for the scrub now, tiers set, reasons consistent, most contacts found.

[She returns to the risk section to finish it.]

Sabrina: With the list settled I go back and finish the risk section, because I left it mid-way for the buyer-list stretch. I add the last couple of risk factors and their mitigants, a note on customer concentration on the retail side beyond the top account, and a line on the ordinary supply-chain exposure, then I read the section through once as a buyer would and make sure every risk named has a mitigant next to it and none of them reads as a company apologizing for itself. It reads right. Growth built, risk built, the list maintained, and the NDA event caught and logged with the right entity.`,
    commentary: `This is my chance to draft the two back sections for real, the growth section and the risk factors, while the book is out of my hands up the chain. They're mostly still skeleton, so this morning is building them out, with a stretch on the buyer list in between. I start on growth, because it's the one that has to carry weight.

The growth and risk sections are drafted and the list's ready for the scrub, and the signed NDA is logged and the release status current. Next is the process call this afternoon, where Priya runs the team through where every workstream stands, and after that the seniors scrub the buyer list. The book's still up with Warren, so I'll find out where his comments land later.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: artifact10Html }, 2: { type: 'excel', html: artifact11Html } },
  },
  'ib-analyst-kestrel-full-d3-b2': {
    before: `Once a week the whole deal team gets on a call to take stock of where every workstream stands and what has to happen next, and it is run by Priya, the VP, who quarterbacks the deal day to day. On the call are Priya; Danny, the Associate; and Sabrina, the first-year Analyst. Warren, the MD, drops on for the top of it and then has to jump. This is a status-and-timeline call, not a working session: Priya drives the agenda, Danny reports on the deliverables, and Sabrina stays near-silent, giving a tight status only if she is asked a specific number. Sabrina has her running status list open, the one that tracks every open item across the book, the model, the buyer list, and the trackers, which is exactly what she checks against as each workstream comes up. Going into the call, that list shows the book climbing to Warren and the client session set for tomorrow.`,
    simulatedWork: `[Priya is running the call. Warren is on but half in another window.]

Priya: Let's keep this tight, I know everyone's mid-turn. Where's the book. Danny.

Danny: Up with you as of this morning, heading to Warren today. It's been through the analyst turn Monday night, your structural comments turned Tuesday, and the model-to-book cascade last night on the updated schedule from Marisol's side. Front's re-cut, market's moved up, growth's ranked and pinned to committed business, risk section drafted this morning. It's in good shape to go to the client tomorrow once Warren's cleared it.

Priya: Good. Warren, you'll have it this afternoon. I'd like your marks tonight so it clears before the client call, because they're seeing the version you've blessed, not a version in flight. That's the whole reason the sequence runs this way, the book has to be off your desk before it's in front of Rick.

Warren: You'll have them tonight. I've got the two external things this afternoon but I'll get to the book after. Keep the growth section honest, that's the one they'll push on tomorrow. If the number leans on pricing anywhere, pull it out and show it separately, because Rick will see a rich top line and assume we baked in price he can't hold.

Priya: It's ranked and pinned to committed business, and the pricing's broken out as its own lever, not baked into the base. We'll walk the specifics before the call so we're aligned going in.

Warren: Good. Then the front page, I want the demand leading and the plant underneath, the way we talked about. That's the version I'll clear.

Priya: That's how it's cut. Buyer list. Where does that stand.

Danny: First pass tiered, second pass tightened yesterday. Sabrina, the count on Tier 1?

Sabrina: About a dozen names across strategics and sponsors, with a reason next to each, and most of the Tier 1 contacts found.

Priya: That's fine, leave the blanks rather than guess. Warren and I scrub it this afternoon, so I don't need it finished, I need it reasoned, which it sounds like it is. The blanks we'll fill from names we know anyway.

Warren: I'll want the strategics ordered the way you and I talked about when we scrub it, and I've got a couple of names to add off relationships that won't be on any screen. I've got to jump. Priya, you've got the rest. Good work on the turn, all of you.

[Warren drops off.]

Priya: Tracker and data room. Anything still hanging.

Danny: The customer contracts came in Monday, executed versions are in the room. A few smaller items still outstanding, updated schedules, a supplier agreement, an org chart. Sabrina chased Marisol on those yesterday.

Priya: Any of those block the book going to the client tomorrow?

Danny: No. Sabrina held the one that was still a draft out of the room until we get the final, and the rest are diligence housekeeping that doesn't feed the current draft.

Priya: Good call holding the draft out. Then we're clear for tomorrow. Timeline: book to Warren today, his marks tonight, cleared version to the client tomorrow, then we turn whatever they give us. The list gets scrubbed this afternoon and finalized later in the week. Danny, you're on the pre-client huddle in the morning to make sure we're aligned on which pages they're walking. Everyone knows their piece. Anything I'm missing.

Danny: Nothing from me. We're on track.

Priya: Good. Short one. Back to it.

[The call ends. Sabrina updates her status list against what was just confirmed.]`,
    commentary: `My job on this call is to have the right number ready if Priya turns to me, and to catch any gap between what the seniors think is done and what I'm actually carrying. As each workstream comes up I check what Priya and Danny say against my own list, so if there's a mismatch, I know it and can say it if asked. The whole call is really about getting everything lined up for the client session tomorrow.

{{artifact:1}}

Nothing on the call moved off what I already had, everyone's read of where things stand matches mine. The one thing to hold is that the outstanding tracker items don't block tomorrow, which I confirmed in the room. Next is the buyer-list scrub with Priya and Warren this afternoon, where the names I tiered meet the relationships only they can see.`,
    after: ``,
    artifactsHtml: { 1: { type: 'document', html: artifact12Html } },
  },
  'ib-analyst-kestrel-full-d3-b3': {
    before: `The buyer list Sabrina built and tiered gets its first senior scrub this afternoon, and this is where the names a screen can surface meet the relationships only the senior bankers carry. In the room are Warren, the MD, who owns the client relationship and knows the buyer universe personally; Priya, the VP, who runs the deal day to day; and Sabrina, the first-year Analyst, whose list is on the screen. Danny, the Associate, is on another call and not in this one. Sabrina does not present the list and does not pitch names; she has it open, keeps it current as Warren and Priya add and cut, and captures every change exactly as they land. The list she built is the starting point, and the seniors are about to add names off relationships and cut names on judgment a screen never had.`,
    simulatedWork: `[The buyer list is up on the screen, Sabrina's tiers and rationales visible. Warren has it open on his own screen too.]

{{artifact:1}}

Warren: Okay, let's go through it. Strategics first. The branded-foods houses, these are right, these are the calls we lead with. Add Coleman to Tier 1. They're not obvious off a screen because they've been quiet, but I know they've been looking to get into premium condiments and they've got the shelf space to make it work. Put them at the top.

[Sabrina adds the name to Tier 1.]

Priya: They came up on my screen too low because their public numbers understate the segment. Warren's right, they belong at the top.

Warren: The European group, you've got them flagged cross-border, longer timeline. Keep them, that flag's right, but I'd move them up half a tier. A foreign strategic that wants into the U.S. market pays up, and this one specifically has tried to buy into the category twice and missed. They're more motivated than the flag makes them sound. Keep the note, though, the diligence really will run longer, a buyer needs to know that going in.

[She moves the name up half a tier and keeps the note attached.]

Priya: The regional foods maker two states over, you've got in Tier 2. That's right. They'd want it but they can't really pay for it, so they're a name that fills the room, not a name that wins it. Leave them exactly where they are.

Warren: Agreed. And cut the generalist buyout fund with no platform. I know you put it in Tier 3 for optionality, and the logic's fine, but I don't want to spend a process managing a name that has no reason to lean in. We've got enough real optionality in the sponsors who actually own something in the space. Take it off. If we need bodies later we'll add them back, but I don't want it cluttering the first call list.

[She removes the name.]

Warren: Now, the one that matters. Rick's been clear he does not want the two direct competitors in this. There's one on your strategic tier, the one that makes the private-label lines for the same retailers. Cut it. Rick will not have his numbers sitting in a direct competitor's hands, and he's right, because if the deal doesn't happen, that competitor now knows his margins and his contracts. That's the client's call and it's a hard line.

Priya: There's a second one that's close to that line, the ingredients supplier that's been moving downstream into finished product. Not a direct competitor today, but heading there.

Warren: Leave that one on for now, but flag it, and I'll raise it with Rick before we send anything. His veto's absolute on the direct one, the borderline one I want him to make the call on, not us. Don't send either of those anywhere until Rick's confirmed the second one.

[She cuts the direct competitor and flags the ingredients supplier as pending Rick's confirmation.]

Priya: On the sponsors, the ones that own a real center-of-plate platform are the right Tier 1. Add Brightwater, they closed a specialty-foods platform last year that this would slot straight into, they just haven't shown up on a screen yet because the deal was private. And move the beverage-platform fund you've got flagged as adjacency down to Tier 3, it's not the near-adjacency the reason claims.

Warren: Good add on Brightwater, and agreed on the beverage fund. A fund without a real platform in the category is a slow buyer that asks for too much diligence and pays like a financial buyer, not a strategic one. The ones you flagged as adjacency-that-isn't, keep them low, that's the right read.

[She adds Brightwater to Tier 1 and moves the beverage-platform fund to Tier 3.]

Priya: That's the list, more or less. Sabrina, you've got all of it captured?

Sabrina: All of it. Coleman and Brightwater into Tier 1, the European group up half a tier with the note kept, the direct competitor cut, the ingredients supplier flagged for Rick, the generalist fund off, the beverage fund down to Tier 3.

Warren: Good. Get me the clean version and I'll do a last pass before we take contact strategy to Rick. Nice work on the reasons, made this fast.

[Warren closes the list on his screen. Priya stays on to sort the next thing with Sabrina.]`,
    commentary: `My job for the next hour is to hold the pen, not to defend my list. Warren and Priya add and cut on relationships and judgment a screen never had, and I capture every change exactly as it lands and keep the sheet clean while they decide. If I get a single change down wrong, the seniors act on the wrong list later, so the whole job is getting it exactly right in the moment.

The list is the seniors' list now, their names added and their cuts made, and the two things I'm carrying out of it are the clean version for Warren's last pass and the one name flagged for Rick to decide. Next I clean it up and get it back to Warren, and the book's still up the chain with him for tonight.`,
    after: ``,
    artifactsHtml: { 1: { type: 'excel', html: artifact13Html } },
  },
  'ib-analyst-kestrel-full-d3-b4': {
    before: `Dinner is long cleared off the desk. The book climbed the chain all week, and this afternoon it reached the top of it: Warren, the MD, took the VP-cleared version after his external appointments and sent his top-of-chain markup back a little after seven. This is the clearance turn, the last internal pass before the book goes to the client tomorrow, and the client only ever sees a version Warren has blessed. His marks are the highest-altitude of the week, fewer than the junior reviewers' but bigger and blunter, each one pulling to a whole section. There are a lot of them, and they landed late. The floor has emptied out. A few analysts are still heads-down. Sabrina pulls Warren's markup up beside the draft.`,
    simulatedWork: `[Warren's markup is open on the left, the draft on the right.]

{{artifact:1}}

Sabrina: Starting at the top, and his first mark is on the exec-summary open, which I've already re-cut twice this week, once on Danny's "punch it" and once on Priya's re-cut to lead with demand. Warren's is a level above both. He's written that the first line still sounds like a company describing itself, and he wants it to sound like the reason a buyer picks up the phone. Even the demand-first version Priya landed on reads, to him, like we're telling the buyer what we are instead of what they get. I re-cut the opening so the very first clause is the thing a strategic repeats to their board, the shelf position and the pull, and the branded-platform description falls in behind it as support. Same facts a third time, a higher altitude on the order each time, and Warren's is the one that clears.

[He has bracketed the whole growth section with a note.]

Sabrina: Warren's marked the growth section and written that the ranking leans too hard on the pricing upside, pull it out of the base entirely and show it separately. I make the change: pricing comes out of the ranked base, the base now stands only on the club-store annualization and the committed lines, the business that's already signed, and pricing gets named separately underneath as a lever a buyer can underwrite on their own. It's a re-cut of how the ranked growth reads, so I note in the margin exactly what moved and why, per Warren's mark, so the next person up the chain sees on the first read that the ranking changed and doesn't have to reverse-engineer it.

[She moves into the model, because the pricing change is not only words.]

Sabrina: And that change isn't just a paragraph, because pricing being in the base or out of it is a number, not a sentence. It lives in the model. I go into the model, find where the pricing assumption feeds the projected revenue, and pull it out of the base build into its own line so the base number is only the signed business. That moves the projected total. Which means the growth figure in the book is now a version behind the model, the same cascade as always. I chase it: the base growth number in the exec summary, in the financial section, and in the growth section itself, each pulled across from the model, not retyped, so the book and the model agree on a base that no longer leans on price.

[One of Warren's marks is a circled number with "doesn't tie, source it" beside it, the same shorthand Danny uses.]

Sabrina: Warren's circled the adjusted-earnings base and written "doesn't tie, source it," and I know why before I check, because I just moved the base by pulling pricing out. "Doesn't tie" is a number not matching where it comes from. The adjusted-earnings bridge builds up off the projected base, and I just changed the base, so the bridge is starting from a stale number. Back into the model, take the current base off the summary tab now that pricing's out, bring it into the bridge, and re-walk the bridge from reported at the bottom up through each add-back to confirm it still lands right at the top. Then one level further, because the model line pulls from the revenue schedule, so I go to the schedule and confirm it still agrees after the pricing change. It does. The bridge ties to the model, the model ties to the schedule, all three walked, not assumed.

[Another of Warren's marks is on the customer paragraph, a wording change over the top of the framing already built.]

Sabrina: Warren's rewritten a line in the customer-concentration paragraph, the one framed off the executed contract earlier this week. His wording isn't a structural change, he wants the sentence about the contract term to read harder, more like a fact and less like reassurance. I keep the paragraph as it's built, the relationship length and the term as the moat, and I take Warren's exact words for the one sentence, because when the MD hands you the precise words he wants in a sentence a buyer will read, those are the words.

[She works into a section Warren has bracketed with "this buries the lede, move it."]

Sabrina: Then a straight MD-level re-order, which is bigger than a rewrite. He's bracketed the part of the business description that explains how the retail relationships actually work and written that it's buried, pull it up. He's right that a buyer wants it earlier, but a re-order is never just moving text, it's the numbering, the contents page, and every cross-reference that pointed at the old spot. I move the passage up, resequence the numbering around it, update the contents page, and then hunt the references: I search for the ones that name that passage by its old position, find two pointing at where it used to sit, and fix both. A book that cross-references a page that isn't there anymore is exactly what Priya catches cold in the morning, and this version is going to the client, so it can't have a broken reference in it.

[It is past ten. Most of the marks are turned. A new mark lands from Warren.]

Sabrina: It's past ten, I'm nearly down the markup, and a new comment comes in from Warren, because he's had another look. He wants the risk section's customer-concentration factor to point explicitly back to the framing up front, so the risk section and the summary tell the same story instead of the risk section re-raising the worry the summary already settled. It's real work: I go to the risk factor, rewrite it so it names the exposure and then points to how the front of the book already frames it, the term and the relationship, so a buyer reading the risk section doesn't hit a worry the summary already answered. One more mark, landed at ten, turned at ten.

[She closes the markup and starts the two-pass close, heavier tonight than on a normal turn.]

Sabrina: Now the close, and tonight it's heavier than a normal turn, because this is the version the client sees and there were a lot of marks, so a missed one isn't just a nit, it's the book going to Rick with a mark not turned. First pass, back to the top, down every one of Warren's marks against the draft with the markup open beside it, one at a time. The exec-summary re-cut, confirmed. The pricing pulled out of the base, confirmed in the words and confirmed in the model number that flowed from it. The doesn't-tie base, re-walked. The customer wording in Warren's exact words. The re-order and its two references. The ten o'clock risk-section mark. Each one confirmed against its mark, not from memory. Second pass, I close the markup and read the book front to back as a document, because the re-order and the pricing change moved things and the seams where sections join don't automatically still work. Two transitions need a rewrite so the new order reads like it was always the order, and one sentence that pointed forward at the growth ranking now points at a ranking that's changed, so it comes out.

[The clock is past one. She writes the note that goes up with the file.]

Sabrina: Last thing, the note up, and tonight it carries more than the usual "here's what changed," because there were so many marks. I write Danny and Priya exactly what moved: Warren's re-cut of the open, the pricing pulled out of the base per his mark and flagged in the margin at that spot, the base re-tied through the model and schedule after pricing came out, his exact wording on the customer sentence, the business-description re-order with its references chased, and the ten o'clock risk-section mark. The bigger moves I name specifically, so that whoever reads it next sees them on the first read instead of finding them after the client already has the book. Everything's turned. The book's clean, and it's the version that goes to the client in the morning.`,
    commentary: `This is the clearance turn, and it's the last one before the client sees the book, so every one of Warren's marks has to turn tonight. His marks are fewer than Danny's were but they're bigger, blunt, each one pulling to a whole section instead of a line, and there are a lot of them. I work down his markup and turn every one of them, and this one doesn't end when I decide it's done. It ends when the book's clean and Warren's marks are all turned, whatever time that is.

The book's cleared Warren, which means it's the version that goes to Rick tomorrow, and the note up names what moved so it reads clean first thing. I'll check with Danny that nothing else is landing before I go, because even at this hour you don't just leave, and then it's the car home. Tomorrow the book's in front of the client.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: artifact14Html } },
  },
  'ib-analyst-kestrel-full-d4-b1': {
    before: `The video call connects, and the client side comes on. On the Larkin Reed side, Warren, the MD, and Priya, the VP, are together in a small conference room off the main floor; Danny, the Associate, and Sabrina, the first-year Analyst, are dialed in from their desks. On the Halloran Foods side are Rick, who founded the company and owns it, Marisol, the CFO, and Diane, the company's outside M&A counsel, who is on for the disclosure language.

The book in front of everyone is the version that came off Sabrina's desk past one this morning and cleared Warren before it went over. It is not the first draft the client has seen, and it will not be the last. By the time Halloran Foods goes to buyers, Rick will have read some version of this book five or six more times. This is a working session on a live draft, one turn in a long loop, and the whole hour is spent arguing the parts of it that are still moving.

Sabrina is on mute, her camera on, the draft open on one screen and a running list of changes on the other. She does not have a speaking part today. Her job is to catch every change the room lands on and to have the right page up the second Warren or Priya reaches for it.`,
    simulatedWork: `Warren: Rick, Marisol, Diane, thank you all for the time. We sent the current draft over last night. I'd suggest we spend most of this on the projections and the adjusted-EBITDA build, because that's where the real work is, and then Diane, we'll get to your marks on the risk language. Rick, do you want to start us on the growth section, since that's the piece you and I have been going back and forth on.

{{artifact:1}}

Rick: I do, because I read it again this morning and I still think it's rich. You've got us at twenty-two percent top-line growth in year two. We have never done twenty-two. We did fourteen last year and that was a good year, and it was a good year because we won the club-store rollout, which is a thing that happened once.

Warren: It's rich on purpose, and I want to defend it, but I want to defend the version we can hold. Priya, walk Rick through how we got there.

Priya: The twenty-two isn't a straight-line assumption off last year, Rick. It's built up from three things we can each point at. The first is the club-store program annualizing. You won it partway through last year, so the full-year revenue from it lands in the year we're projecting, not the year you signed it. That's not a forecast, that's arithmetic on business you already have. The second is the two new lines you're bringing into the co-packing facility, which you've told us are committed for spring. The third is pricing, and that's the one that's genuinely a forecast.

Rick: The pricing is the one that'll get us in trouble. A buyer's going to look at twenty-two, and the first thing their people do is assume we baked in price increases we can't hold, and then they discount the whole number, and the growth story I actually have gets punished for the piece that's soft.

Warren: That's the right instinct, and it's exactly why I don't want the number to rest on pricing. Here's where I'd push back on you, though, and it's a friendly push. If we take the number down to something safe, say the low teens, we're leaving your own signed business on the table. The club-store annualization and the committed lines are real. A buyer's diligence team will find them in the data room whether we put them in the projection or not, and if we've projected below what your own contracts support, that reads as a management team that doesn't understand its own business. That costs you more than an aggressive number does.

Rick: So where does that leave the pricing.

Priya: We'd separate it. We hold the growth that the annualization and the committed lines support, which is defensible line by line, and we treat the pricing as upside we name rather than upside we bake in. So the base projection stands on the business you already have under contract, and the pricing shows up as a lever the buyer can underwrite themselves. That way the number they can't argue with is the number that carries the story, and the piece you're worried about isn't load-bearing.

Rick: What does that do to the twenty-two.

Priya: It probably brings the headline to around eighteen, with the pricing shown separately as the path to the low twenties. Marisol, you and I would need to rebuild the bridge to land the exact figure, but the shape is: annualization plus committed lines gets us most of the way, and pricing sits outside the base.

Marisol: I can rebuild it. I want the committed lines pinned to the actual purchase commitments, though, not to what the sales team hopes they turn into, because those are two different numbers and the second one is the kind of thing that falls apart in diligence.

Warren: Pin it to the commitments. Rick, here's where I come down. Eighteen off your signed book, with pricing shown as upside, is a number I will stand behind in front of a buyer, because their diligence team can hold it up against every contract behind it. Twenty-two resting partly on price I can't stand behind, and I won't put you in a room defending a number I can't.

Rick: Then eighteen, built the way Priya described, with the pricing broken out. I'd rather have a number I can look at across the table and not flinch.

Warren: Good. Marisol, Priya, that's a turn for the two of you after this. Let's move to the add-backs, because that's the other place a buyer spends real time.

Marisol: I've been through the adjusted-EBITDA schedule against the support, and most of it ties, but I have three I want to talk about before it goes any further, because I'm the one who has to defend these when their quality-of-earnings people call.

Warren: Go through them.

Marisol: The first is the owner compensation, and that one I'm comfortable with. Rick pays himself well above what a hired CEO would cost to run this, and a buyer isn't inheriting his package, so the difference goes back into earnings. That's a clean add-back and there's a market comp behind it in the schedule. No issue.

Priya: Agreed, and the schedule already footnotes the market-comp source. What are the other two.

Marisol: The second is the ERP implementation. Someone added back the full cost of the new system as a one-time item, and it is not clean. Yes, the implementation was one-time. But there's an ongoing license and support cost that came in with it that isn't going away, and right now the add-back is scooping up both. If we add back the whole thing, we're adding back a recurring cost as if it were one-time, and that's the exact move a buyer's team flags and then uses to question every other add-back on the page.

Priya: So we split it. The implementation and the one-time integration cost add back. The recurring license and support stays in as an operating expense.

Marisol: That's what I want. And I want the schedule to show the split explicitly, the one-time piece named and the recurring piece named, so nobody reading it thinks we tried to slip the recurring cost through.

Warren: Do it that way. What's the third.

Marisol: The third is the legal settlement from two years ago. It's added back as one-time, and it genuinely was one-time, but Diane, I want your read on whether we can even characterize it the way the footnote does, because the footnote describes what it was.

Diane: That's the one I flagged in my marks too, and it's less about the add-back than about the words around it. You can add it back. It was a discrete, resolved matter and it's not recurring. But the current footnote describes the underlying dispute in a way that's more specific than I'm comfortable with, and there are confidentiality terms in the settlement itself. I don't want a footnote in a document that goes to a hundred strangers describing a settled matter in language the settlement agreement restricts.

Warren: So the add-back stands, the characterization changes. Diane, what does the footnote need to say instead.

Diane: It needs to say enough that a buyer understands the add-back is legitimate and non-recurring, and no more than that. Something to the effect that the adjustment reflects a one-time expense associated with a legal matter resolved in a prior period, without the description of what the matter was. I'll send exact language, but the direction is: it's a resolved, non-recurring legal expense, full stop. The specifics live in diligence under an NDA, not in the CIM.

Priya: That works for us, and it's cleaner anyway. Marisol, that's three marks on the add-back schedule: split the ERP line, and Diane's wording replaces the settlement footnote, and the owner comp stays as is.

Marisol: Logged on my side.

Diane: While we're in the risk and disclosure language, I have a handful of others, and most are narrow but I want them exact, because these are the sentences a buyer's counsel reads with a pen.

Warren: This is the right room for it. Go.

Diane: The customer-concentration paragraph. The draft says the top account represents a significant share of revenue and that the relationship is long-standing and under contract. The characterization is fine and I know why it's in there, but "long-standing" and "under contract" are both claims a buyer will hold you to, so they have to be exactly true. The contract term and the renewal history in that paragraph need to match the executed agreement word for word, not the summary someone worked from.

Marisol: They match the executed agreement. That paragraph was rebuilt off the contract in the folder we sent over Monday, not off a summary.

Diane: Then I just want to confirm the term stated is the current term and not the original one, because the account has renewed and the numbers are different.

Marisol: It's the current term. Three years into the current five-year term. That's what's in the paragraph.

Diane: Good. Then that one's fine as written, I just needed to hear it was tied to the executed document. The second one is the forward-looking language generally. Anywhere the draft states a projection as though it's a fact rather than an estimate, it needs the softening language, because a firm statement of a future number is a representation and an estimate isn't. Priya, your team knows the pattern, it's mostly the growth section and the pipeline paragraph.

Priya: We'll sweep the whole draft for it. Any place a projection reads as a promise, it gets the estimate framing. That's a clean pass, we'll catch all of them.

Rick: While we're on the customer, I want to raise something, and I don't think it's a wording thing, I think it's a real thing. The private-label line we do for that same top account. When we renewed with them the last time, there's a clause in there, a right of first refusal on that private-label business. It's never come up, we've never triggered it, I'm honestly not sure anyone's looked at it since we signed. But if we're selling the company, and a buyer reads that contract, and there's a right of first refusal sitting in it on our biggest account's private-label line, I don't want that to be a surprise that blows up in the middle of a deal.

Warren: I'm glad you raised it, and I'm not going to give you an answer on it right now, because the answer depends entirely on the exact words in the clause, and I haven't read them. A right of first refusal can mean a dozen different things depending on how it's drafted, what it's triggered by, whether a change of control even counts as a trigger, whether it survives an assignment. Guessing at it is worse than useless, because a buyer's counsel isn't going to guess, they're going to read the executed clause and hold us to what it actually says.

Rick: So what do we do with it.

Warren: Diane pulls the executed contract and reads the exact clause, and we get a real answer on what it does and doesn't do in a sale, and whether and how it has to be disclosed. Until we have that read, it doesn't go in the book one way or the other, because I'm not going to describe a clause we haven't analyzed. Diane, can you get to the executed private-label agreement.

Diane: I can. I'll pull it and read the ROFR provision and the change-of-control and assignment language around it, and I'll come back with what it actually does in a sale scenario. I'd rather do that properly than react to it on this call. It may be nothing. It may need a disclosure. I don't want to tell you which until I've read the words.

Rick: I'd rather you get that one right than fast.

Warren: We'll route it to Diane and come back to you with a real answer once she's read the executed clause. It stays off the page until then. Marisol, Priya, that doesn't hold up anything else in the book, we keep turning the rest.

Priya: Understood, it doesn't touch the current turn. Rick, before we run out of time, the executive summary. It's had more revisions than any other page and I want to make sure the front of it lands the way you'd say it out loud. Right now it opens on the manufacturing footprint and the capacity. That's true and a buyer needs it, but it's not the first thing you'd lead with if you were telling someone why this company is worth owning.

Rick: No. The first thing is that we make a premium product that holds shelf space in every major grocery chain in our region and that the retailers keep giving us more of it, not less. The capacity is how we deliver that. It's not the reason to care.

Priya: That's the reorder, then. We lead the summary on the shelf position and the retailer relationships, the demand story, and the footprint and capacity move underneath it as how you meet the demand. Same facts, the order a buyer meets them in changes.

Rick: That's right. Lead with the demand, support it with the plant. That's the company.

Warren: Then that's the summary re-cut, and it flows into the growth section we already reworked, so those two want to move together. Rick, Marisol, Diane, we've got the eighteen-percent rebuild with pricing broken out, the three add-back marks, Diane's disclosure sweep, and the summary re-cut, and the private-label clause is with Diane. We'll turn all of it and get you the next version.

Rick: The clause is the one I'll be thinking about. Get me Diane's read as soon as you've got it.

Warren: You'll have it the moment we do.`,
    commentary: `That's the room. My list ran to about a dozen changes and I've got every one of them captured. Danny's going to pull me into a quick debrief in a few minutes to sort which of these turn this afternoon and which can wait for tonight, because they can't all go at once and some of them wait on Marisol and Priya rebuilding the bridge before I can bring the number across into the book.

The one I can't do anything with is the private-label clause. It's not a change I can turn, it's a legal read that's out with Diane now, and it doesn't come back as a number I drop into a paragraph, it comes back as an answer nobody in that room had yet. It goes on my tracker as its own open line, out with counsel, and it sits there open. That's the one thing off this call I'm carrying that I can't close myself.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: artifact15Html } },
  },
  'ib-analyst-kestrel-full-d4-b2': {
    before: `The client CIM review session wrapped an hour ago, and Danny, the Associate, pulled Sabrina into a quick debrief straight after to sort what turns this afternoon and what waits for tonight. Now Sabrina, the first-year Analyst, is back at her desk on the Larkin Reed floor with the book open, the running list of changes from the debrief beside it, and the ledger of open items in a third window. This is the widest turn of the week, because the client room touched almost everything. It is an individual work block, working the client's changes into the CIM, and it runs until an ASAP from a senior interrupts it.`,
    simulatedWork: `[The book is open, and beside it the running list of changes from the debrief, and the ledger of open items.]

Sabrina: Here's my list for the turn. The exec summary re-cut to lead with the demand and the retailer pull, capacity underneath. The projections rebuilt to the eighteen-percent base with the pricing broken out as a separate lever. The three add-back marks: the owner comp stays as is, the ERP line splits into the one-time piece that adds back and the recurring license and support that stays in, and the settlement footnote gets replaced with the exact wording counsel's sending. The disclosure sweep, softening anywhere a projection reads like a promise. And the market overview and business description reworked to what Rick and Priya landed on. That's the turn. And then the one line on the ledger that isn't a turn at all: the right-of-first-refusal clause on the top account's private-label line that Rick raised, which is out with Diane, the company's counsel, for a legal read. It's not a change I can make. It sits on my tracker as its own open line, out with counsel, and it stays there this afternoon because there's nothing for me to do to it yet. I note it so it doesn't get lost, and I move to the work I can do.

[She starts on the exec summary.]

Sabrina: Exec summary first, because it's the front and the client re-cut it directly. Rick was clear the first thing isn't the manufacturing footprint, it's that they make a premium product that holds shelf space in every major chain in the region and the retailers keep giving them more of it. I re-cut the open to lead on that, the demand and the retailer relationships, and move the footprint and capacity underneath as how they deliver it. That's the same instinct the book's been moving toward all week, but now it's the client's own words for it, which is better than ours, so I use his framing. And because the summary flows into the growth section, and the growth section just changed with the projections rebuild, I make sure the two read as one argument and the seam between them holds.

[She moves to the projections, and hits the dependency.]

Sabrina: Then the projections, and this is where I have to be careful about what I can finish and what waits. The room landed on taking the headline off twenty-two down to around eighteen, built on the annualization and the committed lines, with pricing shown separately. But the exact eighteen isn't mine to set, it's a bridge Marisol and Priya are rebuilding on their side after the call, because it depends on pinning the committed lines to the actual purchase commitments, not the sales team's hopes. I can't drop a final number in yet. What I can do is set the structure the number lands into: pull the pricing out of the ranked base so the base stands only on signed business, name pricing separately as the upside lever, and leave the base figure marked as pending Marisol and Priya's rebuilt bridge. That way the moment their number comes, tonight, it drops into a book that's already shaped for it, instead of me building the shape twice. I note on the ledger that the base figure is waiting on their bridge, so I know exactly what's provisional.

[She moves to the add-back schedule.]

{{artifact:1}}

Sabrina: Then the three add-back marks, and these are precise, because the add-back schedule is the thing a buyer's quality-of-earnings people read with a pen. The owner comp stays as is, so I leave it and confirm its market-comp footnote is intact. The ERP line is the split: right now the whole system cost is added back as one-time, and Marisol was clear that's not clean, because there's a recurring license and support cost riding in with it. I split it on the schedule into two named lines, the one-time implementation and integration that adds back, and the recurring license and support that stays in as an operating expense, and I name each explicitly so nobody reading it thinks we tried to slip the recurring piece through. Then the settlement footnote, where Diane sent exact language: I replace the old footnote, the one that described the underlying matter too specifically, with her wording, which says it's a resolved, non-recurring legal expense and no more, and then I check the number the footnote sits next to still matches the schedule line, because the wording changed but the add-back itself stands.

[A new-mail chime, flagged ASAP. She opens it and stops the CIM work.]

Sabrina: And there's the interrupt, and it's an ASAP, so it jumps the turn. It's from Danny relaying a senior who needs a buyer-list number before a call at the end of the day. He wants to know, of the sponsors on the list, how many actually own a center-of-plate or condiments platform we could call a real strategic fit, because he's about to talk to someone and wants the real count, not the whole sponsor tab. The CIM turn goes on hold mid-schedule. I go to the sponsor tab, and the judgment is that "owns something in food" isn't the answer he wants, he wants the ones that genuinely plug in, so I count only the funds with a real center-of-plate or condiments platform, not the beverage and snack adjacencies I'd already flagged as softer, and I pull those names with the one-line reason each. Count, names, reasons, up through Danny in two lines, because it's going to a senior before a call and needs to be a fact he can use. Sent. Back to the book.

[She returns to the CIM work and first finds her place.]

Sabrina: Right, back to where I was, which was the add-back schedule, and before I move on I make sure I actually finished the split and the footnote and didn't leave one half-done when the ASAP pulled me out. The ERP split's both lines in, the settlement footnote's replaced and its number checked. Good, that one's whole. Now the disclosure sweep, which is Diane's mark and it's a whole-document pass, not one spot. Anywhere a projection is stated as though it's a fact rather than an estimate, it needs softening, because a firm statement of a future number reads as a representation and an estimate doesn't. I search the growth section and the pipeline paragraph, the two places Diane said the pattern lives, and I go line by line: any place a number about the future reads like a promise, I give it the estimate framing. I find several, mostly in the growth section where the ranked items were stated confidently, and I soften each one so it reads as an estimate the company stands behind, not a guarantee.

[She moves to the market overview and business description.]

Sabrina: Then the market overview and the business description, which the room reworked. The market gets pulled to sit right after the highlights so a buyer has the frame before the business, which is a re-order I mostly did earlier in the week, so here it's confirming it's fully forward and its references are clean. And the business description gets the retail-relationships passage worked the way Rick framed it, how the shelf position actually holds, because that's the demand story the whole re-cut leads on, so the description has to back up the front instead of reading like a factory tour. I rework it to lead with how the retail relationships work and let the operating detail follow.`,
    commentary: `This is the widest turn of the week, because the room touched almost everything: the exec summary re-cut, the projections rebuilt, three marks on the add-back schedule, a disclosure sweep from counsel, and the business description and market overview reworked. My status list has all of it laid out as this afternoon's must-turn. And it's carrying one line I can't close, which I'll come to, because it isn't a change I turn, it's a legal read that's out with counsel. I start with the changes I can actually make.

The client's changes are mostly turned, the exec summary re-cut, the add-back schedule split and reworded, the disclosure sweep done, the market and business sections reworked, and the projections shaped for the number that lands tonight. What's still open is the eighteen-percent base, waiting on Marisol and Priya's bridge, and the private-label clause, which isn't a turn at all, it's still out with counsel on my tracker. Tonight I finish the client turn so it can recirculate up the chain in the morning.`,
    after: ``,
    artifactsHtml: { 1: { type: 'excel', html: artifact16Html } },
  },
  'ib-analyst-kestrel-full-d4-b3': {
    before: `It is evening, dinner is cleared, and the floor is thinning out. The afternoon got most of the client turn done, but two pieces were waiting: the eighteen-percent base that Marisol, the client CFO, and Priya, the VP, were rebuilding on their side, and the QC that ties the whole revised book back together. Both came into reach after dinner, when Marisol and Priya sent the rebuilt bridge over. Sabrina, the first-year Analyst, is at her desk with the operating model open, the financial section beside it, and the rebuilt bridge in a third window. This is a night individual work block, a normal one and not the marathon of the night before, finishing the client turn end to end so it can recirculate up the chain in the morning.`,
    simulatedWork: `[The model is open on the left, the financial section on the right, the rebuilt bridge from Marisol and Priya in a third window. The floor is thinning out.]

Sabrina: The rebuilt bridge came in, and it lands the base at the eighteen the room agreed, built on the annualization and the committed lines pinned to the actual purchase commitments, with pricing sitting outside the base as its own lever. First I take their bridge into the model so the model carries the real number, not the placeholder I'd marked provisional this afternoon. The base updates, and because the projections build off the base, the projected lines move with it, and the summary total moves. That's the source updated. Now everywhere in the book that pulls from it is a version behind, same cascade as always, and tonight it's the whole revised base moving, so there's more of it than usual to chase.

[She goes place by place, model open beside the book.]

Sabrina: I chase it, place by place, model open beside the book so I'm pulling the current number and not a remembered one. The exec-summary money block, the base across from the summary tab. The same figure inside the reason-to-own lines, because it lives twice on that page and can't disagree with itself. The financial section, the historical rows are unchanged but the projected rows all move off the new base. The growth section's two ranked items, because their sizes are stated off the base. And the bridge itself, where I re-walk from reported at the bottom up through each add-back, including the ERP split I set this afternoon, so it lands on the new adjusted number at the top. Each one pulled, not retyped, because the failure I'm preventing is a number one digit off from the model it's supposed to match.

[She rebuilds the growth exhibit that the pricing split changed.]

{{artifact:1}}

Sabrina: One of these is a chart, not a cell, the growth exhibit in the front of the book, and it changed shape today, not just value, because pricing came out of the base and into its own lever. The base bars have to drop the pricing piece and the pricing shows as a separate named element, not baked into the growth number. I rebuild the exhibit off the current data so the base is only the signed business and the pricing sits beside it labeled as upside, and then I check the base bars against the table cells they're supposed to equal, one at a time, because a chart that looks refreshed and a chart that is refreshed aren't the same thing, and a chart that disagrees with the table beside it is exactly what a buyer catches.

[She runs the tie-out backwards through the chain.]

Sabrina: With everything updated I run the tie-out, backwards from the book to the source, because after a turn this wide I confirm the chain agrees rather than assume it flowed. The exec-summary base ties to the financial section. The financial section ties to the model. The model ties to the schedule and to the rebuilt bridge Marisol and Priya sent. Four links, each confirmed, because "it should have flowed" isn't "it did." All four tie. The eighteen is the same number everywhere it lives, from the front page back to the bridge.

[She does a QC pass on the changed sections and catches a snag.]

Sabrina: Then QC on everything that moved today, the client turn plus tonight's cascade, because a turn this wide leaves small wreckage. I go over the changed sections the way a stranger would, and I catch one that would've gone out wrong: a footnote in the financial section still points at the old settlement-footnote wording, the specific one Diane had me replace this afternoon, because the reference to it didn't update when I swapped the footnote text. I fix the pointer so it names the reworded footnote, not the one that's gone. Then the rest of the pass: every number that appears twice agrees with itself, every add-back on the bridge is matched to its schedule line including the new split ERP lines, no cell overflowed its column when the eighteen came in, and the disclosure sweep from this afternoon didn't leave a projection un-softened where a reference to it sits. It reads clean.

[She reads the changed sections once more and gets the file ready to recirculate.]

Sabrina: Last pass, I read the changed sections top to bottom now that the numbers are all current, to make sure it reads clean and not just ties clean, because the client re-cut the front and I want it to flow like it was written that way, not patched. It does. I write the note that goes up with it, naming exactly what moved: the eighteen-percent base off Marisol and Priya's rebuilt bridge and everywhere it flowed, the pricing broken out into its own lever, the growth exhibit rebuilt, the add-back schedule with the ERP split and the reworded settlement footnote, the disclosure sweep, and the exec-summary re-cut in Rick's framing. That way when it recirculates in the morning nobody has to reverse-engineer the client turn, they can see what the client changed and where it landed.`,
    commentary: `Tonight I finish the client turn end to end so it can recirculate up the chain in the morning. This is a normal night, not the one from yesterday. I start with the bridge, because now I actually have the number.

The client turn's finished end to end, the eighteen's in and ties everywhere, and the file's ready to recirculate up the chain in the morning. I'll check with Danny that nothing else is landing tonight before I head out, and then it's the car home, with half an eye on the inbox from there in case a last thing comes in. Tomorrow the revised book goes back up, and then it's back to the client next cycle.`,
    after: ``,
    artifactsHtml: { 1: { type: 'powerpoint', html: artifact17Html } },
  },
  'ib-analyst-kestrel-full-d5-b1': {
    before: `It is Friday morning, and Danny, the Associate, and Sabrina synced a few minutes ago on what is left before the weekend: the client-revised book goes back up the chain today, to Priya, the VP, and Warren, the MD. Sabrina, the first-year Analyst, is at her desk with the current book open and the running ledger of the week's turns beside it. The book has been turned so many times this week that the pieces need reconciling into a single clean version before it moves. This is an individual work block, consolidating the turns, QC-ing the whole thing as a document, and sending it back up as a recirculation, one cycle in the loop and not a final.`,
    simulatedWork: `[The current book is open, and beside it the running ledger of the week's turns.]

Sabrina: I start by reconciling the turns, because a book that's been edited by four people in four passes can carry two changes that touch the same place and don't quite agree. The one I check hardest is the front, because two different turns both re-cut the exec summary: the internal front re-cut earlier in the week and then Rick's own re-cut yesterday. I read the merged result and make sure it reads as one clean opening, Rick's demand-first framing with the internal structure underneath it, and not two re-cuts sitting on top of each other with a seam showing. It's close, but there's one sentence that's a leftover from the internal version that Rick's framing makes redundant, so it comes out, and now the front reads as one thing.

[She moves to the whole-document QC.]

Sabrina: Then the QC of the book as a document, which is different from checking any one section, because it's the stuff that only breaks when everything moves. Page numbers, because the reorders this week, Warren's business-description move, the market pulled forward, all shifted where sections sit, so I renumber and confirm the contents page matches the actual pages. Cross-references, because a book that references a page that isn't there anymore is what a senior catches cold, so I sweep for the ones that name a section by position and confirm each points where it should now. Alignment, so tables and exhibits line up page to page and nothing sits a hair off from the block above it. And source footnotes, confirming every number that needs a source has one and every footnote resolves to a real schedule reference.

[She runs a tie-out spot-check on the numbers after consolidation.]

Sabrina: Then a spot-check on the numbers, not the full tie-out I ran last night, but confirming the consolidation didn't knock anything loose. The eighteen-percent base, checked in the two or three places it lives, still agrees with itself. The add-back schedule, the split ERP lines and the reworded settlement footnote, still match between the bridge and the schedule. I'm not re-doing last night's work, I'm confirming that merging the versions into one clean file didn't reintroduce a stale number, because a consolidation can quietly pull an old figure back in if two versions carried different ones and the wrong one wins the merge. They agree.

[She updates the ledger to one clean state before sending up.]

{{artifact:1}}

Sabrina: Now the ledger, and I reconcile it to one clean state, because all week it's been carrying multiple in-flight versions and now there's one. It reads: one consolidated version, client changes incorporated, out for recirculation to Priya and Warren. And the line that shows what this actually is, that this recirculation is one cycle in the loop, the book goes up, clears, goes back to the client, and does it again, because they'll see this book several more times before it ever goes to a buyer. The one item that stays open on the ledger isn't a version thing, it's the clause out with counsel, and that's still open, but it doesn't hold up this recirculation because it isn't in the book either way until counsel reads it.

[She sends the consolidated book up the chain with a note.]

Sabrina: The file goes up to Priya and Warren, and the note with it names what's in this version: the client's Thursday changes all incorporated, the eighteen-percent base with pricing broken out, the add-back schedule split and reworded, the disclosure sweep done, the front consolidated to one clean re-cut, and the document QC'd end to end. That way they're reviewing a clean, single version, not reconciling my week for me, and when they clear it, it's ready to go back to the client next cycle.`,
    commentary: `This morning is getting the book into one clean state and sending it up. It's been turned so many times this week, the analyst turn Monday, the VP turn Tuesday, Warren's clearance Wednesday, the client turn yesterday, that the pieces need reconciling into a single version before it goes anywhere. And this send-up is a recirculation, the book going back up to be cleared and then back to the client next cycle, so on the ledger it goes as one of the several cycles this book runs, not a final. The morning is consolidate, QC the whole thing as a document, and recirculate.

The book's consolidated to one clean version and it's back up the chain with Priya and Warren for the recirculation. Next this afternoon is the braid I've been carrying alongside the book all week, the buyer list to finalize off the scrub, the model to refresh, and the tracker to close out before the weekend.`,
    after: ``,
    artifactsHtml: { 1: { type: 'excel', html: artifact18Html } },
  },
  'ib-analyst-kestrel-full-d5-b2': {
    before: `It is Friday afternoon, and the book is up the chain with Priya and Warren for the recirculation, so Sabrina, the first-year Analyst, turns to the three workstreams she has carried alongside it all week. At her desk she has the scrubbed buyer list open in one window, the operating model in another, and the diligence tracker in a third. This is an individual work block, finalizing the list off Wednesday's scrub, refreshing the model with a number that finally has its final version, and closing out the tracker before the weekend. Danny, the Associate, comes over partway through on the one open item she cannot close.`,
    simulatedWork: `[The buyer list is open to the scrubbed version, the model in another window, the tracker in a third.]

Sabrina: The list first, because the scrub Wednesday gave me the seniors' decisions and now I finalize them into a clean version. I enter what they landed on: Coleman and Brightwater into Tier 1, the two names Warren and Priya added off relationships a screen never surfaced. The European group up half a tier, with the cross-border note kept, because the diligence really does run longer and a buyer needs that going in. The beverage-platform fund down to Tier 3, the adjacency that wasn't really an adjacency. The generalist buyout fund off entirely, Warren didn't want to manage a name with no reason to lean in. And the direct competitor cut, the private-label maker, on Rick's veto, because he will not have his numbers in a direct competitor's hands. Those all go in clean.

[She stops on one name and holds it out rather than entering it.]

Sabrina: And there's the one I don't finalize. The ingredients supplier that's been moving downstream into finished product, the borderline one. Warren flagged it Wednesday as one for Rick to decide, not us, and said don't send it anywhere until Rick confirms. It does not go into the clean send-list. It sits in a held state on the sheet with a note that it's pending Rick's confirmation, because finalizing it as a name we'll contact when Rick hasn't cleared it is exactly the mistake that puts the client's book in front of someone he didn't want to see it. It stays held.

[She fills the contact detail on the newly added Tier 1 names.]

Sabrina: Then the contact detail on the two names the seniors added, Coleman and Brightwater, because a name in Tier 1 isn't a name we can reach until there's a person to call. I go find who gets the first call on each, the head of corporate development or whoever ran their last deal, off the company site and a recent press release, and confirm the person's still there. I get one clean and leave the other blank, because the only recent name I can find for it is from a release I can't confirm is current, and a wrong name in that column when Warren's about to pick up the phone is worse than an empty one. Blank, not a guess.

[She switches to the model for the refresh.]

Sabrina: Now the model refresh, and this closes a thread I've been carrying since Tuesday. There was a schedule that came in as a draft tab earlier in the week, so the number I pushed through the model off it was provisional, flagged as the one to re-confirm when the final landed. The final version came in from Marisol's side this morning. I bring the confirmed figure across into the model, clear the provisional flag, and check it ties: the final number against what I'd carried provisional, and it's close but not identical, so the provisional was right to flag, and now the model carries the real one. Then a quick tie that the change didn't move anything downstream it shouldn't, and it didn't, because this was a historical actual firming up, not a projection driver. Provisional cleared, model on final numbers.

[She switches to the tracker to close it out.]

Sabrina: Then the tracker, closing out what resolved this week. I read down it: the customer contracts folder, received Monday and indexed, closed. The updated schedules, the last one landed this morning, closed. The supplier agreement and the org chart, both in now, closed. Most of the outstanding column clears, the week's chases run down.

[Danny comes over on the one line she can't close.]

Sabrina: And then the one line I can't close, and Danny comes over to confirm exactly that. It's the right-of-first-refusal clause on the top account's private-label line, the one Rick raised on the call. It's out with Diane for the legal read, and it's the single tracker line I can't move to resolved, because it isn't mine to resolve and the answer isn't back.

Danny: The clause is still with Diane. She's got the executed contract and she's reading the ROFR and the change-of-control language, but she's not going to have a read before the weekend. Leave it open, out with counsel, and we pick it up when she comes back.

Sabrina: Will do.

[She marks the line on the tracker and moves on.]

Sabrina: The clause line stays exactly where it is, open, out with counsel, with today's date on the last update so it's clear it's live and not forgotten. It's the one thing off this whole week that I can't close and it's not going to close today, because a legal read on a contract clause isn't a thing that turns on my schedule. Then I read the status column down one more time to make sure it's honest, everything I marked closed is really done, and the clause line reads out-with-counsel and open, not resolved, because a tracker's only useful if a stranger can trust the status, and Priya reads this going into next week.`,
    commentary: `This afternoon is closing out the three things I've been carrying alongside the book all week: the buyer list to finalize off Wednesday's scrub, the model to refresh now that a provisional number has its final version, and the tracker to close, running down what's still open going into the weekend. Most of these I can actually close today. One of them I can't, and it's the clause, but I'll come to that. I start with the list.

The list's finalized bar the one name held for Rick, the model's on final numbers with the provisional cleared, and the tracker's closed out except the one clause that's still with Diane and staying open into the weekend. Next I check in with Danny on whether I'm clear to wrap the week, because that's his call to make, not mine.`,
    after: ``,
  },
  'ib-analyst-kestrel-full-d5-b3': {
    before: `It is late Friday afternoon, and the week's braid is nearly closed: the recirculated book is up the chain with Priya and Warren and quiet, the buyer list is finalized, the model is on final numbers, and the tracker is clean but for the one open clause. This is the lighter Friday tail. Sabrina, the first-year Analyst, does not decide when the week is over; that is Danny's call. This is a light individual work block, checking with Danny, the Associate, on whether anything else is landing before the weekend and closing the last small open items.`,
    simulatedWork: `[The recirculated book is up the chain and quiet. Sabrina goes over to Danny's desk.]

Sabrina: I go check with Danny at his desk, because until he says otherwise, a quiet book still isn't a closed week.

Danny: Book's up with Priya, she's not getting to it till Monday, so nothing's coming back on it tonight. Warren's cleared for the weekend. You're basically clear. Close whatever's small and open, then you're good to go, don't sit here for the sake of it.

Sabrina: Got it. I'll close the last couple and check back.

[She goes back to her desk to finish the small open items.]

Sabrina: It's a real light tail, and what's left is small. The one Tier 1 contact I left blank this afternoon, I take another pass at, because now I've got a few minutes and it's the kind of thing that's better closed than carried into Monday. I find a cleaner source for it, a recent enough release naming who runs their corporate development, confirm the person's current, and fill it, so the list goes into next week with one fewer gap. And a small formatting item on the recirculated book that I'd noted but that didn't block the send-up, an exhibit label that could read cleaner, I fix now so it's not sitting on the list Monday.

[She checks back with Danny before actually leaving.]

Sabrina: Then I check back with Danny one more time, because "you're basically clear" plus a couple things closed is still not me deciding I'm done, it's me confirming nothing landed in the twenty minutes since. Nothing did. This is the good-night version of the end of the day, released near seven on a Friday, after a week that ran past one on Wednesday.`,
    commentary: `I don't release myself at the end of a week, Danny does, so before I settle into a light finish I need to check with him whether anything else is landing before the weekend. Quiet isn't the same as done, and the last thing I want is to have left when a comment lands.

Danny's released me, the last small items are closed, and the week's braid is put to bed except the one clause that's still with counsel. Tomorrow's a light Saturday touch, an hour or two to keep things moving and set up Monday, not a heroic one. The book picks up its next cycle when Priya reads it Monday.`,
    after: ``,
  },
  'ib-analyst-kestrel-full-d6-b1': {
    before: `It is Saturday, and Sabrina, the first-year Analyst, is working from home for an hour or two, not a heroic session. The book is quiet with Priya, the VP, until Monday, so this is not a night turn but a light touch to keep one thing moving and to set up Monday. She has the book open on her laptop with the running ledger beside it and one small comment sitting at the top. This is a short individual work block from home, turning the one comment and doing a light check of where everything stands going into next week.`,
    simulatedWork: `[The book is open on the laptop at home, the running ledger beside it. The one comment sits at the top.]

Sabrina: The one piece of real work is a small comment that came down from Priya's early read, not a full turn, just one thing she wanted before Monday: the growth section's ranked items should each carry the estimate framing from the disclosure sweep, so the front of the growth story reads consistent with how counsel wanted the projections softened. It's a small, specific fix, the kind that's easy to do now and annoying to have hanging Monday. I go to the two ranked items, confirm each reads as an estimate the company stands behind and not a promise, matching the sweep I did Thursday, and tighten the one that still read a touch firm. One comment, turned, and the growth section's now consistent front to back on the disclosure framing.

[She reads down the ledger to set up Monday.]

Sabrina: Then the light ledger check, which is really the Monday setup: I read down the running status list to see what's open going into next week, so Monday I walk in knowing what's live instead of reconstructing it. The book's up with Priya for the recirculation, that's the big one, and it'll come back with her comments early in the week and that turn becomes Monday or Tuesday. The buyer list's finalized bar the one name held for Rick. The model's on final numbers. The tracker's clean.

[The ledger reaches the one line that's still open, and a message from Danny sits against it.]

Sabrina: And then the line that's still open, and there's a message from Danny against it that came in this morning, which is how anything on this clause reaches me, through him. The right-of-first-refusal clause is still with Diane. His message says counsel hasn't come back with a read yet and it carries into next week, so the tracker line stays exactly as it is, out with counsel, open. It carries forward, open, into Monday and past it, and I put today's date on it so it's clear it's live and being tracked, not forgotten over the weekend.

[She notes what she'll pick up first Monday and closes the laptop.]

Sabrina: Last thing, I note what I pick up first Monday, so the setup's real and not just a read-through: the recirculation comes back from Priya and that turn's the first live thing, the held name waits on Rick, and the clause waits on Diane. That's the week set up. The comment's turned, the ledger's checked, and the one open line is carried forward where it belongs.`,
    commentary: `The whole Saturday is two things: one small comment I can turn now, and a light check of where everything stands going into next week. I start with the one thing there is to actually do.

The small comment's turned and Monday's set up, and the one real thing still open is the clause, out with counsel, not resolved and not pretending to be. Monday the book starts climbing the chain again on its next cycle.`,
    after: ``,
  },
}
