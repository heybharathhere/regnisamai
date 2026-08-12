// Regnisamai service worker — cache-first with network fallback + update.
const CACHE_NAME = "regnisamai-v1";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./terms.html",
  "./manifest.json",
  "./pro-features.js",
  "./icon-192.png",
  "./icon-512.png",
  "./avatar-1.png",
  "./avatar-2.png",
  "./avatar-3.png",
  "./avatar-4.png",
  "./avatar-5.png",
  "./avatar-6.png",
  "./avatar-7.png",
  "./avatar-8.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
