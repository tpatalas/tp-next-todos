import { createConfigs } from '@/_lib/utils/configs.utils';

const delayProperty = {
  '50': 50,
  '150': 150,
  '300': 300,
  '500': 500,
};

export const configsTooltip = createConfigs({
  options: {
    className: {
      all: {
        tooltip:
          'z-50 max-w-[15rem] truncate whitespace-nowrap rounded-lg bg-gray-700 p-2 text-xs text-white opacity-90',
        kbd: 'ml-2 h-6 rounded border-x border-y py-px px-1.5 font-sans tracking-normal subpixel-antialiased',
      },
    },
    trigger: {
      hover: 'hover',
      click: 'click',
      rightClick: 'right-click',
      focus: 'focus',
    },
    placement: {
      auto: 'auto',
      autoStart: 'auto-start',
      autoEnd: 'auto-end',
      top: 'top',
      topStart: 'top-start',
      topEnd: 'top-end',
      bottom: 'bottom',
      bottomStart: 'bottom-start',
      bottomEnd: 'bottom-end',
      right: 'right',
      rightStart: 'right-start',
      rightEnd: 'right-end',
      left: 'left',
      leftStart: 'left-start',
      leftEnd: 'left-end',
    },
    offset: {
      base: [0, 25],
    },
    visible: {
      show: true,
      hide: false,
    },
    defaultVisible: {
      show: true,
      hide: false,
    },
    followCursor: {
      on: true,
      off: false,
    },
    closeOnOutsideClick: {
      on: true,
      off: false,
    },
    closeOnTriggerHidden: {
      on: true,
      off: false,
    },
    delayShow: delayProperty,
    delayHide: delayProperty,
  },
  defaultOptions: {
    trigger: 'hover',
    placement: 'bottom',
    offset: 'base',
    delayShow: '50',
    delayHide: '50',
    className: 'all',
  },
});
