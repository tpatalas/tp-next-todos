import { CATCH_MODAL } from '@data/stateObjects';
import { Todos } from '@lib/types';
import { atomFamily, RecoilValue, useRecoilCallback } from 'recoil';
import { useCalResetDateItemOnly } from './calendarStates';
import { atomSelectorTodoItem, atomTodoNew, useTodoStateRemove } from './todoStates';
import { atomCatch, useConditionCheckTodoTitleEmpty, useConditionCompareTodoItemsEqual } from './utilsStates';

/**
 * atom
 **/

// Todo Modal
export const atomTodoModalOpen = atomFamily({
  key: 'atomTodoModalOpen',
  default: false,
});

export const atomTodoModalMini = atomFamily({
  key: 'atomTodoModalMini',
  default: false,
});

export const atomTodoModalMax = atomFamily({
  key: 'atomTodoModalMax',
  default: false,
});

// Confirm Modal
export const atomConfirmModalDiscard = atomFamily({
  key: 'atomConfirmModalDiscard',
  default: false,
});

export const atomConfirmModalDelete = atomFamily({
  key: 'atomConfirmModalDelete',
  default: false,
});

/**
 * Hooks
 * */

export const useModalConfirmStateCancel = (_id: Todos['_id']) => {
  return useRecoilCallback(({ reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    get(atomConfirmModalDiscard(_id)) && reset(atomConfirmModalDiscard(_id));
    get(atomConfirmModalDelete(_id)) && reset(atomConfirmModalDelete(_id));
    get(atomCatch(CATCH_MODAL.confirmModal)) && reset(atomCatch(CATCH_MODAL.confirmModal));
  });
};

export const useModalConfirmStateDiscard = (_id: Todos['_id']) => {
  return useRecoilCallback(({ reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    get(atomConfirmModalDiscard(_id)) && reset(atomConfirmModalDiscard(_id));

    if (get(atomTodoModalMini(_id)) || get(atomTodoModalOpen(_id))) {
      typeof _id !== 'undefined' ? reset(atomSelectorTodoItem(_id)) : reset(atomTodoNew);
      get(atomTodoModalOpen(_id)) && reset(atomTodoModalOpen(_id));
      get(atomTodoModalMini(_id)) && reset(atomTodoModalMini(_id));
      get(atomCatch(CATCH_MODAL.confirmModal)) && reset(atomCatch(CATCH_MODAL.confirmModal));
      return;
    }
  });
};

export const useModalConfirmStateDelete = (_id: Todos['_id']) => {
  const removeTodo = useTodoStateRemove(_id);

  return useRecoilCallback(({ reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (typeof _id === 'undefined') return;
    get(atomConfirmModalDelete(_id)) && reset(atomConfirmModalDelete(_id));
    get(atomConfirmModalDelete(_id)) && removeTodo();
    get(atomCatch(CATCH_MODAL.confirmModal)) && reset(atomCatch(CATCH_MODAL.confirmModal));
  });
};

export const useModalConfirmStateReset = (_id: Todos['_id']) => {
  return useRecoilCallback(({ reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    get(atomConfirmModalDelete(_id)) && reset(atomConfirmModalDelete(_id));
    get(atomConfirmModalDiscard(_id)) && reset(atomConfirmModalDiscard(_id));
    if (!get(atomConfirmModalDelete(_id)) && !get(atomConfirmModalDiscard(_id)))
      reset(atomCatch(CATCH_MODAL.confirmModal));
  });
};

export const useModalCloseState = (_id: Todos['_id']) => {
  const compareTodoItemsEqual = useConditionCompareTodoItemsEqual(_id);
  const checkTodoTitleEmpty = useConditionCheckTodoTitleEmpty();
  const modalCloseState = useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    switch (true) {
      case get(atomConfirmModalDelete(_id)) || get(atomConfirmModalDiscard(_id)):
        get(atomConfirmModalDiscard(_id)) && reset(atomConfirmModalDiscard(_id));
        get(atomConfirmModalDelete(_id)) && reset(atomConfirmModalDelete(_id));
        get(atomCatch(CATCH_MODAL.confirmModal)) && reset(atomCatch(CATCH_MODAL.confirmModal));
        break;
      case !checkTodoTitleEmpty:
        set(atomConfirmModalDiscard(undefined), true);
        !get(atomCatch(CATCH_MODAL.confirmModal)) && set(atomCatch(CATCH_MODAL.confirmModal), true);
        break;
      case !get(atomTodoModalOpen(undefined)) &&
        !get(atomTodoModalMini(undefined)) &&
        !compareTodoItemsEqual:
        set(atomConfirmModalDiscard(_id), true);
        !get(atomCatch(CATCH_MODAL.confirmModal)) && set(atomCatch(CATCH_MODAL.confirmModal), true);
        break;
      case get(atomTodoModalOpen(_id)):
        typeof _id === 'undefined' ? reset(atomTodoNew) : reset(atomSelectorTodoItem(_id));
        reset(atomTodoModalOpen(_id));
        break;
      default:
        get(atomTodoModalMini(undefined)) && reset(atomTodoModalMini(undefined));
        break;
    }
  });
  return modalCloseState;
};

export const useModalStateExpand = (_id: Todos['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomTodoModalMax(_id), get(atomTodoModalMax(_id)) ? false : true);
  });
};

export const useModalStateMaximize = (_id: Todos['_id']) => {
  return useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomTodoModalOpen(_id), true);
    set(atomTodoModalMax(_id), true);
    set(atomTodoModalMini(_id), false);
    !get(atomCatch(CATCH_MODAL.todoModal)) && set(atomCatch(CATCH_MODAL.todoModal), true);
    get(atomCatch(CATCH_MODAL.minimizedModal)) && reset(atomCatch(CATCH_MODAL.minimizedModal));
  });
};

