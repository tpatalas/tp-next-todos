import { Button } from '@buttons/button';
import { STYLE_BUTTON_BLUE } from '@data/stylePreset';
import { classNames } from '@lib/utils';
import { usePrefetchRouter } from '@states/utilsStates';

const Home = () => {
  const routerPushPrefetch = usePrefetchRouter('/app');

  return (
    <div className='flex w-full flex-row justify-center'>
      <Button
        data={{ className: classNames(STYLE_BUTTON_BLUE) }}
        onClick={() => routerPushPrefetch()}>
        Go to App
      </Button>
    </div>
  );
};
export default Home;
