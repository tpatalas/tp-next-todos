import { Button } from '@buttons/button';
import { PATH_HOME } from '@constAssertions/data';
import { atomLayoutType } from '@layout/layout.states';
import { optionsSignInButton } from '@layout/layout.utils';
import { TypesOptionsButton } from '@lib/types/options';
import { signIn } from 'next-auth/react';
import router from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

type Props = { options?: Partial<TypesOptionsButton> };

export const SignInButton = ({ options }: Props) => {
  const { signInButtonName = 'Sign in' } = options ?? {};
  const layoutPath = useRecoilValue(atomLayoutType);
  const optionsButton = optionsSignInButton(layoutPath);

  useEffect(() => {
    router.prefetch(PATH_HOME['auth']);
  }, []);

  return (
    <Button
      options={options ?? optionsButton}
      onClick={() => signIn()}
    >
      {signInButtonName}
    </Button>
  );
};
