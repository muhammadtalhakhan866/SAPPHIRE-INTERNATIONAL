/* Sapphire International — site behaviour (no dependencies) */
(function () {
  'use strict';

  /* ---------- Icon sprite (injected so pages work from file:// too) ---------- */
  var icons = {
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'menu': '<path d="M4 7h16M4 12h16M4 17h16"/>',
    'close': '<path d="M6 6l12 12M18 6L6 18"/>',
    'phone': '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    'pin': '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    'chat': '<path d="M4 20l1.6-4.2A8 8 0 1 1 8.2 18.5z"/><path d="M9 9.5c.4 2 2 3.6 4 4.2l1.3-1.2 2 .9"/>',
    'check': '<path d="M5 12.5l5 5 9-10"/>',
    'heart': '<path d="M12 20s-7-4.4-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.6 12 20 12 20z"/>',
    'pulse': '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
    'shield': '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    'award': '<circle cx="12" cy="9" r="6"/><path d="M8.5 14.5L7 21l5-3 5 3-1.5-6.5"/>',
    'users': '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14a5 5 0 0 1 4 5"/>',
    'target': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    'eye': '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'truck': '<path d="M2 6h13v11H2zM15 9h4l3 3v5h-7"/><circle cx="6.5" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    'flask': '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 15h9"/>',
    'building': '<path d="M5 21V3h14v18M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4M3 21h18"/>',
    'plus': '<path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z"/>',
    'vessel': '<path d="M12 3v8M12 11c0 3-5 3-5 7M12 11c0 3 5 3 5 7M7 18v3M17 18v3"/>',
    'scan': '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',
    'lungs': '<path d="M12 4v9M12 8c-3 0-6 4-6 8 0 2 1 3 2.5 3S11 18 11 16V9M12 8c3 0 6 4 6 8 0 2-1 3-2.5 3S13 18 13 16V9"/>',
    'external': '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    'globe': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    'box': '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9"/>',
    'cap': '<path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5"/>',
    'handshake': '<path d="M3 11l4-4 4 2 3-2 7 6-4 5-3-1-2 2-3-1-2 1z"/>'
  };
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">';
  Object.keys(icons).forEach(function (k) { sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + icons[k] + '</symbol>'; });
  sprite += '</svg>';
  document.body.insertAdjacentHTML('afterbegin', sprite);

  /* ---------- Header: scrolled state + mobile menu ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) { header.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
    });
  }

  /* ---------- Reveal on scroll + count-up ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var dur = 1400, start = null;
    if (reduce) { el.textContent = target.toFixed(dec); return; }
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var targets = document.querySelectorAll('.reveal, .bars, [data-count]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('in');
        if (el.hasAttribute('data-count')) countUp(el);
        io.unobserve(el);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); if (t.hasAttribute('data-count')) t.textContent = t.getAttribute('data-count'); });
  }

  /* ---------- Region tabs ---------- */
  var tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    var select = function (i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % tabs.length, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
      });
    });
    select(0);
  }

  /* ---------- Product filter ---------- */
  var filters = document.querySelectorAll('.filter');
  var prods = document.querySelectorAll('.prod');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      var key = f.getAttribute('data-filter');
      filters.forEach(function (x) { x.setAttribute('aria-pressed', x === f ? 'true' : 'false'); });
      prods.forEach(function (p) { p.hidden = !(key === 'all' || p.getAttribute('data-brand') === key); });
    });
  });

  /* ---------- Contact form: no backend, so it opens the visitor's email app ---------- */
  var form = document.getElementById('enquiry');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = 'Enquiry from ' + d.get('name') + (d.get('org') ? ' (' + d.get('org') + ')' : '');
      var body = 'Name: ' + d.get('name') + '\nOrganisation: ' + (d.get('org') || '-') + '\nPhone: ' + (d.get('phone') || '-') +
        '\nEmail: ' + d.get('email') + '\nInterested in: ' + d.get('interest') + '\n\n' + d.get('message');
      window.location.href = 'mailto:info@sapphireint.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var s = document.getElementById('form-status');
      if (s) s.textContent = 'Your email app should open with the message ready to send.';
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
