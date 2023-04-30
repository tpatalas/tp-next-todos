import { getSessionStorage, renderWithRecoilRoot, setSessionStorage } from '@stateLogics/utils';
import { screen, waitFor } from '@testing-library/dom';
import { mockedUserSession } from '__mock__/next-auth';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { User } from '..';

describe('User', () => {
  const renderWithSession = (session: Session | null) => {
    return renderWithRecoilRoot(
      <SessionProvider session={session}>
        <User />
      </SessionProvider>,
    );
  };

  const mockedSession = mockedUserSession({ userImage: null });

  const renderWithQueryElement = (session: Session | null) => {
    const { container } = renderWithSession(session);
    const offSession = getSessionStorage('offSession');
    const userSession = !!session;

    return { userSession, offSession, container };
  };

  it('should render the UserDropdown button when user is in Session', async () => {
    const { container, userSession, offSession } = renderWithQueryElement(mockedSession);

    const dropdownButton = screen.getByRole('button', { name: /open user menu/i });
    const signIn = screen.queryByText(/Sign in/i);

    expect(userSession).toBe(true);
    expect(offSession).toBeNull();
    expect(dropdownButton).toBeInTheDocument();
    expect(signIn).not.toBeInTheDocument();
    await waitFor(() => expect(container).toBeInTheDocument()); // we need to wait as SmoothTransition component causes the delay
  });

  it('should render the SignIn button when user is not in Session', async () => {
    setSessionStorage('offSession', true); // manually trigger the sessionStorage environment
    const { container, userSession, offSession } = renderWithQueryElement(null);

    const dropdownButton = screen.queryByRole('button', { name: /open user menu/i });
    const signIn = screen.queryByText(/Sign in/i);

    expect(userSession).toBe(false);
    expect(offSession).toBe(true);
    expect(dropdownButton).not.toBeInTheDocument();
    expect(signIn).toBeInTheDocument();
    await waitFor(() => expect(container).toBeInTheDocument());
  });
});
