import { Types } from '@lib/types';
import { forwardRef, memo } from 'react';

type Props = Partial<Pick<Types, 'className' | 'children'>>;

export const Para = memo(
  forwardRef<HTMLParagraphElement, Props>(({ children, className }: Props, ref) => {
    return (
      <p
        className={className}
        ref={ref}>
        {children}
      </p>
    );
  }),
);

Para.displayName = 'Para';
