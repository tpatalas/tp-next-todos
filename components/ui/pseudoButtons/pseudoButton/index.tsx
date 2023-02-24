import { TypesOptionsPseudoButton } from '@lib/types/typesOptions';
import { Types } from 'lib/types';
import dynamic from 'next/dynamic';
import { forwardRef, useState } from 'react';

const Tooltip = dynamic(() => import('@tooltips/tooltips').then((mod) => mod.Tooltip));

type Props = { options: TypesOptionsPseudoButton } & Partial<
  Pick<Types, 'onKeyDown' | 'children' | 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseOver'>
>;

export const PseudoButton = forwardRef<HTMLDivElement, Props>(
  ({ options, onClick, onKeyDown, onDoubleClick, onMouseOver, children = options.name }: Props, ref) => {
    const [hasTooltip, setTooltip] = useState(false);

    return (
      <Tooltip
        tooltip={hasTooltip ? undefined : options.tooltip}
        kbd={hasTooltip ? undefined : options.kbd}
        placement={options.placement}
        offset={options.offset}>
        <div
          className={options.className}
          onMouseOver={onMouseOver}
          onMouseDown={() => setTooltip(true)}
          onMouseEnter={() => setTooltip(false)}
          onMouseLeave={() => setTooltip(true)}
          onWheel={() => setTooltip(true)}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onDoubleClick={onDoubleClick}
          ref={ref}>
          {children}
        </div>
      </Tooltip>
    );
  },
);
PseudoButton.displayName = 'PseudoButton';
