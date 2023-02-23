import { optionsLoadingTodos } from '@data/dataOptions';
import { DURATION } from '@data/dataTypesConst';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { Fragment as LoadingStateFragment } from 'react';
import { LoadingState } from '.';

export const LoadingTodos = () => {
  return (
    <LoadingStateFragment>
      <SmoothTransition
        enterDuration={DURATION['75']}
        leaveDuration={DURATION['1000']}>
        <LoadingState options={optionsLoadingTodos} />
      </SmoothTransition>
    </LoadingStateFragment>
  );
};
