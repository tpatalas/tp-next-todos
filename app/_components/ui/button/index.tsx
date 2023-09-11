'use client';

import { forwardRef } from 'react';
import { PropsButton } from './button.types';

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
    const { 'aria-label': ariaLabel, type, disabled, className } = configs;
    return (
      <button
        aria-label={ariaLabel}
        type={type}
        className={className?.button}
        disabled={disabled}
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
