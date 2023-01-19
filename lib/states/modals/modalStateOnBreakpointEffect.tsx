import { BREAKPOINT } from '@data/stateObjects';
import { atomMediaQuery } from '@states/misc/states';
import { useGetWithRecoilCallback } from '@states/utils/hooks';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { atomTodoModalOpen, atomTodoModalMini } from './states';

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
