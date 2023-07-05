import { LoadingState } from '@components/loadable/loadingStates';
import { optionsLoadingTodos } from '@options/loadingState';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { Fragment as LoadingStateFragment } from 'react';

export const LoadingTodos = () => {
  return (
    <LoadingStateFragment>
      <SmoothTransition>
        <LoadingState options={optionsLoadingTodos} />
      </SmoothTransition>
    </LoadingStateFragment>
  );
};
