import { DATA_IDB } from '@data/stateArrayObjects';
import { IDB } from '@data/stateObjects';
import { Types, TypesIDB } from '@lib/types';
import { openDB } from 'idb';

const dbPromise = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  const dbName = DATA_IDB.find((db: TypesIDB) => db.store === storeName)?.name as IDB;

  return await openDB(dbName, dbVersion || 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
};

export const get = async (
  storeName: Types['storeName'],
  key: string,
  dbVersion?: Types['dbVersion'],
) => {
  return (await dbPromise(storeName, dbVersion)).get(storeName, key);
};

export const set = async (
  storeName: Types['storeName'],
  key: string,
  val: unknown,
  dbVersion?: Types['dbVersion'],
) => {
  return (await dbPromise(storeName, dbVersion)).put(storeName, val, key);
};

export const del = async (
  storeName: Types['storeName'],
  key: string,
  dbVersion?: Types['dbVersion'],
) => {
  return (await dbPromise(storeName, dbVersion)).delete(storeName, key);
};

export const clear = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion)).clear(storeName);
};
