import { PRIORITY_LEVEL } from '@constAssertions/misc';
import { selectorDynamicTodoItem } from '@states/todos';
import { subDays, differenceInDays } from 'date-fns';
import { atomFamily, selectorFamily, selector } from 'recoil';
import { selectorSessionTodoIds } from './atomEffects/todos';
import { TypesTodos } from '@components/todos/todos.types';

/**
 * atoms
 */

// priority
export const atomPriority = atomFamily<PRIORITY_LEVEL | null, TypesTodos['_id']>({
  key: 'atomPriority',
  default: null,
});

/*
 * selectors
 * */
// priority rank score

export const selectorDynamicPriority = selectorFamily<TypesTodos['priorityLevel'], TypesTodos['_id']>({
  key: 'selectorPriority',
  get:
    (todoId) =>
    ({ get }) =>
      !get(selectorDynamicTodoItem(todoId)).priorityLevel
        ? PRIORITY_LEVEL['normal']
        : get(selectorDynamicTodoItem(todoId)).priorityLevel,
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const selectorFilterPriorityRankScore = selector({
  key: 'selectorFilterPriorityRankScore',
  get: ({ get }) => {
    const taskCapacity = get(selectorTaskCompleteCapacity);
    const prsUrgentFiltered = get(selectorSessionTodoIds).filter(
      (todo) => !todo.completed && todo.priorityLevel === PRIORITY_LEVEL['urgent'],
    );
    const prsImportantFiltered = get(selectorSessionTodoIds).filter(
      (todo) => !todo.completed && todo.priorityLevel === PRIORITY_LEVEL['important'],
    );
    const prsNormalFiltered = get(selectorSessionTodoIds).filter(
      (todo) =>
        !todo.completed &&
        todo.priorityLevel !== PRIORITY_LEVEL['urgent'] &&
        todo.priorityLevel !== PRIORITY_LEVEL['important'],
    );

    // NOTE: IDEA: The ratio can be configurable in the user setting in the future implementation.
    // Base ratio
    const taskCapacityUrgent = Math.round(taskCapacity * 0.5);
    const taskCapacityImportant = Math.round(taskCapacity * 0.3);
    const taskCapacityNormal = Math.round(taskCapacity * 0.2);

    const rest = taskCapacity - prsUrgentFiltered.length - prsImportantFiltered.length;
    const taskCapacityRest = rest > 0 ? rest : taskCapacityNormal;

    const conditionalTaskCapacityUrgent =
      prsUrgentFiltered.length > taskCapacityUrgent ? taskCapacityUrgent : prsUrgentFiltered.length;
    const conditionalTaskCapacityImportant =
      prsUrgentFiltered.length > taskCapacityUrgent
        ? taskCapacityImportant
        : (taskCapacity - conditionalTaskCapacityUrgent) * 0.7;
    const conditionalTaskCapacityNormal =
      prsImportantFiltered.length > taskCapacityImportant && prsUrgentFiltered.length > taskCapacityUrgent
        ? taskCapacityNormal
        : taskCapacityRest;

    const prsUrgent = prsUrgentFiltered
      .sort((todoA, todoB) => todoA.priorityRankScore! - todoB.priorityRankScore!)
      .slice(0, conditionalTaskCapacityUrgent);
    const prsImportant = prsImportantFiltered
      .sort((todoA, todoB) => todoA.priorityRankScore! - todoB.priorityRankScore!)
      .slice(0, conditionalTaskCapacityImportant);
    const prsNormal = prsNormalFiltered
      .sort((todoA, todoB) => todoA.priorityRankScore! - todoB.priorityRankScore!)
      .slice(0, conditionalTaskCapacityNormal);
    return prsUrgent.concat(prsImportant, prsNormal).reverse();
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const selectorTaskCompleteCapacity = selector({
  key: 'selectorTaskCompleteCapacity',
  get: ({ get }) => {
    const fiveDaysFromToday = subDays(new Date(), 5);
    const todoIdsCompletedLastFiveDays = get(selectorSessionTodoIds).filter((todo) => {
      const fiveDaysFromTodayCompleted = new Date(todo.completedDate!) > fiveDaysFromToday;
      return todo.completed && fiveDaysFromTodayCompleted;
    });
    const taskCapacity = todoIdsCompletedLastFiveDays.length / 5;
    return taskCapacity < 5 ? 7 : taskCapacity;
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const selectorPrsDueDate = selectorFamily<number, TypesTodos['_id']>({
  key: 'selectorPrsDueDate',
  get:
    (todoId) =>
    ({ get }) => {
      const taskCapacityPerDay = get(selectorTaskCompleteCapacity);
      const todoItem = get(selectorDynamicTodoItem(todoId));
      const priority = get(selectorDynamicPriority(todoId)) as PRIORITY_LEVEL;
      const totalUncompletedTodos = get(selectorSessionTodoIds).filter((todo) => !todo.completed).length;
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

export const selectorPrsCreateDate = selectorFamily<number, TypesTodos['_id']>({
  key: 'selectorPrsCreateDate',
  get:
    (todoId) =>
    ({ get }) => {
      const taskCapacityPerDay = get(selectorTaskCompleteCapacity);
      const todoItem = get(selectorDynamicTodoItem(todoId));
      const createdDate = todoItem.createdDate != null && todoItem.createdDate;
      const daysFromCreated = differenceInDays(new Date(), new Date(createdDate as Date)) + 1;

      return (daysFromCreated < 5 ? 1 / 100 : 1 / daysFromCreated) / taskCapacityPerDay;
    },
  cachePolicy_UNSTABLE: {
    eviction: 'lru',
    maxSize: 100,
  },
});

export const selectorPrsTaskCapacity = selectorFamily<number, TypesTodos['_id']>({
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

export const selectorPriorityRankScore = selectorFamily<number, TypesTodos['_id']>({
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
