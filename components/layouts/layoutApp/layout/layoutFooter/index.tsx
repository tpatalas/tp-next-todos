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
              'relative flex w-full flex-row justify-between rounded-md bg-transparent transition-all duration-200 ease-in-out sm:mr-3 sm:mb-3 sm:bg-white sm:shadow-md sm:shadow-slate-200',
              isSidebarOpen ? 'ml-3 md:ml-[266px]' : 'sm:ml-3',
            )}>
            <main
              className={classNames(
                'absolute mb-10 h-full w-full',
                isScrollDisabled ? 'overflow-y-hidden' : 'overflow-y-auto',
              )}>
              <div className='flex w-full justify-center pt-2 pb-64 sm:pt-10 sm:pl-5 lg:justify-center lg:pl-10'>
                {children}
              </div>
            </main>
          </div>
        </FooterBodyFragment>
      </div>
    </LayoutFooterFragment>
  );
};
