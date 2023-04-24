import { useEffect } from 'react';
import { useUserSession } from './userSessionEffect.hooks';

export const UserSessionEffect = () => {
  const userSession = useUserSession();

  useEffect(() => {
    userSession();
  }, [userSession]);

  return null;
};
