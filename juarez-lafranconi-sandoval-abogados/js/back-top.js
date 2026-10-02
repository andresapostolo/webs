/* back-to-top: botón flotante abajo a la izquierda. El anillo SVG se va completando
   según el progreso de scroll de la página; al click vuelve arriba. */
FX.backTop=function(){
  const b=document.getElementById('backtop');if(!b)return;
  const ring=b.querySelector('.bt__pr');
  const LEN=2*Math.PI*21;
  ring.style.strokeDasharray=LEN;
  const upd=()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const p=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
    ring.style.strokeDashoffset=LEN*(1-p);
    b.classList.toggle('on',window.scrollY>window.innerHeight*.6);
  };
  upd();
  window.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd);
  b.addEventListener('click',()=>{
    FX.lenis?FX.lenis.scrollTo(0,{duration:1.1}):window.scrollTo({top:0,behavior:'smooth'});
  });
};
