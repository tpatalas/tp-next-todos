'use client';

import { forwardRef } from 'react';
import { PropsButton } from './button.types';

/*
 * Default should not be included within the client component
 * Instead the value such as styles or classNames should be passed from the server component
 * */

export const Button = forwardRef<HTMLButtonElement, PropsButton>(
  (
    {
      configs = {},
      children,
      onClick,
      onKeyDown,
      onDoubleClick,
      onMouseOver,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
    }: PropsButton,
    ref,
  ) => {
    const { ariaLabel, type = 'button', isDisabled, className } = configs;
    return (
      <button
        aria-label={ariaLabel}
        type={type}
        className={className}
        disabled={isDisabled}
        onMouseOver={onMouseOver}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onDoubleClick={onDoubleClick}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
