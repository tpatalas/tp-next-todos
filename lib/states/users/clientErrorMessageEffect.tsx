import { validateEmailFormat } from '@states/utils';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { atomUser, atomUserErrorMessage } from '.';

export const ClientErrorMessageEffect = () => {
  const user = useRecoilValue(atomUser);
  const isEmailInValidated = !validateEmailFormat(user.email);
  const resetClientErrorMessage = useResetRecoilState(atomUserErrorMessage);

  useEffect(() => {
    !isEmailInValidated && resetClientErrorMessage();
  }, [isEmailInValidated, resetClientErrorMessage]);

  return null;
};