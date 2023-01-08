import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { PATHNAME } from '@data/stateObjects';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';

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
