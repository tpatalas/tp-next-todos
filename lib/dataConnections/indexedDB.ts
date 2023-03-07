import { DATA_IDB } from '@data/dataArrayOfObjects';
import { IDB, IDB_VERSION } from '@data/dataTypesConst';
import { Types, TypesIDB } from '@lib/types';
import { deleteDB, openDB } from 'idb';

// this will create new database per object store. This is easier to modify
// the schema if necessary.
const dbPromise = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  const idb = DATA_IDB.find((db: TypesIDB) => db.store === storeName);
  const currentIDBName = idb && idb.dbName + 'v' + idb.currentVersion;
  const previousVersions = Array.from({ length: IDB_VERSION['current'] }, (_, i) => i);
  const oldIDBNames = previousVersions.map((version) => idb && idb.dbName + 'v' + version);

  const db = await openDB(currentIDBName as IDB, dbVersion || 1, {
    // To auto upgrade indexedDB, update the IDB_VERSION's previous and current.
    // The purpose of upgrade is the schema changes in indexedDB
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
  if (oldIDBNames) {
    await Promise.all(oldIDBNames.map((dbName) => dbName && deleteDB(dbName)));
  }
  return db;
};

export const get = async (storeName: Types['storeName'], key: string, dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion ?? IDB_VERSION['current'])).get(storeName, key);
};

export const getAll = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion ?? IDB_VERSION['current'])).getAll(storeName);
};

export const count = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion ?? IDB_VERSION['current'])).count(storeName);
};

export const set = async (storeName: Types['storeName'], key: string, val: unknown, dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion ?? IDB_VERSION['current'])).put(storeName, val, key);
};

export const del = async (storeName: Types['storeName'], key: string, dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion ?? IDB_VERSION['current'])).delete(storeName, key);
};

export const clear = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion ?? IDB_VERSION['current'])).clear(storeName);
};
