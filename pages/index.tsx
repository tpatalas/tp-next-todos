import { LayoutHome } from '@layouts/home';
import dynamic from 'next/dynamic';
import { Fragment, ReactElement } from 'react';

const HomeHero = dynamic(() => import('@components/sections/homeHero').then((mod) => mod.HomeHero));
const HomeContent = dynamic(() =>
  import('@components/sections/homeContent').then((mod) => mod.HomeContent),
);
const HomeHeader = dynamic(() =>
  import('@components/sections/homeHeader').then((mod) => mod.HomeHeader),
);

const Home = () => {
  return (
    <Fragment>
      <HomeHero />
      <HomeHeader />
      <HomeContent />
    </Fragment>
  );
};
Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Home;
