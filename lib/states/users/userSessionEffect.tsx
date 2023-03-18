import { STORAGE_KEY } from '@data/dataTypesConst';
import { atomQueryLabels } from '@states/labels/atomQueries';
import { atomQueryTodoIds } from '@states/todos/atomQueries';
import { getSessionStorage, setSessionStorage } from '@states/utils';
import { deleteDB } from 'idb';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { atomIDBUserSession } from '.';

export const UserSessionEffect = () => {
  const { data: session } = useSession();
  const notInSession = session === null && session !== undefined;

  const clearIndexedDB = async () => {
    const indexedDBs = await indexedDB.databases();

    await Promise.all(indexedDBs.map((idb) => idb && deleteDB(idb.name as string)));
  };

  const userSession = useRecoilCallback(({ set, reset }) => () => {
    if (session) {
      set(atomIDBUserSession, true);
      setSessionStorage(STORAGE_KEY['session'], true);
    }
    if (notInSession) {
      setSessionStorage(STORAGE_KEY['session'], false);
      set(atomIDBUserSession, false);
      reset(atomQueryTodoIds);
      reset(atomQueryLabels);
      localStorage.clear();
      clearIndexedDB();
      return;
    }
  });

  const setSession = useCallback(() => {
    const isSession = getSessionStorage(STORAGE_KEY['session']);

    if (notInSession) {
      !isSession && setSessionStorage(STORAGE_KEY['session'], false);
      return;
    }

    if (session) return !isSession && setSessionStorage(STORAGE_KEY['session'], true);
  }, [notInSession, session]);

  useEffect(() => {
    userSession();
    window.addEventListener('storage', setSession);
    return () => {
      window.removeEventListener('storage', setSession);
    };
    // removed the userSession from the dependency as It will clear out in offSession data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSession]);

  return null;
};
