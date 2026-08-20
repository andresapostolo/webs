/* counters (#13): <span data-count="900">0</span> cuenta al entrar en viewport. */
FX.counters=function(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const end=+el.dataset.count;
    if(FX.reduced){el.textContent=end;return}
    const o={v:0};
    gsap.to(o,{v:end,duration:1.6,ease:'power2.out',
      scrollTrigger:{trigger:el,start:'top 85%'},
      onUpdate(){el.textContent=Math.round(o.v)}});
  });
};
