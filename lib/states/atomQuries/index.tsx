import { getCachedData } from '@data/cachedApiRequest';
import { CACHED_DATA, IDB_STORE, SCHEMA_TODO } from '@data/stateObjects';
import { queryEffect } from '@effect/atomEffects/queryEffect';
import { getDataTodoIds, getDataTodoItem } from '@lib/queries/queryTodos';
import { getDataUserId } from '@lib/queries/queryUsers';
import { getDataSetting } from '@lib/queries/queryUsers/querySettings';
import { Settings, Todos, TodosIds, Users } from '@lib/types';
import { atom, atomFamily } from 'recoil';

/**
 * * Query Todos
 * Defining `storeName` will automatically apply the predefined IndexedDB name.
 */

export const atomQueryTodoIds = atom<TodosIds[]>({
  key: 'atomQueryTodoIds',
  effects: [
    queryEffect({
      storeName: IDB_STORE['todos'],
      queryKey: 'todoIds',
      cachedQueryFunction: () => getCachedData(CACHED_DATA['getDataTodoIds']),
      queryFunction: () => getDataTodoIds({ model: SCHEMA_TODO['todoItem'] }),
      refetchOnMutation: true,
    }),
  ],
});

export const atomQueryTodoIdsCompleted = atom<TodosIds[]>({
  key: 'atomQueryTodoIdsCompleted',
  effects: [
    queryEffect({
      storeName: IDB_STORE['todos'],
      queryKey: 'todoIdsCompleted',
      queryFunction: () =>
        getDataTodoIds({
          model: SCHEMA_TODO['todoItem'],
          completed: true,
          completedFromToday: 3,
        }),
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
