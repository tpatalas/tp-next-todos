import { LayoutHome } from '@layouts/home';
import { ReactElement } from 'react';

const Features = () => {
  return (
    <>
      <div>Features</div>
    </>
  );
};

Features.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Features;
