// Regnisamai service worker.
// HTML documents + the avatar manifest: network-first (falls back to cache
// when offline), so a fresh deploy — or a newly added avatar — is never
// masked by a stale cache. Everything else (icons, avatar images, app
// script): cache-first for speed offline.
const CACHE_NAME = 'regnisamai-v6';
const ASSETS = [
  './',
  './index.html',
  './terms.html',
  './manifest.json',
  './version.json',
  './pro-features.js',
  './icon-192.png',
  './icon-512.png',
  './avatars/manifest.json',
  './avatars/avatar-1.png',
  './avatars/avatar-2.png',
  './avatars/avatar-3.png',
  './avatars/avatar-4.png',
  './avatars/avatar-5.png',
  './avatars/avatar-6.png',
  './avatars/avatar-7.png',
  './avatars/avatar-8.png'
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

function isAvatarManifest(request) {
  return request.url.endsWith('/avatars/manifest.json');
}

function isVersionFile(request) {
  return request.url.endsWith('/version.json');
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (isHTMLRequest(event.request) || isAvatarManifest(event.request) || isVersionFile(event.request)) {
    // network-first: always check for the latest page, avatar list, or
    // version/changelog; fall back to cache offline.
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || (isHTMLRequest(event.request) ? caches.match('./index.html') : undefined)))
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
