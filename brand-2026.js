// Runs before app.js and only migrates branding preferences.
(function(){
  const BLUE='#15579D';
  const legacy=new Set(['#1768ac','#0f9f9a','#007f7b','#087e79','#12579f']);
  for(const key of ['cbc-accent','27xsolved-accent']){
    try{
      const raw=localStorage.getItem(key);
      let value=raw;
      try{value=JSON.parse(raw)}catch(_){}
      if(value!=null&&legacy.has(String(value).trim().toLowerCase())){
        localStorage.setItem(key,key==='cbc-accent'?BLUE:JSON.stringify(BLUE));
      }
    }catch(_){}
  }
})();
