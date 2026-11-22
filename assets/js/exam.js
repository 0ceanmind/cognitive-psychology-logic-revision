/* =========================================================
   Mock exam — 10 MCQs (1 mark) + 5 short definitions (2 marks)
   Bank: exam/bank.js  →  window.QUESTION_BANK
   ========================================================= */
(function () {
  'use strict';
  const app = document.getElementById('app');
  const bar = document.querySelector('#bar i');
  const B = window.QUESTION_BANK;
  const COL = { all: 'var(--blue)', 1: 'var(--blue)', 2: 'var(--purple)', 3: 'var(--green)', 4: 'var(--orange)' };
  const CH = { 1: 'Cognition and AI', 2: 'Human Intelligence', 3: 'Cognitive Psychology', 4: 'Memory' };
  const ORIGIN = { 'lecture-review': 'Lecture review question', 'professor': 'Professor question', 'past-paper': 'Past paper' };
  const N_MCQ = 10, N_DEF = 5;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let state = { ch: 'all', items: [], i: 0 };

  /* ---------- "where is the answer?" — preview + open in deck ---------- */
  function answerText(it) {
    if (it.type === 'def') return it.q.model;
    const ex = String(it.q.explain || '').replace(/\([^)]*\)\s*\.?$/, '');
    return it.options[it.answer] + ' ' + ex;
  }
  function deckURL(it, embed) {
    const p = new URLSearchParams({ fc: it.q.ch, a: answerText(it), q: it.q.q, src: it.q.src || '' });
    if (embed) p.set('embed', '1');
    return 'index.html?' + p.toString();
  }
  const peekBtn = k => `<button class="x-btn x-peek" data-peek="${k}">See it in the slides</button>`;
  function openPeek(k) {
    const it = state.items[k]; if (!it) return;
    closePeek();
    const m = document.createElement('div');
    m.className = 'x-modal'; m.id = 'peek';
    m.innerHTML = `<div class="x-mcard" role="dialog" aria-label="Where the answer is">
      <div class="x-mhead"><div><div class="x-eyebrow">Where the answer is · Chapter ${it.q.ch}</div><div class="x-mtitle" id="peekTitle">Finding the slide…</div></div>
        <button class="x-ghost" id="peekClose" aria-label="Close">Close ✕</button></div>
      <div class="x-frame"><div class="x-load">Opening the presentation…</div><iframe title="Slide preview" src="${esc(deckURL(it, true))}"></iframe></div>
      <div class="x-mfoot"><div class="x-ans"><span>Answer</span>${esc(it.type === 'mcq' ? it.options[it.answer] : it.q.model)}</div>
        <a class="x-btn primary" href="${esc(deckURL(it, false))}" target="_blank" rel="noopener">Open full presentation ↗</a></div></div>`;
    document.body.appendChild(m);
    requestAnimationFrame(() => m.classList.add('open'));
    m.addEventListener('click', e => { if (e.target === m) closePeek(); });
    m.querySelector('#peekClose').onclick = closePeek;
    m.querySelector('iframe').addEventListener('load', () => { const l = m.querySelector('.x-load'); if (l) l.style.opacity = 0; });
  }
  function closePeek() { const m = document.getElementById('peek'); if (m) m.remove(); }
  window.addEventListener('message', e => {
    const d = e.data; if (!d || d.type !== 'cpl-found') return;
    const t = document.getElementById('peekTitle'); if (t) t.textContent = d.chapter + ' · Slide ' + d.index + ' · ' + d.title;
  });
  document.addEventListener('click', e => { const b = e.target.closest('[data-peek]'); if (b) openPeek(+b.dataset.peek); });

  document.getElementById('themeBtn').onclick = () => {
    const r = document.documentElement; const t = r.dataset.theme === 'light' ? 'dark' : 'light';
    r.dataset.theme = t; try { localStorage.setItem('cpl-theme', t); } catch (e) { }
  };

  function setAccent(c) { document.documentElement.style.setProperty('--accent', COL[c] || COL.all); }
  function progress(f) { bar.style.width = (f * 100) + '%'; }

  /* ---------- storage (optional) ---------- */
  function seen() { try { return new Set(JSON.parse(localStorage.getItem('cpl-seen') || '[]')); } catch (e) { return new Set(); } }
  function remember(ids) { try { const s = seen(); ids.forEach(i => s.add(i)); localStorage.setItem('cpl-seen', JSON.stringify([...s].slice(-400))); } catch (e) { } }
  function best(ch) { try { return JSON.parse(localStorage.getItem('cpl-best') || '{}')[ch]; } catch (e) { return null; } }
  function saveBest(ch, pct) { try { const o = JSON.parse(localStorage.getItem('cpl-best') || '{}'); if (!(o[ch] >= pct)) { o[ch] = pct; localStorage.setItem('cpl-best', JSON.stringify(o)); } } catch (e) { } }

  /* ---------- selection ---------- */
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[a[i], a[j]] = [a[j], a[i]]; } return a; };
  function pick(pool, n, ch) {
    const s = seen();
    const rank = arr => shuffle(arr).sort((a, b) => (s.has(a.id) ? 1 : 0) - (s.has(b.id) ? 1 : 0));
    if (ch !== 'all') return rank(pool.filter(q => q.ch === +ch)).slice(0, n);
    // spread across chapters, then fill
    const by = {}; pool.forEach(q => (by[q.ch] = by[q.ch] || []).push(q));
    Object.keys(by).forEach(k => by[k] = rank(by[k]));
    const order = shuffle(Object.keys(by)); const out = []; let k = 0, guard = 0;
    while (out.length < n && guard++ < 500) { const c = order[k++ % order.length]; if (by[c].length) out.push(by[c].shift()); }
    return shuffle(out);
  }
  function prepMCQ(q) {
    const keep = q.options.some(o => /all of the above|none of the above|both|neither/i.test(o));
    const idx = keep ? q.options.map((_, i) => i) : shuffle(q.options.map((_, i) => i));
    return { type: 'mcq', q, options: idx.map(i => q.options[i]), answer: idx.indexOf(q.answer), picked: null, score: 0 };
  }

  /* ---------- marking for definitions ---------- */
  const norm = s => ' ' + String(s).toLowerCase().replace(/[^a-z0-9±\s-]/g, ' ').replace(/\s+/g, ' ') + ' ';
  function markDef(item, text) {
    const t = norm(text);
    const hits = item.q.keywords.map(g => g.some(w => t.includes(norm(w).trim())));
    const r = hits.filter(Boolean).length / (hits.length || 1);
    const suggest = !text.trim() ? 0 : r >= 0.75 ? 2 : r >= 0.4 ? 1 : 0;
    return { hits, suggest };
  }

  /* ---------- screens ---------- */
  function setup() {
    setAccent(state.ch); progress(0);
    const counts = c => ({ m: B.mcq.filter(q => c === 'all' || q.ch === +c).length, d: B.defs.filter(q => c === 'all' || q.ch === +c).length });
    const cnt = counts(state.ch), b = best(state.ch);
    const online = (B.meta && B.meta.onlineSourcesFound) || [];
    app.innerHTML = `
      <div class="fade-in">
        <div class="x-eyebrow">ATM00201 · Mock exam</div>
        <h1 class="x-h">Prove you <span class="grad">really know it.</span></h1>
        <p class="x-lead"><b>10 multiple-choice questions</b> (1 mark each) and <b>5 short definitions</b> (2 marks each), drawn at random. Instant feedback, the lecture's own model answers, and a full review at the end.</p>
        <div style="margin-top:2em" class="x-row">
          <div class="x-seg" id="chs">${['all', 1, 2, 3, 4].map(c => `<button data-c="${c}" class="${String(state.ch) === String(c) ? 'on' : ''}" style="${String(state.ch) === String(c) ? 'background:' + COL[c] : ''}">${c === 'all' ? 'All chapters' : 'Chapter ' + c}</button>`).join('')}</div>
        </div>
        <div class="x-setup-grid">
          <div class="x-card x-stat"><b>${cnt.m}</b><span>MCQs in the bank${state.ch === 'all' ? '' : ' · ' + CH[state.ch]}</span></div>
          <div class="x-card x-stat"><b>${cnt.d}</b><span>definition questions</span></div>
          <div class="x-card x-stat"><b>${b == null ? '—' : b + '%'}</b><span>your best score here</span></div>
        </div>
        <div class="x-row"><button class="x-btn primary" id="start" style="font-size:1em">Start exam →</button><span class="x-hint">Keyboard: <kbd>1</kbd>–<kbd>4</kbd> answer · <kbd>Enter</kbd> continue</span></div>
        <p class="x-note">Every question is written from the ATM00201 lecture decks for Chapters 1–4 (Semester A 2026–27) and cites the slide it comes from. Questions tagged “Lecture review question” appear in the decks' own review slides; “Professor question” items were written from the slide content in the same exam style.${online.length ? ' Some items come from public past papers, listed in the bank.' : ' No public past papers for this module were found online, so none are labelled as past-paper questions.'}</p>
      </div>`;
    app.querySelectorAll('#chs button').forEach(bt => bt.onclick = () => { state.ch = bt.dataset.c === 'all' ? 'all' : +bt.dataset.c; setup(); });
    document.getElementById('start').onclick = start;
  }

  function start() {
    const m = pick(B.mcq, N_MCQ, state.ch).map(prepMCQ);
    const d = pick(B.defs, N_DEF, state.ch).map(q => ({ type: 'def', q, text: '', checked: false, score: null, hits: [] }));
    state.items = m.concat(d); state.i = 0;
    remember(state.items.map(x => x.q.id));
    render();
  }

  function dots() {
    return `<div class="x-dots">${state.items.map((it, k) => {
      let c = k === state.i ? 'cur' : '';
      if (it.type === 'mcq' && it.picked != null) c = it.score ? 'ok' : 'bad';
      if (it.type === 'def' && it.score != null) c = it.score === 2 ? 'ok' : it.score === 1 ? 'part' : 'bad';
      if (k === state.i && !c.match(/ok|bad|part/)) c = 'cur';
      return `<i class="${c}"></i>`;
    }).join('')}</div>`;
  }

  function header(it) {
    const q = it.q;
    setAccent(q.ch);
    return `<div class="x-eyebrow">Question ${state.i + 1} of ${state.items.length}
      <span class="x-pill">${it.type === 'mcq' ? 'Multiple choice · 1 mark' : 'Definition · 2 marks'}</span>
      <span class="x-pill n">Ch ${q.ch} · ${esc(q.topic || q.term || CH[q.ch])}</span>
      <span class="x-pill n">${ORIGIN[q.origin] || 'Professor question'}</span></div>${dots()}`;
  }

  function render() {
    const it = state.items[state.i];
    progress(state.i / state.items.length);
    if (it.type === 'mcq') renderMCQ(it); else renderDef(it);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderMCQ(it) {
    const keys = 'ABCD';
    app.innerHTML = `<div class="fade-in">${header(it)}
      <h2 class="x-q">${esc(it.q.q)}</h2>
      <div class="x-opts ${it.picked != null ? 'locked' : ''}" id="opts">${it.options.map((o, k) => `<button class="x-opt" data-k="${k}"><span class="k">${keys[k]}</span><span>${esc(o)}</span></button>`).join('')}</div>
      <div class="x-feedback" id="fb"></div>
      <div class="x-nav"><button class="x-btn" id="back" ${state.i ? '' : 'disabled'}>← Back</button><span class="x-hint">Tap an option or press <kbd>1</kbd>–<kbd>4</kbd></span><button class="x-btn primary" id="next" ${it.picked == null ? 'disabled' : ''}>${state.i === state.items.length - 1 ? 'See results' : 'Next →'}</button></div></div>`;
    const opts = app.querySelectorAll('.x-opt');
    const showResult = (animate) => {
      const ok = it.picked === it.answer;
      opts.forEach((o, k) => { o.classList.toggle('right', k === it.answer); o.classList.toggle('wrong', k === it.picked && !ok && animate); if (k === it.picked && !ok && !animate) o.classList.add('wrong'); if (k !== it.answer && k !== it.picked) o.classList.add('fade'); });
      app.querySelector('#opts').classList.add('locked');
      const fb = app.querySelector('#fb');
      fb.className = 'x-feedback show ' + (ok ? 'good' : 'bad');
      fb.innerHTML = `<h4>${ok ? 'Correct' : 'Not quite — the answer is ' + 'ABCD'[it.answer]}</h4><p>${esc(it.q.explain || '')}</p><div class="src">Source: ${esc(it.q.src || 'Chapter ' + it.q.ch)}</div>${ok ? '' : '<div class="x-row" style="margin-top:1em">' + peekBtn(state.i) + '</div>'}`;
      app.querySelector('#next').disabled = false;
      app.querySelector('.x-dots').outerHTML = dots();
    };
    opts.forEach(o => o.onclick = () => {
      if (it.picked != null) return;
      it.picked = +o.dataset.k; it.score = it.picked === it.answer ? 1 : 0;
      showResult(true);
    });
    if (it.picked != null) showResult(false);
    app.querySelector('#next').onclick = next;
    app.querySelector('#back').onclick = back;
  }

  function renderDef(it) {
    app.innerHTML = `<div class="fade-in">${header(it)}
      <h2 class="x-q">${esc(it.q.q)}</h2>
      <textarea class="x-ta" id="ta" placeholder="Write your definition in one or two sentences…" ${it.checked ? 'readonly' : ''}>${esc(it.text)}</textarea>
      <div id="out"></div>
      <div class="x-nav"><button class="x-btn" id="back">← Back</button>
        <span class="x-hint">${it.checked ? 'Adjust the mark if you disagree' : '<kbd>Ctrl</kbd> + <kbd>Enter</kbd> to check'}</span>
        <div class="x-row"><button class="x-btn ${it.checked ? '' : 'primary'}" id="check" ${it.checked ? 'style="display:none"' : ''}>Check answer</button>
        <button class="x-btn primary" id="next" ${it.checked ? '' : 'style="display:none"'}>${state.i === state.items.length - 1 ? 'See results' : 'Next →'}</button></div></div></div>`;
    const ta = app.querySelector('#ta');
    if (!it.checked) setTimeout(() => ta.focus(), 50);
    ta.oninput = () => { it.text = ta.value; };
    const showOut = () => {
      const labels = it.q.keywords.map(g => g[0]);
      app.querySelector('#out').innerHTML = `
        <div class="x-feedback show ${it.score === 2 ? 'good' : it.score === 0 ? 'bad' : ''}" style="margin-top:1.2em">
          <h4 style="color:var(--accent)">Model answer</h4>
          <p class="x-model">${esc(it.q.model)}</p>
          <div style="margin-top:1em;font-size:.7em;color:var(--muted);font-weight:650;letter-spacing:.08em;text-transform:uppercase">Key ideas your answer should contain</div>
          ${new Set(labels).size === labels.length
            ? `<div class="x-kw">${labels.map((l, k) => `<span class="${it.hits[k] ? 'hit' : ''}">${it.hits[k] ? '✓ ' : ''}${esc(l)}</span>`).join('')}</div>`
            : `<div class="x-kw"><span class="${it.hits.every(Boolean) ? 'hit' : ''}">${it.hits.filter(Boolean).length} of ${it.hits.length} key ideas found</span></div>`}
          <div class="x-mark"><span class="lbl">Suggested mark ${it.suggest}/2 — your mark:</span>
            <div class="x-seg" id="mk">${[0, 1, 2].map(v => `<button data-v="${v}" class="${it.score === v ? 'on' : ''}">${v} / 2</button>`).join('')}</div></div>
          <div class="src">Source: ${esc(it.q.src || 'Chapter ' + it.q.ch)}</div>
          ${it.score < 2 ? '<div class="x-row" style="margin-top:1em">' + peekBtn(state.i) + '</div>' : ''}
        </div>`;
      app.querySelectorAll('#mk button').forEach(bt => bt.onclick = () => { it.score = +bt.dataset.v; showOut(); app.querySelector('.x-dots').outerHTML = dots(); });
    };
    const check = () => {
      it.text = ta.value; const r = markDef(it, it.text);
      it.hits = r.hits; it.suggest = r.suggest; it.score = r.suggest; it.checked = true;
      ta.readOnly = true; ta.blur();
      app.querySelector('#check').style.display = 'none';
      app.querySelector('#next').style.display = '';
      app.querySelector('.x-hint').textContent = 'Adjust the mark if you disagree';
      showOut(); app.querySelector('.x-dots').outerHTML = dots();
    };
    app.querySelector('#check').onclick = check;
    ta.onkeydown = e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); if (!it.checked) check(); } };
    if (it.checked) showOut();
    app.querySelector('#next').onclick = next;
    app.querySelector('#back').onclick = back;
  }

  function next() { if (state.i < state.items.length - 1) { state.i++; render(); } else results(); }
  function back() { if (state.i > 0) { state.i--; render(); } }

  function results() {
    progress(1); setAccent(state.ch);
    const mcq = state.items.filter(x => x.type === 'mcq'), def = state.items.filter(x => x.type === 'def');
    const mS = mcq.reduce((a, x) => a + (x.score || 0), 0), dS = def.reduce((a, x) => a + (x.score || 0), 0);
    const total = mS + dS, max = mcq.length + def.length * 2, pct = Math.round(total / max * 100);
    saveBest(state.ch, pct);
    const msg = pct >= 85 ? 'Outstanding — exam ready.' : pct >= 70 ? 'Strong. Polish the gaps below.' : pct >= 50 ? 'A pass — but revise the red items.' : 'Not yet. Review the slides for the red items, then retry.';
    const byCh = {}; state.items.forEach(x => { const c = x.q.ch; byCh[c] = byCh[c] || [0, 0]; byCh[c][0] += x.score || 0; byCh[c][1] += x.type === 'mcq' ? 1 : 2; });
    const C = 2 * Math.PI * 88;
    app.innerHTML = `<div class="fade-in">
      <div class="x-eyebrow">Results${state.ch === 'all' ? ' · All chapters' : ' · Chapter ' + state.ch}</div>
      <h1 class="x-h">${msg.split(' — ')[0].split('.')[0]}<span class="grad">.</span></h1>
      <div class="x-res">
        <div class="x-ring"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="88" fill="none" stroke="var(--surface-2)" stroke-width="16"/><circle id="arc" cx="100" cy="100" r="88" fill="none" stroke="${pct >= 50 ? 'var(--green)' : 'var(--red)'}" stroke-width="16" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" style="transition:stroke-dashoffset 1.6s cubic-bezier(.22,.8,.2,1)"/></svg>
          <div class="v"><b id="pc">0%</b><span>${total} / ${max} marks</span></div></div>
        <div>
          <p class="x-lead" style="margin-bottom:1.2em">${msg}</p>
          <div class="x-bars">
            <div class="b"><span>MCQs</span><div class="t"><i style="background:var(--blue)" data-w="${mS / mcq.length * 100}"></i></div><span class="n">${mS}/${mcq.length}</span></div>
            <div class="b"><span>Definitions</span><div class="t"><i style="background:var(--purple)" data-w="${def.length ? dS / (def.length * 2) * 100 : 0}"></i></div><span class="n">${dS}/${def.length * 2}</span></div>
            ${Object.keys(byCh).sort().map(c => `<div class="b"><span>Chapter ${c}</span><div class="t"><i style="background:${COL[c]}" data-w="${byCh[c][0] / byCh[c][1] * 100}"></i></div><span class="n">${byCh[c][0]}/${byCh[c][1]}</span></div>`).join('')}
          </div>
        </div>
      </div>
      <div class="x-row"><button class="x-btn primary" id="again">New exam →</button><button class="x-btn" id="mist">Show mistakes only</button><button class="x-btn" id="change">Change chapter</button><a class="x-btn" href="index.html">Back to presentation</a></div>
      <h2 style="margin:2.2em 0 .3em;font-size:1.3em;letter-spacing:-.02em">Review</h2>
      <div class="x-review" id="rev"></div></div>`;
    const rev = only => {
      app.querySelector('#rev').innerHTML = state.items.filter(x => !only || (x.score || 0) < (x.type === 'mcq' ? 1 : 2)).map(x => {
        const cls = x.type === 'mcq' ? (x.score ? 'ok' : 'bad') : (x.score === 2 ? 'ok' : x.score === 1 ? 'part' : 'bad');
        const a = x.type === 'mcq'
          ? `Your answer: <b>${x.picked == null ? '—' : esc(x.options[x.picked])}</b> · Correct: <b>${esc(x.options[x.answer])}</b><br>${esc(x.q.explain || '')}`
          : `Your answer: <b>${x.text ? esc(x.text) : '—'}</b> (${x.score || 0}/2)<br>Model: ${esc(x.q.model)}`;
        const k = state.items.indexOf(x);
        return `<div class="it ${cls}"><div class="q">Ch ${x.q.ch} · ${esc(x.q.q)}</div><div class="a">${a}</div>${cls !== 'ok' ? '<div style="margin-top:.6em">' + peekBtn(k).replace('x-btn x-peek', 'x-btn x-peek sm') + '</div>' : ''}</div>`;
      }).join('') || '<p class="x-lead">No mistakes. Well done.</p>';
    };
    rev(false);
    requestAnimationFrame(() => setTimeout(() => {
      app.querySelector('#arc').style.strokeDashoffset = C * (1 - pct / 100);
      app.querySelectorAll('.x-bars i').forEach(i => i.style.width = i.dataset.w + '%');
      const pc = app.querySelector('#pc'), t0 = performance.now();
      const tick = n => { const k = Math.min(1, (n - t0) / 1600), e = 1 - Math.pow(1 - k, 3); pc.textContent = Math.round(pct * e) + '%'; if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, 80));
    let only = false;
    app.querySelector('#mist').onclick = e => { only = !only; e.target.textContent = only ? 'Show all' : 'Show mistakes only'; rev(only); };
    app.querySelector('#again').onclick = start;
    app.querySelector('#change').onclick = setup;
  }

  document.addEventListener('keydown', e => {
    if (document.getElementById('peek')) { if (e.key === 'Escape') closePeek(); return; }
    if (!state.items.length || !app.querySelector('.x-opt, .x-ta')) {
      if (e.key === 'Enter' && document.getElementById('start')) start();
      return;
    }
    const it = state.items[state.i];
    if (it.type === 'mcq') {
      if (/^[1-4]$/.test(e.key) && it.picked == null) { const o = app.querySelectorAll('.x-opt')[+e.key - 1]; if (o) o.click(); }
      if (e.key === 'Enter' && it.picked != null) next();
      if (e.key === 'ArrowLeft') back();
      if (e.key === 'ArrowRight' && it.picked != null) next();
    } else if (e.key === 'Enter' && it.checked && document.activeElement.tagName !== 'TEXTAREA') next();
  });

  if (!B || !B.mcq || !B.defs) { app.innerHTML = '<p class="x-lead">The question bank could not be loaded.</p>'; return; }
  setup();
})();
