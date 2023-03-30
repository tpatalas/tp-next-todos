import { LayoutHome } from '@layouts/home';
import { Fragment, ReactElement } from 'react';

const Home = () => {
  return (
    <Fragment>
      <div>Home</div>
    </Fragment>
  );
};
Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Home;
