import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { DATA_HOME } from '@collections/home';
import { PATH_HOME } from '@constAssertions/data';
import { STYLE_BUTTON_NORMAL_BLACK } from '@data/stylePreset';
import { SignInButton } from '@layouts/layoutHeader/signInButton';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import Link from 'next/link';

type Props = Pick<Types, 'layoutType'>;

export const HomeNavigation = ({ layoutType }: Props) => {
  const layoutApp = layoutType === 'app';
  const layoutHomeVertical = layoutType === 'homeVertical';
  const layoutHomeHorizontal = layoutType === 'homeHorizontal';

  return (
    <ul
      className={classNames(
        'flex text-base tracking-wide text-slate-800',
        (layoutApp || layoutHomeHorizontal) && 'flex-row items-center space-x-10 pr-3 sm:pr-8',
        layoutHomeVertical && 'flex-col space-y-5 ml:hidden',
      )}>
      {DATA_HOME.map((path) => (
        <>
          <li key={path.name}>
            <Link href={path.path}>{path.name}</Link>
          </li>
        </>
      ))}
      <div className='pl-5'>
        <SignInButton />
        <>
          <PrefetchRouterButton
            options={{
              path: PATH_HOME['demo'],
              className: classNames(STYLE_BUTTON_NORMAL_BLACK, 'ml-2'),
              tooltip: 'Demo session',
            }}>
            Try Demo
          </PrefetchRouterButton>
        </>
      </div>
    </ul>
  );
};
