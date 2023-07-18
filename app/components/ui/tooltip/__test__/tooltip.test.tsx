import { render } from '@testing-library/react';
import { Tooltip } from '..';
import { screen } from '@testing-library/react';
import { PropsTooltip } from '../tooltip.types';

describe('Tooltip', () => {
  const renderWithTooltip = ({ options, children }: PropsTooltip) =>
    render(<Tooltip options={options}>{children}</Tooltip>);

  it('should render the children props and tooltip text', () => {
    const { container } = renderWithTooltip({
      options: { isVisible: true, tooltip: 'tooltip' },
      children: <div>Tooltip-test</div>,
    });
    const childrenElement = screen.getByText('Tooltip-test');
    const tooltipText = screen.getByText('tooltip');

    expect(container).toBeInTheDocument();
    expect(childrenElement).toBeInTheDocument();
    expect(tooltipText).toBeInTheDocument();
  });
});
