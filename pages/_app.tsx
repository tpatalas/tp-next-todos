import { LayoutHome } from '@layouts/layoutHome';
import { PrefetchQueryEffect } from '@states/prefetchQueryEffect';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <PrefetchQueryEffect />
      <LayoutHome>
        <Component {...pageProps} />
      </LayoutHome>
    </RecoilRoot>
  );
};

export default MyApp;
