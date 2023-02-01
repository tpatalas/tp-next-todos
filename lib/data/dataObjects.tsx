import { LoadingSkeletonLabels } from '@components/loadable/loadingStates/loadingSkeletons/loadingSkeletonLabels';
import { LoadingSkeletonTodos } from '@components/loadable/loadingStates/loadingSkeletons/loadingSkeletonTodos';
import {
    TypesDataButton,
    TypesDataDropdown,
    TypesDataLoadingState,
    TypesDataMinimizedModalTransition,
    TypesDataPriority,
    TypesDataSvg
} from '@lib/types/typesData';
import { classNames } from '@states/utils';
import { isMacOs } from 'react-device-detect';
import { POSITION_X, POSITION_Y, PRIORITY_LEVEL } from './dataTypesObjects';
import {
    ICON_CHEVRON_LEFT,
    ICON_CHEVRON_RIGHT,
    ICON_CLOSE,
    ICON_DELETE,
    ICON_EVENT_AVAILABLE_FILL,
    ICON_FLAG_FILL,
    ICON_LABEL_IMPORTANT_FILL,
    ICON_MAXIMIZE,
    ICON_MINIMIZE,
    ICON_NEW_LABEL,
    ICON_OPEN_IN_FULL,
    ICON_REPORT,
    ICON_WARNING
} from './materialSymbols';
import {
    STYLE_BUTTON_NORMAL_BLUE,
    STYLE_BUTTON_NORMAL_RED,
    STYLE_BUTTON_NORMAL_WHITE,
    STYLE_BUTTON_WIDE_BLUE
} from './stylePreset';

/**
 * * TypesDataSvg
 */
// Network Status
export const dataSvgNetworkStatus: TypesDataSvg = {
  path: ICON_WARNING,
  className: 'h-4 w-4 fill-red-500',
};

// Priority
export const dataSvgPriorityUrgent: TypesDataSvg = {
  path: ICON_FLAG_FILL,
  className: 'h-4 w-4 fill-red-600',
};

export const dataSvgPriorityImportant: TypesDataSvg = {
  path: ICON_LABEL_IMPORTANT_FILL,
  className: 'h-4 w-4 fill-yellow-500',
};

// Calendar
export const dataSvgCalendarDueDate: TypesDataSvg = {
  path: ICON_EVENT_AVAILABLE_FILL,
  className: 'h-4 w-4 fill-blue-500',
};

// ConfirmModal
export const dataSvgConfirmModalHeaderIcon: TypesDataSvg = {
  path: ICON_REPORT,
  className: 'h-10 w-10 fill-red-600',
};

export const dataSvgConfirmModalDelete: TypesDataSvg = {
  path: ICON_DELETE,
  className: 'h-10 w-10 fill-red-600',
};

/**
 * * TypesDataButton
 */

// Global
export const dataButtonGlobalClose: TypesDataButton = {
  path: ICON_CLOSE,
  tooltip: 'Close',
  margin: '-mr-2 ml-2 -my-1',
};

// Network Status
export const dataButtonNetworkStatus: TypesDataButton = {
  isDisabled: true,
  className:
    'break-word inline-flex w-auto items-center justify-center rounded-md border py-1 px-2 text-sm  shadow-sm',
  tooltip: (
    <span>
      <p className='px-1 pb-1 text-sm'>You are offline!</p>
      <p className='break-word w-36 whitespace-normal px-1'>
        Check your internet connection and try again later.
      </p>
    </span>
  ),
};

// Create Todo
export const dataButtonCreateTodo: TypesDataButton = {
  tooltip: 'Create todo',
  kbd: 'T',
  className: classNames(STYLE_BUTTON_WIDE_BLUE),
};

// Calendar
export const dataButtonCalendarPrevMonth: TypesDataButton = {
  path: ICON_CHEVRON_LEFT,
  tooltip: 'Previous month',
};

export const dataButtonCalendarNextMonth: TypesDataButton = {
  path: ICON_CHEVRON_RIGHT,
  tooltip: 'Next month',
};

export const dataButtonCalendarResetDate: TypesDataButton = {
  path: ICON_DELETE,
  color: 'fill-gray-500 [.group-button:hover_&]:fill-red-600',
  tooltip: 'Reset date',
};

export const dataButtonCalendarCancel: TypesDataButton = {
  className: classNames(STYLE_BUTTON_NORMAL_WHITE, 'mr-3'),
  tooltip: 'Cancel',
};

export const dataButtonCalendarConfirm: TypesDataButton = {
  className: classNames(STYLE_BUTTON_NORMAL_BLUE),
  tooltip: 'Confirm',
};

// Confirm Modal
export const dataButtonConfirmModalDelete: TypesDataButton = {
  className: STYLE_BUTTON_NORMAL_RED,
  tooltip: 'Delete',
  kbd: 'Enter',
};

export const dataButtonConfirmModalDiscard: TypesDataButton = {
  className: STYLE_BUTTON_NORMAL_RED,
  tooltip: 'Discard',
  kbd: 'Enter',
};

