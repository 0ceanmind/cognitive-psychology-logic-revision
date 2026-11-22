/* =========================================================
   Chapter 2 — Human Intelligence and Approaches to AI
   Source: ATM00201 Chapter 2 lecture deck (Semester A 2026-27)
   ========================================================= */
(function () {
  const I = Deck.icon;
  const css = document.createElement('style');
  css.textContent = `
  .c2-opener { justify-content:center; }
  .c2-opener .c2-bignum { font-size:420px; font-weight:800; letter-spacing:-.06em; line-height:.8; color:transparent; -webkit-text-stroke:3px var(--accent); position:absolute; right:110px; bottom:110px; opacity:.55; }
  .c2-opener h1 { font-size:128px; max-width:1300px; }
  .c2-opener .c2-topics { display:flex; flex-wrap:wrap; gap:14px; margin-top:54px; max-width:1000px; }
  .c2-ico { display:block; color:var(--accent); flex:none; }
  .c2-abil { display:flex; flex-direction:column; padding:36px 30px; }
  .c2-abil h3 { font-size:38px; margin:22px 0 12px; }
  .c2-abil p { font-size:27px; color:var(--text); }
  .c2-abil .c2-eg { margin-top:auto; padding-top:24px; border-top:1px solid var(--line); font-size:25px; color:var(--accent); font-weight:550; line-height:1.35; }
  .c2-loop { position:relative; width:1680px; height:520px; margin-top:44px; }
  .c2-loop > svg { position:absolute; inset:0; overflow:visible; }
  .c2-node { position:absolute; top:0; width:360px; height:200px; border-radius:26px; background:var(--surface); border:1.5px solid var(--line); padding:26px 28px; transition:all .5s var(--ease); }
  .c2-node b { display:flex; align-items:center; gap:14px; font-size:29px; line-height:1.15; letter-spacing:-.01em; }
  .c2-node > span { display:block; font-size:24px; color:var(--muted); margin-top:12px; line-height:1.35; }
  .c2-node.lit { border-color:var(--accent); background:var(--accent-soft); box-shadow:0 0 60px -10px var(--accent); transform:translateY(-6px); }
  .c2-band { position:absolute; left:40px; right:40px; top:250px; height:96px; border-radius:22px; display:flex; align-items:center; justify-content:center; gap:18px; font-size:30px; font-weight:600; text-align:center;
    background:linear-gradient(90deg, color-mix(in srgb,var(--orange) 22%,transparent), color-mix(in srgb,var(--pink) 22%,transparent), color-mix(in srgb,var(--orange) 22%,transparent));
    border:1px solid color-mix(in srgb,var(--orange) 50%,transparent); }
  .c2-band em { font-style:normal; color:var(--orange); }
  .c2-stepper { position:relative; display:grid; grid-template-columns:repeat(6,1fr); gap:20px; margin-top:56px; }
  .c2-stepper .c2-rail { position:absolute; left:6%; right:6%; top:40px; height:4px; background:var(--line); border-radius:4px; }
  .c2-stepper .c2-rail i { position:absolute; inset:0; background:var(--accent); transform-origin:left; transform:scaleX(0); transition:transform .8s var(--ease); border-radius:4px; }
  .c2-st { position:relative; display:flex; flex-direction:column; align-items:center; text-align:center; }
  .c2-st .c2-dot { width:84px; height:84px; border-radius:50%; display:grid; place-items:center; font-size:34px; font-weight:750; background:var(--surface-2); border:3px solid var(--line-2); color:var(--muted); transition:all .5s var(--ease); z-index:1; }
  .c2-st .card { margin-top:26px; width:100%; padding:28px 22px; min-height:330px; display:flex; flex-direction:column; align-items:center; }
  .c2-st h3 { font-size:36px; }
  .c2-st .c2-proc { font-size:23px; font-weight:700; letter-spacing:.04em; color:var(--accent); margin:10px 0 16px; text-transform:uppercase; }
  .c2-st p { font-size:26px; color:var(--muted); line-height:1.35; }
  .c2-st.on .c2-dot { background:var(--accent); border-color:var(--accent); color:#fff; }
  .c2-st.cur .card { border-color:var(--accent); background:var(--accent-soft); transform:translateY(-8px); }
  .c2-st.cur p { color:var(--text); }
  .c2-st.soc { --accent:var(--orange); }
  .c2-photo { border-radius:28px; overflow:hidden; border:1px solid var(--line); position:relative; }
  .c2-photo img { width:100%; height:100%; object-fit:cover; display:block; }
  .c2-photo .c2-cap { position:absolute; left:0; right:0; bottom:0; padding:60px 34px 28px; font-size:27px; line-height:1.35; color:#fff; background:linear-gradient(transparent, rgba(0,0,0,.85)); }
  .c2-wheel > svg { width:800px; height:800px; overflow:visible; }
  .c2-seg { cursor:pointer; transition: transform .6s var(--ease), opacity .5s; transform-origin:400px 400px; }
  .c2-seg path { transition: fill-opacity .5s; }
  .c2-seg.on { transform:scale(1.06); }
  .c2-wheel.picked .c2-seg:not(.on) { opacity:.38; }
  .c2-seg text { font-size:25px; font-weight:700; fill:#fff; pointer-events:none; }
  .c2-intel-name { font-size:66px; font-weight:750; letter-spacing:-.025em; line-height:1.05; }
  .c2-chev { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; }
  .c2-chev button { appearance:none; border:0; cursor:pointer; font-family:inherit; text-align:left; padding:28px 44px 28px 40px; color:var(--muted); font-size:28px; font-weight:650; background:var(--surface-2);
    clip-path:polygon(0 0, calc(100% - 26px) 0, 100% 50%, calc(100% - 26px) 100%, 0 100%, 26px 50%); transition:all .45s var(--ease); line-height:1.2; }
  .c2-chev button:first-child { clip-path:polygon(0 0, calc(100% - 26px) 0, 100% 50%, calc(100% - 26px) 100%, 0 100%); }
  .c2-chev button small { display:block; font-size:19px; letter-spacing:.12em; text-transform:uppercase; opacity:.8; margin-bottom:4px; }
  .c2-chev button.on { background:var(--accent); color:#fff; }
  .c2-chips8 { display:grid; grid-template-columns:repeat(8,1fr); gap:14px; }
  .c2-chip8 { padding:28px 10px; border-radius:20px; text-align:center; background:var(--surface); border:1.5px solid var(--line); transition:all .5s var(--ease); opacity:.35; }
  .c2-chip8 .c2-ico { margin:0 auto 10px; }
  .c2-chip8 b { font-size:23px; display:block; }
  .c2-chip8.on { opacity:1; border-color:var(--accent); background:var(--accent-soft); transform:translateY(-6px); box-shadow:0 20px 50px -20px var(--accent); }
  .c2-uses { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
  .c2-uses .card { padding:34px 40px !important; }
  .c2-uses .card p { font-size:40px; font-weight:600; color:var(--text); }
  .c2-uses .card .num { font-size:24px; }
  .c2-ei { display:grid; grid-template-columns:repeat(4,1fr); gap:0; align-items:stretch; }
  .c2-ei .c2-eic { position:relative; padding:34px 30px; border-radius:var(--r); background:var(--surface); border:1px solid var(--line); margin-right:44px; }
  .c2-ei .c2-eic:last-child { margin-right:0; }
  .c2-ei .c2-eic::after { content:"→"; position:absolute; right:-40px; top:50%; transform:translateY(-50%); font-size:40px; color:var(--accent); }
  .c2-ei .c2-eic:last-child::after { display:none; }
  .c2-ei h3 { font-size:36px; }
  .c2-ei h3 span { color:var(--accent); }
  .c2-ei q { display:block; font-size:28px; font-style:italic; color:var(--text); margin-top:16px; line-height:1.4; quotes:"\\201C" "\\201D"; }
  .c2-ei .c2-eic.warm { background:color-mix(in srgb,var(--orange) 10%,var(--surface)); }
  .c2-gol { display:grid; grid-template-columns:repeat(5,1fr); gap:22px; }
  .c2-gol .card { display:flex; flex-direction:column; padding:34px 28px; }
  .c2-gol .card h3 { font-size:33px; margin:20px 0 10px; }
  .c2-gol .card p { font-size:26px; color:var(--text); }
  .c2-gol .card .ex { margin-top:auto; padding-top:20px; }
  .c2-gol .soc { --accent:var(--orange); }
  .c2-brace { display:grid; grid-template-columns:repeat(5,1fr); gap:22px; margin-top:20px; }
  .c2-brace div { border-top:4px solid var(--accent); padding-top:14px; text-align:center; font-size:26px; font-weight:700; color:var(--accent); letter-spacing:.06em; text-transform:uppercase; position:relative; }
  .c2-brace div::before, .c2-brace div::after { content:""; position:absolute; top:-4px; width:4px; height:20px; background:var(--accent); }
  .c2-brace div::before { left:0; } .c2-brace div::after { right:0; }
  .c2-net > svg { width:100%; height:100%; overflow:visible; }
  .c2-net line { stroke:var(--line-2); stroke-width:3; transition:stroke .5s, stroke-width .5s; }
  .c2-net line.on { stroke:var(--accent); stroke-width:5; }
  .c2-net circle.c2-p { fill:var(--surface-2); stroke:var(--line-2); stroke-width:3; transition:all .5s; }
  .c2-net circle.c2-p.on { fill:var(--accent); stroke:var(--accent); }
  .c2-venn > svg { width:880px; height:600px; overflow:visible; }
  .c2-venn .c2-c { transition: transform 1.4s var(--ease); }
  .c2-venn text { fill:var(--text); }
  .c2-grid4 { display:grid; grid-template-columns:150px 1fr 1fr; grid-template-rows:auto 1fr 1fr; gap:22px; flex:1; margin-top:36px; min-height:0; }
  .c2-ax { font-size:26px; font-weight:750; letter-spacing:.1em; text-transform:uppercase; display:flex; align-items:center; justify-content:center; }
  .c2-ax.c2-row { writing-mode:vertical-rl; transform:rotate(180deg); }
  .c2-cell { display:flex; gap:30px; align-items:center; padding:30px 36px; cursor:pointer; }
  .c2-cell .c2-ico { width:86px; height:86px; }
  .c2-cell h3 { font-size:42px; }
  .c2-cell p { font-size:28px; color:var(--text); margin-top:6px; }
  .c2-cell .pill { margin-top:14px; font-size:22px; }
  .c2-cell.rat { --accent:var(--orange); }
  .c2-judge { min-height:64px; font-size:30px; text-align:center; color:var(--muted); margin-top:20px; transition:opacity .4s; }
  .c2-judge b { color:var(--text); }
  .c2-turing > svg { width:100%; height:100%; overflow:visible; }
  .c2-turing text { fill:var(--text); }
  .c2-ctbl td { font-size:26px; padding:16px 20px; }
  .c2-methods { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
  .c2-methods .card { padding:34px 30px; }
  .c2-methods h3 { font-size:34px; margin:20px 0 10px; }
  .c2-methods p { font-size:27px; color:var(--text); }
  .c2-syl { font-size:34px; line-height:1.5; }
  .c2-syl div { padding:10px 0; border-bottom:1px solid var(--line); display:grid; grid-template-columns:190px 1fr; align-items:baseline; }
  .c2-syl div:last-child { border-bottom:0; }
  .c2-syl .c2-k { display:block; font-size:22px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
  .c2-strike { position:relative; transition:color .5s; }
  .c2-strike::after { content:""; position:absolute; left:0; top:52%; height:4px; width:0; background:var(--red); transition:width .7s var(--ease); }
  .c2-flag .c2-strike { color:var(--red); }
  .c2-flag .c2-strike::after { width:100%; }
  .c2-verdict { display:flex; gap:16px; margin-top:22px; flex-wrap:wrap; }
  .c2-verdict .pill { font-size:24px; padding:10px 20px; }
  .c2-agent > svg { width:100%; height:100%; overflow:visible; }
  .c2-agent text { fill:var(--text); }
  .c2-cmp td { font-size:28px; padding:24px 22px; }
  .c2-cmp td:first-child { color:var(--accent); }
  .c2-map > svg { width:100%; height:100%; overflow:visible; }
  .c2-lens { display:grid; grid-template-columns:1fr 1fr; gap:22px; }
  .c2-lens .card { display:flex; gap:24px; align-items:flex-start; padding:30px 30px; }
  .c2-lens .card h3 { font-size:32px; }
  .c2-lens .card p { font-size:27px; color:var(--text); margin-top:8px; }
  .c2-lens .rat { --accent:var(--orange); }
  .c2-tf-list { display:flex; flex-direction:column; gap:18px; }
  .c2-tf { display:grid; grid-template-columns: 1fr 330px; gap:24px; align-items:center; padding:24px 34px; border-radius:var(--r); background:var(--surface); border:1px solid var(--line); cursor:pointer; transition:all .45s var(--ease); }
  .c2-tf p { font-size:33px; }
  .c2-tf .c2-ans { font-size:32px; font-weight:750; text-align:right; opacity:0; transform:translateX(20px); transition:all .5s var(--ease); }
  .c2-tf .c2-ans div { font-size:21px; font-weight:500; color:var(--muted); margin-top:4px; }
  .c2-tf.show .c2-ans { opacity:1; transform:none; }
  .c2-tf.show.t { border-color:var(--green); } .c2-tf.show.t .c2-ans { color:var(--green); }
  .c2-tf.show.f { border-color:var(--red); } .c2-tf.show.f .c2-ans { color:var(--red); }
  .c2-form label { display:block; font-size:22px; letter-spacing:.1em; text-transform:uppercase; font-weight:700; color:var(--muted); margin-bottom:10px; }
  .c2-form input { width:100%; font-family:inherit; font-size:42px; font-weight:600; padding:22px 26px; border-radius:18px; border:1.5px solid var(--line-2); background:var(--surface-2); color:var(--text); outline:none; transition:border-color .3s; }
  .c2-form input:focus { border-color:var(--accent); }
  .c2-term { flex:1; background:#0a0a0c; border:1px solid #2a2a30; border-radius:24px; padding:40px 44px; font-family:var(--mono); font-size:33px; line-height:1.6; color:#e8e8ed; }
  .c2-term .c2-pr { color:#8e8e93; }
  .c2-term b { color:#d0a6ff; font-weight:600; }
  .c2-rule { display:flex; justify-content:space-between; gap:20px; padding:20px 26px; border-radius:16px; font-size:28px; background:var(--surface); color:var(--muted); transition:all .4s; border:1px solid transparent; }
  .c2-rule.on { background:var(--accent-soft); color:var(--text); border-color:var(--accent); }
  .c2-rule b { color:inherit; }
  `;
  document.head.appendChild(css);

  const ic = (name, size, extra) => `<span class="c2-ico" style="width:${size}px;height:${size}px;${extra || ''}">${I(name, 'ic')}</span>`;

  function opener(num, title, sub, topics) {
    return {
      title: 'Chapter ' + num + ' opener', cls: 'c2-opener',
      html: `
        <div class="c2-bignum rise">0${num}</div>
        <div class="eyebrow rise">Chapter ${num}</div>
        <h1 class="rise d1">${title}</h1>
        <p class="lead rise d2" style="max-width:1000px">${sub}</p>
        <div class="c2-topics rise d3">${topics.map(t => `<span class="pill">${t}</span>`).join('')}</div>`
    };
  }

  const slides = [];

  /* 1 — Opener */
  slides.push(opener(2, 'Human Intelligence and <span class="grad">Approaches to AI</span>',
    'What is intelligence · Multiple intelligences · Emotional and social intelligence · Acting and thinking humanly, thinking and acting rationally.',
    ['Intelligence', 'Gardner’s 8 forms', 'Emotional intelligence', 'Social intelligence', 'Turing test', 'Laws of thought', 'Rational agent']));

  /* 2 — What is intelligence */
  const abil = [
    ['book', 'Learning', 'Improve knowledge or skill through experience', 'Use feedback to fix a programming error'],
    ['scale', 'Reasoning', 'Connect information and reach a supported conclusion', 'Compare evidence before choosing an answer'],
    ['refresh', 'Adaptation', 'Change behaviour when the situation changes', 'Take another route when a road closes'],
    ['puzzle', 'Problem-solving', 'Find a method when the answer is not immediate', 'Plan how to finish a difficult assignment'],
    ['target', 'Application', 'Use knowledge in a suitable situation', 'Apply a class concept to a new case'],
  ];
  slides.push({
    title: 'What is intelligence?',
    html: `
      <div class="eyebrow">Definition</div>
      <h2>What is intelligence?</h2>
      <p class="lead" style="max-width:1680px">The ability to <b>learn</b> from experience, <b>understand</b> information, <b>reason</b> about a situation, <b>adapt</b> when conditions change and <b>use knowledge to reach a goal</b> — in familiar tasks and new problems.</p>
      <div class="grid-5 stagger" style="margin-top:50px;flex:1">
        ${abil.map(a => `<div class="card c2-abil">${ic(a[0], 72)}<h3>${a[1]}</h3><p>${a[2]}</p><div class="c2-eg">e.g. ${a[3]}</div></div>`).join('')}
      </div>`,
    src: 'Ch2 · What is intelligence?',
  });

  /* 3 — How human intelligence works */
  const loopNodes = [['eye', 'Perception and attention', 'Identify useful information and reduce distraction'], ['db', 'Memory and learning', 'Provide knowledge and improve with experience'], ['chat', 'Language and representation', 'Express ideas and organise the problem'], ['scale', 'Reasoning and decision', 'Compare possibilities and select an action']];
  const NX = [0, 440, 880, 1320];
  slides.push({
    title: 'How human intelligence works',
    html: `
      <div class="eyebrow">A coordinated system</div>
      <h2>How human intelligence works</h2>
      <p class="lead" style="max-width:1680px">A <b>coordinated use</b> of perception, attention, memory, learning, language, reasoning and emotion — select what is relevant, relate it to experience, consider actions, <b>adjust after feedback</b>.</p>
      <div class="c2-loop">
        <svg viewBox="0 0 1680 520">
          <defs><marker id="c2ah" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="var(--accent)"/></marker></defs>
          ${[0, 1, 2].map(i => `<line x1="${NX[i] + 366}" y1="95" x2="${NX[i + 1] - 12}" y2="95" stroke="var(--accent)" stroke-width="4" marker-end="url(#c2ah)"/>`).join('')}
          <path id="c2fb" d="M 1690 100 C 1770 100, 1770 440, 1600 440 L 80 440 C -90 440, -90 100, -14 100" fill="none" stroke="var(--accent)" stroke-width="4" stroke-dasharray="12 12" class="flow-dash" marker-end="url(#c2ah)"/>
          <rect x="590" y="416" width="500" height="48" rx="24" fill="var(--bg)"/>
          <text x="840" y="450" text-anchor="middle" font-size="27" font-weight="650" fill="var(--accent)">Feedback from the result loops back</text>
          <circle id="c2fbdot" r="12" fill="var(--accent)" style="filter:drop-shadow(0 0 12px var(--accent))"/>
        </svg>
        ${loopNodes.map((n, i) => `<div class="c2-node" style="left:${NX[i]}px"><b>${ic(n[0], 42)}${n[1]}</b><span>${n[2]}</span></div>`).join('')}
        <div class="c2-band" data-step="1">${ic('heart', 40, 'color:var(--orange)')}<span><em>Emotion and social understanding</em> influence every stage — priorities, motivation, communication and judgement.</span></div>
      </div>`,
    src: 'Ch2 · How human intelligence works',
    enter(c) {
      const nodes = c.$$('.c2-node'), path = c.$('#c2fb'), dot = c.$('#c2fbdot');
      const L = path.getTotalLength();
      c.loop(t => {
        const k = (t % 7000) / 7000;
        if (k < 0.55) { const i = Math.min(3, Math.floor(k / 0.55 * 4)); nodes.forEach((n, j) => n.classList.toggle('lit', j === i)); dot.setAttribute('opacity', 0); }
        else { nodes.forEach(n => n.classList.remove('lit')); const p = path.getPointAtLength(L * (k - .55) / .45); dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); dot.setAttribute('opacity', 1); }
      });
    },
  });

  /* 4 — Doctor diagnosing */
  const doc = [['Observe', 'Perception and attention', 'Notice symptoms, appearance and changes'], ['Recall', 'Memory', 'Retrieve medical knowledge and similar cases'], ['Interpret', 'Reasoning', 'Compare possible explanations'], ['Investigate', 'Problem-solving', 'Choose tests that reduce uncertainty'], ['Decide', 'Judgement', 'Select diagnosis and treatment from evidence'], ['Communicate', 'Emotional and social intelligence', 'Explain clearly and respond with empathy']];
  slides.push({
    title: 'Example: a doctor diagnosing', steps: 6,
    html: `
      <div class="eyebrow">Worked example</div>
      <h2>A doctor diagnosing a patient</h2>
      <p class="lead" style="max-width:1680px">Symptoms with several possible causes. The task needs <b>more than remembering medical facts</b> — the doctor combines observation, knowledge, reasoning and communication.</p>
      <div class="c2-stepper">
        <div class="c2-rail"><i id="c2rail"></i></div>
        ${doc.map((d, i) => `<div class="c2-st ${i === 5 ? 'soc' : ''}"><div class="c2-dot">${i + 1}</div><div class="card"><h3>${d[0]}</h3><div class="c2-proc">${d[1]}</div><p>${d[2]}</p></div></div>`).join('')}
      </div>`,
    src: 'Ch2 · Example: a doctor diagnosing a patient',
    step(c, n) {
      c.$$('.c2-st').forEach((s, i) => { s.classList.toggle('on', i < n); s.classList.toggle('cur', i === n - 1); });
      c.$('#c2rail').style.transform = 'scaleX(' + (n <= 1 ? 0 : (n - 1) / 5) + ')';
    },
  });

  /* 5 — Gardner */
  slides.push({
    title: 'Gardner’s multiple intelligences',
    html: `
      <div class="eyebrow">Theory · 1983</div>
      <h2>Gardner’s theory of <span class="grad">multiple intelligences</span></h2>
      <div class="body" style="gap:50px">
        <div class="c2-photo" style="width:820px">
          <img src="assets/img/students.jpg" alt="Students working in a library">
          <div class="c2-cap">People show strong performance in <b>different domains</b> — one explains ideas clearly, another sees spatial relationships, another reads group dynamics or learns through physical practice.</div>
        </div>
        <div class="col grow" style="gap:24px">
          <div class="card" style="padding:32px 36px">
            <div class="row" style="gap:20px">${ic('bulb', 56)}<p style="font-size:31px;color:var(--text)"><b>Howard Gardner</b>, a Harvard psychologist: human ability includes <b class="accent">several relatively distinct ways</b> of processing information — not <b>one general ability</b> alone.</p></div>
          </div>
          <div class="card" data-step="1" style="padding:30px 36px;--accent:var(--teal)"><span class="num">Why it became influential</span><p style="color:var(--text);font-size:28px">It encouraged teachers to notice a <b>wider range of strengths</b> — language, logic, space, music, bodily skill, understanding others, understanding oneself, patterns in nature.</p></div>
          <div class="card" data-step="2" style="padding:30px 36px;--accent:var(--orange)"><span class="num">Use it with care</span><p style="color:var(--text);font-size:28px">Describes possible areas of strength — <b>not a fixed label</b> for a student, and <b>not the same</b> as claiming each student learns best through only one “learning style”.</p></div>
        </div>
      </div>`,
    src: 'Ch2 · Gardner’s theory of multiple intelligences (1983)',
  });

  /* 6 — Eight intelligences wheel */
  const intel = [
    ['pen', 'Linguistic', 'Linguistic', 'Use spoken or written language effectively', 'Write a report, persuade an audience', 'var(--purple)'],
    ['sigma', 'Logical', 'Logical-mathematical', 'Reason with patterns, numbers and rules', 'Develop an algorithm, test a hypothesis', 'var(--blue)'],
    ['cube', 'Spatial', 'Spatial', 'Picture and mentally transform visual relationships', 'Read a map, design a 3D object', 'var(--teal)'],
    ['music', 'Musical', 'Musical', 'Recognise and create patterns in rhythm and sound', 'Compose, perform or analyse music', 'var(--indigo)'],
    ['run', 'Bodily', 'Bodily-kinaesthetic', 'Use coordinated movement for a skilled action', 'Surgery, dance, sport', 'var(--orange)'],
    ['users', 'Interpersonal', 'Interpersonal', 'Understand other people and work with them', 'Teach, negotiate, lead a team', 'var(--pink)'],
    ['user', 'Intrapersonal', 'Intrapersonal', 'Understand own feelings, motives and strengths', 'Set realistic goals, reflect on progress', 'var(--red)'],
    ['leaf', 'Naturalistic', 'Naturalistic', 'Recognise patterns and categories in nature', 'Classify plants, animals or weather', 'var(--green)'],
  ];
  const pt = (r, a) => [400 + r * Math.cos(a * Math.PI / 180), 400 + r * Math.sin(a * Math.PI / 180)].map(v => v.toFixed(1));
  const wheelSegs = intel.map((d, i) => {
    const a0 = -112.5 + i * 45 + 1.2, a1 = a0 + 45 - 2.4, r1 = 150, r2 = 385, am = (a0 + a1) / 2;
    const [x0, y0] = pt(r2, a0), [x1, y1] = pt(r2, a1), [x2, y2] = pt(r1, a1), [x3, y3] = pt(r1, a0);
    const [ix, iy] = pt(285, am), [tx, ty] = pt(285, am);
    return `<g class="c2-seg" data-i="${i}"><path d="M${x0},${y0} A${r2},${r2} 0 0 1 ${x1},${y1} L${x2},${y2} A${r1},${r1} 0 0 0 ${x3},${y3} Z" fill="${d[5]}" fill-opacity=".9"/>
      ${I(d[0], 'c2-wi').replace('<svg ', `<svg x="${ix - 22}" y="${iy - 46}" width="44" height="44" color="#fff" `)}
      <text x="${tx}" y="${+ty + 30}" text-anchor="middle">${d[1]}</text></g>`;
  }).join('');
  slides.push({
    title: 'The eight forms of intelligence',
    html: `
      <div class="eyebrow">Gardner’s eight intelligences <span class="pill neutral">Tap a segment</span></div>
      <h2>The eight forms of intelligence</h2>
      <div class="body" style="align-items:center;gap:70px;margin-top:10px">
        <div class="c2-wheel" style="width:800px;height:800px;margin:-40px 0 -60px -20px;transform:scale(.88);transform-origin:left center">
          <svg viewBox="0 0 800 800">${wheelSegs}
            <circle cx="400" cy="400" r="140" fill="var(--surface)" stroke="var(--line)"/>
            <text x="400" y="392" text-anchor="middle" font-size="80" font-weight="800" fill="var(--accent)">8</text>
            <text x="400" y="438" text-anchor="middle" font-size="26" font-weight="600" fill="var(--muted)">forms</text>
          </svg>
        </div>
        <div class="col grow" style="gap:26px">
          <div id="c2iIcon" style="width:96px;height:96px"></div>
          <div class="c2-intel-name" id="c2iName"></div>
          <p id="c2iMean" style="font-size:40px;line-height:1.3;font-weight:500"></p>
          <div class="card" style="padding:26px 32px"><span class="num">Example</span><p id="c2iEx" style="font-size:34px;color:var(--text);font-weight:600"></p></div>
        </div>
      </div>`,
    src: 'Ch2 · The eight forms of intelligence',
    enter(c) {
      let auto = true, cur = 0;
      const show = i => {
        cur = i; const d = intel[i];
        c.$('.c2-wheel').classList.add('picked');
        c.$$('.c2-seg').forEach(g => g.classList.toggle('on', +g.dataset.i === i));
        c.$('#c2iIcon').innerHTML = `<span style="display:block;width:96px;height:96px;color:${d[5]}">${I(d[0], 'ic')}</span>`;
        const nm = c.$('#c2iName'); nm.textContent = d[2]; nm.style.color = d[5];
        c.$('#c2iMean').textContent = d[3];
        c.$('#c2iEx').textContent = d[4];
        [nm, c.$('#c2iMean'), c.$('#c2iEx')].forEach(el => el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: 'cubic-bezier(.22,.8,.2,1)' }));
      };
      c.$$('.c2-seg').forEach(g => c.on(g, 'click', () => { auto = false; show(+g.dataset.i); }));
      c.interval(() => { if (auto) show((cur + 1) % 8); }, 3200);
      show(0);
      c.data.show = i => { auto = false; show(i); };
    },
    key(c, e) { if (/^[1-8]$/.test(e.key)) c.data.show(+e.key - 1); },
  });

  /* 7 — Software project */
  const proj = [
    ['Understand the problem', [['Linguistic', 'Interpret requirements'], ['Logical', 'Identify rules and constraints']]],
    ['Design the interface', [['Spatial', 'Layout decisions'], ['Interpersonal', 'Consider user needs']]],
    ['Develop the solution', [['Logical', 'Algorithms'], ['Intrapersonal', 'Monitor focus and progress']]],
    ['Present the work', [['Linguistic', 'Clear explanation'], ['Interpersonal', 'Respond to questions']]],
    ['Improve after feedback', [['Intrapersonal', 'Reflection'], ['Interpersonal', 'Understand others’ feedback']]],
  ];
  const short = ['Linguistic', 'Logical', 'Spatial', 'Musical', 'Bodily', 'Interpersonal', 'Intrapersonal', 'Naturalistic'];
  slides.push({
    title: 'Intelligences work together', steps: 5,
    html: `
      <div class="eyebrow">Intelligences work together</div>
      <h2>One student project, many intelligences</h2>
      <p class="lead">Real activities <b>rarely depend on only one form</b> of intelligence. Follow a software project from start to finish.</p>
      <div class="c2-chev mt-l" id="c2chev">${proj.map((p, i) => `<button data-i="${i}"><small>Stage ${i + 1}</small>${p[0]}</button>`).join('')}</div>
      <div class="c2-chips8 mt-l" id="c2chips">${intel.map((d, i) => `<div class="c2-chip8" data-n="${short[i]}" style="--accent:${d[5]}">${ic(d[0], 60)}<b>${short[i]}</b></div>`).join('')}</div>
      <div class="c2-uses mt" id="c2uses"></div>`,
    src: 'Ch2 · Intelligences work together: a software project',
    enter(c) {
      const show = i => {
        c.data.i = i;
        c.$$('#c2chev button').forEach(b => b.classList.toggle('on', +b.dataset.i === i));
        const uses = i < 0 ? [] : proj[i][1];
        c.$$('#c2chips .c2-chip8').forEach(ch => ch.classList.toggle('on', uses.some(u => u[0] === ch.dataset.n)));
        c.$('#c2uses').innerHTML = uses.map(u => { const k = short.indexOf(u[0]); return `<div class="card" style="--accent:${intel[k][5]};padding:26px 32px"><span class="num">${u[0]}</span><p>${u[1]}</p></div>`; }).join('');
      };
      c.data.show = show;
      c.$$('#c2chev button').forEach(b => c.on(b, 'click', () => show(+b.dataset.i)));
      show(-1);
    },
    step(c, n) { c.data.show && c.data.show(n - 1); },
  });

  /* 8 — Emotional intelligence */
  const eiSteps = [['Notice', 'I feel anxious before my presentation, and my hands are shaking.'], ['Understand', 'I am worried the lecturer’s questions will show I am unprepared.'], ['Regulate', 'Slow breathing. Focus on the next point, not the whole talk.'], ['Reframe', 'Questions are requests for clarity, not personal criticism.']];
  slides.push({
    title: 'Emotional intelligence', steps: 5,
    html: `
      <div class="eyebrow">Definition</div>
      <h2>Emotional intelligence</h2>
      <p class="lead" style="max-width:1680px">How people <b>recognise, understand and manage</b> emotions in themselves, and <b>respond to emotions in others</b>. Emotion directs attention, affects judgement and influences how people communicate or keep going.</p>
      <div class="card mt" style="padding:10px 30px;height:150px">
        <svg viewBox="0 0 1600 130" style="width:100%;height:100%" preserveAspectRatio="none"><path id="c2wave" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round"/></svg>
      </div>
      <div class="c2-ei mt">${eiSteps.map((s, i) => `<div class="c2-eic ${i % 2 ? 'warm' : ''}" data-step="${i + 1}"><h3><span>${i + 1}.</span> ${s[0]}</h3><q>${s[1]}</q></div>`).join('')}</div>
      <div class="callout mt" data-step="5">Emotional intelligence <b>does not mean hiding emotion</b>. It means using emotional information and choosing a suitable response.</div>`,
    src: 'Ch2 · Emotional intelligence (wave is illustrative)',
    enter(c) {
      const w = c.$('#c2wave');
      c.loop(t => {
        const n = c.data.n || 0, amp = [52, 50, 38, 20, 9, 9][n], freq = [0.035, 0.034, 0.026, 0.018, 0.012, 0.012][n];
        let d = '';
        for (let x = 0; x <= 1600; x += 8) { const y = 65 + amp * Math.sin(x * freq - t / 220) * (0.7 + 0.3 * Math.sin(x * 0.007 + t / 900)); d += (x ? ' L' : 'M') + x + ',' + y.toFixed(1); }
        w.setAttribute('d', d);
      });
    },
    step(c, n) { c.data.n = n; },
  });

  /* 9 — Goleman */
  const gol = [['eye', 'Self-awareness', 'Recognise an emotion and its effect', 'Notice frustration is reducing concentration'], ['hand', 'Self-regulation', 'Manage an emotional response suitably', 'Pause before replying to a critical message'], ['zap', 'Motivation', 'Use goals and emotion to keep going', 'Keep practising after a failed attempt'], ['heart', 'Empathy', 'Recognise another person’s feelings and view', 'Notice a teammate needs clarification'], ['users', 'Social skills', 'Communicate and manage relationships', 'Resolve disagreement and keep the team focused']];
  slides.push({
    title: 'Goleman’s five areas',
    html: `
      <div class="eyebrow">Model popularised by Daniel Goleman · 1995</div>
      <h2>Five areas of emotional intelligence</h2>
      <div class="c2-gol stagger" style="margin-top:56px;flex:1">
        ${gol.map((g, i) => `<div class="card ${i > 2 ? 'soc' : ''}">${ic(g[0], 68)}<h3>${g[1]}</h3><p>${g[2]}</p><p class="ex">e.g. ${g[3]}</p></div>`).join('')}
      </div>
      <div class="c2-brace" data-step="1"><div style="grid-column:1 / span 3">Personal skills</div><div style="grid-column:4 / span 2;--accent:var(--orange)">Social skills</div></div>
      <p class="small faint mt-s" data-step="2">Other models define and measure emotional intelligence differently.</p>`,
    src: 'Ch2 · Five areas of emotional intelligence (Goleman)',
  });

  /* 10 — Social intelligence */
  const soc = [['Social awareness', 'Notice who has not spoken in a meeting and whether the group is ignoring an idea'], ['Perspective taking', 'Consider how the same message may sound to a student, a lecturer or a customer'], ['Communication', 'Select suitable words, tone and level of detail for the audience'], ['Relationship management', 'Build cooperation, give feedback and handle disagreement constructively'], ['Context judgement', 'Recognise that behaviour suitable among friends may be unsuitable in a formal meeting']];
  const people = [[250, 60], [440, 150], [400, 360], [140, 380], [70, 190], [250, 230]];
  const links = [[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
  slides.push({
    title: 'Social intelligence',
    html: `
      <div class="eyebrow">Definition</div>
      <h2>Social intelligence</h2>
      <p class="lead" style="max-width:1680px">The ability to <b>understand social situations</b> and <b>interact effectively</b> with other people — reading verbal and nonverbal cues, recognising roles and expectations, adapting communication and managing relationships.</p>
      <div class="body" style="gap:50px;margin-top:26px">
        <table class="tbl clickrows grow c2-ctbl" id="c2soc"><thead><tr><th style="width:360px">Social ability</th><th>Example</th></tr></thead>
          <tbody>${soc.map(s => `<tr><td>${s[0]}</td><td>${s[1]}</td></tr>`).join('')}</tbody></table>
        <div class="card c2-net" style="width:520px;padding:30px">
          <svg viewBox="0 0 510 440">
            ${links.map((l, i) => `<line data-i="${i}" x1="${people[l[0]][0]}" y1="${people[l[0]][1]}" x2="${people[l[1]][0]}" y2="${people[l[1]][1]}"/>`).join('')}
            ${people.map((p, i) => `<circle class="c2-p" data-i="${i}" cx="${p[0]}" cy="${p[1]}" r="${i === 5 ? 44 : 34}"/>`).join('')}
            ${I('user', 'c2-wi').replace('<svg ', `<svg x="226" y="206" width="48" height="48" color="#fff" `)}
          </svg>
        </div>
      </div>`,
    src: 'Ch2 · Social intelligence',
    enter(c) {
      const rows = c.$$('#c2soc tbody tr'); let i = 0, auto = true;
      const pick = [[0, 1, 2, 3, 4], [0, 5], [1, 6, 7], [2, 3, 7, 8], [4, 9]];
      const show = k => {
        i = k; rows.forEach((r, j) => r.classList.toggle('hot', j === k));
        c.$$('.c2-net line').forEach((l, j) => l.classList.toggle('on', pick[k].includes(j)));
        c.$$('.c2-net circle.c2-p').forEach((p, j) => p.classList.toggle('on', j === 5 || pick[k].some(li => links[li].includes(j))));
      };
      rows.forEach((r, k) => c.on(r, 'click', () => { auto = false; show(k); }));
      c.interval(() => { if (auto) show((i + 1) % 5); }, 2600);
      show(0);
    },
  });

  /* 11 — EI vs SI */
  slides.push({
    title: 'Emotional vs social intelligence',
    html: `
      <div class="eyebrow">Compare</div>
      <h2>Emotional <span class="muted" style="font-weight:300">vs</span> social intelligence</h2>
      <div class="body" style="gap:40px;align-items:center">
        <div class="c2-venn" style="width:880px;height:600px">
          <svg viewBox="0 0 880 600">
            <g class="c2-c" id="c2cl"><circle cx="300" cy="300" r="250" fill="var(--purple)" fill-opacity=".55"/>
              <text x="175" y="250" text-anchor="middle" font-size="40" font-weight="750">Emotional</text>
              <text x="175" y="300" text-anchor="middle" font-size="23" font-weight="500">What emotions are</text><text x="175" y="332" text-anchor="middle" font-size="23" font-weight="500">present and how should</text><text x="175" y="364" text-anchor="middle" font-size="23" font-weight="500">they be managed?</text></g>
            <g class="c2-c" id="c2cr"><circle cx="580" cy="300" r="250" fill="var(--orange)" fill-opacity=".55"/>
              <text x="705" y="250" text-anchor="middle" font-size="40" font-weight="750">Social</text>
              <text x="705" y="300" text-anchor="middle" font-size="23" font-weight="500">What is happening</text><text x="705" y="332" text-anchor="middle" font-size="23" font-weight="500">between people and how</text><text x="705" y="364" text-anchor="middle" font-size="23" font-weight="500">should I respond here?</text></g>
            <g id="c2emp" style="opacity:0;transition:opacity .8s .9s">
              <text x="440" y="300" text-anchor="middle" font-size="36" font-weight="800">Empathy</text>
              <g transform="translate(422,318)" color="#fff">${I('heart', 'c2-wi').replace('<svg ', '<svg width="36" height="36" ')}</g></g>
          </svg>
        </div>
        <div class="col grow" style="gap:18px">
          <table class="tbl c2-ctbl"><thead><tr><th></th><th style="color:var(--purple)">Emotional</th><th style="color:var(--orange)">Social</th></tr></thead>
            <tbody>
              <tr data-step="1"><td>Information</td><td>Feelings, triggers, expressions</td><td>Cues, roles, group norms</td></tr>
              <tr data-step="2"><td>Example</td><td>Manage frustration before giving feedback</td><td>Choose a respectful way to give it in a meeting</td></tr>
              <tr data-step="3"><td>Limitation</td><td>Emotion can be hidden or misread</td><td>Social rules vary across groups and cultures</td></tr>
            </tbody></table>
          <div class="callout mt-s" data-step="4" style="font-size:27px">The two <b>overlap through empathy</b>, but they ask different questions about information and behaviour.</div>
        </div>
      </div>`,
    src: 'Ch2 · Emotional intelligence vs social intelligence',
    enter(c) {
      const l = c.$('#c2cl'), r = c.$('#c2cr'), e = c.$('#c2emp');
      l.style.transform = 'translateX(-90px)'; r.style.transform = 'translateX(90px)'; e.style.opacity = 0;
      c.timeout(() => { l.style.transform = 'none'; r.style.transform = 'none'; e.style.opacity = 1; }, 300);
    },
  });

  /* 12 — Four approaches 2x2 */
  const ap = {
    th: ['brain', 'Thinking humanly', 'Model how people actually think', 'Cognitive modelling', 'Match with experimental data about people'],
    tr: ['scale', 'Thinking rationally', 'Derive conclusions by correct reasoning', 'Laws of thought', 'Correct use of formal rules'],
    ah: ['chat', 'Acting humanly', 'Produce behaviour similar to a person', 'Turing test', 'Human judgement of observable interaction'],
    ar: ['route', 'Acting rationally', 'Choose actions expected to achieve a goal', 'Rational agent', 'Performance measure in the environment'],
  };
  const cell = (k, step, rat) => { const a = ap[k]; return `<div class="card clickable c2-cell ${rat ? 'rat' : ''}" data-k="${k}" data-step="${step}">${ic(a[0], 86)}<div><h3>${a[1]}</h3><p>${a[2]}</p><span class="pill">Key idea: ${a[3]}</span></div></div>`; };
  slides.push({
    title: 'Four approaches to AI',
    html: `
      <div class="eyebrow">Part C · Russell and Norvig’s framework</div>
      <h2>Four approaches to artificial intelligence</h2>
      <p class="lead" style="max-width:1680px;margin-top:18px">Two questions: judge against <b>human</b> performance or <b>ideal rational</b> performance? Study <b>thinking</b> or observable <b>action</b>?</p>
      <div class="c2-grid4">
        <div></div><div class="c2-ax" style="color:var(--purple)">Human standard</div><div class="c2-ax" style="color:var(--orange)">Rational standard</div>
        <div class="c2-ax c2-row">Thinking</div>${cell('th', 1)}${cell('tr', 2, 1)}
        <div class="c2-ax c2-row">Acting</div>${cell('ah', 3)}${cell('ar', 4, 1)}
      </div>
      <div class="c2-judge" id="c2judge">Each approach asks a <b>different evaluation question</b>. Tap a box to see how success is judged.</div>`,
    src: 'Ch2 · Part C: Four approaches to artificial intelligence',
    enter(c) {
      c.$$('.c2-cell').forEach(el => c.on(el, 'click', () => {
        c.$$('.c2-cell').forEach(x => x.classList.toggle('hot', x === el));
        const a = ap[el.dataset.k], j = c.$('#c2judge');
        j.innerHTML = `<b style="color:var(--accent)">${a[1]}</b> — success is judged by: <b>${a[4]}</b>`;
        j.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
      }));
    },
  });

  /* 13 — Turing test */
  slides.push({
    title: 'Acting humanly: the Turing test',
    html: `
      <div class="eyebrow">Acting humanly · Alan Turing, 1950</div>
      <h2>The Turing test</h2>
      <p class="lead" style="max-width:1680px;margin-top:16px">Judges whether a machine’s <b>observable behaviour</b> resembles a person’s — not whether it uses the same internal thinking.</p>
      <div class="body" style="gap:44px;margin-top:34px">
        <div class="card c2-turing" style="width:820px;padding:20px 24px;display:flex;flex-direction:column">
          <svg viewBox="0 0 800 470" style="flex:1">
            <line x1="380" y1="20" x2="380" y2="420" stroke="var(--line-2)" stroke-width="3" stroke-dasharray="10 10"/>
            <text x="380" y="450" text-anchor="middle" font-size="22" fill="var(--muted)" style="fill:var(--muted)">text only</text>
            <path id="c2la" d="M 190 230 L 620 110" stroke="var(--teal)" stroke-width="4" fill="none" opacity=".6"/>
            <path id="c2lb" d="M 190 230 L 620 350" stroke="var(--orange)" stroke-width="4" fill="none" opacity=".6"/>
            <circle cx="120" cy="230" r="72" fill="var(--purple)"/>
            ${I('user', 'c2-wi').replace('<svg ', '<svg x="86" y="196" width="68" height="68" color="#fff" ')}
            <text x="120" y="340" text-anchor="middle" font-size="27" font-weight="700">Interrogator</text>
            <circle cx="680" cy="110" r="62" fill="var(--teal)"/>
            ${I('user', 'c2-wi').replace('<svg ', '<svg x="652" y="82" width="56" height="56" color="#fff" ')}
            <text x="705" y="208" text-anchor="middle" font-size="26" font-weight="700">Person A</text>
            <circle cx="680" cy="350" r="62" fill="var(--orange)"/>
            ${I('robot', 'c2-wi').replace('<svg ', '<svg x="652" y="322" width="56" height="56" color="#fff" ')}
            <text x="705" y="448" text-anchor="middle" font-size="26" font-weight="700">Machine B</text>
            <g id="c2msg"><rect x="-34" y="-20" width="68" height="40" rx="14" fill="var(--text)"/><text x="0" y="8" text-anchor="middle" font-size="26" font-weight="800" style="fill:var(--bg)">…</text></g>
          </svg>
          <p style="font-size:27px;text-align:center;margin-top:6px">If the interrogator <b class="accent">cannot reliably tell</b> which is the machine, it passes.</p>
        </div>
        <div class="col grow" style="gap:20px">
          <table class="tbl c2-ctbl"><thead><tr><th>Capability needed</th><th>Why it matters</th></tr></thead><tbody>
            <tr><td>Natural language processing</td><td>Communicate with a person</td></tr>
            <tr><td>Knowledge representation</td><td>Store what it knows or hears</td></tr>
            <tr><td>Automated reasoning</td><td>Answer questions and draw conclusions</td></tr>
            <tr><td>Machine learning</td><td>Adapt and detect new patterns</td></tr>
            <tr><td>Vision and robotics</td><td>Needed for the “total” Turing test</td></tr></tbody></table>
          <div class="callout" data-step="1" style="font-size:26px">A <b>customer-service chatbot</b> may sound human in a short chat even when it does not understand the situation as a person does.</div>
        </div>
      </div>`,
    src: 'Ch2 · Acting humanly: the Turing test',
    enter(c) {
      const a = c.$('#c2la'), b = c.$('#c2lb'), m = c.$('#c2msg'), La = a.getTotalLength(), Lb = b.getTotalLength();
      const rows = c.$$('.c2-ctbl tbody tr');
      c.loop(t => {
        const k = (t % 6000) / 1500, ph = Math.floor(k), f = k - ph;
        const path = ph < 2 ? a : b, L = ph < 2 ? La : Lb, fwd = ph % 2 === 0;
        const p = path.getPointAtLength(L * (fwd ? f : 1 - f));
        m.setAttribute('transform', `translate(${p.x},${p.y - 30})`);
        rows.forEach((r, i) => r.classList.toggle('hot', i === Math.floor((t % 10000) / 2000)));
      });
    },
  });

  /* 14 — Thinking humanly */
  const meth = [['flask', 'Behavioural experiments', 'Compare human choices, errors and response times with the model'], ['chat', 'Verbal reports', 'Study strategies people describe while they solve a task (“think aloud”)'], ['eye', 'Eye movement and brain data', 'Examine when and where processing may happen (eye tracking, EEG, fMRI)'], ['layers', 'Cognitive architectures', 'Represent interacting processes such as memory, goals and problem-solving']];
  slides.push({
    title: 'Thinking humanly: cognitive modelling',
    html: `
      <div class="eyebrow">Thinking humanly</div>
      <h2>Cognitive modelling</h2>
      <p class="lead" style="max-width:1680px">Build computer models that try to explain <b>how people actually perform</b> cognitive tasks — then compare the model’s <b>steps, errors and response times</b> with evidence from psychology and neuroscience.</p>
      <div class="card mt" style="padding:18px 30px;height:200px;display:flex;align-items:center;gap:30px">
        <div style="width:260px;font-size:24px;line-height:1.5"><div><span style="display:inline-block;width:34px;height:5px;background:var(--orange);vertical-align:middle;margin-right:10px;border-radius:3px"></span>Human data</div><div><span style="display:inline-block;width:34px;height:5px;background:var(--accent);vertical-align:middle;margin-right:10px;border-radius:3px"></span>Model</div><div class="faint" style="font-size:20px">illustrative</div></div>
        <svg viewBox="0 0 1300 160" style="flex:1;height:100%" preserveAspectRatio="none"><path id="c2hum" fill="none" stroke="var(--orange)" stroke-width="5"/><path id="c2mod" fill="none" stroke="var(--accent)" stroke-width="5" stroke-dasharray="14 10"/></svg>
        <div class="pill" id="c2fit" style="font-size:24px">fit: comparing…</div>
      </div>
      <div class="c2-methods stagger mt" style="flex:1">
        ${meth.map(m => `<div class="card">${ic(m[0], 64)}<h3>${m[1]}</h3><p>${m[2]}</p></div>`).join('')}
      </div>`,
    src: 'Ch2 · Thinking humanly: cognitive modelling',
    enter(c) {
      const h = c.$('#c2hum'), m = c.$('#c2mod'), fit = c.$('#c2fit');
      const H = x => 80 + 45 * Math.sin(x / 140) + 22 * Math.sin(x / 47);
      let d = ''; for (let x = 0; x <= 1300; x += 10) d += (x ? ' L' : 'M') + x + ',' + H(x).toFixed(1); h.setAttribute('d', d);
      c.loop(t => {
        const k = Math.min(1, (t % 8000) / 5000);
        let e = ''; for (let x = 0; x <= 1300; x += 10) { const y = (1 - k) * (80 + 30 * Math.sin(x / 90 + 1.5)) + k * H(x); e += (x ? ' L' : 'M') + x + ',' + y.toFixed(1); }
        m.setAttribute('d', e);
        fit.textContent = k < 1 ? 'adjusting model…' : 'model matches the evidence';
      });
    },
  });

  /* 15 — Thinking rationally */
  slides.push({
    title: 'Thinking rationally: laws of thought',
    html: `
      <div class="eyebrow">Thinking rationally</div>
      <h2>The laws of thought</h2>
      <p class="lead" style="max-width:1680px">Use <b>formal rules of logic</b> to derive conclusions from stated information — linking intelligence with <b>valid reasoning</b>, an idea that goes back to <b>Aristotle’s syllogisms</b>.</p>
      <div class="grid-2" style="margin-top:40px;flex:1">
        <div class="card" style="padding:34px 40px;--accent:var(--teal)">
          <span class="num">Valid reasoning</span>
          <div class="c2-syl">
            <div><span class="c2-k">Rule</span>If a patient has condition X, then test Y should be considered.</div>
            <div><span class="c2-k">Fact</span>The patient has condition X.</div>
            <div><span class="c2-k">Conclusion</span><b class="accent">Test Y should be considered.</b></div>
          </div>
        </div>
        <div class="card" id="c2peng" style="padding:34px 40px;--accent:var(--orange)">
          <div class="row" style="justify-content:space-between"><span class="num" style="margin:0">Valid, but is it true?</span><button class="btn sm" id="c2chk">Check the premises</button></div>
          <div class="c2-syl" style="margin-top:12px">
            <div><span class="c2-k">Premise</span><span class="c2-strike">All birds can fly.</span></div>
            <div><span class="c2-k">Premise</span>A penguin is a bird.</div>
            <div><span class="c2-k">Conclusion</span><b>So a penguin can fly.</b></div>
          </div>
          <div class="c2-verdict"><span class="pill" style="--accent:var(--green)">Logic: valid ✓</span><span class="pill" id="c2truth" style="--accent:var(--line-2);color:var(--muted)">Truth: ?</span></div>
        </div>
      </div>
      <div class="grid-3 mt" data-step="1">
        <div class="callout" style="--accent:var(--green);font-size:26px"><b>Strength:</b> reasoning is explicit and checkable.</div>
        <div class="callout" style="--accent:var(--red);font-size:26px"><b>Limitation:</b> incomplete information, uncertainty, too many possibilities to check.</div>
        <div class="callout" style="font-size:26px"><b>Applications:</b> theorem proving, rule-based expert systems, knowledge-based reasoning — and <b>Prolog</b>.</div>
      </div>`,
    src: 'Ch2 · Thinking rationally: the laws of thought',
    enter(c) {
      const card = c.$('#c2peng'), tr = c.$('#c2truth');
      card.classList.remove('c2-flag'); tr.textContent = 'Truth: ?';
      c.on(c.$('#c2chk'), 'click', () => {
        const on = card.classList.toggle('c2-flag');
        tr.textContent = on ? 'Truth: first premise is false ✗' : 'Truth: ?';
        tr.style.cssText = on ? '--accent:var(--red)' : '--accent:var(--line-2);color:var(--muted)';
        c.$('#c2chk').textContent = on ? 'Logic is only as good as its facts' : 'Check the premises';
      });
    },
  });

  /* 16 — Acting rationally */
  const percepts = ['location', 'traffic', 'road closures'], actions = ['continue', 'turn', 'stop', 'reroute'];
  slides.push({
    title: 'Acting rationally: the rational agent',
    html: `
      <div class="eyebrow">Acting rationally</div>
      <h2>The rational agent</h2>
      <p class="lead" style="max-width:1680px">An agent <b>perceives its environment</b> and chooses the action <b>expected to best achieve its goal</b>, given the evidence and resources available.</p>
      <div class="body" style="gap:44px;margin-top:36px">
        <div class="card c2-agent" style="width:820px;padding:20px">
          <svg viewBox="0 0 800 480">
            <defs><marker id="c2ah2" markerWidth="12" markerHeight="12" refX="8" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="var(--accent)"/></marker></defs>
            <path id="c2pp" d="M 190 170 C 190 50, 610 50, 610 165" fill="none" stroke="var(--teal)" stroke-width="5" marker-end="url(#c2ah2)"/>
            <path id="c2ap" d="M 610 310 C 610 430, 190 430, 190 315" fill="none" stroke="var(--accent)" stroke-width="5" marker-end="url(#c2ah2)"/>
            <rect x="40" y="175" width="300" height="130" rx="24" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="2"/>
            <text x="190" y="252" text-anchor="middle" font-size="34" font-weight="750">Environment</text>
            <rect x="460" y="175" width="300" height="130" rx="24" fill="var(--accent)"/>
            <text x="610" y="252" text-anchor="middle" font-size="34" font-weight="750" style="fill:#fff">Agent</text>
            <text x="400" y="22" text-anchor="middle" font-size="24" font-weight="700" style="fill:var(--teal)">PERCEPTS</text>
            <text x="400" y="58" text-anchor="middle" font-size="30" font-weight="650" id="c2pt">location</text>
            <text x="400" y="472" text-anchor="middle" font-size="24" font-weight="700" style="fill:var(--accent)">ACTIONS</text>
            <text x="400" y="440" text-anchor="middle" font-size="30" font-weight="650" id="c2at">continue</text>
            <circle id="c2pd" r="12" fill="var(--teal)"/><circle id="c2ad" r="12" fill="var(--accent)"/>
          </svg>
        </div>
        <div class="col grow" style="gap:18px">
          <table class="tbl c2-ctbl"><thead><tr><th>Agent element</th><th>Route-planning example</th></tr></thead><tbody>
            <tr><td>Goal</td><td>Reach the destination safely and on time</td></tr>
            <tr><td>Performance measure</td><td>Safety, travel time, distance, fuel</td></tr>
            <tr><td>Decision</td><td>Best expected result with current information</td></tr>
            <tr><td>Feedback</td><td>Observe new position; update the plan</td></tr></tbody></table>
          <div class="callout" data-step="1" style="font-size:28px"><b>Rational</b> means the best action with the information available — <b>not perfection</b>.</div>
        </div>
      </div>`,
    src: 'Ch2 · Acting rationally: the rational agent',
    enter(c) {
      const pp = c.$('#c2pp'), ap2 = c.$('#c2ap'), pd = c.$('#c2pd'), ad = c.$('#c2ad'), L1 = pp.getTotalLength(), L2 = ap2.getTotalLength();
      c.loop(t => {
        const k = (t % 2400) / 2400, n = Math.floor(t / 2400);
        let p = pp.getPointAtLength(L1 * k); pd.setAttribute('cx', p.x); pd.setAttribute('cy', p.y);
        p = ap2.getPointAtLength(L2 * ((k + .5) % 1)); ad.setAttribute('cx', p.x); ad.setAttribute('cy', p.y);
        c.$('#c2pt').textContent = percepts[n % 3];
        c.$('#c2at').textContent = actions[n % 4];
      });
    },
  });

  /* 17 — Comparison */
  const cmp = [['Acting humanly', 'Behave like a person', 'Human judgement of observable interaction', 'Chatbot tested through dialogue (Turing test)'], ['Thinking humanly', 'Model real human cognitive processes', 'Match with experimental data about people', 'Cognitive tutor, ACT-R, SOAR'], ['Thinking rationally', 'Derive logically valid conclusions', 'Correct use of formal rules', 'Theorem prover, rule-based expert system'], ['Acting rationally', 'Choose actions that best achieve a goal', 'Performance measure in the environment', 'Route planner, autonomous agent']];
  slides.push({
    title: 'Comparison of the four approaches',
    html: `
      <div class="eyebrow">Compare</div>
      <h2>The four approaches side by side</h2>
      <table class="tbl clickrows c2-cmp" id="c2cmp" style="margin-top:50px"><thead><tr><th style="width:300px">Approach</th><th>Main aim</th><th>How success is judged</th><th>Example</th></tr></thead>
        <tbody>${cmp.map((r, i) => `<tr data-step="${i + 1}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</tbody></table>
      <div class="callout" style="margin-top:auto;font-size:28px" data-step="5"><b>Exam tip:</b> a strong comparison states the <b>aim</b>, the <b>evidence used to judge success</b>, <b>one example</b> and <b>one limitation</b> for each approach.</div>`,
    src: 'Ch2 · Comparison of the four AI approaches',
    enter(c) { c.$$('#c2cmp tbody tr').forEach(r => c.on(r, 'click', () => c.$$('#c2cmp tbody tr').forEach(x => x.classList.toggle('hot', x === r)))); },
    step(c, n) { c.$$('#c2cmp tbody tr').forEach((r, i) => r.classList.toggle('hot', n <= 4 && i === n - 1)); },
  });

  /* 18 — Campus robot */
  const lens = [['chat', 'Acting humanly', 'Does the robot talk like a helpful receptionist?'], ['brain', 'Thinking humanly', 'Do its decision steps match how people plan and revise a route?'], ['scale', 'Thinking rationally', 'Does its conclusion follow logically from its route rules and facts?'], ['route', 'Acting rationally', 'Does it get the visitor there safely and efficiently?']];
  slides.push({
    title: 'Case: one goal, four approaches',
    html: `
      <div class="eyebrow">Case study</div>
      <h2>One goal, four AI approaches</h2>
      <p class="lead" style="max-width:1680px"><b>Goal:</b> a campus robot guides a visitor to the correct room when a corridor is closed.</p>
      <div class="body" style="gap:40px;margin-top:36px">
        <div class="card c2-map" style="width:700px;padding:24px">
          <svg viewBox="0 0 660 440">
            <g stroke="var(--surface-2)" stroke-width="54" stroke-linecap="round" fill="none"><path d="M60 320 H600"/><path d="M200 320 V110 H480 V320"/></g>
            <g fill="var(--line)"><rect x="560" y="200" width="80" height="80" rx="12"/></g>
            <text x="600" y="246" text-anchor="middle" font-size="22" font-weight="700" style="fill:var(--text)">Room</text>
            <g transform="translate(340,320)"><rect x="-34" y="-34" width="68" height="68" rx="14" fill="var(--red)"/><path d="M-16 -16 L16 16 M16 -16 L-16 16" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>
            <text x="340" y="402" text-anchor="middle" font-size="22" font-weight="700" style="fill:var(--red)">Corridor closed</text>
            <path id="c2rp" d="M60 320 H200 V110 H480 V320 H585" fill="none" stroke="var(--accent)" stroke-width="6" stroke-dasharray="14 12" class="flow-dash"/>
            <text x="60" y="380" text-anchor="middle" font-size="22" font-weight="600" style="fill:var(--muted)">Entrance</text>
            <circle id="c2vis" r="13" fill="var(--teal)"/>
            <g id="c2bot"><circle r="24" fill="var(--accent)"/>${I('robot', 'c2-wi').replace('<svg ', '<svg x="-15" y="-15" width="30" height="30" color="#fff" ')}</g>
          </svg>
        </div>
        <div class="c2-lens grow">${lens.map((l, i) => `<div class="card ${i % 2 ? 'rat' : ''}" data-step="${i + 1}">${ic(l[0], 56)}<div><h3>${l[1]}</h3><p>${l[2]}</p></div></div>`).join('')}</div>
      </div>
      <div class="callout mt" data-step="5" style="font-size:27px"><b>Discuss:</b> which approach best tests <b>route quality</b>, and which best studies <b>human reasoning</b>?</div>`,
    src: 'Ch2 · Case: one goal, four AI approaches',
    enter(c) {
      const p = c.$('#c2rp'), bot = c.$('#c2bot'), vis = c.$('#c2vis'), L = p.getTotalLength();
      c.loop(t => {
        const k = Math.min(1, (t % 7000) / 6000);
        const a = p.getPointAtLength(L * k), b = p.getPointAtLength(Math.max(0, L * k - 50));
        bot.setAttribute('transform', `translate(${a.x},${a.y})`); vis.setAttribute('cx', b.x); vis.setAttribute('cy', b.y);
      });
    },
  });

  /* 19 — Summary */
  slides.push({
    title: 'Chapter 2 summary',
    html: `
      <div class="eyebrow">Chapter 2 · Summary</div>
      <h2>Three things to remember</h2>
      <div class="grid-3" style="margin-top:60px;flex:1">
        ${[['brain', 'Human intelligence', 'The ability to learn, understand, reason, adapt and use knowledge to reach a goal — a coordinated use of perception, attention, memory, language, reasoning and emotion, improved by feedback.'],
        ['sparkle', 'Many forms', 'Gardner (1983) proposed eight relatively distinct intelligences. Emotional intelligence (Goleman’s five areas) manages emotion; social intelligence reads situations and people — they overlap through empathy.'],
        ['scale', 'Four approaches to AI', 'Human vs rational standard × thinking vs acting: acting humanly (Turing test), thinking humanly (cognitive modelling), thinking rationally (laws of thought), acting rationally (rational agent).']]
        .map((x, i) => `<div class="card" data-step="${i + 1}" style="padding:44px">${ic(x[0], 72, 'margin-bottom:22px')}<h3>${x[1]}</h3><p style="margin-top:14px;font-size:32px;line-height:1.45">${x[2]}</p></div>`).join('')}
      </div>`,
    src: 'Ch2 · Chapter summary (built from the chapter slides)',
  });

  /* 20–23 — Quick checks */
  const qcs = [
    ['Which ability best describes changing behaviour when conditions change?', ['Adaptation', 'Sensation', 'Storage', 'Imitation'], 0, '<b>Adaptation</b> — change behaviour when the situation changes.'],
    ['Which form of intelligence mainly concerns understanding oneself?', ['Spatial', 'Intrapersonal', 'Naturalistic', 'Musical'], 1, '<b>Intrapersonal</b> — understand own feelings, motives and strengths.'],
    ['Which approach evaluates whether a system behaves like a person?', ['Thinking rationally', 'Acting rationally', 'Acting humanly', 'Thinking humanly'], 2, '<b>Acting humanly</b> — judged by human judgement of observable interaction (Turing test).'],
    ['Which approach places formal logical reasoning at the centre?', ['Thinking rationally', 'Acting humanly', 'Thinking humanly', 'Acting rationally'], 0, '<b>Thinking rationally</b> — the laws of thought.'],
  ];
  qcs.forEach((q, i) => slides.push({
    title: 'Quick check ' + (i + 1),
    html: `<div class="eyebrow">Quick check · ${i + 1} of ${qcs.length} <span class="pill neutral">Tap an answer</span></div><div class="qc-wrap">${Deck.qc(q[0], q[1], q[2], q[3])}</div>`,
    src: 'Ch2 · Review questions: multiple choice',
  }));

  /* 24 — True or false */
  const tfs = [
    ['Human intelligence depends on only one cognitive process.', false, 'It is a coordinated use of many processes.'],
    ['Emotional intelligence includes recognising and regulating emotion.', true, ''],
    ['Multiple intelligences and learning styles are identical ideas.', false, 'Gardner’s theory is not a “learning style” claim.'],
    ['Thinking humanly uses evidence about actual human cognition.', true, ''],
    ['A rational agent always has complete information.', false, 'Best action with the information available.'],
  ];
  slides.push({
    title: 'True or false',
    html: `
      <div class="eyebrow">Quick check · True or false <span class="pill neutral">Tap each statement</span></div>
      <h2>True or false?</h2>
      <div class="c2-tf-list mt-l">${tfs.map(t => `<div class="c2-tf ${t[1] ? 't' : 'f'}"><p>${t[0]}</p><div class="c2-ans">${t[1] ? 'True' : 'False'}${t[2] ? `<div>${t[2]}</div>` : ''}</div></div>`).join('')}</div>`,
    src: 'Ch2 · Review questions: true or false',
    enter(c) { c.$$('.c2-tf').forEach(t => { t.classList.remove('show'); c.on(t, 'click', () => t.classList.add('show')); }); },
  });

  /* 25 — Lab 2 simulator */
  slides.push({
    title: 'Lab 2: learning strategy simulator',
    html: `
      <div class="eyebrow">Lab 2 · Choosing a learning strategy <span class="pill neutral">Live demo</span></div>
      <h2>Study planner — a <span class="grad">simple rational agent</span></h2>
      <div class="body" style="gap:50px;margin-top:40px">
        <div class="col c2-form" style="width:600px;gap:30px">
          <div><label>Student name</label><input id="c2n" value="Ammar"></div>
          <div class="row" style="gap:20px"><div class="grow"><label>Previous score</label><input id="c2s" type="number" min="0" max="100" value="42"></div><div class="grow"><label>Study days</label><input id="c2d" type="number" min="1" value="4"></div></div>
          <div><label>Suggested test values</label><div class="row" style="gap:12px;flex-wrap:wrap">${[[42, 4], [65, 2], [90, 1]].map(v => `<button class="btn sm" data-v="${v}">${v[0]} / ${v[1]} day${v[1] > 1 ? 's' : ''}</button>`).join('')}</div></div>
        </div>
        <div class="col grow" style="gap:20px">
          <div class="c2-term" id="c2out"></div>
          <div class="grid-2" style="gap:16px">
            <div class="col" style="gap:8px"><div class="c2-rule" data-r="s0"><span>Score below 50</span><b>Notes + flashcards</b></div><div class="c2-rule" data-r="s1"><span>50 to 79</span><b>Flashcards + self-quiz</b></div><div class="c2-rule" data-r="s2"><span>80 to 100</span><b>Practice quiz</b></div></div>
            <div class="col" style="gap:8px"><div class="c2-rule" data-r="d0"><span>1 day</span><b>45 minutes</b></div><div class="c2-rule" data-r="d1"><span>2 or 3 days</span><b>30 min / day</b></div><div class="c2-rule" data-r="d2"><span>More than 3 days</span><b>20 min / day</b></div></div>
          </div>
        </div>
      </div>`,
    src: 'Ch2 · Lab 2: Choosing a learning strategy (rules exactly as in the lab brief)',
    enter(c) {
      const n = c.$('#c2n'), s = c.$('#c2s'), d = c.$('#c2d'), out = c.$('#c2out');
      const run = () => {
        const sc = parseInt(s.value, 10), dy = parseInt(d.value, 10), name = (n.value || '').trim() || 'Student';
        if (isNaN(sc) || sc < 0 || sc > 100 || isNaN(dy) || dy < 1) { out.innerHTML = '<span class="c2-pr">&gt;</span> Enter a score from 0 to 100 and at least 1 study day.'; c.$$('.c2-rule').forEach(r => r.classList.remove('on')); return; }
        const si = sc < 50 ? 0 : sc < 80 ? 1 : 2, di = dy === 1 ? 0 : dy <= 3 ? 1 : 2;
        const strat = ['Review notes and use flashcards', 'Use flashcards and take a self-quiz', 'Take a practice quiz'][si], mins = [45, 30, 20][di];
        c.$$('.c2-rule').forEach(r => r.classList.toggle('on', r.dataset.r === 's' + si || r.dataset.r === 'd' + di));
        const plan = dy === 1 ? `${mins} minutes for 1 day` : `${mins} minutes per day for ${dy} days`;
        out.innerHTML = `<div class="c2-pr">&gt;&gt;&gt; run lab2.py</div><div>Student: <b>${name.replace(/[<>&]/g, '')}</b></div><div>Recommended strategy: <b>${strat}</b></div><div>Study plan: <b>${plan}</b></div>`;
        out.animate([{ opacity: .4 }, { opacity: 1 }], { duration: 350 });
      };
      [n, s, d].forEach(el => c.on(el, 'input', run));
      c.$$('[data-v]').forEach(b => c.on(b, 'click', () => { const [a, bb] = b.dataset.v.split(','); s.value = a; d.value = bb; run(); }));
      run();
    },
  });

  Deck.chapter({ id: 'ch2', label: 'Chapter 2', title: 'Human Intelligence and Approaches to AI', slides });
})();
