import { DATA_DEMO_TODOIDS } from '@collections/demo';
import { TypesTodoIds, TypesTodos } from '@components/todos/todos.types';
import { IDB_KEY, IDB_STORE } from '@constAssertions/storage';
import { getDataTodoIds, getDataTodoItem, getDemoTodoItem } from '@lib/queries/queryTodos';
import { queryEffect } from '@lib/stateLogics/effects/atomEffects/queryEffects';
import { atomUserSession } from '@user/user.states';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';

/**
 * Query Todos
 * Defining `storeName` will automatically apply the predefined IndexedDB name.
 */

export const atomQueryTodoIds = atom<TypesTodoIds[]>({
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

export const atomDemoTodoIds = atom<TypesTodoIds[]>({
  key: 'atomDemoTodoIds',
  default: DATA_DEMO_TODOIDS,
});

export const selectorSessionTodoIds = selector<TypesTodoIds[]>({
  key: 'selectorSessionTodoIds',
  get: ({ get }) => {
    const session = get(atomUserSession);
    return session ? get(atomQueryTodoIds) : get(atomDemoTodoIds);
  },
  set: ({ get, set }, newValue) => {
    const session = get(atomUserSession);
    return session ? set(atomQueryTodoIds, newValue) : set(atomDemoTodoIds, newValue);
  },
});

export const atomQueryTodoItem = atomFamily<TypesTodos, TypesTodos['_id']>({
  key: 'atomQueryTodoItem',
  default: {} as TypesTodos,
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

export const atomDemoTodoItem = atomFamily<TypesTodos, TypesTodos['_id']>({
  key: 'atomDemoTodoItem',
  default: {} as TypesTodos,
  effects: (todoId) => [
    ({ setSelf }) => {
      const demoFunction = () => getDemoTodoItem({ _id: todoId });
      setSelf(demoFunction());
    },
  ],
});

export const selectorSessionTodoItem = selectorFamily<TypesTodos, TypesTodos['_id']>({
  key: 'selectorSessionTodoItem',
  get:
    (todoId) =>
    ({ get }) => {
      const session = get(atomUserSession);
      return session ? get(atomQueryTodoItem(todoId)) : get(atomDemoTodoItem(todoId));
    },
  set:
    (todoId) =>
    ({ get, set }, newValue) => {
      const session = get(atomUserSession);
      return session ? set(atomQueryTodoItem(todoId), newValue) : set(atomDemoTodoItem(todoId), newValue);
    },
});

/**
 * Derived Query Todos
 **/
export const atomSelectorTodoItem = atomFamily<TypesTodos, TypesTodos['_id']>({
  key: 'atomSelectorTodoItem',
  default: selectorFamily({
    key: 'selectorAtomTodoItem',
    get:
      (todoId) =>
      ({ get }) =>
        get(selectorSessionTodoItem(todoId))!,
  }),
}); // Overwrite atomQueryTodoItem to prevent unnecessary re-rendering.
