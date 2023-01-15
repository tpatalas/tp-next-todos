import { dataLoadingTodos } from '@data/dataObjects';
import { Fragment as LoadingStateFragment } from 'react';
import { LoadingState } from '.';

export const LoadingTodos = () => {
  return (
    <LoadingStateFragment>
      <LoadingState data={dataLoadingTodos} />
    </LoadingStateFragment>
  );
};
