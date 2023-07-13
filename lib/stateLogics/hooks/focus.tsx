import { atomTodoModalMini } from '@states/modals';
import { useRecoilCallback, RecoilValue } from 'recoil';
import { FOCUS } from '@constAssertions/misc';
import { selectorSessionTodoItem } from '@states/atomEffects/todos';
import { atomOnFocus, atomCurrentFocus } from '@states/focus';
import { useTodoModalStateOpen } from './modals';
import { TypesTodo, TypesTodos } from '@components/todos/todos.types';

/*
 * Hooks
 **/
export const useFocusState = (_id: TypesTodos['_id']) => {
  const openModal = useTodoModalStateOpen(_id);
  const focusState = useRecoilCallback(({ reset, snapshot }) => (state: FOCUS) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    switch (state) {
      case FOCUS['openTodoModalOnFocus']:
        !get(selectorSessionTodoItem(_id))?.completed && openModal();
        break;
      case FOCUS['returnOnNoFocus']:
        if (!get(atomOnFocus)) return;
        break;
      case FOCUS['resetFocus']:
        !get(atomTodoModalMini(_id)) && reset(atomOnFocus);
        reset(atomCurrentFocus);
        break;
      case FOCUS['resetCurrentFocus']:
        reset(atomCurrentFocus);
        break;
    }
  });
  return focusState;
};

export const useFocusOnClick = (index: TypesTodo['index']) => {
  return useRecoilCallback(({ set }) => () => {
    set(atomCurrentFocus, index);
    set(atomOnFocus, true);
  });
};
