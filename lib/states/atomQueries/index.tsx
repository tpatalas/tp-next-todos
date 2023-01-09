import { IDB_STORE, SCHEMA_TODO } from '@data/stateObjects';
import { queryEffect } from '@effects/atomEffects/queryEffect';
import { getDataLabels } from '@lib/queries/queryLabels';
import { getDataTodoIds, getDataTodoItem } from '@lib/queries/queryTodos';
import { getDataUserId } from '@lib/queries/queryUsers';
import { getDataSetting } from '@lib/queries/queryUsers/querySettings';
import { Settings, Labels, TodoIds, Todos, Users } from '@lib/types';
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
      refetchDelayOnMutation: 500,
    }),
  ],
});

/**
 * Query Labels
 */
export const atomQueryLabels = atom<Labels[]>({
  key: 'atomQueryLabels',
  effects: [
    queryEffect({
      storeName: IDB_STORE['labels'],
      queryKey: 'labels',
      queryFunction: () => getDataLabels(),
      refetchOnMutation: false, // fetching the list of labels is too expensive.
    }),
  ],
});

/**
 * * Query User Id
 */
export const atomQueryUserId = atom<Users[]>({
  key: 'atomQueryUserId',
  effects: [
    queryEffect({
      storeName: IDB_STORE['users'],
      queryKey: 'userId',
      queryFunction: () => getDataUserId(),
      refetchOnMutation: false,
    }),
  ],
});

/**
 * * Query User Setting
 */
export const atomQueryUserSettings = atomFamily<Settings[], Settings['userId']>({
  key: 'atomQueryUserSettings',
  effects: (userId) => [
    queryEffect({
      storeName: IDB_STORE['settings'],
      queryKey: userId!.toString(),
      queryFunction: () => getDataSetting(userId),
      refetchOnMutation: false,
    }),
  ],
});
