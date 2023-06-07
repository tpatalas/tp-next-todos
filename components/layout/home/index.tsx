import { atomHtmlTitleTag } from '@states/misc';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment as LayoutFragment, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { LayoutHomeLazy } from './layoutHomeLazy';

const HomeNavigation = dynamic(() => import('./homeNavigation').then((mod) => mod.HomeNavigation));
const LayoutHeader = dynamic(() => import('@layout/layoutHeader').then((mod) => mod.LayoutHeader));
const LayoutFooter = dynamic(() => import('@layout/layoutFooter').then((mod) => mod.LayoutFooter));
const Footer = dynamic(() => import('@components/sections/footer').then((mod) => mod.Footer));

type Props = {
  children: ReactNode;
};

export const LayoutHome = ({ children }: Props) => {
  const slug = useRecoilValue(atomHtmlTitleTag);
  const path = 'home';

  return (
    <LayoutFragment>
      <Head>
        <title>{slug ? 'Todos - ' + slug : 'Todos'}</title>
      </Head>
      <main className='flex min-h-screen flex-col justify-between'>
        <div>
          <LayoutHeader path={path}>
            <HomeNavigation path={path} />
          </LayoutHeader>
          <LayoutFooter path={path} />
          {children}
        </div>
        <Footer />
      </main>
      <LayoutHomeLazy path={path} />
    </LayoutFragment>
  );
};
