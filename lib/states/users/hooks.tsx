import { ERROR_TYPE, USER } from '@data/dataTypesConst';
import { Types } from '@lib/types';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { atomUserError, atomUser, atomUserVerificationRequest } from '.';

export const useUserValueUpdate = () => {
  return useRecoilCallback(({ set, snapshot }) => (targetName: USER, content: string) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomUser, {
      ...get(atomUser),
      [targetName]: content,
    });
  });
};

export const useUserAuthFormSubmit = (isError: Types['isError']) => {
  const user = useRecoilValue(atomUser);
  const setServerError = useSetRecoilState(atomUserError(ERROR_TYPE['server']));
  const setClientError = useSetRecoilState(atomUserError(ERROR_TYPE['client']));
  const isServerError = useRecoilValue(atomUserError(ERROR_TYPE['server']));
  const isClientError = useRecoilValue(atomUserError(ERROR_TYPE['client']));
  const setIsVerificationRequested = useSetRecoilState(atomUserVerificationRequest);

  return async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isError) {
      setClientError(true);
      return;
    }
    if (isClientError || isServerError) return;

    try {
      const userEmailSent = async () => {
        return await signIn('email', {
          redirect: false,
          email: user.email,
        });
      };

      const response = await userEmailSent();
      if (response && !response.error) {
        setIsVerificationRequested(true);
        return;
      }
    } catch (error) {
      setServerError(true);
    }
  };
};
