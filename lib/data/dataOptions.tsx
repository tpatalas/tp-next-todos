import { LoadingSkeletonLabels } from '@components/loadable/loadingStates/loadingSkeletons/loadingSkeletonLabels';
import { LoadingSkeletonTodos } from '@components/loadable/loadingStates/loadingSkeletons/loadingSkeletonTodos';
import {
  TypesOptionsButton,
  TypesOptionsDropdown,
  TypesOptionsLoadingState,
  TypesOptionsMinimizedModalTransition,
  TypesOptionsPriority,
  TypesOptionsSvg,
} from '@lib/types/typesOptions';
import { classNames } from '@states/utils';
import { isMacOs } from 'react-device-detect';
import { PRIORITY_LEVEL, POSITION_X, POSITION_Y } from './dataTypesConst';
import {
  ICON_CHEVRON_LEFT,
  ICON_CHEVRON_RIGHT,
  ICON_CLOSE,
  ICON_DELETE,
  ICON_EVENT_AVAILABLE_FILL,
  ICON_FLAG_FILL,
  ICON_LABEL,
  ICON_LABEL_FILL,
  ICON_LABEL_IMPORTANT_FILL,
  ICON_MAXIMIZE,
  ICON_MENU,
  ICON_MINIMIZE,
  ICON_MORE_VERT,
  ICON_NEW_LABEL,
  ICON_OPEN_IN_FULL,
  ICON_REPORT,
  ICON_UNFOLD_MORE,
  ICON_WARNING,
} from './materialSymbols';
import {
  STYLE_BUTTON_NORMAL_BLUE,
  STYLE_BUTTON_NORMAL_RED,
  STYLE_BUTTON_NORMAL_WHITE,
  STYLE_BUTTON_WIDE_BLUE,
  STYLE_HOVER_ENABLED_SLATE_DARK,
} from './stylePreset';

/**
 * * TypesOptionsSvg
 */
// network status
export const optionsSvgNetworkStatus: TypesOptionsSvg = {
  path: ICON_WARNING,
  className: 'h-4 w-4 fill-red-500',
};

// priority
export const optionsSvgPriorityUrgent: TypesOptionsSvg = {
  path: ICON_FLAG_FILL,
  className: 'h-4 w-4 fill-red-600',
};

export const optionsSvgPriorityImportant: TypesOptionsSvg = {
  path: ICON_LABEL_IMPORTANT_FILL,
  className: 'h-4 w-4 fill-yellow-500',
};

// calendar
export const optionsSvgCalendarDueDate: TypesOptionsSvg = {
  path: ICON_EVENT_AVAILABLE_FILL,
  className: 'h-4 w-4 fill-blue-500',
};

// confirmModal
export const optionsSvgConfirmModalHeaderIcon: TypesOptionsSvg = {
  path: ICON_REPORT,
  className: 'h-10 w-10 fill-red-600',
};

export const optionsSvgConfirmModalDelete: TypesOptionsSvg = {
  path: ICON_DELETE,
  className: 'h-10 w-10 fill-red-600',
};

/**
 * * TypesOptionsButton
 */

// global
export const optionsButtonGlobalClose: TypesOptionsButton = {
  path: ICON_CLOSE,
  tooltip: 'Close',
  margin: '-mr-2 ml-2 -my-1',
};

// network Status
export const optionsButtonNetworkStatus: TypesOptionsButton = {
  isDisabled: true,
  className: 'break-word inline-flex w-auto items-center justify-center rounded-md border py-1 px-2 text-sm  shadow-sm',
  tooltip: (
    <span>
      <p className='px-1 pb-1 text-sm'>You are offline!</p>
      <p className='break-word w-36 whitespace-normal px-1'>Check your internet connection and try again later.</p>
    </span>
  ),
};

// create Todo
export const optionsButtonCreateTodo: TypesOptionsButton = {
  tooltip: 'Create todo',
  kbd: 'T',
  className: classNames(STYLE_BUTTON_WIDE_BLUE),
};

// calendar
export const optionsButtonCalendarPrevMonth: TypesOptionsButton = {
  path: ICON_CHEVRON_LEFT,
  tooltip: 'Previous month',
};

export const optionsButtonCalendarNextMonth: TypesOptionsButton = {
  path: ICON_CHEVRON_RIGHT,
  tooltip: 'Next month',
};

export const optionsButtonCalendarResetDate: TypesOptionsButton = {
  path: ICON_DELETE,
  color: 'fill-gray-500 [.group-button:hover_&]:fill-red-600',
  tooltip: 'Reset date',
};

export const optionsButtonCalendarCancel: TypesOptionsButton = {
  className: classNames(STYLE_BUTTON_NORMAL_WHITE, 'mr-3'),
  tooltip: 'Cancel',
};

export const optionsButtonCalendarConfirm: TypesOptionsButton = {
  className: classNames(STYLE_BUTTON_NORMAL_BLUE),
  tooltip: 'Confirm',
};

// confirm Modal
export const optionsButtonConfirmModalDelete: TypesOptionsButton = {
  className: STYLE_BUTTON_NORMAL_RED,
  tooltip: 'Delete',
  kbd: 'Enter',
};

export const optionsButtonConfirmModalDiscard: TypesOptionsButton = {
  className: STYLE_BUTTON_NORMAL_RED,
  tooltip: 'Discard',
  kbd: 'Enter',
};

