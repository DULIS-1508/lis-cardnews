/*
 * PC 버전(index.html)과 모바일 버전(mobile.html)이 함께 쓰는 코드
 *  - 카드 HTML 만들기 (cards.js 문구 + assets.js 사진·캐릭터)
 *  - 넘기기 뷰어(스와이프·버튼·키보드·주소 #번호)
 *  - 링크 공유, 알림 문구
 */
window.CardCore = (function () {
  'use strict';

  var cards = window.CARDS || [];
  var assets = window.ASSETS || {};
  var photos = assets.photos || {};
  var chars = assets.characters || {};
  var total = cards.length;

  var pad = function (n) { return String(n).padStart(2, '0'); };
  var esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  // 줄바꿈(\n)을 <br>로
  var txt = function (s) { return esc(s).replace(/\n/g, '<br>'); };

  function photo(key) {
    var p = photos[key];
    if (!p) { console.warn('assets.js 에 없는 사진 이름:', key); return { src: '', alt: '' }; }
    return typeof p === 'string' ? { src: p, alt: '' } : p;
  }
  function img(key, cls) {
    var p = photo(key);
    return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="' + esc(p.src) + '" alt="' + esc(p.alt) +
      '" loading="lazy" decoding="async">';
  }

  /* ---------- 카드 그리기 ---------- */

  function renderBlock(b) {
    switch (b.type) {
      case 'boxes':
        return '<div class="blk-boxes cols-' + (b.cols || 3) + '">' + b.items.map(function (it) {
          return '<div class="box"><h3>' + txt(it.head) + '</h3><p>' + txt(it.text) + '</p>' +
            (it.foot ? '<span class="box-foot">' + esc(it.foot) + '</span>' : '') + '</div>';
        }).join('') + '</div>';
      case 'note':
        return '<p class="blk-note">' + txt(b.text) + '</p>';
      case 'quote':
        return '<figure class="blk-quote"><blockquote>' + txt(b.text) + '</blockquote>' +
          (b.foot ? '<figcaption>' + esc(b.foot) + '</figcaption>' : '') + '</figure>';
      case 'photo':
        return '<figure class="blk-photo">' + img(b.photo) +
          (b.cap ? '<figcaption>' + txt(b.cap) + '</figcaption>' : '') + '</figure>';
      case 'photos':
        return '<figure class="blk-photos n' + b.items.length + '"><div class="photo-set">' +
          b.items.map(function (k) { return img(k); }).join('') + '</div>' +
          (b.cap ? '<figcaption>' + txt(b.cap) + '</figcaption>' : '') + '</figure>';
      case 'chips':
        return '<div class="blk-chips cols-' + (b.cols || 2) + '">' + b.groups.map(function (g) {
          return '<div class="chip-group"><h3>' + esc(g.head) + '</h3><ul>' +
            g.items.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></div>';
        }).join('') + '</div>';
      case 'toc':
        return '<ol class="blk-toc">' + b.items.map(function (it, i) {
          return '<li><a href="#' + pad(it.to) + '" data-goto="' + it.to + '"><span class="toc-head"><span class="toc-num">' + pad(i + 1) +
            '</span><span class="toc-to">' + pad(it.to) + ' &rarr;</span></span>' +
            '<span class="toc-text"><b>' + esc(it.label) + '</b><small>' + esc(it.sub) + '</small></span></a></li>';
        }).join('') + '</ol>';
      case 'qa':
        return '<dl class="blk-qa">' + b.items.map(function (it) {
          return '<div class="qa"><dt><span>Q</span>' + esc(it.q) + '</dt><dd><span>A</span>' + esc(it.a) + '</dd></div>';
        }).join('') + '</dl>';
      case 'stat':
        return '<div class="blk-stat"><strong>' + esc(b.value) + '</strong><span>' + esc(b.label) + '</span></div>';
      case 'contact':
        return '<ul class="blk-contact">' + b.items.map(function (it) {
          var v = it.href
            ? '<a href="' + esc(it.href) + '"' + (/^https?:/.test(it.href) ? ' target="_blank" rel="noopener"' : '') + '>' + esc(it.value) + '</a>'
            : esc(it.value);
          return '<li><span>' + esc(it.label) + '</span>' + v + '</li>';
        }).join('') + '</ul>';
      default:
        return '';
    }
  }

  function charImg(n) {
    var src = chars[pad(n)];
    return src ? '<img class="card-char" src="' + esc(src) + '" alt="" aria-hidden="true" loading="lazy" decoding="async">' : '';
  }

  function plainTitle(c) { return (c.alt || c.title).replace(/\n/g, ' '); }

  function renderCard(c, i) {
    var n = i + 1;
    var ch = charImg(n);
    var aria = ' role="group" aria-roledescription="slide" aria-label="' + esc(n + ' / ' + total + ': ' + plainTitle(c)) + '"';
    if (c.kind === 'cover') {
      return '<article class="card card-cover' + (ch ? ' has-char' : '') + '" data-index="' + i + '"' + aria + '>' +
        img(c.photo, 'cover-photo') +
        '<div class="cover-shade"></div>' +
        '<div class="cover-body">' +
          '<span class="pill pill-lime">' + esc(c.tag) + '</span>' +
          '<h2 class="cover-title">' + txt(c.title) + '</h2>' +
          '<p class="cover-sub">' + esc(c.sub) + '</p>' +
          '<p class="cover-desc">' + txt(c.desc) + '</p>' +
        '</div>' + ch +
        '<span class="cover-page">' + pad(n) + ' / ' + total + '</span>' +
      '</article>';
    }
    return '<article class="card' + (ch ? ' has-char' : '') + '" data-index="' + i + '"' + aria + '>' +
      '<div class="card-bar"></div>' + ch +
      '<div class="card-top"><span class="pill">미리 만나는 문헌정보학과</span>' +
        '<span class="card-sec">' + pad(n) + ' / ' + esc(c.section) + '</span></div>' +
      '<div class="card-head"><h2 class="card-title">' + txt(c.title) + '</h2>' +
      (c.sub ? '<p class="card-sub">' + esc(c.sub) + '</p>' : '') + '</div>' +
      '<div class="card-rule" aria-hidden="true"><i></i><b></b><b></b></div>' +
      '<div class="card-body">' + (c.blocks || []).map(renderBlock).join('') + '</div>' +
      '<div class="card-foot"><span>대구대학교 <i>|</i> 문헌정보학과</span><span>' + pad(n) + ' / ' + total + '</span></div>' +
    '</article>';
  }

  var html = cards.map(renderCard);

  /* ---------- 넘기기 뷰어 ---------- */

  function createViewer(opt) {
    var track = opt.track;
    track.innerHTML = html.map(function (h) { return '<div class="slide">' + h + '</div>'; }).join('');
    var slides = track.children;
    var current = -1;

    function update(i) {
      if (i === current) return;
      current = i;
      for (var k = 0; k < slides.length; k++) slides[k].setAttribute('aria-hidden', k === i ? 'false' : 'true');
      var hash = i === 0 ? location.pathname + location.search : '#' + pad(i + 1);
      try { history.replaceState(null, '', hash); } catch (e) { /* file:// 등에서는 무시 */ }
      if (opt.onChange) opt.onChange(i);
    }

    function goTo(i, smooth) {
      i = Math.max(0, Math.min(total - 1, i));
      track.scrollTo({ left: i * track.clientWidth, behavior: smooth === false ? 'auto' : 'smooth' });
      update(i);
    }

    var timer;
    track.addEventListener('scroll', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { update(Math.round(track.scrollLeft / track.clientWidth)); }, 60);
    }, { passive: true });

    document.addEventListener('keydown', function (e) {
      if (opt.isPaused && opt.isPaused()) return;
      if (e.target.closest && e.target.closest('input, textarea')) return;
      if (e.key === 'ArrowRight') { goTo(current + 1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { goTo(current - 1); e.preventDefault(); }
    });

    // 목차 카드의 바로가기
    track.addEventListener('click', function (e) {
      var a = e.target.closest('[data-goto]');
      if (!a) return;
      e.preventDefault();
      goTo(Number(a.getAttribute('data-goto')) - 1);
    });

    // 창 크기·화면 방향이 바뀌어도 같은 카드 유지
    window.addEventListener('resize', function () {
      track.scrollTo({ left: current * track.clientWidth, behavior: 'auto' });
    });

    function fromHash() {
      var n = parseInt(location.hash.replace('#', ''), 10);
      return n >= 1 && n <= total ? n - 1 : 0;
    }
    window.addEventListener('hashchange', function () { goTo(fromHash()); });
    requestAnimationFrame(function () { goTo(fromHash(), false); });

    return {
      goTo: goTo,
      next: function () { goTo(current + 1); },
      prev: function () { goTo(current - 1); },
      current: function () { return current; }
    };
  }

  /* ---------- 알림·공유 ---------- */

  var toastTimer;
  function toast(msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-on'); }, 2200);
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  function share() {
    var url = location.href;
    if (navigator.share) {
      navigator.share({ title: document.title, text: '어서와~ 문헌정보학과는 처음이지? - 대구대학교 문헌정보학과', url: url }).catch(function () {});
      return;
    }
    copy(url).then(function () { toast('링크를 복사했어요!'); },
                   function () { toast('주소창의 링크를 복사해 주세요.'); });
  }

  /* ---------- '어서와~ 문헌정보학과는 처음이지?' 제목 ---------- */

  function letters(s, cls) {
    return Array.from(s).map(function (ch) { return '<b' + (cls ? ' class="' + cls + '"' : '') + '>' + esc(ch) + '</b>'; }).join('');
  }
  function logoHTML(tag) {
    tag = tag || 'h1';
    return '<' + tag + ' class="du-logo" aria-label="어서와~ 문헌정보학과는 처음이지?">' +
      '<span class="du-logo-bubble" aria-hidden="true">어서와~</span>' +
      '<span class="du-logo-line" aria-hidden="true">' + letters('문헌정보학과') + letters('는', 's') + '</span>' +
      '<span class="du-logo-line" aria-hidden="true">' + letters('처음') + letters('이지?', 's') + '</span>' +
    '</' + tag + '>';
  }

  return {
    logoHTML: logoHTML, introChar: assets.intro || '',
    cards: cards, total: total, html: html, pad: pad, esc: esc, plainTitle: plainTitle,
    createViewer: createViewer, toast: toast, share: share
  };
})();
