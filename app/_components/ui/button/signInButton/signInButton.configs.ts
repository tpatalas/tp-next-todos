import { createConfigs } from '@/_lib/utils/configs.utils';
import { styleButton } from '../button.styles';

export const configsSignInButton = createConfigs({
  options: {
    buttonName: {
      signIn: 'Sign in',
      getStarted: 'Get started',
    },
    className: {
      signIn: styleButton({ className: 'max-ml:mb-3' }),
    },
    tooltip: {
      signIn: 'Sign in',
      getStarted: 'Go to sign in',
    },
    isVisible: {
      active: true,
      inactive: false,
    },
  },
  presetOptions: {
    getStarted: {
      buttonName: 'getStarted',
      className: 'signIn',
      tooltip: 'getStarted',
    },
  },
  defaultOptions: {
    buttonName: 'signIn',
    className: 'signIn',
    tooltip: 'signIn',
  },
});
