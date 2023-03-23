import { atomComboBoxQuery } from '@states/comboBoxes';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

export const ComboBoxResetQueryEffect = () => {
  const resetQuery = useResetRecoilState(atomComboBoxQuery);

  useEffect(() => {
    resetQuery();
  }, [resetQuery]);

  return null;
};
