import { Types } from '@lib/types';
import {
  Fragment as LayoutHeaderFragment,
  Fragment as LeftSideFragment,
  Fragment as LogoFragment,
  Fragment as RightNavigationFragment,
  Fragment as NavigationButtonFragment,
} from 'react';
import { Logo } from './logo';
import { classNames } from '@stateLogics/utils';
import { NavigationButton } from './navigationButton';

type Props = Partial<Pick<Types, 'children'>> & Pick<Types, 'layoutType'>;

export const LayoutHeader = ({ children, layoutType }: Props) => {
  const layoutHome = layoutType === 'home';
  const layoutApp = layoutType === 'app';

  return (
    <LayoutHeaderFragment>
      <div
        className={classNames(
          'sticky flex max-h-[4rem] min-h-[4rem] flex-row items-center justify-between ml:top-1 ml:mb-2',
          layoutHome && 'z-50 bg-slate-50',
          layoutApp && 'bg-transparent',
        )}>
        <LeftSideFragment>
          <div className='flex flex-row items-center justify-between pl-3 md:w-full md:max-w-3xs'>
            <NavigationButtonFragment>{layoutApp && <NavigationButton />}</NavigationButtonFragment>
            <LogoFragment>
              <div className={classNames('flex w-full flex-row justify-start pl-4')}>
                <Logo />
              </div>
            </LogoFragment>
          </div>
        </LeftSideFragment>
        <RightNavigationFragment>
          <div
            className={classNames(
              layoutApp && 'mr-3 flex flex-1 flex-row items-center justify-end pl-2',
              layoutHome && 'hidden ml:flex',
            )}>
            {children}
          </div>
          <NavigationButtonFragment>
            <div className='pr-3 ml:hidden ml:pr-0'>{layoutHome && <NavigationButton />}</div>
          </NavigationButtonFragment>
        </RightNavigationFragment>
      </div>
    </LayoutHeaderFragment>
  );
};
