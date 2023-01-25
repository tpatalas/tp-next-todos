import { CATCH } from '@data/dataTypesObjects';
import { atomCatch } from '@states/utils';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export const WindowBeforeunloadEffect = () => {
  const catchConfirmModal = useRecoilValue(atomCatch(CATCH.confirmModal));
  const catchMinimizedModal = useRecoilValue(atomCatch(CATCH.minimizedModal));
  const catchTodoModal = useRecoilValue(atomCatch(CATCH.todoModal));

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
