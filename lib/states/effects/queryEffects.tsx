import { OBJECT_ID, STORAGE_KEY } from '@data/dataTypesConst';
import { del, get, set } from '@lib/dataConnections/indexedDB';
import { TypesRefetchEffect } from '@lib/types';
import { hasTimePast } from '@states/utils';
import equal from 'fast-deep-equal/react';
import { DefaultValue } from 'recoil';

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
    isIndexedDBEnabled,
    queryFunction,
    isRefetchingOnMutation,
    refetchDelayOnMutation,
    isRefetchingOnFocus,
    isRefetchingOnBlur,
    refetchInterval,
  }) =>
  ({ setSelf, onSet, trigger }) => {
    if (typeof window === 'undefined' || typeof queryFunction === 'undefined') return;

    const onIndexedDB = isIndexedDBEnabled || typeof isIndexedDBEnabled === 'undefined';
    const lastUpdateTime = Number(JSON.parse(localStorage.getItem(STORAGE_KEY[storeName]) || '0'));
    const hasTenMinTimePast = lastUpdateTime && hasTimePast(lastUpdateTime); // 10 min is default time. You can number as argument for custom time. ex)  hasTimePast(lastUpdateTime, 20) 20 min custom time

    //concat indexedDB with data if data is in array
    const concatDataWithIndexedDB = async (data: Promise<DefaultValue>) => {
      const indexedDB = await get(storeName, queryKey);

      // find the deleted item with given condition
      const deletedItem = (_id: OBJECT_ID, deleted: boolean) => {
        if (!Array.isArray(data)) return;
        return data.find((item) => item._id === _id && item.deleted === deleted);
      };

      // remove deleted item from the array of object
      const updatedIndexedDBArray = Array.isArray(indexedDB) && indexedDB.filter((idb) => !deletedItem(idb._id, true));

      // remove deleted object from indexedDB
      if (Array.isArray(indexedDB)) {
        const deletedItemsIndexedDBArray = indexedDB.filter((idb) => deletedItem(idb._id, true));
        await Promise.all(deletedItemsIndexedDBArray.map((deletedItem) => del(storeName, deletedItem._id)));
      }

      // filter data as newData
      const newData =
        Array.isArray(data) &&
        data.filter(
          (item) =>
            Array.isArray(updatedIndexedDBArray) &&
            !updatedIndexedDBArray.some((idb) => idb._id === item._id) &&
            !item.deleted,
        );

      // insert newData to indexedDB
      const updatedData = Array.isArray(updatedIndexedDBArray)
        ? Array.isArray(newData) && [...updatedIndexedDBArray, ...newData]
        : data;

      return updatedData as Promise<DefaultValue>;
    };

    // initial fetch - every fetch will be saved to IndexedDB if `isIndexedDb`
    const queryInitial = async () => {
      const { data } = await queryFunction();
      const newData = await concatDataWithIndexedDB(data);
      set(storeName, queryKey, newData);
      return newData;
    };

    //  Re-Sync * the MisMatched* dataSet if local and remote data do not match
    const querySyncData = async () => {
      const { data } = await queryFunction();
      const indexedDB = await get(storeName, queryKey);
      const newData = await concatDataWithIndexedDB(data);
      if (onIndexedDB && equal(data, indexedDB)) return;
      set(storeName, queryKey, newData);
      setSelf(newData);
    };

    if (trigger === 'get') {
      onIndexedDB && !hasTenMinTimePast
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
