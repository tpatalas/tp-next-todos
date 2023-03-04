import { IDB_KEY, IDB_STORE } from '@data/dataTypesConst';
import { indexedDBEffect } from '@effects/atomEffects';
import { Users } from '@lib/types';
import { atom } from 'recoil';

export const atomUserNew = atom<Users>({
  key: 'atomUserNew',
  default: { email: '', password: '' } as Users,
});

export const atomIDBUserSession = atom<boolean>({
  key: 'atomIDBUserSession',
  default: false,
  effects: [
    indexedDBEffect({
      storeName: IDB_STORE['users'],
      queryKey: IDB_KEY['session'],
    }),
  ],
});
