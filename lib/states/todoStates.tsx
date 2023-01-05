import { NOTIFICATION, CATCH_MODAL } from '@data/stateObjects';
import { createDataNewTodo, updateDataTodo, deleteDataTodo, completeDataTodo } from '@lib/queries/queryTodos';
import { Todos, TodoIds } from '@lib/types';
import { atom, atomFamily, selectorFamily, selector, useRecoilCallback, RecoilValue } from 'recoil';
import { atomQueryTodoItem, atomQueryTodoIdsCompleted, atomQueryTodoIds } from './atomQueries';
import { atomNetworkStatusEffect } from './miscStates';
import { useModalStateReset, atomConfirmModalDelete } from './modalStates';
import { useNotificationState } from './notificationStates';
import { usePriorityRankScore } from './priorityStates';
import { atomCatch, useConditionCheckTodoTitleEmpty, useConditionCompareTodoItemsEqual, useGetWithRecoilCallback } from './utilsStates';

/**
 * atoms
 * */
export const atomTodoNew = atom<Todos>({
  key: 'atomTodoNew',
  default: {
    _id: undefined,
    title: '',
    note: '',
    completed: false,
    createdDate: new Date(),
  } as Todos,
});

export const atomSelectorTodoItem = atomFamily<Todos, Todos['_id']>({
  key: 'atomSelectorTodoItem',
  default: selectorFamily({
    key: 'selectorAtomTodoItem',
    get:
      (todoId) =>
      ({ get }) =>
        get(atomQueryTodoItem(todoId))!,
  }),
}); // Overwrite atomQueryTodoItem to prevent unnecessary re-rendering.

export const selectorDynamicTodoItem = selectorFamily<Todos, Todos['_id']>({
  key: 'selectorDynamicTodoItem',
  get:
    (todoId) =>
    ({ get }) =>
      typeof todoId === 'undefined' ? get(atomTodoNew) : get(atomSelectorTodoItem(todoId)),
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const selectorTaskCompleteCapacity = selector({
  key: 'selectorTaskCompleteCapacity',
  get: ({ get }) => {
    const taskCapacity = get(atomSelectorTodoIdsCompleted).length / 3;
    return taskCapacity < 5 ? 5 : taskCapacity;
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const atomSelectorTodoIdsCompleted = atom<TodoIds[]>({
  key: 'atomSelectorTodoIdsCompleted',
  default: selector({
    key: 'selectorTodoIdsCompleted',
    get: ({ get }) => get(atomQueryTodoIdsCompleted),
  }),
});

/**
 * Hooks
 * */
export const useTodoStateAdd = () => {
  const setNotification = useNotificationState();
  const resetModal = useModalStateReset(undefined);
  const checkTodoTitleEmpty = useConditionCheckTodoTitleEmpty();
  const updatePriorityRankScore = usePriorityRankScore(undefined);
  const get = useGetWithRecoilCallback();
  const updateQueryTodoItem = useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryTodoItem(get(atomTodoNew)._id), get(atomTodoNew));
    set(atomQueryTodoIds, [...get(atomQueryTodoIds), { _id: get(atomTodoNew)._id }]);
    reset(atomTodoNew);
    createDataNewTodo(get(atomTodoNew));
    setNotification(NOTIFICATION['createdTodo']);
  });

  return () => {
    if (!get(atomNetworkStatusEffect)) {
      setNotification(NOTIFICATION['offline']);
      return;
    }
    if (checkTodoTitleEmpty) return;
    updatePriorityRankScore();
    updateQueryTodoItem();
    resetModal();
  };
};

export const useTodoStateUpdate = (todoId: Todos['_id']) => {
  const setNotification = useNotificationState();
  const resetModal = useModalStateReset(todoId);
  const compareTodoItemsEqual = useConditionCompareTodoItemsEqual(todoId);
  const get = useGetWithRecoilCallback();
  const updatePriorityRankScore = usePriorityRankScore(todoId);
  const updateQueryTodoItem = useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryTodoItem(todoId), get(atomSelectorTodoItem(todoId)));
    updateDataTodo(todoId, get(atomSelectorTodoItem(todoId)));
    set(atomQueryTodoIds, [...get(atomQueryTodoIds)]); // refetch: This will trigger re-Render the list.
    setNotification(NOTIFICATION['updatedTodo']);
    reset(atomSelectorTodoItem(todoId));
  });

  return () => {
    if (!get(atomNetworkStatusEffect)) {
      setNotification(NOTIFICATION['offline']);
      return;
    }
    if (compareTodoItemsEqual) return;
    updatePriorityRankScore();
    updateQueryTodoItem();
    resetModal();
  };
};

