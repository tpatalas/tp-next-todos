import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { NetworkStatus } from '@components/notifications/networkStatus';
import { Fragment as LogoContainerFragment, Fragment as LogoFragment } from 'react';

export const LayoutLogo = () => {
  return (
    <nav className='flex h-0 flex-row items-center'>
      <LogoContainerFragment>
        <PrefetchRouterButton
          options={{
            path: '/',
            className: 'cursor-pointer',
          }}>
          <LogoFragment>
            <span className='flex w-full flex-row items-center justify-center px-2 text-2xl tracking-wider'>
              <span className='sr-only'>Logo</span>
              <div className='-space-y-[0.4rem] pr-3 text-sm font-bold tracking-widest'>
                <div>LO</div>
                <div>GO</div>
              </div>
              <div>TODO</div>
            </span>
          </LogoFragment>
        </PrefetchRouterButton>
      </LogoContainerFragment>
      <div className='ml-4'>
        <NetworkStatus />
      </div>
    </nav>
  );
};
