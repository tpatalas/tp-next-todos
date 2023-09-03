import { render } from '@testing-library/react';
import { Tooltip } from '..';
import { screen } from '@testing-library/react';
import { PropsTooltip } from '../tooltip.types';

describe('Tooltip', () => {
  const renderWithTooltip = ({ configs, children }: PropsTooltip) =>
    render(<Tooltip configs={configs}>{children}</Tooltip>);

  it('should render the children props and tooltip text', async () => {
    const { container } = renderWithTooltip({
      configs: { visible: true, tooltip: 'tooltip' },
      children: <div>Tooltip-test</div>,
    });
    const childrenElement = screen.getByText('Tooltip-test');
    const tooltipText = await screen.findByText('tooltip');

    expect(container).toBeInTheDocument();
    expect(childrenElement).toBeInTheDocument();
    expect(tooltipText).toBeInTheDocument();
  });
});
