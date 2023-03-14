import { del, get, set } from '@lib/dataConnections/indexedDB';
import { TypesAtomEffect, TypesMediaQueryEffect, TypesSessionStorageEffect } from '@lib/types';

/**
 * Media Queries
 */
export const mediaQueryEffect: TypesMediaQueryEffect =
  ({ breakpoint, isStateOverBreakpoint, isStateUnderBreakpoint }) =>
  ({ setSelf }) => {
    if (typeof window === 'undefined') return;
    const windowMediaQueries = () => {
      if (window.innerWidth >= breakpoint && typeof isStateOverBreakpoint !== 'undefined')
        return setSelf(isStateOverBreakpoint);
      if (window.innerWidth <= breakpoint && typeof isStateUnderBreakpoint !== 'undefined')
        return setSelf(isStateUnderBreakpoint);
    };

    windowMediaQueries();
    window.addEventListener('resize', windowMediaQueries);
    return () => {
      window.removeEventListener('resize', windowMediaQueries);
    };
  };

/**
 * Network
 */
export const networkStatusEffect: TypesAtomEffect<boolean> = ({ setSelf }) => {
  if (typeof window === 'undefined') return;
  const netWorkOnChange = () => {
    if (!navigator.onLine) return setSelf(false);
    setSelf(true);
  };
  window.addEventListener('online', netWorkOnChange);
  window.addEventListener('offline', netWorkOnChange);
  return () => {
    window.removeEventListener('online', netWorkOnChange);
    window.removeEventListener('offline', netWorkOnChange);
  };
};

export const sessionEffect: TypesSessionStorageEffect =
  ({ queryKey, shouldGet, storeName }) =>
  ({ onSet, resetSelf, setSelf, trigger }) => {
    const session = sessionStorage.getItem(queryKey);

    if (trigger === 'get' && (shouldGet ?? true)) {
      setSelf(get(storeName, queryKey).then((value) => (value != null ? value : session && JSON.parse(session))));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        resetSelf();
        sessionStorage.removeItem(queryKey);
        del(storeName, queryKey);
        return;
      }
      setSelf(newValue);
      sessionStorage.setItem(queryKey, JSON.stringify(newValue));
      set(storeName, queryKey, newValue);
    });
  };
