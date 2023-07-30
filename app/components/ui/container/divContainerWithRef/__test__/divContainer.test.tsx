import { render } from '@testing-library/react';
import { DivContainerWithRef } from '..';
import { PropsDivContainer } from '../../container.types';
import { screen } from '@testing-library/react';

describe('DivContainerWithRef', () => {
  const renderWithDivContainer = ({ className, children, _id }: PropsDivContainer) =>
    render(
      <DivContainerWithRef
        _id={_id}
        className={className}
      >
        {children}
      </DivContainerWithRef>,
    );

  it('should render the children elements and className', () => {
    const { container } = renderWithDivContainer({
      _id: null,
      className: 'bg-red-400',
      children: <div>divContainer-test</div>,
    });
    const childElement = screen.getByText('divContainer-test');
    const divContainerTestId = screen.getByTestId('divContainer-testid');

    expect(container).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
    expect(divContainerTestId).toHaveClass('bg-red-400');
  });
});
