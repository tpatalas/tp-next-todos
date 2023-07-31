import { render, screen } from '@testing-library/react';
import { SmoothTransitionWithDivRef } from '..';
import { ReactNode } from 'react';

describe('SmoothTransitionWithDivRef', () => {
  const renderWithSmoothTransitionWithDivRef = (children: ReactNode) =>
    render(<SmoothTransitionWithDivRef _id={null}>{children}</SmoothTransitionWithDivRef>);

  it('should render the child elements', async () => {
    const { container } = renderWithSmoothTransitionWithDivRef(<div>smoothTransition-test</div>);
    const childElement = await screen.findByText('smoothTransition-test');

    expect(container).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });
});
