import { Button } from '@buttons/button';
import { IconButton } from '@buttons/iconButton';
import { optionsButtonSidebarToggle } from '@data/dataOptions';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { UserDropdown } from '@dropdowns/v2/userDropdown';
import { LayoutLogo } from '@layouts/layoutApp/layoutLogo';
import { useSidebarOpen } from '@states/layouts/hooks';
import { classNames, nextImageLoader } from '@states/utils';
import { classNames } from '@states/utils';
import { signIn, useSession } from 'next-auth/react';
import {
  Fragment as LayoutHeaderFragment,
  Fragment as LeftSideFragment,
  Fragment as LogoFragment,
  Fragment as RightSidebarFragment,
  Fragment as SidebarButtonFragment,
} from 'react';
import { HeaderSearchBar } from './headerSearchBar';

export const LayoutHeader = () => {
  const setSidebarOpen = useSidebarOpen();
  const { data: session } = useSession();

  return (
    <LayoutHeaderFragment>
      <div className='sticky top-1 z-10 flex max-h-[4rem] min-h-[4rem] flex-row items-center justify-between bg-transparent sm:mb-2'>
        <LeftSideFragment>
          <div className='flex flex-row items-center justify-between pl-3 md:w-full md:max-w-3xs'>
            <SidebarButtonFragment>
              <IconButton
                options={optionsButtonSidebarToggle}
                onClick={() => setSidebarOpen()}
              />
              <span className='sr-only'>Open sidebar</span>
            </SidebarButtonFragment>
            <LogoFragment>
              <div className='hidden w-full flex-row justify-start pl-4 md:flex'>
                <LayoutLogo />
              </div>
            </LogoFragment>
          </div>
        </LeftSideFragment>
        <RightSidebarFragment>
          <div className='flex flex-1 pl-2 pr-3'>
            <HeaderSearchBar />
            <div className='ml-4 flex items-center md:ml-6'>
              {session ? (
                <UserDropdown />
              ) : (
                <Button
                  options={{
                    className: classNames(STYLE_BUTTON_NORMAL_BLUE),
                    tooltip: 'Sign in',
                  }}
                  onClick={() => signIn()}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </RightSidebarFragment>
      </div>
    </LayoutHeaderFragment>
  );
};
