import { render, renderHook, screen } from '@testing-library/react';
import { HeaderWrapper } from '..';
import { ReactNode } from 'react';
import { atomNavigationOpen } from '@/button/button.states';
import { useAtomValue } from 'jotai';
import { useVerticalScrollPosition } from '@hooks/ui';
import { configsHeaderWrapper } from '../headerWrapper.configs';

describe('HeaderWrapper', () => {
  const renderWithHeaderWrapper = (children?: ReactNode) =>
    render(<HeaderWrapper configs={configsHeaderWrapper()}>{children}</HeaderWrapper>);
  const textElement = 'childElement-test';
  const configs = configsHeaderWrapper();
  const defaultClassName = configs.className.default;
  const conditionalClassName = configs.className.homeSidebarClose;

  it('should render the child element', () => {
    renderWithHeaderWrapper(textElement);

    const childElement = screen.getByText(textElement);
    expect(childElement).toBeInTheDocument();
  });

  it('should not render className when navigation is not open and scrollPosition is not equal to 0', () => {
    renderWithHeaderWrapper(textElement);
    const { result: navigationOpen } = renderHook(() => useAtomValue(atomNavigationOpen));
    const { result: verticalScrollPosition } = renderHook(() => useVerticalScrollPosition());

    const childElement = screen.getByText(textElement);
    expect(childElement).not.toHaveClass(conditionalClassName);
    expect(childElement).toHaveClass(defaultClassName);
    expect(navigationOpen.current).toBe(false);
    expect(verticalScrollPosition.current).toBe(0);
  });
});
