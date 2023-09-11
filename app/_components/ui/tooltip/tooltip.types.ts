import { ReactElement, ReactNode } from 'react';
import { TriggerType } from 'react-popper-tooltip';
import { Placement } from '@popperjs/core';

interface TypesTooltipAttributes {
  tooltip: string | ReactElement | null;
  kbd: string;
  delayShow: number;
  delayHide: number;
  trigger: TriggerType | TriggerType[] | null;
  offset: [number, number];
  placement: Placement;
  visible: boolean;
  closeOnOutsideClick: boolean;
  defaultVisible: boolean;
  followCursor: boolean;
}

type TypesTooltipBase<T> = Partial<{ configs: Partial<T> }> & { children: ReactNode };

export type TypesTooltip = TypesTooltipAttributes & {
  className: {
    tooltip?: HTMLElement['className'];
    kbd?: HTMLElement['className'];
  };
};

export type PropsTooltip = TypesTooltipBase<TypesTooltip>;