export const useModalStateMinimize = (_id: Todos['_id']) => {
  return useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    reset(atomTodoModalOpen(_id));
    set(atomTodoModalMini(_id), !get(atomTodoModalMini(_id)) && true);
    set(atomCatch(CATCH_MODAL.minimizedModal), true);
    reset(atomCatch(CATCH_MODAL.todoModal));
  });
};

export const useModalStateExitMinimize = (_id: Todos['_id']) => {
  return useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomTodoModalOpen(_id), !get(atomTodoModalOpen(_id)) && true);
    get(atomTodoModalMini(_id)) && reset(atomTodoModalMini(_id));
    get(atomTodoModalMax(_id)) && reset(atomTodoModalMax(_id));
    !get(atomCatch(CATCH_MODAL.todoModal)) && set(atomCatch(CATCH_MODAL.todoModal), true);
    get(atomCatch(CATCH_MODAL.minimizedModal)) && reset(atomCatch(CATCH_MODAL.minimizedModal));
  });
};

export const useModalStateOpen = (_id: Todos['_id']) => {
  const resetDateItemOnly = useCalResetDateItemOnly(_id);
  return useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    reset(atomTodoModalMax(_id));
    set(atomTodoModalOpen(_id), true);
    !get(atomCatch(CATCH_MODAL.todoModal)) && set(atomCatch(CATCH_MODAL.todoModal), true);
    resetDateItemOnly();
  });
};

export const useModalStateClose = (_id: Todos['_id']) => {
  const setModalClose = useModalCloseState(_id);
  return useRecoilCallback(({ reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    setModalClose();
    get(atomCatch(CATCH_MODAL.todoModal)) && reset(atomCatch(CATCH_MODAL.todoModal));
  });
};

export const useModalStateReset = (_id: Todos['_id']) => {
  return useRecoilCallback(({ reset }) => () => {
    reset(atomTodoModalOpen(_id));
    reset(atomCatch(CATCH_MODAL.todoModal));
  });
};
