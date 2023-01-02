import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { NetworkStatus } from '@components/notifications/networkStatus';
import { Fragment as LogoContainerFragment, Fragment as LogoFragment } from 'react';

export const LayoutLogo = () => {
  return (
    <nav className='flex h-0 flex-row items-center space-x-3'>
      <LogoContainerFragment>
        <PrefetchRouterButton
          pathName='/'
          className='cursor-pointer'>
          <LogoFragment>
            <div>I am a LOGO</div>
          </LogoFragment>
        </PrefetchRouterButton>
      </LogoContainerFragment>
      <NetworkStatus />
    </nav>
  );
};
