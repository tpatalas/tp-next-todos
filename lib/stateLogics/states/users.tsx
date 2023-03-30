import { Users } from '@lib/types';
import { atom } from 'recoil';

export const atomUser = atom<Users>({
  key: 'atomUser',
  default: { email: '', password: '' } as Users,
});

export const atomUserErrorMessage = atom<string>({
  key: 'atomUserErrorMessage',
  default: '',
});

export const atomUserVerificationRequest = atom({
  key: 'atomUserVerificationRequest',
  default: false,
});

export const atomUserSession = atom({
  key: 'atomUserSession',
  default: true,
});
