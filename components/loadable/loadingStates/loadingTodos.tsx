import { dataLoadingTodos } from '@data/dataObjects';
import { DURATION } from '@data/dataTypesObjects';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { Fragment as LoadingStateFragment } from 'react';
import { LoadingState } from '.';

export const LoadingTodos = () => {
  return (
    <LoadingStateFragment>
      <SmoothTransition
        enterDuration={DURATION[75]}
        leaveDuration={DURATION[500]}>
        <LoadingState data={dataLoadingTodos} />
      </SmoothTransition>
    </LoadingStateFragment>
  );
};
