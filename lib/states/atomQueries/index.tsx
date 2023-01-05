import { IDB_STORE, PRIORITY_LEVEL, SCHEMA_TODO } from '@data/stateObjects';
import { queryEffect } from '@effects/atomEffects/queryEffect';
import { getDataTags } from '@lib/queries/queryTags';
import { getDataTodoIds, getDataTodoItem } from '@lib/queries/queryTodos';
import { getDataUserId } from '@lib/queries/queryUsers';
import { getDataSetting } from '@lib/queries/queryUsers/querySettings';
import { Settings, Tags, TodoIds, Todos, Users } from '@lib/types';
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

export const atomQueryTodoIdsCompleted = atom<TodoIds[]>({
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

export const atomQueryTodoIdsPriorityLevel = atomFamily<TodoIds[], Todos['priorityLevel']>({
  key: 'atomQueryTodoIdsPriorityLevel',
  effects: (priorityLevel) => [
    queryEffect({
      storeName: IDB_STORE['todos'],
      queryKey: !priorityLevel ? PRIORITY_LEVEL['normal'].toString() : priorityLevel.toString(),
      queryFunction: () =>
        getDataTodoIds({ model: SCHEMA_TODO['todoItem'], priorityLevel: priorityLevel }),
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
 * Query Tags
 */
export const atomQueryTags = atom<Tags[]>({
  key: 'atomQueryTags',
  effects: [
    queryEffect({
      storeName: IDB_STORE['tags'],
      queryKey: 'tags',
      queryFunction: () => getDataTags(),
      refetchOnMutation: false, // fetching the list of tags is too expensive.
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
