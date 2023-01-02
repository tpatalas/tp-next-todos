import { Types } from '@lib/types';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect } from 'react';

export const PrefetchRouterButton = ({
  pathName,
  children,
  className,
  prefetchOnHover,
}: Pick<Types, 'pathName' | 'children'> &
  Partial<Pick<Types, 'className' | 'prefetchOnHover'>>) => {
  const router = useRouter();

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push(pathName);
  };

  const prefetchRouter = useCallback(() => {
    router.prefetch(pathName);
  }, [pathName, router]);

  useEffect(() => {
    if (!prefetchOnHover || typeof prefetchOnHover === 'undefined') {
      prefetchRouter();
    }
  }, [prefetchOnHover, prefetchRouter]);

  return (
    <Fragment>
      <button
        className={className}
        onMouseEnter={() => prefetchRouter()}
        onClick={clickHandler}>
        {children}
      </button>
    </Fragment>
  );
};
