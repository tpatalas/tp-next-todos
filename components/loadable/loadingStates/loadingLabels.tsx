import { optionsLoadingLabels } from '@options/loadingState';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { Fragment } from 'react';
import { LoadingState } from '.';

export const LoadingLabels = () => {
  return (
    <Fragment>
      <SmoothTransition>
        <LoadingState options={optionsLoadingLabels} />
      </SmoothTransition>
    </Fragment>
  );
};
