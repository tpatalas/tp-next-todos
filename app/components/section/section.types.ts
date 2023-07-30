import { TypesContainer } from '@/container/container.types';

type TypesSectionContentText = 'title' | 'subTitle' | 'content';

export type PropsSectionContentText = Record<TypesSectionContentText, string> & Pick<TypesContainer, '_id'>;
