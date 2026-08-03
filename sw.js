const CACHE='libreta-v17-1-final-build-1';
const ASSETS=[
  './','./index.html','./assets/css/app.css','./manifest.webmanifest','./escudo_sarapiqui_v17.png',
  './assets/icons/icon-192.png','./assets/icons/icon-512.png',
  './assets/icons/icon-maskable-192.png','./assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png','./assets/icons/favicon-48.png'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
    return response;
  }).catch(()=>event.request.mode==='navigate'?caches.match('./index.html'):undefined)));
});
