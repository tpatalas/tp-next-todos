import { GRADIENT_POSITION, GRADIENT_TYPE } from '@constAssertions/ui';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { Fragment } from 'react';
import { isMobile } from 'react-device-detect';

type Props = { options: Pick<Types, 'gradientType' | 'gradientPosition'> };

export const GlobalVerticalGradient = ({ options }: Props) => {
  const top = options.gradientPosition === GRADIENT_POSITION['top'];
  const bottom = options.gradientPosition === GRADIENT_POSITION['bottom'];

  return (
    <Fragment>
      {options.gradientType === GRADIENT_TYPE['single'] && (
        <div
          className={classNames(
            'pointer-events-none absolute right-5 z-10 w-[calc(100%-1.4rem)] rounded-xl border-none bg-gradient-to-b from-slate-50',
            isMobile ? 'h-5' : 'h-10',
            top && 'top-0 mt-[0.05rem]',
            bottom && 'bottom-0 mb-[0.05rem]',
          )}
        />
      )}
      {options.gradientType === GRADIENT_TYPE['double'] && (
        <div>
          <div
            className={classNames(
              'pointer-events-none absolute right-5 h-40 w-[calc(100%-1.4rem)] rounded-xl bg-gradient-to-t from-slate-50',
              top && 'top-0',
              bottom && 'bottom-0',
            )}
          />
          <div
            className={classNames(
              'absolute right-5 h-20 w-[calc(100%-1.4rem)] rounded-xl bg-gradient-to-t from-slate-50',
              top && 'top-0',
              bottom && 'bottom-0',
            )}
          />
        </div>
      )}
    </Fragment>
  );
};
