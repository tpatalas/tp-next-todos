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
  focus: 'app-focus.webp',
  urgent: 'app-urgent.webp',
  important: 'app-important.webp',
  showAll: 'app-showall.webp',
  completed: 'app-completed.webp',
  label: 'app-label.webp',
  avatar: 'app-user-avatar.webp',
} as const;

export type PATH_IMAGE_HOME = (typeof PATH_IMAGE_HOME)[keyof typeof PATH_IMAGE_HOME];
export const PATH_IMAGE_HOME = {
  demo: 'home-demo-image-desk.webp',
  contentFocus: 'home-content-focus.webp',
  contentOrganize: 'home-content-organize.webp',
  underConstruction: 'home-under-construction.webp',
} as const;

export type RETENTION = (typeof RETENTION)[keyof typeof RETENTION];
export const RETENTION = {
  7: 7,
} as const;
