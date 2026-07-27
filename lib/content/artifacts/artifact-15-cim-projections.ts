// Project Kestrel artifact 15 - CIM_Projections. Self-contained HTML,
// verbatim from content repo artifacts/artifact_15_CIM_Projections.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.

export const artifact15Html = `<!-- artifact 15, Block 13 Thursday, type powerpoint -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Halloran Foods CIM - Growth Outlook (draft)</title>
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
        <div class="callout">~22% year-2 growth on the upside case, driven by signed business annualizing</div>

        <svg class="chartsvg" viewBox="0 0 720 300" role="img" aria-label="Revenue, historicals plus upside-case projection, FY-2A to FY plus five estimate">
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
          <!-- columns: FY-2A/FY-1A/LTM actual solid navy, FY+1E onward projected hollow navy (upside) -->
          <rect x="72.25"  y="157.83" width="48" height="90.17"  fill="#1f2a44"></rect>
          <rect x="152.75" y="144.95" width="48" height="103.06" fill="#1f2a44"></rect>
          <rect x="233.25" y="130.68" width="48" height="117.32" fill="#1f2a44"></rect>
          <rect x="313.75" y="118.19" width="48" height="129.81" style="fill:var(--estblue)"></rect>
          <rect x="394.25" y="106.3" width="48" height="141.70" style="fill:var(--estblue)"></rect>
          <rect x="474.75" y="98.37" width="48" height="149.63" style="fill:var(--estblue)"></rect>
          <rect x="555.25" y="92.43" width="48" height="155.57" style="fill:var(--estblue)"></rect>
          <rect x="635.75" y="87.47" width="48" height="160.53" style="fill:var(--estblue)"></rect>
          <!-- revenue value labels -->
          <g fill="#1f2a44" font-size="11" font-weight="700" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
            <text x="96.25"  y="151.83">91.0</text>
            <text x="176.75" y="138.95">104.0</text>
            <text x="257.25" y="124.68">118.4</text>
            <text x="337.75" y="112.19">131.0</text>
            <text x="418.25" y="100.30">143.0</text>
            <text x="498.75" y="92.37">151.0</text>
            <text x="579.25" y="86.43">157.0</text>
            <text x="659.75" y="81.47">162.0</text>
          </g>
          <!-- growth % labels above projected columns -->
          <g fill="#4a7c59" font-size="9" font-weight="700" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">
            <text x="337.75" y="100.19">10.6%</text>
            <text x="418.25" y="88.30">9.2%</text>
            <text x="498.75" y="80.37">5.6%</text>
            <text x="579.25" y="74.43">4.0%</text>
            <text x="659.75" y="69.47">3.2%</text>
          </g>
          <!-- legend -->
          <rect x="62" y="38" width="212" height="32" fill="#ffffff" opacity="0.9"></rect>
          <rect x="68" y="45" width="13" height="9" fill="#1f2a44"></rect>
          <text x="86" y="53" fill="#1f2a44" font-size="9" font-family="Arial,Helvetica,sans-serif">Solid navy = actuals</text>
          <rect x="68" y="58" width="13" height="9" style="fill:var(--estblue)"></rect>
          <text x="86" y="65" fill="#1f2a44" font-size="9" font-family="Arial,Helvetica,sans-serif">Lighter blue = projected (upside case)</text>
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
          <!-- actual / estimate note -->
          <text x="700" y="290" text-anchor="end" fill="#595f6b" font-size="9" font-style="italic" font-family="Arial,Helvetica,sans-serif">FY-2A to LTM = actual. FY+1E onward = estimate (lighter blue, upside case). Green = YoY growth.</text>
        </svg>

        <div class="caption">Upside case includes selective pricing in the base. Year-2 reflects the club-store program fully annualizing plus committed co-packing lines, a one-time step, not a run rate. LTM = last twelve months.</div>
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
