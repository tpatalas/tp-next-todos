import { classNames } from '@stateLogics/utils';
import { Fragment } from 'react';
import { TypesOptionsLoadingState } from '../loadable.types';

export const LoadingState = ({ options }: { options: TypesOptionsLoadingState }) => {
  return (
    <Fragment>
      <div
        className={classNames(options.margin, options.space)}
        data-testid='loadingState-testid'
      >
        {/* It is reasonable to use index as unique key as this component is static once prop is set */}
        {[...Array(options.repeatingCount)].map((_, index) => (
          <ul key={index}>{options.loadingSkeleton}</ul>
        ))}
      </div>
    </Fragment>
  );
};
