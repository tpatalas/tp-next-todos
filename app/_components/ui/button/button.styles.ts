import { cva } from 'class-variance-authority';

export const styleButton = cva(
  'transition-all inline-flex items-center justify-center tracking-wide rounded-lg h-10 p-2 border leading-4 shadow-md',
  {
    variants: {
      size: {
        small: 'px-2 text-sm',
        medium: 'px-4 text-base',
        large: 'px-14 text-base',
        full: 'text-base',
      },
      color: {
        blue: 'border-transparent bg-blue-600 text-white hover:enabled:shadow-blue-300 hover:enabled:bg-blue-700 shadow-blue-100 hover:shadow-blue-200 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-70',
        black:
          'border-transparent bg-gray-800 text-white hover:enabled:shadow-gray-400 shadow-gray-100 hover:shadow-gray-200 focus-visible:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-70',
        white:
          'border-gray-300 bg-slate-50 text-gray-600 hover:enabled:bg-gray-100 shadow-slate-100 hover:shadow-slate-200 hover:enabled:text-gray-800 focus-visible:ring-blue-500 disabled:opacity-70',
        red: 'border-transparent bg-red-600 text-white hover:enabled:shadow-red-300 hover:enabled:bg-red-700 shadow-red-100 hover:shadow-red-200 focus-visible:ring-red-500 disabled:opacity-70',
        gray: 'border-transparent bg-gray-200 text-black hover:enabled:shadow-gray-300 hover:enabled:bg-gray-300 shadow-gray-100 hover:shadow-gray-200 focus-visible:ring-gray-500 disabled:opacity-70',
      },
      ring: {
        all: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        keyOnly:
          'focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      },
    },
    defaultVariants: {
      size: 'medium',
      color: 'blue',
      ring: 'all',
    },
  },
);
