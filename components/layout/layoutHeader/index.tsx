import { useVerticalScrollPosition } from '@hooks/ui';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import dynamic from 'next/dynamic';
import {
  Fragment as LayoutHeaderFragment,
  Fragment as LeftSideFragment,
  Fragment as LogoFragment,
  Fragment as NavigationButtonFragment,
  Fragment as RightNavigationFragment,
} from 'react';
import { useRecoilValue } from 'recoil';
import { Logo } from './logo';
import { NavigationButton } from './navigationButton';
import { TypesLayout } from '@layout/layout.types';
import { atomLayoutNavigationOpen } from '@layout/layout.states';

const UserSessionGroupEffect = dynamic(() =>
  import('@user/userSessionGroupEffect').then((mod) => mod.UserSessionGroupEffect),
);

type Props = Partial<Pick<Types, 'children'>> & Pick<TypesLayout, 'path'>;

export const LayoutHeader = ({ children, path }: Props) => {
  const layoutHome = path === 'home';
  const layoutApp = path === 'app';
  const isSidebarOpen = useRecoilValue(atomLayoutNavigationOpen(path));
  const scrollPosition = useVerticalScrollPosition();
  const homeSidebarClose = layoutHome && !isSidebarOpen && scrollPosition;

  return (
    <LayoutHeaderFragment>
      <div
        className={classNames(
          'sticky top-0 w-full',
          layoutHome && 'z-50 bg-slate-50',
          homeSidebarClose && 'bg-opacity-60 backdrop-blur-lg',
          layoutApp && 'bg-transparent',
        )}
      >
        <div
          className={classNames(
            'flex max-h-[4rem] min-h-[4rem] flex-row items-center justify-between ml:mb-2',
            layoutHome && 'mx-auto max-w-7xl',
          )}
        >
          <LeftSideFragment>
            <div
              className={classNames(
                'flex flex-row items-center justify-between pl-3 md:w-full',
                layoutApp && 'md:max-w-[16rem]',
                layoutHome && 'md:max-w-[12rem]',
              )}
            >
              <NavigationButtonFragment>{layoutApp && <NavigationButton />}</NavigationButtonFragment>
              <LogoFragment>
                <div
                  className={classNames('flex w-full flex-row justify-start', layoutApp && 'max-md:hidden')}
                >
                  <Logo />
                </div>
              </LogoFragment>
            </div>
          </LeftSideFragment>
          <RightNavigationFragment>
            <div
              className={classNames(
                layoutApp && 'flex flex-1 flex-row items-center justify-end pl-2 ml:mr-3',
                layoutHome && 'hidden ml:mr-8 ml:flex',
              )}
            >
              {children}
            </div>
            <NavigationButtonFragment>
              <div className={classNames('ml:hidden ml:pr-0', layoutHome && 'pr-6', layoutApp && 'pr-3')}>
                {layoutHome && <NavigationButton />}
              </div>
            </NavigationButtonFragment>
          </RightNavigationFragment>
        </div>
      </div>
      <UserSessionGroupEffect />
    </LayoutHeaderFragment>
  );
};
