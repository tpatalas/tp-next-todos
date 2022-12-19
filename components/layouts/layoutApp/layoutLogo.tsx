import { NetworkStatus } from '@components/notifications/networkStatus';
import { usePrefetchRouter } from '@states/utilsStates';
import { Fragment as LogoFragment, Fragment as LogoContainerFragment } from 'react';

export const LayoutLogo = () => {
  const routerPushPrefetch = usePrefetchRouter('/');

  return (
    <nav className='flex h-0 flex-row items-center space-x-3'>
      <LogoContainerFragment>
        <div
          onClick={() => routerPushPrefetch()}
          className='cursor-pointer'>
          <LogoFragment>
            <div>I am a LOGO</div>
          </LogoFragment>
        </div>
      </LogoContainerFragment>
      <NetworkStatus />
    </nav>
  );
};
