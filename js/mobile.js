/* 모바일 버전 (mobile.html) */
(function () {
  'use strict';

  var C = window.CardCore;
  var total = C.total;

  /* ---------- 첫 화면 ---------- */
  var intro = document.getElementById('intro');
  document.getElementById('intro-logo').innerHTML = C.logoHTML('h1');
  var introChar = document.getElementById('intro-char');
  if (C.introChar) introChar.src = C.introChar; else introChar.remove();

  function closeIntro() {
    if (intro.classList.contains('is-closed')) return;
    intro.classList.add('is-closed');
    setTimeout(function () { intro.hidden = true; }, 400);
  }
  // 특정 카드 주소(#05 등)로 들어오면 첫 화면 건너뛰기
  if (/^#\d+$/.test(location.hash)) { intro.hidden = true; intro.classList.add('is-closed'); }
  document.querySelector('[data-start]').addEventListener('click', closeIntro);
  // 첫 화면에서 옆으로 밀어도 시작
  var sx = null;
  intro.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  intro.addEventListener('touchend', function (e) {
    if (sx !== null && Math.abs(e.changedTouches[0].clientX - sx) > 40) closeIntro();
    sx = null;
  });

  ['counter-total', 'menu-total'].forEach(function (id) {
    document.getElementById(id).textContent = total;
  });

  var menu = document.getElementById('menu');
  var counterNow = document.getElementById('counter-now');
  var bar = document.getElementById('progress-bar');
  var prevBtn = document.querySelector('[data-prev]');
  var nextBtn = document.querySelector('[data-next]');
  var hint = document.getElementById('hint');
  var list = document.getElementById('menu-list');

  var viewer = C.createViewer({
    track: document.getElementById('track'),
    isPaused: function () { return menu.open; },
    onChange: function (i) {
      counterNow.textContent = C.pad(i + 1);
      bar.style.width = ((i + 1) / total * 100) + '%';
      prevBtn.disabled = i === 0;
      nextBtn.disabled = i === total - 1;
      if (i > 0) hint.classList.add('is-hidden');
      // 새 카드는 맨 위부터 보이게
      var slide = document.getElementById('track').children[i];
      if (slide) slide.scrollTop = 0;
      var items = list.children;
      for (var k = 0; k < items.length; k++) items[k].classList.toggle('is-current', k === i);
    }
  });

  // 카드 내용이 화면보다 길면 아래쪽을 흐리게 해서 '더 있음'을 알려 줌
  var slides = document.getElementById('track').children;
  function markMore(s) { s.classList.toggle('has-more', s.scrollHeight - s.scrollTop - s.clientHeight > 40); }
  Array.prototype.forEach.call(slides, function (s) {
    s.addEventListener('scroll', function () { markMore(s); }, { passive: true });
    s.querySelectorAll('img').forEach(function (im) { im.addEventListener('load', function () { markMore(s); }); });
    markMore(s);
  });
  window.addEventListener('resize', function () { Array.prototype.forEach.call(slides, markMore); });

  prevBtn.addEventListener('click', viewer.prev);
  nextBtn.addEventListener('click', viewer.next);
  setTimeout(function () { hint.classList.add('is-hidden'); }, 5000);

  /* ---------- 전체 목록 ---------- */

  list.innerHTML = C.cards.map(function (c, i) {
    var sec = c.kind === 'cover' ? '표지' : c.section;
    return '<li><button type="button" data-menu-go="' + i + '"><span class="m-list-num">' + C.pad(i + 1) + '</span>' +
      '<span class="m-list-text"><small>' + C.esc(sec) + '</small>' + C.esc(C.plainTitle(c)) + '</span></button></li>';
  }).join('');

  document.querySelector('[data-open-menu]').addEventListener('click', function () {
    if (menu.showModal) menu.showModal(); else menu.setAttribute('open', '');
    var cur = list.querySelector('.is-current');
    if (cur) cur.scrollIntoView({ block: 'center' });
  });
  document.querySelector('[data-close-menu]').addEventListener('click', function () { menu.close(); });
  menu.addEventListener('click', function (e) {
    if (e.target === menu) { menu.close(); return; }
    var b = e.target.closest('[data-menu-go]');
    if (!b) return;
    menu.close();
    viewer.goTo(Number(b.getAttribute('data-menu-go')), false);
  });

  document.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', C.share);
  });
})();
