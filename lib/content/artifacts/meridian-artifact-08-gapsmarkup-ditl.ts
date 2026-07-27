// Meridian Park artifact 08 - GapsMarkup_DITL. Self-contained HTML,
// verbatim from content repo artifacts/artifact_08_GapsMarkup_DITL.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.
// Manifest type powerpoint, which the app renders at powerpoint width. Placement: DITL Block 6, Deck review with Marcus (Day-in-the-Life variant, 18 base).

export const meridianArtifact08DitlHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Meridian Park Investor Platform Assessment - page 3.3, reviewed</title>
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
<div class="row"><div class="slide"><div class="shdr"><span class="eng">Meridian Park Investor Platform Assessment</span><span class="strack"><span class="t">1 Current state</span><span class="d"></span><span class="t">2 Future state</span><span class="d"></span><span class="t on">3 The gaps</span><span class="d"></span><span class="t">4 Roadmap</span></span></div><div class="sbody">
<div class="atitle only">Four recurring gaps drive most of the manual work, and they cluster by how often investors hit them</div>
<table class="gt"><tr><th style="width:33%">Gap</th><th class="c" style="width:13%">Raised by</th><th style="width:31%">What investors do today</th><th style="width:23%">Quantified pain</th></tr>
<tr><td>No consolidated capital-activity report</td><td class="c">13 of 18 (72%)</td><td>Open statements one at a time, assemble in own spreadsheet</td><td>1 to 2 analyst-days per quarter</td></tr>
<tr><td>Poor document search / retrieval</td><td class="c">11 of 18 (61%)</td><td>Email the relationship manager to retrieve</td><td>Hours to about a day per request</td></tr>
<tr><td>No event notifications</td><td class="c">10 of 18 (56%)</td><td>Rely on the relationship manager's emails; risk seeing call notices late</td><td>Compressed funding windows; near-misses</td></tr>
<tr><td>Onboarding re-papering (carried as the separate no-memory theme)</td><td class="c">9 of 18 (50%)</td><td>Re-submit the same entity info and signatories each new fund</td><td>Re-papered up to 4 times for multi-fund investors</td></tr>
</table>
<div class="sowhat"><b>So what:</b> these are discrete, addressable fixes, not a platform rebuild. That is what makes a phased roadmap possible.</div>
</div>
<div class="mk" style="left:936px;top:48px">1</div>
<div class="mk" style="left:404px;top:136px">2</div>
<div class="mk" style="left:936px;top:190px">3</div><div class="mk" style="left:936px;top:216px">4</div>
<div class="mk" style="left:936px;top:326px">5</div>
<div class="sfoot"><span class="src">Source: investor interview programme, 18 interviews completed to date. Quantification is investor-reported.</span><span class="rt"><span class="draft">Draft</span><span class="conf">Confidential, prepared for Meridian Park</span><span class="pg">3.3</span></span></div>
</div>
<div class="rail"><div class="railhdr">Comments</div><div class="railbody">
<div class="cmt"><div class="ch"><span class="cn">1</span><span class="who">Marcus</span><span class="on">Action title</span></div><p>Title is two ideas. Cut everything after the comma. One idea: the gaps drive the manual work. New title candidate: "A small number of recurring gaps drive most of the manual work investors describe."</p></div>
<div class="cmt"><div class="ch"><span class="cn">2</span><span class="who">Marcus</span><span class="on">Raised by</span></div><p>13 of 18 what? Investors interviewed to date. Put the base on every number, and make each slide stand on its own.</p></div>
<div class="cmt"><div class="ch"><span class="cn">3</span><span class="who">Marcus</span><span class="on">Body table</span></div><p>This whole table is the appendix. The page itself should show the counts as a simple bar and make ONE point. The detail moves behind it.</p></div>
<div class="cmt"><div class="ch"><span class="cn">4</span><span class="who">Marcus</span><span class="on">Body table</span></div><p>Good content, wrong container. Split it: lead page is the point, the evidence table is appendix A3.</p></div>
<div class="cmt"><div class="ch"><span class="cn">5</span><span class="who">Marcus</span><span class="on">So what</span></div><p>Keep this line, it is the so-what. But it belongs up on the lead page, not buried under the table.</p></div>
</div></div></div></div>
</body>
</html>
`
