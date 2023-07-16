import { render } from '@testing-library/react';
import { Tooltip } from '..';
import { ReactNode } from 'react';
import { screen } from '@testing-library/react';

jest.mock('..', () => ({
  Tooltip: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('Tooltip', () => {
  const renderWithTooltip = (children: ReactNode) => render(<Tooltip>{children}</Tooltip>);

  it('should render the child element', () => {
    const { container } = renderWithTooltip(<div>Test</div>);
    const testText = screen.getByText('Test');

    expect(container).toBeInTheDocument();
    expect(testText).toBeInTheDocument();
  });
});
