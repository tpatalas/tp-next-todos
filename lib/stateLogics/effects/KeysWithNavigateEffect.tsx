import { TypesTodo } from '@components/todos/todos.types';
import { CATCH, FOCUS } from '@constAssertions/misc';
import { useFocusState } from '@hooks/focus';
import { useKeyWithNavigate } from '@hooks/keybindings';
import { Types } from '@lib/types';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { atomCurrentFocus, atomOnBlur } from '@states/focus';
import { atomCatch } from '@states/misc';
import { atomTodoModalOpen } from '@states/modals';
import { useEffect } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';

type Props = Pick<Types, 'divFocus'> & Pick<TypesTodo, 'index' | 'todo'>;

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
    if (isOnBlur || (get(atomTodoModalOpen(todo._id)) && get(selectorSessionTodoItem(todo._id)).completed)) {
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
