import { optionsLoadingTodos } from '@options/loadingState';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { Fragment as LoadingStateFragment } from 'react';
import { LoadingState } from '.';

export const LoadingTodos = () => {
  return (
    <LoadingStateFragment>
      <SmoothTransition>
        <LoadingState options={optionsLoadingTodos} />
      </SmoothTransition>
    </LoadingStateFragment>
  );
};
