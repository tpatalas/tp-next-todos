import { Types } from '@lib/types';
import { atomHtmlTitleTag } from '@states/misc';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment as HeaderFragment, Fragment as LayoutAppFragment, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { LayoutAppLazy } from './layoutAppLazy';
const FooterBody = dynamic(() => import('@layout/layoutFooter/footerBody').then((mod) => mod.FooterBody));
const LayoutHeader = dynamic(() => import('@layout/layoutHeader').then((mod) => mod.LayoutHeader));
const SearchBar = dynamic(() => import('@layout/layoutHeader/searchBar').then((mod) => mod.SearchBar));
const LayoutFooter = dynamic(() => import('@layout/layoutFooter').then((mod) => mod.LayoutFooter), {
  ssr: false,
});

const User = dynamic(() => import('@user/index').then((mod) => mod.User), {
  ssr: false,
});

type Props = Pick<Types, 'children'>;

export const LayoutApp = ({ children }: Props) => {
  const slug = useRecoilValue(atomHtmlTitleTag);
  const path = 'app';

  return (
    <LayoutAppFragment>
      <Head>
        <title>{slug ? 'Todos - ' + slug : 'Todos'}</title>
      </Head>
      <HeaderFragment>
        <div className='flex h-screen flex-col'>
          <LayoutHeader path={path}>
            <SearchBar />
            <Suspense fallback={null}>
              <User />
            </Suspense>
          </LayoutHeader>
          <LayoutFooter path='app'>
            <FooterBody>{children}</FooterBody>
          </LayoutFooter>
        </div>
      </HeaderFragment>
      <LayoutAppLazy path={path} />
    </LayoutAppFragment>
  );
};
