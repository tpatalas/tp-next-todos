import { Button } from '@buttons/button';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { Types } from '@lib/types';
import { classNames } from '@stateLogics/utils';
import { signIn } from 'next-auth/react';

type Props = { options?: Partial<Pick<Types, 'signInButtonName'>> };

const buttonOptions = {
  className: classNames(STYLE_BUTTON_NORMAL_BLUE, 'max-ml:w-full max-ml:mb-3'),
  tooltip: 'Sign in',
};

export const SignInButton = ({ options }: Props) => {
  const { signInButtonName = 'Sign in' } = options ?? {};

  return (
    <>
      <Button
        options={buttonOptions}
        onClick={() => signIn()}>
        {signInButtonName}
      </Button>
    </>
  );
};
