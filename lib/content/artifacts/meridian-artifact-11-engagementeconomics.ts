// Meridian Park artifact 11 - EngagementEconomics. Self-contained HTML,
// verbatim from content repo artifacts/artifact_11_EngagementEconomics.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.
// Manifest type excel, which the app renders at excel width. Placement: Block 18, Engagement economics, Friday.

export const meridianArtifact11Html = `<!-- artifact 11, Block 18 Friday, type excel -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Meridian Park Investor Platform Assessment - Engagement budget and margin tracker</title>
<style>
  :root{
    --ink:#20242b; --line:#d4d6da; --gutter:#eceef0; --gutterln:#c9cbcf;
    --paper:#ffffff; --bg:#cfd2d7; --navy:#26405e; --navydk:#1b2f47; --navylt:#e7edf3;
    --teal:#2d6a63; --amber:#a9701c; --amberbg:#f6efe2; --zebra:#f7f8f9; --mute:#8b9098;
    --inp:#f4f7fa; --inpbd:#c3d2df;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:var(--bg);font-family:'Segoe UI',Arial,Helvetica,sans-serif;
    color:var(--ink);-webkit-font-smoothing:antialiased}
  .page{width:1320px;margin:0 auto;padding:24px 20px 40px}

  .ctx{margin-bottom:12px}
  .ctx .eng{font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:#4a5560;font-weight:600}
  .ctx .doc{font-size:16px;color:#1f2d46;font-weight:600;margin-top:4px}
  .ctx .meta{font-size:12px;color:#5b6470;margin-top:5px;display:flex;gap:20px;flex-wrap:wrap}
  .ctx .meta .k{color:var(--mute)}

  .xl{width:1280px;background:var(--paper);border:1px solid #b7bac0;
    box-shadow:0 8px 26px rgba(30,40,55,.20);overflow:hidden}

  .titlebar{height:30px;background:#f3f4f5;border-bottom:1px solid #dfe1e4;
    display:flex;align-items:center;padding:0 12px;gap:9px}
  .titlebar .dots{display:flex;gap:6px}
  .titlebar .dots i{width:10px;height:10px;border-radius:50%;display:inline-block}
  .titlebar .dots .r{background:#e2685c}
  .titlebar .dots .y{background:#e6b64c}
  .titlebar .dots .g{background:#5fb466}
  .titlebar .fname{font-size:12.5px;color:#3a3f47;font-weight:600}
  .titlebar .fname .x{color:var(--navy)}
  .titlebar .mark{margin-left:auto;font-size:10px;letter-spacing:.06em;color:#9aa0a8;font-weight:600}

  .menubar{height:26px;background:#fafbfb;border-bottom:1px solid #e4e6e9;
    display:flex;align-items:center;padding:0 12px;gap:18px;font-size:11.5px;color:#7c818a}
  .menubar .m.on{color:var(--navy);font-weight:600;border-bottom:2px solid var(--navy);
    height:26px;display:flex;align-items:center}

  .fbar{height:24px;background:#ffffff;border-bottom:1px solid #dfe1e4;
    display:flex;align-items:stretch;font-size:11.5px}
  .fbar .namebox{width:66px;border-right:1px solid #dfe1e4;display:flex;align-items:center;
    justify-content:center;color:#3a3f47;font-weight:600;background:#f7f8f9}
  .fbar .fx{width:34px;border-right:1px solid #dfe1e4;display:flex;align-items:center;
    justify-content:center;color:#9aa0a8;font-style:italic}
  .fbar .fc{display:flex;align-items:center;padding:0 10px;color:#3a3f47;font-family:Consolas,monospace}

  table.grid{width:1280px;border-collapse:collapse;table-layout:fixed}
  table.grid td,table.grid th{border:1px solid var(--line);vertical-align:middle;
    padding:4px 8px;font-size:11px;line-height:1.35;overflow:hidden}
  tr.collet th{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    font-weight:600;text-align:center;height:18px;font-size:10.5px;padding:0}
  th.corner{background:#e2e4e7;width:30px}
  td.rn{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    text-align:center;font-size:10px;font-weight:600;padding:4px 0;width:30px}

  td.sec{background:var(--navy);color:#ffffff;font-weight:600;font-size:11px;
    letter-spacing:.04em;border-color:var(--navydk)}
  tr.head td{background:var(--navylt);color:var(--navydk);font-weight:600;font-size:10.5px;
    border-color:#c3d2df}
  tr.head td.c{text-align:center}
  tr.head td.r{text-align:right}

  td.lbl{color:#2b3038;font-weight:600}
  td.sub{color:#5b6470;padding-left:18px;font-weight:400}
  td.n{text-align:right;font-variant-numeric:tabular-nums}
  td.inp{background:var(--inp);border-color:var(--inpbd);color:#1f4468;font-weight:600;text-align:right}
  td.calc{background:#ffffff;color:#2b3038;text-align:right;font-weight:600}
  td.note{color:#6b7078;font-size:10.5px}
  td.fx{color:#7a8592;font-family:Consolas,monospace;font-size:10px}

  tr.tot td{background:#e7edf3;font-weight:700;color:var(--navydk);border-color:#bccbd9}
  tr.tot td.rn{background:var(--gutter);color:#8b9098;font-weight:600}
  tr.grand td{background:#d9e4ee;font-weight:700;color:var(--navydk);border-color:#a9bdd0;
    border-top:2px solid var(--navy)}
  tr.grand td.rn{background:var(--gutter);color:#8b9098}

  .over{color:#a9701c;font-weight:700}
  .under{color:#2d6a63;font-weight:700}
  .flat{color:#5b6470}

  tr.spacer td{height:8px;background:#ffffff;border-left-color:var(--line);
    border-right-color:var(--line);border-top:none;border-bottom:none}
  tr.spacer td.rn{background:var(--gutter)}

  .tabs{height:26px;background:#eef0f1;border-top:1px solid #d9dbdf;
    display:flex;align-items:flex-end;padding:0 8px;gap:2px}
  .tab{font-size:11px;padding:4px 14px;color:#7c818a;border:1px solid transparent;border-bottom:none}
  .tab.on{background:#ffffff;color:var(--navy);font-weight:600;
    border-color:#d9dbdf;border-top:2px solid var(--navy);border-radius:2px 2px 0 0}
  .status{height:22px;background:#f5f6f7;border-top:1px solid #e2e4e7;
    display:flex;align-items:center;justify-content:space-between;padding:0 12px;
    font-size:10px;color:#9aa0a8}
  .status .conf{letter-spacing:.06em;font-weight:600;color:#6b7078}

  .below{display:flex;gap:16px;margin-top:14px;width:1280px;align-items:flex-start}
  .panel{background:var(--paper);border:1px solid #c8cbd1;padding:14px 17px}
  .panel h4{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--navy);
    margin-bottom:9px}
  .chartp{flex:0 0 726px}
  .sowhat{flex:1 1 auto}
  .sowhat p{font-size:11.5px;color:#3a3f47;line-height:1.62;margin-bottom:9px}
  .sowhat p b{color:#1f2d46}
  .lev{font-size:11px;color:#4a4f57;line-height:1.55;padding:5px 0 5px 11px;
    border-left:2px solid #c8d3dd;margin-bottom:5px}
  .lev b{color:var(--navy)}
  .cap{font-size:10.5px;color:var(--mute);margin-bottom:9px}
  .key{display:flex;gap:16px;font-size:10.5px;color:#4a4f57;margin-top:5px}
  .key i{display:inline-block;width:11px;height:11px;margin-right:5px;vertical-align:-1px}
</style>
</head>
<body>
<div class="page">

  <div class="ctx">
    <div class="eng">Meridian Park Investor Platform Assessment</div>
    <div class="doc">Engagement budget and margin tracker</div>
    <div class="meta">
      <span><span class="k">As of</span> end of week 3 of 6</span>
      <span><span class="k">Basis</span> fixed-fee engagement</span>
      <span><span class="k">Export</span> internal financials system</span>
    </div>
  </div>

  <div class="xl">

    <div class="titlebar">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="fname">Meridian_engagement_economics<span class="x">.xlsx</span></span>
      <span class="mark">INTERNAL FINANCIALS EXPORT</span>
    </div>

    <div class="menubar">
      <span class="m">File</span><span class="m on">Home</span><span class="m">Insert</span>
      <span class="m">Formulas</span><span class="m">Data</span><span class="m">View</span>
    </div>

    <div class="fbar">
      <span class="namebox">E11</span>
      <span class="fx">fx</span>
      <span class="fc">=SUM(E8:E10)</span>
    </div>

    <table class="grid">
      <colgroup>
        <col style="width:30px"><col style="width:236px"><col style="width:118px"><col style="width:104px">
        <col style="width:128px"><col style="width:118px"><col style="width:110px"><col style="width:436px">
      </colgroup>

      <tr class="collet">
        <th class="corner"></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th>
      </tr>

      <!-- inputs -->
      <tr><td class="rn">1</td><td class="sec" colspan="7">INPUTS &#183; rate card, planned hours</td></tr>
      <tr class="head">
        <td class="rn">2</td><td>Level</td><td class="c">Staff</td><td class="r">Bill rate</td>
        <td class="r">Planned hours</td><td class="r">Extended</td><td class="r"></td><td>Basis</td>
      </tr>
      <tr><td class="rn">3</td><td class="lbl">Senior Manager</td><td class="note">David</td>
        <td class="inp">$550</td><td class="inp">90</td><td class="calc">$49,500</td><td></td>
        <td class="fx">=C3*D3</td></tr>
      <tr><td class="rn">4</td><td class="lbl">Manager</td><td class="note">Marcus</td>
        <td class="inp">$350</td><td class="inp">300</td><td class="calc">$105,000</td><td></td>
        <td class="fx">=C4*D4</td></tr>
      <tr><td class="rn">5</td><td class="lbl">Consultant</td><td class="note">Carly</td>
        <td class="inp">$250</td><td class="inp">480</td><td class="calc">$120,000</td><td></td>
        <td class="fx">=C5*D5</td></tr>
      <tr class="grand"><td class="rn">6</td><td>Fixed fee, priced</td><td></td><td class="n"></td>
        <td class="n">870</td><td class="n">$274,500</td><td></td>
        <td class="fx">=SUM(E3:E5) &#183; ties to the contracted fee</td></tr>
      <tr><td class="rn">7</td><td class="lbl">Blended bill rate</td><td></td><td class="n"></td>
        <td class="n"></td><td class="calc">$316</td><td></td>
        <td class="fx">=E6/D6 &#8594; 315.52, shown to the dollar</td></tr>

      <tr class="spacer"><td class="rn">8</td><td colspan="7"></td></tr>

      <!-- table 1 -->
      <tr><td class="rn">9</td><td class="sec" colspan="7">TABLE 1 &#183; hours by staff level, plan against actual</td></tr>
      <tr class="head">
        <td class="rn">10</td><td>Level</td><td class="r">Planned, 6 weeks</td><td class="r">Plan to date</td>
        <td class="r">Actual to date</td><td class="r">Variance</td><td class="r">Variance %</td><td>Read</td>
      </tr>
      <tr><td class="rn">11</td><td class="lbl">Senior Manager</td><td class="n">90</td><td class="n">45</td>
        <td class="n">44</td><td class="n"><span class="under">1 under</span></td>
        <td class="n"><span class="under">2.2%</span></td>
        <td class="note">On plan. Dips in for the reviews and the checkpoint only.</td></tr>
      <tr><td class="rn">12</td><td class="lbl">Manager</td><td class="n">300</td><td class="n">150</td>
        <td class="n">158</td><td class="n"><span class="over">8 over</span></td>
        <td class="n"><span class="over">5.3%</span></td>
        <td class="note">A touch over.</td></tr>
      <tr><td class="rn">13</td><td class="lbl">Consultant</td><td class="n">480</td><td class="n">240</td>
        <td class="n">250</td><td class="n"><span class="over">10 over</span></td>
        <td class="n"><span class="over">4.2%</span></td>
        <td class="note">The most over of the three. The restructured deck section sits here.</td></tr>
      <tr class="tot"><td class="rn">14</td><td>Total</td><td class="n">870</td><td class="n">435</td>
        <td class="n">452</td><td class="n"><span class="over">17 over</span></td>
        <td class="n"><span class="over">3.9%</span></td>
        <td class="fx">=SUM(C11:C13), =SUM(D11:D13), =SUM(E11:E13)</td></tr>

      <tr class="spacer"><td class="rn">15</td><td colspan="7"></td></tr>

      <!-- table 2 -->
      <tr><td class="rn">16</td><td class="sec" colspan="7">TABLE 2 &#183; margin read</td></tr>
      <tr class="head">
        <td class="rn">17</td><td>Line</td><td class="r">Value</td><td class="r"></td>
        <td class="r"></td><td class="r"></td><td class="r"></td><td>Calculation and note</td></tr>
      <tr><td class="rn">18</td><td class="lbl">Fixed fee</td><td class="n">$274,500</td>
        <td colspan="4"></td><td class="fx">=SUM(E3:E5), the priced hours at the rates above</td></tr>
      <tr><td class="rn">19</td><td class="lbl">Blended bill rate</td><td class="n">$316</td>
        <td colspan="4"></td><td class="fx">=274,500/870. Leverage across levels is what makes it work</td></tr>
      <tr><td class="rn">20</td><td class="lbl">Hours used to date</td><td class="n">452 of 870</td>
        <td colspan="4"></td><td class="fx">=452/870 &#8594; 52%, against 50% of the timeline elapsed</td></tr>
      <tr><td class="rn">21</td><td class="lbl">Projected hours at close</td><td class="n">885</td>
        <td colspan="4"></td><td class="fx">Overage front-loaded in the rebuilt section; weeks 4 to 6 held to plan</td></tr>
      <tr><td class="rn">22</td><td class="lbl">Projected variance</td><td class="n"><span class="over">15 over</span></td>
        <td colspan="4"></td><td class="fx">=885-870 &#8594; 15 hours, =15/870 &#8594; roughly 2%</td></tr>
      <tr class="tot"><td class="rn">23</td><td>Effect on margin</td><td class="n">$4,700</td>
        <td colspan="4"></td><td class="fx">=15*316 &#8594; 4,740, effort beyond the fee. A little under 2%</td></tr>
    </table>

    <div class="tabs">
      <span class="tab on">Engagement economics</span>
      <span class="tab">Time detail</span>
      <span class="tab">Rate card</span>
      <span class="tab">Invoicing</span>
    </div>

    <div class="status">
      <span>Week 3 of 6 &#183; fixed fee &#183; projection held to plan for weeks 4 to 6</span>
      <span class="conf">INTERNAL WORKING DOCUMENT, NOT FOR DISTRIBUTION</span>
    </div>
  </div>

  <div class="below">
    <div class="panel chartp">
      <h4>Exhibit E4 &nbsp;Plan against actual, hours to date by level</h4>
      <div class="cap">Hours logged in weeks 1 to 3 against the plan pro-rated to the same point.</div>
      <svg width="690" height="292" viewBox="0 0 690 292" role="img"
           aria-label="Plan against actual hours to date by staff level">
        <g stroke="#e4e7ea" stroke-width="1">
          <line x1="100" y1="220" x2="640" y2="220"/>
          <line x1="100" y1="186.7" x2="640" y2="186.7"/>
          <line x1="100" y1="153.3" x2="640" y2="153.3"/>
          <line x1="100" y1="120" x2="640" y2="120"/>
          <line x1="100" y1="86.7" x2="640" y2="86.7"/>
          <line x1="100" y1="53.3" x2="640" y2="53.3"/>
          <line x1="100" y1="20" x2="640" y2="20"/>
        </g>
        <line x1="100" y1="220" x2="640" y2="220" stroke="#a9b2c0" stroke-width="1"/>
        <line x1="100" y1="20"  x2="100" y2="220" stroke="#a9b2c0" stroke-width="1"/>
        <g font-family="'Segoe UI',Arial,Helvetica,sans-serif" font-size="10" fill="#8b9098" text-anchor="end">
          <text x="92" y="224">0</text><text x="92" y="190.7">50</text><text x="92" y="157.3">100</text>
          <text x="92" y="124">150</text><text x="92" y="90.7">200</text><text x="92" y="57.3">250</text>
          <text x="92" y="24">300</text>
        </g>
        <text x="34" y="126" font-family="'Segoe UI',Arial,Helvetica,sans-serif" font-size="10.5"
              fill="#8b9098" transform="rotate(-90 34 126)" text-anchor="middle">hours to date</text>

        <!-- Senior Manager: plan 45, actual 44 -->
        <rect x="125" y="190"   width="56" height="30"   fill="#9db3c9"/>
        <rect x="187" y="190.7" width="56" height="29.3" fill="#26405e"/>
        <!-- Manager: plan 150, actual 158 -->
        <rect x="295" y="120"   width="56" height="100"   fill="#9db3c9"/>
        <rect x="357" y="114.7" width="56" height="105.3" fill="#26405e"/>
        <!-- Consultant: plan 240, actual 250 -->
        <rect x="465" y="60"   width="56" height="160"   fill="#9db3c9"/>
        <rect x="527" y="53.3" width="56" height="166.7" fill="#26405e"/>

        <g font-family="'Segoe UI',Arial,Helvetica,sans-serif" font-size="10.5" fill="#3a3f47" text-anchor="middle">
          <text x="153" y="185">45</text><text x="215" y="186">44</text>
          <text x="323" y="115">150</text><text x="385" y="110">158</text>
          <text x="493" y="55">240</text><text x="555" y="48">250</text>
        </g>
        <g font-family="'Segoe UI',Arial,Helvetica,sans-serif" font-size="10.5" fill="#4a4f57" text-anchor="middle">
          <text x="184" y="238">Senior Manager</text>
          <text x="354" y="238">Manager</text>
          <text x="524" y="238">Consultant</text>
        </g>
        <g font-family="'Segoe UI',Arial,Helvetica,sans-serif" font-size="10" text-anchor="middle">
          <text x="184" y="253" fill="#2d6a63">1 under</text>
          <text x="354" y="253" fill="#a9701c">8 over</text>
          <text x="524" y="253" fill="#a9701c">10 over</text>
        </g>
        <g font-family="'Segoe UI',Arial,Helvetica,sans-serif" font-size="10.5" fill="#4a4f57">
          <rect x="238" y="272" width="11" height="11" fill="#9db3c9"/>
          <text x="255" y="282">Plan to date</text>
          <rect x="348" y="272" width="11" height="11" fill="#26405e"/>
          <text x="365" y="282">Actual to date</text>
        </g>
      </svg>
    </div>

    <div class="panel sowhat">
      <h4>So what, the read</h4>
      <p>The engagement is marginally over plan, about <b>2 percent</b>, driven by the consultant and
         manager lines. Most of that overage is the deck section that got restructured.
         <b>Normal, and recoverable.</b></p>
      <p>Across all three levels we have used a little over half our hours against exactly half the
         timeline, so we are marginally ahead of our burn. The projection lands a hair over the planned
         hours at close.</p>
      <div class="lev"><b>Leverage.</b> Keep the right junior-to-senior mix, and do not pull David in
        for work Marcus can do, because his hours are the most expensive.</div>
      <div class="lev"><b>Utilization.</b> Keep billable hours productive.</div>
      <div class="lev"><b>Realization.</b> Deliver inside the priced hours, and do not let the scope
        creep.</div>
    </div>
  </div>

</div>
</body>
</html>
`
