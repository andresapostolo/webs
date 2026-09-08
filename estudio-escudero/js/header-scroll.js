/* header-scroll: el header sube y desaparece en cuanto se scrollea;
   vuelve a bajar solo cuando la página está arriba del todo. */
FX.headerScroll=function(){
  const TH=24;let last=null;
  const upd=()=>{
    const hide=window.scrollY>TH&&!document.body.classList.contains('menu-open');
    if(hide!==last){document.body.classList.toggle('hdr-hidden',hide);last=hide}
  };
  upd();
  window.addEventListener('scroll',upd,{passive:true});
  FX.lenis&&FX.lenis.on('scroll',upd);
};
