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
    isIndexedDbEnabled,
    queryFunction,
    isRefetchingOnMutation,
    refetchDelayOnMutation,
    isRefetchingOnFocus,
    isRefetchingOnBlur,
    refetchInterval,
  }) =>
  ({ setSelf, onSet, trigger }) => {
    if (typeof window === 'undefined' || typeof queryFunction === 'undefined') return;

    const onIndexedDB = isIndexedDbEnabled || typeof isIndexedDbEnabled === 'undefined';

    // initial fetch.
    // Multiple fetches will be cached and will fetch only once. ex) using `atomQueryTodoIds` more than one location will fetch multiple time at the initial page load then saved to indexedDB
    // Every fetch will be saved to IndexedDB
    const queryInitial = async () => {
      const { data } = await queryFunction();
      if (onIndexedDB) {
        set(storeName, queryKey, data);
      }
      return data;
    };

    //  Re-Sync * the MisMatched* dataSet if local and remote data do not match
    const querySyncData = async () => {
      let data = null;
      try {
        const { queriedData } = await queryFunction();
        data = queriedData;
        if (!data) return;
        if (onIndexedDB) {
          const indexedDb = await get(storeName, queryKey).then((value) => value);
          if (equal(data, indexedDb)) return;
          set(storeName, queryKey, data);
        }
        setSelf(data);
      } catch (error) {
        data = error;
      }
    };

    // get indexedDb if available, and fetch if the data is not available from indexedDb
    if (trigger === 'get') {
      onIndexedDB
        ? setSelf(get(storeName, queryKey).then((value) => (value != null ? value : queryInitial())))
        : setSelf(queryInitial());
    }

    onSet((newValue, _, isReset) => {
      // change will directly reflect to the indexedDb.
      //! Recoil Reset will remove the data from indexedDb. Atom must have default value to reset
      isReset ? del(storeName, queryKey) : set(storeName, queryKey, newValue);

      // refetch and re-sync indexedDb with database if they are not matching.
      if (isRefetchingOnMutation && typeof isRefetchingOnMutation !== 'undefined' && !isReset) {
        const timeoutID = setTimeout(() => querySyncData(), refetchDelayOnMutation ? refetchDelayOnMutation : 100);
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

    isRefetchingOnFocus && window.addEventListener('focus', querySyncData);
    isRefetchingOnBlur && window.addEventListener('blur', querySyncData);
    return () => {
      isRefetchingOnFocus && window.removeEventListener('focus', querySyncData);
      isRefetchingOnBlur && window.removeEventListener('blur', querySyncData);
    };
  };
