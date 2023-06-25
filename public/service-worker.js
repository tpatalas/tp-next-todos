const version = 'v1687719235564';
const STATIC_CACHE_NAME = `static-assets-${version}`;
const PRE_CACHE_NAME = `precache-assets-${version}`;
const PRECACHE_AT_INSTALL = [];
// Precache URL will be cached by Cache Storage only
// This precache runs right after installing service worker.

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

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'startPrefetching') {
    const { prefetchUrls, precacheUrls } = event.data;

    if (prefetchUrls && prefetchUrls.length > 0) {
      prefetchUrls.forEach(async (url) => {
        try {
          await fetch(url);
        } catch (error) {
          console.error('Error prefetching:', error);
        }
      });
    }

    if (precacheUrls && precacheUrls.length > 0) {
      caches.open(PRE_CACHE_NAME).then((cache) => cache.addAll(precacheUrls));
    }
  }
});

self.addEventListener('install', (event) => {
  if (PRECACHE_AT_INSTALL && PRECACHE_AT_INSTALL.length > 0) {
    event.waitUntil(caches.open(PRE_CACHE_NAME).then((cache) => cache.addAll(PRECACHE_AT_INSTALL)));
  }
});

self.addEventListener('activate', (event) => {
  const allowedCacheNames = [STATIC_CACHE_NAME, PRE_CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => !allowedCacheNames.includes(cacheName))
            .map((cacheName) => caches.delete(cacheName)),
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
