import { render, screen } from '@testing-library/react';
import { DividerX } from '..';
import { styleDividerX } from '../../divider.styles';
import { PropsDividerX } from '../../divider.types';

describe('DividerX', () => {
  const renderWithDividerX = ({ children, style }: PropsDividerX) =>
    render(<DividerX style={style}>{children}</DividerX>);
  const childElement = 'test-childElement';

  it('should render the props correctly when the value of props have been passed into', () => {
    renderWithDividerX({ children: childElement, style: styleDividerX({ width: 'full' }) });

    const dividerWithChildElement = screen.getByText(childElement);
    const dividerXComponent = screen.getByTestId('dividerX-testid');

    expect(dividerWithChildElement).toBeInTheDocument();
    expect(dividerXComponent).toHaveClass(styleDividerX({ width: 'full' }));
  });
});
