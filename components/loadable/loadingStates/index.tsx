import { TypesDataLoadingState } from '@lib/types/typesData';
import { classNames } from '@states/utils';
import { Fragment, useEffect, useState } from 'react';

export const LoadingState = ({
  data: { margin, space, loadingSkeleton, repeatingCount },
}: {
  data: TypesDataLoadingState;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

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
