import { dataLoadingLabels } from '@data/dataObjects';
import { Fragment } from 'react';
import { LoadingState } from '.';

export const LoadingLabels = () => {
  return (
    <Fragment>
      <LoadingState data={dataLoadingLabels} />
    </Fragment>
  );
};
