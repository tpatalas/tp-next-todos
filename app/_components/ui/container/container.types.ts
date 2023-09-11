import { ReactNode } from 'react';

export interface TypesContainer {
  _id: string | null;
}

export type PropsDivContainer = { children: ReactNode; className?: HTMLElement['className'] } & Pick<
  TypesContainer,
  '_id'
>;
