import { render, screen } from '@testing-library/react';
import { SvgIcon } from '..';

describe('SvgIcon', () => {
  it('should render the svgIcon component', () => {
    render(<SvgIcon configs={{ desc: 'svgIcon-title' }} />);
    const svgIconWithTestId = screen.getByText('svgIcon-title');

    expect(svgIconWithTestId).toBeInTheDocument();
  });
});
