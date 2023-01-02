import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { STYLE_BUTTON_BLUE } from '@data/stylePreset';

const Home = () => {
  return (
    <div className='flex w-full flex-row justify-center'>
      <PrefetchRouterButton
        className={STYLE_BUTTON_BLUE}
        pathName='/app'>
        Go to App
      </PrefetchRouterButton>
    </div>
  );
};
export default Home;
