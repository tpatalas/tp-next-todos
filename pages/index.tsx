import { LayoutHome } from '@layout/home';
import dynamic from 'next/dynamic';
import { Fragment, ReactElement } from 'react';

const HomeHero = dynamic(() => import('@components/sections/homeHero').then((mod) => mod.HomeHero));
const HomeStartToday = dynamic(() =>
  import('@components/sections/homeStartToday').then((mod) => mod.HomeStartToday),
);
const HomeContent = dynamic(() => import('@components/sections/homeContent').then((mod) => mod.HomeContent));
const HomeHeader = dynamic(() => import('@components/sections/homeHeader').then((mod) => mod.HomeHeader));

const Home = () => {
  return (
    <Fragment>
      <div className='flex min-h-screen flex-col justify-between'>
        <HomeHero />
        <HomeHeader />
        <HomeContent />
        <HomeStartToday />
      </div>
    </Fragment>
  );
};
Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Home;
