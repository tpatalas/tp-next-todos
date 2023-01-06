import { TypesAtomEffect, TypesMediaQueryEffect } from '@lib/types';

/**
 * Media Queries
 */
export const mediaQueryEffect: TypesMediaQueryEffect =
  ({ breakpoint, stateOverBreakpoint, stateUnderBreakpoint }) =>
  ({ setSelf }) => {
    if (typeof window === 'undefined') return;
    const windowMediaQueries = () => {
      if (window.innerWidth >= breakpoint && typeof stateOverBreakpoint !== 'undefined')
        return setSelf(stateOverBreakpoint);
      if (window.innerWidth <= breakpoint && typeof stateUnderBreakpoint !== 'undefined')
        return setSelf(stateUnderBreakpoint);
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
