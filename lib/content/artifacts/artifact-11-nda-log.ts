// Project Kestrel artifact 11 - NDA_Log. Self-contained HTML,
// verbatim from content repo artifacts/artifact_11_NDA_Log.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.

export const artifact11Html = `<!-- artifact 11, Block 9 Wednesday, type excel -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Project Kestrel - NDA / Release Log (working file)</title>
<style>
  :root{
    --ink:#20242b; --grey:#6b7078; --ltgrey:#e9eaec; --line:#d4d6da;
    --gutter:#eceef0; --gutterln:#c9cbcf; --paper:#ffffff; --bg:#cfd2d7;
    --green:#3f6f52; --greenlt:#e6efe8; --greendk:#264a37;
    --amber:#b07816; --amberbg:#fbeecf; --zebra:#f7f8f9;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:var(--bg);
    font-family:'Segoe UI',Arial,Helvetica,sans-serif;color:var(--ink);
    -webkit-font-smoothing:antialiased}
  .page{width:1180px;margin:0 auto;padding:24px 20px 40px}

  .ctx{font-size:12.5px;color:#4a4f57;margin-bottom:12px;display:flex;align-items:center;gap:10px}
  .ctx b{color:#2c3e33}
  .ctx .pill{background:#c7d4cb;color:#2c3e33;border-radius:10px;padding:1px 9px;font-size:11px;font-weight:600}

  .xl{width:1120px;background:var(--paper);border:1px solid #b7bac0;
    box-shadow:0 8px 26px rgba(30,40,55,.20);overflow:hidden}

  .titlebar{height:30px;background:#f3f4f5;border-bottom:1px solid #dfe1e4;
    display:flex;align-items:center;padding:0 12px;gap:9px}
  .titlebar .dots{display:flex;gap:6px}
  .titlebar .dots i{width:10px;height:10px;border-radius:50%;display:inline-block}
  .titlebar .dots .r{background:#e2685c}
  .titlebar .dots .y{background:#e6b64c}
  .titlebar .dots .g{background:#5fb466}
  .titlebar .fname{font-size:12.5px;color:#3a3f47;font-weight:600}
  .titlebar .fname .xlsx{color:var(--green)}
  .titlebar .mark{margin-left:auto;font-size:10px;letter-spacing:.6px;color:#9aa0a8;font-weight:600}

  .menubar{height:26px;background:#fafbfb;border-bottom:1px solid #e4e6e9;
    display:flex;align-items:center;padding:0 12px;gap:18px;font-size:11.5px;color:#7c818a}
  .menubar .m.on{color:var(--green);font-weight:600;border-bottom:2px solid var(--green);
    height:26px;display:flex;align-items:center}

  .fbar{height:24px;background:#ffffff;border-bottom:1px solid #dfe1e4;
    display:flex;align-items:stretch;font-size:11.5px}
  .fbar .namebox{width:66px;border-right:1px solid #dfe1e4;display:flex;align-items:center;
    justify-content:center;color:#3a3f47;font-weight:600;background:#f7f8f9}
  .fbar .fx{width:34px;border-right:1px solid #dfe1e4;display:flex;align-items:center;
    justify-content:center;color:#9aa0a8;font-style:italic}
  .fbar .fcontent{display:flex;align-items:center;padding:0 10px;color:#3a3f47;
    white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

  table.grid{width:1120px;border-collapse:collapse;table-layout:fixed}
  table.grid td,table.grid th{border:1px solid var(--line);vertical-align:top;
    padding:3px 7px;font-size:11px;line-height:1.28;overflow:hidden}

  tr.collet th{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    font-weight:600;text-align:center;height:18px;font-size:10.5px;padding:0}
  th.corner{background:#e2e4e7}

  td.rn{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    text-align:center;font-size:10px;font-weight:600;padding:3px 0;width:30px}

  tr.head th{background:var(--green);color:#ffffff;font-weight:600;font-size:10.5px;
    text-align:left;letter-spacing:.2px;padding:5px 6px;border-color:#2f5941}
  tr.head th.c-num,tr.head th.c-ctr{text-align:center}

  td.cnum{text-align:center;color:#7c818a;width:30px}
  td.ctr{font-weight:600;color:#2b3038}
  td.type{color:#4a4f57}
  td.mid{text-align:center}
  td.entity{color:#3a3f47}
  td.note{color:#8a6f36;font-size:10.5px}

  tr.data:nth-of-type(even) td{background:var(--zebra)}
  tr.data td.rn{background:var(--gutter)}

  .yes{color:#3f6f52;font-weight:700}
  .no{color:#b3b7bd}
  .clr{display:inline-block;background:var(--greenlt);color:#2f6a4a;font-size:9.5px;font-weight:700;
    letter-spacing:.4px;padding:1px 7px;border-radius:3px;border:1px solid #cbe0d0}
  .hold{display:inline-block;background:var(--amberbg);color:var(--amber);font-size:9.5px;font-weight:700;
    letter-spacing:.4px;padding:1px 7px;border-radius:3px;border:1px solid #ecd7a6}
  td.fresh{background:#eef7e6!important;box-shadow:inset 0 0 0 1px #bcd9a8}

  .tabs{height:26px;background:#eef0f1;border-top:1px solid #d9dbdf;
    display:flex;align-items:flex-end;padding:0 8px;gap:2px}
  .tab{font-size:11px;padding:4px 14px;color:#7c818a;border:1px solid transparent;border-bottom:none}
  .tab.on{background:#ffffff;color:var(--green);font-weight:600;
    border-color:#d9dbdf;border-top:2px solid var(--green);border-radius:2px 2px 0 0}
  .status{height:22px;background:#f5f6f7;border-top:1px solid #e2e4e7;
    display:flex;align-items:center;justify-content:space-between;padding:0 12px;
    font-size:10px;color:#9aa0a8}
  .status .conf{letter-spacing:.4px}

  .hint{margin-top:14px;color:#5c626c;font-size:11px;max-width:1080px}
</style>
</head>
<body>
<div class="page">

  <div class="ctx">
    <b>Sabrina's working file</b>
    <span class="pill">NDA / release log</span>
    Wednesday, Block 9 &nbsp; | &nbsp; who has signed and who is cleared to receive the book
  </div>

  <div class="xl">

    <div class="titlebar">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="fname">Project_Kestrel_NDA_Log<span class="xlsx">.xlsx</span></span>
      <span class="mark">CONFIDENTIAL &middot; INTERNAL WORKING FILE</span>
    </div>

    <div class="menubar">
      <span class="m on">Home</span>
      <span class="m">Insert</span>
      <span class="m">Data</span>
      <span class="m">Review</span>
      <span class="m">View</span>
    </div>

    <div class="fbar">
      <span class="namebox">G5</span>
      <span class="fx">fx</span>
      <span class="fcontent">Stonefield Capital Fund IV LP</span>
    </div>

    <table class="grid">
      <colgroup>
        <col style="width:30px"><col style="width:30px"><col style="width:180px"><col style="width:78px">
        <col style="width:82px"><col style="width:82px"><col style="width:82px"><col style="width:170px"><col style="width:90px"><col style="width:216px">
      </colgroup>

      <tr class="collet">
        <th class="corner"></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th>
      </tr>

      <tr class="head">
        <td class="rn">1</td>
        <th class="c-num">#</th>
        <th>Counterparty</th>
        <th>Type</th>
        <th class="c-ctr">Teaser sent</th>
        <th class="c-ctr">NDA sent</th>
        <th class="c-ctr">NDA signed</th>
        <th>Signing entity</th>
        <th class="c-ctr">Cleared for CIM</th>
        <th>Notes</th>
      </tr>

      <tr class="data">
        <td class="rn">2</td><td class="cnum">1</td><td class="ctr">Calder Brands Co.</td><td class="type">Strategic</td>
        <td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="yes">Yes</span></td>
        <td class="entity">Calder Brands Co.</td><td class="mid"><span class="clr">Yes</span></td><td class="note">signed clean, parent entity</td>
      </tr>
      <tr class="data">
        <td class="rn">3</td><td class="cnum">2</td><td class="ctr">Northmoor Foods</td><td class="type">Strategic</td>
        <td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="yes">Yes</span></td>
        <td class="entity">Northmoor Foods, Inc.</td><td class="mid"><span class="clr">Yes</span></td><td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">4</td><td class="cnum">3</td><td class="ctr">Ridgeline Partners</td><td class="type">Sponsor</td>
        <td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="no">-</span></td>
        <td class="entity"><span class="no">-</span></td><td class="mid"><span class="no">No</span></td><td class="note">NDA out, awaiting signature</td>
      </tr>
      <tr class="data">
        <td class="rn">5</td><td class="cnum">4</td><td class="ctr fresh">Stonefield Capital</td><td class="type fresh">Sponsor</td>
        <td class="mid fresh"><span class="yes">Yes</span></td><td class="mid fresh"><span class="yes">Yes</span></td><td class="mid fresh"><span class="yes">Yes</span></td>
        <td class="entity fresh">Stonefield Capital Fund IV LP</td><td class="mid fresh"><span class="clr">Yes</span></td>
        <td class="note fresh">signed via Fund IV LP; confirmed correct signing entity, released</td>
      </tr>
      <tr class="data">
        <td class="rn">6</td><td class="cnum">5</td><td class="ctr">Two Rivers Equity</td><td class="type">Sponsor</td>
        <td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="no">-</span></td>
        <td class="entity"><span class="no">-</span></td><td class="mid"><span class="no">No</span></td><td class="note">NDA sent Tue, chasing</td>
      </tr>
      <tr class="data">
        <td class="rn">7</td><td class="cnum">6</td><td class="ctr">Continental Condiments Group</td><td class="type">Strategic</td>
        <td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="no">-</span></td><td class="mid"><span class="no">-</span></td>
        <td class="entity"><span class="no">-</span></td><td class="mid"><span class="no">No</span></td><td class="note">cross-border; NDA to run through their counsel first</td>
      </tr>
      <tr class="data">
        <td class="rn">8</td><td class="cnum">7</td><td class="ctr">Delmarva Sauce Co.</td><td class="type">Strategic</td>
        <td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="no">-</span></td><td class="mid"><span class="no">-</span></td>
        <td class="entity"><span class="no">-</span></td><td class="mid"><span class="no">No</span></td><td class="note">teaser only</td>
      </tr>
      <tr class="data">
        <td class="rn">9</td><td class="cnum">8</td><td class="ctr">Granite Peak Foods</td><td class="type">Strategic</td>
        <td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="no">-</span></td><td class="mid"><span class="no">-</span></td>
        <td class="entity"><span class="no">-</span></td><td class="mid"><span class="no">No</span></td><td class="note">teaser only</td>
      </tr>
      <tr class="data">
        <td class="rn">10</td><td class="cnum">9</td><td class="ctr">Hollis Grove Capital</td><td class="type">Sponsor</td>
        <td class="mid"><span class="yes">Yes</span></td><td class="mid"><span class="no">-</span></td><td class="mid"><span class="no">-</span></td>
        <td class="entity"><span class="no">-</span></td><td class="mid"><span class="no">No</span></td><td class="note">teaser only</td>
      </tr>
    </table>

    <div class="tabs">
      <span class="tab on">NDA log</span>
      <span class="tab">Release log</span>
      <span class="tab">Distribution</span>
    </div>

    <div class="status">
      <span>Ready &nbsp; | &nbsp; 3 signed, 2 NDAs out, 4 teaser only &nbsp; | &nbsp; Stonefield released today</span>
      <span class="conf">Internal working file, Larkin Reed deal team. Not for distribution.</span>
    </div>

  </div>

  <div class="hint">Mock for render-fidelity review only. NDA and release tracking for early buyer outreach; only signed, entity-confirmed parties are cleared to receive the CIM. All names are fictional placeholders. Not wired to anything.</div>
</div>
</body>
</html>
`
