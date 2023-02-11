import { PATHNAME } from '@data/dataTypesObjects';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { LayoutHome } from '@layouts/layoutHome';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const PrefetchRouterButton = dynamic(
  () => import('@buttons/button/prefetchRouterButton').then((mod) => mod.PrefetchRouterButton),
  { ssr: false },
);

const Home = () => {
  return (
    <div className='flex w-full flex-row justify-center'>
      <PrefetchRouterButton
        className={STYLE_BUTTON_NORMAL_BLUE}
        path={PATHNAME['app']}>
        Go to App
      </PrefetchRouterButton>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Home;
