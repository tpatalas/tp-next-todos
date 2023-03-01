import { TypesIDB, TypesNotification, TypesPathnameImage, TypesSidebarMenu } from 'lib/types';
import { IDB, IDB_STORE, IDB_VERSION, NOTIFICATION, PATHNAME } from './dataTypesConst';
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
  ICON_LIST,
  ICON_TASK_ALT,
} from './materialSymbols';

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
  {
    _id: NOTIFICATION['createdLabel'],
    message: 'Successfully created label',
    iconPath: ICON_TASK_ALT,
    iconPresetStyle: 'h-6 w-6 fill-green-500',
  },
  {
    _id: NOTIFICATION['updatedLabel'],
    message: 'label updated',
    iconPath: ICON_TASK_ALT,
    iconPresetStyle: 'h-6 w-6 fill-blue-500',
  },
  {
    _id: NOTIFICATION['deleteLabel'],
    message: 'Label deleted',
    iconPath: ICON_DELETE,
    iconPresetStyle: 'h-6 w-6 fill-red-500',
  },
];

export const DATA_IDB: TypesIDB[] = [
  {
    dbName: IDB['todo'],
    store: IDB_STORE['todoItems'],
    oldVersion: IDB_VERSION['previous'],
    newVersion: IDB_VERSION['current'],
  },
  {
    dbName: IDB['idMap'],
    store: IDB_STORE['idMaps'],
    oldVersion: IDB_VERSION['previous'],
    newVersion: IDB_VERSION['current'],
  },
  {
    dbName: IDB['user'],
    store: IDB_STORE['users'],
    oldVersion: IDB_VERSION['previous'],
    newVersion: IDB_VERSION['current'],
  },
  {
    dbName: IDB['setting'],
    store: IDB_STORE['settings'],
    oldVersion: IDB_VERSION['previous'],
    newVersion: IDB_VERSION['current'],
  },
];

export const DATA_SIDEBAR_MENU: TypesSidebarMenu[] = [
  {
    name: "Today's Focus",
    tooltip: "Today's Focus",
    icon: ICON_HOME,
    iconActive: ICON_HOME_FILL,
    iconColor: 'fill-blue-600',
    path: PATHNAME['app'],
  },
  {
    name: 'Urgent',
    tooltip: 'Urgent todos',
    icon: ICON_FLAG,
    iconActive: ICON_FLAG_FILL,
    iconColor: 'fill-red-600',
    path: PATHNAME['urgent'],
  },
  {
    name: 'Important',
    tooltip: 'Important todos',
    icon: ICON_LABEL_IMPORTANT,
    iconActive: ICON_LABEL_IMPORTANT_FILL,
    iconColor: 'fill-yellow-500',
    path: PATHNAME['important'],
  },
  {
    name: 'Show All',
    tooltip: 'Show all incomplete todos',
    icon: ICON_LIST,
    iconActive: ICON_LIST,
    iconColor: 'fill-purple-600',
    path: PATHNAME['showAll'],
  },
  {
    name: 'Completed',
    tooltip: 'Completed todos',
    icon: ICON_DONE_ALL,
    iconActive: ICON_DONE_ALL,
    iconColor: 'fill-green-600',
    path: PATHNAME['completed'],
  },
];

export const DATA_PATHNAME_IMAGE: TypesPathnameImage[] = [
  {
    path: '/focus.webp',
    alt: 'Placeholder image of focus',
    title: "Todos for today's focus",
    description:
      "Congratulations! You've completed all of your todos for today's focus. Take a moment to celebrate your accomplishments.",
  },
  {
    path: '/urgent.webp',
    alt: 'Placeholder image of urgent',
    title: 'Your urgent todos',
    description: 'Prioritize time-sensitive todos that require immediate attention.',
  },
  {
    path: '/important.webp',
    alt: 'Placeholder image of important',
    title: 'Your important todos',
    description: 'Identify todos that are crucial to your long-term goals and success.',
  },
  {
    path: '/showall.webp',
    alt: 'Placeholder image of showall',
    title: 'All uncompleted todos',
    description:
      'This is a complete list of all your todos, including those that have not yet been completed. Keep track of your progress here.',
  },
  {
    path: '/completed.webp',
    alt: 'Placeholder image of completed',
    title: 'Your completed todos',
    description: 'While there are no completed todos yet, every step counts towards achieving your goals.',
  },
  {
    path: '/label.webp',
    alt: 'Placeholder image of label',
    title: 'Your labeled todos',
    description: 'Organize your todos by using labels to keep track of your progress and priorities.',
  },
];
