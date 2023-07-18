import { fireEvent, render } from '@testing-library/react';
import { Button } from '..';
import { screen } from '@testing-library/react';

const mockOnClick = jest.fn();

describe('Button', () => {
  const renderWithButton = () => render(<Button onClick={mockOnClick}>Test button</Button>);

  it('should render the child element', () => {
    const { container } = renderWithButton();
    const renderChildElement = screen.getByText('Test button');

    expect(container).toBeInTheDocument();
    expect(renderChildElement).toBeInTheDocument();
  });

  it('should call the mockOnClick function onClick', () => {
    renderWithButton();
    const renderButtonElement = screen.getByText('Test button');

    fireEvent.click(renderButtonElement);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
