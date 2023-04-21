import { DELAY } from '@constAssertions/ui';
import { Types } from '@lib/types';
import { RefObject } from 'react';

export type TypesPropsSmoothTransition = Pick<Types, 'children'> & {
  options?: Partial<
    Pick<Types, 'enterDuration' | 'leaveDuration'> & {
      rate: number;
      type: TRANSITION_TYPE;
      delay: DELAY;
    } & Record<TypesTransitionShow, boolean>
  >;
} & Partial<{ scrollRef: RefObject<HTMLElement> }>;

export type TypesDataTransition = Record<TypesTransitionProperties, string> & {
  type: TRANSITION_TYPE;
};

export type TRANSITION_TYPE = (typeof TRANSITION_TYPE)[keyof typeof TRANSITION_TYPE];
export const TRANSITION_TYPE = {
  fadeIn: 'fadeIn',
  scaleX: 'scaleX',
  scaleY: 'scaleY',
  scaleAll: 'scaleAll',
} as const;

type TypesTransitionShow = 'show' | 'appear';

type TypesTransitionProperties =
  | 'enter'
  | 'enterFrom'
  | 'enterTo'
  | 'leave'
  | 'leaveFrom'
  | 'leaveTo';
