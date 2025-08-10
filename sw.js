const CACHE = 'viagem-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/roteiro.html',
  '/fotos.html',
  '/style.css',
  '/app.js',
  '/manifest.json'
];
self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE).then(cache => cache.addAll(assets)));
});
self.addEventListener('fetch', evt => {
  evt.respondWith(caches.match(evt.request).then(r => r || fetch(evt.request)));
});
