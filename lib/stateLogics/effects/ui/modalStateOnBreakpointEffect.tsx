import { atomMediaQuery } from '@states/misc';
import { useGetWithRecoilCallback } from '@states/utils/hooks';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { atomTodoModalOpen, atomTodoModalMini } from '@states/modals';
import { BREAKPOINT } from '@constAssertions/ui';

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
