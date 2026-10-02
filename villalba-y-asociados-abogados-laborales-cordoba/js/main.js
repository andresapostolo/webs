/* main: inicialización. Sin preloader: el hero debe estar visible y clickeable de entrada.
   Diferencia con la plantilla de referencia: el header (logo + teléfono + CTA + hamburguesa)
   queda fijo durante todo el scroll — no se oculta al scrollear. */
gsap.registerPlugin(ScrollTrigger);
FX.scroll();
FX.linkRoll();
FX.logoColor();
FX.burger();
FX.masks();
FX.headerScroll&&FX.headerScroll();
FX.areasReveal&&FX.areasReveal();
FX.faq&&FX.faq();
FX.form&&FX.form();
FX.backTop&&FX.backTop();
FX.pageIn&&FX.pageIn();
/* anclas internas con scroll suave */
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');if(!a)return;
  const id=a.getAttribute('href').slice(1);if(!id)return;
  const t=document.getElementById(id);if(!t)return;
  e.preventDefault();
  const wasOpen=document.body.classList.contains('menu-open');
  if(wasOpen)document.getElementById('burger').click();
  const go=()=>{
    const y=t.getBoundingClientRect().top+window.scrollY-20;
    FX.lenis?FX.lenis.scrollTo(y,{duration:1}):window.scrollTo(0,y);
  };
  wasOpen?setTimeout(go,450):go();
});
