import Head from 'next/head';
import { Fragment as LayoutFragment, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const LayoutHome = ({ children }: Props) => {
  return (
    <LayoutFragment>
      <Head>
        <title>Task name</title>
      </Head>
      {children}
    </LayoutFragment>
  );
};
