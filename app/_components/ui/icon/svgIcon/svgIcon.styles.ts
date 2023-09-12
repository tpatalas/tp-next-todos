import { cva } from 'class-variance-authority';

export const styleSvgIcon = cva([], {
  variants: {
    size: {
      base: 'h-5 w-5',
    },
    color: {
      base: 'fill-gray-500',
    },
    hover: {
      base: 'hover:fill-gray-700',
      groupButton: '[.group-button:hover_&]:fill-gray-700',
    },
  },
  defaultVariants: {
    size: 'base',
    color: 'base',
    hover: 'base',
  },
});
