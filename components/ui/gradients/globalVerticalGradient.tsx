import { GRADIENT_POSITION, GRADIENT_TYPE } from '@data/dataTypesConst';
import { Types } from '@lib/types';
import { classNames } from '@states/utils';
import { Fragment } from 'react';

type Props = { options: Pick<Types, 'gradientType' | 'gradientPosition'> };

export const GlobalVerticalGradient = ({ options }: Props) => {
  const top = options.gradientPosition === GRADIENT_POSITION['top'];
  const bottom = options.gradientPosition === GRADIENT_POSITION['bottom'];

  return (
    <Fragment>
      {options.gradientType === GRADIENT_TYPE['single'] && (
        <div
          className={classNames(
            'pointer-events-none absolute right-4 z-10 h-10 w-[calc(100%-1rem)] bg-gradient-to-b from-slate-50',
            top && 'top-0',
            bottom && 'bottom-0',
          )}
        />
      )}
      {options.gradientType === GRADIENT_TYPE['double'] && (
        <div>
          <div
            className={classNames(
              'pointer-events-none absolute right-4 h-40 w-[calc(100%-1rem)] bg-gradient-to-t from-slate-50',
              top && 'top-0',
              bottom && 'bottom-0',
            )}
          />
          <div
            className={classNames(
              'absolute right-4 h-20 w-[calc(100%-1rem)] bg-gradient-to-t from-slate-50',
              top && 'top-0',
              bottom && 'bottom-0',
            )}
          />
        </div>
      )}
    </Fragment>
  );
};
