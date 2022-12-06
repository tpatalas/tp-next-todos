import { FOCUS } from '@data/stateObjects';
import { Todos, Types } from '@lib/types';
import { atom, RecoilValue, useRecoilCallback } from 'recoil';
import { atomQueryTodoItem } from './atomQuries';
import { useModalStateOpen, atomTodoModalMini } from './modalStates';

/**
 * Atoms
 */
export const atomOnBlur = atom({
  key: 'atomOnBlur',
  default: false,
});

export const atomOnFocus = atom({
  key: 'atomOnFocus',
  default: false,
});

export const atomCurrentFocus = atom({
  key: 'atomCurrentFocus',
  default: -1,
});

/*
 * Hooks
 **/
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
