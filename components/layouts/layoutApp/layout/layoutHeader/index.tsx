import { IconButton } from '@buttons/iconButton';
import { LayoutLogo } from '@layouts/layoutApp/layoutLogo';
import dynamic from 'next/dynamic';
import {
  Fragment as LayoutHeaderFragment,
  Fragment as LeftSideFragment,
  Fragment as LogoFragment,
  Fragment as RightSidebarFragment,
  Fragment as SidebarButtonFragment,
  Suspense,
} from 'react';
import { HeaderSearchBar } from './headerSearchBar';
import { optionsButtonSidebarToggle } from '@options/button';
import { useSidebarOpen } from '@hooks/layouts';

const HeaderUser = dynamic(() => import('./headerUser').then((mod) => mod.HeaderUser), { ssr: false });

export const LayoutHeader = () => {
  const setSidebarOpen = useSidebarOpen();

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
            <div className='ml-4 flex min-w-[2rem] items-center md:ml-6'>
              <Suspense>
                <HeaderUser />
              </Suspense>
            </div>
          </div>
        </RightSidebarFragment>
      </div>
    </LayoutHeaderFragment>
  );
};
