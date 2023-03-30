import { LayoutTypeEffect } from '@effects/layoutTypeEffect';
import { NavigationInitialEffect } from '@effects/navigationInitialEffect';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment as EffectFragment, Fragment as LayoutFragment, ReactNode } from 'react';

const HomeNavigation = dynamic(() => import('./homeNavigation').then((mod) => mod.HomeNavigation));

const LayoutHeader = dynamic(() => import('@layouts/layoutHeader').then((mod) => mod.LayoutHeader));

const LayoutFooter = dynamic(() => import('@layouts/layoutFooter').then((mod) => mod.LayoutFooter));

type Props = {
  children: ReactNode;
};

export const LayoutHome = ({ children }: Props) => {
  return (
    <LayoutFragment>
      <Head>
        <title>Home</title>
      </Head>
      <LayoutHeader layoutType='home'>
        <HomeNavigation layoutType='home' />
      </LayoutHeader>
      <LayoutFooter layoutType='home' />
      {children}
      <EffectFragment>
        <NavigationInitialEffect layoutType='home' />
        <LayoutTypeEffect layoutType='home' />
      </EffectFragment>
    </LayoutFragment>
  );
};
