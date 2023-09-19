import { render, screen } from '@testing-library/react';
import { DividerY } from '..';
import { PropsDividerY } from '../../divider.types';
import { styleDividerY } from '../../divider.styles';

describe('DividerY', () => {
  const renderWithDividerY = ({ style }: PropsDividerY) => render(<DividerY style={style} />);

  it('should render the style props properly', () => {
    renderWithDividerY({ style: styleDividerY({ type: 'primary', color: 'primary' }) });

    const dividerYComponent = screen.getByTestId('dividerY-testid');

    expect(dividerYComponent).toBeInTheDocument();
    expect(dividerYComponent).toHaveClass(styleDividerY({ type: 'primary', color: 'primary' }));
  });
});
