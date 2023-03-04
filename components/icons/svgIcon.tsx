import { TypesOptionsSvg } from '@lib/types/typesOptions';
import { memo } from 'react';

type Props = { options: TypesOptionsSvg };

export const SvgIcon = memo(({ options }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden={options.isAriaHidden ?? true}
      height={options.height ?? '24'}
      width={options.width ?? '24'}
      viewBox={options.viewBox ?? '0 96 960 960'}
      className={options.className ?? 'h-5 w-5 fill-gray-500 hover:fill-gray-700'}>
      <path d={options.path} />
    </svg>
  );
});

SvgIcon.displayName = 'SvgIcon';
