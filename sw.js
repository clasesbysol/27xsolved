const CACHE='27xsolved-shell-v1.0.0';
const CORE=['./','./index.html','./styles-v2.css','./app.js','./config.js','./manifest.webmanifest','./assets/brand/27xsolved-logo.webp','./assets/brand/icon-192.png','./assets/brand/icon-512.png','./assets/brand/favicon-32.png','./physics-content.js','./physics-admin-guide.js','./physics-cheatsheet.js','./admin-access-fix.js','./assets/chemistry/periodic-table.json'];

self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil(
  caches.keys()
    .then(keys=>Promise.all(keys.filter(key=>(key.startsWith('cbc-x-solved-')||key.startsWith('et27-study-')||key.startsWith('27xsolved-'))&&key!==CACHE).map(key=>caches.delete(key))))
    .then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  // Red primero: conserva lo visitado para el modo offline sin fijar versiones viejas.
  event.respondWith(fetch(request,{cache:'no-store'}).then(response=>{
    if(response.ok)caches.open(CACHE).then(cache=>cache.put(request,response.clone()));
    return response;
  }).catch(async()=>{
    const cached=await caches.match(request,{ignoreSearch:true});
    if(cached)return cached;
    if(request.mode==='navigate')return caches.match('./index.html');
    return Response.error();
  }));
});
