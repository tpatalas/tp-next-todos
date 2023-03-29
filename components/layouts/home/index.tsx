import { LayoutTypeEffect } from '@effects/layoutTypeEffect';
import { NavigationInitialEffect } from '@effects/navigationInitialEffect';
import { LayoutFooter } from '@layouts/layoutFooter';
import { LayoutHeader } from '@layouts/layoutHeader';
import Head from 'next/head';
import { Fragment as EffectFragment, Fragment as LayoutFragment, ReactNode } from 'react';
import { HomeNavigation } from './homeNavigation';

type Props = {
  children: ReactNode;
};

export const LayoutHome = ({ children }: Props) => {
  return (
    <LayoutFragment>
      <Head>
        <title>Home</title>
      </Head>
      <LayoutHeader layoutType='homeHorizontal'>
        <HomeNavigation layoutType='homeHorizontal' />
      </LayoutHeader>
      <LayoutFooter layoutType='homeVertical' />
      {children}
      <EffectFragment>
        <NavigationInitialEffect layoutType='homeHorizontal' />
        <LayoutTypeEffect layoutType='homeHorizontal' />
      </EffectFragment>
    </LayoutFragment>
  );
};