export const optionsButtonConfirmModalCancelIcon: TypesOptionsButton = {
  path: ICON_CLOSE,
  tooltip: 'Close',
  kbd: 'Escape',
};

export const optionsButtonConfirmModalCancel: TypesOptionsButton = {
  className: classNames(STYLE_BUTTON_NORMAL_WHITE, 'mr-3'),
  tooltip: 'Cancel',
  kbd: 'Escape',
};

// minimized Modal
export const optionsButtonMiniModalMaximize: TypesOptionsButton = {
  path: ICON_MAXIMIZE,
  tooltip: 'Exit minimize',
  kbd: isMacOs ? '⌘ M' : 'Ctrl M',
  margin: '-mr-2 ml-2 -my-1',
};

export const optionsButtonMiniModalOpenFull: TypesOptionsButton = {
  path: ICON_OPEN_IN_FULL,
  tooltip: 'Expand',
  kbd: isMacOs ? '⌘ E' : 'Ctrl E',
  margin: '-mr-2 ml-2 -my-1',
};

// create TodoModal
export const optionsButtonTodoModalAddTodo: TypesOptionsButton = {
  tooltip: 'Add todo',
  kbd: 'Enter',
  className: classNames(STYLE_BUTTON_NORMAL_BLUE, 'mx-2'),
};

export const optionsButtonTodoModalMinimize: TypesOptionsButton = {
  path: ICON_MINIMIZE,
  tooltip: 'Minimize',
  kbd: isMacOs ? '⌘ M' : 'Ctrl M',
};

export const optionsButtonTodoModalClose: TypesOptionsButton = {
  path: ICON_CLOSE,
  tooltip: 'Close',
  kbd: 'Escape',
};

export const optionsButtonTodoModalCancel: TypesOptionsButton = {
  className: STYLE_BUTTON_NORMAL_WHITE,
  tooltip: 'Cancel',
  kbd: 'Escape',
};

// item TodoModal
export const optionsButtonItemModalUpdate: TypesOptionsButton = {
  tooltip: 'Update',
  kbd: 'Enter',
  className: classNames(STYLE_BUTTON_NORMAL_BLUE, 'mx-3'),
};

// labels
export const optionsButtonLabelModalAddLabel: TypesOptionsButton = {
  tooltip: 'Add label',
  kbd: 'Enter',
  className: classNames(STYLE_BUTTON_NORMAL_BLUE, 'mx-2'),
};

export const optionsButtonLabelModalUpdateLabel: TypesOptionsButton = {
  tooltip: 'Update label',
  kbd: 'Enter',
  className: classNames(STYLE_BUTTON_NORMAL_BLUE, 'mx-2'),
};

export const optionsButtonLabelRouteMatched: TypesOptionsButton = {
  path: ICON_LABEL_FILL,
  className: 'h-5 w-5 fill-yellow-500',
};
export const optionsButtonLabelRouteUnmatched: TypesOptionsButton = {
  path: ICON_LABEL,
  className: 'h-5 w-5 fill-gray-500 group-hover:fill-yellow-500 ',
};

export const optionsButtonLabelAddMore: TypesOptionsButton = {
  path: ICON_NEW_LABEL,
  tooltip: 'Add new label',
  padding: 'p-2',
  color: 'hover:enabled:bg-fill-700',
};

export const optionsButtonLabelRemove: TypesOptionsButton = {
  path: ICON_CLOSE,
  padding: 'p-[2px]',
  size: 'h-4 w-4',
  color: 'fill-gray-700 hover:fill-gray-900',
  container: 'h-5',
};

// sidebar
export const optionsButtonSidebarToggle: TypesOptionsButton = {
  path: ICON_MENU,
  size: 'h-6 w-6',
  hoverBg: STYLE_HOVER_ENABLED_SLATE_DARK,
};

// comboBox
export const optionsButtonComboBoxToggle: TypesOptionsButton = {
  path: ICON_UNFOLD_MORE,
  padding: 'p-1',
  color: 'fill-gray-400',
  tooltip: 'Open/close a list',
};

/**
 * * TypesOptionsPriority
 */

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

/**
 * * TypesOptionsDropdown
 */
// calendar
export const optionsDropdownCalendar: TypesOptionsDropdown = {
  borderRadius: classNames('rounded-md focus-visible:rounded-md'),
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
// labels
export const optionsDropdownLabelItem: TypesOptionsDropdown = {
  tooltip: 'Menu',
  path: ICON_MORE_VERT,
  padding: 'p-[0.3rem]',
  color: 'fill-gray-500 group-hover:fill-gray-700',
  isPortal: true,
};

/**
 * * TypesOptionsMinimizedModalTransition
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

/*
 * TypesOptionsLoadingState
 **/
// loadingState
export const optionsLoadingTodos: TypesOptionsLoadingState = {
  loadingSkeleton: <LoadingSkeletonTodos />,
  repeatingCount: 10,
  margin: 'ml-4 sm:ml-1 mt-5',
  space: 'space-y-10',
};

export const optionsLoadingLabels: TypesOptionsLoadingState = {
  loadingSkeleton: <LoadingSkeletonLabels />,
  repeatingCount: 10,
  margin: 'ml-4',
  space: 'space-y-4',
};
