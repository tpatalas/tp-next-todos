import { createConfigs } from '@/_lib/utils/configs.utils';
import { transitionDelay, transitionDuration, transitionTypes, transitionRate } from './transition.consts';

export const configsTransition = createConfigs({
  options: {
    appear: {
      show: true,
      hide: false,
    },
    type: {
      fadeIn: transitionTypes.fadeIn,
      scaleY: transitionTypes.scaleY,
      scaleX: transitionTypes.scaleX,
      scaleCenterSm: transitionTypes.scaleCenterSm,
      scaleCenterFull: transitionTypes.scaleCenterFull,
      translateDown: transitionTypes.translateDown,
    },
    enterDuration: transitionDuration,
    leaveDuration: transitionDuration,
    delay: transitionDelay,
    rate: transitionRate,
  },
  presetOptions: {
    fadeIn: { type: 'fadeIn', enterDuration: '1000' },
    translateDown: { type: 'translateDown', enterDuration: '1000' },
    scaleCenterSm: { type: 'scaleCenterSm', enterDuration: '700' },
    scaleCenterFull: { type: 'scaleCenterFull' },
    scaleY: { type: 'scaleY' },
    scaleX: { type: 'scaleX' },
  },
  defaultOptions: {
    appear: 'show',
    type: 'fadeIn',
    enterDuration: '500',
    leaveDuration: '500',
  },
});
