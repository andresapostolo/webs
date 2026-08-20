/* animated-icon (#17): cada pieza .p del SVG [data-aicon] se dibuja en secuencia. */
FX.aicons=function(){
  document.querySelectorAll('[data-aicon]').forEach(svg=>{
    const parts=svg.querySelectorAll('.p');
    parts.forEach(p=>{
      if(!p.getTotalLength)return;
      try{const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L}catch(e){}
    });
    if(FX.reduced){parts.forEach(p=>p.style.strokeDashoffset=0);return}
    gsap.to(parts,{strokeDashoffset:0,duration:.8,stagger:.15,ease:'power2.inOut',
      scrollTrigger:{trigger:svg,start:'top 85%'}});
  });
};
