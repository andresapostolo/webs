/* AbogadoDeuda — interacciones. Vanilla JS, sin dependencias. */
(function () {
  'use strict';

  /* --- header: sombra al scrollear y ocultar al bajar --- */
  var header = document.getElementById('header');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    var delta = y - lastY;
    header.classList.toggle('is-scrolled', y > 8);
    if (!document.body.classList.contains('is-open')) {
      if (delta > 6 && y > 120) header.classList.add('is-hidden');
      else if (delta < -6 || y < 80) header.classList.remove('is-hidden');
    }
    if (Math.abs(delta) > 3) lastY = y;
  }, { passive: true });

  /* --- menú mobile --- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) header.classList.remove('is-hidden');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* --- acordeón de áreas de práctica: toda la caja abre y cierra --- */
  document.querySelectorAll('[data-acc]').forEach(function (item) {
    var head = item.querySelector('.acc__head');
    function toggle() {
      var open = item.classList.toggle('is-open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    head.addEventListener('click', toggle);
    head.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  /* --- FAQ --- */
  document.querySelectorAll('[data-faq]').forEach(function (item) {
    var btn = item.querySelector('.faq__q');
    var sign = item.querySelector('.faq__sign');
    btn.addEventListener('click', function () {
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      sign.textContent = open ? '–' : '+';
    });
  });

  /* --- reveal de "por qué elegirnos" al entrar en pantalla --- */
  var porque = document.getElementById('por-que');
  if (porque) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { porque.classList.add('is-visible'); io.disconnect(); }
        });
      }, { threshold: 0.25 });
      io.observe(porque);
    } else {
      porque.classList.add('is-visible');
    }
  }

  /* --- formulario de contacto ---
     Sin backend: muestra el mensaje de recibido. Para producción, reemplazar
     por un POST al endpoint del servidor o un servicio de formularios. */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      document.getElementById('contact-card').classList.add('is-sent');
    });
  }
})();
