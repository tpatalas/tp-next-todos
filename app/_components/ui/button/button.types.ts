import { TypesEvents, TypesStyles } from '@/_components/components.types';
import { ConfigsProps } from '@/_lib/utils/configs.utils';
import { ReactNode } from 'react';
import { configsButton } from './button.configs';
import { configsTooltip } from '@/tooltip/tooltip.configs';

type TypesButtonBase<T> = Partial<
  { configs: Partial<T>; children: ReactNode } & TypesEvents & Pick<TypesStyles, 'className'>
>;

export type PropsButton = TypesButtonBase<ConfigsProps<typeof configsButton>>;

export type PropsButtonWithTooltip = Partial<
  TypesEvents & {
    configsButton: Partial<ConfigsProps<typeof configsButton>>;
    configsTooltip: Partial<ConfigsProps<typeof configsTooltip>>;
    children: ReactNode;
  }
>;
