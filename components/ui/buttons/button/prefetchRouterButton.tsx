import { Types } from '@lib/types';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { Button } from '.';

export const PrefetchRouterButton = ({
  pathName,
  children,
  className,
  isPrefetchingOnHover,
  onClick,
  tooltip,
  kbd,
  offset,
  placement,
}: Pick<Types, 'pathName' | 'children'> &
  Partial<
    Pick<
      Types,
      'className' | 'isPrefetchingOnHover' | 'onClick' | 'tooltip' | 'kbd' | 'offset' | 'placement'
    >
  >) => {
  const router = useRouter();

  useEffect(() => {
    if (!isPrefetchingOnHover || typeof isPrefetchingOnHover === 'undefined') {
      router.prefetch(pathName);
    }
  }, [pathName, isPrefetchingOnHover, router]);

  return (
    <Fragment>
      <Button
        data={{
          className: className,
          tooltip: tooltip,
          kbd: kbd,
          placement: placement,
          offset: offset,
        }}
        onMouseOver={() => isPrefetchingOnHover && router.prefetch(pathName)}
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
