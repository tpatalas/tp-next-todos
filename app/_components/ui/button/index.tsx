'use client';

import { forwardRef } from 'react';
import { PropsButton } from './button.types';

export const Button = forwardRef<HTMLButtonElement, PropsButton>(
  (
    {
      options = {},
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
    const { ariaLabel, type = 'button', className, isDisabled } = options;
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
