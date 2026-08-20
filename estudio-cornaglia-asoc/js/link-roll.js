/* link-roll (#3): agregá class="roll" a cualquier link de texto. */
FX.linkRoll=function(){
  document.querySelectorAll('.roll').forEach(a=>{
    const t=a.textContent.trim();
    a.innerHTML='<span class="roll__b"><span>'+t+'</span><span aria-hidden="true">'+t+'</span></span>';
  });
};
