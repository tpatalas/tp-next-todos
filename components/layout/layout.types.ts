import { TypesLabel } from '@label/label.types';
import { Types } from '@lib/types';

export interface TypesLayout {
  path: 'app' | 'home';
}

export type PropsTodosCount = Partial<Pick<Types, 'pathname'> & Pick<TypesLabel, 'label'>>;
