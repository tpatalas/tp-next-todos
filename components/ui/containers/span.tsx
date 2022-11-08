import { Types } from '@lib/types';
import { forwardRef, memo } from 'react';

type Props = Partial<Pick<Types, 'className' | 'children'>>;

export const Span = memo(
  forwardRef<HTMLSpanElement, Props>(({ children, className }: Props, ref) => {
    return (
      <span
        className={className}
        ref={ref}>
        {children}
      </span>
    );
  }),
);

Span.displayName = 'Span';
