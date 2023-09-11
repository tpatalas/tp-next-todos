import { ReactNode } from 'react';

type TypesSvgIconBase<T> = {
  configs: Partial<T>;
};

interface TypesSvgIconAttributes {
  height: number | string;
  width: number | string;
  viewBox: string;
  className: string;
  path: string | ReactNode;
  desc: string;
}

export type TypesSvgIcon = TypesSvgIconAttributes & { className: HTMLElement['className'] };

export type PropsSvgIcon = TypesSvgIconBase<TypesSvgIcon>;
