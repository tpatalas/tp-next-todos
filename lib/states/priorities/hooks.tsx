import { PRIORITY_LEVEL } from '@data/dataTypesConst';
import { updateDataPriorityTodo } from '@lib/queries/queryTodos';
import { Todos } from '@lib/types';
import { atomTodoNew } from '@states/todos';
import { atomQueryTodoIds, atomQueryTodoItem, atomSelectorTodoItem } from '@states/todos/atomQueries';
import { useSession } from 'next-auth/react';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { atomPriority, selectorPriorityRankScore } from '.';

/**
 * Hooks
 * */

// Priority
export const usePriorityUpdateTodoItem = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    typeof todoId === 'undefined'
      ? set(atomTodoNew, {
          ...get(atomTodoNew),
          priorityLevel: get(atomPriority(undefined)),
        })
      : set(atomSelectorTodoItem(todoId), {
          ...get(atomSelectorTodoItem(todoId)),
          priorityLevel: get(atomPriority(todoId)),
        });
  });
};

export const usePriorityUpdate = (todoId: Todos['_id']) => {
  const updatePriorityTodoItem = usePriorityUpdateTodoItem(todoId);
  const updatePriority = useRecoilCallback(({ set, reset, snapshot }) => (state: PRIORITY_LEVEL) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const levelImportant = state === PRIORITY_LEVEL['important'];
    const levelUrgent = state === PRIORITY_LEVEL['urgent'];
    const priorityImportant =
      typeof todoId === 'undefined'
        ? get(atomPriority(todoId)) === PRIORITY_LEVEL['important']
        : get(atomSelectorTodoItem(todoId)).priorityLevel === PRIORITY_LEVEL['important'];
    const priorityUrgent =
      typeof todoId === 'undefined'
        ? get(atomPriority(todoId)) === PRIORITY_LEVEL['urgent']
        : get(atomSelectorTodoItem(todoId)).priorityLevel === PRIORITY_LEVEL['urgent'];

    if (levelImportant && !priorityImportant) {
      set(atomPriority(todoId), PRIORITY_LEVEL['important']);
      return;
    }
    if (levelUrgent && !priorityUrgent) {
      set(atomPriority(todoId), PRIORITY_LEVEL['urgent']);
      return;
    }
    reset(atomPriority(todoId));
  });

  return (state: PRIORITY_LEVEL) => {
    updatePriority(state);
    updatePriorityTodoItem();
  };
};

export const usePriorityUpdateData = (todoId: Todos['_id']) => {
  const { status } = useSession();
  const updatePriorityItem = usePriorityUpdate(todoId);
  const updatePriorityRankScore = usePriorityRankScore(todoId);
  const updatePriorityDataItem = useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryTodoItem(todoId), {
      ...get(atomQueryTodoItem(todoId)),
      priorityLevel: get(atomSelectorTodoItem(todoId)).priorityLevel,
      priorityRankScore: get(atomSelectorTodoItem(todoId)).priorityRankScore,
    });

    set(
      atomQueryTodoIds,
      get(atomQueryTodoIds).map((todo) => {
        return {
          ...todo,
          priorityLevel: todo._id === todoId ? get(atomQueryTodoItem(todoId)).priorityLevel : todo.priorityLevel,
        };
      }),
    );

    status === 'authenticated' &&
      updateDataPriorityTodo(
        todoId,
        get(atomSelectorTodoItem(todoId)).priorityLevel,
        get(atomSelectorTodoItem(todoId)).priorityRankScore,
      );
    reset(atomSelectorTodoItem(todoId));
  });

  return (state: PRIORITY_LEVEL) => {
    updatePriorityItem(state);
    updatePriorityRankScore();
    updatePriorityDataItem();
  };
};

// PRS = Priority Rank Score

export const usePriorityRankScore = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    typeof todoId === 'undefined'
      ? set(atomTodoNew, {
          ...get(atomTodoNew),
          priorityRankScore: get(selectorPriorityRankScore(undefined)),
        })
      : set(atomSelectorTodoItem(todoId), {
          ...get(atomSelectorTodoItem(todoId)),
          priorityRankScore: get(selectorPriorityRankScore(todoId)),
        });
  });
};
