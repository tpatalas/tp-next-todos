import { TypesClassNames, TypesAttributes, TypesEvents } from '@/components/components.types';
import { TypesTooltips } from '@/tooltip/tooltip.types';
import { ReactNode } from 'react';

export interface TypesButtons {
  isDisabled: boolean;
  name: string;
  type: 'button' | 'submit' | 'reset';
}

export type PropsButton = Partial<
  {
    options: Partial<
      TypesButtons &
        TypesClassNames &
        TypesAttributes &
        Pick<TypesTooltips, 'tooltip' | 'kbd' | 'offset' | 'placement'>
    >;
  } & TypesEvents & {
      children: ReactNode;
    }
>;
