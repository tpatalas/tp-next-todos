import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { DATA_HOME } from '@collections/home';
import { PATH_HOME } from '@constAssertions/data';
import { STYLE_BUTTON_NORMAL_BLACK } from '@data/stylePreset';
import { SignInButton } from '@layouts/layoutHeader/signInButton';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { Divider } from '@ui/dividers/divider';
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
          'flex-col bg-slate-50 max-ml:space-y-4 max-ml:rounded-b-xl max-ml:px-5 max-ml:pt-[6rem] max-ml:pb-8 ml:flex ml:flex-row ml:items-center ml:space-x-3',
      )}>
      {DATA_HOME.map((path) => (
        <li key={path.name}>
          <Link
            href={path.path}
            className='block w-full rounded-lg transition-all hover:bg-slate-900 hover:bg-opacity-10 max-ml:px-5 max-ml:py-3 ml:px-3 ml:py-2'>
            {path.name}
          </Link>
        </li>
      ))}
      <Divider />
      <div className={classNames('pl-0 max-ml:pt-2 ml:pl-4')}>
        <SignInButton />
        <PrefetchRouterButton
          options={{
            path: PATH_HOME['demo'],
            className: classNames(STYLE_BUTTON_NORMAL_BLACK, 'ml:ml-2 max-ml:w-full'),
            tooltip: 'Demo session',
          }}>
          Try Demo
        </PrefetchRouterButton>
      </div>
    </ul>
  );
};
