import { LayoutHome } from '@layouts/layoutHome';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RecoilRoot>
      <LayoutHome>{getLayout(<Component {...pageProps} />)}</LayoutHome>
    </RecoilRoot>
  );
};

export default MyApp;
