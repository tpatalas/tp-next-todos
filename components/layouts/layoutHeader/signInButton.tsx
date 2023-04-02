import { Button } from '@buttons/button';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { classNames } from '@stateLogics/utils';
import { atomLayoutType } from '@states/layouts';
import { signIn } from 'next-auth/react';
import { useRecoilValue } from 'recoil';

export const SignInButton = () => {
  const layoutType = useRecoilValue(atomLayoutType);
  const layoutHome = layoutType === 'home';

  return (
    <>
      <Button
        options={{
          className: classNames(
            'max-ml:w-full',
            STYLE_BUTTON_NORMAL_BLUE,
            layoutHome && 'max-ml:mb-3',
          ),
          tooltip: 'Sign in',
        }}
        onClick={() => signIn()}>
        Sign in
      </Button>
    </>
  );
};
