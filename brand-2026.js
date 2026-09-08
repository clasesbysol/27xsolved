// 27xSOLved · migración suave al color principal del nuevo logo.
(function(){
  const BRAND_BLUE='#12579f';
  const LEGACY_DEFAULTS=new Set(['#1768ac','#0f9f9a']);

  try{
    const direct=localStorage.getItem('cbc-accent');
    let stored=null;
    try{stored=JSON.parse(localStorage.getItem('27xsolved-accent')||'null')}catch(_){stored=null}
    const current=direct||stored;
    if(!current||LEGACY_DEFAULTS.has(String(current).toLowerCase())){
      localStorage.setItem('cbc-accent',BRAND_BLUE);
      localStorage.setItem('27xsolved-accent',JSON.stringify(BRAND_BLUE));
    }
  }catch(_){}

  function retargetBrandSwatch(){
    document.querySelectorAll('[data-color="#1768ac"]').forEach(button=>{
      button.dataset.color=BRAND_BLUE;
      button.style.setProperty('--sw',BRAND_BLUE);
      button.setAttribute('aria-label',`Elegir color ${BRAND_BLUE}`);
    });
  }

  if(document.documentElement){
    new MutationObserver(retargetBrandSwatch).observe(document.documentElement,{childList:true,subtree:true});
  }
  document.addEventListener('DOMContentLoaded',retargetBrandSwatch);
})();
