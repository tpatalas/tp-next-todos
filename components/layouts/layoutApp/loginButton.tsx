import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { classNames } from '@states/utils';

export const LoginButton = () => {
  return (
    <PrefetchRouterButton
      path='/auth'
      className={classNames(STYLE_BUTTON_NORMAL_BLUE)}>
      <span className='sr-only'>Login</span>
      <div>Log in</div>
    </PrefetchRouterButton>
  );
};
