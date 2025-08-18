const CACHE_NAME = 'nowshowing-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
];

// Don't cache images or external resources aggressively
const EXCLUDED_PATTERNS = [
  /\.(jpg|jpeg|png|gif|webp|svg)$/i,
  /https:\/\//,
  /data:/,
  /blob:/
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Skip caching for images and external resources
  if (EXCLUDED_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});


