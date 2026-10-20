const CACHE='27xsolved-shell-v1.3.0';
const CORE=['./home-2026.css','./home-2026.js','./student-cloud.js','./admin-activity.js','./boot-splash.js','./quimica-general-4-cinetica.js','./procesos-u5-theory.js','./procesos-u5-theory.css','./assets/procesos/entropia/maquina-vapor-commons.webp','./','./index.html','./bienvenida.html','./styles-v2.css','./ui-refresh.css','./brand-2026.css','./brand-2026.js','./ui-refresh.js','./academic-plan.css','./academic-catalog.js','./academic-plan.js','./access-tree.js','./access-control.js','./admin-access.js','./materia.html','./quimica-general.html','./fisica-aplicada.html','./fisica-formulas-a4.html','./materia.css','./materia-v2.css','./materia.js','./matematica-1-inicio.html','./matematica-1-examen-1.html','./matematica-1.html','./matematica-1-previas.css','./matematica-1-previas.js','./procesos-u4-content-1.js','./procesos-u4-content-2.js','./procesos-u4-content-3.js','./procesos-u4-evaluations.js','./procesos-u4-evaluations-ui.js','./procesos-u4-ui.js','./procesos-u4-clean-render.js','./app.js','./config.js','./manifest.webmanifest','./assets/brand/27xsolved-logo.jpg','./assets/brand/27xsolved-logo-small.jpg','./assets/brand/27xsolved-logo.webp','./assets/brand/icon-192.png','./assets/brand/icon-512.png','./assets/brand/icon-maskable-512.png','./assets/brand/apple-touch-icon.png','./assets/brand/favicon-32.png','./physics-content.js','./physics-admin-guide.js','./physics-admin-guide-access-fix.js','./physics-model-evaluations.js','./physics-model-admin-deep.js','./physics-evaluations-ux-fix.js','./physics-cheatsheet.js','./study-kit.js','./study-topics.css','./hidrodinamica-content.js','./quimica-general-4-content.js','./quimica-inorganica-4-kit.js','./quimica-inorganica-4-teoria-1.js','./quimica-inorganica-4-teoria-2.js','./quimica-inorganica-4-tp4.js','./quimica-inorganica-4-tp5.js','./quimica-inorganica-4-elementos.js','./quimica-inorganica-4-evaluaciones.js','./quimica-inorganica-4-tp-previos.js','./quimica-inorganica-4-teoria-uniones.js','./quimica-inorganica-4-tp6.js','./quimica-inorganica-4-teoria-atomo.js','./quimica-inorganica-4-teoria-fuerzas.js','./quimica-cualitativa-5.css','./quimica-cualitativa-5-kit.js','./quimica-cualitativa-5-acidobase-1.js','./quimica-cualitativa-5-acidobase-2.js','./quimica-cualitativa-5-buffer.js','./quimica-cualitativa-5-precipitacion.js','./quimica-cualitativa-5-redox.js','./quimica-cualitativa-5-complejos.js','./quimica-cualitativa-5-maestra.js','./quimica-cualitativa-5-ej-ab1.js','./quimica-cualitativa-5-ej-ab2.js','./quimica-cualitativa-5-ej-ab3.js','./quimica-cualitativa-5-ej-buffer.js','./quimica-cualitativa-5-ej-complejos.js','./quimica-cualitativa-5-ej-prec.js','./quimica-cualitativa-5-ej-redox.js','./quimica-cualitativa-5-clase-1.js','./quimica-cualitativa-5-clase-2.js','./quimica-cualitativa-5-guias.js','./quimica-cualitativa-5-sol-kit.js','./quimica-cualitativa-5-sol-g1.js','./quimica-cualitativa-5-sol-g2.js','./quimica-cualitativa-5-sol-g3a.js','./quimica-cualitativa-5-sol-g3b.js','./quimica-cualitativa-5-sol-g4a.js','./quimica-cualitativa-5-sol-g4b.js','./quimica-cualitativa-5-machete.js','./quimica-cualitativa-5-orden.js','./assets/quimica-cualitativa/guia2-ej14-diagramas.webp','./assets/quimica-cualitativa/e5-diagrama-fosforico.webp','./assets/chemistry/periodic-table.json','./procesos-u5-content.js','./procesos-u5-ui.js','./procesos-u5.css','./assets/procesos/entropia/maquina-termica.webp','./assets/procesos/entropia/refrigeracion-motor.webp','./assets/procesos/entropia/guia-original.pdf','./assets/procesos/entropia/pagina-1.webp','./assets/procesos/entropia/pagina-2.webp','./assets/procesos/entropia/pagina-3.webp','./assets/procesos/entropia/pagina-4.webp'];

self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())
));
const cleanup=()=>caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith('cbc-x-solved-')||key.startsWith('et27-study-')||key.startsWith('27xsolved-'))&&key!==CACHE).map(key=>caches.delete(key))));
self.addEventListener('activate',event=>event.waitUntil(
  cleanup()
    .then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  event.waitUntil(cleanup());

  event.respondWith(fetch(request,{cache:'no-store'}).then(response=>{
    if(response.ok)caches.open(CACHE).then(cache=>cache.put(request,response.clone()));
    return response;
  }).catch(async()=>{
    const cached=await (await caches.open(CACHE)).match(request,{ignoreSearch:true});
    if(cached)return cached;
    if(request.mode==='navigate')return caches.match('./index.html');
    return Response.error();
  }));
});

