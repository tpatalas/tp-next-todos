import { DATA_DEMO_TODOIDS } from '@collections/demo';
import { PATH_HOME } from '@constAssertions/data';
import { IDB_KEY, IDB_STORE } from '@constAssertions/storage';
import { getDataTodoIds, getDataTodoItem, getDemoTodoItem } from '@lib/queries/queryTodos';
import { queryEffect } from '@lib/stateLogics/effects/atomEffects/queryEffects';
import { TodoIds, Todos } from '@lib/types';
import { atomPathname } from '@states/misc';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';

/**
 * Query Todos
 * Defining `storeName` will automatically apply the predefined IndexedDB name.
 */

export const atomQueryTodoIds = atom<TodoIds[]>({
  key: 'atomQueryTodoIds',
  default: [],
  effects: [
    queryEffect({
      storeName: IDB_STORE['idMaps'],
      queryKey: IDB_KEY['todoIds'],
      queryFunction: () => getDataTodoIds(),
      isRefetchingOnMutation: true,
      isRefetchingOnFocus: true,
    }),
  ],
});

export const atomDemoTodoIds = atom<TodoIds[]>({
  key: 'atomDemoTodoIds',
  default: DATA_DEMO_TODOIDS,
});

export const selectorSessionTodoIds = selector<TodoIds[]>({
  key: 'selectorSessionTodoIds',
  get: ({ get }) => {
    const pathname = get(atomPathname);
    return pathname === PATH_HOME['demo'] ? get(atomDemoTodoIds) : get(atomQueryTodoIds);
  },
  set: ({ get, set }, newValue) => {
    const pathname = get(atomPathname);
    return pathname === PATH_HOME['demo']
      ? set(atomDemoTodoIds, newValue)
      : set(atomQueryTodoIds, newValue);
  },
});

export const atomQueryTodoItem = atomFamily<Todos, Todos['_id']>({
  key: 'atomQueryTodoItem',
  default: {} as Todos,
  //! Default value must be set to trigger the reset (reset removes the data from indexedDB)
  effects: (todoId) => [
    queryEffect({
      storeName: IDB_STORE['todoItems'],
      queryKey: todoId!.toString(),
      queryFunction: () => getDataTodoItem({ _id: todoId }),
      isRefetchingOnMutation: true,
      refetchDelayOnMutation: 800,
      isRefetchingOnFocus: true,
    }),
  ],
});

export const atomDemoTodoItem = atomFamily<Todos, Todos['_id']>({
  key: 'atomDemoTodoItem',
  default: {} as Todos,
  effects: (todoId) => [
    ({ setSelf }) => {
      const demoFunction = () => getDemoTodoItem({ _id: todoId });
      setSelf(demoFunction());
    },
  ],
});

export const selectorSessionTodoItem = selectorFamily<Todos, Todos['_id']>({
  key: 'selectorSessionTodoItem',
  get:
    (todoId) =>
    ({ get }) => {
      const pathName = get(atomPathname);
      return pathName === PATH_HOME['demo']
        ? get(atomDemoTodoItem(todoId))
        : get(atomQueryTodoItem(todoId));
    },
  set:
    (todoId) =>
    ({ get, set }, newValue) => {
      const pathName = get(atomPathname);
      return pathName === PATH_HOME['demo']
        ? set(atomDemoTodoItem(todoId), newValue)
        : set(atomQueryTodoItem(todoId), newValue);
    },
});

/**
 * Derived Query Todos
 **/
export const atomSelectorTodoItem = atomFamily<Todos, Todos['_id']>({
  key: 'atomSelectorTodoItem',
  default: selectorFamily({
    key: 'selectorAtomTodoItem',
    get:
      (todoId) =>
      ({ get }) =>
        get(selectorSessionTodoItem(todoId))!,
  }),
}); // Overwrite atomQueryTodoItem to prevent unnecessary re-rendering.
