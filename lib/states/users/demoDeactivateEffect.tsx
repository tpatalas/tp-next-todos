import { STORAGE_KEY } from '@data/dataTypesConst';
import { useEffect } from 'react';

export const DemoDeactivateEffect = () => {
  useEffect(() => {
    sessionStorage.removeItem(STORAGE_KEY['demo']);
  }, []);

  return null;
};
