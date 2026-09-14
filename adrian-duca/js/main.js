/* =========================================================
   Adrian E. Duca - Abogado | Header + Hero (entrega 1)
   Comportamientos: header hide-on-scroll, menu overlay,
   WhatsApp flotante (solo mobile, despues del hero) y
   boton "volver arriba" con anillo de progreso de scroll.
   ========================================================= */
(function () {
  'use strict';

  var doc = document.documentElement;

  /* ---------- Header: fijo, se oculta al bajar, vuelve al subir ---------- */
  var header = document.getElementById('header');
  var ultimoY = window.pageYOffset;
  var umbral = 8; // ignora micro-movimientos / rebote de scroll

  function actualizarHeader(y) {
    if (!header) return;
    if (document.body.classList.contains('menu-abierto')) {
      header.classList.remove('is-oculto');
      ultimoY = y;
      return;
    }
    var delta = y - ultimoY;
    if (Math.abs(delta) < umbral) return;
    // Nunca se oculta arriba de todo ni por encima de su propia altura
    if (delta > 0 && y > header.offsetHeight) {
      header.classList.add('is-oculto');
    } else {
      header.classList.remove('is-oculto');
    }
    ultimoY = y;
  }

  /* ---------- Menu overlay ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function abrirMenu() {
    if (!menu || !burger) return;
    menu.hidden = false;
    // fuerza un reflow para que la transicion de opacidad corra
    void menu.offsetWidth;
    menu.classList.add('is-abierto');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Cerrar menu');
    document.body.classList.add('menu-abierto');
    header && header.classList.remove('is-oculto');
  }

  function cerrarMenu() {
    if (!menu || !burger) return;
    menu.classList.remove('is-abierto');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-abierto');
    window.setTimeout(function () {
      if (!menu.classList.contains('is-abierto')) menu.hidden = true;
    }, 320);
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      if (burger.getAttribute('aria-expanded') === 'true') cerrarMenu();
      else abrirMenu();
    });

    menu.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a') : null;
      if (link) cerrarMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        cerrarMenu();
        burger.focus();
      }
    });
  }

  /* ---------- WhatsApp flotante: aparece recien despues del hero ---------- */
  var waFlotante = document.getElementById('waFlotante');
  var hero = document.getElementById('hero');

  if (waFlotante && hero && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (en) {
          waFlotante.classList.toggle('is-visible', !en.isIntersecting);
        });
      },
      { rootMargin: '-10% 0px 0px 0px', threshold: 0 }
    );
    obs.observe(hero);
  }

  /* ---------- Volver arriba + anillo de progreso ---------- */
  var backtop = document.getElementById('backtop');
  var anillo = backtop ? backtop.querySelector('.bt__pr') : null;
  var PERIMETRO = 2 * Math.PI * 21; // r=21 en el viewBox 0 0 48 48

  if (anillo) {
    anillo.style.strokeDasharray = PERIMETRO;
    anillo.style.strokeDashoffset = PERIMETRO;
  }

  if (backtop) {
    backtop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function actualizarBacktop(y) {
    if (!backtop) return;
    var alto = doc.scrollHeight - window.innerHeight;
    var progreso = alto > 0 ? Math.min(y / alto, 1) : 0;
    if (anillo) anillo.style.strokeDashoffset = PERIMETRO * (1 - progreso);
    // aparece tras bajar una pantalla
    backtop.classList.toggle('is-visible', y > window.innerHeight * 0.9);
  }

  /* ---------- Un solo listener de scroll, en rAF ---------- */
  var pendiente = false;

  function onScroll() {
    if (pendiente) return;
    pendiente = true;
    window.requestAnimationFrame(function () {
      var y = window.pageYOffset;
      actualizarHeader(y);
      actualizarBacktop(y);
      pendiente = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  actualizarBacktop(window.pageYOffset);
})();
