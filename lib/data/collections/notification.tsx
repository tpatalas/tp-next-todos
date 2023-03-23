import { NOTIFICATION } from '@constAssertions/ui';
import {
  ICON_TASK_ALT,
  ICON_INFO,
  ICON_DELETE,
  ICON_EVENT_AVAILABLE,
  ICON_EVENT_BUSY,
  ICON_ERROR,
} from '@data/materialSymbols';
import { TypesNotification } from '@lib/types';

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
