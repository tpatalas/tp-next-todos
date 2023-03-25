import { PRIORITY_LEVEL } from '@constAssertions/misc';
import { STYLE_HOVER_ENABLED_SLATE_DARK } from '@data/stylePreset';
import { TypesOptionsPriority } from '@lib/types/options';

// todoModal
export const optionsPriorityTodoModalImportant: TypesOptionsPriority = {
  priorityLevel: PRIORITY_LEVEL['important'],
  isInitiallyVisible: false,
  margin: '-ml-1',
  borderRadius: 'rounded-full focus-visible:rounded-full',
  hoverBg: STYLE_HOVER_ENABLED_SLATE_DARK,
};

export const optionsPriorityTodoModalUrgent: TypesOptionsPriority = {
  priorityLevel: PRIORITY_LEVEL['urgent'],
  isInitiallyVisible: false,
  margin: '-ml-1 mr-1',
  borderRadius: 'rounded-full focus-visible:rounded-full',
  hoverBg: STYLE_HOVER_ENABLED_SLATE_DARK,
};

// dropdown
export const optionsPriorityDropdownImportant: TypesOptionsPriority = {
  priorityLevel: PRIORITY_LEVEL['important'],
  isInitiallyVisible: true,
  priorityImportant: 'Mark as normal',
  priorityNormal: 'Mark as important',
  padding: 'px-4 py-2',
  container: 'w-full',
  width: 'w-full',
  display: 'flex flex-row',
};

export const optionsPriorityDropdownUrgent: TypesOptionsPriority = {
  priorityLevel: PRIORITY_LEVEL['urgent'],
  isInitiallyVisible: true,
  priorityUrgent: 'Mark as normal',
  priorityNormal: 'Mark as urgent',
  padding: 'px-4 py-2',
  container: 'w-full',
  width: 'w-full',
  display: 'flex flex-row',
};
