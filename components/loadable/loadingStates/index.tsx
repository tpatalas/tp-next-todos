import { classNames } from '@stateLogics/utils';
import { Fragment, useEffect, useState } from 'react';
import { TypesOptionsLoadingState } from '../loadable.types';

export const LoadingState = ({ options }: { options: TypesOptionsLoadingState }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Fragment>
      {show && (
        <div className={classNames(options.margin, options.space)}>
          {/* It is reasonable to use index as unique key as this component is static once prop is set */}
          {[...Array(options.repeatingCount)].map((_, index) => (
            <ul key={index}>{options.loadingSkeleton}</ul>
          ))}
        </div>
      )}
    </Fragment>
  );
};
