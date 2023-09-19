import { PATH_ROUTE } from '@/_lib/consts/assertion.consts';
import { PropsDataNavigation } from './navigation.types';

export const DATA_NAVIGATION: PropsDataNavigation[] = [
  {
    name: 'Features',
    path: PATH_ROUTE['features'],
  },
  {
    name: 'Pricing',
    path: PATH_ROUTE['pricing'],
  },
];
