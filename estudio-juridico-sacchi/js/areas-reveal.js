/* areas-reveal: cada fila de área entra al llegar a viewport.
   La imagen se descubre de izquierda a derecha mientras se desliza;
   el texto sale desde debajo de la imagen hacia el lado opuesto. */
FX.areasReveal=function(){
  const rows=document.querySelectorAll('[data-area]');if(!rows.length)return;
  if(FX.reduced)return;
  rows.forEach(row=>{
    const ph=row.querySelector('.row-area__ph'),tx=row.querySelector('.row-area__in');
    const flip=row.classList.contains('row-area--flip');
    const dir=flip?1:-1;                       // hacia dónde escapa el texto
    gsap.set(ph,{clipPath:'inset(0 100% 0 0)',x:-70});
    gsap.set(tx,{x:dir*-1*110,opacity:0});     // arranca oculto bajo la imagen
    gsap.timeline({scrollTrigger:{trigger:row,start:'top 78%'}})
      .to(ph,{clipPath:'inset(0 0% 0 0)',x:0,duration:1.05,ease:'power3.out'})
      .to(tx,{x:0,opacity:1,duration:.9,ease:'power3.out'},.28);
  });
};
