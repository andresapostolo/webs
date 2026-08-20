/* main: inicialización. Sin intro/preloader y sin transición de página:
   el hero tiene que estar visible y clickeable de entrada. */
gsap.registerPlugin(ScrollTrigger);
FX.scroll();
FX.linkRoll();
FX.logoColor();
FX.burger();
FX.masks();
FX.counters();
FX.faq();
FX.navDrop&&FX.navDrop();
FX.calc&&FX.calc();
FX.calcArt&&FX.calcArt();
FX.aicons();
/* logo y nav: se van hacia arriba al scrollear */
(function(){
  const els=[document.querySelector('.brand'),document.querySelector('.navpanel')].filter(Boolean);
  if(!els.length)return;
  const set=y=>{const hide=y>50;els.forEach(el=>{el.style.transform=hide?'translateY(-160%)':'none';el.style.opacity=hide?'0':'1';el.style.pointerEvents=hide?'none':''})};
  if(FX.lenis)FX.lenis.on('scroll',e=>set(e.scroll));
  else window.addEventListener('scroll',()=>set(window.scrollY),{passive:true});
  set(window.scrollY);
})();
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
