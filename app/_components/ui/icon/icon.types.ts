import { ConfigsProps } from '@/_lib/utils/configs.utils';
import { configsSvgIcon } from './svgIcon/svgIcon.configs';
import { TypesStyles } from '@/_components/components.types';

export interface TypesSvgAttributes {
  path: string;
  desc: string;
}

type ExtendedSvgAttributes = ConfigsProps<typeof configsSvgIcon> & TypesSvgAttributes & Pick<TypesStyles, 'className'>;

export type PropsSvgIcon = { configs: Partial<ExtendedSvgAttributes> };
