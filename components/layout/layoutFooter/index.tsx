import { Transition } from '@headlessui/react';
import { AppNavigation } from '@layout/app/appNavigation';
import { HomeNavigation } from '@layout/home/homeNavigation';
import { useNavigationOpen } from '@layout/layout.hooks';
import { TypesLayout } from '@layout/layout.types';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { selectorNavigationBreakpoint, selectorNavigationOpen } from '@states/layouts';
import { Backdrop } from '@ui/backdrops/backdrop';
import { Fragment as FooterBodyFragment, Fragment, Fragment as LayoutFooterFragment } from 'react';
import { useRecoilValue } from 'recoil';
import { FooterNavigation } from './footerNavigation';

type Props = Pick<TypesLayout, 'path'> & Partial<Pick<Types, 'children'>>;

export const LayoutFooter = ({ children, path }: Props) => {
  const isSidebarOpen = useRecoilValue(selectorNavigationOpen);
  const breakpoint = useRecoilValue(selectorNavigationBreakpoint);
  const setNavigationOpen = useNavigationOpen();
  const layoutApp = path === 'app';
  const layoutHome = path === 'home';

  return (
    <LayoutFooterFragment>
      <div className='flex h-full flex-row'>
        <Transition.Root
          show={isSidebarOpen}
          as='div'
        >
          {!breakpoint ? (
            <Backdrop
              options={{ isPortal: false }}
              onClick={() => setNavigationOpen()}
            />
          ) : null}
          <Transition.Child
            as={Fragment}
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
            leave='transition ease-in-out duration-200'
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
            <FooterNavigation path={path}>
              {layoutApp && <AppNavigation />}
              {layoutHome && <HomeNavigation path={path} />}
            </FooterNavigation>
          </Transition.Child>
        </Transition.Root>
        <FooterBodyFragment>{children}</FooterBodyFragment>
      </div>
    </LayoutFooterFragment>
  );
};
