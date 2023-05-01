import { Users } from '@user/user.types';
import { atom } from 'recoil';

export const atomAuthUser = atom<Users>({
  key: 'atomAuthUser',
  default: { email: '', password: '' } as Users,
});

export const atomAuthErrorMessage = atom<string>({
  key: 'atomAuthErrorMessage',
  default: '',
});

export const atomAuthVerificationRequest = atom({
  key: 'atomAuthVerificationRequest',
  default: false,
});
