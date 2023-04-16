import { STORAGE_KEY } from '@constAssertions/storage';
import { getSessionStorage, setSessionStorage } from '@stateLogics/utils';
import { selectorSessionLabels } from '@states/atomEffects/labels';
import { selectorSessionTodoIds } from '@states/atomEffects/todos';
import { deleteDB } from 'idb';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

export const UserSessionResetEffect = () => {
  const { data: session } = useSession();
  const offSession = session === null && session !== undefined;

  const clearIndexedDB = async () => {
    const indexedDBs = await indexedDB.databases();
    await Promise.all(indexedDBs.map((idb) => idb && deleteDB(idb.name as string)));
  };

  const userSession = useRecoilCallback(({ reset }) => () => {
    if (offSession) {
      reset(selectorSessionTodoIds);
      reset(selectorSessionLabels);
      localStorage.clear();
      clearIndexedDB();
      return;
    }
  });

  const setSession = useCallback(() => {
    const isOffSessionSTorage = getSessionStorage(STORAGE_KEY['offSession']);

    if (offSession) {
      !isOffSessionSTorage && setSessionStorage(STORAGE_KEY['offSession'], true);
      return;
    }
  }, [offSession]);

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