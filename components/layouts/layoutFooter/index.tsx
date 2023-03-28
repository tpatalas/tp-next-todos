import { SidebarMobileResetEffect } from '@effects/sidebarMobileResetEffect';
import { Transition } from '@headlessui/react';
import { FooterSidebar } from '@layouts/layoutFooter/footerSidebar';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { selectorSidebarOpen } from '@states/layouts';
import { Fragment as FooterBodyFragment, Fragment, Fragment as LayoutFooterFragment } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  options?: Partial<Pick<Types, 'transitionFrom' | 'transitionTo' | 'enterDuration' | 'leaveDuration'>>;
} & Pick<Types, 'children' | 'footerSidebar'>;

export const LayoutFooter = ({ options, children, footerSidebar }: Props) => {
  const isSidebarOpen = useRecoilValue(selectorSidebarOpen);

  return (
    <LayoutFooterFragment>
      <div className='flex h-full flex-row'>
        <Transition.Root
          show={isSidebarOpen}
          as='div'>
          <Transition.Child
            appear={true}
            as={Fragment}
            enterTo={classNames('transform opacity-100', options?.transitionTo ?? 'translate-x-0')}
            leave={classNames('transition ease-in-out', options?.leaveDuration ?? 'duration-350')}
            leaveFrom={classNames('transform opacity-100', options?.transitionTo ?? 'translate-x-0')}
            leaveTo={classNames('transform opacity-0', options?.transitionFrom ?? '-translate-x-24')}>
            <FooterSidebar>{footerSidebar}</FooterSidebar>
          </Transition.Child>
          <SidebarMobileResetEffect />
        </Transition.Root>
        <FooterBodyFragment>{children}</FooterBodyFragment>
      </div>
    </LayoutFooterFragment>
  );
};
