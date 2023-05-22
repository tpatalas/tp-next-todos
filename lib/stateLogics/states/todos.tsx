import { Labels, TodoIds, Todos, Types } from '@lib/types';
import { selectorFilterPriorityRankScore } from '@states/priorities';
import { atom, selector, selectorFamily } from 'recoil';
import { PATH_APP, OBJECT_ID } from '@constAssertions/data';
import { PRIORITY_LEVEL } from '@constAssertions/misc';
import { atomSelectorTodoItem, selectorSessionTodoIds } from './atomEffects/todos';
import { atomFilterEffect } from './misc';
import { atomLabelQuerySlug, selectorSessionLabels } from '@label/label.states';

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
    labelItem: [] as Labels[],
  } as Todos,
});

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

/**
 * selectors
 */
export const selectorFilterTodoIds = selector({
  key: 'SelectorFilterTodoIds',
  get: ({ get }) => {
    const filter = get(atomFilterEffect);
    switch (filter) {
      case 'focus':
        return get(selectorFilterTodoIdsByPathname(PATH_APP['app']));
      case 'urgent':
        return get(selectorFilterTodoIdsByPathname(PATH_APP['urgent']));
      case 'important':
        return get(selectorFilterTodoIdsByPathname(PATH_APP['important']));
      case 'showAll':
        return get(selectorFilterTodoIdsByPathname(PATH_APP['showAll']));
      case 'completed':
        return get(selectorFilterTodoIdsByPathname(PATH_APP['completed']));
      case 'label':
        return get(selectorFilterTodoIdsByPathname(PATH_APP['label']));
      default:
        return get(selectorSessionTodoIds).filter((todo) => !todo.completed);
    }
  },
  cachePolicy_UNSTABLE: {
    eviction: 'keep-all',
  },
});

export const selectorFilterTodoIdsByPathname = selectorFamily<TodoIds[], PATH_APP>({
  key: 'selectorFilterTodoIdsByPathname',
  get:
    (pathname) =>
    ({ get }) => {
      switch (pathname) {
        case PATH_APP['app']:
          return get(selectorFilterPriorityRankScore);
        case PATH_APP['urgent']:
          return get(selectorSessionTodoIds).filter(
            (todo) => !todo.completed && todo.priorityLevel === PRIORITY_LEVEL['urgent'],
          );
        case PATH_APP['important']:
          return get(selectorSessionTodoIds).filter(
            (todo) => !todo.completed && todo.priorityLevel === PRIORITY_LEVEL['important'],
          );
        case PATH_APP['showAll']:
          return get(selectorSessionTodoIds).filter((todo) => !todo.completed);
        case PATH_APP['completed']:
          return get(selectorSessionTodoIds).filter((todo) => todo.completed);
        case PATH_APP['label']:
          const titleIdsByCurrentLabel = get(selectorSessionLabels).filter(
            (label) => label._id === get(atomLabelQuerySlug),
          )[0]?.title_id;
          return get(selectorSessionTodoIds).filter((todo) => {
            const todoId = todo._id as OBJECT_ID;
            return !todo.completed && titleIdsByCurrentLabel && titleIdsByCurrentLabel.includes(todoId);
          });
      }
    },
  cachePolicy_UNSTABLE: {
    eviction: 'keep-all',
  },
});

export const selectorFilterTodoIdsByLabelQueryId = selectorFamily<TodoIds[], Labels['_id']>({
  key: 'selectorFilterTodoIdsByQueryId',
  get:
    (labelId) =>
    ({ get }) => {
      const titleIdsByCurrentLabel = get(selectorSessionLabels).filter((label) => label._id === labelId)[0]
        ?.title_id;
      return get(selectorSessionTodoIds).filter((todo) => {
        const todoId = todo._id as OBJECT_ID;
        return !todo.completed && titleIdsByCurrentLabel && titleIdsByCurrentLabel.includes(todoId);
      });
    },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const selectorTodosCount = selectorFamily<
  number,
  Partial<{ labelId: Labels['_id']; pathname: Types['pathname'] }>
>({
  key: 'selectorTodosCount',
  get:
    ({ labelId, pathname }) =>
    ({ get }) => {
      const labels = get(selectorSessionLabels);
      if (labelId) {
        const todos = get(selectorSessionTodoIds);
        const titleIds = labels.filter((item) => item._id === labelId)[0]?.title_id;
        const todoIds = todos.filter(
          (todo) => !todo.completed && titleIds && titleIds.includes(todo._id as OBJECT_ID),
        );
        return todoIds.length;
      }
      const todoIdsPathname = get(selectorFilterTodoIdsByPathname(pathname as PATH_APP));
      return todoIdsPathname.length;
    },
  cachePolicy_UNSTABLE: {
    eviction: 'lru',
    maxSize: 100,
  },
});
