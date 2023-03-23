import { Labels, Todos } from '@lib/types';
import { useCalResetDateItemOnly } from '@states/calendars/hooks';
import { atomLabelNew, atomSelectorLabelItem } from '@states/labels';
import { atomSelectorLabels } from '@states/labels/atomQueries';
import { useLabelRemoveItem } from '@states/labels/hooks';
import { atomTodoNew } from '@states/todos';
import { atomSelectorTodoItem } from '@states/todos/atomQueries';
import { useTodoRemoveItem } from '@states/todos/hooks';
import { atomCatch } from '@states/utils';
import { useConditionCheckTodoTitleEmpty, useConditionCompareTodoItemsEqual } from '@states/utils/hooks';
import ObjectID from 'bson-objectid';
import { RecoilValue, useRecoilCallback, useResetRecoilState } from 'recoil';
import {
  atomConfirmModalDelete,
  atomConfirmModalDiscard,
  atomLabelModalOpen,
  atomTodoModalMax,
  atomTodoModalMini,
  atomTodoModalOpen,
} from '.';
import { CATCH } from '@constAssertions/misc';

/**
 * Hooks
 * */
// Confirm Modal
export const useModalConfirmStateCancel = (_id: Todos['_id']) => {
  return useRecoilCallback(({ reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    get(atomConfirmModalDiscard(_id)) && reset(atomConfirmModalDiscard(_id));
    get(atomConfirmModalDelete(_id)) && reset(atomConfirmModalDelete(_id));
    get(atomCatch(CATCH.confirmModal)) && reset(atomCatch(CATCH.confirmModal));
  });
};

// Todo Confirm Modal
export const useTodoModalConfirmStateDiscard = (_id: Todos['_id']) => {
  return useRecoilCallback(({ reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    get(atomConfirmModalDiscard(_id)) && reset(atomConfirmModalDiscard(_id));

    if (get(atomTodoModalMini(_id)) || get(atomTodoModalOpen(_id))) {
      typeof _id !== 'undefined' ? reset(atomSelectorTodoItem(_id)) : reset(atomTodoNew);
      get(atomTodoModalOpen(_id)) && reset(atomTodoModalOpen(_id));
      get(atomTodoModalMini(_id)) && reset(atomTodoModalMini(_id));
      get(atomCatch(CATCH.confirmModal)) && reset(atomCatch(CATCH.confirmModal));
      return;
    }
  });
};

export const useTodoModalConfirmStateDelete = (_id: Todos['_id']) => {
  const removeTodo = useTodoRemoveItem(_id);

  return useRecoilCallback(({ reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (typeof _id === 'undefined') return;
    get(atomConfirmModalDelete(_id)) && reset(atomConfirmModalDelete(_id));
    get(atomConfirmModalDelete(_id)) && removeTodo();
    get(atomCatch(CATCH.confirmModal)) && reset(atomCatch(CATCH.confirmModal));
  });
};

// Label Confirm Modal
export const useLabelModalConfirmStateDelete = (_id: Labels['_id']) => {
  const removeLabel = useLabelRemoveItem(_id);

  return useRecoilCallback(({ reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (typeof _id === 'undefined') return;
    get(atomConfirmModalDelete(_id)) && reset(atomConfirmModalDelete(_id));
    get(atomConfirmModalDelete(_id)) && removeLabel();
    get(atomCatch(CATCH.confirmModal)) && reset(atomCatch(CATCH.confirmModal));
  });
};

//Todo Modal
export const useTodoModalCloseState = (_id: Todos['_id']) => {
  const resetLabelsDrafted = useResetRecoilState(atomSelectorLabels);
  const compareTodoItemsEqual = useConditionCompareTodoItemsEqual(_id);
  const checkTodoTitleEmpty = useConditionCheckTodoTitleEmpty();
  const modalCloseState = useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    switch (true) {
      case get(atomConfirmModalDelete(_id)) || get(atomConfirmModalDiscard(_id)):
        get(atomConfirmModalDiscard(_id)) && reset(atomConfirmModalDiscard(_id));
        get(atomConfirmModalDelete(_id)) && reset(atomConfirmModalDelete(_id));
        get(atomCatch(CATCH.confirmModal)) && reset(atomCatch(CATCH.confirmModal));
        break;
      case !checkTodoTitleEmpty:
        set(atomConfirmModalDiscard(undefined), true);
        !get(atomCatch(CATCH.confirmModal)) && set(atomCatch(CATCH.confirmModal), true);
        break;
      case !get(atomTodoModalOpen(undefined)) && !get(atomTodoModalMini(undefined)) && !compareTodoItemsEqual:
        set(atomConfirmModalDiscard(_id), true);
        !get(atomCatch(CATCH.confirmModal)) && set(atomCatch(CATCH.confirmModal), true);
        break;
      case get(atomTodoModalOpen(_id)):
        typeof _id === 'undefined' ? reset(atomTodoNew) : reset(atomSelectorTodoItem(_id));
        reset(atomTodoModalOpen(_id));
        resetLabelsDrafted();
        break;
      default:
        get(atomTodoModalMini(undefined)) && reset(atomTodoModalMini(undefined));
        break;
    }
  });
  return modalCloseState;
};

export const useTodoModalStateExpand = (_id: Todos['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomTodoModalMax(_id), get(atomTodoModalMax(_id)) ? false : true);
  });
};

export const useTodoModalStateMaximize = (_id: Todos['_id']) => {
  return useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomTodoModalOpen(_id), true);
    set(atomTodoModalMax(_id), true);
    set(atomTodoModalMini(_id), false);
    !get(atomCatch(CATCH.todoModal)) && set(atomCatch(CATCH.todoModal), true);
    get(atomCatch(CATCH.minimizedModal)) && reset(atomCatch(CATCH.minimizedModal));
  });
};

