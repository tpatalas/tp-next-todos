import { USER } from '@data/dataTypesConst';
import { createDataNewUser } from '@lib/queries/queryUsers';
import { Types } from '@lib/types';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { atomUserCredentialError, atomUserNew } from '.';

export const useUserValueUpdate = () => {
  return useRecoilCallback(({ set, snapshot }) => (targetName: USER, content: string) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomUserNew, {
      ...get(atomUserNew),
      [targetName]: content,
    });
  });
};

export const useUserAuthFormSubmit = (isSignIn: Types['isSignIn'], isError: Types['isError']) => {
  const user = useRecoilValue(atomUserNew);
  const router = useRouter();
  const setSignInServerError = useSetRecoilState(atomUserCredentialError(isSignIn));
  const setSignUpServerError = useSetRecoilState(atomUserCredentialError(!isSignIn));

  const userSignIn = async () => {
    return await signIn('credentials', {
      redirect: false,
      email: user.email,
      password: user.password,
    });
  };

  return async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) return;
    if (isSignIn) {
      const response = await userSignIn();
      if (response && response.error) {
        setSignInServerError(true);
        return;
      }
      return router.replace('/app');
    }
    try {
      const response = await createDataNewUser(user);
      if (!response.error) {
        await userSignIn();
        router.replace('/app');
      }
    } catch (error) {
      setSignUpServerError(true);
    }
  };
};
