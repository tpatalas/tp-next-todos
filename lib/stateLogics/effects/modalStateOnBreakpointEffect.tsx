import { atomMediaQuery } from '@states/misc';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { atomTodoModalOpen, atomTodoModalMini } from '@states/modals';
import { BREAKPOINT } from '@constAssertions/ui';
import { useGetWithRecoilCallback } from '@hooks/misc';

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
