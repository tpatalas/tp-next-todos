import { FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

export interface TypesEvents {
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  onClick: MouseEventHandler<HTMLElement>;
  onBlur: FocusEventHandler<HTMLElement>;
  onFocus: FocusEventHandler<HTMLElement>;
  onMouseOver: MouseEventHandler<HTMLElement>;
  onMouseDown: MouseEventHandler<HTMLElement>;
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  onDoubleClick: MouseEventHandler<HTMLElement>;
}

export type TypesClassNames = Record<UnionsClassNames, string>;

export type TypesAttributes = Record<UnionsAttributes, string>;

type UnionsClassNames =
  | 'group'
  | 'className'
  | 'color'
  | 'size'
  | 'padding'
  | 'menuItemsWidth'
  | 'checkedColor'
  | 'checkBoxColor'
  | 'borderRadius'
  | 'margin'
  | 'space'
  | 'text'
  | 'menuWidth'
  | 'menuHeight'
  | 'display'
  | 'width'
  | 'container'
  | 'hoverBg'
  | 'hoverRing'
  | 'transition'
  | 'zIndex';

type UnionsAttributes = 'ariaLabel' | 'testId';
