import { atomDisableScroll } from '@stateLogics/utils';
import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

export const DisableScrollEffect = ({ open }: { open: boolean }) => {
  const setDisableScroll = useSetRecoilState(atomDisableScroll);
  const resetDisableScroll = useResetRecoilState(atomDisableScroll);

  useEffect(() => {
    open ? setDisableScroll(true) : resetDisableScroll();
  }, [open, resetDisableScroll, setDisableScroll]);

  return null;
};
