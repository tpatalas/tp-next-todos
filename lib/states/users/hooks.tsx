import { atomLoadingSpinner } from '@states/misc';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { atomUser, atomUserErrorMessage, atomUserVerificationRequest } from '.';
import { USER } from '@constAssertions/misc';
import { SPINNER } from '@constAssertions/ui';

export const useUserValueUpdate = () => {
  return useRecoilCallback(({ set, snapshot }) => (targetName: USER, content: string) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomUser, {
      ...get(atomUser),
      [targetName]: content,
    });
  });
};

export const useUserAuthFormSubmit = (isEmailInValidated: boolean) => {
  const user = useRecoilValue(atomUser);
  const setClientErrorMessage = useSetRecoilState(atomUserErrorMessage);
  const setIsVerificationRequested = useSetRecoilState(atomUserVerificationRequest);
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
