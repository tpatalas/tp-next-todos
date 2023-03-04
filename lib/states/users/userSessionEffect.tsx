import { deleteDB } from 'idb';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { atomIDBUserSession } from '.';

export const UserSessionEffect = () => {
  const { data: session } = useSession();

  const clearIndexedDB = async () => {
    const indexedDBs = await indexedDB.databases();
    await Promise.all(indexedDBs.map((idb) => idb && deleteDB(idb.name as string)));
  };

  const userSession = useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    if (session) {
      !get(atomIDBUserSession) && set(atomIDBUserSession, true);
      return;
    }
    get(atomIDBUserSession) && set(atomIDBUserSession, false);
    sessionStorage.clear();
    localStorage.clear();
    clearIndexedDB();
    return;
  });

  useEffect(() => {
    userSession();
  }, [userSession]);
  return null;
};
