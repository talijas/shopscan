const VERSION='shopscan-offline-v3';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg'];
const LIBS=[
 'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'
];
const ASSETS=[...SHELL,...LIBS];
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(VERSION);
  await cache.addAll(SHELL);
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
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin&&!LIBS.includes(url.href))return;
 event.respondWith((async()=>{
  const cache=await caches.open(VERSION);
  const hit=await cache.match(event.request);
  if(hit)return hit;
  try{
   const response=await fetch(event.request);
   if(response&&(response.ok||response.type==='opaque'))await cache.put(event.request,response.clone());
   return response;
  }catch(e){
   if(event.request.mode==='navigate')return await cache.match('./index.html')||Response.error();
   return Response.error();
  }
 })());
});
self.addEventListener('message',event=>{
 if(!['CHECK_OFFLINE','RETRY_OFFLINE'].includes(event.data?.type))return;
 const port=event.ports[0];
 event.waitUntil((async()=>{
  const cache=await caches.open(VERSION);
  let done=0,failed=0;
  for(const asset of ASSETS){
   try{
    let response=await cache.match(asset);
    if(!response&&event.data.type==='RETRY_OFFLINE'){
     response=await fetch(asset,{mode:asset.startsWith('http')?'no-cors':'same-origin',cache:'reload'});
     if(!response.ok&&response.type!=='opaque')throw Error('HTTP '+response.status);
     await cache.put(asset,response.clone());
    }
    if(response)done++;else failed++;
   }catch(e){failed++}
   port?.postMessage({type:'PROGRESS',done,total:ASSETS.length,failed,ready:false});
  }
  port?.postMessage({type:'RESULT',done,total:ASSETS.length,failed,ready:done===ASSETS.length});
 })());
});
