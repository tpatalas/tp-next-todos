import { TypesPropsOptionsSvg } from '@icon/icon.types';
import { render, screen } from '@testing-library/react';
import { SvgIcon } from '..';

jest.mock('..', () => ({
  SvgIcon: ({ options = {} }: TypesPropsOptionsSvg) => (
    <svg
      data-testid='svg-testid'
      className={options.className}
    >
      <path
        data-testid='svg-path-testid'
        d={options.path}
      />
    </svg>
  ),
}));

describe('SvgIcon', () => {
  const renderSvgIcon = ({ options }: TypesPropsOptionsSvg) => render(<SvgIcon options={options} />);

  it('should render component without props', () => {
    const { container } = renderSvgIcon({});
    const svgIcon = screen.getByTestId('svg-testid');

    expect(container).toBeInTheDocument();
    expect(svgIcon).toBeInTheDocument();
  });

  it('should render component with props', () => {
    const ICON_LABEL_FILL =
      'm21 12-4.35 6.15q-.275.4-.712.625Q15.5 19 15 19H5q-.825 0-1.413-.587Q3 17.825 3 17V7q0-.825.587-1.412Q4.175 5 5 5h10q.5 0 .938.225.437.225.712.625Z';
    const classExample = 'h-5 w-5 fill-yellow-500';
    const mockedOption = {
      path: ICON_LABEL_FILL,
      className: classExample,
    };
    const { container } = renderSvgIcon({ options: mockedOption });
    const svgIcon = screen.getByTestId('svg-testid');
    const svgIconPath = screen.getByTestId('svg-path-testid');

    expect(container).toBeInTheDocument();
    expect(svgIcon).toHaveClass(classExample);
    expect(svgIconPath).toHaveAttribute('d', ICON_LABEL_FILL);
  });
});
