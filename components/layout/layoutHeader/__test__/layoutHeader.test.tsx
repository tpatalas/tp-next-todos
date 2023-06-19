import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { LayoutHeader } from '..';
import 'fake-indexeddb/auto';
import { screen, waitFor } from '@testing-library/react';
import { RecoilState } from 'recoil';
import { atomUserSession } from '@user/user.states';
import { Session } from 'next-auth';
import { mockedUserSession } from '__mock__/next-auth';

type Props<T> = { node?: RecoilState<T>; session: Session | null };

describe('LayoutHeader', () => {
  const renderWithLayoutHeader = <T,>({ node, session }: Props<T>) => {
    const path = 'home';
    const options = { session: session, node: node };
    return renderWithRecoilRootAndSession(<LayoutHeader path={path} />, options);
  };

  it('should render child logo and Navigation Button', () => {
    const { container } = renderWithLayoutHeader({ session: null });
    const logoComponent = screen.getByTestId('MainWhite-testid');
    const navigationButtonComponent = screen.getByText('Open sidebar');

    expect(container).toBeInTheDocument();
    expect(logoComponent).toBeInTheDocument();
    expect(navigationButtonComponent).toBeInTheDocument();
  });

  it('should return false on atomUserSession when session is null', async () => {
    renderWithLayoutHeader({ node: atomUserSession, session: null });

    await waitFor(() => {
      const inactiveState = screen.queryByText('inactive');
      expect(inactiveState).toBeInTheDocument();
    });

    await waitFor(() => {
      const activeState = screen.queryByText('active');
      expect(activeState).not.toBeInTheDocument();
    });
  });

  it('should return true on atomUserSession when session is not null', async () => {
    renderWithLayoutHeader({ node: atomUserSession, session: mockedUserSession({ userImage: null }) });

    await waitFor(() => {
      const inactiveState = screen.queryByText('inactive');
      expect(inactiveState).not.toBeInTheDocument();
    });

    await waitFor(() => {
      const activeState = screen.queryByText('active');
      expect(activeState).toBeInTheDocument();
    });
  });

  // will not cover all tests on UserSessionEffect component as it will be covered within its own test.
});
