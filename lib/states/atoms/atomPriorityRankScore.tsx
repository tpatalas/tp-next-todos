import { PRIORITY_LEVEL } from '@data/stateObjects';
import { Todos } from '@lib/types';
import { differenceInDays } from 'date-fns';
import { selectorFamily } from 'recoil';
import { atomQueryTodoIds } from './atomQuery';
import { selectorDynamicTodoItem, selectorTaskCompleteCapacity } from './atomTodos';

export const selectorDynamicPriority = selectorFamily<
  Todos['priorityLevel'],
  Todos['_id']
>({
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

      return (
        (priority - 1 / ((daysToDueDateOutput() as number) + 1)) / taskCapacityPerDay
      );
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
      const daysFromCreated =
        differenceInDays(new Date(), new Date(createdDate as Date)) + 1;

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
