// Project Kestrel artifact 03 - Model_Cascade. Self-contained HTML,
// verbatim from content repo artifacts/artifact_03_Model_Cascade.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.

export const artifact03Html = `<!-- artifact 3, Block 2 Monday, type excel -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Halloran Foods Operating Model - Rev Build (working)</title>
<style>
  :root{
    --green:#217346; --greenlt:#e5efe8; --gutter:#f0f1f2; --gutterln:#c6c9cd;
    --line:#d9dbdf; --ink:#1a1a1a; --blue:#1330cf; --linkg:#1c7a3a;
    --muted:#5a5f66; --paper:#ffffff; --bg:#cfd2d6; --sel:#217346;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:var(--bg);
    font-family:Calibri,'Segoe UI',Arial,Helvetica,sans-serif;color:var(--ink);
    -webkit-font-smoothing:antialiased}
  .stage{padding:20px 16px 34px}

  .xl{width:1200px;background:var(--paper);border:1px solid #b3b6bb;
    box-shadow:0 9px 28px rgba(30,40,55,.20);overflow:hidden}

  .titlebar{height:30px;background:#f3f4f5;border-bottom:1px solid #dfe1e4;
    display:flex;align-items:center;padding:0 12px;gap:9px}
  .titlebar .tile{width:18px;height:18px;background:var(--green);border-radius:3px;color:#fff;
    font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .titlebar .fn{font-size:12.5px;color:#33383f;font-weight:600}
  .titlebar .fn .x{color:var(--green)}
  .titlebar .note{margin-left:auto;font-size:10px;color:#9aa0a8;letter-spacing:.4px}

  .ribbon{height:24px;background:#fafbfb;border-bottom:1px solid #e5e7ea;
    display:flex;align-items:center;padding:0 12px;gap:17px;font-size:11.5px;color:#7c818a}
  .ribbon .r.on{color:var(--green);font-weight:600;border-bottom:2px solid var(--green);height:24px;
    display:flex;align-items:center}

  .fbar{height:24px;background:#fff;border-bottom:1px solid #dfe1e4;display:flex;align-items:stretch;font-size:12px}
  .fbar .namebox{width:74px;border-right:1px solid #dfe1e4;display:flex;align-items:center;
    justify-content:center;color:#33383f;font-weight:600;background:#f7f8f9}
  .fbar .fx{width:32px;border-right:1px solid #dfe1e4;display:flex;align-items:center;
    justify-content:center;color:#9aa0a8;font-style:italic}
  .fbar .fc{display:flex;align-items:center;padding:0 10px;color:#1a1a1a;font-family:Consolas,'Courier New',monospace;font-size:11.5px}

  .gridwrap{position:relative;background:#fff;padding:0}
  table.grid{width:1152px;border-collapse:collapse;table-layout:fixed}
  table.grid td,table.grid th{border:1px solid var(--line);padding:1px 6px;font-size:11px;
    height:19px;line-height:1.3;overflow:hidden;white-space:nowrap}

  tr.collet th{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    font-weight:600;text-align:center;height:17px;font-size:10.5px;padding:0}
  th.corner{background:#e2e4e7}
  td.rn{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;text-align:center;
    font-size:10px;font-weight:600;width:30px}

  tr.hdr td{background:var(--green);color:#fff;font-weight:700;text-align:right}
  tr.hdr td.lab{text-align:left}
  tr.hdr td.notes{text-align:left;font-weight:600}

  td.lab{text-align:left;background:#f7f8f9;color:#26292e}
  tr.band td{background:#eceef0;color:#54595f;font-weight:700;font-style:italic;font-size:10px;letter-spacing:.3px}

  td.n{text-align:right;font-variant-numeric:tabular-nums}
  td.notes{text-align:left;font-size:9.6px;color:#7a5a1c;font-style:italic;white-space:normal;background:#fff}
  td.empty{background:#fff}

  .blue{color:var(--blue)}
  .black{color:var(--ink)}
  .green{color:var(--linkg)}

  tr.sub td{font-weight:700;border-top:1.5px solid #9aa0a8}
  tr.sub td.lab{font-weight:700}
  tr.pct td{color:#3a3f47;font-style:italic}
  tr.pct td.lab{font-style:normal;color:#26292e}

  td.fresh{background:#eef7e6;box-shadow:inset 0 0 0 1px #bcd9a8}
  td.sel{outline:2px solid var(--sel);outline-offset:-2px;background:#eef4f0}

  .tabs{height:26px;background:#eef0f1;border-top:1px solid #d9dbdf;display:flex;align-items:flex-end;
    padding:0 8px;gap:2px;overflow:hidden}
  .tab{font-size:11px;padding:4px 12px;color:#7c818a;white-space:nowrap}
  .tab.on{background:#fff;color:var(--green);font-weight:700;border:1px solid #d9dbdf;
    border-top:2px solid var(--green);border-bottom:none;border-radius:2px 2px 0 0}
  .status{height:22px;background:#f5f6f7;border-top:1px solid #e2e4e7;display:flex;align-items:center;
    justify-content:space-between;padding:0 12px;font-size:10px;color:#8a9098}
  .legend span{margin-left:14px}
  .legend .lb{color:var(--blue);font-weight:700}
  .legend .lk{color:var(--linkg);font-weight:700}
  .legend .lf{color:var(--ink);font-weight:700}
</style>
</head>
<body>
<div class="stage">
  <div class="xl">

    <div class="titlebar">
      <span class="tile">X</span>
      <span class="fn">Halloran_Foods_Operating_Model<span class="x">.xlsx</span></span>
      <span class="note">Internal - working model</span>
    </div>

    <div class="ribbon">
      <span class="r">File</span><span class="r on">Home</span><span class="r">Insert</span>
      <span class="r">Formulas</span><span class="r">Data</span><span class="r">Review</span><span class="r">View</span>
    </div>

    <div class="fbar">
      <span class="namebox">D9</span>
      <span class="fx">fx</span>
      <span class="fc">=SUM(D3:D8)</span>
    </div>

    <div class="gridwrap">
      <table class="grid">
        <colgroup>
          <col style="width:30px"><col style="width:240px">
          <col style="width:100px"><col style="width:100px"><col style="width:100px"><col style="width:100px">
          <col style="width:300px"><col style="width:182px">
        </colgroup>

        <tr class="collet">
          <th class="corner"></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th>
        </tr>

        <tr class="hdr">
          <td class="rn">1</td>
          <td class="lab">Rev Build ($M)</td>
          <td>FY-2A</td><td>FY-1A</td><td>LTM A</td><td>FY+1E</td>
          <td class="notes">Notes  (A = actual, E = estimate)</td>
          <td class="empty" style="background:var(--green)"></td>
        </tr>

        <tr class="band">
          <td class="rn">2</td><td class="lab">Revenue build</td>
          <td></td><td></td><td></td><td></td><td class="notes"></td><td class="empty"></td>
        </tr>

        <tr>
          <td class="rn">3</td><td class="lab">Grocery - core sauces</td>
          <td class="n blue">41.0</td><td class="n blue">46.5</td><td class="n blue">52.1</td><td class="n blue">58.0</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>
        <tr>
          <td class="rn">4</td><td class="lab">Grocery - condiments</td>
          <td class="n blue">22.0</td><td class="n blue">25.0</td><td class="n blue">28.4</td><td class="n blue">32.0</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>
        <tr>
          <td class="rn">5</td><td class="lab">Club-store program</td>
          <td class="n blue fresh">4.0</td><td class="n blue fresh">9.0</td><td class="n blue fresh">14.2</td><td class="n blue fresh">23.0</td>
          <td class="notes">split out today; surfaced a double-count vs base grocery, now corrected, total re-ties to 118.4</td><td class="empty"></td>
        </tr>
        <tr>
          <td class="rn">6</td><td class="lab">Foodservice</td>
          <td class="n blue">18.0</td><td class="n blue">18.5</td><td class="n blue">18.7</td><td class="n blue">20.0</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>
        <tr>
          <td class="rn">7</td><td class="lab">Co-packing / committed lines</td>
          <td class="n blue">4.0</td><td class="n blue">3.5</td><td class="n blue">3.0</td><td class="n blue">9.0</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>
        <tr>
          <td class="rn">8</td><td class="lab">Other / private label</td>
          <td class="n blue">2.0</td><td class="n blue">1.5</td><td class="n blue">2.0</td><td class="n blue">2.0</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>

        <tr class="sub">
          <td class="rn">9</td><td class="lab">Net revenue</td>
          <td class="n black">91.0</td><td class="n black">104.0</td><td class="n black sel">118.4</td><td class="n black">144.0</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>
        <tr class="pct">
          <td class="rn">10</td><td class="lab">Revenue growth %</td>
          <td class="n black"></td><td class="n black">14.3%</td><td class="n black">13.8%</td><td class="n black">21.6%</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>

        <tr>
          <td class="rn">11</td><td class="lab">Check: ties to P&amp;L Net revenue</td>
          <td class="n green">OK</td><td class="n green">OK</td><td class="n green">OK</td><td class="n green">OK</td>
          <td class="notes">cross-tab tie-out (feeds the P&amp;L tab)</td><td class="empty"></td>
        </tr>
      </table>
    </div>

    <div class="tabs">
      <span class="tab">P&amp;L</span>
      <span class="tab">Summary</span>
      <span class="tab on">Rev Build</span>
      <span class="tab">Projections</span>
      <span class="tab">Add-Backs</span>
      <span class="tab">Schedules</span>
      <span class="tab">Balance Sheet</span>
      <span class="tab">Cash Flow</span>
    </div>

    <div class="status">
      <span>Ready &nbsp; | &nbsp; Rev Build split today, net revenue re-ties to 118.4</span>
      <span class="legend">
        <span class="lb">blue = input</span>
        <span class="lf">black = formula</span>
        <span class="lk">green = linked</span>
      </span>
    </div>

  </div>
</div>
</body>
</html>
`
