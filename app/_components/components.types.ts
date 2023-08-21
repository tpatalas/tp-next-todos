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

export type TypesAttributes = Record<UnionsAttributes, string>;

export interface TypesStyles {
  className: string;
}

type UnionsAttributes = 'ariaLabel' | 'testId';
