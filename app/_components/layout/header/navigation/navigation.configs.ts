import { createConfigs } from '@/_lib/utils/configs.utils';
import { configsTooltip } from '@/tooltip/tooltip.configs';

export const configsDemo = createConfigs({
  options: {
    tooltip: {
      demo: 'Go to demo',
    },
  },
  extendOptions: [configsTooltip()],
  defaultOptions: {},
});
