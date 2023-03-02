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
    Pick<Types, 'className' | 'isPrefetchingOnHover' | 'onClick' | 'tooltip' | 'kbd' | 'offset' | 'placement'>
  >) => {
  const router = useRouter();
  const options = {
    className: className,
    tooltip: tooltip,
    kbd: kbd,
    placement: placement,
    offset: offset,
  };
  const urlPath = `${process.env.NEXT_PUBLIC_HOST}${path}`;

  useEffect(() => {
    if (!isPrefetchingOnHover || typeof isPrefetchingOnHover === 'undefined') {
      router.prefetch(urlPath);
    }
  }, [isPrefetchingOnHover, router, urlPath]);

  return (
    <Fragment>
      <Button
        options={options}
        onMouseOver={() => isPrefetchingOnHover && router.prefetch(path)}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          router.push(urlPath);
          onClick && onClick(event);
        }}>
        {children}
      </Button>
    </Fragment>
  );
};
