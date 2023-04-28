import { getSessionStorage, renderWithRecoilRoot } from '@stateLogics/utils';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { UserSessionGroupEffect } from '..';
import 'fake-indexeddb/auto';
import { DATA_IDB } from '@collections/idb';
import { peekIDB } from '@lib/dataConnections/indexedDB';

describe('UserSessionGroupEffect', () => {
  const renderUserSessionEffect = (session: Session | null) => {
    return renderWithRecoilRoot(
      <SessionProvider session={session}>
        <UserSessionGroupEffect />
      </SessionProvider>,
    );
  };

  const renderWithQueryElement = (session: Session | null) => {
    const { container } = renderUserSessionEffect(session);
    const offSession = getSessionStorage('offSession');
    return { container, offSession };
  };

  it('should render the offSession true when UserSessionEffect component is mounted', () => {
    const { container, offSession } = renderWithQueryElement(null);

    expect(container).not.toBeNull();
    expect(offSession).not.toBeNull();
    expect(offSession).toBe(true);
  });

  it('should render no localStorage and indexedDB when UserSessionResetEffect component is mounted', async () => {
    const { container } = renderWithQueryElement(null);

    const allIdb = await Promise.all(
      DATA_IDB.map((idb) => {
        return peekIDB(idb.store);
      }),
    );
    const allIdbUndefined = allIdb.every((item) => item === undefined);

    expect(container).not.toBeNull();
    expect(localStorage).toHaveLength(0);
    expect(allIdbUndefined).toBe(true);
  });
});
