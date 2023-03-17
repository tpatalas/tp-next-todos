import { DATA_DEMO_TODOIDS } from '@data/dataDemo';
import { IDB_KEY, IDB_STORE } from '@data/dataTypesConst';
import { queryEffect } from '@effects/queryEffects';
import { getDataTodoIds, getDataTodoItem, getDemoTodoItem } from '@lib/queries/queryTodos';
import { TodoIds, Todos } from '@lib/types';
import { atom, atomFamily, selectorFamily } from 'recoil';

/**
 * Query Todos
 * Defining `storeName` will automatically apply the predefined IndexedDB name.
 */

export const atomQueryTodoIds = atom<TodoIds[]>({
  key: 'atomQueryTodoIds',
  default: DATA_DEMO_TODOIDS,
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

export const atomQueryTodoItem = atomFamily<Todos, Todos['_id']>({
  key: 'atomQueryTodoItem',
  default: {} as Todos,
  //! Default value must be set to trigger the reset (reset removes the data from indexedDB)
  effects: (todoId) => [
    queryEffect({
      storeName: IDB_STORE['todoItems'],
      queryKey: todoId!.toString(),
      queryFunction: () => getDataTodoItem({ _id: todoId }),
      demoFunction: () => getDemoTodoItem({ _id: todoId }),
      isRefetchingOnMutation: true,
      refetchDelayOnMutation: 800,
      isRefetchingOnFocus: true,
    }),
  ],
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
        get(atomQueryTodoItem(todoId))!,
  }),
}); // Overwrite atomQueryTodoItem to prevent unnecessary re-rendering.
