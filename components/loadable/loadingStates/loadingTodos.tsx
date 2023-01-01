import { Fragment as LoadingStateFragment } from 'react';
import { LoadingSkeletonTodos } from './loadingSkeletons/loadingSkeletonTodos';

export const LoadingTodos0 = () => {
  return (
    <LoadingStateFragment>
      <div className='ml-8 mt-5 space-y-10'>{Array(10).fill(<LoadingSkeletonTodos />)}</div>
    </LoadingStateFragment>
  );
};
