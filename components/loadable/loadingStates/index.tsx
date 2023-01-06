import { TypesDataLoadingState } from '@lib/types/typesData';
import { classNames } from '@lib/utils';
import { Fragment, useEffect, useState } from 'react';

export const LoadingState = ({
  data: { margin, space, loadingSkeleton, repeatingCount, delay = 150 },
}: {
  data: TypesDataLoadingState;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return (
    <Fragment>
      {show && (
        <div className={classNames(margin, space)}>
          {/* It is reasonable to use index as unique key as this component is static once prop is set */}
          {[...Array(repeatingCount)].map((_, index) => (
            <ul key={index}>{loadingSkeleton}</ul>
          ))}
        </div>
      )}
    </Fragment>
  );
};
