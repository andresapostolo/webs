/* faq: acordeón sobre <details>. Funciona sin JS; el JS solo suma la altura animada
   y cierra el resto al abrir uno. */
FX.faq=function(){
  const items=[...document.querySelectorAll('.faq__it')];
  if(!items.length)return;
  items.forEach(d=>{
    const body=d.querySelector('.faq__a');
    d.querySelector('summary').addEventListener('click',e=>{
      e.preventDefault();
      const open=d.open;
      if(!open){
        items.forEach(o=>{if(o!==d&&o.open)close(o)});
        d.open=true;
        if(FX.reduced)return;
        gsap.fromTo(body,{height:0,opacity:0},{height:'auto',opacity:1,duration:.4,ease:'power2.out',
          onComplete(){gsap.set(body,{height:'auto'});ScrollTrigger.refresh()}});
      }else close(d);
    });
  });
  function close(d){
    const body=d.querySelector('.faq__a');
    if(FX.reduced){d.open=false;return}
    gsap.to(body,{height:0,opacity:0,duration:.28,ease:'power2.in',onComplete(){d.open=false;gsap.set(body,{height:'auto'});ScrollTrigger.refresh()}});
  }
};
