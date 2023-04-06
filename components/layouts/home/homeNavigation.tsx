import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { DATA_HOME } from '@collections/home';
import { PATH_HOME } from '@constAssertions/data';
import { STYLE_BUTTON_NORMAL_BLACK } from '@data/stylePreset';
import { SignInButton } from '@layouts/layoutHeader/signInButton';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { DividerX } from '@ui/dividers/dividerX';
import { DividerY } from '@ui/dividers/dividerY';
import Link from 'next/link';

type Props = Pick<Types, 'layoutType'>;

export const HomeNavigation = ({ layoutType }: Props) => {
  const layoutApp = layoutType === 'app';
  const layoutHome = layoutType === 'home';
  const linkClassName =
    'block w-full rounded-lg transition-all hover:bg-slate-900 hover:bg-opacity-10 max-ml:px-5 max-ml:py-3 ml:px-2 lg:px-3 ml:py-2';

  return (
    <ul
      className={classNames(
        'flex text-base tracking-wide text-slate-800',
        layoutApp && 'flex-row items-center space-x-10 pr-3 sm:pr-8',
        layoutHome &&
          'flex-col bg-slate-50 max-ml:space-y-4 max-ml:rounded-b-xl max-ml:px-5 max-ml:pb-8 max-ml:pt-[6rem] ml:flex ml:flex-row ml:items-center ml:space-x-3 ml:pr-0 lg:pr-3',
      )}>
      {DATA_HOME.map((path) => (
        <li key={path.name}>
          <Link
            href={path.path}
            className={classNames(linkClassName)}>
            {path.name}
          </Link>
        </li>
      ))}
      {layoutHome && <DividerY options={{ hidden: 'max-ml:hidden' }} />}
      <li>
        <Link
          href={PATH_HOME['contact']}
          className={classNames(linkClassName)}>
          Contact
        </Link>
      </li>
      {layoutHome && <DividerX options={{ hidden: 'ml:hidden' }} />}
      <div className={classNames('pl-0 max-ml:pt-2 ml:pl-2 lg:pl-4')}>
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
