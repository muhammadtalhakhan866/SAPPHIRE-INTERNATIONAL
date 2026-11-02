/* Sapphire International — motion & interaction layer (loads after main.js) */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var root = document.documentElement;
  var $ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Extra icon ---------- */
  document.body.insertAdjacentHTML('afterbegin',
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true"><symbol id="i-arrow-up" viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></symbol></svg>');

  /* ---------- Scroll progress bar + back-to-top ---------- */
  var progress = document.createElement('div');
  progress.className = 'progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  var toTop = document.createElement('button');
  toTop.className = 'totop';
  toTop.type = 'button';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<svg class="ic"><use href="#i-arrow-up"/></svg>';
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  document.body.appendChild(toTop);

  /* ---------- Split headline into words for a staggered entrance ---------- */
  function splitWords(el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var s = document.createElement('span');
            s.className = 'w';
            s.style.setProperty('--i', i++);
            s.textContent = p;
            frag.appendChild(s);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1) { walk(c); }
      });
    })(el);
    el.classList.add('wsplit');
  }
  if (!reduce) $('.hero h1, .page-hero h1').forEach(splitWords);

  /* ---------- Reveal polish: directional entrances, auto stagger, settle ---------- */
  $('.hero-grid, .split, .award').forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (k, i) {
      if (!k.classList.contains('reveal')) return;
      k.classList.add(i === 0 ? 'reveal-l' : 'reveal-r');
    });
  });
  var parents = [];
  $('.reveal').forEach(function (el) { if (parents.indexOf(el.parentNode) < 0) parents.push(el.parentNode); });
  parents.forEach(function (p) {
    var kids = Array.prototype.slice.call(p.children).filter(function (k) { return k.classList.contains('reveal') && !k.style.getPropertyValue('--d'); });
    if (kids.length > 1) kids.forEach(function (k, i) { k.style.setProperty('--d', (Math.min(i, 6) * 0.08).toFixed(2) + 's'); });
  });
  $('.reveal').forEach(function (el) {
    el.addEventListener('transitionend', function (e) {
      if (e.propertyName === 'opacity' && el.classList.contains('in')) el.classList.add('done');
    });
  });

  /* ---------- Scroll-linked work (one rAF-throttled handler) ---------- */
  var header = document.querySelector('.site-header');
  var timeline = document.querySelector('.timeline');
  var tlItems = timeline ? $('li', timeline) : [];
  var lastY = window.scrollY, ticking = false;

  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.setProperty('--p', max > 0 ? Math.min(y / max, 1).toFixed(4) : 0);
    toTop.classList.toggle('show', y > 700);

    if (header && !header.classList.contains('nav-open')) {
      if (y > 240 && y > lastY + 6) header.classList.add('hide');
      else if (y < lastY - 6 || y < 240) header.classList.remove('hide');
    }
    lastY = y;

    if (!reduce) root.style.setProperty('--sy', Math.min(y, 1400));

    if (timeline) {
      var r = timeline.getBoundingClientRect();
      var p = (window.innerHeight * 0.65 - r.top) / r.height;
      timeline.style.setProperty('--p', Math.max(0, Math.min(p, 1)).toFixed(3));
      tlItems.forEach(function (li) { li.classList.toggle('on', li.getBoundingClientRect().top < window.innerHeight * 0.68); });
    }
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Hero: cursor glow + parallax ---------- */
  if (fine && !reduce) {
    $('.hero, .page-hero').forEach(function (h) {
      h.addEventListener('pointermove', function (e) {
        var r = h.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        h.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        h.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        h.style.setProperty('--px', (x - 0.5).toFixed(3));
        h.style.setProperty('--py', (y - 0.5).toFixed(3));
      });
      h.addEventListener('pointerleave', function () {
        h.style.setProperty('--px', 0);
        h.style.setProperty('--py', 0);
      });
    });
  }

  /* ---------- 3D tilt + glare on cards ---------- */
  if (fine && !reduce) {
    $('.card, .prod, .group-card, .partner-card, .func, .office, .callout, .pulse-card').forEach(function (el) {
      var strong = el.classList.contains('pulse-card');
      var max = strong ? 7 : 5, lift = strong ? 0 : -4;
      el.classList.add('tilt');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.transform = 'perspective(900px) rotateX(' + ((0.5 - y) * max * 2).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * max * 2).toFixed(2) + 'deg) translateY(' + lift + 'px)';
        el.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- Magnetic buttons + click ripple ---------- */
  $('.btn').forEach(function (b) {
    if (fine && !reduce) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.18, dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        b.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + (dy - 2).toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    }
    b.addEventListener('click', function (e) {
      if (reduce) return;
      var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2;
      var s = document.createElement('span');
      s.className = 'ripple';
      s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px';
      b.appendChild(s);
      setTimeout(function () { s.remove(); }, 700);
    });
  });

  /* ---------- Stagger list entrances inside region tabs ---------- */
  $('.inst-list').forEach(function (l) { Array.prototype.forEach.call(l.children, function (li, i) { li.style.setProperty('--i', i); }); });

  /* ---------- Fade between pages ---------- */
  if (!reduce) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var href = a.getAttribute('href');
      if (!href || a.target === '_blank' || /^(#|mailto:|tel:|https?:|\/\/)/i.test(href)) return;
      if (a.pathname === location.pathname && a.hash) return;
      e.preventDefault();
      root.classList.add('leaving');
      setTimeout(function () { location.href = a.href; }, 230);
    });
    window.addEventListener('pageshow', function () { root.classList.remove('leaving'); });
  }
})();
