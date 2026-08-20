/* logo-color-observer (#2): data-logo-color="white|black" en cualquier sección. */
FX.logoColor=function(){
  const b=document.querySelector('.brand');if(!b)return;
  document.querySelectorAll('[data-logo-color]').forEach(s=>{
    ScrollTrigger.create({trigger:s,start:'top 9%',end:'bottom 9%',
      onToggle(self){if(self.isActive){b.dataset.color=s.dataset.logoColor;document.body.dataset.nav=s.dataset.logoColor}}});
  });
};