export const useTodoModalStateMinimize = (_id: Todos['_id']) => {
  return useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    reset(atomTodoModalOpen(_id));
    set(atomTodoModalMini(_id), !get(atomTodoModalMini(_id)) && true);
    set(atomCatch(CATCH.minimizedModal), true);
    reset(atomCatch(CATCH.todoModal));
  });
};

export const useTodoModalStateExitMinimize = (_id: Todos['_id']) => {
  return useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomTodoModalOpen(_id), !get(atomTodoModalOpen(_id)) && true);
    get(atomTodoModalMini(_id)) && reset(atomTodoModalMini(_id));
    get(atomTodoModalMax(_id)) && reset(atomTodoModalMax(_id));
    !get(atomCatch(CATCH.todoModal)) && set(atomCatch(CATCH.todoModal), true);
    get(atomCatch(CATCH.minimizedModal)) && reset(atomCatch(CATCH.minimizedModal));
  });
};

export const useTodoModalStateOpen = (_id: Todos['_id']) => {
  const resetDateItemOnly = useCalResetDateItemOnly(_id);
  return useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    reset(atomTodoModalMax(_id));
    set(atomTodoModalOpen(_id), true);
    !get(atomCatch(CATCH.todoModal)) && set(atomCatch(CATCH.todoModal), true);
    resetDateItemOnly();
    typeof _id === 'undefined' && set(atomTodoNew, { ...get(atomTodoNew), _id: ObjectID().toHexString() });
  });
};

export const useTodoModalStateClose = (_id: Todos['_id']) => {
  const setModalClose = useTodoModalCloseState(_id);
  return useRecoilCallback(({ reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    !get(atomCatch(CATCH.labelModal)) && setModalClose();
    get(atomCatch(CATCH.todoModal)) && reset(atomCatch(CATCH.todoModal));
    get(atomCatch(CATCH.minimizedModal)) && reset(atomCatch(CATCH.minimizedModal));
  });
};

export const useTodoModalStateReset = (_id: Todos['_id']) => {
  return useRecoilCallback(({ reset }) => () => {
    reset(atomTodoModalOpen(_id));
    reset(atomCatch(CATCH.todoModal));
  });
};

// Label Modal
export const useLabelModalStateOpen = (_id: Labels['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomLabelModalOpen(_id), true);
    !get(atomCatch(CATCH.labelModal)) && set(atomCatch(CATCH.labelModal), true);
  });
};

export const useLabelModalStateClose = (_id: Labels['_id']) => {
  return useRecoilCallback(({ snapshot, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    reset(atomLabelModalOpen(_id));
    reset(atomSelectorLabelItem(_id));
    get(atomLabelModalOpen(undefined)) && reset(atomLabelNew);
    get(atomCatch(CATCH.labelModal)) && reset(atomCatch(CATCH.labelModal));
  });
};
