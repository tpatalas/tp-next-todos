import { TypesStyles } from '@/_components/components.types';
import { ReactNode } from 'react';

export interface TypesContainer {
  _id: string | null;
}

export type PropsDivContainer = { children: ReactNode } & Pick<TypesContainer, '_id'> &
  Partial<Pick<TypesStyles, 'className'>>;
