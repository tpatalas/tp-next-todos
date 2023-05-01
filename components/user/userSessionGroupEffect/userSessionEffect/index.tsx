import { useUserSession } from '@user/user.hooks';
import { useEffect } from 'react';

export const UserSessionEffect = () => {
  const userSession = useUserSession();

  useEffect(() => {
    userSession();
  }, [userSession]);

  return null;
};
