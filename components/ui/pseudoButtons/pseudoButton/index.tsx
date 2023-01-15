import { TypesDataPseudoButton } from '@lib/types/typesData';
import { Types } from 'lib/types';
import dynamic from 'next/dynamic';
import { forwardRef, useState } from 'react';

const Tooltip = dynamic(() => import('@tooltips/tooltips').then((mod) => mod.Tooltip));

type Props = { data: TypesDataPseudoButton } & Partial<
  Pick<
    Types,
    'onKeyDown' | 'children' | 'onClick' | 'onDoubleClick' | 'onMouseEnter' | 'onMouseOver'
  >
>;

export const PseudoButton = forwardRef<HTMLDivElement, Props>(
  ({ data, onClick, onKeyDown, onDoubleClick, onMouseOver, children = data.name }: Props, ref) => {
    const [isClicked, setClick] = useState(false);

    return (
      <Tooltip
        tooltip={isClicked ? undefined : data.tooltip}
        kbd={isClicked ? undefined : data.kbd}
        placement={data.placement}
        offset={data.offset}>
        <div
          className={data.className}
          onMouseOver={onMouseOver}
          onMouseDown={() => setClick(true)}
          onMouseEnter={() => setClick(false)}
          onMouseLeave={() => setClick(true)}
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
