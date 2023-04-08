import type { Config } from 'tailwindcss';

export default {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './util/**/*.{js,ts,jsx,tsx}',
    './models/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class' or false

  theme: {
    screens: {
      // => @media (min-width: 640px) { ... }
      '3xs': '256px',
      '2xs': '384px',
      xs: '512px',
      sm: '640px',
      md: '768px',
      ml: '896px',
      lg: '1024px',
      xl: '1280px',
    },
    scale: {
      '-1': '-1', // allows icon flip such as '-scale-y-1'
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'RobotoDraft', 'Helvetica', 'Arial', 'sans-serif'],
        // classNames="font-roboto"
      },
      fontSize: {
        xxs: [
          '11px',
          {
            lineHeight: '15px',
          },
        ],
        smm: [
          '13px',
          {
            lineHeight: '18px',
          },
        ],
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        glow: 'glow 8s ease-in-out infinite',
      },
      opacity: {
        65: '0.65',
      },
      height: {
        4.5: '1.125rem',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
      },
      maxWidth: {
        '5xs': '12rem',
        '4xs': '14rem',
        '3xs': '16rem',
        '2xs': '18rem',
        '2lg': '34rem',
      },
      width: {
        4.5: '1.125rem',
      },
      backdropBlur: {
        '4xs': '0.04em',
        '3xs': '1px',
        '2xs': '2px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@headlessui/tailwindcss'),
  ],
} satisfies Config;
