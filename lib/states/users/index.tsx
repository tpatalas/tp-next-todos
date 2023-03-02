import { STORAGE_KEY } from '@data/dataTypesConst';
import { sessionStorageEffect } from '@effects/atomEffects';
import { Users } from '@lib/types';
import { atom, atomFamily } from 'recoil';

export const atomUser = atom<Users>({
  key: 'atomUser',
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

export const atomUserError = atomFamily<boolean, string>({
  key: 'atomUserError',
  default: false,
});

export const atomUserVerificationRequest = atom({
  key: 'atomUserVerificationRequest',
  default: false,
});
