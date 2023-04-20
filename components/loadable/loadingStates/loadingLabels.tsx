import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { Fragment } from 'react';
import { LoadingState } from '.';
import { DURATION } from '@constAssertions/ui';
import { optionsLoadingLabels } from '@options/loadingState';

export const LoadingLabels = () => {
  const transitionOptions = { enterDuration: DURATION['500'], leaveDuration: DURATION['500'] };

  return (
    <Fragment>
      <SmoothTransition
        type='fadeOut'
        options={transitionOptions}>
        <LoadingState options={optionsLoadingLabels} />
      </SmoothTransition>
    </Fragment>
  );
};
