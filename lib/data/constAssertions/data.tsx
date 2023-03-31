import ObjectID from 'bson-objectid';

export type OBJECT_ID = (typeof OBJECT_ID)[keyof typeof OBJECT_ID];
export const OBJECT_ID = {
  objectID: ObjectID().toHexString(),
} as const;

export type SCHEMA_TODO = (typeof SCHEMA_TODO)[keyof typeof SCHEMA_TODO];
export const SCHEMA_TODO = {
  todoItem: 'todoItem',
  todoNote: 'todoNote',
} as const;

export type FITLER_TODOIDS = (typeof FILTER_TODOIDS)[keyof typeof FILTER_TODOIDS];
export const FILTER_TODOIDS = {
  focus: 'focus',
  showAll: 'showAll',
  urgent: 'urgent',
  important: 'important',
  completed: 'completed',
} as const;

export type PATH_APP = (typeof PATH_APP)[keyof typeof PATH_APP];
export const PATH_APP = {
  app: '/app',
  urgent: '/app/urgent',
  important: '/app/important',
  showAll: '/app/showall',
  completed: '/app/completed',
  label: '/app/label',
} as const;

export type PATH_DEMO = (typeof PATH_DEMO)[keyof typeof PATH_DEMO];
export const PATH_DEMO = {
  app: '/demo',
  urgent: '/demo/urgent',
  important: '/demo/important',
  showAll: '/demo/showall',
  completed: '/demo/completed',
  label: '/demo/label',
} as const;

export type PATH_HOME = (typeof PATH_HOME)[keyof typeof PATH_HOME];
export const PATH_HOME = {
  home: '/',
  features: '/features',
  implementations: '/implementations',
  pricing: 'pricing',
  demo: '/demo',
  auth: '/auth',
} as const;

export type PATHNAME_IMAGE = (typeof PATHNAME_IMAGE)[keyof typeof PATHNAME_IMAGE];
export const PATHNAME_IMAGE = {
  focus: 'focus.webp',
  urgent: 'urgent.webp',
  important: 'important.webp',
  showAll: 'showall.webp',
  completed: 'completed.webp',
  label: 'label.webp',
} as const;

export type RETENTION = (typeof RETENTION)[keyof typeof RETENTION];
export const RETENTION = {
  7: 7,
} as const;
