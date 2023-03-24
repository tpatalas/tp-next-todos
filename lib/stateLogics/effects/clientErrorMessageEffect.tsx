import { validateEmailFormat } from '@stateLogics/utils';
import { atomUser, atomUserErrorMessage } from '@states/users';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

export const ClientErrorMessageEffect = () => {
  const user = useRecoilValue(atomUser);
  const isEmailInValidated = !validateEmailFormat(user.email);
  const resetClientErrorMessage = useResetRecoilState(atomUserErrorMessage);

  useEffect(() => {
    !isEmailInValidated && resetClientErrorMessage();
  }, [isEmailInValidated, resetClientErrorMessage]);

  return null;
};
