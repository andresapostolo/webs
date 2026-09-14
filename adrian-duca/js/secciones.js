/* =========================================================
   Adrian E. Duca - Abogado | Secciones (entrega 2)
   Acordeon de FAQ (exclusivo) + validacion del formulario.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- FAQ: un solo item abierto a la vez ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.faq__item'));

  items.forEach(function (item) {
    var boton = item.querySelector('.faq__q');
    if (!boton) return;

    boton.addEventListener('click', function () {
      var estabaAbierto = item.classList.contains('is-abierto');

      // acordeon exclusivo: cierra todos antes de abrir el elegido
      items.forEach(function (otro) {
        otro.classList.remove('is-abierto');
        var b = otro.querySelector('.faq__q');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      if (!estabaAbierto) {
        item.classList.add('is-abierto');
        boton.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Formulario de contacto ---------- */
  var form = document.getElementById('formContacto');
  var aviso = document.getElementById('formAviso');

  // Se arma con nodos, no con innerHTML: lo que escribe el visitante
  // nunca se interpreta como markup.
  function mostrarAviso(partes, esError) {
    if (!aviso) return;
    aviso.textContent = '';
    partes.forEach(function (parte) {
      if (typeof parte === 'string') {
        aviso.appendChild(document.createTextNode(parte));
      } else {
        aviso.appendChild(parte);
      }
    });
    aviso.classList.toggle('es-error', !!esError);
    aviso.hidden = false;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var requeridos = Array.prototype.slice.call(
        form.querySelectorAll('input[required],select[required],textarea[required]')
      );
      var faltantes = [];

      requeridos.forEach(function (campo) {
        var vacio = !campo.value.trim();
        campo.classList.toggle('es-invalido', vacio);
        if (vacio) faltantes.push(campo);
      });

      if (faltantes.length) {
        mostrarAviso(['Faltan datos para poder responderte. Completá los campos marcados.'], true);
        faltantes[0].focus();
        return;
      }

      // PENDIENTE: conectar el envio a un email o servicio de formularios.
      var nombre = form.querySelector('#f-nombre').value.trim().split(' ')[0];
      var enlace = document.createElement('a');
      enlace.href = form.getAttribute('data-wa-href') || 'https://wa.me/message/MAOEZGMYQX3XD1';
      enlace.target = '_blank';
      enlace.rel = 'noopener';
      enlace.textContent = 'escribime por WhatsApp';

      mostrarAviso([
        'Gracias, ' + nombre + '. Todavía estamos conectando el envío automático del formulario. Mientras tanto, ',
        enlace,
        ' y te respondo directamente.'
      ], false);
    });

    form.addEventListener('input', function (e) {
      if (e.target.classList.contains('es-invalido') && e.target.value.trim()) {
        e.target.classList.remove('es-invalido');
      }
    });
  }
})();
