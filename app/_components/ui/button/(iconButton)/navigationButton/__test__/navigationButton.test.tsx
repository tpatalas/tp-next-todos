import { render, screen, renderHook, fireEvent } from '@testing-library/react';
import { PropsButtonWithTooltip } from '@/button/button.types';
import { NavigationButton } from '..';
import { useAtomValue } from 'jotai';
import { atomNavigationOpen } from '@/button/button.states';

describe('NavigationButton', () => {
  const renderWithNavigationButton = ({ children, configs }: PropsButtonWithTooltip) =>
    render(<NavigationButton configs={configs}>{children}</NavigationButton>);
  const testElement = 'test text';

  it('should onClick update the state', async () => {
    renderWithNavigationButton({ children: testElement });
    const childElement = screen.getByText(testElement);

    const { result } = renderHook(() => useAtomValue(atomNavigationOpen));

    expect(childElement).toBeInTheDocument();
    expect(result.current).toBe(false);

    fireEvent.click(childElement);
    expect(result.current).toBe(true);
  });

  it('should render the object props of configs', () => {
    renderWithNavigationButton({ configs: { 'aria-label': testElement } });
    const ariaLabel = screen.getByLabelText(testElement);

    expect(ariaLabel).toBeInTheDocument();
  });
});
