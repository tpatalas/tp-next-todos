import { PATH_HOME } from '@constAssertions/data';
import { Types } from '@lib/types';

type Props = Pick<Types, 'name' | 'path'>;

export const DATA_HOME: Props[] = [
  {
    name: 'Features',
    path: PATH_HOME['features'],
  },
  {
    name: 'Implementations',
    path: PATH_HOME['implementations'],
  },
  {
    name: 'Pricing',
    path: PATH_HOME['pricing'],
  },
];
