import ObjectID from 'bson-objectid';

export type CATCH = (typeof CATCH)[keyof typeof CATCH];
export const CATCH = {
  todoModal: 'todoModal',
  labelModal: 'labelModal',
  confirmModal: 'confirmModal',
  minimizedModal: 'minimizedModal',
  comboBox: 'comboBox',
} as const;

export type FOCUS = (typeof FOCUS)[keyof typeof FOCUS];
export const FOCUS = {
  openTodoModalOnFocus: 'openTodoModalOnFocus',
  returnOnNoFocus: 'returnOnNoFocus',
  resetFocus: 'resetFocus',
  resetCurrentFocus: 'resetCurrentFocus',
} as const;

export type NOTIFICATION = (typeof NOTIFICATION)[keyof typeof NOTIFICATION];
export const NOTIFICATION = {
  offline: 'offline',
  actionUndone: 'actionUndone',
  //todo
  completeTodo: 'completeTodo',
  unCompleteTodo: 'unCompleteTodo',
  deleteTodo: 'deleteTodo',
  updatedTodo: 'updatedTodo',
  createdTodo: 'createdTodo',
  updatedDueDate: `updatedDueDate`,
  removedDueDate: `removedDueDate`,
  //label
  createdLabel: 'createdLabel',
  updatedLabel: 'updatedLabel',
  deleteLabel: 'deleteLabel',
} as const;

export type OBJECT_ID = (typeof OBJECT_ID)[keyof typeof OBJECT_ID];
export const OBJECT_ID = {
  objectID: ObjectID().toHexString(),
} as const;

export type POSITION_X = (typeof POSITION_X)[keyof typeof POSITION_X];
export type POSITION_Y = (typeof POSITION_Y)[keyof typeof POSITION_Y];
export const POSITION_X = {
  left: 'sm:items-start',
  right: 'sm:items-end',
  center: 'sm:items-center',
} as const;
export const POSITION_Y = {
  top: 'sm:items-start',
  bottom: 'sm:items-end',
  center: 'sm:items-center',
} as const;

export type PRIORITY_LEVEL = (typeof PRIORITY_LEVEL)[keyof typeof PRIORITY_LEVEL];
export const PRIORITY_LEVEL = {
  urgent: 1,
  important: 2,
  normal: 3,
} as const;

export type CALENDAR = (typeof CALENDAR)[keyof typeof CALENDAR];
export const CALENDAR = {
  today: 'today',
  nextMonth: 'nextMonth',
  previousMonth: 'previousMonth',
  days: 'days',
} as const;

export type IDB_VERSION = (typeof IDB_VERSION)[keyof typeof IDB_VERSION];
export const IDB_VERSION = {
  previous: 0,
  current: 1,
};

export type IDB = (typeof IDB)[keyof typeof IDB];
export const IDB = {
  todo: 'todo',
  idMap: 'idMap',
  user: 'user',
  setting: 'setting',
} as const;

export type IDB_STORE = (typeof IDB_STORE)[keyof typeof IDB_STORE];
export const IDB_STORE = {
  todoItems: 'todoItems',
  idMaps: 'idMaps',
  users: 'users',
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
} as const;

export type BREAKPOINT = (typeof BREAKPOINT)[keyof typeof BREAKPOINT];
export const BREAKPOINT = {
  sm: 640,
  md: 768,
  ml: 896,
  lg: 1024,
  xl: 1280,
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
  label: '/app/label/(.*)$',
} as const;

export type PATHNAME_IMAGE = (typeof PATHNAME_IMAGE)[keyof typeof PATHNAME_IMAGE];
export const PATHNAME_IMAGE = {
  app: 'focus.webp',
  urgent: 'urgent.webp',
  important: 'important.webp',
  showAll: 'showall.webp',
  completed: 'completed.webp',
  label: 'label.webp',
};

export type DURATION = (typeof DURATION)[keyof typeof DURATION];
export const DURATION = {
  75: 'duration-75',
  100: 'duration-100',
  150: 'duration-150',
  200: 'duration-200',
  300: 'duration-300',
  500: 'duration-500',
  700: 'duration-700',
  1000: 'duration-1000',
} as const;

export type GRADIENT_POSITION = (typeof GRADIENT_POSITION)[keyof typeof GRADIENT_POSITION];
export const GRADIENT_POSITION = {
  left: 'left',
  right: 'right',
} as const;
