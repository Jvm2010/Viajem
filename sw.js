const CACHE_NAME = 'viagem-planner-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/roteiro.html',
  '/fotos.html',
  '/style.css',
  '/app_mod.js',
  '/db_api.js',
  '/ia_helper.js',
  '/firebase.js',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => 
        key !== CACHE_NAME ? caches.delete(key) : Promise.resolve()
      ))
    )
  );
});