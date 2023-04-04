import { Button } from '@buttons/button';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { Types } from '@lib/types';
import { TypesOptionsButton } from '@lib/types/options';
import { classNames } from '@stateLogics/utils';
import { atomLayoutType } from '@states/layouts';
import { signIn } from 'next-auth/react';
import { useRecoilValue } from 'recoil';

export const SignInButton = () => {
  const layoutType = useRecoilValue(atomLayoutType);
  const layoutHome = layoutType === 'home';
type Props = { options?: Partial<Pick<Types, 'signInButtonName'> & TypesOptionsButton> };

const buttonOptions = {
  className: classNames(STYLE_BUTTON_NORMAL_BLUE, 'max-ml:w-full max-ml:mb-3'),
  tooltip: 'Sign in',
};

export const SignInButton = ({ options }: Props) => {
  const { signInButtonName = 'Sign in' } = options ?? {};

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
        options={options ?? buttonOptions}
        onClick={() => signIn()}>
        {signInButtonName}
      </Button>
    </>
  );
};
