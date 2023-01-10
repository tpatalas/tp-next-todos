import { DisableButton } from '@buttons/disableButton';
import { IconButton } from '@buttons/iconButton';
import { SvgIcon } from '@components/icons/svgIcon';
import { LoadingState } from '@components/loadable/loadingStates';
import { dataButtonCreateTodo, dataLoadingLabels } from '@data/dataObjects';
import { ICON_ADD_TASK, ICON_MENU } from '@data/materialSymbols';
import { Transition } from '@headlessui/react';
import { LayoutLogo } from '@layouts/layoutApp/layoutLogo';
import { atomSidebarOpenMobile, useSidebarOpen } from '@states/layoutStates';
import { useTodoModalStateOpen } from '@states/modalStates';
import dynamic from 'next/dynamic';
import {
  forwardRef,
  Fragment as BackdropFragment,
  Fragment as CreateTodoFragment,
  Fragment as FooterSidebarFragment,
  Fragment,
  Fragment as LayoutLogoFragment,
} from 'react';
import { useRecoilCallback } from 'recoil';
import { FooterSidebarMenu } from './footerSidebarMenu';

const LabelList = dynamic(
  () => import('@components/labels/labelList').then((mod) => mod.LabelList),
  {
    loading: () => <LoadingState data={dataLoadingLabels} />,
  },
);

export const FooterSidebar = forwardRef<HTMLDivElement>((_, ref) => {
  const openModal = useTodoModalStateOpen(undefined);
  const setSidebarOpen = useSidebarOpen();
  const isSidebarMobileOpen = useRecoilCallback(({ snapshot }) => () => {
    return snapshot.getLoadable(atomSidebarOpenMobile).getValue();
  });

  return (
    <FooterSidebarFragment>
      <BackdropFragment>
        <Transition
          show={isSidebarMobileOpen()}
          as={Fragment}
          appear={true}
          enter='transition-opacity ease-in-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-in-out duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div
            className='fixed inset-0 z-10 bg-gray-500 bg-opacity-20'
            aria-hidden='true'
            onClick={() => setSidebarOpen()}
          />
        </Transition>
      </BackdropFragment>
      <div
        ref={ref}
        className='fixed left-0 top-0 z-20 h-full w-72 bg-white px-3 pt-3 md:top-[4.6rem] md:flex md:w-full md:max-w-3xs md:flex-col md:bg-transparent md:pt-0 md:pl-3 md:pr-0'>
        <LayoutLogoFragment>
          <div className='mb-4 mt-0 flex flex-row items-center justify-between md:hidden'>
            <IconButton
              data={{
                path: ICON_MENU,
                size: 'h-6 w-6',
                hoverBg: 'hover:enabled:bg-gray-200 hover:enabled:bg-opacity-70',
              }}
              onClick={() => setSidebarOpen()}
            />
            <div className='mr-10 flex w-full justify-center'>
              <LayoutLogo />
            </div>
          </div>
        </LayoutLogoFragment>
        <CreateTodoFragment>
          <div className='mb-4 flex w-full flex-row justify-center bg-transparent'>
            <DisableButton
              data={dataButtonCreateTodo}
              onClick={() => openModal()}>
              <span className='flex flex-row items-center'>
                <SvgIcon
                  data={{
                    path: ICON_ADD_TASK,
                    className: 'mr-3 fill-white h-5 w-5',
                  }}
                />
                Create todo
              </span>
            </DisableButton>
          </div>
        </CreateTodoFragment>
        <div className='flex h-full flex-grow flex-col bg-transparent'>
          <div className='flex flex-grow flex-col'>
            <nav className='flex-1 space-y-1 pb-4'>
              <FooterSidebarMenu />
              <LabelList />
            </nav>
          </div>
        </div>
      </div>
    </FooterSidebarFragment>
  );
});

FooterSidebar.displayName = 'FooterSidebar';
