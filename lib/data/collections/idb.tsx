import { IDB, IDB_STORE, IDB_VERSION } from '@constAssertions/storage';
import { TypesIDB } from '@lib/types';

export const DATA_IDB: TypesIDB[] = [
  {
    dbName: IDB['todo'],
    store: IDB_STORE['todoItems'],
    currentVersion: IDB_VERSION['current'],
  },
  {
    dbName: IDB['idMap'],
    store: IDB_STORE['idMaps'],
    currentVersion: IDB_VERSION['current'],
  },
  {
    dbName: IDB['user'],
    store: IDB_STORE['users'],
    currentVersion: IDB_VERSION['current'],
  },
  {
    dbName: IDB['setting'],
    store: IDB_STORE['settings'],
    currentVersion: IDB_VERSION['current'],
  },
  {
    dbName: IDB['session'],
    store: IDB_STORE['session'],
    currentVersion: IDB_VERSION['current'],
  },
];
