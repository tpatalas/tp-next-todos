import { CATCH_MODAL, FOCUS } from '@lib/data/stateObjects';
import { Types } from '@lib/types';
import { atomCurrentFocus, atomOnBlur } from '@states/focus';
import { useFocusState } from '@states/focus/hooks';
import { useKeyWithNavigate } from '@states/keybinds/hooks';
import { atomTodoModalOpen } from '@states/modals';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import { atomCatch } from '@states/utils';
import { useEffect } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';

type Props = Pick<Types, 'index' | 'divFocus' | 'todo'>;

export const KeysWithNavigationEffect = ({ index, divFocus, todo }: Props) => {
  const setFocus = useFocusState(todo._id);
  const keyDownNavigate = useKeyWithNavigate();
  const currentFocus = useRecoilValue(atomCurrentFocus);
  const isOnBlur = useRecoilValue(atomOnBlur);
  const isTodoModalOpen = useRecoilValue(atomCatch(CATCH_MODAL.todoModal));
  const isConfirmModalOpen = useRecoilValue(atomCatch(CATCH_MODAL.confirmModal));
  const isLabelModalOpen = useRecoilValue(atomCatch(CATCH_MODAL.labelModal));

  const navigateCondition = useRecoilCallback(({ snapshot, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (get(atomTodoModalOpen(undefined))) {
      setFocus(FOCUS['resetFocus']);
      divFocus.current?.blur();
      return;
    }
    if (
      isOnBlur ||
      (get(atomTodoModalOpen(todo._id)) && get(atomQueryTodoItem(todo._id)).completed)
    ) {
      divFocus.current?.blur();
      isOnBlur && reset(atomOnBlur);
      return;
    }
    if (isTodoModalOpen || isConfirmModalOpen || isLabelModalOpen) return; // Cannot use useRecoilCallback with useEffect
    if (currentFocus === index) {
      divFocus.current?.focus();
    }
  });

  useEffect(() => {
    navigateCondition();
    document.addEventListener('keydown', keyDownNavigate);
    return () => {
      document.removeEventListener('keydown', keyDownNavigate);
    };
  }, [keyDownNavigate, navigateCondition]);

  return null;
};
