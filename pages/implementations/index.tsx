import { LayoutHome } from '@layout/home';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const UnderConstruction = dynamic(() =>
  import('@components/section/underConstruction').then((mod) => mod.UnderConstruction),
);

const Implementations = () => {
  return (
    <>
      <UnderConstruction />
    </>
  );
};

Implementations.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Implementations;
