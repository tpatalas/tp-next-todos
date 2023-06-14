const version = 'v1686729345422';
const STATIC_CACHE_NAME = `static-assets-${version}`;
const PRECACHE_URLS = [];

const isStaticAsset = (url) => /_next\/static/i.test(url);

const staleWhileRevalidate = async (event, request, cacheName, useStreamForStatic = false) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchAndUpdateCache = async () => {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) cache.put(request, networkResponse.clone());
    return networkResponse;
  };

  if (cachedResponse) {
    event.waitUntil(fetchAndUpdateCache());
    return cachedResponse;
  }

  const networkResponse = await fetchAndUpdateCache();

  if (useStreamForStatic && self.ReadableStream) {
    return new Response(
      new ReadableStream({
        async start(controller) {
          const reader = networkResponse.body.getReader();
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
            }
          } catch (error) {
            console.error('Stream error:', error);
            controller.error(error);
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
            cacheName !== STATIC_CACHE_NAME ? caches.delete(cacheName) : undefined,
          ),
        ),
      ),
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  if (isStaticAsset(url)) {
    event.respondWith(staleWhileRevalidate(event, event.request, STATIC_CACHE_NAME, true));
  }
});

self.skipWaiting();
