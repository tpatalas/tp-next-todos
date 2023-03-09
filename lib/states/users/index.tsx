import { STORAGE_KEY } from '@data/dataTypesConst';
import { sessionStorageEffect } from '@effects/atomEffects';
import { Users } from '@lib/types';
import { atom, atomFamily } from 'recoil';

export const atomUserNew = atom<Users>({
  key: 'atomUserNew',
  default: { email: '', password: '' } as Users,
});

export const atomIDBUserSession = atom<boolean>({
  key: 'atomIDBUserSession',
  default: false,
  effects: [
    sessionStorageEffect({
      queryKey: STORAGE_KEY['session'],
    }),
  ],
});

export const atomUserCredentialError = atomFamily<boolean, boolean>({
  key: 'atomUserCredentialError',
  default: false,
});
