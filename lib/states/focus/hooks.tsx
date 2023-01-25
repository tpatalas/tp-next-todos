import { FOCUS } from '@data/dataTypesObjects';
import { Todos, Types } from '@lib/types';
import { atomTodoModalMini } from '@states/modals';
import { useTodoModalStateOpen } from '@states/modals/hooks';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import { useRecoilCallback, RecoilValue } from 'recoil';
import { atomOnFocus, atomCurrentFocus } from '.';

/*
 * Hooks
 **/
export const useFocusState = (_id: Todos['_id']) => {
  const openModal = useTodoModalStateOpen(_id);
  const focusState = useRecoilCallback(({ reset, snapshot }) => (state: FOCUS) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    switch (state) {
      case FOCUS['openTodoModalOnFocus']:
        !get(atomQueryTodoItem(_id))?.completed && openModal();
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

export const useFocusOnClick = (index: Types['index']) => {
  return useRecoilCallback(({ set }) => () => {
    set(atomCurrentFocus, index);
    set(atomOnFocus, true);
  });
};
