import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { SvgLogo } from '@components/icons/svgLogo';
import { NetworkStatus } from '@components/notifications/networkStatus';
import { BREAKPOINT } from '@constAssertions/ui';
import { useNavigationOpen } from '@hooks/layouts';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import { Fragment as LogoContainerFragment, Fragment as LogoFragment } from 'react';
import { useRecoilValueLoadable } from 'recoil';

export const Logo = () => {
  const breakpointMD = useRecoilValueLoadable(atomEffectMediaQuery(BREAKPOINT['md'])).valueMaybe();
  const setSidebarOpen = useNavigationOpen();
  const onClickRouterHandler = () => {
    !breakpointMD && setSidebarOpen();
  };
  const optionsRouter = { path: '/', className: 'cursor-pointer' };

  return (
    <nav className='flex h-0 flex-row items-center'>
      <LogoContainerFragment>
        <PrefetchRouterButton
          options={optionsRouter}
          onClick={() => onClickRouterHandler()}>
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
