import { VIEWBOX } from '@icon/icon.const';
import { TypesPropsOptionsSvg } from '@icon/icon.types';
import { memo } from 'react';

export const SvgIcon = memo(({ options = {} }: TypesPropsOptionsSvg) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden={options.isAriaHidden ?? true}
      height={options.height ?? '24'}
      width={options.width ?? '24'}
      viewBox={options.viewBox ?? VIEWBOX['24']}
      className={options.className ?? 'h-5 w-5 fill-gray-500 hover:fill-gray-700'}
      data-testid='svgIcon-testid'
    >
      <path d={options.path} />
    </svg>
  );
});

SvgIcon.displayName = 'SvgIcon';
