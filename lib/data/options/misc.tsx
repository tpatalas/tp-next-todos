import { POSITION_X, POSITION_Y } from '@constAssertions/ui';
import { ICON_NEW_LABEL } from '@data/materialSymbols';
import { TypesOptionsDropdown, TypesOptionsMinimizedModalTransition } from '@lib/types/options';
import { classNames } from '@stateLogics/utils';

/**
 * TypesOptionsDropdown
 */
// calendar
export const optionsDropdownCalendar: TypesOptionsDropdown = {
  borderRadius: classNames('rounded-lg focus-visible:rounded-lg'),
  padding: 'px-4 py-2',
  menuWidth: 'w-full',
  tooltip: 'Due date',
  hoverBg: 'bg-transparent',
};

// combobox
export const optionsDropdownComboBox: TypesOptionsDropdown = {
  path: ICON_NEW_LABEL,
  tooltip: 'Add label',
  hasDivider: false,
  menuItemsWidth: 'w-72',
  isPortal: true,
  borderRadius: 'rounded-lg',
};

/**
 * TypesOptionsMinimizedModalTransition
 */
// notification
export const optionsNotification: TypesOptionsMinimizedModalTransition = {
  positionX: POSITION_X['left'],
  positionY: POSITION_Y['bottom'],
};

export const optionsMinimizedModal: TypesOptionsMinimizedModalTransition = {
  positionX: POSITION_X['right'],
  positionY: POSITION_Y['bottom'],
};
