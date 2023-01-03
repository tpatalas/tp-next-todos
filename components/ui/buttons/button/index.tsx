import { TypesDataButton } from '@lib/types/typesData';
import { Types } from 'lib/types';
import dynamic from 'next/dynamic';
import { forwardRef, useState } from 'react';

const Tooltip = dynamic(() => import('@tooltips/tooltips').then((mod) => mod.Tooltip));

type Props = { data: TypesDataButton } & Partial<
  Pick<
    Types,
    'onKeyDown' | 'children' | 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseOver'
  >
>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ data, onClick, onKeyDown, onDoubleClick, onMouseOver, children = data.name }: Props, ref) => {
    const [isClicked, setClick] = useState(false);

    return (
      <Tooltip
        tooltip={isClicked ? undefined : data.tooltip}
        kbd={isClicked ? undefined : data.kbd}
        placement={data.placement}
        offset={data.offset}>
        <button
          type={data.type || 'button'}
          className={data.className}
          disabled={data.disabled}
          onMouseOver={onMouseOver}
          onMouseDown={() => !data.disabled && setClick(true)}
          onMouseEnter={() => !data.disabled && setClick(false)}
          onMouseLeave={() => !data.disabled && setClick(true)}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onDoubleClick={onDoubleClick}
          ref={ref}>
          {children}
        </button>
      </Tooltip>
    );
  },
);
Button.displayName = 'Button';
