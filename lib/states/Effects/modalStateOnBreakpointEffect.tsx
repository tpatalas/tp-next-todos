import { BREAKPOINT } from '@data/stateObjects';
import { useGetWithRecoilCallback } from '@hooks/useUtils';
import { atomMediaQuery, atomTodoModalMini, atomTodoModalOpen } from '@states/atoms';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

export const ModalStateOnBreakpointEffect = () => {
  const get = useGetWithRecoilCallback();
  const setTodoModal = useRecoilCallback(({ set, reset }) => () => {
    set(atomTodoModalOpen(undefined), true);
    reset(atomTodoModalMini(undefined));
  });

  useEffect(() => {
    !get(atomMediaQuery(BREAKPOINT['sm'])) && setTodoModal();
  }, [get, setTodoModal]);

  return null;
};
