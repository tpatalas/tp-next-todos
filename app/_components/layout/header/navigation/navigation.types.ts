import { PATH_ROUTE } from '@/_lib/consts/assertion.consts';

type TypesNavigationNames = 'Features' | 'Pricing' | 'Contact';

export interface PropsDataNavigation {
  name: TypesNavigationNames;
  path: PATH_ROUTE;
}
