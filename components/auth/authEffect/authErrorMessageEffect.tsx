import { atomAuthErrorMessage, atomAuthUser } from '@auth/auth.states';
import { validateEmailFormat } from '@stateLogics/utils';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilCallback } from 'recoil';

export const UserAuthGroupEffect = () => {
  const user = useRecoilValue(atomAuthUser);
  const isEmailInValidated = !validateEmailFormat(user.email);

  const clientErrorMessageHandler = useRecoilCallback(
    ({ reset }) =>
      () => {
        !isEmailInValidated && reset(atomAuthErrorMessage);
      },
    [isEmailInValidated],
  );

  useEffect(() => {
    clientErrorMessageHandler();
  }, [clientErrorMessageHandler]);

  return null;
};
