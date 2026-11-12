/* Pulse Studio — shared behaviour (vanilla JS, fully static) */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var root = document.documentElement, body = document.body;
  var layout = body.getAttribute('data-layout') || 'public';
  var page = body.getAttribute('data-page') || '';

  /* ---------- Icon set (inline SVG, stroke icons) ---------- */
  var P = {
    'music': '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    'calendar': '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    'mail': '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    'phone': '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    'map-pin': '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    'heart': '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
    'flame': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1-2-.3-3.9 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.4 1-3 0 1.4 1 2.5 2.5 2.5z"/>',
    'zap': '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    'moon': '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    'menu': '<path d="M3 6h18M3 12h18M3 18h18"/>',
    'x': '<path d="M18 6 6 18M6 6l12 12"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
    'arrow-up': '<path d="M12 19V5M5 12l7-7 7 7"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'plus': '<path d="M12 5v14M5 12h14"/>',
    'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="M17.9 17.9A10.9 10.9 0 0 1 12 20C5 20 1 12 1 12a18.5 18.5 0 0 1 5.1-5.9M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2M1 1l22 22"/>',
    'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    'home': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    'ticket': '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
    'package': '<path d="m16.5 9.4-9-5.2M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/>',
    'refresh': '<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.8-3.4L23 10M1 14l4.7 4.4A9 9 0 0 0 20.5 15"/>',
    'credit-card': '<rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>',
    'award': '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.9 17 23l-5-3-5 3 1.5-9.1"/>',
    'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'star': '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    'smile': '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    'instagram': '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    'facebook': '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    'youtube': '<path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1 8.1 1 12 1 12s0 3.9.5 5.6a2.8 2.8 0 0 0 2 2C5.2 20 12 20 12 20s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2C23 15.9 23 12 23 12s0-3.9-.5-5.6z"/><path d="m9.75 15 5.25-3-5.25-3z"/>',
    'message': '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z"/>',
    'bell': '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
    'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'bar-chart': '<path d="M12 20V10M18 20V4M6 20v-4"/>',
    'trending-up': '<path d="m23 6-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>',
    'activity': '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    'sparkles': '<path d="m12 3 1.9 5.8L20 10.7l-6.1 1.9L12 18.5l-1.9-5.9L4 10.7l6.1-1.9z"/>',
    'bus': '<rect x="3" y="3" width="18" height="15" rx="2"/><path d="M3 11h18M8 21v-3M16 21v-3M7 15h.01M17 15h.01"/>',
    'car': '<path d="M5 17h14M3 13l2-6a2 2 0 0 1 2-1.5h10A2 2 0 0 1 19 7l2 6v4H3z"/><path d="M7 17v2M17 17v2M7 13h.01M17 13h.01"/>',
    'accessibility': '<circle cx="12" cy="4" r="2"/><path d="M5 8h14M12 8v6M9 21l3-7 3 7"/>',
    'trophy': '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17c0 .6-.5 1-1.2 1.2C7.8 18.6 7 20.2 7 22M14 14.7V17c0 .6.5 1 1.2 1.2 1 .4 1.8 2 1.8 3.8M18 2H6v7a6 6 0 0 0 12 0z"/>',
    'gift': '<path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
    'leaf': '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.8-5.5 5-7"/>',
    'layers': '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    'play': '<path d="M5 3l14 9-14 9z"/>',
    'headphones': '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-7h3zM3 19a2 2 0 0 0 2 2h1v-7H3z"/>',
    'droplet': '<path d="M12 2.7 5.6 9.1a9 9 0 1 0 12.8 0z"/>',
    'lock': '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'volume': '<path d="M11 5 6 9H2v6h4l5 4zM19 5a10 10 0 0 1 0 14M15.5 8.5a5 5 0 0 1 0 7"/>',
    'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    'pause': '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>',
    'camera': '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    'briefcase': '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'graduation': '<path d="m22 10-10-5L2 10l10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    'key': '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    'wifi': '<path d="M5 12.5a10 10 0 0 1 14 0M1.4 9a15 15 0 0 1 21.2 0M8.5 16a5 5 0 0 1 7 0M12 20h.01"/>',
    'thermo': '<path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z"/>',
    'swap': '<path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4M21 17H3"/>',
    'whatsapp': '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>'
  };
  function svg(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (P[name] || '') + '</svg>'; }
  function ic(name, cls) { return '<span class="ic' + (cls ? ' ' + cls : '') + '">' + svg(name) + '</span>'; }
  function hydrate(scope) {
    $$('i[data-ic]', scope).forEach(function (el) {
      var span = document.createElement('span');
      span.className = 'ic ' + el.className;
      span.innerHTML = svg(el.getAttribute('data-ic'));
      el.parentNode.replaceChild(span, el);
    });
  }

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function toast(msg) {
    var t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  /* ---------- Shared components ---------- */
  var LOGO = '<a class="logo" href="index.html" aria-label="Pulse Studio home"><img class="logo-img logo-on-light" src="assets/images/logo.png" alt="Pulse Studio - Zumba and Aerobics"><img class="logo-img logo-on-dark" src="assets/images/logo-light.png" alt="" aria-hidden="true"></a>';
  var LOGO_LIGHT = '<a class="logo" href="index.html" aria-label="Pulse Studio home"><img class="logo-img" src="assets/images/logo-light.png" alt="Pulse Studio - Zumba and Aerobics"></a>';
  var NAV = [
    { label: 'About', href: 'about.html', key: 'about' },
    { label: 'Classes', href: 'classes.html', key: 'classes' },
    { label: 'Membership', href: 'membership.html', key: 'membership' },
    { label: 'Contact', href: 'contact.html', key: 'contact' },
    { label: 'Dashboard', href: 'dashboard.html', key: 'dashboard' }
  ];
  function act(k) { return page === k ? 'active' : ''; }
  function homeActive() { return (page === 'home1' || page === 'home2') ? ' active' : ''; }
  var THEME_BTN = '<button class="icon-btn theme-btn" aria-label="Toggle light or dark theme"><span class="ic ic-moon">' + svg('moon') + '</span><span class="ic ic-sun">' + svg('sun') + '</span></button>';
  var DIR_BTN = '<button class="icon-btn dir-btn" aria-label="Toggle text direction" title="Switch text direction"><i data-ic="swap"></i></button>';

  function buildPublicHeader() {
    var links = '<li class="has-dd"><button class="dd-toggle' + homeActive() + '" aria-expanded="false" aria-haspopup="true">Home <i data-ic="chevron-down"></i></button>' +
      '<div class="dropdown"><a href="index.html" class="' + (page === 'home1' ? 'active' : '') + '"' + (page === 'home1' ? ' aria-current="page"' : '') + '>Home 1</a><a href="home-2.html" class="' + (page === 'home2' ? 'active' : '') + '"' + (page === 'home2' ? ' aria-current="page"' : '') + '>Home 2</a></div></li>';
    var mob = '<li><button class="dd-toggle' + homeActive() + '" aria-expanded="false">Home <i data-ic="chevron-down"></i></button><div class="sub"><a href="index.html" class="' + (page === 'home1' ? 'active' : '') + '"' + (page === 'home1' ? ' aria-current="page"' : '') + '>Home 1</a><a href="home-2.html" class="' + (page === 'home2' ? 'active' : '') + '"' + (page === 'home2' ? ' aria-current="page"' : '') + '>Home 2</a></div></li>';
    NAV.forEach(function (n) {
      links += '<li><a class="' + act(n.key) + '" href="' + n.href + '">' + n.label + '</a></li>';
      mob += '<li><a class="' + act(n.key) + '" href="' + n.href + '">' + n.label + '</a></li>';
    });
    return '<header class="site-header"><div class="container nav-wrap">' + LOGO +
      '<ul class="nav-links">' + links + '</ul>' +
      '<div class="nav-actions">' + THEME_BTN + DIR_BTN +
      '<a class="btn btn-outline" href="login.html">Login</a><a class="btn btn-primary" href="classes.html">Book a Class</a>' +
      '<button class="icon-btn hamburger" aria-label="Open menu" aria-expanded="false"><i data-ic="menu"></i></button></div></div>' +
      '<div class="mobile-menu" id="mobileMenu"><ul>' + mob + '</ul>' +
      '<div class="m-controls">' + THEME_BTN + DIR_BTN + '</div>' +
      '<div class="m-actions"><a class="btn btn-outline" href="login.html">Login</a><a class="btn btn-primary" href="classes.html">Book a Class</a></div></div></header>';
  }
  function buildFooter() {
    return '<footer class="site-footer"><div class="container"><div class="foot-grid">' +
      '<div>' + LOGO_LIGHT + '<p style="margin-top:18px;max-width:320px">Dance-fitness classes that feel like a celebration. Zumba, aerobics, step and low-impact sessions, six days a week in Madurai.</p>' +
      '<div class="socials"><a href="#" aria-label="Instagram"><i data-ic="instagram"></i></a><a href="#" aria-label="Facebook"><i data-ic="facebook"></i></a><a href="#" aria-label="YouTube"><i data-ic="youtube"></i></a><a href="#" aria-label="WhatsApp"><i data-ic="whatsapp"></i></a></div></div>' +
      '<div><h4>Explore</h4><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About</a></li><li><a href="classes.html">Classes</a></li><li><a href="membership.html">Membership</a></li><li><a href="contact.html">Contact</a></li></ul></div>' +
      '<div><h4>Members</h4><ul><li><a href="login.html">Member Login</a></li><li><a href="create-account.html">Create Account</a></li><li><a href="dashboard.html">Dashboard</a></li><li><a href="membership.html">Renew Membership</a></li></ul></div>' +
      '<div><h4>Visit Us</h4><ul><li><i data-ic="map-pin"></i><span>24 Lotus Garden Road, Anna Nagar, Madurai 625020</span></li><li><i data-ic="phone"></i><a href="tel:+914524001234">+91 452 400 1234</a></li><li><i data-ic="mail"></i><a href="mailto:hello@pulsestudio.in">hello@pulsestudio.in</a></li></ul></div>' +
      '</div><div class="foot-bottom"><span>© 2026 Pulse Studio. All rights reserved.</span><span>Mon–Sat 5:30 AM – 9:00 PM · Sun 7:00 AM – 12:00 PM</span></div></div></footer>' +
      '<button class="to-top" aria-label="Back to top"><i data-ic="arrow-up"></i></button>';
  }
  function buildAuthHeader() {
    return '<header class="auth-header"><div class="container">' + LOGO +
      '<div class="auth-controls">' + THEME_BTN + DIR_BTN + '</div></div></header>';
  }
  function buildDashHeader() {
    return '<header class="dash-header">' + LOGO +
      '<div class="dash-tools">' + THEME_BTN + DIR_BTN +
      '<button class="icon-btn" aria-label="Notifications" id="bellBtn"><i data-ic="bell"></i><span class="notif-dot"></span></button>' +
      '<div class="user-chip"><span class="av">MR</span><div><b>Maya Rao</b><span>Unlimited Member</span></div></div>' +
      '<a class="logout-btn" href="login.html"><i data-ic="log-out"></i><span class="lbl">Logout</span></a></div></header>';
  }

  var host = $('#site-header');
  if (host) host.outerHTML = layout === 'auth' ? buildAuthHeader() : layout === 'dash' ? buildDashHeader() : buildPublicHeader();
  var fhost = $('#site-footer');
  if (fhost) fhost.outerHTML = buildFooter();
  hydrate(document);

  /* ---------- Theme & direction ---------- */
  function refreshControls() {
    var t = root.getAttribute('data-theme'), d = root.getAttribute('dir');
    $$('.theme-btn').forEach(function (b) { b.setAttribute('aria-pressed', t === 'dark'); });
    $$('.dir-btn').forEach(function (b) { b.setAttribute('title', d === 'rtl' ? 'Switch to left-to-right' : 'Switch to right-to-left'); });
    $$('.flip-rtl').forEach(function (e) { e.style.transform = d === 'rtl' ? 'scaleX(-1)' : ''; });
  }
  function setTheme(t) { root.setAttribute('data-theme', t); store('br-theme', t); refreshControls(); drawCharts(); }
  function setDir(d) { root.setAttribute('dir', d); root.setAttribute('lang', d === 'rtl' ? 'ar' : 'en'); store('br-dir', d); refreshControls(); drawCharts(); }
  document.addEventListener('click', function (e) {
    var tb = e.target.closest('.theme-btn'); if (tb) setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    var db = e.target.closest('.dir-btn'); if (db) setDir(root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl');
  });
  $$('.ic svg').forEach(function (s) { if (s.parentNode.parentNode.className && /btn|text-link/.test(s.parentNode.parentNode.className) && s.innerHTML.indexOf('M5 12h14M12 5l7 7-7 7') > -1) s.parentNode.classList.add('flip-rtl'); });
  refreshControls();

  /* ---------- Menus ---------- */
  var menu = $('#mobileMenu'), burger = $('.hamburger');
  function closeDD() { $$('.dropdown.open').forEach(function (d) { d.classList.remove('open'); }); $$('.nav-links .dd-toggle').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); }); }
  function setBurger(open) { if (!burger) return; burger.setAttribute('aria-expanded', open); burger.innerHTML = ic(open ? 'x' : 'menu'); }
  function closeMenu() { if (!menu) return; menu.classList.remove('open'); setBurger(false); closeSub(); }
  function closeSub() { if (!menu) return; $$('.sub.open', menu).forEach(function (s) { s.classList.remove('open'); }); $$('.dd-toggle', menu).forEach(function (b) { b.setAttribute('aria-expanded', 'false'); }); }
  document.addEventListener('click', function (e) {
    var dd = e.target.closest('.nav-links .dd-toggle');
    if (dd) { var box = dd.nextElementSibling, was = box.classList.contains('open'); closeDD(); if (!was) { box.classList.add('open'); dd.setAttribute('aria-expanded', 'true'); } return; }
    var md = e.target.closest('.mobile-menu .dd-toggle');
    if (md) { var s = md.nextElementSibling; s.classList.toggle('open'); md.setAttribute('aria-expanded', s.classList.contains('open')); return; }
    if (e.target.closest('.hamburger')) { var open = !menu.classList.contains('open'); closeDD(); menu.classList.toggle('open', open); setBurger(open); return; }
    if (e.target.closest('.dropdown a') || e.target.closest('.mobile-menu a')) { closeDD(); closeMenu(); return; }
    if (menu && menu.classList.contains('open') && !e.target.closest('.mobile-menu .sub')) closeSub();
    if (!e.target.closest('.has-dd')) closeDD();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDD(); closeMenu(); } });
  window.addEventListener('resize', function () { if (!root.classList.contains('nav-compact')) closeMenu(); });

  /* ---------- Back to top ---------- */
  var top = $('.to-top');
  if (top) {
    window.addEventListener('scroll', function () { top.classList.toggle('show', window.scrollY > 400); }, { passive: true });
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- Accordion & tabs ---------- */
  $$('.acc-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var it = q.parentElement, acc = it.parentElement, willOpen = !it.classList.contains('open');
      $$('.acc-item.open', acc).forEach(function (o) { o.classList.remove('open'); $('.acc-q', o).setAttribute('aria-expanded', 'false'); });
      if (willOpen) { it.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
    });
  });
  $$('[data-tabs]').forEach(function (wrap) {
    var btns = $$('.tab-btn', wrap), panels = $$('.tab-panel', wrap);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.toggle('on', x === b); });
        panels.forEach(function (p) { p.classList.toggle('on', p.id === b.getAttribute('data-t')); });
      });
    });
  });

  /* ---------- Class filters (chips + search) ---------- */
  var grp = $('[data-filter-group]');
  if (grp) {
    var target = $(grp.getAttribute('data-filter-group')), sIn = $('[data-filter-search]'), chips = $$('.chip', grp), cnt = $('#classCount');
    var apply = function () {
      var f = (chips.filter(function (c) { return c.classList.contains('on'); })[0] || {}).dataset.f || 'all', q = sIn ? sIn.value.toLowerCase() : '', n = 0;
      $$('[data-cat]', target).forEach(function (card) {
        var ok = (f === 'all' || card.getAttribute('data-cat').split(' ').indexOf(f) > -1) && card.textContent.toLowerCase().indexOf(q) > -1;
        card.style.display = ok ? '' : 'none'; if (ok) n++;
      });
      if (cnt) cnt.textContent = n;
    };
    chips.forEach(function (c) { c.addEventListener('click', function () { chips.forEach(function (x) { x.classList.remove('on'); }); c.classList.add('on'); apply(); }); });
    if (sIn) sIn.addEventListener('input', apply);
    var qf = (location.search.match(/[?&]f=([a-z]+)/) || [])[1];
    if (qf) { var pc = chips.filter(function (c) { return c.dataset.f === qf; })[0]; if (pc) pc.click(); }
    apply();
  }
  var finder = $('#classFinder');
  if (finder) finder.addEventListener('submit', function (e) { e.preventDefault(); window.location.href = 'classes.html?f=' + $('#ff', finder).value + '#catalogue'; });

  /* ---------- Billing toggle ---------- */
  var billing = $('#billingSwitch');
  if (billing) {
    $$('button', billing).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('button', billing).forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on');
        var m = b.getAttribute('data-mode');
        $$('[data-m][data-q]').forEach(function (el) { el.textContent = m === 'm' ? el.getAttribute('data-m') : el.getAttribute('data-q'); });
        $$('[data-per]').forEach(function (el) { el.textContent = m === 'm' ? '/month' : '/quarter'; });
      });
    });
  }

  /* ---------- Password toggles ---------- */
  $$('.pw-toggle').forEach(function (b) {
    b.innerHTML = '<span class="ic ic-on">' + svg('eye') + '</span><span class="ic ic-off">' + svg('eye-off') + '</span>';
    b.addEventListener('click', function () {
      var i = b.parentElement.querySelector('input'), show = i.type === 'password';
      i.type = show ? 'text' : 'password'; b.classList.toggle('shown', show); b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

  /* ---------- Form validation ---------- */
  function validField(f) {
    var i = $('input,select,textarea', f); if (!i) return true;
    var v = (i.value || '').trim(), ok = true;
    if (i.hasAttribute('required') && i.type !== 'checkbox' && !v) ok = false;
    if (i.type === 'checkbox' && i.hasAttribute('required') && !i.checked) ok = false;
    if (ok && i.type === 'email' && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) ok = false;
    if (ok && i.getAttribute('minlength') && v.length < +i.getAttribute('minlength')) ok = false;
    if (ok && i.hasAttribute('data-match')) { var o = $(i.getAttribute('data-match')); if (o && o.value !== i.value) ok = false; }
    f.classList.toggle('invalid', !ok); return ok;
  }
  $$('form[data-form]').forEach(function (form) {
    form.setAttribute('novalidate', '');
    $$('.field', form).forEach(function (f) { var i = $('input,select,textarea', f); if (i) i.addEventListener('input', function () { if (f.classList.contains('invalid')) validField(f); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault(); var ok = true;
      $$('.field', form).forEach(function (f) { if (!validField(f)) ok = false; });
      if (!ok) return;
      var kind = form.getAttribute('data-form'), msg = $('.form-msg', form);
      if (kind === 'login' || kind === 'register') { window.location.href = 'dashboard.html'; return; }
      if (msg) msg.classList.add('show'); form.reset(); setTimeout(function () { if (msg) msg.classList.remove('show'); }, 5000);
    });
  });
  $$('.social-btn').forEach(function (b) { b.addEventListener('click', function () { window.location.href = 'dashboard.html'; }); });

  /* ---------- Charts (inline SVG, no libraries) ---------- */
  var PAL = { a: '#e5127d', b: '#ff6a3d', c: '#6a35e0', d: '#0fb5a6' };
  function css(n) { return getComputedStyle(root).getPropertyValue(n).trim(); }
  function isRtl() { return root.getAttribute('dir') === 'rtl'; }
  function nice(max) { var p = Math.pow(10, Math.floor(Math.log10(max))), n = max / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p; }
  function barChart(el, labels, series, colors) {
    var W = el.clientWidth || 360, H = el.clientHeight || 240, m = { l: 38, r: 10, t: 10, b: 28 };
    var L = labels.slice(), S = series.map(function (s) { return s.slice(); });
    if (isRtl()) { L.reverse(); S.forEach(function (s) { s.reverse(); }); }
    var max = nice(Math.max.apply(null, [].concat.apply([], S))), iw = W - m.l - m.r, ih = H - m.t - m.b, gw = iw / L.length, bw = Math.min(26, (gw * .7) / S.length), grid = css('--border');
    var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Bar chart">';
    for (var g = 0; g <= 4; g++) { var y = m.t + ih - ih * g / 4; out += '<line x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y + '" y2="' + y + '" stroke="' + grid + '"/><text x="' + (m.l - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + Math.round(max * g / 4) + '</text>'; }
    L.forEach(function (lb, i) {
      var cx = m.l + gw * i + gw / 2;
      S.forEach(function (s, k) { var h = ih * s[i] / max, x = cx - (bw * S.length) / 2 + k * bw; out += '<rect x="' + x + '" y="' + (m.t + ih - h) + '" width="' + (bw - 3) + '" height="' + h + '" rx="5" fill="' + colors[k] + '"><title>' + lb + ': ' + s[i] + '</title></rect>'; });
      out += '<text x="' + cx + '" y="' + (H - 8) + '" text-anchor="middle">' + lb + '</text>';
    });
    el.innerHTML = out + '</svg>';
  }
  function areaChart(el, labels, data, color) {
    var W = el.clientWidth || 360, H = el.clientHeight || 240, m = { l: 38, r: 16, t: 12, b: 28 };
    var L = labels.slice(), D = data.slice(); if (isRtl()) { L.reverse(); D.reverse(); }
    var max = nice(Math.max.apply(null, D)), iw = W - m.l - m.r, ih = H - m.t - m.b, grid = css('--border');
    var pts = D.map(function (v, i) { return [m.l + iw * i / (D.length - 1), m.t + ih - ih * v / max]; });
    var path = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' '), id = 'ag' + Math.floor(Math.random() * 1e6);
    var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Trend chart"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + color + '" stop-opacity=".35"/><stop offset="1" stop-color="' + color + '" stop-opacity="0"/></linearGradient></defs>';
    for (var g = 0; g <= 4; g++) { var y = m.t + ih - ih * g / 4; out += '<line x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y + '" y2="' + y + '" stroke="' + grid + '"/><text x="' + (m.l - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + Math.round(max * g / 4) + '</text>'; }
    out += '<path d="' + path + ' L' + pts[pts.length - 1][0] + ' ' + (m.t + ih) + ' L' + pts[0][0] + ' ' + (m.t + ih) + ' Z" fill="url(#' + id + ')"/><path d="' + path + '" fill="none" stroke="' + color + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
    pts.forEach(function (p, i) { out += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="' + color + '"><title>' + L[i] + ': ' + D[i] + '</title></circle><text x="' + p[0] + '" y="' + (H - 8) + '" text-anchor="middle">' + L[i] + '</text>'; });
    el.innerHTML = out + '</svg>';
  }
  function donut(el, parts, top, bottom) {
    var S = Math.min(el.clientWidth || 240, el.clientHeight || 240), r = S / 2 - 16, c = S / 2, sw = 26, tot = parts.reduce(function (a, p) { return a + p.v; }, 0), acc = 0, circ = 2 * Math.PI * r;
    var out = '<svg viewBox="0 0 ' + S + ' ' + S + '" style="max-width:' + S + 'px;margin:auto" role="img" aria-label="Donut chart"><circle cx="' + c + '" cy="' + c + '" r="' + r + '" fill="none" stroke="' + css('--bg-soft') + '" stroke-width="' + sw + '"/>';
    parts.forEach(function (p) { var len = circ * p.v / tot; out += '<circle cx="' + c + '" cy="' + c + '" r="' + r + '" fill="none" stroke="' + p.c + '" stroke-width="' + sw + '" stroke-dasharray="' + len + ' ' + (circ - len) + '" stroke-dashoffset="' + (-acc) + '" transform="rotate(-90 ' + c + ' ' + c + ')"><title>' + p.n + ': ' + p.v + '</title></circle>'; acc += len; });
    out += '<text x="' + c + '" y="' + (c + 2) + '" text-anchor="middle" style="font-size:26px;font-weight:800;fill:' + css('--text') + '">' + top + '</text><text x="' + c + '" y="' + (c + 20) + '" text-anchor="middle">' + bottom + '</text></svg>';
    el.innerHTML = out;
  }
  function sparks() {
    $$('.spark').forEach(function (el) {
      var d = el.getAttribute('data-spark').split(',').map(Number), W = 90, H = 28, mx = Math.max.apply(null, d), mn = Math.min.apply(null, d);
      if (isRtl()) d.reverse();
      var pts = d.map(function (v, i) { return (i * W / (d.length - 1)).toFixed(1) + ',' + (H - 3 - (H - 6) * (v - mn) / ((mx - mn) || 1)).toFixed(1); }).join(' ');
      el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" height="100%"><polyline points="' + pts + '" fill="none" stroke="' + PAL.a + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    });
  }
  var RANGES = { '8': { l: ['Sep 16', 'Sep 23', 'Sep 30', 'Oct 7', 'Oct 14', 'Oct 21', 'Oct 28', 'Nov 4'], a: [3, 4, 3, 5, 4, 5, 4, 5], b: [4, 4, 4, 4, 4, 4, 4, 4] }, '4': { l: ['Oct 14', 'Oct 21', 'Oct 28', 'Nov 4'], a: [4, 5, 4, 5], b: [4, 4, 4, 4] } };
  var curRange = '8', packUsed = 6;
  function drawCharts() {
    var el;
    if ((el = $('#chartWeekly'))) { var r = RANGES[curRange]; barChart(el, r.l, [r.a, r.b], [PAL.a, css('--border')]); }
    if ((el = $('#chartTrend'))) areaChart(el, ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], [12, 14, 13, 17, 19, 16], PAL.c);
    if ((el = $('#chartPack'))) donut(el, [{ n: 'Used', v: packUsed, c: PAL.a }, { n: 'Remaining', v: 10 - packUsed, c: PAL.b }], packUsed + '/10', 'classes used');
    if ((el = $('#chartMix'))) donut(el, [{ n: 'Zumba', v: 9, c: PAL.a }, { n: 'Aerobics', v: 5, c: PAL.b }, { n: 'Step', v: 3, c: PAL.c }, { n: 'Low-impact', v: 2, c: PAL.d }], '19', 'this quarter');
    if ((el = $('#chartCal'))) barChart(el, ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], [[5200, 6100, 5800, 7400, 8200, 6900]], [PAL.b]);
    sparks();
    $$('.chart').forEach(function (c) { if (!c.dataset.pop && c.clientWidth > 0 && c.firstChild) { c.dataset.pop = '1'; c.classList.add('pop'); } });
  }
  var rs = $('#rangeSel');
  if (rs) rs.addEventListener('change', function () { curRange = rs.value; drawCharts(); toast('Showing the last ' + rs.value + ' weeks'); });
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawCharts, 120); });
  drawCharts();

  /* ---------- Dashboard interactions ---------- */
  if (layout === 'dash') {
    var links = $$('.sidebar nav a'), views = $$('.dash-main > section');
    function showView(id) {
      if (!id || !$('#' + id) || views.indexOf($('#' + id)) < 0) id = 'overview';
      views.forEach(function (v) { v.classList.toggle('on', v.id === id); });
      links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + id); });
      window.scrollTo(0, 0); drawCharts();
    }
    window.addEventListener('hashchange', function () { showView(location.hash.slice(1)); });
    showView(location.hash.slice(1));
    var bk = $('#bookingsBody');
    function syncPack() {
      var l = 10 - packUsed;
      ['packLeft', 'kpiLeft'].forEach(function (id) { var e = $('#' + id); if (e) e.textContent = l; });
      var u = $('#packUsed'); if (u) u.textContent = packUsed;
      var b = $('#packBar'); if (b) b.style.width = (packUsed * 10) + '%';
      var up = $('#kpiUpcoming'); if (up && bk) up.textContent = $$('tr[data-state="booked"]', bk).length;
      drawCharts();
    }
    $$('[data-book]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.done) return;
        if (packUsed >= 10) { toast('Your pack is fully used. Renew to book more'); return; }
        b.dataset.done = '1'; b.textContent = 'Booked'; b.classList.remove('btn-primary'); b.classList.add('btn-outline'); packUsed++;
        var d = b.getAttribute('data-book').split('|');
        var tr = document.createElement('tr'); tr.setAttribute('data-state', 'booked');
        tr.innerHTML = '<td>' + d[0] + '</td><td>' + d[1] + '</td><td>' + d[2] + '</td><td>' + d[3] + '</td><td><span class="status st-ok">Confirmed</span></td><td><button class="btn btn-outline btn-sm" data-cancel>Cancel</button></td>';
        bk.insertBefore(tr, bk.firstChild); syncPack(); toast('Booked: ' + d[0] + ', ' + d[1]);
      });
    });
    document.addEventListener('click', function (e) {
      var c = e.target.closest('[data-cancel]'); if (!c) return;
      var tr = c.closest('tr'); tr.setAttribute('data-state', 'cancelled'); tr.children[4].innerHTML = '<span class="status st-bad">Cancelled</span>'; c.remove();
      if (packUsed > 0) packUsed--; syncPack(); toast('Booking cancelled. 1 class returned to your pack');
    });
    var search = $('#bookingSearch');
    if (search) search.addEventListener('input', function () { var q = search.value.toLowerCase(); $$('tr', bk).forEach(function (r) { r.style.display = r.textContent.toLowerCase().indexOf(q) > -1 ? '' : 'none'; }); });
    var plan = $('#renewPlan'), price = $('#renewPrice');
    if (plan) plan.addEventListener('change', function () { price.textContent = plan.options[plan.selectedIndex].getAttribute('data-p'); });
    var rb = $('#renewBtn');
    if (rb) rb.addEventListener('click', function () {
      var n = $('#renewNote'); if (n) n.textContent = 'Renewed: ' + plan.options[plan.selectedIndex].text.split(' — ')[0] + ', valid until 5 Jan 2027';
      toast('Membership renewed successfully');
    });
    var bell = $('#bellBtn'); if (bell) bell.addEventListener('click', function () { var d = $('.notif-dot', bell); if (d) d.remove(); toast('You have no new notifications'); });
    var days = $$('.cal-day'); days.forEach(function (d) { d.addEventListener('click', function () { days.forEach(function (x) { x.classList.remove('on'); }); d.classList.add('on'); }); });
    syncPack();
  }

  /* ---------- Animations (scroll reveal, count-up) ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    if (layout === 'public') {
      var sel = '.sec-head, .split > *, .card, .strip > div, .feature-row, .event, .pillar, .stat-grid > div, .offer, .step, .st, .ht, .fac, .prize, .band, .cta-strip, .mock, .feat-quote, .bento > *, .leader, .team-mini .m, .cert, .level, .table-wrap, .acc-item, .info-row, .map-wrap, .vibe-panel, .switch';
      var seen = [];
      $$('main ' + sel.split(', ').join(', main ')).forEach(function (el) {
        if (seen.indexOf(el) > -1 || el.closest('.hero-bg')) return; seen.push(el);
        var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.classList.add('reveal'); el.style.setProperty('--d', (Math.min(idx, 5) * 80) + 'ms');
      });
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      $$('.reveal').forEach(function (el) { io.observe(el); });
    }
    var counters = $$('.stat-num, .hero-stats b, .fact b, .float-card b');
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; co.unobserve(e.target);
        var el = e.target, m = el.getAttribute('data-final').match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/); if (!m) return;
        var raw = m[2], dec = (raw.split('.')[1] || '').length, target = parseFloat(raw.replace(/,/g, '')), comma = raw.indexOf(',') > -1, t0 = null;
        function fmt(v) { var t = v.toFixed(dec); if (comma) { var pr = t.split('.'); pr[0] = pr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); t = pr.join('.'); } return t; }
        function step(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / 1400, 1), v = target * (1 - Math.pow(1 - p, 3)); el.textContent = m[1] + fmt(v) + m[3]; if (p < 1) requestAnimationFrame(step); }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { el.setAttribute('data-final', el.textContent.trim()); co.observe(el); });
  }
})();
