import { CATCH, FOCUS } from '@data/dataTypesConst';
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
  const isTodoModalOpen = useRecoilValue(atomCatch(CATCH.todoModal));
  const isConfirmModalOpen = useRecoilValue(atomCatch(CATCH.confirmModal));
  const isLabelModalOpen = useRecoilValue(atomCatch(CATCH.labelModal));
  const isComboBoxOpen = useRecoilValue(atomCatch(CATCH.comboBox));

  const navigateCondition = useRecoilCallback(({ snapshot, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (get(atomTodoModalOpen(undefined))) {
      setFocus(FOCUS['resetFocus']);
      divFocus.current?.blur();
      return;
    }
    if (isTodoModalOpen || isConfirmModalOpen || isLabelModalOpen || isComboBoxOpen) return;
    if (isOnBlur || (get(atomTodoModalOpen(todo._id)) && get(atomQueryTodoItem(todo._id)).completed)) {
      isOnBlur && reset(atomOnBlur);
      setFocus(FOCUS['resetFocus']);
      divFocus.current?.blur();
      return;
    }
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
