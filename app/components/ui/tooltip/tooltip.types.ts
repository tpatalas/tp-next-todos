import { ReactElement, ReactNode } from 'react';
import { TriggerType } from 'react-popper-tooltip';
import { Placement } from '@popperjs/core';

export interface TypesTooltips {
  tooltip: string | ReactElement | null;
  kbd: string;
  delayShow: number;
  trigger: TriggerType | TriggerType[] | null;
  offset: [number, number];
  placement: Placement;
  isVisible: boolean;
  isCloseOnTriggerHidden: boolean;
  container: string;
}

export type PropsTooltip = { options?: Partial<TypesTooltips> } & {
  children: ReactNode;
};
