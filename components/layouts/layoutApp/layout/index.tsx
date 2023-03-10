import { Types } from '@lib/types';
import dynamic from 'next/dynamic';
import { Fragment as LayoutFragment, Suspense } from 'react';
import { LayoutHeader } from './layoutHeader';

const LayoutFooter = dynamic(() => import('./layoutFooter').then((mod) => mod.LayoutFooter), {
  ssr: false,
});

export const Layout = ({ children }: Pick<Types, 'children'>) => {
  return (
    <LayoutFragment>
      <div className='flex h-screen flex-col'>
        <LayoutHeader />
        <Suspense>
          <LayoutFooter>{children}</LayoutFooter>
        </Suspense>
      </div>
    </LayoutFragment>
  );
};
