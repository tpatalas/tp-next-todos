import { ReactNode, RefObject } from 'react';
import {
  TypesTransitionShow,
  TypesTransitionDuration,
  TypesTransitionTypes,
  TypesTransitionProperties,
  TypesTransitionDelay,
} from '../transition.types';

export type PropsSmoothTransition = {
  children: ReactNode;
  options?: Partial<
    Record<TypesTransitionShow, boolean> & {
      enterDuration: TypesTransitionDuration;
      leaveDuration: TypesTransitionDuration;
      rate: number;
      type: TypesTransitionTypes;
      delay: TypesTransitionDelay;
    }
  >;
} & Partial<{ scrollRef: RefObject<HTMLElement> }>;

export type TypesDataTransition = Record<TypesTransitionProperties, string> & {
  type: TypesTransitionTypes;
};
