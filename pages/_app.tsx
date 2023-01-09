import { LayoutHome } from '@layouts/layoutHome';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

const PrefetchQueryEffect = dynamic(() =>
  import('@states/prefetchQueryEffect').then((mod) => mod.PrefetchQueryEffect),
);

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
