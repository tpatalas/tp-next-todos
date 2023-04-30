import { DATA_IDB } from '@collections/idb';
import { peekIDB } from '@lib/dataConnections/indexedDB';
import { getSessionStorage } from '@stateLogics/utils';
import { RecoilObserverValue, renderRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { selectorSessionLabels } from '@states/atomEffects/labels';
import { selectorSessionTodoIds } from '@states/atomEffects/todos';
import { screen } from '@testing-library/react';
import 'fake-indexeddb/auto';
import { Session } from 'next-auth';
import { RecoilState } from 'recoil';
import { UserSessionResetEffect } from '..';

describe('userSessionResetEffect', () => {
  const renderUserSessionEffect = <T,>(session: Session | null, node: RecoilState<T> | null) =>
    renderRecoilRootAndSession(
      <>
        <UserSessionResetEffect />
        <RecoilObserverValue node={node} />
      </>,
      { session: session },
    );

  const renderWithQueryElement = <T,>(session: Session | null, node: RecoilState<T> | null) => {
    const { container } = renderUserSessionEffect(session, node);
    const offSession = getSessionStorage('offSession');
    const active = screen.queryByText('active');
    const inactive = screen.queryByText('inactive');
    return { container, offSession, active, inactive };
  };

  it('should initial offSession is null', () => {
    const { container, offSession } = renderWithQueryElement(null, null);

    expect(container).not.toBeNull();
    expect(offSession).toBeNull();
  });

  it('should return no localStorage when the user does not have a session', () => {
    const { container } = renderWithQueryElement(null, null);

    expect(container).not.toBeNull();
    expect(localStorage).toHaveLength(0);
  });

  it('should return inactive of selectorSessionTodoIds when the user does not have a session', () => {
    const { container, active, inactive } = renderWithQueryElement(null, selectorSessionTodoIds);

    expect(container).not.toBeNull();
    expect(active).not.toBeInTheDocument();
    expect(inactive).toBeInTheDocument();
  });

  it('should return inactive of selectorSessionLabels when the user does not have a session', () => {
    const { container, active, inactive } = renderWithQueryElement(null, selectorSessionLabels);

    expect(container).not.toBeNull();
    expect(active).not.toBeInTheDocument();
    expect(inactive).toBeInTheDocument();
  });

  it('should return undefined on indexedDB when the user does not have a session', async () => {
    const { container } = renderWithQueryElement(null, null);

    const allIdb = await Promise.all(
      DATA_IDB.map((idb) => {
        return peekIDB(idb.store);
      }),
    );
    const allIdbUndefined = allIdb.every((item) => item === undefined);

    expect(container).not.toBeNull();
    expect(allIdbUndefined).toBe(true);
  });
});
