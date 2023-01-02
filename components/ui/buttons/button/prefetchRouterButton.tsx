import { Types } from '@lib/types';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { Button } from '.';

export const PrefetchRouterButton = ({
  pathName,
  children,
  className,
  prefetchOnHover,
  onClick,
  tooltip,
  kbd,
  offset,
  placement
}: Pick<Types, 'pathName' | 'children'> &
  Partial<Pick<Types, 'className' | 'prefetchOnHover' | 'onClick' | 'tooltip' | 'kbd' | 'offset' | 'placement'>>) => {
  const router = useRouter();

  useEffect(() => {
    if (!prefetchOnHover || typeof prefetchOnHover === 'undefined') {
      router.prefetch(pathName);
    }
  }, [pathName, prefetchOnHover, router]);

  return (
    <Fragment>
      <Button
        data={{
          className: className,
          tooltip: tooltip,
          kbd: kbd,
          placement: placement,
          offset: offset
        }}
        onMouseOver={() => prefetchOnHover && router.prefetch(pathName)}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          router.push(pathName);
          onClick;
        }}>
        {children}
      </Button>
    </Fragment>
  );
};
