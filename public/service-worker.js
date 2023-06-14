const version = 'v1686609637233';
const IMAGE_CACHE_NAME = `image-assets-${version}`;
const STATIC_CACHE_NAME = `static-assets-${version}`;
const PRECACHE_URLS = [];

const isImageAsset = (url) => /\.(jpg|png|gif|webp|avif)$/i.test(url);
const isStaticAsset = (url) => /_next\/static/i.test(url);

const staleWhileRevalidate = async (event, request, cacheName, useStreamForStatic = false) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchAndUpdateCache = async () => {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  };

  if (cachedResponse) {
    event.waitUntil(fetchAndUpdateCache());
    return cachedResponse;
  }

  const networkResponse = await fetchAndUpdateCache();

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
  event.waitUntil(caches.open(STATIC_CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) =>
            cacheName !== IMAGE_CACHE_NAME && cacheName !== STATIC_CACHE_NAME
              ? caches.delete(cacheName)
              : undefined,
          ),
        ),
      ),
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  if (isImageAsset(url)) {
    event.respondWith(staleWhileRevalidate(event, event.request, IMAGE_CACHE_NAME));
  } else if (isStaticAsset(url)) {
    event.respondWith(staleWhileRevalidate(event, event.request, STATIC_CACHE_NAME, true));
  }
});

self.skipWaiting();
