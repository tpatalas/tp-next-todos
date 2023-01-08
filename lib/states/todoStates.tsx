import { CATCH_MODAL, NOTIFICATION, PATHNAME } from '@data/stateObjects';
import {
  completeDataTodo,
  createDataNewTodo,
  deleteDataTodo,
  updateDataTodo,
} from '@lib/queries/queryTodos';
import { TodoIds, Todos } from '@lib/types';
import { useRouter } from 'next/router';
import {
  atom,
  atomFamily,
  RecoilValue,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from 'recoil';
import { atomQueryTodoIds, atomQueryTodoItem } from './atomQueries';
import { atomNetworkStatusEffect } from './miscStates';
import { atomConfirmModalDelete, useTodoModalStateReset } from './modalStates';
import { useNotificationState } from './notificationStates';
import { selectorFilterPioirtyRankScore, usePriorityRankScore } from './priorityStates';
import {
  atomCatch,
  useConditionCheckTodoTitleEmpty,
  useConditionCompareTodoItemsEqual,
  useGetWithRecoilCallback,
} from './utilsStates';

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

export const atomFilterTodoIds = atom({
  key: 'atomFilterTodoIds',
  default: 'focus',
});

/**
 * selectors
 */
export const selectorFilterTodoIds = selector({
  key: 'SelectorFilterTodoIds',
  get: ({ get }) => {
    const filter = get(atomFilterTodoIds);
    switch (filter) {
      case 'focus':
        return get(selectorFilterTodoIdsByPathname(PATHNAME['app']));
      case 'urgent':
        return get(selectorFilterTodoIdsByPathname(PATHNAME['urgent']));
      case 'important':
        return get(selectorFilterTodoIdsByPathname(PATHNAME['important']));
      case 'showAll':
        return get(selectorFilterTodoIdsByPathname(PATHNAME['showAll']));
      case 'completed':
        return get(selectorFilterTodoIdsByPathname(PATHNAME['completed']));
      default:
        return get(atomQueryTodoIds).filter((todo) => !todo.completed);
    }
  },
  cachePolicy_UNSTABLE: {
    eviction: 'keep-all',
  },
});

export const selectorFilterTodoIdsByPathname = selectorFamily<TodoIds[], PATHNAME>({
  key: 'selectorFilterTodoIdsByPathname',
  get:
    (pathname) =>
    ({ get }) => {
      switch (pathname) {
        case PATHNAME['app']:
          return get(selectorFilterPioirtyRankScore);
        case PATHNAME['urgent']:
          return get(atomQueryTodoIds).filter(
            (todo) => !todo.completed && todo.priorityLevel === 1,
          );
        case PATHNAME['important']:
          return get(atomQueryTodoIds).filter(
            (todo) => !todo.completed && todo.priorityLevel === 2,
          );
        case PATHNAME['showAll']:
          return get(atomQueryTodoIds).filter((todo) => !todo.completed);
        case PATHNAME['completed']:
          return get(atomQueryTodoIds).filter((todo) => todo.completed);
      }
    },
  cachePolicy_UNSTABLE: {
    eviction: 'keep-all',
  },
});
/**
 * Hooks
 * */

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

export const useAsyncTodoItem = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ snapshot }) => () => {
    return snapshot.getLoadable(atomQueryTodoItem(todoId)).getValue();
  });
};

export const useFilterTodoIdsWithPathname = () => {
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
