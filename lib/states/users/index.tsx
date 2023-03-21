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

export const atomUserOffSession = atom({
  key: 'atomUserOffSession',
  // default must be empty to persist the pending state on session's loading state.
});
