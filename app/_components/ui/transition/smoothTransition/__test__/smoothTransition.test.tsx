import { render, screen } from '@testing-library/react';
import { SmoothTransition } from '..';
import { ReactNode } from 'react';
import { configsTransition } from '@/transition/transition.configs';

jest.mock('..', () => ({
  SmoothTransition: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('SmoothTransition', () => {
  const renderWithSmoothTransition = (children: ReactNode) => {
    return render(<SmoothTransition configs={configsTransition()}>{children}</SmoothTransition>);
  };

  it('should render the children props', () => {
    renderWithSmoothTransition(<div>test</div>);
    const testText = screen.getByText('test');
    expect(testText).toBeInTheDocument();
  });
});
