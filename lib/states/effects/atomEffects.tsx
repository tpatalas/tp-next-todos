import { TypesAtomEffect, TypesMediaQueryEffect, TypesSessionStorageEffect } from '@lib/types';
import { DefaultValue } from 'recoil';

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

export const sessionStorageEffect: TypesSessionStorageEffect =
  ({ queryKey, shouldGet }) =>
  ({ onSet, setSelf, trigger }) => {
    if (trigger === 'get' && shouldGet) {
      const value = sessionStorage.getItem(queryKey);
      setSelf(value != null ? JSON.parse(value) : new DefaultValue());
    }
    onSet((newValue, _, isReset) => {
      isReset ? sessionStorage.removeItem(queryKey) : sessionStorage.setItem(queryKey, JSON.stringify(newValue));
    });
  };
