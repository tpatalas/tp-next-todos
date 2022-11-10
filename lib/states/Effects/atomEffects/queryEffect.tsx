/* eslint-disable @typescript-eslint/no-explicit-any */
import { del, get, set } from '@lib/dataConnections/indexedDB';
import { TypesRefetchEffect } from '@lib/types';
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
    cachedQueryFunction,
  }) =>
  ({ setSelf, onSet, trigger }) => {
    if (typeof window === 'undefined' || typeof queryFunction === 'undefined') return;

    const onIndexedDB = enableIndexedDb || typeof enableIndexedDb === 'undefined';

    // initial fetch.
    // Multiple fetches will be cached and will fetch only once. ex) using `atomQueryTodoIds` more than one location will fetch multiple time at the initial page load then saved to indexedDB
    // Every fetch will be saved to IndexedDB
    const queryInitial = async () => {
      const { data }: any = cachedQueryFunction
        ? await cachedQueryFunction()
        : await queryFunction();
      if (onIndexedDB) {
        set(storeName, queryKey, data);
      }
      return data;
    };

    //  Re-Sync * the MisMatched* dataSet if local and remote data do not match
    const querySyncData = async () => {
      const { data }: any = await queryFunction();
      if (data == null) return;
      if (onIndexedDB) {
        const indexedDb = await get(storeName, queryKey).then((value) => value);
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
          () => querySyncData(),
          refetchDelayOnMutation ? refetchDelayOnMutation : 100,
        );
        if (timeoutID == null) {
          return timeoutID;
        }
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
