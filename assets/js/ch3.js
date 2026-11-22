/* =========================================================
   Chapter 3 — Cognitive Psychology
   Source: ATM00201 Chapter 3 lecture deck (Semester A 2026-27)
   ========================================================= */
(function () {
  const I = Deck.icon;
  const css = document.createElement('style');
  css.textContent = `
  .c3-opener { justify-content:center; }
  .c3-opener .big-num { font-size:420px; font-weight:800; letter-spacing:-.06em; line-height:.8; color:transparent; -webkit-text-stroke:3px var(--accent); position:absolute; right:110px; top:150px; opacity:.9; }
  .c3-opener h1 { font-size:128px; max-width:1300px; }
  .c3-opener .topics { display:flex; flex-wrap:wrap; gap:14px; margin-top:54px; max-width:1300px; }
  .c3-ico { display:block; color:var(--accent); flex:none; }
  .c3-orbit { position:relative; width:640px; height:640px; flex:none; }
  .c3-orbit .core { position:absolute; left:50%; top:50%; width:230px; height:230px; margin:-115px 0 0 -115px; border-radius:50%; display:grid; place-items:center; text-align:center; font-size:30px; font-weight:750; line-height:1.15; background:radial-gradient(circle at 35% 30%, color-mix(in srgb,var(--accent) 55%, transparent), color-mix(in srgb,var(--accent) 12%, transparent)); border:2px solid var(--accent); box-shadow:0 0 90px -10px var(--accent); }
  .c3-orbit .ring { position:absolute; inset:60px; border-radius:50%; border:1.5px dashed var(--line-2); }
  .c3-orbit .sat { position:absolute; width:170px; margin-left:-85px; margin-top:-48px; text-align:center; padding:16px 10px; border-radius:22px; background:var(--surface); border:1.5px solid var(--line); font-size:23px; font-weight:650; line-height:1.15; transition:border-color .4s, background .4s, box-shadow .4s; }
  .c3-orbit .sat.lit { border-color:var(--accent); background:var(--accent-soft); box-shadow:0 0 40px -8px var(--accent); }
  .c3-q { font-size:36px; font-weight:650; letter-spacing:-.01em; line-height:1.25; min-height:96px; transition:opacity .4s, transform .5s var(--ease); }
  .c3-q.swap { opacity:0; transform:translateY(14px); }
  .c3-dots { display:flex; gap:10px; margin-top:14px; }
  .c3-dots i { width:12px; height:12px; border-radius:50%; background:var(--line-2); transition:background .4s, width .4s; }
  .c3-dots i.on { background:var(--accent); width:34px; border-radius:6px; }
  .c3-fig { position:relative; border-radius:28px; overflow:hidden; background:#fff; border:1px solid var(--line); }
  .c3-fig img { display:block; width:100%; height:100%; object-fit:cover; }
  .c3-fig .tag { position:absolute; bottom:18px; padding:10px 20px; border-radius:999px; font-size:24px; font-weight:700; color:#fff; background:var(--accent); opacity:0; transform:translateY(10px); transition:all .5s var(--ease); }
  .c3-fig .tag.in { opacity:1; transform:none; }
  .c3-sp { display:flex; align-items:center; gap:18px; }
  .c3-sp .box { flex:1; padding:22px 24px; border-radius:22px; background:var(--surface); border:1px solid var(--line); }
  .c3-sp .box b { display:block; font-size:30px; }
  .c3-sp .box span { font-size:25px; color:var(--muted); line-height:1.35; display:block; margin-top:4px; }
  .c3-sp .arr { width:46px; height:46px; color:var(--accent); flex:none; }
  .c3-att .card { padding:0; display:flex; flex-direction:column; }
  .c3-att svg { width:100%; height:230px; display:block; background:color-mix(in srgb,var(--accent) 6%, transparent); border-bottom:1px solid var(--line); }
  .c3-att .txt { padding:26px 30px 30px; }
  .c3-att h3 { font-size:38px; }
  .c3-att p { font-size:27px; }
  .c3-noise { animation: c3jit 1.6s ease-in-out infinite; }
  @keyframes c3jit { 0%,100% { transform:translate(0,0); } 25% { transform:translate(6px,-5px); } 50% { transform:translate(-4px,6px); } 75% { transform:translate(5px,4px); } }
  .c3-fillbar { animation: c3fill 6s linear infinite; transform-origin:left; transform-box:fill-box; }
  @keyframes c3fill { from { transform:scaleX(0); } to { transform:scaleX(1); } }
  .c3-blinkA { animation: c3blink 1.4s steps(1) infinite; }
  .c3-blinkB { animation: c3blink 1.4s steps(1) infinite; animation-delay:.7s; }
  @keyframes c3blink { 0% { opacity:1; } 50% { opacity:.25; } }
  .c3-chips { display:flex; flex-wrap:wrap; gap:12px; }
  .c3-chips .pill { font-size:24px; }
  .c3-rings svg { width:640px; height:640px; overflow:visible; }
  .c3-rings .rg { cursor:pointer; }
  .c3-rings .rg circle { transition: fill .5s, stroke .5s, stroke-width .5s; }
  .c3-rings .rg text { transition: fill .5s; font-weight:700; }
  .c3-big { font-size:84px; font-weight:800; letter-spacing:-.035em; line-height:1; color:var(--accent); transition:opacity .35s, transform .45s var(--ease); }
  .c3-big.swap, .c3-mean.swap { opacity:0; transform:translateY(14px); }
  .c3-mean { font-size:44px; font-weight:600; line-height:1.25; margin-top:18px; letter-spacing:-.01em; transition:opacity .35s, transform .45s var(--ease); }
  .c3-stores { display:grid; grid-template-columns:1fr 70px 1fr 70px 1fr; align-items:stretch; }
  .c3-stores .st { padding:30px 30px; border-radius:var(--r); background:var(--surface); border:1.5px solid var(--line); transition:all .5s var(--ease); position:relative; }
  .c3-stores .st.lit { border-color:var(--accent); background:var(--accent-soft); transform:translateY(-6px); }
  .c3-stores .st h3 { font-size:38px; }
  .c3-stores .st p { font-size:27px; color:var(--text); margin-top:10px; }
  .c3-stores .st .ex { font-size:25px; color:var(--accent); margin-top:14px; font-weight:500; }
  .c3-stores .flow { position:relative; display:grid; place-items:center; }
  .c3-stores .flow svg { width:46px; height:46px; color:var(--accent); }
  .c3-cyc { display:flex; align-items:center; gap:16px; }
  .c3-cyc .p { padding:14px 26px; border-radius:999px; border:1.5px solid var(--line-2); font-size:27px; font-weight:650; transition:all .5s; background:var(--surface); }
  .c3-cyc .p.lit { border-color:var(--accent); background:var(--accent); color:#fff; }
  .c3-cyc .p small { font-weight:450; color:inherit; opacity:.8; font-size:22px; margin-left:8px; }
  .c3-tech { display:grid; grid-template-columns: 440px 1fr; gap:40px; flex:1; min-height:0; }
  .c3-tech .list { display:flex; flex-direction:column; gap:14px; }
  .c3-tech .list button { appearance:none; text-align:left; cursor:pointer; display:flex; align-items:center; gap:18px; padding:22px 26px; border-radius:22px; background:var(--surface); border:1.5px solid var(--line); color:var(--text); font-size:32px; font-weight:650; transition:all .4s var(--ease); }
  .c3-tech .list button span.k { width:44px; height:44px; color:var(--accent); flex:none; }
  .c3-tech .list button.on { border-color:var(--accent); background:var(--accent-soft); transform:translateX(8px); }
  .c3-demo { position:relative; border-radius:var(--r); background:var(--surface); border:1px solid var(--line); padding:42px 48px; display:flex; flex-direction:column; overflow:hidden; }
  .c3-demo .hd { font-size:24px; letter-spacing:.12em; text-transform:uppercase; font-weight:700; color:var(--accent); }
  .c3-demo .how { font-size:40px; font-weight:650; margin-top:12px; line-height:1.2; letter-spacing:-.01em; }
  .c3-demo .stagebox { flex:1; display:grid; place-items:center; min-height:0; }
  .c3-demo .foot { font-size:27px; color:var(--muted); }
  .c3-digits { display:flex; gap:12px; font-size:110px; font-weight:750; font-variant-numeric:tabular-nums; letter-spacing:-.02em; }
  .c3-digits span { display:inline-block; transition: margin .8s var(--ease), color .6s; }
  .c3-digits span.gap { margin-right:60px; }
  .c3-digits.chunked span { color:var(--accent); }
  .c3-house { display:grid; grid-template-columns:repeat(3, 210px); grid-template-rows:repeat(2, 150px); gap:14px; }
  .c3-house div { border:2px solid var(--line-2); border-radius:18px; display:flex; flex-direction:column; justify-content:space-between; padding:14px 18px; font-size:22px; color:var(--muted); font-weight:600; opacity:.35; transition:all .5s; }
  .c3-house div b { font-size:28px; color:var(--text); }
  .c3-house div.in { opacity:1; border-color:var(--accent); background:var(--accent-soft); }
  .c3-rep { width:760px; }
  .c3-rep .bar { height:34px; border-radius:17px; background:var(--surface-2); overflow:hidden; margin-top:18px; }
  .c3-rep .bar i { display:block; height:100%; width:0; background:linear-gradient(90deg, var(--accent), var(--teal)); border-radius:17px; transition:width .6s var(--ease); }
  .c3-rep .line { font-size:38px; font-weight:600; transition: opacity .3s; }
  .c3-roy { display:flex; gap:14px; }
  .c3-roy div { width:110px; height:200px; border-radius:22px; display:flex; align-items:flex-end; justify-content:center; padding-bottom:16px; font-size:62px; font-weight:800; color:#fff; transform:scaleY(.2); transform-origin:bottom; transition:transform .7s var(--ease); text-shadow:0 2px 10px rgba(0,0,0,.35); }
  .c3-roy div.in { transform:none; }
  .c3-assoc { display:flex; align-items:center; gap:36px; }
  .c3-assoc .nd { width:280px; height:200px; border-radius:28px; display:grid; place-items:center; text-align:center; font-size:46px; font-weight:750; border:2px solid var(--line-2); background:var(--surface-2); }
  .c3-assoc .nd small { display:block; font-size:22px; color:var(--muted); font-weight:600; letter-spacing:.1em; text-transform:uppercase; }
  .c3-assoc svg { width:240px; height:60px; overflow:visible; }
  .c3-wheel svg { width:540px; height:540px; overflow:visible; }
  .c3-wheel path { transition: opacity .4s, transform .5s var(--ease); transform-origin:270px 270px; cursor:pointer; }
  .c3-wheel path.dim { opacity:.22; }
  .c3-wheel path.hot { transform:scale(1.05); }
  .c3-glist { display:grid; grid-template-columns:1fr 1fr; gap:12px 22px; }
  .c3-glist .g { display:flex; align-items:center; gap:16px; padding:14px 18px; border-radius:18px; border:1.5px solid transparent; cursor:pointer; transition:all .35s; }
  .c3-glist .g i { width:18px; height:18px; border-radius:50%; flex:none; }
  .c3-glist .g b { font-size:28px; display:block; }
  .c3-glist .g span { font-size:23px; color:var(--muted); display:block; }
  .c3-glist .g.hot { border-color:var(--accent); background:var(--accent-soft); }
  .c3-cycle { flex:none; } .c3-cycle svg { width:620px; height:620px; overflow:visible; display:block; }
  .c3-cycle .nd circle { transition: fill .5s, stroke .5s, r .5s; }
  .c3-cycle .nd text { transition: fill .5s; }
  .c3-stepbig { font-size:30px; letter-spacing:.12em; text-transform:uppercase; font-weight:700; color:var(--accent); }
  .c3-strat .card { padding:28px 30px; display:flex; flex-direction:column; }
  .c3-strat svg { width:100%; height:120px; display:block; margin-bottom:12px; }
  .c3-strat h3 { font-size:34px; }
  .c3-strat p { font-size:26px; color:var(--text); margin-top:6px; }
  .c3-strat .lim { margin-top:auto; padding-top:14px; font-size:24px; color:var(--orange); font-weight:600; }
  .c3-bar .card { --accent:var(--red); padding:24px 28px; }
  .c3-bar h3 { font-size:32px; display:flex; align-items:center; gap:14px; }
  .c3-bar p { font-size:25px; margin-top:6px; }
  .c3-tree svg { width:100%; height:100%; overflow:visible; }
  .c3-tree .br { stroke:var(--line-2); stroke-width:5; fill:none; transition: stroke .5s, stroke-width .5s; }
  .c3-tree .br.win { stroke:var(--accent); stroke-width:9; }
  .c3-tree .opt rect { fill:var(--surface-2); stroke:var(--line-2); stroke-width:2; transition: fill .5s, stroke .5s; }
  .c3-tree .opt.win rect { fill:var(--accent-soft); stroke:var(--accent); }
  .c3-tree .opt text { font-size:26px; font-weight:650; fill:var(--text); }
  .c3-tree .sc { transition: width .8s var(--ease); }
  .c3-dtypes .row { display:grid; grid-template-columns: 220px 1fr; gap:20px; align-items:start; padding:18px 22px; border-radius:20px; border:1.5px solid var(--line); background:var(--surface); cursor:pointer; transition:all .35s; }
  .c3-dtypes .row b { font-size:30px; }
  .c3-dtypes .row p { font-size:25px; color:var(--muted); }
  .c3-dtypes .row p em { font-style:normal; color:var(--accent); }
  .c3-dtypes .row.hot { border-color:var(--accent); background:var(--accent-soft); }
  .c3-rsteps { display:flex; gap:10px; flex-wrap:wrap; }
  .c3-rsteps span { padding:10px 20px; border-radius:999px; font-size:24px; font-weight:650; border:1.5px solid var(--line-2); color:var(--muted); transition:all .45s; }
  .c3-rsteps span.lit { background:var(--accent); border-color:var(--accent); color:#fff; }
  .c3-brain { position:relative; border-radius:28px; overflow:hidden; border:1px solid var(--line); flex:none; }
  .c3-brain img { display:block; width:100%; height:100%; }
  .c3-brain .hs { position:absolute; width:90px; height:90px; margin:-45px 0 0 -45px; border-radius:50%; border:5px solid #16a34a; background:rgba(22,163,74,.18); opacity:0; transition:opacity .4s; pointer-events:none; }
  .c3-brain .hs.on { opacity:1; animation: c3pulse 1.4s ease-in-out infinite; }
  .c3-brain .lb { position:absolute; border-radius:14px; border:4px solid #16a34a; background:rgba(22,163,74,.10); opacity:0; transition:opacity .4s; pointer-events:none; }
  .c3-brain .lb.on { opacity:1; }
  @keyframes c3pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.25); } }
  .c3-btbl td { font-size:27px; padding:16px 20px; }
  .c3-topics .t { display:grid; grid-template-columns:56px 1fr; align-items:center; gap:16px; padding:17px 20px; border-radius:18px; border:1.5px solid transparent; font-size:31px; transition:all .25s; }
  .c3-topics .t b { width:48px; height:48px; border-radius:50%; display:grid; place-items:center; background:var(--surface-2); font-size:24px; color:var(--muted); transition:all .25s; }
  .c3-topics .t.on { border-color:var(--accent); background:var(--accent-soft); }
  .c3-topics .t.on b { background:var(--accent); color:#fff; }
  .c3-ttask li { font-size:28px; line-height:1.4; margin-bottom:10px; color:var(--text); }
  .c3-ttask li::marker { color:var(--accent); font-weight:700; }
  .c3-mini-timer { font-size:72px; font-weight:750; font-variant-numeric:tabular-nums; letter-spacing:-.03em; }
  .c3-sum .card { padding:28px 30px; }
  .c3-sum .card h3 { font-size:31px; display:flex; gap:14px; align-items:center; }
  .c3-sum .card p { font-size:27px; margin-top:10px; }
  .c3-lab { display:grid; grid-template-columns: 720px 1fr; gap:44px; flex:1; min-height:0; margin-top:40px; }
  .c3-lab label { font-size:22px; letter-spacing:.1em; text-transform:uppercase; font-weight:700; color:var(--muted); display:block; margin-bottom:8px; }
  .c3-lab input { width:100%; font:inherit; font-size:30px; padding:16px 22px; border-radius:16px; border:1.5px solid var(--line-2); background:var(--surface); color:var(--text); outline:none; }
  .c3-lab input:focus { border-color:var(--accent); }
  .c3-lab .seg { flex-wrap:wrap; }
  .c3-lab .seg button { font-size:25px; padding:12px 22px; }
  .c3-term { border-radius:var(--r); background:#0c0c0e; border:1px solid var(--line); padding:34px 40px; font-family:var(--mono); color:#e5e5e7; font-size:27px; line-height:1.55; overflow:hidden; }
  .c3-term .k { color:#30d158; }
  .c3-term .h { color:#ffd60a; font-weight:700; }
  .c3-term .cd { color:#8e8e93; }
  :root[data-theme="light"] .c3-term { background:#1d1d1f; }
  .c3-tf-list { display:flex; flex-direction:column; gap:16px; }
  .c3-tf { display:grid; grid-template-columns: 1fr 200px; gap:24px; align-items:center; padding:26px 34px; border-radius:var(--r); background:var(--surface); border:1px solid var(--line); cursor:pointer; transition:all .45s var(--ease); }
  .c3-tf p { font-size:34px; }
  .c3-tf .why { font-size:24px; color:var(--muted); max-height:0; overflow:hidden; transition:max-height .5s var(--ease), margin .5s; }
  .c3-tf.show .why { max-height:60px; margin-top:6px; }
  .c3-tf .ans { font-size:30px; font-weight:750; text-align:right; opacity:0; transform:translateX(20px); transition:all .5s var(--ease); }
  .c3-tf.show .ans { opacity:1; transform:none; }
  .c3-tf.show.t { border-color:var(--green); } .c3-tf.show.t .ans { color:var(--green); }
  .c3-tf.show.f { border-color:var(--red); } .c3-tf.show.f .ans { color:var(--red); }
  `;
  document.head.appendChild(css);

  const ic = (name, size) => `<span class="c3-ico" style="width:${size}px;height:${size}px">${I(name, 'ic')}</span>`;
  const swapText = (c, el, html) => { el.classList.add('swap'); c.timeout(() => { el.innerHTML = html; el.classList.remove('swap'); }, 230); };

  const slides = [];

  /* 1 — opener */
  slides.push({
    title: 'Chapter 3 opener', cls: 'c3-opener',
    html: `
      <div class="big-num rise">03</div>
      <div class="eyebrow rise">Chapter 3</div>
      <h1 class="rise d1">Cognitive<br><span class="grad">Psychology</span></h1>
      <p class="lead rise d2" style="max-width:1150px">Perception, attention, language, memory, intelligence, problem-solving, decision-making, cognitive neuroscience and computational cognitive science.</p>
      <div class="topics rise d3">${['Perception', 'Attention', 'Language', 'Memory', 'Intelligence', 'Problem-solving', 'Decision-making', 'Neuroscience', 'Computer models'].map(t => `<span class="pill">${t}</span>`).join('')}</div>`
  });

  /* 2 — introduction */
  const sats = ['Attention', 'Human intelligence', 'Perception', 'Language', 'Thinking & problem-solving', 'Memory'];
  const everyday = ['How do we remember a phone number?', 'How do we choose lunch?', 'How do we recognise a friend in a crowd?'];
  slides.push({
    title: 'Introduction to cognitive psychology',
    html: `
      <div class="eyebrow">Introduction</div>
      <h2>Cognitive psychology</h2>
      <div class="body" style="align-items:center;gap:70px;margin-top:20px">
        <div class="c3-orbit" id="orb">
          <div class="ring"></div>
          <div class="core">Cognitive<br>psychology</div>
          ${sats.map(s => `<div class="sat">${s}</div>`).join('')}
        </div>
        <div class="col grow" style="gap:26px">
          <p class="quote-big" style="font-size:44px">Studies <em>mental processes</em> — how people <em>think, perceive, remember</em> and <em>learn</em>.</p>
          <div class="col" style="gap:12px">
            ${[['layers', 'Examines language use, attention, memory, perception, problem-solving and decision-making.'], ['globe', 'Explores how people understand and interact with the world.'], ['flask', 'Uses scientific methods and experiments to study how people process information.']].map((x, i) => `<div class="row" data-step="${i + 1}" style="gap:18px;align-items:flex-start">${ic(x[0], 40)}<p style="font-size:29px">${x[1]}</p></div>`).join('')}
          </div>
          <div class="card" style="padding:26px 32px">
            <span class="num">Everyday questions</span>
            <div class="c3-q" id="evq">${everyday[0]}</div>
            <div class="c3-dots">${everyday.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div>
          </div>
          <div class="row" data-step="4" style="gap:14px;flex-wrap:wrap"><span class="small muted" style="margin-right:6px">Applications</span>${[['book', 'Education'], ['cpu', 'Artificial intelligence'], ['heart', 'Mental health']].map(a => `<span class="pill" style="font-size:24px"><span style="width:26px;height:26px;display:inline-block">${I(a[0], 'ic')}</span>${a[1]}</span>`).join('')}</div>
        </div>
      </div>`,
    src: 'Ch3 · Introduction to cognitive psychology',
    enter(c) {
      const el = c.$$('#orb .sat');
      c.loop(t => {
        const lit = Math.floor(t / 1400) % el.length;
        el.forEach((s, i) => {
          const a = (i / el.length) * Math.PI * 2 + t / 14000 - Math.PI / 2;
          s.style.left = (320 + Math.cos(a) * 255) + 'px';
          s.style.top = (320 + Math.sin(a) * 255) + 'px';
          s.classList.toggle('lit', i === lit);
        });
      });
      let q = 0;
      c.interval(() => {
        q = (q + 1) % everyday.length;
        swapText(c, c.$('#evq'), everyday[q]);
        c.$$('.c3-dots i').forEach((d, i) => d.classList.toggle('on', i === q));
      }, 2600);
    },
  });

  /* 3 — perception */
  slides.push({
    title: 'Perception',
    html: `
      <div class="eyebrow">Cognitive processes</div>
      <h2>Perception</h2>
      <p class="lead">The process of <b>recognising, organising and interpreting</b> sensory information.</p>
      <div class="body" style="gap:56px;margin-top:40px">
        <div class="col" style="width:820px;gap:18px">
          <div class="c3-fig" style="width:820px;height:492px">
            <img src="assets/img/impossible-figure.jpg" alt="Two people look at the same drawing: one says four, the other says no, three">
            <div class="tag" id="tg1" style="left:24px">Interpretation 1: “Four”</div>
            <div class="tag" id="tg2" style="right:24px;background:var(--teal)">Interpretation 2: “Three”</div>
          </div>
          <p class="callout" style="font-size:28px">The <b>same sensory input</b> may support more than one interpretation.</p>
        </div>
        <div class="col grow" style="gap:20px">
          <div class="c3-sp" data-step="1">
            <div class="box" style="--accent:var(--teal)"><b class="accent">Sensation</b><span>receives the data</span></div>
            <span class="arr">${I('arrowR', 'ic')}</span>
            <div class="box"><b class="accent">Perception</b><span>gives meaning to it</span></div>
          </div>
          <table class="tbl" data-step="2" style="margin-top:8px">
            <thead><tr><th>Area</th><th>Examples</th></tr></thead>
            <tbody>
              <tr><td>Types</td><td>Visual, auditory and tactile perception</td></tr>
              <tr><td>Attention</td><td>What we focus on changes what we perceive</td></tr>
              <tr><td>Past experience</td><td>Previous knowledge influences expectations</td></tr>
              <tr><td>Context</td><td>The environment can change interpretation</td></tr>
            </tbody>
          </table>
        </div>
      </div>`,
    src: 'Ch3 · Perception',
    enter(c) {
      const a = c.$('#tg1'), b = c.$('#tg2'); let s = 0;
      const tick = () => { s = (s + 1) % 3; a.classList.toggle('in', s >= 1); b.classList.toggle('in', s >= 2); };
      tick(); c.interval(tick, 1600);
    },
  });

  /* 4 — attention (three types in Ch3) */
  const noiseDots = Array.from({ length: 26 }, (_, i) => [30 + (i * 137) % 360, 30 + (i * 71) % 170]);
  slides.push({
    title: 'Attention',
    html: `
      <div class="eyebrow">Cognitive processes</div>
      <h2>Attention</h2>
      <p class="lead">The mental process of <b>focusing awareness</b> on selected information while <b>ignoring</b> other information.</p>
      <div class="grid-3 c3-att stagger" style="margin-top:40px">
        <div class="card">
          <svg viewBox="0 0 420 230">
            ${noiseDots.map((d, i) => `<circle class="c3-noise" style="animation-delay:-${(i % 7) * .23}s" cx="${d[0]}" cy="${d[1]}" r="6" fill="var(--line-2)"/>`).join('')}
            <circle cx="210" cy="115" r="62" fill="none" stroke="var(--accent)" stroke-width="4" class="pulse"/>
            <g transform="translate(180,85) scale(2.5)" color="var(--accent)">${I('book').replace('class="icon"', 'width="24" height="24"')}</g>
          </svg>
          <div class="txt"><h3>Selective</h3><p>Focus on one source and ignore distractions.</p><p class="ex">e.g. Reading in a noisy room</p></div>
        </div>
        <div class="card">
          <svg viewBox="0 0 420 230">
            <text x="30" y="58" font-size="22" font-weight="700" fill="var(--muted)">focus</text>
            <line x1="30" y1="92" x2="390" y2="92" stroke="var(--accent)" stroke-width="6" stroke-linecap="round"/>
            <rect x="30" y="150" width="360" height="22" rx="11" fill="var(--surface-2)"/>
            <rect class="c3-fillbar" x="30" y="150" width="360" height="22" rx="11" fill="var(--accent)"/>
            <text x="30" y="208" font-size="22" font-weight="700" fill="var(--muted)">time →</text>
          </svg>
          <div class="txt"><h3>Sustained</h3><p>Maintain focus for a period of time.</p><p class="ex">e.g. Watching a long lecture or film</p></div>
        </div>
        <div class="card">
          <svg viewBox="0 0 420 230">
            <g class="c3-blinkA"><rect x="40" y="40" width="160" height="150" rx="24" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="3"/><g transform="translate(84,79) scale(3)" color="var(--accent)">${I('chat').replace('class="icon"', 'width="24" height="24"')}</g></g>
            <g class="c3-blinkB"><rect x="220" y="40" width="160" height="150" rx="24" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="3"/><g transform="translate(264,79) scale(3)" color="var(--accent)">${I('car').replace('class="icon"', 'width="24" height="24"')}</g></g>
          </svg>
          <div class="txt"><h3>Divided</h3><p>Manage more than one task.</p><p class="ex">e.g. Talking while driving</p></div>
        </div>
      </div>
      <div class="grid-2" style="margin-top:26px">
        <div class="callout" data-step="1"><b>Why it matters:</b> attention supports learning, memory, problem-solving and decision-making.</div>
        <div class="callout" data-step="2" style="--accent:var(--orange)"><b>What influences it:</b> task difficulty, fatigue, interest, motivation, noise and interruptions.</div>
      </div>`,
    src: 'Ch3 · Attention',
  });

  /* 5 — language */
  const lang = [
    ['Phonology', 'Sounds of language', 'ear'],
    ['Syntax', 'Sentence structure and grammar', 'layers'],
    ['Semantics', 'Meaning of words and sentences', 'book'],
    ['Pragmatics', 'How context influences communication', 'users'],
  ];
  const ringR = [105, 175, 245, 312];
  slides.push({
    title: 'Language',
    html: `
      <div class="eyebrow">Cognitive processes</div>
      <h2>Language</h2>
      <p class="lead">A <b>system of symbols and rules</b> used for meaningful communication. It supports cognitive development and social interaction.</p>
      <div class="body c3-rings" style="align-items:center;gap:70px;margin-top:10px">
        <svg viewBox="-320 -320 640 640">
          ${lang.slice().reverse().map((l, j) => { const i = 3 - j; return `<g class="rg" data-i="${i}"><circle r="${ringR[i]}" fill="var(--surface)" stroke="var(--line-2)" stroke-width="2"/><text y="${i ? -ringR[i] + 44 : 58}" text-anchor="middle" font-size="${i ? 27 : 25}" fill="var(--muted)">${l[0]}</text></g>`; }).join('')}
          <g transform="translate(-27,-46) scale(2.25)" color="var(--accent)" pointer-events="none">${I('chat').replace('class="icon"', 'width="24" height="24"')}</g>
        </svg>
        <div class="col grow" style="gap:20px">
          <div class="pill neutral" id="lnN" style="align-self:flex-start">Component 1 of 4</div>
          <div class="c3-big" id="lnT">Phonology</div>
          <div class="c3-mean" id="lnM">Sounds of language</div>
          <div class="card mt" style="padding:26px 32px">
            <p style="font-size:28px;color:var(--text)">Language helps people <b class="accent">express thoughts</b>, <b class="accent">share knowledge</b> and <b class="accent">build relationships</b>.</p>
            <div class="c3-chips mt-s"><span class="small muted" style="align-self:center">Language processing uses</span>${['Memory', 'Attention', 'Perception'].map(x => `<span class="pill">${x}</span>`).join('')}</div>
          </div>
        </div>
      </div>`,
    src: 'Ch3 · Language',
    enter(c) {
      let cur = -1, auto = true;
      const set = i => {
        if (i === cur) return; cur = i;
        c.$$('.rg').forEach(g => {
          const k = +g.dataset.i, on = k === i, inside = k < i;
          g.querySelector('circle').setAttribute('fill', on ? 'var(--accent-soft)' : 'var(--surface)');
          g.querySelector('circle').setAttribute('stroke', on ? 'var(--accent)' : 'var(--line-2)');
          g.querySelector('circle').setAttribute('stroke-width', on ? 5 : 2);
          g.querySelector('text').setAttribute('fill', on ? 'var(--accent)' : 'var(--muted)');
          void inside;
        });
        c.$('#lnN').textContent = 'Component ' + (i + 1) + ' of 4';
        swapText(c, c.$('#lnT'), lang[i][0]);
        swapText(c, c.$('#lnM'), lang[i][1]);
      };
      c.$$('.rg').forEach(g => c.on(g, 'click', () => { auto = false; set(+g.dataset.i); }));
      set(0);
      c.interval(() => { if (auto) set((cur + 1) % 4); }, 2600);
    },
  });

  /* 6 — memory */
  const stores = [
    ['Sensory memory', 'Holds sensory input for a few seconds', 'A brief image after looking away'],
    ['Short-term memory', 'Temporarily holds limited information', 'Remembering a phone number briefly'],
    ['Long-term memory', 'Stores information for a long period', 'Remembering the first day at school'],
  ];
  slides.push({
    title: 'Memory',
    html: `
      <div class="eyebrow">Cognitive processes</div>
      <h2>Memory</h2>
      <p class="lead">Allows people to <b>encode, store and retrieve</b> information. It supports learning and helps past experience guide present behaviour.</p>
      <div class="c3-stores" style="margin-top:46px">
        ${stores.map((s, i) => `<div class="st"><h3>${s[0]}</h3><p>${s[1]}</p><p class="ex">e.g. ${s[2]}</p></div>${i < 2 ? `<div class="flow">${I('arrowR', 'ic').replace('class="ic"', 'class="ic" style="width:46px;height:46px;color:var(--accent)"')}</div>` : ''}`).join('')}
      </div>
      <div class="row" style="margin-top:44px;justify-content:space-between;align-items:center;gap:30px">
        <div class="col" style="gap:12px">
          <div class="small" style="letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--faint);font-size:22px">Main processes</div>
          <div class="c3-cyc">
            <div class="p">Encoding<small>convert</small></div>${ic('arrowR', 30)}
            <div class="p">Storage<small>maintain</small></div>${ic('arrowR', 30)}
            <div class="p">Retrieval<small>access</small></div>
          </div>
        </div>
        <div class="col" data-step="1" style="gap:12px">
          <div class="small" style="letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--faint);font-size:22px">Influences</div>
          <div class="c3-chips">${['Sleep', 'Emotion', 'Practice', 'Attention'].map(x => `<span class="pill" style="--accent:var(--orange)">${x}</span>`).join('')}</div>
        </div>
      </div>`,
    src: 'Ch3 · Memory',
    enter(c) {
      const st = c.$$('.c3-stores .st'), ps = c.$$('.c3-cyc .p');
      let i = 0;
      c.interval(() => { st.forEach((s, j) => s.classList.toggle('lit', j === i % 3)); ps.forEach((p, j) => p.classList.toggle('lit', j === i % 3)); i++; }, 1300);
    },
  });

  /* 7 — memory techniques */
  const techs = [
    ['chunk', 'Chunking', 'layers', 'Break information into smaller groups'],
    ['vis', 'Visualisation', 'image', 'Create a mental image or diagram'],
    ['rep', 'Repetition', 'refresh', 'Repeat information to support storage'],
    ['mne', 'Mnemonics', 'sparkle', 'Use a pattern, rhyme or acronym'],
    ['asc', 'Association', 'link', 'Connect new information with known information'],
  ];
  const rainbow = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#007aff', '#5856d6', '#af52de'];
  slides.push({
    title: 'Memory techniques',
    html: `
      <div class="eyebrow">Memory</div>
      <h2>Memory techniques</h2>
      <p class="lead">Techniques that improve how people <b>encode, store and retrieve</b> information. Tap one to try it.</p>
      <div class="c3-tech" style="margin-top:36px">
        <div class="list">${techs.map((t, i) => `<button data-k="${t[0]}" class="${i ? '' : 'on'}"><span class="k">${I(t[2], 'ic')}</span>${t[1]}</button>`).join('')}</div>
        <div class="c3-demo">
          <div class="hd" id="tHd">Chunking</div>
          <div class="how" id="tHow">Break information into smaller groups</div>
          <div class="stagebox" id="tStage"></div>
          <div class="foot" id="tFoot"></div>
        </div>
      </div>`,
    src: 'Ch3 · Memory techniques',
    enter(c) {
      const stage = c.$('#tStage'), foot = c.$('#tFoot');
      let timers = [];
      const clear = () => { timers.forEach(clearTimeout); timers.forEach(clearInterval); timers = []; };
      const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); };
      const every = (fn, ms) => { const id = setInterval(fn, ms); timers.push(id); };
      const demos = {
        chunk() {
          stage.innerHTML = `<div class="c3-digits" id="dg">${'9876543210'.split('').map(d => `<span>${d}</span>`).join('')}</div>`;
          foot.innerHTML = 'Example from the deck: <b style="color:var(--text)">987 654 3210</b> — ten digits become three groups.';
          const run = () => {
            const dg = c.$('#dg'); if (!dg) return;
            dg.classList.remove('chunked'); dg.querySelectorAll('span').forEach(s => s.classList.remove('gap'));
            later(() => { const sp = dg.querySelectorAll('span'); sp[2].classList.add('gap'); sp[5].classList.add('gap'); dg.classList.add('chunked'); }, 1300);
          };
          run(); every(run, 4200);
        },
        vis() {
          const rooms = [['Kitchen', 'milk'], ['Hall', 'bread'], ['Living room', 'apples'], ['Bedroom', 'rice'], ['Bathroom', 'soap'], ['Garden', 'eggs']];
          stage.innerHTML = `<div class="c3-house">${rooms.map(r => `<div><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div>`;
          foot.innerHTML = 'Example from the deck: <b style="color:var(--text)">place grocery items in imagined rooms</b> (items shown are illustrative).';
          const cells = stage.querySelectorAll('.c3-house div'); let k = 0;
          every(() => { cells.forEach((d, j) => d.classList.toggle('in', j <= k % 7 && k % 7 < 6 + 1)); k++; if (k % 7 === 0) cells.forEach(d => d.classList.remove('in')); }, 650);
        },
        rep() {
          stage.innerHTML = `<div class="c3-rep"><div class="line" id="rl">“Recite a definition…”</div><div class="bar"><i id="rb"></i></div><div class="small muted" style="margin-top:12px" id="rc">Repetition 0</div></div>`;
          foot.innerHTML = 'Example from the deck: <b style="color:var(--text)">recite a definition several times</b>.';
          let n = 0;
          every(() => { n = n >= 6 ? 0 : n + 1; const b = c.$('#rb'); if (!b) return; b.style.width = (n / 6 * 100) + '%'; c.$('#rc').textContent = 'Repetition ' + n; const l = c.$('#rl'); l.style.opacity = .3; later(() => l.style.opacity = 1, 200); }, 900);
        },
        mne() {
          stage.innerHTML = `<div class="col center-x" style="gap:34px"><div class="c3-roy">${'ROYGBIV'.split('').map((ch, i) => `<div style="background:${rainbow[i]}">${ch}</div>`).join('')}</div>
            <div class="row" style="gap:16px"><span class="pill">Class mnemonic</span><span style="font-size:44px;font-weight:800;letter-spacing:.12em">APSTNDP</span><span class="small muted">the seven network-model layers taught in class</span></div></div>`;
          foot.innerHTML = 'Example from the deck: <b style="color:var(--text)">ROYGBIV</b> for the rainbow colours.';
          const run = () => { const bs = stage.querySelectorAll('.c3-roy div'); bs.forEach(b => b.classList.remove('in')); bs.forEach((b, i) => later(() => b.classList.add('in'), 150 + i * 160)); };
          run(); every(run, 4000);
        },
        asc() {
          stage.innerHTML = `<div class="c3-assoc"><div class="nd" style="border-color:var(--accent)"><div><small>New information</small>“Rose”</div></div>
            <svg viewBox="0 0 240 60"><line x1="0" y1="30" x2="240" y2="30" stroke="var(--accent)" stroke-width="5" class="flow-dash"/></svg>
            <div class="nd" style="border-color:var(--pink)"><div><small>Known information</small><span style="font-size:90px;line-height:1">🌹</span></div></div></div>`;
          foot.innerHTML = 'Example from the deck: <b style="color:var(--text)">link the name Rose with the flower</b>.';
        },
      };
      const set = k => {
        clear();
        const t = techs.find(x => x[0] === k);
        c.$$('.c3-tech .list button').forEach(b => b.classList.toggle('on', b.dataset.k === k));
        c.$('#tHd').textContent = t[1]; c.$('#tHow').textContent = t[3];
        demos[k]();
      };
      c.$$('.c3-tech .list button').forEach(b => c.on(b, 'click', () => set(b.dataset.k)));
      c.data.set = set; c.data.clear = clear;
      set('chunk');
    },
    key(c, e) { if (/^[1-5]$/.test(e.key)) c.data.set(techs[+e.key - 1][0]); },
    leave(c) { c.data.clear && c.data.clear(); },
  });

  /* 8 — intelligence */
  const gard = [
    ['Linguistic', 'Reading, writing and speaking', '#2997ff'],
    ['Logical-mathematical', 'Reasoning and problem-solving', '#5e5ce6'],
    ['Musical', 'Sounds and rhythms', '#bf5af2'],
    ['Bodily-kinaesthetic', 'Control of body movement', '#ff375f'],
    ['Spatial', 'Visualising and using space', '#ff9f0a'],
    ['Interpersonal', 'Understanding other people', '#ffd60a'],
    ['Intrapersonal', 'Self-awareness and reflection', '#64d2ff'],
    ['Naturalistic', 'Understanding nature', '#30d158'],
  ];
  const seg = (i, n, r0, r1) => {
    const a0 = (i / n) * Math.PI * 2 - Math.PI / 2 + 0.012, a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2 - 0.012;
    const p = (r, a) => (270 + r * Math.cos(a)).toFixed(1) + ',' + (270 + r * Math.sin(a)).toFixed(1);
    return `M${p(r1, a0)} A${r1},${r1} 0 0 1 ${p(r1, a1)} L${p(r0, a1)} A${r0},${r0} 0 0 0 ${p(r0, a0)} Z`;
  };
  slides.push({
    title: 'Intelligence in cognitive psychology',
    html: `
      <div class="eyebrow">Thinking and action</div>
      <h2>Intelligence</h2>
      <p class="lead">The ability to <b>acquire knowledge, reason, solve problems, adapt</b> to new situations and <b>learn from experience</b>.</p>
      <div class="body" style="gap:50px;align-items:center;margin-top:24px">
        <div class="c3-wheel" style="position:relative">
          <svg viewBox="0 0 540 540">
            ${gard.map((g, i) => `<path data-i="${i}" d="${seg(i, 8, 150, 262)}" fill="${g[2]}"/>`).join('')}
            <text x="270" y="262" text-anchor="middle" font-size="30" font-weight="800" fill="var(--text)">Gardner's</text>
            <text x="270" y="300" text-anchor="middle" font-size="30" font-weight="800" fill="var(--text)">8 forms</text>
          </svg>
        </div>
        <div class="col grow" style="gap:22px">
          <div class="c3-glist">${gard.map((g, i) => `<div class="g" data-i="${i}"><i style="background:${g[2]}"></i><div><b>${g[0]}</b><span>${g[1]}</span></div></div>`).join('')}</div>
          <div class="grid-3" data-step="1" style="gap:16px">
            ${[['heart', 'Emotional', 'Recognising and managing emotions'], ['puzzle', 'Fluid', 'Solving unfamiliar problems'], ['book', 'Crystallised', 'Using learned knowledge']].map(x => `<div class="card" style="padding:20px 24px"><div class="row" style="gap:12px">${ic(x[0], 34)}<b style="font-size:28px">${x[1]}</b></div><p style="font-size:24px;margin-top:6px">${x[2]}</p></div>`).join('')}
          </div>
          <div class="callout" data-step="2" style="font-size:26px">Intelligence influences <b>learning</b>, <b>adaptability</b> and <b>decision-making</b>.</div>
        </div>
      </div>`,
    src: 'Ch3 · Intelligence in cognitive psychology',
    enter(c) {
      let cur = 0, auto = true;
      const set = i => {
        cur = i;
        c.$$('.c3-wheel path').forEach(p => { const k = +p.dataset.i; p.classList.toggle('dim', k !== i); p.classList.toggle('hot', k === i); });
        c.$$('.c3-glist .g').forEach(g => g.classList.toggle('hot', +g.dataset.i === i));
      };
      [...c.$$('.c3-wheel path'), ...c.$$('.c3-glist .g')].forEach(el => c.on(el, 'click', () => { auto = false; set(+el.dataset.i); }));
      set(0);
      c.interval(() => { if (auto) set((cur + 1) % 8); }, 1700);
    },
  });

  /* 9 — problem-solving cycle */
  const psS = [
    ['Identify', 'Recognise that a problem exists'],
    ['Define', 'Understand the details and boundaries'],
    ['Generate', 'Suggest possible solutions'],
    ['Evaluate', 'Compare the available options'],
    ['Implement', 'Put the chosen solution into action'],
    ['Review', 'Check whether the problem is resolved'],
  ];
  const cyc = psS.map((_, i) => { const a = (i / 6) * Math.PI * 2 - Math.PI / 2; return [320 + 240 * Math.cos(a), 320 + 240 * Math.sin(a)]; });
  slides.push({
    title: 'Problem-solving', steps: 7,
    html: `
      <div class="eyebrow">Thinking and action</div>
      <h2>Problem-solving</h2>
      <p class="lead">The cognitive process of <b>finding solutions</b> to difficult or complex issues.</p>
      <div class="body" style="align-items:center;gap:60px;margin-top:10px">
        <div class="c3-cycle">
          <svg viewBox="0 0 640 640">
            <circle cx="320" cy="320" r="240" fill="none" stroke="var(--line-2)" stroke-width="3"/>
            <circle cx="320" cy="320" r="240" fill="none" stroke="var(--accent)" stroke-width="5" stroke-dasharray="1508" stroke-dashoffset="1508" id="arcP" transform="rotate(-90 320 320)" style="transition:stroke-dashoffset .9s var(--ease)"/>
            <circle r="12" fill="var(--accent)" id="spk" style="filter:drop-shadow(0 0 12px var(--accent))"/>
            ${cyc.map((p, i) => `<g class="nd" data-i="${i}"><circle cx="${p[0]}" cy="${p[1]}" r="66" fill="var(--surface)" stroke="var(--line-2)" stroke-width="3"/><text x="${p[0]}" y="${p[1] - 6}" text-anchor="middle" font-size="36" font-weight="800" fill="var(--muted)">${i + 1}</text><text x="${p[0]}" y="${p[1] + 26}" text-anchor="middle" font-size="22" font-weight="700" fill="var(--muted)">${psS[i][0]}</text></g>`).join('')}
            <text x="320" y="312" text-anchor="middle" font-size="28" font-weight="800" fill="var(--text)">6 steps</text>
            <text x="320" y="346" text-anchor="middle" font-size="22" fill="var(--muted)">to a solution</text>
          </svg>
        </div>
        <div class="col grow" style="gap:26px">
          <div class="c3-stepbig" id="psN">Press → to walk the cycle</div>
          <div class="c3-big" id="psT" style="font-size:96px">Problem-solving</div>
          <div class="c3-mean" id="psM">Six steps from noticing a problem to checking the result.</div>
          <div class="grid-2" data-step="7" style="margin-top:20px">
            <div class="card" style="padding:26px 30px"><span class="num">Well-defined</span><p style="color:var(--text);font-size:30px">Clear goals.</p></div>
            <div class="card" style="padding:26px 30px;--accent:var(--orange)"><span class="num">Ill-defined</span><p style="color:var(--text);font-size:30px">Vague or unclear goals.</p></div>
          </div>
        </div>
      </div>`,
    src: 'Ch3 · Problem-solving',
    enter(c) {
      const spk = c.$('#spk');
      c.loop(t => { const a = (t / 5000) * Math.PI * 2 - Math.PI / 2; spk.setAttribute('cx', 320 + 240 * Math.cos(a)); spk.setAttribute('cy', 320 + 240 * Math.sin(a)); });
    },
    step(c, n) {
      const k = Math.min(n, 6);
      c.$$('.c3-cycle .nd').forEach((g, i) => {
        const on = i === k - 1, done = i < k;
        g.querySelector('circle').style.fill = on ? 'var(--accent)' : done ? 'color-mix(in srgb, var(--accent) 22%, var(--surface))' : 'var(--surface)';
        g.querySelector('circle').setAttribute('stroke', done ? 'var(--accent)' : 'var(--line-2)');
        g.querySelectorAll('text').forEach(t => t.setAttribute('fill', on ? '#fff' : done ? 'var(--text)' : 'var(--muted)'));
      });
      c.$('#arcP').setAttribute('stroke-dashoffset', 1508 * (1 - k / 6));
      if (k === 0) { c.$('#psN').textContent = 'Press → to walk the cycle'; c.$('#psT').textContent = 'Problem-solving'; c.$('#psM').textContent = 'Six steps from noticing a problem to checking the result.'; }
      else if (n <= 6) { c.$('#psN').textContent = 'Step ' + k + ' of 6'; swapText(c, c.$('#psT'), psS[k - 1][0]); swapText(c, c.$('#psM'), psS[k - 1][1]); }
      else { c.$('#psN').textContent = 'Two kinds of problem'; c.$('#psT').textContent = 'Review'; c.$('#psM').textContent = psS[5][1]; }
    },
  });

  /* 10 — strategies & barriers */
  slides.push({
    title: 'Strategies and barriers',
    html: `
      <div class="eyebrow">Thinking and action</div>
      <h2>Problem-solving strategies and barriers</h2>
      <div class="grid-4 c3-strat stagger" style="margin-top:42px">
        <div class="card">
          <svg viewBox="0 0 300 120">${[0, 1, 2, 3].map(i => `<g><rect x="${20 + i * 70}" y="35" width="50" height="50" rx="12" fill="${i === 3 ? 'var(--accent)' : 'var(--surface-2)'}" stroke="${i === 3 ? 'var(--accent)' : 'var(--red)'}" stroke-width="3"/><text x="${45 + i * 70}" y="70" text-anchor="middle" font-size="26" font-weight="800" fill="${i === 3 ? '#fff' : 'var(--red)'}">${i === 3 ? '✓' : '✕'}</text><animate attributeName="opacity" values="0;1;1" keyTimes="0;.2;1" dur="4s" begin="${i * .6}s" repeatCount="indefinite"/></g>`).join('')}</svg>
          <h3>Trial and error</h3><p>Test different options until one works</p><div class="lim">Limitation: may take time</div>
        </div>
        <div class="card">
          <svg viewBox="0 0 300 120">${[0, 1, 2, 3, 4].map(i => `<rect x="${20 + i * 54}" y="${88 - i * 16}" width="46" height="${16 + i * 16}" rx="6" fill="var(--accent)" opacity="${.35 + i * .15}"/>`).join('')}<circle r="9" fill="var(--yellow)"><animateMotion dur="3s" repeatCount="indefinite" path="M43,70 L97,54 L151,38 L205,22 L259,6"/></circle></svg>
          <h3>Algorithm</h3><p>Follow a step-by-step procedure</p><div class="lim">Limitation: needs a known procedure</div>
        </div>
        <div class="card">
          <svg viewBox="0 0 300 120"><path d="M30,95 C 60,10 110,110 150,40 S 230,100 270,25" fill="none" stroke="var(--line-2)" stroke-width="5" stroke-dasharray="8 8"/><path d="M30,95 L270,25" fill="none" stroke="var(--accent)" stroke-width="6" class="flow-dash"/><circle cx="30" cy="95" r="10" fill="var(--text)"/><circle cx="270" cy="25" r="12" fill="var(--accent)"/></svg>
          <h3>Heuristic</h3><p>Use a quick mental shortcut</p><div class="lim">Limitation: may produce an error</div>
        </div>
        <div class="card">
          <svg viewBox="0 0 300 120"><circle cx="150" cy="60" r="44" fill="var(--yellow)" opacity=".18"><animate attributeName="r" values="30;56;30" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".05;.45;.05" dur="2.4s" repeatCount="indefinite"/></circle><g transform="translate(120,30) scale(2.5)" color="var(--yellow)">${I('bulb').replace('class="icon"', 'width="24" height="24"')}</g></svg>
          <h3>Insight</h3><p>A solution appears suddenly</p><div class="lim">Limitation: cannot be forced</div>
        </div>
      </div>
      <div class="small" data-step="1" style="margin-top:34px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--red);font-size:22px">Common barriers</div>
      <div class="grid-3 c3-bar" style="margin-top:14px">
        ${[['refresh', 'Mental set', 'Repeating an old method even when it is unsuitable'], ['lock', 'Functional fixedness', 'Seeing an object only in its usual function'], ['ban', 'Knowledge or motivation', 'Missing information or limited effort']].map((b, i) => `<div class="card" data-step="${i + 1}"><h3>${ic(b[0], 38)}${b[1]}</h3><p>${b[2]}</p></div>`).join('')}
      </div>
      <div class="callout" data-step="4" style="margin-top:22px">A good problem solver checks <b>both the strategy and the barrier</b>.</div>`,
    src: 'Ch3 · Problem-solving strategies and barriers',
  });

  /* 11 — decision-making */
  const dtypes = [
    ['Rational', 'Logical, step-by-step use of information', 'Compare costs and benefits'],
    ['Intuitive', 'Uses experience, instinct or a quick feeling', 'Recognise a familiar situation'],
    ['Heuristic-based', 'Uses a mental shortcut', 'Choose the option that is easiest to recall'],
    ['Group', 'Several people work towards agreement', 'A project team selects a plan'],
  ];
  const rsteps = ['Identify the decision', 'Gather information', 'Compare alternatives', 'Choose and act'];
  slides.push({
    title: 'Decision-making', steps: 4,
    html: `
      <div class="eyebrow">Thinking and action</div>
      <h2>Decision-making</h2>
      <p class="lead">The cognitive process of <b>selecting one course of action</b> from several alternatives.</p>
      <div class="body" style="gap:44px;margin-top:34px">
        <div class="col c3-dtypes" style="width:820px;gap:14px">
          ${dtypes.map((d, i) => `<div class="row" data-i="${i}"><b>${d[0]}</b><p>${d[1]}<br><em>e.g. ${d[2]}</em></p></div>`).join('')}
        </div>
        <div class="col grow" style="gap:16px">
          <div class="c3-rsteps">${rsteps.map(s => `<span>${s}</span>`).join('')}</div>
          <div class="card c3-tree" style="flex:1;padding:18px">
            <svg viewBox="0 0 760 440">
              <path class="br" data-b="0" d="M150,220 C 300,220 300,80 450,80"/>
              <path class="br" data-b="1" d="M150,220 L450,220"/>
              <path class="br" data-b="2" d="M150,220 C 300,220 300,360 450,360"/>
              <g id="infos">${[0, 1, 2, 3, 4].map(i => `<circle r="9" fill="var(--teal)" opacity="0"><animateMotion dur="2.2s" begin="${i * .44}s" repeatCount="indefinite" path="M${10 + i * 10},${30 + i * 90} L150,220"/></circle>`).join('')}</g>
              <circle cx="150" cy="220" r="62" fill="var(--surface-2)" stroke="var(--accent)" stroke-width="4" id="root"/>
              <text x="150" y="230" text-anchor="middle" font-size="25" font-weight="800" fill="var(--text)">Decide</text>
              ${['Option A', 'Option B', 'Option C'].map((o, i) => `<g class="opt" data-o="${i}"><rect x="450" y="${[45, 185, 325][i]}" width="270" height="70" rx="18"/><text x="475" y="${[89, 229, 369][i]}">${o}</text><rect class="sc" x="610" y="${[72, 212, 352][i]}" height="16" rx="8" width="0" fill="var(--accent)"/></g>`).join('')}
            </svg>
          </div>
        </div>
      </div>`,
    src: 'Ch3 · Decision-making (options are illustrative)',
    enter(c) {
      let k = 0;
      c.$$('.c3-dtypes .row').forEach(r => c.on(r, 'click', () => { k = +r.dataset.i; c.$$('.c3-dtypes .row').forEach(x => x.classList.toggle('hot', x === r)); }));
      c.$$('.c3-dtypes .row')[0].classList.add('hot');
      c.interval(() => { k = (k + 1) % 4; c.$$('.c3-dtypes .row').forEach((x, i) => x.classList.toggle('hot', i === k)); }, 3200);
    },
    step(c, n) {
      c.$$('.c3-rsteps span').forEach((s, i) => s.classList.toggle('lit', i < n));
      c.$('#root').setAttribute('stroke-width', n >= 1 ? 8 : 4); c.$('#root').style.filter = n >= 1 ? 'drop-shadow(0 0 16px var(--accent))' : '';
      c.$$('#infos circle').forEach(ci => ci.setAttribute('opacity', n >= 2 ? 1 : 0));
      c.$$('.c3-tree .sc').forEach((r, i) => r.setAttribute('width', n >= 3 ? [60, 95, 40][i] : 0));
      c.$$('.c3-tree .br').forEach((b, i) => b.classList.toggle('win', n >= 4 && i === 1));
      c.$$('.c3-tree .opt').forEach((o, i) => o.classList.toggle('win', n >= 4 && i === 1));
    },
  });

  /* 12 — cognitive neuroscience */
  // positions in % of the 1205×803 image: hotspot on brain + label box
  const brain = [
    ['Frontal lobe', 'Decision-making, planning and problem-solving', [36, 30], [5.4, 17.4, 22, 20]],
    ['Parietal lobe', 'Sensory processing and spatial orientation', [63, 25], [70.8, 17.4, 26.4, 15.6]],
    ['Temporal lobe', 'Memory and language processing', [46, 54], [4.6, 48, 25, 15]],
    ['Occipital lobe', 'Visual processing', [69, 49], [76.8, 43, 22.2, 10.8]],
    ['Hippocampus', 'Memory formation', [53, 64], [18.9, 69, 22.4, 10.6]],
    ['Amygdala', 'Emotion processing', [58.5, 75], [67.2, 79.7, 22.4, 10.6]],
  ];
  slides.push({
    title: 'Cognitive neuroscience',
    html: `
      <div class="eyebrow">Brain and cognition</div>
      <h2>Cognitive neuroscience: the brain in action</h2>
      <p class="lead">Studies how <b>brain activity</b> supports perception, memory, attention, language and other mental processes.</p>
      <div class="body" style="gap:44px;margin-top:34px;align-items:flex-start">
        <div class="c3-brain" style="width:900px;height:600px">
          <img src="assets/img/brain-areas.jpg" alt="Major brain areas: frontal, parietal, temporal and occipital lobes, hippocampus and amygdala">
          ${brain.map((b, i) => `<div class="hs" data-i="${i}" style="left:${b[2][0]}%;top:${b[2][1]}%"></div><div class="lb" data-i="${i}" style="left:${b[3][0]}%;top:${b[3][1]}%;width:${b[3][2]}%;height:${b[3][3]}%"></div>`).join('')}
        </div>
        <table class="tbl clickrows c3-btbl grow">
          <thead><tr><th>Brain area</th><th>Main cognitive function</th></tr></thead>
          <tbody>${brain.map((b, i) => `<tr data-i="${i}"><td>${b[0]}</td><td>${b[1]}</td></tr>`).join('')}</tbody>
        </table>
      </div>`,
    src: 'Ch3 · Cognitive neuroscience: the brain in action',
    enter(c) {
      let cur = 0, auto = true;
      const set = i => {
        cur = i;
        c.$$('.c3-brain .hs, .c3-brain .lb').forEach(h => h.classList.toggle('on', +h.dataset.i === i));
        c.$$('.c3-btbl tbody tr').forEach(r => r.classList.toggle('hot', +r.dataset.i === i));
      };
      c.$$('.c3-btbl tbody tr').forEach(r => c.on(r, 'click', () => { auto = false; set(+r.dataset.i); }));
      set(0);
      c.interval(() => { if (auto) set((cur + 1) % brain.length); }, 2200);
    },
    key(c, e) { if (/^[1-6]$/.test(e.key)) c.$$('.c3-btbl tbody tr')[+e.key - 1].click(); },
  });

  /* 13 — computational cognitive science */
  const ccs = [
    ['Understanding cognition', 'Models represent how information may be processed'],
    ['Testing theories', 'Simulations help researchers compare predictions with behaviour'],
    ['Artificial intelligence', 'Algorithms imitate selected human abilities'],
    ['Cognitive modelling', 'Computer programs simulate thinking and behaviour'],
    ['Neural networks', 'Systems learn patterns through connected processing units'],
    ['Applications', 'Robotics, adaptive learning systems and virtual assistants'],
  ];
  slides.push({
    title: 'Computational cognitive science',
    html: `
      <div class="eyebrow">Brain and computer models</div>
      <h2>Computational cognitive science</h2>
      <p class="lead">Creates <b>computer models</b> that simulate aspects of human thought and behaviour.</p>
      <div class="body" style="gap:44px;margin-top:30px">
        <div class="col" style="width:720px;gap:16px">
          <div class="card" style="padding:0;flex:1;overflow:hidden"><canvas id="nn" width="720" height="470" style="width:720px;height:470px;display:block"></canvas></div>
          <div class="callout" style="font-size:26px"><b>Example:</b> a model may simulate how people recognise language patterns or learn a game.</div>
        </div>
        <table class="tbl c3-btbl grow">
          <thead><tr><th>Purpose or area</th><th>Description</th></tr></thead>
          <tbody>${ccs.map((r, i) => `<tr data-step="${i < 3 ? 0 : 1}" class="fade"><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody>
        </table>
      </div>`,
    src: 'Ch3 · Computational cognitive science',
    enter(c) {
      const cv = c.$('#nn'), g = cv.getContext('2d');
      const layers = [4, 6, 6, 3], W = 720, H = 470;
      const nodes = layers.map((n, li) => Array.from({ length: n }, (_, k) => [90 + li * (W - 180) / (layers.length - 1), H / 2 + (k - (n - 1) / 2) * 68]));
      const pulses = [];
      c.loop(t => {
        const light = document.documentElement.dataset.theme === 'light';
        const acc = getComputedStyle(c.el).getPropertyValue('--green').trim() || '#30d158';
        g.clearRect(0, 0, W, H);
        for (let li = 0; li < nodes.length - 1; li++) for (const a of nodes[li]) for (const b of nodes[li + 1]) {
          g.strokeStyle = light ? 'rgba(0,0,0,.10)' : 'rgba(255,255,255,.10)'; g.lineWidth = 1.5;
          g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke();
        }
        if (Math.random() < 0.18) {
          const li = (Math.random() * 3) | 0, a = nodes[li][(Math.random() * nodes[li].length) | 0], b = nodes[li + 1][(Math.random() * nodes[li + 1].length) | 0];
          pulses.push({ a, b, k: 0 });
        }
        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i]; p.k += 0.03; if (p.k >= 1) { pulses.splice(i, 1); continue; }
          g.strokeStyle = acc; g.globalAlpha = 1 - p.k; g.lineWidth = 3;
          g.beginPath(); g.moveTo(p.a[0], p.a[1]); g.lineTo(p.a[0] + (p.b[0] - p.a[0]) * p.k, p.a[1] + (p.b[1] - p.a[1]) * p.k); g.stroke();
          g.globalAlpha = 1;
        }
        nodes.forEach((L, li) => L.forEach((n, k) => {
          const act = 0.5 + 0.5 * Math.sin(t / 380 + li * 1.3 + k * 0.9);
          g.fillStyle = light ? '#fff' : '#1c1c21'; g.beginPath(); g.arc(n[0], n[1], 20, 0, 7); g.fill();
          g.globalAlpha = 0.25 + act * 0.75; g.fillStyle = acc; g.beginPath(); g.arc(n[0], n[1], 14, 0, 7); g.fill(); g.globalAlpha = 1;
        }));
        g.fillStyle = light ? '#55555b' : '#a1a1a6'; g.font = '600 20px InterVar, sans-serif'; g.textAlign = 'center';
        g.fillText('input', nodes[0][0][0], 40); g.fillText('connected processing units', W / 2, 40); g.fillText('output', nodes[3][0][0], 40);
      });
    },
  });

  /* 14 — team activity */
  const topics = ['Smartphone notifications and selective attention', 'Study strategies and memory recall', 'Sleep and memory performance', 'Multitasking and task switching', 'Emotional state and decision-making', 'Language context and ambiguous meaning', 'Mental set and problem-solving'];
  slides.push({
    title: 'Team activity: research design',
    html: `
      <div class="eyebrow">Activity</div>
      <h2>Team activity: research question design</h2>
      <div class="body" style="gap:50px;margin-top:36px">
        <div class="col c3-topics" style="width:900px;gap:6px">
          ${topics.map((t, i) => `<div class="t" data-i="${i}"><b>${i + 1}</b><span>${t}</span></div>`).join('')}
          <div class="row" style="margin-top:16px;gap:16px"><button class="btn primary" id="pick">Pick a topic for my team</button><span class="small muted" id="picked"></span></div>
        </div>
        <div class="col grow" style="gap:20px">
          <div class="card" style="padding:30px 34px">
            <span class="num">Team task</span>
            <ol class="c3-ttask" style="margin:8px 0 0;padding-left:34px">
              <li>Choose one topic from the list.</li>
              <li>Write a clear title for the proposed study.</li>
              <li>Write one main research question.</li>
              <li>Write three to five research objectives.</li>
              <li>Predict two or three possible outcomes.</li>
            </ol>
          </div>
          <div class="card row" style="padding:22px 30px;justify-content:space-between">
            <div><span class="num" style="margin-bottom:4px">Present in two minutes</span><p style="font-size:24px">The team leader presents the plan to the class.</p></div>
            <div class="row" style="gap:16px"><div class="c3-mini-timer" id="tm">2:00</div><button class="btn sm" id="tgo">Start</button></div>
          </div>
        </div>
      </div>`,
    src: 'Ch3 · Team activity: research question design',
    enter(c) {
      const rows = c.$$('.c3-topics .t');
      rows.forEach(r => r.classList.remove('on')); c.$('#picked').textContent = '';
      let spinning = false;
      c.on(c.$('#pick'), 'click', () => {
        if (spinning) return; spinning = true;
        const target = Math.floor(Math.random() * 7); let i = 0; const total = 21 + target;
        const spin = () => {
          rows.forEach((r, j) => r.classList.toggle('on', j === i % 7));
          if (i >= total) { spinning = false; c.$('#picked').textContent = 'Topic ' + (target + 1) + ' selected'; return; }
          i++; c.timeout(spin, 60 + Math.pow(i / total, 3) * 340);
        };
        spin();
      });
      let stop = null;
      c.on(c.$('#tgo'), 'click', () => {
        if (stop) stop();
        stop = c.loop(t => {
          const left = Math.max(0, 120 - t / 1000), m = Math.floor(Math.ceil(left) / 60), s = Math.ceil(left) % 60;
          c.$('#tm').textContent = m + ':' + String(s).padStart(2, '0');
          c.$('#tm').style.color = left < 15 ? 'var(--red)' : '';
          if (left <= 0) { stop(); stop = null; }
        });
      });
    },
  });

  /* 15 — summary */
  const sum = [
    ['brain', 'Cognitive psychology', 'Studies how people think, perceive, remember, learn and decide'],
    ['eye', 'Perception and attention', 'Interpret sensory information and select what receives focus'],
    ['chat', 'Language and memory', 'Support communication, learning, storage and retrieval'],
    ['sparkle', 'Intelligence', 'Supports learning, reasoning, adaptation and problem-solving'],
    ['puzzle', 'Problem-solving', 'Uses steps and strategies to reach a goal'],
    ['scale', 'Decision-making', 'Selects among alternatives and may be influenced by bias'],
    ['zap', 'Cognitive neuroscience', 'Links brain areas with cognitive functions'],
    ['cpu', 'Computational cognitive science', 'Uses computer models to study human thought'],
  ];
  slides.push({
    title: 'Chapter 3 summary',
    html: `
      <div class="eyebrow">Chapter 3 · Summary</div>
      <h2>Mind, brain and machine</h2>
      <div class="grid-4 c3-sum stagger" style="margin-top:46px;flex:1">
        ${sum.map(s => `<div class="card"><h3>${ic(s[0], 40)}${s[1]}</h3><p>${s[2]}</p></div>`).join('')}
      </div>
      <div class="callout" style="margin-top:26px">The chapter connects <b>mental processes</b> with everyday behaviour, <b>brain function</b> and <b>computer models</b>.</div>`,
    src: 'Ch3 · Chapter 3 summary',
  });

  /* 16–19 — quick checks (deck's review MCQs) */
  const qcs = [
    ['Which process gives meaning to sensory information?', ['Sensation', 'Perception', 'Storage', 'Repetition'], 1, '<b>Perception</b> gives meaning; sensation only receives the data.'],
    ['Which memory temporarily holds limited information?', ['Sensory', 'Short-term', 'Long-term', 'Naturalistic'], 1, '<b>Short-term memory</b> temporarily holds limited information.'],
    ['Which method follows a step-by-step procedure?', ['Algorithm', 'Insight', 'Bias', 'Intuition'], 0, 'An <b>algorithm</b> follows a step-by-step procedure (but needs a known procedure).'],
    ['Which brain area supports visual processing?', ['Frontal', 'Temporal', 'Occipital', 'Amygdala'], 2, 'The <b>occipital lobe</b> handles visual processing.'],
  ];
  qcs.forEach((q, i) => slides.push({
    title: 'Quick check ' + (i + 1),
    html: `<div class="eyebrow">Quick check · ${i + 1} of ${qcs.length} <span class="pill neutral">Tap an answer</span></div><div class="qc-wrap">${Deck.qc(q[0], q[1], q[2], q[3])}</div>`,
    src: 'Ch3 · Review questions: multiple choice',
  }));

  /* 20 — true or false (deck's six statements) */
  const tfs = [
    ['Selective attention ignores all information.', false, 'It focuses on one source and ignores distractions.'],
    ['Chunking groups information into smaller units.', true, ''],
    ['Mental set can block a new solution.', true, ''],
    ['Confirmation bias favours supporting evidence.', true, ''],
    ['The hippocampus supports memory formation.', true, ''],
    ['Computational cognitive science uses computer models.', true, ''],
  ];
  slides.push({
    title: 'True or false',
    html: `
      <div class="eyebrow">Quick check · True or false <span class="pill neutral">Tap each statement</span></div>
      <h2>True or false?</h2>
      <div class="c3-tf-list" style="margin-top:40px">${tfs.map(t => `<div class="c3-tf ${t[1] ? 't' : 'f'}"><div><p>${t[0]}</p>${t[2] ? `<div class="why">${t[2]}</div>` : ''}</div><div class="ans">${t[1] ? 'True' : 'False'}</div></div>`).join('')}</div>`,
    src: 'Ch3 · Review questions: true or false',
    enter(c) { c.$$('.c3-tf').forEach(t => { t.classList.remove('show'); c.on(t, 'click', () => t.classList.add('show')); }); },
  });

  /* 21 — Lab 3 live simulator (rules exactly as the deck's sample program) */
  const lab = {
    time: ['Choose the most urgent task and schedule 30 minutes for it.', 'After 30 minutes, check whether that task is complete.'],
    information: ['Identify one missing piece of information and find a reliable source.', 'By tomorrow, record the information and its source.'],
    technical: ['Record the error, try a basic fix and seek help if needed.', 'After testing, check whether the error still occurs.'],
    team: ['Contact your group and agree who will complete the next task.', 'At the next meeting, check whether the assigned task is complete.'],
    other: ['Describe the barrier clearly and discuss it with your lecturer.', 'After the discussion, write down one agreed next step.'],
  };
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  slides.push({
    title: 'Lab 3: Goal-directed problem solver',
    html: `
      <div class="eyebrow">Python laboratory · Lab 3</div>
      <h2>Goal-directed problem solver</h2>
      <p class="lead" style="font-size:32px">A student has a clear project goal, but <b>one main barrier</b> is blocking progress. The program recommends the next action — try it live.</p>
      <div class="c3-lab">
        <div class="col" style="gap:20px">
          <div><label for="c3n">Student name</label><input id="c3n" value="Aisha" autocomplete="off"></div>
          <div><label for="c3g">Project goal</label><input id="c3g" value="Finish the project report" autocomplete="off"></div>
          <div><label>Main barrier</label><div class="seg" id="c3b">${Object.keys(lab).map((k, i) => `<button data-b="${k}" class="${k === 'information' ? 'on' : ''}">${k}</button>`).join('')}</div></div>
          <p class="small muted" style="font-size:24px">Input → standardise the barrier → compare with the rules (<span class="mono">if / elif / else</span>) → action + checkpoint.</p>
        </div>
        <div class="c3-term" id="c3out"></div>
      </div>`,
    src: 'Ch3 · Lab 3 sample program (rules as given in the deck)',
    enter(c) {
      let barrier = 'information';
      const render = () => {
        const r = lab[barrier];
        c.$('#c3out').innerHTML = `<div class="cd"># barrier = input().strip().lower()  →  "${barrier}"</div>
          <div class="cd"># ${barrier === 'other' ? 'else' : (barrier === 'time' ? 'if' : 'elif') + ' barrier == "' + barrier + '"'}:</div><br>
          <div class="h">--- YOUR PROJECT ACTION PLAN ---</div>
          <div><span class="k">Student name:</span> ${esc(c.$('#c3n').value)}</div>
          <div><span class="k">Project goal:</span> ${esc(c.$('#c3g').value)}</div>
          <div><span class="k">Main barrier:</span> ${barrier}</div>
          <div><span class="k">Recommended action:</span> ${r[0]}</div>
          <div><span class="k">Checkpoint:</span> ${r[1]}</div>`;
      };
      c.$$('#c3b button').forEach(b => c.on(b, 'click', () => { barrier = b.dataset.b; c.$$('#c3b button').forEach(x => x.classList.toggle('on', x === b)); render(); }));
      c.on(c.$('#c3n'), 'input', render); c.on(c.$('#c3g'), 'input', render);
      render();
    },
  });

  Deck.chapter({ id: 'ch3', label: 'Chapter 3', title: 'Cognitive Psychology', slides });
})();
