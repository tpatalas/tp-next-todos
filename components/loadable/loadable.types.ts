import { Types } from '@lib/types';

export interface TypesLoadings {
  loadingSkeleton: Types['children'];
  repeatingCount: number;
  delay: number;
}

export type TypesOptionsLoadingState = Partial<Pick<TypesLoadings, 'delay'>> &
  Pick<TypesLoadings, 'loadingSkeleton' | 'repeatingCount'> &
  Pick<Types, 'margin' | 'space'>;
