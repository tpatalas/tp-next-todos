import dynamic from 'next/dynamic';
import { Fragment, ReactElement } from 'react';

const LayoutApp = dynamic(() => import('@layouts/layoutApp').then((mod) => mod.LayoutApp));

const CatchAllApp = () => {
  return <Fragment />;
};

CatchAllApp.getLayout = function getLayout(page: ReactElement) {
  return <LayoutApp>{page}</LayoutApp>;
};

export default CatchAllApp;
