import { TypesOptionsButton } from '@lib/types/typesOptions';
import { Types } from 'lib/types';
import dynamic from 'next/dynamic';
import { forwardRef, useState } from 'react';

const Tooltip = dynamic(() => import('@tooltips/tooltips').then((mod) => mod.Tooltip), { ssr: false });

type Props = { options: TypesOptionsButton } & Partial<
  Pick<Types, 'onKeyDown' | 'children' | 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseOver'>
>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ options, onClick, onKeyDown, onDoubleClick, onMouseOver, children = options.name }: Props, ref) => {
    const [hasTooltip, setTooltip] = useState(false);

    return (
      <Tooltip
        tooltip={hasTooltip || options.isDisabled ? undefined : options.tooltip}
        kbd={hasTooltip || options.isDisabled ? undefined : options.kbd}
        placement={options.placement}
        offset={options.offset}>
        <button
          type={options.type || 'button'}
          className={options.className}
          disabled={options.isDisabled}
          onMouseOver={onMouseOver}
          onMouseDown={() => !options.isDisabled && setTooltip(true)}
          onMouseEnter={() => !options.isDisabled && setTooltip(false)}
          onMouseLeave={() => !options.isDisabled && setTooltip(true)}
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
