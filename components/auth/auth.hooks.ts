import { atomAuthErrorMessage, atomAuthUser, atomAuthVerificationRequest } from '@auth/auth.states';
import { atomLoadingSpinner } from '@states/misc';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { USER } from './auth.consts';
import { SPINNER } from '@components/loadable/loadable.consts';

export const useAuthUserValueUpdate = () => {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (targetName: USER, content: string) => {
        const get = <T>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

        set(atomAuthUser, {
          ...get(atomAuthUser),
          [targetName]: content,
        });
      },
    [],
  );
};

export const useAuthFormSubmit = (isEmailInValidated: boolean) => {
  const user = useRecoilValue(atomAuthUser);
  const setClientErrorMessage = useSetRecoilState(atomAuthErrorMessage);
  const setIsVerificationRequested = useSetRecoilState(atomAuthVerificationRequest);
  const setLoadingSpinner = useSetRecoilState(atomLoadingSpinner(SPINNER['authForm']));

  return async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmailInValidated) {
      setClientErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const userEmailSent = async () => {
        return await signIn('email', {
          redirect: false,
          email: user.email,
        });
      };
      setLoadingSpinner(true);

      const response = await userEmailSent();
      if (response && !response.error) {
        setIsVerificationRequested(true);
        return;
      }
    } catch (error) {
      setClientErrorMessage('something went wrong. Please try again!');
    }
  };
};
