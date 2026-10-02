/* contact-form: validación mínima nativa + confirmación en pantalla.
   No hay backend en esta etapa: al enviar se reemplaza el formulario por el mensaje. */
FX.form=function(){
  const f=document.getElementById('form-consulta');if(!f)return;
  const ok=document.getElementById('form-ok');
  f.addEventListener('submit',e=>{
    e.preventDefault();
    if(!f.reportValidity())return;
    f.hidden=true;ok.hidden=false;
    if(!FX.reduced)gsap.fromTo(ok,{y:18,opacity:0},{y:0,opacity:1,duration:.5,ease:'power2.out'});
  });
};
