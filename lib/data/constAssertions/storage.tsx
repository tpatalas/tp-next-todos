export type IDB_VERSION = (typeof IDB_VERSION)[keyof typeof IDB_VERSION];
export const IDB_VERSION = {
  current: Number(process.env.NEXT_PUBLIC_IDB_VERSION_CURRENT),
};

export type IDB = (typeof IDB)[keyof typeof IDB];
export const IDB = {
  todo: 'todo',
  idMap: 'idMap',
  user: 'user',
  session: 'session',
  setting: 'setting',
} as const;

export type IDB_STORE = (typeof IDB_STORE)[keyof typeof IDB_STORE];
export const IDB_STORE = {
  todoItems: 'todoItems',
  idMaps: 'idMaps',
  users: 'users',
  session: 'session',
  settings: 'settings',
} as const;

export type IDB_KEY = (typeof IDB_KEY)[keyof typeof IDB_KEY];
export const IDB_KEY = {
  todoIds: 'todoIds',
  labels: 'labels',
} as const;

export type IDB_KEY_STORE = (typeof IDB_KEY_STORE)[keyof typeof IDB_KEY_STORE];
export const IDB_KEY_STORE = {
  [IDB_KEY['todoIds']]: IDB_STORE['todoItems'],
} as const;

export type STORAGE_KEY = (typeof STORAGE_KEY)[keyof typeof STORAGE_KEY];
export const STORAGE_KEY = {
  [IDB_KEY['todoIds']]: 'last_update_todos',
  [IDB_KEY['labels']]: 'last_update_labels',
  offSession: 'offSession',
} as const;

