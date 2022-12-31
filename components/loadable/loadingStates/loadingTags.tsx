import { Fragment } from 'react';
import { LoadingSkeletonTags } from './loadingSkeletons/loadingSkeletonTags';

export const LoadingTags1 = () => {
  return (
    <Fragment>
      <div className='ml-4 space-y-4'>{Array(10).fill(<LoadingSkeletonTags />)}</div>
    </Fragment>
  );
};
