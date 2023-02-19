import { PATHNAME, PRIORITY_LEVEL, OBJECT_ID } from '@data/dataTypesConst';
import { Labels, TodoIds, Todos, Types } from '@lib/types';
import { atomLabelQuerySlug } from '@states/labels';
import { atomQueryLabels } from '@states/labels/atomQueries';
import { selectorFilterPriorityRankScore } from '@states/priorities';
import { atom, selector, selectorFamily } from 'recoil';
import { atomQueryTodoIds, atomSelectorTodoItem } from './atomQueries';

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
      case 'label':
        return get(selectorFilterTodoIdsByPathname(PATHNAME['label']));
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
          return get(selectorFilterPriorityRankScore);
        case PATHNAME['urgent']:
          return get(atomQueryTodoIds).filter(
            (todo) => !todo.completed && todo.priorityLevel === PRIORITY_LEVEL['urgent'],
          );
        case PATHNAME['important']:
          return get(atomQueryTodoIds).filter(
            (todo) => !todo.completed && todo.priorityLevel === PRIORITY_LEVEL['important'],
          );
        case PATHNAME['showAll']:
          return get(atomQueryTodoIds).filter((todo) => !todo.completed);
        case PATHNAME['completed']:
          return get(atomQueryTodoIds).filter((todo) => todo.completed);
        case PATHNAME['label']:
          const titleIdsByCurrentLabel = get(atomQueryLabels).filter(
            (label) => label._id === get(atomLabelQuerySlug),
          )[0]?.title_id;
          return get(atomQueryTodoIds).filter((todo) => {
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
      const titleIdsByCurrentLabel = get(atomQueryLabels).filter((label) => label._id === labelId)[0]?.title_id;
      return get(atomQueryTodoIds).filter((todo) => {
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
      const labels = get(atomQueryLabels);
      if (labelId) {
        const todos = get(atomQueryTodoIds);
        const titleIds = labels.filter((item) => item._id === labelId)[0]?.title_id;
        const todoIds = todos.filter((todo) => !todo.completed && titleIds && titleIds.includes(todo._id as OBJECT_ID));
        return todoIds.length;
      }
      const todoIdsPathname = get(selectorFilterTodoIdsByPathname(pathname as PATHNAME));
      return todoIdsPathname.length;
    },
  cachePolicy_UNSTABLE: {
    eviction: 'lru',
    maxSize: 100,
  },
});
