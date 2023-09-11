import { createConfigs } from '@/_lib/utils/configs.utils';
import { styleButton } from './button.styles';
import { configsTooltip } from '@/tooltip/tooltip.configs';

export const configsButton = createConfigs({
  options: {
    buttonName: {
      signIn: 'Sign in',
      getStarted: 'Get started',
    },
    classNameButton: {
      signIn: styleButton({ className: 'max-ml:mb-3' }),
    },
    ariaLabel: {},
    type: {
      button: 'button',
      submit: 'submit',
      reset: 'reset',
    },
    disabled: {
      on: true,
      off: false,
    },
  },
  extendOptions: [configsTooltip({ delayHide: '500' })],
  presetOptions: {
    signInGetStarted: {
      buttonName: 'getStarted',
      classNameButton: 'signIn',
    },
  },
  defaultOptions: {
    buttonName: 'signIn',
    classNameButton: 'signIn',
    type: 'button',
  },
});
