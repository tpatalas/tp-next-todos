import { BREAKPOINT } from '@constAssertions/ui';
import { atomLayoutNavigationOpen } from '@layout/layout.states';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { InitialNavigationEffect } from '..';
import { screen, waitFor } from '@testing-library/react';

const MockNavigationEffect = ({ isBreakpoint }: { isBreakpoint: boolean }) => {
  const setBreakpoint = useSetRecoilState(atomEffectMediaQuery(BREAKPOINT['md']));
  const appNavigation = useRecoilValue(atomLayoutNavigationOpen('app'));
  const homeNavigation = useRecoilValue(atomLayoutNavigationOpen('home'));

  useEffect(() => {
    setBreakpoint(isBreakpoint ?? false);
  }, [isBreakpoint, setBreakpoint]);

  return (
    <>
      {appNavigation ? 'appNavigationOpen' : null}
      {homeNavigation ? 'homeNavigationOpen' : null}
    </>
  );
};

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
