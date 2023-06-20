import { atomLayoutNavigationOpen } from '@layout/layout.states';
import { TypesLayout } from '@layout/layout.types';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { screen, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { SidebarTransition } from '..';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import { BREAKPOINT } from '@constAssertions/ui';

type Props = Pick<TypesLayout, 'path'> & { isSidebarOpen?: boolean; isBreakpoint?: boolean };

const SidebarEffect = ({ isSidebarOpen, isBreakpoint, path }: Props) => {
  const setSidebarOpen = useSetRecoilState(atomLayoutNavigationOpen(path));
  const setBreakpoint = useSetRecoilState(atomEffectMediaQuery(BREAKPOINT['md']));

  useEffect(() => {
    setSidebarOpen(isSidebarOpen ?? false);
    setBreakpoint(isBreakpoint ?? false);
  });
  return null;
};

describe('SidebarTransition', () => {
  const renderWithSidebarTransition = ({ isBreakpoint, isSidebarOpen, path }: Props) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <SidebarTransition path={path}>transition-text</SidebarTransition>
        <SidebarEffect
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
