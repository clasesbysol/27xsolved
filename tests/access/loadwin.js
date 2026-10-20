const vm=require('vm'),fs=require('fs'),path=require('path');
module.exports=function(files,root=path.resolve(__dirname,'../..')){const win={};const doc={querySelector(){return null},querySelectorAll(){return[]},addEventListener(){},readyState:'complete',documentElement:{dataset:{},classList:{add(){},remove(){}}},getElementById(){return null},createElement(){return{style:{}}},head:{appendChild(){}}};
const ctx={window:win,document:doc,localStorage:{getItem(){return null},length:0,key(){return null}},console,setTimeout(){},setInterval(){},location:{search:'',href:'http://x/',pathname:'/'},URLSearchParams,URL,navigator:{},CustomEvent:function(){},MutationObserver:function(){return{observe(){}}},requestAnimationFrame(){}};
ctx.self=win;vm.createContext(ctx);
for(const f of files){try{vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f})}catch(e){console.error('ERR',f,e.message)}}
return Object.assign(win,ctx.window);}
module.exports.indexFiles=function(root=path.resolve(__dirname,'../..')){return [...fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script src="\.\/([^"?]+)/g)].map(m=>m[1]).filter(f=>!/^(app|boot-splash|ui-refresh|home-2026|admin-activity|academic-plan|student-cloud|access-control|admin-access|physics-(admin|model|evaluations|cheatsheet)[^]*)\.js$/.test(f))}
