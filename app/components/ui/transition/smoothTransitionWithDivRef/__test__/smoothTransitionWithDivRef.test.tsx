import { render, screen } from '@testing-library/react';
import { SmoothTransitionWithDivRef } from '..';
import { ReactNode } from 'react';

describe('SmoothTransitionWithDivRef', () => {
  const renderWithSmoothTransitionWithDivRef = (children: ReactNode) =>
    render(<SmoothTransitionWithDivRef>{children}</SmoothTransitionWithDivRef>);

  it('should render the child elements', () => {
    const { container } = renderWithSmoothTransitionWithDivRef(<div>smoothTransition-test</div>);
    const childElement = screen.getByText('smoothTransition-test');

    expect(container).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });
});
