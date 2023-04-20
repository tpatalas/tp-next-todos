import { NextPage } from 'next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import Head from 'next/head';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{
  session: Session;
}> & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta
          // viewport meta should not be used in _document
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </Head>
      <RecoilRoot>
        <SessionProvider
          session={session}
          basePath={process.env.NEXT_PUBLIC_NEXTAUTH_BASE_PATH}
          refetchOnWindowFocus={false}>
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
