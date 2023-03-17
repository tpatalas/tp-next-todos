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
  ({ queryKey, shouldGet, isSessionSetEnabled, isSessionResetEnabled }) =>
  ({ onSet, resetSelf, setSelf, trigger }) => {
    const session = sessionStorage.getItem(queryKey);
    const offSession = session && JSON.parse(session) ? false : true;

    if (trigger === 'get' && (shouldGet ?? true)) {
      setSelf(offSession);
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        resetSelf();
        isSessionResetEnabled && sessionStorage.removeItem(queryKey);
        return;
      }
      setSelf(newValue);
      isSessionSetEnabled && sessionStorage.setItem(queryKey, JSON.stringify(newValue));
    });
  };
