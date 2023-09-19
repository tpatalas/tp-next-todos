import { cva } from 'class-variance-authority';

export const styleNextLink = cva(
  'block w-full rounded-lg transition-all max-ml:px-3 max-ml:py-3 ml:px-2 lg:px-3 ml:py-2',
  {
    variants: {
      intent: {
        primary: 'hover:bg-slate-900 hover:bg-opacity-10',
      },
      borderRadius: {
        full: 'rounded-full',
        large: 'rounded-lg',
      },
    },
    defaultVariants: {
      intent: 'primary',
      borderRadius: 'large',
    },
  },
);
