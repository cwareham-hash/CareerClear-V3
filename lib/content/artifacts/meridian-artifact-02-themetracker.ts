// Meridian Park artifact 02 - ThemeTracker. Self-contained HTML,
// verbatim from content repo artifacts/artifact_02_ThemeTracker.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.
// Manifest type excel, which the app renders at excel width. Placement: Block 4, Theme analysis and synthesis, Monday.

export const meridianArtifact02Html = `<!-- artifact 2, Block 4 Monday, type excel -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Meridian Park Investor Platform Assessment - Theme tracker (coding matrix)</title>
<style>
  :root{
    --ink:#20242b; --grey:#6b7078; --line:#d4d6da; --gutter:#eceef0; --gutterln:#c9cbcf;
    --paper:#ffffff; --bg:#cfd2d7; --teal:#2d6a63; --teallt:#e6efee; --tealdk:#1f4f4a;
    --amber:#a9701c; --amberbg:#f6efe2; --zebra:#f7f8f9; --mute:#8b9098;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:var(--bg);font-family:'Segoe UI',Arial,Helvetica,sans-serif;
    color:var(--ink);-webkit-font-smoothing:antialiased}
  .page{width:1320px;margin:0 auto;padding:24px 20px 40px}

  .ctx{margin-bottom:12px}
  .ctx .eng{font-size:11px;letter-spacing:.13em;text-transform:uppercase;
    color:#4a5560;font-weight:600}
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
  .titlebar .fname .x{color:var(--teal)}
  .titlebar .mark{margin-left:auto;font-size:10px;letter-spacing:.06em;color:#9aa0a8;font-weight:600}

  .menubar{height:26px;background:#fafbfb;border-bottom:1px solid #e4e6e9;
    display:flex;align-items:center;padding:0 12px;gap:18px;font-size:11.5px;color:#7c818a}
  .menubar .m.on{color:var(--teal);font-weight:600;border-bottom:2px solid var(--teal);
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
    padding:3px 6px;font-size:11px;line-height:1.3;overflow:hidden}

  tr.collet th{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    font-weight:600;text-align:center;height:18px;font-size:10.5px;padding:0}
  th.corner{background:#e2e4e7;width:30px}

  td.rn{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    text-align:center;font-size:10px;font-weight:600;padding:3px 0;width:30px}

  tr.head th{background:var(--teal);color:#ffffff;font-weight:600;font-size:10.5px;
    text-align:left;padding:6px 6px;border-color:var(--tealdk);position:relative}
  tr.head th.c{text-align:center}
  tr.head th .flt{position:absolute;right:4px;top:7px;font-size:8px;color:#bcd6d3}

  tr.data:nth-of-type(even) td{background:var(--zebra)}
  tr.data td.rn{background:var(--gutter)}
  td.nm{font-weight:600;color:#2b3038}
  td.dt,td.ty{color:#4a4f57}
  td.sc{text-align:center;color:#3a3f47;font-weight:600}
  td.flag{text-align:center;font-weight:700;color:var(--teal);background:var(--teallt)}
  td.flag.n{background:transparent;color:#c9ccd1;font-weight:400}
  tr.data:nth-of-type(even) td.flag{background:#dfeceb}
  tr.data:nth-of-type(even) td.flag.n{background:var(--zebra)}
  td.shape{color:#4a4f57}
  td.st{text-align:center}
  td.note{color:#8a6f36;font-size:10px}
  .badge{display:inline-block;background:#eef1f4;color:#5b6470;font-size:9px;font-weight:700;
    letter-spacing:.04em;padding:1px 6px;border:1px solid #d8dde3}

  tr.spacer td{height:7px;background:#ffffff;border-left-color:var(--line);
    border-right-color:var(--line);border-top:none;border-bottom:none}
  tr.spacer td.rn{background:var(--gutter)}

  tr.tot td{background:#eaf2f1;font-weight:700;color:var(--tealdk);border-color:#b9d2cf}
  tr.tot td.rn{background:var(--gutter);color:#8b9098;font-weight:600}
  tr.tot td.lbl{text-align:right;color:#3a3f47}
  tr.tot td.flag{text-align:center;background:#d8e8e6}
  tr.pct td{background:#f2f7f6;color:#4d7a75;font-size:10px;border-color:#cfe0de}
  tr.pct td.rn{background:var(--gutter);color:#8b9098}
  tr.pct td.lbl{text-align:right}
  tr.pct td.flag{text-align:center;background:#e9f2f1}
  tr.avg td{background:#f7f8f9;color:#3a3f47;font-weight:600}
  tr.avg td.rn{background:var(--gutter);color:#8b9098}
  tr.avg td.lbl{text-align:right}
  tr.avg td.sc{background:#eaf2f1;color:var(--tealdk)}
  tr.deriv td{background:#ffffff;color:#5b6470;font-size:10.5px;font-style:italic}
  tr.deriv td.rn{background:var(--gutter);color:#8b9098;font-style:normal}

  .tabs{height:26px;background:#eef0f1;border-top:1px solid #d9dbdf;
    display:flex;align-items:flex-end;padding:0 8px;gap:2px}
  .tab{font-size:11px;padding:4px 14px;color:#7c818a;border:1px solid transparent;border-bottom:none}
  .tab.on{background:#ffffff;color:var(--teal);font-weight:600;
    border-color:#d9dbdf;border-top:2px solid var(--teal);border-radius:2px 2px 0 0}
  .status{height:22px;background:#f5f6f7;border-top:1px solid #e2e4e7;
    display:flex;align-items:center;justify-content:space-between;padding:0 12px;
    font-size:10px;color:#9aa0a8}
  .status .conf{letter-spacing:.06em;font-weight:600;color:#6b7078}

  .below{display:flex;gap:16px;margin-top:14px;width:1280px}
  .panel{background:var(--paper);border:1px solid #c8cbd1;padding:13px 16px;flex:1 1 0}
  .panel h4{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--teal);
    margin-bottom:8px}
  .panel .row{font-size:11px;color:#4a4f57;line-height:1.6}
  .panel .row b{color:#2b3038}
  .panel p{font-size:11px;color:#4a4f57;line-height:1.6;margin-bottom:6px}
</style>
</head>
<body>
<div class="page">

  <div class="ctx">
    <div class="eng">Meridian Park Investor Platform Assessment</div>
    <div class="doc">Theme tracker, interview coding matrix</div>
    <div class="meta">
      <span><span class="k">As of</span> Monday, week 3 of 6</span>
      <span><span class="k">Coded</span> 12 of 30 interviews completed</span>
      <span><span class="k">Owner</span> Carly</span>
    </div>
  </div>

  <div class="xl">

    <div class="titlebar">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="fname">Meridian_theme_tracker<span class="x">.xlsx</span></span>
      <span class="mark">INTERNAL WORKING FILE</span>
    </div>

    <div class="menubar">
      <span class="m">File</span><span class="m">Home</span><span class="m">Insert</span>
      <span class="m on">Data</span><span class="m">Review</span><span class="m">View</span>
    </div>

    <div class="fbar">
      <span class="namebox">F16</span>
      <span class="fx">fx</span>
      <span class="fc">=COUNTIF(F4:F15,"Y")</span>
    </div>

    <table class="grid">
      <colgroup>
        <col style="width:30px"><col style="width:96px"><col style="width:60px"><col style="width:150px">
        <col style="width:56px"><col style="width:66px">
        <col style="width:38px"><col style="width:38px"><col style="width:38px"><col style="width:38px"><col style="width:38px">
        <col style="width:196px"><col style="width:62px"><col style="width:294px">
      </colgroup>

      <tr class="collet">
        <th class="corner"></th>
        <th>A</th><th>B</th><th>C</th><th>D</th><th>E</th>
        <th>F</th><th>G</th><th>H</th><th>I</th><th>J</th>
        <th>K</th><th>L</th><th>M</th>
      </tr>

      <tr class="head">
        <td class="rn">3</td>
        <th>Interviewee<span class="flt">&#9660;</span></th>
        <th>Date<span class="flt">&#9660;</span></th>
        <th>Investor type<span class="flt">&#9660;</span></th>
        <th class="c">MP score</th>
        <th class="c">Best other</th>
        <th class="c">CR</th><th class="c">DS</th><th class="c">OB</th><th class="c">NT</th><th class="c">DF</th>
        <th>Last-mile shape</th>
        <th class="c">Status</th>
        <th>Notes</th>
      </tr>

      <tr class="data"><td class="rn">4</td><td class="nm">Margaret</td><td class="dt">Feb 14</td><td class="ty">Corporate pension</td><td class="sc">6</td><td class="sc">8</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="shape">Board-ready document</td><td class="st"><span class="badge">CODED</span></td><td class="note"></td></tr>
      <tr class="data"><td class="rn">5</td><td class="nm">Theo</td><td class="dt">Feb 15</td><td class="ty">University endowment</td><td class="sc">7</td><td class="sc">8</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="shape">Committee-ready document</td><td class="st"><span class="badge">CODED</span></td><td class="note"></td></tr>
      <tr class="data"><td class="rn">6</td><td class="nm">Priya</td><td class="dt">Feb 17</td><td class="ty">Property and casualty insurer</td><td class="sc">5</td><td class="sc">9</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="flag">Y</td><td class="flag">Y</td><td class="shape">System-ready data</td><td class="st"><span class="badge">CODED</span></td><td class="note"></td></tr>
      <tr class="data"><td class="rn">7</td><td class="nm">Walter</td><td class="dt">Feb 18</td><td class="ty">Sovereign wealth fund</td><td class="sc">6</td><td class="sc">8</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="shape">IC-ready document</td><td class="st"><span class="badge">CODED</span></td><td class="note">Third flavour of document, signed off by an investment committee rather than a pension board. Recorded exactly, not flattened into the others.</td></tr>
      <tr class="data"><td class="rn">8</td><td class="nm">Nadia</td><td class="dt">Feb 19</td><td class="ty">Family office</td><td class="sc">8</td><td class="sc">8</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="shape">Few complaints; wants on-demand access</td><td class="st"><span class="badge">CODED</span></td><td class="note">Barely complained and scored Meridian high. Nearly empty row, recorded honestly rather than smoothed.</td></tr>
      <tr class="data"><td class="rn">9</td><td class="nm">Hugh</td><td class="dt">Feb 20</td><td class="ty">Public pension</td><td class="sc">5</td><td class="sc">8</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="shape">Board-ready document</td><td class="st"><span class="badge">CODED</span></td><td class="note"></td></tr>
      <tr class="data"><td class="rn">10</td><td class="nm">Coleen</td><td class="dt">Feb 21</td><td class="ty">Foundation</td><td class="sc">6</td><td class="sc">7</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="shape">Committee-ready document</td><td class="st"><span class="badge">CODED</span></td><td class="note"></td></tr>
      <tr class="data"><td class="rn">11</td><td class="nm">Gordon</td><td class="dt">Feb 24</td><td class="ty">Corporate pension</td><td class="sc">6</td><td class="sc">8</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="shape">Board-ready document</td><td class="st"><span class="badge">CODED</span></td><td class="note"></td></tr>
      <tr class="data"><td class="rn">12</td><td class="nm">Imani</td><td class="dt">Feb 24</td><td class="ty">Life insurer</td><td class="sc">5</td><td class="sc">9</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="flag">Y</td><td class="shape">System-ready data</td><td class="st"><span class="badge">CODED</span></td><td class="note"></td></tr>
      <tr class="data"><td class="rn">13</td><td class="nm">Sayid</td><td class="dt">Feb 25</td><td class="ty">Health insurer</td><td class="sc">6</td><td class="sc">8</td><td class="flag n">&#183;</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="flag">Y</td><td class="flag">Y</td><td class="shape">System-ready data</td><td class="st"><span class="badge">CODED</span></td><td class="note"></td></tr>
      <tr class="data"><td class="rn">14</td><td class="nm">Beatrice</td><td class="dt">Feb 25</td><td class="ty">Public pension</td><td class="sc">7</td><td class="sc">8</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="shape">Board-ready document</td><td class="st"><span class="badge">CODED</span></td><td class="note"></td></tr>
      <tr class="data"><td class="rn">15</td><td class="nm">Frank</td><td class="dt">Feb 26</td><td class="ty">University endowment</td><td class="sc">6</td><td class="sc">8</td><td class="flag n">&#183;</td><td class="flag">Y</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="flag n">&#183;</td><td class="shape">Committee-ready document</td><td class="st"><span class="badge">CODED</span></td><td class="note"></td></tr>

      <tr class="tot">
        <td class="rn">16</td>
        <td class="lbl" colspan="3">Raised by, count of 12</td>
        <td class="sc"></td><td class="sc"></td>
        <td class="flag">8</td><td class="flag">7</td><td class="flag">6</td><td class="flag">7</td><td class="flag">3</td>
        <td></td><td></td><td></td>
      </tr>
      <tr class="pct">
        <td class="rn">17</td>
        <td class="lbl" colspan="3">Share of the 12 interviewed to date</td>
        <td></td><td></td>
        <td class="flag">67%</td><td class="flag">58%</td><td class="flag">50%</td><td class="flag">58%</td><td class="flag">25%</td>
        <td></td><td></td><td></td>
      </tr>
      <tr class="spacer"><td class="rn">18</td><td colspan="13"></td></tr>
      <tr class="avg">
        <td class="rn">19</td>
        <td class="lbl" colspan="3">Average score across the 12</td>
        <td class="sc">6.1</td><td class="sc">8.1</td>
        <td colspan="8"></td>
      </tr>
      <tr class="deriv">
        <td class="rn">20</td>
        <td colspan="13">Last mile (umbrella): 11 of 12 (92%)</td>
      </tr>
    </table>

    <div class="tabs">
      <span class="tab on">Coding matrix</span>
      <span class="tab">Interview log</span>
      <span class="tab">Theme summary</span>
      <span class="tab">Wishlist</span>
      <span class="tab">Methodology</span>
    </div>

    <div class="status">
      <span>12 rows coded of 30 planned</span>
      <span class="conf">INTERNAL WORKING DOCUMENT, NOT FOR DISTRIBUTION</span>
    </div>
  </div>

  <div class="below">
    <div class="panel">
      <h4>Column legend</h4>
      <div class="row"><b>CR</b> &nbsp;No consolidated capital-activity report</div>
      <div class="row"><b>DS</b> &nbsp;Poor document search and retrieval</div>
      <div class="row"><b>OB</b> &nbsp;Onboarding and subscription re-papering</div>
      <div class="row"><b>NT</b> &nbsp;No event notifications</div>
      <div class="row"><b>DF</b> &nbsp;Data feed, export and look-through detail</div>
      <div class="row" style="margin-top:7px;color:#6b7078">Y marks that the gap was raised. Scores are the investor's own one-to-ten rating of Meridian and of their best other manager.</div>
    </div>
    <div class="panel">
      <h4>Coding convention</h4>
      <p>Code only what the investor raised unprompted. A cell that cannot be supported stays blank.</p>
      <p>A blank is a finding, not a gap in the data.</p>
      <p>Rows are completed interviews only. The wider interview set is coded in lighter detail. The column taxonomy is a working layout for this engagement, not a single industry standard.</p>
    </div>
  </div>

</div>
</body>
</html>
`
