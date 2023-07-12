import { serviceWorkerPath } from '@serviceWorker/serviceWorker.consts';
import { useEffect } from 'react';

export const ServiceWorkerRegister = () => {
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register(serviceWorkerPath);
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };
    registerServiceWorker();
  }, []);

  return null;
};
