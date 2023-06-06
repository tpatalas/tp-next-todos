import { DisableButton } from '@buttons/disableButton';
import { IconButton } from '@buttons/iconButton';
import { ICON_ADD_TASK } from '@data/materialSymbols';
import { useNavigationOpen } from '@hooks/layouts';
import { useConditionCheckCreateModalOpen } from '@hooks/misc';
import { useTodoModalStateOpen } from '@hooks/modals';
import { Logo } from '@layout/layoutHeader/logo';
import { optionsButtonCreateTodo, optionsButtonSidebarToggle } from '@options/button';
import { classNames } from '@stateLogics/utils';
import { atomDisableScroll } from '@states/misc';
import { Fragment as CreateTodoFragment, Fragment as LayoutLogoFragment, Suspense } from 'react';
import { isChrome, isMobile } from 'react-device-detect';
import { useRecoilValue } from 'recoil';
import { AppSidebarMenu } from './appSidebarMenu';
import dynamic from 'next/dynamic';
import { LoadingLabels } from '@components/loadable/loadingStates/loadingLabels';
import { SvgIcon } from '@icon/svgIcon';

const LabelList = dynamic(() => import('@label/labelList').then((mod) => mod.LabelList), {
  ssr: false,
});

export const AppNavigation = () => {
  const isScrollDisabled = useRecoilValue(atomDisableScroll);
  const openModal = useTodoModalStateOpen(undefined);
  const setSidebarOpen = useNavigationOpen();
  const condition = useConditionCheckCreateModalOpen();

  return (
    <>
      <LayoutLogoFragment>
        <div className='mb-4 mt-0 flex flex-row items-center justify-between pr-3 md:hidden'>
          <IconButton
            options={optionsButtonSidebarToggle}
            onClick={() => setSidebarOpen()}
          />
          <div className='mr-10 flex w-full justify-center'>
            <Logo />
          </div>
        </div>
      </LayoutLogoFragment>
      <CreateTodoFragment>
        <div className='mb-4 flex w-full flex-row justify-center bg-transparent pr-2'>
          <DisableButton
            options={optionsButtonCreateTodo}
            onClick={() => openModal()}
            isConditionalRendering={condition}
          >
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
        )}
      >
        <div className='flex flex-grow flex-col'>
          <nav className={classNames('flex-1 space-y-1', isMobile && isChrome ? 'pb-36' : 'pb-10')}>
            <AppSidebarMenu />
            <Suspense fallback={<LoadingLabels />}>
              <LabelList />
            </Suspense>
          </nav>
        </div>
      </div>
    </>
  );
};
