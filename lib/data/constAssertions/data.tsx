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

export type PATH_HOME = (typeof PATH_HOME)[keyof typeof PATH_HOME];
export const PATH_HOME = {
  home: '/',
  demo: '/app',
  features: '/features',
  implementations: '/implementations',
  pricing: '/pricing',
  contact: '/contact',
  auth: '/auth',
} as const;

export type PATH_IMAGE_APP = (typeof PATH_IMAGE_APP)[keyof typeof PATH_IMAGE_APP];
export const PATH_IMAGE_APP = {
  focus: 'app-focus.png',
  urgent: 'app-urgent.png',
  important: 'app-important.png',
  showAll: 'app-showall.png',
  completed: 'app-completed.png',
  label: 'app-label.png',
  avatar: 'app-user-avatar.png',
} as const;

export type PATH_IMAGE_HOME = (typeof PATH_IMAGE_HOME)[keyof typeof PATH_IMAGE_HOME];
export const PATH_IMAGE_HOME = {
  demo: 'home-demo-image-desk.png',
  contentFocus: 'home-content-focus.png',
  contentOrganize: 'home-content-organize.png',
  underConstruction: 'home-under-construction.png',
} as const;

export type RETENTION = (typeof RETENTION)[keyof typeof RETENTION];
export const RETENTION = {
  7: 7,
} as const;
