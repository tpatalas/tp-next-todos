import { completeDataTodo, createDataNewTodo, deleteDataTodo, updateDataTodo } from '@lib/queries/queryTodos';
import { Todos } from '@lib/types';
import { selectorSessionLabels, atomSelectorLabels } from '@states/labels/atomQueries';
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
import { useSession } from 'next-auth/react';
import { RecoilValue, useRecoilCallback, useResetRecoilState } from 'recoil';
import { atomTodoNew } from '.';
import { selectorSessionTodoIds, selectorSessionTodoItem, atomSelectorTodoItem } from './atomQueries';
import { CATCH } from '@constAssertions/misc';
import { NOTIFICATION } from '@constAssertions/ui';

/**
 * Hooks
 * */
export const useTodoAdd = () => {
  const { status } = useSession();
  const setNotification = useNotificationState();
  const resetModal = useTodoModalStateReset(undefined);
  const checkTodoTitleEmpty = useConditionCheckTodoTitleEmpty();
  const updatePriorityRankScore = usePriorityRankScore(undefined);
  const get = useGetWithRecoilCallback();
  const resetNewTodo = useResetRecoilState(atomTodoNew);
  const updateQueryTodoItem = useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(selectorSessionLabels, get(atomSelectorLabels));
    set(selectorSessionTodoItem(get(atomTodoNew)._id), get(atomTodoNew));
    set(selectorSessionTodoIds, [...get(selectorSessionTodoIds), { ...get(atomTodoNew) }]);
    status === 'authenticated' && createDataNewTodo(get(atomTodoNew));
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
  const { status } = useSession();
  const setNotification = useNotificationState();
  const resetModal = useTodoModalStateReset(todoId);
  const compareTodoItemsEqual = useConditionCompareTodoItemsEqual(todoId);
  const get = useGetWithRecoilCallback();
  const updatePriorityRankScore = usePriorityRankScore(todoId);
  const updateQueryTodoItem = useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(selectorSessionLabels, get(atomSelectorLabels));
    set(selectorSessionTodoItem(todoId), get(atomSelectorTodoItem(todoId)));
    set(
      selectorSessionTodoIds,
      get(selectorSessionTodoIds).map((todo) => {
        if (todo._id === todoId) {
          return {
            ...todo,
            ...get(atomSelectorTodoItem(todoId)),
          };
        }
        return todo;
      }),
    );
    status === 'authenticated' && updateDataTodo(todoId, get(atomSelectorTodoItem(todoId)));
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
  const { status } = useSession();
  const setNotification = useNotificationState();
  const get = useGetWithRecoilCallback();
  const removeTodoItem = useRecoilCallback(({ set, reset, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (!get(atomConfirmModalDelete(todoId))) {
      set(atomConfirmModalDelete(todoId), true);
      !get(atomCatch(CATCH.confirmModal)) && set(atomCatch(CATCH.confirmModal), true);
      return;
    }
    set(
      selectorSessionTodoIds,
      get(selectorSessionTodoIds).filter((todo) => todo._id !== todoId),
    );
    status === 'authenticated' && deleteDataTodo(todoId);
    setNotification(NOTIFICATION['deleteTodo']);
    reset(selectorSessionTodoItem(todoId));
    get(atomCatch(CATCH.todoModal)) && reset(atomCatch(CATCH.todoModal));
  });

  return () => {
    if (!get(atomNetworkStatusEffect)) {
      setNotification(NOTIFICATION['offline']);
      return;
    }
    removeTodoItem();
    // setFocus(FOCUS['resetFocus']);
  };
};

export const useTodoCompleteDate = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(selectorSessionTodoItem(todoId), {
      ...get(selectorSessionTodoItem(todoId)),
      completedDate: get(selectorSessionTodoItem(todoId)).completed ? new Date() : null,
    });
  });
};

export const useTodoCompleteItem = (todoId: Todos['_id']) => {
  const { status } = useSession();
  const updateCompletedDate = useTodoCompleteDate(todoId);
  const setNotification = useNotificationState();
  const get = useGetWithRecoilCallback();

  const updateQueryTodoItem = useRecoilCallback(({ set, snapshot }) => () => {
    const release = snapshot.retain();
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(selectorSessionTodoItem(todoId), {
      ...get(selectorSessionTodoItem(todoId)),
      completed: !get(selectorSessionTodoItem(todoId)).completed,
    });

    setTimeout(() => {
      set(
        selectorSessionTodoIds,
        get(selectorSessionTodoIds).map((todo) => {
          return {
            ...todo,
            completed: todo._id === todoId ? !todo.completed : todo.completed,
          };
        }),
      );
      release();
    }, 300);
  });

  return () => {
    if (!get(atomNetworkStatusEffect)) {
      setNotification(NOTIFICATION['offline']);
      return;
    }
    updateQueryTodoItem();
    updateCompletedDate();
    status === 'authenticated' &&
      completeDataTodo(
        todoId,
        get(selectorSessionTodoItem(todoId)).completed,
        get(selectorSessionTodoItem(todoId)).completedDate,
      );

    get(selectorSessionTodoItem(todoId)).completed
      ? setNotification(NOTIFICATION['completeTodo'])
      : setNotification(NOTIFICATION['unCompleteTodo']);
  };
};
