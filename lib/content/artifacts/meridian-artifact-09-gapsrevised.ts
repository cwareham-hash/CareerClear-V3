// Meridian Park artifact 09 - GapsRevised. Self-contained HTML,
// verbatim from content repo artifacts/artifact_09_GapsRevised.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.
// Manifest type powerpoint, which the app renders at powerpoint width. Placement: Block 12, Revise the deck section, Thursday.

export const meridianArtifact09Html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Meridian Park Investor Platform Assessment - Section 3, revised</title>
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
<div class="row"><div class="slide"><div class="shdr"><span class="eng">Meridian Park Investor Platform Assessment</span><span class="strack"><span class="t">1 Current state</span><span class="d"></span><span class="t">2 Future state</span><span class="d"></span><span class="t on">3 The gaps</span><span class="d"></span><span class="t">4 Roadmap</span></span></div><div class="sbody">
<div class="atitle only">Because the downstream work differs, the same gap costs a pension a board report and an insurer a regulatory filing</div>
<div class="cols"><div class="cl"><ul class="b">
<li>Document-led investors (pensions, endowments, foundations): the missing last step is a consolidated, presentation-ready report they can take to a board or investment committee.<ul><li>A pension CIO rebuilds a quarter's capital activity by hand because there is no consolidated capital-activity report. About 1 to 2 analyst-days per quarter, investor-reported.</li></ul></li>
<li>Data-led investors (insurers): the missing last step is structured data delivered into their own systems for statutory accounting, regulatory capital, and asset-liability work.<ul><li>A life insurer reclassifies and re-keys every position so it maps to statutory reporting. About 2 staff for the better part of a week each quarterly filing, investor-reported.</li></ul></li>
</ul></div><div class="cr"><svg width="352" height="252" viewBox="0 0 352 252" role="img" aria-label="Document-led against data-led, the two finish lines">
<rect x="4" y="6" width="166" height="34" fill="#1f2d46"/><text x="87" y="28" font-family="Arial,Helvetica,sans-serif" font-size="11.5" fill="#ffffff" text-anchor="middle" font-weight="bold">Document-led</text>
<rect x="182" y="6" width="166" height="34" fill="#2d6a63"/><text x="265" y="28" font-family="Arial,Helvetica,sans-serif" font-size="11.5" fill="#ffffff" text-anchor="middle" font-weight="bold">Data-led</text>
<rect x="4" y="44" width="166" height="200" fill="#f5f7f9"/><rect x="182" y="44" width="166" height="200" fill="#f2f7f6"/>
<text x="16" y="66" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">WHO</text>
<text x="16" y="82" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">Pensions, endowments,</text>
<text x="16" y="96" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">foundations</text>
<text x="194" y="66" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">WHO</text>
<text x="194" y="82" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">Insurers</text>
<line x1="16" y1="112" x2="158" y2="112" stroke="#dfe4ea" stroke-width="1"/><line x1="194" y1="112" x2="336" y2="112" stroke="#dfe4ea" stroke-width="1"/>
<text x="16" y="132" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">FINISH LINE</text>
<text x="16" y="148" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">A board-ready or</text>
<text x="16" y="162" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">committee-ready report</text>
<text x="194" y="132" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">FINISH LINE</text>
<text x="194" y="148" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">Structured data into</text>
<text x="194" y="162" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b">their own systems</text>
<line x1="16" y1="178" x2="158" y2="178" stroke="#dfe4ea" stroke-width="1"/><line x1="194" y1="178" x2="336" y2="178" stroke="#dfe4ea" stroke-width="1"/>
<text x="16" y="198" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">COST TODAY</text>
<text x="16" y="216" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#1f2d46" font-weight="bold">1 to 2 analyst-days</text>
<text x="16" y="231" font-family="Arial,Helvetica,sans-serif" font-size="10.5" fill="#56637a">per quarter</text>
<text x="194" y="198" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798">COST TODAY</text>
<text x="194" y="216" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#2d6a63" font-weight="bold">About 2 staff, a week</text>
<text x="194" y="231" font-family="Arial,Helvetica,sans-serif" font-size="10.5" fill="#56637a">per quarterly filing</text></svg></div></div>
<div class="sowhat"><b>So what:</b> one structural problem, two finish lines. The roadmap has to serve both without rebuilding the platform.</div>
</div><div class="chg" style="top:44px;height:56px"></div>
<div class="sfoot"><span class="src">Source: investor interview programme, 20 interviews completed to date. Quantification is investor-reported.</span><span class="rt"><span class="rev">Revised</span><span class="draft">Draft</span><span class="conf">Confidential, prepared for Meridian Park</span><span class="pg">3.2</span></span></div></div></div>
<div class="row"><div class="slide"><div class="shdr"><span class="eng">Meridian Park Investor Platform Assessment</span><span class="strack"><span class="t">1 Current state</span><span class="d"></span><span class="t">2 Future state</span><span class="d"></span><span class="t on">3 The gaps</span><span class="d"></span><span class="t">4 Roadmap</span></span></div><div class="sbody">
<div class="atitle only">A small number of recurring gaps drive most of the manual work investors describe</div>
<ul class="b" style="margin-top:13px"><li>Four gaps account for the majority of the manual effort cited across interviews.</li></ul>
<div style="margin-top:6px"><svg width="880" height="212" viewBox="0 0 880 212" role="img" aria-label="Investors raising each gap, of 20 interviewed to date"><g stroke="#e4e7ea" stroke-width="1"><line x1="280" y1="6" x2="280" y2="164"/><line x1="430" y1="6" x2="430" y2="164"/><line x1="580" y1="6" x2="580" y2="164"/><line x1="730" y1="6" x2="730" y2="164"/><line x1="880" y1="6" x2="880" y2="164"/></g><line x1="280" y1="164" x2="880" y2="164" stroke="#a9b2c0" stroke-width="1"/><g font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798" text-anchor="middle"><text x="280" y="180">0</text><text x="430" y="180">5</text><text x="580" y="180">10</text><text x="730" y="180">15</text><text x="880" y="180">20</text><text x="580" y="200" font-size="10.5">investors raising the gap, of 20 interviewed to date</text></g><g font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#1a1f2b" text-anchor="end"><text x="272" y="26">No consolidated capital-activity report</text><text x="272" y="64">Poor document search / retrieval</text><text x="272" y="102">No event notifications</text><text x="272" y="140">Onboarding re-papering</text></g><rect x="280" y="10" width="420" height="22" fill="#1f2d46"/><rect x="280" y="48" width="360" height="22" fill="#1f2d46"/><rect x="280" y="86" width="330" height="22" fill="#1f2d46"/><rect x="280" y="124" width="300" height="22" fill="#1f2d46"/><text x="708" y="26" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#1f2d46" font-weight="bold">14</text><text x="730" y="26" font-family="Arial,Helvetica,sans-serif" font-size="9.5" fill="#8b929c">70%</text><text x="648" y="64" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#1f2d46" font-weight="bold">12</text><text x="670" y="64" font-family="Arial,Helvetica,sans-serif" font-size="9.5" fill="#8b929c">60%</text><text x="618" y="102" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#1f2d46" font-weight="bold">11</text><text x="640" y="102" font-family="Arial,Helvetica,sans-serif" font-size="9.5" fill="#8b929c">55%</text><text x="588" y="140" font-family="Arial,Helvetica,sans-serif" font-size="12" fill="#1f2d46" font-weight="bold">10</text><text x="610" y="140" font-family="Arial,Helvetica,sans-serif" font-size="9.5" fill="#8b929c">50%</text></svg></div>
<div class="sowhat"><b>So what:</b> each gap is a discrete, addressable fix rather than a platform rebuild, which is what makes a phased roadmap possible.</div>
<div class="pnote">Full per-gap detail and quantified pain, appendix A3.</div>
</div><div class="chg" style="top:44px;height:400px"></div>
<div class="sfoot"><span class="src">Source: investor interview programme, 20 interviews completed to date.</span><span class="rt"><span class="rev">Revised</span><span class="draft">Draft</span><span class="conf">Confidential, prepared for Meridian Park</span><span class="pg">3.3</span></span></div></div></div>
<div class="row"><div class="slide"><div class="shdr"><span class="eng">Meridian Park Investor Platform Assessment</span><span class="strack"><span class="t">1 Current state</span><span class="d"></span><span class="t">2 Future state</span><span class="d"></span><span class="t on">3 The gaps</span><span class="d"></span><span class="t">4 Roadmap</span></span></div><div class="sbody">
<div class="atitle only">For data-led investors the same gap costs more, because the downstream is a regulatory filing, not a board slide</div>
<div class="cols"><div class="cl"><ul class="b">
<li>Insurers are a minority of the book. Five sit in the interview sample, and Meridian puts them at about one in ten of its relationships.</li>
<li>Their scores sit lower and spread wider. A life insurer rates Meridian 5 against a best other manager of 9, where the document-led pattern runs closer to 6 against 8.</li>
<li>The cost lands differently. When a pension misses the finished output it costs analyst hours rebuilding a board slide. When an insurer misses it, the cost lands inside a statutory filing, with a regulator on the other end and a deadline that is not theirs to move.</li>
<li>What they need is structured data into their own systems, and look-through detail on holdings for capital charges. About 2 staff for the better part of a week each quarterly filing, investor-reported.</li>
</ul></div><div class="cr">
<svg width="352" height="236" viewBox="0 0 352 236" role="img" aria-label="Meridian score against best other manager, by investor type">
<g stroke="#e4e7ea" stroke-width="1"><line x1="150" y1="18" x2="150" y2="150"/><line x1="200" y1="18" x2="200" y2="150"/><line x1="250" y1="18" x2="250" y2="150"/><line x1="300" y1="18" x2="300" y2="150"/><line x1="350" y1="18" x2="350" y2="150"/></g>
<line x1="150" y1="150" x2="350" y2="150" stroke="#a9b2c0" stroke-width="1"/>
<g font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#7d8798" text-anchor="middle"><text x="150" y="166">4</text><text x="200" y="166">6</text><text x="250" y="166">8</text><text x="300" y="166">10</text></g>
<text x="240" y="186" font-family="Arial,Helvetica,sans-serif" font-size="10.5" fill="#7d8798" text-anchor="middle">score out of ten</text>
<g font-family="Arial,Helvetica,sans-serif" font-size="10.5" fill="#1a1f2b" text-anchor="end"><text x="142" y="46">Document-led</text><text x="142" y="106">Data-led</text></g>
<line x1="200" y1="40" x2="250" y2="40" stroke="#c3c9d2" stroke-width="2"/>
<circle cx="200" cy="40" r="6" fill="#1f2d46"/><circle cx="250" cy="40" r="6" fill="#9db3c9"/>
<text x="200" y="28" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#1f2d46" text-anchor="middle">6</text>
<text x="250" y="28" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#56637a" text-anchor="middle">8</text>
<line x1="175" y1="100" x2="275" y2="100" stroke="#e3cb9a" stroke-width="2"/>
<circle cx="175" cy="100" r="6" fill="#b3771f"/><circle cx="275" cy="100" r="6" fill="#e3cb9a"/>
<text x="175" y="88" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#b3771f" text-anchor="middle">5</text>
<text x="275" y="88" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="#a9701c" text-anchor="middle">9</text>
<text x="150" y="216" font-family="Arial,Helvetica,sans-serif" font-size="9.5" fill="#7d8798">Filled mark: Meridian. Open mark: best other manager.</text></svg>
</div></div>
<div class="sowhat"><b>So what:</b> a distinct shape of the same problem, not a second problem. A minority of the book carrying a disproportionate cost, which is what the sequencing has to weigh.</div>
</div><div class="chg" style="top:44px;height:400px"></div>
<div class="sfoot"><span class="src">Source: investor interview programme, 20 interviews completed to date. Scores are investor-reported.</span><span class="rt"><span class="rev">New</span><span class="draft">Draft</span><span class="conf">Confidential, prepared for Meridian Park</span><span class="pg">3.3a</span></span></div></div></div>
<div class="row"><div class="slide"><div class="shdr"><span class="eng">Meridian Park Investor Platform Assessment</span><span class="strack"><span class="t">1 Current state</span><span class="d"></span><span class="t">2 Future state</span><span class="d"></span><span class="t on">3 The gaps</span><span class="d"></span><span class="t">4 Roadmap</span></span></div><div class="sbody">
<div class="atitle only">Appendix: per-gap detail and quantified pain</div>
<table class="gt"><tr><th style="width:33%">Gap</th><th class="c" style="width:13%">Raised by</th><th style="width:31%">What investors do today</th><th style="width:23%">Quantified pain</th></tr>
<tr><td>No consolidated capital-activity report</td><td class="c">14 of 20 (70%)</td><td>Open statements one at a time, assemble in own spreadsheet</td><td>1 to 2 analyst-days per quarter</td></tr>
<tr><td>Poor document search / retrieval</td><td class="c">12 of 20 (60%)</td><td>Email the relationship manager to retrieve</td><td>Hours to about a day per request</td></tr>
<tr><td>No event notifications</td><td class="c">11 of 20 (55%)</td><td>Rely on the relationship manager's emails; risk seeing call notices late</td><td>Compressed funding windows; near-misses</td></tr>
<tr><td>Onboarding re-papering</td><td class="c">10 of 20 (50%)</td><td>Re-submit the same entity info and signatories each new fund</td><td>Re-papered up to 4 times for multi-fund investors</td></tr>
</table>
<div class="pnote">Referenced from page 3.3.</div>
</div><div class="chg" style="top:44px;height:300px"></div>
<div class="sfoot"><span class="src">Source: investor interview programme, 20 interviews completed to date. Quantification is investor-reported.</span><span class="rt"><span class="rev">New</span><span class="conf">Confidential, prepared for Meridian Park</span><span class="pg">A3</span></span></div></div></div></div>
</body>
</html>
`
