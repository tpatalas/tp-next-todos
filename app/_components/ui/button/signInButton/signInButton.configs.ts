import { createConfigs } from '@/_lib/utils/configs.utils';
import { styleButton } from '../button.styles';
import { configsButton } from '../button.configs';
import { configsTooltip } from '@/tooltip/tooltip.configs';

export const configsSignInButton = createConfigs({
  options: {
    buttonName: {
      signIn: 'Sign in',
      getStarted: 'Get started',
    },
    tooltip: {
      signIn: 'Sign in',
      getStarted: 'Go to sign in',
    },
    className: {
      all: {
        button: styleButton({ className: 'max-ml:mb-3' }),
      },
    },
    visible: {
      show: true,
      hide: false,
    },
  },
  extendOptions: [configsButton(), configsTooltip()],
  presetOptions: {
    signIn: {
      buttonName: 'signIn',
      tooltip: 'signIn',
    },
    getStarted: {
      buttonName: 'getStarted',
      tooltip: 'getStarted',
    },
  },
  defaultOptions: {
    buttonName: 'signIn',
    className: 'all',
  },
});
