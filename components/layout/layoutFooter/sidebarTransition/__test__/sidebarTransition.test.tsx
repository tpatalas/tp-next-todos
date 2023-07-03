import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { screen, waitFor } from '@testing-library/react';
import { SidebarTransition } from '..';
import { PropsSidebarTransition, MockSidebarTransition } from './__mock__/mockSidebarTransition';

describe('SidebarTransition', () => {
  const renderWithSidebarTransition = ({ isBreakpoint, isSidebarOpen, path }: PropsSidebarTransition) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <SidebarTransition path={path}>transition-text</SidebarTransition>
        <MockSidebarTransition
          path={path}
          isSidebarOpen={isSidebarOpen}
          isBreakpoint={isBreakpoint}
        />
      </>,
      options,
    );
  };

  it('should render the child component, sidebarNavigationWrapper when sidebar is open', async () => {
    const { container } = renderWithSidebarTransition({ path: 'home', isSidebarOpen: true });

    expect(container).toBeInTheDocument();
    await waitFor(() => {
      const sidebarNavigationWrapper = screen.queryByTestId('sidebarNavigationWrapper');
      expect(sidebarNavigationWrapper).toBeInTheDocument();
    });
  });

  it('should not render the child component, sidebarNavigationWrapper when sidebar is not open', async () => {
    renderWithSidebarTransition({ path: 'home', isSidebarOpen: false });

    await waitFor(() => {
      const sidebarNavigationWrapper = screen.queryByTestId('sidebarNavigationWrapper');
      expect(sidebarNavigationWrapper).not.toBeInTheDocument();
    });
  });

  it('should render the Backdrop when sidebar is open and breakpoint is set to false', async () => {
    renderWithSidebarTransition({ path: 'home', isSidebarOpen: true, isBreakpoint: false });

    await waitFor(() => {
      const test = screen.queryByTestId('backdrop');
      expect(test).toBeInTheDocument();
    });
  });

  it('should not render the Backdrop when sidebar is open and breakpoint is set to true', async () => {
    renderWithSidebarTransition({ path: 'home', isSidebarOpen: true, isBreakpoint: true });

    await waitFor(() => {
      const test = screen.queryByTestId('backdrop');
      expect(test).not.toBeInTheDocument();
    });
  });

  it('should render proper classNames base on the layoutType equals to home', async () => {
    renderWithSidebarTransition({ path: 'home', isSidebarOpen: true });
    const enterTransition = await screen.findByText('transition-text');

    expect(enterTransition).toHaveClass('-translate-y-5');
  });

  it('should render proper classNames base on the layoutType equals to app', async () => {
    renderWithSidebarTransition({ path: 'app', isSidebarOpen: true });
    const enterTransition = await screen.findByText('transition-text');

    expect(enterTransition).toHaveClass('md:-translate-x-0 -translate-x-10');
  });
});
