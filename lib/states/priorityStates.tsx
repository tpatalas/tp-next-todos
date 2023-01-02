import { PRIORITY_LEVEL } from '@data/stateObjects';
import { updateDataPriorityTodo } from '@lib/queries/queryTodos';
import { Todos } from '@lib/types';
import {
  atomTodoNew,
  atomSelectorTodoItem,
  selectorDynamicTodoItem,
  selectorTaskCompleteCapacity,
} from '@states/todoStates';
import { differenceInDays } from 'date-fns';
import { atomFamily, RecoilValue, selectorFamily, useRecoilCallback } from 'recoil';
import { atomQueryTodoIds, atomQueryTodoItem } from './atomQueries';

/**
 * atoms
 */
// priority
export const atomPriority = atomFamily<PRIORITY_LEVEL | null, Todos['_id']>({
  key: 'atomPriority',
  default: null,
});

/*
 * selectors
 * */
// priority rank score

export const selectorDynamicPriority = selectorFamily<Todos['priorityLevel'], Todos['_id']>({
  key: 'selectorPriority',
  get:
    (todoId) =>
    ({ get }) =>
      get(selectorDynamicTodoItem(todoId)).priorityLevel == null
        ? PRIORITY_LEVEL['normal']
        : get(selectorDynamicTodoItem(todoId)).priorityLevel,
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const selectorPrsDueDate = selectorFamily<number, Todos['_id']>({
  key: 'selectorPrsDueDate',
  get:
    (todoId) =>
    ({ get }) => {
      const taskCapacityPerDay = get(selectorTaskCompleteCapacity);
      const todoItem = get(selectorDynamicTodoItem(todoId));
      const priority = get(selectorDynamicPriority(todoId)) as PRIORITY_LEVEL;
      const totalUncompletedTodos = get(atomQueryTodoIds).length;
      const dueDate = todoItem.dueDate != null && todoItem.dueDate;
      const daysToDueDate = differenceInDays(new Date(dueDate as Date), new Date()) + 1;
      const overDueFactor = Math.abs(daysToDueDate) * 200;
      const daysToDueDateOutput = () => {
        if (daysToDueDate > 0) {
          return daysToDueDate;
        }
        if (daysToDueDate < 0) {
          return overDueFactor;
        }
        return totalUncompletedTodos / taskCapacityPerDay + totalUncompletedTodos;
      };

      return (priority - 1 / ((daysToDueDateOutput() as number) + 1)) / taskCapacityPerDay;
    },
  cachePolicy_UNSTABLE: {
    eviction: 'lru',
    maxSize: 100,
  },
});

export const selectorPrsCreateDate = selectorFamily<number, Todos['_id']>({
  key: 'selectorPrsCreateDate',
  get:
    (todoId) =>
    ({ get }) => {
      const todoItem = get(selectorDynamicTodoItem(todoId));
      const createdDate = todoItem.createdDate != null && todoItem.createdDate;
      const daysFromCreated = differenceInDays(new Date(), new Date(createdDate as Date)) + 1;

      return daysFromCreated < 5 ? 1 / 100 : 1 / daysFromCreated;
    },
  cachePolicy_UNSTABLE: {
    eviction: 'lru',
    maxSize: 100,
  },
});

export const selectorPrsTaskCapacity = selectorFamily<number, Todos['_id']>({
  key: 'selectorPrsTaskCapacity',
  get:
    (todoId) =>
    ({ get }) => {
      const priority = get(selectorDynamicPriority(todoId)) as PRIORITY_LEVEL;
      const taskCapacityPerDay = get(selectorTaskCompleteCapacity);

      return priority / taskCapacityPerDay;
    },
  cachePolicy_UNSTABLE: {
    eviction: 'lru',
    maxSize: 100,
  },
});

export const selectorPriorityRankScore = selectorFamily<number, Todos['_id']>({
  key: 'selectorPriorityRankScore',
  get:
    (todoId) =>
    ({ get }) => {
      const prsDueDate = get(selectorPrsDueDate(todoId));
      const prsCreateDate = get(selectorPrsCreateDate(todoId));
      const prsTaskCapacity = get(selectorPrsTaskCapacity(todoId));
      const priorityRankScore = (prsDueDate + prsCreateDate + prsTaskCapacity) * 100;

      return Math.round(priorityRankScore * 100) / 100;
    },
  cachePolicy_UNSTABLE: {
    eviction: 'lru',
    maxSize: 100,
  },
});

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
  const updatePriority = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      (state: PRIORITY_LEVEL) => {
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
      },
  );

  return (state: PRIORITY_LEVEL) => {
    updatePriority(state);
    updatePriorityTodoItem();
  };
};

export const usePriorityUpdateData = (todoId: Todos['_id']) => {
  const updatePriorityItem = usePriorityUpdate(todoId);
  const updatePriorityRankScore = usePriorityRankScore(todoId);
  const updatePriorityDataItem = useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    set(atomQueryTodoItem(todoId), {
      ...get(atomQueryTodoItem(todoId)),
      priorityLevel: get(atomSelectorTodoItem(todoId)).priorityLevel,
      priorityRankScore: get(atomSelectorTodoItem(todoId)).priorityRankScore,
    });

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
