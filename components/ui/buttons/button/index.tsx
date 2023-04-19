import { TypesOptionsButton } from '@lib/types/options';
import { Types } from 'lib/types';
import dynamic from 'next/dynamic';
import { forwardRef, useState } from 'react';

const Tooltip = dynamic(() => import('@tooltips/tooltips').then((mod) => mod.Tooltip));

type Props = { options: TypesOptionsButton } & Partial<
  Pick<
    Types,
    'onKeyDown' | 'children' | 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseOver'
  >
>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { options, onClick, onKeyDown, onDoubleClick, onMouseOver, children = options.name }: Props,
    ref,
  ) => {
    const [hasTooltip, setTooltip] = useState(false);

    const tooltipOptions = {
      container: options.container,
      tooltip: (hasTooltip || options.isDisabled) && !options.tooltip ? undefined : options.tooltip,
      kbd: (hasTooltip || options.isDisabled) && !options.kbd ? undefined : options.kbd,
      placement: options.placement,
      offset: options.offset,
    };

    return (
      <Tooltip options={tooltipOptions}>
        <button
          aria-label={options.ariaLabel}
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
