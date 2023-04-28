import mockRouter from 'next-router-mock';
import { RecoilObserverValue, getSessionStorage, renderWithRecoilRoot } from '@stateLogics/utils';
import { screen } from '@testing-library/react';
import { atomUserSession } from '@users/user/user.states';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { UserSessionEffect } from '..';
import { mockedUserSession } from '__mock__/next-auth';

jest.mock('next/router', () => require('next-router-mock'));

describe('UserSessionEffect', () => {
  const renderUserSessionEffect = (session: Session | null) => {
    return renderWithRecoilRoot(
      <SessionProvider session={session}>
        <UserSessionEffect />
        <RecoilObserverValue node={atomUserSession} />
      </SessionProvider>,
    );
  };

  const mockedSession = mockedUserSession({ userImage: true });

  const renderWithQueryElement = (session: Session | null) => {
    const { container } = renderUserSessionEffect(session);
    const active = screen.queryByText('active');
    const inactive = screen.queryByText('inactive');
    const offSession = getSessionStorage('offSession');

    return { container, offSession, active, inactive };
  };

  beforeEach(() => {
    mockRouter.push({
      pathname: '/',
    });
  });

  it('should offSession return true when pathname is not equal to /auth', async () => {
    const { container, offSession } = renderWithQueryElement(null);

    expect(container).not.toBeNull();
    expect(mockRouter).toMatchObject({ pathname: '/' });
    expect(offSession).toBe(true);
  });

  it('should offSession return null when pathname is equal to /auth', async () => {
    mockRouter.push('/auth');
    const { container, offSession } = renderWithQueryElement(null);

    expect(container).not.toBeNull();
    expect(mockRouter).toMatchObject({ pathname: '/auth' });
    expect(offSession).toBeNull();
  });

  it('should offSession return null when user has a session', async () => {
    const { container, offSession } = renderWithQueryElement(mockedSession);

    expect(container).not.toBeNull();
    expect(offSession).toBeNull();
  });

  it('should document have an active string when user has a session', async () => {
    const { container, active, inactive } = renderWithQueryElement(mockedSession);
    expect(active).toBeInTheDocument();
    expect(inactive).not.toBeInTheDocument();
    expect(container).not.toBeNull();
  });

  it('should offSession return true when user does not have a session', async () => {
    const { container, offSession } = renderWithQueryElement(null);

    expect(container).not.toBeNull();
    expect(offSession).toBe(true);
  });

  it('should document have an inactive string when user does not have a session', async () => {
    const { container, active, inactive } = renderWithQueryElement(null);

    expect(active).not.toBeInTheDocument();
    expect(inactive).toBeInTheDocument();
    expect(container).not.toBeNull();
  });
});
