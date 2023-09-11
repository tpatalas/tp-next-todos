import { fireEvent, render } from '@testing-library/react';
import { ButtonWithTooltip } from '..';
import { screen } from '@testing-library/react';
import { PropsButtonWithTooltip } from '@/button/button.types';

const mockOnClick = jest.fn();
const mockButtonElement = 'Test button element';

describe('ButtonWithTooltip', () => {
  const renderWithButtonWithTooltip = ({ configs = {} }: Partial<PropsButtonWithTooltip> = {}) =>
    render(
      <ButtonWithTooltip
        configs={configs}
        onClick={mockOnClick}
      >
        {mockButtonElement}
      </ButtonWithTooltip>,
    );

  it('should render button element and tooltip element', () => {
    const { container } = renderWithButtonWithTooltip();
    const buttonElement = screen.getByText(mockButtonElement);

    expect(container).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should call function when button is clicked', () => {
    renderWithButtonWithTooltip();

    const buttonElement = screen.getByText(mockButtonElement);

    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should render the tooltip text', async () => {
    renderWithButtonWithTooltip({ configs: { visible: true, tooltip: 'button-tooltip-test' } });
    const tooltipText = await screen.findByText('button-tooltip-test');

    expect(tooltipText).toBeInTheDocument();
  });
});
