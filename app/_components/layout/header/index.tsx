import { ReactNode } from 'react';
import { Logo } from '../logo';
import { HeaderWrapper } from './headerWrapper';
import { configsHeaderWrapper } from './headerWrapper/headerWrapper.configs';
import { NavigationButton } from '@/button/(iconButton)/navigationButton';

interface Props {
  children: ReactNode;
}

export const Header = ({ children }: Props) => {
  return (
    <HeaderWrapper configs={configsHeaderWrapper()}>
      <div className='flex max-h-[4rem] min-h-[4rem] flex-row items-center justify-between ml:mb-2 mx-auto max-w-7xl'>
        <div className='flex flex-row items-center justify-between pl-3 md:w-full md:max-w-[12rem]'>
          <div className='flex w-full flex-row justify-start'>
            <Logo />
          </div>
        </div>
        <div className='hidden ml:mr-8 ml:flex'>{children}</div>
        <div className='ml:hidden ml:pr-0 pr-6'>
          <NavigationButton />
        </div>
      </div>
    </HeaderWrapper>
    // <UserSessionGroupEffect /> // might be necessary this in the future
  );
};
