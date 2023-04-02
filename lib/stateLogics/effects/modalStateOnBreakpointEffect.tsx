import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { atomTodoModalOpen, atomTodoModalMini } from '@states/modals';
import { BREAKPOINT } from '@constAssertions/ui';
import { useGetWithRecoilCallback } from '@hooks/misc';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';

export const ModalStateOnBreakpointEffect = () => {
  const get = useGetWithRecoilCallback();
  const setTodoModal = useRecoilCallback(({ set, reset }) => () => {
    set(atomTodoModalOpen(undefined), true);
    reset(atomTodoModalMini(undefined));
  });

  useEffect(() => {
    !get(atomEffectMediaQuery(BREAKPOINT['sm'])) && setTodoModal();
  }, [get, setTodoModal]);

  return null;
};
