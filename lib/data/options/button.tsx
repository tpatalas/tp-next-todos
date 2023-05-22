import { MODIFIER_KBD } from '@constAssertions/misc';
import {
    ICON_CHEVRON_LEFT,
    ICON_CHEVRON_RIGHT,
    ICON_CLOSE,
    ICON_DELETE,
    ICON_MAXIMIZE,
    ICON_MENU,
    ICON_MINIMIZE,
    ICON_OPEN_IN_FULL,
    ICON_UNFOLD_MORE
} from '@data/materialSymbols';
import {
    STYLE_BUTTON_LARGE_BLUE,
    STYLE_BUTTON_NORMAL_BLUE,
    STYLE_BUTTON_NORMAL_RED,
    STYLE_BUTTON_NORMAL_WHITE,
    STYLE_HOVER_ENABLED_SLATE_DARK,
} from '@data/stylePreset';
import { TypesOptionsButton } from '@lib/types/options';
import { classNames } from '@stateLogics/utils';

// global
export const optionsButtonGlobalClose: TypesOptionsButton = {
  path: ICON_CLOSE,
  tooltip: 'Close',
  margin: '-mr-2 ml-2 -my-1',
};

// network Status
export const optionsButtonNetworkStatus: TypesOptionsButton = {
  isDisabled: true,
  className:
    'break-word inline-flex w-auto items-center justify-center rounded-lg border py-1 px-2 text-sm  shadow-sm',
  tooltip: (
    <span>
      <p className='px-1 pb-1 text-sm'>You are offline!</p>
      <p className='break-word w-36 whitespace-normal px-1'>
        Check your internet connection and try again later.
      </p>
    </span>
  ),
};

// create Todo
export const optionsButtonCreateTodo: TypesOptionsButton = {
  tooltip: 'Create todo',
  kbd: 'T',
  className: classNames(STYLE_BUTTON_LARGE_BLUE),
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
  kbd: MODIFIER_KBD['modifier + M'],
  margin: '-mr-2 ml-2 -my-1',
};

export const optionsButtonMiniModalOpenFull: TypesOptionsButton = {
  path: ICON_OPEN_IN_FULL,
  tooltip: 'Expand',
  kbd: MODIFIER_KBD['modifier + E'],
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
  kbd: MODIFIER_KBD['modifier + M'],
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

export const optionsButtonLabelRemove: TypesOptionsButton = {
  path: ICON_CLOSE,
  padding: 'p-[2px]',
  size: 'h-4 w-4',
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
