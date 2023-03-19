import { STORAGE_KEY } from '@data/dataTypesConst';
import { TypesAtomEffect, TypesMediaQueryEffect, TypesSessionStorageEffect } from '@lib/types';
import { delSessionStorage, getSessionStorage, setSessionStorage } from '@states/utils';

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
  ({ queryKey, shouldGet, isSessionSetEnabled, isSessionResetEnabled }) =>
  ({ onSet, resetSelf, setSelf, trigger }) => {
    const storageKey = queryKey as STORAGE_KEY;
    const session = getSessionStorage(storageKey);

    if (trigger === 'get' && (shouldGet ?? true)) {
      setSelf(session);
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        resetSelf();
        isSessionResetEnabled && delSessionStorage(storageKey);
        return;
      }
      setSelf(newValue);
      isSessionSetEnabled && setSessionStorage(storageKey, newValue);
    });
  };
