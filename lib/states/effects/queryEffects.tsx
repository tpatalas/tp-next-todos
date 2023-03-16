import { IDB_KEY, IDB_KEY_STORE, IDB_STORE, STORAGE_KEY } from '@data/dataTypesConst';
import { del, get, set } from '@lib/dataConnections/indexedDB';
import { TypesRefetchEffect } from '@lib/types';
import { hasTimePast } from '@states/utils';
import { DefaultValue } from 'recoil';

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
    const isIdMapQueryKey = queryKey === IDB_KEY['labels'] || queryKey === IDB_KEY['todoIds'];
    const lastUpdateTime = isIdMapQueryKey && Number(JSON.parse(localStorage.getItem(STORAGE_KEY[queryKey]) || '0'));
    const hasFiveMinTimePast = lastUpdateTime && hasTimePast(lastUpdateTime); // 5 min is default time. You can number as argument for custom time. ex)  hasTimePast(lastUpdateTime, 20) 20 min custom time
    const demoEnabled = sessionStorage.getItem(STORAGE_KEY['demo']);

    if (demoEnabled) return;

    //concat indexedDB with data if data is in array
    const concatDataWithIndexedDB = async (data: unknown) => {
      const indexedDB = await get(storeName, queryKey);
      const arrayIndexedDB = Array.isArray(indexedDB) && indexedDB;
      const arrayData = Array.isArray(data) && data;

      // filter the deleted item from the array of object
      const updatedIndexedDB =
        arrayIndexedDB && arrayIndexedDB.filter((idb) => arrayData && !arrayData.some((item) => item._id === idb._id));

      // filter data as newData
      const newData =
        arrayData &&
        arrayData.filter(
          (item) => updatedIndexedDB && !updatedIndexedDB.some((idb) => idb._id === item._id) && !item.deleted,
        );

      // filter data that is updated
      const updatedData =
        arrayData &&
        arrayData.filter((item) => updatedIndexedDB && updatedIndexedDB.some((idb) => idb._id === item._id));

      const finalData = async () => {
        // delete item: deleted from indexedDB
        // updated item: force refetch new item
        if (Array.isArray(updatedData)) {
          await Promise.all(
            updatedData.map((updatedItem) =>
              del(IDB_KEY_STORE[queryKey as keyof typeof IDB_KEY_STORE], updatedItem._id),
            ),
          );
        }
        // insert newData to arrayIndexedDB
        if (Array.isArray(updatedIndexedDB) && newData) {
          return [...updatedIndexedDB, ...newData];
        }
        return data;
      };
      return finalData();
    };

    // initial fetch - every fetch will be saved to IndexedDB if `isIndexedDb`
    const queryInitial = async () => {
      const { data } = await queryFunction();
      const newData = await concatDataWithIndexedDB(data);
      isIdMapQueryKey && set(storeName, queryKey + 'Temp', data);
      set(storeName, queryKey, newData);
      return newData as DefaultValue;
    };

    //  Re-Sync * the MisMatched* dataSet if local and remote data do not match
    const querySyncData = async () => {
      // do not fetch if item is not updated
      const indexedDB = await get(IDB_STORE['idMaps'], IDB_KEY_STORE[queryKey as keyof typeof IDB_KEY_STORE] + 'Temp');
      const isQueryKeyInTemp = Array.isArray(indexedDB) && indexedDB.some((idb) => idb._id === queryKey);
      if (!isQueryKeyInTemp && !isIdMapQueryKey) return;
      // proceed normal fetch
      const { data } = await queryFunction();
      const newData = (await concatDataWithIndexedDB(data)) as DefaultValue;
      isIdMapQueryKey && set(storeName, queryKey + 'Temp', data);
      set(storeName, queryKey, newData);
      setSelf(newData);
    };

    if (trigger === 'get') {
      onIndexedDB && !hasFiveMinTimePast
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
