import { isMacOs } from 'react-device-detect';

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

export type USER = (typeof USER)[keyof typeof USER];
export const USER = {
  email: 'email',
  password: 'password',
} as const;

export type MODIFIER_KBD = (typeof MODIFIER_KBD)[keyof typeof MODIFIER_KBD];
export const MODIFIER_KBD = {
  'modifier + E': isMacOs ? '⌘ + E' : 'ctrl + E',
  'modifier + M': isMacOs ? '⌘ + M' : 'ctrl + M',
  'modifier + Enter': isMacOs ? '⌘ + Enter' : 'ctrl + Enter',
  'modifier + Escape': isMacOs ? '⌘ + Escape' : 'ctrl + Escape',
  'modifier + Delete': isMacOs ? '⌘ + Delete' : 'ctrl + Delete',
};
