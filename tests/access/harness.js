const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const {MockSupabase,ADMIN}=require('./mock');
const ROOT=process.env.ROOT||path.resolve(__dirname,'../..');
const HERE=__dirname;
const SB='https://rdfpugfthvfuqokecqwd.supabase.co';
const KEY='sb-rdfpugfthvfuqokecqwd-auth-token';
let server,port;
function serve(){return new Promise(res=>{server=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';const f=path.join(ROOT,p);fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return}const t={'.js':'text/javascript; charset=utf-8','.html':'text/html; charset=utf-8','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'}[path.extname(f)]||'application/octet-stream';r.writeHead(200,{'content-type':t});r.end(d)})}).listen(0,()=>{port=server.address().port;res(port)})})}
let browser;
async function start(){await serve();browser=await chromium.launch();return{base:`http://127.0.0.1:${port}`}}
async function stop(){await browser?.close();server?.close()}
async function context(mock,{email=null,storage={}}={}){
  const ctx=await browser.newContext({serviceWorkers:'block',viewport:{width:1280,height:900}});
  await ctx.route(/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js/,r=>r.fulfill({path:path.join(HERE,'supabase.esm.js'),contentType:'text/javascript'}));
  await ctx.route(/cdn\.jsdelivr\.net\/npm\/katex.*katex\.min\.js/,r=>r.fulfill({path:path.join(HERE,'node_modules/katex/dist/katex.min.js'),contentType:'text/javascript'}));
  await ctx.route(/cdn\.jsdelivr\.net\/npm\/katex.*\.css/,r=>r.fulfill({path:path.join(HERE,'node_modules/katex/dist/katex.min.css'),contentType:'text/css'}));
  await ctx.route(u=>u.hostname==='rdfpugfthvfuqokecqwd.supabase.co',r=>mock.handle(r));
  await ctx.route(u=>!['127.0.0.1','rdfpugfthvfuqokecqwd.supabase.co','cdn.jsdelivr.net'].includes(u.hostname),r=>r.fulfill({status:204,body:''}));
  const sess=email?mock.session(email):null;
  await ctx.addInitScript(([key,sess,storage])=>{
    try{if(location.protocol!=='http:')return;if(sessionStorage.getItem('__init'))return;sessionStorage.setItem('__init','1');}catch(_){return}
    if(sess&&!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(sess));
    for(const [k,v] of Object.entries(storage))localStorage.setItem(k,v);
  },[KEY,sess,storage]);
  const errors=[];
  ctx.on('weberror',e=>errors.push(String(e.error())));
  ctx.errors=errors;
  return ctx;
}
async function page(ctx,url){const p=await ctx.newPage();p.on('pageerror',e=>ctx.errors.push('pageerror: '+e.message));await p.goto(url,{waitUntil:'load'});await p.waitForFunction(()=>window.ET27Access?.loaded===true,null,{timeout:15000}).catch(()=>{});await p.waitForTimeout(400);return p}
let passed=0,failed=0;const results=[];
async function test(name,fn){try{await fn();passed++;results.push(['ok',name]);console.log('  ✓',name)}catch(e){failed++;results.push(['FAIL',name,e.message]);console.log('  ✗',name,'\n     ',e.message.split('\n').slice(0,6).join('\n      '))}}
function assert(c,m){if(!c)throw new Error(m||'assertion failed')}
module.exports={start,stop,context,page,test,assert,MockSupabase,ADMIN,KEY,SB,summary:()=>({passed,failed,results})};
