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

export type GRADIENT_TYPE = (typeof GRADIENT_TYPE)[keyof typeof GRADIENT_TYPE];
export const GRADIENT_TYPE = {
  single: 'single',
  double: 'double',
} as const;

export type GRADIENT_POSITION = (typeof GRADIENT_POSITION)[keyof typeof GRADIENT_POSITION];
export const GRADIENT_POSITION = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
} as const;

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

export type DELAY = (typeof DELAY)[keyof typeof DELAY];
export const DELAY = {
  75: 'delay-75',
  100: 'delay-100',
  150: 'delay-150',
  200: 'delay-200',
  300: 'delay-300',
  500: 'delay-500',
  700: 'delay-700',
  1000: 'delay-1000',
} as const;

export type BREAKPOINT = (typeof BREAKPOINT)[keyof typeof BREAKPOINT];
export const BREAKPOINT = {
  sm: 640,
  md: 768,
  ml: 896,
  lg: 1024,
  xl: 1280,
} as const;
