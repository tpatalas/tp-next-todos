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

export type PATHNAME = (typeof PATHNAME)[keyof typeof PATHNAME];
export const PATHNAME = {
  app: '/app',
  urgent: '/app/urgent',
  important: '/app/important',
  showAll: '/app/showall',
  completed: '/app/completed',
  label: '/app/label',
} as const;

export type PATHNAME_IMAGE = (typeof PATHNAME_IMAGE)[keyof typeof PATHNAME_IMAGE];
export const PATHNAME_IMAGE = {
  app: 'focus.webp',
  urgent: 'urgent.webp',
  important: 'important.webp',
  showAll: 'showall.webp',
  completed: 'completed.webp',
  label: 'label.webp',
} as const;

export type SVG_LOGO = (typeof SVG_LOGO)[keyof typeof SVG_LOGO];
export const SVG_LOGO = {
  google: 'Google',
  github: 'GitHub',
} as const;

export type RETENTION = (typeof RETENTION)[keyof typeof RETENTION];
export const RETENTION = {
  7: 7,
} as const;