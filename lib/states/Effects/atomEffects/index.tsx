/* eslint-disable @typescript-eslint/no-explicit-any */
import { BREAKPOINT } from '@data/stateObjects';
import { del, get, set } from '@lib/dataConnections/indexedDB';
import { TypesAtomEffect, TypesAtomEffectWithParam, TypesRefetchEffect } from '@lib/types';
import equal from 'fast-deep-equal/react';

/**
 * * Data refetch Effect
 * Term:
 * ? MisMatch: mismatching data sets between localData(indexedDb) and remoteData(ex: mongoDB).
 * ? Re-sync: synchronize the MisMatched data sets
 */

export const queryEffect: TypesRefetchEffect =
  ({
    storeName,
    queryKey,
    enableIndexedDb,
    queryFunction,
    refetchOnMutation,
    refetchDelayOnMutation,
    refetchOnFocus,
    refetchOnBlur,
    refetchInterval,
  }) =>
  ({ setSelf, onSet, trigger }) => {
    if (typeof window === 'undefined' || typeof queryFunction === 'undefined') return;

    const onIndexedDB = enableIndexedDb || typeof enableIndexedDb === 'undefined';

    // initial fetch. Every fetch will be saved to IndexedDB
    const queryInitial = async () => {
      const { data }: any = await queryFunction();
      if (onIndexedDB) {
        set(storeName, queryKey, data);
      }
      return data;
    };

    //  Re-Sync * the MisMatched* dataSet if local and remote data do not match
    const querySyncData = async () => {
      const { data }: any = await queryFunction();
      if (onIndexedDB) {
        const indexedDb = get(storeName, queryKey).then((value) => value);
        if (equal(data, indexedDb)) return;
        set(storeName, queryKey, data);
      }
      setSelf(data);
    };

    // get indexedDb if available, and fetch if the data is not available from indexedDb
    if (trigger === 'get') {
      onIndexedDB
        ? setSelf(
            get(storeName, queryKey).then((value) => (value != null ? value : queryInitial())),
          )
        : setSelf(queryInitial());
    }

    onSet((newValue, _, isReset) => {
      // change will directly reflect to the indexedDb.
      //! Recoil Reset will remove the data from indexedDb. Atom must have default value to reset
      isReset ? del(storeName, queryKey) : set(storeName, queryKey, newValue);

      // refetch and re-sync indexedDb with database if they are not matching.
      if (refetchOnMutation && typeof refetchOnMutation !== 'undefined' && !isReset) {
        const timeoutID = setTimeout(
          () => {
            querySyncData();
          },
          refetchDelayOnMutation ? refetchDelayOnMutation : 100,
        );
        return () => clearTimeout(timeoutID);
      }
    });

    // refetch based on given interval while resync data if mismatch happens
    if (typeof refetchInterval !== 'undefined' && refetchInterval > 0) {
      const intervalID = setInterval(() => querySyncData(), refetchInterval);
      return () => {
        clearInterval(intervalID);
      };
    }

    refetchOnFocus && window.addEventListener('focus', querySyncData);
    refetchOnBlur && window.addEventListener('blur', querySyncData);
    return () => {
      refetchOnFocus && window.removeEventListener('focus', querySyncData);
      refetchOnBlur && window.removeEventListener('blur', querySyncData);
    };
  };

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
