// Project Kestrel artifact 05 - BuyerList. Self-contained HTML,
// verbatim from content repo artifacts/artifact_05_BuyerList.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.

export const artifact05Html = `<!-- artifact 5, Block 3 Monday, type excel -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Project Kestrel - Buyer List (working file)</title>
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

  /* ---------------- spreadsheet window ---------------- */
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

  /* ---------------- the grid ---------------- */
  table.grid{width:1120px;border-collapse:collapse;table-layout:fixed}
  table.grid td,table.grid th{border:1px solid var(--line);vertical-align:top;
    padding:3px 7px;font-size:11px;line-height:1.28;overflow:hidden}

  /* column-letter header */
  tr.collet th{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    font-weight:600;text-align:center;height:18px;font-size:10.5px;padding:0}
  th.corner{background:#e2e4e7}

  /* row-number gutter */
  td.rn{background:var(--gutter);border-color:var(--gutterln);color:#8b9098;
    text-align:center;font-size:10px;font-weight:600;padding:3px 0;width:30px}

  /* frozen header row */
  tr.head th{background:var(--green);color:#ffffff;font-weight:600;font-size:11px;
    text-align:left;letter-spacing:.2px;padding:5px 7px;border-color:#2f5941}
  tr.head th.c-num,tr.head th.c-tier{text-align:center}

  /* tier band rows */
  tr.tier td.band{background:var(--greenlt);color:var(--greendk);font-weight:700;
    font-size:10.5px;letter-spacing:1px;padding:4px 8px;border-color:#cdddd2}
  tr.tier.flag td.band{background:#f3ede1;color:#7a5a1c;border-color:#e4d9c2}
  tr.tier td.rn{background:#e3ebe5;color:#5f7a68}
  tr.tier.flag td.rn{background:#efe7d7;color:#8a6f36}

  /* data cells */
  td.cnum{text-align:center;color:#7c818a;width:32px}
  td.company{font-weight:600;color:#2b3038;width:150px}
  td.btype{width:82px;color:#4a4f57}
  td.tier{width:42px;text-align:center;font-weight:600;color:#3a3f47}
  td.rat{width:448px;color:#33383f}
  td.contact{width:160px;color:#3a3f47}
  td.note{width:176px;color:#8a6f36;font-size:10.5px}

  tr.data:nth-of-type(even) td{background:var(--zebra)}
  tr.data td.rn{background:var(--gutter)}

  .found{color:#4a7c59;font-style:italic}
  .dash{color:#b3b7bd}

  /* selected cell */
  td.sel{outline:2px solid var(--green);outline-offset:-2px;background:#eef4f0!important}

  /* ---------------- sheet tabs + status ---------------- */
  .tabs{height:26px;background:#eef0f1;border-top:1px solid #d9dbdf;
    display:flex;align-items:flex-end;padding:0 8px;gap:2px}
  .tab{font-size:11px;padding:4px 14px;color:#7c818a;border:1px solid transparent;
    border-bottom:none}
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
    <span class="pill">Buyer list, first pass</span>
    Monday, Block 3 &nbsp; | &nbsp; names in tiers with a one-line rationale, some contacts found, the rest left blank on purpose
  </div>

  <div class="xl">

    <div class="titlebar">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="fname">Project_Kestrel_Buyer_List<span class="xlsx">.xlsx</span></span>
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
      <span class="namebox">E3</span>
      <span class="fx">fx</span>
      <span class="fcontent">Branded-foods house already in the same grocery aisles; owns the shelf and the distribution, highest synergy</span>
    </div>

    <table class="grid">
      <colgroup>
        <col style="width:30px">
        <col style="width:32px">
        <col style="width:150px">
        <col style="width:82px">
        <col style="width:42px">
        <col style="width:448px">
        <col style="width:160px">
        <col style="width:176px">
      </colgroup>

      <!-- column letters -->
      <tr class="collet">
        <th class="corner"></th>
        <th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th>
      </tr>

      <!-- header row (sheet row 1) -->
      <tr class="head">
        <td class="rn">1</td>
        <th class="c-num">#</th>
        <th>Company</th>
        <th>Buyer type</th>
        <th class="c-tier">Tier</th>
        <th>Rationale</th>
        <th>First contact</th>
        <th>Flag / note</th>
      </tr>

      <!-- TIER 1 -->
      <tr class="tier"><td class="rn">2</td><td class="band" colspan="7">TIER 1</td></tr>

      <tr class="data">
        <td class="rn">3</td>
        <td class="cnum">1</td>
        <td class="company">Calder Brands Co.</td>
        <td class="btype">Strategic</td>
        <td class="tier">1</td>
        <td class="rat sel">Branded-foods house already in the same grocery aisles; owns the shelf and the distribution, highest synergy</td>
        <td class="contact">R. Halstead, Head of Corp Dev</td>
        <td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">4</td>
        <td class="cnum">2</td>
        <td class="company">Northmoor Foods</td>
        <td class="btype">Strategic</td>
        <td class="tier">1</td>
        <td class="rat">National branded platform, a dozen sauces and dressings in-aisle; folds into trucks they already run</td>
        <td class="contact">J. Okafor, CFO</td>
        <td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">5</td>
        <td class="cnum">3</td>
        <td class="company">Ridgeline Partners</td>
        <td class="btype">Sponsor</td>
        <td class="tier">1</td>
        <td class="rat">Owns a specialty-food platform with a team that could run Halloran; a fast mover</td>
        <td class="contact"><span class="found">found</span></td>
        <td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">6</td>
        <td class="cnum">4</td>
        <td class="company">Stonefield Capital</td>
        <td class="btype">Sponsor</td>
        <td class="tier">1</td>
        <td class="rat">Center-of-plate condiments platform; clean thesis, pays up like a strategic</td>
        <td class="contact"><span class="found">found</span></td>
        <td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">7</td>
        <td class="cnum">5</td>
        <td class="company">Two Rivers Equity</td>
        <td class="btype">Sponsor</td>
        <td class="tier">1</td>
        <td class="rat">Food and consumer focus, right check size, already owns a sauces business</td>
        <td class="contact"></td>
        <td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">8</td>
        <td class="cnum">6</td>
        <td class="company">Continental Condiments Group</td>
        <td class="btype">Strategic</td>
        <td class="tier">1</td>
        <td class="rat">European condiments group, right size and products; a foreign strategic pays up to enter the U.S.</td>
        <td class="contact"></td>
        <td class="note">Cross-border: longer diligence and financing, not a first call</td>
      </tr>
      <tr class="data">
        <td class="rn">9</td>
        <td class="cnum">7</td>
        <td class="company">Pemberton Label Foods</td>
        <td class="btype">Strategic</td>
        <td class="tier">1</td>
        <td class="rat">Makes private-label lines for the same major retailers; strong apparent category fit and synergy on the screen.</td>
        <td class="contact"></td>
        <td class="note"></td>
      </tr>

      <!-- TIER 2 -->
      <tr class="tier"><td class="rn">10</td><td class="band" colspan="7">TIER 2</td></tr>

      <tr class="data">
        <td class="rn">11</td>
        <td class="cnum">8</td>
        <td class="company">Delmarva Sauce Co.</td>
        <td class="btype">Strategic</td>
        <td class="tier">2</td>
        <td class="rat">Right size and makes sauces, but foodservice distribution, not Halloran's grocery aisles; never acquired</td>
        <td class="contact"></td>
        <td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">12</td>
        <td class="cnum">9</td>
        <td class="company">Granite Peak Foods</td>
        <td class="btype">Strategic</td>
        <td class="tier">2</td>
        <td class="rat">Would want it but can't really pay for it; fills the room, doesn't win it</td>
        <td class="contact"></td>
        <td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">13</td>
        <td class="cnum">10</td>
        <td class="company">Kettleman Ingredients</td>
        <td class="btype">Strategic</td>
        <td class="tier">2</td>
        <td class="rat">Ingredients supplier moving downstream into finished product; adjacent today, not a direct competitor yet.</td>
        <td class="contact"></td>
        <td class="note">Borderline, heading toward competitor; confirm before any outreach.</td>
      </tr>

      <!-- TIER 3 -->
      <tr class="tier"><td class="rn">14</td><td class="band" colspan="7">TIER 3</td></tr>

      <tr class="data">
        <td class="rn">15</td>
        <td class="cnum">11</td>
        <td class="company">Ashcombe Partners</td>
        <td class="btype">Sponsor</td>
        <td class="tier">3</td>
        <td class="rat">Large generalist fund, no food platform; optionality only, rounds out the field</td>
        <td class="contact"></td>
        <td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">16</td>
        <td class="cnum">12</td>
        <td class="company">Hollis Grove Capital</td>
        <td class="btype">Sponsor</td>
        <td class="tier">3</td>
        <td class="rat">Adjacency is beverages and snacks, not center-of-plate; softer fit, kept low</td>
        <td class="contact"></td>
        <td class="note"></td>
      </tr>

      <!-- NOT TIERED -->
      <tr class="tier flag"><td class="rn">17</td><td class="band" colspan="7">NOT TIERED - FLAGGED</td></tr>

      <tr class="data">
        <td class="rn">18</td>
        <td class="cnum">13</td>
        <td class="company">Harvest Table Dressings</td>
        <td class="btype">Strategic</td>
        <td class="tier"><span class="dash">-</span></td>
        <td class="rat">Looked like a Tier 1 on the screen; ownership check shows it is sponsor-owned; move to a possible sponsor-backed add-on, a different call for a different day</td>
        <td class="contact"><span class="dash">-</span></td>
        <td class="note">Held out of tiers pending re-approach</td>
      </tr>
    </table>

    <div class="tabs">
      <span class="tab on">Strategics + Sponsors</span>
      <span class="tab">Contacts</span>
      <span class="tab">Notes</span>
    </div>

    <div class="status">
      <span>Ready &nbsp; | &nbsp; 13 names &nbsp; | &nbsp; first pass, not final</span>
      <span class="conf">Internal working file, Larkin Reed deal team. Not for distribution.</span>
    </div>

  </div>

  <div class="hint">Mock for render-fidelity review only. Internal buyer list, first pass; some first contacts found, the rest left as TBD on purpose. All company and fund names are fictional placeholders. Not wired to anything.</div>
</div>
</body>
</html>
`
