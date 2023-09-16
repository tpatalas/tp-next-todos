import { createConfigs } from '@/_lib/utils/configs.utils';

export const configsHeaderWrapper = createConfigs({
  options: {
    className: {
      base: {
        default: 'sticky top-0 w-full z-50 bg-slate-50',
        homeSidebarClose: 'bg-opacity-60 backdrop-blur-lg',
      },
    },
  },
  defaultOptions: {
    className: 'base',
  },
});
