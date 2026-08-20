/* masks: revelados por máscara ([data-mask]) y fades ([data-fade]).
   Diferencia con la plantilla corporativa: el hero entra en ~.45s, sin intro previa
   ni coreografía por letra. El mensaje y el botón se ven al instante. */
FX.masks=function(){
  const rd=FX.reduced;
  document.querySelectorAll('[data-mask]').forEach(el=>{
    const s=document.createElement('span');s.className='mask__in';
    while(el.firstChild)s.appendChild(el.firstChild);
    el.appendChild(s);el.classList.add('mask');
  });
  FX.pageIn=function(){
    const h=document.querySelectorAll('[data-hero] .mask__in');
    if(!h.length||rd)return;
    gsap.fromTo(h,{yPercent:105},{yPercent:0,duration:.45,stagger:.045,ease:'power3.out'});
  };
  document.querySelectorAll('.mask').forEach(el=>{
    if(el.closest('[data-hero]')||rd)return;
    gsap.fromTo(el.querySelector('.mask__in'),{yPercent:110},{yPercent:0,duration:.8,ease:'power4.out',
      scrollTrigger:{trigger:el,start:'top 88%'}});
  });
  document.querySelectorAll('[data-fade]').forEach(el=>{
    if(rd)return;
    gsap.fromTo(el,{y:24,opacity:0},{y:0,opacity:1,duration:.6,ease:'power2.out',delay:(+el.dataset.fade||0)*.08,
      scrollTrigger:{trigger:el,start:'top 90%'}});
  });
};
