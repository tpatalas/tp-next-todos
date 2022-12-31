import { TypesDataLoadingState } from '@lib/types/typesData';
import { classNames } from '@lib/utils';
import { Fragment } from 'react';

export const LoadingState = ({
  data: { margin, space, loadingSkeleton, repeatingCount },
}: {
  data: TypesDataLoadingState;
}) => {
  return (
    <Fragment>
      <div className={classNames(margin, space)}>{Array(repeatingCount).fill(loadingSkeleton)}</div>
    </Fragment>
  );
};
