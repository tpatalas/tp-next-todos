import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { SvgLogo } from '@components/icons/svgLogo';
import { NetworkStatus } from '@components/notifications/networkStatus';
import { useNavigationOpen } from '@hooks/layouts';
import { Fragment as LogoContainerFragment, Fragment as LogoFragment } from 'react';

export const Logo = () => {
  const setSidebarOpen = useNavigationOpen();
  const optionsRouter = { path: '/', className: 'cursor-pointer' };

  return (
    <nav className='flex h-0 flex-row items-center'>
      <LogoContainerFragment>
        <PrefetchRouterButton
          options={optionsRouter}
          onClick={() => setSidebarOpen()}>
          <LogoFragment>
            <span className='flex w-full flex-row items-center justify-center'>
              <SvgLogo type='MainWhite' />
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
