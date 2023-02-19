import { TypesLocalStorageEffect } from '@lib/types';

export const localStorageEffects: TypesLocalStorageEffect =
  ({
    isLocalStorageOnMount,
    isLocalStorageSetOnBlur,
    isLocalStorageSetOnBeforeUnload,
    storageKey,
    storageValue,
    storageUpdateDelayOnBlur, // 10 mins default
  }) =>
  ({ setSelf, onSet, trigger }) => {
    if (typeof window === 'undefined') return;

    let blurTimeout: ReturnType<typeof setTimeout> | null;

    const localStorageSync = () => {
      const value = storageValue();
      setSelf(JSON.parse(value));
      localStorage.setItem(storageKey, JSON.stringify(value));
    };

    const localStorageSyncOnBlur = () => {
      blurTimeout = setTimeout(() => {
        localStorageSync();
      }, storageUpdateDelayOnBlur ?? 600000); // 10 mins delay as default
    };

    const localStorageSyncOnFocus = () => {
      if (blurTimeout) {
        clearTimeout(blurTimeout);
        blurTimeout = null;
      }
    };

    // isLocalStorageOnMount: true then get new value. if storageValue is static, the value will be same
    // isLocalStorageOnMount: false then get stored value from localStorage
    if (trigger === 'get') {
      const localStorageValue = localStorage.getItem(storageKey);
      const localStorageAsValue = localStorageValue && setSelf(JSON.parse(localStorageValue));
      isLocalStorageOnMount ? localStorageSync() : localStorageAsValue;
    }

    onSet((newValue, _, isReset) => {
      if (isReset) return localStorage.removeItem(storageKey);
      localStorage.setItem(storageKey, JSON.stringify(newValue));
      setSelf(newValue);
    });

    if (isLocalStorageSetOnBlur) {
      window.addEventListener('focus', localStorageSyncOnFocus);
      window.addEventListener('blur', localStorageSyncOnBlur);
    }
    isLocalStorageSetOnBeforeUnload && window.addEventListener('beforeunload', localStorageSync);
    return () => {
      if (isLocalStorageSetOnBlur) {
        window.removeEventListener('focus', localStorageSyncOnFocus);
        window.removeEventListener('blur', localStorageSyncOnBlur);
      }
      isLocalStorageSetOnBeforeUnload && window.removeEventListener('beforeunload', localStorageSync);
    };
  };
