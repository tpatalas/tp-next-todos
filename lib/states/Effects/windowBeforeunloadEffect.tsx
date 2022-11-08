import { CATCH_MODAL } from '@data/stateObjects';
import { atomCatch } from '@states/atoms';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export const WindowBeforeunloadEffect = () => {
  const catchConfirmModal = useRecoilValue(atomCatch(CATCH_MODAL.confirmModal));
  const catchMinimizedModal = useRecoilValue(
    atomCatch(CATCH_MODAL.minimizedModal)
  );
  const catchTodoModal = useRecoilValue(atomCatch(CATCH_MODAL.todoModal));

  const beforeunload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    if (event) {
      event.returnValue = '';
    }
    return '';
  };

  useEffect(() => {
    if (catchConfirmModal || catchMinimizedModal || catchTodoModal) {
      window.addEventListener('beforeunload', beforeunload);
      return () => {
        window.removeEventListener('beforeunload', beforeunload);
      };
    }
  }, [catchConfirmModal, catchMinimizedModal, catchTodoModal]);

  return null;
};
