import { LayoutHome } from '@layouts/layoutHome';
import { ReactElement } from 'react';

const Home = () => {
  return (
    <div className='mt-10 flex w-full flex-row items-center justify-center text-2xl'>
      This area is intentionally left blank for now.
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Home;
