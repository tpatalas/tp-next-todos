import { useEffect } from 'react';

export const ServiceWorkerRegister = () => {
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('/service-worker.js');
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };
    registerServiceWorker();
  }, []);

  return null;
};
