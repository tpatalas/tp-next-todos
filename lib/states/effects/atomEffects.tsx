import { IDB_VERSION } from '@data/dataTypesConst';
import { del, get, set } from '@lib/dataConnections/indexedDB';
import { TypesAtomEffect, TypesIndexedDBEffect, TypesMediaQueryEffect } from '@lib/types';
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

export const indexedDBEffect: TypesIndexedDBEffect =
  ({ storeName, queryKey }) =>
  ({ onSet, setSelf, trigger }) => {
    if (trigger === 'get') {
      setSelf(
        get(storeName, queryKey, IDB_VERSION['current']).then((value) => (value != null ? value : new DefaultValue())),
      );
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? del(storeName, queryKey, IDB_VERSION['current'])
        : set(storeName, queryKey, newValue, IDB_VERSION['current']);
    });
  };
