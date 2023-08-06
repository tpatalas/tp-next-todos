import { TypesContainer } from '@/container/container.types';

type TypesSectionContentText = 'title' | 'subTitle' | 'content';
export type TypesContents = Record<TypesSectionContentText, string>;

export type PropsSectionContentText = Partial<TypesContents> & Pick<TypesContainer, '_id'>;

export type TypesSectionContents<T> = {
  hero: T;
  headerContent: T;
  spotlight: T;
  overload: T;
  startToday: T;
};
