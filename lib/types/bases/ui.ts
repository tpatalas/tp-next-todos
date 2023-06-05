import { DURATION, GRADIENT_POSITION, GRADIENT_TYPE, POSITION_X, POSITION_Y } from '@constAssertions/ui';
import { Placement } from '@popperjs/core';
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';
import { TriggerType } from 'react-popper-tooltip';
import { Types } from '..';

export type CollectTypesUi = TypesReactChildren &
  TypesUi &
  TypesLoadings &
  TypesTooltipAttributes &
  TypesInputAttributes &
  TypesComboboxAttributes &
  TypesDropdownAttributes &
  TypesModals &
  TypesElement &
  TypesStyleAttributes;

export interface TypesReactChildren {
  children: ReactNode;
  checkBox: Types['children'];
  footerButtons: Types['children'];
  headerButtons: Types['children'];
  headerIcons: Types['children'];
  nestedModal: Types['children'];
}

export interface TypesUi {
  confirmTooltip: string | ReactElement;
  cancelTooltip: string | ReactElement;
  message: string;
  buttonStyle: string;
  show: boolean;
  onClose: (value: boolean) => void;
  isDialogOverlay: boolean;
  tooltipItem: Element;
  iconBgColor: string;
  itemTitle: string;
  isInitiallyVisible: boolean;
  hasDivider: boolean;
  menuItemId: string | null;
  priorityImportant: string;
  priorityUrgent: string;
  priorityNormal: string;
  isConditionalRendering: boolean;
  enterDuration: DURATION;
  leaveDuration: DURATION;
  isPortal: boolean;
  gradientType: GRADIENT_TYPE;
  gradientPosition: GRADIENT_POSITION;
  signInButtonName: 'Sign in' | 'Get started';
}

export interface TypesLoadings {
  loadingSkeleton: Types['children'];
  repeatingCount: number;
  delay: number;
}

export interface TypesStyleAttributes {
  group: string;
  className: string;
  color: string;
  size: string;
  padding: string;
  menuItemsWidth: string;
  checkedColor: string;
  checkBoxColor: string;
  borderRadius: string;
  margin: string;
  space: string;
  text: string;
  menuWidth: string;
  menuHeight: string;
  display: string;
  width: string;
  container: string;
  hoverBg: string;
  hoverRing: string;
  transition: string;
  zIndex: string;
}

export interface TypesTooltipAttributes {
  tooltip: string | ReactElement | null;
  kbd: string;
  delayShow: number;
  trigger: TriggerType | TriggerType[] | null;
  offset: [number, number];
  placement: Placement;
  isVisible: boolean;
  isCloseOnTriggerHidden: boolean;
}

export interface TypesComboboxAttributes {
  selected: unknown[];
  hasComboBoxBoardStyle: boolean;
  comboBoxInputButton: Types['children'];
}

export interface TypesDropdownAttributes {
  hasDropdownBoardStyle: boolean;
  open: boolean;
  menuContentOnClose: Types['children'];
  menuButtonContent: Types['children'];
  menuButtonIcon: Types['children'];
  referenceElement: HTMLDivElement | null;
}

export interface TypesInputAttributes {
  isChecked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputType: 'email' | 'password' | 'text';
  autoComplete: string;
  placeholder: string;
  required: boolean;
  isPasswordShown: boolean;
  inputValue: string | number | readonly string[];
  isError: boolean;
}

export interface TypesModals {
  onClickConfirm: Types['onClick'];
  onClickCancel: Types['onClick'];
  deletingItem: string;
}

export interface TypesElement {
  name: string;
  type: 'button' | 'submit' | 'reset' | 'checkbox';
  onClick: MouseEventHandler<HTMLElement>;
  onBlur: FocusEventHandler<HTMLElement>;
  onFocus: FocusEventHandler<HTMLElement>;
  onMouseOver: MouseEventHandler<HTMLElement>;
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  onDoubleClick: MouseEventHandler<HTMLElement>;
  tabIndex: number;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  positionX: POSITION_X;
  positionY: POSITION_Y;
  minimizedModalPadding: string;
  isNoValidate: boolean;
  isAriaHidden: boolean;
  ariaLabel: string;
  isDisabled: boolean;
  shouldKeepOpeningOnClick: boolean;
}
