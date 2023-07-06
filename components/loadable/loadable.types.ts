import { Types } from '@lib/types';

export interface TypesLoadings {
  loadingSkeleton: Types['children'];
  repeatingCount: number;
}

export type TypesOptionsLoadingState = Pick<TypesLoadings, 'loadingSkeleton' | 'repeatingCount'> &
  Pick<Types, 'margin' | 'space'>;
