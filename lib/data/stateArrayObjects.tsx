import { getDataTags } from '@lib/queries/queryTags';
import { getDataTodoIds } from '@lib/queries/queryTodos';
import { TypesIDB, TypesNotification } from 'lib/types';
import {
  ICON_DELETE,
  ICON_DONE_ALL,
  ICON_ERROR,
  ICON_EVENT_AVAILABLE,
  ICON_EVENT_BUSY,
  ICON_FLAG,
  ICON_FLAG_FILL,
  ICON_HOME,
  ICON_HOME_FILL,
  ICON_INFO,
  ICON_LABEL_IMPORTANT,
  ICON_LABEL_IMPORTANT_FILL,
  ICON_TASK_ALT,
} from './materialSymbols';
import { CACHED_DATA, IDB, IDB_STORE, NOTIFICATION, SCHEMA_TODO } from './stateObjects';

export const DATA_NOTIFICATION: TypesNotification[] = [
  {
    _id: NOTIFICATION['completeTodo'],
    message: 'Todo completed',
    iconPath: ICON_TASK_ALT,
    iconPresetStyle: 'h-6 w-6 fill-blue-500',
  },
  {
    _id: NOTIFICATION['unCompleteTodo'],
    message: 'Todo uncompleted',
    iconPath: ICON_INFO,
    iconPresetStyle: 'h-6 w-6 fill-red-500',
  },
  {
    _id: NOTIFICATION['deleteTodo'],
    message: 'Todo deleted',
    iconPath: ICON_DELETE,
    iconPresetStyle: 'h-6 w-6 fill-red-500',
  },
  {
    _id: NOTIFICATION['createdTodo'],
    message: 'Successfully created todo',
    iconPath: ICON_TASK_ALT,
    iconPresetStyle: 'h-6 w-6 fill-green-500',
  },
  {
    _id: NOTIFICATION['updatedTodo'],
    message: 'Todo updated',
    iconPath: ICON_TASK_ALT,
    iconPresetStyle: 'h-6 w-6 fill-blue-500',
  },
  {
    _id: NOTIFICATION['updatedDueDate'],
    message: 'Due date updated',
    iconPath: ICON_EVENT_AVAILABLE,
    iconPresetStyle: 'h-6 w-6 fill-blue-500',
  },
  {
    _id: NOTIFICATION['removedDueDate'],
    message: 'Due date removed',
    iconPath: ICON_EVENT_BUSY,
    iconPresetStyle: 'h-6 w-6 fill-red-500',
  },
  {
    _id: NOTIFICATION['actionUndone'],
    message: 'Action undone',
    iconPath: ICON_INFO,
    iconPresetStyle: 'h-6 w-6 fill-blue-500',
  },
  {
    _id: NOTIFICATION['offline'],
    message: 'You are offline',
    description: 'Check your internet connection.',
    iconPath: ICON_ERROR,
    iconPresetStyle: 'h-6 w-6 fill-red-500',
  },
];

export const DATA_IDB: TypesIDB[] = [
  {
    name: IDB['Todos'],
    store: IDB_STORE['todos'],
  },
  {
    name: IDB['Tags'],
    store: IDB_STORE['tags'],
  },
  {
    name: IDB['Users'],
    store: IDB_STORE['users'],
  },
  {
    name: IDB['Users'],
    store: IDB_STORE['settings'],
  },
];

export const DATA_SIDEBAR_MENU = [
  {
    name: "Today's Focus",
    tooltip: "Today's Focus",
    icon: ICON_HOME,
    iconActive: ICON_HOME_FILL,
    iconColor: 'fill-blue-600',
    path: '/app',
  },
  {
    name: 'Urgent',
    tooltip: 'Urgent todos',
    icon: ICON_FLAG,
    iconActive: ICON_FLAG_FILL,
    iconColor: 'fill-red-600',
    path: '/app/urgent',
  },
  {
    name: 'Important',
    tooltip: 'Important todos',
    icon: ICON_LABEL_IMPORTANT,
    iconActive: ICON_LABEL_IMPORTANT_FILL,
    iconColor: 'fill-yellow-600',
    path: '/app/important',
  },
  {
    name: 'Completed',
    tooltip: 'Completed todos',
    icon: ICON_DONE_ALL,
    iconActive: ICON_DONE_ALL,
    iconColor: 'fill-green-600',
    path: '/app/completed',
  },
];

export const cachedData = () => {
  return [
    {
      key: CACHED_DATA['getDataTodoIds'],
      cachedTimer: new Date().getTime(),
      data: getDataTodoIds({ model: SCHEMA_TODO['todoItem'] }),
    },
    {
      key: CACHED_DATA['getDataTags'],
      cachedTimer: new Date().getTime(),
      data: getDataTags(),
    },
  ];
};
