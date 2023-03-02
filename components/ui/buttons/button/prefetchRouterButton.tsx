import { Types } from '@lib/types';
import { TypesOptionsPrefetchRouterButton } from '@lib/types/typesOptions';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { Button } from '.';

type Props = { options: TypesOptionsPrefetchRouterButton } & Pick<Types, 'children'> & Partial<Pick<Types, 'onClick'>>;

export const PrefetchRouterButton = ({ options, children, onClick }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!options.isPrefetchingOnHover || typeof options.isPrefetchingOnHover === 'undefined') {
      router.prefetch(options.path);
    }
  }, [options.isPrefetchingOnHover, options.path, router]);

  return (
    <Fragment>
      <Button
        options={options}
        onMouseOver={() => options.isPrefetchingOnHover && router.prefetch(options.path)}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          router.push(options.path);
          onClick && onClick(event);
        }}>
        {children}
      </Button>
    </Fragment>
  );
};
