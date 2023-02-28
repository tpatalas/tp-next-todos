import { optionsLoadingLabels } from '@data/dataOptions';
import { DURATION } from '@data/dataTypesConst';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { Fragment } from 'react';
import { LoadingState } from '.';

export const LoadingLabels = () => {
  return (
    <Fragment>
      <SmoothTransition
        enterDuration={DURATION['500']}
        leaveDuration={DURATION['500']}>
        <LoadingState options={optionsLoadingLabels} />
      </SmoothTransition>
    </Fragment>
  );
};
