import { TypesDataSvg } from '@lib/types/typesData';
import { memo } from 'react';

type Props = { data: TypesDataSvg };

export const SvgIcon = memo(
  ({
    data: {
      height = '24',
      width = '24',
      viewBox = '0 0 24 24',
      isAriaHidden = true,
      className = 'h-5 w-5 fill-gray-500 hover:fill-gray-700',
      path,
    },
  }: Props) => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden={isAriaHidden}
        height={height}
        width={width}
        viewBox={viewBox}
        className={className}>
        <path d={path} />
      </svg>
    );
  },
);

SvgIcon.displayName = 'SvgIcon';
