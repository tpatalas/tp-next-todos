module.exports = {
  mode: 'jit',
  // 1.4.1 Purge
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './util/**/*.{js,ts,jsx,tsx}',
    './models/**/*.{js,ts,jsx,tsx}',
  ],
  //1.4.2 DarkMode
  darkMode: 'class', // or 'media' or 'class' or false
  theme: {
    screens: {
      // => @media (min-width: 640px) { ... }
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1792px',
      '4xl': '2048px',
      '5xl': '2304px',
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
        '2lg': '34rem',
      },
      width: {
        4.5: '1.125rem',
      },
      backdropBlur: {
        '2xs': '2px',
        '3xs': '1px',
        '4xs': '0.04em',
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
    require('@tailwindcss/line-clamp'),
    require('@headlessui/tailwindcss'),
  ],
};
