import { PropsSvgIcon } from '../icon.types';

export const SvgIcon = ({ configs }: PropsSvgIcon) => {
  const { height, width, viewBox, path, desc, className } = configs;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={height}
      width={width}
      viewBox={viewBox}
      className={className?.svgIcon}
    >
      {!!desc && <desc>{desc}</desc>}
      {typeof path === 'string' ? <path d={path} /> : path}
    </svg>
  );
};
