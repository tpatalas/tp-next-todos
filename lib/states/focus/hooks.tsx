import { FOCUS } from '@data/stateObjects';
import { Todos, Types } from '@lib/types';
import { useTodoModalStateOpen } from '@states/modals/hooks';
import { atomTodoModalMini } from '@states/modals/states';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import { useRecoilCallback, RecoilValue } from 'recoil';
import { atomOnFocus, atomCurrentFocus } from './states';

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
