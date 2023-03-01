import { DATA_IDB } from '@data/dataArrayOfObjects';
import { IDB } from '@data/dataTypesConst';
import { Types, TypesIDB } from '@lib/types';
import { deleteDB, openDB } from 'idb';

// this will create new database per object store. This is easier to modify
// the schema if necessary.
const dbPromise = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  const idb = DATA_IDB.find((db: TypesIDB) => db.store === storeName);
  const newDbName = idb && idb.dbName + 'v' + idb.newVersion;
  const oldDbName = idb && idb.dbName + 'v' + idb.oldVersion;

  const db = await openDB(newDbName as IDB, dbVersion || 1, {
    // To auto upgrade indexedDB, update the IDB_VERSION's previous and current.
    // The purpose of upgrade is the schema changes in indexedDB
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
  if (oldDbName) {
    await deleteDB(oldDbName);
  }
  return db;
};

export const get = async (storeName: Types['storeName'], key: string, dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion)).get(storeName, key);
};

export const getAll = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion)).getAll(storeName);
};

export const count = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion)).count(storeName);
};

export const set = async (storeName: Types['storeName'], key: string, val: unknown, dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion)).put(storeName, val, key);
};

export const del = async (storeName: Types['storeName'], key: string, dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion)).delete(storeName, key);
};

export const clear = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  return (await dbPromise(storeName, dbVersion)).clear(storeName);
};
