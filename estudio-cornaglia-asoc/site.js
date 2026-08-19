/* SERRA & MONTIEL — site.js
   Módulos: reduced / observer (reveals) / letters / accordions / parallax / menu / pageFade.
   Todo CSS-driven: el JS solo pone data-is-active o clases. Sin librerías. */
(function(){
'use strict';
var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) document.documentElement.classList.add('reduced');

/* letters — envuelve cada carácter de [data-letters] en <span> con delay incremental.
   data-letters-step (s, default .06) · las letras dentro de <b class="stroke"> conservan la clase. */
function letters(){
  document.querySelectorAll('[data-letters]').forEach(function(el){
    var step = parseFloat(el.dataset.lettersStep || .06), idx = 0;
    function wrap(node){
      if (node.nodeType === 3){
        var frag = document.createDocumentFragment(), word = null;
        node.textContent.split('').forEach(function(ch){
          var s = document.createElement('span');
          s.textContent = ch;
          s.style.transitionDelay = (idx++ * step) + 's';
          if (ch === ' '){                       // el espacio queda suelto: único punto de corte de línea
            s.style.whiteSpace = 'pre';
            frag.appendChild(s); word = null;
          } else {                                // letras de una palabra van en un wrapper nowrap (no se corta a la mitad)
            if (!word){ word = document.createElement('span'); word.className = 'lw'; frag.appendChild(word); }
            word.appendChild(s);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1){ Array.prototype.slice.call(node.childNodes).forEach(wrap); }
    }
    Array.prototype.slice.call(el.childNodes).forEach(wrap);
    el.classList.add('letters');
  });
}

/* observer — pone data-is-active="true" al entrar en viewport (una sola vez) */
function observer(){
  var els = document.querySelectorAll('[data-reveal],[data-reveal-group],.letters,.curtain,.banner .tab');
  if (!('IntersectionObserver' in window) || reduced){
    els.forEach(function(e){ e.setAttribute('data-is-active','true'); }); return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){ en.target.setAttribute('data-is-active','true'); io.unobserve(en.target); }
    });
  }, { threshold: .18, rootMargin: '0px 0px -6% 0px' });
  els.forEach(function(e){ io.observe(e); });
}

/* accordions — height 0 → real con transition */
function accordions(){
  document.querySelectorAll('.acc-item').forEach(function(item){
    var head = item.querySelector('.acc-head'), body = item.querySelector('.acc-body');
    body.style.height = '0px';
    head.setAttribute('aria-expanded','false');
    head.addEventListener('click', function(){
      var open = item.classList.toggle('open');
      head.setAttribute('aria-expanded', open);
      body.style.height = open ? body.scrollHeight + 'px' : '0px';
      if (open) body.addEventListener('transitionend', function h(){ if(item.classList.contains('open')) body.style.height='auto'; body.removeEventListener('transitionend',h); });
      else { body.style.height = body.scrollHeight + 'px'; requestAnimationFrame(function(){ body.style.height = '0px'; }); }
    });
  });
}

/* parallax — leve, sobre .bimg y .zz .img .ph-img */
function parallax(){
  if (reduced) return;
  var els = document.querySelectorAll('.banner .bimg, .zz .img .ph-img');
  if (!els.length) return;
  var ticking = false;
  function update(){
    ticking = false;
    var vh = innerHeight;
    els.forEach(function(el){
      var r = el.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = (r.top + r.height/2 - vh/2) / vh; // -0.5..0.5
      el.style.transform = 'translateY(' + (p * -30) + 'px)';
    });
  }
  addEventListener('scroll', function(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }, { passive:true });
  update();
}

/* menu overlay */
function menu(){
  var btn = document.getElementById('mbtn');
  if (!btn) return;
  btn.addEventListener('click', function(){
    var open = document.body.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', open);
  });
}

/* pageFade — cover que se retira al cargar y cubre al navegar */
function pageFade(){
  requestAnimationFrame(function(){ document.documentElement.classList.add('loaded'); });
  if (reduced) return;
  document.querySelectorAll('a[href$=".html"]').forEach(function(a){
    a.addEventListener('click', function(e){
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      document.documentElement.classList.add('leaving');
      setTimeout(function(){ location.href = a.href; }, 700);
    });
  });
  addEventListener('pageshow', function(e){ if (e.persisted) document.documentElement.classList.remove('leaving'); });
}

addEventListener('DOMContentLoaded', function(){
  letters(); observer(); accordions(); parallax(); menu(); pageFade();
});
})();
