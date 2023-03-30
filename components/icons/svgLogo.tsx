import { DATA_SVG_LOGOS } from '@collections/svgLogo';
import { VIEWBOX } from '@constAssertions/ui';
import { TypesSvgLogos } from '@lib/types';
import { memo } from 'react';

type Props = { type: TypesSvgLogos['name'] };

export const SvgLogo = memo(({ type }: Props) => {
  const svgData = DATA_SVG_LOGOS.find((svg) => svg.name === type) ?? ({} as TypesSvgLogos);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden={svgData.isAriaHidden}
      height={svgData.height ?? '24'}
      width={svgData.width ?? '24'}
      viewBox={svgData.viewBox ?? VIEWBOX['24']}>
      {svgData.path}
    </svg>
  );
});

SvgLogo.displayName = 'SvgLogo';
