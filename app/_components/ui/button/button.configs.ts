import { createConfigs } from '@/_lib/utils/configs.utils';

export const configsButton = createConfigs({
  options: {
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
  defaultOptions: {
    type: 'button',
  },
});
