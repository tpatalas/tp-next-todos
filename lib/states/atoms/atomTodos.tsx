import { Todos, TodosIds } from '@lib/types';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { atomQueryTodoIdsCompleted, atomQueryTodoItem } from './atomQuery';

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

export const selectorTaskCompleteCapacity = selector({
  key: 'selectorTaskCompleteCapacity',
  get: ({ get }) => {
    const taskCapacity = get(atomSelectorTodoIdsCompleted).length / 3;
    return taskCapacity < 5 ? 5 : taskCapacity;
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const atomSelectorTodoIdsCompleted = atom<TodosIds[]>({
  key: 'atomSelectorTodoIdsCompleted',
  default: selector({
    key: 'selectorTodoIdsCompleted',
    get: ({ get }) => get(atomQueryTodoIdsCompleted),
  }),
});
