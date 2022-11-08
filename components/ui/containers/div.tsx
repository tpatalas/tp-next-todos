import { Types } from '@lib/types';
import { TypesDataDivContainer } from '@lib/types/typesData';
import { forwardRef, memo } from 'react';

type Props = Partial<
  { data: TypesDataDivContainer } & Pick<Types, 'className' | 'children' | 'onDoubleClick' | 'onKeyDown' | 'onClick'>
>;

//Note: Not recommending of using object props and regular prop together('className' in this case) as optional since It increases the ambiguities of usage. However, since Div main usage is with className only in most of the situation, It is logical enough to mix them together as special case.

export const Div = memo(
  forwardRef<HTMLDivElement, Props>(
    ({ data, children, onDoubleClick, onKeyDown, onClick, className = data?.className }: Props, ref) => {
      return (
        <div
          tabIndex={data?.tabIndex}
          className={className}
          ref={ref}
          onDoubleClick={onDoubleClick}
          onKeyDown={onKeyDown}
          onClick={onClick}>
          {children}
        </div>
      );
    },
  ),
);

Div.displayName = 'Div';
