import { fireEvent, render } from '@testing-library/react';
import { ButtonWithTooltip } from '..';
import { screen } from '@testing-library/react';

const mockOnClick = jest.fn();
const mockButtonElement = 'Test button element';

describe('ButtonWithTooltip', () => {
  const renderWithButtonWithTooltip = () =>
    render(<ButtonWithTooltip onClick={mockOnClick}>{mockButtonElement}</ButtonWithTooltip>);

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
});
