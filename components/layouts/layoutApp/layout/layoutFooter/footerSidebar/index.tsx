import { DisableButton } from '@buttons/disableButton';
import { IconButton } from '@buttons/iconButton';
import { SvgIcon } from '@components/icons/svgIcon';
import { LabelList } from '@components/labels/labelList';
import { optionsButtonCreateTodo, optionsButtonSidebarToggle } from '@data/dataOptions';
import { ICON_ADD_TASK } from '@data/materialSymbols';
import { LayoutLogo } from '@layouts/layoutApp/layoutLogo';
import { atomSidebarOpenMobile } from '@states/layouts';
import { useSidebarOpen } from '@states/layouts/hooks';
import { useTodoModalStateOpen } from '@states/modals/hooks';
import { atomDisableScroll, classNames } from '@states/utils';
import { useConditionCheckCreateModalOpen } from '@states/utils/hooks';
import { Backdrop } from '@ui/backdrops/backdrop';
import {
  Fragment as CreateTodoFragment,
  Fragment as FooterSidebarFragment,
  Fragment as LayoutLogoFragment,
  forwardRef,
} from 'react';
import { isChrome, isMobile } from 'react-device-detect';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { FooterSidebarMenu } from './footerSidebarMenu';

export const FooterSidebar = forwardRef<HTMLDivElement>((_, ref) => {
  const isScrollDisabled = useRecoilValue(atomDisableScroll);
  const openModal = useTodoModalStateOpen(undefined);
  const setSidebarOpen = useSidebarOpen();
  const isSidebarMobileOpen = useRecoilCallback(({ snapshot }) => () => {
    return snapshot.getLoadable(atomSidebarOpenMobile).getValue();
  });
  const condition = useConditionCheckCreateModalOpen();

  return (
    <FooterSidebarFragment>
      <Backdrop
        options={{ isPortal: false }}
        show={isSidebarMobileOpen()}
        onClick={() => setSidebarOpen()}
      />
      <div
        ref={ref}
        className='fixed left-0 top-0 z-30 w-72 bg-slate-50 pl-2 pr-0 pt-3 md:top-[4.6rem] md:z-auto md:flex md:w-full md:max-w-[16.5rem] md:flex-col md:bg-transparent md:pt-0 md:pl-2 md:pr-0'>
        <LayoutLogoFragment>
          <div className='mb-4 mt-0 flex flex-row items-center justify-between pr-3 md:hidden'>
            <IconButton
              options={optionsButtonSidebarToggle}
              onClick={() => setSidebarOpen()}
            />
            <div className='mr-10 flex w-full justify-center'>
              <LayoutLogo />
            </div>
          </div>
        </LayoutLogoFragment>
        <CreateTodoFragment>
          <div className='mb-4 flex w-full flex-row justify-center bg-transparent pr-2'>
            <DisableButton
              options={optionsButtonCreateTodo}
              onClick={() => openModal()}
              isConditionalRendering={condition}>
              <span className='flex flex-row items-center'>
                <SvgIcon
                  options={{
                    path: ICON_ADD_TASK,
                    className: 'mr-3 fill-white h-5 w-5',
                  }}
                />
                Create todo
              </span>
            </DisableButton>
          </div>
        </CreateTodoFragment>
        <div
          className={classNames(
            'flex h-[calc(100vh-7.8rem)] w-full flex-grow flex-col bg-transparent pr-2 md:h-[calc(100vh-8.7rem)]',
            isScrollDisabled ? 'overflow-y-hidden' : 'overflow-y-auto',
          )}>
          <div className='flex flex-grow flex-col'>
            <nav className={classNames('flex-1 space-y-1', isMobile && isChrome ? 'pb-36' : 'pb-10')}>
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
