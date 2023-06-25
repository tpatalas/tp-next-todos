import { sanitize } from '@stateLogics/utils';
import { useEffect } from 'react';
import validator from 'validator';

export const ServiceWorkerRegister = () => {
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('/service-worker.js');

          const PREFETCH_URLS: string[] = [];
          const PRECACHE_URLS: string[] = [];

          const sanitizeAndValidateUrl = (url: string) => {
            const sanitizedUrl = sanitize(url);
            return validator.isURL(sanitizedUrl) ? sanitizedUrl : null;
          };

          const validPrefetchUrls = PREFETCH_URLS.map(sanitizeAndValidateUrl).filter(Boolean);
          const validPrecacheUrls = PRECACHE_URLS.map(sanitizeAndValidateUrl).filter(Boolean);

          navigator.serviceWorker.ready.then((registration) => {
            if (registration.active) {
              registration.active.postMessage({
                action: 'startPrefetching',
                prefetchUrls: validPrefetchUrls,
                precacheUrls: validPrecacheUrls,
              });
            }
          });
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    registerServiceWorker();
  }, []);

  return null;
};
