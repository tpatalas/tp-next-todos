import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { Fragment } from 'react';
import { LoadingState } from '.';
import { DURATION } from '@constAssertions/ui';
import { optionsLoadingLabels } from '@options/loadingState';

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
