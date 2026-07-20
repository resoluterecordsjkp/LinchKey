// LinchKey build: 2026-07-19 / Contest PWA v1.0.1
const CACHE='linchkey-contest-v1-0-2';
const ASSETS=['./','index.html','styles.css','app.js','config.json','manifest.webmanifest','modules.json','linchkey-logo.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request))));
