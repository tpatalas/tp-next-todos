import { createConfigs } from '@/_lib/utils/configs.utils';
import { styleSvgIcon } from './svgIcon.styles';
import {
  svgLogoPathsGithubLogo,
  svgLogoPathsGoogleLogo,
  svgLogoPathsMainLogoFull,
  svgLogoPathsMainLogoOnly,
} from './svgIcon.consts';

/**
 * svgIcon
 * */

export const configsSvgIcon = createConfigs({
  options: {
    height: {
      base: '24',
      md: '32',
      lg: '48',
    },
    width: {
      base: '24',
      md: '32',
      lg: '48',
    },
    viewBox: {
      base: '0 0 24 24',
      md: '0 0 32 32',
      lg: '0 0 48 48',
    },
    className: {
      base: {
        svgIcon: styleSvgIcon(),
      },
      group: {
        groupButton: styleSvgIcon({ hover: 'groupButton' }),
      },
      noHover: {
        svgIcon: styleSvgIcon({ hover: null }),
      },
    },
  },
  defaultOptions: {
    height: 'base',
    width: 'base',
    viewBox: 'base',
    className: 'base',
  },
});

/**
 * svgIcon Logo
 * */

export const configsSvgIconLogo = createConfigs({
  options: {
    height: {
      logoFull: '47',
      logoOnly: '80',
      google: '32',
      github: '24',
    },
    width: {
      logoFull: '140',
      logoOnly: '80',
      google: '32',
      github: '24',
    },
    viewBox: {
      logoFull: '0 0 140 44',
      logoOnly: '0 0 80 80',
      google: '0 0 32 32',
      github: '0 0 24 24 ',
    },
    className: {
      base: {
        google:
          'tracking-wide flex w-full flex-row items-center justify-center rounded-lg border border-slate-150 p-2 shadow-md shadow-slate-300 text-slate-800 transition-all hover:shadow-lg',
        github:
          'flex w-full tracking-wide flex-row items-center justify-center rounded-lg border border-slate-800 p-2 bg-gray-800 shadow-lg shadow-slate-500 hover:shadow-slate-600 transition-all text-white',
      },
    },
    path: {
      logoFull: svgLogoPathsMainLogoFull,
      logoOnly: svgLogoPathsMainLogoOnly,
      google: svgLogoPathsGoogleLogo,
      github: svgLogoPathsGithubLogo,
    },
    desc: {
      logoFull: 'Main logo full',
      logoOnly: 'Main logo only',
      google: 'Google Logo',
      github: 'GitHub Logo',
    },
  },
  presetOptions: {
    logoFull: {
      height: 'logoFull',
      width: 'logoFull',
      viewBox: 'logoFull',
      path: 'logoFull',
      desc: 'logoFull',
    },
    logoOnly: {
      height: 'logoOnly',
      width: 'logoOnly',
      viewBox: 'logoOnly',
      path: 'logoOnly',
      desc: 'logoOnly',
    },
    google: {
      height: 'google',
      width: 'google',
      viewBox: 'google',
      path: 'google',
      desc: 'google',
      className: 'base',
    },
    github: {
      height: 'github',
      width: 'github',
      viewBox: 'github',
      path: 'github',
      desc: 'github',
      className: 'base',
    },
  },
  defaultOptions: {
    height: 'logoFull',
    width: 'logoFull',
    viewBox: 'logoFull',
    path: 'logoFull',
    desc: 'logoFull',
  },
});
