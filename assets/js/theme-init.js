(function () {
  try {
    var t = localStorage.getItem('br-theme') || 'light';
    var d = localStorage.getItem('br-dir') || 'ltr';
    var r = document.documentElement;
    r.setAttribute('data-theme', t);
    r.setAttribute('dir', d);
    r.setAttribute('lang', d === 'rtl' ? 'ar' : 'en');
  } catch (e) {}
  document.documentElement.classList.add('js');
  var mq = function (q) { return window.matchMedia(q).matches; };
  var apply = function () {
    var r = document.documentElement;
    var coarse = mq('(pointer: coarse)');
    var w = window.innerWidth, h = window.innerHeight;
    // Hamburger only up to 1180px, or on large touch tablets (iPad Pro class, tall screens).
    // Wide-but-short touch screens such as Nest Hub Max (1280x800) get the full navbar.
    var compact = w <= 1180 || (coarse && w <= 1366 && h > 900);
    var tablet = w >= 601 && (w <= 1180 || (coarse && w <= 1366));
    r.classList.toggle('nav-compact', compact);
    r.classList.toggle('tablet', tablet);
  };
  apply();
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', apply);
})();
