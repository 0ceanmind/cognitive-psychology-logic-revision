/* Opening sequence */
(function () {
  const I = Deck.icon;

  // neural-network particle field, shared by title + closing slides
  function neural(c, canvas, opts) {
    opts = opts || {};
    const g = canvas.getContext('2d');
    const W = canvas.width = 1920, H = canvas.height = 1080;
    const N = opts.n || 90;
    const pts = Array.from({ length: N }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: 1.2 + Math.random() * 2.2 }));
    const cols = ['#2997ff', '#bf5af2', '#30d158', '#ff9f0a'];
    const signals = [];
    c.loop(t => {
      const light = document.documentElement.dataset.theme === 'light';
      g.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy;
        if (d < 30000) {
          g.strokeStyle = light ? 'rgba(0,0,0,' + (0.10 * (1 - d / 30000)) + ')' : 'rgba(255,255,255,' + (0.13 * (1 - d / 30000)) + ')';
          g.lineWidth = 1; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke();
          if (Math.random() < 0.0009 && signals.length < 40) signals.push({ a, b, k: 0, c: cols[(Math.random() * 4) | 0] });
        }
      }
      for (const p of pts) { g.fillStyle = light ? 'rgba(0,0,0,.35)' : 'rgba(255,255,255,.55)'; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 7); g.fill(); }
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i]; s.k += 0.02;
        if (s.k >= 1) { signals.splice(i, 1); continue; }
        const x = s.a.x + (s.b.x - s.a.x) * s.k, y = s.a.y + (s.b.y - s.a.y) * s.k;
        g.shadowColor = s.c; g.shadowBlur = 18; g.fillStyle = s.c; g.beginPath(); g.arc(x, y, 3.4, 0, 7); g.fill(); g.shadowBlur = 0;
      }
    });
  }
  Deck.neural = neural;

  Deck.chapter({
    id: 'intro', label: 'Welcome', title: 'Cognitive Psychology and Logic',
    slides: [
      {
        title: 'Title', cls: 'center',
        html: `
          <canvas class="neural" style="position:absolute;inset:0;width:1920px;height:1080px;z-index:0"></canvas>
          <div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center">
            <div class="eyebrow rise" style="justify-content:center">ATM00201 · Semester A 2026–27</div>
            <h1 class="rise d1" style="font-size:150px;line-height:.98">Cognitive Psychology<br><span class="grad-2">and Logic</span></h1>
            <p class="lead rise d2" style="text-align:center;margin-top:40px;max-width:1300px">How humans <b>think, learn, remember, decide</b> and <b>solve problems</b> — and how artificial intelligence compares.</p>
            <div class="row rise d3" style="margin-top:56px;gap:18px">
              <span class="pill" style="--accent:var(--blue)">Ch 1 · Cognition &amp; AI</span>
              <span class="pill" style="--accent:var(--purple)">Ch 2 · Intelligence</span>
              <span class="pill" style="--accent:var(--green)">Ch 3 · Cognitive Psychology</span>
              <span class="pill" style="--accent:var(--orange)">Ch 4 · Memory</span>
            </div>
            <p class="rise d4" style="margin-top:56px;font-size:30px;color:var(--muted)">Developed by <b style="color:var(--text);font-weight:650">Faisal Albusaidi</b></p>
            <p class="small faint rise d4" style="margin-top:14px">Interactive revision · press <b class="accent">→</b> to begin · <b class="accent">M</b> for contents</p>
          </div>`,
        enter(c) { neural(c, c.$('canvas.neural')); },
      },
      {
        title: 'The big idea', cls: 'center',
        html: `
          <div class="eyebrow" style="justify-content:center">The module in one sentence</div>
          <p class="quote-big rise d1" style="text-align:center">The study of how the human brain <em>processes</em>, <em>structures</em> and <em>applies</em> formal rules and models — to develop AI models and tools that solve problems and make decisions.</p>
          <div class="grid-5 mt-l" style="width:1600px">
            ${[['eye', 'How the mind processes information'], ['book', 'How knowledge and experience influence decisions'], ['scale', 'How logical reasoning helps solve problems'], ['zap', 'Why people make biased or incorrect decisions'], ['robot', 'How human thinking can inspire AI']].map((x, i) => `<div class="card" data-step="${i + 1}" style="text-align:left;padding:28px">${I(x[0], 'icon')}<p style="font-size:25px;color:var(--text);line-height:1.3">${x[1]}</p></div>`).join('')}
          </div>`,
        src: 'Ch1 · Cognitive Psychology and Logic',
      },
      {
        title: 'Roadmap',
        html: `
          <div class="eyebrow">Roadmap</div>
          <h2>Four chapters. One question: <span class="grad-2">how do we think?</span></h2>
          <div class="grid-4 stagger" style="margin-top:64px;flex:1">
            ${[
            ['01', 'var(--blue)', 'Cognition and AI', 'How humans and computers process information.', ['Perception', 'Attention', 'Memory & learning', 'Problem-solving', 'History of AI']],
            ['02', 'var(--purple)', 'Human Intelligence', 'Forms of intelligence and four approaches to AI.', ['Gardner’s 8 intelligences', 'Emotional & social', 'Turing test', 'Rational agent']],
            ['03', 'var(--green)', 'Cognitive Psychology', 'The processes, the brain and computer models.', ['Language', 'Memory techniques', 'Decision-making', 'Neuroscience']],
            ['04', 'var(--orange)', 'Memory', 'How memory is built, kept — and lost.', ['Multi-store model', 'Working memory', 'Levels of processing', 'Forgetting']],
          ].map((c, i) => `
              <div class="card clickable" data-jump="${i}" style="--accent:${c[1]};display:flex;flex-direction:column;padding:40px">
                <div style="font-size:110px;font-weight:800;letter-spacing:-.05em;color:var(--accent);line-height:1">${c[0]}</div>
                <h3 style="margin-top:26px">${c[2]}</h3>
                <p style="margin-top:10px">${c[3]}</p>
                <div style="margin-top:auto;display:flex;flex-wrap:wrap;gap:10px;padding-top:28px">${c[4].map(t => `<span class="pill" style="font-size:19px">${t}</span>`).join('')}</div>
              </div>`).join('')}
          </div>`,
        enter(c) {
          c.$$('[data-jump]').forEach(card => c.on(card, 'click', () => {
            const id = 'ch' + (+card.dataset.jump + 1);
            const s = Deck.slides.find(x => x.chapter.id === id);
            if (s) Deck.go(s.index, 0);
          }));
        },
      },
      {
        title: 'Learning outcomes',
        html: `
          <div class="eyebrow">Course learning outcomes</div>
          <h2>By the end, you should be able to…</h2>
          <div class="col" style="margin-top:64px;gap:28px">
            ${[['Analyse', 'human psychology and thinking processes and patterns.', 'brain'], ['Describe', 'human intelligence from a computational point of view.', 'cpu'], ['Compare', 'human and computer thinking and acting models.', 'scale']].map((x, i) => `
              <div class="card" data-step="${i + 1}" style="display:flex;align-items:center;gap:40px;padding:36px 44px">
                <div style="font-size:30px;font-weight:700;color:var(--faint);width:90px">CLO ${i + 1}</div>
                <div style="width:84px;height:84px;color:var(--accent)">${I(x[2], 'icon')}</div>
                <p style="font-size:44px;font-weight:500;letter-spacing:-.01em"><b class="accent">${x[0]}</b> ${x[1]}</p>
              </div>`).join('')}
          </div>`,
        src: 'Ch1 · Course learning outcomes',
      },
    ]
  });
})();
