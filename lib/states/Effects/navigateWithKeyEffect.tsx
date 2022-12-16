import { CATCH_MODAL, FOCUS } from '@lib/data/stateObjects';
import { Types } from '@lib/types';
import { atomQueryTodoItem } from '@states/atomQuries';
import { atomCurrentFocus, atomOnBlur, useFocusState } from '@states/focusStates';
import { useKeyWithNavigate } from '@states/keybindStates';
import { atomTodoModalOpen } from '@states/modalStates';
import { atomCatch } from '@states/utilsStates';
import { useEffect } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';

type Props = Pick<Types, 'index' | 'divFocus' | 'todo'>;

export const NavigateWithKeyEffect = ({ index, divFocus, todo }: Props) => {
  const setFocus = useFocusState(todo._id);
  const keyDownNavigate = useKeyWithNavigate();
  const currentFocus = useRecoilValue(atomCurrentFocus);
  const isOnBlur = useRecoilValue(atomOnBlur);
  const isTodoModalOpen = useRecoilValue(atomCatch(CATCH_MODAL.todoModal));
  const isConfirmModalOpen = useRecoilValue(atomCatch(CATCH_MODAL.confirmModal));

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
    if (isTodoModalOpen || isConfirmModalOpen) return; // Cannot use useRecoilCallback with useEffect
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
