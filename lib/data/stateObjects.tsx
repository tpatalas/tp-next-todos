import ObjectID from 'bson-objectid';

export type CATCH_MODAL = typeof CATCH_MODAL[keyof typeof CATCH_MODAL];
export const CATCH_MODAL = {
  todoModal: 'todoModal',
  confirmModal: 'confirmModal',
  minimizedModal: 'minimizedModal',
} as const;

export type FOCUS = typeof FOCUS[keyof typeof FOCUS];
export const FOCUS = {
  openTodoModalOnFocus: 'openTodoModalOnFocus',
  returnOnNoFocus: 'returnOnNoFocus',
  resetFocus: 'resetFocus',
  resetCurrentFocus: 'resetCurrentFocus',
} as const;

export type NOTIFICATION = typeof NOTIFICATION[keyof typeof NOTIFICATION];
export const NOTIFICATION = {
  offline: 'offline',
  completeTodo: 'completeTodo',
  unCompleteTodo: 'unCompleteTodo',
  deleteTodo: 'deleteTodo',
  updatedTodo: 'updatedTodo',
  createdTodo: 'createdTodo',
  updatedDueDate: `updatedDueDate`,
  removedDueDate: `removedDueDate`,
  actionUndone: 'actionUndone',
} as const;

export type OBJECT_ID = typeof OBJECT_ID[keyof typeof OBJECT_ID];
export const OBJECT_ID = {
  objectID: ObjectID().toHexString(),
} as const;

export type POSITION_X = typeof POSITION_X[keyof typeof POSITION_X];
export type POSITION_Y = typeof POSITION_Y[keyof typeof POSITION_Y];
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

export type PRIORITY_LEVEL = typeof PRIORITY_LEVEL[keyof typeof PRIORITY_LEVEL];
export const PRIORITY_LEVEL = {
  urgent: 1,
  important: 2,
  normal: 3,
} as const;

export type CALENDAR = typeof CALENDAR[keyof typeof CALENDAR];
export const CALENDAR = {
  today: 'today',
  nextMonth: 'nextMonth',
  previousMonth: 'previousMonth',
  days: 'days',
} as const;

export type CONDITION = typeof CONDITION[keyof typeof CONDITION];
export const CONDITION = {
  compareTodoItemsEqual: 'compareTodoItemsEqual',
  checkTodoTitleEmpty: 'checkTodoTitleEmpty',
  checkCreateModalOpen: 'checkCreateModalOpen',
} as const;

export type IDB = typeof IDB[keyof typeof IDB];
export const IDB = {
  Todos: 'Todos',
  Tags: 'Tags',
  Users: 'Users',
  Cache: 'Cache',
} as const;

export type IDB_STORE = typeof IDB_STORE[keyof typeof IDB_STORE];
export const IDB_STORE = {
  todos: 'todos',
  tags: 'tags',
  users: 'users',
  settings: 'settings',
  cache: 'cache',
} as const;

export type BREAKPOINT = typeof BREAKPOINT[keyof typeof BREAKPOINT];
export const BREAKPOINT = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1792,
  '4xl': 2048,
  '5xl': 2304,
} as const;

export type SCHEMA_TODO = typeof SCHEMA_TODO[keyof typeof SCHEMA_TODO];
export const SCHEMA_TODO = {
  todoItem: 'todoItem',
  todoNote: 'todoNote',
} as const;

export type FITLER_TODOIDS = typeof FILTER_TODOIDS[keyof typeof FILTER_TODOIDS];
export const FILTER_TODOIDS = {
  focus: 'focus',
  showAll: 'showAll',
  urgent: 'urgent',
  important: 'important',
  completed: 'completed',
} as const;

export type PATHNAME = typeof PATHNAME[keyof typeof PATHNAME];
export const PATHNAME = {
  app: '/app',
  urgent: '/app/urgent',
  important: '/app/important',
  showAll: '/app/showall',
  completed: '/app/completed',
} as const;
