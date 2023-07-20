'use client';

import { forwardRef } from 'react';
import { PropsDivContainer } from '../container.types';

export const DivContainer = forwardRef<HTMLDivElement, PropsDivContainer>(
  ({ children, className }: PropsDivContainer, ref) => {
    return (
      <div
        className={className}
        ref={ref}
        data-testid='divContainer-testid'
      >
        {children}
      </div>
    );
  },
);

DivContainer.displayName = 'DivContainer';
