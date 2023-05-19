import { VIEWBOX } from '@constAssertions/ui';
import { ReactElement } from 'react';

export interface TypesSvgLogos {
  name: 'Google' | 'GitHub' | 'MainWhite' | 'MainLogoOnlyWhite';
  className?: string;
  isAriaHidden?: boolean;
  height: string;
  width: string;
  viewBox: string;
  path: ReactElement;
}

export interface TypesSvgIconAttributes {
  path: string;
  height: string | number;
  width: string | number;
  viewBox: VIEWBOX;
  isAriaHidden: boolean;
}

export type TypesOptionsSvg = Partial<TypesSvgIconAttributes & Pick<TypesSvgLogos, 'className'>>;

/*
 * Props Types
 * */

export type TypesPropsOptionsSvg = { options?: TypesOptionsSvg };

export type TypesPropsSvgLogoNames = { type: TypesSvgLogos['name'] };