import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import dynamic from 'next/dynamic';

const UserSessionEffect = dynamic(() =>
  import('@effects/userSessionEffect').then((mod) => mod.UserSessionEffect),
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RecoilRoot>
      <SessionProvider
        session={session}
        basePath={process.env.NEXT_PUBLIC_NEXTAUTH_BASE_PATH}
        refetchOnWindowFocus={false}>
        {getLayout(<Component {...pageProps} />)}
        <UserSessionEffect />
      </SessionProvider>
    </RecoilRoot>
  );
};

export default MyApp;
