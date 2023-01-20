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
    const [hasTooltip, setTooltip] = useState(false);

    return (
      <Tooltip
        tooltip={hasTooltip || data.isDisabled ? undefined : data.tooltip}
        kbd={hasTooltip || data.isDisabled ? undefined : data.kbd}
        placement={data.placement}
        offset={data.offset}>
        <button
          type={data.type || 'button'}
          className={data.className}
          disabled={data.isDisabled}
          onMouseOver={onMouseOver}
          onMouseDown={() => !data.isDisabled && setTooltip(true)}
          onMouseEnter={() => !data.isDisabled && setTooltip(false)}
          onMouseLeave={() => !data.isDisabled && setTooltip(true)}
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
