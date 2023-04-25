import { Button } from '@buttons/button';
import { PATH_HOME } from '@constAssertions/data';
import { STYLE_BUTTON_NORMAL_BLUE } from '@data/stylePreset';
import { Types } from '@lib/types';
import { TypesOptionsButton } from '@lib/types/options';
import { classNames } from '@stateLogics/utils';
import { atomLayoutType } from '@states/layouts';
import { signIn } from 'next-auth/react';
import router from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

type Props = { options?: Partial<TypesOptionsButton> };

const buttonOptionsHandler = (layoutType: Types['layoutType']) => {
  const layoutHome = layoutType === 'home';
  return {
    className: classNames('max-ml:w-full', STYLE_BUTTON_NORMAL_BLUE, layoutHome && 'max-ml:mb-3'),
    tooltip: 'Sign in',
  };
};

export const SignInButton = ({ options }: Props) => {
  const { signInButtonName = 'Sign in' } = options ?? {};
  const layoutType = useRecoilValue(atomLayoutType);
  const buttonOptions = buttonOptionsHandler(layoutType);

  useEffect(() => {
    router.prefetch(PATH_HOME['auth']);
  }, []);

  return (
    <>
      <Button
        options={options ?? buttonOptions}
        onClick={() => signIn()}
      >
        {signInButtonName}
      </Button>
    </>
  );
};
