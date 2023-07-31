import { TypesClassNames, TypesAttributes, TypesEvents } from '@/_components/components.types';
import { TypesTooltips } from '@/tooltip/tooltip.types';
import { ReactNode } from 'react';

export interface TypesButtons {
  isDisabled: boolean;
  name: string;
  type: 'button' | 'submit';
  signInButtonName: 'Sign in' | 'Get started';
}

type TypesOptionsButton = TypesButtons & TypesClassNames & TypesAttributes;

export type TypesOptionsButtonWithTooltip = TypesOptionsButton &
  Pick<TypesTooltips, 'tooltip' | 'kbd' | 'offset' | 'placement' | 'isVisible'>;

type TypesButtonBase<T> = Partial<
  {
    options: Partial<T>;
  } & TypesEvents & {
      children: ReactNode;
    }
>;

export type PropsButton = TypesButtonBase<TypesOptionsButton>;

export type PropsButtonWithTooltip = TypesButtonBase<TypesOptionsButtonWithTooltip>;
