import { ReactElement, ReactNode } from 'react';
import { TriggerType } from 'react-popper-tooltip';
import { Placement } from '@popperjs/core';
import { TypesClassNames } from '@/_components/components.types';

export interface TypesTooltips {
  tooltip: string | ReactElement | null;
  kbd: string;
  delayShow: number;
  trigger: TriggerType | TriggerType[] | null;
  offset: [number, number];
  placement: Placement;
  isVisible: boolean;
  isCloseOnTriggerHidden: boolean;
}

export type PropsTooltip = Partial<
  {
    options: Partial<TypesTooltips>;
  } & Pick<TypesClassNames, 'className'>
> & {
  children: ReactNode;
};
