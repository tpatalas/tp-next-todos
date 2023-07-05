import { SPINNER } from '@components/loadable/loadable.consts';
import { atomLoadingSpinner } from '@states/misc';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export const MockSpinnerState = ({ spinnerId }: { spinnerId: SPINNER }) => {
  const setSpinner = useSetRecoilState(atomLoadingSpinner(spinnerId));

  useEffect(() => {
    setSpinner(!!spinnerId);
  }, [setSpinner, spinnerId]);

  return null;
};
