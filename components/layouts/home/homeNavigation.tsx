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
  const layoutHome = layoutType === 'home';

  return (
    <ul
      className={classNames(
        'flex text-base tracking-wide text-slate-800',
        layoutApp && 'flex-row items-center space-x-10 pr-3 sm:pr-8',
        layoutHome &&
          'flex-col bg-slate-50 max-ml:space-y-5 max-ml:rounded-b-xl max-ml:px-5 max-ml:pt-[7rem] max-ml:pb-5 ml:flex ml:flex-row ml:items-center ml:space-x-10 ml:pr-3',
      )}>
      {DATA_HOME.map((path) => (
        <li key={path.name}>
          <Link href={path.path}>{path.name}</Link>
        </li>
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
