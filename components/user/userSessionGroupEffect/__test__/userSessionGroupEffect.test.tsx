import { DATA_IDB } from '@collections/idb';
import { peekIDB } from '@lib/dataConnections/indexedDB';
import { getSessionStorage } from '@stateLogics/utils';
import 'fake-indexeddb/auto';
import { Session } from 'next-auth';
import { UserSessionGroupEffect } from '..';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';

describe('UserSessionGroupEffect', () => {
  const renderUserSessionEffect = (session: Session | null) => {
    return renderWithRecoilRootAndSession(<UserSessionGroupEffect />, { session: session });
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
