import { GRADIENT_POSITION } from '@data/dataTypesConst';
import { Types } from '@lib/types';
import { classNames } from '@states/utils';
import { useHorizontalScrollPosition } from '@states/utils/hooks';
import {
  Fragment as GradientFragment,
  Fragment as GradientLeftFragment,
  Fragment as GradientRightFragment,
} from 'react';

type Props = Pick<Types, 'scrollRef'> & Partial<{ position: GRADIENT_POSITION }>;

export const LabelsHorizontalGradients = ({ scrollRef, position }: Props) => {
  const { leftPosition, rightPosition, isOverflow } = useHorizontalScrollPosition(scrollRef);

  return (
    <GradientFragment>
      {position === GRADIENT_POSITION['left'] && (
        <GradientLeftFragment>
          <div
            className={classNames(
              'absolute -left-2 top-1/2 ml-1 block h-[calc(100%-20%)] w-10 -translate-y-2/4 bg-gradient-to-r sm:-left-2',
              leftPosition > 0 && 'from-slate-50 group-hover/focuser:from-slate-100 group-focus/focuser:from-blue-100',
            )}
          />
        </GradientLeftFragment>
      )}
      {position === GRADIENT_POSITION['right'] && (
        <GradientRightFragment>
          <div
            className={classNames(
              'absolute top-1/2 -right-1 block h-[calc(100%-20%)] w-5 -translate-y-2/4 bg-gradient-to-l sm:-right-1',
              isOverflow &&
                rightPosition !== 0 &&
                'from-slate-50 group-hover/focuser:from-slate-100 group-focus/focuser:from-blue-100',
              rightPosition === 0 &&
                'from-transparent group-hover/focuser:from-transparent group-focus/focuser:from-transparent',
              isOverflow && rightPosition < 0 && 'from-slate-50 group-hover/focuser:from-slate-100',
            )}
          />
        </GradientRightFragment>
      )}
    </GradientFragment>
  );
};
