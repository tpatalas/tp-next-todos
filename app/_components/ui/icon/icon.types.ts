import { ConfigsProps } from '@/_lib/utils/configs.utils';
import { configsSvgIcon, configsSvgIconLogo } from './svgIcon/svgIcon.configs';

export type PropsSvgIcon = { configs: ConfigsProps<typeof configsSvgIcon & typeof configsSvgIconLogo> };
