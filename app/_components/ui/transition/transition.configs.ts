import { createConfigs } from '@/_lib/utils/configs.utils';

const transitionDuration = {
  '75': 'duration-75',
  '100': 'duration-100',
  '150': 'duration-150',
  '200': 'duration-200',
  '300': 'duration-300',
  '500': 'duration-500',
  '700': 'duration-700',
  '1000': 'duration-1000',
};

export const configsTransition = createConfigs({
  options: {
    appear: {
      show: true,
      hide: false,
    },
    type: {
      fadeIn: 'fadeIn',
      scaleX: 'scaleX',
      scaleY: 'scaleY',
      scaleCenterFull: 'scaleCenterFull',
      scaleCenterSm: 'scaleCenterSm',
      translateDown: 'translateDown',
      translateUp: 'translateUp',
    },
    enterDuration: transitionDuration,
    leaveDuration: transitionDuration,
    delay: {
      '75': 'delay-75',
      '100': 'delay-100',
      '150': 'delay-150',
      '200': 'delay-200',
      '300': 'delay-300',
      '500': 'delay-500',
      '700': 'delay-700',
      '1000': 'delay-1000',
    },
    rate: {
      '0.5': 0.5,
      '0.75': 0.75,
      '1.0': 1.0,
      '1.5': 1.5,
      '2.0': 2.0,
      '3.0': 3.0,
      '4.0': 4.0,
      '5.0': 5.0,
    },
  },
  presetOptions: {
    translateDown: { type: 'translateDown', enterDuration: '1000' },
    fadeIn: { type: 'fadeIn', enterDuration: '1000' },
    scaleCenterSm: { type: 'scaleCenterSm', enterDuration: '700' },
  },
  defaultOptions: {
    appear: 'show',
    type: 'fadeIn',
    enterDuration: '500',
    leaveDuration: '500',
  },
});
