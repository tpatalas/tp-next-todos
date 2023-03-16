import { STORAGE_KEY } from '@data/dataTypesConst';
import { atomQueryLabels } from '@states/labels/atomQueries';
import { atomQueryTodoIds } from '@states/todos/atomQueries';
import { deleteDB } from 'idb';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { atomIDBUserSession } from '.';

export const UserSessionEffect = () => {
  const { data: session } = useSession();

  const clearIndexedDB = async () => {
    const indexedDBs = await indexedDB.databases();

    await Promise.all(indexedDBs.map((idb) => idb && deleteDB(idb.name as string)));
  };

  const userSession = useRecoilCallback(({ set, reset }) => () => {
    if (session) {
      set(atomIDBUserSession, true);
      return;
    }
    if (session === null && session !== undefined) {
      sessionStorage.setItem(STORAGE_KEY['demo'], JSON.stringify(true));
      reset(atomIDBUserSession);
      reset(atomQueryTodoIds);
      reset(atomQueryLabels);
      localStorage.clear();
      clearIndexedDB();
      return;
    }
  });

  useEffect(() => {
    userSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
