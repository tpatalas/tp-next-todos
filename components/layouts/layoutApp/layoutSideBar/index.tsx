import { Types } from '@lib/types';
import dynamic from 'next/dynamic';
import { Fragment as LayoutSidebarFragment } from 'react';
import { LayoutHeader } from './layoutHeader';

const LayoutFooter = dynamic(() => import('./layoutFooter').then((mod) => mod.LayoutFooter), {
  ssr: false,
});

export const LayoutSidebar = ({ children }: Pick<Types, 'children'>) => {
  return (
    <LayoutSidebarFragment>
      <div className='flex h-screen flex-col'>
        <LayoutHeader />
        <LayoutFooter>{children}</LayoutFooter>
      </div>
    </LayoutSidebarFragment>
  );
};
