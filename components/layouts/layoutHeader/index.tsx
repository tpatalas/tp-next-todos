import { Types } from '@lib/types';
import {
    Fragment as LayoutHeaderFragment,
    Fragment as LeftSideFragment,
    Fragment as LogoFragment,
    Fragment as RightSidebarFragment,
    Fragment as SidebarButtonFragment
} from 'react';
import { Logo } from './logo';


type Props = Partial<Pick<Types, 'sidebarButton' | 'children'>>;

export const LayoutHeader = ({ sidebarButton, children }: Props) => {
  return (
    <LayoutHeaderFragment>
      <div className='sticky top-1 z-10 flex max-h-[4rem] min-h-[4rem] flex-row items-center justify-between bg-transparent sm:mb-2'>
        <LeftSideFragment>
          <div className='flex flex-row items-center justify-between pl-3 md:w-full md:max-w-3xs'>
            <SidebarButtonFragment>{sidebarButton}</SidebarButtonFragment>
            <LogoFragment>
              <div className='hidden w-full flex-row justify-start pl-4 md:flex'>
                <Logo />
              </div>
            </LogoFragment>
          </div>
        </LeftSideFragment>
        <RightSidebarFragment>
          <div className='flex flex-1 flex-row items-center justify-end pl-2 mr-3'>{children}</div>
        </RightSidebarFragment>
      </div>
    </LayoutHeaderFragment>
  );
};
