import { DATA_IDB } from '@collections/idb';
import { STORAGE_KEY } from '@constAssertions/storage';
import { selectorSessionLabels } from '@label/label.states';
import { getSessionStorage, setSessionStorage } from '@stateLogics/utils';
import { selectorSessionTodoIds } from '@states/atomEffects/todos';
import { deleteDB } from 'idb';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { RecoilValue, useRecoilCallback } from 'recoil';

export const UserSessionResetEffect = () => {
  const { data: session } = useSession();
  const offSession = session === null && session !== undefined;

  const clearIndexedDB = async () => {
    await Promise.all(
      DATA_IDB.map((idb) => {
        const currentIDBName = idb && idb.dbName + 'v' + idb.currentVersion;
        return deleteDB(currentIDBName);
      }),
    );
  };

  const userSession = useRecoilCallback(
    ({ snapshot, reset }) =>
      async () => {
        const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).valueMaybe();

        if (offSession) {
          get(selectorSessionTodoIds) && reset(selectorSessionTodoIds);
          get(selectorSessionLabels) && reset(selectorSessionLabels);
          localStorage.clear();
          await clearIndexedDB();
          return;
        }
      },
    [offSession],
  );

  const setSession = useCallback(() => {
    const isOffSessionStorage = getSessionStorage(STORAGE_KEY['offSession']);

    if (offSession) {
      !isOffSessionStorage && setSessionStorage(STORAGE_KEY['offSession'], true);
      return;
    }
  }, [offSession]);

  useEffect(() => {
    (async () => await userSession())();
    window.addEventListener('storage', setSession);
    return () => {
      window.removeEventListener('storage', setSession);
    };
    // removed the userSession from the dependency as It will clear out in offSession data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSession]);

  return null;
};
