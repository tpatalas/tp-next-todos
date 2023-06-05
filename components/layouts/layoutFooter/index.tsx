import { Transition } from '@headlessui/react';
import { AppNavigation } from '@layouts/app/appNavigation';
import { HomeNavigation } from '@layouts/home/homeNavigation';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { selectorNavigationOpen } from '@states/layouts';
import { Fragment as FooterBodyFragment, Fragment, Fragment as LayoutFooterFragment } from 'react';
import { useRecoilValue } from 'recoil';
import { FooterNavigation } from './footerNavigation';
import { TypesLayout } from '@layouts/layout.types';

type Props = Pick<TypesLayout, 'path'> & Partial<Pick<Types, 'children'>>;

export const LayoutFooter = ({ children, path }: Props) => {
  const isSidebarOpen = useRecoilValue(selectorNavigationOpen);
  const layoutApp = path === 'app';
  const layoutHome = path === 'home';

  return (
    <LayoutFooterFragment>
      <div className='flex h-full flex-row'>
        <Transition.Root
          show={isSidebarOpen}
          as='div'
        >
          <Transition.Child
            as={isSidebarOpen ? Fragment : 'div'}
            enter='transition transform ease-in-out duration-200'
            enterFrom={classNames(
              'transform opacity-0',
              layoutApp && 'md:-translate-x-0 -translate-x-5',
              layoutHome && '-translate-y-5',
            )}
            enterTo={classNames(
              'transform opacity-100',
              layoutApp && 'translate-x-0',
              layoutHome && 'translate-y-0',
            )}
            leave='transition ease-in-out duration-150'
            leaveFrom={classNames(
              'transform opacity-100',
              layoutApp && 'translate-x-0',
              layoutHome && 'translate-y-0',
            )}
            leaveTo={classNames(
              'transform opacity-0',
              layoutApp && '-translate-x-5',
              layoutHome && '-translate-y-5',
            )}
          >
            {isSidebarOpen && (
              <FooterNavigation path={path}>
                {layoutApp && <AppNavigation />}
                {layoutHome && <HomeNavigation path={path} />}
              </FooterNavigation>
            )}
          </Transition.Child>
        </Transition.Root>
        <FooterBodyFragment>{children}</FooterBodyFragment>
      </div>
    </LayoutFooterFragment>
  );
};
