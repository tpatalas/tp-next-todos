import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { Fragment as LoadingStateFragment } from 'react';
import { LoadingState } from '.';
import { DURATION } from '@constAssertions/ui';
import { optionsLoadingTodos } from '@options/loadingState';

export const LoadingTodos = () => {
  return (
    <LoadingStateFragment>
      <SmoothTransition
        enterDuration={DURATION['500']}
        leaveDuration={DURATION['500']}>
        <LoadingState options={optionsLoadingTodos} />
      </SmoothTransition>
    </LoadingStateFragment>
  );
};
