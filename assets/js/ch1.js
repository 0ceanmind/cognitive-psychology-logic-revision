/* =========================================================
   Chapter 1 — Introduction to Cognition and Artificial Intelligence
   Source: ATM00201 Chapter 1 lecture deck (Semester A 2026-27)
   ========================================================= */
(function () {
  const I = Deck.icon;
  const css = document.createElement('style');
  css.textContent = `
  .opener { justify-content:center; }
  .opener .big-num { font-size:420px; font-weight:800; letter-spacing:-.06em; line-height:.8; color:transparent; -webkit-text-stroke:3px var(--accent); position:absolute; right:110px; top:150px; opacity:.9; }
  .opener h1 { font-size:128px; max-width:1300px; }
  .opener .topics { display:flex; flex-wrap:wrap; gap:14px; margin-top:54px; max-width:1300px; }
  .verb { display:inline-block; min-width:330px; text-align:left; color:var(--accent); }
  .chain { display:flex; align-items:stretch; gap:0; margin-top:10px; }
  .chain .lnk { flex:1; position:relative; padding:28px 26px 26px; border-top:3px solid var(--line); transition:border-color .6s; }
  .chain .lnk.in { border-color:var(--accent); }
  .chain .lnk b { display:block; font-size:30px; color:var(--text); margin-bottom:8px; }
  .chain .lnk span { font-size:25px; color:var(--muted); line-height:1.35; display:block; }
  .chain .lnk::before { content:""; position:absolute; top:-11px; left:24px; width:19px; height:19px; border-radius:50%; background:var(--bg); border:3px solid var(--accent); }
  .map-row { display:grid; grid-template-columns: 1fr 220px 1fr; align-items:center; gap:0; }
  .map-row .side { padding:26px 32px; border-radius:var(--r); background:var(--surface); border:1px solid var(--line); font-size:32px; font-weight:600; display:flex; align-items:center; gap:18px; }
  .map-row .side svg { width:46px; height:46px; color:var(--accent); flex:none; }
  .map-row .wire { height:4px; position:relative; background:linear-gradient(90deg,var(--accent),var(--teal)); border-radius:4px; transform-origin:left; transform:scaleX(0); transition:transform .9s var(--ease); }
  .map-row.in .wire { transform:scaleX(1); }
  .proc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .proc-grid .card { padding:30px 32px; }
  .proc-grid .card h3 { display:flex; align-items:center; gap:16px; }
  .proc-grid .card h3 svg { width:44px; height:44px; color:var(--accent); }
  .pipe { position:relative; height:330px; margin-top:90px; margin-bottom:40px; }
  .pipe .node { position:absolute; top:105px; width:196px; height:120px; margin-left:-98px; border-radius:24px; background:var(--surface); border:1.5px solid var(--line); display:grid; place-items:center; font-size:28px; font-weight:650; transition:all .45s var(--ease); text-align:center; }
  .pipe .node.lit { border-color:var(--accent); background:var(--accent-soft); box-shadow:0 0 50px -6px var(--accent); transform:translateY(-6px); }
  .pipe .node.stim { background:var(--accent); color:#fff; border-color:var(--accent); }
  .pipe svg.wires { position:absolute; inset:0; overflow:visible; }
  .tl-light { width:170px; padding:22px; border-radius:40px; background:#1a1a1d; border:2px solid #333; display:flex; flex-direction:column; gap:18px; align-items:center; }
  .tl-light i { width:110px; height:110px; border-radius:50%; background:#2b2b2e; display:block; }
  .tl-light i.red { background:#ff3b30; box-shadow:0 0 60px 10px rgba(255,59,48,.65), inset 0 -10px 20px rgba(0,0,0,.25); animation: pulse 1.6s infinite; }
  .stage-tbl td { font-size:28px; }
  .stage-tbl tr td { opacity:.28; }
  .stage-tbl tr.on td { opacity:1; }
  .stage-tbl tr.cur td { background:var(--accent-soft); color:var(--text); }
  .bt-arrow { font-size:120px; line-height:1; font-weight:200; color:var(--accent); }
  .blurword { filter:blur(9px); transition:filter 1.2s var(--ease); display:inline-block; }
  .blurword.clear { filter:none; color:var(--accent); }
  .classify .sit { display:grid; grid-template-columns: 1fr auto; gap:28px; align-items:center; padding:30px 36px; border-radius:var(--r); background:var(--surface); border:1px solid var(--line); }
  .classify .sit p { font-size:34px; }
  .classify .sit .why { font-size:24px; color:var(--muted); margin-top:6px; min-height:30px; opacity:0; transition:opacity .4s; }
  .classify .sit.done .why { opacity:1; }
  .classify .seg button { font-size:26px; padding:14px 26px; }
  .classify .seg button.ok { background:var(--green); color:#fff; }
  .classify .seg button.no { background:var(--red); color:#fff; animation: shake .4s; }
  .pix { display:grid; grid-template-columns:repeat(16,1fr); gap:3px; width:520px; height:520px; }
  .pix i { border-radius:3px; background:var(--surface-2); transition:background .5s, transform .5s; }
  .rubin svg { width:520px; height:640px; border-radius:28px; }
  .rubin .bg, .rubin .vase { transition: fill .9s var(--ease); }
  .area-chips { display:flex; gap:12px; flex-wrap:wrap; }
  .vs { display:grid; grid-template-columns:1fr 1fr; gap:28px; }
  .vs .card { padding:48px 52px; min-height:300px; display:flex; flex-direction:column; }
  .vs .card .who { font-size:24px; letter-spacing:.12em; text-transform:uppercase; font-weight:700; color:var(--muted); display:flex; align-items:center; gap:14px; }
  .vs .card .who svg { width:40px; height:40px; color:var(--accent); }
  .vs .card .txt { font-size:56px; font-weight:650; line-height:1.2; margin:auto 0; padding-bottom:30px; letter-spacing:-.01em; transition:opacity .35s, transform .45s var(--ease); }
  .vs .card .txt.swap { opacity:0; transform:translateY(12px); }
  .spot svg { width:100%; height:100%; overflow:visible; }
  .spot .beam { transition: transform 1s var(--ease), opacity .6s; transform-origin: 450px 70px; }
  .spot .tgt circle { transition: fill .5s, stroke .5s, r .5s; }
  .spot .tgt text { transition: fill .5s, opacity .5s; }
  .timer-ring { width:300px; height:300px; position:relative; display:grid; place-items:center; }
  .timer-ring svg { position:absolute; inset:0; transform:rotate(-90deg); }
  .timer-ring .t { font-size:110px; font-weight:750; font-variant-numeric:tabular-nums; letter-spacing:-.04em; }
  .photo { border-radius:28px; overflow:hidden; border:1px solid var(--line); position:relative; background:#fff; }
  .photo img { display:block; width:100%; height:100%; object-fit:contain; transition: filter 1s var(--ease), opacity 1s; }
  .photo.hidden img { filter: blur(40px); opacity:.0; }
  .photo .veil { position:absolute; inset:0; display:grid; place-items:center; font-size:46px; font-weight:700; color:var(--text); background:var(--surface); opacity:0; transition:opacity .8s; pointer-events:none; }
  .photo.hidden .veil { opacity:1; }
  .mem3 { display:flex; align-items:center; gap:22px; }
  .mem3 .st { flex:1; text-align:center; padding:26px 10px; border-radius:22px; background:var(--surface); border:1px solid var(--line); transition:all .5s; }
  .mem3 .st.lit { border-color:var(--accent); background:var(--accent-soft); }
  .mem3 .st b { display:block; font-size:30px; }
  .mem3 .st span { font-size:22px; color:var(--muted); }
  .mem3 .ar { color:var(--accent); width:40px; height:40px; flex:none; }
  .graph svg { width:100%; height:100%; overflow:visible; }
  .graph .edge { stroke:var(--line-2); stroke-width:6; transition: stroke .5s, stroke-width .5s; }
  .graph .edge.best { stroke:var(--accent); stroke-width:10; }
  .graph .edge.jam { stroke:var(--red); stroke-dasharray:14 10; }
  .graph .cost { font-size:24px; font-weight:700; fill:var(--muted); }
  .graph .cost.jam { fill:var(--red); }
  .graph .nd circle { fill:var(--surface-2); stroke:var(--line-2); stroke-width:3; }
  .graph .nd.end circle { fill:var(--accent); stroke:var(--accent); }
  .graph .nd text { font-size:24px; font-weight:650; fill:var(--text); }
  .ps-steps .card { padding:22px 28px; }
  .ps-steps .card h3 { font-size:32px; }
  .ps-steps .card p { font-size:26px; max-height:0; overflow:hidden; transition:max-height .6s var(--ease), margin .6s; }
  .ps-steps .card.cur p { max-height:160px; margin-top:8px; color:var(--text); }
  .ps-steps .card.cur { border-color:var(--accent); background:var(--accent-soft); }
  .tline { position:relative; margin-top:70px; }
  .tline .rail { position:absolute; left:0; right:0; top:44px; height:4px; background:var(--line); border-radius:4px; }
  .tline .rail i { position:absolute; inset:0; background:linear-gradient(90deg,var(--blue),var(--purple),var(--pink),var(--orange),var(--green)); transform-origin:left; transform:scaleX(0); transition:transform 1s var(--ease); border-radius:4px; }
  .tline .eras { display:grid; grid-template-columns:repeat(5,1fr); gap:22px; position:relative; }
  .tline .era .dot { width:30px; height:30px; border-radius:50%; background:var(--bg); border:4px solid var(--accent); margin:30px 0 30px; }
  .tline .era .yr { font-size:40px; font-weight:750; letter-spacing:-.02em; }
  .tline .era .ex { font-size:25px; font-weight:600; color:var(--accent); margin:10px 0 14px; line-height:1.3; }
  .tline .era p { font-size:25px; color:var(--muted); line-height:1.4; }
  .tf-list { display:flex; flex-direction:column; gap:18px; }
  .tf { display:grid; grid-template-columns: 1fr 260px; gap:24px; align-items:center; padding:22px 30px; border-radius:var(--r); background:var(--surface); border:1px solid var(--line); cursor:pointer; transition:all .45s var(--ease); }
  .tf p { font-size:31px; }
  .tf .ans { font-size:30px; font-weight:750; text-align:right; opacity:0; transform:translateX(20px); transition:all .5s var(--ease); }
  .tf.show .ans { opacity:1; transform:none; }
  .tf.show.t { border-color:var(--green); } .tf.show.t .ans { color:var(--green); }
  .tf.show.f { border-color:var(--red); } .tf.show.f .ans { color:var(--red); }
  `;
  document.head.appendChild(css);

  /* ---------- helpers ---------- */
  function smoothPath(pts) { // Catmull-Rom → cubic Bézier through points
    let d = 'M' + pts[0][0] + ',' + pts[0][1];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ' C' + c1.map(n => n.toFixed(1)) + ' ' + c2.map(n => n.toFixed(1)) + ' ' + p2[0] + ',' + p2[1];
    }
    return d;
  }
  // Rubin vase: right-hand profile (y, half-width) — the edge is also a face looking inward
  const prof = [[40, 190], [85, 186], [130, 150], [172, 142], [212, 116], [248, 70], [272, 100], [298, 106], [318, 84], [338, 101], [358, 92], [384, 120], [420, 104], [470, 122], [540, 152], [600, 176], [660, 196]];
  const cx = 300;
  const right = prof.map(([y, w]) => [cx + w, y]);
  const left = prof.slice().reverse().map(([y, w]) => [cx - w, y]);
  const vaseD = smoothPath(right) + ' L' + left[0][0] + ',' + left[0][1] + ' ' + smoothPath(left).slice(1).replace(/^[^C]*/, '') + ' Z';

  function opener(num, title, sub, topics) {
    return {
      title: 'Chapter ' + num + ' opener', cls: 'opener',
      html: `
        <div class="big-num rise">0${num}</div>
        <div class="eyebrow rise">Chapter ${num}</div>
        <h1 class="rise d1">${title}</h1>
        <p class="lead rise d2" style="max-width:1150px">${sub}</p>
        <div class="topics rise d3">${topics.map(t => `<span class="pill">${t}</span>`).join('')}</div>`
    };
  }

  /* ---------- slides ---------- */
  const slides = [];

  slides.push(opener(1, 'Introduction to Cognition and <span class="grad">Artificial Intelligence</span>',
    'Perception, learning, problem-solving, human thinking and historical AI systems.',
    ['Cognition', 'Perception', 'Attention', 'Memory & learning', 'Thinking', 'Problem-solving', 'History of AI']));

  // Cognition
  slides.push({
    title: 'Cognition',
    html: `
      <div class="eyebrow">Definition</div>
      <h2>Cognition is how we <span class="verb" id="verb">receive</span></h2>
      <p class="lead">The <b>mental processes</b> that help a person <b>receive</b> information, <b>understand</b> it, <b>store</b> it and <b>use</b> it — to recognise objects, remember experiences, learn new ideas, make decisions and solve problems.</p>
      <div class="mt-l" style="font-size:24px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint);font-weight:700">A student enters a classroom…</div>
      <div class="chain mt">
        ${[['Perception', 'identifies the people and objects'], ['Attention', 'selects the lecturer or the task'], ['Memory', 'provides earlier knowledge'], ['Thinking', 'connects new information with what is known'], ['Decision', 'guides the next action']].map((x, i) => `<div class="lnk" data-step="${i + 1}"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}
      </div>
      <div class="callout mt-l" data-step="6"><b>The main idea:</b> cognitive processes work together. A single activity usually uses more than one process.</div>`,
    src: 'Ch1 · Cognition',
    enter(c) {
      const words = ['receive', 'understand', 'store', 'use'];
      let i = 0; const v = c.$('#verb');
      c.interval(() => {
        i = (i + 1) % words.length;
        v.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-20px)' }], { duration: 260, fill: 'forwards' }).onfinish = () => {
          v.textContent = words[i];
          v.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.22,.8,.2,1)', fill: 'forwards' });
        };
      }, 1800);
    },
  });

  // Cognitive psychology
  slides.push({
    title: 'Cognitive psychology',
    html: `
      <div class="eyebrow">Definition</div>
      <h2>Cognitive psychology</h2>
      <p class="lead">Studies <b>how people process information</b> — perception, attention, memory, learning, language, reasoning, decision-making and problem-solving. Researchers study <b>behaviour</b> and use the results to explain the <b>mental processes</b> behind it.</p>
      <div class="body">
        <div class="col" style="width:640px">
          <div class="card" data-step="1">
            <span class="num">A typical experiment</span>
            <p style="color:var(--text)">Show several images for a short time. Ask what participants remember.</p>
            <p class="ex">People do not process every detail equally — important, familiar or expected information gets more attention and enters memory more easily.</p>
          </div>
        </div>
        <div class="col grow" style="gap:22px;justify-content:center">
          <div class="row" style="justify-content:space-between;font-size:22px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--faint)"><span>Human function</span><span>AI field it inspires</span></div>
          ${[['eye', 'Perception', 'image', 'Computer vision'], ['book', 'Learning from experience', 'cpu', 'Machine learning'], ['puzzle', 'Problem-solving', 'route', 'Search and planning']].map((m, i) => `
            <div class="map-row" data-step="${i + 2}">
              <div class="side">${I(m[0])}${m[1]}</div><div class="wire"></div><div class="side" style="--accent:var(--teal)">${I(m[2])}${m[3]}</div>
            </div>`).join('')}
          <p class="small muted" data-step="5" style="margin-top:8px">…but the <b style="color:var(--text)">mechanisms may differ</b> from human cognition.</p>
        </div>
      </div>`,
    src: 'Ch1 · Cognitive psychology',
    step(c, n) { c.$$('.map-row').forEach((r, i) => r.classList.toggle('in', n >= i + 2)); },
  });

  // Cognitive psychology and logic — route example
  slides.push({
    title: 'Cognitive psychology and logic',
    html: `
      <div class="eyebrow">Three lenses on one decision</div>
      <h2>Travelling to the university</h2>
      <p class="lead">A person considers <b>distance, traffic, weather</b> and <b>previous experience</b>. Tap the traffic to see each lens respond.</p>
      <div class="body" style="align-items:stretch">
        <div class="card" style="width:640px;padding:30px;display:flex;flex-direction:column">
          <svg viewBox="0 0 580 420" style="width:100%;flex:1">
            <path id="rA" d="M60 360 C 160 360, 200 120, 290 120 S 450 140, 520 70" fill="none" stroke-width="16" stroke-linecap="round"/>
            <path id="rB" d="M60 360 C 220 370, 330 330, 400 260 S 500 120, 520 70" fill="none" stroke-width="16" stroke-linecap="round"/>
            <text x="250" y="96" font-size="26" font-weight="700" fill="currentColor">Route A</text>
            <text x="380" y="330" font-size="26" font-weight="700" fill="currentColor">Route B</text>
            <circle cx="60" cy="360" r="20" fill="var(--text)"/><text x="30" y="405" font-size="22" fill="var(--muted)">Home</text>
            <circle cx="520" cy="70" r="20" fill="var(--accent)"/><text x="430" y="40" font-size="22" fill="var(--muted)">University</text>
            <g id="jam" style="cursor:pointer">
              <rect x="40" y="40" width="170" height="56" rx="28" fill="var(--surface-2)" stroke="var(--line-2)"/>
              <text x="125" y="77" text-anchor="middle" font-size="24" font-weight="700" fill="var(--text)" id="jamtxt">Add traffic</text>
            </g>
          </svg>
        </div>
        <div class="col grow" style="gap:22px">
          <div class="card" style="padding:28px 32px"><span class="num">Cognitive psychology</span><p style="color:var(--text)">Explains how the person <b>remembers familiar routes</b>, <b>evaluates current conditions</b> and <b>selects an option</b>.</p></div>
          <div class="card" id="logicCard" style="padding:28px 32px;--accent:var(--yellow)"><span class="num">Logic</span><p class="mono" style="color:var(--text);font-size:30px">IF Route A has heavy traffic<br>THEN choose Route B.</p></div>
          <div class="card" id="aiCard" style="padding:28px 32px;--accent:var(--teal)"><span class="num">AI connection</span><p style="color:var(--text)">A navigation system follows a similar process — <b>analysing data</b> and <b>recommending</b> the most suitable route: <b class="accent" id="rec">Route A</b></p></div>
        </div>
      </div>`,
    src: 'Ch1 · Cognitive Psychology and Logic',
    enter(c) {
      let jam = false;
      const A = c.$('#rA'), B = c.$('#rB');
      const draw = () => {
        A.setAttribute('stroke', jam ? 'var(--red)' : 'var(--accent)');
        A.setAttribute('stroke-dasharray', jam ? '18 14' : 'none');
        A.style.opacity = jam ? .9 : 1;
        B.setAttribute('stroke', jam ? 'var(--accent)' : 'var(--line-2)');
        c.$('#jamtxt').textContent = jam ? 'Clear traffic' : 'Add traffic';
        c.$('#rec').textContent = jam ? 'Route B' : 'Route A';
        c.$('#logicCard').classList.toggle('hot', jam);
        c.$('#aiCard').classList.toggle('glow', true);
      };
      draw();
      c.on(c.$('#jam'), 'click', () => { jam = !jam; draw(); });
    },
  });

  // Main cognitive processes
  const procs = [
    ['eye', 'Perception', 'Giving meaning to sensory information', 'Recognising a friend from their face'],
    ['target', 'Attention', 'Selecting information for further processing', 'Listening to the lecturer despite nearby noise'],
    ['db', 'Memory', 'Storing and retrieving information', 'Recalling a password or a definition'],
    ['book', 'Learning', 'Changing knowledge or behaviour through experience', 'Improving after practice and feedback'],
    ['brain', 'Thinking', 'Using information to reason or decide', 'Comparing two possible solutions'],
    ['route', 'Problem-solving', 'Finding actions that can reach a goal', 'Planning a route around traffic'],
  ];
  slides.push({
    title: 'Main cognitive processes',
    html: `
      <div class="eyebrow">Six processes</div>
      <h2>The main cognitive processes</h2>
      <div class="proc-grid stagger" style="margin-top:54px">
        ${procs.map(p => `<div class="card"><h3>${I(p[0])}${p[1]}</h3><p style="color:var(--text);font-size:29px">${p[2]}</p><p class="ex">e.g. ${p[3]}</p></div>`).join('')}
      </div>`,
    src: 'Ch1 · Main cognitive processes',
  });

  // Pipeline
  const pipe = ['Stimulus', 'Perception', 'Attention', 'Encoding', 'Memory', 'Reasoning', 'Decision', 'Response'];
  slides.push({
    title: 'A simple human cognitive process',
    html: `
      <div class="eyebrow">From signal to action</div>
      <h2>A simple human cognitive process</h2>
      <div class="pipe" id="pipe">
        <svg class="wires" viewBox="0 0 1680 330" preserveAspectRatio="none">
          <line x1="105" y1="165" x2="1575" y2="165" stroke="var(--line-2)" stroke-width="3"/>
          <line x1="105" y1="165" x2="1575" y2="165" stroke="var(--accent)" stroke-width="3" class="flow-dash"/>
          <path d="M 945 100 C 960 20, 1140 20, 1155 100" fill="none" stroke="var(--accent)" stroke-width="3" marker-end="url(#ah)" marker-start="url(#ah2)"/>
          <defs><marker id="ah" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker>
          <marker id="ah2" markerWidth="10" markerHeight="10" refX="4" refY="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>
          <circle id="spark" r="13" cy="165" cx="105" fill="var(--accent)" style="filter:drop-shadow(0 0 14px var(--accent))"/>
        </svg>
        ${pipe.map((p, i) => `<div class="node ${i === 0 ? 'stim' : ''}" style="left:${105 + i * 210}px">${p}</div>`).join('')}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <p class="muted" data-step="1" style="font-size:29px">A stimulus first reaches the senses. <b style="color:var(--text)">Perception</b> gives meaning to the input, while <b style="color:var(--text)">attention</b> selects what deserves further processing. The mind <b style="color:var(--text)">encodes</b> some of it and connects it with <b style="color:var(--text)">memory</b>. Reasoning and decision-making then guide a <b style="color:var(--text)">response</b>.</p>
        <div class="callout" data-step="2"><b>Stimulus</b> — any detectable change or signal from the internal or external environment that triggers a physical, chemical or behavioural response. Plural: <b>stimuli</b>.</div>
      </div>`,
    src: 'Ch1 · A simple human cognitive process',
    enter(c) {
      const nodes = c.$$('.pipe .node'), spark = c.$('#spark');
      c.loop(t => {
        const k = (t % 6000) / 6000, x = 105 + k * 1470;
        spark.setAttribute('cx', x);
        nodes.forEach((n, i) => n.classList.toggle('lit', i > 0 && Math.abs(x - (105 + i * 210)) < 80));
      });
    },
  });

  // Red traffic signal
  const stages = [
    ['Input', 'Light enters the eyes.', 'A camera captures image frames.'],
    ['Selection', 'Attention selects the signal and the road.', 'Software locates relevant objects.'],
    ['Interpretation', 'Stored knowledge gives red the meaning <i>stop</i>.', 'A trained model identifies the signal state.'],
    ['Decision', 'The driver judges distance and risk.', 'Planning logic selects braking.'],
    ['Action', 'The driver presses the brake and checks the result.', 'The controller brakes and sensors monitor speed.'],
  ];
  slides.push({
    title: 'Example: red traffic signal', steps: 5,
    html: `
      <div class="eyebrow">Worked example</div>
      <h2>Responding to a red traffic signal</h2>
      <div class="body" style="align-items:center;gap:70px">
        <div class="col center-x" style="gap:26px">
          <div class="tl-light"><i class="red"></i><i></i><i></i></div>
          <div class="pill" id="stageName">Press → to step through</div>
        </div>
        <table class="tbl stage-tbl grow">
          <thead><tr><th style="width:220px">Stage</th><th>${'Human driver'}</th><th style="color:var(--teal)">Autonomous vehicle</th></tr></thead>
          <tbody>${stages.map(s => `<tr><td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td></tr>`).join('')}</tbody>
        </table>
      </div>`,
    src: 'Ch1 · Example: responding to a red traffic signal',
    step(c, n) {
      c.$$('.stage-tbl tbody tr').forEach((r, i) => { r.classList.toggle('on', i < n); r.classList.toggle('cur', i === n - 1); });
      c.$('#stageName').textContent = n ? stages[n - 1][0] : 'Press → to step through';
    },
  });

  // Bottom-up vs top-down
  slides.push({
    title: 'Bottom-up and top-down processing',
    html: `
      <div class="eyebrow">Two directions of processing</div>
      <h2>Bottom-up <span class="muted" style="font-weight:300">vs</span> top-down</h2>
      <div class="vs" style="margin-top:50px;flex:1">
        <div class="card" style="--accent:var(--teal)">
          <div class="row" style="justify-content:space-between"><div class="who">${I('zap')}Bottom-up</div><div class="bt-arrow">↑</div></div>
          <p style="font-size:31px;color:var(--text);margin-top:10px">Begins with the <b class="accent">features of the stimulus</b> — lines, colours, sounds — then builds a complete interpretation. Important when the stimulus is <b>new or unexpected</b>.</p>
          <div class="row mt" style="gap:26px">
            <div id="flash" style="width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,#fff,var(--yellow) 40%,transparent 70%);opacity:.08"></div>
            <p class="ex" style="margin:0">Noticing a sudden bright light before knowing what produced it.</p>
          </div>
        </div>
        <div class="card" style="--accent:var(--purple)">
          <div class="row" style="justify-content:space-between"><div class="who">${I('brain')}Top-down</div><div class="bt-arrow">↓</div></div>
          <p style="font-size:31px;color:var(--text);margin-top:10px">Uses <b class="accent">goals, context, expectations</b> and earlier knowledge to interpret incomplete information quickly — but can mislead when the expectation is wrong.</p>
          <div class="mt" style="font-size:34px;font-weight:600">“Please switch off your mobile <span class="blurword" id="bw">phone</span>.”</div>
          <p class="ex">Reading a partly hidden word because the sentence gives useful context.</p>
        </div>
      </div>
      <div class="callout mt" data-step="1">Most perception <b>combines</b> information from the stimulus with knowledge already stored in memory.</div>`,
    src: 'Ch1 · Bottom-up and top-down processing',
    enter(c) {
      const f = c.$('#flash'), w = c.$('#bw');
      c.interval(() => { f.animate([{ opacity: .08, transform: 'scale(.8)' }, { opacity: 1, transform: 'scale(1.15)' }, { opacity: .08, transform: 'scale(.8)' }], { duration: 900, easing: 'ease-out' }); }, 2600);
      c.interval(() => w.classList.toggle('clear'), 2200);
    },
  });

  // Classifier activity
  const sits = [
    ['A sudden alarm attracts your attention.', 'Bottom-up', 'The strong sound enters through the senses.'],
    ['You identify a blurred word in a familiar sentence.', 'Top-down', 'Language knowledge helps complete the word.'],
    ['A doctor searches an image for an expected abnormality.', 'Both', 'Image features and expert knowledge guide the search.'],
    ['A vision model uses pixels and the surrounding scene.', 'Both', 'Visual features and learned context influence the output.'],
  ];
  slides.push({
    title: 'Which type of processing?',
    html: `
      <div class="eyebrow">Your turn</div>
      <h2>Which type of processing?</h2>
      <div class="col classify stagger" style="margin-top:46px;gap:20px">
        ${sits.map((s, i) => `<div class="sit" data-a="${s[1]}"><div><p>${s[0]}</p><div class="why">${s[2]}</div></div>
          <div class="seg">${['Bottom-up', 'Top-down', 'Both'].map(o => `<button data-o="${o}">${o}</button>`).join('')}</div></div>`).join('')}
      </div>`,
    src: 'Ch1 · Type of processing',
    enter(c) {
      c.$$('.sit').forEach(s => {
        s.classList.remove('done'); s.querySelectorAll('button').forEach(b => b.className = '');
        s.querySelectorAll('button').forEach(b => c.on(b, 'click', () => {
          if (s.classList.contains('done')) return;
          if (b.dataset.o === s.dataset.a) { b.className = 'ok'; s.classList.add('done'); }
          else { b.className = ''; void b.offsetWidth; b.className = 'no'; }
        }));
      });
    },
  });

  // Perception
  slides.push({
    title: 'Perception',
    html: `
      <div class="eyebrow">Definition</div>
      <h2>Perception</h2>
      <p class="lead">The process of <b>organising and interpreting</b> sensory information.</p>
      <div class="body" style="align-items:center;gap:80px">
        <div class="col center-x" style="gap:20px">
          <div class="pix" id="pix">${'<i></i>'.repeat(256)}</div>
          <div class="pill" id="pixLabel">Sensation: raw signal</div>
        </div>
        <div class="col grow" style="gap:24px">
          <div class="card" data-step="1" style="--accent:var(--teal)"><span class="num">Sensation</span><p style="color:var(--text)">Detects physical energy such as <b>light</b> or <b>sound</b>.</p></div>
          <div class="card" data-step="2"><span class="num">Perception</span><p style="color:var(--text)">Gives that input <b>meaning</b>. It is not a complete copy of the environment: <b>attention</b> selects part of it, while <b>memory and context</b> shape the interpretation — fast and useful, but open to mistakes and visual illusions.</p></div>
          <div class="card" data-step="3" style="--accent:var(--purple)"><span class="num">In AI</span><p style="color:var(--text)">Computer vision converts <b>pixels</b> into useful outputs — <b>labels, locations or actions</b>.</p></div>
        </div>
      </div>`,
    src: 'Ch1 · Perception',
    enter(c) {
      const cells = c.$$('#pix i');
      // a simple "eye" glyph emerges from noise
      const shape = new Set();
      for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
        const dx = (x - 7.5) / 7, dy = (y - 7.5) / 3.6;
        const inEye = dx * dx + dy * dy < 1, pupil = (x - 7.5) ** 2 + (y - 7.5) ** 2 < 6;
        if (inEye && !pupil) shape.add(y * 16 + x);
        if (pupil) shape.add(-(y * 16 + x) - 1);
      }
      c.loop(t => {
        const k = Math.min(1, Math.max(0, ((t % 7000) - 1200) / 2600));
        cells.forEach((cell, i) => {
          const noise = Math.random();
          let col;
          if (shape.has(-i - 1)) col = k > .5 ? 'var(--accent)' : null;
          else if (shape.has(i)) col = k > .3 ? 'var(--text)' : null;
          if (!col || Math.random() > k) col = noise > .55 ? 'var(--line-2)' : 'var(--surface-2)';
          if (t % 6 < 1 || k >= 1) cell.style.background = col;
        });
        c.$('#pixLabel').textContent = k < .35 ? 'Sensation: raw signal' : k < 1 ? 'Organising…' : 'Perception: “an eye”';
      });
    },
  });

  // Rubin vase
  slides.push({
    title: 'Ambiguous perception: Rubin vase',
    html: `
      <div class="eyebrow">Ambiguous perception</div>
      <h2>What do you see first?</h2>
      <div class="body" style="align-items:center;gap:90px">
        <div class="rubin"><svg viewBox="0 0 600 700"><rect class="bg" width="600" height="700" rx="0" fill="#111"/><path class="vase" d="${vaseD}" fill="#f0e6c8"/></svg></div>
        <div class="col grow" style="gap:28px">
          <div class="seg" id="rv"><button data-v="both" class="on">Look</button><button data-v="vase">A vase</button><button data-v="faces">Two faces</button></div>
          <p style="font-size:34px;line-height:1.4">The <b>sensory input does not change</b> — but attention and <b class="accent">figure-ground organisation</b> change the interpretation.</p>
          <p class="muted" style="font-size:30px">Perception <b style="color:var(--text)">actively organises</b> information. Context and expectations can make one interpretation more likely than another.</p>
          <div class="card" style="--accent:var(--pink);padding:26px 30px"><span class="num">AI connection</span><p style="color:var(--text);font-size:28px">A classifier may choose <b>one label</b>. A safer system can also report its <b>confidence</b> and <b>possible alternatives</b>.</p></div>
        </div>
      </div>`,
    src: 'Ch1 · Ambiguous perception: the Rubin vase',
    enter(c) {
      const bg = c.$('.rubin .bg'), vase = c.$('.rubin .vase');
      const set = v => {
        c.$$('#rv button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
        if (v === 'vase') { bg.setAttribute('fill', '#111'); vase.setAttribute('fill', 'var(--accent)'); }
        else if (v === 'faces') { bg.setAttribute('fill', 'var(--accent)'); vase.setAttribute('fill', '#111'); }
        else { bg.setAttribute('fill', '#111'); vase.setAttribute('fill', '#f0e6c8'); }
      };
      c.$$('#rv button').forEach(b => c.on(b, 'click', () => set(b.dataset.v)));
      set('both');
    },
  });

  // Comparison helper (human vs AI by area)
  function compare(title, eyebrow, rows, leftLabel, rightLabel, src, leftIcon, rightIcon) {
    return {
      title,
      html: `
        <div class="eyebrow">${eyebrow}</div>
        <h2>${title}</h2>
        <div class="area-chips mt-l" id="chips">${rows.map((r, i) => `<button class="btn sm ${i === 0 ? 'primary' : ''}" data-i="${i}">${r[0]}</button>`).join('')}</div>
        <div class="vs mt" style="flex:1">
          <div class="card"><div class="who">${I(leftIcon || 'user')}${leftLabel}</div><div class="txt" id="L"></div></div>
          <div class="card" style="--accent:var(--teal)"><div class="who">${I(rightIcon || 'cpu')}${rightLabel}</div><div class="txt" id="R"></div></div>
        </div>`,
      src,
      enter(c) {
        let cur = 0;
        const show = i => {
          cur = i;
          c.$$('#chips button').forEach(b => b.classList.toggle('primary', +b.dataset.i === i));
          ['#L', '#R'].forEach((s, k) => {
            const el = c.$(s); el.classList.add('swap');
            c.timeout(() => { el.textContent = rows[i][k + 1]; el.classList.remove('swap'); }, 220);
          });
        };
        c.$$('#chips button').forEach(b => c.on(b, 'click', () => show(+b.dataset.i)));
        c.data.show = show; c.data.n = rows.length; c.data.cur = () => cur;
        show(0);
      },
      key(c, e) { if (/^[1-9]$/.test(e.key) && +e.key <= c.data.n) c.data.show(+e.key - 1); },
    };
  }

  slides.push(compare('Human and AI perception', 'Compare', [
    ['Input', 'Biological senses', 'Cameras, microphones or other sensors'],
    ['Learning', 'Experience, physical interaction and social context', 'Training data, labels and feedback'],
    ['Strength', 'Flexible use of context in familiar daily situations', 'Fast and consistent work on a defined task'],
    ['Limitation', 'Limited attention, fatigue, bias and illusions', 'Data bias, errors outside training conditions and false confidence'],
    ['Output', 'Meaning connected with personal goals and experience', 'Predictions or actions defined by the system design'],
  ], 'Human perception', 'AI perception', 'Ch1 · Human and AI perception', 'eye', 'image'));

  // Attention spotlight
  const tgts = [['Lecturer', 180], ['Other students', 360], ['Notes', 540], ['Display', 720]];
  const atypes = {
    selective: { name: 'Selective attention', mean: 'Focus on one source and ignore distractions.', ex: 'Listen to the lecturer while other students speak.', on: [0] },
    sustained: { name: 'Sustained attention', mean: 'Maintain concentration for a period of time.', ex: 'Monitor a display for an unusual event.', on: [3] },
    divided: { name: 'Divided attention', mean: 'Try to manage more than one task.', ex: 'Take notes while listening to an explanation.', on: [0, 2] },
    executive: { name: 'Executive attention', mean: 'Control priorities and switch between tasks.', ex: 'Stop an automatic response and follow a new rule.', on: [1, 0] },
  };
  slides.push({
    title: 'Attention',
    html: `
      <div class="eyebrow">Definition</div>
      <h2>Attention</h2>
      <p class="lead">Directs <b>limited mental resources</b> towards information that matters for the <b>current goal</b>.</p>
      <div class="body" style="gap:60px;align-items:stretch">
        <div class="spot card" style="width:900px;padding:10px">
          <svg viewBox="0 0 900 520">
            <defs><linearGradient id="bm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".75"/><stop offset="1" stop-color="var(--accent)" stop-opacity=".06"/></linearGradient></defs>
            <g class="beam" id="b1"><polygon points="450,70 395,420 505,420" fill="url(#bm)"/></g>
            <g class="beam" id="b2" style="opacity:0"><polygon points="450,70 395,420 505,420" fill="url(#bm)"/></g>
            <circle cx="450" cy="62" r="34" fill="var(--accent)"/>
            <g transform="translate(432,44) scale(1.5)" color="#fff">${I("brain").replace('class="icon"', 'width="24" height="24"')}</g>
            ${tgts.map((t, i) => `<g class="tgt" data-i="${i}"><circle cx="${t[1]}" cy="430" r="44" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="3"/><text x="${t[1]}" y="508" text-anchor="middle" font-size="25" font-weight="600" fill="var(--muted)">${t[0]}</text></g>`).join('')}
            <rect id="sbar" x="610" y="360" width="0" height="8" rx="4" fill="var(--accent)" opacity="0"/>
          </svg>
        </div>
        <div class="col grow" style="gap:20px">
          <div class="seg" id="atype" style="flex-wrap:wrap">${Object.keys(atypes).map((k, i) => `<button data-k="${k}" class="${i ? '' : 'on'}">${k[0].toUpperCase() + k.slice(1)}</button>`).join('')}</div>
          <h3 id="aName" style="margin-top:12px"></h3>
          <p id="aMean" style="font-size:34px"></p>
          <p class="ex" id="aEx" style="font-size:30px;color:var(--accent)"></p>
        </div>
      </div>`,
    src: 'Ch1 · Attention',
    enter(c) {
      const b1 = c.$('#b1'), b2 = c.$('#b2'), bar = c.$('#sbar');
      const ang = i => Math.atan2(tgts[i][1] - 450, 360) * -180 / Math.PI + 'deg) scaleY(' + (Math.hypot(tgts[i][1] - 450, 360) / 350).toFixed(3);
      let swap = null, k = 'selective';
      const set = key => {
        k = key; const a = atypes[key];
        c.$$('#atype button').forEach(b => b.classList.toggle('on', b.dataset.k === key));
        c.$('#aName').textContent = a.name; c.$('#aMean').textContent = a.mean; c.$('#aEx').textContent = 'e.g. ' + a.ex;
        b1.style.transform = 'rotate(' + ang(a.on[0]) + ')';
        b2.style.opacity = key === 'divided' ? 1 : 0;
        if (key === 'divided') b2.style.transform = 'rotate(' + ang(a.on[1]) + ')';
        c.$$('.tgt').forEach((g, i) => {
          const lit = key === 'executive' ? i === a.on[0] : a.on.includes(i);
          g.querySelector('circle').setAttribute('fill', lit ? 'var(--accent)' : 'var(--surface-2)');
          g.querySelector('text').setAttribute('fill', lit ? 'var(--text)' : 'var(--muted)');
          g.style.opacity = lit ? 1 : .45;
        });
        bar.setAttribute('opacity', key === 'sustained' ? 1 : 0);
        if (swap) { swap(); swap = null; }
        if (key === 'executive') {
          let s = 0;
          const id = setInterval(() => {
            s = 1 - s; const i = a.on[s];
            b1.style.transform = 'rotate(' + ang(i) + ')';
            c.$$('.tgt').forEach((g, j) => { const lit = j === i; g.querySelector('circle').setAttribute('fill', lit ? 'var(--accent)' : 'var(--surface-2)'); g.style.opacity = lit ? 1 : .45; });
          }, 1500);
          swap = () => clearInterval(id);
        }
      };
      c.on(c.el, 'dummy', () => { });
      c.$$('#atype button').forEach(b => c.on(b, 'click', () => set(b.dataset.k)));
      c.loop(t => { if (k === 'sustained') bar.setAttribute('width', 260 * ((t % 4000) / 4000)); });
      c.timeout(() => { }, 0);
      set('selective');
      c.data.stopSwap = () => { if (swap) swap(); };
    },
    leave(c) { c.data.stopSwap && c.data.stopSwap(); },
  });

  // Timed activity helper
  function timed(title, eyebrow, secs, img, imgW, imgH, instructions, src, hideAfter) {
    return {
      title,
      html: `
        <div class="eyebrow">${eyebrow}</div>
        <h2>${title}</h2>
        <div class="body" style="align-items:center;gap:70px">
          <div class="photo" id="ph" style="width:${imgW}px;height:${imgH}px"><img src="${img}" alt=""><div class="veil">Image hidden — now write what you remember</div></div>
          <div class="col center-x grow" style="gap:30px">
            <div class="timer-ring"><svg viewBox="0 0 300 300"><circle cx="150" cy="150" r="136" fill="none" stroke="var(--line)" stroke-width="14"/><circle id="arc" cx="150" cy="150" r="136" fill="none" stroke="var(--accent)" stroke-width="14" stroke-linecap="round" stroke-dasharray="854.5" stroke-dashoffset="0"/></svg><div class="t" id="tt">${secs}</div></div>
            <button class="btn primary" id="go">Start ${secs}-second timer</button>
            <p class="muted" style="font-size:28px;text-align:center;max-width:620px">${instructions}</p>
          </div>
        </div>`,
      src,
      enter(c) {
        const arc = c.$('#arc'), tt = c.$('#tt'), ph = c.$('#ph'), btn = c.$('#go');
        ph.classList.remove('hidden'); tt.textContent = secs; arc.setAttribute('stroke-dashoffset', 0);
        let stop = null;
        c.on(btn, 'click', () => {
          if (stop) stop();
          ph.classList.remove('hidden'); btn.textContent = 'Restart';
          stop = c.loop(t => {
            const left = Math.max(0, secs - t / 1000);
            tt.textContent = Math.ceil(left);
            arc.setAttribute('stroke-dashoffset', 854.5 * (1 - left / secs));
            arc.setAttribute('stroke', left < 5 ? 'var(--red)' : 'var(--accent)');
            if (left <= 0) { stop(); stop = null; tt.textContent = '0'; if (hideAfter) ph.classList.add('hidden'); }
          });
        });
      },
    };
  }
  slides.push(timed('Attention under time pressure', 'Activity · 20 seconds', 20, 'assets/img/attention-objects.png', 760, 605,
    'Count how many different objects you can identify. <b style="color:var(--text)">Choose a search method before you begin.</b> Do not write until time is over — then record your count and explain how you searched.', 'Ch1 · Activity: attention under time pressure', false));

  // Memory and learning
  slides.push({
    title: 'Memory and learning',
    html: `
      <div class="eyebrow">Two partners</div>
      <h2>Memory and learning</h2>
      <div class="grid-2" style="margin-top:50px;flex:1">
        <div class="card" style="padding:40px">
          <h3 class="accent">Memory</h3>
          <p style="color:var(--text);margin-top:6px">Allows information to influence behaviour <b>after the original experience has ended</b>.</p>
          <div class="mem3 mt">
            <div class="st"><b>Encoding</b><span>into a usable form</span></div>${I('arrowR', 'ar')}
            <div class="st"><b>Storage</b><span>keeps it available</span></div>${I('arrowR', 'ar')}
            <div class="st"><b>Retrieval</b><span>brings it back</span></div>
          </div>
          <p class="ex mt">Recall can change: context and later information influence <b>reconstruction</b>.</p>
        </div>
        <div class="card" style="padding:40px;--accent:var(--teal)">
          <h3 class="accent">Learning</h3>
          <p style="color:var(--text);margin-top:6px">A <b>lasting change</b> in knowledge, skill or behaviour that develops <b>through experience</b>.</p>
          <div class="row mt" style="gap:14px;flex-wrap:wrap">${['Practice', 'Instruction', 'Feedback'].map(x => `<span class="pill">${x}</span>`).join('')}</div>
          <p class="ex mt">Depends on attention and <b>meaningful encoding</b> — information that receives little processing may be difficult to retrieve later.</p>
        </div>
      </div>
      <div class="callout mt" data-step="1">Memory provides stored knowledge <b>for</b> learning, while learning <b>changes</b> what memory contains and how it can be used.</div>`,
    src: 'Ch1 · Memory and learning',
    enter(c) {
      const st = c.$$('.mem3 .st'); let i = 0;
      c.interval(() => { st.forEach((s, j) => s.classList.toggle('lit', j === i)); i = (i + 1) % 3; }, 1100);
    },
  });

  slides.push(timed('Observation and recall', 'Activity · 30 seconds', 30, 'assets/img/park-scene.jpg', 820, 586,
    'Look carefully without taking notes. When the image disappears, write everything you remember. <b style="color:var(--text)">Separate what you directly observed from what you inferred</b>, then compare with a partner.', 'Ch1 · Activity: observation and recall', true));

  slides.push(compare('Human learning and machine learning', 'Compare', [
    ['Experience', 'Uses sensory, physical and social experience.', 'Uses datasets or records of interaction.'],
    ['Guidance', 'Uses instruction, imitation, feedback and reflection.', 'Uses labels, rewards, loss functions or programmed rules.'],
    ['Generalisation', 'Can use common sense and context in new daily situations.', 'Depends strongly on the training data and representation.'],
    ['Errors', 'May result from weak attention, memory limits or misunderstanding.', 'May result from biased data, an unsuitable objective or overfitting.'],
    ['Change', 'Knowledge and strategies develop over time.', 'Model parameters or stored rules change.'],
  ], 'Human learning', 'Machine learning', 'Ch1 · Human learning and machine learning', 'user', 'cpu'));

  // Human thinking & AI
  slides.push({
    title: 'Human thinking and AI',
    html: `
      <div class="eyebrow">Same results, different mechanisms</div>
      <h2>Human thinking and artificial intelligence</h2>
      <div class="grid-2" style="margin-top:56px;flex:1">
        <div class="card" style="padding:44px">
          <div class="who" style="font-size:24px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--muted);display:flex;gap:14px;align-items:center"><span style="width:40px;height:40px;color:var(--accent)">${I('user','ic')}</span>Human thinking</div>
          <div class="row mt" style="flex-wrap:wrap;gap:12px">${['Reasoning', 'Judgement', 'Decision-making', 'Planning', 'Problem-solving'].map(x => `<span class="pill">${x}</span>`).join('')}</div>
          <p class="mt" style="color:var(--text)">People use knowledge and logic, but these can also influence a decision:</p>
          <div class="row mt-s" style="flex-wrap:wrap;gap:12px">${['Emotion', 'Habits', 'Time pressure', 'Social context'].map(x => `<span class="pill neutral">${x}</span>`).join('')}</div>
        </div>
        <div class="card" style="padding:44px;--accent:var(--teal)">
          <div class="who" style="font-size:24px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--muted);display:flex;gap:14px;align-items:center"><span style="width:40px;height:40px;color:var(--accent)">${I('cpu','ic')}</span>An AI system can…</div>
          <div class="col mt" style="gap:14px">${['Represent information', 'Apply rules', 'Find patterns', 'Search possible actions', 'Generate an output'].map((x, i) => `<div class="row" data-step="${i + 1}" style="gap:16px;font-size:32px;font-weight:600"><span style="width:36px;height:36px;color:var(--accent);flex:none">${I('check','ic')}</span>${x}</div>`).join('')}</div>
          <p class="ex mt" data-step="6">→ intelligent task performance <b>without copying the full human mind</b>.</p>
        </div>
      </div>`,
    src: 'Ch1 · Human thinking and artificial intelligence',
  });

  slides.push(compare('Human and AI thinking', 'Compare', [
    ['Goals', 'Goals may come from personal needs, emotion or social expectations.', 'Designers, users, rules or reward signals specify the goal.'],
    ['Knowledge', 'Knowledge grows from lived experience and culture.', 'Knowledge comes from data, programmed structures and connected tools.'],
    ['Speed', 'Calculation and attention have biological limits.', 'Suitable hardware can process large amounts of data quickly.'],
    ['Adaptation', 'People often adapt to familiar changes using context and common sense.', 'Performance may fall when the situation differs from expected conditions.'],
    ['Responsibility', 'A person can explain a choice and may be accountable for it.', 'People and institutions remain responsible for design and use.'],
  ], 'Human thinking', 'AI system', 'Ch1 · Human and AI thinking', 'user', 'robot'));

  // Problem-solving: route graph with Dijkstra
  const N = { H: [90, 300, 'Home'], A: [330, 110, 'A'], B: [330, 470, 'B'], C: [600, 300, 'C'], D: [860, 110, 'D'], U: [1000, 330, 'Campus'] };
  const E = [['H', 'A', 4], ['H', 'B', 3], ['A', 'C', 3], ['B', 'C', 3], ['A', 'D', 6], ['C', 'D', 3], ['C', 'U', 4], ['D', 'U', 2], ['B', 'U', 9]];
  function dijkstra(costs) {
    const dist = {}, prev = {}, Q = new Set(Object.keys(N));
    Object.keys(N).forEach(k => dist[k] = Infinity); dist.H = 0;
    while (Q.size) {
      let u = null; Q.forEach(k => { if (u === null || dist[k] < dist[u]) u = k; }); Q.delete(u);
      E.forEach((e, i) => {
        const w = costs[i];
        if (e[0] === u && Q.has(e[1]) && dist[u] + w < dist[e[1]]) { dist[e[1]] = dist[u] + w; prev[e[1]] = [u, i]; }
        if (e[1] === u && Q.has(e[0]) && dist[u] + w < dist[e[0]]) { dist[e[0]] = dist[u] + w; prev[e[0]] = [u, i]; }
      });
    }
    const path = []; let k = 'U'; while (prev[k]) { path.push(prev[k][1]); k = prev[k][0]; }
    return { edges: path, total: dist.U };
  }
  const psSteps = [
    ['Define the problem', 'Reach the destination while considering time, distance and safety.'],
    ['Represent the situation', 'Show locations as points and roads as connections with costs.'],
    ['Generate and evaluate', 'Compare possible paths. A person may use a familiar shortcut. An AI system may use a search algorithm.'],
    ['Act and monitor', 'Follow the selected route and update the plan when traffic changes.'],
  ];
  slides.push({
    title: 'Problem-solving', steps: 4,
    html: `
      <div class="eyebrow">Definition</div>
      <h2>Problem-solving</h2>
      <p class="lead" style="max-width:1680px">Moving from a <b>current situation</b> to a <b>desired goal</b> when the solution is not immediately known.</p>
      <div class="body" style="gap:50px;margin-top:36px">
        <div class="col ps-steps" style="width:600px;gap:16px">
          ${psSteps.map((s, i) => `<div class="card" data-step="${i + 1}"><h3><span class="accent">${i + 1}</span>&nbsp; ${s[0]}</h3><p>${s[1]}</p></div>`).join('')}
        </div>
        <div class="col grow" style="gap:18px">
          <div class="graph card" style="flex:1;padding:24px">
            <svg viewBox="0 0 1090 560">
              <g id="edges">${E.map((e, i) => { const a = N[e[0]], b = N[e[1]]; return `<line class="edge" data-i="${i}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`; }).join('')}</g>
              <g id="costs">${E.map((e, i) => { const a = N[e[0]], b = N[e[1]]; return `<text class="cost" data-i="${i}" x="${(a[0] + b[0]) / 2 + 12}" y="${(a[1] + b[1]) / 2 - 12}">${e[2]}</text>`; }).join('')}</g>
              ${Object.entries(N).map(([k, n]) => `<g class="nd ${k === 'U' ? 'end' : ''}"><circle cx="${n[0]}" cy="${n[1]}" r="${k === 'H' || k === 'U' ? 34 : 24}"/><text x="${n[0]}" y="${n[1] + (k === 'H' || k === 'U' ? 66 : 54)}" text-anchor="middle">${n[2]}</text></g>`).join('')}
              <circle id="car" r="16" fill="var(--yellow)" style="filter:drop-shadow(0 0 12px var(--yellow))" opacity="0"/>
            </svg>
          </div>
          <div class="row" style="justify-content:space-between">
            <div class="pill" id="total">Best route: —</div>
            <button class="btn" id="traffic">${I('car', 'icon').replace('class="icon"', 'style="width:26px;height:26px"')} Traffic on C → Campus</button>
          </div>
        </div>
      </div>`,
    src: 'Ch1 · Problem-solving (costs are illustrative minutes)',
    enter(c) {
      const base = E.map(e => e[2]);
      c.data.costs = base.slice(); c.data.jam = false;
      const render = (n) => {
        const showPath = n >= 3;
        const r = dijkstra(c.data.costs);
        c.$$('.edge').forEach((l, i) => { l.classList.toggle('best', showPath && r.edges.includes(i)); l.classList.toggle('jam', c.data.jam && i === 6); });
        c.$$('.cost').forEach((t, i) => { t.textContent = c.data.costs[i]; t.classList.toggle('jam', c.data.jam && i === 6); t.style.opacity = n >= 2 ? 1 : 0; });
        c.$('#total').textContent = showPath ? 'Best route: ' + r.total + ' min' : n >= 2 ? 'Roads weighted by cost' : 'Goal: reach Campus';
        c.data.path = r.edges;
      };
      c.data.render = render;
      c.on(c.$('#traffic'), 'click', () => {
        c.data.jam = !c.data.jam; c.data.costs[6] = c.data.jam ? 12 : base[6];
        if (Deck.slides) render(Math.max(4, c.data.n || 4));
      });
      // moving car along the current best path
      const car = c.$('#car');
      c.loop(t => {
        if ((c.data.n || 0) < 4 || !c.data.path || !c.data.path.length) { car.setAttribute('opacity', 0); return; }
        // build ordered node list from H
        const order = ['H']; let guard = 0;
        while (order[order.length - 1] !== 'U' && guard++ < 10) {
          const last = order[order.length - 1];
          const ei = c.data.path.find(i => (E[i][0] === last && !order.includes(E[i][1])) || (E[i][1] === last && !order.includes(E[i][0])));
          if (ei == null) break; order.push(E[ei][0] === last ? E[ei][1] : E[ei][0]);
        }
        const segs = order.length - 1; if (segs < 1) return; const k = ((t / 1000) % (segs * 1.1)) / 1.1, si = Math.min(segs - 1, Math.floor(k)), f = k - si;
        const a = N[order[si]], b = N[order[si + 1]];
        car.setAttribute('opacity', 1);
        car.setAttribute('cx', a[0] + (b[0] - a[0]) * f); car.setAttribute('cy', a[1] + (b[1] - a[1]) * f);
      });
    },
    step(c, n) {
      c.data.n = n;
      c.$$('.ps-steps .card').forEach((k, i) => k.classList.toggle('cur', i === n - 1));
      c.data.render && c.data.render(n);
    },
  });

  // Historical AI timeline
  const eras = [
    ['1950s', 'Turing’s question, Dartmouth proposal and Logic Theorist', 'AI became a research field. Early programs used symbols and rules to solve problems.'],
    ['1960s–70s', 'ELIZA and early expert systems', 'Rule-based dialogue and specialised knowledge, but understanding remained limited.'],
    ['1980s–90s', 'Expert systems and Deep Blue', 'Search, rules and faster computers produced strong performance in narrow tasks.'],
    ['2000s–10s', 'Data-driven learning, deep learning and AlphaGo', 'Large datasets and improved computing supported perception, prediction and game playing.'],
    ['2020s', 'Foundation and generative models', 'General models work across language, vision and other tasks; reliability and responsible use remain important.'],
  ];
  const eraCol = ['var(--blue)', 'var(--purple)', 'var(--pink)', 'var(--orange)', 'var(--green)'];
  slides.push({
    title: 'Historical AI systems', steps: 5,
    html: `
      <div class="eyebrow">History</div>
      <h2>From symbols to <span class="grad-2">data-driven learning</span></h2>
      <div class="tline">
        <div class="rail"><i id="rail"></i></div>
        <div class="eras">${eras.map((e, i) => `<div class="era" data-step="${i + 1}" style="--accent:${eraCol[i]}"><div class="dot"></div><div class="yr">${e[0]}</div><div class="ex">${e[1]}</div><p>${e[2]}</p></div>`).join('')}</div>
      </div>
      <div class="callout mt-l" data-step="5" style="--accent:var(--green)">A gradual movement from mainly <b>symbolic programs</b> towards <b>data-driven learning</b> and general-purpose models. Modern systems often <b>combine</b> more than one approach.</div>`,
    src: 'Ch1 · Historical AI systems',
    step(c, n) { c.$('#rail').style.transform = 'scaleX(' + (n / 5) + ')'; },
  });

  // Summary
  slides.push({
    title: 'Chapter 1 summary',
    html: `
      <div class="eyebrow">Chapter 1 · Summary</div>
      <h2>Three things to remember</h2>
      <div class="grid-3" style="margin-top:60px;flex:1">
        ${[['brain', 'Cognition', 'The mental processes used to receive, understand, store and use information. Perception organises input; attention selects what matters; memory keeps it; learning changes it.'],
        ['scale', 'Human vs AI', 'AI performs related functions through programmed rules, search algorithms and learned patterns. Similar results can come from different mechanisms — compare inputs, knowledge, strengths and limitations.'],
        ['clock', 'History', 'A gradual movement from symbolic programs towards data-driven learning and general-purpose models. Modern systems often combine approaches.']]
        .map((x, i) => `<div class="card" data-step="${i + 1}" style="padding:44px"><div style="width:72px;height:72px;color:var(--accent);margin-bottom:22px">${I(x[0],'ic')}</div><h3>${x[1]}</h3><p style="margin-top:12px;font-size:29px">${x[2]}</p></div>`).join('')}
      </div>`,
    src: 'Ch1 · Chapter 1 summary',
  });

  // Lab 1 live simulator — selective attention by rules
  const stimuli = [
    ['Lecturer instruction', 'studying'], ['Phone notification', 'emergency'], ['Traffic noise', 'driving'],
    ['Friend speaking', null], ['Fire alarm', 'urgent'], ['Music from a nearby room', null],
  ];
  slides.push({
    title: 'Lab 1: mapping everyday attention',
    html: `
      <div class="eyebrow">Lab 1 · Live demo <span class="pill neutral">Python logic, simulated</span></div>
      <h2>Mapping everyday attention</h2>
      <p class="lead">Many stimuli arrive at once. The program attends to <b>urgent</b> stimuli first, then those that support the <b>current goal</b>, and ignores the rest. Pick a goal:</p>
      <div class="seg mt" id="goal"><button data-g="studying" class="on">Studying</button><button data-g="driving">Driving</button><button data-g="emergency">Waiting for an emergency message</button></div>
      <div class="grid-2 mt" style="flex:1">
        <div class="card" style="--accent:var(--green)"><span class="num">Attended <span id="na"></span></span><div id="att" class="col" style="gap:12px"></div></div>
        <div class="card" style="--accent:var(--faint)"><span class="num">Ignored <span id="ni"></span></span><div id="ign" class="col" style="gap:12px"></div></div>
      </div>
      <p class="small muted mt">Same stimulus, different goal, different attention: when the goal changes to driving, traffic noise becomes relevant.</p>`,
    src: 'Ch1 · Lab 1: Mapping everyday attention (goal–stimulus links are the demo’s rules)',
    enter(c) {
      const label = { studying: 'studying', driving: 'driving', emergency: 'waiting for an emergency message' };
      const run = g => {
        c.$$('#goal button').forEach(b => b.classList.toggle('on', b.dataset.g === g));
        const att = [], ign = [];
        stimuli.forEach(([s, tag]) => {
          if (tag === 'urgent') att.push([s, 'it is urgent']);
          else if (tag === g) att.push([s, 'it supports ' + label[g]]);
          else ign.push([s, 'it does not support the selected goal']);
        });
        const row = (x, i) => `<div style="font-size:30px;font-weight:600;animation:rise .6s var(--ease) both;animation-delay:${i * .08}s">${x[0]} <span style="font-size:24px;font-weight:450;color:var(--muted)">— because ${x[1]}</span></div>`;
        c.$('#att').innerHTML = att.map(row).join(''); c.$('#ign').innerHTML = ign.map(row).join('');
        c.$('#na').textContent = '· ' + att.length; c.$('#ni').textContent = '· ' + ign.length;
      };
      c.$$('#goal button').forEach(b => c.on(b, 'click', () => run(b.dataset.g)));
      run('studying');
    },
  });

  // Quick checks (from the chapter's own review questions)
  const qcs = [
    ['Which process selects information that is relevant to a current goal?', ['Storage', 'Attention', 'Sensation', 'Action'], 1, '<b>Attention</b> selects information for further processing.'],
    ['Which example mainly shows <span class="accent">top-down</span> processing?', ['A sudden flash attracts attention.', 'A familiar sentence helps identify a blurred word.', 'Light reaches the retina.', 'A loud alarm starts unexpectedly.'], 1, '<b>Top-down</b> uses context and knowledge — the sentence helps complete the word.'],
    ['Which statement best describes machine learning?', ['It always copies the human brain.', 'It changes from data or feedback.', 'It has unlimited common sense.', 'It never makes biased predictions.'], 1, 'Machine learning <b>changes from data or feedback</b>; it can still make biased predictions.'],
    ['Which early AI approach represented knowledge mainly through symbols and rules?', ['Symbolic AI', 'Computer vision', 'Deep learning', 'Robotics'], 0, 'Early programs used <b>symbols and rules</b> to solve problems.'],
  ];
  qcs.forEach((q, i) => slides.push({
    title: 'Quick check ' + (i + 1),
    html: `<div class="eyebrow">Quick check · ${i + 1} of ${qcs.length} <span class="pill neutral">Tap an answer</span></div><div class="qc-wrap">${Deck.qc(q[0], q[1], q[2], q[3])}</div>`,
    src: 'Ch1 · Review questions: multiple choice',
  }));

  const tfs = [
    ['Perception creates a complete and exact copy of the environment.', false, 'Attention selects only part of the information.'],
    ['Bottom-up processing begins with features in the stimulus.', true, ''],
    ['Human learning and machine learning use identical mechanisms.', false, 'Similar results, different mechanisms.'],
    ['Problem-solving requires a goal and a way to represent the situation.', true, ''],
    ['Historical AI used only one approach.', false, 'Symbolic → data-driven; modern systems combine approaches.'],
  ];
  slides.push({
    title: 'True or false',
    html: `
      <div class="eyebrow">Quick check · True or false <span class="pill neutral">Tap each statement</span></div>
      <h2>True or false?</h2>
      <div class="tf-list mt-l">${tfs.map(t => `<div class="tf ${t[1] ? 't' : 'f'}"><p>${t[0]}</p><div class="ans">${t[1] ? 'True' : 'False'}${t[2] ? `<div style="font-size:20px;font-weight:500;color:var(--muted);margin-top:4px">${t[2]}</div>` : ''}</div></div>`).join('')}</div>`,
    src: 'Ch1 · Review questions: true or false',
    enter(c) { c.$$('.tf').forEach(t => { t.classList.remove('show'); c.on(t, 'click', () => t.classList.add('show')); }); },
  });

  Deck.chapter({ id: 'ch1', label: 'Chapter 1', title: 'Introduction to Cognition and AI', slides });
})();
