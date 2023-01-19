/**
 * Hooks
 * */

import { NOTIFICATION, CATCH_MODAL, PATHNAME } from '@data/stateObjects';
import {
  createDataNewTodo,
  updateDataTodo,
  deleteDataTodo,
  completeDataTodo,
} from '@lib/queries/queryTodos';
import { Todos } from '@lib/types';
import { atomNetworkStatusEffect } from '@states/misc/states';
import { useTodoModalStateReset } from '@states/modals/hooks';
import { atomConfirmModalDelete } from '@states/modals/states';
import { useNotificationState } from '@states/notifications/hooks';
import { usePriorityRankScore } from '@states/priorities/hooks';
import {
  useConditionCheckTodoTitleEmpty,
  useGetWithRecoilCallback,
  useConditionCompareTodoItemsEqual,
} from '@states/utils/hooks';
import { atomCatch } from '@states/utils/states';
import { useRouter } from 'next/router';
import { useRecoilCallback, RecoilValue, useRecoilValue } from 'recoil';
import { atomQueryTodoItem, atomQueryTodoIds } from './atomQueries';
import { atomTodoNew, atomSelectorTodoItem, selectorFilterTodoIdsByPathname } from './states';

export const useTodoStateAdd = () => {
  const setNotification = useNotificationState();
  const resetModal = useTodoModalStateReset(undefined);
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
  const resetModal = useTodoModalStateReset(todoId);
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
export const useTodoIdsWithPathname = () => {
  const router = useRouter();
  const app = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['app']));
  const urgent = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['urgent']));
  const important = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['important']));
  const completed = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['completed']));

  switch (router.asPath) {
    case PATHNAME['app']:
      return app;
    case PATHNAME['urgent']:
      return urgent;
    case PATHNAME['important']:
      return important;
    case PATHNAME['completed']:
      return completed;
    default:
      return app;
  }
};

export const useFilterTodoIdsWithPathname = () => {
  const router = useRouter();
  const app = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['app']));
  const urgent = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['urgent']));
  const important = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['important']));
  const showAll = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['showAll']));
  const completed = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['completed']));

  switch (router.asPath) {
    case PATHNAME['app']:
      return app;
    case PATHNAME['urgent']:
      return urgent;
    case PATHNAME['important']:
      return important;
    case PATHNAME['showAll']:
      return showAll;
    case PATHNAME['completed']:
      return completed;
    default:
      return app;
  }
};
