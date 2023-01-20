import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { atomComboBoxQuery } from '.';

export const ComboBoxResetQueryEffect = () => {
  const resetQuery = useResetRecoilState(atomComboBoxQuery);

  useEffect(() => {
    resetQuery();
  }, [resetQuery]);

  return null;
};
