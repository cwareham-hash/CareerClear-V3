// Meridian Park artifact 10 - SMDeckReview. Self-contained HTML,
// verbatim from content repo artifacts/artifact_10_SMDeckReview.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.
// Manifest type powerpoint, which the app renders at powerpoint width. Placement: Block 17, Senior Manager deck review, Friday.

export const meridianArtifact10Html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Meridian Park Investor Platform Assessment - recommendation deck, reviewed</title>
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
<div class="row"><div style="width:960px"><div class="secdiv"><span class="n">0</span><span class="t">Executive summary</span><span class="g">one page, written last, placed first</span><span class="ln"></span></div>
<div class="cardwrap"><div class="gapslot">no page in the file<div class="mk" style="right:-9px;top:-9px">6</div></div></div>
<div class="secdiv"><span class="n">1</span><span class="t">Current state</span><span class="g">how the portal serves investors today</span><span class="ln"></span></div>
<div class="cardwrap"><div class="card"><div class="mk" style="right:-9px;top:-9px">3</div><div class="tt">Meridian's investors value the relationship, and the portal's data is accurate and complete</div><div class="no">1.1</div></div><div class="card"><div class="tt">Investors lean on the portal most heavily at the reporting cycle, exactly when the stakes are highest</div><div class="no">1.2</div></div><div class="card"><div class="tt">Today the portal stops at accurate data and leaves investors to assemble the finished output themselves</div><div class="no">1.3</div></div></div>
<div class="secdiv"><span class="n">2</span><span class="t">Desired future state</span><span class="g">what a best-in-class portal delivers</span><span class="ln"></span></div>
<div class="cardwrap"><div class="card"><div class="mk" style="right:-9px;top:-9px">10</div><div class="tt">Investors already get consolidated, exportable, notified data from their best managers; the bar has moved and Meridian sits behind it</div><div class="no">2.1</div></div><div class="card"><div class="tt">The target state delivers the finished output each investor type needs: board-ready documents for document-led investors, system-ready data for data-led investors</div><div class="no">2.2</div></div></div>
<div class="secdiv"><span class="n">3</span><span class="t">The gaps</span><span class="g">the difference between current and future state</span><span class="ln"></span></div>
<div class="slide" style="margin-bottom:14px"><div class="shdr"><span class="eng">Meridian Park Investor Platform Assessment</span><span class="strack"><span class="t">1 Current state</span><span class="d"></span><span class="t">2 Future state</span><span class="d"></span><span class="t on">3 The gaps</span><span class="d"></span><span class="t">4 Roadmap</span></span></div><div class="sbody"><div class="atitle">The Meridian portal delivers accurate data but stops short of the finished output investors need, leaving them to build the last mile by hand</div><div class="asub">Investors consistently credit the accuracy and completeness of the data on the portal, and just as consistently describe the manual work they do afterwards to turn that data into the finished output their boards, committees and internal systems actually require.</div><div class="cols"><div class="cl"><ul class="b"><li>Across the 20 investor interviews completed to date, nearly all credit the portal's data as accurate and complete, and nearly all describe doing manual work to turn that data into what they actually use.</li><li>The pain is not accuracy. It is the gap between accurate data and a usable end product.</li></ul><div class="qt">"I'm paying for a finished product and getting raw ingredients."</div><div class="qt">"It gives me a PDF I have to take apart before any of the real work starts."</div></div><div class="cr"><svg width="352" height="228" viewBox="0 0 352 228" role="img" aria-label="Accurate data, the gap, finished output">
<rect x="6" y="30" width="128" height="112" fill="#1f2d46"/>
<text x="70" y="80" font-family="Arial,Helvetica,sans-serif" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="bold">Accurate</text>
<text x="70" y="97" font-family="Arial,Helvetica,sans-serif" font-size="12.5" fill="#ffffff" text-anchor="middle" font-weight="bold">data</text>
<text x="70" y="158" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798" text-anchor="middle">what the portal delivers</text>
<rect x="218" y="30" width="128" height="112" fill="none" stroke="#a9b2c0" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="282" y="80" font-family="Arial,Helvetica,sans-serif" font-size="12.5" fill="#7d8798" text-anchor="middle" font-weight="bold">Finished</text>
<text x="282" y="97" font-family="Arial,Helvetica,sans-serif" font-size="12.5" fill="#7d8798" text-anchor="middle" font-weight="bold">output</text>
<text x="282" y="158" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798" text-anchor="middle">what the investor needs</text>
<rect x="140" y="30" width="72" height="112" fill="#fdf6e8"/>
<line x1="140" y1="30" x2="140" y2="142" stroke="#b3771f" stroke-width="2"/>
<line x1="212" y1="30" x2="212" y2="142" stroke="#b3771f" stroke-width="2"/>
<text x="176" y="80" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#b3771f" text-anchor="middle" font-weight="bold">the last</text>
<text x="176" y="95" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#b3771f" text-anchor="middle" font-weight="bold">mile</text>
<text x="176" y="112" font-family="Arial,Helvetica,sans-serif" font-size="9.5" fill="#b3771f" text-anchor="middle">done by hand</text>
<text x="176" y="190" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#56637a" text-anchor="middle">today the investor closes this gap</text></svg></div></div><div class="sowhat"><b>So what:</b> the opportunity is the last mile, not the data layer. This reframes the problem from fix the data to finish the job.</div></div><div class="mk" style="left:936px;top:120px">7</div><div class="mk" style="left:936px;top:146px">8</div><div class="sfoot"><span class="src">Source: investor interview programme, 20 interviews completed to date.</span><span class="rt"><span class="draft">Draft</span><span class="conf">Confidential, prepared for Meridian Park</span><span class="pg">3.1</span></span></div></div>
<div class="slide" style="margin-bottom:14px"><div class="shdr"><span class="eng">Meridian Park Investor Platform Assessment</span><span class="strack"><span class="t">1 Current state</span><span class="d"></span><span class="t">2 Future state</span><span class="d"></span><span class="t on">3 The gaps</span><span class="d"></span><span class="t">4 Roadmap</span></span></div><div class="sbody"><div class="atitle only">Because the downstream work differs, the same gap costs a pension a board report and an insurer a regulatory filing</div><div class="cols"><div class="cl"><ul class="b"><li>Document-led investors (pensions, endowments, foundations): the missing last step is a consolidated, presentation-ready report they can take to a board or investment committee.<ul><li>About 1 to 2 analyst-days per quarter on assembly alone, investor-reported.</li></ul></li><li>Data-led investors (insurers): the missing last step is structured data delivered into their own systems for statutory accounting, regulatory capital, and asset-liability work.<ul><li>About 2 staff for the better part of a week each quarterly filing, investor-reported.</li></ul></li></ul></div><div class="cr"><svg width="352" height="252" viewBox="0 0 352 252" role="img" aria-label="Document-led against data-led, the two finish lines">
<rect x="4" y="6" width="166" height="34" fill="#1f2d46"/>
<text x="87" y="28" font-family="Arial,Helvetica,sans-serif" font-size="11.5" fill="#ffffff" text-anchor="middle" font-weight="bold">Document-led</text>
<rect x="182" y="6" width="166" height="34" fill="#2d6a63"/>
<text x="265" y="28" font-family="Arial,Helvetica,sans-serif" font-size="11.5" fill="#ffffff" text-anchor="middle" font-weight="bold">Data-led</text>
<rect x="4" y="44" width="166" height="200" fill="#f5f7f9"/>
<rect x="182" y="44" width="166" height="200" fill="#f2f7f6"/>
<text x="16" y="66" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">WHO</text>
<text x="16" y="82" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">Pensions, endowments,</text>
<text x="16" y="96" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">foundations</text>
<text x="194" y="66" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">WHO</text>
<text x="194" y="82" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">Insurers</text>
<line x1="16" y1="112" x2="158" y2="112" stroke="#dfe4ea" stroke-width="1"/>
<line x1="194" y1="112" x2="336" y2="112" stroke="#dfe4ea" stroke-width="1"/>
<text x="16" y="132" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">FINISH LINE</text>
<text x="16" y="148" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">A board-ready or</text>
<text x="16" y="162" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">committee-ready report</text>
<text x="194" y="132" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">FINISH LINE</text>
<text x="194" y="148" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">Structured data into</text>
<text x="194" y="162" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">their own systems</text>
<line x1="16" y1="178" x2="158" y2="178" stroke="#dfe4ea" stroke-width="1"/>
<line x1="194" y1="178" x2="336" y2="178" stroke="#dfe4ea" stroke-width="1"/>
<text x="16" y="198" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">COST TODAY</text>
<text x="16" y="216" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#1f2d46" font-weight="bold">1 to 2 analyst-days</text>
<text x="16" y="231" font-family="Arial,Helvetica,sans-serif" font-size="10.5" fill="#56637a">per quarter</text>
<text x="194" y="198" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">COST TODAY</text>
<text x="194" y="216" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#2d6a63" font-weight="bold">About 2 staff, a week</text>
<text x="194" y="231" font-family="Arial,Helvetica,sans-serif" font-size="10.5" fill="#56637a">per quarterly filing</text></svg></div></div><div class="sowhat"><b>So what:</b> one structural problem, two finish lines. The roadmap has to serve both without rebuilding the platform.</div></div><div class="mk" style="left:936px;top:120px">2</div><div class="sfoot"><span class="src">Source: investor interview programme, 20 interviews completed to date.</span><span class="rt"><span class="draft">Draft</span><span class="conf">Confidential, prepared for Meridian Park</span><span class="pg">3.2</span></span></div></div>
<div class="slide" style="margin-bottom:14px"><div class="shdr"><span class="eng">Meridian Park Investor Platform Assessment</span><span class="strack"><span class="t">1 Current state</span><span class="d"></span><span class="t">2 Future state</span><span class="d"></span><span class="t on">3 The gaps</span><span class="d"></span><span class="t">4 Roadmap</span></span></div><div class="sbody"><div class="atitle only">A small number of recurring gaps drive most of the manual work investors describe</div><ul class="b" style="margin-top:13px"><li>Four gaps account for the majority of the manual effort cited across interviews.</li></ul><div style="margin-top:6px"><svg width="880" height="212" viewBox="0 0 880 212" role="img" aria-label="Investors raising each gap, of 20 interviewed to date"><g stroke="#e4e7ea" stroke-width="1"><line x1="280" y1="6" x2="280" y2="164"/><line x1="430" y1="6" x2="430" y2="164"/><line x1="580" y1="6" x2="580" y2="164"/><line x1="730" y1="6" x2="730" y2="164"/><line x1="880" y1="6" x2="880" y2="164"/></g><line x1="280" y1="164" x2="880" y2="164" stroke="#a9b2c0" stroke-width="1"/><g font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798" text-anchor="middle"><text x="280" y="180">0</text><text x="430" y="180">5</text><text x="580" y="180">10</text><text x="730" y="180">15</text><text x="880" y="180">20</text><text x="580" y="200" font-size="10.5">investors raising the gap, of 20 interviewed to date</text></g><g font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b" text-anchor="end"><text x="272" y="26">No consolidated capital-activity report</text><text x="272" y="64">Poor document search / retrieval</text><text x="272" y="102">No event notifications</text><text x="272" y="140">Onboarding re-papering</text></g><rect x="280" y="10" width="420" height="22" fill="#1f2d46"/><rect x="280" y="48" width="360" height="22" fill="#1f2d46"/><rect x="280" y="86" width="330" height="22" fill="#1f2d46"/><rect x="280" y="124" width="300" height="22" fill="#1f2d46"/><text x="708" y="26" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#1f2d46" font-weight="bold">14</text><text x="730" y="26" font-family="Arial,Helvetica,sans-serif" font-size="9.5" fill="#8b929c">70%</text><text x="648" y="64" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#1f2d46" font-weight="bold">12</text><text x="670" y="64" font-family="Arial,Helvetica,sans-serif" font-size="9.5" fill="#8b929c">60%</text><text x="618" y="102" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#1f2d46" font-weight="bold">11</text><text x="640" y="102" font-family="Arial,Helvetica,sans-serif" font-size="9.5" fill="#8b929c">55%</text><text x="588" y="140" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#1f2d46" font-weight="bold">10</text><text x="610" y="140" font-family="Arial,Helvetica,sans-serif" font-size="9.5" fill="#8b929c">50%</text></svg></div><div class="sowhat"><b>So what:</b> each gap is a discrete, addressable fix rather than a platform rebuild, which is what makes a phased roadmap possible.</div></div><div class="sfoot"><span class="src">Source: investor interview programme, 20 interviews completed to date.</span><span class="rt"><span class="draft">Draft</span><span class="conf">Confidential, prepared for Meridian Park</span><span class="pg">3.3</span></span></div></div>
<div class="cardwrap"><div class="card ph"><div class="mk" style="right:-9px;top:-9px">9</div><div class="tt">[skeleton title, page not built: underneath the gaps is one root cause, the platform has no memory and does not reach out, so every interaction starts from scratch]</div><div class="no">3.4</div></div></div>
<div class="secdiv"><span class="n">4</span><span class="t">Recommendations and roadmap</span><span class="g">prioritized, fundable</span><span class="ln"></span></div>
<div class="cardwrap"><div class="card"><div class="tt">Closing the gaps does not require rebuilding the platform; it requires sequencing a few high-leverage improvements</div><div class="no">4.1</div></div><div class="card ph"><div class="tt">[placeholder: phase 1, quick wins, pending Laura's read on what is realistic to build. Consolidated capital-activity report, real document search, event notifications]</div><div class="no">4.2</div></div><div class="card ph"><div class="tt">[placeholder: phase 2. Reusable onboarding profile, data export and feed for data-led investors]</div><div class="no">4.3</div></div><div class="card ph"><div class="tt">[placeholder: phase 3, heavier lifts. Look-through holdings data, deeper system integrations]</div><div class="no">4.4</div></div><div class="card ph"><div class="mk" style="right:-9px;top:-9px">1</div><div class="tt">[placeholder: the recommended sequence, each improvement tied to the gap it closes and the effort it takes]</div><div class="no">4.5</div></div></div>
<div class="secdiv"><span class="n">A</span><span class="t">Appendix</span><span class="g">parked, the material that does not fit an executive's time</span><span class="ln"></span></div>
<div class="cardwrap"><div class="card"><div class="mk" style="right:-9px;top:-9px">5</div><div class="tt">Methodology and interview count; per-interview detail; the full theme tracker; the score table; page A3, per-gap detail and quantified pain</div><div class="no">A</div></div></div></div><div class="rail"><div class="railhdr">Comments &#183; David</div><div class="railbody">
<div class="cmt"><div class="ch"><span class="cn">1</span><span class="who">David</span><span class="on">Page 4.5</span></div><p>Biggest one. I can see the gaps beautifully. I cannot see the money. The titles assert two things, without a rebuild and in phases, and people who control a budget do not fund adjectives. Where does it become obvious that phase one is small and cheap and phase three is the big bet? Blank is the right call until Laura's read firms the specifics, so keep it honest, but hold the place loudly. This page is the recommendation. Everything else is the case for it. Build the deck backward from here, not forward into three bullets under a heading called next steps. And put a relative size on each phase before the line items are settled. A relative sense of the money is fundable. Silence on the money reads as we have not thought about it.</p></div>
<div class="cmt"><div class="ch"><span class="cn">2</span><span class="who">David</span><span class="on">Page 3.2</span></div><p>Most sophisticated point in the deck. Now make it survive the cynical question from her leadership: why spend on a data feed for a handful of insurers? Because it is the right thing to do loses in one sentence. Put her own logic on the page in business terms. A small number of large, at-risk relationships is a sentence a CFO funds. It is only fair to the insurers is a plea. And put the shared-cost point in bold right beside it, that most of the spend serves everyone and the insurer piece is a cheap increment on top. That kills the question outright: not choosing between investors, adding a small step that protects the largest relationships.</p></div>
<div class="cmt"><div class="ch"><span class="cn">3</span><span class="who">David</span><span class="on">Page 1.1</span></div><p>Credit is right, it earns the standing to be critical. But this reads a little grudging. Land it like you mean it. Their people built this portal, and if the front feels like a polite setup before the knife they argue with the evidence instead of acting on it. Not throat-clearing. Disarming.</p></div>
<div class="cmt"><div class="ch"><span class="cn">4</span><span class="who">David</span><span class="on">Across the deck</span></div><p>Flag for later, not a change now. Watch evidence density as the pages get built out under these titles. The titles are clean. The temptation when the proof goes in is to crowd it back in, and that undoes the thing that makes this section work. One idea a page, the proof beneath it, the detail in the appendix.</p></div>
<div class="cmt"><div class="ch"><span class="cn">5</span><span class="who">David</span><span class="on">Appendix</span></div><p>This is where the argument holds up under scrutiny or does not. The whole case rests on counts, fourteen of twenty and the rest, and the first thing a skeptical reader in her leadership does with a number like that is ask about the twenty. Who are they, how were they chosen, is it representative. Keep methodology in the back and reference it, do not present it, but make it answer representativeness specifically: show the mix of investor types in the twenty roughly matches the mix in Meridian's book. If the sample skews to the loud complainers the fourteen means less. If it mirrors the book the fourteen is unassailable. Use the segment split Gregory gave at the checkpoint.</p></div>
<div class="cmt"><div class="ch"><span class="cn">6</span><span class="who">David</span><span class="on">Section 0</span></div><p>There is no executive summary in here yet. When you build it, it has to land the whole arc on one page as cleanly as the gaps pages land the gap. Right now the middle is the strongest part of the deck, which is backwards for the reader who matters most. A senior reader spends the most attention on the first page and the last and skims the middle, so the front cannot be the weakest thing in here. Not a table of contents. The argument in miniature, with the money in it.</p></div>
<div class="cmt"><div class="ch"><span class="cn">7</span><span class="who">David</span><span class="on">Page 3.1</span></div><p>This is 1.3 again, near enough word for word. Two pages cannot carry the same sentence two sections apart. Either 1.3 sets up the reporting cycle and this one lands the last mile, or one of them goes.</p></div>
<div class="cmt"><div class="ch"><span class="cn">8</span><span class="who">David</span><span class="on">Page 3.1</span></div><p>Both exhibits in this section are still captions. They need to be drawn before anyone outside this team sees the deck.</p></div>
<div class="cmt"><div class="ch"><span class="cn">9</span><span class="who">David</span><span class="on">Page 3.4</span></div><p>Every other page in this section is built. This one is still a title. Build it or cut it, but do not let it travel like this.</p></div>
<div class="cmt"><div class="ch"><span class="cn">10</span><span class="who">David</span><span class="on">Page 2.1</span></div><p>The bar has moved is the claim this section rests on, and right now it is a title with nothing under it. Pin the benchmark evidence before the page builds out: what the comparison rests on, and where the scores come from. Her leadership will want to know what the bar is before they accept that Meridian sits behind it.</p></div>
</div></div></div></div>
</body>
</html>
`
