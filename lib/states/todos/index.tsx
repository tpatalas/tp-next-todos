import { PATHNAME } from '@data/stateObjects';
import { Todos, TodoIds } from '@lib/types';
import { selectorFilterPriorityRankScore } from '@states/priorities';
import { atom, atomFamily, selectorFamily, selector } from 'recoil';
import { atomQueryTodoItem, atomQueryTodoIds } from './atomQueries';

/**
 * atoms
 * */
export const atomTodoNew = atom<Todos>({
  key: 'atomTodoNew',
  default: {
    _id: undefined,
    title: '',
    note: '',
    isCompleted: false,
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
        return get(atomQueryTodoIds).filter((todo) => !todo.isCompleted);
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
          return get(selectorFilterPriorityRankScore);
        case PATHNAME['urgent']:
          return get(atomQueryTodoIds).filter(
            (todo) => !todo.isCompleted && todo.priorityLevel === 1,
          );
        case PATHNAME['important']:
          return get(atomQueryTodoIds).filter(
            (todo) => !todo.isCompleted && todo.priorityLevel === 2,
          );
        case PATHNAME['showAll']:
          return get(atomQueryTodoIds).filter((todo) => !todo.isCompleted);
        case PATHNAME['completed']:
          return get(atomQueryTodoIds).filter((todo) => todo.isCompleted);
      }
    },
  cachePolicy_UNSTABLE: {
    eviction: 'keep-all',
  },
});
