import { TypesAttributes, TypesEvents, TypesStyles } from '@/_components/components.types';
import { ConfigsProps } from '@/_lib/utils/configs.utils';
import { TypesTooltips } from '@/tooltip/tooltip.types';
import { ReactNode } from 'react';
import { configsSignInButton } from './button.configs';

export interface TypesButtons {
  isDisabled: boolean;
  name: string;
  type: 'button' | 'submit';
  signInButtonName: 'Sign in' | 'Get started';
}

type TypesOptionsButton = TypesButtons & TypesAttributes & Pick<TypesStyles, 'className'>;

export type TypesConfigsButtonWithTooltip = TypesOptionsButton &
  Pick<TypesTooltips, 'tooltip' | 'kbd' | 'offset' | 'placement' | 'isVisible'>;

type TypesButtonBase<T> = Partial<
  {
    configs: Partial<T>;
    children: ReactNode;
  } & TypesEvents
>;

export type PropsButton = TypesButtonBase<TypesOptionsButton>;

export type PropsButtonWithTooltip = TypesButtonBase<TypesConfigsButtonWithTooltip>;

export type PropsSignInButton = TypesButtonBase<ConfigsProps<typeof configsSignInButton>>;
