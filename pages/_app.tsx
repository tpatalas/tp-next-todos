import { PrefetchQueryEffect } from '@effects/prefetchQueryEffect';
import { LayoutHome } from '@layouts/layoutHome';
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
