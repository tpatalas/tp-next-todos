import { updateDataPriorityTodo } from '@lib/queries/queryTodos';
import { useSession } from 'next-auth/react';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { PRIORITY_LEVEL } from '@constAssertions/misc';
import {
  atomSelectorTodoItem,
  selectorSessionTodoItem,
  selectorSessionTodoIds,
} from '@states/atomEffects/todos';
import { atomPriority, selectorPriorityRankScore } from '@states/priorities';
import { TypesTodos } from '@components/todos/todos.types';
import { atomTodoNew } from '@components/todos/todos.states';

/**
 * Hooks
 * */

// Priority
export const usePriorityUpdateTodoItem = (todoId: TypesTodos['_id']) => {
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

export const usePriorityUpdate = (todoId: TypesTodos['_id']) => {
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

export const usePriorityUpdateData = (todoId: TypesTodos['_id']) => {
  const { status } = useSession();
  const updatePriorityItem = usePriorityUpdate(todoId);
  const updatePriorityRankScore = usePriorityRankScore(todoId);
  const updatePriorityDataItem = useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(selectorSessionTodoItem(todoId), {
      ...get(selectorSessionTodoItem(todoId)),
      priorityLevel: get(atomSelectorTodoItem(todoId)).priorityLevel,
      priorityRankScore: get(atomSelectorTodoItem(todoId)).priorityRankScore,
    });

    set(
      selectorSessionTodoIds,
      get(selectorSessionTodoIds).map((todo) => {
        return {
          ...todo,
          priorityLevel:
            todo._id === todoId ? get(selectorSessionTodoItem(todoId)).priorityLevel : todo.priorityLevel,
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

export const usePriorityRankScore = (todoId: TypesTodos['_id']) => {
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
