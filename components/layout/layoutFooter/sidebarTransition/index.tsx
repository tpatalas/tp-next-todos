import { Transition } from '@headlessui/react';
import { useNavigationOpen } from '@layout/layout.hooks';
import { classNames } from '@stateLogics/utils';
import { Backdrop } from '@ui/backdrops/backdrop';
import { Fragment, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { SidebarNavigationWrapper } from '../sidebarNavigationWrapper';
import { TypesLayout } from '@layout/layout.types';
import { atomLayoutNavigationOpen, selectorNavigationBreakpoint } from '@layout/layout.states';

type Props = Pick<TypesLayout, 'path'> & { children: ReactNode };

export const SidebarTransition = ({ path, children }: Props) => {
  const isSidebarOpen = useRecoilValue(atomLayoutNavigationOpen(path));
  const breakpoint = useRecoilValue(selectorNavigationBreakpoint);
  const setNavigationOpen = useNavigationOpen();
  const layoutApp = path === 'app';
  const layoutHome = path === 'home';

  return (
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
          layoutApp && 'md:-translate-x-0 -translate-x-10',
          layoutHome && '-translate-y-5',
        )}
        enterTo={classNames(
          'transform opacity-100',
          layoutApp && 'translate-x-0',
          layoutHome && 'translate-y-0',
        )}
        leave='transition transform ease-in-out duration-200'
        leaveFrom={classNames(
          'transform opacity-100',
          layoutApp && 'translate-x-0',
          layoutHome && 'translate-y-0',
        )}
        leaveTo={classNames(
          'transform opacity-0',
          layoutApp && '-translate-x-10',
          layoutHome && '-translate-y-5',
        )}
      >
        <SidebarNavigationWrapper path={path}>{children}</SidebarNavigationWrapper>
      </Transition.Child>
    </Transition.Root>
  );
};
