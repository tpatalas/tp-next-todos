import { createConfigs } from '@/_lib/utils/configs.utils';

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
    isVisible: {
      active: true,
      inactive: false,
    },
  },
  presetOptions: {
    getStarted: {
      buttonName: 'getStarted',
      tooltip: 'getStarted',
    },
  },
  defaultOptions: {
    buttonName: 'signIn',
    tooltip: 'signIn',
  },
});
