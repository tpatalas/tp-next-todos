import { ReactNode } from 'react';

type TypesSvgIconBase<T> = {
  configs: Partial<T>;
};

export interface TypesSvgIconAttributes {
  height: number | string;
  width: number | string;
  viewBox: string;
  path: string | ReactNode;
  desc: string;
  className: {
    [key: string]: HTMLElement['className'];
  };
}

export type PropsSvgIcon = TypesSvgIconBase<TypesSvgIconAttributes>;
