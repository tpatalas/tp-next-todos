import { VIEWBOX } from '../icon.consts';
import { PropsSvgIcon } from '../icon.types';

export const SvgIcon = ({ configs = {} }: PropsSvgIcon) => {
  const {
    isAriaHidden = true,
    height = '24',
    width = '24',
    viewBox = VIEWBOX['24'],
    className = 'h-5 w-5 fill-gray-500 hover:fill-gray-700',
    testId = 'svgIcon-testid',
  } = configs;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden={isAriaHidden}
      height={height}
      width={width}
      viewBox={viewBox}
      className={className}
      data-testid={testId}
    >
      <path d={configs.path} />
    </svg>
  );
};
