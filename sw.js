const VERSION='shopscan-offline-v2';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg'];
const LIBS=["https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js", "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"];
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(VERSION);
  await cache.addAll(SHELL);
  await Promise.allSettled(LIBS.map(async url=>{
    const response=await fetch(url,{mode:'no-cors',cache:'reload'});
    await cache.put(url,response);
  }));
  await self.skipWaiting();
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith('shopscan-offline-')&&k!==VERSION).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 const sameOrigin=url.origin===self.location.origin;
 const isLibrary=LIBS.includes(url.href);
 if(!sameOrigin&&!isLibrary)return;
 event.respondWith((async()=>{
  const cache=await caches.open(VERSION);
  const cached=await cache.match(request);
  if(cached)return cached;
  try{
   const response=await fetch(request);
   if(response && (response.ok||response.type==='opaque'))await cache.put(request,response.clone());
   return response;
  }catch(e){
   if(request.mode==='navigate')return await cache.match('./index.html')||Response.error();
   return Response.error();
  }
 })());
});
self.addEventListener('message',event=>{
 if(event.data?.type!=='CHECK_OFFLINE')return;
 event.waitUntil((async()=>{
  const cache=await caches.open(VERSION);
  const checks=await Promise.all([...SHELL,...LIBS].map(x=>cache.match(x)));
  event.ports[0]?.postMessage({ready:checks.every(Boolean)});
 })());
});
