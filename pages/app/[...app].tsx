import dynamic from 'next/dynamic';
import { Fragment } from 'react';

const LayoutApp = dynamic(() => import('@layouts/layoutApp').then((mod) => mod.LayoutApp));

const CatchAllApp = () => {
  return (
    <LayoutApp>
      <Fragment />
    </LayoutApp>
  );
};
export default CatchAllApp;
