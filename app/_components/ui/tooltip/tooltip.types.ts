import { ReactNode } from 'react';
import { ConfigsProps } from '@/_lib/utils/configs.utils';
import { configsTooltip } from './tooltip.configs';

type TypesTooltipBase<T> = Partial<{ configs: Partial<T> }> & { children: ReactNode };

export type PropsTooltip = TypesTooltipBase<ConfigsProps<typeof configsTooltip>>;
