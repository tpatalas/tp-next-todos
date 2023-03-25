import { DATA_SVG_LOGO } from '@collections/svgLogo';
import { SVG_LOGO } from '@constAssertions/data';
import { TypesOptionsSvg } from '@lib/types/options';

type Props = { options: TypesOptionsSvg } & { svgLogo: SVG_LOGO };

export const SvgLogo = ({ svgLogo, options }: Props) => {
  const dataLogo = DATA_SVG_LOGO.filter((logo) => logo.name === svgLogo);
  return (
    <>
      {dataLogo.map((logo) => (
        <svg
          key={logo.name}
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden={true}
          height={options.height ?? '24'}
          width={options.width ?? '24'}
          viewBox={logo.viewBox}>
          {logo.path}
        </svg>
      ))}
    </>
  );
};
