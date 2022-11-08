import { FOCUS } from '@lib/data/stateObjects';
import { atomCurrentFocus, atomOnFocus, atomTodoModalMini } from '@states/atoms';
import { atomQueryTodoItem } from '@states/atoms/atomQuery';
import { Todos, Types } from 'lib/types';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { useModalStateOpen } from './useModals';

export const useFocusState = (_id: Todos['_id']) => {
  const openModal = useModalStateOpen(_id);
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
