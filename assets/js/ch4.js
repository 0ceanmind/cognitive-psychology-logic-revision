/* =========================================================
   Chapter 4 — Memory: Learning, Memory and Forgetting
   Source: ATM00201 Chapter 4 lecture deck (Semester A 2026-27)
   ========================================================= */
(function () {
  const I = Deck.icon;
  const css = document.createElement('style');
  css.textContent = `
  .c4-opener { justify-content:center; }
  .c4-opener .c4-bignum { font-size:420px; font-weight:800; letter-spacing:-.06em; line-height:.8; color:transparent; -webkit-text-stroke:3px var(--accent); position:absolute; right:110px; top:150px; opacity:.9; }
  .c4-opener h1 { font-size:128px; max-width:1300px; }
  .c4-topics { display:flex; flex-wrap:wrap; gap:14px; margin-top:54px; max-width:1300px; }
  .c4-ico { width:56px; height:56px; color:var(--accent); flex:none; display:inline-block; vertical-align:middle; }
  .c4-ico.sm { width:40px; height:40px; }
  .c4-ico.lg { width:76px; height:76px; }

  /* what is memory */
  .c4-ers { display:grid; grid-template-columns:1fr 70px 1fr 70px 1fr; align-items:stretch; }
  .c4-ers .card { padding:36px; transition: all .6s var(--ease); }
  .c4-ers .card.lit { border-color:var(--accent); background:var(--accent-soft); transform:translateY(-8px); box-shadow:0 30px 80px -30px var(--accent); }
  .c4-ers .card h3 { font-size:44px; margin:18px 0 10px; }
  .c4-ers .card p { font-size:29px; }
  .c4-ers .c4-arr { align-self:center; justify-self:center; width:52px; height:52px; color:var(--accent); }
  .c4-bday { display:inline-flex; align-items:center; gap:12px; margin-top:22px; padding:12px 20px; border-radius:16px; background:var(--surface-2); font-size:26px; font-weight:600; color:var(--accent); line-height:1.3; }

  /* multi-store */
  .c4-ms svg { width:100%; height:100%; overflow:visible; }
  .c4-ms .bx rect { stroke-width:2.5; }
  .c4-ms .lbl { font-size:28px; font-weight:650; fill:var(--text); }
  .c4-ms .sub { font-size:23px; fill:var(--muted); }
  .c4-ms .arrlbl { font-size:24px; font-weight:650; fill:var(--accent); }
  .c4-ms .loss { font-size:22px; fill:var(--red); font-style:italic; }

  /* sensory */
  .c4-sens .card { padding:30px 34px; }
  .c4-sens canvas { width:100%; height:150px; display:block; border-radius:16px; background:#05050a; margin-top:14px; }
  .c4-sper { display:flex; flex-direction:column; align-items:center; gap:16px; padding:28px 32px; }
  .c4-grid { display:grid; grid-template-columns:repeat(4, 84px); gap:6px 22px; padding:22px 36px; border-radius:24px; background:#05050a; border:1px solid var(--line); position:relative; align-content:center; }
  .c4-grid span { font-family:var(--mono); font-size:60px; font-weight:700; text-align:center; color:#fff; transition:opacity .15s, color .3s; }
  .c4-grid.off span { opacity:0; }
  .c4-grid span.cued { color:var(--accent); }
  .c4-grid .c4-cue { position:absolute; left:-58px; width:40px; height:40px; color:var(--accent); opacity:0; transition:opacity .3s, top .3s; }
  .c4-grid .c4-cue.on { opacity:1; }

  /* STM */
  .c4-hero { font-size:250px; font-weight:800; letter-spacing:-.06em; line-height:.9; color:var(--accent); }
  .c4-digits { display:flex; gap:14px; justify-content:center; align-items:center; height:150px; }
  .c4-digits i { font-style:normal; font-family:var(--mono); font-size:66px; font-weight:700; width:74px; height:104px; display:grid; place-items:center; border-radius:18px; background:var(--surface-2); border:1.5px solid var(--line); transition: all .8s var(--ease); }
  .c4-digits.chunked i { background:transparent; border-color:transparent; width:44px; }
  .c4-digits .c4-gap { width:0; transition: width .8s var(--ease); font-size:66px; color:var(--muted); overflow:hidden; text-align:center; }
  .c4-digits.chunked .c4-gap { width:80px; }
  .c4-digits .c4-wrap4 { display:flex; gap:14px; padding:0; border-radius:22px; transition: all .8s var(--ease); border:2px solid transparent; }
  .c4-digits.chunked .c4-wrap4 { gap:0; padding:8px 18px; border-color:var(--accent); background:var(--accent-soft); }

  /* digit span */
  .c4-span-show { font-family:var(--mono); font-size:260px; font-weight:800; line-height:1; color:var(--accent); height:300px; display:grid; place-items:center; }
  .c4-span-in { font-family:var(--mono); font-size:72px; letter-spacing:.2em; text-align:center; width:820px; padding:20px; border-radius:24px; border:2px solid var(--line-2); background:var(--surface); color:var(--text); outline:none; }
  .c4-span-in:focus { border-color:var(--accent); }
  .c4-ladder { display:flex; gap:14px; }
  .c4-ladder span { width:120px; padding:14px 0; text-align:center; border-radius:16px; background:var(--surface-2); font-size:26px; font-weight:700; color:var(--muted); border:1.5px solid var(--line); transition:all .4s; }
  .c4-ladder span.ok { background:color-mix(in srgb, var(--green) 20%, transparent); border-color:var(--green); color:var(--text); }
  .c4-ladder span.bad { background:color-mix(in srgb, var(--red) 18%, transparent); border-color:var(--red); color:var(--text); }
  .c4-ladder span.cur { border-color:var(--accent); color:var(--text); }

  /* LTM tree */
  .c4-tree { position:relative; width:1680px; height:640px; margin-top:34px; }
  .c4-tree svg { position:absolute; inset:0; overflow:visible; }
  .c4-tree svg path { fill:none; stroke-width:3; stroke-dasharray:600; stroke-dashoffset:600; transition: stroke-dashoffset 1.2s var(--ease); }
  .c4-tree svg path.in { stroke-dashoffset:0; }
  .c4-node { position:absolute; border-radius:22px; text-align:center; }
  .c4-node.top { top:0; width:420px; margin-left:-210px; padding:22px; background:var(--accent); color:#111; font-size:36px; font-weight:750; }
  .c4-node.mid { top:170px; width:520px; margin-left:-260px; padding:20px 24px; font-size:34px; font-weight:700; border:2px solid; background:var(--surface); }
  .c4-node.mid small { display:block; font-size:24px; font-weight:500; color:var(--muted); margin-top:6px; font-style:italic; }
  .c4-node.leaf { top:380px; width:390px; margin-left:-195px; padding:26px 28px; text-align:left; background:var(--surface); border:1px solid var(--line); }
  .c4-node.leaf b { font-size:32px; display:block; margin-bottom:8px; }
  .c4-node.leaf p { font-size:26px; color:var(--muted); line-height:1.35; }

  /* working memory */
  .c4-wm { position:relative; width:1060px; height:620px; }
  .c4-wm svg { position:absolute; inset:0; overflow:visible; }
  .c4-wm .part { position:absolute; border-radius:24px; padding:22px 26px; background:var(--surface); border:2px solid var(--line); text-align:center; transition:all .6s var(--ease); }
  .c4-wm .part b { display:block; font-size:32px; }
  .c4-wm .part span { display:block; font-size:24px; color:var(--muted); margin-top:6px; line-height:1.3; }
  .c4-wm .part.lit { border-color:var(--accent); background:var(--accent-soft); box-shadow:0 0 60px -10px var(--accent); transform:scale(1.04); }
  .c4-gps div { display:flex; gap:18px; align-items:flex-start; padding:20px 24px; border-radius:20px; border:1.5px solid var(--line); background:var(--surface); transition:all .5s var(--ease); opacity:.45; }
  .c4-gps div.lit { opacity:1; border-color:var(--accent); background:var(--accent-soft); }
  .c4-gps div p { font-size:28px; }
  .c4-gps div small { display:block; font-size:22px; color:var(--accent); font-weight:650; margin-top:4px; }

  /* analogy */
  .c4-an { display:grid; grid-template-columns: 1fr 70px 1fr; align-items:center; gap:0; }
  .c4-an .side { padding:20px 24px; border-radius:20px; background:var(--surface); border:1px solid var(--line); font-size:28px; font-weight:650; display:flex; gap:14px; align-items:center; }
  .c4-an .side small { display:block; font-size:22px; color:var(--muted); font-weight:500; }
  .c4-an .eq { text-align:center; font-size:40px; color:var(--accent); font-weight:300; }

  /* levels */
  .c4-lv { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; align-items:start; flex:1; }
  .c4-lv .card { padding:32px; }
  .c4-lv .card h3 { font-size:38px; }
  .c4-lv .card .q { font-size:30px; color:var(--text); margin-top:10px; font-weight:600; }
  .c4-lv .card .eg { font-size:27px; color:var(--muted); margin-top:12px; font-style:italic; }
  .c4-meter { height:18px; border-radius:9px; background:var(--surface-2); margin-top:22px; overflow:hidden; }
  .c4-meter i { display:block; height:100%; width:0; border-radius:9px; background:linear-gradient(90deg, var(--yellow), var(--accent)); transition: width 1.4s var(--ease) .3s; }
  .in .c4-meter i { width:var(--w); }
  .c4-depth { width:70px; align-self:stretch; display:flex; flex-direction:column; align-items:center; gap:10px; }
  .c4-depth .bar { flex:1; width:10px; border-radius:6px; background:linear-gradient(180deg, var(--surface-2), var(--accent)); }
  .c4-depth span { writing-mode:vertical-rl; transform:rotate(180deg); font-size:22px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); font-weight:700; }

  /* table */
  .c4-tbl td, .c4-tbl th { font-size:30px; }
  .c4-tbl th { font-size:22px; }
  .c4-tight td { font-size:27px; padding:13px 22px; }
  .c4-tbl tbody tr td { opacity:0; transform:translateY(10px); transition: opacity .6s, transform .6s; }
  .slide.active .c4-tbl tbody tr td { opacity:1; transform:none; }
  .c4-tbl tbody tr:nth-child(2) td { transition-delay:.1s } .c4-tbl tbody tr:nth-child(3) td { transition-delay:.2s }
  .c4-tbl tbody tr:nth-child(4) td { transition-delay:.3s } .c4-tbl tbody tr:nth-child(5) td { transition-delay:.4s }
  .c4-tbl tbody tr:nth-child(6) td { transition-delay:.5s }

  /* curve */
  .c4-curve svg { width:100%; height:100%; overflow:visible; }
  .c4-curve .ax { stroke:var(--line-2); stroke-width:2; }
  .c4-curve .grid { stroke:var(--line); stroke-width:1; }
  .c4-curve .tick { font-size:22px; fill:var(--muted); }
  .c4-curve .ln { fill:none; stroke:var(--red); stroke-width:5; stroke-linecap:round; stroke-linejoin:round; transition: stroke-dashoffset 2.6s var(--ease-io); }
  .c4-curve .area { fill:url(#c4fade); opacity:0; transition:opacity 1.5s 1.2s; }
  .c4-curve.go .area { opacity:1; }
  .c4-curve .pt { opacity:0; transition:opacity .5s; }
  .c4-curve .pt circle { fill:var(--red); stroke:var(--bg); stroke-width:4; }
  .c4-curve .pt text { font-size:26px; font-weight:750; fill:var(--text); }
  .c4-curve.go .pt { opacity:1; }

  /* spacing */
  .c4-days { position:relative; height:110px; margin:22px 80px 0 80px; flex:none; }
  .c4-days .gl { position:absolute; top:88px; transform:translateX(-50%); font-size:22px; color:var(--muted); font-weight:600; white-space:nowrap; }
  .c4-dcards { display:grid; grid-template-columns:repeat(5,1fr); gap:18px; margin-top:8px; flex:none; }
  .c4-dcards .card { padding:22px 24px; }
  .c4-dcards .card b { display:block; font-size:24px; color:var(--accent); letter-spacing:.06em; text-transform:uppercase; }
  .c4-dcards .card p { font-size:27px; color:var(--text); margin-top:6px; line-height:1.3; }
  .c4-days .rail { position:absolute; left:0; right:0; top:64px; height:4px; background:var(--line); border-radius:4px; }
  .c4-days .rail i { position:absolute; inset:0; background:var(--accent); transform-origin:left; transform:scaleX(0); transition:transform .9s var(--ease); border-radius:4px; }
  .c4-days .d { position:absolute; top:0; width:160px; margin-left:-80px; text-align:center; }
  .c4-days .d b { font-size:32px; display:block; color:var(--accent); }
  .c4-days .d .dot { width:32px; height:32px; border-radius:50%; background:var(--bg); border:5px solid var(--accent); margin:12px auto 18px; }
  .c4-days .d p { font-size:26px; line-height:1.3; }
  .c4-days .gap { position:absolute; top:22px; font-size:20px; color:var(--muted); text-align:center; transform:translateX(-50%); }
  .c4-cs .card { padding:20px 28px; }
  .c4-cs .bars { display:grid; grid-template-columns:repeat(14,1fr); gap:6px; height:44px; margin-top:12px; align-items:end; margin-top:18px; }
  .c4-cs .bars i { display:block; background:var(--surface-2); border-radius:6px; height:10px; transition: height .9s var(--ease); }
  .c4-cs .bars i.on { background:var(--accent); }

  /* implicit */
  .c4-imp .card { padding:30px; }
  .c4-imp .card h3 { font-size:36px; margin-top:16px; }
  .c4-imp .card p { font-size:27px; margin-top:8px; }
  .c4-imp .card.lit { border-color:var(--accent); background:var(--accent-soft); }
  .c4-feat { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .c4-feat div { padding:18px 22px; border-radius:16px; background:var(--surface); border:1px solid var(--line); font-size:27px; display:flex; gap:12px; align-items:center; }

  /* forgetting map */
  .c4-strip { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
  .c4-strip div { padding:20px; text-align:center; font-size:30px; font-weight:700; border-radius:18px; background:var(--surface-2); color:var(--muted); transition:all .5s var(--ease); border:2px solid transparent; }
  .c4-strip div.lit { background:var(--accent-soft); color:var(--text); border-color:var(--accent); }
  .c4-fg .card { padding:34px 30px; cursor:pointer; text-align:center; }
  .c4-fg .card h3 { font-size:38px; margin-top:20px; }
  .c4-fg .card p { font-size:28px; margin-top:8px; color:var(--text); }
  .c4-fg .card .tag { display:inline-block; margin-top:22px; }
  .c4-fg .card.lit { border-color:var(--accent); background:var(--accent-soft); transform:translateY(-6px); }

  /* shelf */
  .c4-shelf { display:flex; align-items:flex-end; gap:8px; height:120px; padding:0 18px; border-bottom:8px solid var(--line-2); margin-top:16px; }
  .c4-shelf i { flex:1; border-radius:6px 6px 0 0; transition: transform .8s var(--ease), background .5s, box-shadow .5s; }
  .c4-shelf i.found { transform:translateY(-34px); background:var(--accent)!important; box-shadow:0 0 40px -4px var(--accent); }

  /* interference */
  .c4-int .card { padding:36px; display:flex; flex-direction:column; }
  .c4-blk { display:flex; align-items:center; justify-content:center; gap:0; margin:auto 0; padding:30px 0; }
  .c4-blk .m { width:270px; padding:40px 10px; text-align:center; border-radius:24px; font-size:36px; font-weight:750; }
  .c4-blk .m.old { background:var(--surface-2); border:2px solid var(--line-2); }
  .c4-blk .m.new { background:#1d3557; color:#fff; border:2px solid #2f5a8f; }
  :root[data-theme="light"] .c4-blk .m.new { background:#cfe0f5; color:#1d1d1f; border-color:#8fb2dc; }
  .c4-blk .m.victim { animation: c4dim 2.4s infinite; }
  @keyframes c4dim { 0%,35% { opacity:1; transform:none; } 50% { opacity:.35; transform:translateX(6px); } 55% { transform:translateX(-6px); } 60% { transform:translateX(4px); } 70%,100% { opacity:1; transform:none; } }
  .c4-blk .wire { width:200px; position:relative; height:60px; }
  .c4-blk .wire svg { width:100%; height:100%; overflow:visible; }
  .c4-blk .wire text { font-size:24px; font-weight:700; fill:var(--red); }

  /* decay / encoding failure */
  .c4-de .card { padding:36px; }
  .c4-de .row2 { margin-top:16px; font-size:28px; line-height:1.4; }
  .c4-de .row2 b { color:var(--accent); }
  .c4-viz { height:130px; border-radius:18px; background:var(--surface-2); margin-top:22px; position:relative; overflow:hidden; }

  /* Memory ER */
  .c4-er { display:grid; grid-template-columns: 1fr 560px; gap:36px; flex:1; margin-top:36px; min-height:0; }
  .c4-cases { display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:1fr 1fr; gap:20px; }
  .c4-case { padding:24px 26px; cursor:pointer; position:relative; }
  .c4-case h3 { font-size:30px; display:flex; align-items:center; gap:12px; }
  .c4-case p { font-size:27px; margin-top:10px; color:var(--text); line-height:1.35; }
  .c4-case.sel { border-color:var(--accent); background:var(--accent-soft); }
  .c4-case.solved::after { content:"✓"; position:absolute; right:22px; top:18px; font-size:34px; color:var(--green); font-weight:800; }
  .c4-panel { padding:30px 32px; display:flex; flex-direction:column; gap:14px; }
  .c4-panel .opts { display:flex; flex-direction:column; gap:10px; }
  .c4-panel .opts button { appearance:none; text-align:left; font-size:25px; font-weight:600; padding:14px 20px; border-radius:14px; border:1.5px solid var(--line); background:var(--surface-2); color:var(--text); cursor:pointer; transition:all .3s; font-family:inherit; }
  .c4-panel .opts button:hover { border-color:var(--line-2); }
  .c4-panel .opts button.ok { background:var(--green); border-color:var(--green); color:#fff; }
  .c4-panel .opts button.no { background:color-mix(in srgb, var(--red) 25%, transparent); border-color:var(--red); animation: shake .4s; }
  .c4-rx { padding:18px 22px; border-radius:16px; background:color-mix(in srgb, var(--green) 14%, transparent); border:1px solid var(--green); font-size:25px; line-height:1.4; display:none; }
  .c4-rx.show { display:block; animation: rise .6s var(--ease); }
  .c4-rx b { color:var(--green); }

  /* summary */
  .c4-sum .card { padding:44px 40px; }
  .c4-sum .card h3 { margin:20px 0 14px; }
  .c4-sum .card p { font-size:32px; line-height:1.45; }

  /* T/F */
  .c4-tf-list { display:flex; flex-direction:column; gap:16px; }
  .c4-tf { display:grid; grid-template-columns: 1fr 360px; gap:24px; align-items:center; padding:22px 30px; border-radius:var(--r); background:var(--surface); border:1px solid var(--line); cursor:pointer; transition:all .45s var(--ease); }
  .c4-tf p { font-size:31px; }
  .c4-tf .ans { font-size:30px; font-weight:750; text-align:right; opacity:0; transform:translateX(20px); transition:all .5s var(--ease); }
  .c4-tf .ans div { font-size:22px; font-weight:500; color:var(--muted); margin-top:4px; }
  .c4-tf.show .ans { opacity:1; transform:none; }
  .c4-tf.show.t { border-color:var(--green); } .c4-tf.show.t .ans { color:var(--green); }
  .c4-tf.show.f { border-color:var(--red); } .c4-tf.show.f .ans { color:var(--red); }

  /* lab 4 */
  .c4-lab { display:grid; grid-template-columns: 1fr 1fr; gap:36px; flex:1; margin-top:40px; min-height:0; }
  .c4-pairs { display:grid; grid-template-columns:1fr 1fr; gap:8px 12px; }
  .c4-pairs div { padding:8px 18px; border-radius:14px; background:var(--surface-2); font-size:27px; font-weight:600; flex-direction:column; align-items:flex-start; gap:2px; line-height:1.2; display:flex; justify-content:space-between; gap:12px; transition: filter .6s, opacity .6s; }
  .c4-pairs div span { color:var(--accent); font-weight:600; font-size:22px; }
  .c4-pairs.hide div { filter:blur(12px); opacity:.4; }
  .c4-quiz { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:26px; text-align:center; }
  .c4-quiz .concept { font-size:84px; font-weight:800; letter-spacing:-.03em; color:var(--accent); min-height:100px; }
  .c4-quiz .score { font-size:30px; color:var(--muted); }
  `;
  document.head.appendChild(css);

  /* ---------- helpers ---------- */
  const ic = (n, cls) => `<span class="c4-ico ${cls || ''}">${I(n, 'ic')}</span>`;
  function opener(num, title, sub, topics) {
    return {
      title: 'Chapter ' + num + ' opener', cls: 'c4-opener',
      html: `
        <div class="c4-bignum rise">0${num}</div>
        <div class="eyebrow rise">Chapter ${num}</div>
        <h1 class="rise d1">${title}</h1>
        <p class="lead rise d2" style="max-width:1150px">${sub}</p>
        <div class="c4-topics rise d3">${topics.map(t => `<span class="pill">${t}</span>`).join('')}</div>`
    };
  }

  const slides = [];

  /* 1 — Opener */
  slides.push(opener(4, 'Memory: learning, memory and <span class="grad">forgetting</span>',
    'How memory is built, how we learn and keep it, and why we forget.',
    ['Multi-store model', 'Working memory', 'Capacity', 'Levels of processing', 'Testing effect', 'Spacing', 'Implicit learning', 'Forgetting']));

  /* 2 — What is memory */
  slides.push({
    title: 'What is memory?',
    html: `
      <div class="eyebrow">Definition</div>
      <h2>What is memory?</h2>
      <p class="lead" style="max-width:1680px">The cognitive process of <b>encoding</b>, <b>storing</b> and <b>retrieving</b> information for use in thinking, problem-solving and decision-making — the basis of knowledge, skills and personal identity.</p>
      <div class="c4-ers" style="margin-top:44px">
        <div class="card" data-k="0">${ic('pen')}<h3>Encoding</h3><p>Take in information and change it into a form the brain can store</p><div class="c4-bday">A friend tells you her birthday is 12 March</div></div>
        ${I('arrowR', 'c4-arr')}
        <div class="card" data-k="1">${ic('db')}<h3>Storage</h3><p>Keep the information over time</p><div class="c4-bday">The date stays in memory for months</div></div>
        ${I('arrowR', 'c4-arr')}
        <div class="card" data-k="2">${ic('search')}<h3>Retrieval</h3><p>Bring the information back when needed</p><div class="c4-bday">On 12 March you remember and send a message</div></div>
      </div>
      <div class="grid-2" style="margin-top:34px;grid-template-columns:1.25fr 1fr">
        <div class="callout" data-step="1"><b>Memory vs learning:</b> learning is the change that happens when we gain knowledge or skill. Memory is how that change is kept and used later. <b>No memory, no learning.</b></div>
        <div class="callout" data-step="2" style="--accent:var(--red)"><b>Failure can happen at any of the three stages</b> — the key to explaining forgetting later in this chapter.</div>
      </div>`,
    src: 'Ch4 · What is memory?',
    enter(c) {
      const cards = c.$$('.c4-ers .card'); let i = 0;
      const tick = () => { cards.forEach((k, j) => k.classList.toggle('lit', j === i)); i = (i + 1) % 3; };
      tick(); c.interval(tick, 1600);
    },
  });

  /* 3 — Multi-store model */
  const MS = { inp: [130, 200], sen: [530, 200], stm: [980, 200], ltm: [1480, 200] };
  slides.push({
    title: 'Multi-store model',
    html: `
      <div class="eyebrow">Architecture of memory</div>
      <h2>The multi-store model</h2>
      <p class="lead" style="max-width:1680px"><b>Atkinson and Shiffrin (1968)</b> described memory as three stores. Information flows between them — and some is <b>lost at each step</b>.</p>
      <div class="c4-ms" style="flex:1;margin-top:20px;min-height:0">
        <svg viewBox="0 0 1680 520">
          <defs>
            <marker id="c4ah" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="var(--accent)"/></marker>
            <marker id="c4ahr" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="var(--red)"/></marker>
          </defs>
          <g class="bx"><rect x="20" y="130" width="220" height="140" rx="22" fill="var(--surface-2)" stroke="var(--line-2)"/><text class="lbl" x="130" y="192" text-anchor="middle">Input</text><text class="sub" x="130" y="228" text-anchor="middle">sights, sounds</text></g>
          <g class="bx"><rect x="380" y="130" width="300" height="140" rx="22" fill="var(--accent-soft)" stroke="var(--accent)"/><text class="lbl" x="530" y="192" text-anchor="middle">Sensory memory</text><text class="sub" x="530" y="228" text-anchor="middle">under 1 to 3 s</text></g>
          <g class="bx"><rect x="820" y="130" width="320" height="140" rx="22" fill="var(--accent-soft)" stroke="var(--accent)"/><text class="lbl" x="980" y="192" text-anchor="middle">Short-term memory</text><text class="sub" x="980" y="228" text-anchor="middle">15 to 30 s, 7 ± 2</text></g>
          <g class="bx"><rect x="1300" y="130" width="360" height="140" rx="22" fill="var(--accent)" stroke="var(--accent)"/><text class="lbl" x="1480" y="192" text-anchor="middle" style="fill:#111">Long-term memory</text><text class="sub" x="1480" y="228" text-anchor="middle" style="fill:#3a2500">minutes to lifetime</text></g>
          <line x1="240" y1="200" x2="372" y2="200" stroke="var(--accent)" stroke-width="3" marker-end="url(#c4ah)"/>
          <line x1="680" y1="200" x2="812" y2="200" stroke="var(--accent)" stroke-width="3" marker-end="url(#c4ah)"/><text class="arrlbl" x="746" y="186" text-anchor="middle">attention</text>
          <line x1="1140" y1="178" x2="1292" y2="178" stroke="var(--accent)" stroke-width="3" marker-end="url(#c4ah)"/><text class="arrlbl" x="1218" y="164" text-anchor="middle">encoding</text>
          <line x1="1300" y1="226" x2="1148" y2="226" stroke="var(--accent)" stroke-width="3" marker-end="url(#c4ah)"/><text class="arrlbl" x="1222" y="258" text-anchor="middle">retrieval</text>
          <path d="M 930 130 C 900 40, 1060 40, 1030 128" fill="none" stroke="var(--accent)" stroke-width="3" marker-end="url(#c4ah)"/><text class="arrlbl" x="980" y="40" text-anchor="middle">rehearsal</text>
          <line x1="530" y1="270" x2="530" y2="392" stroke="var(--red)" stroke-width="3" stroke-dasharray="8 8" marker-end="url(#c4ahr)"/><text class="loss" x="530" y="432" text-anchor="middle">lost if not attended</text>
          <line x1="980" y1="270" x2="980" y2="392" stroke="var(--red)" stroke-width="3" stroke-dasharray="8 8" marker-end="url(#c4ahr)"/><text class="loss" x="980" y="432" text-anchor="middle">lost by decay or displacement</text>
          <line x1="1480" y1="270" x2="1480" y2="392" stroke="var(--red)" stroke-width="3" stroke-dasharray="8 8" marker-end="url(#c4ahr)"/><text class="loss" x="1480" y="432" text-anchor="middle">forgetting (Part C)</text>
          <g id="c4parts"></g>
        </svg>
      </div>
      <div class="callout" data-step="1"><b>Example:</b> your lecturer reads an OTP code aloud (<b>sensory</b>). You repeat it while typing (<b>short-term, rehearsal</b>). If you use it daily, like your student ID, it moves to <b>long-term memory</b>.</div>`,
    src: 'Ch4 · Architecture of memory: the multi-store model',
    enter(c) {
      const g = c.$('#c4parts'), NS = 'http://www.w3.org/2000/svg', parts = [];
      const { inp, sen, stm, ltm } = MS;
      const routes = [
        [inp, sen, [sen[0], 400]],
        [inp, sen, [sen[0], 400]],
        [inp, sen, stm, [stm[0], 400]],
        [inp, sen, stm, [930, 120], [980, 62], [1030, 120], stm, [ltm[0] - 40 + Math.random() * 80, 200]],
      ];
      let last = -1e9;
      c.loop(t => {
        if (t - last > 380 && parts.length < 36) {
          last = t;
          const r = routes[(Math.random() * routes.length) | 0].map(p => [p[0], p[1] + (Math.random() - .5) * 26]);
          const el = document.createElementNS(NS, 'circle');
          el.setAttribute('r', 9); el.setAttribute('fill', 'var(--yellow)');
          el.style.filter = 'drop-shadow(0 0 8px var(--yellow))';
          g.appendChild(el);
          parts.push({ el, r, seg: 0, k: 0, born: t, life: 0 });
        }
        for (let i = parts.length - 1; i >= 0; i--) {
          const p = parts[i];
          if (p.seg >= p.r.length - 1) {
            p.life += 16; p.el.setAttribute('opacity', Math.max(0, 1 - p.life / 900));
            if (p.life > 900) { p.el.remove(); parts.splice(i, 1); }
            continue;
          }
          const a = p.r[p.seg], b = p.r[p.seg + 1];
          const d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
          p.k += 6.5 / d;
          if (p.k >= 1) { p.k = 0; p.seg++; continue; }
          const x = a[0] + (b[0] - a[0]) * p.k, y = a[1] + (b[1] - a[1]) * p.k;
          p.el.setAttribute('cx', x); p.el.setAttribute('cy', y);
          const falling = b[1] >= 390;
          p.el.setAttribute('fill', falling ? 'var(--red)' : 'var(--yellow)');
          p.el.setAttribute('opacity', falling ? 1 - p.k * .9 : 1);
        }
      });
    },
  });

  /* 4 — Sensory memory + Sperling */
  slides.push({
    title: 'Sensory memory',
    html: `
      <div class="eyebrow">Store 1</div>
      <h2>Sensory memory</h2>
      <p class="lead" style="max-width:1680px">Holds <b>raw input</b> from the senses for a very short time — long enough for attention to decide what to keep. Capacity is <b>large</b>, but it <b>fades fast</b>.</p>
      <div class="body" style="gap:40px">
        <div class="col c4-sens" style="width:820px;gap:22px">
          <div class="card">
            <div class="row" style="gap:18px">${ic('eye')}<div><h3 style="margin:0">Iconic memory</h3><div class="accent" style="font-size:26px;font-weight:650">Visual · under 1 second</div></div></div>
            <canvas id="c4spark" width="760" height="150"></canvas>
            <p style="font-size:26px;margin-top:12px">The trail you see when someone waves a sparkler at night.</p>
          </div>
          <div class="card">
            <div class="row" style="gap:18px">${ic('ear')}<div><h3 style="margin:0">Echoic memory</h3><div class="accent" style="font-size:26px;font-weight:650">Auditory · about 2 to 4 seconds</div></div></div>
            <p style="font-size:28px;margin-top:14px;color:var(--text)">You “hear again” what a friend just said when you were not listening.</p>
          </div>
        </div>
        <div class="card c4-sper grow">
          <div class="row" style="justify-content:space-between;width:100%"><span class="pill">Classic evidence · Sperling (1960)</span><span class="pill neutral" id="c4sstate">Ready</span></div>
          <div class="c4-grid off" id="c4grid">${I('arrowR', 'c4-cue')}${'<span></span>'.repeat(12)}</div>
          <div class="row" style="gap:16px"><button class="btn primary" id="c4flash">Flash the grid</button><button class="btn" id="c4reveal">Reveal</button></div>
          <p style="font-size:25px;text-align:center;color:var(--muted);line-height:1.35">A grid of <b style="color:var(--text)">12 letters</b> flashed for a split second. People could report <b style="color:var(--text)">any single row if cued at once</b> — but the image faded within about a second.</p>
        </div>
      </div>`,
    src: 'Ch4 · Sensory memory',
    enter(c) {
      // sparkler trail (points older than ~0.8 s are gone)
      const cv = c.$('#c4spark'), g = cv.getContext('2d'), trail = [];
      c.loop(t => {
        const s = t / 1000, x = 380 + Math.sin(s * 2.1) * 300, y = 75 + Math.sin(s * 4.2) * 48;
        trail.push([x, y, t]);
        while (trail.length && t - trail[0][2] > 800) trail.shift();
        g.clearRect(0, 0, 760, 150);
        for (let i = 1; i < trail.length; i++) {
          const a = 1 - (t - trail[i][2]) / 800;
          g.strokeStyle = 'rgba(255,190,70,' + a.toFixed(3) + ')'; g.lineWidth = 2 + a * 6; g.lineCap = 'round';
          g.beginPath(); g.moveTo(trail[i - 1][0], trail[i - 1][1]); g.lineTo(trail[i][0], trail[i][1]); g.stroke();
        }
        g.fillStyle = '#fff'; g.shadowColor = '#ffb347'; g.shadowBlur = 24; g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill(); g.shadowBlur = 0;
      });
      const grid = c.$('#c4grid'), cells = c.$$('#c4grid span'), cue = c.$('#c4grid .c4-cue'), st = c.$('#c4sstate');
      const L = 'BCDFGHJKLMNPQRSTVWXZ';
      let row = 0;
      const fill = () => cells.forEach(s => { s.textContent = L[(Math.random() * L.length) | 0]; s.classList.remove('cued'); });
      fill(); cue.classList.remove('on');
      c.on(c.$('#c4flash'), 'click', () => {
        fill(); cue.classList.remove('on'); row = (Math.random() * 3) | 0;
        grid.classList.remove('off'); st.textContent = 'Look!';
        c.timeout(() => {
          grid.classList.add('off');
          st.textContent = 'Report row ' + ['1 (top)', '2 (middle)', '3 (bottom)'][row];
          cue.style.top = (22 + row * 78 + 18) + 'px'; cue.classList.add('on');
        }, 160);
      });
      c.on(c.$('#c4reveal'), 'click', () => {
        grid.classList.remove('off');
        cells.forEach((s, i) => s.classList.toggle('cued', Math.floor(i / 4) === row && cue.classList.contains('on')));
        st.textContent = 'How many did you get?';
      });
      if (/[?&]shot/.test(location.search)) grid.classList.remove('off');
    },
  });

  /* 5 — STM capacity + chunking */
  slides.push({
    title: 'Short-term memory capacity',
    html: `
      <div class="eyebrow">Store 2</div>
      <h2>Short-term memory and its capacity</h2>
      <p class="lead" style="max-width:1680px">Holds a small amount of information for about <b>15 to 30 seconds</b> unless we rehearse it. <b>George Miller (1956)</b> called its limit “the magical number seven, plus or minus two”.</p>
      <div class="body" style="gap:50px;align-items:stretch">
        <div class="card" style="width:600px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:40px">
          <div class="c4-hero">7 ± 2</div>
          <p style="font-size:30px;margin-top:20px;color:var(--text)">items or chunks at one time</p>
          <p style="font-size:26px;margin-top:6px">most people hold <b class="accent">5 to 9</b></p>
        </div>
        <div class="col grow" style="gap:24px">
          <div class="card" style="padding:34px;flex:1;display:flex;flex-direction:column;justify-content:center">
            <div class="row" style="justify-content:space-between"><span class="num" style="margin:0">Chunking stretches the limit</span><span class="pill" id="c4clbl">8 separate digits</span></div>
            <div class="c4-digits" id="c4dg" style="margin-top:22px">
              <div class="c4-wrap4"><i>1</i><i>9</i><i>4</i><i>7</i></div><div class="c4-gap">–</div><div class="c4-wrap4"><i>2</i><i>0</i><i>2</i><i>4</i></div>
            </div>
            <p style="font-size:28px;margin-top:18px;text-align:center">Meaning from <b style="color:var(--text)">long-term memory</b> makes each chunk hold more.</p>
          </div>
          <div class="callout" data-step="1">Modern research <b>(Cowan, 2001)</b> suggests the true limit is closer to <b>4 chunks</b> when rehearsal is blocked.</div>
        </div>
      </div>`,
    src: 'Ch4 · Short-term memory and its capacity',
    enter(c) {
      const dg = c.$('#c4dg'), lb = c.$('#c4clbl');
      let on = false;
      const flip = () => { on = !on; dg.classList.toggle('chunked', on); lb.textContent = on ? '2 familiar chunks' : '8 separate digits'; };
      dg.classList.remove('chunked'); lb.textContent = '8 separate digits';
      c.interval(flip, 2400);
      if (/[?&]shot/.test(location.search)) flip();
    },
  });

  /* 6 — Digit span live test */
  slides.push({
    title: 'Try it: digit span',
    html: `
      <div class="eyebrow">Try it · 2 minutes</div>
      <h2>What is your digit span?</h2>
      <p class="lead" style="max-width:1680px">Digits appear <b>one at a time</b>. When the row ends, type it back. Rows get longer: <b>5, 6, 7, 8, 9</b>. Where you stop is your digit span.</p>
      <div class="col center-x" style="flex:1;justify-content:center;gap:30px">
        <div class="c4-ladder" id="c4lad">${[5, 6, 7, 8, 9].map(n => `<span data-n="${n}">${n} digits</span>`).join('')}</div>
        <div class="c4-span-show" id="c4show">·</div>
        <input class="c4-span-in" id="c4in" inputmode="numeric" autocomplete="off" placeholder="type the digits, then Enter" style="display:none">
        <div class="row" style="gap:16px"><button class="btn primary" id="c4start">Start</button><span class="pill neutral" id="c4msg" style="font-size:24px">Press Start</span></div>
      </div>`,
    src: 'Ch4 · Short-term memory: digit span activity',
    enter(c) {
      const show = c.$('#c4show'), inp = c.$('#c4in'), msg = c.$('#c4msg'), lad = c.$$('#c4lad span');
      let len = 5, seq = '', best = 0, running = false;
      const reset = () => { len = 5; best = 0; lad.forEach(s => s.className = ''); show.textContent = '·'; inp.style.display = 'none'; inp.value = ''; msg.textContent = 'Press Start'; };
      reset();
      const play = () => {
        running = true; seq = '';
        for (let i = 0; i < len; i++) seq += (Math.random() * 10) | 0;
        lad.forEach(s => s.classList.toggle('cur', +s.dataset.n === len));
        inp.style.display = 'none'; msg.textContent = 'Watch…';
        let i = 0;
        const next = () => {
          if (i < seq.length) {
            show.textContent = seq[i++];
            show.animate([{ opacity: 0, transform: 'scale(.85)' }, { opacity: 1, transform: 'none' }], { duration: 250 });
            c.timeout(() => { show.textContent = ''; c.timeout(next, 220); }, 700);
          } else {
            show.textContent = '?'; inp.style.display = ''; inp.value = ''; inp.focus();
            msg.textContent = 'Type the ' + len + ' digits, then Enter';
          }
        };
        c.timeout(next, 600);
      };
      c.on(c.$('#c4start'), 'click', () => { reset(); play(); });
      c.on(inp, 'keydown', e => {
        if (e.key !== 'Enter' || !running) return;
        e.preventDefault();
        const ok = inp.value.replace(/\D/g, '') === seq;
        const cell = lad.find(s => +s.dataset.n === len);
        cell.classList.remove('cur'); cell.classList.add(ok ? 'ok' : 'bad');
        show.textContent = seq; inp.blur();
        if (ok) best = len;
        if (ok && len < 9) { len++; msg.textContent = 'Correct! Next row…'; c.timeout(play, 1400); }
        else { running = false; inp.style.display = 'none'; msg.textContent = 'Your digit span: ' + (best || 'under 5') + (best ? ' digits' : ''); }
      });
    },
  });

  /* 7 — Long-term memory tree */
  slides.push({
    title: 'Long-term memory',
    html: `
      <div class="eyebrow">Store 3</div>
      <h2>Long-term memory: what we keep</h2>
      <p class="lead" style="max-width:1680px">Stores information from <b>minutes to a lifetime</b>. Its capacity seems <b>almost unlimited</b>. It holds two broad kinds of memory.</p>
      <div class="c4-tree">
        <svg viewBox="0 0 1680 640">
          <path data-s="1" d="M840 90 C 840 130, 420 130, 420 170" stroke="var(--teal)"/>
          <path data-s="2" d="M840 90 C 840 130, 1260 130, 1260 170" stroke="var(--accent)"/>
          <path data-s="1" d="M420 290 C 420 335, 215 335, 215 380" stroke="var(--teal)"/>
          <path data-s="1" d="M420 290 C 420 335, 625 335, 625 380" stroke="var(--teal)"/>
          <path data-s="2" d="M1260 290 C 1260 335, 1055 335, 1055 380" stroke="var(--accent)"/>
          <path data-s="2" d="M1260 290 C 1260 335, 1465 335, 1465 380" stroke="var(--accent)"/>
        </svg>
        <div class="c4-node top" style="left:840px">Long-term memory</div>
        <div class="c4-node mid" data-step="1" style="left:420px;border-color:var(--teal)">Explicit (declarative)<small>“knowing that”: you can say it</small></div>
        <div class="c4-node mid" data-step="2" style="left:1260px;border-color:var(--accent)">Implicit (non-declarative)<small>“knowing how”: shown in action</small></div>
        <div class="c4-node leaf" data-step="1" style="left:215px;--accent:var(--teal)"><b class="accent">Semantic</b><p>Facts and meanings: Muscat is the capital of Oman</p></div>
        <div class="c4-node leaf" data-step="1" style="left:625px;--accent:var(--teal)"><b class="accent">Episodic</b><p>Personal events: your first day at NU</p></div>
        <div class="c4-node leaf" data-step="2" style="left:1055px"><b class="accent">Procedural</b><p>Skills and habits: riding a bike, touch typing</p></div>
        <div class="c4-node leaf" data-step="2" style="left:1465px"><b class="accent">Priming</b><p>Past exposure speeds later recognition without awareness</p></div>
      </div>`,
    src: 'Ch4 · Long-term memory: what kinds of things we keep',
    step(c, n) { c.$$('.c4-tree path').forEach(p => p.classList.toggle('in', +p.dataset.s <= n)); },
  });

  /* 8 — Working memory */
  const gps = [
    ['pl', 'Hold the voice instruction', 'Phonological loop'],
    ['vs', 'Picture the turn', 'Visuo-spatial sketchpad'],
    ['ce', 'Decide when to change lane', 'Central executive'],
  ];
  slides.push({
    title: 'Working memory',
    html: `
      <div class="eyebrow">The mind’s workbench</div>
      <h2>Working memory</h2>
      <p class="lead" style="max-width:1680px"><b>Baddeley and Hitch (1974):</b> holds <b>and works on</b> information at the same time. It is active, not just a store, and links new input with long-term knowledge.</p>
      <div class="body" style="gap:50px;margin-top:30px">
        <div class="c4-wm">
          <svg viewBox="0 0 1060 620">
            <path d="M530 130 L 180 250 M530 130 L 530 250 M530 130 L 880 250" stroke="var(--line-2)" stroke-width="3" fill="none"/>
            <path d="M180 400 L 180 500 M530 400 L 530 500 M880 400 L 880 500" stroke="var(--line-2)" stroke-width="3" fill="none" stroke-dasharray="6 8"/>
          </svg>
          <div class="part" data-p="ce" style="left:280px;top:0;width:500px"><b>Central executive</b><span>directs attention, coordinates the parts</span></div>
          <div class="part" data-p="pl" style="left:0;top:250px;width:340px"><b>Phonological loop</b><span>words and sounds: inner voice, inner ear</span></div>
          <div class="part" data-p="eb" style="left:360px;top:250px;width:340px"><b>Episodic buffer</b><span>links parts with long-term memory (added 2000)</span></div>
          <div class="part" data-p="vs" style="left:720px;top:250px;width:340px"><b>Visuo-spatial sketchpad</b><span>images, maps, positions</span></div>
          <div class="part" data-p="ltm" style="left:0;top:500px;width:1060px;background:var(--surface-2)"><b>Long-term memory</b></div>
        </div>
        <div class="col grow c4-gps" style="gap:18px;justify-content:center">
          <div class="row" style="gap:14px;opacity:1;border:0;background:none;padding:0">${ic('car', 'sm')}<span style="font-size:28px;font-weight:700">Example: following GPS while driving</span></div>
          ${gps.map(g => `<div data-g="${g[0]}">${ic('arrowR', 'sm')}<p>${g[1]}<small>${g[2]}</small></p></div>`).join('')}
        </div>
      </div>`,
    src: 'Ch4 · Working memory: the mind’s workbench',
    enter(c) {
      let i = 0;
      const tick = () => {
        const k = gps[i][0];
        c.$$('.c4-wm .part').forEach(p => p.classList.toggle('lit', p.dataset.p === k));
        c.$$('.c4-gps [data-g]').forEach(d => d.classList.toggle('lit', d.dataset.g === k));
        i = (i + 1) % gps.length;
      };
      tick(); c.interval(tick, 2200);
    },
  });

  /* 9 — STM vs WM + computer analogy */
  slides.push({
    title: 'STM, working memory and computers',
    html: `
      <div class="eyebrow">Compare</div>
      <h2>STM, working memory and computers</h2>
      <div class="body" style="gap:50px;margin-top:40px">
        <div class="col" style="width:820px">
          <table class="tbl c4-tbl">
            <thead><tr><th></th><th>Short-term memory</th><th>Working memory</th></tr></thead>
            <tbody>
              <tr><td>Role</td><td>Holds information briefly</td><td>Holds and works on information</td></tr>
              <tr><td>View</td><td>One passive store</td><td>Several parts with a controller</td></tr>
              <tr><td>Example</td><td>Remember a phone number</td><td>Do 24 × 3 in your head</td></tr>
              <tr><td>Used for</td><td>Brief holding</td><td>Reading, reasoning, problem-solving</td></tr>
            </tbody>
          </table>
        </div>
        <div class="col grow" style="gap:16px">
          <div class="row" style="justify-content:space-between;font-size:22px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--faint)"><span>Human memory</span><span>Computer analogy</span></div>
          ${[['eye', 'Sensory memory', '', 'Input buffer', ''], ['brain', 'Working memory', '', 'RAM, or a chatbot’s context window', 'small, fast, cleared'], ['db', 'Long-term memory', '', 'Hard disk or database', 'large and lasting'], ['search', 'Retrieval', '', 'Search using an index or cue', '']].map((r, i) => `
            <div class="c4-an" data-step="${i + 1}">
              <div class="side">${ic(r[0], 'sm')}<div>${r[1]}</div></div><div class="eq">≈</div>
              <div class="side" style="--accent:var(--teal)">${ic('cpu', 'sm')}<div>${r[3]}${r[4] ? `<small>${r[4]}</small>` : ''}</div></div>
            </div>`).join('')}
        </div>
      </div>
      <div class="callout mt" data-step="5" style="--accent:var(--red)"><b>The analogy breaks down:</b> human memory <b>rebuilds</b> what it recalls and changes each time, while a computer <b>copies exact data</b>.</div>`,
    src: 'Ch4 · Short-term memory, working memory and computers',
  });

  /* 10 — Levels of processing */
  slides.push({
    title: 'Levels of processing',
    html: `
      <div class="eyebrow">Craik and Lockhart (1972)</div>
      <h2>Levels of processing</h2>
      <p class="lead" style="max-width:1680px">How well we remember depends on <b>how deeply</b> we process information — not on how long we hold it. Deeper, <b>meaning-based</b> processing gives stronger memory.</p>
      <div class="body" style="gap:30px;margin-top:40px">
        <div class="c4-depth"><span>shallow</span><div class="bar"></div><span>deep</span></div>
        <div class="c4-lv">
          <div class="card" data-step="1" style="--accent:var(--faint)"><span class="num">Shallow · structural</span><h3>What does it look like?</h3><p class="q">“Is the word in capital letters?”</p><div class="c4-meter" style="--w:30%"><i></i></div><p class="eg">Memory: <b style="color:var(--text)">weak</b></p></div>
          <div class="card" data-step="2" style="margin-top:70px;--accent:var(--yellow)"><span class="num">Intermediate · phonemic</span><h3>What does it sound like?</h3><p class="q">“Does the word rhyme with ‘cat’?”</p><div class="c4-meter" style="--w:62%"><i></i></div><p class="eg">Memory: <b style="color:var(--text)">better</b></p></div>
          <div class="card glow" data-step="3" style="margin-top:140px"><span class="num">Deep · semantic</span><h3>What does it mean?</h3><p class="q">“Does the word fit ‘I ate a ___ for lunch’?”</p><div class="c4-meter" style="--w:100%"><i></i></div><p class="eg">Memory: <b style="color:var(--text)">strongest</b></p></div>
        </div>
      </div>
      <div class="callout" data-step="4"><b>Deep example:</b> not just noticing “elephant” is in bold, but thinking about where elephants live, or your zoo visit.</div>`,
    src: 'Ch4 · Levels of processing (Craik and Lockhart, 1972)',
  });

  /* 11 — Shallow vs deep */
  slides.push({
    title: 'Shallow vs deep processing',
    html: `
      <div class="eyebrow">Compare</div>
      <h2>Shallow vs deep processing</h2>
      <div style="margin-top:44px;flex:1">
        <table class="tbl c4-tbl">
          <thead><tr><th style="width:280px">Aspect</th><th>Shallow processing</th><th style="color:var(--accent)">Deep processing</th></tr></thead>
          <tbody>
            <tr><td>Focus</td><td>Surface features: appearance, sound</td><td style="color:var(--text)">Meaning and context</td></tr>
            <tr><td>Effort</td><td>Low</td><td style="color:var(--text)">High</td></tr>
            <tr><td>Retention</td><td>Weak and short-lived</td><td style="color:var(--text)">Strong and long-lasting</td></tr>
            <tr><td>Example</td><td>Noticing a word is in uppercase</td><td style="color:var(--text)">Relating the word’s meaning to your life</td></tr>
            <tr><td>Question type</td><td>“Is the word in capital letters?”</td><td style="color:var(--text)">“What does this mean for me?”</td></tr>
            <tr><td>Study habit</td><td>Highlighting and re-reading</td><td style="color:var(--text)">Explaining, linking, making examples</td></tr>
          </tbody>
        </table>
      </div>
      <div class="callout" data-step="1">Your <b>Lab 4</b> report asks you to connect your recall score to <b>levels of processing</b>.</div>`,
    src: 'Ch4 · Shallow vs deep processing',
  });

  /* 12 — Testing effect + Ebbinghaus curve */
  const curve = [[0, 100, '0'], [1, 58, '20 min'], [2, 44, '1 h'], [3, 36, '9 h'], [4, 34, '1 day'], [5, 28, '2 days'], [6, 25, '6 days'], [7, 21, '31 days']];
  const cx = i => 110 + i * 120, cy = v => 540 - v * 4.6;
  const cPath = curve.map((p, i) => (i ? 'L' : 'M') + cx(p[0]) + ',' + cy(p[1])).join(' ');
  slides.push({
    title: 'Testing effect',
    html: `
      <div class="eyebrow">Learning through retrieval</div>
      <h2>The testing effect</h2>
      <p class="lead" style="max-width:1680px"><b>Actively recalling</b> information strengthens memory far more than reviewing it passively. Every time you pull a fact out of memory, it becomes easier to find next time.</p>
      <div class="body" style="gap:40px;margin-top:30px">
        <div class="card c4-curve" id="c4cv" style="width:1060px;padding:24px 30px;display:flex;flex-direction:column">
          <div style="font-size:26px;font-weight:700">Ebbinghaus forgetting curve (1885): <span style="color:var(--red)">% saved</span></div>
          <svg viewBox="0 0 1000 600" style="flex:1;margin-top:8px">
            <defs><linearGradient id="c4fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--red)" stop-opacity=".28"/><stop offset="1" stop-color="var(--red)" stop-opacity="0"/></linearGradient></defs>
            ${[0, 25, 50, 75, 100].map(v => `<line class="grid" x1="90" x2="980" y1="${cy(v)}" y2="${cy(v)}"/><text class="tick" x="76" y="${cy(v) + 7}" text-anchor="end">${v}</text>`).join('')}
            <line class="ax" x1="90" x2="980" y1="540" y2="540"/>
            ${curve.map(p => `<text class="tick" x="${cx(p[0])}" y="578" text-anchor="middle">${p[2]}</text>`).join('')}
            <path class="area" d="${cPath} L${cx(7)},540 L${cx(0)},540 Z"/>
            <path class="ln" d="${cPath}"/>
            ${curve.map((p, i) => `<g class="pt" style="transition-delay:${0.25 + i * 0.3}s"><circle cx="${cx(p[0])}" cy="${cy(p[1])}" r="9"/><text x="${cx(p[0]) + (i ? 4 : 18)}" y="${cy(p[1]) - 20}" text-anchor="${i ? 'middle' : 'start'}">${p[1]}</text></g>`).join('')}
          </svg>
          <div style="font-size:26px;color:var(--red);font-weight:600">Without review, most new learning fades within a day.</div>
        </div>
        <div class="col grow" style="gap:24px">
          <div class="card glow" data-step="1" style="padding:30px;flex:1"><div class="row" style="gap:16px">${ic('check', 'sm')}<h3 style="margin:0">Testing effect</h3></div><p style="font-size:28px;margin-top:12px">Self-testing beats re-reading. It also shows the <b style="color:var(--text)">gaps</b> in what you know.</p><p class="ex">e.g. a short quiz after study</p></div>
          <div class="card" data-step="2" style="padding:30px;flex:1;--accent:var(--teal)"><div class="row" style="gap:16px">${ic('link', 'sm')}<h3 style="margin:0">Why it works</h3></div><p style="font-size:28px;margin-top:12px">Retrieval <b style="color:var(--text)">strengthens the pathway</b> to the memory, adds new cues and forces deeper processing.</p></div>
        </div>
      </div>`,
    src: 'Ch4 · Learning through retrieval: the testing effect',
    enter(c) {
      const box = c.$('#c4cv'), ln = c.$('#c4cv .ln');
      const L = ln.getTotalLength ? ln.getTotalLength() : 1400;
      box.classList.remove('go');
      ln.style.transition = 'none'; ln.style.strokeDasharray = L; ln.style.strokeDashoffset = L;
      void ln.getBoundingClientRect();
      ln.style.transition = '';
      c.timeout(() => { ln.style.strokeDashoffset = 0; box.classList.add('go'); }, 250);
      if (/[?&]shot/.test(location.search)) { ln.style.strokeDashoffset = 0; box.classList.add('go'); }
    },
  });

  /* 13 — Spaced repetition */
  const days = [[1, 'Learn the topic in class'], [2, 'Quick self-quiz, 10 minutes'], [4, 'Explain it to a friend'], [7, 'Past-paper questions'], [14, 'Mixed revision quiz']];
  const dx = d => ((d - 1) / 13 * 100);
  slides.push({
    title: 'Spaced repetition',
    html: `
      <div class="eyebrow">Beat the forgetting curve</div>
      <h2>Spaced repetition</h2>
      <p class="lead" style="max-width:1680px">Spreading study sessions out over time works better than cramming the same total time into one session — the <b>spacing effect</b>, first reported by <b>Ebbinghaus</b>.</p>
      <div class="c4-days">
        <div class="rail"><i id="c4rail"></i></div>
        ${days.map((d, i) => `<div class="d" data-step="${i + 1}" style="left:${dx(d[0])}%"><b>Day ${d[0]}</b><div class="dot"></div></div>`).join('')}
        ${days.slice(1).map((d, i) => `<div class="gl" data-step="${i + 2}" style="left:${(dx(d[0]) + dx(days[i][0])) / 2}%">+${d[0] - days[i][0]} day${d[0] - days[i][0] > 1 ? 's' : ''}</div>`).join('')}
      </div>
      <div class="c4-dcards">${days.map((d, i) => `<div class="card" data-step="${i + 1}"><b>Day ${d[0]}</b><p>${d[1]}</p></div>`).join('')}</div>
      <p class="muted" data-step="5" style="font-size:28px;margin-top:16px;text-align:center"><b style="color:var(--text)">Each gap is longer than the last.</b> Each review is a <b class="accent">retrieval</b>, not a re-read.</p>
      <div class="grid-2 c4-cs" style="margin-top:16px">
        <div class="card" data-step="6" style="--accent:var(--red)"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Cramming</h3><span class="pill">6 hours, the night before</span></div>
          <div class="bars" id="c4cram">${'<i></i>'.repeat(14)}</div>
          <p style="font-size:26px;margin-top:10px">Feels productive, but most of it is gone after the exam.</p></div>
        <div class="card" data-step="6" style="--accent:var(--green)"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Spacing</h3><span class="pill">the same 6 hours over two weeks</span></div>
          <div class="bars" id="c4space">${'<i></i>'.repeat(14)}</div>
          <p style="font-size:26px;margin-top:10px">Stronger memory for the final exam — and for next year’s modules.</p></div>
      </div>`,
    src: 'Ch4 · Spaced repetition: beat the forgetting curve',
    step(c, n) {
      const last = Math.min(n, 5);
      c.$('#c4rail').style.transform = 'scaleX(' + (last ? dx(days[last - 1][0]) / 100 : 0) + ')';
      const cram = c.$$('#c4cram i'), sp = c.$$('#c4space i');
      cram.forEach((b, i) => { const on = n >= 6 && i === 13; b.classList.toggle('on', on); b.style.height = on ? '44px' : '10px'; });
      sp.forEach((b, i) => { const on = n >= 6 && [0, 1, 3, 6, 13].includes(i); b.classList.toggle('on', on); b.style.height = on ? '40px' : '10px'; });
    },
  });

  /* 14 — Implicit learning */
  const imp = [['chat', 'Grammar', 'A child speaks correct Arabic grammar before learning any rules'], ['bike', 'Riding a bike', 'Balance improves with practice, not by reading about it'], ['keyboard', 'Typing', 'Fingers “know” where the keys are without looking'], ['smile', 'Reading faces', 'We sense a friend is upset before we can say why']];
  slides.push({
    title: 'Implicit learning',
    html: `
      <div class="eyebrow">Learning without awareness</div>
      <h2>Implicit learning</h2>
      <p class="lead" style="max-width:1680px">Gaining knowledge <b>without trying</b> and <b>without being aware</b> of exactly what was learned. We can use it, but often <b>cannot explain it</b>.</p>
      <div class="grid-4 c4-imp stagger" style="margin-top:40px">${imp.map(x => `<div class="card">${ic(x[0], 'lg')}<h3>${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</div>
      <div class="body" style="gap:30px;margin-top:30px">
        <div class="col grow" data-step="1"><div class="num" style="font-size:22px;font-weight:700;color:var(--accent);letter-spacing:.1em;text-transform:uppercase">Key features</div>
          <div class="c4-feat">${['No intention or awareness', 'Hard to put into words', 'Builds through repeated exposure', 'Usually resistant to forgetting'].map(f => `<div>${ic('check', 'sm')}${f}</div>`).join('')}</div></div>
        <div class="card" data-step="2" style="width:560px;--accent:var(--teal);padding:30px">${ic('cpu', 'sm')}<p style="font-size:28px;margin-top:12px;color:var(--text)"><b class="accent">Link to AI:</b> machine learning also picks up patterns from examples without being given explicit rules.</p></div>
      </div>`,
    src: 'Ch4 · Implicit learning',
    enter(c) {
      const cards = c.$$('.c4-imp .card'); let i = 0;
      c.interval(() => { cards.forEach((k, j) => k.classList.toggle('lit', j === i)); i = (i + 1) % 4; }, 1500);
    },
  });

  /* 15 — Forgetting overview */
  const fg = [['ban', 'Encoding failure', 'It never got in', 'Encoding', [0]], ['hourglass', 'Decay', 'The trace fades with disuse', 'Storage', [1]], ['refresh', 'Interference', 'Other memories get in the way', 'Storage and retrieval', [1, 2]], ['search', 'Retrieval failure', 'It is there, but the cue is missing', 'Retrieval', [2]]];
  slides.push({
    title: 'Forgetting from long-term memory',
    html: `
      <div class="eyebrow">Part C · Why we forget</div>
      <h2>Forgetting from long-term memory</h2>
      <p class="lead" style="max-width:1680px">Forgetting is normal — even useful: it clears out detail we do not need. Psychologists explain it in <b>four main ways</b>, linked to the <b>three stages</b> of memory.</p>
      <div class="c4-strip" style="margin-top:40px">${['Encoding', 'Storage', 'Retrieval'].map((s, i) => `<div data-s="${i}">${s}</div>`).join('')}</div>
      <div class="grid-4 c4-fg" style="margin-top:24px;flex:1">${fg.map((f, i) => `<div class="card" data-i="${i}">${ic(f[0], 'lg')}<h3>${f[1]}</h3><p>${f[2]}</p><span class="pill tag">Stage: ${f[3]}</span></div>`).join('')}</div>`,
    src: 'Ch4 · Forgetting from long-term memory',
    enter(c) {
      let i = 0, auto = true;
      const show = k => {
        c.$$('.c4-fg .card').forEach((el, j) => el.classList.toggle('lit', j === k));
        c.$$('.c4-strip div').forEach((el, j) => el.classList.toggle('lit', fg[k][4].includes(j)));
      };
      c.$$('.c4-fg .card').forEach((el, j) => c.on(el, 'click', () => { auto = false; show(j); }));
      show(0);
      c.interval(() => { if (!auto) return; i = (i + 1) % 4; show(i); }, 2000);
    },
  });

  /* 16 — Retrieval failure */
  slides.push({
    title: 'Retrieval failure',
    html: `
      <div class="eyebrow">Cue-dependent forgetting · Tulving (1974)</div>
      <h2>Retrieval failure</h2>
      <p class="lead" style="max-width:1680px">The memory is <b>still stored</b>, but we cannot reach it without the <b>right cue</b> — one of the most widely accepted explanations of forgetting.</p>
      <div class="grid-2" style="margin-top:28px">
        <div class="card" style="padding:24px 30px">
          <div class="row" style="justify-content:space-between"><div class="row" style="gap:14px">${ic('book', 'sm')}<h3 style="margin:0">The library analogy</h3></div><button class="btn sm primary" id="c4cue">Give a cue</button></div>
          <div class="c4-shelf" id="c4shelf">${Array.from({ length: 22 }, (_, i) => `<i style="height:${70 + ((i * 37) % 45)}px;background:hsl(${(i * 47) % 360} 22% ${30 + (i % 3) * 6}%)"></i>`).join('')}</div>
          <p style="font-size:27px;margin-top:16px">The book is on the shelf, but without the <b style="color:var(--text)">title or shelf number</b> you cannot find it.</p>
        </div>
        <div class="card" style="padding:24px 30px;--accent:var(--yellow)">
          <div class="row" style="gap:14px">${ic('chat', 'sm')}<h3 style="margin:0">Tip of the tongue</h3></div>
          <div style="font-size:64px;font-weight:800;letter-spacing:.1em;margin:22px 0 14px;color:var(--accent);height:110px;display:flex;align-items:center" id="c4tot">R _ _ _ _</div>
          <p style="font-size:27px">You know an actor’s name — even its first letter — but cannot say it until someone gives a <b style="color:var(--text)">hint</b>.</p>
        </div>
      </div>
      <table class="tbl c4-tbl c4-tight" style="margin-top:20px">
        <thead><tr><th style="width:280px">Type of cue</th><th>Evidence and example</th></tr></thead>
        <tbody>
          <tr><td>Context (place)</td><td>Divers recalled words best in the same place they learned them, on land or underwater <b style="color:var(--text)">(Godden and Baddeley, 1975)</b></td></tr>
          <tr><td>State (mood, body)</td><td>Information learned when calm is easier to recall when calm</td></tr>
          <tr><td>Meaning</td><td>A category hint (“it’s a fruit”) unlocks a word you could not recall</td></tr>
        </tbody>
      </table>`,
    src: 'Ch4 · Retrieval failure (cue-dependent forgetting)',
    enter(c) {
      const books = c.$$('#c4shelf i'); books.forEach(b => b.classList.remove('found'));
      c.on(c.$('#c4cue'), 'click', () => {
        books.forEach(b => b.classList.remove('found'));
        books[(Math.random() * books.length) | 0].classList.add('found');
      });
      const t = c.$('#c4tot'); let on = false;
      c.interval(() => { on = !on; t.style.opacity = on ? 1 : .55; t.style.letterSpacing = on ? '.1em' : '.18em'; }, 1400);
    },
  });

  /* 17 — Interference */
  const blockSvg = (dir) => `<svg viewBox="0 0 200 60"><defs><marker id="c4bl${dir}" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="var(--red)"/></marker></defs>
    <line x1="${dir === 'r' ? 10 : 190}" y1="40" x2="${dir === 'r' ? 182 : 18}" y2="40" stroke="var(--red)" stroke-width="4" marker-end="url(#c4bl${dir})" class="flow-dash"/><text x="100" y="24" text-anchor="middle">blocks</text></svg>`;
  slides.push({
    title: 'Interference theory',
    html: `
      <div class="eyebrow">Competing memories</div>
      <h2>Interference theory</h2>
      <p class="lead" style="max-width:1680px">Forgetting happens because <b>other memories compete</b> with the one we want. Interference is strongest when the memories are <b>similar</b>.</p>
      <div class="grid-2 c4-int" style="margin-top:40px;flex:1">
        <div class="card">
          <h3>Proactive interference</h3><div class="accent" style="font-size:30px;font-weight:700">Old blocks new</div>
          <div class="c4-blk"><div class="m old">Old memory</div><div class="wire">${blockSvg('r')}</div><div class="m new victim">New memory</div></div>
          <p style="font-size:30px;color:var(--text)">You keep writing your <b class="accent">old phone number</b> after getting a new one.</p>
        </div>
        <div class="card" style="--accent:var(--teal)">
          <h3>Retroactive interference</h3><div class="accent" style="font-size:30px;font-weight:700">New blocks old</div>
          <div class="c4-blk"><div class="m old victim">Old memory</div><div class="wire">${blockSvg('l')}</div><div class="m new">New memory</div></div>
          <p style="font-size:30px;color:var(--text)">After learning <b class="accent">Python</b> this semester, you struggle to recall the <b class="accent">Java</b> syntax you learned last year.</p>
        </div>
      </div>`,
    src: 'Ch4 · Interference theory',
  });

  /* 18 — Decay and encoding failure */
  slides.push({
    title: 'Decay and encoding failure',
    html: `
      <div class="eyebrow">Two more explanations</div>
      <h2>Decay theory and encoding failure</h2>
      <div class="grid-2 c4-de" style="margin-top:44px;flex:1">
        <div class="card">
          <div class="row" style="gap:16px">${ic('hourglass')}<h3 style="margin:0">Decay (trace decay)</h3></div>
          <div class="c4-viz"><svg viewBox="0 0 760 130" style="width:100%;height:100%"><path id="c4trace" d="M20 65 C 120 10, 200 120, 300 65 S 480 10, 560 65 S 700 120, 740 65" fill="none" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"/></svg></div>
          <p class="row2"><b>Idea:</b> memory traces fade over time if they are not used or rehearsed.</p>
          <p class="row2"><b>Example:</b> a formula from school you never used again.</p>
          <p class="row2" style="font-size:26px;color:var(--muted)"><b style="color:var(--red)">Limitation:</b> fits sensory and short-term memory better. We often recall very old memories clearly after years without using them, which a simple decay model cannot explain. It is also hard to test, because time always brings new, interfering experiences.</p>
        </div>
        <div class="card" style="--accent:var(--yellow)">
          <div class="row" style="gap:16px">${ic('ban')}<h3 style="margin:0">Encoding failure</h3></div>
          <div class="c4-viz" id="c4gate"><svg viewBox="0 0 760 130" style="width:100%;height:100%"><rect x="470" y="10" width="12" height="110" rx="6" fill="var(--accent)"/><text x="620" y="74" text-anchor="middle" font-size="26" font-weight="700" fill="var(--muted)">long-term memory</text><circle id="c4ball" r="16" cx="40" cy="65" fill="var(--text)"/></svg></div>
          <p class="row2"><b>Idea:</b> we did not truly forget — the information <b style="color:var(--text)">never reached</b> long-term memory.</p>
          <p class="row2"><b>Example:</b> what you ate for breakfast two weeks ago. You did not pay attention to it at the time.</p>
          <p class="row2" style="font-size:26px;color:var(--muted)"><b>Lesson:</b> attention and deep processing at the start prevent later “forgetting”. Scrolling your phone in a lecture is an <b style="color:var(--text)">encoding problem</b>, not a memory problem.</p>
        </div>
      </div>`,
    src: 'Ch4 · Decay theory and encoding failure',
    enter(c) {
      const tr = c.$('#c4trace'), ball = c.$('#c4ball');
      c.loop(t => {
        const k = (t % 4500) / 4500;
        tr.setAttribute('opacity', Math.max(.05, 1 - k));
        tr.setAttribute('stroke-dasharray', k < .1 ? 'none' : (14 * (1 - k) + 2) + ' ' + (k * 30));
        const b = (t % 2400) / 2400; // approach the gate, bounce back
        const x = b < .5 ? 40 + b * 2 * 410 : 450 - (b - .5) * 2 * 410;
        ball.setAttribute('cx', x); ball.setAttribute('opacity', b < .5 ? 1 : 1 - (b - .5) * 1.6);
      });
    },
  });

  /* 19 — Memory ER */
  const DX = ['Proactive interference', 'Retroactive interference', 'Retrieval failure (cue)', 'Retrieval failure (context)', 'Decay', 'Shallow encoding'];
  const ER = [
    ['Salim got a new phone number last month. On every form he still writes the old one.', 0, 'Proactive interference: old blocks new', 'Retrieval practice: recall the new number several times over a few days'],
    ['After learning Python this semester, Mariam cannot recall the Java syntax she learned last year.', 1, 'Retroactive interference: new blocks old', 'Spaced review of Java; list the differences between the two languages'],
    ['Ahmed knows the lecturer’s name. It is “on the tip of his tongue”. When a friend says “it starts with R”, he remembers.', 2, 'Retrieval failure: missing cue', 'Use cues: first letter, where you met, related names'],
    ['Fatma studied in the library and blanked in the exam hall. Back in the library that evening, it all came back.', 3, 'Retrieval failure: context-dependent', 'Study in varied places; mentally rebuild the study setting'],
    ['Khalid learned a maths formula in Grade 9, never used it again, and now cannot recall any part of it.', 4, 'Decay through disuse (or never deeply encoded)', 'Spaced repetition and regular use'],
    ['Noor re-read her notes three times the night before, but remembered almost nothing a week later.', 5, 'Shallow encoding, no retrieval practice', 'Deep processing plus self-testing, spread over days'],
  ];
  slides.push({
    title: 'Memory ER',
    html: `
      <div class="eyebrow">Activity · Memory ER</div>
      <h2>Diagnose the forgetting</h2>
      <div class="c4-er">
        <div class="c4-cases">${ER.map((e, i) => `<div class="card c4-case clickable" data-i="${i}"><h3>${ic('medkit', 'sm')}Case ${i + 1}</h3><p>${e[0]}</p></div>`).join('')}</div>
        <div class="card c4-panel">
          <div class="pill" id="c4erh" style="align-self:flex-start">Pick a patient</div>
          <p id="c4erq" style="font-size:26px;color:var(--text);min-height:110px;line-height:1.35">Choose a case, then select the main cause of forgetting.</p>
          <div class="opts">${DX.map((d, i) => `<button data-d="${i}">${d}</button>`).join('')}</div>
          <div class="c4-rx" id="c4rx"></div>
        </div>
      </div>`,
    src: 'Ch4 · Memory ER: the case files · diagnosis and treatment',
    enter(c) {
      let cur = -1; const solved = new Set();
      const opts = c.$$('.c4-panel .opts button'), rx = c.$('#c4rx');
      const pick = i => {
        cur = i;
        c.$$('.c4-case').forEach((k, j) => k.classList.toggle('sel', j === i));
        c.$('#c4erh').textContent = 'Case ' + (i + 1);
        c.$('#c4erq').textContent = ER[i][0];
        opts.forEach(b => b.className = '');
        rx.classList.remove('show');
        if (solved.has(i)) reveal(i);
      };
      const reveal = i => {
        opts[ER[i][1]].className = 'ok';
        rx.innerHTML = '<b>Diagnosis:</b> ' + ER[i][2] + '<br><b>Treatment:</b> ' + ER[i][3];
        rx.classList.add('show');
      };
      c.$$('.c4-case').forEach((k, i) => { k.classList.remove('sel', 'solved'); c.on(k, 'click', () => pick(i)); });
      opts.forEach(b => c.on(b, 'click', () => {
        if (cur < 0) return;
        if (+b.dataset.d === ER[cur][1]) { solved.add(cur); c.$$('.c4-case')[cur].classList.add('solved'); reveal(cur); }
        else { b.className = ''; void b.offsetWidth; b.className = 'no'; }
      }));
      if (/[?&]shot/.test(location.search)) { pick(0); }
    },
  });

  /* 20 — Summary */
  slides.push({
    title: 'Chapter 4 summary',
    html: `
      <div class="eyebrow">Chapter 4 · Summary</div>
      <h2>Built, kept — and lost</h2>
      <div class="grid-3 c4-sum" style="margin-top:56px;flex:1">
        <div class="card" data-step="1">${ic('layers', 'lg')}<h3>How memory is built</h3><p>Memory encodes, stores and retrieves. Sensory, short-term and long-term stores work together; short-term memory holds about 7 ± 2 chunks. Working memory has a central executive, phonological loop and visuo-spatial sketchpad.</p></div>
        <div class="card" data-step="2" style="--accent:var(--teal)">${ic('bulb', 'lg')}<h3>How we learn and keep it</h3><p>Deep, meaning-based processing beats shallow processing. Self-testing (testing effect) and spacing reviews over time beat re-reading and cramming. Implicit learning happens without awareness.</p></div>
        <div class="card" data-step="3" style="--accent:var(--red)">${ic('hourglass', 'lg')}<h3>Why we forget</h3><p>Encoding failure: it never got in. Decay: traces fade with disuse. Interference: proactive or retroactive competition. Retrieval failure: the memory is there but the cue is missing.</p></div>
      </div>`,
    src: 'Ch4 · Chapter 4 summary',
  });

  /* 21–24 — Quick checks (answers stated directly on the chapter's slides) */
  const qcs = [
    ['Who proposed the <span class="accent">levels of processing</span> theory?', ['Atkinson and Shiffrin', 'Craik and Lockhart', 'Baddeley and Hitch', 'Godden and Baddeley'], 1, '<b>Craik and Lockhart (1972)</b> — deeper, meaning-based processing gives stronger memory.'],
    ['Salim keeps writing his <span class="accent">old</span> phone number after getting a new one. Which explanation fits?', ['Retroactive interference', 'Proactive interference', 'Decay', 'Encoding failure'], 1, '<b>Proactive interference</b> — old blocks new.'],
    ['According to Miller (1956), short-term memory holds about…', ['Under 1 to 3 items', '7 ± 2 items or chunks', '12 letters for a minute', 'An almost unlimited amount'], 1, '<b>7 ± 2</b> items or chunks — most people hold 5 to 9.'],
    ['You know a name is “on the tip of your tongue” and recall it after a hint. This is…', ['Decay', 'Encoding failure', 'Retrieval failure', 'Retroactive interference'], 2, '<b>Retrieval failure</b> — the memory is stored, but the cue was missing.'],
  ];
  qcs.forEach((q, i) => slides.push({
    title: 'Quick check ' + (i + 1),
    html: `<div class="eyebrow">Quick check · ${i + 1} of ${qcs.length} <span class="pill neutral">Tap an answer</span></div><div class="qc-wrap">${Deck.qc(q[0], q[1], q[2], q[3])}</div>`,
    src: 'Ch4 · Review',
  }));

  /* 25 — True / false */
  const tfs = [
    ['Sensory memory has a small capacity but lasts a long time.', false, 'Capacity is large, but it fades fast.'],
    ['Deeper, meaning-based processing gives stronger memory.', true, ''],
    ['Self-testing beats re-reading.', true, ''],
    ['In retroactive interference, old memories block new ones.', false, 'Retroactive: new blocks old.'],
    ['Implicit learning is usually resistant to forgetting.', true, ''],
    ['A simple decay model explains why very old memories can be recalled clearly.', false, 'This is a limitation of decay theory.'],
  ];
  slides.push({
    title: 'True or false',
    html: `
      <div class="eyebrow">Quick check · True or false <span class="pill neutral">Tap each statement</span></div>
      <h2>True or false?</h2>
      <div class="c4-tf-list mt">${tfs.map(t => `<div class="c4-tf ${t[1] ? 't' : 'f'}"><p>${t[0]}</p><div class="ans">${t[1] ? 'True' : 'False'}${t[2] ? `<div>${t[2]}</div>` : ''}</div></div>`).join('')}</div>`,
    src: 'Ch4 · Review',
    enter(c) {
      const all = c.$$('.c4-tf');
      all.forEach(t => { t.classList.remove('show'); c.on(t, 'click', () => t.classList.add('show')); });
      if (/[?&]shot/.test(location.search)) all.forEach(t => t.classList.add('show'));
    },
  });

  /* 26 — Lab 4 live recall test */
  const pairs = [['chunking', 'Memory Technique'], ['visualisation', 'Memory Technique'], ['repetition', 'Memory Technique'], ['mnemonics', 'Memory Technique'], ['association', 'Memory Technique'], ['trial and error', 'Problem-Solving Strategy'], ['algorithm', 'Problem-Solving Strategy'], ['heuristic', 'Problem-Solving Strategy'], ['insight', 'Problem-Solving Strategy']];
  slides.push({
    title: 'Lab 4: recall test',
    html: `
      <div class="eyebrow">Lab 4 · Classifying and recalling concepts</div>
      <h2>Study it. Hide it. Recall it.</h2>
      <p class="lead" style="max-width:1680px">Organising concepts into categories makes later recall easier — much as AI systems <b>group data before retrieval</b>.</p>
      <div class="c4-lab" style="margin-top:28px">
        <div class="card" style="padding:30px">
          <div class="row" style="justify-content:space-between;margin-bottom:18px"><span class="num" style="margin:0">1 · Study phase</span><button class="btn sm" id="c4hide">Hide and start recall</button></div>
          <div class="c4-pairs" id="c4pairs">${pairs.map(p => `<div>${p[0]}<span>${p[1]}</span></div>`).join('')}</div>
        </div>
        <div class="card c4-quiz" style="padding:30px">
          <span class="num" style="margin:0">2 · Recall test</span>
          <div class="concept" id="c4con">—</div>
          <div class="row" style="gap:16px" id="c4btns"><button class="btn" data-c="Memory Technique" disabled>Memory Technique</button><button class="btn" data-c="Problem-Solving Strategy" disabled>Problem-Solving Strategy</button></div>
          <div class="score" id="c4sc">In the lab you type the category; here, tap it.</div>
        </div>
      </div>`,
    src: 'Ch4 · Lab 4: Classifying and Recalling Concepts',
    enter(c) {
      const box = c.$('#c4pairs'), con = c.$('#c4con'), sc = c.$('#c4sc'), btns = c.$$('#c4btns button');
      let order = [], k = 0, right = 0, missed = [];
      box.classList.remove('hide'); con.textContent = '—'; btns.forEach(b => b.disabled = true);
      const ask = () => {
        if (k >= order.length) {
          con.textContent = right + ' / ' + order.length;
          sc.innerHTML = missed.length ? 'Missed: ' + missed.map(p => `<b style="color:var(--text)">${p[0]}</b> → ${p[1]}`).join(' · ') : 'Perfect recall!';
          btns.forEach(b => b.disabled = true); box.classList.remove('hide'); return;
        }
        con.textContent = order[k][0]; sc.textContent = 'Correct so far: ' + right + ' of ' + k;
      };
      c.on(c.$('#c4hide'), 'click', () => {
        order = pairs.slice().sort(() => Math.random() - .5); k = 0; right = 0; missed = [];
        box.classList.add('hide'); btns.forEach(b => b.disabled = false); ask();
      });
      btns.forEach(b => c.on(b, 'click', () => {
        if (k >= order.length) return;
        const p = order[k];
        if (b.dataset.c.toLowerCase() === p[1].toLowerCase()) right++; else missed.push(p);
        k++; ask();
      }));
    },
  });

  Deck.chapter({ id: 'ch4', label: 'Chapter 4', title: 'Memory: Learning, Memory and Forgetting', slides });
})();
