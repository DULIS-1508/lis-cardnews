/* PC 버전 (index.html) */
(function () {
  'use strict';

  var C = window.CardCore;
  var total = C.total;

  // 상단 제목 로고와 캐릭터
  document.getElementById('intro-logo').innerHTML = C.logoHTML('h1');
  var introChar = document.getElementById('intro-char');
  if (C.introChar) introChar.src = C.introChar; else introChar.remove();

  ['card-total', 'counter-total', 'grid-total'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = total;
  });

  var dialog = document.getElementById('grid-dialog');
  var counterNow = document.getElementById('counter-now');
  var bar = document.getElementById('progress-bar');
  var prevBtn = document.querySelector('[data-prev]');
  var nextBtn = document.querySelector('[data-next]');
  var hint = document.getElementById('hint');

  // 카드를 넘기면 위쪽 제목은 화면 밖으로 올리고 카드가 화면에 꽉 차게 맞춤
  var viewerEl = document.querySelector('.viewer');
  var headerEl = document.querySelector('.site-header');
  var started = false;
  function focusViewer() {
    var top = viewerEl.getBoundingClientRect().top + window.scrollY - headerEl.offsetHeight - 12;
    if (Math.abs(window.scrollY - top) > 4) window.scrollTo({ top: top, behavior: 'smooth' });
  }

  var viewer = C.createViewer({
    track: document.getElementById('track'),
    isPaused: function () { return dialog.open; },
    onChange: function (i) {
      if (started) focusViewer();
      started = true;
      counterNow.textContent = C.pad(i + 1);
      bar.style.width = ((i + 1) / total * 100) + '%';
      prevBtn.disabled = i === 0;
      nextBtn.disabled = i === total - 1;
      if (i > 0 && hint) hint.classList.add('is-hidden');
    }
  });

  prevBtn.addEventListener('click', viewer.prev);
  nextBtn.addEventListener('click', viewer.next);

  /* ---------- 전체 보기 ---------- */

  var grid = document.getElementById('grid');
  grid.innerHTML = C.html.map(function (h, i) {
    return '<button type="button" class="grid-item" data-grid-go="' + i + '" aria-label="' + (i + 1) + '번 카드로 이동">' +
      '<div class="grid-card" inert>' + h + '</div></button>';
  }).join('');

  document.querySelector('[data-open-grid]').addEventListener('click', function () {
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', '');
  });
  document.querySelector('[data-close-grid]').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) { dialog.close(); return; }
    var item = e.target.closest('[data-grid-go]');
    if (!item) return;
    dialog.close();
    viewer.goTo(Number(item.getAttribute('data-grid-go')), false);
    focusViewer();
  });

  /* ---------- 공유 ---------- */

  document.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', C.share);
  });

  /* ---------- PDF 저장 (인쇄) ---------- */

  var deck = document.getElementById('print-deck');
  function fillDeck() {
    if (!deck.innerHTML) {
      deck.innerHTML = C.html.map(function (h) { return '<div class="print-page">' + h + '</div>'; }).join('');
      deck.querySelectorAll('img').forEach(function (img) { img.loading = 'eager'; });
    }
    var pending = [];
    deck.querySelectorAll('img').forEach(function (img) {
      if (!img.complete) pending.push(new Promise(function (r) { img.onload = img.onerror = r; }));
    });
    return Promise.all(pending);
  }
  // 브라우저 메뉴(Ctrl+P)로 인쇄해도 카드가 나오도록
  window.addEventListener('beforeprint', fillDeck);

  document.querySelector('[data-print]').addEventListener('click', function () {
    C.toast('인쇄 창에서 ‘PDF로 저장’을 선택하세요.');
    // 이미지가 모두 로드된 뒤 인쇄 창 열기
    fillDeck().then(function () { window.print(); });
  });
})();
