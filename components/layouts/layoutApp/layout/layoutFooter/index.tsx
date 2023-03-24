import { Transition } from '@headlessui/react';
import { Types } from '@lib/types';
import { selectorSidebarOpen } from '@states/layouts';
import { atomDisableScroll, classNames } from '@states/utils';
import { GlobalVerticalGradient } from '@ui/gradients/globalVerticalGradient';
import { Fragment as FooterBodyFragment, Fragment, Fragment as LayoutFooterFragment } from 'react';
import { useRecoilValue } from 'recoil';
import { FooterSidebar } from './footerSidebar';
import { SidebarMobileResetEffect } from '@lib/stateLogics/effects/ui/sidebarMobileResetEffect';
import { GRADIENT_TYPE, GRADIENT_POSITION } from '@constAssertions/ui';

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
              'relative flex w-full flex-row justify-between rounded-xl bg-transparent transition-all duration-200 ease-in-out sm:mr-3 sm:mb-3 sm:shadow-lg sm:shadow-slate-300',
              isSidebarOpen ? 'md:ml-[266px]' : 'md:ml-3',
            )}>
            <GlobalVerticalGradient
              options={{ gradientType: GRADIENT_TYPE['single'], gradientPosition: GRADIENT_POSITION['top'] }}
            />
            <main
              className={classNames(
                'absolute mb-10 h-full w-full rounded-xl border border-slate-100',
                isScrollDisabled ? 'overflow-y-hidden' : 'overflow-y-auto',
              )}>
              <div className='flex w-full justify-center pt-4 pb-64 sm:pt-10 sm:pr-4 sm:pl-5 lg:justify-center lg:pl-10'>
                {children}
              </div>
            </main>
            <GlobalVerticalGradient
              options={{ gradientType: GRADIENT_TYPE['double'], gradientPosition: GRADIENT_POSITION['bottom'] }}
            />
          </div>
        </FooterBodyFragment>
      </div>
    </LayoutFooterFragment>
  );
};
