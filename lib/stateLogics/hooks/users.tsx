import { PATH_HOME } from '@constAssertions/data';
import { USER } from '@constAssertions/misc';
import { STORAGE_KEY } from '@constAssertions/storage';
import { SPINNER } from '@constAssertions/ui';
import { Types } from '@lib/types';
import { delSessionStorage, getSessionStorage, setSessionStorage } from '@stateLogics/utils';
import { atomLoadingSpinner } from '@states/misc';
import {
    atomUser,
    atomUserErrorMessage,
    atomUserSession,
    atomUserVerificationRequest,
} from '@states/users';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next-router-mock';
import { FormEvent } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

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

export const useUserSession = () => {
  const { data: session } = useSession();
  const offSession = session === null && typeof session !== 'undefined';
  const router = useRouter();
  const pathname = router.pathname as Types['pathname'];

  return useRecoilCallback(({ set }) => () => {
    if (pathname === PATH_HOME['auth']) {
      !!getSessionStorage(STORAGE_KEY['offSession']) &&
        delSessionStorage(STORAGE_KEY['offSession']);
      return;
    }
    if (offSession) {
      set(atomUserSession, false);
      setSessionStorage(STORAGE_KEY['offSession'], true);
      return;
    }
    if (session) {
      set(atomUserSession, true);
      delSessionStorage(STORAGE_KEY['offSession']);
      return;
    }
  });
};



