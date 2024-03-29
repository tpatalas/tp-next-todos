import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { DATA_HOME } from '@collections/home';
import { PATH_HOME } from '@constAssertions/data';
import { STYLE_BUTTON_NORMAL_BLACK, STYLE_LINK_NORMAL } from '@data/stylePreset';
import { TypesLayout } from '@layout/layout.types';
import { SignInButton } from '@layout/layoutHeader/signInButton';
import { classNames } from '@stateLogics/utils';
import { DividerX } from '@ui/dividers/dividerX';
import { DividerY } from '@ui/dividers/dividerY';
import Link from 'next/link';

type Props = Pick<TypesLayout, 'path'>;

export const HomeNavigation = ({ path }: Props) => {
  const layoutApp = path === 'app';
  const layoutHome = path === 'home';
  const optionsRouter = {
    path: PATH_HOME['demo'],
    className: classNames(STYLE_BUTTON_NORMAL_BLACK, 'ml:ml-2 max-ml:w-full'),
    tooltip: 'Demo session',
  };

  return (
    <nav
      className={classNames(
        'flex text-base tracking-wide text-slate-800',
        layoutApp && 'flex-row items-center space-x-10 pr-3 sm:pr-8',
        layoutHome &&
          'flex-col bg-slate-50 max-ml:space-y-4 max-ml:rounded-b-xl max-ml:px-5 max-ml:pb-8 max-ml:pt-[6rem] ml:flex ml:flex-row ml:items-center ml:space-x-3 ml:bg-transparent ml:pr-0 lg:pr-3',
      )}
      data-testid='homeNavigation'
    >
      {DATA_HOME.map((path) => (
        <div key={path.name}>
          <Link
            href={path.path}
            className={classNames(STYLE_LINK_NORMAL)}
          >
            {path.name}
          </Link>
        </div>
      ))}
      {layoutHome && <DividerY options={{ hidden: 'max-ml:hidden' }} />}
      <div>
        <Link
          href={PATH_HOME['contact']}
          className={classNames(STYLE_LINK_NORMAL)}
        >
          Contact
        </Link>
      </div>
      {layoutHome && <DividerX options={{ hidden: 'ml:hidden' }} />}
      <div className={classNames('pl-0 max-ml:pt-2 ml:pl-2 lg:pl-4')}>
        <SignInButton />
        <PrefetchRouterButton options={optionsRouter}>Try Demo</PrefetchRouterButton>
      </div>
    </nav>
  );
};
