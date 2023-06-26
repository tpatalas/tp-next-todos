import { VIEWBOX } from '@icon/icon.const';
import { DATA_SVG_LOGOS } from '@icon/icon.data';
import { TypesPropsSvgLogoNames, TypesSvgLogos } from '@icon/icon.types';
import { memo } from 'react';

export const SvgLogo = memo(({ type }: TypesPropsSvgLogoNames) => {
  const svgData = DATA_SVG_LOGOS.find((svg) => svg.name === type) ?? ({} as TypesSvgLogos);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden={svgData.isAriaHidden}
      height={svgData.height ?? '24'}
      width={svgData.width ?? '24'}
      viewBox={svgData.viewBox ?? VIEWBOX['24']}
      data-testid={`${svgData.name}-testid`}
    >
      {svgData.path}
    </svg>
  );
});

SvgLogo.displayName = 'SvgLogo';
