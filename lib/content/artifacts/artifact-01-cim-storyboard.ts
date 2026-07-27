// Project Kestrel artifact 01 - CIM_Storyboard. Self-contained HTML,
// verbatim from content repo artifacts/artifact_01_CIM_Storyboard.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.

export const artifact01Html = `<!-- artifact 1, Block 1 Monday, type powerpoint -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Halloran Foods CIM - Section Skeleton (slide sorter)</title>
<style>
  :root{
    --navy:#1f2a44; --steel:#3e506b; --gold:#b88a3e; --goldtext:#8a6a2e;
    --divnavy:#26324e; --line:#cdd2db; --pl:#dfe3ea; --ink:#20242b;
    --bg:#dfe1e6; --paper:#ffffff;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:var(--bg);
    font-family:Arial,'Segoe UI',Helvetica,sans-serif;color:var(--ink);
    -webkit-font-smoothing:antialiased}
  .stage{padding:22px 16px 34px}

  .app{width:1120px;min-height:720px;margin:0 auto;background:var(--paper);
    border:1px solid #c7cbd2;box-shadow:0 10px 30px rgba(20,30,60,.18);
    padding:14px 22px 22px}

  /* PowerPoint app strip */
  .bar{display:flex;align-items:center;gap:10px;padding:2px 0 10px;
    border-bottom:1px solid #e4e6ea;margin-bottom:12px}
  .bar .ico{width:17px;height:17px;background:#c14b26;border-radius:3px;color:#fff;
    font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .bar .fn{font-size:12.5px;color:var(--navy);font-weight:600}
  .bar .mode{margin-left:auto;font-size:11.5px;color:#8a909a;letter-spacing:.3px}

  .head{font-size:13px;color:var(--steel);margin-bottom:15px}
  .head b{color:var(--navy)}

  /* slide-sorter grid */
  .sorter{display:grid;grid-template-columns:repeat(6,1fr);gap:15px 16px}
  .cell{display:flex;flex-direction:column;min-width:0}

  .thumb{position:relative;background:#fff;border:1px solid var(--line);border-radius:3px;
    height:96px;box-shadow:0 2px 6px rgba(20,30,60,.10);overflow:hidden;padding:9px 4px 5px}
  .num{position:absolute;top:0;left:0;background:var(--navy);color:#fff;font-size:8px;
    font-weight:700;padding:1px 5px;border-bottom-right-radius:4px;z-index:2}

  .ttl{font-size:8.6px;font-weight:700;color:var(--navy);padding:0 6px;line-height:1.15}
  .goldln{height:2px;background:var(--gold);opacity:.5;margin:5px 6px 6px}
  .pl{height:5px;background:var(--pl);border-radius:2px;margin:4px 6px}
  .pl.s{width:58%}
  .pl.m{width:78%}
  .box{border:1px dashed #c3c9d3;height:32px;margin:5px 6px;border-radius:2px;
    display:flex;align-items:center;justify-content:center;color:#c2c8d2;
    font-size:6.5px;letter-spacing:1.5px;text-transform:uppercase}

  /* section-divider thumbnail */
  .thumb.div{background:var(--divnavy);border-color:#1a2340;display:flex;
    flex-direction:column;align-items:center;justify-content:center;padding:8px;text-align:center}
  .div .kick{color:var(--gold);font-size:6.6px;letter-spacing:2.4px;font-weight:700;margin-bottom:6px}
  .div .dttl{color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:11.5px;
    font-weight:700;line-height:1.18}
  .div .drule{height:2px;width:36px;background:var(--gold);margin-top:8px}

  /* cover thumbnail */
  .thumb.cover{background:#fff;display:flex;flex-direction:column;justify-content:center;padding:11px 12px}
  .cover .co{font-family:Georgia,serif;font-size:12.5px;font-weight:700;color:var(--navy);line-height:1}
  .cover .cim{font-family:Georgia,serif;font-style:italic;font-size:7.2px;color:var(--steel);margin-top:4px}
  .cover .cgold{height:2px;width:44px;background:var(--gold);margin:7px 0 auto}
  .cover .prep{font-size:6.6px;color:#8a909a;letter-spacing:.3px}

  /* pulls-from caption */
  .cap{font-size:8.4px;color:var(--goldtext);margin:6px 3px 0;line-height:1.3}
  .cap .k{font-weight:700}
  .cap.dv{color:#9aa0ab;font-style:italic}

  .hint{margin-top:16px;color:#6b717b;font-size:11px}
</style>
</head>
<body>
<div class="stage">
  <div class="app">

    <div class="bar">
      <span class="ico">P</span>
      <span class="fn">Halloran_Foods_CIM_SHELL.pptx</span>
      <span class="mode">Slide Sorter</span>
    </div>

    <div class="head"><b>Section skeleton and source map.</b> Front of the book first.</div>

    <div class="sorter">

      <!-- 1 cover -->
      <div class="cell">
        <div class="thumb cover"><span class="num">1</span>
          <div class="co">Halloran Foods</div>
          <div class="cim">Confidential Information Memorandum</div>
          <div class="cgold"></div>
          <div class="prep">Prepared by Larkin Reed</div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> template</div>
      </div>

      <!-- 2 divider -->
      <div class="cell">
        <div class="thumb div"><span class="num">2</span>
          <div class="kick">SECTION</div>
          <div class="dttl">Executive Summary</div>
          <div class="drule"></div>
        </div>
        <div class="cap dv">(divider)</div>
      </div>

      <!-- 3 Executive Summary -->
      <div class="cell">
        <div class="thumb"><span class="num">3</span>
          <div class="ttl">Executive Summary</div>
          <div class="goldln"></div>
          <div class="pl"></div>
          <div class="pl m"></div>
          <div class="box">summary</div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> you write this + model for the numbers (turns the most)</div>
      </div>

      <!-- 4 divider -->
      <div class="cell">
        <div class="thumb div"><span class="num">4</span>
          <div class="kick">SECTION</div>
          <div class="dttl">Market Overview</div>
          <div class="drule"></div>
        </div>
        <div class="cap dv">(divider)</div>
      </div>

      <!-- 5 Market Overview -->
      <div class="cell">
        <div class="thumb"><span class="num">5</span>
          <div class="ttl">Market Overview</div>
          <div class="goldln"></div>
          <div class="pl"></div>
          <div class="pl"></div>
          <div class="pl s"></div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> third-party research + management materials (goes near the front)</div>
      </div>

      <!-- 6 divider -->
      <div class="cell">
        <div class="thumb div"><span class="num">6</span>
          <div class="kick">SECTION</div>
          <div class="dttl">The Business</div>
          <div class="drule"></div>
        </div>
        <div class="cap dv">(divider)</div>
      </div>

      <!-- 7 Business Description -->
      <div class="cell">
        <div class="thumb"><span class="num">7</span>
          <div class="ttl">Business Description</div>
          <div class="goldln"></div>
          <div class="pl"></div>
          <div class="pl m"></div>
          <div class="pl s"></div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> management materials + last template</div>
      </div>

      <!-- 8 Products -->
      <div class="cell">
        <div class="thumb"><span class="num">8</span>
          <div class="ttl">Products</div>
          <div class="goldln"></div>
          <div class="pl m"></div>
          <div class="pl s"></div>
          <div class="pl s"></div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> management materials (lead with the 2 to 3 that carry brand and margin)</div>
      </div>

      <!-- 9 Customers -->
      <div class="cell">
        <div class="thumb"><span class="num">9</span>
          <div class="ttl">Customers</div>
          <div class="goldln"></div>
          <div class="pl"></div>
          <div class="pl m"></div>
          <div class="box">table</div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> management materials + executed contracts in the data room</div>
      </div>

      <!-- 10 divider -->
      <div class="cell">
        <div class="thumb div"><span class="num">10</span>
          <div class="kick">SECTION</div>
          <div class="dttl">Financials</div>
          <div class="drule"></div>
        </div>
        <div class="cap dv">(divider)</div>
      </div>

      <!-- 11 Historical Financials -->
      <div class="cell">
        <div class="thumb"><span class="num">11</span>
          <div class="ttl">Historical Financials</div>
          <div class="goldln"></div>
          <div class="box">chart</div>
          <div class="pl s"></div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> operating model</div>
      </div>

      <!-- 12 Adjusted-EBITDA Bridge -->
      <div class="cell">
        <div class="thumb"><span class="num">12</span>
          <div class="ttl">Adjusted-EBITDA Bridge</div>
          <div class="goldln"></div>
          <div class="box">bridge</div>
          <div class="pl s"></div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> model + add-back schedule (each add-back carries its reason)</div>
      </div>

      <!-- 13 Projections -->
      <div class="cell">
        <div class="thumb"><span class="num">13</span>
          <div class="ttl">Projections</div>
          <div class="goldln"></div>
          <div class="box">chart</div>
          <div class="pl s"></div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> model (rank the growth, keep pricing as a separate lever)</div>
      </div>

      <!-- 14 divider -->
      <div class="cell">
        <div class="thumb div"><span class="num">14</span>
          <div class="kick">SECTION</div>
          <div class="dttl">Growth &amp; Risk</div>
          <div class="drule"></div>
        </div>
        <div class="cap dv">(divider)</div>
      </div>

      <!-- 15 Growth Strategy -->
      <div class="cell">
        <div class="thumb"><span class="num">15</span>
          <div class="ttl">Growth Strategy</div>
          <div class="goldln"></div>
          <div class="pl"></div>
          <div class="pl m"></div>
          <div class="pl s"></div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> you write this + model (two you'd defend first)</div>
      </div>

      <!-- 16 Risk Factors -->
      <div class="cell">
        <div class="thumb"><span class="num">16</span>
          <div class="ttl">Risk Factors</div>
          <div class="goldln"></div>
          <div class="pl"></div>
          <div class="pl m"></div>
          <div class="pl s"></div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> you write this (each risk with its mitigant)</div>
      </div>

      <!-- 17 Appendix -->
      <div class="cell">
        <div class="thumb"><span class="num">17</span>
          <div class="ttl">Appendix</div>
          <div class="goldln"></div>
          <div class="box">exhibits</div>
          <div class="pl s"></div>
        </div>
        <div class="cap"><span class="k">pulls from:</span> schedules + supporting exhibits</div>
      </div>

    </div>

    <div class="hint">Shell only. The grey lines and outlined boxes are placeholders for content still to be built; the section titles and the pulls-from notes are the real handoff. Mock for render-fidelity review, not wired to anything.</div>

  </div>
</div>
</body>
</html>
`
