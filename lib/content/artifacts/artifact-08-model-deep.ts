// Project Kestrel artifact 08 - Model_Deep. Self-contained HTML,
// verbatim from content repo artifacts/artifact_08_Model_Deep.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.

export const artifact08Html = `<!-- artifact 8, Block 8 Tuesday, type excel -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Halloran Foods Operating Model - P&amp;L (working)</title>
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

  /* title bar */
  .titlebar{height:30px;background:#f3f4f5;border-bottom:1px solid #dfe1e4;
    display:flex;align-items:center;padding:0 12px;gap:9px}
  .titlebar .tile{width:18px;height:18px;background:var(--green);border-radius:3px;color:#fff;
    font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .titlebar .fn{font-size:12.5px;color:#33383f;font-weight:600}
  .titlebar .fn .x{color:var(--green)}
  .titlebar .note{margin-left:auto;font-size:10px;color:#9aa0a8;letter-spacing:.4px}

  /* ribbon hint */
  .ribbon{height:24px;background:#fafbfb;border-bottom:1px solid #e5e7ea;
    display:flex;align-items:center;padding:0 12px;gap:17px;font-size:11.5px;color:#7c818a}
  .ribbon .r.on{color:var(--green);font-weight:600;border-bottom:2px solid var(--green);height:24px;
    display:flex;align-items:center}

  /* name box + formula bar */
  .fbar{height:24px;background:#fff;border-bottom:1px solid #dfe1e4;display:flex;align-items:stretch;font-size:12px}
  .fbar .namebox{width:74px;border-right:1px solid #dfe1e4;display:flex;align-items:center;
    justify-content:center;color:#33383f;font-weight:600;background:#f7f8f9}
  .fbar .fx{width:32px;border-right:1px solid #dfe1e4;display:flex;align-items:center;
    justify-content:center;color:#9aa0a8;font-style:italic}
  .fbar .fc{display:flex;align-items:center;padding:0 10px;color:#1a1a1a;font-family:Consolas,'Courier New',monospace;font-size:11.5px}

  /* grid */
  .gridwrap{position:relative;background:#fff;padding:0}
  table.grid{width:1152px;border-collapse:collapse;table-layout:fixed}
  table.grid td,table.grid th{border:1px solid var(--line);padding:1px 6px;font-size:11px;
    height:19px;line-height:1.3;overflow:hidden;white-space:nowrap}

  /* column letters + row numbers */
  tr.collet th{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    font-weight:600;text-align:center;height:17px;font-size:10.5px;padding:0}
  th.corner{background:#e2e4e7}
  td.rn{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;text-align:center;
    font-size:10px;font-weight:600;width:30px}

  /* header (years) row - frozen look */
  tr.hdr td{background:var(--green);color:#fff;font-weight:700;text-align:right}
  tr.hdr td.lab{text-align:left}
  tr.hdr td.notes{text-align:left;font-weight:600}

  /* label column - frozen look */
  td.lab{text-align:left;background:#f7f8f9;color:#26292e}
  tr.band td{background:#eceef0;color:#54595f;font-weight:700;font-style:italic;font-size:10px;letter-spacing:.3px}

  td.n{text-align:right;font-variant-numeric:tabular-nums}
  td.notes{text-align:left;font-size:9.6px;color:#7a5a1c;font-style:italic;white-space:normal;background:#fff}
  td.empty{background:#fff}

  /* font-color convention */
  .blue{color:var(--blue)}
  .black{color:var(--ink)}
  .green{color:var(--linkg)}

  /* row emphasis */
  tr.sub td{font-weight:700;border-top:1.5px solid #9aa0a8}
  tr.sub td.lab{font-weight:700}
  tr.pct td{color:#3a3f47;font-style:italic}
  tr.pct td.lab{font-style:normal;color:#26292e}
  tr.adj td{border-top:1.5px solid #9aa0a8;border-bottom:2.5px double #9aa0a8;font-weight:700}

  /* fresh-fill highlight (D5) */
  td.fresh{background:#eef7e6;box-shadow:inset 0 0 0 1px #bcd9a8}

  /* selected cell (D9) */
  td.sel{outline:2px solid var(--sel);outline-offset:-2px;background:#eef4f0}

  /* hardcode error cell (C9): red comment triangle */
  td.errcell{position:relative}
  td.errcell .tri{position:absolute;top:0;right:0;width:0;height:0;
    border-top:6px solid #d0342c;border-left:6px solid transparent}

  /* floating Excel comment */
  .comment{position:absolute;top:92px;left:300px;width:288px;background:#ffffe1;
    border:1px solid #c9b96b;box-shadow:2px 3px 7px rgba(0,0,0,.22);padding:7px 9px;
    font-size:10.5px;line-height:1.4;color:#3a3320;z-index:5}
  .comment .who{font-weight:700;margin-bottom:2px}
  .comment .stem{position:absolute;left:-10px;top:40px;width:0;height:0;
    border-top:6px solid transparent;border-bottom:6px solid transparent;border-right:10px solid #c9b96b}
  .comment .cline{position:absolute;left:14px;top:78px;width:150px;height:1px;background:#d0342c;
    transform:rotate(28deg);transform-origin:left center;opacity:.55}

  /* sheet tabs + status */
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
          <col style="width:30px"><col style="width:250px">
          <col style="width:96px"><col style="width:96px"><col style="width:96px"><col style="width:96px">
          <col style="width:300px"><col style="width:188px">
        </colgroup>

        <tr class="collet">
          <th class="corner"></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th>
        </tr>

        <tr class="hdr">
          <td class="rn">1</td>
          <td class="lab">P&amp;L ($M)</td>
          <td>FY-2A</td><td>FY-1A</td><td>LTM A</td><td>FY+1E</td>
          <td class="notes">Notes  (A = actual, E = estimate)</td>
          <td class="empty" style="background:var(--green)"></td>
        </tr>

        <tr class="band">
          <td class="rn">2</td><td class="lab">Revenue</td>
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
          <td class="n blue">4.0</td><td class="n blue">9.0</td>
          <td class="n blue fresh">14.2</td><td class="n blue">23.0</td>
          <td class="notes">updated off Marisol's schedule, was placeholder</td><td class="empty"></td>
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
          <td class="n black">91.0</td>
          <td class="n blue errcell">104.0<span class="tri"></span></td>
          <td class="n black sel">118.4</td>
          <td class="n black">144.0</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>
        <tr class="pct">
          <td class="rn">10</td><td class="lab">Revenue growth %</td>
          <td class="n black"></td><td class="n black">14.3%</td><td class="n black">13.8%</td><td class="n black">21.6%</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>

        <tr>
          <td class="rn">11</td><td class="lab">COGS</td>
          <td class="n black">(56.2)</td><td class="n black">(65.0)</td><td class="n black">(73.2)</td><td class="n black">(88.6)</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>
        <tr class="sub">
          <td class="rn">12</td><td class="lab">Gross profit</td>
          <td class="n black">34.8</td><td class="n black">39.0</td><td class="n black">45.2</td><td class="n black">55.4</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>
        <tr class="pct">
          <td class="rn">13</td><td class="lab">Gross margin %</td>
          <td class="n black">38.2%</td><td class="n black">37.5%</td><td class="n black">38.2%</td><td class="n black">38.5%</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>

        <tr>
          <td class="rn">14</td><td class="lab">Operating expenses (SG&amp;A)</td>
          <td class="n black">(22.8)</td><td class="n black">(24.5)</td><td class="n black">(28.8)</td><td class="n black">(33.9)</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>
        <tr class="sub">
          <td class="rn">15</td><td class="lab">EBITDA (reported)</td>
          <td class="n black">12.0</td><td class="n black">14.5</td><td class="n black">16.4</td><td class="n black">21.5</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>
        <tr>
          <td class="rn">16</td><td class="lab">Add-backs (owner comp, one-time)</td>
          <td class="n green">2.0</td><td class="n green">2.5</td><td class="n green">3.2</td><td class="n green">4.0</td>
          <td class="notes">linked from Add-Backs tab</td><td class="empty"></td>
        </tr>
        <tr class="adj">
          <td class="rn">17</td><td class="lab">Adjusted EBITDA</td>
          <td class="n black">14.0</td><td class="n black">17.0</td><td class="n black">19.6</td><td class="n black">25.5</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>
        <tr class="pct">
          <td class="rn">18</td><td class="lab">Adj. EBITDA margin %</td>
          <td class="n black">15.4%</td><td class="n black">16.3%</td><td class="n black">16.6%</td><td class="n black">17.7%</td>
          <td class="notes"></td><td class="empty"></td>
        </tr>

        <tr>
          <td class="rn">19</td><td class="lab">Check: Net revenue ties to Rev Build tab</td>
          <td class="n green">OK</td><td class="n green">OK</td><td class="n green">OK</td><td class="n green">OK</td>
          <td class="notes">cross-tab tie-out</td><td class="empty"></td>
        </tr>
      </table>

      <div class="comment">
        <span class="stem"></span>
        <div class="who">Sabrina:</div>
        hardcoded, re-link to =SUM. Value happens to tie today but it won't when a line moves. Caught in tonight's QC.
      </div>
    </div>

    <div class="tabs">
      <span class="tab on">P&amp;L</span>
      <span class="tab">Summary</span>
      <span class="tab">Rev Build</span>
      <span class="tab">Projections</span>
      <span class="tab">Add-Backs</span>
      <span class="tab">Schedules</span>
      <span class="tab">Balance Sheet</span>
      <span class="tab">Cash Flow</span>
    </div>

    <div class="status">
      <span>Ready &nbsp; | &nbsp; Internal - working model, tie-outs live</span>
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
