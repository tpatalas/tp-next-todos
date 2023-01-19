import { atomDisableScroll } from '@states/utils';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

export const DisableScrollEffect = ({ open }: { open: boolean }) => {
  const disableScroll = useRecoilCallback(({ set, reset }) => () => {
    if (open) return set(atomDisableScroll, true);
    reset(atomDisableScroll);
  });

  useEffect(() => {
    disableScroll();
  }, [disableScroll, open]);

  return null;
};
