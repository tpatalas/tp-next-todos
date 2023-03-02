import { Users } from '@lib/types';
import { atom } from 'recoil';

export const atomUserNew = atom<Users>({
  key: 'atomUserNew',
  default: { email: '', password: '' } as Users,
});
