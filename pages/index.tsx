import { PATHNAME } from '@data/stateObjects';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import dynamic from 'next/dynamic';

const PrefetchRouterButton = dynamic(() =>
  import('@buttons/button/prefetchRouterButton').then((mod) => mod.PrefetchRouterButton),
);

const Home = () => {
  return (
    <div className='flex w-full flex-row justify-center'>
      <PrefetchRouterButton
        className={STYLE_BUTTON_NORMAL_BLUE}
        pathName={PATHNAME['app']}>
        Go to App
      </PrefetchRouterButton>
    </div>
  );
};
export default Home;
