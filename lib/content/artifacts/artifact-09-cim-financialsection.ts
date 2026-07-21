// Project Kestrel artifact 09 - CIM_FinancialSection. Self-contained HTML,
// verbatim from content repo artifacts/artifact_09_CIM_FinancialSection.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.

export const artifact09Html = `<!-- artifact 9, Block 8 Tuesday, type powerpoint -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Halloran Foods CIM - Financial Overview (draft)</title>
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
  .hr{height:1px;background:var(--ltgrey);margin:6px 0 10px}
  .cols{display:flex;gap:22px}
  .col{flex:1 1 0;min-width:0}
  .lbl{color:var(--navy);font-weight:700;font-size:10.5px;letter-spacing:.6px;margin:2px 0 5px}
  .anote{font-size:8.6px;font-style:italic;color:var(--grey);margin-bottom:4px}

  /* multi-column financial table */
  table.finx{width:100%;border-collapse:collapse}
  table.finx td,table.finx th{border:1px solid var(--line);padding:2px 3px;font-size:7.6px}
  table.finx thead th{background:var(--navy);color:#fff;font-weight:700;font-size:7.4px;text-align:right}
  table.finx thead th.k{text-align:left}
  table.finx td.k{text-align:left;color:var(--ink)}
  table.finx td.n{text-align:right;color:var(--navy);font-weight:600;font-variant-numeric:tabular-nums}
  table.finx tbody tr:nth-child(even) td{background:var(--ltgrey)}
  table.finx tr.sub td{background:#dfe3ea;font-weight:700}
  table.finx tr.pct td{color:#3a3f47;font-style:italic}
  table.finx tr.pct td.k{font-style:normal;color:var(--ink)}

  .charttitle{font-size:9px;font-weight:700;color:var(--navy);margin:0 0 3px}
  .chartsvg{display:block;width:350px;height:auto}

  .footer{position:absolute;left:0;bottom:0;width:100%;height:32px;background:var(--navy);
    color:#d5dae6;display:flex;align-items:center;justify-content:space-between;padding:0 22px;font-size:9px}
  .footer .pg{color:#fff;font-weight:700}
  .foot-note{font-size:8.2px;font-style:italic;color:var(--grey);line-height:1.3;margin-top:34px}
  .foot-note2{font-size:8.2px;font-style:italic;color:var(--grey);line-height:1.3;margin-top:6px}
  .hint{margin-top:14px;color:#8a90a0;font-size:11px;max-width:960px}
</style>
</head>
<body>
<div class="app">
  <div class="toolbar"><span class="dot"></span>
    <b>Halloran_Foods_CIM.pptx</b> &nbsp; Draft
  </div>

  <div class="stage">
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
        <div class="sect">Section 4 &nbsp; Financial Overview</div>
        <div class="hr"></div>

        <div class="cols">
          <!-- LEFT: financial summary table -->
          <div class="col">
            <div class="lbl">FINANCIAL SUMMARY</div>
            <div class="anote">A = actual, E = estimate</div>
            <table class="finx">
              <thead>
                <tr><th class="k">($M)</th><th>FY-2A</th><th>FY-1A</th><th>LTM A</th><th>FY+1E</th><th>FY+2E</th><th>FY+3E</th><th>FY+4E</th><th>FY+5E</th></tr>
              </thead>
              <tbody>
                <tr><td class="k">Revenue</td><td class="n">91.0</td><td class="n">104.0</td><td class="n">118.4</td><td class="n">129.0</td><td class="n">138.0</td><td class="n">144.0</td><td class="n">149.0</td><td class="n">153.0</td></tr>
                <tr class="pct"><td class="k">Growth %</td><td class="n"></td><td class="n">14.3%</td><td class="n">13.8%</td><td class="n">8.9%</td><td class="n">7.0%</td><td class="n">4.3%</td><td class="n">3.5%</td><td class="n">2.7%</td></tr>
                <tr><td class="k">Gross profit</td><td class="n">34.8</td><td class="n">39.0</td><td class="n">45.2</td><td class="n">49.7</td><td class="n">53.1</td><td class="n">55.4</td><td class="n">57.4</td><td class="n">58.9</td></tr>
                <tr class="pct"><td class="k">Gross margin %</td><td class="n">38.2%</td><td class="n">37.5%</td><td class="n">38.2%</td><td class="n">38.5%</td><td class="n">38.5%</td><td class="n">38.5%</td><td class="n">38.5%</td><td class="n">38.5%</td></tr>
                <tr class="sub"><td class="k">Adjusted EBITDA</td><td class="n">14.0</td><td class="n">17.0</td><td class="n">19.6</td><td class="n">21.0</td><td class="n">23.0</td><td class="n">24.5</td><td class="n">25.7</td><td class="n">26.7</td></tr>
                <tr class="pct"><td class="k">Adj. EBITDA margin %</td><td class="n">15.4%</td><td class="n">16.3%</td><td class="n">16.6%</td><td class="n">16.3%</td><td class="n">16.7%</td><td class="n">17.0%</td><td class="n">17.2%</td><td class="n">17.5%</td></tr>
              </tbody>
            </table>
            <div class="foot-note">Figures are unaudited management estimates. Projections (FY+1E to FY+5E) are base case. Adjusted EBITDA reflects normalization adjustments detailed in the add-back schedule.</div>
          </div>

          <!-- RIGHT: SVG revenue line chart + SVG EBITDA waterfall -->
          <div class="col">
            <div class="charttitle">Revenue ($M)</div>
            <svg class="chartsvg" viewBox="0 0 460 200" role="img" aria-label="Revenue column chart, actuals and base-case projection">
              <!-- gridlines -->
              <g stroke="#d8dce3" stroke-width="1">
                <line x1="46" y1="33.27"  x2="448" y2="33.27"></line>
                <line x1="46" y1="66.45"  x2="448" y2="66.45"></line>
                <line x1="46" y1="99.64"  x2="448" y2="99.64"></line>
                <line x1="46" y1="132.82" x2="448" y2="132.82"></line>
                <line x1="46" y1="166"    x2="448" y2="166"></line>
              </g>
              <!-- axes -->
              <g stroke="#b8bfc9" stroke-width="1">
                <line x1="46" y1="20" x2="46" y2="166"></line>
                <line x1="46" y1="166" x2="448" y2="166"></line>
              </g>
              <!-- y tick labels -->
              <g fill="#595f6b" font-size="9" text-anchor="end" font-family="Arial,Helvetica,sans-serif">
                <text x="40" y="36.3">200</text>
                <text x="40" y="69.5">150</text>
                <text x="40" y="102.6">100</text>
                <text x="40" y="135.8">50</text>
                <text x="40" y="169">0</text>
              </g>
              <!-- y-axis units label -->
              <text x="14" y="93" text-anchor="middle" transform="rotate(-90 14 93)" fill="#595f6b" font-size="9.5" font-family="Arial,Helvetica,sans-serif">$ in millions</text>
              <!-- columns: actuals solid navy, projected (FY+1E onward) hollow navy outline -->
              <rect x="55.125"  y="105.61" width="32" height="60.39"  fill="#1f2a44"></rect>
              <rect x="105.375" y="96.98"  width="32" height="69.02"  fill="#1f2a44"></rect>
              <rect x="155.625" y="87.43"  width="32" height="78.57"  fill="#1f2a44"></rect>
              <rect x="205.875" y="80.39"  width="32" height="85.61"  style="fill:var(--estblue)"></rect>
              <rect x="256.125" y="74.42"  width="32" height="91.58"  style="fill:var(--estblue)"></rect>
              <rect x="306.375" y="70.44"  width="32" height="95.56"  style="fill:var(--estblue)"></rect>
              <rect x="356.625" y="67.12"  width="32" height="98.88"  style="fill:var(--estblue)"></rect>
              <rect x="406.875" y="64.46"  width="32" height="101.54" style="fill:var(--estblue)"></rect>
              <!-- data labels -->
              <g fill="#1f2a44" font-size="9" font-weight="700" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
                <text x="71.125"  y="101.6">91.0</text>
                <text x="121.375" y="92.98">104.0</text>
                <text x="171.625" y="83.43">118.4</text>
                <text x="221.875" y="76.39">129.0</text>
                <text x="272.125" y="70.42">138.0</text>
                <text x="322.375" y="66.44">144.0</text>
                <text x="372.625" y="63.12">149.0</text>
                <text x="422.875" y="60.46">153.0</text>
              </g>
              <!-- x-axis year labels -->
              <g fill="#595f6b" font-size="8.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
                <text x="71.125"  y="180">FY-2A</text>
                <text x="121.375" y="180">FY-1A</text>
                <text x="171.625" y="180">LTM A</text>
                <text x="221.875" y="180">FY+1E</text>
                <text x="272.125" y="180">FY+2E</text>
                <text x="322.375" y="180">FY+3E</text>
                <text x="372.625" y="180">FY+4E</text>
                <text x="422.875" y="180">FY+5E</text>
              </g>
              <!-- actual / estimate note -->
              <text x="448" y="196" text-anchor="end" fill="#595f6b" font-size="8" font-style="italic" font-family="Arial,Helvetica,sans-serif">A = actual, E = estimate (lighter blue, base case)</text>
            </svg>

            <div class="charttitle" style="margin-top:12px">Adjusted EBITDA bridge, LTM ($M)</div>
            <svg class="chartsvg" viewBox="0 0 440 210" role="img" aria-label="Adjusted EBITDA bridge waterfall">
              <!-- gridlines -->
              <g stroke="#d8dce3" stroke-width="1">
                <line x1="44" y1="18"  x2="428" y2="18"></line>
                <line x1="44" y1="55"  x2="428" y2="55"></line>
                <line x1="44" y1="92"  x2="428" y2="92"></line>
                <line x1="44" y1="129" x2="428" y2="129"></line>
                <line x1="44" y1="166" x2="428" y2="166"></line>
              </g>
              <!-- axes -->
              <g stroke="#b8bfc9" stroke-width="1">
                <line x1="44" y1="18" x2="44" y2="166"></line>
                <line x1="44" y1="166" x2="428" y2="166"></line>
              </g>
              <!-- y tick labels -->
              <g fill="#595f6b" font-size="10" text-anchor="end" font-family="Arial,Helvetica,sans-serif">
                <text x="38" y="21">24</text>
                <text x="38" y="58">18</text>
                <text x="38" y="95">12</text>
                <text x="38" y="132">6</text>
                <text x="38" y="169">0</text>
              </g>
              <!-- connectors (behind bars is fine; drawn light dashed) -->
              <g stroke="#b8bfc9" stroke-width="1" stroke-dasharray="4,3">
                <line x1="104.4" y1="64.87" x2="137.2" y2="64.87"></line>
                <line x1="181.2" y1="55"    x2="214"   y2="55"></line>
                <line x1="258"   y1="48.83" x2="290.8" y2="48.83"></line>
                <line x1="334.8" y1="45.13" x2="367.6" y2="45.13"></line>
              </g>
              <!-- bars -->
              <rect x="60.4"  y="64.87" width="44" height="101.13" fill="#1f2a44"></rect>
              <rect x="137.2" y="55"    width="44" height="9.87"   fill="#4a7c59"></rect>
              <rect x="214"   y="48.83" width="44" height="6.17"   fill="#4a7c59"></rect>
              <rect x="290.8" y="45.13" width="44" height="3.7"    fill="#4a7c59"></rect>
              <rect x="367.6" y="45.13" width="44" height="120.87" fill="#1f2a44"></rect>
              <!-- value labels -->
              <g font-size="11" font-weight="700" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
                <text x="82.4"  y="59.87" fill="#1f2a44">16.4</text>
                <text x="159.2" y="50"    fill="#4a7c59">+1.6</text>
                <text x="236"   y="43.83" fill="#4a7c59">+1.0</text>
                <text x="312.8" y="40.13" fill="#4a7c59">+0.6</text>
                <text x="389.6" y="40.13" fill="#1f2a44">19.6</text>
              </g>
              <!-- x-axis category labels (two lines) -->
              <g fill="#595f6b" font-size="9.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
                <text x="82.4"  y="178">Reported<tspan x="82.4"  y="188">EBITDA</tspan></text>
                <text x="159.2" y="178">Owner<tspan x="159.2" y="188">comp</tspan></text>
                <text x="236"   y="178">ERP<tspan x="236"   y="188">one-time</tspan></text>
                <text x="312.8" y="178">Legal<tspan x="312.8" y="188">settle.</tspan></text>
                <text x="389.6" y="178">Adjusted<tspan x="389.6" y="188">EBITDA</tspan></text>
              </g>
            </svg>

            <div class="foot-note2">Figures are unaudited management estimates. Add-backs detailed in the add-back schedule.</div>
          </div>
        </div>
      </div>

      <div class="footer">
        <span>Strictly private and confidential. Prepared by Larkin Reed. Not for distribution or reproduction.</span>
        <span class="pg">24</span>
      </div>
    </div>
  </div>

  <div class="hint">Mock for render-fidelity review only. Not wired to anything.</div>
</div>
</body>
</html>
`
