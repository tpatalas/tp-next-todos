const version = 'v1686609637233';
const IMAGE_CACHE_NAME = `image-assets-${version}`;
const STATIC_CACHE_NAME = `static-assets-${version}`;
const PRECACHE_URLS = []; // list the urls to pre-cache

const isImageAsset = (url) => /\.(jpg|png|gif|webp|avif)$/i.test(url);
const isStaticAsset = (url) => /_next\/static/i.test(url);

const cacheAsset = async (request, cacheName, useStreamForStatic = false) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) return cachedResponse;

  const networkResponse = await fetch(request);
  cache.put(request, networkResponse.clone());

  if (useStreamForStatic && cacheName === STATIC_CACHE_NAME) {
    return new Response(
      new ReadableStream({
        async start(controller) {
          const reader = networkResponse.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
              break;
            }
            controller.enqueue(value);
          }
        },
      }),
    );
  }
  return networkResponse;
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE_NAME);
      await cache.addAll(PRECACHE_URLS);
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== IMAGE_CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  if (isImageAsset(url)) {
    event.respondWith(cacheAsset(event.request, IMAGE_CACHE_NAME));
  } else if (isStaticAsset(url)) {
    event.respondWith(cacheAsset(event.request, STATIC_CACHE_NAME, true));
  }
});

self.skipWaiting();
