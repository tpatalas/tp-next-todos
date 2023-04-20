import { Types } from '@lib/types';
import { RefObject } from 'react';

export type TypesPropsSmoothTransition = Pick<Types, 'children'> & {
  options?: Partial<
    Pick<Types, 'enterDuration' | 'leaveDuration' | 'show' | 'isInitiallyVisible'> & {
      triggerRate: number;
    }
  >;
} & Pick<TypesDataTransition, 'type'> &
  Partial<{ scrollRef: RefObject<HTMLElement> }>;

export type TypesDataTransition = {
  type: 'fadeOut' | 'scaleOutY' | 'scaleOutX';
} & Record<TypesTransitionProperties, string>;

type TypesTransitionProperties =
  | 'enter'
  | 'enterFrom'
  | 'enterTo'
  | 'leave'
  | 'leaveFrom'
  | 'leaveTo';
