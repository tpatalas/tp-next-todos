import { CATCH_MODAL, NOTIFICATION } from '@lib/data/stateObjects';
import {
  completeDataTodo,
  createDataNewTodo,
  deleteDataTodo,
  updateDataTodo,
} from '@lib/queries/queryTodos';
import { Todos } from '@lib/types';
import { atomCatch, atomConfirmModalDelete, atomNetworkStatusEffect } from '@states/atoms';
import {
  atomQueryTodoIds,
  atomQueryTodoIdsCompleted,
  atomQueryTodoItem,
} from '@states/atoms/atomQuery';
import {
  atomSelectorTodoIdsCompleted,
  atomSelectorTodoItem,
  atomTodoNew,
} from '@states/atoms/atomTodos';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { useConditionCheckTodoTitleEmpty, useConditionCompareTodoItemsEqual } from './useCondition';
import { useModalStateReset } from './useModals';
import { useNotificationState } from './useNotification';
import { usePriorityRankScore } from './usePriorityRankScore';
import { useGetWithRecoilCallback } from './useUtils';

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
