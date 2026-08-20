/* burger-menu (#5): morfea a X y abre overlay negro con stagger. */
FX.burger=function(){
  const btn=document.getElementById('burger'),m=document.getElementById('menu');
  if(!btn||!m)return;let open=false;
  const items=m.querySelectorAll('.menu__stagger');
  gsap.set(m,{y:0,yPercent:-100,visibility:'visible'});
  const D=FX.reduced?0:1;
  btn.addEventListener('click',()=>{
    open=!open;
    btn.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open);
    btn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
    document.body.classList.toggle('menu-open',open);
    if(open){
      FX.lenis&&FX.lenis.stop();
      gsap.to(m,{yPercent:0,duration:.6*D,ease:'power3.inOut'});
      gsap.fromTo(items,{y:40*D,opacity:0},{y:0,opacity:1,duration:.5*D,stagger:.06*D,delay:.3*D,ease:'power2.out'});
    }else{
      FX.lenis&&FX.lenis.start();
      gsap.to(m,{yPercent:-100,duration:.5*D,ease:'power3.inOut'});
    }
  });
};
