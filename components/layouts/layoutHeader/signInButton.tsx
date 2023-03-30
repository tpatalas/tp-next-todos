import { Button } from '@buttons/button';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { classNames } from '@stateLogics/utils';
import { signIn } from 'next-auth/react';

export const SignInButton = () => {
  return (
    <>
      <Button
        options={{
          className: classNames(STYLE_BUTTON_NORMAL_BLUE, 'max-ml:w-full max-ml:mb-3'),
          tooltip: 'Sign in',
        }}
        onClick={() => signIn()}>
        Sign in
      </Button>
    </>
  );
};
