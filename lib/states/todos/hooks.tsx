import { CATCH, FOCUS, NOTIFICATION } from '@data/dataTypesObjects';
import { completeDataTodo, createDataNewTodo, deleteDataTodo, updateDataTodo } from '@lib/queries/queryTodos';
import { Todos } from '@lib/types';
import { useFocusState } from '@states/focus/hooks';
import { atomQueryLabels, atomSelectorLabels } from '@states/labels';
import { atomNetworkStatusEffect } from '@states/misc';
import { atomConfirmModalDelete } from '@states/modals';
import { useTodoModalStateReset } from '@states/modals/hooks';
import { useNotificationState } from '@states/notifications/hooks';
import { usePriorityRankScore } from '@states/priorities/hooks';
import { atomCatch } from '@states/utils';
import {
  useConditionCheckTodoTitleEmpty,
  useConditionCompareTodoItemsEqual,
  useGetWithRecoilCallback,
} from '@states/utils/hooks';
import { RecoilValue, useRecoilCallback, useResetRecoilState } from 'recoil';
import { atomSelectorTodoItem, atomTodoNew } from '.';
import { atomQueryTodoIds, atomQueryTodoItem } from './atomQueries';

/**
 * Hooks
 * */
export const useTodoAdd = () => {
  const setNotification = useNotificationState();
  const resetModal = useTodoModalStateReset(undefined);
  const checkTodoTitleEmpty = useConditionCheckTodoTitleEmpty();
  const updatePriorityRankScore = usePriorityRankScore(undefined);
  const get = useGetWithRecoilCallback();
  const resetNewTodo = useResetRecoilState(atomTodoNew);
  const updateQueryTodoItem = useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryLabels, get(atomSelectorLabels));
    set(atomQueryTodoItem(get(atomTodoNew)._id), get(atomTodoNew));
    set(atomQueryTodoIds, [...get(atomQueryTodoIds), { _id: get(atomTodoNew)._id }]);
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
    resetNewTodo();
    resetModal();
  };
};

export const useTodoUpdateItem = (todoId: Todos['_id']) => {
  const setNotification = useNotificationState();
  const resetModal = useTodoModalStateReset(todoId);
  const compareTodoItemsEqual = useConditionCompareTodoItemsEqual(todoId);
  const get = useGetWithRecoilCallback();
  const updatePriorityRankScore = usePriorityRankScore(todoId);
  const updateQueryTodoItem = useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryLabels, get(atomSelectorLabels));
    set(atomQueryTodoItem(todoId), get(atomSelectorTodoItem(todoId)));
    updateDataTodo(todoId, get(atomSelectorTodoItem(todoId)));
    set(atomQueryTodoIds, [...get(atomQueryTodoIds)]); // refetch: This will trigger re-Render the list.
    setNotification(NOTIFICATION['updatedTodo']);

    reset(atomSelectorTodoItem(todoId));
    reset(atomSelectorLabels);
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

export const useTodoRemoveItem = (todoId: Todos['_id']) => {
  const setNotification = useNotificationState();
  const setFocus = useFocusState(todoId);
  const get = useGetWithRecoilCallback();
  const removeTodoItem = useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (!get(atomConfirmModalDelete(todoId))) {
      set(atomConfirmModalDelete(todoId), true);
      !get(atomCatch(CATCH.confirmModal)) && set(atomCatch(CATCH.confirmModal), true);
      return;
    }
    set(
      atomQueryTodoIds,
      get(atomQueryTodoIds).filter((todo) => todo._id !== todoId),
    );
    deleteDataTodo(todoId);
    setNotification(NOTIFICATION['deleteTodo']);
    reset(atomQueryTodoItem(todoId));
    get(atomCatch(CATCH.todoModal)) && reset(atomCatch(CATCH.todoModal));
  });

  return () => {
    if (!get(atomNetworkStatusEffect)) {
      setNotification(NOTIFICATION['offline']);
      return;
    }
    removeTodoItem();
    setFocus(FOCUS['resetFocus']);
  };
};

export const useTodoCompleteDate = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryTodoItem(todoId), {
      ...get(atomQueryTodoItem(todoId)),
      completedDate: get(atomQueryTodoItem(todoId)).completed ? new Date() : null,
    });
  });
};

export const useTodoCompleteItem = (todoId: Todos['_id']) => {
  const updateCompletedDate = useTodoCompleteDate(todoId);
  const setNotification = useNotificationState();
  const get = useGetWithRecoilCallback();
  const updateQueryTodoItem = useRecoilCallback(({ set, snapshot }) => () => {
    const release = snapshot.retain();
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryTodoItem(todoId), {
      ...get(atomQueryTodoItem(todoId)),
      completed: !get(atomQueryTodoItem(todoId)).completed,
    });

    setTimeout(() => {
      set(
        atomQueryTodoIds,
        get(atomQueryTodoIds).filter((todo) => todo._id !== todoId),
      );
      release();
    }, 200);
  });
  return () => {
    if (!get(atomNetworkStatusEffect)) {
      setNotification(NOTIFICATION['offline']);
      return;
    }
    updateQueryTodoItem();
    updateCompletedDate();
    completeDataTodo(todoId, get(atomQueryTodoItem(todoId)).completed, get(atomQueryTodoItem(todoId)).completedDate);

    get(atomQueryTodoItem(todoId)).completed
      ? setNotification(NOTIFICATION['completeTodo'])
      : setNotification(NOTIFICATION['unCompleteTodo']);
  };
};
