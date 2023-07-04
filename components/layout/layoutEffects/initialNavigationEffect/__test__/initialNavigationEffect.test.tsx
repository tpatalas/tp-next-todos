import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { InitialNavigationEffect } from '..';
import { screen, waitFor } from '@testing-library/react';
import { MockNavigationEffect } from './__mock__/mockNavigationEffect';

describe('InitialNavigationEffect', () => {
  const renderWithInitialNavigationEffect = (isBreakpoint: boolean) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <InitialNavigationEffect />
        <MockNavigationEffect isBreakpoint={isBreakpoint} />
      </>,
      options,
    );
  };

  const expectTextPresence = async (text: string, expectation: boolean) => {
    await waitFor(() => {
      const textPresence = screen.queryByText(text);
      return expectation
        ? expect(textPresence).toBeInTheDocument()
        : expect(textPresence).not.toBeInTheDocument();
    });
  };

  it('should set the atomLayoutNavigationOpen correct based on the breakpoint when component mounts', async () => {
    const { container } = renderWithInitialNavigationEffect(true);

    expect(container).toBeInTheDocument();
    await expectTextPresence('appNavigationOpen', true);
    await expectTextPresence('homeNavigationOpen', false);
  });

  it('should set the atomLayoutNavigationOpen correct if breakpoint return false when component mounts', async () => {
    renderWithInitialNavigationEffect(false);

    await expectTextPresence('appNavigationOpen', false);
    await expectTextPresence('homeNavigationOpen', false);
  });
});
