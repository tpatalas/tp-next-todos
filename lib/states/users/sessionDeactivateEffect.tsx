import { STORAGE_KEY } from '@data/dataTypesConst';
import { useCallback, useEffect } from 'react';

export const SessionDeactivateEffect = () => {
  const deactivateSession = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY['session']);
  }, []);
  useEffect(() => {
    deactivateSession();
  }, [deactivateSession]);

  return null;
};
