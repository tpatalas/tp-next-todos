import { AppNavigation } from '@layout/app/appNavigation';
import { HomeNavigation } from '@layout/home/homeNavigation';
import { TypesLayout } from '@layout/layout.types';
import { Types } from '@lib/types';
import { Fragment as FooterBodyFragment, Fragment as LayoutFooterFragment } from 'react';
import { SidebarTransition } from './sidebarTransition';

type Props = Pick<TypesLayout, 'path'> & Partial<Pick<Types, 'children'>>;

export const LayoutFooter = ({ children, path }: Props) => {
  const layoutApp = path === 'app';
  const layoutHome = path === 'home';

  return (
    <LayoutFooterFragment>
      <div
        className='flex h-full flex-row'
        data-testid='layoutFooter'
      >
        <SidebarTransition path={path}>
          {layoutApp && <AppNavigation />}
          {layoutHome && <HomeNavigation path={path} />}
        </SidebarTransition>
        <FooterBodyFragment>{children}</FooterBodyFragment>
      </div>
    </LayoutFooterFragment>
  );
};
