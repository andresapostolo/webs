/* nav-drop: el dropdown de Accidentes abre por hover (CSS) y por click/tap. */
FX.navDrop=function(){
  document.querySelectorAll('.ndrop').forEach(d=>{
    const b=d.querySelector('.ndrop__b');
    b.addEventListener('click',e=>{
      e.stopPropagation();
      const open=d.classList.toggle('is-open');
      b.setAttribute('aria-expanded',open?'true':'false');
    });
    d.addEventListener('keydown',e=>{if(e.key==='Escape'){d.classList.remove('is-open');b.setAttribute('aria-expanded','false');b.blur()}});
  });
  document.addEventListener('click',()=>{
    document.querySelectorAll('.ndrop.is-open').forEach(d=>{d.classList.remove('is-open');d.querySelector('.ndrop__b').setAttribute('aria-expanded','false')});
  });
};
