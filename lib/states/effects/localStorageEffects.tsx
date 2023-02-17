import { TypesLocalStorageEffect } from '@lib/types';

export const localStorageEffects: TypesLocalStorageEffect =
  ({
    isLocalStorageOnMount,
    isLocalStorageSetOnFocus,
    isLocalStorageSetOnBlur,
    isLocalStorageSetOnBeforeUnload,
    storageKey,
    storageValue,
  }) =>
  ({ setSelf, onSet, trigger }) => {
    if (typeof window === 'undefined') return;

    const localStorageSync = () => {
      const value = storageValue();
      setSelf(JSON.parse(value));
      localStorage.setItem(storageKey, JSON.stringify(value));
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

    isLocalStorageSetOnFocus && window.addEventListener('focus', localStorageSync);
    isLocalStorageSetOnBlur && window.addEventListener('blur', localStorageSync);
    isLocalStorageSetOnBeforeUnload && window.addEventListener('beforeunload', localStorageSync);
    return () => {
      isLocalStorageSetOnFocus && window.removeEventListener('focus', localStorageSync);
      isLocalStorageSetOnBlur && window.removeEventListener('blur', localStorageSync);
      isLocalStorageSetOnBeforeUnload && window.removeEventListener('beforeunload', localStorageSync);
    };
  };