export const dataButtonConfirmModalCancelIcon: TypesDataButton = {
  path: ICON_CLOSE,
  tooltip: 'Close',
  kbd: 'Escape',
};

export const dataButtonConfirmModalCancel: TypesDataButton = {
  className: classNames(STYLE_BUTTON_NORMAL_WHITE, 'mr-3'),
  tooltip: 'Cancel',
  kbd: 'Escape',
};

// Minimized Modal
export const dataButtonMiniModalMaximize: TypesDataButton = {
  path: ICON_MAXIMIZE,
  tooltip: 'Exit minimize',
  kbd: isMacOs ? '⌘ M' : 'Ctrl M',
  margin: '-mr-2 ml-2 -my-1',
};

export const dataButtonMiniModalOpenFull: TypesDataButton = {
  path: ICON_OPEN_IN_FULL,
  tooltip: 'Expand',
  kbd: isMacOs ? '⌘ E' : 'Ctrl E',
  margin: '-mr-2 ml-2 -my-1',
};

// Create TodoModal
export const dataButtonTodoModalAddTodo: TypesDataButton = {
  tooltip: 'Add todo',
  kbd: 'Enter',
  className: classNames(STYLE_BUTTON_NORMAL_BLUE, 'mx-2'),
};

export const dataButtonTodoModalMinimize: TypesDataButton = {
  path: ICON_MINIMIZE,
  tooltip: 'Minimize',
  kbd: isMacOs ? '⌘ M' : 'Ctrl M',
};

export const dataButtonTodoModalClose: TypesDataButton = {
  path: ICON_CLOSE,
  tooltip: 'Close',
  kbd: 'Escape',
};

export const dataButtonTodoModalCancel: TypesDataButton = {
  className: STYLE_BUTTON_NORMAL_WHITE,
  tooltip: 'Cancel',
  kbd: 'Escape',
};

// Item TodoModal
export const dataButtonItemModalUpdate: TypesDataButton = {
  tooltip: 'Update',
  kbd: 'Enter',
  className: classNames(STYLE_BUTTON_NORMAL_BLUE, 'mx-3'),
};

// Labels
export const dataButtonLabelModalAddLabel: TypesDataButton = {
  tooltip: 'Add label',
  kbd: 'Enter',
  className: classNames(STYLE_BUTTON_NORMAL_BLUE, 'mx-2'),
};

export const dataButtonLabelModalUpdateLabel: TypesDataButton = {
  tooltip: 'Update label',
  kbd: 'Enter',
  className: classNames(STYLE_BUTTON_NORMAL_BLUE, 'mx-2'),
};

/**
 * * TypesDataPriority
 */

// .TodoModal
export const dataPriorityTodoModalImportant: TypesDataPriority = {
  priorityLevel: PRIORITY_LEVEL['important'],
  isInitiallyVisible: false,
  margin: '-ml-1',
};

export const dataPriorityTodoModalUrgent: TypesDataPriority = {
  priorityLevel: PRIORITY_LEVEL['urgent'],
  isInitiallyVisible: false,
  margin: '-ml-1 mr-1',
};

// Dropdown
export const dataPriorityDropdownImportant: TypesDataPriority = {
  priorityLevel: PRIORITY_LEVEL['important'],
  isInitiallyVisible: true,
  priorityImportant: 'Mark as normal',
  priorityNormal: 'Mark as important',
  padding: 'px-4 py-2',
  container: 'w-full',
  width: 'w-full',
  display: 'flex flex-row',
};

export const dataPriorityDropdownUrgent: TypesDataPriority = {
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
 * * TypesDataDropdown
 */
// Calendar
export const dataDropdownCalendar: TypesDataDropdown = {
  borderRadius: classNames('rounded-md focus-visible:rounded-md'),
  padding: 'px-4 py-2',
  menuWidth: 'w-full',
  tooltip: 'Due date',
  hoverBg: 'bg-transparent',
};

// Combobox
export const dataDropdownComboBox: TypesDataDropdown = {
  path: ICON_NEW_LABEL,
  tooltip: 'Add label',
  hasDivider: false,
  contentWidth: 'w-72',
  isPortal: true,
};

/**
 * * TypesDataMinimizedModalTransition
 */
// Notification
export const dataNotification: TypesDataMinimizedModalTransition = {
  positionX: POSITION_X['left'],
  positionY: POSITION_Y['bottom'],
};

export const dataMinimizedModal: TypesDataMinimizedModalTransition = {
  positionX: POSITION_X['right'],
  positionY: POSITION_Y['bottom'],
};

/*
 * TypesDataLoadingState
 **/
// LoadingState
export const dataLoadingTodos: TypesDataLoadingState = {
  loadingSkeleton: <LoadingSkeletonTodos />,
  repeatingCount: 10,
  margin: 'ml-7 mt-5',
  space: 'space-y-10',
};

export const dataLoadingLabels: TypesDataLoadingState = {
  loadingSkeleton: <LoadingSkeletonLabels />,
  repeatingCount: 10,
  margin: 'ml-4',
  space: 'space-y-4',
};
