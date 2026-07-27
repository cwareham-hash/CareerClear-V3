// Meridian Park artifact 06 - CleanNotes. Self-contained HTML,
// verbatim from content repo artifacts/artifact_06_CleanNotes.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.
// Manifest type onenote, which the app renders at document width. Placement: Block 7 master / DITL Block 3, Note cleanup.

export const meridianArtifact06Html = `<!-- artifact 6, Block 7 Tuesday, type onenote (OneNote-style, document width) -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Interview write-up: Ellen</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:#d7d5db;font-family:'Segoe UI',Calibri,Arial,Helvetica,sans-serif;
    color:#33333a;-webkit-font-smoothing:antialiased}
  .wrap{padding:24px 16px 34px}
  .app{width:940px;margin:0 auto;background:#fff;border:1px solid #c3bece;
    box-shadow:0 10px 30px rgba(40,30,55,.20);overflow:hidden}

  .bar{height:34px;background:#7719aa;display:flex;align-items:center;padding:0 14px;gap:9px}
  .bar .nb{color:#f2e9f7;font-size:12.5px;font-weight:600;letter-spacing:.2px}
  .bar .nbcaret{color:#d9c2e8;font-size:10px}
  .bar .dots{margin-left:auto;display:flex;gap:6px}
  .bar .dots i{width:9px;height:9px;border-radius:50%;display:inline-block;background:#9a4bc4}

  .tabs{display:flex;align-items:flex-end;background:#efe9f4;padding:6px 12px 0;gap:3px}
  .tab{font-size:12.5px;padding:6px 16px;color:#836f92;background:#e2d7ec;border-radius:4px 4px 0 0}
  .tab.on{background:#7719aa;color:#fff;font-weight:700}
  .accent{height:3px;background:#7719aa}

  .content{display:flex;min-height:1240px}
  .rail{width:160px;flex:0 0 160px;background:#faf8fc;border-right:1px solid #ece5f2;padding:12px 0}
  .rail .rlabel{font-size:10px;letter-spacing:.06em;color:#a99cb5;text-transform:uppercase;
    padding:0 14px 8px;font-weight:600}
  .pg{font-size:12.5px;color:#5c5763;padding:7px 14px;border-left:3px solid transparent;line-height:1.3}
  .pg.on{background:#efe6f5;color:#4a2f63;border-left-color:#7719aa;font-weight:600}

  .page{flex:1 1 auto;background:#fff;padding:26px 34px 44px}
  .eng{font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#8d8397;font-weight:700}
  .ptitle{font-size:26px;font-weight:400;color:#33333a;line-height:1.2;margin-top:6px}
  .pmeta{display:flex;gap:18px;flex-wrap:wrap;font-size:11.5px;color:#8f95a0;margin-top:7px}
  .pmeta .k{color:#b3aabd}
  .stamp{display:inline-block;background:#e6efee;border:1px solid #c5dcd9;color:#2d6a63;
    font-size:9.5px;letter-spacing:.09em;text-transform:uppercase;padding:2px 8px;font-weight:700}
  .conf{margin-top:11px;font-size:10.5px;color:#7a6a86;background:#f7f3fa;
    border-left:3px solid #b58fd0;padding:7px 11px;line-height:1.5}

  table.fields{border-collapse:collapse;width:100%;margin-top:15px}
  table.fields td{border:1px solid #e6def0;padding:5px 10px;font-size:12.5px;
    color:#3a3a42;line-height:1.5}
  table.fields td.f{background:#faf8fc;color:#6b5f78;font-weight:600;width:150px}

  .headline{margin-top:16px;background:#f4f1f8;border:1px solid #ddd2e8;
    border-left:4px solid #7719aa;padding:14px 17px}
  .headline .hl{font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:#7719aa;
    font-weight:700;margin-bottom:6px}
  .headline p{font-size:13.5px;line-height:1.6;color:#3a3542}

  h3.sh{font-size:15px;font-weight:700;color:#4a4650;margin:22px 0 5px}
  .body{font-size:13px;line-height:1.62;color:#3a3a42}
  .body p{margin-bottom:8px}
  ol.find{margin:6px 0 0 19px}
  ol.find > li{margin-bottom:11px;padding-left:3px}
  ol.find > li > b{color:#2b2b33}
  .qt{font-style:italic;color:#4a4650}
  ul.quant{margin:5px 0 0 17px;list-style:none}
  ul.quant li{font-size:12px;color:#6b6376;font-style:italic;
    border-left:2px solid #ddd2e8;padding-left:9px}

  .codes{margin-top:13px;background:#f6f8f8;border:1px solid #d9e5e3;padding:10px 14px;
    font-size:11.5px;color:#4a5a58;line-height:1.6}
  .codes .cl{font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:#2d6a63;
    font-weight:700;margin-bottom:5px}
  .code{display:inline-block;background:#e6efee;color:#2d6a63;font-size:10px;font-weight:700;
    letter-spacing:.05em;padding:2px 7px;border:1px solid #c5dcd9;margin-right:5px}

  .pull{margin-top:16px;border:1px solid #e7dcae;background:#fffdf4;padding:14px 17px}
  .pull .pl{font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:#94781f;
    font-weight:700;margin-bottom:8px}
  .pull blockquote{font-size:13px;line-height:1.55;color:#4a4230;font-style:italic;
    border-left:3px solid #d9c98d;padding:2px 0 2px 12px;margin-bottom:9px}
  .pull .warn{font-size:10.5px;color:#8a7440;line-height:1.5;margin-top:2px}

  .scorep{display:flex;gap:14px;margin-top:14px;align-items:stretch}
  .sbox{background:#f6f8f8;border:1px solid #d9e5e3;padding:12px 16px;text-align:center;
    flex:0 0 128px}
  .sbox .sv{font-size:31px;font-weight:700;color:#2d6a63;line-height:1}
  .sbox .sl{font-size:10px;color:#8b9098;letter-spacing:.05em;text-transform:uppercase;margin-top:5px}
  .snote{flex:1 1 auto;background:#fafafb;border:1px solid #e8e8ec;padding:12px 15px;
    font-size:12.5px;line-height:1.6;color:#3a3a42}

  .fu{margin-top:14px;border:1px solid #e0dae8;background:#fbfafc;padding:13px 16px}
  .fu .fl{font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:#7719aa;
    font-weight:700;margin-bottom:8px}
  .fitem{display:flex;gap:10px;align-items:flex-start;font-size:12.5px;line-height:1.55;
    color:#3a3a42;margin-bottom:8px}
  .cb{display:inline-block;width:14px;height:14px;border:1.5px solid #b0aab8;border-radius:2px;
    flex:0 0 auto;margin-top:2px;background:#fff}
  .fmeta{font-size:10.5px;color:#8f95a0;margin-top:2px}

  .foot{margin-top:22px;padding-top:11px;border-top:1px solid #ece5f2;
    font-size:10.5px;color:#9a90a5;line-height:1.55}
</style>
</head>
<body>
<div class="wrap">
  <div class="app">

    <div class="bar">
      <span class="nb">Meridian Park Investor Platform Assessment</span>
      <span class="nbcaret">&#9662;</span>
      <span class="dots"><i></i><i></i><i></i></span>
    </div>

    <div class="tabs">
      <span class="tab">Fieldwork</span>
      <span class="tab on">Interview notes</span>
      <span class="tab">Synthesis</span>
      <span class="tab">Admin</span>
    </div>
    <div class="accent"></div>

    <div class="content">
      <div class="rail">
        <div class="rlabel">Pages</div>
        <div class="pg">Ellen, raw</div>
        <div class="pg on">Ellen, write-up</div>
        <div class="pg">Raymond, raw</div>
        <div class="pg">quotes to keep</div>
      </div>

      <div class="page">
        <div class="eng">Meridian Park Investor Platform Assessment</div>
        <div class="ptitle">Interview write-up: Ellen</div>
        <div class="pmeta">
          <span><span class="k">Date</span> Tuesday, week 3 of 6</span>
          <span><span class="k">Author</span> Carly</span>
          <span class="stamp">Final</span>
        </div>
        <div class="conf">Internal working document. Not for distribution. Nothing here is attributed
          to Ellen individually outside the team; findings travel into the synthesis as themes.</div>

        <table class="fields">
          <tr><td class="f">Interviewee</td><td>Ellen, Chief Investment Officer</td></tr>
          <tr><td class="f">Organization</td><td>Public pension system (~$12B total assets; retirement assets for state employees)</td></tr>
          <tr><td class="f">Meridian product</td><td>Private credit allocation (Meridian runs a slice; ~6-year relationship; investor in 4 Meridian funds)</td></tr>
          <tr><td class="f">Date</td><td>Tuesday, week 3 of 6</td></tr>
          <tr><td class="f">Interviewers</td><td>Marcus (Manager, lead), Carly (Consultant, notes)</td></tr>
          <tr><td class="f">Format</td><td>30-minute video call</td></tr>
        </table>

        <div class="headline">
          <div class="hl">Headline</div>
          <p>The investment relationship is good and the portal data is accurate; the pain is the last
             mile. The Meridian Investor Portal stops at accurate data and leaves the assembly to the
             investor. Ellen scores Meridian a 6 out of 10 against a best-other-manager 8, and the gap
             is consistently about getting from accurate data to a finished, board-ready output without
             her team doing that step by hand.</p>
        </div>

        <h3 class="sh">Context</h3>
        <div class="body">
          <p>Ellen is CIO of about nine years at the fund (four in the seat), responsible for the whole
             investment program. The fund has invested with Meridian about six years across a slice of
             its private credit allocation. She declined to detail how the allocation has grown. Portal
             use is heaviest at month-end and quarter-end (statements, performance, capital activity for
             board reporting) and ad hoc in between. During a close her small team (a handful of
             analysts) is all in the portal at once, and many small retrievals land in the same
             compressed window set by the board calendar.</p>
        </div>

        <h3 class="sh">Findings by theme</h3>
        <div class="body">
          <ol class="find">
            <li><b>No consolidated capital-activity report.</b> Ellen cannot pull a single clean view of
              a quarter's calls and distributions. She opens statements one at a time and her team
              stitches them together in a spreadsheet to reach the board-ready number. The data is all
              present; the assembly is the burden. The spreadsheet her team maintains is checked line by
              line and reconciled back against the statements, high-stakes but purely mechanical work
              that a consolidated view would eliminate. The assembled figure goes to the board's
              investment committee, which reviews private markets as one line on a quarterly agenda and
              wants a single consolidated view it can absorb in minutes, in the consistent one-page
              format it has seen every quarter; the manual assembly has to stay invisible to that room,
              which is what makes the missing consolidated report grate. Her words:
              <span class="qt">"I'm paying for a finished product and getting raw ingredients,"</span>
              and <span class="qt">"the thinking is the job. The assembly shouldn't be."</span>
              <ul class="quant"><li>Quantification: the better part of a couple of analyst-days per
                quarter spent on assembly alone, before anyone analyzes the numbers (Ellen's own rough
                estimate when asked).</li></ul>
            </li>
            <li><b>Poor document search and retrieval.</b> Search does not reliably surface a specific
              past statement or notice (e.g., an auditor request for a quarterly statement from two
              years ago). Ellen routinely emails her relationship manager to retrieve documents instead.
              The relationship manager is responsive (usually within a day), but her point stands:
              <span class="qt">"a day, for something I should be able to get in thirty seconds
              myself."</span> It <span class="qt">"makes the whole platform feel a step behind."</span>
              Search matches on the wrong things, returning everything or nothing with no reliable
              filter by fund, period, or document type. The sharpest version is the annual external
              audit, when auditors request exact statements and notices going back years on someone
              else's clock; not being able to self-serve there makes the fund look slower than it is.
            </li>
            <li><b>Onboarding / subscription re-papering each new fund.</b> Each new Meridian fund starts
              the paperwork from scratch: the same entity information, authorized signatories, and
              supporting documentation, none of it carrying across. Ellen is in four Meridian funds and
              still re-submits the same materials. Felt mostly by her operations team. Better managers
              return mostly pre-filled paperwork and only ask her to confirm what has changed (a new
              signatory, an updated address), which she reads as being treated as an existing
              relationship rather than a new one each time. Her head of operations raised the
              re-papering with her directly after the last fund, which is how it reached her; she frames
              it as not the biggest gap but perhaps the most needless. She reads the better managers'
              fix as unsophisticated, simply keeping her file and presenting it back to confirm, which
              makes Meridian's omission look like a question of priority rather than difficulty.
            </li>
            <li><b>Passive portal, no event notifications.</b> The portal does not alert her when a
              capital call or document posts. She leans on her relationship manager's emails, so a late
              email or travel can mean seeing a call notice late in the funding window. Nothing she
              would escalate to her board, but a couple of times she has had to move faster than she
              would like. She wants notifications tied to the actual event (the moment a call is
              issued), with amount and due date, surfaced on the dashboard until acted on. A late notice
              compresses the funding routine (sourcing cash by a fixed date) into a scramble; nothing
              has broken, but she manages the risk with her own attention rather than a system. Today
              she and her assistant keep their own calendar of expected calls and log into each portal
              on a rhythm to catch what has posted, a manual net under a system that should be catching
              it itself, holding only because they are diligent.
            </li>
          </ol>
        </div>

        <div class="codes">
          <div class="cl">Codes applied to the tracker</div>
          <span class="code">CR</span><span class="code">DS</span><span class="code">OB</span><span class="code">NT</span>
          &nbsp;Four of the five gap columns. No data-feed flag: Ellen is document-led, and the
          look-through and export gap did not come up.
        </div>

        <div class="pull">
          <div class="pl">Quotes for the deck</div>
          <blockquote>"I'm paying for a finished product and getting raw ingredients."</blockquote>
          <blockquote>"The thinking is the job. The assembly shouldn't be."</blockquote>
          <blockquote>"A day, for something I should be able to get in thirty seconds myself."</blockquote>
          <blockquote>"The bar has moved, and they're sitting where some of the others were maybe two years ago."</blockquote>
          <div class="warn">These travel unattributed. No role tag, no institution type, nothing that
            points back to one person. In a sample this size a tag is as good as a name, and we told
            every investor we would not do that.</div>
        </div>

        <h3 class="sh">Score and benchmark</h3>
        <div class="scorep">
          <div class="sbox"><div class="sv">6</div><div class="sl">Meridian</div></div>
          <div class="sbox"><div class="sv">8</div><div class="sl">Best other</div></div>
          <div class="snote">Out of 10; the best other manager possibly a touch higher. The 6 credits
            accurate, complete data; the gap to the 8 is the finished output. The best manager delivers
            a consolidated statement at quarter-end that is close to board-ready (reviewing, not
            assembling) and search that simply works.</div>
        </div>

        <h3 class="sh">Cross-cutting theme (candidate)</h3>
        <div class="body">
          <p>The "last mile": the portal delivers accurate data but leaves the investor to turn it into
             the finished thing they actually need. Strong candidate to anchor a deck section; watch for
             the same pattern in other interviews (shape of the last mile likely differs by investor
             type).</p>
        </div>

        <h3 class="sh">Did she raise it with Meridian?</h3>
        <div class="body">
          <p>Yes, more than once, to her relationship manager. Always received graciously, but nothing
             changes. Her read: it is bigger than any one contact, it is the platform itself, which a
             relationship manager cannot fix.</p>
        </div>

        <div class="fu">
          <div class="fl">Follow-ups and open items</div>
          <div class="fitem"><span class="cb"></span><span>Watch whether the last-mile split really
            breaks document-led against data-led as the interviews continue.
            <div class="fmeta">Owner Carly &#183; next block of calls</div></span></div>
          <div class="fitem"><span class="cb"></span><span>Watch whether other investors feel the
            onboarding re-papering as sharply as Ellen does.
            <div class="fmeta">Owner Carly &#183; flag to the team for the problem-solving session</div></span></div>
        </div>

        <div class="foot">
          Written up from the raw capture on the previous page.
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
`
