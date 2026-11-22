/* =========================================================
   Deck engine — fixed 1920×1080 stage, progressive steps,
   per-slide lifecycle (enter / step / leave) with auto-cleanup.
   ========================================================= */
(function () {
  "use strict";

  const chapters = [];
  const slides = [];      // flattened {chapter, def, el, steps}
  let cur = -1, step = 0, ctx = null;

  /* ---------------- Icons (24×24 stroke) ---------------- */
  const P = {
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    ear: '<path d="M6 9a6 6 0 1 1 12 0c0 3-2 4.5-3 5.5s-1 2.5-1 3.5a3 3 0 0 1-6 0"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-1.5 3"/>',
    brain: '<path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 4 3.5V3.5A3 3 0 0 0 9 3z"/><path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-4 3.5V3.5A3 3 0 0 1 15 3z"/>',
    db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5"/>',
    bulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H17a3.5 3.5 0 0 0 0-7H7a3.5 3.5 0 0 1 0-7h8.5"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    scale: '<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7zM19 7l-3 7a3.5 3.5 0 0 0 6 0l-3-7z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/>',
    users: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M16 3.1a4 4 0 0 1 0 7.8M22 21v-2a4 4 0 0 0-3-3.9"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
    run: '<circle cx="14" cy="4" r="2"/><path d="M7 21l3-5 3 2v5M6 12l3-4 4 1 3 4h3M10 16l-1-5"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    sigma: '<path d="M18 7V4H6l6 8-6 8h12v-3"/>',
    cube: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>',
    flag: '<path d="M4 22V4M4 4h12l-2 4 2 4H4"/>',
    robot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 14h.01M15 14h.01M2 13v3M22 13v3"/><circle cx="12" cy="3" r="1"/>',
    car: '<path d="M5 17h14M3 17v-4l2-5a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5v4"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    puzzle: '<path d="M19.4 14.6A2.5 2.5 0 1 0 19.4 10H21V5a1 1 0 0 0-1-1h-5V2.6A2.5 2.5 0 1 0 10.4 2.6V4H5a1 1 0 0 0-1 1v5h1.6a2.5 2.5 0 1 1 0 4.6H4V20a1 1 0 0 0 1 1h5v-1.6a2.5 2.5 0 1 1 4.6 0V21H20a1 1 0 0 0 1-1v-5.4z"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 19A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
    layers: '<path d="M12 2l10 5-10 5L2 7l10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
    hourglass: '<path d="M6 2h12M6 22h12M7 2c0 5 10 5 10 10S7 17 7 22M17 2c0 5-10 5-10 10s10 5 10 10"/>',
    ban: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    sparkle: '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/>',
    cpu: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>',
    zap: '<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    bike: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h2l3 11.5M5.5 17.5L9 9h7l-4 8.5M9 6h3"/>',
    stetho: '<path d="M5 3v6a5 5 0 0 0 10 0V3"/><path d="M10 14v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/>',
    medkit: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 11v6M9 14h6"/>',
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
    present: '<rect x="2" y="3" width="20" height="13" rx="2"/><path d="M12 16v5M8 21h8"/>',
  };
  function icon(name, cls) {
    return '<svg class="' + (cls || 'icon') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || P.sparkle) + '</svg>';
  }

  /* ---------------- Quick check (live MCQ) ---------------- */
  function qc(question, options, answer, why) {
    const keys = ['A', 'B', 'C', 'D'];
    return '<div class="qc" data-answer="' + answer + '">' +
      '<div class="qc-q">' + question + '</div>' +
      '<div class="qc-opts">' + options.map((o, i) => '<button class="qc-opt" data-i="' + i + '"><span class="k">' + keys[i] + '</span><span>' + o + '</span></button>').join('') + '</div>' +
      '<div class="qc-why">' + (why || '') + '</div></div>';
  }
  function wireQC(root) {
    root.addEventListener('click', e => {
      const b = e.target.closest('.qc-opt'); if (!b) return;
      const box = b.closest('.qc'); if (box.dataset.done) return;
      const ans = +box.dataset.answer, i = +b.dataset.i;
      if (i === ans) {
        box.dataset.done = 1;
        box.querySelectorAll('.qc-opt').forEach((o, j) => o.classList.add(j === ans ? 'right' : 'fade'));
        box.querySelector('.qc-why').classList.add('show');
      } else {
        b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong');
      }
    });
  }
  function resetQC(el) {
    el.querySelectorAll('.qc').forEach(box => {
      delete box.dataset.done;
      box.querySelectorAll('.qc-opt').forEach(o => o.classList.remove('right', 'wrong', 'fade'));
      box.querySelector('.qc-why').classList.remove('show');
    });
  }

  /* ---------------- Registration ---------------- */
  function chapter(def) { chapters.push(def); }

  /* ---------------- Context (auto-cleaned) ---------------- */
  function makeCtx(s) {
    const el = s.el, disposers = [];
    const c = {
      el, data: {},
      $: q => el.querySelector(q),
      $$: q => Array.from(el.querySelectorAll(q)),
      timeout(fn, ms) { const id = setTimeout(fn, ms); disposers.push(() => clearTimeout(id)); return id; },
      interval(fn, ms) { const id = setInterval(fn, ms); disposers.push(() => clearInterval(id)); return id; },
      loop(fn) {
        let id, t0 = performance.now(), alive = true;
        const tick = now => { if (!alive) return; fn(now - t0); id = requestAnimationFrame(tick); };
        id = requestAnimationFrame(tick);
        const stop = () => { alive = false; cancelAnimationFrame(id); };
        disposers.push(stop); return stop;
      },
      on(target, type, fn, opts) { target.addEventListener(type, fn, opts); disposers.push(() => target.removeEventListener(type, fn, opts)); },
      wait(ms) { return new Promise(r => c.timeout(r, ms)); },
      dispose() { disposers.splice(0).forEach(d => { try { d(); } catch (e) { console.error(e); } }); c.disposed = true; },
    };
    return c;
  }

  /* ---------------- Build ---------------- */
  function build() {
    const stage = document.getElementById('stage');
    const only = new URLSearchParams(location.search).get('ch'); // preview a single chapter: ?ch=ch2
    chapters.filter(ch => !only || ch.id === only).forEach(ch => {
      ch.slides.forEach((def, i) => {
        const el = document.createElement('section');
        el.className = 'slide chapter-' + ch.id + (def.cls ? ' ' + def.cls : '');
        el.innerHTML = def.html;
        if (def.src) { const s = document.createElement('div'); s.className = 'src'; s.textContent = def.src; el.appendChild(s); }
        el.setAttribute('aria-label', def.title || ch.title);
        stage.appendChild(el);
        let steps = def.steps;
        if (steps == null) {
          steps = 0;
          el.querySelectorAll('[data-step]').forEach(n => { steps = Math.max(steps, +n.dataset.step || 0); });
        }
        slides.push({ chapter: ch, def, el, steps, index: slides.length, inChapter: i });
      });
    });
    wireQC(stage);
    buildMenu();
  }

  /* ---------------- Navigation ---------------- */
  function applyStep(s, n) {
    s.el.querySelectorAll('[data-step]').forEach(x => x.classList.toggle('in', (+x.dataset.step || 0) <= n));
    if (s.def.step && ctx) { try { s.def.step(ctx, n); } catch (e) { console.error(e); } }
  }

  function go(index, toStep, fromBack) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    if (index === cur) { setStep(toStep == null ? step : toStep); return; }
    const prev = slides[cur];
    if (prev) {
      if (ctx) ctx.dispose();
      if (prev.def.leave) try { prev.def.leave(prev.ctxRef); } catch (e) { console.error(e); }
      prev.el.classList.remove('active');
      prev.el.classList.toggle('past', index > cur);
    }
    cur = index;
    const s = slides[cur];
    s.el.classList.remove('past');
    resetQC(s.el);
    step = toStep === 'end' ? s.steps : (toStep || 0);
    ctx = makeCtx(s); s.ctxRef = ctx;
    // force reflow so stagger animations restart
    void s.el.offsetWidth;
    s.el.classList.add('active');
    if (s.def.enter) { try { s.def.enter(ctx); } catch (e) { console.error(e); } }
    applyStep(s, step);
    updateHud();
    history.replaceState(null, '', '#' + (cur + 1));
  }
  function setStep(n) {
    const s = slides[cur];
    step = Math.max(0, Math.min(s.steps, n));
    applyStep(s, step); updateHud();
  }
  function next() {
    const s = slides[cur];
    if (step < s.steps) setStep(step + 1);
    else if (cur < slides.length - 1) go(cur + 1, 0);
  }
  function prev() {
    if (step > 0) setStep(step - 1);
    else if (cur > 0) go(cur - 1, 'end', true);
  }

  /* ---------------- Scale ---------------- */
  function fit() {
    const st = document.getElementById('stage');
    const w = window.innerWidth, h = window.innerHeight;
    const k = Math.min(w / 1920, h / 1080);
    st.style.position = 'absolute';
    st.style.transformOrigin = '0 0';
    st.style.transform = 'scale(' + k + ')';
    st.style.left = ((w - 1920 * k) / 2) + 'px';
    st.style.top = ((h - 1080 * k) / 2) + 'px';
    Deck.scale = k;
  }

  /* ---------------- HUD & menu ---------------- */
  function updateHud() {
    const s = slides[cur];
    const total = slides.length;
    const frac = (cur + (s.steps ? step / (s.steps + 1) : 0)) / (total - 1 || 1);
    const accentVar = { ch1: '--blue', ch2: '--purple', ch3: '--green', ch4: '--orange' }[s.chapter.id] || '--blue';
    document.documentElement.style.setProperty('--hud-accent', 'var(' + accentVar + ')');
    document.getElementById('progress').style.width = (frac * 100) + '%';
    document.getElementById('hud-count').textContent = (cur + 1) + ' / ' + total;
    document.getElementById('hud-chap').textContent = s.chapter.label;
    document.querySelectorAll('#menu li button').forEach(b => b.classList.toggle('cur', +b.dataset.i === cur));
  }
  function buildMenu() {
    const m = document.getElementById('menu');
    const accents = { ch1: 'var(--blue)', ch2: 'var(--purple)', ch3: 'var(--green)', ch4: 'var(--orange)' };
    let html = '<div class="m-head"><h3>Contents</h3><div style="display:flex;gap:10px"><a class="btn sm" href="exam.html" style="text-decoration:none">Mock exam</a><button class="btn sm" data-close>Close</button></div></div><div class="m-chaps">';
    chapters.filter(ch => slides.some(s => s.chapter === ch)).forEach(ch => {
      html += '<div class="m-chap"><h4 style="color:' + (accents[ch.id] || 'var(--blue)') + '">' + ch.label + '</h4><p class="m-title">' + ch.title + '</p><ol>';
      slides.filter(s => s.chapter === ch).forEach(s => { html += '<li><button data-i="' + s.index + '">' + (s.def.title || '—') + '</button></li>'; });
      html += '</ol></div>';
    });
    html += '</div><div class="keys"><span><kbd>→</kbd> <kbd>Space</kbd> <kbd>PgDn</kbd> next</span><span><kbd>←</kbd> <kbd>PgUp</kbd> back</span><span><kbd>F</kbd> fullscreen</span><span><kbd>M</kbd> contents</span><span><kbd>L</kbd> light / dark</span><span><kbd>B</kbd> blackout</span><span><kbd>E</kbd> mock exam</span><span><kbd>Home</kbd>/<kbd>End</kbd> first / last</span></div>';
    m.innerHTML = html;
    m.addEventListener('click', e => {
      const b = e.target.closest('button[data-i]');
      if (b) { toggleMenu(false); go(+b.dataset.i, 0); return; }
      if (e.target.closest('[data-close]') || e.target === m) toggleMenu(false);
    });
  }
  function toggleMenu(force) {
    const m = document.getElementById('menu');
    const open = force == null ? !m.classList.contains('open') : force;
    m.classList.toggle('open', open);
    if (open) { const c = m.querySelector('button.cur'); if (c) c.scrollIntoView({ block: 'center' }); }
  }
  function toggleTheme() {
    const r = document.documentElement;
    const t = r.dataset.theme === 'light' ? 'dark' : 'light';
    r.dataset.theme = t;
    try { localStorage.setItem('cpl-theme', t); } catch (e) { }
    // let slides redraw theme-dependent canvases
    if (ctx && slides[cur].def.theme) slides[cur].def.theme(ctx);
  }
  function fullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    else document.exitFullscreen && document.exitFullscreen();
  }

  /* ---------------- Input ---------------- */
  function isTyping(e) { const t = e.target; return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable); }
  function onKey(e) {
    if (isTyping(e)) { if (e.key === 'Escape') e.target.blur(); return; }
    const menuOpen = document.getElementById('menu').classList.contains('open');
    const k = e.key;
    if (k === 'Escape') { if (menuOpen) toggleMenu(false); else if (document.getElementById('blackout').classList.contains('on')) blackout(); return; }
    if (menuOpen && k !== 'm' && k !== 'M') return;
    switch (k) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': case 'Enter': e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace': e.preventDefault(); prev(); break;
      case 'Home': go(0); break;
      case 'End': go(slides.length - 1); break;
      case 'f': case 'F': fullscreen(); break;
      case 'm': case 'M': toggleMenu(); break;
      case 'l': case 'L': toggleTheme(); break;
      case 'b': case 'B': case '.': blackout(); break;
      case 'e': case 'E': location.href = 'exam.html'; break;
      default: {
        const s = slides[cur];
        if (s && s.def.key) { s.def.key(ctx, e); break; }
        // presenter shortcut: 1–4 answers a quick-check on screen
        const box = s && s.el.querySelector('.qc');
        if (box && /^[1-4]$/.test(k)) { const o = box.querySelectorAll('.qc-opt')[+k - 1]; if (o) o.click(); }
      }
    }
  }
  function blackout() { document.getElementById('blackout').classList.toggle('on'); }

  let idleT;
  function wake() { document.body.classList.remove('idle'); clearTimeout(idleT); idleT = setTimeout(() => document.body.classList.add('idle'), 2600); }

  let tx = null, ty = null;
  function touchStart(e) { const t = e.touches[0]; tx = t.clientX; ty = t.clientY; }
  function touchEnd(e) {
    if (tx == null) return;
    const t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { dx < 0 ? next() : prev(); }
    tx = ty = null;
  }

  /* ---------------- Boot ---------------- */
  function boot() {
    try { const t = localStorage.getItem('cpl-theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) { }
    build(); fit();
    window.addEventListener('resize', fit);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousemove', wake);
    document.addEventListener('touchstart', touchStart, { passive: true });
    document.addEventListener('touchend', touchEnd, { passive: true });
    document.getElementById('hud-prev').onclick = prev;
    document.getElementById('hud-next').onclick = next;
    document.getElementById('hud-menu').onclick = () => toggleMenu();
    document.getElementById('hud-full').onclick = fullscreen;
    document.getElementById('hud-theme').onclick = toggleTheme;
    const start = parseInt((location.hash || '').replace('#', ''), 10);
    const shot = /[?&]shot/.test(location.search); // static capture mode (testing)
    if (shot) {
      const s = document.createElement('style');
      s.textContent = '*,*::before,*::after{transition-duration:0s!important;transition-delay:0s!important;animation-duration:0s!important;animation-delay:0s!important}#hud,#progress{display:none!important}';
      document.head.appendChild(s);
    }
    const wait = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    wait.then(() => { go(isNaN(start) ? 0 : start - 1, shot ? 'end' : 0); wake(); });
  }

  window.Deck = { chapter, icon, qc, go, next, prev, boot, slides, chapters, scale: 1 };
})();
