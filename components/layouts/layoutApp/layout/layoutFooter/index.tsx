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
      <div className='flex h-full flex-row'>
        <Transition.Root
          show={isSidebarOpen}
          as='div'>
          <Transition.Child
            appear={true}
            as={Fragment}
            enter='transition transform ease-in-out duration-350'
            enterFrom='transform -translate-x-24 opacity-0'
            enterTo='transform translate-x-0 opacity-100'
            leave='transition ease-in-out duration-350'
            leaveFrom='transform translate-x-0 opacity-100'
            leaveTo='transform -translate-x-24 opacity-0'>
            <FooterSidebar />
          </Transition.Child>
          <SidebarMobileResetEffect />
        </Transition.Root>
        <FooterBodyFragment>
          <div
            className={classNames(
              'relative mr-3 mb-3 flex w-full flex-row justify-between rounded-md bg-white shadow-md shadow-slate-200 transition-[margin-left] duration-200 ease-in-out ',
              isSidebarOpen ? 'ml-3 md:ml-[266px]' : 'ml-3',
            )}>
            <main
              className={classNames(
                'absolute h-[calc(100vh-5.4rem)] w-full sm:h-[calc(100vh-4.4rem)] lg:h-full',
                isScrollDisabled ? 'overflow-y-hidden' : 'overflow-y-auto',
              )}>
              <div className='flex w-full justify-center pt-10 pb-64 pl-0 sm:pl-5 lg:justify-center lg:pl-10'>
                {children}
              </div>
            </main>
          </div>
        </FooterBodyFragment>
      </div>
    </LayoutFooterFragment>
  );
};
