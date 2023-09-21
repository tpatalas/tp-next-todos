import { cva } from 'class-variance-authority';

export const styleDividerY = cva('grid w-4 grid-cols-2', {
  variants: {
    type: {
      primary: 'h-8/10 divide-x-2',
    },
    color: {
      primary: 'divide-slate-800/10',
    },
    hidden: {
      maxMd: 'max-md:hidden',
      minMd: 'md:hidden',
    },
  },
  defaultVariants: {
    type: 'primary',
    color: 'primary',
  },
});

export const styleDividerX = cva('border-t border-gray-300', {
  variants: {
    width: {
      full: 'w-full',
      xl: 'w-11/12',
      half: 'w-1/2',
    },
    hidden: {
      maxMd: 'max-md:hidden',
      minMd: 'md:hidden',
      minMl: 'ml:hidden',
    },
  },
  defaultVariants: {
    width: 'full',
  },
});
