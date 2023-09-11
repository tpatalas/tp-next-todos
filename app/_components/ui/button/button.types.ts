import { TypesEvents } from '@/_components/components.types';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TypesTooltip } from '@/tooltip/tooltip.types';

interface TypesButtonAttributes {
  buttonName: string;
  className: {
    button?: string;
  };
}

type TypesButtonBase<T> = Partial<{ configs: Partial<T>; children: ReactNode } & TypesEvents>;

type TypesButton = Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof TypesEvents | 'className'> &
  TypesButtonAttributes;

export type PropsButton = TypesButtonBase<TypesButton>;

export type PropsButtonWithTooltip = TypesButtonBase<TypesButton & TypesTooltip>;
