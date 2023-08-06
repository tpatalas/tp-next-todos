import { TypesStyles } from '@/_components/components.types';
import { VIEWBOX } from './icon.consts';

export interface TypesSvgAttributes {
  path: string;
  height: string | number;
  width: string | number;
  viewBox: VIEWBOX;
  isAriaHidden: boolean;
  testId: string;
}

type ExtendedSvgAttributes = Partial<TypesSvgAttributes & Pick<TypesStyles, 'className'>>;

export type PropsSvgIcon = Partial<{ configs: ExtendedSvgAttributes }>;