export const useTodoStateRemove = (todoId: Todos['_id']) => {
  const setNotification = useNotificationState();
  const get = useGetWithRecoilCallback();
  const removeTodoItem = useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (!get(atomConfirmModalDelete(todoId))) {
      set(atomConfirmModalDelete(todoId), true);
      !get(atomCatch(CATCH_MODAL.confirmModal)) && set(atomCatch(CATCH_MODAL.confirmModal), true);
      return;
    }
    set(
      atomQueryTodoIds,
      get(atomQueryTodoIds).filter((todo) => todo._id !== todoId),
    );
    deleteDataTodo(todoId);
    setNotification(NOTIFICATION['deleteTodo']);
    reset(atomQueryTodoItem(todoId));
    get(atomCatch(CATCH_MODAL.todoModal)) && reset(atomCatch(CATCH_MODAL.todoModal));
  });

  return () => {
    if (!get(atomNetworkStatusEffect)) {
      setNotification(NOTIFICATION['offline']);
      return;
    }
    removeTodoItem();
  };
};

export const useTodoStateCompletedDate = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryTodoItem(todoId), {
      ...get(atomQueryTodoItem(todoId)),
      completedDate: get(atomQueryTodoItem(todoId)).completed ? new Date() : null,
    });
  });
};

export const useTodoStateComplete = (todoId: Todos['_id']) => {
  const updateCompletedDate = useTodoStateCompletedDate(todoId);
  const setNotification = useNotificationState();
  const get = useGetWithRecoilCallback();
  const updateQueryTodoItem = useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryTodoItem(todoId), {
      ...get(atomQueryTodoItem(todoId)),
      completed: !get(atomQueryTodoItem(todoId)).completed,
    });

    // Optimistically Update todoIds
    !get(atomSelectorTodoItem(todoId)).completed
      ? set(atomSelectorTodoIdsCompleted, [
          ...get(atomSelectorTodoIdsCompleted),
          {
            ...get(atomSelectorTodoItem(todoId)),
            _id: get(atomSelectorTodoItem(todoId))._id,
          },
        ])
      : set(
          atomSelectorTodoIdsCompleted,
          get(atomSelectorTodoIdsCompleted).filter((todo) => todo._id !== todoId),
        );
    // Background Refetch atomQueryTodoIdsCompleted
    set(atomQueryTodoIdsCompleted, get(atomSelectorTodoIdsCompleted));

    // refetch TodoIds
    // set(atomQueryTodoIds, [...get(atomQueryTodoIds)]);
  });
  return () => {
    if (!get(atomNetworkStatusEffect)) {
      setNotification(NOTIFICATION['offline']);
      return;
    }
    updateQueryTodoItem();

    updateCompletedDate();
    completeDataTodo(
      todoId,
      get(atomQueryTodoItem(todoId)).completed,
      get(atomQueryTodoItem(todoId)).completedDate,
    );

    get(atomQueryTodoItem(todoId)).completed
      ? setNotification(NOTIFICATION['completeTodo'])
      : setNotification(NOTIFICATION['unCompleteTodo']);
  };
};

export const useAsyncTodoItem = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ snapshot }) => () => {
    return snapshot.getLoadable(atomQueryTodoItem(todoId)).getValue();
  });
};
