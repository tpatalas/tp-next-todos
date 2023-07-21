export type TRANSITION_TYPE = (typeof TRANSITION_TYPE)[keyof typeof TRANSITION_TYPE];
export const TRANSITION_TYPE = {
  fadeIn: 'fadeIn',
  scaleX: 'scaleX',
  scaleY: 'scaleY',
  scaleCenterFull: 'scaleCenterFull',
  scaleCenterSm: 'scaleCenterSm',
  translateDown: 'translateDown',
  translateUp: 'translateUp',
} as const;

export type DURATION = (typeof DURATION)[keyof typeof DURATION];
export const DURATION = {
  75: 'duration-75',
  100: 'duration-100',
  150: 'duration-150',
  200: 'duration-200',
  300: 'duration-300',
  500: 'duration-500',
  700: 'duration-700',
  1000: 'duration-1000',
} as const;

export type DELAY = (typeof DELAY)[keyof typeof DELAY];
export const DELAY = {
  75: 'delay-75',
  100: 'delay-100',
  150: 'delay-150',
  200: 'delay-200',
  300: 'delay-300',
  500: 'delay-500',
  700: 'delay-700',
  1000: 'delay-1000',
} as const;
