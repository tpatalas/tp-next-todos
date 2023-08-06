import { TRANSITION_TYPE, DURATION, DELAY } from './transition.consts';

export type TypesTransitionTypes =
  | 'fadeIn'
  | 'scaleX'
  | 'scaleY'
  | 'scaleCenterFull'
  | 'scaleCenterSm'
  | 'translateDown'
  | 'translateUp';

export type TypesTransitionShow = 'show' | 'appear';

export type TypesTransitionProperties = 'enter' | 'enterFrom' | 'enterTo' | 'leave' | 'leaveFrom' | 'leaveTo';

export type PropsTransitionConfigs = {
  transition: keyof typeof TRANSITION_TYPE;
  duration?: keyof typeof DURATION;
  delay?: keyof typeof DELAY;
  rate?: number;
};

export type TypesTransitionDuration =
  | 'duration-75'
  | 'duration-100'
  | 'duration-150'
  | 'duration-200'
  | 'duration-300'
  | 'duration-500'
  | 'duration-700'
  | 'duration-1000';

export type TypesTransitionDelay =
  | 'delay-75'
  | 'delay-100'
  | 'delay-150'
  | 'delay-200'
  | 'delay-300'
  | 'delay-500'
  | 'delay-700'
  | 'delay-1000';
