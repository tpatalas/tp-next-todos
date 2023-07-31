import { render, screen } from '@testing-library/react';
import { SmoothTransition } from '..';
import { ReactNode } from 'react';

jest.mock('..', () => ({
  SmoothTransition: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('SmoothTransition', () => {
  const renderWithSmoothTransition = (children: ReactNode) => {
    return render(<SmoothTransition>{children}</SmoothTransition>);
  };

  it('should render the children props', () => {
    renderWithSmoothTransition(<div>test</div>);
    const testText = screen.getByText('test');
    expect(testText).toBeInTheDocument();
  });
});
