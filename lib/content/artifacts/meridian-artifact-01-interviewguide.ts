// Meridian Park artifact 01 - InterviewGuide. Self-contained HTML,
// verbatim from content repo artifacts/artifact_01_InterviewGuide.html. Do not edit the markup.
// Rendered in a sandboxed iframe by components/simulation/HtmlArtifact.tsx.
// Manifest type onenote, which the app renders at document width. Placement: Block 3, Interview prep, Monday.

export const meridianArtifact01Html = `<!-- artifact 1, Block 3 Monday, type onenote (OneNote-style, document width) -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Investor discussion guide - week 3 fieldwork</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:#d7d5db;font-family:'Segoe UI',Calibri,Arial,Helvetica,sans-serif;
    color:#33333a;-webkit-font-smoothing:antialiased}
  .wrap{padding:24px 16px 34px}
  .app{width:880px;margin:0 auto;background:#fff;border:1px solid #c3bece;
    box-shadow:0 10px 30px rgba(40,30,55,.20);overflow:hidden}

  .bar{height:34px;background:#7719aa;display:flex;align-items:center;padding:0 14px;gap:9px}
  .bar .nb{color:#f2e9f7;font-size:12.5px;font-weight:600;letter-spacing:.2px}
  .bar .nbcaret{color:#d9c2e8;font-size:10px}
  .bar .dots{margin-left:auto;display:flex;gap:6px}
  .bar .dots i{width:9px;height:9px;border-radius:50%;display:inline-block;background:#9a4bc4}

  .tabs{display:flex;align-items:flex-end;background:#efe9f4;padding:6px 12px 0;gap:3px}
  .tab{font-size:12.5px;padding:6px 16px;color:#836f92;background:#e2d7ec;border-radius:4px 4px 0 0}
  .tab.on{background:#7719aa;color:#fff;font-weight:700}
  .accent{height:3px;background:#7719aa}

  .content{display:flex;min-height:1180px}
  .rail{width:168px;flex:0 0 168px;background:#faf8fc;border-right:1px solid #ece5f2;padding:12px 0}
  .rail .rlabel{font-size:10px;letter-spacing:.06em;color:#a99cb5;text-transform:uppercase;
    padding:0 14px 8px;font-weight:600}
  .pg{font-size:12.5px;color:#5c5763;padding:7px 14px;border-left:3px solid transparent;line-height:1.3}
  .pg.on{background:#efe6f5;color:#4a2f63;border-left-color:#7719aa;font-weight:600}

  .page{flex:1 1 auto;background:#fff;padding:26px 34px 44px}
  .eng{font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#8d8397;font-weight:700}
  .ptitle{font-size:26px;font-weight:400;color:#33333a;letter-spacing:.2px;line-height:1.2;margin-top:6px}
  .pmeta{display:flex;gap:18px;flex-wrap:wrap;font-size:11.5px;color:#8f95a0;
    margin-top:8px;padding-bottom:11px;border-bottom:1px solid #ece5f2}
  .pmeta .k{color:#b3aabd}
  .conf{margin-top:10px;font-size:10.5px;color:#7a6a86;background:#f7f3fa;
    border-left:3px solid #b58fd0;padding:7px 11px;line-height:1.5}

  .hyp{margin:16px 0 4px;background:#f4f1f8;border:1px solid #ddd2e8;padding:13px 16px}
  .hyp .hl{font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:#7719aa;
    font-weight:700;margin-bottom:5px}
  .hyp p{font-size:13px;line-height:1.55;color:#3a3542}

  .disc{margin:14px 0 4px;background:#fffdf4;border:1px solid #e7dcae;padding:12px 16px}
  .disc .hl{font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:#94781f;
    font-weight:700;margin-bottom:6px}
  .disc li{font-size:12.5px;line-height:1.55;color:#3d3830;margin:0 0 4px 16px}

  h3.sh{font-size:15px;font-weight:700;color:#4a4650;margin:20px 0 3px;
    display:flex;align-items:baseline;gap:9px}
  h3.sh .tm{font-size:11px;font-weight:600;color:#9a90a5;letter-spacing:.02em}
  .body{font-size:13px;line-height:1.6;color:#3a3a42}
  .body ul{margin:4px 0 0 18px}
  .body li{margin-bottom:4px}
  .body li ul{margin-top:3px}
  .say{background:#f6f6f8;border-left:3px solid #b0aab8;padding:9px 13px;margin:7px 0 4px;
    font-size:12.5px;line-height:1.6;color:#4a4650;font-style:italic}
  .say b{font-style:normal;color:#33333a}

  .code{display:inline-block;background:#e6efee;color:#2d6a63;font-size:9.5px;font-weight:700;
    letter-spacing:.05em;padding:1px 6px;border:1px solid #c5dcd9;margin-left:5px;
    vertical-align:1px}
  .q{color:#6f6a78}

  table.tail{border-collapse:collapse;width:100%;margin-top:8px}
  table.tail th{background:#efe9f4;color:#4a2f63;font-size:11px;text-align:left;
    padding:6px 9px;border:1px solid #ddd2e8;font-weight:700}
  table.tail td{border:1px solid #e6def0;padding:6px 9px;font-size:12px;color:#3a3a42;
    vertical-align:top;line-height:1.5}
  table.tail td.n{text-align:center;color:#7719aa;font-weight:700;width:38px}

  .todo{display:flex;gap:9px;align-items:flex-start;padding:3px 0;
    font-size:12.5px;line-height:1.5;color:#3a3a42}
  .cb{display:inline-block;width:14px;height:14px;border:1.5px solid #b0aab8;border-radius:2px;
    flex:0 0 auto;margin-top:2px;background:#fff}
  .foot{margin-top:22px;padding-top:11px;border-top:1px solid #ece5f2;
    font-size:10.5px;color:#9a90a5;line-height:1.55}
</style>
</head>
<body>
<div class="wrap">
  <div class="app">

    <div class="bar">
      <span class="nb">Meridian Park Investor Platform Assessment</span>
      <span class="nbcaret">&#9662;</span>
      <span class="dots"><i></i><i></i><i></i></span>
    </div>

    <div class="tabs">
      <span class="tab on">Fieldwork</span>
      <span class="tab">Interview notes</span>
      <span class="tab">Synthesis</span>
      <span class="tab">Admin</span>
    </div>
    <div class="accent"></div>

    <div class="content">
      <div class="rail">
        <div class="rlabel">Pages</div>
        <div class="pg on">discussion guide</div>
        <div class="pg">slate and scheduling</div>
        <div class="pg">base guide (weeks 1 to 2)</div>
        <div class="pg">quotes to keep</div>
      </div>

      <div class="page">
        <div class="eng">Meridian Park Investor Platform Assessment</div>
        <div class="ptitle">Investor discussion guide</div>
        <div class="pmeta">
          <span><span class="k">Version</span> week 3 fieldwork</span>
          <span><span class="k">Owner</span> Carly</span>
          <span><span class="k">Format</span> semi-structured, roughly 30 minutes per call</span>
          <span><span class="k">Interviewee</span> <span class="q">(per call)</span></span>
        </div>
        <div class="conf">Internal working document. Not for distribution. Nothing said in these calls
          is attributed to an individual; everything is synthesized into themes and recommendations
          for Meridian.</div>

        <div class="hyp">
          <div class="hl">Working hypothesis this guide tests</div>
          <p>The portal delivers accurate data but leaves the last mile, the finished output the
             investor actually needs, to the investor, and the shape of that last mile differs by
             investor type (document-led versus data-led).</p>
        </div>

        <div class="disc">
          <div class="hl">Interviewer discipline</div>
          <ul>
            <li>Open broad, then narrow. The first answer should be theirs, not ours.</li>
            <li>Do not hand them the answer. The fork question stays open: when the portal gets you to
                accurate data and then stops, what were you trying to produce, and who was it for?</li>
            <li>Ask the benchmark neutrally. Where do your <i>other</i> managers sit, not your
                <i>better</i> managers. Do not plant a comparison that may not exist.</li>
            <li>Every gap gets its cost question. The number is what lets a finding survive a room.</li>
          </ul>
        </div>

        <h3 class="sh">1. Framing and permission <span class="tm">about 3 minutes</span></h3>
        <div class="body">
          <ul>
            <li>Thank them, and acknowledge the busy season (quarter-end or statutory filing).</li>
            <li>Scope: an outside read on how the portal works for the investors who use it.</li>
            <li>Confidentiality, said aloud rather than summarized:</li>
          </ul>
          <div class="say"><b>Say:</b> "Nothing you tell me will be attributed to you individually.
            Everything goes into themes and recommendations for Meridian, so you can be as direct as
            you like."</div>
          <ul>
            <li>Time check and hard stop.</li>
          </ul>
        </div>

        <h3 class="sh">2. Warm-up, the person then the institution <span class="tm">about 5 minutes</span></h3>
        <div class="body">
          <ul>
            <li>Their role, tenure, and what they oversee. Confirm the title even if known.</li>
            <li>The institution and what they are investing toward.</li>
            <li>How long with Meridian, and in what product or allocation.</li>
          </ul>
        </div>

        <h3 class="sh">3. Core, portal usage and where it falls short <span class="tm">about 20 minutes</span></h3>
        <div class="body">
          <ul>
            <li>How and how often do they use the portal? When is it tested hardest (the reporting cycle)?</li>
            <li>Where does it work well? (Credit the accurate data; it earns trust for the rest.)</li>
            <li>Where does it create work? Open broad, then narrow to specifics.</li>
            <li>Probe each gap, and pair each with the quantification follow-up:
              <ul>
                <li>Consolidated capital activity<span class="code">CR</span> can they pull a period's
                    calls and distributions in one clean view, or do they assemble it? Who does the
                    assembly? <i>Quantify: how much analyst time per quarter?</i></li>
                <li>Document search and retrieval<span class="code">DS</span> can they self-serve a
                    specific past statement or notice, or go back to a person?
                    <i>Quantify: how often, and how long to get it?</i></li>
                <li>Onboarding and subscription<span class="code">OB</span> how does the paperwork go on
                    a new fund? Does anything carry across?
                    <i>Quantify: how many funds, how many times re-submitted?</i></li>
                <li>Notifications<span class="code">NT</span> how do they find out a call or document
                    has posted? Has a late notice ever cost them? What would actually help?</li>
              </ul>
            </li>
            <li>When the portal falls short, what is the finished thing they actually needed?
              <ul>
                <li>If document-led (pension, endowment, foundation): is the missing piece a board-ready
                    or committee-ready report?</li>
                <li>If data-led (insurer)<span class="code">DF</span> is the missing piece structured
                    data or a feed into their own systems for statutory, regulatory-capital, or
                    asset-liability work? Probe look-through detail on holdings for capital charges.</li>
              </ul>
            </li>
          </ul>
        </div>

        <h3 class="sh">4. Benchmark <span class="tm">about 5 minutes</span></h3>
        <div class="body">
          <ul>
            <li>One to ten, where does Meridian land? Where do their other managers sit?</li>
            <li>If there are managers you think are doing better, what are they doing that Meridian is not?</li>
          </ul>
        </div>

        <h3 class="sh">5. Wrap <span class="tm">about 3 minutes</span></h3>
        <div class="body">
          <ul>
            <li>Anything we should have asked? Anything on their mind?</li>
            <li>Note that Meridian is actively working to improve, that their feedback is valued and
                taken seriously, and thank them for their time.</li>
            <li>Thanks.</li>
          </ul>
        </div>

        <h3 class="sh">Tailoring to this week's slate</h3>
        <table class="tail">
          <tr><th style="width:38px"></th><th>Investor type</th><th>Lean on</th><th>Expect</th></tr>
          <tr>
            <td class="n">3</td>
            <td>Corporate pensions and endowment</td>
            <td>The board-ready and committee-ready probes.</td>
            <td>Document-led. The missing piece is a finished report.</td>
          </tr>
          <tr>
            <td class="n">2</td>
            <td>Insurers (one life, one property and casualty)</td>
            <td>The data-feed and look-through probes.</td>
            <td>Data-led, and a wider score spread. The downstream work is regulatory.</td>
          </tr>
          <tr>
            <td class="n">2</td>
            <td>Sovereign wealth allocator and large family office</td>
            <td>Open on usage and let them set the frame before narrowing.</td>
            <td>First of either type on the slate. They may take things in a different direction than
                the pensions and insurers have.</td>
          </tr>
        </table>

        <h3 class="sh">After the call, before the next one</h3>
        <div class="body">
          <div class="todo"><span class="cb"></span><span>Code the five gap flags while the call is fresh.</span></div>
          <div class="todo"><span class="cb"></span><span>Capture the Meridian score and the best other manager score.</span></div>
          <div class="todo"><span class="cb"></span><span>Harvest any number offered, and label it as their estimate.</span></div>
          <div class="todo"><span class="cb"></span><span>Flag where a number was not given rather than guessing at one.</span></div>
          <div class="todo"><span class="cb"></span><span>Note the last-mile shape in their own words.</span></div>
          <div class="todo"><span class="cb"></span><span>Mark the quotes worth keeping before the wording fades.</span></div>
        </div>

        <div class="foot">
          Guide tailored from the base version for week 3 fieldwork. The base guide is on its own page
          in this section.
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
`
