/* Closing */
(function () {
  Deck.chapter({
    id: 'outro', label: 'Finish', title: 'Ready for the exam',
    slides: [{
      title: 'Mock exam', cls: 'center',
      html: `
        <canvas class="neural" style="position:absolute;inset:0;width:1920px;height:1080px;z-index:0"></canvas>
        <div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center">
          <div class="eyebrow rise" style="justify-content:center">Test yourself</div>
          <h1 class="rise d1" style="font-size:140px">Ready for the <span class="grad-2">mock exam?</span></h1>
          <p class="lead rise d2" style="text-align:center;max-width:1200px">10 multiple-choice questions and 5 short definitions, drawn at random from a bank built on Chapters 1–4.</p>
          <div class="row rise d3" style="margin-top:56px;gap:20px">
            <a class="btn primary" href="exam.html" style="text-decoration:none;font-size:32px;padding:22px 44px">Start the mock exam</a>
            <button class="btn" onclick="Deck.go(0)" style="font-size:32px;padding:22px 44px">Back to start</button>
          </div>
        </div>`,
      enter(c) { Deck.neural(c, c.$('canvas.neural')); },
    }]
  });
})();
