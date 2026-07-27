// Project Kestrel artifact 12 - RunningStatus. Self-contained HTML,
// verbatim from content repo artifacts/artifact_12_RunningStatus.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.

export const artifact12Html = `<!-- artifact 12, Block 10 Wednesday, type onenote (OneNote-style) -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kestrel status / to-do</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:#d7d5db;
    font-family:'Segoe UI',Calibri,Arial,Helvetica,sans-serif;color:#33333a;
    -webkit-font-smoothing:antialiased}
  .wrap{padding:24px 16px 34px}

  /* ---------------- OneNote app frame ---------------- */
  .app{width:820px;margin:0 auto;background:#fff;border:1px solid #c3bece;
    box-shadow:0 10px 30px rgba(40,30,55,.20);overflow:hidden}

  /* purple app bar */
  .bar{height:34px;background:#7719aa;display:flex;align-items:center;padding:0 14px;gap:9px}
  .bar .nb{color:#f2e9f7;font-size:12.5px;font-weight:600;letter-spacing:.2px}
  .bar .nbcaret{color:#d9c2e8;font-size:10px}
  .bar .dots{margin-left:auto;display:flex;gap:6px}
  .bar .dots i{width:9px;height:9px;border-radius:50%;display:inline-block;background:#9a4bc4}

  /* section tabs */
  .tabs{display:flex;align-items:flex-end;background:#efe9f4;padding:6px 12px 0;gap:3px}
  .tab{font-size:12.5px;padding:6px 16px;color:#836f92;background:#e2d7ec;
    border-radius:4px 4px 0 0}
  .tab.on{background:#7719aa;color:#fff;font-weight:700}
  .accent{height:3px;background:#7719aa}

  /* content: page-list rail + page */
  .content{display:flex;min-height:1006px}
  .rail{width:160px;flex:0 0 160px;background:#faf8fc;border-right:1px solid #ece5f2;padding:12px 0}
  .rail .rlabel{font-size:10px;letter-spacing:.6px;color:#a99cb5;text-transform:uppercase;
    padding:0 14px 8px;font-weight:600}
  .pg{font-size:12.5px;color:#5c5763;padding:7px 14px;border-left:3px solid transparent;line-height:1.3}
  .pg.on{background:#efe6f5;color:#4a2f63;border-left-color:#7719aa;font-weight:600}

  .page{flex:1 1 auto;background:#fff;padding:26px 34px 40px}
  .ptitle{font-size:27px;font-weight:400;color:#33333a;letter-spacing:.2px;line-height:1.15}
  .ptime{font-size:12px;color:#9aa0a8;margin-top:5px;margin-bottom:4px}

  .sh{font-size:14.5px;font-weight:700;color:#4a4650;margin:17px 0 3px}
  .sh:first-of-type{margin-top:10px}

  .todo{display:flex;gap:9px;align-items:flex-start;padding:3px 0;
    font-size:13.5px;line-height:1.45;color:#3a3a42}
  .todo .tx{flex:1 1 auto}
  .todo.done .tx{color:#9a9ea6}

  /* hand-drawn CSS checkboxes */
  .cb{display:inline-block;width:14px;height:14px;border:1.5px solid #b0aab8;border-radius:2px;
    position:relative;flex:0 0 auto;margin-top:2px;background:#fff}
  .cb.done{border-color:#8a7f95;background:#f4eff8}
  .cb.done:after{content:"";position:absolute;left:4px;top:0px;width:4px;height:8px;
    border:solid #6a4a86;border-width:0 2px 2px 0;transform:rotate(45deg)}

  /* highlighter */
  .hl{background:#fdf19f;padding:0 3px;border-radius:1px}
</style>
</head>
<body>
<div class="wrap">
  <div class="app">

    <div class="bar">
      <span class="nb">My Notebook</span>
      <span class="nbcaret">&#9662;</span>
      <span class="dots"><i></i><i></i><i></i></span>
    </div>

    <div class="tabs">
      <span class="tab on">Kestrel</span>
      <span class="tab">Pipeline</span>
      <span class="tab">Personal</span>
    </div>
    <div class="accent"></div>

    <div class="content">
      <div class="rail">
        <div class="rlabel">Pages</div>
        <div class="pg on">running status</div>
        <div class="pg">meeting notes</div>
        <div class="pg">buyer list scratch</div>
      </div>

      <div class="page">
        <div class="ptitle">Kestrel status / to-do</div>
        <div class="ptime">Wednesday, 9:52 AM</div>

        <div class="sh">book</div>
        <div class="todo done"><span class="cb done"></span><span class="tx">exec summary re-cut to lead w/ demand, cleared Priya</span></div>
        <div class="todo done"><span class="cb done"></span><span class="tx">financials + adj EBITDA bridge, add-backs all have their reason, ties to model</span></div>
        <div class="todo done"><span class="cb done"></span><span class="tx">growth section ranked, pricing broken out separate</span></div>
        <div class="todo done"><span class="cb done"></span><span class="tx">risk factors drafted, each w/ a mitigant</span></div>
        <div class="todo done"><span class="cb done"></span><span class="tx">market section pulled fwd, x-refs chased</span></div>
        <div class="todo"><span class="cb"></span><span class="tx">book up w/ Priya, going to Warren today. client only sees Warren's cleared version tmrw</span></div>

        <div class="sh">model</div>
        <div class="todo done"><span class="cb done"></span><span class="tx">Marisol's updated schedule pushed thru Tue night, cascade chased to the book</span></div>
        <div class="todo done"><span class="cb done"></span><span class="tx">2 hardcoded subtotals caught + re-linked</span></div>
        <div class="todo"><span class="cb"></span><span class="tx">one figure still provisional off a draft schedule, re-confirm when the final lands</span></div>

        <div class="sh">buyer list</div>
        <div class="todo done"><span class="cb done"></span><span class="tx">first pass tiered + tightened, ~dozen names, a reason next to each</span></div>
        <div class="todo"><span class="cb"></span><span class="tx">most tier 1 contacts found, couple left blank (don't guess)</span></div>
        <div class="todo"><span class="cb"></span><span class="tx"><span class="hl">TODAY: scrub w/ Warren + Priya this afternoon</span></span></div>

        <div class="sh">trackers / data room</div>
        <div class="todo done"><span class="cb done"></span><span class="tx">customer contracts in + indexed to the data room (Mon)</span></div>
        <div class="todo done"><span class="cb done"></span><span class="tx">new NDA signer logged, subsidiary entity confirmed, release status updated</span></div>
        <div class="todo"><span class="cb"></span><span class="tx">draft of top-acct contract held out of the room. flagged Danny, ask Marisol if a signed version exists</span></div>
        <div class="todo"><span class="cb"></span><span class="tx">still owe Marisol: updated schedules, supplier agreement, org chart</span></div>
        <div class="todo done"><span class="cb done"></span><span class="tx">confirmed none of the outstanding stuff blocks the book going to client tmrw</span></div>

        <div class="sh">tmrw (client session)</div>
        <div class="todo"><span class="cb"></span><span class="tx"><span class="hl">Warren clears the book tonight, client sees only the blessed version</span></span></div>
        <div class="todo"><span class="cb"></span><span class="tx">know the growth section + adj EBITDA bridge cold</span></div>

      </div>
    </div>

  </div>
</div>
</body>
</html>
`
