import { LayoutHome } from '@layout/home';
import dynamic from 'next/dynamic';
import { Fragment, ReactElement } from 'react';

const HomeHero = dynamic(() => import('@components/section/homeHero').then((mod) => mod.HomeHero));
const HomeStartToday = dynamic(() =>
  import('@components/section/homeStartToday').then((mod) => mod.HomeStartToday),
);
const HomeContent = dynamic(() => import('@components/section/homeContent').then((mod) => mod.HomeContent));
const HomeHeader = dynamic(() => import('@components/section/homeHeader').then((mod) => mod.HomeHeader));

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
