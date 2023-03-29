import { NavigationMobileResetEffect } from '@effects/navigationMobileResetEffect';
import { Transition } from '@headlessui/react';
import { AppNavigation } from '@layouts/app/appNavigation';
import { HomeNavigation } from '@layouts/home/homeNavigation';
import { FooterSidebar } from '@layouts/layoutFooter/footerSidebar';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { selectorNavigationOpen } from '@states/layouts';
import { Fragment as FooterBodyFragment, Fragment, Fragment as LayoutFooterFragment } from 'react';
import { useRecoilValue } from 'recoil';

type Props = Pick<Types, 'layoutType'> & Partial<Pick<Types, 'children'>>;

export const LayoutFooter = ({ children, layoutType }: Props) => {
  const isSidebarOpen = useRecoilValue(selectorNavigationOpen);
  const layoutApp = layoutType === 'app';
  const layoutHomeVertical = layoutType === 'homeVertical';

  return (
    <LayoutFooterFragment>
      <div className='flex h-full flex-row'>
        <Transition.Root
          show={isSidebarOpen}
          as='div'>
          <Transition.Child
            appear={true}
            as={Fragment}
            enter='transition transform ease-in-out duration-350'
            enterFrom={classNames(
              'transform opacity-0',
              layoutApp && '-translate-x-24',
              layoutHomeVertical && '-translate-y-24',
            )}
            enterTo={classNames(
              'transform opacity-100',
              layoutApp && 'translate-x-0',
              layoutHomeVertical && 'translate-y-0',
            )}
            leave='transition ease-in-out duration-350'
            leaveFrom={classNames(
              'transform opacity-100',
              layoutApp && 'translate-x-0',
              layoutHomeVertical && 'translate-y-0',
            )}
            leaveTo={classNames(
              'transform opacity-0',
              layoutApp && '-translate-x-24',
              layoutHomeVertical && '-translate-y-24',
            )}>
            <FooterSidebar layoutType={layoutType}>
              {layoutApp && <AppNavigation />}
              {layoutHomeVertical && <HomeNavigation layoutType={layoutType} />}
            </FooterSidebar>
          </Transition.Child>
          <NavigationMobileResetEffect />
        </Transition.Root>
        <FooterBodyFragment>{children}</FooterBodyFragment>
      </div>
    </LayoutFooterFragment>
  );
};
