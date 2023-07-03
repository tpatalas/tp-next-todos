import { atomAuthErrorMessage } from '@auth/auth.states';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const MockErrorMessageObserver = () => {
  const [message, setMessage] = useRecoilState(atomAuthErrorMessage);
  const defaultError = 'Something went wrong';

  useEffect(() => {
    setMessage(defaultError);
  }, [setMessage]);
  return <>{message}</>;
};
