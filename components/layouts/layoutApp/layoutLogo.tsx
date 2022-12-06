import { NetworkStatus } from '@components/notifications/networkStatus';
import { Div } from '@containers/div';
import { usePrefetchRouter } from '@states/utilsStates';
import { Fragment as LogoFragment } from 'react';

export const LayoutLogo = () => {
  const routerPushPrefetch = usePrefetchRouter('/');

  return (
    <nav className='flex h-0 flex-row items-center space-x-3'>
      <Div
        onClick={() => routerPushPrefetch()}
        className='cursor-pointer'>
        <LogoFragment>
          <Div>I am a LOGO</Div>
        </LogoFragment>
      </Div>
      <NetworkStatus />
    </nav>
  );
};
