import { PATH_IMAGE } from '@/_lib/consts/assertion.consts';
import { createConfigs } from '@/_lib/utils/configs.utils';

export const configsImageWithRemotePlaceholder = createConfigs({
  options: {
    src: {
      demo: PATH_IMAGE['demo'],
      contentFocus: PATH_IMAGE['contentFocus'],
      contentOrganize: PATH_IMAGE['contentOrganize'],
    },
    width: {
      demo: 961,
      contentFocus: 504,
      contentOrganize: 494,
    },
    height: {
      demo: 754,
      contentFocus: 689,
      contentOrganize: 650,
    },
    className: {
      demo: 'h-auto rounded-2xl ring-2 ring-slate-300/20 drop-shadow-2xl will-change-transform',
      contents: 'h-auto w-full rounded-xl drop-shadow-2xl',
    },
    alt: {
      demo: 'demo application image',
      contentFocus: 'content focus image',
      contentOrganize: 'content organize image',
    },
    sizes: {
      contents: '(max-width: 748px) 70vw, 33vw',
      '50vw': '50vw',
      '90vw': '90vw',
      '100vw': '100vw',
    },
    placeholder: {
      blur: 'blur',
      empty: 'empty',
    },
    priority: {
      on: true,
      off: false,
    },
    quality: {
      '50%': 50,
      '75%': 75,
      '100%': 100,
    },
    fill: {
      on: true,
      off: false,
    },
    style: {
      base: undefined,
    },
    loading: {
      eager: 'eager',
      lazy: 'lazy',
    },
  },
  presetOptions: {
    demo: {
      src: 'demo',
      width: 'demo',
      height: 'demo',
      className: 'demo',
      alt: 'demo',
      sizes: '90vw',
    },
    spotlight: {
      src: 'contentFocus',
      width: 'contentFocus',
      height: 'contentFocus',
      alt: 'contentFocus',
      className: 'contents',
      sizes: 'contents',
    },
    overload: {
      src: 'contentOrganize',
      width: 'contentOrganize',
      height: 'contentOrganize',
      alt: 'contentOrganize',
      className: 'contents',
      sizes: 'contents',
    },
  },
  defaultOptions: {
    priority: 'on',
    sizes: '100vw',
    placeholder: 'blur',
  },
});
