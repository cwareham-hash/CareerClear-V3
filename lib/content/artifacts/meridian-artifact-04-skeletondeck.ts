// Meridian Park artifact 04 - SkeletonDeck. Self-contained HTML,
// verbatim from content repo artifacts/artifact_04_SkeletonDeck.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.
// Manifest type powerpoint, which the app renders at powerpoint width. Placement: Block 5, Skeleton deck and storyline, Monday.

export const meridianArtifact04Html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Meridian Park Investor Platform Assessment - recommendation deck</title>
<style>
  :root{
    --ink:#1a1f2b; --navy:#1f2d46; --slate:#56637a; --mute:#7d8798;
    --line:#d6dbe3; --hair:#e8ebf0; --paper:#ffffff; --bg:#e3e5ea;
    --teal:#2d6a63; --teallt:#e6efee;
    --ink2:#b3771f; --inkbg:#fdf6e8; --inkbd:#e3cb9a;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:var(--bg);color:var(--ink);
    font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased}
  .app{width:1330px;margin:0 auto;padding:26px 20px 54px}
  .row{display:flex;gap:16px;align-items:flex-start;margin-bottom:22px}

  .slide{position:relative;width:960px;height:540px;background:var(--paper);
    box-shadow:0 8px 28px rgba(20,30,60,.20);flex:0 0 auto;overflow:hidden}
  .slide.wide{width:1290px}

  .shdr{height:34px;border-bottom:1px solid var(--hair);display:flex;align-items:center;
    justify-content:space-between;padding:0 26px}
  .shdr .eng{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);font-weight:bold}
  .strack{display:flex;gap:5px;align-items:center}
  .strack .t{font-size:8.5px;letter-spacing:.09em;text-transform:uppercase;color:#b6bdc8}
  .strack .t.on{color:var(--navy);font-weight:bold}
  .strack .d{width:3px;height:3px;background:#cdd3dc;border-radius:50%}

  .sbody{padding:20px 26px 0;height:462px;display:flex;flex-direction:column}
  .atitle{font-size:20px;line-height:1.28;color:var(--navy);font-weight:bold;letter-spacing:.1px}
  .asub{font-size:12.5px;line-height:1.5;color:var(--slate);margin-top:9px;
    padding-bottom:11px;border-bottom:2px solid var(--navy)}
  .atitle.only{padding-bottom:11px;border-bottom:2px solid var(--navy)}

  .cols{display:flex;gap:24px;margin-top:15px;flex:1 1 auto}
  .cl{flex:1 1 auto}
  .cr{flex:0 0 352px}

  ul.b{list-style:none}
  ul.b > li{font-size:12.5px;line-height:1.52;color:var(--ink);margin-bottom:9px;
    padding-left:13px;position:relative}
  ul.b > li:before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;background:var(--teal)}
  ul.b > li > ul{list-style:none;margin-top:6px}
  ul.b > li > ul > li{font-size:11.5px;line-height:1.5;color:var(--slate);margin-top:5px;
    padding-left:12px;border-left:2px solid var(--hair)}
  .qt{font-size:12px;line-height:1.5;color:var(--slate);font-style:italic;
    border-left:2px solid #c9d0da;padding-left:11px;margin:5px 0}

  .sowhat{margin-top:auto;background:#f5f7f9;border-left:3px solid var(--teal);
    padding:9px 14px;font-size:12px;line-height:1.5;color:var(--ink)}
  .sowhat b{color:var(--navy)}
  .pnote{font-size:10.5px;line-height:1.45;color:var(--mute);margin-top:8px}

  .sfoot{position:absolute;left:0;right:0;bottom:0;height:30px;border-top:1px solid var(--hair);
    display:flex;align-items:center;justify-content:space-between;padding:0 26px}
  .sfoot .src{font-size:8.5px;color:var(--mute);line-height:1.3}
  .sfoot .rt{display:flex;align-items:center;gap:14px}
  .sfoot .conf{font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:#9aa2ae;font-weight:bold}
  .sfoot .draft{font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink2);
    border:1px solid var(--inkbd);padding:1px 6px;font-weight:bold}
  .sfoot .rev{font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--teal);
    border:1px solid #bcd6d3;padding:1px 6px;font-weight:bold}
  .sfoot .pg{font-size:10px;color:var(--slate);font-weight:bold}

  table.gt{width:100%;border-collapse:collapse;margin-top:13px}
  table.gt th{background:var(--navy);color:#fff;font-size:10.5px;text-align:left;
    padding:7px 9px;font-weight:bold;letter-spacing:.02em}
  table.gt th.c{text-align:center}
  table.gt td{border:1px solid var(--line);padding:7px 9px;font-size:11.5px;
    line-height:1.42;color:var(--ink);vertical-align:top}
  table.gt td.c{text-align:center;font-weight:bold;color:var(--navy);white-space:nowrap}
  table.gt tr:nth-child(even) td{background:#f8f9fb}

  .mk{position:absolute;width:19px;height:19px;border-radius:50%;background:var(--ink2);
    color:#fff;font-size:11px;font-weight:bold;display:flex;align-items:center;
    justify-content:center;box-shadow:0 1px 4px rgba(90,60,10,.34)}
  .hlt{position:absolute;background:rgba(230,178,70,.20);
    border:1px solid rgba(179,119,31,.42);pointer-events:none}
  .chg{position:absolute;left:8px;width:3px;background:var(--teal)}

  .rail{flex:0 0 338px;background:#f4f5f7;border:1px solid #d9dde4;min-height:120px}
  .railhdr{height:30px;border-bottom:1px solid #e2e6ec;display:flex;align-items:center;
    padding:0 13px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;
    color:var(--slate);font-weight:bold;background:#eceef2}
  .railbody{padding:11px 12px}
  .cmt{background:#fff;border:1px solid #e0e4ea;border-left:3px solid var(--ink2);
    padding:9px 11px;margin-bottom:9px}
  .cmt .ch{display:flex;align-items:center;gap:7px;margin-bottom:5px}
  .cmt .cn{width:17px;height:17px;border-radius:50%;background:var(--ink2);color:#fff;
    font-size:10px;font-weight:bold;display:flex;align-items:center;justify-content:center}
  .cmt .who{font-size:11px;font-weight:bold;color:var(--navy)}
  .cmt .on{font-size:9.5px;color:var(--mute);margin-left:auto}
  .cmt p{font-size:11.5px;line-height:1.5;color:#3a4250}
  .railempty{padding:14px 13px;font-size:11px;color:#a7aeb9;font-style:italic}

  /* slide-sorter view */
  .win{width:1290px;margin:0 auto;background:#fff;border:1px solid #b9bec7;
    box-shadow:0 8px 28px rgba(20,30,60,.20);overflow:hidden}
  .ribbon{height:30px;background:#f3f4f6;border-bottom:1px solid #dfe2e7;display:flex;
    align-items:center;padding:0 14px;gap:20px;font-size:11.5px;color:#7c828c}
  .ribbon .on{color:var(--navy);font-weight:bold;border-bottom:2px solid var(--navy);
    height:30px;display:flex;align-items:center}
  .ribbon .fn{margin-left:auto;font-size:11.5px;color:#3a4250;font-weight:bold}
  .sorter{padding:16px 18px 8px;background:#eef0f3}
  .secbar{display:flex;align-items:center;gap:9px;margin:14px 0 10px}
  .secbar .car{font-size:9px;color:var(--slate)}
  .secbar .sn{font-size:11px;font-weight:bold;color:var(--navy)}
  .secbar .ln{flex:1 1 auto;height:1px;background:#d3d8df}
  .thumbs{display:flex;flex-wrap:wrap;gap:14px}
  .th{width:236px;height:133px;background:#fff;border:1px solid #c8cdd5;position:relative;
    padding:11px 12px 0;overflow:hidden}
  .th.ph{border-style:dashed;border-color:#cbb894;background:#fdfbf7}
  .th .tt{font-size:10.5px;line-height:1.3;color:var(--ink);font-weight:bold}
  .th.ph .tt{font-weight:normal;color:#8a7a60;font-style:italic}
  .th .ev{position:absolute;left:12px;right:12px;bottom:16px;font-size:8px;line-height:1.35;
    color:#9aa2ae;border-top:1px solid var(--hair);padding-top:5px}
  .th .no{position:absolute;right:7px;bottom:4px;font-size:8.5px;color:#a7aeb9;font-weight:bold}
  .th .bar{position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--navy)}
  .th.ph .bar{background:#d9c08a}
  .statusbar{height:24px;background:#f3f4f6;border-top:1px solid #dfe2e7;display:flex;
    align-items:center;justify-content:space-between;padding:0 14px;font-size:10px;color:#8b929c}
  .statusbar .conf{letter-spacing:.07em;text-transform:uppercase;font-weight:bold;color:#767d88}

  /* title cards for unbuilt sections */
  .card{width:296px;min-height:120px;background:#fff;border:1px solid #c8cdd5;
    padding:12px 13px;position:relative}
  .card.ph{border-style:dashed;border-color:#cbb894;background:#fdfbf7}
  .card .tt{font-size:11px;line-height:1.36;color:var(--ink);font-weight:bold}
  .card.ph .tt{font-weight:normal;color:#8a7a60;font-style:italic}
  .card .no{position:absolute;right:8px;bottom:6px;font-size:8.5px;color:#a7aeb9;font-weight:bold}
  .cardwrap{display:flex;flex-wrap:wrap;gap:12px}
  .secdiv{display:flex;align-items:baseline;gap:10px;margin:16px 0 9px}
  .secdiv .n{font-size:15px;font-weight:bold;color:var(--navy)}
  .secdiv .t{font-size:12px;font-weight:bold;color:var(--ink)}
  .secdiv .g{font-size:11px;color:var(--mute)}
  .secdiv .ln{flex:1 1 auto;height:2px;background:var(--navy)}
  .gapslot{width:296px;min-height:120px;border:1px dashed #c3c9d2;background:#f6f7f9;
    display:flex;align-items:center;justify-content:center;font-size:11px;color:#a7aeb9;
    position:relative;font-style:italic}
</style>
</head>
<body>
<div class="app">
<div class="win">
<div class="ribbon"><span>File</span><span>Home</span><span>Insert</span><span>Design</span><span class="on">View</span><span>Review</span><span class="fn">Meridian_recommendation_deck.pptx</span></div>
<div class="sorter">
<div class="secbar"><span class="car">&#9662;</span><span class="sn">Section 0 &nbsp;Executive summary</span><span class="ln"></span></div>
<div class="thumbs">
<div class="th ph"><div class="tt">[the answer on one page: Meridian's investors value the relationship and trust the portal's data, but the portal stops at accurate data and leaves investors to build the finished output by hand; closing that gap does not require a rebuild, but a prioritized, fundable set of improvements sequenced over a roadmap]</div><div class="ev">Written last, off the finished argument.</div><div class="no">0.1</div><div class="bar"></div></div>
</div>
<div class="secbar"><span class="car">&#9662;</span><span class="sn">Section 1 &nbsp;Current state</span><span class="ln"></span></div>
<div class="thumbs">
<div class="th"><div class="tt">Meridian's investors value the relationship, and the portal's data is accurate and complete</div><div class="ev">Source: interview coding. Form: representative unattributed quotes.</div><div class="no">1.1</div><div class="bar"></div></div>
<div class="th"><div class="tt">Investors lean on the portal most heavily at the reporting cycle, exactly when the stakes are highest</div><div class="ev">Source: interview coding. Form: usage pattern summary.</div><div class="no">1.2</div><div class="bar"></div></div>
<div class="th"><div class="tt">Today the portal stops at accurate data and leaves investors to assemble the finished output themselves</div><div class="ev">Source: interview coding. Form: pattern statement with anchor quotes.</div><div class="no">1.3</div><div class="bar"></div></div>
</div>
<div class="secbar"><span class="car">&#9662;</span><span class="sn">Section 2 &nbsp;Desired future state</span><span class="ln"></span></div>
<div class="thumbs">
<div class="th"><div class="tt">Investors already get consolidated, exportable, notified data from their best managers; the bar has moved and Meridian sits behind it</div><div class="ev">Source: theme tracker, best other manager benchmark against Meridian's score. Form: benchmark comparison.</div><div class="no">2.1</div><div class="bar"></div></div>
<div class="th"><div class="tt">The target state delivers the finished output each investor type needs: board-ready documents for document-led investors, system-ready data for data-led investors</div><div class="ev">Source: theme tracker, last-mile shape. Form: two-column compare.</div><div class="no">2.2</div><div class="bar"></div></div>
</div>
<div class="secbar"><span class="car">&#9662;</span><span class="sn">Section 3 &nbsp;The gaps</span><span class="ln"></span></div>
<div class="thumbs">
<div class="th"><div class="tt">A small number of recurring gaps drive most of the manual work investors describe</div><div class="ev">Source: theme tracker gap counts. Form: simple bar, detail table in the appendix.</div><div class="no">3.1</div><div class="bar"></div></div>
<div class="th"><div class="tt">The gaps take a different shape by investor type: pensions need documents, insurers need data</div><div class="ev">Source: theme tracker, last-mile shape. Form: two-column compare.</div><div class="no">3.2</div><div class="bar"></div></div>
<div class="th"><div class="tt">For data-led investors the same gap costs more, because the downstream is a regulatory filing, not a board slide</div><div class="ev">Source: insurer interviews, score spread. Form: anchor example with spread.</div><div class="no">3.3</div><div class="bar"></div></div>
<div class="th"><div class="tt">Underneath the gaps is one root cause: the platform has no memory and does not reach out, so every interaction starts from scratch</div><div class="ev">Source: theme tracker, onboarding and notifications flags. Form: root-cause statement.</div><div class="no">3.4</div><div class="bar"></div></div>
</div>
<div class="secbar"><span class="car">&#9662;</span><span class="sn">Section 4 &nbsp;Recommendations and roadmap</span><span class="ln"></span></div>
<div class="thumbs">
<div class="th"><div class="tt">Closing the gaps does not require rebuilding the platform; it requires sequencing a few high-leverage improvements</div><div class="ev">Source: the client funding posture. Form: assertion, no exhibit.</div><div class="no">4.1</div><div class="bar"></div></div>
<div class="th ph"><div class="tt">[Phase 1, quick wins, pending Laura's read on what is realistic to build: consolidated capital-activity report, real document search, event notifications]</div><div class="ev"></div><div class="no">4.2</div><div class="bar"></div></div>
<div class="th ph"><div class="tt">[Phase 2: reusable onboarding profile, data export and feed for data-led investors]</div><div class="ev"></div><div class="no">4.3</div><div class="bar"></div></div>
<div class="th ph"><div class="tt">[Phase 3, heavier lifts: look-through holdings data, deeper system integrations]</div><div class="ev"></div><div class="no">4.4</div><div class="bar"></div></div>
<div class="th ph"><div class="tt">[the recommended sequence, each improvement tied to the gap it closes and the effort it takes; this is the page Diane funds from, built with the client's input on what is realistic]</div><div class="ev"></div><div class="no">4.5</div><div class="bar"></div></div>
</div>
<div class="secbar"><span class="car">&#9662;</span><span class="sn">Appendix &nbsp;Parked, the material that does not fit an executive's time</span><span class="ln"></span></div>
<div class="thumbs">
<div class="th"><div class="tt">Per-interview detail; the full theme tracker; methodology and interview count; the score table; the per-gap detail</div><div class="ev">Source: the full working record. Form: back-of-deck reference.</div><div class="no">A</div><div class="bar"></div></div>
</div>
</div>
<div class="statusbar"><span>Slide Sorter</span><span class="conf">Internal working document, not for client distribution</span></div>
</div></div>
</body>
</html>
`
