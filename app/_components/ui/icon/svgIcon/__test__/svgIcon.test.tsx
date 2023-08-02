import { render, screen } from '@testing-library/react';
import { SvgIcon } from '..';

describe('SvgIcon', () => {
  it('should render the svgIcon component', () => {
    render(<SvgIcon />);
    const svgIconWithTestId = screen.getByTestId('svgIcon-testid');

    expect(svgIconWithTestId).toBeInTheDocument();
  });
});
