import { Types } from '@lib/types';
import { atomHtmlTitleTag } from '@states/misc';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment as HeaderFragment, Fragment as LayoutAppFragment, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
const FooterBody = dynamic(() => import('@layouts/layoutFooter/footerBody').then((mod) => mod.FooterBody));
const LayoutHeader = dynamic(() => import('@layouts/layoutHeader').then((mod) => mod.LayoutHeader));
const SearchBar = dynamic(() => import('@layouts/layoutHeader/searchBar').then((mod) => mod.SearchBar));
const LayoutFooter = dynamic(() => import('@layouts/layoutFooter').then((mod) => mod.LayoutFooter), {
  ssr: false,
});

const LayoutAppGroupEffects = dynamic(
  () => import('@effects/layout').then((mod) => mod.LayoutAppGroupEffects),
  { ssr: false },
);

const User = dynamic(() => import('@components/users/user').then((mod) => mod.User), {
  ssr: false,
});

type Props = Pick<Types, 'children'>;

export const LayoutApp = ({ children }: Props) => {
  const slug = useRecoilValue(atomHtmlTitleTag);

  return (
    <LayoutAppFragment>
      <Head>
        <title>{slug ? 'Todos - ' + slug : 'Todos'}</title>
      </Head>
      <HeaderFragment>
        <div className='flex h-screen flex-col'>
          <LayoutHeader layoutType='app'>
            <SearchBar />
            <Suspense>
              <User />
            </Suspense>
          </LayoutHeader>
          <LayoutFooter layoutType='app'>
            <FooterBody>{children}</FooterBody>
          </LayoutFooter>
        </div>
      </HeaderFragment>
      <LayoutAppGroupEffects />
    </LayoutAppFragment>
  );
};
