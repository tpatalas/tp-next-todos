import { PATH_ROUTE } from '@/_lib/consts/assertion.consts';
import { styleButton } from '@/button/button.styles';
import { SignInButton } from '@/button/signInButton';
import { configsSignInButton } from '@/button/signInButton/signInButton.configs';
import { styleNextLink } from '@/next/next.styles';
import { Tooltip } from '@/tooltip/index';
import { styleDividerX, styleDividerY } from '@/ui/divider/divider.styles';
import { DividerX } from '@/ui/divider/dividerX';
import { DividerY } from '@/ui/divider/dividerY';
import Link from 'next/link';
import { DATA_NAVIGATION } from './navigation.data';
import { configsDemo } from './navigation.configs';

export const Navigation = () => {
  const styleLink = styleNextLink();
  return (
    <nav
      className='flex text-base tracking-wide text-slate-800 flex-col bg-slate-50 max-ml:space-y-4 max-ml:rounded-b-xl max-ml:px-5 max-ml:pb-8 max-ml:pt-[6rem] ml:flex ml:flex-row ml:items-center ml:space-x-3 ml:bg-transparent ml:pr-0 lg:pr-3'
      data-testid='homeNavigation'
    >
      {DATA_NAVIGATION.map((path) => (
        <div key={path.name}>
          <Link
            href={path.path}
            className={styleLink}
            scroll={false}
          >
            {path.name}
          </Link>
        </div>
      ))}
      <DividerY style={styleDividerY({ hidden: 'maxMd' })} />
      <div>
        <Link
          href={PATH_ROUTE['contact']}
          className={styleLink}
        >
          Contact
        </Link>
      </div>
      <DividerX style={styleDividerX({ hidden: 'minMl' })} />
      <div className='pl-0 max-ml:pt-2 ml:pl-2 lg:pl-4'>
        <SignInButton configs={configsSignInButton({ tooltip: 'signIn' })} />
        <Tooltip configs={configsDemo({ tooltip: 'demo' })}>
          <Link
            href={PATH_ROUTE['demo']}
            className={styleButton({ size: 'medium', color: 'black', ring: 'all', className: 'ml:ml-2 max-ml:w-full' })}
          >
            Try Demo
          </Link>
        </Tooltip>
      </div>
    </nav>
  );
};
