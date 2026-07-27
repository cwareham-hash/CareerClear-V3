// Project Kestrel artifact 13 - BuyerList_Scrub. Self-contained HTML,
// verbatim from content repo artifacts/artifact_13_BuyerList_Scrub.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.

export const artifact13Html = `<!-- artifact 13, Block 11 Wednesday, type excel -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Project Kestrel - Buyer List, senior scrub (working file)</title>
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

  tr.head th{background:var(--green);color:#ffffff;font-weight:600;font-size:11px;
    text-align:left;letter-spacing:.2px;padding:5px 7px;border-color:#2f5941}
  tr.head th.c-num,tr.head th.c-tier{text-align:center}

  tr.tier td.band{background:var(--greenlt);color:var(--greendk);font-weight:700;
    font-size:10.5px;letter-spacing:1px;padding:4px 8px;border-color:#cdddd2}
  tr.tier.flag td.band{background:#f3ede1;color:#7a5a1c;border-color:#e4d9c2}
  tr.tier td.rn{background:#e3ebe5;color:#5f7a68}
  tr.tier.flag td.rn{background:#efe7d7;color:#8a6f36}

  td.cnum{text-align:center;color:#7c818a;width:32px}
  td.company{font-weight:600;color:#2b3038;width:168px}
  td.btype{width:82px;color:#4a4f57}
  td.tier{width:46px;text-align:center;font-weight:600;color:#3a3f47}
  td.rat{width:380px;color:#33383f}
  td.chg{width:190px;font-size:10.5px}
  td.note{width:192px;color:#8a6f36;font-size:10.5px}

  tr.data:nth-of-type(even) td{background:var(--zebra)}
  tr.data td.rn{background:var(--gutter)}

  /* scrub markings */
  tr.add td{background:#eef7e6!important;box-shadow:inset 0 0 0 1px #bcd9a8}
  tr.cut td.company,tr.cut td.rat,tr.cut td.btype,tr.cut td.tier{
    text-decoration:line-through;color:#a2a6ac}
  tr.cut td{background:#f6f2f2!important}
  tr.flagrow td{background:#fbf3e2!important}
  .chg-add{color:#2f6a4a;font-weight:700}
  .chg-cut{color:#b0492e;font-weight:700}
  .chg-flag{color:#9a6a12;font-weight:700}
  .chg-conf{color:#3f6f52;font-weight:600}
  .chg-carry{color:#9aa0a8}

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
    <span class="pill">Buyer list, senior scrub</span>
    Wednesday, Block 11 &nbsp; | &nbsp; Warren and Priya's scrub, adds highlighted, cuts struck, one flagged for Rick
  </div>

  <div class="xl">

    <div class="titlebar">
      <span class="dots"><i class="r"></i><i class="y"></i><i class="g"></i></span>
      <span class="fname">Project_Kestrel_Buyer_List<span class="xlsx">.xlsx</span></span>
      <span class="mark">CONFIDENTIAL &middot; AFTER SENIOR SCRUB</span>
    </div>

    <div class="menubar">
      <span class="m on">Home</span>
      <span class="m">Insert</span>
      <span class="m">Data</span>
      <span class="m">Review</span>
      <span class="m">View</span>
    </div>

    <div class="fbar">
      <span class="namebox">F9</span>
      <span class="fx">fx</span>
      <span class="fcontent">added, senior relationship</span>
    </div>

    <table class="grid">
      <colgroup>
        <col style="width:30px"><col style="width:32px"><col style="width:168px"><col style="width:82px">
        <col style="width:46px"><col style="width:380px"><col style="width:190px"><col style="width:192px">
      </colgroup>

      <tr class="collet">
        <th class="corner"></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th>
      </tr>

      <tr class="head">
        <td class="rn">1</td>
        <th class="c-num">#</th>
        <th>Company</th>
        <th>Buyer type</th>
        <th class="c-tier">Tier</th>
        <th>Rationale</th>
        <th>Change (this pass)</th>
        <th>Flag / note</th>
      </tr>

      <tr class="tier"><td class="rn">2</td><td class="band" colspan="7">TIER 1</td></tr>

      <tr class="data">
        <td class="rn">3</td><td class="cnum">1</td><td class="company">Calder Brands Co.</td><td class="btype">Strategic</td><td class="tier">1</td>
        <td class="rat">Branded-foods house already in the same grocery aisles; owns the shelf and the distribution, highest synergy</td>
        <td class="chg"><span class="chg-carry">carried</span></td><td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">4</td><td class="cnum">2</td><td class="company">Northmoor Foods</td><td class="btype">Strategic</td><td class="tier">1</td>
        <td class="rat">National branded platform, a dozen sauces and dressings in-aisle; folds into trucks they already run</td>
        <td class="chg"><span class="chg-carry">carried</span></td><td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">5</td><td class="cnum">3</td><td class="company">Ridgeline Partners</td><td class="btype">Sponsor</td><td class="tier">1</td>
        <td class="rat">Owns a specialty-food platform with a team that could run Halloran; a fast mover</td>
        <td class="chg"><span class="chg-carry">carried</span></td><td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">6</td><td class="cnum">4</td><td class="company">Stonefield Capital</td><td class="btype">Sponsor</td><td class="tier">1</td>
        <td class="rat">Center-of-plate condiments platform; clean thesis, pays up like a strategic</td>
        <td class="chg"><span class="chg-carry">carried</span></td><td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">7</td><td class="cnum">5</td><td class="company">Two Rivers Equity</td><td class="btype">Sponsor</td><td class="tier">1</td>
        <td class="rat">Food and consumer focus, right check size, already owns a sauces business</td>
        <td class="chg"><span class="chg-carry">carried</span></td><td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">8</td><td class="cnum">6</td><td class="company">Continental Condiments Group</td><td class="btype">Strategic</td><td class="tier">1</td>
        <td class="rat">European condiments group, right size and products; a foreign strategic pays up to enter the U.S.</td>
        <td class="chg"><span class="chg-conf">placement confirmed at scrub</span></td>
        <td class="note">Cross-border: longer diligence and financing, not a first call (note kept)</td>
      </tr>
      <tr class="data add">
        <td class="rn">9</td><td class="cnum">7</td><td class="company">Coleman Brands</td><td class="btype">Strategic</td><td class="tier">1</td>
        <td class="rat">Branded-foods house looking to get into premium condiments; has the shelf space to make it work</td>
        <td class="chg"><span class="chg-add">added, senior relationship</span></td>
        <td class="note">Warren add off relationship, quietly wants premium condiments</td>
      </tr>
      <tr class="data add">
        <td class="rn">10</td><td class="cnum">8</td><td class="company">Brightwater Capital</td><td class="btype">Sponsor</td><td class="tier">1</td>
        <td class="rat">Closed a specialty-foods platform last year; a natural home and a fast process</td>
        <td class="chg"><span class="chg-add">added, senior relationship</span></td>
        <td class="note">Priya add, knows the partner who led that deal</td>
      </tr>
      <tr class="data cut">
        <td class="rn">11</td><td class="cnum">9</td><td class="company">Pemberton Label Foods</td><td class="btype">Strategic</td><td class="tier">1</td>
        <td class="rat">Makes private-label lines for the same major retailers; strong apparent category fit on the screen</td>
        <td class="chg"><span class="chg-cut">cut, Rick's veto, direct competitor</span></td>
        <td class="note">private-label for the same retailers; do not approach</td>
      </tr>

      <tr class="tier"><td class="rn">12</td><td class="band" colspan="7">TIER 2</td></tr>

      <tr class="data">
        <td class="rn">13</td><td class="cnum">10</td><td class="company">Delmarva Sauce Co.</td><td class="btype">Strategic</td><td class="tier">2</td>
        <td class="rat">Right size and makes sauces, but foodservice distribution, not Halloran's grocery aisles; never acquired</td>
        <td class="chg"><span class="chg-carry">carried</span></td><td class="note"></td>
      </tr>
      <tr class="data">
        <td class="rn">14</td><td class="cnum">11</td><td class="company">Granite Peak Foods</td><td class="btype">Strategic</td><td class="tier">2</td>
        <td class="rat">Would want it but can't really pay for it; fills the room, doesn't win it</td>
        <td class="chg"><span class="chg-carry">carried</span></td><td class="note"></td>
      </tr>
      <tr class="data flagrow">
        <td class="rn">15</td><td class="cnum">12</td><td class="company">Kettleman Ingredients</td><td class="btype">Strategic</td><td class="tier">2</td>
        <td class="rat">Ingredients supplier moving downstream into finished product; adjacent today, not a direct competitor yet</td>
        <td class="chg"><span class="chg-flag">flagged pending Rick, borderline competitor</span></td>
        <td class="note">Warren raises with Rick before any outreach</td>
      </tr>

      <tr class="tier"><td class="rn">16</td><td class="band" colspan="7">TIER 3</td></tr>

      <tr class="data cut">
        <td class="rn">17</td><td class="cnum">13</td><td class="company">Ashcombe Partners</td><td class="btype">Sponsor</td><td class="tier">3</td>
        <td class="rat">Large generalist fund, no food platform; optionality only, rounds out the field</td>
        <td class="chg"><span class="chg-cut">cut, generalist, no platform fit</span></td>
        <td class="note">Warren cuts it, no thesis</td>
      </tr>
      <tr class="data">
        <td class="rn">18</td><td class="cnum">14</td><td class="company">Hollis Grove Capital</td><td class="btype">Sponsor</td><td class="tier">3</td>
        <td class="rat">Adjacency is beverages and snacks, not center-of-plate; softer fit, kept low</td>
        <td class="chg"><span class="chg-conf">placement confirmed at scrub</span></td><td class="note"></td>
      </tr>

      <tr class="tier flag"><td class="rn">19</td><td class="band" colspan="7">NOT TIERED - HELD</td></tr>

      <tr class="data">
        <td class="rn">20</td><td class="cnum">15</td><td class="company">Harvest Table Dressings</td><td class="btype">Strategic</td><td class="tier"><span style="color:#b3b7bd">-</span></td>
        <td class="rat">Sponsor-owned; re-approach as a possible sponsor-backed add-on, a different call for a different day</td>
        <td class="chg"><span class="chg-carry">held pending re-approach</span></td>
        <td class="note">held out of tiers</td>
      </tr>
    </table>

    <div class="tabs">
      <span class="tab on">Strategics + Sponsors</span>
      <span class="tab">Scrub notes</span>
      <span class="tab">Contacts</span>
    </div>

    <div class="status">
      <span>Ready &nbsp; | &nbsp; 13 carried, 2 added, 2 cut, 1 flagged &nbsp; | &nbsp; scrub with Warren and Priya</span>
      <span class="conf">Internal working file, Larkin Reed deal team. Not for distribution.</span>
    </div>

  </div>

  <div class="hint">Mock for render-fidelity review only. Buyer list after the senior scrub; adds highlighted, cuts struck through, one name flagged pending Rick. All company and fund names are fictional placeholders. Not wired to anything.</div>
</div>
</body>
</html>
`
