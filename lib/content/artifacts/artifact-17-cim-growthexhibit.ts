// Project Kestrel artifact 17 - CIM_GrowthExhibit. Self-contained HTML,
// verbatim from content repo artifacts/artifact_17_CIM_GrowthExhibit.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.

export const artifact17Html = `<!-- artifact 17, Block 15 Thursday, type powerpoint -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Halloran Foods CIM - Growth Outlook, base vs upside (draft)</title>
<style>
  :root{
    --navy:#1f2a44; --steel:#3e506b; --ink:#20242b; --grey:#595f6b;
    --ltgrey:#e8eaee; --rule:#b88a3e; --paper:#ffffff; --bg:#e6e8ee;
    --gold:#f2c95b; --line:#cdd2db; --cream:#f4f1e8; --green:#4a7c59; --estblue:#7d9bc1;
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
  .hr{height:1px;background:var(--ltgrey);margin:6px 0 8px}
  .callout{font-family:Georgia,serif;color:var(--navy);font-weight:700;font-size:16px;margin:2px 0 2px;line-height:1.25}
  .chartsvg{display:block;width:800px;height:auto;margin:4px auto 0}
  .caption{font-size:9.5px;font-style:italic;color:var(--grey);text-align:center;margin-top:2px;line-height:1.3}

  .footer{position:absolute;left:0;bottom:0;width:100%;height:32px;background:var(--navy);
    color:#d5dae6;display:flex;align-items:center;justify-content:space-between;padding:0 22px;font-size:9px}
  .footer .pg{color:#fff;font-weight:700}
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
        <div class="sect">Growth Outlook</div>
        <div class="hr"></div>
        <div class="callout">~18% year-2 base growth on signed business; pricing shown as a separate upside case</div>

        <svg class="chartsvg" viewBox="0 0 720 300" role="img" aria-label="Revenue, historicals plus base-case columns with upside case as a dashed line">
          <!-- gridlines -->
          <g stroke="#d8dce3" stroke-width="1">
            <line x1="56" y1="49.82"  x2="700" y2="49.82"></line>
            <line x1="56" y1="99.36"  x2="700" y2="99.36"></line>
            <line x1="56" y1="148.91" x2="700" y2="148.91"></line>
            <line x1="56" y1="198.455" x2="700" y2="198.455"></line>
            <line x1="56" y1="248"    x2="700" y2="248"></line>
          </g>
          <!-- axes -->
          <g stroke="#b8bfc9" stroke-width="1">
            <line x1="56" y1="30" x2="56" y2="248"></line>
            <line x1="56" y1="248" x2="700" y2="248"></line>
          </g>
          <!-- y tick labels -->
          <g fill="#595f6b" font-size="10" text-anchor="end" font-family="Arial,Helvetica,sans-serif">
            <text x="50" y="53.3">200</text>
            <text x="50" y="102.9">150</text>
            <text x="50" y="152.4">100</text>
            <text x="50" y="202">50</text>
            <text x="50" y="251.5">0</text>
          </g>
          <!-- y-axis units label -->
          <text x="22" y="139" text-anchor="middle" transform="rotate(-90 22 139)" fill="#595f6b" font-size="10" font-family="Arial,Helvetica,sans-serif">$ in millions</text>

          <!-- FY-2A/FY-1A/LTM solid navy (actuals) -->
          <rect x="72.25"  y="157.83" width="48" height="90.17"  fill="#1f2a44"></rect>
          <rect x="152.75" y="144.95" width="48" height="103.06" fill="#1f2a44"></rect>
          <rect x="233.25" y="130.68" width="48" height="117.32" fill="#1f2a44"></rect>
          <!-- FY+1E..FY+5E solid lighter blue (projected base case); in-bar value labels white -->
          <rect x="313.75" y="120.17" width="48" height="127.83" style="fill:var(--estblue)"></rect>
          <rect x="394.25" y="111.26" width="48" height="136.74" style="fill:var(--estblue)"></rect>
          <rect x="474.75" y="105.31" width="48" height="142.69" style="fill:var(--estblue)"></rect>
          <rect x="555.25" y="100.36" width="48" height="147.64" style="fill:var(--estblue)"></rect>
          <rect x="635.75" y="96.39" width="48" height="151.61" style="fill:var(--estblue)"></rect>
          <g fill="#ffffff" font-size="9.5" font-weight="700" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
            <text x="337.75" y="133.17">129.0</text>
            <text x="418.25" y="124.26">138.0</text>
            <text x="498.75" y="118.31">144.0</text>
            <text x="579.25" y="113.36">149.0</text>
            <text x="659.75" y="109.39">153.0</text>
          </g>
          <!-- actual value labels, white inside the solid columns -->
          <g fill="#ffffff" font-size="9.5" font-weight="700" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
            <text x="96.25"  y="170.83">91.0</text>
            <text x="176.75" y="157.95">104.0</text>
            <text x="257.25" y="143.68">118.4</text>
          </g>

          <!-- upside case: dashed navy line (starts at FY+1E) with open markers -->
          <polyline points="337.75,118.19 418.25,106.30 498.75,98.37 579.25,92.43 659.75,87.47"
            fill="none" stroke="#1f2a44" stroke-width="2" stroke-dasharray="6,4"></polyline>
          <g fill="#ffffff" stroke="#1f2a44" stroke-width="1.8">
            <circle cx="337.75" cy="118.19" r="4"></circle>
            <circle cx="418.25" cy="106.30" r="4"></circle>
            <circle cx="498.75" cy="98.37"  r="4"></circle>
            <circle cx="579.25" cy="92.43"  r="4"></circle>
            <circle cx="659.75" cy="87.47"  r="4"></circle>
          </g>
          <!-- upside value labels above the markers -->
          <g fill="#1f2a44" font-size="8.5" font-weight="700" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
            <text x="337.75" y="111.19">131.0</text>
            <text x="418.25" y="99.30">143.0</text>
            <text x="498.75" y="91.37">151.0</text>
            <text x="579.25" y="85.43">157.0</text>
            <text x="659.75" y="80.47">162.0</text>
          </g>

          <!-- legend -->
          <rect x="62" y="36" width="232" height="46" fill="#ffffff" opacity="0.92"></rect>
          <rect x="68" y="43" width="14" height="9" fill="#1f2a44"></rect>
          <text x="87" y="51" fill="#1f2a44" font-size="9" font-family="Arial,Helvetica,sans-serif">Solid navy = actuals</text>
          <rect x="68" y="57" width="14" height="9" style="fill:var(--estblue)"></rect>
          <text x="87" y="65" fill="#1f2a44" font-size="9" font-family="Arial,Helvetica,sans-serif">Lighter blue = projected base case</text>
          <line x1="68" y1="76" x2="82" y2="76" stroke="#1f2a44" stroke-width="2" stroke-dasharray="4,3"></line>
          <circle cx="75" cy="76" r="3" fill="#ffffff" stroke="#1f2a44" stroke-width="1.5"></circle>
          <text x="87" y="79" fill="#1f2a44" font-size="9" font-family="Arial,Helvetica,sans-serif">Dashed line = upside case (with pricing)</text>

          <!-- x-axis year labels -->
          <g fill="#595f6b" font-size="10" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
            <text x="96.25"  y="262">FY-2A</text>
            <text x="176.75" y="262">FY-1A</text>
            <text x="257.25" y="262">LTM</text>
            <text x="337.75" y="262">FY+1E</text>
            <text x="418.25" y="262">FY+2E</text>
            <text x="498.75" y="262">FY+3E</text>
            <text x="579.25" y="262">FY+4E</text>
            <text x="659.75" y="262">FY+5E</text>
          </g>
          <!-- base-case growth % labels under the year labels -->
          <g fill="#595f6b" font-size="8.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
            <text x="257.25" y="274">14.3%</text>
            <text x="337.75" y="274">8.9%</text>
            <text x="418.25" y="274">7.0%</text>
            <text x="498.75" y="274">4.3%</text>
            <text x="579.25" y="274">3.5%</text>
            <text x="659.75" y="274">2.7%</text>
          </g>
          <text x="700" y="292" text-anchor="end" fill="#595f6b" font-size="8.5" font-style="italic" font-family="Arial,Helvetica,sans-serif">Growth % shown is base case. The gap between the columns and the dashed line is the pricing lever.</text>
        </svg>

        <div class="caption">Base case rests on signed business. The dashed upside case adds selective pricing a buyer can underwrite. Year-2 is a one-time step from the club-store annualization, not a run rate. LTM = last twelve months.</div>
      </div>

      <div class="footer">
        <span>Strictly private and confidential. Prepared by Larkin Reed. Not for distribution or reproduction.</span>
        <span class="pg">3</span>
      </div>
    </div>
  </div>

  <div class="hint">Mock for render-fidelity review only. Not wired to anything.</div>
</div>
</body>
</html>
`
