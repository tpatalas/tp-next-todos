import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { NetworkStatus } from '@components/notifications/networkStatus';
import { Fragment as LogoContainerFragment, Fragment as LogoFragment } from 'react';

export const LayoutLogo = () => {
  return (
    <nav className='flex h-0 flex-row items-center'>
      <LogoContainerFragment>
        <PrefetchRouterButton
          path='/'
          className='cursor-pointer'>
          <LogoFragment>
            <span className='sr-only'>Logo</span>
            <div>I am a LOGO</div>
          </LogoFragment>
        </PrefetchRouterButton>
      </LogoContainerFragment>
      <div className='ml-4'>
        <NetworkStatus />
      </div>
    </nav>
  );
};
