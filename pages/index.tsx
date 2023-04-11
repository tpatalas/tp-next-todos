import { LayoutHome } from '@layouts/home';
import dynamic from 'next/dynamic';
import { Fragment, ReactElement } from 'react';

const Hero = dynamic(() => import('@components/sections/hero').then((mod) => mod.Hero));
const Header = dynamic(() => import('@components/sections/header').then((mod) => mod.Header));

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <Header />
    </Fragment>
  );
};
Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Home;
