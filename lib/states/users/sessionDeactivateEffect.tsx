import { STORAGE_KEY } from '@data/dataTypesConst';
import { setSessionStorage } from '@states/utils';
import { useCallback, useEffect } from 'react';

export const SessionDeactivateEffect = () => {
  const deactivateSession = useCallback(() => {
    setSessionStorage(STORAGE_KEY['session'], 'pending');
  }, []);
  useEffect(() => {
    deactivateSession();
    window.addEventListener('storage', deactivateSession);
    return () => {
      window.removeEventListener('storage', deactivateSession);
    };
  }, [deactivateSession]);

  return null;
};
