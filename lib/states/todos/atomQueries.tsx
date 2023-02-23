import { IDB_STORE } from '@data/dataTypesConst';
import { queryEffect } from '@effects/queryEffects';
import { getDataTodoIds, getDataTodoItem } from '@lib/queries/queryTodos';
import { TodoIds, Todos } from '@lib/types';
import { atom, atomFamily, selectorFamily } from 'recoil';

/**
 * Query Todos
 * Defining `storeName` will automatically apply the predefined IndexedDB name.
 */
export const atomQueryTodoIds = atom<TodoIds[]>({
  key: 'atomQueryTodoIds',
  effects: [
    queryEffect({
      storeName: IDB_STORE['todos'],
      queryKey: 'todoIds',
      queryFunction: () => getDataTodoIds(),
      isRefetchingOnMutation: true,
    }),
  ],
});

export const atomQueryTodoItem = atomFamily<Todos, Todos['_id']>({
  key: 'atomQueryTodoItem',
  default: {} as Todos,
  //! Default value must be set to trigger the reset (reset removes the data from indexedDB)
  effects: (todoId) => [
    queryEffect({
      storeName: IDB_STORE['todos'],
      queryKey: todoId!.toString(),
      queryFunction: () => getDataTodoItem({ _id: todoId }),
      isRefetchingOnMutation: true,
      refetchDelayOnMutation: 800,
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
