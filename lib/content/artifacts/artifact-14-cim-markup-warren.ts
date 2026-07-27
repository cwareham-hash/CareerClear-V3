// Project Kestrel artifact 14 - CIM_Markup_Warren. Self-contained HTML,
// verbatim from content repo artifacts/artifact_14_CIM_Markup_Warren.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.

export const artifact14Html = `<!-- artifact 14, Block 12 Wednesday, type powerpoint -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Halloran Foods CIM - Executive Summary (Warren markup)</title>
<style>
  :root{
    --navy:#1f2a44; --steel:#3e506b; --ink:#20242b; --grey:#595f6b;
    --ltgrey:#e8eaee; --rule:#b88a3e; --paper:#ffffff; --bg:#e6e8ee;
    --gold:#f2c95b; --line:#cdd2db; --cream:#f4f1e8; --estblue:#7d9bc1;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:var(--bg);font-family:Arial,Helvetica,sans-serif;color:var(--ink);
    -webkit-font-smoothing:antialiased}
  .app{max-width:1360px;margin:0 auto;padding:26px 20px 60px}
  .toolbar{display:flex;align-items:center;gap:12px;margin-bottom:16px;color:var(--steel);font-size:13px}
  .toolbar .dot{width:9px;height:9px;border-radius:50%;background:#c34}
  .toolbar b{color:var(--navy)}
  .stage{display:flex;gap:20px;align-items:flex-start}

  /* ---------------- the slide ---------------- */
  .slide{position:relative;width:960px;height:540px;background:var(--paper);
    box-shadow:0 8px 30px rgba(20,30,60,.22);flex:0 0 auto;overflow:hidden}
  .hdr{height:62px;background:var(--navy);color:#fff;display:flex;align-items:center;
    justify-content:space-between;padding:0 22px}
  .hdr .co{font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;line-height:1}
  .hdr .cim{font-family:Georgia,serif;font-style:italic;font-size:10.5px;color:#c7cede;margin-top:3px}
  .hdr .conf{text-align:right}
  .hdr .conf .c1{color:var(--gold);font-weight:700;font-size:13px;letter-spacing:.5px}
  .hdr .conf .c2{color:#c7cede;font-size:9px;margin-top:2px}
  .goldrule{height:3px;background:var(--rule)}
  .body{padding:8px 22px 0}
  .sect{font-family:Georgia,serif;color:var(--navy);font-weight:700;font-size:15px}
  .posline{font-family:Georgia,serif;font-style:italic;color:var(--steel);font-size:13px;
    margin:8px 0 8px;line-height:1.35;position:relative}
  .hr{height:1px;background:var(--ltgrey);margin:2px 0 10px}
  .cols{display:flex;gap:20px}
  .col{flex:1 1 0;min-width:0}
  .lbl{color:var(--navy);font-weight:700;font-size:10.5px;letter-spacing:.6px;margin:2px 0 6px}
  ul{list-style:none}
  li{font-size:10.7px;line-height:1.33;margin-bottom:5px;padding-left:12px;position:relative}
  li:before{content:"-";position:absolute;left:0;color:var(--steel)}

  table.fin{width:100%;border-collapse:collapse;margin-bottom:10px}
  table.fin td{border:1px solid var(--line);padding:2px 8px;font-size:10.7px}
  table.fin tr.h td{background:var(--navy);color:#fff;font-weight:700}
  table.fin tr:nth-child(even) td{background:var(--ltgrey)}
  table.fin tr.sub td{background:#dfe3ea;font-weight:700}
  table.fin td.k{color:var(--ink)}
  table.fin td.v{text-align:right;color:var(--navy);font-weight:600;width:96px}
  table.fin tr.h td.v,table.fin tr.sub td.v{color:#fff}
  table.fin tr.sub td.v{color:var(--navy)}

  .chartwrap{border:0;margin:2px 0 6px}
  .charttitle{font-size:9px;font-weight:700;color:var(--navy);margin-bottom:3px}

  .opp{background:var(--cream);border:1px solid var(--rule);padding:6px 11px;margin-top:2px}
  .opp .oh{color:var(--navy);font-weight:700;font-size:10.5px;letter-spacing:.5px;margin-bottom:5px}
  .opp li{font-size:10.4px;margin-bottom:4px}
  .opp .ev{color:var(--navy);font-weight:700}

  .cust{font-size:9.4px;font-style:italic;color:var(--grey);line-height:1.3;margin-top:9px;position:relative}
  .foot-note{font-size:8.4px;font-style:italic;color:var(--grey);line-height:1.3;margin-top:3px;position:relative}
  .footer{position:absolute;left:0;bottom:0;width:100%;height:32px;background:var(--navy);
    color:#d5dae6;display:flex;align-items:center;justify-content:space-between;padding:0 22px;font-size:9px}
  .footer .pg{color:#fff;font-weight:700}

  /* anchor markers on the slide */
  .mk{display:inline-flex;align-items:center;justify-content:center;width:17px;height:17px;
    border-radius:50%;background:#c9402f;color:#fff;font-size:10px;font-weight:700;
    vertical-align:middle;margin-left:5px;box-shadow:0 1px 3px rgba(0,0,0,.35);cursor:default}
  .mk.abs{position:absolute}

  /* ---------------- comments rail ---------------- */
  .rail{flex:0 0 320px;background:#fff;border:1px solid #d5d9e2;border-radius:8px;
    box-shadow:0 6px 20px rgba(20,30,60,.12);overflow:hidden;align-self:stretch}
  .rail .rh{padding:12px 14px;border-bottom:1px solid #eceef2;font-weight:700;color:var(--navy);
    font-size:13px;display:flex;align-items:center;justify-content:space-between}
  .rail .rh .n{background:var(--navy);color:#fff;border-radius:11px;font-size:11px;padding:1px 8px}
  .cmt{padding:12px 14px;border-bottom:1px solid #f0f1f4;display:flex;gap:10px}
  .cmt:last-child{border-bottom:0}
  .av{flex:0 0 30px;width:30px;height:30px;border-radius:50%;background:var(--steel);color:#fff;
    font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .cmt .who{font-size:12px;font-weight:700;color:var(--ink)}
  .cmt .role{font-size:10px;color:var(--grey)}
  .cmt .time{font-size:10px;color:#9aa0ab;margin-left:auto}
  .cmt .top{display:flex;align-items:center;gap:6px;margin-bottom:4px}
  .cmt .num{width:16px;height:16px;border-radius:50%;background:#c9402f;color:#fff;font-size:9.5px;
    font-weight:700;display:inline-flex;align-items:center;justify-content:center}
  .cmt .txt{font-size:12px;line-height:1.4;color:#2a2f39}
  .hint{margin-top:14px;color:#8a90a0;font-size:11px;max-width:960px}
</style>
</head>
<body>
<div class="app">
  <div class="toolbar"><span class="dot"></span>
    <b>Halloran_Foods_CIM_ExecSummary.pptx</b> &nbsp; Reviewing &nbsp; 4 comments from Warren (MD)
  </div>

  <div class="stage">
    <!-- ================= SLIDE ================= -->
    <div class="slide">
      <div class="hdr">
        <div>
          <div class="co">Halloran Foods</div>
          <div class="cim">Confidential Information Memorandum</div>
        </div>
        <div class="conf">
          <div class="c1">CONFIDENTIAL</div>
          <div class="c2">Do not copy or distribute</div>
        </div>
      </div>
      <div class="goldrule"></div>

      <div class="body">
        <div class="sect">Section 1 &nbsp; Executive Summary</div>
        <div class="posline">
          Halloran Foods is a manufacturer of premium sauces and condiments serving grocery and foodservice customers across North America.
          <span class="mk">1</span>
        </div>
        <div class="hr"></div>

        <div class="cols">
          <!-- LEFT -->
          <div class="col">
            <div class="lbl">COMPANY OVERVIEW</div>
            <ul>
              <li>Founder owned and operated; premium, branded platform in sauces and condiments</li>
              <li>Sells into grocery retail chains and foodservice at national scale</li>
              <li>Two company owned production facilities plus contracted co packing capacity</li>
              <li>Portfolio of 140 plus SKUs across core sauce and condiment lines</li>
              <li>Serves 45 plus retail and foodservice accounts nationwide</li>
            </ul>
            <div class="lbl" style="margin-top:10px">INVESTMENT HIGHLIGHTS <span class="mk">2</span></div>
            <ul>
              <li>Premium branded platform with entrenched shelf position and pricing power</li>
              <li>National club store program annualizing into next year on already won business</li>
              <li>Committed new lines filling contracted co packing capacity</li>
              <li>Attractive and stable margin profile for the category</li>
              <li>Anchor grocery account under a multiyear contract, three years into a five year term</li>
              <li>Selective pricing upside available to a buyer as a separate lever</li>
            </ul>
            <div class="cust">Customer profile: the top account represents a meaningful share of revenue, though the relationship is long standing and under contract.</div>
          </div>

          <!-- RIGHT -->
          <div class="col">
            <div class="lbl">FINANCIAL SUMMARY</div>
            <table class="fin">
              <tr class="h"><td class="k">Metric</td><td class="v">LTM</td></tr>
              <tr><td class="k">Revenue</td><td class="v">$118.4M</td></tr>
              <tr><td class="k">Revenue growth (YoY)</td><td class="v">14%</td></tr>
              <tr><td class="k">Gross margin</td><td class="v">38.2%</td></tr>
              <tr class="sub"><td class="k">Adjusted EBITDA</td><td class="v">$19.6M</td></tr>
              <tr><td class="k">Adjusted EBITDA margin</td><td class="v">16.6%</td></tr>
            </table>

            <div class="chartwrap">
              <div class="charttitle">Revenue ($M) <span class="mk">3</span></div>
              <svg viewBox="0 0 300 62" role="img" aria-label="Revenue snapshot, actuals and upside estimate" style="display:block;width:262px;height:auto">
                <!-- gridlines -->
                <g stroke="#d8dce3" stroke-width="1">
                  <line x1="30" y1="20" x2="292" y2="20"></line>
                  <line x1="30" y1="33" x2="292" y2="33"></line>
                </g>
                <!-- axis / baseline -->
                <g stroke="#b8bfc9" stroke-width="1">
                  <line x1="30" y1="20" x2="30" y2="46"></line>
                  <line x1="30" y1="46" x2="292" y2="46"></line>
                </g>
                <!-- y tick labels -->
                <g fill="#595f6b" font-size="7" text-anchor="end" font-family="Arial,Helvetica,sans-serif">
                  <text x="26" y="22.5">160</text>
                  <text x="26" y="35.5">80</text>
                  <text x="26" y="48.5">0</text>
                </g>
                <!-- estimate note, top-right above the estimate columns -->
                <text x="292" y="11" text-anchor="end" fill="#595f6b" font-size="6.5" font-style="italic" font-family="Arial,Helvetica,sans-serif">E = estimate (lighter)</text>
                <!-- columns: FY-2A/FY-1A/LTM solid navy (actuals) -->
                <rect x="43.2"  y="31.21" width="26" height="14.79" fill="#1f2a44"></rect>
                <rect x="95.6"  y="29.1"  width="26" height="16.9"  fill="#1f2a44"></rect>
                <rect x="148"   y="26.76" width="26" height="19.24" fill="#1f2a44"></rect>
                <!-- FY+1E, FY+2E solid lighter blue (projected/estimate) -->
                <rect x="200.4" y="24.71" width="26" height="21.29" style="fill:var(--estblue)"></rect>
                <rect x="252.8" y="22.76" width="26" height="23.24" style="fill:var(--estblue)"></rect>
                <!-- value labels -->
                <g fill="#1f2a44" font-size="7.5" font-weight="700" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
                  <text x="56.2"  y="28.21">$91.0</text>
                  <text x="108.6" y="26.1">$104.0</text>
                  <text x="161"   y="23.76">$118.4</text>
                  <text x="213.4" y="21.71">$131.0</text>
                  <text x="265.8" y="19.76">$143.0</text>
                </g>
                <!-- year labels -->
                <g fill="#595f6b" font-size="7" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
                  <text x="56.2"  y="56">FY-2A</text>
                  <text x="108.6" y="56">FY-1A</text>
                  <text x="161"   y="56">LTM</text>
                  <text x="213.4" y="56">FY+1E</text>
                  <text x="265.8" y="56">FY+2E</text>
                </g>
              </svg>
            </div>

            <div class="opp">
              <div class="oh">THE OPPORTUNITY FOR A BUYER</div>
              <ul>
                <li>Strategic acquirer: fold a premium branded line into existing grocery and foodservice distribution</li>
                <li>Financial sponsor: anchor platform for a broader specialty food build up, with add on potential</li>
                <li class="ev">Transaction contemplates an enterprise value of approximately $200 million <span class="mk">4</span></li>
              </ul>
            </div>

            <div class="foot-note">Note: Financial figures are unaudited management estimates; adjusted EBITDA reflects normalization adjustments detailed in the financial section</div>
          </div>
        </div>
      </div>

      <div class="footer">
        <span>Strictly private and confidential. Prepared by Larkin Reed. Not for distribution or reproduction.</span>
        <span class="pg">1</span>
      </div>
    </div>

    <!-- ================= COMMENTS RAIL ================= -->
    <div class="rail">
      <div class="rh"><span>Comments &nbsp; Warren, MD</span><span class="n">4</span></div>

      <div class="cmt">
        <div class="av">W</div>
        <div>
          <div class="top"><span class="num">1</span><span class="who">Warren</span><span class="role">MD</span><span class="time">6:12 PM</span></div>
          <div class="txt">This is a growth-and-margin story. Say that in the first sentence. A buyer decides in the first paragraph whether to keep reading.</div>
        </div>
      </div>

      <div class="cmt">
        <div class="av">W</div>
        <div>
          <div class="top"><span class="num">2</span><span class="who">Warren</span><span class="role">MD</span><span class="time">6:13 PM</span></div>
          <div class="txt">Good. This is the part I would walk a strategic through. Make sure it survives the first buyer call without me in the room.</div>
        </div>
      </div>

      <div class="cmt">
        <div class="av">W</div>
        <div>
          <div class="top"><span class="num">3</span><span class="who">Warren</span><span class="role">MD</span><span class="time">6:15 PM</span></div>
          <div class="txt">Do not oversell year two. I would rather bring them in at a number we beat than defend one we miss. Priya, take it down if it looks rich.</div>
        </div>
      </div>

      <div class="cmt">
        <div class="av">W</div>
        <div>
          <div class="top"><span class="num">4</span><span class="who">Warren</span><span class="role">MD</span><span class="time">6:16 PM</span></div>
          <div class="txt">Right range. We anchor here verbally, we do not print a price. Keep it framed as their opportunity, not our ask.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="hint">Mock for render-fidelity review only. The red numbered markers on the slide correspond to Warren's numbered comments in the review pane. Not wired to anything.</div>
</div>
</body>
</html>
`
