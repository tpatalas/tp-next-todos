import { TypesStyles } from '@/_components/components.types';
import { ReactNode } from 'react';

type TypesSvgIconBase<T> = {
  configs: Partial<T>;
};

export interface TypesSvgIcon {
  height: number | string;
  width: number | string;
  viewBox: string;
  className: string;
  path: string | ReactNode;
  desc: string;
}

type TypesOptionSvgIcon = TypesSvgIcon & Pick<TypesStyles, 'className'>;

export type PropsSvgIcon = TypesSvgIconBase<TypesOptionSvgIcon>;
