import { IDB_STORE, SCHEMA_TODO } from '@data/stateObjects';
import { queryEffect } from '@effects/queryEffects';
import { getDataTodoIds, getDataTodoItem } from '@lib/queries/queryTodos';
import { TodoIds, Todos } from '@lib/types';
import { atom, atomFamily } from 'recoil';

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
      queryFunction: () => getDataTodoIds({ model: SCHEMA_TODO['todoItem'] }),
      refetchOnMutation: true,
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
      refetchOnMutation: true,
      refetchDelayOnMutation: 800,
    }),
  ],
});
