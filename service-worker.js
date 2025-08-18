const CACHE_NAME = 'nowshowing-v4';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
];

// Don't cache external images or API responses
const EXCLUDED_PATTERNS = [
  /\.(jpg|jpeg|png|gif|webp|svg)$/i,
  /https:\/\//,
  /data:/,
  /blob:/,
  /omdbapi\.com/,
  /gnews\.io/
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
    // For excluded patterns, just fetch from network without caching
    event.respondWith(fetch(request));
    return;
  }

  // For other resources, use cache-first strategy
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

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_IMAGE_CACHE') {
    // Clear any cached image responses
    event.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }))
      )
    );
  }
});


