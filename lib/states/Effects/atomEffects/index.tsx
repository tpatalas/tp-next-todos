import { BREAKPOINT } from '@data/stateObjects';
import { TypesAtomEffect, TypesAtomEffectWithParam } from '@lib/types';

/**
 * Media Queries
 */
export const mediaQueryEffect: TypesAtomEffectWithParam<boolean, BREAKPOINT> =
  (breakpoint) =>
  ({ setSelf, resetSelf }) => {
    if (typeof window === 'undefined') return;
    const windowMediaQueries = () => {
      if (window.innerWidth >= breakpoint) return setSelf(true);
      resetSelf();
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
