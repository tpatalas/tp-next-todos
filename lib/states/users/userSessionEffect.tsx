import { atomQueryLabels } from '@states/labels/atomQueries';
import { atomQueryTodoIds } from '@states/todos/atomQueries';
import { deleteDB } from 'idb';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { atomIDBUserSession } from '.';

export const UserSessionEffect = () => {
  const { data: session } = useSession();
  const stateSession = useRecoilValue(atomIDBUserSession);

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
      stateSession && reset(atomIDBUserSession);
      reset(atomQueryTodoIds);
      reset(atomQueryLabels);
      localStorage.clear();
      sessionStorage.clear();
      clearIndexedDB();
      return;
    }
  });

  useEffect(() => {
    userSession();
  }, [userSession]);
  return null;
};
