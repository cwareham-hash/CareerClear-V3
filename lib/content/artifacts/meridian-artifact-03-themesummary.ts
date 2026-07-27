// Meridian Park artifact 03 - ThemeSummary. Self-contained HTML,
// verbatim from content repo artifacts/artifact_03_ThemeSummary.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.
// Manifest type excel, which the app renders at excel width. Placement: Block 4, Theme analysis and synthesis, Monday.

export const meridianArtifact03Html = `<!-- artifact 3, Block 4 Monday, type excel -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Meridian Park Investor Platform Assessment - Theme summary and light quantification</title>
<style>
  :root{
    --ink:#20242b; --line:#d4d6da; --gutter:#eceef0; --gutterln:#c9cbcf;
    --paper:#ffffff; --bg:#cfd2d7; --teal:#2d6a63; --teallt:#e6efee; --tealdk:#1f4f4a;
    --amber:#a9701c; --amberbg:#f6efe2; --zebra:#f7f8f9; --mute:#8b9098;
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
  table.grid td,table.grid th{border:1px solid var(--line);vertical-align:top;
    padding:5px 7px;font-size:11px;line-height:1.4;overflow:hidden}

  tr.collet th{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    font-weight:600;text-align:center;height:18px;font-size:10.5px;padding:0}
  th.corner{background:#e2e4e7;width:30px}
  td.rn{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    text-align:center;font-size:10px;font-weight:600;padding:4px 0;width:30px}

  tr.ttl td{background:#ffffff;border-color:var(--line)}
  td.dcap{font-size:11.5px;color:#3a3f47;font-weight:600}
  td.dsub{font-size:11px;color:#5b6470;font-style:italic}

  tr.head th{background:var(--teal);color:#ffffff;font-weight:600;font-size:10.5px;
    text-align:left;padding:6px 7px;border-color:var(--tealdk)}
  tr.head th.c{text-align:center}

  tr.data:nth-of-type(even) td{background:var(--zebra)}
  tr.data td.rn{background:var(--gutter)}
  td.th{font-weight:600;color:#2b3038}
  td.cnt{text-align:center;font-weight:700;color:var(--tealdk);background:var(--teallt)}
  tr.data:nth-of-type(even) td.cnt{background:#dfeceb}
  td.pain{color:#4a4f57}
  td.rat{color:#5b6470;font-size:10.5px}
  td.band{text-align:center;font-weight:600;font-size:10px;letter-spacing:.03em}
  .b-hi{background:#dfeceb;color:var(--tealdk)}
  .b-mh{background:#e8efee;color:#3d6b66}
  .b-md{background:#f0f2f3;color:#5b6470}
  .b-ins{background:var(--amberbg);color:var(--amber)}

  tr.spacer td{height:8px;background:#ffffff;border-left-color:var(--line);
    border-right-color:var(--line);border-top:none;border-bottom:none}
  tr.spacer td.rn{background:var(--gutter)}

  tr.note td{background:#ffffff;color:#4a4f57;font-size:10.5px;line-height:1.55}
  tr.note td b{color:#2b3038}
  tr.oq td{background:#fdf8ee;color:#6d5a30;font-size:10.5px;line-height:1.55;border-color:#e6d9bd}
  tr.oq td b{color:var(--amber)}
  .pill{display:inline-block;background:var(--amberbg);color:var(--amber);font-size:9px;
    font-weight:700;letter-spacing:.06em;padding:1px 7px;border:1px solid #e2cfa8;margin-left:4px}

  .tabs{height:26px;background:#eef0f1;border-top:1px solid #d9dbdf;
    display:flex;align-items:flex-end;padding:0 8px;gap:2px}
  .tab{font-size:11px;padding:4px 14px;color:#7c818a;border:1px solid transparent;border-bottom:none}
  .tab.on{background:#ffffff;color:var(--teal);font-weight:600;
    border-color:#d9dbdf;border-top:2px solid var(--teal);border-radius:2px 2px 0 0}
  .status{height:22px;background:#f5f6f7;border-top:1px solid #e2e4e7;
    display:flex;align-items:center;justify-content:space-between;padding:0 12px;
    font-size:10px;color:#9aa0a8}
  .status .conf{letter-spacing:.06em;font-weight:600;color:#6b7078}

  .below{display:flex;gap:16px;margin-top:14px;width:1280px;align-items:flex-start}
  .panel{background:var(--paper);border:1px solid #c8cbd1;padding:14px 17px}
  .panel h4{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--teal);
    margin-bottom:9px}
  .chartp{flex:1 1 auto}
  .spread{width:302px;flex:0 0 302px}
  .spread .big{display:flex;gap:26px;margin-bottom:9px}
  .spread .sv{font-size:30px;font-weight:700;color:var(--tealdk);line-height:1}
  .spread .sl{font-size:10px;color:var(--mute);letter-spacing:.05em;
    text-transform:uppercase;margin-top:4px}
  .spread p{font-size:11px;color:#4a4f57;line-height:1.6}
  .cap{font-size:10.5px;color:var(--mute);margin-bottom:9px}
</style>
</head>
<body>
<div class="page">

  <div class="ctx">
    <div class="eng">Meridian Park Investor Platform Assessment</div>
    <div class="doc">Theme summary and light quantification</div>
    <div class="meta">
      <span><span class="k">As of</span> Monday, week 3 of 6</span>
      <span><span class="k">Base</span> 12 of 30 interviews completed</span>
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
      <span class="namebox">B6</span>
      <span class="fx">fx</span>
      <span class="fc">='Coding matrix'!F16 &amp; " of 12"</span>
    </div>

    <table class="grid">
      <colgroup>
        <col style="width:30px"><col style="width:262px"><col style="width:96px">
        <col style="width:330px"><col style="width:398px"><col style="width:164px">
      </colgroup>

      <tr class="collet">
        <th class="corner"></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th>
      </tr>

      <tr class="ttl">
        <td class="rn">1</td>
        <td class="dcap" colspan="5">Generated from the coding matrix.</td>
      </tr>
      <tr class="ttl">
        <td class="rn">2</td>
        <td class="dsub" colspan="5">Base for every count below: of twelve interviews completed to date, of thirty planned.</td>
      </tr>
      <tr class="spacer"><td class="rn">3</td><td colspan="5"></td></tr>

      <tr class="head">
        <td class="rn">4</td>
        <th>Theme / gap</th>
        <th class="c">Raised by</th>
        <th>Quantified pain (where harvested)</th>
        <th>Band rationale</th>
        <th class="c">Impact band</th>
      </tr>

      <tr class="data">
        <td class="rn">5</td>
        <td class="th">Last mile (umbrella)</td>
        <td class="cnt">11 of 12 (92%)</td>
        <td class="pain">Dominant pattern: accurate data, finished output left to the investor</td>
        <td class="rat">Breadth. Nearly every interview lands here, and it is the umbrella the other gaps sit under.</td>
        <td class="band b-hi">High</td>
      </tr>
      <tr class="data">
        <td class="rn">6</td>
        <td class="th">No consolidated capital-activity report</td>
        <td class="cnt">8 of 12 (67%)</td>
        <td class="pain">1 to 2 analyst-days per quarter on manual assembly (harvested from those who quantified)</td>
        <td class="rat">Breadth plus a quantified cost. The most-raised single gap, and the one with a number behind it.</td>
        <td class="band b-hi">High</td>
      </tr>
      <tr class="data">
        <td class="rn">7</td>
        <td class="th">Poor document search / retrieval</td>
        <td class="cnt">7 of 12 (58%)</td>
        <td class="pain">Hours to about a day per retrieval, routed through the relationship manager</td>
        <td class="rat">Broad, and the cost is sharpest under audit, when the wait runs on someone else's clock.</td>
        <td class="band b-mh">Medium-high</td>
      </tr>
      <tr class="data">
        <td class="rn">8</td>
        <td class="th">No event notifications</td>
        <td class="cnt">7 of 12 (58%)</td>
        <td class="pain">Compressed funding windows; a few near-misses, nothing escalated to a board</td>
        <td class="rat">Same breadth as search, but nothing has broken yet. Risk carried on attention, not damage done.</td>
        <td class="band b-md">Medium</td>
      </tr>
      <tr class="data">
        <td class="rn">9</td>
        <td class="th">Onboarding / subscription re-papering</td>
        <td class="cnt">6 of 12 (50%)</td>
        <td class="pain">Same materials re-submitted up to 4 times for multi-fund investors</td>
        <td class="rat">Half the group, but felt by a different team and at a different moment. The front end, not the reporting cycle.</td>
        <td class="band b-md">Medium</td>
      </tr>
      <tr class="data">
        <td class="rn">10</td>
        <td class="th">Data feed / export and look-through (data-led only)</td>
        <td class="cnt">3 of 12 (25%)</td>
        <td class="pain">About 2 staff for the better part of a week per quarterly filing; thin look-through for capital charges</td>
        <td class="rat">Sharp cost, narrow base. Three of twelve is not the whole book, so it is banded for insurers rather than banded high across the board.</td>
        <td class="band b-ins">High for insurers</td>
      </tr>

      <tr class="spacer"><td class="rn">11</td><td colspan="5"></td></tr>

      <tr class="oq">
        <td class="rn">12</td>
        <td colspan="5">
          <b>Open question for the problem-solving session.</b><span class="pill">OPEN</span>
          Onboarding re-papering is real (6 of 12) but felt by a different team (operations, not the CIO)
          and at a different moment (the front end, not the reporting cycle). Does it sit under the
          last-mile umbrella, or does it stand as its own theme? Flag for the team to resolve before the
          storyline locks. &nbsp;<b>Owner</b> the team. &nbsp;<b>Forum</b> Wednesday problem-solving session.
        </td>
      </tr>
      <tr class="note">
        <td class="rn">13</td>
        <td colspan="5"><b>Tracker note.</b> The wider interview set is coded in lighter detail. The
          column taxonomy is a working layout for this engagement, not a single industry standard.</td>
      </tr>
    </table>

    <div class="tabs">
      <span class="tab">Coding matrix</span>
      <span class="tab">Interview log</span>
      <span class="tab on">Theme summary</span>
      <span class="tab">Wishlist</span>
      <span class="tab">Methodology</span>
    </div>

    <div class="status">
      <span>6 themes, base 12 interviews</span>
      <span class="conf">INTERNAL WORKING DOCUMENT, NOT FOR DISTRIBUTION</span>
    </div>
  </div>

  <div class="below">
    <div class="panel chartp">
      <h4>Exhibit S1 &nbsp;Theme breadth</h4>
      <div class="cap">Investors raising each gap, of 12 interviewed to date.</div>
      <svg width="900" height="262" viewBox="0 0 900 262" role="img"
           aria-label="Investors raising each gap, of 12 interviewed to date">
        <g stroke="#e4e7ea" stroke-width="1">
          <line x1="300" y1="6" x2="300" y2="218"/>
          <line x1="384" y1="6" x2="384" y2="218"/>
          <line x1="468" y1="6" x2="468" y2="218"/>
          <line x1="552" y1="6" x2="552" y2="218"/>
          <line x1="636" y1="6" x2="636" y2="218"/>
          <line x1="720" y1="6" x2="720" y2="218"/>
          <line x1="804" y1="6" x2="804" y2="218"/>
        </g>
        <line x1="300" y1="218" x2="804" y2="218" stroke="#a9b2c0" stroke-width="1"/>
        <g font-family="'Segoe UI',Arial,Helvetica,sans-serif" font-size="10" fill="#8b9098" text-anchor="middle">
          <text x="300" y="234">0</text><text x="384" y="234">2</text><text x="468" y="234">4</text>
          <text x="552" y="234">6</text><text x="636" y="234">8</text><text x="720" y="234">10</text>
          <text x="804" y="234">12</text>
          <text x="552" y="253" font-size="10.5">investors raising the gap, of 12 interviewed to date</text>
        </g>
        <g font-family="'Segoe UI',Arial,Helvetica,sans-serif" font-size="10.5" fill="#4a4f57" text-anchor="end">
          <text x="292" y="21">Last mile (umbrella)</text>
          <text x="292" y="55">No consolidated report</text>
          <text x="292" y="89">Poor document search</text>
          <text x="292" y="123">No event notifications</text>
          <text x="292" y="157">Onboarding re-papering</text>
          <text x="292" y="191">Data feed and look-through</text>
        </g>
        <rect x="300" y="8"   width="462" height="18" fill="#2d6a63"/>
        <rect x="300" y="42"  width="336" height="18" fill="#2d6a63"/>
        <rect x="300" y="76"  width="294" height="18" fill="#2d6a63"/>
        <rect x="300" y="110" width="294" height="18" fill="#2d6a63"/>
        <rect x="300" y="144" width="252" height="18" fill="#2d6a63"/>
        <rect x="300" y="178" width="126" height="18" fill="#d9a441"/>
        <g font-family="'Segoe UI',Arial,Helvetica,sans-serif" font-size="10.5" fill="#3a3f47">
          <text x="770" y="21">11 &#183; 92%</text>
          <text x="644" y="55">8 &#183; 67%</text>
          <text x="602" y="89">7 &#183; 58%</text>
          <text x="602" y="123">7 &#183; 58%</text>
          <text x="560" y="157">6 &#183; 50%</text>
          <text x="434" y="191" fill="#a9701c">3 &#183; 25%, insurers only</text>
        </g>
      </svg>
    </div>

    <div class="panel spread">
      <h4>Score spread</h4>
      <div class="big">
        <div><div class="sv">6.1</div><div class="sl">Meridian</div></div>
        <div><div class="sv">8.1</div><div class="sl">Best other</div></div>
      </div>
      <p>Average across the 12 interviews completed to date. The gap between the two is concentrated in
         the last mile, not in data accuracy: the lower scorers still credit the data as accurate and
         complete.</p>
    </div>
  </div>

</div>
</body>
</html>
`
