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

/**
 * svgIcon Social Icon
 * */

export const configsSvgIconSocial = createConfigs({
  options: {
    name: {
      gitHub: 'GitHub',
    },
    link: {
      gitHub: process.env.NEXT_PUBLIC_SOCIAL_GITHUB,
    },
    className: {
      default: {
        svgIcon: 'w-6 h-6 fill-gray-400 group-hover:fill-gray-700',
      },
    },
    path: {
      gitHub:
        'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    },
    desc: {
      gitHub: 'GitHub Social Icon',
    },
  },
  extendOptions: [configsSvgIcon()],
  presetOptions: {
    gitHub: {
      name: 'gitHub',
      link: 'gitHub',
      className: 'default',
      path: 'gitHub',
      desc: 'gitHub',
    },
  },
  defaultOptions: {},
});
