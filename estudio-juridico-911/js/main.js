/* ============================================================
   ESTUDIO JURÍDICO 911 — comportamiento
   Vanilla, sin dependencias externas: el sitio tiene que funcionar
   aunque falle un CDN. Todos los efectos son los universales del
   arsenal (header hide-on-scroll, hamburguesa, acordeón, anillo de
   progreso) más el revelado suave de secciones.
   ============================================================ */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- header hide-on-scroll -------------------------------
     Baja al scrollear hacia abajo; vuelve al menor gesto hacia
     arriba (no hace falta llegar al tope de la página). */
  (function header() {
    var TH = 24, last = window.scrollY, hidden = false, tick = false;
    function upd() {
      var y = window.scrollY;
      var open = document.body.classList.contains('menu-open');
      var down = y > last + 4;
      var up = y < last - 4;
      if (!open) {
        if (down && y > TH && !hidden) { hidden = true; document.body.classList.add('hdr-hidden'); }
        else if ((up || y <= TH) && hidden) { hidden = false; document.body.classList.remove('hdr-hidden'); }
      }
      last = y;
      tick = false;
    }
    window.addEventListener('scroll', function () {
      if (!tick) { tick = true; requestAnimationFrame(upd); }
    }, { passive: true });
  })();

  /* ---- menú hamburguesa / overlay --------------------------- */
  (function burger() {
    var btn = document.getElementById('burger');
    var menu = document.getElementById('menu');
    if (!btn || !menu) return;
    var open = false;

    function set(v) {
      open = v;
      btn.classList.toggle('open', v);
      btn.setAttribute('aria-expanded', String(v));
      btn.setAttribute('aria-label', v ? 'Cerrar menú' : 'Abrir menú');
      document.body.classList.toggle('menu-open', v);
      document.documentElement.style.overflow = v ? 'hidden' : '';
      if (v) document.body.classList.remove('hdr-hidden');
    }
    btn.addEventListener('click', function () { set(!open); });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) set(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) { set(false); btn.focus(); }
    });
  })();

  /* ---- anclas internas con scroll suave --------------------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    var t = document.getElementById(id);
    if (!t) return;
    e.preventDefault();
    var wasOpen = document.body.classList.contains('menu-open');
    var go = function () {
      var hdr = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr-h')) || 80;
      var y = t.getBoundingClientRect().top + window.scrollY - hdr - 12;
      window.scrollTo({ top: Math.max(0, y), behavior: reduced ? 'auto' : 'smooth' });
    };
    wasOpen ? setTimeout(go, 420) : go();
  });

  /* ---- acordeón de FAQ: uno abierto por vez -----------------
     La expansión usa grid-template-rows 0fr/1fr (nunca max-height
     fijo), y la pregunta queda siempre visible y clickeable. */
  (function faq() {
    var items = [].slice.call(document.querySelectorAll('.faq__it'));
    if (!items.length) return;
    items.forEach(function (it) {
      var btn = it.querySelector('.faq__b');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var willOpen = !it.classList.contains('is-open');
        items.forEach(function (o) {
          o.classList.remove('is-open');
          var b = o.querySelector('.faq__b');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          it.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  })();

  /* ---- formulario de contacto -------------------------------
     Sin backend en esta entrega: valida en el navegador y muestra
     la confirmación en pantalla. */
  (function form() {
    var f = document.getElementById('form-consulta');
    var ok = document.getElementById('form-ok');
    if (!f || !ok) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.reportValidity()) return;
      f.hidden = true;
      ok.hidden = false;
      ok.setAttribute('tabindex', '-1');
      ok.focus();
    });
  })();

  /* ---- volver arriba con anillo de progreso de scroll ------- */
  (function backTop() {
    var b = document.getElementById('backtop');
    if (!b) return;
    var ring = b.querySelector('.bt__pr');
    var LEN = 2 * Math.PI * 21;
    ring.style.strokeDasharray = LEN;
    var wa = document.getElementById('wafloat');
    function upd() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ring.style.strokeDashoffset = LEN * (1 - p);
      var past = window.scrollY > window.innerHeight * 0.6;
      b.classList.toggle('on', past);
      if (wa) wa.classList.toggle('on', window.scrollY > window.innerHeight * 0.5);
    }
    upd();
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    b.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  })();

  /* ---- revelado suave de secciones al entrar en pantalla ---- */
  (function reveal() {
    var els = [].slice.call(document.querySelectorAll('.rev'));
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  })();
})();
