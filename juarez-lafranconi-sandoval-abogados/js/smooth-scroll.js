/* smooth-scroll: Lenis + sincronización con ScrollTrigger (#7). */
window.FX={reduced:matchMedia('(prefers-reduced-motion:reduce)').matches};
FX.scroll=function(){
  if(FX.reduced||!window.Lenis)return;
  const l=new Lenis({lerp:.11});FX.lenis=l;
  l.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(t=>l.raf(t*1000));
  gsap.ticker.lagSmoothing(0);
};
