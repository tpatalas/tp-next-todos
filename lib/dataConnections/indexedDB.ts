import { DATA_IDB } from '@data/dataArrayOfObjects';
import { IDB, IDB_VERSION, STORAGE_KEY } from '@data/dataTypesConst';
import { Types, TypesIDB } from '@lib/types';
import { deleteDB, openDB } from 'idb';

// this will create new database per object store. This is easier to modify
// the schema if necessary.
const dbPromise = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  const idb = DATA_IDB.find((db: TypesIDB) => db.store === storeName);
  const currentIDBName = idb && idb.dbName + 'v' + idb.currentVersion;
  const previousVersions = Array.from({ length: IDB_VERSION['current'] }, (_, i) => i);
  const oldIDBNames = previousVersions.map((version) => idb && idb.dbName + 'v' + version);
  const session = sessionStorage.getItem(STORAGE_KEY['session']);

  if (!session) return;

  const db = await openDB(currentIDBName as IDB, dbVersion || 1, {
    // To auto upgrade indexedDB, update the IDB_VERSION's previous and current.
    // The purpose of upgrade is the schema changes in indexedDB
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
  if (oldIDBNames) await Promise.all(oldIDBNames.map((dbName) => dbName && deleteDB(dbName)));

  return db;
};

export const peekIDB = async (storeName: Types['storeName']) => {
  // current limitation: we cannot get the storeName or value without opening new database, which leads to create database if not exists
  const idb = DATA_IDB.find((db: TypesIDB) => db.store === storeName);
  const currentIDBName = idb && idb.dbName + 'v' + idb.currentVersion;
  const allIDBs = await indexedDB.databases();
  return allIDBs.find((idb) => idb.name === currentIDBName);
};

export const peek = async (storeName: Types['storeName'], key: string) => {
  const idb = await peekIDB(storeName);
  if (!idb) return;
  const value = await get(storeName, key);
  return value;
};

export const get = async (storeName: Types['storeName'], key: string, dbVersion?: Types['dbVersion']) => {
  const db = await dbPromise(storeName, dbVersion ?? IDB_VERSION['current']);
  return db && db.get(storeName, key);
};

export const getAll = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  const db = await dbPromise(storeName, dbVersion ?? IDB_VERSION['current']);
  return db && db.getAll(storeName);
};

export const count = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  const db = await dbPromise(storeName, dbVersion ?? IDB_VERSION['current']);

  return db && db.count(storeName);
};

export const set = async (storeName: Types['storeName'], key: string, val: unknown, dbVersion?: Types['dbVersion']) => {
  const db = await dbPromise(storeName, dbVersion ?? IDB_VERSION['current']);
  return db && db.put(storeName, val, key);
};

export const del = async (storeName: Types['storeName'], key: string, dbVersion?: Types['dbVersion']) => {
  const db = await dbPromise(storeName, dbVersion ?? IDB_VERSION['current']);
  return db && db.delete(storeName, key);
};

export const clear = async (storeName: Types['storeName'], dbVersion?: Types['dbVersion']) => {
  const db = await dbPromise(storeName, dbVersion ?? IDB_VERSION['current']);
  return db && db.clear(storeName);
};
