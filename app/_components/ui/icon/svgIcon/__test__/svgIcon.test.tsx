import { render, screen } from '@testing-library/react';
import { SvgIcon } from '..';
import { configsSvgIconLogo } from '../svgIcon.configs';

describe('SvgIcon', () => {
  it('should render the svgIcon component', () => {
    render(<SvgIcon configs={configsSvgIconLogo({ preset: 'logoFull' })} />);
    const svgIconWithTestId = screen.getByText('Main logo full');

    expect(svgIconWithTestId).toBeInTheDocument();
  });
});
