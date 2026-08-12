// Regnisamai service worker.
// HTML documents: network-first (falls back to cache when offline) so a
// fresh deploy is never masked by a stale cached page. Static assets
// (icons, avatars, manifest, script): cache-first for speed offline.
const CACHE_NAME = 'regnisamai-v4';
const ASSETS = [
  './',
  './index.html',
  './terms.html',
  './manifest.json',
  './pro-features.js',
  './icon-192.png',
  './icon-512.png',
  './avatar-1.png',
  './avatar-2.png',
  './avatar-3.png',
  './avatar-4.png',
  './avatar-5.png',
  './avatar-6.png',
  './avatar-7.png',
  './avatar-8.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

function isHTMLRequest(request) {
  return request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html');
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (isHTMLRequest(event.request)) {
    // network-first: always try to get the latest page; fall back to cache offline
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // static assets: cache-first, update cache in the background
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
