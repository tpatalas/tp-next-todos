import { atomHtmlTitleTag } from '@states/misc';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment as LayoutFragment, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

const HomeNavigation = dynamic(() => import('./homeNavigation').then((mod) => mod.HomeNavigation));
const LayoutHeader = dynamic(() => import('@layouts/layoutHeader').then((mod) => mod.LayoutHeader));
const LayoutFooter = dynamic(() => import('@layouts/layoutFooter').then((mod) => mod.LayoutFooter));
const Footer = dynamic(() => import('@components/sections/footer').then((mod) => mod.Footer));

const LayoutHomeGroupEffects = dynamic(
  () => import('@effects/layout').then((mod) => mod.LayoutHomeGroupEffects),
  { ssr: false },
);

type Props = {
  children: ReactNode;
};

export const LayoutHome = ({ children }: Props) => {
  const slug = useRecoilValue(atomHtmlTitleTag);

  return (
    <LayoutFragment>
      <Head>
        <title>{slug ? 'Todos - ' + slug : ''}</title>
      </Head>
      <main className='flex min-h-screen flex-col justify-between'>
        <section>
          <LayoutHeader layoutType='home'>
            <HomeNavigation layoutType='home' />
          </LayoutHeader>
          <LayoutFooter layoutType='home' />
          {children}
        </section>
        <Footer />
      </main>
      <LayoutHomeGroupEffects />
    </LayoutFragment>
  );
};
