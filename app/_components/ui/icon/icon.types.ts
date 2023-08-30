import { ReactNode } from 'react';

interface TypesSvgIcon {
  height: number | string;
  width: number | string;
  viewBox: string;
  className: string;
  path: string | ReactNode;
  desc: string;
}

// export type PropsSvgIcon = { configs: ConfigsProps<typeof configsSvgIcon & typeof configsSvgIconLogo> };
export type PropsSvgIcon = { configs: Partial<TypesSvgIcon> };
