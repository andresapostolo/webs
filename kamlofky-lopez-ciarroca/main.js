/* ============================================================
   Kamlofky & López Ciarroca — comportamiento
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Firma #2: <image-slot> con crédito de stock ---------- */
  class ImageSlot extends HTMLElement {
    connectedCallback() {
      if (this.dataset.ready) return;
      this.dataset.ready = '1';

      var src = this.getAttribute('src');
      var credit = this.getAttribute('credit');
      var alt = this.getAttribute('alt') || '';
      var placeholder = this.getAttribute('placeholder') || '';

      if (src) {
        var img = document.createElement('img');
        img.className = 'is__img';
        img.src = src;
        img.alt = alt;
        img.loading = this.hasAttribute('data-eager') ? 'eager' : 'lazy';
        img.decoding = 'async';
        this.appendChild(img);
      } else if (placeholder) {
        var ph = document.createElement('div');
        ph.className = 'is__ph';
        ph.textContent = placeholder;
        this.appendChild(ph);
      }

      if (credit) {
        var cap = document.createElement('span');
        cap.className = 'is__credit';
        cap.textContent = credit;
        this.appendChild(cap);
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }

  /* ---------- Header hide-on-scroll ---------- */
  var header = document.getElementById('header');
  var lastY = window.pageYOffset;
  var ticking = false;

  /* ---------- Flotantes + anillo de progreso ---------- */
  var fab = document.getElementById('fabWa');
  var bt = document.getElementById('btTop');
  var ring = document.getElementById('btRing');
  var hero = document.getElementById('hero');
  var CIRC = 2 * Math.PI * 24;

  if (ring) {
    ring.style.strokeDasharray = CIRC;
    ring.style.strokeDashoffset = CIRC;
  }

  function onScroll() {
    var y = window.pageYOffset;

    // Header: se oculta al bajar, reaparece al subir, siempre visible en 0
    if (y <= 0) {
      header.classList.remove('is-hidden', 'is-stuck');
    } else {
      header.classList.add('is-stuck');
      if (y > lastY && y > 140 && !document.body.classList.contains('is-locked')) {
        header.classList.add('is-hidden');
      } else if (y < lastY) {
        header.classList.remove('is-hidden');
      }
    }
    lastY = y;

    // Flotantes: aparecen recién después del hero
    var umbral = hero ? hero.offsetHeight * 0.7 : 400;
    var pasoHero = y > umbral;
    fab.classList.toggle('is-visible', pasoHero);
    bt.classList.toggle('is-visible', pasoHero);

    // Anillo de progreso de scroll
    if (ring) {
      var alto = document.documentElement.scrollHeight - window.innerHeight;
      var pct = alto > 0 ? Math.min(y / alto, 1) : 0;
      ring.style.strokeDashoffset = CIRC * (1 - pct);
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  bt.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Menú hamburguesa (overlay) ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function setMenu(abierto) {
    burger.classList.toggle('is-open', abierto);
    burger.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    burger.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    menu.classList.toggle('is-open', abierto);
    menu.setAttribute('aria-hidden', abierto ? 'false' : 'true');
    document.body.classList.toggle('is-locked', abierto);
    if (abierto) header.classList.remove('is-hidden');
  }

  burger.addEventListener('click', function () {
    setMenu(!menu.classList.contains('is-open'));
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
  });

  /* ---------- Acordeón FAQ (uno abierto a la vez) ---------- */
  var faqBtns = document.querySelectorAll('.faq__q');
  Array.prototype.forEach.call(faqBtns, function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var abierto = item.classList.contains('is-open');

      Array.prototype.forEach.call(document.querySelectorAll('.faq__item'), function (it) {
        it.classList.remove('is-open');
        it.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      });

      if (!abierto) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Formulario de consulta ---------- */
  var form = document.getElementById('formConsulta');
  var nota = document.getElementById('formNota');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var campos = form.querySelectorAll('[required]');
      var ok = true;

      Array.prototype.forEach.call(campos, function (c) {
        var vacio = !String(c.value || '').trim();
        c.classList.toggle('is-error', vacio);
        if (vacio && ok) { c.focus(); ok = false; }
      });

      if (!ok) {
        nota.className = 'form__nota is-error';
        nota.textContent = 'Completá los campos para poder responderte.';
        return;
      }

      var d = new FormData(form);
      var asunto = 'Consulta web — ' + d.get('area');
      var cuerpo =
        'Nombre: ' + d.get('nombre') + '\n' +
        'Contacto: ' + d.get('contacto') + '\n' +
        'Área: ' + d.get('area') + '\n\n' +
        d.get('mensaje');

      nota.className = 'form__nota is-ok';
      nota.textContent = 'Abrimos tu correo con la consulta lista para enviar.';

      window.location.href = 'mailto:abogadosklc@gmail.com' +
        '?subject=' + encodeURIComponent(asunto) +
        '&body=' + encodeURIComponent(cuerpo);
    });

    form.addEventListener('input', function (e) {
      if (e.target.classList) e.target.classList.remove('is-error');
    });
  }

  /* ---------- Año del footer ---------- */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
