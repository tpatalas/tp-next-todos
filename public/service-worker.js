const version = 'v1687719235564';
const STATIC_CACHE_NAME = `static-assets-${version}`;
const PRE_CACHE_NAME = `precache-assets-${version}`;
const PRE_FETCH = []; //fetch only. It will use browser cache without Cache Storage
const PRE_CACHE = []; // fetch and cache into Cache Storage without browser cache.

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
  const cacheResources = async () => {
    const preCache = PRE_CACHE.length > 0;
    const preFetch = PRE_FETCH.length > 0;

    if (preCache || preFetch) {
      const cache = await caches.open(PRE_CACHE_NAME);

      if (preCache) {
        await cache.addAll(PRE_CACHE);
      }

      if (preFetch) {
        await Promise.all(
          PRE_FETCH.map((url) =>
            fetch(url).then((response) => {
              if (response.ok) cache.put(url, response);
            }),
          ),
        );
      }
    }
  };

  event.waitUntil(cacheResources());
});

self.addEventListener('activate', (event) => {
  const allowedCacheNames = [STATIC_CACHE_NAME, PRE_CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!allowedCacheNames.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
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
