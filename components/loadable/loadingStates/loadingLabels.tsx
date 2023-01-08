import { Fragment } from 'react';
import { LoadingSkeletonLabels } from './loadingSkeletons/loadingSkeletonLabels';

export const LoadingLabels = () => {
  return (
    <Fragment>
      <div className='ml-4 space-y-4'>{Array(10).fill(<LoadingSkeletonLabels />)}</div>
    </Fragment>
  );
};
