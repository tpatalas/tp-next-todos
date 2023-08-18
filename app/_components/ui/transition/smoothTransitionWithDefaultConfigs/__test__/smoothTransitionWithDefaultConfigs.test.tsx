import { render, screen } from '@testing-library/react';
import { SmoothTransitionWithDefaultConfigs } from '..';
import { ReactNode } from 'react';

describe('SmoothTransitionWithDefaultConfigs', () => {
  const renderWithSmoothTransitionWithDefaultConfigs = ({ children }: { children: ReactNode }) =>
    render(<SmoothTransitionWithDefaultConfigs>{children}</SmoothTransitionWithDefaultConfigs>);

  it('should render the child elements', async () => {
    const renderText = 'test render';
    renderWithSmoothTransitionWithDefaultConfigs({ children: <div>{renderText}</div> });

    const testText = await screen.findByText(renderText);
    expect(testText).toBeInTheDocument();
  });
});
