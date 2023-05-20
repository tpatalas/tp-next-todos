import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { NetworkStatus } from '@components/notifications/networkStatus';
import { PATH_HOME } from '@constAssertions/data';
import { TypesSvgLogos } from '@icon/icon.types';
import { SvgLogo } from '@icon/svgLogo';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Fragment as LogoContainerFragment, Fragment as LogoFragment } from 'react';

type Props = Partial<{ type: TypesSvgLogos['name'] }>;

export const Logo = ({ type = 'MainWhite' }: Props) => {
  const { data: session } = useSession();
  const { pathname } = useRouter();
  const pathHome = pathname === PATH_HOME['home'];
  const optionsRouter = {
    path: session || pathHome ? '' : PATH_HOME['home'],
    className: session || pathHome ? 'pointer-events-none' : 'cursor-pointer',
    ariaLabel: 'Logo Router Button to route to index page.',
  };

  return (
    <nav className='flex h-0 flex-row items-center'>
      <LogoContainerFragment>
        <PrefetchRouterButton options={optionsRouter}>
          <LogoFragment>
            <span className='flex w-full flex-row items-center justify-center'>
              <SvgLogo type={type} />
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
