import { optionsLoadingLabels } from '@data/dataOptions';
import { DURATION } from '@data/dataTypesObjects';
import { SmoothTransition } from '@ui/transitions/smoothTransition';
import { Fragment } from 'react';
import { LoadingState } from '.';

export const LoadingLabels = () => {
  return (
    <Fragment>
      <SmoothTransition
        enterDuration={DURATION[75]}
        leaveDuration={DURATION[300]}>
        <LoadingState options={optionsLoadingLabels} />
      </SmoothTransition>
    </Fragment>
  );
};
