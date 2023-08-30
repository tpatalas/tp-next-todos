import { TypesStyles } from '@/_components/components.types';
import { ReactNode } from 'react';

type TypesSvgIconBase<T> = {
  configs: Partial<T>;
} & Partial<Pick<TypesStyles, 'className'>>;

export interface TypesSvgIcon {
  height: number | string;
  width: number | string;
  viewBox: string;
  className: string;
  path: string | ReactNode;
  desc: string;
}

export type PropsSvgIcon = TypesSvgIconBase<TypesSvgIcon>;
