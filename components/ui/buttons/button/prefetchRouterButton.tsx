import { Types } from '@lib/types';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { Button } from '.';

export const PrefetchRouterButton = ({
  path,
  children,
  className,
  isPrefetchingOnHover,
  onClick,
  tooltip,
  kbd,
  offset,
  placement,
}: Pick<Types, 'path' | 'children'> &
  Partial<
    Pick<
      Types,
      'className' | 'isPrefetchingOnHover' | 'onClick' | 'tooltip' | 'kbd' | 'offset' | 'placement'
    >
  >) => {
  const router = useRouter();

  useEffect(() => {
    if (!isPrefetchingOnHover || typeof isPrefetchingOnHover === 'undefined') {
      router.prefetch(path);
    }
  }, [path, isPrefetchingOnHover, router]);

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
        onMouseOver={() => isPrefetchingOnHover && router.prefetch(path)}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          router.push(path);
          onClick && onClick(event);
        }}>
        {children}
      </Button>
    </Fragment>
  );
};
