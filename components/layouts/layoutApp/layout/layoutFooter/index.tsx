import { SidebarMobileResetEffect } from '@effects/sidebarMobileResetEffect';
import { Transition } from '@headlessui/react';
import { Types } from '@lib/types';
import { classNames } from '@lib/utils';
import { selectorSidebarOpen } from '@states/layoutStates';
import { Fragment as FooterBodyFragment, Fragment, Fragment as LayoutFooterFragment } from 'react';
import { useRecoilValue } from 'recoil';
import { FooterSidebar } from './footerSidebar';

export const LayoutFooter = ({ children }: Pick<Types, 'children'>) => {
  const isSidebarOpen = useRecoilValue(selectorSidebarOpen);

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
              'relative mr-3 mb-3 flex w-full flex-row justify-between overflow-y-auto rounded-md bg-white shadow-md shadow-slate-200 transition-[margin-left] duration-200 ease-in-out ',
              isSidebarOpen ? 'ml-3 md:ml-[266px]' : 'ml-3',
            )}>
            <main className='absolute h-full w-full'>
              <div className='flex max-w-7xl justify-start pb-64'>{children}</div>
            </main>
          </div>
        </FooterBodyFragment>
      </div>
    </LayoutFooterFragment>
  );
};
