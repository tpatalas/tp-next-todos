import { Transition } from '@headlessui/react';
import { Types } from '@lib/types';
import { selectorSidebarOpen } from '@states/layouts';
import { SidebarMobileResetEffect } from '@states/layouts/sidebarMobileResetEffect';
import { atomDisableScroll, classNames } from '@states/utils';
import { Fragment as FooterBodyFragment, Fragment, Fragment as LayoutFooterFragment } from 'react';
import { useRecoilValue } from 'recoil';
import { FooterSidebar } from './footerSidebar';

export const LayoutFooter = ({ children }: Pick<Types, 'children'>) => {
  const isSidebarOpen = useRecoilValue(selectorSidebarOpen);
  const isScrollDisabled = useRecoilValue(atomDisableScroll);

  return (
    <LayoutFooterFragment>
      <SidebarMobileResetEffect />
      <div className='flex h-full flex-row'>
        <Transition.Root
          show={isSidebarOpen}
          as={Fragment}>
          <Transition.Child
            appear={true}
            as={Fragment}
            enter='transition transform ease-in-out duration-200'
            enterFrom='transform -translate-x-40 opacity-0'
            enterTo='transform translate-x-0 opacity-100'
            leave='transition ease-in-out duration-200'
            leaveFrom='transform translate-x-0 opacity-100'
            leaveTo='transform -translate-x-40 opacity-0'>
            <FooterSidebar />
          </Transition.Child>
        </Transition.Root>
        <FooterBodyFragment>
          <div
            className={classNames(
              'relative mr-3 mb-3 flex w-full flex-row justify-between rounded-md bg-white shadow-md shadow-slate-200 transition-[margin-left] duration-200 ease-in-out ',
              isSidebarOpen ? 'ml-3 md:ml-[266px]' : 'ml-3',
            )}>
            <main
              className={classNames(
                'absolute h-[calc(100vh-4.3rem)] w-full lg:h-full',
                isScrollDisabled ? 'overflow-y-hidden' : 'overflow-y-auto',
              )}>
              <div className='flex max-w-7xl justify-start pb-64'>{children}</div>
            </main>
          </div>
        </FooterBodyFragment>
      </div>
    </LayoutFooterFragment>
  );
};
