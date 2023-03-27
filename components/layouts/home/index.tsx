import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { DATA_HOME } from '@collections/home';
import { PATH_HOME } from '@constAssertions/data';
import { STYLE_BUTTON_NORMAL_BLACK } from '@data/stylePreset';
import { LayoutHeader } from '@layouts/layoutHeader';
import { SignInButton } from '@layouts/layoutHeader/signInButton';
import { classNames } from '@stateLogics/utils';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment as LayoutFragment, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const LayoutHome = ({ children }: Props) => {
  return (
    <LayoutFragment>
      <Head>
        <title>Home</title>
      </Head>
      <LayoutHeader>
        <ul className='flex flex-row items-center space-x-10 pr-3 text-base tracking-wide text-slate-800 sm:pr-8'>
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
      </LayoutHeader>
      {children}
    </LayoutFragment>
  );
};
