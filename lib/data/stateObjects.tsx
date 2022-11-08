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

export const ObjectId = (m = Math, d = Date, h = 16, s = (s: number) => m.floor(s).toString(h)) =>
  s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
export const ObjectIdByDate = (new Date(new Date().toDateString()).getTime() * 32 * 32) / 10000;
export type OBJECT_ID = typeof OBJECT_ID[keyof typeof OBJECT_ID];
export const OBJECT_ID = {
  objectID: ObjectId(),
  objectIdByDate: ObjectIdByDate,
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
  Users: 'Users',
  Cache: 'Cache',
} as const;

export type IDB_STORE = typeof IDB_STORE[keyof typeof IDB_STORE];
export const IDB_STORE = {
  todos: 'todos',
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

export type CACHED_DATA = typeof CACHED_DATA[keyof typeof CACHED_DATA];
export const CACHED_DATA = {
  getDataTodoIds: 'getDataTodoIds',
} as const;
