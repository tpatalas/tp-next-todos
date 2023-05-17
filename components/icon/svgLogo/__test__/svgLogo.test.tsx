import { render, screen } from '@testing-library/react';
import { SvgLogo } from '..';
import { TypesPropsSvgLogoNames, TypesSvgLogos } from '@icon/icon.types';
import { DATA_SVG_LOGOS } from '@icon/icon.data';

jest.mock('..', () => ({
  SvgLogo: ({ type }: TypesPropsSvgLogoNames) => {
    const svgData = DATA_SVG_LOGOS.find((svg) => svg.name === type) ?? ({} as TypesSvgLogos);

    return (
      <svg
        data-testid={svgData.name}
        className={svgData.className}
      />
    );
  },
}));

describe('SvgLogo', () => {
  const renderWithSvgLogo = ({ type }: TypesPropsSvgLogoNames) => render(<SvgLogo type={type} />);
  const allowedLogoTypes: TypesSvgLogos['name'][] = ['MainWhite', 'MainLogoOnlyWhite'];
  const disallowedLogoTypes: TypesSvgLogos['name'][] = ['Google', 'GitHub'];

  it('should render allowedLogoTypes with MainWhite', () => {
    const mockLogoType = allowedLogoTypes[0];
    const { container } = renderWithSvgLogo({ type: mockLogoType });
    const svgLogoComponent = screen.queryByTestId(mockLogoType);

    expect(container).toBeInTheDocument();
    expect(svgLogoComponent).toBeInTheDocument();
  });

  it('should render SvgLogo allowedLogoTypes with MainLogoOnlyWhite', () => {
    const mockLogoType = allowedLogoTypes[1];
    const { container } = renderWithSvgLogo({ type: mockLogoType });
    const svgLogoComponent = screen.queryByTestId(mockLogoType);

    expect(container).toBeInTheDocument();
    expect(svgLogoComponent).toBeInTheDocument();
  });

  it('should NOT render disallowedLogoTypes with Google provider', () => {
    const mockLogoType = disallowedLogoTypes[0];
    const { container } = renderWithSvgLogo({ type: mockLogoType });
    const svgLogoComponent = screen.queryByTestId(mockLogoType);

    expect(container).toBeInTheDocument();
    expect(svgLogoComponent).not.toBeInTheDocument();
  });

  it('should NOT render disallowedLogoTypes with GitHub provider', () => {
    const mockLogoType = disallowedLogoTypes[1];
    const { container } = renderWithSvgLogo({ type: mockLogoType });
    const svgLogoComponent = screen.queryByTestId(mockLogoType);

    expect(container).toBeInTheDocument();
    expect(svgLogoComponent).not.toBeInTheDocument();
  });
});
