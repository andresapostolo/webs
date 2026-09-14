/* Estudio Lekerman — Home
   Interacciones: header hide-on-scroll + camaleón, menú overlay, botón "volver arriba"
   con anillo de progreso, acordeón de preguntas frecuentes, revelado al scrollear. */
(function () {
  var root = document.documentElement;
  var body = document.body;
  var header = document.querySelector('[data-r="header"]');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  var totop = document.getElementById('totop');
  var ringp = totop ? totop.querySelector('[data-r="ringp"]') : null;
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-logo-color]'));
  var RING = 2 * Math.PI * 21;

  root.setAttribute('data-js', '1');

  function menuOpen() { return body.getAttribute('data-menu') === '1'; }

  /* --- 1. Header: se oculta al bajar, reaparece con cualquier gesto hacia arriba --- */
  var last = window.scrollY;
  var ticking = false;
  function update() {
    ticking = false;
    var y = window.scrollY;
    if (header && !menuOpen()) {
      if (y <= 8) header.setAttribute('data-hid', '0');
      else if (y > last + 2 && y > 120) header.setAttribute('data-hid', '1');
      else if (y < last - 2) header.setAttribute('data-hid', '0');
      header.setAttribute('data-solid', y > 8 ? '1' : '0');
    }
    last = y;
    paint();
    progress();
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* --- 2. Camaleón: color del logo y del ícono según la sección detrás del header --- */
  function paint() {
    if (!header) return;
    var probe = header.offsetHeight / 2;
    var color = sections[0] ? sections[0].getAttribute('data-logo-color') : 'black';
    sections.forEach(function (sec) {
      var r = sec.getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) color = sec.getAttribute('data-logo-color');
    });
    if (menuOpen()) color = 'white';
    header.setAttribute('data-color', color);
  }

  /* --- 3. Menú overlay a pantalla completa --- */
  function setMenu(open) {
    body.setAttribute('data-menu', open ? '1' : '0');
    root.setAttribute('data-lock', open ? '1' : '0');
    if (burger) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }
    if (menu) {
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) menu.removeAttribute('inert'); else menu.setAttribute('inert', '');
    }
    if (header && open) header.setAttribute('data-hid', '0');
    paint();
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!menuOpen()); });
  if (menu) menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen()) { setMenu(false); if (burger) burger.focus(); }
  });

  /* --- 4. Botón "volver arriba" con anillo de progreso --- */
  function progress() {
    if (!totop) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (ringp) ringp.setAttribute('stroke-dashoffset', String(RING * (1 - p)));
    totop.setAttribute('data-on', window.scrollY > window.innerHeight * 0.6 ? '1' : '0');
  }
  if (ringp) ringp.setAttribute('stroke-dasharray', String(RING));
  if (totop) totop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* --- 5. Acordeón de preguntas frecuentes (un ítem abierto a la vez) --- */
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-r="qa"]'));
  items.forEach(function (item) {
    var btn = item.querySelector('[data-r="q"]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var willOpen = item.getAttribute('data-open') !== '1';
      items.forEach(function (other) {
        other.setAttribute('data-open', '0');
        var b = other.querySelector('[data-r="q"]');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.setAttribute('data-open', '1');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --- 6. Revelado suave al entrar en pantalla --- */
  var reveal = Array.prototype.slice.call(document.querySelectorAll('[data-rv]'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.setAttribute('data-in', '1'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.setAttribute('data-in', '1'); });
  }

  setMenu(false);
  update();
  window.addEventListener('load', update);
})();
